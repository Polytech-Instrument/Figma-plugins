export const CONFIG = {
    // Layout
    A4_W: 595,
    A4_H: 842,
    PAD_X: 20,
    PAD_Y: 30,
    COL_GAP: 20,
    COL_W: 268,
    ITEM_GAP: 2,
    COL_W_REDUCE: 20,
    MIN_REMAINING_FOR_SPLIT: 220,
    FIRST_PAGE_SHIFT_DEFAULT: 1 / 3,
    FIRST_PAGE_SHIFT_TWO_THIRDS: 2 / 3,

    // Node names
    LIST_CONTAINER: "#ListContainer",
    TITLE: "#Title",
    DESCRIPTION: "#Description",
    DISCOUNT: "productDiscount",
    DISCOUNT_INFO: "#DiscountInfo",
    IMAGE: "#Image",
    LOGO: "Main Logotypes",
    ROW_SKU: "#SKU",
    ROW_SPECS: "#Specs",
    ROW_MIN: "#Min",
    ROW_QTY: "#Qty",
    ROW_PRICE: "#Price",
    ROW_ITEM_SALE: "itemSale",
    ROW_ITEM_SALE_DISCOUNT: "priceProductDiscount",
    SALE_STAR: "saleStar",

    // Debug
    INSERT_DEBUG_TEXT_IN_LIST: false,
    FOOTER_H: 110
} as const;

export let A4_W = CONFIG.A4_W;
export let A4_H = CONFIG.A4_H;
export let PAD_X = CONFIG.PAD_X;
export let PAD_Y = CONFIG.PAD_Y;
export let COL_GAP = CONFIG.COL_GAP;
export let COL_W = CONFIG.COL_W;
export let ITEM_GAP = CONFIG.ITEM_GAP;
export let FOOTER_H = CONFIG.FOOTER_H;
export let MIN_REMAINING_FOR_SPLIT = CONFIG.MIN_REMAINING_FOR_SPLIT;

export let MAX_COL_H = A4_H - (PAD_Y * 2);
export let COL_W_CALC = ((A4_W - (PAD_X * 2) - COL_GAP) / 2) - CONFIG.COL_W_REDUCE;
export let FIRST_PAGE_SHIFT_DEFAULT = Math.round(A4_H * CONFIG.FIRST_PAGE_SHIFT_DEFAULT);
export let FIRST_PAGE_SHIFT_TWO_THIRDS = Math.round(A4_H * CONFIG.FIRST_PAGE_SHIFT_TWO_THIRDS);

export type LayoutSettings = {
    A4_W?: number;
    A4_H?: number;
    PAD_X?: number;
    PAD_Y?: number;
    COL_GAP?: number;
    COL_W?: number;
    ITEM_GAP?: number;
    COL_W_REDUCE?: number;
    FIRST_PAGE_SHIFT_DEFAULT?: number;
    FIRST_PAGE_SHIFT_TWO_THIRDS?: number;
    FOOTER_H?: number;
    MIN_REMAINING_FOR_SPLIT?: number;
};

export function recalcLayout() {
    A4_W = CONFIG.A4_W;
    A4_H = CONFIG.A4_H;
    PAD_X = CONFIG.PAD_X;
    PAD_Y = CONFIG.PAD_Y;
    COL_GAP = CONFIG.COL_GAP;
    COL_W = CONFIG.COL_W;
    ITEM_GAP = CONFIG.ITEM_GAP;
    FOOTER_H = CONFIG.FOOTER_H;
    MIN_REMAINING_FOR_SPLIT = CONFIG.MIN_REMAINING_FOR_SPLIT;
    MAX_COL_H = A4_H - (PAD_Y * 2);
    COL_W_CALC = ((A4_W - (PAD_X * 2) - COL_GAP) / 2) - CONFIG.COL_W_REDUCE;
    COL_W = Number.isFinite(CONFIG.COL_W) ? CONFIG.COL_W : COL_W_CALC;
    FIRST_PAGE_SHIFT_DEFAULT = Math.round(A4_H * CONFIG.FIRST_PAGE_SHIFT_DEFAULT);
    FIRST_PAGE_SHIFT_TWO_THIRDS = Math.round(A4_H * CONFIG.FIRST_PAGE_SHIFT_TWO_THIRDS);
}

