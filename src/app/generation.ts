import {
    CONFIG,
    KEY_BANNER,
    KEY_PRODUCT_CARD,
    KEY_PRODUCT_BOX_CARD,
    KEY_ROW_ITEM,
    KEY_ROW_ITEM_BOX,
    KEY_BOX_NOTICE_TOP,
    KEY_BOX_NOTICE_BOTTOM,
    COL_W,
    MIN_REMAINING_FOR_SPLIT,
    A4_W,
    A4_H,
    PAD_X
} from './config';
import { getComponentByKey, loadFontCached } from './utils';
import { fillCardData, buildSplitCards, SplitMetrics } from './card';
import { Group } from './types';
import { updateSaleBannerInfo } from './banner';
import { appendAdPlaceholderIfRoom, appendPageAdPlaceholder } from './adPlaceholders';
import { writeRunLogPage } from './runLog';
import { addCommonGiftBlockToPage } from './giftBlock';
import {
    calculateContentHeight,
    calculatePackedContentHeight,
    getPackedRemainingHeight,
    canFitPacked,
    createBlankPage,
    createPageWithColumns,
    relocateOverflowForFooter,
    addFooterToPage,
    addPaginatorToPage
} from './layout';

const PROGRESS_BATCH = 10;
const FIT_HEIGHT_TOLERANCE = 6;
const BRAND_COVER_COLOR = { r: 0.76, g: 0.02, b: 0.14 };

type BrochureLayout = {
    giftBlockEnabled?: boolean;
    giftBlockMode?: string;
    settings?: any;
    infoMap?: any;
    orderList?: string[];
    mainTitle?: string;
    uiStats?: {
        imageFetchMs?: number;
        payloadMs?: number;
        totalUiMs?: number;
    };
    runs?: Array<{
        title: string;
        groups: Group[];
        orderList?: string[];
        infoMap?: any;
        promoType?: "common" | "box" | "fixed";
    }>;
};

type BrochureRun = {
    title: string;
    groups: Group[];
    useCoverShift: boolean;
    addBanner: boolean;
    useCurrentFigmaPage?: boolean;
    orderList?: string[];
    infoMap?: any;
    promoType?: "common" | "box" | "fixed";
};

type RunReport = {
    title: string;
    pages: number;
    products: number;
    adPlaceholders: number;
    adSizes: string[];
    cardErrors: number;
    layoutMs?: number;
};

type BrochureState = {
    pageNum: number;
    lastPage: FrameNode | null;
    pagesByNumber: Map<number, FrameNode>;
};

type BrochureMasters = {
    cardMaster: ComponentNode;
    boxCardMaster: ComponentNode | null;
    rowMaster: ComponentNode;
    boxRowMaster: ComponentNode | null;
    boxNoticeTopMaster: ComponentNode | null;
    boxNoticeBottomMaster: ComponentNode | null;
};

type BrochureOptions = {
    autoSplit?: boolean;
    askSplit?: (cardName: string, cardHeight: number, colHeight: number) => Promise<boolean>;
    shouldCancel?: () => boolean;
};

type RunStrategy = {
    boxMode: boolean;
    addPaginator: boolean;
    addTopBoxNotice: boolean;
    addBottomBoxNotice: boolean;
};

// Generate pages and layout product cards.
export async function createBrochure(
    groups: Group[],
    layout: BrochureLayout,
    opts?: BrochureOptions
) {
    const startedAt = Date.now();
    const masters = await loadBrochureMasters();
    const splitMetrics: SplitMetrics = {
        minCardHeight: CONFIG.MIN_CARD_HEIGHT,
        baseRows: CONFIG.BASE_CARD_ROWS,
        rowGrowth: CONFIG.ESTIMATED_ROW_HEIGHT
    };

    const runs = buildBrochureRuns(groups, layout);
    await prepareDocumentCoverPage();
    const state: BrochureState = { pageNum: 0, lastPage: null, pagesByNumber: new Map() };
    const totalGroups = runs.reduce((sum, run) => sum + run.groups.length, 0);
    const reports: RunReport[] = [];
    let processedGroups = 0;

    for (let runIndex = 0; runIndex < runs.length; runIndex++) {
        const run = runs[runIndex];
        const runStartedAt = Date.now();
        ensureNotCancelled(opts);
        if (run.groups.length === 0) continue;
        await activateRunFigmaPage(run, runIndex);
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
        report.layoutMs = Date.now() - runStartedAt;
        reports.push(report);
    }

    const emptyPagesRemoved = cleanupTrailingEmptyPages(state);
    const overflowCount = countOverflowNodes([...state.pagesByNumber.values()]);
    const report = {
        pages: state.pageNum,
        leaflets: reports.length,
        overflowCount,
        emptyPagesRemoved,
        figmaMs: Date.now() - startedAt,
        totalMs: (Number(layout?.uiStats?.totalUiMs) || 0) + (Date.now() - startedAt),
        uiStats: layout?.uiStats || null,
        runs: reports
    };
    await writeRunLogPage(report);
    figma.ui.postMessage({ type: 'complete', text: buildCompleteText(reports, state.pageNum), report });
}

