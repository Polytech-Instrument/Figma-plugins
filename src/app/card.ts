import { CONFIG, BRAND_MAPPING, COMPONENT_PROPERTY_NAME, KEY_ROW_ITEM, COL_W } from './config';
import {
    findTextInRow,
    loadFontForNode,
    getComponentByKey,
    findTextInNode,
    findNodeInCard,
    findNodeInRowByName,
    normalizeNameKey
} from './utils';
import { normalizeDiscountText, normalizePriceText, normalizeMultiplicityText } from './normalizers';
import { createQrSvg } from './qr';
import { Group, Variant } from './types';

export type SplitMetrics = {
    minCardHeight: number;
    baseRows: number;
    rowGrowth: number;
};

const VIDEO_QR_SIZE = 23;

// Fill a row with SKU/specs/min/qty/price.
export async function fillRowData(row: FrameNode | InstanceNode, item: Variant, baseDiscountRaw?: string | null) {
    if (item?.sku) {
        row.name = String(item.sku);
    }
    const map = {
        [CONFIG.ROW_SKU]: item.sku,
        [CONFIG.ROW_SPECS]: item.specs,
        [CONFIG.ROW_MIN]: item.min,
        [CONFIG.ROW_QTY]: item.qty,
        [CONFIG.ROW_PRICE]: normalizePriceText(String(item.price || "")),
        [CONFIG.BOX_PRICE]: normalizePriceText(String(item.boxPrice || item.price || "")),
        [CONFIG.BOX_QTY]: normalizeMultiplicityText(String(item.multiplicity || item.boxQty || item.qty || ""))
    };
    for (const [key, val] of Object.entries(map)) {
        const node = findTextInRow(row, key);
        if (node) {
            await loadFontForNode(node);
            node.characters = val ? String(val) : "-";
            if ((key === CONFIG.ROW_SKU || key === CONFIG.ROW_SPECS) && item.productUrl) {
                setTextHyperlink(node, item.productUrl);
            }
        }
    }

    const itemSaleNode = findNodeInRowByName(row, CONFIG.ROW_ITEM_SALE);
    const itemSaleText = findTextInRow(row, CONFIG.ROW_ITEM_SALE_DISCOUNT);
    if (itemSaleNode) itemSaleNode.visible = false;
    if (itemSaleText) {
        await loadFontForNode(itemSaleText);
        itemSaleText.characters = "";
    }

    const baseDiscount = normalizeDiscountValue(baseDiscountRaw);
    const rowDiscount = normalizeDiscountValue(item?.discount);
    const shouldShow = rowDiscount !== null && (baseDiscount === null || baseDiscount !== rowDiscount);
    if (shouldShow && itemSaleNode) itemSaleNode.visible = true;
    if (shouldShow && itemSaleText) {
        await loadFontForNode(itemSaleText);
        itemSaleText.characters = normalizeDiscountText(String(item.discount || ""));
    }
}

