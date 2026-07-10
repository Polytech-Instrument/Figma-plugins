import {
    applyConfigOverrides,
    KEY_BANNER,
    KEY_PRODUCT_CARD,
    KEY_PRODUCT_BOX_CARD,
    KEY_ROW_ITEM,
    KEY_ROW_ITEM_BOX,
    KEY_FOOTER,
    KEY_PAGINATOR,
    KEY_BOX_NOTICE_TOP,
    KEY_BOX_NOTICE_BOTTOM,
    KEY_GIFT_BLOCK_COMMON
} from './config';
import { createBrochure } from './generation';
import { updateInfoOnPage } from './update';
import { getComponentByKey, loadFontCached, normalizeNameKey } from './utils';

figma.showUI(__html__, { width: 430, height: 650 });

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz1xx79FIY_AbpUWNM88s4Ma6clo4JLXhcKX2agHm2zvyLCdQgpZDVJ0h6CS0cy6UGN/exec";
const GOOGLE_PROXY_BASE = "https://figma-proxy-1.onrender.com/proxy?url=";

const pendingSplits = new Map<string, (split: boolean) => void>();
let splitSeq = 0;
let cancelRequested = false;

function requestSplitDecision(cardName: string, cardHeight: number, colHeight: number): Promise<boolean> {
    const id = `split_${Date.now()}_${++splitSeq}`;
    figma.ui.postMessage({ type: 'split-query', id, cardName, cardHeight, colHeight });
    return new Promise(resolve => pendingSplits.set(id, resolve));
}

figma.ui.onmessage = async (msg) => {
    try {
        if (msg.type === 'cancel') {
            cancelRequested = true;
            for (const resolver of pendingSplits.values()) {
                resolver(false);
            }
            pendingSplits.clear();
            return;
        }
        if (msg.type === 'split-response') {
            const resolver = pendingSplits.get(msg.id);
            if (resolver) {
                pendingSplits.delete(msg.id);
                resolver(!!msg.split);
            }
            return;
        }
        if (msg.type === 'check-components') {
            await figma.loadAllPagesAsync();
            figma.ui.postMessage({ type: 'components-check-result', results: await checkComponents() });
            return;
        }
        if (msg.type === 'google-sheets') {
            const response = await fetchGoogle(`${GOOGLE_SCRIPT_URL}?action=sheets`);
            if (!response.ok) throw new Error(`Google Sheets HTTP ${response.status}`);
            const sheets = await response.json();
            figma.ui.postMessage({ type: 'google-sheets-result', sheets });
            return;
        }
        if (msg.type === 'google-csv') {
            const gid = String(msg.gid || "");
            if (!gid) throw new Error("Не выбран лист Google");
            const response = await fetchGoogle(`${GOOGLE_SCRIPT_URL}?action=csv&gid=${encodeURIComponent(gid)}`);
            if (!response.ok) throw new Error(`Google CSV HTTP ${response.status}`);
            const csv = await response.text();
            figma.ui.postMessage({ type: 'google-csv-result', csv, gid, sheetName: msg.sheetName || "", requestId: msg.requestId || "" });
            return;
        }
        if (msg.type === 'build') {
            cancelRequested = false;
            await figma.loadAllPagesAsync();
            await loadFonts();
            const payload = msg.data || {};
            const groups = Array.isArray(payload) ? payload : payload.groups;
            const layout = Array.isArray(payload) ? {} : (payload.layout || {});
            applyConfigOverrides(layout.settings);
            await createBrochure(groups || [], layout, {
                autoSplit: !!layout.settings?.AUTO_SPLIT,
                askSplit: requestSplitDecision,
                shouldCancel: () => cancelRequested
            });
            return;
        }
        if (msg.type === 'update-info') {
            cancelRequested = false;
            await figma.loadAllPagesAsync();
            await loadFonts();
            await updateInfoOnPage(msg.data, () => cancelRequested);
        }
    } catch (e) {
        const message = e instanceof Error
            ? (e.message || "Неизвестная ошибка")
            : (typeof e === "string" && e.trim() ? e : "Неизвестная ошибка");
        figma.notify(message, { error: true });
        figma.ui.postMessage({ type: 'error', text: message });
    }
};

async function fetchGoogle(url: string) {
    return fetch(GOOGLE_PROXY_BASE + encodeURIComponent(url));
}

async function checkComponents() {
    const entries = [
        ["Banner", KEY_BANNER],
        ["ProductCard", KEY_PRODUCT_CARD],
        ["ProductCardInBox", KEY_PRODUCT_BOX_CARD],
        ["RowItem", KEY_ROW_ITEM],
        ["RowItem4", KEY_ROW_ITEM_BOX],
        ["Footer", KEY_FOOTER],
        ["Paginator", KEY_PAGINATOR],
        ["BoxNoticeTop", KEY_BOX_NOTICE_TOP],
        ["BoxNoticeBottom", KEY_BOX_NOTICE_BOTTOM],
        ["GiftBlockCommon", KEY_GIFT_BLOCK_COMMON]
    ].filter(([, key]) => !!key) as Array<[string, string]>;
    const results: Array<{ name: string; ok: boolean }> = [];
    for (const [name, key] of entries) {
        const component = await getComponentByKey(key);
        results.push({ name, ok: !!component });
        if (component) {
            for (const layerName of getExpectedLayersForComponent(name)) {
                results.push({
                    name: `${name}/${layerName}`,
                    ok: hasLayer(component, layerName)
                });
            }
        }
    }
    return results;
}

function getExpectedLayersForComponent(name: string): string[] {
    const map: Record<string, string[]> = {
        Banner: ["#Title", "#Description"],
        ProductCard: ["#Image", "#Title", "#Description", "productDiscount", "#ListContainer"],
        ProductCardInBox: ["#Image", "#Title", "#Description", "productDiscount", "#ListContainer", "#PriceBox", "#QtyBox"],
        RowItem: ["#SKU", "#Specs", "#Min", "#Qty", "#Price", "priceProductDiscount"],
        RowItem4: ["#SKU", "#Specs", "#Min", "#Qty", "#PriceBox", "#QtyBox"],
        BoxNoticeTop: [],
        BoxNoticeBottom: []
    };
    return map[name] || [];
}

function hasLayer(root: ComponentNode, layerName: string): boolean {
    const target = normalizeNameKey(layerName);
    return !!root.findOne(node => normalizeNameKey(node.name || "") === target);
}

async function loadFonts() {
    await loadFontCached({ family: "Inter", style: "Regular" });
    await loadFontCached({ family: "Inter", style: "Bold" });
}
