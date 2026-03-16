import { applyConfigOverrides } from './config';
import { createBrochure } from './generation';
import { updateInfoOnPage } from './update';

figma.showUI(__html__, { width: 430, height: 650 });

const pendingSplits = new Map<string, (split: boolean) => void>();
let splitSeq = 0;
let cancelRequested = false;

// Ask UI whether to split an oversized card.
function requestSplitDecision(cardName: string, cardHeight: number, colHeight: number): Promise<boolean> {
    const id = `split_${Date.now()}_${++splitSeq}`;
    figma.ui.postMessage({ type: 'split-query', id, cardName, cardHeight, colHeight });
    return new Promise(resolve => pendingSplits.set(id, resolve));
}

figma.ui.onmessage = async (msg) => {
    try {
        if (msg.type === 'cancel') {
            cancelRequested = true;
            figma.notify("Остановка по запросу пользователя...");
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
        }
        if (msg.type === 'update-info') {
            cancelRequested = false;
            await figma.loadAllPagesAsync();
            await loadFonts();
            await updateInfoOnPage(msg.data, () => cancelRequested);
        }
    } catch (e) {
        figma.notify(e.message, { error: true });
        figma.ui.postMessage({ type: 'error', text: e.message });
    }
};

// Load required fonts before text edits.
async function loadFonts() {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    await figma.loadFontAsync({ family: "Inter", style: "Bold" });
}