// Fill static card content without rows.
export async function fillCardStatic(card: FrameNode, group: Group) {
    card.clipsContent = false;

    const title = card.findOne(n => n.name === CONFIG.TITLE && n.type === 'TEXT') as TextNode | null;
    if (title) {
        await loadFontForNode(title);
        title.characters = group.headerName.toUpperCase();
    }

    const descLayer = card.findOne(n => n.name === CONFIG.DESCRIPTION && n.type === 'TEXT') as TextNode | null;
    if (descLayer) {
        await loadFontForNode(descLayer);
        if (group.descriptionText) {
            descLayer.characters = group.descriptionText;
            descLayer.visible = true;
        } else {
            descLayer.visible = false;
        }
    }

    const discountLayer = findTextInNode(card, CONFIG.DISCOUNT);
    const saleStarNode = findNodeInCard(card, CONFIG.SALE_STAR);
    if (discountLayer) {
        await loadFontForNode(discountLayer);
        if (group.discountText) {
            discountLayer.characters = normalizeDiscountText(String(group.discountText));
            discountLayer.visible = true;
            if (saleStarNode) saleStarNode.visible = true;
        } else {
            discountLayer.visible = false;
            discountLayer.characters = "";
            if (saleStarNode) saleStarNode.visible = false;
        }
    }
    if (!group.discountText && saleStarNode) saleStarNode.visible = false;

    const discountInfo = findTextInNode(card, CONFIG.DISCOUNT_INFO);
    const discountInfoWrapper = findNodeInCard(card, CONFIG.DISCOUNT_INFO);
    if (discountInfo) {
        await loadFontForNode(discountInfo);
        if (group.discountInfoText) {
            discountInfo.characters = String(group.discountInfoText);
            discountInfo.visible = true;
            if (discountInfoWrapper) discountInfoWrapper.visible = true;
        } else {
            discountInfo.visible = false;
            discountInfo.characters = "";
            if (discountInfoWrapper) discountInfoWrapper.visible = false;
        }
    } else if (discountInfoWrapper && !group.discountInfoText) {
        discountInfoWrapper.visible = false;
    }

    const surprise = findTextInNode(card, CONFIG.SURPRISE);
    const surpriseWrapper = findNodeInCard(card, CONFIG.SURPRISE_WRAPPER);
    if (surprise) {
        await loadFontForNode(surprise);
        if (group.surpriseText) {
            surprise.characters = String(group.surpriseText);
            surprise.visible = true;
            if (surpriseWrapper) surpriseWrapper.visible = true;
        } else {
            surprise.visible = false;
            surprise.characters = "";
            if (surpriseWrapper) surpriseWrapper.visible = false;
        }
    } else if (surpriseWrapper && !group.surpriseText) {
        surpriseWrapper.visible = false;
    }

    await setOptionalCardText(card, CONFIG.BOX_PRICE, group.boxPriceText ? normalizePriceText(String(group.boxPriceText)) : group.boxPriceText);
    await setOptionalCardText(card, CONFIG.BOX_QTY, normalizeMultiplicityText(String(group.boxQtyText || "")));
    await setOptionalCardText(card, CONFIG.BOX_NOTICE, group.boxNoticeText);
    await setVideoLink(card, group.videoUrl);

    const imgNode = card.findOne(n => n.name === CONFIG.IMAGE) as SceneNode | null;
    if (imgNode && group.imageBytes) {
        const image = figma.createImage(new Uint8Array(group.imageBytes));
        if ('fills' in imgNode) {
            imgNode.fills = [{
                type: 'IMAGE',
                scaleMode: 'FIT',
                imageHash: image.hash
            }];
        }
    }

    const logoNode = card.findOne(n => n.name === CONFIG.LOGO && n.type === 'INSTANCE') as InstanceNode | null;
    if (logoNode && group.brandId) {
        const targetVariantName = BRAND_MAPPING[group.brandId];
        if (targetVariantName) {
            const cp: any = (logoNode as any).componentProperties;
            let propName = COMPONENT_PROPERTY_NAME;
            if (!cp || !cp[propName]) {
                const variantKey = cp
                    ? (Object.keys(cp).find(k => cp[k]?.type === "VARIANT") || Object.keys(cp)[0])
                    : null;
                if (variantKey) propName = variantKey;
            }
            try {
                const props: any = {};
                props[propName] = targetVariantName;
                logoNode.setProperties(props);
            } catch (err) {
                postLog(`Не удалось переключить бренд для ${group.brandId}. Error: ${err}`);
            }
        }
        try {
            let container: (SceneNode & { width?: number; height?: number }) | null = (logoNode.parent as any) || null;
            while (container && container.type !== "FRAME" && container.type !== "INSTANCE") {
                container = (container.parent as any) || null;
            }

            const maxW = 70;
            const limitW = container?.width ? Math.min(maxW, container.width) : maxW;
            const limitH = container?.height ? container.height : logoNode.height;
            const scale = Math.min(1, limitW / logoNode.width, limitH / logoNode.height);
            if (scale < 1) {
                logoNode.resizeWithoutConstraints(
                    Math.round(logoNode.width * scale),
                    Math.round(logoNode.height * scale)
                );
            }
            if (container?.width && container?.height) {
                safeSetPosition(
                    logoNode,
                    Math.round((container.width - logoNode.width) / 2),
                    Math.round((container.height - logoNode.height) / 2),
                    "логотип"
                );
            }
            if ("clipsContent" in logoNode) {
                (logoNode as any).clipsContent = true;
            }
        } catch (err) {
            postLog(`Не удалось изменить размер логотипа: ${err}`);
        }
    }
}

function safeSetPosition(node: SceneNode, x: number, y: number, label: string) {
    if ((node.parent as BaseNode | null)?.type === "INSTANCE") {
        postLog(`Пропущены координаты ${label}: слой внутри instance`);
        return;
    }
    try {
        node.x = x;
        node.y = y;
    } catch (err) {
        postLog(`Не удалось поставить координаты ${label}: ${String((err as any)?.message || err)}`);
    }
}

