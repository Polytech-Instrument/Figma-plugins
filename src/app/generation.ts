import {
    CONFIG,
    KEY_BANNER,
    KEY_PRODUCT_CARD,
    KEY_ROW_ITEM,
    COL_W,
    MIN_REMAINING_FOR_SPLIT,
    A4_W,
    A4_H
} from './config';
import { getComponentByKey } from './utils';
import { fillCardData, buildSplitCards, SplitMetrics } from './card';
import { Group } from './types';
import { updateSaleBannerInfo } from './banner';
import {
    calculateContentHeight,
    createBlankPage,
    createPageWithColumns,
    relocateOverflowForFooter,
    addFooterToPage,
    addPaginatorToPage
} from './layout';

const PROGRESS_BATCH = 10;

type BrochureLayout = {
    giftBlockEnabled?: boolean;
    giftBlockMode?: string;
    settings?: any;
    infoMap?: any;
    orderList?: string[];
};

type BrochureRun = {
    title: string;
    groups: Group[];
    useCoverShift: boolean;
    addBanner: boolean;
};

type RunReport = {
    title: string;
    pages: number;
    products: number;
};

type BrochureState = {
    pageNum: number;
    lastPage: FrameNode | null;
    pagesByNumber: Map<number, FrameNode>;
};

type BrochureMasters = {
    cardMaster: ComponentNode;
    rowMaster: ComponentNode;
};

type BrochureOptions = {
    autoSplit?: boolean;
    askSplit?: (cardName: string, cardHeight: number, colHeight: number) => Promise<boolean>;
    shouldCancel?: () => boolean;
};

// Generate pages and layout product cards.
export async function createBrochure(
    groups: Group[],
    layout: BrochureLayout,
    opts?: BrochureOptions
) {
    const masters = await loadBrochureMasters();
    const splitMetrics: SplitMetrics = {
        minCardHeight: CONFIG.MIN_CARD_HEIGHT,
        baseRows: CONFIG.BASE_CARD_ROWS,
        rowGrowth: CONFIG.ESTIMATED_ROW_HEIGHT
    };

    const runs = buildBrochureRuns(groups, layout);
    const state: BrochureState = { pageNum: 0, lastPage: null, pagesByNumber: new Map() };
    const totalGroups = runs.reduce((sum, run) => sum + run.groups.length, 0);
    const reports: RunReport[] = [];
    let processedGroups = 0;

    for (let runIndex = 0; runIndex < runs.length; runIndex++) {
        const run = runs[runIndex];
        ensureNotCancelled(opts);
        if (run.groups.length === 0) continue;
        await activateRunFigmaPage(run);
        const report = await layoutBrochureRun(run, runIndex, layout, masters, splitMetrics, state, opts, (count) => {
            processedGroups += count;
            if (processedGroups % PROGRESS_BATCH === 0 || processedGroups === totalGroups) {
                figma.ui.postMessage({
                    type: 'progress',
                    curr: processedGroups,
                    total: totalGroups,
                    text: `Верстка: ${processedGroups} / ${totalGroups}`
                });
                return yieldToUi();
            }
            return Promise.resolve();
        });
        reports.push(report);
    }

    if ((layout as any)?.infoMap) {
        await updateSaleBannerInfo((layout as any).infoMap);
    }

    figma.ui.postMessage({
        type: 'complete',
        text: buildCompleteText(reports, state.pageNum),
        report: {
            pages: state.pageNum,
            leaflets: reports.length,
            runs: reports
        }
    });
}

async function activateRunFigmaPage(run: BrochureRun) {
    const pageName = normalizePageTitle(run.title);
    const page = figma.createPage();
    page.name = pageName;
    await figma.setCurrentPageAsync(page);
}

async function loadBrochureMasters(): Promise<BrochureMasters> {
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

    if (!rowMaster) throw new Error("Нет компонента RowItem");
    if (!cardMaster) throw new Error("Нет компонента ProductCard");

    return { cardMaster, rowMaster };
}

function buildBrochureRuns(groups: Group[], layout: BrochureLayout): BrochureRun[] {
    const hasLeaflets = groups.some(group => !!normalizeLeafletName(group.leafletName));
    if (!hasLeaflets) {
        return [{ title: "Каталог", groups, useCoverShift: true, addBanner: true }];
    }

    const runs: BrochureRun[] = [
        { title: "Общая листовка", groups, useCoverShift: true, addBanner: true }
    ];
    const byLeaflet = new Map<string, { title: string; groups: Group[] }>();
    for (const group of groups) {
        const title = normalizeLeafletName(group.leafletName);
        if (!title) continue;
        const key = normalizeLeafletKey(title);
        const entry = byLeaflet.get(key) || { title, groups: [] };
        entry.groups.push(group);
        byLeaflet.set(key, entry);
    }

    for (const entry of byLeaflet.values()) {
        runs.push({ title: entry.title, groups: entry.groups, useCoverShift: true, addBanner: true });
    }
    return runs;
}

