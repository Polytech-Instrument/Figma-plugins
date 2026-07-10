import { KEY_BANNER } from './config';
import { normalizeNameKey, loadFontForNode } from './utils';
import { Group } from './types';
import { resolveMainCategory } from './promoRules';
import { choosePromoTitle } from './promoTitles';
import { calculateBoxDiscountPercent } from './normalizers';

type PromoType = "common" | "box" | "fixed" | "auto";

export async function updateSaleBannerInfo(
    infoMap: any,
    groups: Group[] = [],
    scope?: SceneNode[] | SceneNode | null,
    promoType: PromoType = "auto"
) {
    const { monthLabel, monthGenitive, year, lastDay } = getNextMonthInfo();
    const saleMonthText = `${capitalize(monthLabel)} ${year}`;
    const saleDateText = `С 1 до ${lastDay} ${monthGenitive}`;
    const isBox = promoType === "box" || (promoType === "auto" && isBoxInfoMap(infoMap, groups));
    const isFixed = promoType === "fixed";

    const bannerScope = normalizeScope(scope) || await findBannerScope();
    const totalSaleNodes = findTextNodesByNameAny(["totalSale"], bannerScope);
    const saleMonthNodes = findTextNodesByNameAny(["saleMonth"], bannerScope);
    const saleDateNodes = findTextNodesByNameAny(["saleDate"], bannerScope);
    const titleNodes = findTextNodesByNameAny(["#Title", "Title"], bannerScope);
    const descriptionNodes = findTextNodesByNameAny(["#Description", "Description"], bannerScope);
    const saleLabelNodes = findNodesByNameAny(["SALE LABEL", "Sale Label", "saleLabel"], bannerScope);

    const maxDiscount = getMaxDiscount(infoMap);
    if (!isBox && maxDiscount !== null) {
        const totalSaleText = `${maxDiscount}%`;
        for (const node of totalSaleNodes) {
            await loadFontForNode(node);
            node.characters = totalSaleText;
        }
    }

    if (isBox) {
        for (const node of saleLabelNodes) node.visible = false;
        for (const node of titleNodes) {
            await loadFontForNode(node);
            node.characters = choosePromoTitle("box", buildTitleSeed(infoMap, groups));
        }
        await setDescription(descriptionNodes, buildCategoriesText(infoMap));
    } else {
        for (const node of titleNodes) {
            await loadFontForNode(node);
            node.characters = choosePromoTitle(isFixed ? "fixed" : "common", buildTitleSeed(infoMap, groups));
        }
        const description = [buildCategoriesText(infoMap), buildRoundedProductsText(groups)]
            .filter(Boolean)
            .join("\n");
        await setDescription(descriptionNodes, description);
    }

    for (const node of saleMonthNodes) {
        await loadFontForNode(node);
        node.characters = saleMonthText;
    }
    for (const node of saleDateNodes) {
        await loadFontForNode(node);
        node.characters = saleDateText;
    }
}

function buildTitleSeed(infoMap: any, groups: Group[]): string {
    return `${buildCategoriesText(infoMap)}:${Array.isArray(groups) ? groups.length : 0}`;
}

async function setDescription(nodes: TextNode[], text: string) {
    if (!text) return;
    for (const node of nodes) {
        await loadFontForNode(node);
        node.characters = text;
    }
}

function normalizeScope(scope?: SceneNode[] | SceneNode | null): SceneNode[] | null {
    if (!scope) return null;
    return Array.isArray(scope) ? scope : [scope];
}

async function findBannerScope(): Promise<SceneNode[] | null> {
    const instances = figma.root.findAll(n => n.type === "INSTANCE") as InstanceNode[];
    const bannerInstances: InstanceNode[] = [];
    for (const inst of instances) {
        try {
            const main = await inst.getMainComponentAsync();
            const key = main?.key;
            if (key === KEY_BANNER || inst.name === "Banner") {
                bannerInstances.push(inst);
            }
        } catch {
            // ignore
        }
    }
    return bannerInstances.length > 0 ? bannerInstances as SceneNode[] : null;
}

