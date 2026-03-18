"use strict";

// src/app/config.ts
var CONFIG = {
  // Layout
  A4_W: 593,
  A4_H: 842,
  PAD_X: 20,
  PAD_Y: 30,
  COL_GAP: 20,
  COL_W: 268,
  ITEM_GAP: 2,
  COL_W_REDUCE: 20,
  MIN_REMAINING_FOR_SPLIT: 220,
  MIN_CARD_HEIGHT: 135,
  ESTIMATED_ROW_HEIGHT: 10,
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
};
var A4_W = CONFIG.A4_W;
var A4_H = CONFIG.A4_H;
var PAD_X = CONFIG.PAD_X;
var PAD_Y = CONFIG.PAD_Y;
var COL_GAP = CONFIG.COL_GAP;
var COL_W = CONFIG.COL_W;
var ITEM_GAP = CONFIG.ITEM_GAP;
var FOOTER_H = CONFIG.FOOTER_H;
var MIN_REMAINING_FOR_SPLIT = CONFIG.MIN_REMAINING_FOR_SPLIT;
var MAX_COL_H = A4_H - PAD_Y * 2;
var COL_W_CALC = (A4_W - PAD_X * 2 - COL_GAP) / 2 - CONFIG.COL_W_REDUCE;
var FIRST_PAGE_SHIFT_DEFAULT = Math.round(A4_H * CONFIG.FIRST_PAGE_SHIFT_DEFAULT);
var FIRST_PAGE_SHIFT_TWO_THIRDS = Math.round(A4_H * CONFIG.FIRST_PAGE_SHIFT_TWO_THIRDS);
function recalcLayout() {
  A4_W = CONFIG.A4_W;
  A4_H = CONFIG.A4_H;
  PAD_X = CONFIG.PAD_X;
  PAD_Y = CONFIG.PAD_Y;
  COL_GAP = CONFIG.COL_GAP;
  COL_W = CONFIG.COL_W;
  ITEM_GAP = CONFIG.ITEM_GAP;
  FOOTER_H = CONFIG.FOOTER_H;
  MIN_REMAINING_FOR_SPLIT = CONFIG.MIN_REMAINING_FOR_SPLIT;
  MAX_COL_H = A4_H - PAD_Y * 2;
  COL_W_CALC = (A4_W - PAD_X * 2 - COL_GAP) / 2 - CONFIG.COL_W_REDUCE;
  COL_W = Number.isFinite(CONFIG.COL_W) ? CONFIG.COL_W : COL_W_CALC;
  FIRST_PAGE_SHIFT_DEFAULT = Math.round(A4_H * CONFIG.FIRST_PAGE_SHIFT_DEFAULT);
  FIRST_PAGE_SHIFT_TWO_THIRDS = Math.round(A4_H * CONFIG.FIRST_PAGE_SHIFT_TWO_THIRDS);
}
function applyConfigOverrides(overrides) {
  if (!overrides) return;
  if (Number.isFinite(overrides.A4_W)) CONFIG.A4_W = overrides.A4_W;
  if (Number.isFinite(overrides.A4_H)) CONFIG.A4_H = overrides.A4_H;
  if (Number.isFinite(overrides.PAD_X)) CONFIG.PAD_X = overrides.PAD_X;
  if (Number.isFinite(overrides.PAD_Y)) CONFIG.PAD_Y = overrides.PAD_Y;
  if (Number.isFinite(overrides.COL_GAP)) CONFIG.COL_GAP = overrides.COL_GAP;
  if (Number.isFinite(overrides.COL_W)) CONFIG.COL_W = overrides.COL_W;
  if (Number.isFinite(overrides.ITEM_GAP)) CONFIG.ITEM_GAP = overrides.ITEM_GAP;
  if (Number.isFinite(overrides.COL_W_REDUCE)) CONFIG.COL_W_REDUCE = overrides.COL_W_REDUCE;
  if (Number.isFinite(overrides.FIRST_PAGE_SHIFT_DEFAULT)) CONFIG.FIRST_PAGE_SHIFT_DEFAULT = overrides.FIRST_PAGE_SHIFT_DEFAULT;
  if (Number.isFinite(overrides.FIRST_PAGE_SHIFT_TWO_THIRDS)) CONFIG.FIRST_PAGE_SHIFT_TWO_THIRDS = overrides.FIRST_PAGE_SHIFT_TWO_THIRDS;
  if (Number.isFinite(overrides.FOOTER_H)) CONFIG.FOOTER_H = overrides.FOOTER_H;
  if (Number.isFinite(overrides.MIN_REMAINING_FOR_SPLIT)) CONFIG.MIN_REMAINING_FOR_SPLIT = overrides.MIN_REMAINING_FOR_SPLIT;
  recalcLayout();
}
var BRAND_MAPPING = {
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
  "32": "Nordeco"
};
var COMPONENT_PROPERTY_NAME = "Brand";
var KEY_BANNER = "360d86e3ecd75b74a07dd1c65a1409edc733b258";
var KEY_PRODUCT_CARD = "c9e7fb28e39f84e56ff881819a198f62ec0a6073";
var KEY_ROW_ITEM = "781e1213978776223960d4dacc2bd66c0306e43e";
var KEY_FOOTER = "d77e854d909571f399e78bbab3103ad48d9e9848";