async function setOptionalCardText(card: FrameNode, layerName: string, value?: string | null) {
    const node = findTextInNode(card, layerName);
    if (!node) return;
    await loadFontForNode(node);
    const text = value ? String(value).trim() : "";
    node.characters = text;
    node.visible = text !== "";
}

async function setVideoLink(card: FrameNode, videoUrl?: string | null) {
    const wrapper = findNodeInCard(card, CONFIG.VIDEO_QR_WRAPPER);
    const link = findTextInNode(card, CONFIG.VIDEO_LINK);
    const url = normalizeUrlLocal(videoUrl);
    if (!url) {
        removeGeneratedQr(card);
        if (wrapper && "findAll" in wrapper) removeGeneratedQr(wrapper as FrameNode | InstanceNode);
        safeSetVisible(wrapper, false, "video QR wrapper");
        if (link) {
            await loadFontForNode(link);
            link.characters = "";
            safeSetVisible(link, false, "video link");
        }
        return;
    }

    safeSetVisible(wrapper, true, "video QR wrapper");
    createOrReplaceVideoQr(card, wrapper, url);
    if (link) {
        await loadFontForNode(link);
        if (!String(link.characters || "").trim()) {
            link.characters = "смотреть видео";
        }
        safeSetVisible(link, true, "video link");
        setTextHyperlink(link, url);
    }
}

function createOrReplaceVideoQr(card: FrameNode, wrapper: SceneNode | null, url: string) {
    try {
        removeGeneratedQr(card);
        if (wrapper && "findAll" in wrapper) removeGeneratedQr(wrapper as FrameNode | InstanceNode);
        if (!wrapper || !("width" in wrapper) || !("height" in wrapper)) return;

        const qrNode = createVideoQrNode(url);

        if (appendQrIntoWrapper(wrapper, qrNode)) return;

        trySetAbsoluteLayout(qrNode);
        if (!safeAppendChild(card, qrNode, "video QR")) return;
        const pos = getRelativePosition(wrapper, card);
        safeSetPosition(qrNode, pos.x + centerOffset(wrapper.width, qrNode.width), pos.y + centerOffset(wrapper.height, qrNode.height), "video QR");
    } catch (err) {
        postLog(`Не удалось создать QR видео: ${String((err as any)?.message || err)}`);
    }
}

function createVideoQrNode(url: string): SceneNode {
    const svgNode = figma.createNodeFromSvg(createQrSvg(url, VIDEO_QR_SIZE));
    svgNode.name = "VideoQrGeneratedSource";
    resizeQrNode(svgNode, VIDEO_QR_SIZE, VIDEO_QR_SIZE);

    const merged = flattenQrSource(svgNode);
    merged.name = "VideoQrGenerated";
    resizeQrNode(merged, VIDEO_QR_SIZE, VIDEO_QR_SIZE);
    return merged;
}

function flattenQrSource(source: SceneNode): SceneNode {
    const temp = figma.createFrame();
    temp.name = "VideoQrTemp";
    temp.resizeWithoutConstraints(VIDEO_QR_SIZE, VIDEO_QR_SIZE);
    temp.fills = [];
    temp.clipsContent = false;
    let result: SceneNode = source;

    try {
        temp.appendChild(source);
        safeSetPosition(source, 0, 0, "video QR source");
        const flatten = (figma as any).flatten;
        if (typeof flatten !== "function") return source;
        result = flatten([source], temp) as SceneNode;
        if (result.parent === temp) {
            figma.currentPage.appendChild(result);
            safeSetPosition(result, 0, 0, "video QR merged");
        }
        return result;
    } catch (err) {
        postLog(`QR не удалось объединить в один вектор: ${String((err as any)?.message || err)}`);
        if (source.parent === temp) {
            figma.currentPage.appendChild(source);
            safeSetPosition(source, 0, 0, "video QR source");
        }
        result = source;
        return result;
    } finally {
        try {
            if (temp.parent) temp.remove();
        } catch {
            // Ignore cleanup errors.
        }
    }
}

