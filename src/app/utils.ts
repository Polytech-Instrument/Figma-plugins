import { KEY_FOOTER } from './config';

export function normalizeNameKey(name: string): string {
    return name.replace(/[\s#!]/g, "").toLowerCase();
}

const nodeIndexCache = new WeakMap<BaseNode, Map<string, SceneNode[]>>();

function getNodeIndex(root: FrameNode | InstanceNode): Map<string, SceneNode[]> {
    const cached = nodeIndexCache.get(root);
    if (cached) return cached;
    const index = new Map<string, SceneNode[]>();
    const nodes = root.findAll ? root.findAll(() => true) as SceneNode[] : [];
    for (const node of nodes) {
        const key = normalizeNameKey(node.name || "");
        if (!key) continue;
        const bucket = index.get(key) || [];
        bucket.push(node);
        index.set(key, bucket);
    }
    nodeIndexCache.set(root, index);
    return index;
}

export function clearNodeLookupCache(root: FrameNode | InstanceNode) {
    nodeIndexCache.delete(root);
}

export function findTextInRow(row: FrameNode | InstanceNode, name: string): TextNode | null {
    const target = normalizeNameKey(name);
    const node = (getNodeIndex(row).get(target) || []).find(n => n.type === 'TEXT') as TextNode | undefined;
    return node || null;
}

export function findTextInNode(node: FrameNode | InstanceNode, name: string): TextNode | null {
    const target = normalizeNameKey(name);
    const found = (getNodeIndex(node).get(target) || []).find(n => n.type === 'TEXT') as TextNode | undefined;
    return found || null;
}

export function findNodeInCard(card: FrameNode | InstanceNode, name: string): SceneNode | null {
    const target = normalizeNameKey(name);
    const found = (getNodeIndex(card).get(target) || [])[0] as SceneNode | undefined;
    return found || null;
}

export function findNodeInRowByName(row: FrameNode | InstanceNode, name: string): SceneNode | null {
    const target = normalizeNameKey(name);
    const node = (getNodeIndex(row).get(target) || [])[0] as SceneNode | undefined;
    return node || null;
}

export async function loadFontForNode(node: TextNode) {
    if (node.fontName === figma.mixed) {
        const fonts = node.getRangeAllFontNames(0, node.characters.length);
        const seen = new Set<string>();
        for (const font of fonts) {
            const key = `${font.family}__${font.style}`;
            if (seen.has(key)) continue;
            seen.add(key);
            await loadFontCached(font);
        }
        return;
    }
    await loadFontCached(node.fontName as FontName);
}

const loadedFonts = new Set<string>();

export async function loadFontCached(fontName: FontName) {
    const key = `${fontName.family}__${fontName.style}`;
    if (loadedFonts.has(key)) return;
    try {
        await figma.loadFontAsync(fontName);
        loadedFonts.add(key);
    } catch (err) {
        figma.ui.postMessage({ type: "log", text: `Font load error: ${key}` });
    }
}

const libraryComponentCache = new Map<string, ComponentNode>();

export async function getComponentByKey(key: string): Promise<ComponentNode | null> {
    if (!key) return null;
    if (libraryComponentCache.has(key)) {
        return libraryComponentCache.get(key) || null;
    }
    try {
        const comp = await figma.importComponentByKeyAsync(key);
        libraryComponentCache.set(key, comp as ComponentNode);
        return comp as ComponentNode;
    } catch (err) {
        figma.ui.postMessage({ type: "log", text: `Import by key error: ${err}` });
        return null;
    }
}

export function normalizePriceText(raw: string): string {
    let text = (raw || "").trim();
    if (!text) return text;
    text = text
        .replace(/\s*за\s+руб\.?/gi, "")
        .replace(/\s*руб\.?/gi, "")
        .replace(/₽/g, "")
        .replace(/\u00A0/g, " ")
        .trim();
    const numeric = parsePriceNumber(text);
    if (numeric === null) return text;
    return numeric.toLocaleString("ru-RU", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).replace(/\u00A0/g, " ");
}

export function normalizeDiscountText(raw: string): string {
    let text = (raw || "").trim();
    if (!text) return text;
    text = text.replace(/%/g, "").trim();
    return text;
}

function parsePriceNumber(text: string): number | null {
    const compact = String(text || "")
        .replace(/\s/g, "")
        .replace(/[^\d,.\-]/g, "");
    if (!compact) return null;
    const comma = compact.lastIndexOf(",");
    const dot = compact.lastIndexOf(".");
    const decimalIndex = Math.max(comma, dot);
    let normalized = compact;
    if (decimalIndex !== -1) {
        const intPart = compact.slice(0, decimalIndex).replace(/[^\d\-]/g, "");
        const decPart = compact.slice(decimalIndex + 1).replace(/[^\d]/g, "");
        normalized = `${intPart}.${decPart}`;
    }
    const value = Number(normalized);
    return Number.isFinite(value) ? value : null;
}