// src/app/utils.ts
function normalizeNameKey(name) {
  return name.replace(/[\s#]/g, "").toLowerCase();
}
function findTextInRow(row, name) {
  const target = normalizeNameKey(name);
  const node = row.findOne(
    (n) => n.type === "TEXT" && normalizeNameKey(n.name || "") === target
  );
  return node || null;
}
function findTextInNode(node, name) {
  const target = normalizeNameKey(name);
  const found = node.findOne(
    (n) => n.type === "TEXT" && normalizeNameKey(n.name || "") === target
  );
  return found || null;
}
function findNodeInCard(card, name) {
  const target = normalizeNameKey(name);
  const found = card.findOne((n) => normalizeNameKey(n.name || "") === target);
  return found || null;
}
function findNodeInRowByName(row, name) {
  const target = normalizeNameKey(name);
  const node = row.findOne((n) => normalizeNameKey(n.name || "") === target);
  return node || null;
}
async function loadFontForNode(node) {
  if (node.fontName !== figma.mixed) {
    await figma.loadFontAsync(node.fontName);
  }
}
var libraryComponentCache = /* @__PURE__ */ new Map();
async function getComponentByKey(key) {
  if (!key) return null;
  if (libraryComponentCache.has(key)) {
    return libraryComponentCache.get(key) || null;
  }
  try {
    const comp = await figma.importComponentByKeyAsync(key);
    libraryComponentCache.set(key, comp);
    return comp;
  } catch (err) {
    console.log("Import by key error:", err);
    return null;
  }
}
function normalizePriceText(raw) {
  let text = (raw || "").trim();
  if (!text) return text;
  text = text.replace(/\s*руб\.?/i, "").trim();
  text = text.replace(/₽/g, "").trim();
  return text;
}
function normalizeDiscountText(raw) {
  let text = (raw || "").trim();
  if (!text) return text;
  text = text.replace(/%/g, "").trim();
  return text;
}

// src/app/card.ts
async function fillRowData(row, item, baseDiscountRaw) {
  if (item == null ? void 0 : item.sku) {
    row.name = String(item.sku);
  }
  const map = {
    [CONFIG.ROW_SKU]: item.sku,
    [CONFIG.ROW_SPECS]: item.specs,
    [CONFIG.ROW_MIN]: item.min,
    [CONFIG.ROW_QTY]: item.qty,
    [CONFIG.ROW_PRICE]: item.price
  };
  for (const [key, val] of Object.entries(map)) {
    const node = findTextInRow(row, key);
    if (node) {
      await loadFontForNode(node);
      node.characters = val ? String(val) : "-";
    }
  }
  const itemSaleNode = findNodeInRowByName(row, CONFIG.ROW_ITEM_SALE);
  const itemSaleText = findTextInRow(row, CONFIG.ROW_ITEM_SALE_DISCOUNT);
  if (itemSaleNode) itemSaleNode.visible = false;
  if (itemSaleText) itemSaleText.characters = "";
  const baseDiscount = normalizeDiscountValue(baseDiscountRaw);
  const rowDiscount = normalizeDiscountValue(item == null ? void 0 : item.discount);
  const shouldShow = baseDiscount !== null && rowDiscount !== null && baseDiscount !== rowDiscount;
  if (shouldShow && itemSaleNode) itemSaleNode.visible = true;
  if (shouldShow && itemSaleText) {
    await loadFontForNode(itemSaleText);
    itemSaleText.characters = normalizeDiscountText(String(item.discount || ""));
  }
}
async function fillCardStatic(card, group) {
  card.clipsContent = false;
  const title = card.findOne((n) => n.name === CONFIG.TITLE && n.type === "TEXT");
  if (title) {
    await loadFontForNode(title);
    title.characters = group.headerName.toUpperCase();
  }
  const descLayer = card.findOne((n) => n.name === CONFIG.DESCRIPTION && n.type === "TEXT");
  if (descLayer) {
    await loadFontForNode(descLayer);
    if (group.descriptionText) {
      descLayer.characters = group.descriptionText;
      descLayer.visible = true;
    } else {
      descLayer.visible = false;
    }
  }
  const discountLayer = findTextInNode(card, CONFIG.DISCOUNT);
  const saleStarNode = findNodeInCard(card, CONFIG.SALE_STAR);
  if (discountLayer) {
    await loadFontForNode(discountLayer);
    if (group.discountText) {
      discountLayer.characters = normalizeDiscountText(String(group.discountText));
      discountLayer.visible = true;
      if (saleStarNode) saleStarNode.visible = true;
    } else {
      discountLayer.visible = false;
      discountLayer.characters = "";
      if (saleStarNode) saleStarNode.visible = false;
    }
  }
  if (!group.discountText && saleStarNode) saleStarNode.visible = false;
  const discountInfo = findTextInNode(card, CONFIG.DISCOUNT_INFO);
  if (discountInfo) {
    await loadFontForNode(discountInfo);
    if (group.discountInfoText) {
      discountInfo.characters = String(group.discountInfoText);
      discountInfo.visible = true;
    } else {
      discountInfo.visible = false;
    }
  }
  const imgNode = card.findOne((n) => n.name === CONFIG.IMAGE);
  if (imgNode && group.imageBytes) {
    const image = figma.createImage(new Uint8Array(group.imageBytes));
    if ("fills" in imgNode) {
      imgNode.fills = [{
        type: "IMAGE",
        scaleMode: "FIT",
        imageHash: image.hash
      }];
    }
  }
  const logoNode = card.findOne((n) => n.name === CONFIG.LOGO && n.type === "INSTANCE");
  if (logoNode && group.brandId) {
    const targetVariantName = BRAND_MAPPING[group.brandId];
    if (targetVariantName) {
      const cp = logoNode.componentProperties;
      let propName = COMPONENT_PROPERTY_NAME;
      if (!cp || !cp[propName]) {
        const variantKey = cp ? Object.keys(cp).find((k) => {
          var _a;
          return ((_a = cp[k]) == null ? void 0 : _a.type) === "VARIANT";
        }) || Object.keys(cp)[0] : null;
        if (variantKey) propName = variantKey;
      }
      try {
        const props = {};
        props[propName] = targetVariantName;
        logoNode.setProperties(props);
      } catch (err) {
        console.log(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0431\u0440\u0435\u043D\u0434 \u0434\u043B\u044F ${group.brandId}. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0438\u043C\u044F \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u0430. Error: ${err}`);
      }
    }
    try {
      let container = logoNode.parent || null;
      while (container && container.type !== "FRAME" && container.type !== "INSTANCE") {
        container = container.parent || null;
      }
      const maxW = 70;
      const limitW = (container == null ? void 0 : container.width) ? Math.min(maxW, container.width) : maxW;
      const limitH = (container == null ? void 0 : container.height) ? container.height : logoNode.height;
      const scale = Math.min(1, limitW / logoNode.width, limitH / logoNode.height);
      if (scale < 1) {
        logoNode.resizeWithoutConstraints(
          Math.round(logoNode.width * scale),
          Math.round(logoNode.height * scale)
        );
      }
      if ((container == null ? void 0 : container.width) && (container == null ? void 0 : container.height)) {
        logoNode.x = Math.round((container.width - logoNode.width) / 2);
        logoNode.y = Math.round((container.height - logoNode.height) / 2);
      }
      if ("clipsContent" in logoNode) {
        logoNode.clipsContent = true;
      }
    } catch (err) {
      console.log("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440 \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u0430:", err);
    }
  }
}
function normalizeNameLocal(name) {
  return name.replace(/[\s#\u00A0]/g, "").toLowerCase();
}
function getOrCreateListFrame(card) {
  const listCandidates = card.findAll((n) => normalizeNameLocal(n.name) === "listcontainer");
  let listNode = null;
  if (listCandidates.length > 0) {
    const frameCandidates = listCandidates.filter((n) => n.type === "FRAME");
    if (frameCandidates.length > 0) {
      frameCandidates.sort((a, b) => b.width * b.height - a.width * a.height);
      listNode = frameCandidates.find((n) => n.visible) || frameCandidates[0];
    } else {
      const instCandidates = listCandidates.filter((n) => n.type === "INSTANCE");
      listNode = instCandidates.find((n) => n.visible) || instCandidates[0] || listCandidates[0];
    }
  }
  if (listNode && listNode.type === "INSTANCE") {
    const parent = listNode.parent;
    const idx = parent ? parent.children.indexOf(listNode) : -1;
    const detached = listNode.detachInstance();
    if (parent && idx >= 0) parent.insertChild(idx, detached);
    listNode = detached;
  }
  if (listNode && "children" in listNode) {
    return listNode;
  }
  if (listNode && listNode.type === "TEXT" && listNode.parent && "children" in listNode.parent) {
    const parent = listNode.parent;
    const idx = parent.children.indexOf(listNode);
    const frame = figma.createFrame();
    frame.name = CONFIG.LIST_CONTAINER;
    frame.x = listNode.x;
    frame.y = listNode.y;
    frame.resize(card.width, 1);
    frame.fills = [];
    parent.insertChild(Math.max(0, idx), frame);
    listNode.remove();
    return frame;
  }
  return null;
}
function prepareListFrame(list, card) {
  list.layoutMode = "VERTICAL";
  list.primaryAxisSizingMode = "AUTO";
  list.counterAxisSizingMode = "FIXED";
  list.primaryAxisAlignItems = "MIN";
  list.counterAxisAlignItems = "MIN";
  list.itemSpacing = CONFIG.ITEM_GAP;
  list.clipsContent = false;
  list.visible = true;
  list.opacity = 1;
  if (list.width < 10) {
    list.resize(card.width, Math.max(1, list.height));
  }
  let p = list.parent;
  while (p && p.type !== "PAGE") {
    if ("clipsContent" in p) p.clipsContent = false;
    p = p.parent || null;
  }
}
async function createFilledRow(rowMaster, item, rowIndex, baseDiscountRaw) {
  let rowNode;
  try {
    rowNode = rowMaster.createInstance();
  } catch (err) {
    const fresh = await getComponentByKey(KEY_ROW_ITEM);
    if (!fresh) throw err;
    rowMaster = fresh;
    rowNode = rowMaster.createInstance();
  }
  rowNode.resize(COL_W, rowNode.height);
  rowNode.visible = true;
  rowNode.opacity = 1;
  if (rowIndex % 2 !== 0) {
    rowNode.fills = [{ type: "SOLID", color: { r: 0.96, g: 0.96, b: 0.96 } }];
  }
  await fillRowData(rowNode, item, baseDiscountRaw);
  return rowNode;
}
async function appendRowsToCardList(list, card, rowMaster, items, baseDiscountRaw, rowOffset = 0) {
  prepareListFrame(list, card);
  for (let i = 0; i < items.length; i++) {
    const rowNode = await createFilledRow(rowMaster, items[i], rowOffset + i, baseDiscountRaw);
    if (list.layoutMode !== "NONE") {
      rowNode.layoutAlign = "STRETCH";
    }
    list.appendChild(rowNode);
  }
}
async function fillCardData(card, group, rowMaster) {
  await fillCardStatic(card, group);
  const list = getOrCreateListFrame(card);
  if (!list) {
    figma.notify("\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D #ListContainer \u0432 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0435", { timeout: 1500 });
    return;
  }
  await appendRowsToCardList(list, card, rowMaster, group.items, group.discountText || null, 0);
}
async function buildSplitCards(cardMaster, rowMaster, group, maxColH, firstChunkMaxColH) {
  var _a;
  const baseCard = cardMaster.createInstance().detachInstance();
  baseCard.name = group.mainSku ? `Card${String(group.mainSku)}` : "Unknown SKU";
  baseCard.resize(COL_W, baseCard.height);
  await fillCardStatic(baseCard, group);
  const baseList = getOrCreateListFrame(baseCard);
  if (!baseList) return [baseCard];
  prepareListFrame(baseList, baseCard);
  const headerH = Math.max(0, baseCard.height - baseList.height);
  const firstMaxListH = Math.max(0, (firstChunkMaxColH != null ? firstChunkMaxColH : maxColH) - headerH);
  const defaultMaxListH = Math.max(0, maxColH - headerH);
  if (defaultMaxListH <= 0) {
    await appendRowsToCardList(baseList, baseCard, rowMaster, group.items, group.discountText || null, 0);
    return [baseCard];
  }
  const measuredRows = [];
  for (let i = 0; i < group.items.length; i++) {
    measuredRows.push(await createFilledRow(rowMaster, group.items[i], i, group.discountText || null));
  }
  const gap = (_a = baseList.itemSpacing) != null ? _a : CONFIG.ITEM_GAP;
  const keepHeaderForAll = measuredRows.length > 10;
  const chunks = [];
  let currentChunk = [];
  let currentHeight = 0;
  let chunkIndex = 0;
  for (let i = 0; i < measuredRows.length; i++) {
    const maxListH = chunkIndex === 0 ? firstMaxListH : defaultMaxListH;
    const addGap = currentChunk.length > 0 ? gap : 0;
    const nextHeight = currentHeight + addGap + measuredRows[i].height;
    if (nextHeight > maxListH && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = [i];
      currentHeight = measuredRows[i].height;
      chunkIndex++;
    } else {
      currentChunk.push(i);
      currentHeight = nextHeight;
    }
  }
  if (currentChunk.length > 0) chunks.push(currentChunk);
  for (const row of measuredRows) row.remove();
  if (chunks.length <= 1) {
    await appendRowsToCardList(baseList, baseCard, rowMaster, group.items, group.discountText || null, 0);
    return [baseCard];
  }
  const cards = [];
  for (let i = 0; i < chunks.length; i++) {
    const card = i === 0 ? baseCard : cardMaster.createInstance().detachInstance();
    if (i > 0) {
      card.name = group.mainSku ? `Card${String(group.mainSku)}-p${i + 1}` : `Unknown SKU-p${i + 1}`;
      card.resize(COL_W, card.height);
      await fillCardStatic(card, group);
    }
    const list = getOrCreateListFrame(card);
    if (!list) {
      cards.push(card);
      continue;
    }
    prepareListFrame(list, card);
    for (const child of [...list.children]) child.remove();
    const chunkItems = chunks[i].map((index) => group.items[index]);
    await appendRowsToCardList(list, card, rowMaster, chunkItems, group.discountText || null, chunks[i][0] || 0);
    if (i === 0) {
      const desc = card.findOne((n) => n.name === CONFIG.DESCRIPTION && n.type === "TEXT");
      if (desc) desc.visible = false;
    } else {
      hideCardHeader(card, keepHeaderForAll);
      const desc = card.findOne((n) => n.name === CONFIG.DESCRIPTION && n.type === "TEXT");
      if (desc) desc.visible = true;
    }
    cards.push(card);
  }
  return cards;
}
function hideCardHeader(card, keepTitleLogo = false) {
  const hideNames = [
    ...keepTitleLogo ? [] : [CONFIG.TITLE, CONFIG.LOGO],
    CONFIG.DISCOUNT,
    CONFIG.SALE_STAR
  ];
  for (const name of hideNames) {
    const node = card.findOne((n) => n.name === name);
    if (node) node.visible = false;
  }
}
function normalizeDiscountValue(raw) {
  if (!raw) return null;
  const text = normalizeDiscountText(String(raw));
  return text ? text : null;
}

// src/app/banner.ts
async function updateSaleBannerInfo(infoMap) {
  const { monthLabel, monthGenitive, year, lastDay } = getNextMonthInfo();
  const saleMonthText = `${capitalize(monthLabel)} ${year}`;
  const saleDateText = `\u0421 1 \u0434\u043E ${lastDay} ${monthGenitive}`;
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
async function findBannerScope() {
  const instances = figma.root.findAll((n) => n.type === "INSTANCE");
  const bannerInstances = [];
  for (const inst of instances) {
    try {
      const main = await inst.getMainComponentAsync();
      const key = main == null ? void 0 : main.key;
      if (key === KEY_BANNER || inst.name === "Banner") {
        bannerInstances.push(inst);
      }
    } catch (e) {
    }
  }
  if (bannerInstances.length === 0) return null;
  return bannerInstances;
}
function findTextNodesByNameAny(names, scope = null) {
  const wanted = new Set(names.map((n) => normalizeNameKey(n)));
  const roots = scope && scope.length > 0 ? scope : [figma.root];
  const nodes = [];
  for (const r of roots) {
    const found = r.findAll ? r.findAll((n) => n.type === "TEXT") : [];
    nodes.push(...found);
  }
  return nodes.filter((n) => wanted.has(normalizeNameKey(n.name || "")));
}
function getMaxDiscount(infoMap) {
  let max = null;
  for (const entry of Object.values(infoMap || {})) {
    const raw = entry == null ? void 0 : entry.discount;
    if (raw === void 0 || raw === null) continue;
    const val = parseDiscountValue(String(raw));
    if (val === null) continue;
    if (max === null || val > max) max = val;
  }
  return max;
}
function parseDiscountValue(text) {
  const cleaned = text.replace(",", ".").replace(/[^\d.\-]/g, "");
  if (!cleaned) return null;
  const val = parseFloat(cleaned);
  return Number.isFinite(val) ? val : null;
}
function getNextMonthInfo() {
  const now = /* @__PURE__ */ new Date();
  const target = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const year = target.getFullYear();
  const monthIndex = target.getMonth();
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  const monthsNom = [
    "\u044F\u043D\u0432\u0430\u0440\u044C",
    "\u0444\u0435\u0432\u0440\u0430\u043B\u044C",
    "\u043C\u0430\u0440\u0442",
    "\u0430\u043F\u0440\u0435\u043B\u044C",
    "\u043C\u0430\u0439",
    "\u0438\u044E\u043D\u044C",
    "\u0438\u044E\u043B\u044C",
    "\u0430\u0432\u0433\u0443\u0441\u0442",
    "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044C",
    "\u043E\u043A\u0442\u044F\u0431\u0440\u044C",
    "\u043D\u043E\u044F\u0431\u0440\u044C",
    "\u0434\u0435\u043A\u0430\u0431\u0440\u044C"
  ];
  const monthsGen = [
    "\u044F\u043D\u0432\u0430\u0440\u044F",
    "\u0444\u0435\u0432\u0440\u0430\u043B\u044F",
    "\u043C\u0430\u0440\u0442\u0430",
    "\u0430\u043F\u0440\u0435\u043B\u044F",
    "\u043C\u0430\u044F",
    "\u0438\u044E\u043D\u044F",
    "\u0438\u044E\u043B\u044F",
    "\u0430\u0432\u0433\u0443\u0441\u0442\u0430",
    "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F",
    "\u043E\u043A\u0442\u044F\u0431\u0440\u044F",
    "\u043D\u043E\u044F\u0431\u0440\u044F",
    "\u0434\u0435\u043A\u0430\u0431\u0440\u044F"
  ];
  return {
    monthLabel: monthsNom[monthIndex],
    monthGenitive: monthsGen[monthIndex],
    year,
    lastDay
  };
}
function capitalize(s) {
  if (!s) return s;
  return s[0].toUpperCase() + s.slice(1);
}

// src/app/layout.ts
function calculateContentHeight(col) {
  let h = 0;
  col.children.forEach((child) => {
    h += child.height;
  });
  if (col.children.length > 0) h += (col.children.length - 1) * ITEM_GAP;
  return h;
}
function findBestColumn(columns, itemH) {
  let best = null;
  let bestRemaining = Infinity;
  for (const col of columns) {
    const currentH = calculateContentHeight(col);
    const gap = col.children.length > 0 ? ITEM_GAP : 0;
    const remaining = col.height - currentH - gap;
    if (remaining >= itemH && remaining < bestRemaining) {
      bestRemaining = remaining;
      best = col;
    }
  }
  return best;
}
function createBlankPage(num) {
  const page = figma.createFrame();
  page.name = `\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ${num}`;
  page.resize(A4_W, A4_H);
  page.x = (num - 1) * (A4_W + 50);
  page.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  page.clipsContent = false;
  return page;
}
async function addFooterToPage(page) {
  const footerComp = await getComponentByKey(KEY_FOOTER);
  if (!footerComp) return;
  const footerInstance = footerComp.createInstance();
  footerInstance.x = 0;
  footerInstance.y = Math.max(0, A4_H - FOOTER_H);
  page.appendChild(footerInstance);
}
function getPageColumns(page) {
  const cols = page.findAll(
    (n) => n.type === "FRAME" && (n.name === "Left Column" || n.name === "Right Column")
  );
  return cols.sort((a, b) => a.x - b.x);
}
function collectOverflowCards(page, footerTop) {
  const overflow = [];
  const columns = getPageColumns(page);
  for (const col of columns) {
    const children = col.children.filter((n) => n.type === "FRAME" || n.type === "INSTANCE").sort((a, b) => a.y - b.y);
    let moveRest = false;
    for (const child of children) {
      const bottom = col.y + child.y + child.height;
      if (moveRest || bottom > footerTop) {
        moveRest = true;
        overflow.push(child);
      }
    }
  }
  return overflow;
}
function layoutCardsOnNewPages(cards, startPageNum, compactLayout) {
  let pageNum = startPageNum;
  let currentLayout = createPageWithColumns(pageNum, 0);
  let lastPage = currentLayout.page;
  let activeColIndex = 0;
  let activeColumn = currentLayout.columns[0];
  const allColumns = [...currentLayout.columns];
  for (const cardNode of cards) {
    const cardFrame = cardNode;
    if (compactLayout) {
      let targetCol = findBestColumn(allColumns, cardFrame.height);
      if (!targetCol) {
        pageNum++;
        const newLayout = createPageWithColumns(pageNum, 0);
        lastPage = newLayout.page;
        allColumns.push(...newLayout.columns);
        targetCol = findBestColumn(allColumns, cardFrame.height) || newLayout.columns[0];
      }
      targetCol.appendChild(cardFrame);
    } else {
      const currentContentH = calculateContentHeight(activeColumn);
      const newH = currentContentH + ITEM_GAP + cardFrame.height;
      const colMaxH = activeColumn.height;
      if (newH > colMaxH && activeColumn.children.length > 0) {
        if (activeColIndex === 0) {
          activeColIndex = 1;
          activeColumn = currentLayout.columns[1];
        } else {
          pageNum++;
          currentLayout = createPageWithColumns(pageNum, 0);
          lastPage = currentLayout.page;
          allColumns.push(...currentLayout.columns);
          activeColIndex = 0;
          activeColumn = currentLayout.columns[0];
        }
      }
      activeColumn.appendChild(cardFrame);
    }
  }
  return { lastPage, pageNum };
}
function relocateOverflowForFooter(lastPage, pageNum, compactLayout) {
  const footerTop = A4_H - FOOTER_H;
  let currentLast = lastPage;
  let currentPageNum = pageNum;
  for (let i = 0; i < 5; i++) {
    const overflowAll = collectOverflowCards(currentLast, footerTop);
    if (overflowAll.length === 0) break;
    const columns = getPageColumns(currentLast);
    const remaining = [];
    for (const card of overflowAll) {
      let placed = false;
      for (const col of columns) {
        const maxH = Math.max(0, footerTop - col.y);
        const currentH = calculateContentHeight(col);
        const gap = col.children.length > 0 ? ITEM_GAP : 0;
        const remainingH = maxH - currentH - gap;
        if (remainingH >= card.height) {
          col.appendChild(card);
          placed = true;
          break;
        }
      }
      if (!placed) remaining.push(card);
    }
    if (remaining.length === 0) break;
    const result = layoutCardsOnNewPages(remaining, currentPageNum + 1, compactLayout);
    currentLast = result.lastPage;
    currentPageNum = result.pageNum;
  }
  return { lastPage: currentLast, pageNum: currentPageNum };
}
function createPageWithColumns(num, shiftTopPx) {
  const page = figma.createFrame();
  page.name = `\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ${num}`;
  page.resize(A4_W, A4_H);
  page.x = (num - 1) * (A4_W + 50);
  page.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  page.clipsContent = false;
  const leftCol = figma.createFrame();
  leftCol.name = "Left Column";
  leftCol.clipsContent = false;
  setupColumnStyle(leftCol, shiftTopPx);
  leftCol.x = PAD_X;
  leftCol.y = PAD_Y + shiftTopPx;
  page.appendChild(leftCol);
  const rightCol = figma.createFrame();
  rightCol.name = "Right Column";
  rightCol.clipsContent = false;
  setupColumnStyle(rightCol, shiftTopPx);
  rightCol.x = PAD_X + COL_W + COL_GAP;
  rightCol.y = PAD_Y + shiftTopPx;
  page.appendChild(rightCol);
  return { page, columns: [leftCol, rightCol] };
}
function setupColumnStyle(col, shiftTopPx) {
  const maxH = Math.max(0, MAX_COL_H - shiftTopPx);
  col.resize(COL_W, maxH);
  col.layoutMode = "VERTICAL";
  col.primaryAxisSizingMode = "FIXED";
  col.primaryAxisAlignItems = "SPACE_BETWEEN";
  col.counterAxisSizingMode = "FIXED";
  col.itemSpacing = ITEM_GAP;
  col.fills = [];
}

// src/app/generation.ts
async function createBrochure(groups, layout, opts) {
  var _a, _b, _c;
  figma.notify(`createBrochure: groups=${(groups == null ? void 0 : groups.length) || 0}`, { timeout: 1500 });
  let rowMaster = figma.root.findOne((n) => n.type === "COMPONENT" && n.name === "RowItem");
  let cardMaster = figma.root.findOne((n) => n.type === "COMPONENT" && n.name === "ProductCard");
  const cardFromKey = await getComponentByKey(KEY_PRODUCT_CARD);
  if (cardFromKey) cardMaster = cardFromKey;
  const rowFromKey = await getComponentByKey(KEY_ROW_ITEM);
  if (rowFromKey) rowMaster = rowFromKey;
  if (!rowMaster || rowMaster.removed) {
    rowMaster = await getComponentByKey(KEY_ROW_ITEM);
  }
  if (!cardMaster || cardMaster.removed) {
    cardMaster = await getComponentByKey(KEY_PRODUCT_CARD);
  }
  if (!rowMaster) throw new Error("\u041D\u0435\u0442 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430 RowItem (\u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E \u0438\u043B\u0438 \u0432 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0435)!");
  if (!cardMaster) throw new Error("\u041D\u0435\u0442 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430 ProductCard (\u043B\u043E\u043A\u0430\u043B\u044C\u043D\u043E \u0438\u043B\u0438 \u0432 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0435)!");
  const giftBlockEnabled = !!(layout == null ? void 0 : layout.giftBlockEnabled);
  const giftBlockMode = (layout == null ? void 0 : layout.giftBlockMode) || "twoThirds";
  const compactLayout = !!(layout == null ? void 0 : layout.compactLayout);
  const orderList = Array.isArray(layout == null ? void 0 : layout.orderList) ? layout.orderList : [];
  const startOnSecondPage = giftBlockEnabled && giftBlockMode === "startSecond";
  const firstPageShift = resolveShiftPx(
    giftBlockEnabled ? CONFIG.FIRST_PAGE_SHIFT_TWO_THIRDS : CONFIG.FIRST_PAGE_SHIFT_DEFAULT
  );
  let pageNum = startOnSecondPage ? 2 : 1;
  let lastPage = null;
  if (startOnSecondPage) {
    createBlankPage(1);
  }
  let currentLayout = createPageWithColumns(pageNum, pageNum === 1 ? firstPageShift : 0);
  lastPage = currentLayout.page;
  if (pageNum === 1) {
    const bannerComp = await getComponentByKey(KEY_BANNER);
    if (bannerComp) {
      const bannerInstance = bannerComp.createInstance();
      bannerInstance.x = 0;
      bannerInstance.y = 0;
      currentLayout.page.appendChild(bannerInstance);
    }
  }
  let activeColIndex = 0;
  let activeColumn = currentLayout.columns[0];
  const allColumns = [...currentLayout.columns];
  let processed = 0;
  const orderedGroups = orderGroupsBySku(groups, orderList);
  for (const group of orderedGroups) {
    if ((_a = opts == null ? void 0 : opts.shouldCancel) == null ? void 0 : _a.call(opts)) {
      figma.ui.postMessage({ type: "complete", text: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C" });
      throw new Error("\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C");
    }
    const colMaxHForSplit = currentLayout.columns[0].height;
    const currentContentHForSplit = calculateContentHeight(activeColumn);
    const currentGapForSplit = activeColumn.children.length > 0 ? CONFIG.ITEM_GAP : 0;
    const remainingHForSplit = activeColumn.height - currentContentHForSplit - currentGapForSplit;
    const estimatedCardHeight = estimateCardHeight(((_b = group.items) == null ? void 0 : _b.length) || 0);
    let cardsToPlace = [];
    const shouldTrySplit = estimatedCardHeight > Math.max(0, remainingHForSplit) || estimatedCardHeight > colMaxHForSplit;
    if (shouldTrySplit) {
      let doSplit = !!(opts == null ? void 0 : opts.autoSplit);
      if (!doSplit && (opts == null ? void 0 : opts.askSplit)) {
        doSplit = await opts.askSplit(
          group.mainSku ? `Card${String(group.mainSku)}` : "Unknown SKU",
          estimatedCardHeight,
          colMaxHForSplit
        );
      }
      if (doSplit) {
        const firstChunkMaxColH = activeColumn.children.length > 0 && remainingHForSplit > 0 ? remainingHForSplit : colMaxHForSplit;
        cardsToPlace = await buildSplitCards(cardMaster, rowMaster, group, colMaxHForSplit, firstChunkMaxColH);
      }
    }
    if (cardsToPlace.length === 0) {
      let instance;
      try {
        instance = cardMaster.createInstance();
      } catch (err) {
        const fresh = await getComponentByKey(KEY_PRODUCT_CARD);
        if (!fresh) throw err;
        cardMaster = fresh;
        instance = cardMaster.createInstance();
      }
      const cardFrame = instance.detachInstance();
      if (group.mainSku) {
        cardFrame.name = `Card${String(group.mainSku)}`;
      } else {
        cardFrame.name = "Unknown SKU";
      }
      cardFrame.resize(COL_W, cardFrame.height);
      await fillCardData(cardFrame, group, rowMaster);
      if (cardFrame.height > colMaxHForSplit) {
        let doSplit = !!(opts == null ? void 0 : opts.autoSplit);
        if (!doSplit && (opts == null ? void 0 : opts.askSplit)) {
          doSplit = await opts.askSplit(cardFrame.name, cardFrame.height, colMaxHForSplit);
        }
        if (doSplit) {
          cardsToPlace = await buildSplitCards(cardMaster, rowMaster, group, colMaxHForSplit, colMaxHForSplit);
          cardFrame.remove();
        } else {
          cardsToPlace = [cardFrame];
        }
      } else {
        cardsToPlace = [cardFrame];
      }
    }
    for (let i = 0; i < cardsToPlace.length; i++) {
      if ((_c = opts == null ? void 0 : opts.shouldCancel) == null ? void 0 : _c.call(opts)) {
        figma.ui.postMessage({ type: "complete", text: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C" });
        throw new Error("\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C");
      }
      const card = cardsToPlace[i];
      if (i > 0 && card.name) card.name = `${card.name}-p${i + 1}`;
      if (compactLayout) {
        let targetCol = findBestColumn(allColumns, card.height);
        if (!targetCol) {
          pageNum++;
          const newLayout = createPageWithColumns(pageNum, 0);
          lastPage = newLayout.page;
          allColumns.push(...newLayout.columns);
          targetCol = findBestColumn(allColumns, card.height) || newLayout.columns[0];
        }
        targetCol.appendChild(card);
      } else {
        const currentContentH = calculateContentHeight(activeColumn);
        const colMaxH = activeColumn.height;
        const remainingH = colMaxH - currentContentH - (activeColumn.children.length > 0 ? CONFIG.ITEM_GAP : 0);
        if (card.height > colMaxH && remainingH < MIN_REMAINING_FOR_SPLIT && activeColumn.children.length > 0) {
          if (activeColIndex === 0) {
            activeColIndex = 1;
            activeColumn = currentLayout.columns[1];
          } else {
            pageNum++;
            currentLayout = createPageWithColumns(pageNum, 0);
            lastPage = currentLayout.page;
            allColumns.push(...currentLayout.columns);
            activeColIndex = 0;
            activeColumn = currentLayout.columns[0];
          }
        } else {
          const newH = currentContentH + CONFIG.ITEM_GAP + card.height;
          if (newH > colMaxH && activeColumn.children.length > 0) {
            if (activeColIndex === 0) {
              activeColIndex = 1;
              activeColumn = currentLayout.columns[1];
            } else {
              pageNum++;
              currentLayout = createPageWithColumns(pageNum, 0);
              lastPage = currentLayout.page;
              allColumns.push(...currentLayout.columns);
              activeColIndex = 0;
              activeColumn = currentLayout.columns[0];
            }
          }
        }
        activeColumn.appendChild(card);
      }
    }
    processed++;
    if (processed % 3 === 0) {
      figma.ui.postMessage({
        type: "progress",
        curr: processed,
        total: orderedGroups.length,
        text: `\u0412\u0435\u0440\u0441\u0442\u043A\u0430: ${processed} / ${orderedGroups.length}`
      });
      await new Promise((r) => setTimeout(r, 10));
    }
  }
  if (lastPage) {
    const footerResult = relocateOverflowForFooter(lastPage, pageNum, compactLayout);
    lastPage = footerResult.lastPage;
    pageNum = footerResult.pageNum;
    await addFooterToPage(lastPage);
  }
  if (layout == null ? void 0 : layout.infoMap) {
    await updateSaleBannerInfo(layout.infoMap);
  }
  figma.ui.postMessage({ type: "complete", text: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D!" });
}
function orderGroupsBySku(groups, orderList) {
  if (!orderList || orderList.length === 0) return groups;
  const orderIndex = /* @__PURE__ */ new Map();
  for (let i = 0; i < orderList.length; i++) {
    const sku = String(orderList[i]).trim();
    if (!orderIndex.has(sku)) orderIndex.set(sku, i);
  }
  return [...groups].sort((a, b) => {
    const aSku = (a == null ? void 0 : a.mainSku) ? String(a.mainSku).trim() : "";
    const bSku = (b == null ? void 0 : b.mainSku) ? String(b.mainSku).trim() : "";
    const ai = getGroupOrderIndex(a, aSku, orderIndex);
    const bi = getGroupOrderIndex(b, bSku, orderIndex);
    if (ai !== bi) return ai - bi;
    return aSku.localeCompare(bSku, "ru");
  });
}
function getGroupOrderIndex(group, mainSku, orderIndex) {
  let best = orderIndex.has(mainSku) ? orderIndex.get(mainSku) : Number.MAX_SAFE_INTEGER;
  const items = (group == null ? void 0 : group.items) || [];
  for (const it of items) {
    const sku = (it == null ? void 0 : it.sku) ? String(it.sku).trim() : "";
    if (!sku) continue;
    const idx = orderIndex.has(sku) ? orderIndex.get(sku) : Number.MAX_SAFE_INTEGER;
    if (idx < best) best = idx;
  }
  return best;
}
function resolveShiftPx(value) {
  if (!Number.isFinite(value)) return 0;
  if (value >= 0 && value <= 1) {
    return Math.round(A4_H * value);
  }
  return Math.round(value);
}
function estimateCardHeight(itemCount) {
  const rows = Math.max(0, itemCount);
  const rowsHeight = rows > 0 ? rows * CONFIG.ESTIMATED_ROW_HEIGHT + Math.max(0, rows - 1) * CONFIG.ITEM_GAP : 0;
  return CONFIG.MIN_CARD_HEIGHT + rowsHeight;
}

// src/app/update.ts
async function updateInfoOnPage(payload, shouldCancel) {
  const infoMap = (payload == null ? void 0 : payload.infoMap) || {};
  const updatePrice = (payload == null ? void 0 : payload.updatePrice) !== void 0 ? !!payload.updatePrice : Object.values(infoMap).some((v) => (v == null ? void 0 : v.price) && String(v.price).trim() !== "");
  const codes = Object.keys(infoMap);
  console.log("[update-info] payload keys:", Object.keys(payload || {}));
  console.log("[update-info] updatePrice:", updatePrice);
  console.log("[update-info] codes count:", codes.length);
  console.log("[update-info] sample codes:", codes.slice(0, 10));
  if (codes.length === 0) {
    figma.ui.postMessage({ type: "complete", text: "Cards not found." });
    return;
  }
  let updatedDiscounts = 0;
  let updatedPrices = 0;
  let foundCards = 0;
  const cards = figma.root.findAll(
    (n) => (n.type === "FRAME" || n.type === "INSTANCE") && n.name.startsWith("Card")
  );
  const cardByName = /* @__PURE__ */ new Map();
  for (const c of cards) {
    if (c.name) cardByName.set(c.name, c);
  }
  for (const code of codes) {
    if (shouldCancel == null ? void 0 : shouldCancel()) {
      figma.ui.postMessage({ type: "complete", text: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C" });
      throw new Error("\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C");
    }
    const cardName = `Card${code}`;
    const targetCard = cardByName.get(cardName) || null;
    if (!targetCard) {
      console.log("[update-info] card not found for code:", code);
      continue;
    }
    foundCards++;
    const entry = infoMap[code] || {};
    const newDiscount = entry.discount;
    const discountLayer = findTextInNode(targetCard, CONFIG.DISCOUNT);
    const saleStarNode = findNodeInCard(targetCard, CONFIG.SALE_STAR);
    const discountInfoLayer = findTextInNode(targetCard, CONFIG.DISCOUNT_INFO);
    if (discountLayer) {
      await loadFontForNode(discountLayer);
      const hasDiscount = newDiscount !== void 0 && newDiscount !== null && String(newDiscount).trim() !== "";
      if (hasDiscount) {
        discountLayer.characters = normalizeDiscountText(String(newDiscount));
        discountLayer.visible = true;
        if (saleStarNode) saleStarNode.visible = true;
        updatedDiscounts++;
      } else {
        discountLayer.visible = false;
        if (saleStarNode) saleStarNode.visible = false;
      }
    } else {
      console.log("[update-info] discount layer not found in card:", targetCard.name);
    }
    if (discountInfoLayer) {
      await loadFontForNode(discountInfoLayer);
      const cond = entry.conditions;
      if (cond && String(cond).trim() !== "") {
        discountInfoLayer.characters = String(cond);
        discountInfoLayer.visible = true;
      } else {
        discountInfoLayer.visible = false;
      }
    }
  }
  if (updatePrice) {
    console.log("[update-info] cards for price scan:", cards.length);
    for (const card of cards) {
      if (shouldCancel == null ? void 0 : shouldCancel()) {
        figma.ui.postMessage({ type: "complete", text: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C" });
        throw new Error("\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C");
      }
      const list = card.findOne((n) => n.name === CONFIG.LIST_CONTAINER && n.type === "FRAME");
      if (!list) continue;
      for (const row of list.children) {
        if (shouldCancel == null ? void 0 : shouldCancel()) {
          figma.ui.postMessage({ type: "complete", text: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C" });
          throw new Error("\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C");
        }
        const priceNode = row.findOne((n) => n.name === CONFIG.ROW_PRICE && n.type === "TEXT");
        if (!priceNode) continue;
        let sku = "";
        if (row.name) {
          sku = String(row.name).trim();
        } else {
          const skuNode = row.findOne((n) => n.name === CONFIG.ROW_SKU && n.type === "TEXT");
          if (skuNode == null ? void 0 : skuNode.characters) {
            sku = skuNode.characters.trim();
          } else {
            const anyText = row.findOne((n) => n.type === "TEXT");
            if (anyText == null ? void 0 : anyText.characters) sku = anyText.characters.trim();
          }
        }
        if (!sku) continue;
        const entry = infoMap[sku];
        const newPrice = entry == null ? void 0 : entry.price;
        if (!newPrice || String(newPrice).trim() === "") continue;
        await loadFontForNode(priceNode);
        priceNode.characters = normalizePriceText(String(newPrice));
        updatedPrices++;
      }
    }
  }
  updateRowItemDiscounts(infoMap, cards);
  console.log("[update-info] foundCards:", foundCards, "updatedDiscounts:", updatedDiscounts, "updatedPrices:", updatedPrices);
  await updateSaleBannerInfo(infoMap);
  if (foundCards === 0 && updatedPrices === 0) {
    figma.ui.postMessage({ type: "complete", text: "Cards not found." });
    return;
  }
  const pricePart = updatePrice ? `, prices: ${updatedPrices}` : "";
  figma.notify(`Updated discounts: ${updatedDiscounts}${pricePart}`);
  figma.ui.postMessage({ type: "complete", text: `Done! Discounts: ${updatedDiscounts}${pricePart}` });
}
function updateRowItemDiscounts(infoMap, cards) {
  var _a, _b;
  for (const card of cards) {
    const list = card.findOne((n) => n.name === CONFIG.LIST_CONTAINER && n.type === "FRAME");
    if (!list) continue;
    const baseSku = ((_a = card.name) == null ? void 0 : _a.startsWith("Card")) ? card.name.slice(4) : "";
    const baseDiscountRaw = baseSku ? (_b = infoMap == null ? void 0 : infoMap[baseSku]) == null ? void 0 : _b.discount : null;
    const baseDiscount = discountComparable(baseDiscountRaw);
    for (const row of list.children) {
      let sku = "";
      if (row.name) {
        sku = String(row.name).trim();
      } else {
        const skuNode = row.findOne((n) => n.name === CONFIG.ROW_SKU && n.type === "TEXT");
        if (skuNode == null ? void 0 : skuNode.characters) sku = skuNode.characters.trim();
      }
      if (!sku) continue;
      const entry = infoMap == null ? void 0 : infoMap[sku];
      const rowDiscountRaw = entry == null ? void 0 : entry.discount;
      const rowDiscount = discountComparable(rowDiscountRaw);
      const itemSaleNode = findNodeInRowByName(row, CONFIG.ROW_ITEM_SALE);
      const itemSaleText = findTextInRow(row, CONFIG.ROW_ITEM_SALE_DISCOUNT);
      const shouldShow = baseDiscount !== null && rowDiscount !== null && !discountEquals(baseDiscount, rowDiscount);
      if (itemSaleNode) itemSaleNode.visible = shouldShow;
      if (shouldShow && itemSaleText) {
        loadFontForNode(itemSaleText).then(() => {
          itemSaleText.characters = normalizeDiscountText(String(rowDiscountRaw));
        });
      }
    }
  }
}
function discountComparable(raw) {
  if (raw === void 0 || raw === null) return null;
  const text = String(raw).trim();
  if (!text) return null;
  const num = parseDiscountValue(text);
  if (num !== null) return num;
  return normalizeDiscountText(text);
}
function discountEquals(a, b) {
  if (a === null || b === null) return false;
  if (typeof a === "number" && typeof b === "number") return a === b;
  return String(a) === String(b);
}

// src/app/main.ts
figma.showUI(__html__, { width: 430, height: 650 });
var pendingSplits = /* @__PURE__ */ new Map();
var splitSeq = 0;
var cancelRequested = false;
function requestSplitDecision(cardName, cardHeight, colHeight) {
  const id = `split_${Date.now()}_${++splitSeq}`;
  figma.ui.postMessage({ type: "split-query", id, cardName, cardHeight, colHeight });
  return new Promise((resolve) => pendingSplits.set(id, resolve));
}
figma.ui.onmessage = async (msg) => {
  var _a;
  try {
    if (msg.type === "cancel") {
      cancelRequested = true;
      figma.notify("\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F...");
      return;
    }
    if (msg.type === "split-response") {
      const resolver = pendingSplits.get(msg.id);
      if (resolver) {
        pendingSplits.delete(msg.id);
        resolver(!!msg.split);
      }
      return;
    }
    if (msg.type === "build") {
      cancelRequested = false;
      await figma.loadAllPagesAsync();
      await loadFonts();
      const payload = msg.data || {};
      const groups = Array.isArray(payload) ? payload : payload.groups;
      const layout = Array.isArray(payload) ? {} : payload.layout || {};
      applyConfigOverrides(layout.settings);
      await createBrochure(groups || [], layout, {
        autoSplit: !!((_a = layout.settings) == null ? void 0 : _a.AUTO_SPLIT),
        askSplit: requestSplitDecision,
        shouldCancel: () => cancelRequested
      });
    }
    if (msg.type === "update-info") {
      cancelRequested = false;
      await figma.loadAllPagesAsync();
      await loadFonts();
      await updateInfoOnPage(msg.data, () => cancelRequested);
    }
  } catch (e) {
    const message = e instanceof Error ? e.message || "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430" : typeof e === "string" && e.trim() ? e : "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430";
    figma.notify(message, { error: true });
    figma.ui.postMessage({ type: "error", text: message });
  }
};
async function loadFonts() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
}
