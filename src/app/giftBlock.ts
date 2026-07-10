import { A4_W, KEY_GIFT_BLOCK_COMMON } from './config';
import { getComponentByKey } from './utils';

const LOCAL_GIFT_COMPONENT_NAME = "Ptech Gift Block Common";
const COMPONENTS_PAGE_NAME = "Политех Верстальщик - компоненты";

export async function addCommonGiftBlockToPage(page: FrameNode, topY: number): Promise<number> {
    const localComponent = await getOrCreateCommonGiftComponent();
    if (!localComponent) return topY;

    const instance = localComponent.createInstance();
    page.appendChild(instance);
    safeSetPosition(instance, Math.round((A4_W - instance.width) / 2), Math.round(topY), "gift block");
    return instance.y + instance.height;
}

async function getOrCreateCommonGiftComponent(): Promise<ComponentNode | null> {
    const existing = figma.root.findOne(node =>
        node.type === "COMPONENT" && node.name === LOCAL_GIFT_COMPONENT_NAME
    ) as ComponentNode | null;
    if (existing) return existing;

    const source = await getComponentByKey(KEY_GIFT_BLOCK_COMMON);
    if (!source) {
        figma.ui.postMessage({ type: "log", text: "Gift block component not found" });
        return null;
    }

    const storagePage = getOrCreateComponentsPage();
    const importedInstance = source.createInstance();
    storagePage.appendChild(importedInstance);
    safeSetPosition(importedInstance, 0, getNextStorageY(storagePage), "gift block source");

    const detached = importedInstance.detachInstance();
    detached.name = LOCAL_GIFT_COMPONENT_NAME;
    const localComponent = figma.createComponentFromNode(detached);
    localComponent.name = LOCAL_GIFT_COMPONENT_NAME;
    return localComponent;
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
        figma.ui.postMessage({
            type: "log",
            text: `Не удалось поставить координаты ${label}: ${String((err as any)?.message || err)}`
        });
    }
}

function getOrCreateComponentsPage(): PageNode {
    const existing = figma.root.children.find(page => page.name === COMPONENTS_PAGE_NAME);
    if (existing) return existing;
    const page = figma.createPage();
    page.name = COMPONENTS_PAGE_NAME;
    return page;
}

function getNextStorageY(page: PageNode): number {
    let bottom = 0;
    for (const child of page.children) {
        bottom = Math.max(bottom, child.y + child.height);
    }
    return bottom + 80;
}