async function activateRunFigmaPage(run: BrochureRun, runIndex: number) {
    if (run.useCurrentFigmaPage && runIndex === 0) return;
    const pageName = normalizePageTitle(run.title);
    const page = figma.createPage();
    page.name = pageName;
    await figma.setCurrentPageAsync(page);
}

async function prepareDocumentCoverPage() {
    const coverPage = figma.root.children[0] || figma.currentPage;
    coverPage.name = "COVER";
    await figma.setCurrentPageAsync(coverPage);
    try {
        coverPage.backgrounds = [{ type: "SOLID", color: BRAND_COVER_COLOR }];
    } catch {
        // Page backgrounds are cosmetic; the cover frame carries the real fill.
    }

    for (const child of [...coverPage.children]) {
        if (child.name === "COVER" || child.name === "Cover Title") {
            child.remove();
        }
    }

    const cover = figma.createFrame();
    cover.name = "COVER";
    cover.resize(A4_W, A4_H);
    cover.fills = [{ type: "SOLID", color: BRAND_COVER_COLOR }];
    cover.clipsContent = false;
    safeSetPosition(cover, 0, 0, "cover frame");

    const title = figma.createText();
    await loadFontCached({ family: "Inter", style: "Bold" });
    title.fontName = { family: "Inter", style: "Bold" };
    title.name = "Cover Title";
    title.characters = `Акция ${getNextPromoMonthTitle()}`;
    title.fontSize = 52;
    title.textAlignHorizontal = "CENTER";
    title.textAlignVertical = "CENTER";
    title.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    title.resize(A4_W - 80, 96);
    safeSetPosition(title, 40, Math.round((A4_H - title.height) / 2), "cover title");
    cover.appendChild(title);
    coverPage.appendChild(cover);
}

async function loadBrochureMasters(): Promise<BrochureMasters> {
    let rowMaster = figma.root.findOne(n => n.type === 'COMPONENT' && n.name === 'RowItem') as ComponentNode;
    let cardMaster = figma.root.findOne(n => n.type === 'COMPONENT' && n.name === 'ProductCard') as ComponentNode;

    const cardFromKey = await getComponentByKey(KEY_PRODUCT_CARD);
    if (cardFromKey) cardMaster = cardFromKey;

    const boxCardMaster = await getComponentByKey(KEY_PRODUCT_BOX_CARD);
    const boxNoticeTopMaster = await getComponentByKey(KEY_BOX_NOTICE_TOP);
    const boxNoticeBottomMaster = await getComponentByKey(KEY_BOX_NOTICE_BOTTOM);

    const rowFromKey = await getComponentByKey(KEY_ROW_ITEM);
    if (rowFromKey) rowMaster = rowFromKey;

    const boxRowMaster = await getComponentByKey(KEY_ROW_ITEM_BOX);

    if (!rowMaster || (rowMaster as any).removed) {
        rowMaster = await getComponentByKey(KEY_ROW_ITEM) as ComponentNode;
    }
    if (!cardMaster || (cardMaster as any).removed) {
        cardMaster = await getComponentByKey(KEY_PRODUCT_CARD) as ComponentNode;
    }

    if (!rowMaster) throw new Error("Нет компонента RowItem");
    if (!cardMaster) throw new Error("Нет компонента ProductCard");

    return { cardMaster, boxCardMaster, rowMaster, boxRowMaster, boxNoticeTopMaster, boxNoticeBottomMaster };
}

