// @ts-nocheck
(function (root) {
  function collectJsonSkus(groups) {
    const skus = new Set();
    for (const group of Array.isArray(groups) ? groups : []) {
      const variants = Array.isArray(group?.variants) ? group.variants : [];
      for (const variant of variants) {
        if (variant?.sku) skus.add(String(variant.sku).trim());
      }
    }
    return skus;
  }

  function buildProductSkuIndex(products) {
    const index = new Map();
    for (const item of Array.isArray(products) ? products : []) {
      const variants = Array.isArray(item?.variants) ? item.variants : [];
      for (const variant of variants) {
        const sku = variant?.sku ? String(variant.sku).trim() : "";
        if (sku && !index.has(sku)) index.set(sku, { item, variant });
      }
    }
    return index;
  }

  function selectGroupedProductsByOrder(products, orderList) {
    if (!Array.isArray(orderList) || orderList.length === 0) return [];
    const index = buildProductSkuIndex(products);
    const grouped = new Map();
    const seenSku = new Set();
    for (const rawSku of orderList) {
      const sku = String(rawSku || "").trim();
      if (!sku || seenSku.has(sku)) continue;
      const match = index.get(sku);
      if (!match) continue;
      seenSku.add(sku);

      const productKey = String(match.item?.id || match.item?.title || sku);
      let entry = grouped.get(productKey);
      if (!entry) {
        entry = { ...match.item, id: productKey, variants: [] };
        grouped.set(productKey, entry);
      }
      entry.variants.push(match.variant);
    }
    return [...grouped.values()].filter(item => item.variants.length > 0);
  }

  function selectProductsForGeneration(products, orderList) {
    return selectGroupedProductsByOrder(products, orderList);
  }

  const api = { collectJsonSkus, buildProductSkuIndex, selectGroupedProductsByOrder, selectProductsForGeneration };
  root.PtechProducts = api;
  if (typeof module !== "undefined") module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
