import { CONFIG } from './config';
import {
    findTextInNode,
    findTextInRow,
    findNodeInRowByName,
    findNodeInCard,
    loadFontForNode,
    normalizeDiscountText,
    normalizePriceText
} from './utils';
import { parseDiscountValue, updateSaleBannerInfo } from './banner';
import { InfoMap } from './types';

// Apply discounts/prices updates and banner info from CSV.
export async function updateInfoOnPage(payload: { infoMap: InfoMap; updatePrice?: boolean }, shouldCancel?: () => boolean) {
    const infoMap: InfoMap = payload?.infoMap || {};
    const updatePrice = payload?.updatePrice !== undefined
        ? !!payload.updatePrice
        : Object.values(infoMap).some((v: any) => v?.price && String(v.price).trim() !== "");
    const codes = Object.keys(infoMap);

    console.log("[update-info] payload keys:", Object.keys(payload || {}));
    console.log("[update-info] updatePrice:", updatePrice);
    console.log("[update-info] codes count:", codes.length);
    console.log("[update-info] sample codes:", codes.slice(0, 10));

    if (codes.length === 0) {
        figma.ui.postMessage({ type: 'complete', text: "Cards not found." });
        return;
    }

    let updatedDiscounts = 0;
    let updatedPrices = 0;
    let foundCards = 0;

    const cards = figma.root.findAll(n =>
        (n.type === "FRAME" || n.type === "INSTANCE") && n.name.startsWith("Card")
    ) as (FrameNode | InstanceNode)[];
    const cardByName = new Map<string, FrameNode | InstanceNode>();
    for (const c of cards) {
        if (c.name) cardByName.set(c.name, c);
    }

    // Update card-level discounts by Card<SKU>.
    for (const code of codes) {
        if (shouldCancel?.()) {
            figma.ui.postMessage({ type: 'complete', text: "Остановлено пользователем" });
            throw new Error("Остановлено пользователем");
        }
        const cardName = `Card${code}`;
        const targetCard = cardByName.get(cardName) || null;

        if (!targetCard) {
            console.log("[update-info] card not found for code:", code);
            continue;
        }
        foundCards++;

        const entry = infoMap[code] || {};
        const newDiscount = entry.discount;
        const discountLayer = findTextInNode(targetCard, CONFIG.DISCOUNT);
        const saleStarNode = findNodeInCard(targetCard, CONFIG.SALE_STAR);
        const discountInfoLayer = findTextInNode(targetCard, CONFIG.DISCOUNT_INFO);

        if (discountLayer) {
            await loadFontForNode(discountLayer);
            const hasDiscount = newDiscount !== undefined && newDiscount !== null && String(newDiscount).trim() !== "";
            if (hasDiscount) {
                discountLayer.characters = normalizeDiscountText(String(newDiscount));
                discountLayer.visible = true;
                if (saleStarNode) saleStarNode.visible = true;
                updatedDiscounts++;
            } else {
                discountLayer.visible = false;
                if (saleStarNode) saleStarNode.visible = false;
            }
        } else {
            console.log("[update-info] discount layer not found in card:", targetCard.name);
        }
        if (discountInfoLayer) {
            await loadFontForNode(discountInfoLayer);
            const cond = entry.conditions;
            if (cond && String(cond).trim() !== "") {
                discountInfoLayer.characters = String(cond);
                discountInfoLayer.visible = true;
            } else {
                discountInfoLayer.visible = false;
            }
        }
    }

    // Update row prices if price column exists.
    if (updatePrice) {
        console.log("[update-info] cards for price scan:", cards.length);
        for (const card of cards) {
            if (shouldCancel?.()) {
                figma.ui.postMessage({ type: 'complete', text: "Остановлено пользователем" });
                throw new Error("Остановлено пользователем");
            }
            const list = card.findOne(n => n.name === CONFIG.LIST_CONTAINER && n.type === 'FRAME') as FrameNode;
            if (!list) continue;

            for (const row of list.children) {
                if (shouldCancel?.()) {
                    figma.ui.postMessage({ type: 'complete', text: "Остановлено пользователем" });
                    throw new Error("Остановлено пользователем");
                }
                const priceNode = row.findOne(n => n.name === CONFIG.ROW_PRICE && n.type === 'TEXT') as TextNode;
                if (!priceNode) continue;

                let sku = "";
                if (row.name) {
                    sku = String(row.name).trim();
                } else {
                    const skuNode = row.findOne(n => n.name === CONFIG.ROW_SKU && n.type === 'TEXT') as TextNode;
                    if (skuNode?.characters) {
                        sku = skuNode.characters.trim();
                    } else {
                        const anyText = row.findOne(n => n.type === 'TEXT') as TextNode;
                        if (anyText?.characters) sku = anyText.characters.trim();
                    }
                }

                if (!sku) continue;
                const entry = infoMap[sku];
                const newPrice = entry?.price;
                if (!newPrice || String(newPrice).trim() === "") continue;

                await loadFontForNode(priceNode);
                priceNode.characters = normalizePriceText(String(newPrice));
                updatedPrices++;
            }
        }
    }

    // Update per-row discount labels if they differ from card discount.
    updateRowItemDiscounts(infoMap, cards);

    console.log("[update-info] foundCards:", foundCards, "updatedDiscounts:", updatedDiscounts, "updatedPrices:", updatedPrices);
    await updateSaleBannerInfo(infoMap);
    if (foundCards === 0 && updatedPrices === 0) {
        figma.ui.postMessage({ type: 'complete', text: "Cards not found." });
        return;
    }

    const pricePart = updatePrice ? `, prices: ${updatedPrices}` : "";
    figma.notify(`Updated discounts: ${updatedDiscounts}${pricePart}`);
    figma.ui.postMessage({ type: 'complete', text: `Done! Discounts: ${updatedDiscounts}${pricePart}` });
}