export function applyConfigOverrides(overrides?: LayoutSettings) {
    if (!overrides) return;
    if (Number.isFinite(overrides.A4_W)) (CONFIG as any).A4_W = overrides.A4_W as number;
    if (Number.isFinite(overrides.A4_H)) (CONFIG as any).A4_H = overrides.A4_H as number;
    if (Number.isFinite(overrides.PAD_X)) (CONFIG as any).PAD_X = overrides.PAD_X as number;
    if (Number.isFinite(overrides.PAD_Y)) (CONFIG as any).PAD_Y = overrides.PAD_Y as number;
    if (Number.isFinite(overrides.COL_GAP)) (CONFIG as any).COL_GAP = overrides.COL_GAP as number;
    if (Number.isFinite(overrides.COL_W)) (CONFIG as any).COL_W = overrides.COL_W as number;
    if (Number.isFinite(overrides.ITEM_GAP)) (CONFIG as any).ITEM_GAP = overrides.ITEM_GAP as number;
    if (Number.isFinite(overrides.COL_W_REDUCE)) (CONFIG as any).COL_W_REDUCE = overrides.COL_W_REDUCE as number;
    if (Number.isFinite(overrides.FIRST_PAGE_SHIFT_DEFAULT)) (CONFIG as any).FIRST_PAGE_SHIFT_DEFAULT = overrides.FIRST_PAGE_SHIFT_DEFAULT as number;
    if (Number.isFinite(overrides.FIRST_PAGE_SHIFT_TWO_THIRDS)) (CONFIG as any).FIRST_PAGE_SHIFT_TWO_THIRDS = overrides.FIRST_PAGE_SHIFT_TWO_THIRDS as number;
    if (Number.isFinite(overrides.FOOTER_H)) (CONFIG as any).FOOTER_H = overrides.FOOTER_H as number;
    if (Number.isFinite(overrides.MIN_REMAINING_FOR_SPLIT)) (CONFIG as any).MIN_REMAINING_FOR_SPLIT = overrides.MIN_REMAINING_FOR_SPLIT as number;
    recalcLayout();
}

export const BRAND_MAPPING: { [key: string]: string } = {
    "1": "Polytech",
    "2": "Pobedit",
    "3": "Russia",
    "4": "Polyagro",
    "5": "Germez",
    "6": "Ekotools",
    "7": "Superpen",
    "8": "PolyagroGold",
    "9": "Guppy",
    "10": "Polytech Quality",
    "11": "PolyagroCamp",
    "12": "PolyagroLite",
    "14": "Waterley",
    "15": "JilionSP",
    "16": "JilionPT",
    "17": "PobeditMotor",
    "20": "Ekofoam",
    "21": "PobeditThor",
    "22": "PobeditThor",
    "23": "PobeditThor",
    "24": "Shahter",
    "25": "Koplich",
    "26": "Kopalovna",
    "27": "PolyagroAqua",
    "28": "Hokku",
    "29": "Severyanin",
    "30": "FuksiaM",
    "31": "TORX",
    "32": "Nordeco",
};

export const COMPONENT_PROPERTY_NAME = "Brand";

export const LIBRARY_NAME = "Ptech.Library";
export const LIB_COMPONENT_BANNER = "Banner";
export const LIB_COMPONENT_CARD = "ProductCard";
export const LIB_COMPONENT_ROW = "RowItem";

export const KEY_BANNER = "360d86e3ecd75b74a07dd1c65a1409edc733b258";
export const KEY_PRODUCT_CARD = "c9e7fb28e39f84e56ff881819a198f62ec0a6073";
export const KEY_ROW_ITEM = "781e1213978776223960d4dacc2bd66c0306e43e";
export const KEY_MAIN_LOGOTYPES_SET = "3c0b8732f057d32fe14841dd1885fdd36851b661";
export const KEY_FOOTER = "d77e854d909571f399e78bbab3103ad48d9e9848";

// External services (set here, not in UI)
export const NANO_BANANA_API_KEY = "AIzaSyBaetEwZdeLVXo6dqk5IuEM7boeVnNrHAk";
export const NANO_BANANA_PROMPT = "Сгенерируй изображение этих трех товаров на светлом фоне";
export const NANO_BANANA_MODEL = "gemini-2.5-flash-image";