async function layoutBrochureRun(
    run: BrochureRun,
    runIndex: number,
    layout: BrochureLayout,
    masters: BrochureMasters,
    splitMetrics: SplitMetrics,
    state: BrochureState,
    opts: BrochureOptions | undefined,
    onProgress: (count: number) => Promise<void>
): Promise<RunReport> {
    const startPageNum = state.pageNum + 1;
    const giftBlockEnabled = layout?.giftBlockEnabled !== false;
    const orderList: string[] = Array.isArray(layout?.orderList) ? layout.orderList : [];
    const startOnSecondPage = run.useCoverShift && giftBlockEnabled;
    const firstPageShift = run.useCoverShift
        ? resolveShiftPx(giftBlockEnabled ? 0 : CONFIG.FIRST_PAGE_SHIFT_DEFAULT)
        : 0;

    if (startOnSecondPage) {
        state.pageNum++;
        const blank = createBlankPage(state.pageNum);
        registerPage(state, state.pageNum, blank);
        nameRunPage(blank, run.title, 1);
        positionPageInRun(blank, runIndex, 1);
        if (run.addBanner) {
            await addBannerToPage(blank);
        }
        await addPaginatorToPage(blank, run.title, 1);
    }

    let localPageNum = startOnSecondPage ? 2 : 1;
    state.pageNum++;
    let currentLayout = createPageWithColumns(state.pageNum, run.useCoverShift ? firstPageShift : 0);
    registerPage(state, state.pageNum, currentLayout.page);
    nameRunPage(currentLayout.page, run.title, localPageNum);
    positionPageInRun(currentLayout.page, runIndex, localPageNum);
    state.lastPage = currentLayout.page;

    if (run.addBanner && !startOnSecondPage) {
        await addBannerToPage(currentLayout.page);
    }
    await addPaginatorToPage(currentLayout.page, run.title, localPageNum);

    let activeColIndex = 0;
    let activeColumn = currentLayout.columns[0];
    const orderedGroups = orderGroupsBySku(run.groups, orderList);

    for (const group of orderedGroups) {
        ensureNotCancelled(opts);

        const colMaxH = currentLayout.columns[0].height;
        let cardsToPlace: FrameNode[] = [];

        const cardFrame = await createProductCard(masters.cardMaster, group, masters.rowMaster);
        if (cardFrame.height > colMaxH) {
            let doSplit = !!opts?.autoSplit;
            if (!doSplit && opts?.askSplit) {
                doSplit = await opts.askSplit(cardFrame.name, cardFrame.height, colMaxH);
            }
            if (doSplit) {
                cardsToPlace = await buildSplitCards(masters.cardMaster, masters.rowMaster, group, colMaxH, colMaxH, splitMetrics);
                cardFrame.remove();
            } else {
                cardsToPlace = [cardFrame];
            }
        } else {
            cardsToPlace = [cardFrame];
        }

        for (let i = 0; i < cardsToPlace.length; i++) {
            ensureNotCancelled(opts);
            const card = cardsToPlace[i];
            if (i > 0 && card.name && !/-p\d+$/i.test(card.name)) card.name = `${card.name}-p${i + 1}`;

            if (!canFitInColumn(activeColumn, card.height) && activeColumn.children.length > 0) {
                if (activeColIndex === 0) {
                    activeColIndex = 1;
                    activeColumn = currentLayout.columns[1];
                } else {
                    currentLayout = await createNextPage(state, run.title, ++localPageNum, runIndex);
                    activeColIndex = 0;
                    activeColumn = currentLayout.columns[0];
                }
            }
            activeColumn.appendChild(card);
        }

        await onProgress(1);
    }

    await finalizeRunFooter(state, run.title, runIndex, localPageNum);
    return {
        title: normalizePageTitle(run.title),
        pages: state.pageNum - startPageNum + 1,
        products: run.groups.length
    };
}

async function finalizeRunFooter(
    state: BrochureState,
    title: string,
    runIndex: number,
    localPageNum: number
) {
    if (!state.lastPage) return;
    if (CONFIG.FOOTER_ENABLED === false) return;
    const beforeFooterPageNum = state.pageNum;
    const footerResult = relocateOverflowForFooter(state.lastPage, state.pageNum);
    state.lastPage = footerResult.lastPage;
    state.pageNum = footerResult.pageNum;
    await addPaginatorsToRelocatedPages(
        state,
        beforeFooterPageNum + 1,
        state.pageNum,
        title,
        localPageNum + 1,
        runIndex
    );
    await addFooterToPage(state.lastPage);
}