// Show per-row discount labels if they differ from card discount.
function updateRowItemDiscounts(infoMap: InfoMap, cards: (FrameNode | InstanceNode)[]) {
    for (const card of cards) {
        const list = card.findOne(n => n.name === CONFIG.LIST_CONTAINER && n.type === 'FRAME') as FrameNode;
        if (!list) continue;

        const baseSku = card.name?.startsWith("Card") ? card.name.slice(4) : "";
        const baseDiscountRaw = baseSku ? infoMap?.[baseSku]?.discount : null;
        const baseDiscount = discountComparable(baseDiscountRaw);

        for (const row of list.children) {
            let sku = "";
            if (row.name) {
                sku = String(row.name).trim();
            } else {
                const skuNode = row.findOne(n => n.name === CONFIG.ROW_SKU && n.type === 'TEXT') as TextNode;
                if (skuNode?.characters) sku = skuNode.characters.trim();
            }
            if (!sku) continue;

            const entry = infoMap?.[sku];
            const rowDiscountRaw = entry?.discount;
            const rowDiscount = discountComparable(rowDiscountRaw);

            const itemSaleNode = findNodeInRowByName(row as FrameNode | InstanceNode, CONFIG.ROW_ITEM_SALE);
            const itemSaleText = findTextInRow(row as FrameNode | InstanceNode, CONFIG.ROW_ITEM_SALE_DISCOUNT);

            const shouldShow = baseDiscount !== null && rowDiscount !== null && !discountEquals(baseDiscount, rowDiscount);

            if (itemSaleNode) itemSaleNode.visible = shouldShow;
            if (shouldShow && itemSaleText) {
                loadFontForNode(itemSaleText).then(() => {
                    itemSaleText.characters = normalizeDiscountText(String(rowDiscountRaw));
                });
            }
        }
    }
}

type DiscountComparable = number | string | null;

// Normalize discount value for comparison.
function discountComparable(raw: any): DiscountComparable {
    if (raw === undefined || raw === null) return null;
    const text = String(raw).trim();
    if (!text) return null;
    const num = parseDiscountValue(text);
    if (num !== null) return num;
    return normalizeDiscountText(text);
}

// Compare normalized discount values.
function discountEquals(a: DiscountComparable, b: DiscountComparable): boolean {
    if (a === null || b === null) return false;
    if (typeof a === "number" && typeof b === "number") return a === b;
    return String(a) === String(b);
}
