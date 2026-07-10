import { loadFontCached } from './utils';

const LOG_PAGE_NAME = "Политех Верстальщик - лог";

type RunLogReport = {
    pages?: number;
    leaflets?: number;
    overflowCount?: number;
    totalMs?: number;
    figmaMs?: number;
    uiStats?: {
        imageFetchMs?: number;
        payloadMs?: number;
        totalUiMs?: number;
    } | null;
    emptyPagesRemoved?: number;
    runs?: Array<{
        title?: string;
        pages?: number;
        products?: number;
        adPlaceholders?: number;
        adSizes?: string[];
        cardErrors?: number;
        layoutMs?: number;
    }>;
};

export async function writeRunLogPage(report: RunLogReport) {
    const page = getOrCreateLogPage();
    clearPage(page);

    const frame = figma.createFrame();
    frame.name = `Лог ${formatDate(new Date())}`;
    safeSetPosition(frame, 0, 0, "log frame");
    frame.resize(900, 1200);
    frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    page.appendChild(frame);

    const text = figma.createText();
    await loadFontCached({ family: "Inter", style: "Regular" });
    text.fontName = { family: "Inter", style: "Regular" };
    text.fontSize = 16;
    text.lineHeight = { unit: "PIXELS", value: 24 };
    text.characters = buildLogText(report);
    safeSetPosition(text, 32, 32, "log text");
    text.resize(820, 1100);
    text.fills = [{ type: "SOLID", color: { r: 0.12, g: 0.12, b: 0.12 } }];
    frame.appendChild(text);
}

function safeSetPosition(node: SceneNode, x: number, y: number, label: string) {
    if ((node.parent as BaseNode | null)?.type === "INSTANCE") {
        figma.ui.postMessage({
            type: "log",
            text: `Пропущены координаты ${label}: слой внутри instance`
        });
        return;
    }
    try {
        node.x = x;
        node.y = y;
    } catch (err) {
        figma.ui.postMessage({
            type: "log",
            text: `Не удалось поставить координаты ${label}: ${String((err as any)?.message || err)}`
        });
    }
}

function getOrCreateLogPage(): PageNode {
    const existing = figma.root.children.find(page => page.name === LOG_PAGE_NAME);
    if (existing) return existing;
    const page = figma.createPage();
    page.name = LOG_PAGE_NAME;
    return page;
}

function clearPage(page: PageNode) {
    for (const child of [...page.children]) {
        child.remove();
    }
}

function buildLogText(report: RunLogReport): string {
    const lines = [
        "Политех Верстальщик",
        `Лог генерации: ${formatDate(new Date())}`,
        "",
        `Страниц: ${report.pages || 0}`,
        `Листовок: ${report.leaflets || 0}`,
        `Переполнений: ${report.overflowCount || 0}`,
        `Пустых страниц удалено: ${report.emptyPagesRemoved || 0}`,
        `Фото: ${formatMs(report.uiStats?.imageFetchMs)}`,
        `Подготовка данных UI: ${formatMs(report.uiStats?.payloadMs)}`,
        `UI всего: ${formatMs(report.uiStats?.totalUiMs)}`,
        `Figma-верстка: ${formatMs(report.figmaMs)}`,
        `Полное время: ${formatMs(report.totalMs)}`,
        "",
        "Запуски:"
    ];

    for (const run of report.runs || []) {
        lines.push(
            `- ${run.title || "Листовка"}: ${run.pages || 0} стр., ${run.products || 0} товаров, ` +
            `рекламных мест ${run.adPlaceholders || 0}, ошибок карточек ${run.cardErrors || 0}, ` +
            `верстка ${formatMs(run.layoutMs)}`
        );
        if (Array.isArray(run.adSizes) && run.adSizes.length > 0) {
            lines.push(`  Рекламные места: ${run.adSizes.join("; ")}`);
        }
    }

    return lines.join("\n");
}

function formatMs(value?: number): string {
    if (!Number.isFinite(value || NaN)) return "0мс";
    const ms = Math.round(value || 0);
    return ms >= 1000 ? `${(ms / 1000).toFixed(1)}с` : `${ms}мс`;
}

function formatDate(date: Date): string {
    return date.toLocaleString("ru-RU");
}