async function addPaginatorsToRelocatedPages(
    state: BrochureState,
    fromPageNum: number,
    toPageNum: number,
    title: string,
    startLocalPageNum: number,
    runIndex: number
) {
    let localPageNum = startLocalPageNum;
    for (let pageNum = fromPageNum; pageNum <= toPageNum; pageNum++) {
        const page = state.pagesByNumber.get(pageNum) || findGeneratedPageByNumber(pageNum);
        if (!page) continue;
        registerPage(state, pageNum, page);
        nameRunPage(page, title, localPageNum);
        positionPageInRun(page, runIndex, localPageNum);
        await addPaginatorToPage(page, title, localPageNum++);
    }
}

function findGeneratedPage(pageNum: number): FrameNode | null {
    return figma.root.findOne(n =>
        n.type === "FRAME" && n.name === `Страница ${pageNum}`
    ) as FrameNode | null;
}

async function createNextPage(state: BrochureState, title: string, localPageNum: number, runIndex: number) {
    state.pageNum++;
    const nextLayout = createPageWithColumns(state.pageNum, 0);
    registerPage(state, state.pageNum, nextLayout.page);
    nameRunPage(nextLayout.page, title, localPageNum);
    positionPageInRun(nextLayout.page, runIndex, localPageNum);
    state.lastPage = nextLayout.page;
    await addPaginatorToPage(nextLayout.page, title, localPageNum);
    return nextLayout;
}

function findGeneratedPageByNumber(pageNum: number): FrameNode | null {
    return figma.root.findOne(n =>
        n.type === "FRAME" && getPageNumberFromName(n.name || "") === pageNum
    ) as FrameNode | null;
}

function registerPage(state: BrochureState, pageNum: number, page: FrameNode) {
    state.pagesByNumber.set(pageNum, page);
}

function getPageNumberFromName(name: string): number | null {
    const match = /(\d+)$/.exec(name);
    if (!match) return null;
    const value = Number(match[1]);
    return Number.isFinite(value) ? value : null;
}

function positionPageInRun(page: FrameNode, runIndex: number, localPageNum: number) {
    page.x = (localPageNum - 1) * (A4_W + 50);
    page.y = 0;
}

function nameRunPage(page: FrameNode, title: string, localPageNum: number) {
    page.name = `${normalizePageTitle(title)} - стр ${localPageNum}`;
}

function normalizePageTitle(title: string): string {
    const normalized = normalizeLeafletName(title);
    if (!normalized) return "Листовка";
    if (normalized.toLowerCase() === "общая листовка") return "Общая";
    return normalized;
}

function getRunTitleFromPage(page: FrameNode): string {
    const title = page.findOne(n =>
        n.type === "TEXT" && !!n.name && n.name.replace(/[\s#]/g, "").toLowerCase() === "pagetitle"
    ) as TextNode | null;
    return title?.characters || "Листовка";
}

async function createProductCard(cardMaster: ComponentNode, group: Group, rowMaster: ComponentNode) {
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
    cardFrame.name = group.mainSku ? `Card${String(group.mainSku)}` : "Unknown SKU";
    cardFrame.resize(COL_W, cardFrame.height);
    await fillCardData(cardFrame, group, rowMaster);
    return cardFrame;
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
    const items = group.items || [];
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

function getRemainingHeight(column: FrameNode): number {
    const currentContentH = calculateContentHeight(column);
    const gap = column.children.length > 0 && column.primaryAxisAlignItems !== "SPACE_BETWEEN"
        ? CONFIG.ITEM_GAP
        : 0;
    return column.height - currentContentH - gap;
}

function canFitInColumn(column: FrameNode, cardHeight: number): boolean {
    const remainingH = getRemainingHeight(column);
    if (cardHeight > column.height && remainingH < MIN_REMAINING_FOR_SPLIT) {
        return false;
    }
    return remainingH >= cardHeight;
}

function normalizeLeafletName(value?: string | null): string {
    return String(value || "").replace(/\s+/g, " ").trim();
}

function normalizeLeafletKey(value?: string | null): string {
    return normalizeLeafletName(value).toLowerCase();
}

function ensureNotCancelled(
    opts?: { shouldCancel?: () => boolean }
) {
    if (opts?.shouldCancel?.()) {
        figma.ui.postMessage({ type: 'complete', text: "Остановлено пользователем" });
        throw new Error("Остановлено пользователем");
    }
}

function buildCompleteText(reports: RunReport[], totalPages: number): string {
    const totalProducts = reports.reduce((sum, report) => sum + report.products, 0);
    const lines = [
        `Готово: страниц ${totalPages}, листовок ${reports.length}, товаров ${totalProducts}`
    ];
    for (const report of reports) {
        lines.push(`${report.title}: стр. ${report.pages}, товаров ${report.products}`);
    }
    return lines.join("\n");
}

async function addBannerToPage(page: FrameNode) {
    const bannerComp = await getComponentByKey(KEY_BANNER);
    if (!bannerComp) return;
    const bannerInstance = (bannerComp as ComponentNode).createInstance();
    bannerInstance.x = 0;
    bannerInstance.y = 0;
    page.appendChild(bannerInstance);
}

function yieldToUi(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 0));
}
