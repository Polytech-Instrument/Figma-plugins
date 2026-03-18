import { A4_W, A4_H, PAD_X, PAD_Y, COL_GAP, COL_W, ITEM_GAP, MAX_COL_H, FOOTER_H, KEY_FOOTER } from './config';
import { getComponentByKey } from './utils';

// Calculate total content height in a column.
export function calculateContentHeight(col: FrameNode): number {
    let h = 0;
    col.children.forEach(child => { h += child.height; });
    if (col.children.length > 0) h += (col.children.length - 1) * ITEM_GAP;
    return h;
}

// Pick the column with the best remaining space for a card.
export function findBestColumn(columns: FrameNode[], itemH: number): FrameNode | null {
    let best: FrameNode | null = null;
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

// Create an empty A4 page frame.
export function createBlankPage(num: number) {
    const page = figma.createFrame();
    page.name = `Страница ${num}`;
    page.resize(A4_W, A4_H);
    page.x = (num - 1) * (A4_W + 50);
    page.fills = [{type: 'SOLID', color: {r:1, g:1, b:1}}];
    page.clipsContent = false;
    return page;
}

// Append footer instance to the page bottom.
export async function addFooterToPage(page: FrameNode) {
    const footerComp = await getComponentByKey(KEY_FOOTER);
    if (!footerComp) return;
    const footerInstance = (footerComp as ComponentNode).createInstance();
    footerInstance.x = 0;
    footerInstance.y = Math.max(0, A4_H - FOOTER_H);
    page.appendChild(footerInstance);
}

// Collect left/right columns on a page.
export function getPageColumns(page: FrameNode): FrameNode[] {
    const cols = page.findAll(n =>
        n.type === "FRAME" && (n.name === "Left Column" || n.name === "Right Column")
    ) as FrameNode[];
    return cols.sort((a, b) => a.x - b.x);
}

// Collect cards that overflow into the footer area.
export function collectOverflowCards(page: FrameNode, footerTop: number): SceneNode[] {
    const overflow: SceneNode[] = [];
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

// Place overflow cards onto new pages.
export function layoutCardsOnNewPages(
    cards: SceneNode[],
    startPageNum: number,
    compactLayout: boolean
): { lastPage: FrameNode; pageNum: number } {
    let pageNum = startPageNum;
    let currentLayout = createPageWithColumns(pageNum, 0);
    let lastPage = currentLayout.page;

    let activeColIndex = 0;
    let activeColumn = currentLayout.columns[0];
    const allColumns: FrameNode[] = [...currentLayout.columns];

    for (const cardNode of cards) {
        const cardFrame = cardNode as FrameNode;
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
        } else {
            const currentContentH = calculateContentHeight(activeColumn);
            const newH = currentContentH + ITEM_GAP + cardFrame.height;
            const colMaxH = activeColumn.height;

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
            activeColumn.appendChild(cardFrame);
        }
    }

    return { lastPage, pageNum };
}

// Move overflow cards until footer area is clear.
export function relocateOverflowForFooter(
    lastPage: FrameNode,
    pageNum: number,
    compactLayout: boolean
): { lastPage: FrameNode; pageNum: number } {
    const footerTop = A4_H - FOOTER_H;
    let currentLast = lastPage;
    let currentPageNum = pageNum;

    for (let i = 0; i < 5; i++) {
        const overflowAll = collectOverflowCards(currentLast, footerTop);
        if (overflowAll.length === 0) break;

        // Try to place overflow back into the same page (other column) above footer.
        const columns = getPageColumns(currentLast);
        const remaining: SceneNode[] = [];
        for (const card of overflowAll) {
            let placed = false;
            for (const col of columns) {
                const maxH = Math.max(0, footerTop - col.y);
                const currentH = calculateContentHeight(col);
                const gap = col.children.length > 0 ? ITEM_GAP : 0;
                const remainingH = maxH - currentH - gap;
                if (remainingH >= card.height) {
                    col.appendChild(card);
                    placed = true;
                    break;
                }
            }
            if (!placed) remaining.push(card);
        }
        if (remaining.length === 0) break;

        const result = layoutCardsOnNewPages(remaining, currentPageNum + 1, compactLayout);
        currentLast = result.lastPage;
        currentPageNum = result.pageNum;
    }

    return { lastPage: currentLast, pageNum: currentPageNum };
}

// Create a page frame with two columns.
export function createPageWithColumns(num: number, shiftTopPx: number) {
    const page = figma.createFrame();
    page.name = `Страница ${num}`;
    page.resize(A4_W, A4_H);
    page.x = (num - 1) * (A4_W + 50);
    page.fills = [{type: 'SOLID', color: {r:1, g:1, b:1}}];
    page.clipsContent = false;

    const leftCol = figma.createFrame();
    leftCol.name = "Left Column";
    leftCol.clipsContent = false;
    setupColumnStyle(leftCol, shiftTopPx, num === 1 ? "MIN" : "SPACE_BETWEEN");
    leftCol.x = PAD_X;
    leftCol.y = PAD_Y + shiftTopPx;
    page.appendChild(leftCol);

    const rightCol = figma.createFrame();
    rightCol.name = "Right Column";
    rightCol.clipsContent = false;
    setupColumnStyle(rightCol, shiftTopPx, num === 1 ? "MIN" : "SPACE_BETWEEN");
    rightCol.x = PAD_X + COL_W + COL_GAP;
    rightCol.y = PAD_Y + shiftTopPx;
    page.appendChild(rightCol);

    return { page, columns: [leftCol, rightCol] };
}

// Configure layout properties for a column.
export function setupColumnStyle(
    col: FrameNode,
    shiftTopPx: number,
    primaryAxisAlignItems: AutoLayoutFrameMixin["primaryAxisAlignItems"] = "SPACE_BETWEEN"
) {
    const maxH = Math.max(0, MAX_COL_H - shiftTopPx);
    col.resize(COL_W, maxH);
    col.layoutMode = "VERTICAL";
    col.primaryAxisSizingMode = "FIXED";
    col.primaryAxisAlignItems = primaryAxisAlignItems;
    col.counterAxisSizingMode = "FIXED";
    col.itemSpacing = ITEM_GAP;
    col.fills = [];
}



