import { KEY_BANNER } from './config';
import { normalizeNameKey, loadFontForNode } from './utils';

// Update banner total sale/month/date fields.
export async function updateSaleBannerInfo(infoMap: any) {
    const { monthLabel, monthGenitive, year, lastDay } = getNextMonthInfo();
    const saleMonthText = `${capitalize(monthLabel)} ${year}`;
    const saleDateText = `С 1 до ${lastDay} ${monthGenitive}`;

    const bannerScope = await findBannerScope();
    const totalSaleNodes = findTextNodesByNameAny(["totalSale"], bannerScope);
    const saleMonthNodes = findTextNodesByNameAny(["saleMonth"], bannerScope);
    const saleDateNodes = findTextNodesByNameAny(["saleDate"], bannerScope);

    const maxDiscount = getMaxDiscount(infoMap);
    if (maxDiscount !== null) {
        const totalSaleText = `${maxDiscount}%`;
        for (const node of totalSaleNodes) {
            await loadFontForNode(node);
            node.characters = totalSaleText;
        }
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

// Locate banner instances to scope banner updates.
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
    if (bannerInstances.length === 0) return null;
    return bannerInstances as SceneNode[];
}

function findTextNodesByNameAny(names: string[], scope: SceneNode[] | null = null): TextNode[] {
    const wanted = new Set(names.map(n => normalizeNameKey(n)));
    const roots = scope && scope.length > 0 ? scope : [figma.root] as any[];
    const nodes: TextNode[] = [];
    for (const r of roots) {
        const found = r.findAll ? r.findAll((n: SceneNode) => n.type === "TEXT") : [];
        nodes.push(...(found as TextNode[]));
    }
    return nodes.filter(n => wanted.has(normalizeNameKey(n.name || "")));
}

export function getMaxDiscount(infoMap: any): number | null {
    let max: number | null = null;
    for (const entry of Object.values(infoMap || {})) {
        const raw = (entry as any)?.discount;
        if (raw === undefined || raw === null) continue;
        const val = parseDiscountValue(String(raw));
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