function findTextNodesByNameAny(names: string[], scope: SceneNode[] | null = null): TextNode[] {
    const wanted = new Set(names.map(n => normalizeNameKey(n)));
    const roots = scope && scope.length > 0 ? scope : [figma.root] as any[];
    const nodes: TextNode[] = [];
    for (const root of roots) {
        const found = root.findAll ? root.findAll((n: SceneNode) => n.type === "TEXT") : [];
        nodes.push(...(found as TextNode[]));
    }
    return nodes.filter(n => wanted.has(normalizeNameKey(n.name || "")));
}

function findNodesByNameAny(names: string[], scope: SceneNode[] | null = null): SceneNode[] {
    const wanted = new Set(names.map(n => normalizeNameKey(n)));
    const roots = scope && scope.length > 0 ? scope : [figma.root] as any[];
    const nodes: SceneNode[] = [];
    for (const root of roots) {
        const found = root.findAll
            ? root.findAll((n: SceneNode) => wanted.has(normalizeNameKey(n.name || "")))
            : [];
        nodes.push(...(found as SceneNode[]));
    }
    return nodes;
}

function isBoxInfoMap(infoMap: any, groups: Group[]): boolean {
    if (groups.some(group => group.cardType === "box")) return true;
    return Object.values(infoMap || {}).some((entry: any) =>
        !!String(entry?.multiplicity || entry?.boxQty || entry?.boxNotice || "").trim()
    );
}

function buildCategoriesText(infoMap: any): string {
    const counts = new Map<string, { title: string; count: number }>();
    for (const entry of Object.values(infoMap || {})) {
        const rawName = String((entry as any)?.leafletName || "").trim();
        if (!rawName) continue;
        const title = resolveMainCategory(rawName);
        const key = title.toLowerCase();
        const current = counts.get(key) || { title, count: 0 };
        current.count++;
        counts.set(key, current);
    }
    const allCategories = [...counts.values()]
        .sort((a, b) => b.count - a.count || a.title.localeCompare(b.title, "ru"))
        .map(item => item.title);
    const categories = allCategories.slice(0, 4);
    if (allCategories.length > categories.length) categories.push("другие товары");
    return joinRuList(categories);
}

function joinRuList(values: string[]): string {
    if (values.length === 0) return "";
    if (values.length === 1) return values[0];
    if (values.length === 2) return `${values[0]} и ${values[1]}`;
    return `${values.slice(0, -1).join(", ")} и ${values[values.length - 1]}`;
}

function buildRoundedProductsText(groups: Group[]): string {
    const count = Array.isArray(groups) ? groups.length : 0;
    if (count <= 0) return "";
    const rounded = Math.floor(count / 10) * 10;
    if (rounded < 10) return `${count} акционных товаров`;
    return `более ${rounded} акционных товаров`;
}

export function getMaxDiscount(infoMap: any): number | null {
    let max: number | null = null;
    for (const entry of Object.values(infoMap || {})) {
        const item = entry as any;
        const val = calculateBoxDiscountPercent(item?.price, item?.boxPrice) ?? parseDiscountValue(String(item?.discount || ""));
        if (val === null) continue;
        if (max === null || val > max) max = val;
    }
    return max;
}

export function parseDiscountValue(text: string): number | null {
    const cleaned = text.replace(',', '.').replace(/[^\d.\-]/g, '');
    if (!cleaned) return null;
    const val = parseFloat(cleaned);
    return Number.isFinite(val) ? val : null;
}

export function getNextMonthInfo() {
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const year = target.getFullYear();
    const monthIndex = target.getMonth();
    const lastDay = new Date(year, monthIndex + 1, 0).getDate();
    const monthsNom = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    const monthsGen = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return {
        monthLabel: monthsNom[monthIndex],
        monthGenitive: monthsGen[monthIndex],
        year,
        lastDay
    };
}

export function capitalize(s: string): string {
    if (!s) return s;
    return s[0].toUpperCase() + s.slice(1);
}
