// @ts-nocheck
(function (root) {
  function isBoxInfoMap(infoMap) {
    return Object.values(infoMap || {}).some(entry =>
      String(entry?.multiplicity || entry?.boxQty || entry?.boxNotice || "").trim()
    );
  }

  function summarizeSkuDiff(jsonSkus, infoMap) {
    const csvSkus = new Set(Object.keys(infoMap || {}).map(s => String(s).trim()).filter(Boolean));
    let csvMissingInJson = 0;
    let jsonMissingInCsv = 0;
    for (const sku of csvSkus) if (!jsonSkus.has(sku)) csvMissingInJson++;
    for (const sku of jsonSkus) if (!csvSkus.has(sku)) jsonMissingInCsv++;
    return { csvMissingInJson, jsonMissingInCsv };
  }

  function resolveInfoField(mainSku, item, infoMap, fieldName) {
    if (mainSku && infoMap?.[mainSku]?.[fieldName]) return infoMap[mainSku][fieldName];
    const variants = Array.isArray(item?.variants) ? item.variants : [];
    for (const variant of variants) {
      const sku = variant?.sku;
      if (sku && infoMap?.[sku]?.[fieldName]) return infoMap[sku][fieldName];
    }
    return "";
  }

  function resolveLeafletName(mainSku, item, infoMap) {
    return resolveInfoField(mainSku, item, infoMap, "leafletName");
  }

  function resolveSurpriseText(mainSku, item, infoMap) {
    return resolveInfoField(mainSku, item, infoMap, "surpriseText");
  }

  function hasBoxInfo(mainSku, item, infoMap) {
    return !!(
      resolveInfoField(mainSku, item, infoMap, "multiplicity") ||
      resolveInfoField(mainSku, item, infoMap, "boxQty") ||
      resolveInfoField(mainSku, item, infoMap, "boxNotice")
    );
  }

  function hasInfoValueForItem(mainSku, item, infoMap, fields) {
    const hasValue = sku => fields.some(field => String(infoMap?.[sku]?.[field] || "").trim());
    if (mainSku && hasValue(mainSku)) return true;
    const variants = Array.isArray(item?.variants) ? item.variants : [];
    return variants.some(variant => variant?.sku && hasValue(variant.sku));
  }

  function getProblemSku(mainSku, item) {
    if (mainSku) return String(mainSku);
    const variants = Array.isArray(item?.variants) ? item.variants : [];
    const firstSku = variants.find(variant => variant?.sku)?.sku;
    return firstSku ? String(firstSku) : (item?.title || "no sku");
  }

  function getBoxBenefitStats(infoMap) {
    const values = [];
    let missingPair = 0;
    let suspicious = 0;
    let invalidPrice = 0;
    for (const entry of Object.values(infoMap || {})) {
      const isBox = String(entry?.boxPrice || entry?.multiplicity || entry?.boxQty || entry?.boxNotice || "").trim();
      if (!isBox) continue;
      if (root.PtechDiscounts.isInvalidPrice(entry?.price) || root.PtechDiscounts.isInvalidPrice(entry?.boxPrice)) {
        invalidPrice++;
      }
      if (!String(entry?.price || "").trim() || !String(entry?.boxPrice || "").trim()) {
        missingPair++;
        continue;
      }
      if (root.PtechDiscounts.isSuspiciousBoxPrice(entry.price, entry.boxPrice)) suspicious++;
      const percent = root.PtechDiscounts.calculateBoxDiscountPercent(entry.price, entry.boxPrice);
      if (percent !== null) values.push(percent);
    }
    const max = values.length ? Math.max(...values) : null;
    const avg = values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : null;
    return { max, avg, count: values.length, missingPair, suspicious, invalidPrice };
  }

  function collectDataProblems(jsonData, infoMap, sourceGroups, imageResults, brandIds) {
    const jsonSkus = root.PtechProducts.collectJsonSkus(jsonData);
    const csvSkus = new Set(Object.keys(infoMap || {}).map(s => String(s).trim()).filter(Boolean));
    const isBox = isBoxInfoMap(infoMap);
    const problems = {
      noPhoto: [],
      noDiscount: [],
      noPrice: [],
      noBoxPrice: [],
      noBoxQty: [],
      noBoxDiscountPair: [],
      noLeaflet: [],
      unknownBrand: [],
      jsonMissingInCsv: [],
      csvMissingInJson: [],
      duplicateSkus: Array.isArray(infoMap?.__duplicateSkus) ? infoMap.__duplicateSkus : [],
      invalidPrice: [],
      suspiciousDiscount: [],
      suspiciousBoxPrice: [],
      boxBenefit: getBoxBenefitStats(infoMap)
    };
    for (const sku of jsonSkus) if (!csvSkus.has(sku)) problems.jsonMissingInCsv.push(sku);
    for (const sku of csvSkus) if (!jsonSkus.has(sku)) problems.csvMissingInJson.push(sku);
    for (const [sku, entry] of Object.entries(infoMap || {})) {
      if (sku === "__duplicateSkus") continue;
      if (root.PtechDiscounts.isInvalidPrice(entry?.price)) problems.invalidPrice.push(sku);
      const discount = root.PtechDiscounts.parseDiscountNumber(entry?.discount);
      if (discount !== null && (discount < 0 || discount > 80)) problems.suspiciousDiscount.push(sku);
      if (root.PtechDiscounts.isSuspiciousBoxPrice(entry?.price, entry?.boxPrice)) problems.suspiciousBoxPrice.push(sku);
    }

    const groups = Array.isArray(sourceGroups) ? sourceGroups : [];
    for (let i = 0; i < groups.length; i++) {
      const item = groups[i];
      const mainSku = item?.variants?.[0]?.sku || null;
      const label = getProblemSku(mainSku, item);
      if (imageResults && !imageResults[i]) problems.noPhoto.push(label);
      if (isBox) {
        if (!hasInfoValueForItem(mainSku, item, infoMap, ["boxPrice"])) problems.noBoxPrice.push(label);
        if (!hasInfoValueForItem(mainSku, item, infoMap, ["multiplicity", "boxQty"])) problems.noBoxQty.push(label);
        if (!hasInfoValueForItem(mainSku, item, infoMap, ["boxPrice"]) || !hasInfoValueForItem(mainSku, item, infoMap, ["price"])) {
          problems.noBoxDiscountPair.push(label);
        }
      } else {
        if (!hasInfoValueForItem(mainSku, item, infoMap, ["discount"])) problems.noDiscount.push(label);
        if (!hasInfoValueForItem(mainSku, item, infoMap, ["price"])) problems.noPrice.push(label);
        if (!resolveLeafletName(mainSku, item, infoMap)) problems.noLeaflet.push(label);
      }
      const brand = item?.brand !== undefined && item?.brand !== null ? String(item.brand) : "";
      if (brand && brandIds && !brandIds.has(brand)) problems.unknownBrand.push(`${label} (brand ${brand})`);
    }
    return problems;
  }

  function getQualityGateErrors({ products, orderList, infoMap, sourceGroups }) {
    const errors = [];
    if (!Array.isArray(products) || products.length === 0) errors.push("Встроенная база товаров пуста");
    if (!Array.isArray(orderList) || orderList.length === 0) errors.push("В Google листе нет кодов товаров");
    if (!infoMap || Object.keys(infoMap).length === 0) errors.push("Не удалось прочитать строки Google листа");
    if (!Array.isArray(sourceGroups) || sourceGroups.length === 0) errors.push("В Google листе не найдено товаров из встроенной базы");
    if (infoMap && root.PtechProducts) {
      const jsonSkus = root.PtechProducts.collectJsonSkus(products || []);
      const diff = summarizeSkuDiff(jsonSkus, infoMap);
      if (diff.csvMissingInJson === Object.keys(infoMap).length && diff.csvMissingInJson > 0) {
        errors.push("Все SKU из Google листа отсутствуют во встроенной базе");
      }
    }
    if (isBoxInfoMap(infoMap)) {
      const stats = getBoxBenefitStats(infoMap);
      if (stats.count === 0) errors.push("Коробочная акция без рассчитанной выгоды: проверь базовую и коробочную цену");
    }
    return errors;
  }

  const api = {
    isBoxInfoMap,
    summarizeSkuDiff,
    resolveInfoField,
    resolveLeafletName,
    resolveSurpriseText,
    hasBoxInfo,
    getBoxBenefitStats,
    collectDataProblems,
    getQualityGateErrors
  };
  root.PtechDiagnostics = api;
  if (typeof module !== "undefined") module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