function appendQrIntoWrapper(wrapper: SceneNode, qrNode: SceneNode): boolean {
    if (!canAppendIntoNode(wrapper)) return false;
    if (findInstanceAncestor(wrapper)) return false;
    try {
        (wrapper as FrameNode).appendChild(qrNode);
        safeSetPosition(qrNode, centerOffset(wrapper.width, qrNode.width), centerOffset(wrapper.height, qrNode.height), "video QR");
        return true;
    } catch (err) {
        postLog(`QR не удалось положить внутрь #VideoQrWrapper: ${String((err as any)?.message || err)}`);
        return false;
    }
}

function centerOffset(parentSize: number, childSize: number): number {
    return Math.round((parentSize - childSize) / 2);
}

function canAppendIntoNode(node: SceneNode): node is FrameNode {
    return node.type === "FRAME" || node.type === "COMPONENT" || node.type === "SECTION";
}

function findInstanceAncestor(node: SceneNode): InstanceNode | null {
    let parent = node.parent;
    while (parent && parent.type !== "PAGE") {
        if (parent.type === "INSTANCE") return parent;
        parent = parent.parent;
    }
    return null;
}

function safeAppendChild(parent: FrameNode, child: SceneNode, label: string): boolean {
    try {
        parent.appendChild(child);
        return true;
    } catch (err) {
        try {
            child.remove();
        } catch {
            // Ignore cleanup errors.
        }
        postLog(`Не удалось добавить ${label} в ${parent.name}: ${String((err as any)?.message || err)}`);
        return false;
    }
}

function removeGeneratedQr(root: FrameNode | InstanceNode) {
    const nodes = root.findAll(node => node.name === "VideoQrGenerated") as SceneNode[];
    for (const node of nodes) {
        try {
            node.remove();
        } catch {
            // Ignore stale generated QR nodes.
        }
    }
}

function resizeQrNode(node: SceneNode, width: number, height: number) {
    const resizable = node as SceneNode & {
        resizeWithoutConstraints?: (width: number, height: number) => void;
        resize?: (width: number, height: number) => void;
    };
    try {
        resizable.resizeWithoutConstraints?.(width, height);
    } catch {
        try {
            resizable.resize?.(width, height);
        } catch {
            // Keep SVG size if Figma refuses resizing.
        }
    }
}

function safeSetVisible(node: SceneNode | null, visible: boolean, label: string) {
    if (!node) return;
    try {
        node.visible = visible;
    } catch (err) {
        postLog(`Не удалось переключить видимость ${label}: ${String((err as any)?.message || err)}`);
    }
}

function trySetAbsoluteLayout(node: SceneNode) {
    try {
        (node as any).layoutPositioning = "ABSOLUTE";
    } catch {
        // Not every node/parent supports absolute layout positioning.
    }
}

function getRelativePosition(node: SceneNode, ancestor: SceneNode): { x: number; y: number } {
    const nodeAbs = node.absoluteTransform;
    const ancestorAbs = ancestor.absoluteTransform;
    return {
        x: Math.round(nodeAbs[0][2] - ancestorAbs[0][2]),
        y: Math.round(nodeAbs[1][2] - ancestorAbs[1][2])
    };
}

function setTextHyperlink(node: TextNode, url?: string | null) {
    const href = normalizeUrlLocal(url);
    if (!href || !node.characters) return;
    try {
        (node as any).setRangeHyperlink(0, node.characters.length, {
            type: "URL",
            value: href
        });
    } catch (err) {
        postLog(`Не удалось поставить ссылку на ${node.name}: ${String((err as any)?.message || err)}`);
    }
}

