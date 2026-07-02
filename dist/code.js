"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };

  // src/app/layoutConfig.ts
  var LAYOUT_DEFAULTS = {
    A4_W: 595,
    A4_H: 842,
    PAD_X: 20,
    PAD_Y: 35,
    COL_GAP: 20,
    COL_W: 268,
    ITEM_GAP: 2,
    COL_W_REDUCE: 20,
    MIN_REMAINING_FOR_SPLIT: 220,
    MIN_CARD_HEIGHT: 135,
    BASE_CARD_ROWS: 6,
    ESTIMATED_ROW_HEIGHT: 10,
    IMAGE_FETCH_CONCURRENCY: 4,
    FIRST_PAGE_SHIFT_DEFAULT: 1 / 3,
    FIRST_PAGE_SHIFT_TWO_THIRDS: 2 / 3,
    PAGINATOR_X: 0,
    PAGINATOR_Y: 0,
    PAGINATOR_ENABLED: true,
    FOOTER_ENABLED: true,
    INSERT_DEBUG_TEXT_IN_LIST: false,
    FOOTER_H: 110
  };

  // src/app/layerNames.ts
  var LAYER_NAMES = {
    LIST_CONTAINER: "#ListContainer",
    TITLE: "#Title",
    DESCRIPTION: "#Description",
    DISCOUNT: "productDiscount",
    DISCOUNT_INFO: "#DiscountInfo",
    SURPRISE: "#Suprise",
    SURPRISE_WRAPPER: "surpriseWrapper",
    IMAGE: "#Image",
    LOGO: "Main Logotypes",
    ROW_SKU: "#SKU",
    ROW_SPECS: "#Specs",
    ROW_MIN: "#Min",
    ROW_QTY: "#Qty",
    ROW_PRICE: "#Price",
    ROW_ITEM_SALE: "itemSale",
    ROW_ITEM_SALE_DISCOUNT: "priceProductDiscount",
    SALE_STAR: "saleStar"
  };

  // src/app/brands.ts
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

  // src/app/componentKeys.ts
  var COMPONENT_PROPERTY_NAME = "Brand";
  var KEY_BANNER = "360d86e3ecd75b74a07dd1c65a1409edc733b258";
  var KEY_FOOTER = "d77e854d909571f399e78bbab3103ad48d9e9848";
  var KEY_PAGINATOR = "66a00b1f2a87be40ff58949d53422f45015f57ef";
  var KEY_PRODUCT_CARD = "24ae9c59a1e5f308bce962d6be8bac713976667a";
  var KEY_ROW_ITEM = "1d7987e5550ca8afc6eb14d9c2ce7c274f876925";

  // src/app/config.ts
  var CONFIG = __spreadValues(__spreadValues({}, LAYOUT_DEFAULTS), LAYER_NAMES);
  var A4_W = CONFIG.A4_W;
  var A4_H = CONFIG.A4_H;
  var PAD_X = CONFIG.PAD_X;
  var PAD_Y = CONFIG.PAD_Y;
  var COL_GAP = CONFIG.COL_GAP;
  var COL_W = CONFIG.COL_W;
  var ITEM_GAP = CONFIG.ITEM_GAP;
  var FOOTER_H = CONFIG.FOOTER_H;
  var PAGINATOR_X = CONFIG.PAGINATOR_X;
  var PAGINATOR_Y = CONFIG.PAGINATOR_Y;
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
    PAGINATOR_X = CONFIG.PAGINATOR_X;
    PAGINATOR_Y = CONFIG.PAGINATOR_Y;
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
    if (Number.isFinite(overrides.PAGINATOR_X)) CONFIG.PAGINATOR_X = overrides.PAGINATOR_X;
    if (Number.isFinite(overrides.PAGINATOR_Y)) CONFIG.PAGINATOR_Y = overrides.PAGINATOR_Y;
    if (typeof overrides.PAGINATOR_ENABLED === "boolean") CONFIG.PAGINATOR_ENABLED = overrides.PAGINATOR_ENABLED;
    if (typeof overrides.FOOTER_ENABLED === "boolean") CONFIG.FOOTER_ENABLED = overrides.FOOTER_ENABLED;
    if (Number.isFinite(overrides.MIN_REMAINING_FOR_SPLIT)) CONFIG.MIN_REMAINING_FOR_SPLIT = overrides.MIN_REMAINING_FOR_SPLIT;
    recalcLayout();
  }

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
    if (node.fontName === figma.mixed) {
      const fonts = node.getRangeAllFontNames(0, node.characters.length);
      const seen = /* @__PURE__ */ new Set();
      for (const font of fonts) {
        const key = `${font.family}__${font.style}`;
        if (seen.has(key)) continue;
        seen.add(key);
        await loadFontCached(font);
      }
      return;
    }
    await loadFontCached(node.fontName);
  }
  var loadedFonts = /* @__PURE__ */ new Set();
  async function loadFontCached(fontName) {
    const key = `${fontName.family}__${fontName.style}`;
    if (loadedFonts.has(key)) return;
    await figma.loadFontAsync(fontName);
    loadedFonts.add(key);
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
      figma.ui.postMessage({ type: "log", text: `Import by key error: ${err}` });
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
    if (itemSaleText) {
      await loadFontForNode(itemSaleText);
      itemSaleText.characters = "";
    }
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
        discountInfo.characters = "";
      }
    }
    const surprise = findTextInNode(card, CONFIG.SURPRISE);
    const surpriseWrapper = findNodeInCard(card, CONFIG.SURPRISE_WRAPPER);
    if (surprise) {
      await loadFontForNode(surprise);
      if (group.surpriseText) {
        surprise.characters = String(group.surpriseText);
        surprise.visible = true;
        if (surpriseWrapper) surpriseWrapper.visible = true;
      } else {
        surprise.visible = false;
        surprise.characters = "";
        if (surpriseWrapper) surpriseWrapper.visible = false;
      }
    } else if (surpriseWrapper && !group.surpriseText) {
      surpriseWrapper.visible = false;
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
          postLog(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0431\u0440\u0435\u043D\u0434 \u0434\u043B\u044F ${group.brandId}. Error: ${err}`);
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
        postLog(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440 \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u0430: ${err}`);
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
    const textListNode = listNode;
    if (textListNode && textListNode.type === "TEXT" && textListNode.parent && "children" in textListNode.parent) {
      const parent = textListNode.parent;
      const idx = parent.children.indexOf(textListNode);
      const frame = figma.createFrame();
      frame.name = CONFIG.LIST_CONTAINER;
      frame.x = textListNode.x;
      frame.y = textListNode.y;
      frame.resize(card.width, 1);
      frame.fills = [];
      parent.insertChild(Math.max(0, idx), frame);
      textListNode.remove();
      return frame;
    }
    if (listNode && "children" in listNode) {
      return listNode;
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
      postLog("ListContainer not found in ProductCard");
      return;
    }
    await appendRowsToCardList(list, card, rowMaster, group.items, group.discountText || null, 0);
  }
  async function buildSplitCards(cardMaster, rowMaster, group, maxColH, firstChunkMaxColH, metrics) {
    const splitMetrics = metrics || {
      minCardHeight: CONFIG.MIN_CARD_HEIGHT,
      baseRows: CONFIG.BASE_CARD_ROWS,
      rowGrowth: CONFIG.ESTIMATED_ROW_HEIGHT
    };
    const baseCard = cardMaster.createInstance().detachInstance();
    baseCard.name = group.mainSku ? `Card${String(group.mainSku)}` : "Unknown SKU";
    baseCard.resize(COL_W, baseCard.height);
    await fillCardStatic(baseCard, group);
    const baseList = getOrCreateListFrame(baseCard);
    if (!baseList) return [baseCard];
    prepareListFrame(baseList, baseCard);
    const firstCapacity = Math.max(1, getRowCapacityForHeight(firstChunkMaxColH != null ? firstChunkMaxColH : maxColH, splitMetrics));
    const defaultCapacity = Math.max(1, getRowCapacityForHeight(maxColH, splitMetrics));
    const keepHeaderForAll = group.items.length > splitMetrics.baseRows;
    const chunks = [];
    let cursor = 0;
    let capacity = firstCapacity;
    while (cursor < group.items.length) {
      const nextCursor = Math.min(group.items.length, cursor + capacity);
      const chunk = [];
      for (let i = cursor; i < nextCursor; i++) {
        chunk.push(i);
      }
      chunks.push(chunk);
      cursor = nextCursor;
      capacity = defaultCapacity;
    }
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
  function getRowCapacityForHeight(height, metrics) {
    if (!Number.isFinite(height) || height <= 0) return 1;
    if (height <= metrics.minCardHeight) return 1;
    const extraHeight = height - metrics.minCardHeight;
    const extraRows = Math.floor(extraHeight / Math.max(1, metrics.rowGrowth));
    return Math.max(1, metrics.baseRows + extraRows);
  }
  function postLog(text) {
    figma.ui.postMessage({ type: "log", text });
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
    if (col.primaryAxisAlignItems !== "SPACE_BETWEEN" && col.children.length > 0) h += (col.children.length - 1) * ITEM_GAP;
    return h;
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
    if (CONFIG.FOOTER_ENABLED === false) return;
    const footerComp = await getComponentByKey(KEY_FOOTER);
    if (!footerComp) return;
    const footerInstance = footerComp.createInstance();
    footerInstance.x = 0;
    footerInstance.y = Math.max(0, A4_H - FOOTER_H);
    page.appendChild(footerInstance);
  }
  async function addPaginatorToPage(page, title, pageNumber) {
    if (CONFIG.PAGINATOR_ENABLED === false) return;
    if (isFirstDocumentPage(page)) return;
    const paginatorComp = await getPaginatorComponent();
    if (!paginatorComp) {
      postLog2("Paginator component not found");
      return;
    }
    const paginator = paginatorComp.createInstance();
    paginator.x = 0;
    paginator.y = 0;
    resizePaginatorToPageWidth(paginator);
    await setPaginatorText(paginator, "pageTitle", title);
    await setPaginatorText(paginator, "pageCounter", `\u0441\u0442\u0440. ${pageNumber}`);
    page.appendChild(paginator);
  }
  function isFirstDocumentPage(page) {
    return Math.round(page.x) === 0 && Math.round(page.y) === 0;
  }
  function resizePaginatorToPageWidth(paginator) {
    try {
      paginator.resizeWithoutConstraints(A4_W, paginator.height);
    } catch (e) {
      try {
        paginator.resize(A4_W, paginator.height);
      } catch (err) {
        postLog2(`Paginator resize error: ${String(err)}`);
      }
    }
  }
  async function getPaginatorComponent() {
    const byKey = await getComponentByKey(KEY_PAGINATOR);
    if (byKey) return byKey;
    const localComponent = figma.root.findOne(
      (n) => n.type === "COMPONENT" && normalizeNameKey(n.name || "").includes("paginator")
    );
    if (localComponent) return localComponent;
    const localSet = figma.root.findOne(
      (n) => n.type === "COMPONENT_SET" && normalizeNameKey(n.name || "").includes("paginator")
    );
    if (localSet == null ? void 0 : localSet.defaultVariant) return localSet.defaultVariant;
    try {
      const importer = figma.importComponentSetByKeyAsync;
      if (typeof importer === "function") {
        const set = await importer(KEY_PAGINATOR);
        return (set == null ? void 0 : set.defaultVariant) || null;
      }
    } catch (err) {
      postLog2(`Import paginator set by key error: ${String(err)}`);
    }
    return null;
  }
  function postLog2(text) {
    figma.ui.postMessage({ type: "log", text });
  }
  async function setPaginatorText(node, layerName, value) {
    const target = normalizeNameKey(layerName);
    const text = node.findOne((n) => n.type === "TEXT" && normalizeNameKey(n.name || "") === target);
    if (!text) return;
    await loadFontForNode(text);
    text.characters = value;
  }
  function getPageColumns(page) {
    const cols = page.findAll(
      (n) => n.type === "FRAME" && (n.name === "Left Column" || n.name === "Right Column")
    );
    return cols.sort((a, b) => a.x - b.x);
  }
  function applyFooterHeightToColumns(page) {
    const footerTop = A4_H - FOOTER_H;
    const columns = getPageColumns(page);
    for (const col of columns) {
      const targetHeight = Math.max(0, footerTop - col.y);
      if (Math.round(col.height) !== Math.round(targetHeight)) {
        col.resize(col.width, targetHeight);
      }
    }
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
  function layoutCardsOnNewPages(cards, startPageNum) {
    let pageNum = startPageNum;
    let currentLayout = createPageWithColumns(pageNum, 0);
    let lastPage = currentLayout.page;
    let activeColIndex = 0;
    let activeColumn = currentLayout.columns[0];
    for (const cardNode of cards) {
      const cardFrame = cardNode;
      const currentContentH = calculateContentHeight(activeColumn);
      const gap = activeColumn.children.length > 0 && activeColumn.primaryAxisAlignItems !== "SPACE_BETWEEN" ? ITEM_GAP : 0;
      const newH = currentContentH + gap + cardFrame.height;
      const colMaxH = activeColumn.height;
      if (newH > colMaxH && activeColumn.children.length > 0) {
        if (activeColIndex === 0) {
          activeColIndex = 1;
          activeColumn = currentLayout.columns[1];
        } else {
          pageNum++;
          currentLayout = createPageWithColumns(pageNum, 0);
          lastPage = currentLayout.page;
          activeColIndex = 0;
          activeColumn = currentLayout.columns[0];
        }
      }
      activeColumn.appendChild(cardFrame);
    }
    return { lastPage, pageNum };
  }
  function relocateOverflowForFooter(lastPage, pageNum) {
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
          const gap = col.children.length > 0 && col.primaryAxisAlignItems !== "SPACE_BETWEEN" ? ITEM_GAP : 0;
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
      const result = layoutCardsOnNewPages(remaining, currentPageNum + 1);
      currentLast = result.lastPage;
      currentPageNum = result.pageNum;
    }
    applyFooterHeightToColumns(currentLast);
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
  function setupColumnStyle(col, shiftTopPx, primaryAxisAlignItems = "SPACE_BETWEEN") {
    const maxH = Math.max(0, MAX_COL_H - shiftTopPx);
    col.resize(COL_W, maxH);
    col.layoutMode = "VERTICAL";
    col.primaryAxisSizingMode = "FIXED";
    col.primaryAxisAlignItems = primaryAxisAlignItems;
    col.counterAxisSizingMode = "FIXED";
    col.itemSpacing = ITEM_GAP;
    col.fills = [];
  }

  // src/app/generation.ts
  var PROGRESS_BATCH = 10;
  async function createBrochure(groups, layout, opts) {
    const masters = await loadBrochureMasters();
    const splitMetrics = {
      minCardHeight: CONFIG.MIN_CARD_HEIGHT,
      baseRows: CONFIG.BASE_CARD_ROWS,
      rowGrowth: CONFIG.ESTIMATED_ROW_HEIGHT
    };
    const runs = buildBrochureRuns(groups, layout);
    const state = { pageNum: 0, lastPage: null, pagesByNumber: /* @__PURE__ */ new Map() };
    const totalGroups = runs.reduce((sum, run) => sum + run.groups.length, 0);
    const reports = [];
    let processedGroups = 0;
    for (let runIndex = 0; runIndex < runs.length; runIndex++) {
      const run = runs[runIndex];
      ensureNotCancelled(opts);
      if (run.groups.length === 0) continue;
      await activateRunFigmaPage(run);
      const report = await layoutBrochureRun(run, runIndex, layout, masters, splitMetrics, state, opts, (count) => {
        processedGroups += count;
        if (processedGroups % PROGRESS_BATCH === 0 || processedGroups === totalGroups) {
          figma.ui.postMessage({
            type: "progress",
            curr: processedGroups,
            total: totalGroups,
            text: `\u0412\u0435\u0440\u0441\u0442\u043A\u0430: ${processedGroups} / ${totalGroups}`
          });
          return yieldToUi();
        }
        return Promise.resolve();
      });
      reports.push(report);
    }
    if (layout == null ? void 0 : layout.infoMap) {
      await updateSaleBannerInfo(layout.infoMap);
    }
    figma.ui.postMessage({
      type: "complete",
      text: buildCompleteText(reports, state.pageNum),
      report: {
        pages: state.pageNum,
        leaflets: reports.length,
        runs: reports
      }
    });
  }
  async function activateRunFigmaPage(run) {
    const pageName = normalizePageTitle(run.title);
    const page = figma.createPage();
    page.name = pageName;
    await figma.setCurrentPageAsync(page);
  }
  async function loadBrochureMasters() {
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
    if (!rowMaster) throw new Error("\u041D\u0435\u0442 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430 RowItem");
    if (!cardMaster) throw new Error("\u041D\u0435\u0442 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430 ProductCard");
    return { cardMaster, rowMaster };
  }
  function buildBrochureRuns(groups, layout) {
    const hasLeaflets = groups.some((group) => !!normalizeLeafletName(group.leafletName));
    if (!hasLeaflets) {
      return [{ title: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433", groups, useCoverShift: true, addBanner: true }];
    }
    const runs = [
      { title: "\u041E\u0431\u0449\u0430\u044F \u043B\u0438\u0441\u0442\u043E\u0432\u043A\u0430", groups, useCoverShift: true, addBanner: true }
    ];
    const byLeaflet = /* @__PURE__ */ new Map();
    for (const group of groups) {
      const title = normalizeLeafletName(group.leafletName);
      if (!title) continue;
      const key = normalizeLeafletKey(title);
      const entry = byLeaflet.get(key) || { title, groups: [] };
      entry.groups.push(group);
      byLeaflet.set(key, entry);
    }
    for (const entry of byLeaflet.values()) {
      runs.push({ title: entry.title, groups: entry.groups, useCoverShift: true, addBanner: true });
    }
    return runs;
  }
  async function layoutBrochureRun(run, runIndex, layout, masters, splitMetrics, state, opts, onProgress) {
    const startPageNum = state.pageNum + 1;
    const giftBlockEnabled = (layout == null ? void 0 : layout.giftBlockEnabled) !== false;
    const orderList = Array.isArray(layout == null ? void 0 : layout.orderList) ? layout.orderList : [];
    const startOnSecondPage = run.useCoverShift && giftBlockEnabled;
    const firstPageShift = run.useCoverShift ? resolveShiftPx(giftBlockEnabled ? 0 : CONFIG.FIRST_PAGE_SHIFT_DEFAULT) : 0;
    if (startOnSecondPage) {
      state.pageNum++;
      const blank = createBlankPage(state.pageNum);
      registerPage(state, state.pageNum, blank);
      nameRunPage(blank, run.title, 1);
      positionPageInRun(blank, runIndex, 1);
      if (run.addBanner) {
        await addBannerToPage(blank);
      }
      await addPaginatorToPage(blank, run.title, 1);
    }
    let localPageNum = startOnSecondPage ? 2 : 1;
    state.pageNum++;
    let currentLayout = createPageWithColumns(state.pageNum, run.useCoverShift ? firstPageShift : 0);
    registerPage(state, state.pageNum, currentLayout.page);
    nameRunPage(currentLayout.page, run.title, localPageNum);
    positionPageInRun(currentLayout.page, runIndex, localPageNum);
    state.lastPage = currentLayout.page;
    if (run.addBanner && !startOnSecondPage) {
      await addBannerToPage(currentLayout.page);
    }
    await addPaginatorToPage(currentLayout.page, run.title, localPageNum);
    let activeColIndex = 0;
    let activeColumn = currentLayout.columns[0];
    const orderedGroups = orderGroupsBySku(run.groups, orderList);
    for (const group of orderedGroups) {
      ensureNotCancelled(opts);
      const colMaxH = currentLayout.columns[0].height;
      let cardsToPlace = [];
      const cardFrame = await createProductCard(masters.cardMaster, group, masters.rowMaster);
      if (cardFrame.height > colMaxH) {
        let doSplit = !!(opts == null ? void 0 : opts.autoSplit);
        if (!doSplit && (opts == null ? void 0 : opts.askSplit)) {
          doSplit = await opts.askSplit(cardFrame.name, cardFrame.height, colMaxH);
        }
        if (doSplit) {
          cardsToPlace = await buildSplitCards(masters.cardMaster, masters.rowMaster, group, colMaxH, colMaxH, splitMetrics);
          cardFrame.remove();
        } else {
          cardsToPlace = [cardFrame];
        }
      } else {
        cardsToPlace = [cardFrame];
      }
      for (let i = 0; i < cardsToPlace.length; i++) {
        ensureNotCancelled(opts);
        const card = cardsToPlace[i];
        if (i > 0 && card.name && !/-p\d+$/i.test(card.name)) card.name = `${card.name}-p${i + 1}`;
        if (!canFitInColumn(activeColumn, card.height) && activeColumn.children.length > 0) {
          if (activeColIndex === 0) {
            activeColIndex = 1;
            activeColumn = currentLayout.columns[1];
          } else {
            currentLayout = await createNextPage(state, run.title, ++localPageNum, runIndex);
            activeColIndex = 0;
            activeColumn = currentLayout.columns[0];
          }
        }
        activeColumn.appendChild(card);
      }
      await onProgress(1);
    }
    await finalizeRunFooter(state, run.title, runIndex, localPageNum);
    return {
      title: normalizePageTitle(run.title),
      pages: state.pageNum - startPageNum + 1,
      products: run.groups.length
    };
  }
  async function finalizeRunFooter(state, title, runIndex, localPageNum) {
    if (!state.lastPage) return;
    if (CONFIG.FOOTER_ENABLED === false) return;
    const beforeFooterPageNum = state.pageNum;
    const footerResult = relocateOverflowForFooter(state.lastPage, state.pageNum);
    state.lastPage = footerResult.lastPage;
    state.pageNum = footerResult.pageNum;
    await addPaginatorsToRelocatedPages(
      state,
      beforeFooterPageNum + 1,
      state.pageNum,
      title,
      localPageNum + 1,
      runIndex
    );
    await addFooterToPage(state.lastPage);
  }
  async function addPaginatorsToRelocatedPages(state, fromPageNum, toPageNum, title, startLocalPageNum, runIndex) {
    let localPageNum = startLocalPageNum;
    for (let pageNum = fromPageNum; pageNum <= toPageNum; pageNum++) {
      const page = state.pagesByNumber.get(pageNum) || findGeneratedPageByNumber(pageNum);
      if (!page) continue;
      registerPage(state, pageNum, page);
      nameRunPage(page, title, localPageNum);
      positionPageInRun(page, runIndex, localPageNum);
      await addPaginatorToPage(page, title, localPageNum++);
    }
  }
  async function createNextPage(state, title, localPageNum, runIndex) {
    state.pageNum++;
    const nextLayout = createPageWithColumns(state.pageNum, 0);
    registerPage(state, state.pageNum, nextLayout.page);
    nameRunPage(nextLayout.page, title, localPageNum);
    positionPageInRun(nextLayout.page, runIndex, localPageNum);
    state.lastPage = nextLayout.page;
    await addPaginatorToPage(nextLayout.page, title, localPageNum);
    return nextLayout;
  }
  function findGeneratedPageByNumber(pageNum) {
    return figma.root.findOne(
      (n) => n.type === "FRAME" && getPageNumberFromName(n.name || "") === pageNum
    );
  }
  function registerPage(state, pageNum, page) {
    state.pagesByNumber.set(pageNum, page);
  }
  function getPageNumberFromName(name) {
    const match = /(\d+)$/.exec(name);
    if (!match) return null;
    const value = Number(match[1]);
    return Number.isFinite(value) ? value : null;
  }
  function positionPageInRun(page, runIndex, localPageNum) {
    page.x = (localPageNum - 1) * (A4_W + 50);
    page.y = 0;
  }
  function nameRunPage(page, title, localPageNum) {
    page.name = `${normalizePageTitle(title)} - \u0441\u0442\u0440 ${localPageNum}`;
  }
  function normalizePageTitle(title) {
    const normalized = normalizeLeafletName(title);
    if (!normalized) return "\u041B\u0438\u0441\u0442\u043E\u0432\u043A\u0430";
    if (normalized.toLowerCase() === "\u043E\u0431\u0449\u0430\u044F \u043B\u0438\u0441\u0442\u043E\u0432\u043A\u0430") return "\u041E\u0431\u0449\u0430\u044F";
    return normalized;
  }
  async function createProductCard(cardMaster, group, rowMaster) {
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
    cardFrame.name = group.mainSku ? `Card${String(group.mainSku)}` : "Unknown SKU";
    cardFrame.resize(COL_W, cardFrame.height);
    await fillCardData(cardFrame, group, rowMaster);
    return cardFrame;
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
    const items = group.items || [];
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
  function getRemainingHeight(column) {
    const currentContentH = calculateContentHeight(column);
    const gap = column.children.length > 0 && column.primaryAxisAlignItems !== "SPACE_BETWEEN" ? CONFIG.ITEM_GAP : 0;
    return column.height - currentContentH - gap;
  }
  function canFitInColumn(column, cardHeight) {
    const remainingH = getRemainingHeight(column);
    if (cardHeight > column.height && remainingH < MIN_REMAINING_FOR_SPLIT) {
      return false;
    }
    return remainingH >= cardHeight;
  }
  function normalizeLeafletName(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }
  function normalizeLeafletKey(value) {
    return normalizeLeafletName(value).toLowerCase();
  }
  function ensureNotCancelled(opts) {
    var _a;
    if ((_a = opts == null ? void 0 : opts.shouldCancel) == null ? void 0 : _a.call(opts)) {
      figma.ui.postMessage({ type: "complete", text: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C" });
      throw new Error("\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C");
    }
  }
  function buildCompleteText(reports, totalPages) {
    const totalProducts = reports.reduce((sum, report) => sum + report.products, 0);
    const lines = [
      `\u0413\u043E\u0442\u043E\u0432\u043E: \u0441\u0442\u0440\u0430\u043D\u0438\u0446 ${totalPages}, \u043B\u0438\u0441\u0442\u043E\u0432\u043E\u043A ${reports.length}, \u0442\u043E\u0432\u0430\u0440\u043E\u0432 ${totalProducts}`
    ];
    for (const report of reports) {
      lines.push(`${report.title}: \u0441\u0442\u0440. ${report.pages}, \u0442\u043E\u0432\u0430\u0440\u043E\u0432 ${report.products}`);
    }
    return lines.join("\n");
  }
  async function addBannerToPage(page) {
    const bannerComp = await getComponentByKey(KEY_BANNER);
    if (!bannerComp) return;
    const bannerInstance = bannerComp.createInstance();
    bannerInstance.x = 0;
    bannerInstance.y = 0;
    page.appendChild(bannerInstance);
  }
  function yieldToUi() {
    return new Promise((resolve) => setTimeout(resolve, 0));
  }

  // src/app/update.ts
  async function updateInfoOnPage(payload, shouldCancel) {
    const infoMap = (payload == null ? void 0 : payload.infoMap) || {};
    const updatePrice = (payload == null ? void 0 : payload.updatePrice) !== void 0 ? !!payload.updatePrice : Object.values(infoMap).some((v) => (v == null ? void 0 : v.price) && String(v.price).trim() !== "");
    const codes = Object.keys(infoMap);
    postLog3(`[update-info] payload keys: ${Object.keys(payload || {}).join(", ")}`);
    postLog3(`[update-info] updatePrice: ${updatePrice}`);
    postLog3(`[update-info] codes count: ${codes.length}`);
    postLog3(`[update-info] sample codes: ${codes.slice(0, 10).join(", ")}`);
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
    const cardsByBaseSku = /* @__PURE__ */ new Map();
    for (const c of cards) {
      const baseSku = getBaseSkuFromCardName(c.name);
      if (!baseSku) continue;
      const skuCards = cardsByBaseSku.get(baseSku) || [];
      skuCards.push(c);
      cardsByBaseSku.set(baseSku, skuCards);
    }
    for (const code of codes) {
      if (shouldCancel == null ? void 0 : shouldCancel()) {
        figma.ui.postMessage({ type: "complete", text: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C" });
        throw new Error("\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C");
      }
      const targetCards = cardsByBaseSku.get(String(code).trim()) || [];
      if (targetCards.length === 0) {
        postLog3(`[update-info] card not found for code: ${code}`);
        continue;
      }
      foundCards += targetCards.length;
      for (const targetCard of targetCards) {
        const entry = infoMap[code] || {};
        const newDiscount = entry.discount;
        const discountLayer = findTextInNode(targetCard, CONFIG.DISCOUNT);
        const saleStarNode = findNodeInCard(targetCard, CONFIG.SALE_STAR);
        const discountInfoLayer = findTextInNode(targetCard, CONFIG.DISCOUNT_INFO);
        const surpriseLayer = findTextInNode(targetCard, CONFIG.SURPRISE);
        const surpriseWrapper = findNodeInCard(targetCard, CONFIG.SURPRISE_WRAPPER);
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
          postLog3(`[update-info] discount layer not found in card: ${targetCard.name}`);
        }
        if (discountInfoLayer) {
          await loadFontForNode(discountInfoLayer);
          const cond = entry.surpriseText ? "" : entry.conditions;
          if (cond && String(cond).trim() !== "") {
            discountInfoLayer.characters = String(cond);
            discountInfoLayer.visible = true;
          } else {
            discountInfoLayer.visible = false;
          }
        }
        if (surpriseLayer) {
          await loadFontForNode(surpriseLayer);
          if (entry.surpriseText && String(entry.surpriseText).trim() !== "") {
            surpriseLayer.characters = String(entry.surpriseText);
            surpriseLayer.visible = true;
            if (surpriseWrapper) surpriseWrapper.visible = true;
          } else {
            surpriseLayer.characters = "";
            surpriseLayer.visible = false;
            if (surpriseWrapper) surpriseWrapper.visible = false;
          }
        } else if (surpriseWrapper && !entry.surpriseText) {
          surpriseWrapper.visible = false;
        }
      }
    }
    if (updatePrice) {
      postLog3(`[update-info] cards for price scan: ${cards.length}`);
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
          if (!("findOne" in row)) continue;
          const rowNode = row;
          const priceNode = rowNode.findOne((n) => n.name === CONFIG.ROW_PRICE && n.type === "TEXT");
          if (!priceNode) continue;
          let sku = "";
          if (row.name) {
            sku = String(row.name).trim();
          } else {
            const skuNode = rowNode.findOne((n) => n.name === CONFIG.ROW_SKU && n.type === "TEXT");
            if (skuNode == null ? void 0 : skuNode.characters) {
              sku = skuNode.characters.trim();
            } else {
              const anyText = rowNode.findOne((n) => n.type === "TEXT");
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
    await updateRowItemDiscounts(infoMap, cards);
    postLog3(`[update-info] foundCards: ${foundCards}, updatedDiscounts: ${updatedDiscounts}, updatedPrices: ${updatedPrices}`);
    await updateSaleBannerInfo(infoMap);
    if (foundCards === 0 && updatedPrices === 0) {
      figma.ui.postMessage({ type: "complete", text: "Cards not found." });
      return;
    }
    const pricePart = updatePrice ? `, prices: ${updatedPrices}` : "";
    figma.notify(`Updated discounts: ${updatedDiscounts}${pricePart}`);
    figma.ui.postMessage({ type: "complete", text: `Done! Discounts: ${updatedDiscounts}${pricePart}` });
  }
  async function updateRowItemDiscounts(infoMap, cards) {
    var _a;
    for (const card of cards) {
      const list = card.findOne((n) => n.name === CONFIG.LIST_CONTAINER && n.type === "FRAME");
      if (!list) continue;
      const baseSku = getBaseSkuFromCardName(card.name);
      const baseDiscountRaw = baseSku ? (_a = infoMap == null ? void 0 : infoMap[baseSku]) == null ? void 0 : _a.discount : null;
      const baseDiscount = discountComparable(baseDiscountRaw);
      for (const row of list.children) {
        if (!("findOne" in row)) continue;
        const rowNode = row;
        let sku = "";
        if (row.name) {
          sku = String(row.name).trim();
        } else {
          const skuNode = rowNode.findOne((n) => n.name === CONFIG.ROW_SKU && n.type === "TEXT");
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
          await loadFontForNode(itemSaleText);
          itemSaleText.characters = normalizeDiscountText(String(rowDiscountRaw));
        } else if (itemSaleText) {
          await loadFontForNode(itemSaleText);
          itemSaleText.characters = "";
        }
      }
    }
  }
  function getBaseSkuFromCardName(name) {
    if (!name || !name.startsWith("Card")) return "";
    return name.slice(4).replace(/-p\d+$/i, "").trim();
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
  function postLog3(text) {
    figma.ui.postMessage({ type: "log", text });
  }

  // src/app/main.ts
  figma.showUI(__html__, { width: 430, height: 650 });
  var GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz1xx79FIY_AbpUWNM88s4Ma6clo4JLXhcKX2agHm2zvyLCdQgpZDVJ0h6CS0cy6UGN/exec";
  var GOOGLE_PROXY_BASE = "https://figma-proxy-1.onrender.com/proxy?url=";
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
        for (const resolver of pendingSplits.values()) {
          resolver(false);
        }
        pendingSplits.clear();
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
      if (msg.type === "check-components") {
        await figma.loadAllPagesAsync();
        figma.ui.postMessage({ type: "components-check-result", results: await checkComponents() });
        return;
      }
      if (msg.type === "google-sheets") {
        const response = await fetchGoogle(`${GOOGLE_SCRIPT_URL}?action=sheets`);
        if (!response.ok) throw new Error(`Google Sheets HTTP ${response.status}`);
        const sheets = await response.json();
        figma.ui.postMessage({ type: "google-sheets-result", sheets });
        return;
      }
      if (msg.type === "google-csv") {
        const gid = String(msg.gid || "");
        if (!gid) throw new Error("\u041D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D \u043B\u0438\u0441\u0442 Google");
        const response = await fetchGoogle(`${GOOGLE_SCRIPT_URL}?action=csv&gid=${encodeURIComponent(gid)}`);
        if (!response.ok) throw new Error(`Google CSV HTTP ${response.status}`);
        const csv = await response.text();
        figma.ui.postMessage({ type: "google-csv-result", csv, gid, sheetName: msg.sheetName || "" });
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
        return;
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
  async function fetchGoogle(url) {
    return fetch(GOOGLE_PROXY_BASE + encodeURIComponent(url));
  }
  async function checkComponents() {
    const entries = [
      ["Banner", KEY_BANNER],
      ["ProductCard", KEY_PRODUCT_CARD],
      ["RowItem", KEY_ROW_ITEM],
      ["Footer", KEY_FOOTER],
      ["Paginator", KEY_PAGINATOR]
    ];
    const results = [];
    for (const [name, key] of entries) {
      const component = await getComponentByKey(key);
      results.push({ name, ok: !!component });
    }
    return results;
  }
  async function loadFonts() {
    await loadFontCached({ family: "Inter", style: "Regular" });
    await loadFontCached({ family: "Inter", style: "Bold" });
  }
})();
