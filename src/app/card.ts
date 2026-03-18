import { CONFIG, BRAND_MAPPING, COMPONENT_PROPERTY_NAME, KEY_ROW_ITEM, COL_W } from './config';
import {
    findTextInRow,
    loadFontForNode,
    getComponentByKey,
    findTextInNode,
    findNodeInCard,
    findNodeInRowByName,
    normalizeDiscountText
} from './utils';
import { Group, Variant } from './types';

export type SplitMetrics = {
    minCardHeight: number;
    baseRows: number;
    rowGrowth: number;
};

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
        [CONFIG.ROW_PRICE]: item.price
    };
    for (const [key, val] of Object.entries(map)) {
        const node = findTextInRow(row, key);
        if (node) {
            await loadFontForNode(node);
            node.characters = val ? String(val) : "-";
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
    const shouldShow = baseDiscount !== null && rowDiscount !== null && baseDiscount !== rowDiscount;
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
    if (discountInfo) {
        await loadFontForNode(discountInfo);
        if (group.discountInfoText) {
            discountInfo.characters = String(group.discountInfoText);
            discountInfo.visible = true;
        } else {
            discountInfo.visible = false;
            discountInfo.characters = "";
        }
    }

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
                console.log(`Не удалось переключить бренд для ${group.brandId}. Error: ${err}`);
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
                logoNode.x = Math.round((container.width - logoNode.width) / 2);
                logoNode.y = Math.round((container.height - logoNode.height) / 2);
            }
            if ("clipsContent" in logoNode) {
                (logoNode as any).clipsContent = true;
            }
        } catch (err) {
            console.log("Не удалось изменить размер логотипа:", err);
        }
    }
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

    if (listNode && listNode.type === 'INSTANCE') {
        const parent = listNode.parent;
        const idx = parent ? parent.children.indexOf(listNode) : -1;
        const detached = listNode.detachInstance();
        if (parent && idx >= 0) parent.insertChild(idx, detached);
        listNode = detached;
    }

    if (listNode && "children" in listNode) {
        return listNode as FrameNode;
    }
    if (listNode && listNode.type === "TEXT" && listNode.parent && "children" in listNode.parent) {
        const parent = listNode.parent;
        const idx = parent.children.indexOf(listNode);
        const frame = figma.createFrame();
        frame.name = CONFIG.LIST_CONTAINER;
        frame.x = listNode.x;
        frame.y = listNode.y;
        frame.resize(card.width, 1);
        frame.fills = [];
        parent.insertChild(Math.max(0, idx), frame);
        listNode.remove();
        return frame;
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
    if (list.width < 10) {
        list.resize(card.width, Math.max(1, list.height));
    }
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
    if (rowIndex % 2 !== 0) {
        rowNode.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.96 } }];
    }
    await fillRowData(rowNode, item, baseDiscountRaw);
    return rowNode;
}

async function appendRowsToCardList(
    list: FrameNode,
    card: FrameNode,
    rowMaster: ComponentNode,
    items: Variant[],
    baseDiscountRaw?: string | null,
    rowOffset: number = 0
) {
    prepareListFrame(list, card);
    for (let i = 0; i < items.length; i++) {
        const rowNode = await createFilledRow(rowMaster, items[i], rowOffset + i, baseDiscountRaw);
        if (list.layoutMode !== "NONE") {
            (rowNode as InstanceNode).layoutAlign = "STRETCH";
        }
        list.appendChild(rowNode);
    }
}

// Fill full card content including rows.
export async function fillCardData(card: FrameNode, group: Group, rowMaster: ComponentNode) {
    await fillCardStatic(card, group);
    const list = getOrCreateListFrame(card);
    if (!list) {
        console.warn("ListContainer not found in ProductCard");
        return;
    }
    await appendRowsToCardList(list, card, rowMaster, group.items, group.discountText || null, 0);
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
    baseCard.resize(COL_W, baseCard.height);
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
            card.resize(COL_W, card.height);
            await fillCardStatic(card, group);
        }

        const list = getOrCreateListFrame(card);
        if (!list) {
            cards.push(card);
            continue;
        }

        prepareListFrame(list, card);
        for (const child of [...list.children]) child.remove();

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
        const node = card.findOne(n => n.name === name) as SceneNode | null;
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
