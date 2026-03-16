import { CONFIG, BRAND_MAPPING, COMPONENT_PROPERTY_NAME, KEY_ROW_ITEM } from './config';
import { findTextInRow, loadFontForNode, getComponentByKey, findTextInNode, findNodeInCard, findNodeInRowByName, normalizeDiscountText } from './utils';
import { Group, Variant } from './types';

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
    if (itemSaleText) itemSaleText.characters = "";
    const baseDiscount = normalizeDiscountValue(baseDiscountRaw);
    const rowDiscount = normalizeDiscountValue(item?.discount);
    const shouldShow = baseDiscount !== null && rowDiscount !== null && baseDiscount !== rowDiscount;
    if (shouldShow && itemSaleNode) itemSaleNode.visible = true;
    if (shouldShow && itemSaleText) {
        await loadFontForNode(itemSaleText);
        itemSaleText.characters = normalizeDiscountText(String(item.discount || ""));
    }
}

// Fill card content, images, logos, and rows.
export async function fillCardData(card: FrameNode, group: Group, rowMaster: ComponentNode) {
    card.clipsContent = false;

    const title = card.findOne(n => n.name === CONFIG.TITLE && n.type === 'TEXT') as TextNode;
    if (title) {
        await loadFontForNode(title);
        title.characters = group.headerName.toUpperCase();
    }

    const descLayer = card.findOne(n => n.name === CONFIG.DESCRIPTION && n.type === 'TEXT') as TextNode;
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
        }
    }

    const imgNode = card.findOne(n => n.name === CONFIG.IMAGE) as SceneNode;
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

    const logoNode = card.findOne(n => n.name === CONFIG.LOGO && n.type === 'INSTANCE') as InstanceNode;
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
                console.log(`Не удалось переключить бренд для ${group.brandId}. Проверьте имя свойства. Error: ${err}`);
            }
        }
        try {
            let container: (SceneNode & { width?: number; height?: number; layoutMode?: string }) | null =
                (logoNode.parent as any) || null;
            while (container && container.type !== "FRAME" && container.type !== "INSTANCE") {
                container = (container.parent as any) || null;
            }

            const maxW = 70;
            const limitW = container?.width ? Math.min(maxW, container.width) : maxW;
            const limitH = container?.height ? container.height : logoNode.height;

            const scale = Math.min(
                1,
                limitW / logoNode.width,
                limitH / logoNode.height
            );
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

    const normalizeName = (s: string) => s.replace(/[\s#\u00A0]/g, "").toLowerCase();
    const listCandidates = card.findAll(n => normalizeName(n.name) === "listcontainer") as SceneNode[];
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
        listNode = detached as SceneNode;
    }

    let list: FrameNode | null = null;
    if (listNode && "children" in listNode) {
        list = listNode as FrameNode;
    } else if (listNode && listNode.type === "TEXT" && listNode.parent && "children" in listNode.parent) {
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
        list = frame;
    }

    if (list) {
        if ("layoutMode" in list) {
            list.layoutMode = "VERTICAL";
            list.primaryAxisSizingMode = "AUTO";
            list.counterAxisSizingMode = "FIXED";
            list.primaryAxisAlignItems = "MIN";
            list.counterAxisAlignItems = "MIN";
            list.itemSpacing = CONFIG.ITEM_GAP;
            list.clipsContent = false;
        }
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

        for (let i = 0; i < group.items.length; i++) {
            const item = group.items[i];
            let rowNode: InstanceNode;
            try {
                rowNode = rowMaster.createInstance();
            } catch (err) {
                const fresh = await getComponentByKey(KEY_ROW_ITEM);
                if (!fresh) throw err;
                rowMaster = fresh;
                rowNode = rowMaster.createInstance();
            }
            rowNode.resize(Math.max(list.width, card.width), rowNode.height);
            rowNode.visible = true;
            rowNode.opacity = 1;
            if (list.layoutMode !== "NONE") {
                rowNode.layoutAlign = "STRETCH";
            }
            if (i % 2 !== 0) {
                rowNode.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.96 } }];
            }
            await fillRowData(rowNode, item, group.discountText || null);
            list.appendChild(rowNode);
        }
    } else {
        figma.notify("Не найден #ListContainer в карточке", { timeout: 1500 });
    }
}




// Split a card into multiple cards if its list exceeds column height.
export function splitCardByRows(card: FrameNode, maxColH: number): FrameNode[] {
    const list = findListFrame(card);
    if (!list) return [card];

    const headerH = Math.max(0, card.height - list.height);
    const maxListH = maxColH - headerH;
    if (maxListH <= 0) return [card];

    const rows = list.children.filter(n => n.type === 'FRAME' || n.type === 'INSTANCE') as SceneNode[];
    if (rows.length === 0) return [card];

    const gap = (list as any).itemSpacing ?? CONFIG.ITEM_GAP;
    const maxRowsPerChunk = rows.length > 10 ? 10 : Number.POSITIVE_INFINITY;
    const keepHeaderForAll = rows.length > 10;
    const chunks: SceneNode[][] = [];
    let curr: SceneNode[] = [];
    let currH = 0;
    for (const row of rows) {
        const addGap = curr.length > 0 ? gap : 0;
        const nextH = currH + addGap + row.height;
        if ((nextH > maxListH && curr.length > 0) || curr.length >= maxRowsPerChunk) {
            chunks.push(curr);
            curr = [row];
            currH = row.height;
        } else {
            curr.push(row);
            currH = nextH;
        }
    }
    if (curr.length > 0) chunks.push(curr);
    if (chunks.length <= 1) return [card];

    const chunkClones = chunks.map(chunk => chunk.map(row => row.clone()));

    const cards: FrameNode[] = [];
    for (let i = 0; i < chunks.length; i++) {
        const cardNode = i === 0 ? card : (card.clone() as FrameNode);
        const listNode = findListFrame(cardNode);
        if (!listNode) {
            cards.push(cardNode);
            continue;
        }

        for (const child of [...listNode.children]) child.remove();

        for (const row of chunkClones[i]) {
            listNode.appendChild(row);
        }

        if (i === 0) {
            const desc = cardNode.findOne(n => n.name === CONFIG.DESCRIPTION && n.type === 'TEXT') as TextNode | null;
            if (desc) desc.visible = false;
        } else {
            hideCardHeader(cardNode, keepHeaderForAll);
            const desc = cardNode.findOne(n => n.name === CONFIG.DESCRIPTION && n.type === 'TEXT') as TextNode | null;
            if (desc) desc.visible = true;
        }
        cards.push(cardNode);
    }

    return cards;
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

// Find the list frame inside a card.
function findListFrame(card: FrameNode): FrameNode | null {
    const normalizeName = (s: string) => s.replace(/[\s#\u00A0]/g, "").toLowerCase();
    const listCandidates = card.findAll(n => normalizeName(n.name) === "listcontainer") as SceneNode[];
    if (listCandidates.length === 0) return null;
    const frameCandidates = listCandidates.filter(n => n.type === 'FRAME') as FrameNode[];
    if (frameCandidates.length > 0) {
        frameCandidates.sort((a, b) => (b.width * b.height) - (a.width * a.height));
        return frameCandidates.find(n => n.visible) || frameCandidates[0];
    }
    return null;
}