function normalizeUrlLocal(value?: string | null): string {
    const text = String(value || "").replace(/\\\//g, "/").trim();
    return /^https?:\/\//i.test(text) ? text : "";
}

function normalizeNameLocal(name: string): string {
    return name.replace(/[\s#\u00A0]/g, "").toLowerCase();
}

function getOrCreateListFrame(card: FrameNode): FrameNode | null {
    const listCandidates = card.findAll(n => normalizeNameLocal(n.name) === "listcontainer") as SceneNode[];
    let listNode: SceneNode | null = null;

    if (listCandidates.length > 0) {
        const frameCandidates = listCandidates.filter(n => n.type === 'FRAME') as FrameNode[];
        if (frameCandidates.length > 0) {
            frameCandidates.sort((a, b) => (b.width * b.height) - (a.width * a.height));
            listNode = frameCandidates.find(n => n.visible) || frameCandidates[0];
        } else {
            const instCandidates = listCandidates.filter(n => n.type === 'INSTANCE') as InstanceNode[];
            listNode = instCandidates.find(n => n.visible) || instCandidates[0] || listCandidates[0];
        }
    }

    const lockedInstance = listNode ? findInstanceAncestorBefore(listNode, card) : null;
    if (lockedInstance) {
        try {
            lockedInstance.detachInstance();
            return getOrCreateListFrame(card);
        } catch (err) {
            postLog(`Не удалось detach instance вокруг ListContainer: ${String((err as any)?.message || err)}`);
        }
    }

    if (lockedInstance) return null;

    if (listNode && listNode.type === 'INSTANCE') {
        const detached = listNode.detachInstance();
        listNode = detached;
    }

    const textListNode = listNode as unknown as TextNode | null;
    if (textListNode && textListNode.type === "TEXT" && textListNode.parent && "children" in textListNode.parent) {
        const parent = textListNode.parent;
        const idx = parent.children.indexOf(textListNode);
        const frame = figma.createFrame();
        frame.name = CONFIG.LIST_CONTAINER;
        safeSetPosition(frame, textListNode.x, textListNode.y, "fallback list container");
        frame.resize(card.width, 1);
        frame.fills = [];
        parent.insertChild(Math.max(0, idx), frame);
        textListNode.remove();
        return frame;
    }
    if (listNode && "children" in listNode) {
        return listNode as FrameNode;
    }

    return null;
}

function findInstanceAncestorBefore(node: SceneNode, stopAt: BaseNode): InstanceNode | null {
    let parent = node.parent;
    while (parent && parent !== stopAt) {
        if (parent.type === "INSTANCE") return parent;
        parent = parent.parent;
    }
    return null;
}

function prepareListFrame(list: FrameNode, card: FrameNode) {
    list.layoutMode = "VERTICAL";
    list.primaryAxisSizingMode = "AUTO";
    list.counterAxisSizingMode = "FIXED";
    list.primaryAxisAlignItems = "MIN";
    list.counterAxisAlignItems = "MIN";
    list.itemSpacing = CONFIG.ITEM_GAP;
    list.clipsContent = false;
    list.visible = true;
    list.opacity = 1;
    enableHugHeight(card);
    let p: BaseNode | null = list.parent;
    while (p && p.type !== "PAGE") {
        if ("clipsContent" in p) (p as any).clipsContent = false;
        p = (p as any).parent || null;
    }
}

async function createFilledRow(rowMaster: ComponentNode, item: Variant, rowIndex: number, baseDiscountRaw?: string | null): Promise<SceneNode> {
    let rowNode: InstanceNode;
    try {
        rowNode = rowMaster.createInstance();
    } catch (err) {
        const fresh = await getComponentByKey(KEY_ROW_ITEM);
        if (!fresh) throw err;
        rowMaster = fresh;
        rowNode = rowMaster.createInstance();
    }
    rowNode.resize(COL_W, rowNode.height);
    rowNode.visible = true;
    rowNode.opacity = 1;
    rowNode.fills = [];
    await fillRowData(rowNode, item, baseDiscountRaw);
    return rowNode;
}

async function appendRowsToCardList(
    list: FrameNode,
    card: FrameNode,
    rowMaster: ComponentNode,
    items: Variant[],
    baseDiscountRaw?: string | null,
    rowOffset: number = 0,
    allowFallback: boolean = true
) {
    const lockedInstance = findInstanceAncestorBefore(list, card);
    if (lockedInstance) {
        try {
            lockedInstance.detachInstance();
            const nextList = getOrCreateListFrame(card) || createFallbackListFrame(card);
            if (!nextList || nextList === list) {
                postLog(`ListContainer locked in instance for ${card.name}`);
                if (allowFallback) {
                    const fallback = createFallbackListFrameFromList(card, list);
                    await appendRowsToCardList(fallback, card, rowMaster, items, baseDiscountRaw, rowOffset, false);
                }
                return;
            }
            await appendRowsToCardList(nextList, card, rowMaster, items, baseDiscountRaw, rowOffset);
            return;
        } catch (err) {
            postLog(`Не удалось разблокировать ListContainer в ${card.name}: ${String((err as any)?.message || err)}`);
            return;
        }
    }
    prepareListFrame(list, card);
    for (let i = 0; i < items.length; i++) {
        const rowNode = await createFilledRow(rowMaster, items[i], rowOffset + i, baseDiscountRaw);
        if (list.layoutMode !== "NONE") {
            (rowNode as InstanceNode).layoutAlign = "STRETCH";
        }
        try {
            list.appendChild(rowNode);
        } catch (err) {
            rowNode.remove();
            postLog(`Не удалось добавить строку ${items[i]?.sku || ""} в ${card.name}: ${String((err as any)?.message || err)}`);
            return;
        }
        if (i < items.length - 1) {
            try {
                list.appendChild(createRowSeparator());
            } catch (err) {
                postLog(`Не удалось добавить разделитель строк в ${card.name}: ${String((err as any)?.message || err)}`);
            }
        }
    }
    fallbackResizeOnlyIfHugFailed(list, card);
}

function createRowSeparator(): FrameNode {
    const separator = figma.createFrame();
    separator.name = "rowSeparator";
    separator.resize(COL_W, 0.5);
    separator.fills = [{ type: "SOLID", color: { r: 0.86, g: 0.86, b: 0.86 } }];
    separator.clipsContent = false;
    separator.layoutAlign = "STRETCH";
    return separator;
}

// Fill full card content including rows.
export async function fillCardData(card: FrameNode, group: Group, rowMaster: ComponentNode) {
    await fillCardStatic(card, group);
    const list = getOrCreateListFrame(card) || createFallbackListFrame(card);
    if (!list) {
        postLog(`ListContainer not found in ${card.name}`);
        return;
    }
    clearProductRows(list);
    await appendRowsToCardList(list, card, rowMaster, group.items, group.discountText || null, 0);
}

function clearProductRows(list: FrameNode) {
    for (const child of [...list.children]) {
        if (shouldKeepListChild(child)) continue;
        child.remove();
    }
}

function shouldKeepListChild(node: SceneNode): boolean {
    const name = normalizeNameLocal(node.name || "");
    return name === "heading" ||
        name === "header" ||
        name === "tableheader" ||
        name === "listheader" ||
        name === "columns" ||
        name === "columnnames" ||
        name === "шапка" ||
        name === "заголовок";
}

function createFallbackListFrame(card: FrameNode): FrameNode | null {
    const frame = figma.createFrame();
    frame.name = CONFIG.LIST_CONTAINER;
    safeSetPosition(frame, 0, Math.max(0, card.height - 1), "fallback list frame");
    frame.resize(card.width, 1);
    frame.fills = [];
    card.appendChild(frame);
    postLog(`Created fallback ListContainer in ${card.name}`);
    return frame;
}

function createFallbackListFrameFromList(card: FrameNode, sourceList: FrameNode): FrameNode {
    const frame = figma.createFrame();
    frame.name = CONFIG.LIST_CONTAINER;
    const pos = getRelativePosition(sourceList, card);
    safeSetPosition(frame, pos.x, pos.y, "fallback list frame");
    frame.resize(sourceList.width || card.width, Math.max(1, sourceList.height || 1));
    frame.fills = [];
    safeAppendChild(card, frame, "fallback ListContainer");
    postLog(`Created fallback ListContainer from locked list in ${card.name}`);
    return frame;
}

function enableHugHeight(node: FrameNode) {
    try {
        if (node.layoutMode === "VERTICAL") {
            node.primaryAxisSizingMode = "AUTO";
        } else if (node.layoutMode === "HORIZONTAL") {
            node.counterAxisSizingMode = "AUTO";
        }
    } catch {
        // Some detached legacy frames may reject auto-layout sizing changes.
    }
}

function fallbackResizeOnlyIfHugFailed(list: FrameNode, card: FrameNode) {
    const rows = [...list.children] as SceneNode[];
    if (rows.length === 0) return;
    const contentH = rows.reduce((sum, row) => sum + row.height, 0) +
        Math.max(0, rows.length - 1) * CONFIG.ITEM_GAP;
    const targetListH = Math.max(1, contentH);
    const listBottom = list.y + targetListH;

    if (list.height + 1 < targetListH && list.layoutMode === "NONE") {
        try {
            list.resize(list.width || card.width, targetListH);
        } catch {
            // Keep auto-layout result if Figma refuses fallback resize.
        }
    }

    if (listBottom > card.height + 1 && card.layoutMode === "NONE") {
        try {
            card.resize(card.width, listBottom);
        } catch {
            // Keep component size if Figma refuses fallback resizing.
        }
    }
}

// Build split cards directly from row counts and available height.
export async function buildSplitCards(
    cardMaster: ComponentNode,
    rowMaster: ComponentNode,
    group: Group,
    maxColH: number,
    firstChunkMaxColH?: number,
    metrics?: SplitMetrics
): Promise<FrameNode[]> {
    const splitMetrics: SplitMetrics = metrics || {
        minCardHeight: CONFIG.MIN_CARD_HEIGHT,
        baseRows: CONFIG.BASE_CARD_ROWS,
        rowGrowth: CONFIG.ESTIMATED_ROW_HEIGHT
    };

    const baseCard = cardMaster.createInstance().detachInstance();
    baseCard.name = group.mainSku ? `Card${String(group.mainSku)}` : "Unknown SKU";
    await fillCardStatic(baseCard, group);

    const baseList = getOrCreateListFrame(baseCard);
    if (!baseList) return [baseCard];
    prepareListFrame(baseList, baseCard);

    const firstCapacity = Math.max(1, getRowCapacityForHeight(firstChunkMaxColH ?? maxColH, splitMetrics));
    const defaultCapacity = Math.max(1, getRowCapacityForHeight(maxColH, splitMetrics));
    const keepHeaderForAll = group.items.length > splitMetrics.baseRows;

    const chunks: number[][] = [];
    let cursor = 0;
    let capacity = firstCapacity;
    while (cursor < group.items.length) {
        const nextCursor = Math.min(group.items.length, cursor + capacity);
        const chunk: number[] = [];
        for (let i = cursor; i < nextCursor; i++) {
            chunk.push(i);
        }
        chunks.push(chunk);
        cursor = nextCursor;
        capacity = defaultCapacity;
    }

    if (chunks.length <= 1) {
        await appendRowsToCardList(baseList, baseCard, rowMaster, group.items, group.discountText || null, 0);
        return [baseCard];
    }

    const cards: FrameNode[] = [];
    for (let i = 0; i < chunks.length; i++) {
        const card = i === 0 ? baseCard : cardMaster.createInstance().detachInstance();
        if (i > 0) {
            card.name = group.mainSku ? `Card${String(group.mainSku)}-p${i + 1}` : `Unknown SKU-p${i + 1}`;
            await fillCardStatic(card, group);
        }

        const list = getOrCreateListFrame(card);
        if (!list) {
            cards.push(card);
            continue;
        }

        prepareListFrame(list, card);
        clearProductRows(list);

        const chunkItems = chunks[i].map(index => group.items[index]);
        await appendRowsToCardList(list, card, rowMaster, chunkItems, group.discountText || null, chunks[i][0] || 0);

        if (i === 0) {
            const desc = card.findOne(n => n.name === CONFIG.DESCRIPTION && n.type === 'TEXT') as TextNode | null;
            if (desc) desc.visible = false;
        } else {
            hideCardHeader(card, keepHeaderForAll);
            const desc = card.findOne(n => n.name === CONFIG.DESCRIPTION && n.type === 'TEXT') as TextNode | null;
            if (desc) desc.visible = true;
        }
        cards.push(card);
    }

    return cards;
}

// Keep legacy split API if some call site still uses it.
export function splitCardByRows(card: FrameNode, _maxColH: number, _firstChunkMaxColH?: number): FrameNode[] {
    return [card];
}

// Hide header elements for continuation cards.
function hideCardHeader(card: FrameNode, keepTitleLogo: boolean = false) {
    const hideNames = [
        ...(keepTitleLogo ? [] : [CONFIG.TITLE, CONFIG.LOGO]),
        CONFIG.DISCOUNT,
        CONFIG.SALE_STAR
    ];
    for (const name of hideNames) {
        const target = normalizeNameKey(name);
        const node = card.findOne(n => normalizeNameKey(n.name || "") === target) as SceneNode | null;
        if (node) node.visible = false;
    }
}

function normalizeDiscountValue(raw?: string | null): string | null {
    if (!raw) return null;
    const text = normalizeDiscountText(String(raw));
    return text ? text : null;
}

function getRowCapacityForHeight(height: number, metrics: SplitMetrics): number {
    if (!Number.isFinite(height) || height <= 0) return 1;
    if (height <= metrics.minCardHeight) return 1;
    const extraHeight = height - metrics.minCardHeight;
    const extraRows = Math.floor(extraHeight / Math.max(1, metrics.rowGrowth));
    return Math.max(1, metrics.baseRows + extraRows);
}

function postLog(text: string) {
    figma.ui.postMessage({ type: "log", text });
}
