import {
    CONFIG,
    KEY_BANNER,
    KEY_PRODUCT_CARD,
    KEY_ROW_ITEM,
    COL_W,
    MIN_REMAINING_FOR_SPLIT,
    A4_H
} from './config';
import { getComponentByKey } from './utils';
import { fillCardData, buildSplitCards } from './card';
import { Group } from './types';
import { updateSaleBannerInfo } from './banner';
import {
    calculateContentHeight,
    findBestColumn,
    createBlankPage,
    createPageWithColumns,
    relocateOverflowForFooter,
    addFooterToPage
} from './layout';

// Generate pages and layout product cards.
export async function createBrochure(
    groups: Group[],
    layout: { giftBlockEnabled?: boolean; giftBlockMode?: string; compactLayout?: boolean; settings?: any },
    opts?: { autoSplit?: boolean; askSplit?: (cardName: string, cardHeight: number, colHeight: number) => Promise<boolean>; shouldCancel?: () => boolean }
) {
    figma.notify(`createBrochure: groups=${groups?.length || 0}`, { timeout: 1500 });
    let rowMaster = figma.root.findOne(n => n.type === 'COMPONENT' && n.name === 'RowItem') as ComponentNode;
    let cardMaster = figma.root.findOne(n => n.type === 'COMPONENT' && n.name === 'ProductCard') as ComponentNode;

    const cardFromKey = await getComponentByKey(KEY_PRODUCT_CARD);
    if (cardFromKey) cardMaster = cardFromKey;

    const rowFromKey = await getComponentByKey(KEY_ROW_ITEM);
    if (rowFromKey) rowMaster = rowFromKey;

    if (!rowMaster || (rowMaster as any).removed) {
        rowMaster = await getComponentByKey(KEY_ROW_ITEM) as ComponentNode;
    }
    if (!cardMaster || (cardMaster as any).removed) {
        cardMaster = await getComponentByKey(KEY_PRODUCT_CARD) as ComponentNode;
    }

    if (!rowMaster) throw new Error("Нет компонента RowItem (локально или в библиотеке)!");
    if (!cardMaster) throw new Error("Нет компонента ProductCard (локально или в библиотеке)!");

    const templateMetrics = measureTemplateMetrics(cardMaster, rowMaster);
    const giftBlockEnabled = !!layout?.giftBlockEnabled;
    const giftBlockMode = layout?.giftBlockMode || "twoThirds";
    const compactLayout = !!layout?.compactLayout;
    const orderList: string[] = Array.isArray((layout as any)?.orderList) ? (layout as any).orderList : [];
    const startOnSecondPage = giftBlockEnabled && giftBlockMode === "startSecond";
    const firstPageShift = resolveShiftPx(
        giftBlockEnabled ? CONFIG.FIRST_PAGE_SHIFT_TWO_THIRDS : CONFIG.FIRST_PAGE_SHIFT_DEFAULT
    );

    let pageNum = startOnSecondPage ? 2 : 1;
    let lastPage: FrameNode | null = null;
    if (startOnSecondPage) {
        createBlankPage(1);
    }

    let currentLayout = createPageWithColumns(pageNum, pageNum === 1 ? firstPageShift : 0);
    lastPage = currentLayout.page;

    if (pageNum === 1) {
        const bannerComp = await getComponentByKey(KEY_BANNER);
        if (bannerComp) {
            const bannerInstance = (bannerComp as ComponentNode).createInstance();
            bannerInstance.x = 0;
            bannerInstance.y = 0;
            currentLayout.page.appendChild(bannerInstance);
        }
    }

    let activeColIndex = 0;
    let activeColumn = currentLayout.columns[0];
    const allColumns: FrameNode[] = [...currentLayout.columns];
    let processed = 0;

    const orderedGroups = orderGroupsBySku(groups, orderList);

    for (const group of orderedGroups) {
        if (opts?.shouldCancel?.()) {
            figma.ui.postMessage({ type: 'complete', text: "Остановлено пользователем" });
            throw new Error("Остановлено пользователем");
        }
        const colMaxHForSplit = currentLayout.columns[0].height;
        const currentContentHForSplit = calculateContentHeight(activeColumn);
        const currentGapForSplit = activeColumn.children.length > 0 ? CONFIG.ITEM_GAP : 0;
        const remainingHForSplit = activeColumn.height - currentContentHForSplit - currentGapForSplit;
        const estimatedCardHeight = estimateCardHeight(group.items?.length || 0, templateMetrics);
        let cardsToPlace: FrameNode[] = [];
        const shouldTrySplit =
            (activeColumn.children.length > 0 && estimatedCardHeight > Math.max(0, remainingHForSplit)) ||
            estimatedCardHeight > colMaxHForSplit;
        if (shouldTrySplit) {
            let doSplit = !!opts?.autoSplit;
            if (!doSplit && opts?.askSplit) {
                doSplit = await opts.askSplit(
                    group.mainSku ? `Card${String(group.mainSku)}` : "Unknown SKU",
                    estimatedCardHeight,
                    colMaxHForSplit
                );
            }
            if (doSplit) {
                const firstChunkMaxColH =
                    activeColumn.children.length > 0 && remainingHForSplit > 0
                        ? remainingHForSplit
                        : colMaxHForSplit;
                cardsToPlace = await buildSplitCards(cardMaster, rowMaster, group, colMaxHForSplit, firstChunkMaxColH);
            }
        }

        if (cardsToPlace.length === 0) {
            let instance: InstanceNode;
            try {
                instance = cardMaster.createInstance();
            } catch (err) {
                const fresh = await getComponentByKey(KEY_PRODUCT_CARD);
                if (!fresh) throw err;
                cardMaster = fresh;
                instance = cardMaster.createInstance();
            }
            const cardFrame = instance.detachInstance();

            if (group.mainSku) {
                cardFrame.name = `Card${String(group.mainSku)}`;
            } else {
                cardFrame.name = "Unknown SKU";
            }

            cardFrame.resize(COL_W, cardFrame.height);
            await fillCardData(cardFrame, group, rowMaster);

            if (cardFrame.height > colMaxHForSplit) {
                let doSplit = !!opts?.autoSplit;
                if (!doSplit && opts?.askSplit) {
                    doSplit = await opts.askSplit(cardFrame.name, cardFrame.height, colMaxHForSplit);
                }
                if (doSplit) {
                    cardsToPlace = await buildSplitCards(cardMaster, rowMaster, group, colMaxHForSplit, colMaxHForSplit);
                    cardFrame.remove();
                } else {
                    cardsToPlace = [cardFrame];
                }
            } else {
                cardsToPlace = [cardFrame];
            }
        }

        for (let i = 0; i < cardsToPlace.length; i++) {
            if (opts?.shouldCancel?.()) {
                figma.ui.postMessage({ type: 'complete', text: "Остановлено пользователем" });
                throw new Error("Остановлено пользователем");
            }
            const card = cardsToPlace[i];
            if (i > 0 && card.name) card.name = `${card.name}-p${i + 1}`;

            if (compactLayout) {
                let targetCol = findBestColumn(allColumns, card.height);
                if (!targetCol) {
                    pageNum++;
                    const newLayout = createPageWithColumns(pageNum, 0);
                    lastPage = newLayout.page;
                    allColumns.push(...newLayout.columns);
                    targetCol = findBestColumn(allColumns, card.height) || newLayout.columns[0];
                }
                targetCol.appendChild(card);
            } else {
                const currentContentH = calculateContentHeight(activeColumn);
                const colMaxH = activeColumn.height;
                const remainingH = colMaxH - currentContentH - (activeColumn.children.length > 0 ? CONFIG.ITEM_GAP : 0);

                if (card.height > colMaxH && remainingH < MIN_REMAINING_FOR_SPLIT && activeColumn.children.length > 0) {
                    if (activeColIndex === 0) {
                        activeColIndex = 1;
                        activeColumn = currentLayout.columns[1];
                    } else {
                        pageNum++;
                        currentLayout = createPageWithColumns(pageNum, 0);
                        lastPage = currentLayout.page;
                        allColumns.push(...currentLayout.columns);
                        activeColIndex = 0;
                        activeColumn = currentLayout.columns[0];
                    }
                } else {
                    const newH = currentContentH + CONFIG.ITEM_GAP + card.height;
                    if (newH > colMaxH && activeColumn.children.length > 0) {
                        if (activeColIndex === 0) {
                            activeColIndex = 1;
                            activeColumn = currentLayout.columns[1];
                        } else {
                            pageNum++;
                            currentLayout = createPageWithColumns(pageNum, 0);
                            lastPage = currentLayout.page;
                            allColumns.push(...currentLayout.columns);
                            activeColIndex = 0;
                            activeColumn = currentLayout.columns[0];
                        }
                    }
                }
                activeColumn.appendChild(card);
            }
        }

        processed++;
        if (processed % 3 === 0) {
            figma.ui.postMessage({
                type: 'progress',
                curr: processed,
                total: orderedGroups.length,
                text: `Верстка: ${processed} / ${orderedGroups.length}`
            });
            await new Promise(r => setTimeout(r, 10));
        }
    }

    if (lastPage) {
        const footerResult = relocateOverflowForFooter(lastPage, pageNum, compactLayout);
        lastPage = footerResult.lastPage;
        pageNum = footerResult.pageNum;
        await addFooterToPage(lastPage);
    }

    if ((layout as any)?.infoMap) {
        await updateSaleBannerInfo((layout as any).infoMap);
    }

    figma.ui.postMessage({ type: 'complete', text: "Каталог успешно создан!" });
}

