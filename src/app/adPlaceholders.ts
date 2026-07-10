import { A4_W, CONFIG, PAD_X } from './config';
import { loadFontCached } from './utils';

export async function appendAdPlaceholderIfRoom(
    column: FrameNode,
    pageNum: number,
    getRemainingHeight: (column: FrameNode) => number,
    nextCardHeight?: number,
    nearFitTolerance: number = 0
): Promise<string | null> {
    const remainingH = Math.floor(getRemainingHeight(column));
    if (remainingH < CONFIG.AD_PLACEHOLDER_MIN_H) return null;
    if (Number.isFinite(nextCardHeight) && nextCardHeight! - remainingH <= nearFitTolerance) return null;
    const width = Math.round(column.width);
    const height = remainingH;

    const placeholder = figma.createFrame();
    placeholder.name = `Ad_${width}x${height}_Page${String(pageNum).padStart(2, "0")}`;
    placeholder.resize(column.width, remainingH);
    placeholder.fills = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
    placeholder.strokes = [{ type: "SOLID", color: { r: 0.72, g: 0.72, b: 0.72 } }];
    placeholder.strokeWeight = 1;
    placeholder.dashPattern = [6, 4];
    placeholder.cornerRadius = 0;
    placeholder.clipsContent = false;

    const text = figma.createText();
    await loadFontCached({ family: "Inter", style: "Bold" });
    text.fontName = { family: "Inter", style: "Bold" };
    text.characters = `Рекламный баннер сюда\n${width} x ${height}`;
    text.fontSize = 16;
    text.textAlignHorizontal = "CENTER";
    text.textAlignVertical = "CENTER";
    text.resize(placeholder.width - 24, Math.min(96, placeholder.height));
    safeSetPosition(text, 12, Math.round((placeholder.height - text.height) / 2), "ad text");
    text.fills = [{ type: "SOLID", color: { r: 0.42, g: 0.42, b: 0.42 } }];
    placeholder.appendChild(text);

    if (column.layoutMode !== "NONE") {
        placeholder.layoutAlign = "STRETCH";
    }
    column.appendChild(placeholder);
    return `стр ${pageNum}: ${width}x${height}`;
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

export async function appendPageAdPlaceholder(
    page: FrameNode,
    pageNum: number,
    x: number,
    y: number,
    width: number,
    height: number
): Promise<string | null> {
    const safeHeight = Math.floor(height);
    if (safeHeight < CONFIG.AD_PLACEHOLDER_MIN_H) return null;
    const safeWidth = Math.floor(width || (A4_W - PAD_X * 2));

    const placeholder = figma.createFrame();
    placeholder.name = `Ad_${safeWidth}x${safeHeight}_Page${String(pageNum).padStart(2, "0")}`;
    placeholder.resize(safeWidth, safeHeight);
    placeholder.fills = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
    placeholder.strokes = [{ type: "SOLID", color: { r: 0.72, g: 0.72, b: 0.72 } }];
    placeholder.strokeWeight = 1;
    placeholder.dashPattern = [6, 4];
    placeholder.cornerRadius = 0;
    placeholder.clipsContent = false;

    const text = figma.createText();
    await loadFontCached({ family: "Inter", style: "Bold" });
    text.fontName = { family: "Inter", style: "Bold" };
    text.characters = `Рекламный баннер сюда\n${safeWidth} x ${safeHeight}`;
    text.fontSize = 16;
    text.textAlignHorizontal = "CENTER";
    text.textAlignVertical = "CENTER";
    text.resize(Math.max(1, safeWidth - 24), Math.min(96, safeHeight));
    safeSetPosition(text, 12, Math.round((safeHeight - text.height) / 2), "page ad text");
    text.fills = [{ type: "SOLID", color: { r: 0.42, g: 0.42, b: 0.42 } }];
    placeholder.appendChild(text);

    page.appendChild(placeholder);
    safeSetPosition(placeholder, Math.round(x), Math.round(y), "page ad");
    return `стр ${pageNum}: ${safeWidth}x${safeHeight}`;
}
