import { KEY_FOOTER } from './config';

export function normalizeNameKey(name: string): string {
    return name.replace(/[\s#]/g, "").toLowerCase();
}

export function findTextInRow(row: FrameNode | InstanceNode, name: string): TextNode | null {
    const target = normalizeNameKey(name);
    const node = row.findOne(n =>
        n.type === 'TEXT' && normalizeNameKey(n.name || "") === target
    ) as TextNode | null;
    return node || null;
}

export function findTextInNode(node: FrameNode | InstanceNode, name: string): TextNode | null {
    const target = normalizeNameKey(name);
    const found = node.findOne(n =>
        n.type === 'TEXT' && normalizeNameKey(n.name || "") === target
    ) as TextNode | null;
    return found || null;
}

export function findNodeInCard(card: FrameNode | InstanceNode, name: string): SceneNode | null {
    const target = normalizeNameKey(name);
    const found = card.findOne(n => normalizeNameKey(n.name || "") === target) as SceneNode | null;
    return found || null;
}

export function findNodeInRowByName(row: FrameNode | InstanceNode, name: string): SceneNode | null {
    const target = normalizeNameKey(name);
    const node = row.findOne(n => normalizeNameKey(n.name || "") === target) as SceneNode | null;
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
    await figma.loadFontAsync(fontName);
    loadedFonts.add(key);
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
        console.log("Import by key error:", err);
        return null;
    }
}

export function normalizePriceText(raw: string): string {
    let text = (raw || "").trim();
    if (!text) return text;
    text = text.replace(/\s*руб\.?/i, "").trim();
    text = text.replace(/₽/g, "").trim();
    return text;
}

export function normalizeDiscountText(raw: string): string {
    let text = (raw || "").trim();
    if (!text) return text;
    text = text.replace(/%/g, "").trim();
    return text;
}