function orderGroupsBySku(groups: Group[], orderList: string[]): Group[] {
    if (!orderList || orderList.length === 0) return groups;
    const orderIndex = new Map<string, number>();
    for (let i = 0; i < orderList.length; i++) {
        const sku = String(orderList[i]).trim();
        if (!orderIndex.has(sku)) orderIndex.set(sku, i);
    }
    return [...groups].sort((a, b) => {
        const aSku = a?.mainSku ? String(a.mainSku).trim() : "";
        const bSku = b?.mainSku ? String(b.mainSku).trim() : "";
        const ai = getGroupOrderIndex(a, aSku, orderIndex);
        const bi = getGroupOrderIndex(b, bSku, orderIndex);
        if (ai !== bi) return ai - bi;
        return aSku.localeCompare(bSku, "ru");
    });
}

function getGroupOrderIndex(group: Group, mainSku: string, orderIndex: Map<string, number>): number {
    let best = orderIndex.has(mainSku) ? orderIndex.get(mainSku)! : Number.MAX_SAFE_INTEGER;
    const items = (group as any)?.items || [];
    for (const it of items) {
        const sku = it?.sku ? String(it.sku).trim() : "";
        if (!sku) continue;
        const idx = orderIndex.has(sku) ? orderIndex.get(sku)! : Number.MAX_SAFE_INTEGER;
        if (idx < best) best = idx;
    }
    return best;
}

