// @ts-nocheck
(function (root) {
  function parseCsvAuto(text) {
    if (!text) return [];
    const tryDelims = ["\t", ";", ","];
    let bestRows = [];
    let bestCols = 0;
    for (const delim of tryDelims) {
      const rows = parseCsv(text, delim);
      const first = rows.find(r => r.some(c => String(c).trim() !== "")) || [];
      if (first.length > bestCols) {
        bestCols = first.length;
        bestRows = rows;
      }
    }
    return bestRows;
  }

  function parseCsv(text, delimiter) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;
    for (let i = 0; i < String(text).length; i++) {
      const char = text[i];
      const next = text[i + 1];
      if (char === '"') {
        if (inQuotes && next === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        row.push(field);
        field = "";
      } else if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && next === "\n") i++;
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else {
        field += char;
      }
    }
    row.push(field);
    rows.push(row);
    return rows;
  }

  function normalizeHeader(text) {
    if (!text) return "";
    return String(text)
      .replace(/^\uFEFF/, "")
      .replace(/\u00A0/g, " ")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  function findHeader(headers, matcher) {
    return headers.findIndex(h => matcher(normalizeHeader(h)));
  }

  function parseOrderList(text) {
    const rows = parseCsvAuto(text);
    if (rows.length === 0) return [];
    let headerIndex = -1;
    let codeCol = 0;
    for (let i = 0; i < rows.length; i++) {
      const cols = rows[i].map(c => normalizeHeader(c));
      const idx = cols.findIndex(c => c === "код");
      if (idx !== -1) {
        headerIndex = i;
        codeCol = idx;
        break;
      }
    }
    let start = headerIndex >= 0 ? headerIndex + 1 : 0;
    if (headerIndex === -1) {
      for (let i = 0; i < rows.length; i++) {
        const first = (rows[i]?.[0] || "").trim();
        if (/^[0-9]{4,}$/.test(first)) {
          start = i;
          break;
        }
      }
    }
    const order = [];
    for (let i = start; i < rows.length; i++) {
      const raw = (rows[i]?.[codeCol] || "").trim();
      if (/^[0-9]{4,}$/.test(raw)) order.push(raw);
    }
    return order;
  }

  function isBoxPriceHeader(h) {
    return h === "спец цена" ||
      h === "спец. цена" ||
      h.includes("спеццена") ||
      (h.includes("спец") && h.includes("цен"));
  }

  function isMultiplicityHeader(h) {
    return h === "кратность" || h.includes("кратност") || h.includes("кратно");
  }

  function isBoxQtyHeader(h) {
    return h === "коробка" ||
      h === "упаковка" ||
      h.includes("кол-во в короб") ||
      h.includes("количество в короб") ||
      h.includes("шт в короб") ||
      h.includes("штук в короб") ||
      h.includes("в упаков");
  }

  function isBoxNoticeHeader(h) {
    return (h.includes("notice") || h.includes("нотис") || h.includes("примечан") || h.includes("услов")) &&
      (h.includes("короб") || h.includes("кратност") || h.includes("упаков"));
  }

  function detectSurpriseText(values) {
    const text = values.filter(Boolean).map(v => String(v)).join(" ")
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) return "";
    const normalized = text.toLowerCase();
    if (!/(подар|бесплат|free|0\s*руб)/i.test(normalized)) return "";
    const patterns = [
      /кажд[а-яё]*\s+(\d{1,3})\s*[-–—]?\s*(?:я|ая|й|ый|ой|ю)?(?=$|[\s.,;:!?)])/i,
      /(\d{1,3})\s*[-–—]?\s*(?:я|ая|й|ый|ой)(?=$|[\s.,;:!?)]).{0,40}(?:подар|бесплат|free|0\s*руб)/i,
      /(?:подар|бесплат|free|0\s*руб).{0,40}?(\d{1,3})\s*[-–—]?\s*(?:я|ая|й|ый|ой)?(?=$|[\s.,;:!?)])/i
    ];
    for (const pattern of patterns) {
      const match = normalized.match(pattern);
      const count = match ? Number(match[1]) : NaN;
      if (Number.isFinite(count) && count > 1 && count < 100) return `каждая ${count}-я в подарок`;
    }
    return "";
  }

  function parseUpdateInfo(csvText) {
    const map = {};
    if (!csvText) return map;
    const rows = parseCsvAuto(csvText);
    const duplicateSkus = [];
    let headerIndex = -1;
    let headers = [];
    for (let i = 0; i < rows.length; i++) {
      const cols = rows[i].map(c => normalizeHeader(c));
      if (cols.includes("код")) {
        headerIndex = i;
        headers = cols;
        break;
      }
    }
    if (headerIndex === -1) return map;

    const codeCol = findHeader(headers, h => h === "код");
    const discountCol = findHeader(headers, h => h === "скидка без условий");
    const priceCol = findHeader(headers, h => h === "базовая цена");
    const conditionsCol = findHeader(headers, h => h === "условия");
    const leafletCol = findHeader(headers, h => h === "название листовки" || (h.includes("название") && h.includes("листов")) || h === "листовка");
    const groupCol = findHeader(headers, h => h === "группа товара");
    const boxPriceCol = findHeader(headers, isBoxPriceHeader);
    const multiplicityCol = findHeader(headers, isMultiplicityHeader);
    const boxQtyCol = findHeader(headers, isBoxQtyHeader);
    const boxNoticeCol = findHeader(headers, isBoxNoticeHeader);

    for (let i = headerIndex + 1; i < rows.length; i++) {
      const cols = rows[i];
      const sku = codeCol !== -1 ? (cols[codeCol] || "").trim() : "";
      if (!sku) continue;
      if (Object.prototype.hasOwnProperty.call(map, sku)) duplicateSkus.push(sku);
      const discount = discountCol !== -1 ? (cols[discountCol] || "").trim() : "";
      const price = priceCol !== -1 ? (cols[priceCol] || "").trim() : "";
      const conditions = conditionsCol !== -1 ? (cols[conditionsCol] || "").trim() : "";
      const leafletName = leafletCol !== -1 ? (cols[leafletCol] || "").trim() : (groupCol !== -1 ? (cols[groupCol] || "").trim() : "");
      const boxPrice = boxPriceCol !== -1 ? (cols[boxPriceCol] || "").trim() : "";
      const multiplicity = multiplicityCol !== -1 ? (cols[multiplicityCol] || "").trim() : "";
      const boxQty = boxQtyCol !== -1 ? (cols[boxQtyCol] || "").trim() : "";
      const boxNotice = boxNoticeCol !== -1 ? (cols[boxNoticeCol] || "").trim() : "";
      const surpriseText = detectSurpriseText([conditions, discount, cols.join(" ")]);
      map[sku] = { discount, price, conditions, surpriseText, leafletName, boxPrice, multiplicity, boxQty, boxNotice };
    }
    Object.defineProperty(map, "__duplicateSkus", { value: duplicateSkus, enumerable: false });
    return map;
  }

  function detectCsvColumns(csvText) {
    const rows = parseCsvAuto(csvText);
    for (const row of rows) {
      const headers = row.map(c => normalizeHeader(c));
      if (!headers.includes("код")) continue;
      return {
        code: headers[findHeader(headers, h => h === "код")] || "",
        discount: headers[findHeader(headers, h => h === "скидка без условий")] || "",
        price: headers[findHeader(headers, h => h === "базовая цена")] || "",
        conditions: headers[findHeader(headers, h => h === "условия")] || "",
        leaflet: headers[findHeader(headers, h => h === "название листовки" || (h.includes("название") && h.includes("листов")) || h === "листовка")] || "",
        group: headers[findHeader(headers, h => h === "группа товара")] || "",
        boxPrice: headers[findHeader(headers, isBoxPriceHeader)] || "",
        multiplicity: headers[findHeader(headers, isMultiplicityHeader)] || "",
        boxQty: headers[findHeader(headers, isBoxQtyHeader)] || "",
        boxNotice: headers[findHeader(headers, isBoxNoticeHeader)] || ""
      };
    }
    return null;
  }

  const api = { parseCsvAuto, parseCsv, normalizeHeader, findHeader, parseOrderList, parseUpdateInfo, detectCsvColumns, detectSurpriseText };
  root.PtechCsv = api;
  if (typeof module !== "undefined") module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
