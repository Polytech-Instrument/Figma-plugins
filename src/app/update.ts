import { CONFIG } from './config';
import {
    findTextInNode,
    findTextInRow,
    findNodeInRowByName,
    findNodeInCard,
    loadFontForNode
} from './utils';
import { normalizeDiscountText, normalizePriceText, normalizeMultiplicityText } from './normalizers';
import { parseDiscountValue, updateSaleBannerInfo } from './banner';
import { InfoMap } from './types';

// Apply discounts/prices updates and banner info from CSV.
export async function updateInfoOnPage(payload: { infoMap: InfoMap; updatePrice?: boolean }, shouldCancel?: () => boolean) {
    const infoMap: InfoMap = payload?.infoMap || {};
    const updatePrice = payload?.updatePrice !== undefined
        ? !!payload.updatePrice
        : Object.values(infoMap).some((v: any) => v?.price && String(v.price).trim() !== "");
    const codes = Object.keys(infoMap);

    postLog(`[update-info] payload keys: ${Object.keys(payload || {}).join(", ")}`);
    postLog(`[update-info] updatePrice: ${updatePrice}`);
    postLog(`[update-info] codes count: ${codes.length}`);
    postLog(`[update-info] sample codes: ${codes.slice(0, 10).join(", ")}`);

    if (codes.length === 0) {
        figma.ui.postMessage({ type: 'complete', text: "Cards not found." });
        return;
    }

    let updatedDiscounts = 0;
    let updatedPrices = 0;
    let updatedBoxFields = 0;
    let missingCards = 0;
    let foundCards = 0;

    const cards = figma.root.findAll(n =>
        (n.type === "FRAME" || n.type === "INSTANCE") && n.name.startsWith("Card")
    ) as (FrameNode | InstanceNode)[];
    const cardsByBaseSku = new Map<string, (FrameNode | InstanceNode)[]>();
    for (const c of cards) {
        const baseSku = getBaseSkuFromCardName(c.name);
        if (!baseSku) continue;
        const skuCards = cardsByBaseSku.get(baseSku) || [];
        skuCards.push(c);
        cardsByBaseSku.set(baseSku, skuCards);
    }

    // Update card-level discounts by Card<SKU>, including split continuation cards.
    for (const code of codes) {
        if (shouldCancel?.()) {
            figma.ui.postMessage({ type: 'complete', text: "Остановлено пользователем" });
            throw new Error("Остановлено пользователем");
        }
        const targetCards = cardsByBaseSku.get(String(code).trim()) || [];

        if (targetCards.length === 0) {
            postLog(`[update-info] card not found for code: ${code}`);
            missingCards++;
            continue;
        }
        foundCards += targetCards.length;

        for (const targetCard of targetCards) {
            const entry = infoMap[code] || {};
            const newDiscount = entry.discount;
            const discountLayer = findTextInNode(targetCard, CONFIG.DISCOUNT);
            const saleStarNode = findNodeInCard(targetCard, CONFIG.SALE_STAR);
            const discountInfoLayer = findTextInNode(targetCard, CONFIG.DISCOUNT_INFO);
            const discountInfoWrapper = findNodeInCard(targetCard, CONFIG.DISCOUNT_INFO);
            const surpriseLayer = findTextInNode(targetCard, CONFIG.SURPRISE);
            const surpriseWrapper = findNodeInCard(targetCard, CONFIG.SURPRISE_WRAPPER);
            const boxPriceLayer = findTextInNode(targetCard, CONFIG.BOX_PRICE);
            const boxQtyLayer = findTextInNode(targetCard, CONFIG.BOX_QTY);
            const boxNoticeLayer = findTextInNode(targetCard, CONFIG.BOX_NOTICE);

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
                postLog(`[update-info] discount layer not found in card: ${targetCard.name}`);
            }
            if (discountInfoLayer) {
                await loadFontForNode(discountInfoLayer);
                const cond = entry.surpriseText ? "" : entry.conditions;
                if (cond && String(cond).trim() !== "") {
                    discountInfoLayer.characters = String(cond);
                    discountInfoLayer.visible = true;
                    if (discountInfoWrapper) discountInfoWrapper.visible = true;
                } else {
                    discountInfoLayer.visible = false;
                    if (discountInfoWrapper) discountInfoWrapper.visible = false;
                }
            } else if (discountInfoWrapper && !(entry.conditions && String(entry.conditions).trim())) {
                discountInfoWrapper.visible = false;
            }
            if (surpriseLayer) {
                await loadFontForNode(surpriseLayer);
                if (entry.surpriseText && String(entry.surpriseText).trim() !== "") {
                    surpriseLayer.characters = String(entry.surpriseText);
                    surpriseLayer.visible = true;
                    if (surpriseWrapper) surpriseWrapper.visible = true;
                } else {
                    surpriseLayer.characters = "";
                    surpriseLayer.visible = false;
                    if (surpriseWrapper) surpriseWrapper.visible = false;
                }
            } else if (surpriseWrapper && !entry.surpriseText) {
                surpriseWrapper.visible = false;
            }

            if (await setOptionalText(boxPriceLayer, normalizePriceText(String(entry.boxPrice || entry.price || "")))) updatedBoxFields++;
            if (await setOptionalText(boxQtyLayer, normalizeMultiplicityText(String(entry.multiplicity || entry.boxQty || "")))) updatedBoxFields++;
            if (await setOptionalText(boxNoticeLayer, entry.boxNotice)) updatedBoxFields++;
        }
    }

    // Update row prices if price column exists.
    if (updatePrice) {
        postLog(`[update-info] cards for price scan: ${cards.length}`);
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
                if (!("findOne" in row)) continue;
                const rowNode = row as FrameNode | InstanceNode;
                const priceNode = rowNode.findOne(n => n.name === CONFIG.ROW_PRICE && n.type === 'TEXT') as TextNode;
                if (!priceNode) continue;

                let sku = "";
                if (row.name) {
                    sku = String(row.name).trim();
                } else {
                    const skuNode = rowNode.findOne(n => n.name === CONFIG.ROW_SKU && n.type === 'TEXT') as TextNode;
                    if (skuNode?.characters) {
                        sku = skuNode.characters.trim();
                    } else {
                        const anyText = rowNode.findOne(n => n.type === 'TEXT') as TextNode;
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
    await updateRowItemDiscounts(infoMap, cards);

    postLog(`[update-info] foundCards: ${foundCards}, updatedDiscounts: ${updatedDiscounts}, updatedPrices: ${updatedPrices}, updatedBoxFields: ${updatedBoxFields}, missingCards: ${missingCards}`);
    await updateSaleBannerInfo(infoMap);
    if (foundCards === 0 && updatedPrices === 0) {
        figma.ui.postMessage({ type: 'complete', text: "Cards not found." });
        return;
    }

    const parts = [
        `карточек найдено: ${foundCards}`,
        `скидок: ${updatedDiscounts}`
    ];
    if (updatePrice) parts.push(`цен: ${updatedPrices}`);
    if (updatedBoxFields > 0) parts.push(`коробочных полей: ${updatedBoxFields}`);
    if (missingCards > 0) parts.push(`не найдено: ${missingCards}`);
    const text = `Обновление готово: ${parts.join(", ")}`;
    figma.notify(text);
    figma.ui.postMessage({ type: 'complete', text });
}

async function setOptionalText(node: TextNode | null, value?: string | null): Promise<boolean> {
    if (!node) return false;
    await loadFontForNode(node);
    const text = value ? String(value).trim() : "";
    const changed = node.characters !== text || node.visible !== (text !== "");
    node.characters = text;
    node.visible = text !== "";
    return changed;
}

// Show per-row discount labels if they differ from card discount.
async function updateRowItemDiscounts(infoMap: InfoMap, cards: (FrameNode | InstanceNode)[]) {
    for (const card of cards) {
        const list = card.findOne(n => n.name === CONFIG.LIST_CONTAINER && n.type === 'FRAME') as FrameNode;
        if (!list) continue;

        const baseSku = getBaseSkuFromCardName(card.name);
        const baseDiscountRaw = baseSku ? infoMap?.[baseSku]?.discount : null;
        const baseDiscount = discountComparable(baseDiscountRaw);

        for (const row of list.children) {
            if (!("findOne" in row)) continue;
            const rowNode = row as FrameNode | InstanceNode;
            let sku = "";
            if (row.name) {
                sku = String(row.name).trim();
            } else {
                const skuNode = rowNode.findOne(n => n.name === CONFIG.ROW_SKU && n.type === 'TEXT') as TextNode;
                if (skuNode?.characters) sku = skuNode.characters.trim();
            }
            if (!sku) continue;

            const entry = infoMap?.[sku];
            const rowDiscountRaw = entry?.discount;
            const rowDiscount = discountComparable(rowDiscountRaw);

            const itemSaleNode = findNodeInRowByName(row as FrameNode | InstanceNode, CONFIG.ROW_ITEM_SALE);
            const itemSaleText = findTextInRow(row as FrameNode | InstanceNode, CONFIG.ROW_ITEM_SALE_DISCOUNT);

            const shouldShow = rowDiscount !== null && (baseDiscount === null || !discountEquals(baseDiscount, rowDiscount));

            if (itemSaleNode) itemSaleNode.visible = shouldShow;
            if (shouldShow && itemSaleText) {
                await loadFontForNode(itemSaleText);
                itemSaleText.characters = normalizeDiscountText(String(rowDiscountRaw));
            } else if (itemSaleText) {
                await loadFontForNode(itemSaleText);
                itemSaleText.characters = "";
            }
        }
    }
}

function getBaseSkuFromCardName(name?: string): string {
    if (!name || !name.startsWith("Card")) return "";
    return name.slice(4).replace(/-p\d+$/i, "").trim();
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

function postLog(text: string) {
    figma.ui.postMessage({ type: "log", text });
}
