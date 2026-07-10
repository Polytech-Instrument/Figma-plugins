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

export function normalizeMultiplicityText(raw: string): string {
    const text = String(raw || "").replace(/\u00A0/g, " ").trim();
    if (!text) return "";
    const match = text.match(/\d+(?:[,.]\d+)?/);
    return match ? match[0].replace(",", ".") : text;
}

export function calculateBoxDiscountPercent(priceRaw?: string | null, boxPriceRaw?: string | null): number | null {
    const price = parsePriceNumber(String(priceRaw || ""));
    const boxPrice = parsePriceNumber(String(boxPriceRaw || ""));
    if (price === null || boxPrice === null || price <= 0 || boxPrice <= 0) return null;
    const percent = Math.round(((price - boxPrice) / price) * 100);
    return percent > 0 ? percent : null;
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