function resolveShiftPx(value: number): number {
    if (!Number.isFinite(value)) return 0;
    if (value >= 0 && value <= 1) {
        return Math.round(A4_H * value);
    }
    return Math.round(value);
}

function estimateCardHeight(itemCount: number, metrics: { baseHeight: number; rowHeight: number }): number {
    const rows = Math.max(0, itemCount);
    const rowsHeight = rows > 0
        ? (rows * metrics.rowHeight) + (Math.max(0, rows - 1) * CONFIG.ITEM_GAP)
        : 0;
    return metrics.baseHeight + rowsHeight;
}

function measureTemplateMetrics(cardMaster: ComponentNode, rowMaster: ComponentNode) {
    const card = cardMaster.createInstance().detachInstance();
    card.resize(COL_W, card.height);

    const list = card.findOne(n => n.name.replace(/[\s#\u00A0]/g, "").toLowerCase() === "listcontainer") as SceneNode | null;
    const listHeight = list && "height" in list ? list.height : 0;
    const baseHeight = Math.max(CONFIG.MIN_CARD_HEIGHT, card.height - listHeight);
    card.remove();

    const row = rowMaster.createInstance();
    row.resize(COL_W, row.height);
    const rowHeight = Math.max(CONFIG.ESTIMATED_ROW_HEIGHT, row.height);
    row.remove();

    return { baseHeight, rowHeight };
}
