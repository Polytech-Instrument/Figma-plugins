import { LAYOUT_DEFAULTS } from './layoutConfig';
import { LAYER_NAMES } from './layerNames';

export { BRAND_MAPPING } from './brands';
export {
    COMPONENT_PROPERTY_NAME,
    LIBRARY_NAME,
    LIB_COMPONENT_BANNER,
    LIB_COMPONENT_CARD,
    LIB_COMPONENT_ROW,
    KEY_BANNER,
    KEY_PRODUCT_CARD,
    KEY_ROW_ITEM,
    KEY_MAIN_LOGOTYPES_SET,
    KEY_FOOTER,
    KEY_PAGINATOR
} from './componentKeys';

export const CONFIG = {
    ...LAYOUT_DEFAULTS,
    ...LAYER_NAMES
};

export let A4_W = CONFIG.A4_W;
export let A4_H = CONFIG.A4_H;
export let PAD_X = CONFIG.PAD_X;
export let PAD_Y = CONFIG.PAD_Y;
export let COL_GAP = CONFIG.COL_GAP;
export let COL_W = CONFIG.COL_W;
export let ITEM_GAP = CONFIG.ITEM_GAP;
export let FOOTER_H = CONFIG.FOOTER_H;
export let PAGINATOR_X = CONFIG.PAGINATOR_X;
export let PAGINATOR_Y = CONFIG.PAGINATOR_Y;
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
    PAGINATOR_X?: number;
    PAGINATOR_Y?: number;
    PAGINATOR_ENABLED?: boolean;
    FOOTER_ENABLED?: boolean;
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
    PAGINATOR_X = CONFIG.PAGINATOR_X;
    PAGINATOR_Y = CONFIG.PAGINATOR_Y;
    MIN_REMAINING_FOR_SPLIT = CONFIG.MIN_REMAINING_FOR_SPLIT;
    MAX_COL_H = A4_H - (PAD_Y * 2);
    COL_W_CALC = ((A4_W - (PAD_X * 2) - COL_GAP) / 2) - CONFIG.COL_W_REDUCE;
    COL_W = Number.isFinite(CONFIG.COL_W) ? CONFIG.COL_W : COL_W_CALC;
    FIRST_PAGE_SHIFT_DEFAULT = Math.round(A4_H * CONFIG.FIRST_PAGE_SHIFT_DEFAULT);
    FIRST_PAGE_SHIFT_TWO_THIRDS = Math.round(A4_H * CONFIG.FIRST_PAGE_SHIFT_TWO_THIRDS);
}

export function applyConfigOverrides(overrides?: LayoutSettings) {
    if (!overrides) return;
    if (Number.isFinite(overrides.A4_W)) CONFIG.A4_W = overrides.A4_W as number;
    if (Number.isFinite(overrides.A4_H)) CONFIG.A4_H = overrides.A4_H as number;
    if (Number.isFinite(overrides.PAD_X)) CONFIG.PAD_X = overrides.PAD_X as number;
    if (Number.isFinite(overrides.PAD_Y)) CONFIG.PAD_Y = overrides.PAD_Y as number;
    if (Number.isFinite(overrides.COL_GAP)) CONFIG.COL_GAP = overrides.COL_GAP as number;
    if (Number.isFinite(overrides.COL_W)) CONFIG.COL_W = overrides.COL_W as number;
    if (Number.isFinite(overrides.ITEM_GAP)) CONFIG.ITEM_GAP = overrides.ITEM_GAP as number;
    if (Number.isFinite(overrides.COL_W_REDUCE)) CONFIG.COL_W_REDUCE = overrides.COL_W_REDUCE as number;
    if (Number.isFinite(overrides.FIRST_PAGE_SHIFT_DEFAULT)) CONFIG.FIRST_PAGE_SHIFT_DEFAULT = overrides.FIRST_PAGE_SHIFT_DEFAULT as number;
    if (Number.isFinite(overrides.FIRST_PAGE_SHIFT_TWO_THIRDS)) CONFIG.FIRST_PAGE_SHIFT_TWO_THIRDS = overrides.FIRST_PAGE_SHIFT_TWO_THIRDS as number;
    if (Number.isFinite(overrides.FOOTER_H)) CONFIG.FOOTER_H = overrides.FOOTER_H as number;
    if (Number.isFinite(overrides.PAGINATOR_X)) CONFIG.PAGINATOR_X = overrides.PAGINATOR_X as number;
    if (Number.isFinite(overrides.PAGINATOR_Y)) CONFIG.PAGINATOR_Y = overrides.PAGINATOR_Y as number;
    if (typeof overrides.PAGINATOR_ENABLED === "boolean") CONFIG.PAGINATOR_ENABLED = overrides.PAGINATOR_ENABLED;
    if (typeof overrides.FOOTER_ENABLED === "boolean") CONFIG.FOOTER_ENABLED = overrides.FOOTER_ENABLED;
    if (Number.isFinite(overrides.MIN_REMAINING_FOR_SPLIT)) CONFIG.MIN_REMAINING_FOR_SPLIT = overrides.MIN_REMAINING_FOR_SPLIT as number;
    recalcLayout();
}
