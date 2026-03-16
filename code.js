"use strict";
// --- РљРћРќР¤РР“ ---
const CONFIG = {
    // Layout
    A4_W: 595,
    A4_H: 842,
    PAD_X: 20,
    PAD_Y: 30,
    COL_GAP: 20,
    COL_W: 268,
    ITEM_GAP: 2,
    COL_W_REDUCE: 20,
    FIRST_PAGE_SHIFT_DEFAULT: 1 / 3,
    FIRST_PAGE_SHIFT_TWO_THIRDS: 2 / 3,
    // Node names
    LIST_CONTAINER: "#ListContainer",
    TITLE: "#Title",
    DESCRIPTION: "#Description",
    DISCOUNT: "productDiscount",
    IMAGE: "#Image",
    LOGO: "Main Logotypes",
    ROW_SKU: "#SKU",
    ROW_SPECS: "#Specs",
    ROW_MIN: "#Min",
    ROW_QTY: "#Qty",
    ROW_PRICE: "#Price",
    ROW_ITEM_SALE: "itemSale",
    ROW_ITEM_SALE_DISCOUNT: "priceProductDiscount",
    SALE_STAR: "saleStar",
    // Debug
    INSERT_DEBUG_TEXT_IN_LIST: false,
    FOOTER_H: 110
};
let A4_W = CONFIG.A4_W;
let A4_H = CONFIG.A4_H;
let PAD_X = CONFIG.PAD_X;
let PAD_Y = CONFIG.PAD_Y;
let COL_GAP = CONFIG.COL_GAP;
let COL_W = CONFIG.COL_W;
let ITEM_GAP = CONFIG.ITEM_GAP;
let FOOTER_H = CONFIG.FOOTER_H;
let MAX_COL_H = A4_H - (PAD_Y * 2);
let COL_W_CALC = ((A4_W - (PAD_X * 2) - COL_GAP) / 2) - CONFIG.COL_W_REDUCE;
let FIRST_PAGE_SHIFT_DEFAULT = Math.round(A4_H * CONFIG.FIRST_PAGE_SHIFT_DEFAULT);
let FIRST_PAGE_SHIFT_TWO_THIRDS = Math.round(A4_H * CONFIG.FIRST_PAGE_SHIFT_TWO_THIRDS);
function recalcLayout() {
    A4_W = CONFIG.A4_W;
    A4_H = CONFIG.A4_H;
    PAD_X = CONFIG.PAD_X;
    PAD_Y = CONFIG.PAD_Y;
    COL_GAP = CONFIG.COL_GAP;
    COL_W = CONFIG.COL_W;
    ITEM_GAP = CONFIG.ITEM_GAP;
    FOOTER_H = CONFIG.FOOTER_H;
    MAX_COL_H = A4_H - (PAD_Y * 2);
    COL_W_CALC = ((A4_W - (PAD_X * 2) - COL_GAP) / 2) - CONFIG.COL_W_REDUCE;
    COL_W = Number.isFinite(CONFIG.COL_W) ? CONFIG.COL_W : COL_W_CALC;
    FIRST_PAGE_SHIFT_DEFAULT = Math.round(A4_H * CONFIG.FIRST_PAGE_SHIFT_DEFAULT);
    FIRST_PAGE_SHIFT_TWO_THIRDS = Math.round(A4_H * CONFIG.FIRST_PAGE_SHIFT_TWO_THIRDS);
}
function applyConfigOverrides(overrides) {
    if (!overrides)
        return;
    if (Number.isFinite(overrides.A4_W))
        CONFIG.A4_W = overrides.A4_W;
    if (Number.isFinite(overrides.A4_H))
        CONFIG.A4_H = overrides.A4_H;
    if (Number.isFinite(overrides.PAD_X))
        CONFIG.PAD_X = overrides.PAD_X;
    if (Number.isFinite(overrides.PAD_Y))
        CONFIG.PAD_Y = overrides.PAD_Y;
    if (Number.isFinite(overrides.COL_GAP))
        CONFIG.COL_GAP = overrides.COL_GAP;
    if (Number.isFinite(overrides.COL_W))
        CONFIG.COL_W = overrides.COL_W;
    if (Number.isFinite(overrides.ITEM_GAP))
        CONFIG.ITEM_GAP = overrides.ITEM_GAP;
    if (Number.isFinite(overrides.COL_W_REDUCE))
        CONFIG.COL_W_REDUCE = overrides.COL_W_REDUCE;
    if (Number.isFinite(overrides.FIRST_PAGE_SHIFT_DEFAULT))
        CONFIG.FIRST_PAGE_SHIFT_DEFAULT = overrides.FIRST_PAGE_SHIFT_DEFAULT;
    if (Number.isFinite(overrides.FIRST_PAGE_SHIFT_TWO_THIRDS))
        CONFIG.FIRST_PAGE_SHIFT_TWO_THIRDS = overrides.FIRST_PAGE_SHIFT_TWO_THIRDS;
    if (Number.isFinite(overrides.FOOTER_H))
        CONFIG.FOOTER_H = overrides.FOOTER_H;
    recalcLayout();
}
// ==========================================
// РќРђРЎРўР РћР™РљРђ Р‘Р Р•РќР”РћР’ (Р РµРґР°РєС‚РёСЂСѓР№С‚Рµ СЌС‚Рѕ РјРµСЃС‚Рѕ)
// ==========================================
const BRAND_MAPPING = {
    "1": "Polytech",
    "2": "Pobedit",
    "3": "Russia",
    "4": "Polyagro",
    "5": "Germez",
    "6": "Ekotools",
    "7": "Superpen",
    "8": "PolyagroGold",
    "9": "Guppy",
    "10": "Polytech Quality",
    "11": "PolyagroCamp",
    "12": "PolyagroLite",
    "14": "Waterley",
    "15": "JilionSP",
    "16": "JilionPT",
    "17": "PobeditMotor",
    "20": "Ekofoam",
    "21": "PobeditThor",
    "22": "PobeditThor",
    "23": "PobeditThor",
    "24": "Shahter",
    "25": "Koplich",
    "26": "Kopalovna",
    "27": "PolyagroAqua",
    "28": "Hokku",
    "29": "Severyanin",
    "30": "FuksiaM",
    "31": "TORX",
    "32": "Nordeco",
};
const COMPONENT_PROPERTY_NAME = "Brand";
const LIBRARY_NAME = "Ptech.Library";
const LIB_COMPONENT_BANNER = "Banner";
const LIB_COMPONENT_CARD = "ProductCard";
const LIB_COMPONENT_ROW = "RowItem";
const KEY_BANNER = "360d86e3ecd75b74a07dd1c65a1409edc733b258";
const KEY_PRODUCT_CARD = "c9e7fb28e39f84e56ff881819a198f62ec0a6073";
const KEY_ROW_ITEM = "781e1213978776223960d4dacc2bd66c0306e43e";
const KEY_MAIN_LOGOTYPES_SET = "3c0b8732f057d32fe14841dd1885fdd36851b661";
const KEY_FOOTER = "d77e854d909571f399e78bbab3103ad48d9e9848";
figma.showUI(__html__, { width: 340, height: 650 });
figma.ui.onmessage = async (msg) => {
    try {
        // figma.notify("NEW BUILD LOADED", { timeout: 1000 });
        // figma.notify(`msg.type=${msg.type}`, { timeout: 1000 });
        if (msg.type === 'build') {
            await loadFonts();
            const payload = msg.data || {};
            const groups = Array.isArray(payload) ? payload : payload.groups;
            const layout = Array.isArray(payload) ? {} : (payload.layout || {});
            applyConfigOverrides(layout.settings);
            // figma.notify(`build: groups=${groups?.length || 0}`, { timeout: 1500 });
            await createBrochure(groups || [], layout);
        }
        if (msg.type === 'update-info') {
            await loadFonts();
            await updateInfoOnPage(msg.data);
        }
    }
    catch (e) {
        figma.notify(e.message, { error: true });
        figma.ui.postMessage({ type: 'error', text: e.message });
    }
};
async function loadFonts() {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
}
// === Р›РћР“РРљРђ РЎРљРР”РћРљ ===
async function updateInfoOnPage(payload) {
    const infoMap = (payload === null || payload === void 0 ? void 0 : payload.infoMap) || {};
    const updatePrice = (payload === null || payload === void 0 ? void 0 : payload.updatePrice) !== undefined
        ? !!payload.updatePrice
        : Object.values(infoMap).some((v) => (v === null || v === void 0 ? void 0 : v.price) && String(v.price).trim() !== "");
    const codes = Object.keys(infoMap);
    console.log("[update-info] payload keys:", Object.keys(payload || {}));
    console.log("[update-info] updatePrice:", updatePrice);
    console.log("[update-info] codes count:", codes.length);
    console.log("[update-info] sample codes:", codes.slice(0, 10));
    if (codes.length === 0) {
        figma.ui.postMessage({ type: 'complete', text: "Р”Р°РЅРЅС‹Рµ РЅРµ РЅР°Р№РґРµРЅС‹." });
        return;
    }
    let updatedDiscounts = 0;
    let updatedPrices = 0;
    let foundCards = 0;
    // 1) РћР±РЅРѕРІР»СЏРµРј СЃРєРёРґРєРё РЅР° РєР°СЂС‚РѕС‡РєР°С… РїРѕ РёРјРµРЅРё CardРљРћР”
    for (const code of codes) {
        const cardName = `Card${code}`;
        const card = figma.root.findOne(n => (n.type === "FRAME" || n.type === "INSTANCE") && n.name === cardName);
        let targetCard = card;
        // ВАЖНО: скидку обновляем только для главных карточек (Card<SKU>).
        // Иначе при поиске по SKU строки можно перезаписать скидку другой карточки.
        if (!targetCard) {
            console.log("[update-info] card not found for code:", code);
        }
        if (!targetCard)
            continue;
        foundCards++;
        const entry = infoMap[code] || {};
        const newDiscount = entry.discount;
        const discountLayer = findTextInNode(targetCard, CONFIG.DISCOUNT);
        const saleStarNode = findNodeInCard(targetCard, CONFIG.SALE_STAR);
        if (discountLayer) {
            await loadFontForNode(discountLayer);
            const hasDiscount = newDiscount !== undefined && newDiscount !== null && String(newDiscount).trim() !== "";
            if (hasDiscount) {
                discountLayer.characters = normalizeDiscountText(String(newDiscount));
                discountLayer.visible = true;
                if (saleStarNode)
                    saleStarNode.visible = true;
                updatedDiscounts++;
            }
            else {
                discountLayer.visible = false;
                if (saleStarNode)
                    saleStarNode.visible = false;
            }
        }
        else {
            console.log("[update-info] discount layer not found in card:", targetCard.name);
        }
    }
    // 2) РћР±РЅРѕРІР»СЏРµРј С†РµРЅС‹ РІ СЃС‚СЂРѕРєР°С… С‚Р°Р±Р»РёС†С‹ РїРѕ Р°СЂС‚РёРєСѓР»Сѓ РёР· #SKU
    if (updatePrice) {
        const cards = figma.root.findAll(n => (n.type === "FRAME" || n.type === "INSTANCE") && n.name.startsWith("Card"));
        console.log("[update-info] cards for price scan:", cards.length);
        for (const card of cards) {
            const list = card.findOne(n => n.name === CONFIG.LIST_CONTAINER && n.type === 'FRAME');
            if (!list)
                continue;
            for (const row of list.children) {
                const priceNode = row.findOne(n => n.name === CONFIG.ROW_PRICE && n.type === 'TEXT');
                if (!priceNode)
                    continue;
                let sku = "";
                if (row.name) {
                    sku = String(row.name).trim();
                }
                else {
                    const skuNode = row.findOne(n => n.name === CONFIG.ROW_SKU && n.type === 'TEXT');
                    if (skuNode === null || skuNode === void 0 ? void 0 : skuNode.characters) {
                        sku = skuNode.characters.trim();
                    }
                    else {
                        const anyText = row.findOne(n => n.type === 'TEXT');
                        if (anyText === null || anyText === void 0 ? void 0 : anyText.characters)
                            sku = anyText.characters.trim();
                    }
                }
                if (!sku)
                    continue;
                const entry = infoMap[sku];
                const newPrice = entry === null || entry === void 0 ? void 0 : entry.price;
                if (!newPrice || String(newPrice).trim() === "")
                    continue;
                await loadFontForNode(priceNode);
                priceNode.characters = normalizePriceText(String(newPrice));
                updatedPrices++;
            }
        }
    }
    // 3) РћР±РЅРѕРІР»СЏРµРј РґРѕРї. СЃРєРёРґРєРё РІ С‚Р°Р±Р»РёС†Рµ (ItemSale)
    updateRowItemDiscounts(infoMap);
    console.log("[update-info] foundCards:", foundCards, "updatedDiscounts:", updatedDiscounts, "updatedPrices:", updatedPrices);
    updateSaleBannerInfo(infoMap);
    if (foundCards === 0 && updatedPrices === 0) {
        figma.ui.postMessage({ type: 'complete', text: "Cards not found." });
        return;
    }
    const pricePart = updatePrice ? `, prices: ${updatedPrices}` : "";
    figma.notify(`Updated discounts: ${updatedDiscounts}${pricePart}`);
    figma.ui.postMessage({ type: 'complete', text: `Done! Discounts: ${updatedDiscounts}${pricePart}` });
}
function updateRowItemDiscounts(infoMap) {
    var _a, _b;
    const cards = figma.root.findAll(n => (n.type === "FRAME" || n.type === "INSTANCE") && n.name.startsWith("Card"));
    for (const card of cards) {
        const list = card.findOne(n => n.name === CONFIG.LIST_CONTAINER && n.type === 'FRAME');
        if (!list)
            continue;
        const baseSku = ((_a = card.name) === null || _a === void 0 ? void 0 : _a.startsWith("Card")) ? card.name.slice(4) : "";
        const baseDiscountRaw = baseSku ? (_b = infoMap === null || infoMap === void 0 ? void 0 : infoMap[baseSku]) === null || _b === void 0 ? void 0 : _b.discount : null;
        const baseDiscount = discountComparable(baseDiscountRaw);
        for (const row of list.children) {
            let sku = "";
            if (row.name) {
                sku = String(row.name).trim();
            }
            else {
                const skuNode = row.findOne(n => n.name === CONFIG.ROW_SKU && n.type === 'TEXT');
                if (skuNode === null || skuNode === void 0 ? void 0 : skuNode.characters)
                    sku = skuNode.characters.trim();
            }
            if (!sku)
                continue;
            const entry = infoMap === null || infoMap === void 0 ? void 0 : infoMap[sku];
            const rowDiscountRaw = entry === null || entry === void 0 ? void 0 : entry.discount;
            const rowDiscount = discountComparable(rowDiscountRaw);
            const itemSaleNode = findNodeInRowByName(row, CONFIG.ROW_ITEM_SALE);
            const itemSaleText = findTextInRow(row, CONFIG.ROW_ITEM_SALE_DISCOUNT);
            const shouldShow = baseDiscount !== null && rowDiscount !== null && !discountEquals(baseDiscount, rowDiscount);
            if (itemSaleNode)
                itemSaleNode.visible = shouldShow;
            if (shouldShow && itemSaleText) {
                loadFontForNode(itemSaleText).then(() => {
                    itemSaleText.characters = normalizeDiscountText(String(rowDiscountRaw));
                });
            }
        }
    }
}
function discountComparable(raw) {
    if (raw === undefined || raw === null)
        return null;
    const text = String(raw).trim();
    if (!text)
        return null;
    const num = parseDiscountValue(text);
    if (num !== null)
        return num;
    return normalizeDiscountText(text);
}
function discountEquals(a, b) {
    if (a === null || b === null)
        return false;
    if (typeof a === "number" && typeof b === "number")
        return a === b;
    return String(a) === String(b);
}
function findCardByRowSku(sku) {
    const rowNode = figma.root.findOne(n => (n.type === 'FRAME' || n.type === 'INSTANCE') && n.name === sku);
    if (rowNode) {
        let current = rowNode.parent;
        while (current) {
            if ((current.type === "FRAME" || current.type === "INSTANCE") && current.name.startsWith("Card")) {
                return current;
            }
            current = current.parent;
        }
    }
    const skuNode = figma.root.findOne(n => { var _a; return n.type === 'TEXT' && n.name === '#SKU' && ((_a = n.characters) === null || _a === void 0 ? void 0 : _a.trim()) === sku; });
    if (!skuNode)
        return null;
    let current = skuNode.parent;
    while (current) {
        if ((current.type === "FRAME" || current.type === "INSTANCE") && current.name.startsWith("Card")) {
            return current;
        }
        current = current.parent;
    }
    return null;
}
// === Р›РћР“РРљРђ Р“Р•РќР•Р РђР¦РР ===
async function createBrochure(groups, layout) {
    figma.notify(`createBrochure: groups=${(groups === null || groups === void 0 ? void 0 : groups.length) || 0}`, { timeout: 1500 });
    let rowMaster = figma.root.findOne(n => n.type === 'COMPONENT' && n.name === 'RowItem');
    let cardMaster = figma.root.findOne(n => n.type === 'COMPONENT' && n.name === 'ProductCard');
    const cardFromKey = await getComponentByKey(KEY_PRODUCT_CARD);
    if (cardFromKey)
        cardMaster = cardFromKey;
    const rowFromKey = await getComponentByKey(KEY_ROW_ITEM);
    if (rowFromKey)
        rowMaster = rowFromKey;
    if (!rowMaster || rowMaster.removed) {
        rowMaster = await getComponentByKey(KEY_ROW_ITEM);
    }
    if (!cardMaster || cardMaster.removed) {
        cardMaster = await getComponentByKey(KEY_PRODUCT_CARD);
    }
    if (!rowMaster)
        throw new Error("РќРµС‚ РєРѕРјРїРѕРЅРµРЅС‚Р° RowItem (Р»РѕРєР°Р»СЊРЅРѕ РёР»Рё РІ Р±РёР±Р»РёРѕС‚РµРєРµ)!");
    if (!cardMaster)
        throw new Error("РќРµС‚ РєРѕРјРїРѕРЅРµРЅС‚Р° ProductCard (Р»РѕРєР°Р»СЊРЅРѕ РёР»Рё РІ Р±РёР±Р»РёРѕС‚РµРєРµ)!");
    const giftBlockEnabled = !!(layout === null || layout === void 0 ? void 0 : layout.giftBlockEnabled);
    const giftBlockMode = (layout === null || layout === void 0 ? void 0 : layout.giftBlockMode) || "twoThirds";
    const compactLayout = !!(layout === null || layout === void 0 ? void 0 : layout.compactLayout);
    const startOnSecondPage = giftBlockEnabled && giftBlockMode === "startSecond";
    const firstPageShift = giftBlockEnabled ? FIRST_PAGE_SHIFT_TWO_THIRDS : FIRST_PAGE_SHIFT_DEFAULT;
    let pageNum = startOnSecondPage ? 2 : 1;
    let lastPage = null;
    if (startOnSecondPage) {
        createBlankPage(1);
    }
    let currentLayout = createPageWithColumns(pageNum, pageNum === 1 ? firstPageShift : 0);
    lastPage = currentLayout.page;
    if (pageNum === 1) {
        const bannerComp = await getComponentByKey(KEY_BANNER);
        if (bannerComp) {
            const bannerInstance = bannerComp.createInstance();
            bannerInstance.x = 0;
            bannerInstance.y = 0;
            currentLayout.page.appendChild(bannerInstance);
        }
    }
    let activeColIndex = 0;
    let activeColumn = currentLayout.columns[0];
    const allColumns = [...currentLayout.columns];
    let processed = 0;
    let dbgCount = 0;
    for (const group of groups) {
        let instance;
        try {
            instance = cardMaster.createInstance();
        }
        catch (err) {
            // Try to re-import if node got removed
            const fresh = await getComponentByKey(KEY_PRODUCT_CARD);
            if (!fresh)
                throw err;
            cardMaster = fresh;
            instance = cardMaster.createInstance();
        }
        const cardFrame = instance.detachInstance();
        if (group.mainSku) {
            cardFrame.name = `Card${String(group.mainSku)}`;
        }
        else {
            cardFrame.name = "Unknown SKU";
        }
        cardFrame.resize(COL_W, cardFrame.height);
        if (dbgCount < 1) {
            figma.notify(`fillCardData enter: ${cardFrame.name}`, { timeout: 1500 });
        }
        await fillCardData(cardFrame, group, rowMaster);
        if (dbgCount < 1) {
            figma.notify(`fillCardData done: ${cardFrame.name}`, { timeout: 1500 });
            dbgCount++;
        }
        if (compactLayout) {
            let targetCol = findBestColumn(allColumns, cardFrame.height);
            if (!targetCol) {
                pageNum++;
                const newLayout = createPageWithColumns(pageNum, 0);
                lastPage = newLayout.page;
                allColumns.push(...newLayout.columns);
                targetCol = findBestColumn(allColumns, cardFrame.height) || newLayout.columns[0];
            }
            targetCol.appendChild(cardFrame);
        }
        else {
            const currentContentH = calculateContentHeight(activeColumn);
            const newH = currentContentH + ITEM_GAP + cardFrame.height;
            const colMaxH = activeColumn.height;
            if (newH > colMaxH && activeColumn.children.length > 0) {
                if (activeColIndex === 0) {
                    activeColIndex = 1;
                    activeColumn = currentLayout.columns[1];
                }
                else {
                    pageNum++;
                    currentLayout = createPageWithColumns(pageNum, 0);
                    lastPage = currentLayout.page;
                    allColumns.push(...currentLayout.columns);
                    activeColIndex = 0;
                    activeColumn = currentLayout.columns[0];
                }
            }
            activeColumn.appendChild(cardFrame);
        }
        processed++;
        if (processed % 3 === 0) {
            figma.ui.postMessage({
                type: 'progress',
                curr: processed,
                total: groups.length,
                text: `Р’РµСЂСЃС‚РєР°: ${processed} / ${groups.length}`
            });
            await new Promise(r => setTimeout(r, 10));
        }
    }
    if (lastPage) {
        await addFooterToPage(lastPage);
    }
    figma.ui.postMessage({ type: 'complete', text: "РљР°С‚Р°Р»РѕРі СѓСЃРїРµС€РЅРѕ СЃРѕР·РґР°РЅ!" });
}
function calculateContentHeight(col) {
    let h = 0;
    col.children.forEach(child => { h += child.height; });
    if (col.children.length > 0)
        h += (col.children.length - 1) * ITEM_GAP;
    return h;
}
function findBestColumn(columns, itemH) {
    let best = null;
    let bestRemaining = Infinity;
    for (const col of columns) {
        const currentH = calculateContentHeight(col);
        const gap = col.children.length > 0 ? ITEM_GAP : 0;
        const remaining = col.height - currentH - gap;
        if (remaining >= itemH && remaining < bestRemaining) {
            bestRemaining = remaining;
            best = col;
        }
    }
    return best;
}
function createBlankPage(num) {
    const page = figma.createFrame();
    page.name = `РЎС‚СЂР°РЅРёС†Р° ${num}`;
    page.resize(A4_W, A4_H);
    page.x = (num - 1) * (A4_W + 50);
    page.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    page.clipsContent = false;
    return page;
}
async function addFooterToPage(page) {
    const footerComp = await getComponentByKey(KEY_FOOTER);
    if (!footerComp)
        return;
    const footerInstance = footerComp.createInstance();
    footerInstance.x = 0;
    footerInstance.y = Math.max(0, A4_H - FOOTER_H);
    page.appendChild(footerInstance);
}
function getPageColumns(page) {
    const cols = page.findAll(n => n.type === "FRAME" && (n.name === "Left Column" || n.name === "Right Column"));
    return cols.sort((a, b) => a.x - b.x);
}
function collectOverflowCards(page, footerTop) {
    const overflow = [];
    const columns = getPageColumns(page);
    for (const col of columns) {
        const children = col.children
            .filter(n => n.type === "FRAME" || n.type === "INSTANCE")
            .sort((a, b) => a.y - b.y);
        let moveRest = false;
        for (const child of children) {
            const bottom = col.y + child.y + child.height;
            if (moveRest || bottom > footerTop) {
                moveRest = true;
                overflow.push(child);
            }
        }
    }
    return overflow;
}
function layoutCardsOnNewPages(cards, startPageNum, compactLayout) {
    let pageNum = startPageNum;
    let currentLayout = createPageWithColumns(pageNum, 0);
    let lastPage = currentLayout.page;
    let activeColIndex = 0;
    let activeColumn = currentLayout.columns[0];
    const allColumns = [...currentLayout.columns];
    for (const cardNode of cards) {
        const cardFrame = cardNode;
        if (compactLayout) {
            let targetCol = findBestColumn(allColumns, cardFrame.height);
            if (!targetCol) {
                pageNum++;
                const newLayout = createPageWithColumns(pageNum, 0);
                lastPage = newLayout.page;
                allColumns.push(...newLayout.columns);
                targetCol = findBestColumn(allColumns, cardFrame.height) || newLayout.columns[0];
            }
            targetCol.appendChild(cardFrame);
        }
        else {
            const currentContentH = calculateContentHeight(activeColumn);
            const newH = currentContentH + ITEM_GAP + cardFrame.height;
            const colMaxH = activeColumn.height;
            if (newH > colMaxH && activeColumn.children.length > 0) {
                if (activeColIndex === 0) {
                    activeColIndex = 1;
                    activeColumn = currentLayout.columns[1];
                }
                else {
                    pageNum++;
                    currentLayout = createPageWithColumns(pageNum, 0);
                    lastPage = currentLayout.page;
                    allColumns.push(...currentLayout.columns);
                    activeColIndex = 0;
                    activeColumn = currentLayout.columns[0];
                }
            }
            activeColumn.appendChild(cardFrame);
        }
    }
    return { lastPage, pageNum };
}
function relocateOverflowForFooter(lastPage, pageNum, compactLayout) {
    const footerTop = A4_H - FOOTER_H;
    let currentLast = lastPage;
    let currentPageNum = pageNum;
    for (let i = 0; i < 5; i++) {
        const overflow = collectOverflowCards(currentLast, footerTop);
        if (overflow.length === 0)
            break;
        const result = layoutCardsOnNewPages(overflow, currentPageNum + 1, compactLayout);
        currentLast = result.lastPage;
        currentPageNum = result.pageNum;
    }
    return { lastPage: currentLast, pageNum: currentPageNum };
}
function createPageWithColumns(num, shiftTopPx) {
    const page = figma.createFrame();
    page.name = `РЎС‚СЂР°РЅРёС†Р° ${num}`;
    page.resize(A4_W, A4_H);
    page.x = (num - 1) * (A4_W + 50);
    page.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    page.clipsContent = false;
    const leftCol = figma.createFrame();
    leftCol.name = "Left Column";
    leftCol.clipsContent = false;
    setupColumnStyle(leftCol, shiftTopPx);
    leftCol.x = PAD_X;
    leftCol.y = PAD_Y + shiftTopPx;
    page.appendChild(leftCol);
    const rightCol = figma.createFrame();
    rightCol.name = "Right Column";
    rightCol.clipsContent = false;
    setupColumnStyle(rightCol, shiftTopPx);
    rightCol.x = PAD_X + COL_W + COL_GAP;
    rightCol.y = PAD_Y + shiftTopPx;
    page.appendChild(rightCol);
    return { page, columns: [leftCol, rightCol] };
}
function setupColumnStyle(col, shiftTopPx) {
    const maxH = Math.max(0, MAX_COL_H - shiftTopPx);
    col.resize(COL_W, maxH);
    col.layoutMode = "VERTICAL";
    col.primaryAxisSizingMode = "FIXED";
    col.primaryAxisAlignItems = "SPACE_BETWEEN";
    col.counterAxisSizingMode = "FIXED";
    col.itemSpacing = ITEM_GAP;
    col.fills = [];
}
// --- Р—РђРџРћР›РќР•РќРР• РљРђР РўРћР§РљР ---
async function fillCardData(card, group, rowMaster) {
    var _a;
    card.clipsContent = false;
    // 1. Title
    const title = card.findOne(n => n.name === CONFIG.TITLE && n.type === 'TEXT');
    if (title) {
        await loadFontForNode(title);
        title.characters = group.headerName.toUpperCase();
    }
    // 2. Description
    const descLayer = card.findOne(n => n.name === CONFIG.DESCRIPTION && n.type === 'TEXT');
    if (descLayer) {
        await loadFontForNode(descLayer);
        if (group.descriptionText) {
            descLayer.characters = group.descriptionText;
            descLayer.visible = true;
        }
        else {
            descLayer.visible = false;
        }
    }
    // 3. Discount
    const discountLayer = findTextInNode(card, CONFIG.DISCOUNT);
    const saleStarNode = findNodeInCard(card, CONFIG.SALE_STAR);
    if (discountLayer) {
        await loadFontForNode(discountLayer);
        // По умолчанию при генерации скидка скрыта, показывается только при обновлении
        discountLayer.visible = false;
        discountLayer.characters = "";
    }
    if (saleStarNode)
        saleStarNode.visible = false;
    // 4. Image
    const imgNode = card.findOne(n => n.name === CONFIG.IMAGE);
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
    // 5. РќРћР’РћР•: Р›РћР“РћРўРРџ Р‘Р Р•РќР”Рђ (Main Logotypes)
    // РС‰РµРј РёРЅСЃС‚Р°РЅСЃ Р»РѕРіРѕС‚РёРїР° РІРЅСѓС‚СЂРё РєР°СЂС‚РѕС‡РєРё
    // РџСЂРё РїРѕРёСЃРєРµ РїРѕ РёРјРµРЅРё РјРѕР¶РµС‚ РЅР°Р№С‚РёСЃСЊ TextNode, РїРѕСЌС‚РѕРјСѓ РїСЂРѕРІРµСЂСЏРµРј type === 'INSTANCE'
    const logoNode = card.findOne(n => n.name === CONFIG.LOGO && n.type === 'INSTANCE');
    if (logoNode && group.brandId) {
        // РџРѕР»СѓС‡Р°РµРј РёРјСЏ РІР°СЂРёР°РЅС‚Р° РёР· РЅР°С€РµР№ РЅР°СЃС‚СЂРѕР№РєРё
        const targetVariantName = BRAND_MAPPING[group.brandId];
        if (targetVariantName) {
            // РџС‹С‚Р°РµРјСЃСЏ РѕРїСЂРµРґРµР»РёС‚СЊ РєРѕСЂСЂРµРєС‚РЅРѕРµ РёРјСЏ СЃРІРѕР№СЃС‚РІР°
            const cp = logoNode.componentProperties;
            let propName = COMPONENT_PROPERTY_NAME;
            if (!cp || !cp[propName]) {
                const variantKey = cp
                    ? (Object.keys(cp).find(k => { var _a; return ((_a = cp[k]) === null || _a === void 0 ? void 0 : _a.type) === "VARIANT"; }) || Object.keys(cp)[0])
                    : null;
                if (variantKey)
                    propName = variantKey;
            }
            try {
                const props = {};
                props[propName] = targetVariantName;
                logoNode.setProperties(props);
            }
            catch (err) {
                console.log(`РќРµ СѓРґР°Р»РѕСЃСЊ РїРµСЂРµРєР»СЋС‡РёС‚СЊ Р±СЂРµРЅРґ РґР»СЏ ${group.brandId}. РџСЂРѕРІРµСЂСЊС‚Рµ РёРјСЏ СЃРІРѕР№СЃС‚РІР°. Error: ${err}`);
            }
        }
        try {
            let container = logoNode.parent || null;
            while (container && container.type !== "FRAME" && container.type !== "INSTANCE") {
                container = container.parent || null;
            }
            const maxW = 70;
            const limitW = (container === null || container === void 0 ? void 0 : container.width) ? Math.min(maxW, container.width) : maxW;
            const limitH = (container === null || container === void 0 ? void 0 : container.height) ? container.height : logoNode.height;
            const scale = Math.min(1, limitW / logoNode.width, limitH / logoNode.height);
            if (scale < 1) {
                logoNode.resizeWithoutConstraints(Math.round(logoNode.width * scale), Math.round(logoNode.height * scale));
            }
            if ((container === null || container === void 0 ? void 0 : container.width) && (container === null || container === void 0 ? void 0 : container.height)) {
                logoNode.x = Math.round((container.width - logoNode.width) / 2);
                logoNode.y = Math.round((container.height - logoNode.height) / 2);
            }
            if ("clipsContent" in logoNode) {
                logoNode.clipsContent = true;
            }
        }
        catch (err) {
            console.log("РќРµ СѓРґР°Р»РѕСЃСЊ РёР·РјРµРЅРёС‚СЊ СЂР°Р·РјРµСЂ Р»РѕРіРѕС‚РёРїР°:", err);
        }
    }
    // 6. Table
    const normalizeName = (s) => s.replace(/[\s#\u00A0]/g, "").toLowerCase();
    const listCandidates = card.findAll(n => normalizeName(n.name) === "listcontainer");
    let listNode = null;
    if (listCandidates.length > 0) {
        const frameCandidates = listCandidates.filter(n => n.type === 'FRAME');
        if (frameCandidates.length > 0) {
            frameCandidates.sort((a, b) => (b.width * b.height) - (a.width * a.height));
            listNode = frameCandidates.find(n => n.visible) || frameCandidates[0];
        }
        else {
            const instCandidates = listCandidates.filter(n => n.type === 'INSTANCE');
            listNode = instCandidates.find(n => n.visible) || instCandidates[0] || listCandidates[0];
        }
    }
    if (listNode && listNode.type === 'INSTANCE') {
        const parent = listNode.parent;
        const idx = parent ? parent.children.indexOf(listNode) : -1;
        const detached = listNode.detachInstance();
        if (parent && idx >= 0)
            parent.insertChild(idx, detached);
        listNode = detached;
    }
    let list = null;
    if (listNode && "children" in listNode) {
        list = listNode;
    }
    else if (listNode && listNode.type === "TEXT" && listNode.parent && "children" in listNode.parent) {
        // РµСЃР»Рё СЌС‚Рѕ С‚РµРєСЃС‚, СЃРѕР·РґР°РµРј С„СЂРµР№Рј РЅР° РµРіРѕ РјРµСЃС‚Рµ
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
    // debug removed
    if (list) {
        figma.notify(`List found: ${list.name}, items=${((_a = group.items) === null || _a === void 0 ? void 0 : _a.length) || 0}`, { timeout: 1500 });
        if ("layoutMode" in list) {
            list.layoutMode = "VERTICAL";
            list.primaryAxisSizingMode = "AUTO";
            list.counterAxisSizingMode = "FIXED";
            list.primaryAxisAlignItems = "MIN";
            list.counterAxisAlignItems = "MIN";
            list.itemSpacing = ITEM_GAP;
            list.clipsContent = false;
        }
        list.visible = true;
        list.opacity = 1;
        if (list.width < 10) {
            list.resize(card.width, Math.max(1, list.height));
        }
        // Ensure parents don't clip
        let p = list.parent;
        while (p && p.type !== "PAGE") {
            if ("clipsContent" in p)
                p.clipsContent = false;
            p = p.parent || null;
        }
        if (CONFIG.INSERT_DEBUG_TEXT_IN_LIST) {
            const dbgText = figma.createText();
            await loadFontForNode(dbgText);
            dbgText.characters = "DEBUG ROW";
            dbgText.fontSize = 12;
            list.appendChild(dbgText);
        }
        for (let i = 0; i < group.items.length; i++) {
            const item = group.items[i];
            let rowNode;
            try {
                rowNode = rowMaster.createInstance();
            }
            catch (err) {
                const fresh = await getComponentByKey(KEY_ROW_ITEM);
                if (!fresh)
                    throw err;
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
            await fillRowData(rowNode, item);
            list.appendChild(rowNode);
        }
    }
    else {
        figma.notify("РќРµ РЅР°Р№РґРµРЅ #ListContainer РІ РєР°СЂС‚РѕС‡РєРµ", { timeout: 1500 });
    }
}
function logNodeTree(root, indent = "") {
    const name = root.name || "(no name)";
    console.log(`${indent}${root.type}: ${name}`);
    if ("children" in root) {
        for (const child of root.children) {
            logNodeTree(child, indent + "  ");
        }
    }
}
async function fillRowData(row, item) {
    if (item === null || item === void 0 ? void 0 : item.sku) {
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
}
function findTextInRow(row, name) {
    const target = normalizeNameKey(name);
    const node = row.findOne(n => n.type === 'TEXT' && normalizeNameKey(n.name || "") === target);
    return node || null;
}
function findTextInNode(node, name) {
    const target = normalizeNameKey(name);
    const found = node.findOne(n => n.type === 'TEXT' && normalizeNameKey(n.name || "") === target);
    return found || null;
}
function findNodeInCard(card, name) {
    const target = normalizeNameKey(name);
    const found = card.findOne(n => normalizeNameKey(n.name || "") === target);
    return found || null;
}
function findNodeInRowByName(row, name) {
    const target = normalizeNameKey(name);
    const node = row.findOne(n => normalizeNameKey(n.name || "") === target);
    return node || null;
}
async function loadFontForNode(node) {
    if (node.fontName !== figma.mixed) {
        await figma.loadFontAsync(node.fontName);
    }
}
const libraryComponentCache = new Map();
async function getComponentByKey(key) {
    if (!key)
        return null;
    if (libraryComponentCache.has(key)) {
        return libraryComponentCache.get(key) || null;
    }
    try {
        const comp = await figma.importComponentByKeyAsync(key);
        libraryComponentCache.set(key, comp);
        return comp;
    }
    catch (err) {
        console.log("Import by key error:", err);
        return null;
    }
}
function normalizePriceText(raw) {
    let text = (raw || "").trim();
    if (!text)
        return text;
    text = text.replace(/\s*СЂСѓР±\.?/i, "").trim();
    text = text.replace(/в‚Ѕ/g, "").trim();
    return text;
}
function normalizeDiscountText(raw) {
    let text = (raw || "").trim();
    if (!text)
        return text;
    text = text.replace(/%/g, "").trim();
    return text;
}
function updateSaleBannerInfo(infoMap) {
    const { monthLabel, monthGenitive, year, lastDay } = getNextMonthInfo();
    const saleMonthText = `${capitalize(monthLabel)} ${year}`;
    const saleDateText = `С 1 до ${lastDay} ${monthGenitive}`;
    const bannerScope = findBannerScope();
    const totalSaleNodes = findTextNodesByNameAny(["totalSale"], bannerScope);
    const saleMonthNodes = findTextNodesByNameAny(["saleMonth"], bannerScope);
    const saleDateNodes = findTextNodesByNameAny(["saleDate"], bannerScope);
    const maxDiscount = getMaxDiscount(infoMap);
    if (maxDiscount !== null) {
        const totalSaleText = `${maxDiscount}%`;
        for (const node of totalSaleNodes) {
            loadFontForNode(node).then(() => { node.characters = totalSaleText; });
        }
    }
    for (const node of saleMonthNodes) {
        loadFontForNode(node).then(() => { node.characters = saleMonthText; });
    }
    for (const node of saleDateNodes) {
        loadFontForNode(node).then(() => { node.characters = saleDateText; });
    }
}
function findBannerScope() {
    const bannerInstances = figma.root.findAll(n => {
        var _a;
        if (n.type !== "INSTANCE")
            return false;
        const inst = n;
        const key = (_a = inst.mainComponent) === null || _a === void 0 ? void 0 : _a.key;
        return key === KEY_BANNER || inst.name === "Banner";
    });
    if (bannerInstances.length === 0)
        return null;
    return bannerInstances;
}
function findTextNodesByNameAny(names, scope = null) {
    const wanted = new Set(names.map(n => normalizeNameKey(n)));
    const roots = scope && scope.length > 0 ? scope : [figma.root];
    const nodes = [];
    for (const r of roots) {
        const found = r.findAll ? r.findAll((n) => n.type === "TEXT") : [];
        nodes.push(...found);
    }
    return nodes.filter(n => wanted.has(normalizeNameKey(n.name || "")));
}
function normalizeNameKey(name) {
    return name.replace(/[\s#]/g, "").toLowerCase();
}
function getMaxDiscount(infoMap) {
    let max = null;
    for (const entry of Object.values(infoMap || {})) {
        const raw = entry === null || entry === void 0 ? void 0 : entry.discount;
        if (raw === undefined || raw === null)
            continue;
        const val = parseDiscountValue(String(raw));
        if (val === null)
            continue;
        if (max === null || val > max)
            max = val;
    }
    return max;
}
function parseDiscountValue(text) {
    const cleaned = text.replace(',', '.').replace(/[^\d.\-]/g, '');
    if (!cleaned)
        return null;
    const val = parseFloat(cleaned);
    return Number.isFinite(val) ? val : null;
}
function getNextMonthInfo() {
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const year = target.getFullYear();
    const monthIndex = target.getMonth();
    const lastDay = new Date(year, monthIndex + 1, 0).getDate();
    const monthsNom = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    const monthsGen = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return {
        monthLabel: monthsNom[monthIndex],
        monthGenitive: monthsGen[monthIndex],
        year,
        lastDay
    };
}
function capitalize(s) {
    if (!s)
        return s;
    return s[0].toUpperCase() + s.slice(1);
}