function buildBrochureRuns(groups: Group[], layout: BrochureLayout): BrochureRun[] {
    if (Array.isArray(layout.runs) && layout.runs.length > 0) {
        return layout.runs
            .filter(run => Array.isArray(run.groups) && run.groups.length > 0)
            .map((run, index) => {
                const box = hasBoxGroups(run.groups);
                const fixed = run.promoType === "fixed";
                return {
                    title: normalizeLeafletName(run.title) || `Листовка ${index + 1}`,
                    groups: run.groups,
                    orderList: Array.isArray(run.orderList) ? run.orderList : [],
                    infoMap: run.infoMap || {},
                    promoType: run.promoType,
                    useCoverShift: !box && !fixed,
                    addBanner: true,
                    useCurrentFigmaPage: false
                };
            });
    }

    if (hasBoxGroups(groups)) {
        return [{
            title: "Коробочная акция",
            groups,
            useCoverShift: false,
            addBanner: true,
            useCurrentFigmaPage: false
        }];
    }

    const hasLeaflets = groups.some(group => !!normalizeLeafletName(group.leafletName));
    if (!hasLeaflets) {
        return [{ title: normalizeLeafletName(layout.mainTitle) || "Каталог", groups, useCoverShift: true, addBanner: true }];
    }

    const runs: BrochureRun[] = [
        { title: normalizeLeafletName(layout.mainTitle) || "Общая листовка", groups, useCoverShift: true, addBanner: true }
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

    if (byLeaflet.size > 1) {
        for (const entry of byLeaflet.values()) {
            runs.push({ title: entry.title, groups: entry.groups, useCoverShift: true, addBanner: true });
        }
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
    const orderList: string[] = Array.isArray(run.orderList)
        ? run.orderList
        : (Array.isArray(layout?.orderList) ? layout.orderList : []);
    const strategy = getRunStrategy(run.groups);
    const boxMode = strategy.boxMode;
    const isCommonPromo = run.promoType === "common" || (!run.promoType && !strategy.boxMode);
    const startOnSecondPage = isCommonPromo && !strategy.boxMode && run.useCoverShift && giftBlockEnabled;
    const firstPageShift = run.useCoverShift
        ? resolveShiftPx(giftBlockEnabled ? 0 : CONFIG.FIRST_PAGE_SHIFT_DEFAULT)
        : 0;

    if (startOnSecondPage) {
        state.pageNum++;
        const blank = createBlankPage(state.pageNum);
        registerPage(state, state.pageNum, blank);
        nameRunPage(blank, run.title, 1);
        positionPageInRun(blank, runIndex, 1);
        let coverBottom = 0;
        if (run.addBanner) {
            coverBottom = await addBannerToPage(blank, run.infoMap || layout.infoMap || {}, run.groups, run.promoType);
        }
        if (isCommonPromo) {
            await addCommonGiftBlockToPage(blank, coverBottom);
        }
        if (strategy.addTopBoxNotice) {
            await addBoxNoticeToPage(blank, masters.boxNoticeTopMaster, "top");
        }
        if (strategy.addPaginator) {
            await addPaginatorToPage(blank, run.title, 1);
        }
    }

    let localPageNum = startOnSecondPage ? 2 : 1;
    state.pageNum++;
    let currentLayout = createPageWithColumns(state.pageNum, boxMode ? 0 : (run.useCoverShift ? firstPageShift : 0));
    registerPage(state, state.pageNum, currentLayout.page);
    nameRunPage(currentLayout.page, run.title, localPageNum);
    positionPageInRun(currentLayout.page, runIndex, localPageNum);
    state.lastPage = currentLayout.page;

    if (run.addBanner && !startOnSecondPage) {
        const bannerBottom = await addBannerToPage(currentLayout.page, run.infoMap || layout.infoMap || {}, run.groups, run.promoType);
        if (strategy.addTopBoxNotice) {
            const noticeBottom = await addBoxNoticeToPage(currentLayout.page, masters.boxNoticeTopMaster, "top", bannerBottom);
            shiftColumnsBelowHeader(currentLayout.columns, Math.max(bannerBottom, noticeBottom));
        }
    }
    if (strategy.addPaginator) {
        await addPaginatorToPage(currentLayout.page, run.title, localPageNum);
    }

    let adPlaceholders = 0;
    const adSizes: string[] = [];
    let cardErrors = 0;
    let activeColIndex = 0;
    let activeColumn = currentLayout.columns[0];
    const orderedGroups = orderGroupsBySku(run.groups, orderList);

    for (const group of orderedGroups) {
        ensureNotCancelled(opts);

        const colMaxH = currentLayout.columns[0].height;
        let cardsToPlace: FrameNode[] = [];

        const groupCardMaster = getCardMasterForGroup(masters, group);
        const groupRowMaster = getRowMasterForGroup(masters, group);
        let cardFrame: FrameNode;
        try {
            cardFrame = await createProductCard(groupCardMaster, group, groupRowMaster);
        } catch (err) {
            cardErrors++;
            cardFrame = await createCardErrorPlaceholder(group, err);
        }
        if (cardFrame.height > colMaxH) {
            let doSplit = !!opts?.autoSplit;
            if (!doSplit && opts?.askSplit) {
                doSplit = await opts.askSplit(cardFrame.name, cardFrame.height, colMaxH);
            }
            if (doSplit) {
                cardsToPlace = await buildSplitCards(groupCardMaster, groupRowMaster, group, colMaxH, colMaxH, splitMetrics);
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

            const previousColumn = activeColumn;
            const previousPageNum = state.pageNum;
            const hadContentBeforeCard = previousColumn.children.some(child => !isAdPlaceholder(child));
            removeAdPlaceholdersFromColumn(activeColumn);

            if (hadContentBeforeCard && !canFitPacked(activeColumn, card.height, FIT_HEIGHT_TOLERANCE)) {
                if (activeColIndex === 0) {
                    activeColIndex = 1;
                    activeColumn = currentLayout.columns[1];
                } else {
                    currentLayout = await createNextPage(state, run.title, ++localPageNum, runIndex, strategy.addPaginator);
                    activeColIndex = 0;
                    activeColumn = currentLayout.columns[0];
                }

                const adSize = await safeAppendAdPlaceholderIfRoom(
                    previousColumn,
                    previousPageNum,
                    getRemainingHeight,
                    card.height,
                    FIT_HEIGHT_TOLERANCE
                );
                if (adSize) {
                    adPlaceholders++;
                    adSizes.push(adSize);
                }
            }

            activeColumn.appendChild(card);

            if (hadContentBeforeCard && isColumnPackedOverflow(activeColumn, FIT_HEIGHT_TOLERANCE)) {
                if (activeColIndex === 0) {
                    activeColIndex = 1;
                    activeColumn = currentLayout.columns[1];
                } else {
                    currentLayout = await createNextPage(state, run.title, ++localPageNum, runIndex, strategy.addPaginator);
                    activeColIndex = 0;
                    activeColumn = currentLayout.columns[0];
                }
                activeColumn.appendChild(card);
            }
        }

        await onProgress(1);
    }

    balanceRunPagesColumns(state, startPageNum);

    if (rebalanceLonelyLastPageBeforeFooter(state)) {
        localPageNum--;
    }

    const footerAdSize = await finalizeRunFooter(
        state,
        run.title,
        runIndex,
        localPageNum,
        strategy.addBottomBoxNotice ? masters.boxNoticeBottomMaster : null,
        strategy.addPaginator
    );
    if (footerAdSize) {
        adPlaceholders++;
        adSizes.push(footerAdSize);
    }
    return {
        title: normalizePageTitle(run.title),
        pages: state.pageNum - startPageNum + 1,
        products: run.groups.length,
        adPlaceholders,
        adSizes,
        cardErrors
    };
}

function rebalanceLonelyLastPageBeforeFooter(state: BrochureState): boolean {
    if (state.pageNum <= 1 || !state.lastPage) return false;
    const lastPage = state.lastPage;
    const previousPage = state.pagesByNumber.get(state.pageNum - 1);
    if (!previousPage) return false;

    const lastColumns = getPageColumns(lastPage);
    const previousColumns = getPageColumns(previousPage);
    if (lastColumns.length < 2 || previousColumns.length < 2) return false;

    const lastCards: SceneNode[] = [];
    for (const col of lastColumns) {
        lastCards.push(...col.children.filter(isProductLikeNode));
    }
    if (lastCards.length !== 1) return false;

    const previousRightColumn = previousColumns[1];
    const lastPreviousChild = previousRightColumn.children[previousRightColumn.children.length - 1];
    if (!lastPreviousChild || !isAdPlaceholder(lastPreviousChild)) return false;

    const card = lastCards[0] as FrameNode;
    const availableWithoutAd = getRemainingHeight(previousRightColumn) + lastPreviousChild.height;
    if (card.height > availableWithoutAd + FIT_HEIGHT_TOLERANCE) return false;

    lastPreviousChild.remove();
    fitCardInColumn(previousRightColumn, card);
    previousRightColumn.appendChild(card);
    lastPage.remove();
    state.pagesByNumber.delete(state.pageNum);
    state.pageNum--;
    state.lastPage = previousPage;
    return true;
}

function getPageColumns(page: FrameNode): FrameNode[] {
    return page.children.filter(child =>
        child.type === "FRAME" && /column/i.test(child.name || "")
    ) as FrameNode[];
}

function balanceRunPagesColumns(state: BrochureState, startPageNum: number) {
    for (let pageNum = startPageNum; pageNum <= state.pageNum; pageNum++) {
        const page = state.pagesByNumber.get(pageNum);
        if (!page) continue;
        balancePageColumnsPreservingOrder(page);
    }
}

function balancePageColumnsPreservingOrder(page: FrameNode) {
    const columns = getPageColumns(page);
    if (columns.length < 2) return false;
    const [left, right] = columns;
    let moved = false;

    for (let guard = 0; guard < 10; guard++) {
        const leftCards = left.children.filter(isProductLikeNode) as SceneNode[];
        if (leftCards.length < 2) break;

        const leftH = calculatePackedContentHeight(left);
        const rightH = calculatePackedContentHeight(right);
        if (leftH - rightH < 120) break;

        const card = leftCards[leftCards.length - 1];
        if (!canFitPacked(right, card.height, FIT_HEIGHT_TOLERANCE)) break;

        right.insertChild(0, card);
        moved = true;
    }

    return moved;
}

async function balanceSparseLastPageAndAddAd(page: FrameNode, pageNum: number, reservedBottom: number): Promise<string | null> {
    const columns = getPageColumns(page);
    if (columns.length < 2) return null;
    const [left, right] = columns;
    const leftCards = left.children.filter(isProductLikeNode) as SceneNode[];
    const rightCards = right.children.filter(isProductLikeNode) as SceneNode[];
    if (leftCards.length < 2 || rightCards.length > 0) return null;
    if (page.children.some(isAdPlaceholder)) return null;

    const splitIndex = findBestLastPageSplit(leftCards);
    if (splitIndex <= 0 || splitIndex >= leftCards.length) return null;
    const cardsToMove = leftCards.slice(splitIndex);
    for (const card of cardsToMove) {
        right.appendChild(card);
    }

    const bottomY = shrinkColumnsToContent(columns);
    const footerTop = A4_H - reservedBottom;
    const adGap = 10;
    const adY = bottomY + adGap;
    const adHeight = footerTop - adY;
    return appendPageAdPlaceholder(
        page,
        pageNum,
        PAD_X,
        adY,
        A4_W - (PAD_X * 2),
        adHeight
    );
}

async function safeAppendAdPlaceholderIfRoom(
    column: FrameNode,
    pageNum: number,
    getRemainingHeight: (column: FrameNode) => number,
    nextCardHeight?: number,
    nearFitTolerance: number = 0
): Promise<string | null> {
    try {
        return await appendAdPlaceholderIfRoom(column, pageNum, getRemainingHeight, nextCardHeight, nearFitTolerance);
    } catch (err) {
        logGenerationIssue(`Не удалось создать рекламный блок: ${String((err as any)?.message || err)}`);
        return null;
    }
}

async function safeBalanceSparseLastPageAndAddAd(
    page: FrameNode,
    pageNum: number,
    reservedBottom: number
): Promise<string | null> {
    try {
        return await balanceSparseLastPageAndAddAd(page, pageNum, reservedBottom);
    } catch (err) {
        logGenerationIssue(`Не удалось перераспределить последнюю страницу под рекламный блок: ${String((err as any)?.message || err)}`);
        return null;
    }
}

function logGenerationIssue(text: string) {
    figma.ui.postMessage({ type: "log", text });
}

function findBestLastPageSplit(cards: SceneNode[]): number {
    let bestIndex = Math.ceil(cards.length / 2);
    let bestDiff = Number.POSITIVE_INFINITY;
    for (let split = 1; split < cards.length; split++) {
        const leftH = estimateStackHeight(cards.slice(0, split));
        const rightH = estimateStackHeight(cards.slice(split));
        const diff = Math.abs(leftH - rightH);
        if (diff < bestDiff) {
            bestDiff = diff;
            bestIndex = split;
        }
    }
    return bestIndex;
}

function estimateStackHeight(nodes: SceneNode[]): number {
    const content = nodes.reduce((sum, node) => sum + node.height, 0);
    return content + Math.max(0, nodes.length - 1) * CONFIG.ITEM_GAP;
}

function shrinkColumnsToContent(columns: FrameNode[]): number {
    let maxBottom = 0;
    for (const col of columns) {
        const contentH = calculatePackedContentHeight(col);
        const nextH = Math.max(1, contentH);
        try {
            col.resize(col.width, nextH);
        } catch {
            // Keep current height if Figma refuses resizing.
        }
        maxBottom = Math.max(maxBottom, col.y + nextH);
    }
    return maxBottom;
}

function isProductLikeNode(node: SceneNode): boolean {
    return /^Card/i.test(node.name || "");
}

function isAdPlaceholder(node: SceneNode): boolean {
    return /^Ad_\d+x\d+_Page\d+/i.test(node.name || "");
}

function removeAdPlaceholdersFromColumn(column: FrameNode) {
    for (const child of [...column.children]) {
        if (isAdPlaceholder(child)) child.remove();
    }
}

function cleanupTrailingEmptyPages(state: BrochureState): number {
    let removed = 0;
    while (state.pageNum > 0) {
        const page = state.pagesByNumber.get(state.pageNum);
        if (!page || !isEmptyGeneratedPage(page)) break;
        page.remove();
        state.pagesByNumber.delete(state.pageNum);
        state.pageNum--;
        state.lastPage = state.pagesByNumber.get(state.pageNum) || null;
        removed++;
    }
    return removed;
}

function isEmptyGeneratedPage(page: FrameNode): boolean {
    for (const child of page.children) {
        if (child.type === "FRAME" && /column/i.test(child.name || "")) {
            if (child.children.length > 0) return false;
            continue;
        }
        return false;
    }
    return true;
}

function getRunStrategy(groups: Group[]): RunStrategy {
    const boxMode = hasBoxGroups(groups);
    return {
        boxMode,
        addPaginator: !boxMode,
        addTopBoxNotice: boxMode,
        addBottomBoxNotice: boxMode
    };
}

async function finalizeRunFooter(
    state: BrochureState,
    title: string,
    runIndex: number,
    localPageNum: number,
    boxNoticeBottomMaster: ComponentNode | null = null,
    addPaginators: boolean = true
): Promise<string | null> {
    if (!state.lastPage) return null;
    if (CONFIG.FOOTER_ENABLED === false) return null;
    const beforeFooterPageNum = state.pageNum;
    const reservedBottom = CONFIG.FOOTER_H + (boxNoticeBottomMaster ? CONFIG.BOX_FOOTER_NOTICE_H : 0);
    const footerResult = relocateOverflowForFooter(state.lastPage, state.pageNum, reservedBottom);
    state.lastPage = footerResult.lastPage;
    state.pageNum = footerResult.pageNum;
    const footerAdSize = await safeBalanceSparseLastPageAndAddAd(state.lastPage, state.pageNum, reservedBottom);
    await addPaginatorsToRelocatedPages(
        state,
        beforeFooterPageNum + 1,
        state.pageNum,
        title,
        localPageNum + 1,
        runIndex,
        addPaginators
    );
    if (boxNoticeBottomMaster) {
        await addBoxNoticeToPage(state.lastPage, boxNoticeBottomMaster, "bottom");
    }
    await addFooterToPage(state.lastPage);
    return footerAdSize;
}

async function addPaginatorsToRelocatedPages(
    state: BrochureState,
    fromPageNum: number,
    toPageNum: number,
    title: string,
    startLocalPageNum: number,
    runIndex: number,
    addPaginator: boolean = true
) {
    let localPageNum = startLocalPageNum;
    for (let pageNum = fromPageNum; pageNum <= toPageNum; pageNum++) {
        const page = state.pagesByNumber.get(pageNum) || findGeneratedPageByNumber(pageNum);
        if (!page) continue;
        registerPage(state, pageNum, page);
        nameRunPage(page, title, localPageNum);
        positionPageInRun(page, runIndex, localPageNum);
        if (addPaginator) {
            await addPaginatorToPage(page, title, localPageNum);
        }
        localPageNum++;
    }
}

function findGeneratedPage(pageNum: number): FrameNode | null {
    return figma.root.findOne(n =>
        n.type === "FRAME" && n.name === `Страница ${pageNum}` && isTopLevelA4Page(n)
    ) as FrameNode | null;
}

async function createNextPage(
    state: BrochureState,
    title: string,
    localPageNum: number,
    runIndex: number,
    addPaginator: boolean = true
) {
    state.pageNum++;
    const nextLayout = createPageWithColumns(state.pageNum, 0);
    registerPage(state, state.pageNum, nextLayout.page);
    nameRunPage(nextLayout.page, title, localPageNum);
    positionPageInRun(nextLayout.page, runIndex, localPageNum);
    state.lastPage = nextLayout.page;
    if (addPaginator) {
        await addPaginatorToPage(nextLayout.page, title, localPageNum);
    }
    return nextLayout;
}

function findGeneratedPageByNumber(pageNum: number): FrameNode | null {
    return figma.root.findOne(n =>
        n.type === "FRAME" &&
        isTopLevelA4Page(n) &&
        getPageNumberFromName(n.name || "") === pageNum
    ) as FrameNode | null;
}

function registerPage(state: BrochureState, pageNum: number, page: FrameNode) {
    if (!isTopLevelA4Page(page)) {
        const pageName = (page as BaseNode).name || "без имени";
        figma.ui.postMessage({ type: "log", text: `Пропущена регистрация вложенной страницы: ${pageName}` });
        return;
    }
    state.pagesByNumber.set(pageNum, page);
}

function isTopLevelA4Page(node: BaseNode): node is FrameNode {
    if (node.type !== "FRAME") return false;
    if (node.parent?.type !== "PAGE") return false;
    return Math.abs(node.width - A4_W) <= 2 && Math.abs(node.height - A4_H) <= 2;
}

function getPageNumberFromName(name: string): number | null {
    const match = /(\d+)$/.exec(name);
    if (!match) return null;
    const value = Number(match[1]);
    return Number.isFinite(value) ? value : null;
}

function positionPageInRun(page: FrameNode, runIndex: number, localPageNum: number) {
    safeSetPosition(page, (localPageNum - 1) * (A4_W + 50), 0, "run page");
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
    await fillCardData(cardFrame, group, rowMaster);
    return cardFrame;
}

async function createCardErrorPlaceholder(group: Group, err: unknown): Promise<FrameNode> {
    const frame = figma.createFrame();
    frame.name = group.mainSku ? `CardError${String(group.mainSku)}` : "CardError";
    frame.resize(COL_W, CONFIG.MIN_CARD_HEIGHT);
    frame.fills = [{ type: "SOLID", color: { r: 0.96, g: 0.92, b: 0.92 } }];
    frame.strokes = [{ type: "SOLID", color: { r: 0.75, g: 0.2, b: 0.2 } }];
    frame.strokeWeight = 1;

    const text = figma.createText();
    await loadFontCached({ family: "Inter", style: "Bold" });
    text.fontName = { family: "Inter", style: "Bold" };
    text.characters = `Ошибка карточки\n${group.mainSku || group.headerName || ""}`;
    text.fontSize = 14;
    text.textAlignHorizontal = "CENTER";
    text.textAlignVertical = "CENTER";
    text.resize(COL_W - 20, frame.height - 20);
    safeSetPosition(text, 10, 10, "card error text");
    text.fills = [{ type: "SOLID", color: { r: 0.45, g: 0.08, b: 0.08 } }];
    frame.appendChild(text);

    figma.ui.postMessage({ type: "log", text: `Ошибка карточки ${group.mainSku || group.headerName}: ${String((err as any)?.message || err)}` });
    return frame;
}

function getCardMasterForGroup(masters: BrochureMasters, group: Group): ComponentNode {
    if (group.cardType === "box" && masters.boxCardMaster) {
        return masters.boxCardMaster;
    }
    return masters.cardMaster;
}

function getRowMasterForGroup(masters: BrochureMasters, group: Group): ComponentNode {
    if (group.cardType === "box" && masters.boxRowMaster) {
        return masters.boxRowMaster;
    }
    return masters.rowMaster;
}

function hasBoxGroups(groups: Group[]): boolean {
    return groups.some(group =>
        group.cardType === "box" ||
        !!group.multiplicityText ||
        !!group.boxQtyText ||
        !!group.boxNoticeText ||
        (group.items || []).some(item => !!item.multiplicity || !!item.boxQty || !!item.boxNotice)
    );
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
    return getPackedRemainingHeight(column);
}

function fitCardInColumn(column: FrameNode, card: FrameNode): boolean {
    const remainingH = getPackedRemainingHeight(column);
    if (card.height > column.height && remainingH < MIN_REMAINING_FOR_SPLIT) {
        return false;
    }
    return canFitPacked(column, card.height, FIT_HEIGHT_TOLERANCE);
}

function isColumnPackedOverflow(column: FrameNode, tolerance: number = 0): boolean {
    return calculatePackedContentHeight(column) > column.height + tolerance;
}

function normalizeLeafletName(value?: string | null): string {
    return String(value || "").replace(/\s+/g, " ").trim();
}

function getNextPromoMonthTitle(): string {
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const monthIndex = target.getMonth();
    const months = [
        "\u042f\u043d\u0432\u0430\u0440\u044c",
        "\u0424\u0435\u0432\u0440\u0430\u043b\u044c",
        "\u041c\u0430\u0440\u0442",
        "\u0410\u043f\u0440\u0435\u043b\u044c",
        "\u041c\u0430\u0439",
        "\u0418\u044e\u043d\u044c",
        "\u0418\u044e\u043b\u044c",
        "\u0410\u0432\u0433\u0443\u0441\u0442",
        "\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c",
        "\u041e\u043a\u0442\u044f\u0431\u0440\u044c",
        "\u041d\u043e\u044f\u0431\u0440\u044c",
        "\u0414\u0435\u043a\u0430\u0431\u0440\u044c"
    ];
    return `${months[monthIndex]} ${target.getFullYear()}`;
}

function countOverflowNodes(pages: FrameNode[]): number {
    let count = 0;
    for (const page of pages) {
        for (const child of page.children) {
            if (child.x < -0.5 || child.y < -0.5) {
                count++;
                continue;
            }
            if (child.x + child.width > page.width + 0.5 || child.y + child.height > page.height + 0.5) {
                count++;
            }
        }
    }
    return count;
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

async function addBannerToPage(
    page: FrameNode,
    infoMap: any = {},
    groups: Group[] = [],
    promoType: "common" | "box" | "fixed" | "auto" = "auto"
): Promise<number> {
    const bannerComp = await getComponentByKey(KEY_BANNER);
    if (!bannerComp) return 0;
    const bannerInstance = (bannerComp as ComponentNode).createInstance();
    page.appendChild(bannerInstance);
    safeSetPosition(bannerInstance, 0, 0, "banner");
    await updateSaleBannerInfo(infoMap, groups, bannerInstance, promoType);
    return bannerInstance.y + bannerInstance.height;
}

async function addBoxNoticeToPage(
    page: FrameNode,
    noticeMaster: ComponentNode | null,
    placement: "top" | "bottom",
    topY?: number
): Promise<number> {
    if (!noticeMaster) return topY || 0;
    const notice = noticeMaster.createInstance();
    const targetHeight = placement === "top"
        ? CONFIG.BOX_HEADER_NOTICE_H
        : CONFIG.BOX_FOOTER_NOTICE_H;
    const targetWidth = placement === "top"
        ? CONFIG.BOX_HEADER_NOTICE_W
        : (CONFIG.BOX_FOOTER_NOTICE_W || A4_W);
    const noticeX = Math.round((A4_W - targetWidth) / 2);
    resizeNotice(notice, targetWidth, targetHeight);
    let noticeY = 0;
    if (placement === "top") {
        const baseY = topY !== undefined
            ? topY
            : page.children.reduce((max, child) => Math.max(max, child.y + child.height), 0);
        noticeY = baseY + CONFIG.BOX_HEADER_NOTICE_GAP_TOP;
    } else {
        noticeY = Math.max(0, A4_H - CONFIG.FOOTER_H - targetHeight);
    }
    page.appendChild(notice);
    safeSetPosition(notice, noticeX, noticeY, `${placement} box notice`);
    return notice.y + targetHeight + (placement === "top" ? CONFIG.BOX_HEADER_NOTICE_GAP_BOTTOM : 0);
}

function safeSetPosition(node: SceneNode, x: number, y: number, label: string) {
    if ((node.parent as BaseNode | null)?.type === "INSTANCE") {
        figma.ui.postMessage({ type: "log", text: `Пропущены координаты ${label}: слой внутри instance` });
        return;
    }
    try {
        node.x = x;
        node.y = y;
    } catch (err) {
        figma.ui.postMessage({ type: "log", text: `Не удалось поставить координаты ${label}: ${String((err as any)?.message || err)}` });
    }
}

function resizeNotice(notice: InstanceNode, width: number, height: number) {
    try {
        notice.resizeWithoutConstraints(width, height);
    } catch {
        try {
            notice.resize(width, height);
        } catch {
            // Keep component size if Figma refuses resizing.
        }
    }
}

function shiftColumnsBelowHeader(columns: FrameNode[], headerBottom: number) {
    const top = Math.max(0, headerBottom);
    for (const col of columns) {
        safeSetPosition(col, col.x, top, "column below header");
        col.resize(col.width, Math.max(0, A4_H - top - CONFIG.PAD_Y));
    }
}

function yieldToUi(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 0));
}


