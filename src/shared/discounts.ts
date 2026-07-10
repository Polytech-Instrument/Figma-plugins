// @ts-nocheck
(function (root) {
  function parsePriceNumber(raw) {
    const compact = String(raw || "")
      .replace(/\s/g, "")
      .replace(/\s*(?:руб\.?|rub)/gi, "")
      .replace(/\u20BD/g, "")
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

  function parseDiscountNumber(raw) {
    if (raw === undefined || raw === null) return null;
    const text = String(raw).replace(",", ".").replace(/[^\d.\-]/g, "");
    if (!text) return null;
    const value = Number(text);
    return Number.isFinite(value) ? value : null;
  }

  function normalizeDiscountText(raw) {
    return String(raw || "").replace(/%/g, "").trim();
  }

  function discountComparable(raw) {
    if (raw === undefined || raw === null) return null;
    const text = String(raw).trim();
    if (!text) return null;
    const num = parseDiscountNumber(text);
    return num !== null ? num : normalizeDiscountText(text);
  }

  function discountEquals(a, b) {
    if (a === null || b === null) return false;
    if (typeof a === "number" && typeof b === "number") return a === b;
    return String(a) === String(b);
  }

  function shouldShowRowDiscount(baseDiscountRaw, rowDiscountRaw) {
    const base = discountComparable(baseDiscountRaw);
    const row = discountComparable(rowDiscountRaw);
    return row !== null && (base === null || !discountEquals(base, row));
  }

  function calculateBoxDiscountPercent(priceRaw, boxPriceRaw) {
    const price = parsePriceNumber(priceRaw);
    const boxPrice = parsePriceNumber(boxPriceRaw);
    if (price === null || boxPrice === null || price <= 0 || boxPrice <= 0) return null;
    const percent = Math.round(((price - boxPrice) / price) * 100);
    return percent > 0 ? percent : null;
  }

  function isInvalidPrice(raw) {
    const price = parsePriceNumber(raw);
    return price === null || price <= 0;
  }

  function isSuspiciousBoxPrice(priceRaw, boxPriceRaw) {
    const price = parsePriceNumber(priceRaw);
    const boxPrice = parsePriceNumber(boxPriceRaw);
    if (price === null || boxPrice === null || price <= 0 || boxPrice <= 0) return false;
    return boxPrice >= price;
  }

  const api = {
    parsePriceNumber,
    parseDiscountNumber,
    normalizeDiscountText,
    discountComparable,
    discountEquals,
    shouldShowRowDiscount,
    calculateBoxDiscountPercent,
    isInvalidPrice,
    isSuspiciousBoxPrice
  };
  root.PtechDiscounts = api;
  if (typeof module !== "undefined") module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
