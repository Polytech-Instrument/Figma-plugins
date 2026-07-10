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
    PAD_Y: 38,
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
    FOOTER_H: 110,
    BOX_HEADER_NOTICE_H: 53,
    BOX_HEADER_NOTICE_W: 555,
    BOX_HEADER_NOTICE_GAP_TOP: 15,
    BOX_HEADER_NOTICE_GAP_BOTTOM: 15,
    BOX_FOOTER_NOTICE_H: 86,
    BOX_FOOTER_NOTICE_W: 555,
    AD_PLACEHOLDER_MIN_H: 180
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
    BOX_PRICE: "#PriceBox",
    BOX_QTY: "#QtyBox",
    BOX_NOTICE: "#BoxNotice",
    VIDEO_QR_WRAPPER: "#VideoQrWrapper",
    VIDEO_LINK: "#VideoLink",
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
  var KEY_PRODUCT_BOX_CARD = "7650186a320c08a3236af980aeed58bd36be4fe5";
  var KEY_ROW_ITEM_BOX = "22fca46043585a69aa06888c831bbe51c1efbbba";
  var KEY_BOX_NOTICE_TOP = "bc70f4173388d5769cadaf7bdb85244f2cc69d9c";
  var KEY_BOX_NOTICE_BOTTOM = "0060115006cde5c0e20eb03143652103de29f396";
  var KEY_GIFT_BLOCK_COMMON = "78076e23b1767279f9f8f4adac5273626e0bb902";
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
    if (Number.isFinite(overrides.BOX_HEADER_NOTICE_H)) CONFIG.BOX_HEADER_NOTICE_H = overrides.BOX_HEADER_NOTICE_H;
    if (Number.isFinite(overrides.BOX_HEADER_NOTICE_W)) CONFIG.BOX_HEADER_NOTICE_W = overrides.BOX_HEADER_NOTICE_W;
    if (Number.isFinite(overrides.BOX_HEADER_NOTICE_GAP_TOP)) CONFIG.BOX_HEADER_NOTICE_GAP_TOP = overrides.BOX_HEADER_NOTICE_GAP_TOP;
    if (Number.isFinite(overrides.BOX_HEADER_NOTICE_GAP_BOTTOM)) CONFIG.BOX_HEADER_NOTICE_GAP_BOTTOM = overrides.BOX_HEADER_NOTICE_GAP_BOTTOM;
    if (Number.isFinite(overrides.BOX_FOOTER_NOTICE_H)) CONFIG.BOX_FOOTER_NOTICE_H = overrides.BOX_FOOTER_NOTICE_H;
    if (Number.isFinite(overrides.BOX_FOOTER_NOTICE_W)) CONFIG.BOX_FOOTER_NOTICE_W = overrides.BOX_FOOTER_NOTICE_W;
    if (Number.isFinite(overrides.AD_PLACEHOLDER_MIN_H)) CONFIG.AD_PLACEHOLDER_MIN_H = overrides.AD_PLACEHOLDER_MIN_H;
    if (Number.isFinite(overrides.PAGINATOR_X)) CONFIG.PAGINATOR_X = overrides.PAGINATOR_X;
    if (Number.isFinite(overrides.PAGINATOR_Y)) CONFIG.PAGINATOR_Y = overrides.PAGINATOR_Y;
    if (typeof overrides.PAGINATOR_ENABLED === "boolean") CONFIG.PAGINATOR_ENABLED = overrides.PAGINATOR_ENABLED;
    if (typeof overrides.FOOTER_ENABLED === "boolean") CONFIG.FOOTER_ENABLED = overrides.FOOTER_ENABLED;
    if (Number.isFinite(overrides.MIN_REMAINING_FOR_SPLIT)) CONFIG.MIN_REMAINING_FOR_SPLIT = overrides.MIN_REMAINING_FOR_SPLIT;
    recalcLayout();
  }

  // src/app/utils.ts
  function normalizeNameKey(name) {
    return name.replace(/[\s#!]/g, "").toLowerCase();
  }
  var nodeIndexCache = /* @__PURE__ */ new WeakMap();
  function getNodeIndex(root) {
    const cached = nodeIndexCache.get(root);
    if (cached) return cached;
    const index = /* @__PURE__ */ new Map();
    const nodes = root.findAll ? root.findAll(() => true) : [];
    for (const node of nodes) {
      const key = normalizeNameKey(node.name || "");
      if (!key) continue;
      const bucket = index.get(key) || [];
      bucket.push(node);
      index.set(key, bucket);
    }
    nodeIndexCache.set(root, index);
    return index;
  }
  function findTextInRow(row, name) {
    const target = normalizeNameKey(name);
    const node = (getNodeIndex(row).get(target) || []).find((n) => n.type === "TEXT");
    return node || null;
  }
  function findTextInNode(node, name) {
    const target = normalizeNameKey(name);
    const found = (getNodeIndex(node).get(target) || []).find((n) => n.type === "TEXT");
    return found || null;
  }
  function findNodeInCard(card, name) {
    const target = normalizeNameKey(name);
    const found = (getNodeIndex(card).get(target) || [])[0];
    return found || null;
  }
  function findNodeInRowByName(row, name) {
    const target = normalizeNameKey(name);
    const node = (getNodeIndex(row).get(target) || [])[0];
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
    try {
      await figma.loadFontAsync(fontName);
      loadedFonts.add(key);
    } catch (err) {
      figma.ui.postMessage({ type: "log", text: `Font load error: ${key}` });
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
      figma.ui.postMessage({ type: "log", text: `Import by key error: ${err}` });
      return null;
    }
  }

  // src/app/normalizers.ts
  function normalizePriceText(raw) {
    let text = (raw || "").trim();
    if (!text) return text;
    text = text.replace(/\s*за\s+руб\.?/gi, "").replace(/\s*руб\.?/gi, "").replace(/₽/g, "").replace(/\u00A0/g, " ").trim();
    const numeric = parsePriceNumber(text);
    if (numeric === null) return text;
    return numeric.toLocaleString("ru-RU", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace(/\u00A0/g, " ");
  }
  function normalizeDiscountText(raw) {
    let text = (raw || "").trim();
    if (!text) return text;
    text = text.replace(/%/g, "").trim();
    return text;
  }
  function normalizeMultiplicityText(raw) {
    const text = String(raw || "").replace(/\u00A0/g, " ").trim();
    if (!text) return "";
    const match = text.match(/\d+(?:[,.]\d+)?/);
    return match ? match[0].replace(",", ".") : text;
  }
  function calculateBoxDiscountPercent(priceRaw, boxPriceRaw) {
    const price = parsePriceNumber(String(priceRaw || ""));
    const boxPrice = parsePriceNumber(String(boxPriceRaw || ""));
    if (price === null || boxPrice === null || price <= 0 || boxPrice <= 0) return null;
    const percent = Math.round((price - boxPrice) / price * 100);
    return percent > 0 ? percent : null;
  }
  function parsePriceNumber(text) {
    const compact = String(text || "").replace(/\s/g, "").replace(/[^\d,.\-]/g, "");
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

  // node_modules/qrcode-generator/dist/qrcode.mjs
  var qrcode = function(typeNumber, errorCorrectionLevel) {
    const PAD0 = 236;
    const PAD1 = 17;
    let _typeNumber = typeNumber;
    const _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
    let _modules = null;
    let _moduleCount = 0;
    let _dataCache = null;
    const _dataList = [];
    const _this = {};
    const makeImpl = function(test, maskPattern) {
      _moduleCount = _typeNumber * 4 + 17;
      _modules = (function(moduleCount) {
        const modules = new Array(moduleCount);
        for (let row = 0; row < moduleCount; row += 1) {
          modules[row] = new Array(moduleCount);
          for (let col = 0; col < moduleCount; col += 1) {
            modules[row][col] = null;
          }
        }
        return modules;
      })(_moduleCount);
      setupPositionProbePattern(0, 0);
      setupPositionProbePattern(_moduleCount - 7, 0);
      setupPositionProbePattern(0, _moduleCount - 7);
      setupPositionAdjustPattern();
      setupTimingPattern();
      setupTypeInfo(test, maskPattern);
      if (_typeNumber >= 7) {
        setupTypeNumber(test);
      }
      if (_dataCache == null) {
        _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
      }
      mapData(_dataCache, maskPattern);
    };
    const setupPositionProbePattern = function(row, col) {
      for (let r = -1; r <= 7; r += 1) {
        if (row + r <= -1 || _moduleCount <= row + r) continue;
        for (let c = -1; c <= 7; c += 1) {
          if (col + c <= -1 || _moduleCount <= col + c) continue;
          if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
            _modules[row + r][col + c] = true;
          } else {
            _modules[row + r][col + c] = false;
          }
        }
      }
    };
    const getBestMaskPattern = function() {
      let minLostPoint = 0;
      let pattern = 0;
      for (let i = 0; i < 8; i += 1) {
        makeImpl(true, i);
        const lostPoint = QRUtil.getLostPoint(_this);
        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
        }
      }
      return pattern;
    };
    const setupTimingPattern = function() {
      for (let r = 8; r < _moduleCount - 8; r += 1) {
        if (_modules[r][6] != null) {
          continue;
        }
        _modules[r][6] = r % 2 == 0;
      }
      for (let c = 8; c < _moduleCount - 8; c += 1) {
        if (_modules[6][c] != null) {
          continue;
        }
        _modules[6][c] = c % 2 == 0;
      }
    };
    const setupPositionAdjustPattern = function() {
      const pos = QRUtil.getPatternPosition(_typeNumber);
      for (let i = 0; i < pos.length; i += 1) {
        for (let j = 0; j < pos.length; j += 1) {
          const row = pos[i];
          const col = pos[j];
          if (_modules[row][col] != null) {
            continue;
          }
          for (let r = -2; r <= 2; r += 1) {
            for (let c = -2; c <= 2; c += 1) {
              if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                _modules[row + r][col + c] = true;
              } else {
                _modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    };
    const setupTypeNumber = function(test) {
      const bits = QRUtil.getBCHTypeNumber(_typeNumber);
      for (let i = 0; i < 18; i += 1) {
        const mod = !test && (bits >> i & 1) == 1;
        _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
      }
      for (let i = 0; i < 18; i += 1) {
        const mod = !test && (bits >> i & 1) == 1;
        _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    };
    const setupTypeInfo = function(test, maskPattern) {
      const data = _errorCorrectionLevel << 3 | maskPattern;
      const bits = QRUtil.getBCHTypeInfo(data);
      for (let i = 0; i < 15; i += 1) {
        const mod = !test && (bits >> i & 1) == 1;
        if (i < 6) {
          _modules[i][8] = mod;
        } else if (i < 8) {
          _modules[i + 1][8] = mod;
        } else {
          _modules[_moduleCount - 15 + i][8] = mod;
        }
      }
      for (let i = 0; i < 15; i += 1) {
        const mod = !test && (bits >> i & 1) == 1;
        if (i < 8) {
          _modules[8][_moduleCount - i - 1] = mod;
        } else if (i < 9) {
          _modules[8][15 - i - 1 + 1] = mod;
        } else {
          _modules[8][15 - i - 1] = mod;
        }
      }
      _modules[_moduleCount - 8][8] = !test;
    };
    const mapData = function(data, maskPattern) {
      let inc = -1;
      let row = _moduleCount - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      const maskFunc = QRUtil.getMaskFunction(maskPattern);
      for (let col = _moduleCount - 1; col > 0; col -= 2) {
        if (col == 6) col -= 1;
        while (true) {
          for (let c = 0; c < 2; c += 1) {
            if (_modules[row][col - c] == null) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }
              const mask = maskFunc(row, col - c);
              if (mask) {
                dark = !dark;
              }
              _modules[row][col - c] = dark;
              bitIndex -= 1;
              if (bitIndex == -1) {
                byteIndex += 1;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || _moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    };
    const createBytes = function(buffer, rsBlocks) {
      let offset = 0;
      let maxDcCount = 0;
      let maxEcCount = 0;
      const dcdata = new Array(rsBlocks.length);
      const ecdata = new Array(rsBlocks.length);
      for (let r = 0; r < rsBlocks.length; r += 1) {
        const dcCount = rsBlocks[r].dataCount;
        const ecCount = rsBlocks[r].totalCount - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = new Array(dcCount);
        for (let i = 0; i < dcdata[r].length; i += 1) {
          dcdata[r][i] = 255 & buffer.getBuffer()[i + offset];
        }
        offset += dcCount;
        const rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        const rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
        const modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (let i = 0; i < ecdata[r].length; i += 1) {
          const modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
        }
      }
      let totalCodeCount = 0;
      for (let i = 0; i < rsBlocks.length; i += 1) {
        totalCodeCount += rsBlocks[i].totalCount;
      }
      const data = new Array(totalCodeCount);
      let index = 0;
      for (let i = 0; i < maxDcCount; i += 1) {
        for (let r = 0; r < rsBlocks.length; r += 1) {
          if (i < dcdata[r].length) {
            data[index] = dcdata[r][i];
            index += 1;
          }
        }
      }
      for (let i = 0; i < maxEcCount; i += 1) {
        for (let r = 0; r < rsBlocks.length; r += 1) {
          if (i < ecdata[r].length) {
            data[index] = ecdata[r][i];
            index += 1;
          }
        }
      }
      return data;
    };
    const createData = function(typeNumber2, errorCorrectionLevel2, dataList) {
      const rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, errorCorrectionLevel2);
      const buffer = qrBitBuffer();
      for (let i = 0; i < dataList.length; i += 1) {
        const data = dataList[i];
        buffer.put(data.getMode(), 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
        data.write(buffer);
      }
      let totalDataCount = 0;
      for (let i = 0; i < rsBlocks.length; i += 1) {
        totalDataCount += rsBlocks[i].dataCount;
      }
      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw "code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")";
      }
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
      }
      while (true) {
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD0, 8);
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(PAD1, 8);
      }
      return createBytes(buffer, rsBlocks);
    };
    _this.addData = function(data, mode) {
      mode = mode || "Byte";
      let newData = null;
      switch (mode) {
        case "Numeric":
          newData = qrNumber(data);
          break;
        case "Alphanumeric":
          newData = qrAlphaNum(data);
          break;
        case "Byte":
          newData = qr8BitByte(data);
          break;
        case "Kanji":
          newData = qrKanji(data);
          break;
        default:
          throw "mode:" + mode;
      }
      _dataList.push(newData);
      _dataCache = null;
    };
    _this.isDark = function(row, col) {
      if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
        throw row + "," + col;
      }
      return _modules[row][col];
    };
    _this.getModuleCount = function() {
      return _moduleCount;
    };
    _this.make = function() {
      if (_typeNumber < 1) {
        let typeNumber2 = 1;
        for (; typeNumber2 < 40; typeNumber2++) {
          const rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, _errorCorrectionLevel);
          const buffer = qrBitBuffer();
          for (let i = 0; i < _dataList.length; i++) {
            const data = _dataList[i];
            buffer.put(data.getMode(), 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
            data.write(buffer);
          }
          let totalDataCount = 0;
          for (let i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
          }
          if (buffer.getLengthInBits() <= totalDataCount * 8) {
            break;
          }
        }
        _typeNumber = typeNumber2;
      }
      makeImpl(false, getBestMaskPattern());
    };
    _this.createTableTag = function(cellSize, margin) {
      cellSize = cellSize || 2;
      margin = typeof margin == "undefined" ? cellSize * 4 : margin;
      let qrHtml = "";
      qrHtml += '<table style="';
      qrHtml += " border-width: 0px; border-style: none;";
      qrHtml += " border-collapse: collapse;";
      qrHtml += " padding: 0px; margin: " + margin + "px;";
      qrHtml += '">';
      qrHtml += "<tbody>";
      for (let r = 0; r < _this.getModuleCount(); r += 1) {
        qrHtml += "<tr>";
        for (let c = 0; c < _this.getModuleCount(); c += 1) {
          qrHtml += '<td style="';
          qrHtml += " border-width: 0px; border-style: none;";
          qrHtml += " border-collapse: collapse;";
          qrHtml += " padding: 0px; margin: 0px;";
          qrHtml += " width: " + cellSize + "px;";
          qrHtml += " height: " + cellSize + "px;";
          qrHtml += " background-color: ";
          qrHtml += _this.isDark(r, c) ? "#000000" : "#ffffff";
          qrHtml += ";";
          qrHtml += '"/>';
        }
        qrHtml += "</tr>";
      }
      qrHtml += "</tbody>";
      qrHtml += "</table>";
      return qrHtml;
    };
    _this.createSvgTag = function(cellSize, margin, alt, title) {
      let opts = {};
      if (typeof arguments[0] == "object") {
        opts = arguments[0];
        cellSize = opts.cellSize;
        margin = opts.margin;
        alt = opts.alt;
        title = opts.title;
      }
      cellSize = cellSize || 2;
      margin = typeof margin == "undefined" ? cellSize * 4 : margin;
      alt = typeof alt === "string" ? { text: alt } : alt || {};
      alt.text = alt.text || null;
      alt.id = alt.text ? alt.id || "qrcode-description" : null;
      title = typeof title === "string" ? { text: title } : title || {};
      title.text = title.text || null;
      title.id = title.text ? title.id || "qrcode-title" : null;
      const size = _this.getModuleCount() * cellSize + margin * 2;
      let c, mc, r, mr, qrSvg = "", rect;
      rect = "l" + cellSize + ",0 0," + cellSize + " -" + cellSize + ",0 0,-" + cellSize + "z ";
      qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
      qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : "";
      qrSvg += ' viewBox="0 0 ' + size + " " + size + '" ';
      qrSvg += ' preserveAspectRatio="xMinYMin meet"';
      qrSvg += title.text || alt.text ? ' role="img" aria-labelledby="' + escapeXml([title.id, alt.id].join(" ").trim()) + '"' : "";
      qrSvg += ">";
      qrSvg += title.text ? '<title id="' + escapeXml(title.id) + '">' + escapeXml(title.text) + "</title>" : "";
      qrSvg += alt.text ? '<description id="' + escapeXml(alt.id) + '">' + escapeXml(alt.text) + "</description>" : "";
      qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
      qrSvg += '<path d="';
      for (r = 0; r < _this.getModuleCount(); r += 1) {
        mr = r * cellSize + margin;
        for (c = 0; c < _this.getModuleCount(); c += 1) {
          if (_this.isDark(r, c)) {
            mc = c * cellSize + margin;
            qrSvg += "M" + mc + "," + mr + rect;
          }
        }
      }
      qrSvg += '" stroke="transparent" fill="black"/>';
      qrSvg += "</svg>";
      return qrSvg;
    };
    _this.createDataURL = function(cellSize, margin) {
      cellSize = cellSize || 2;
      margin = typeof margin == "undefined" ? cellSize * 4 : margin;
      const size = _this.getModuleCount() * cellSize + margin * 2;
      const min = margin;
      const max = size - margin;
      return createDataURL(size, size, function(x, y) {
        if (min <= x && x < max && min <= y && y < max) {
          const c = Math.floor((x - min) / cellSize);
          const r = Math.floor((y - min) / cellSize);
          return _this.isDark(r, c) ? 0 : 1;
        } else {
          return 1;
        }
      });
    };
    _this.createImgTag = function(cellSize, margin, alt) {
      cellSize = cellSize || 2;
      margin = typeof margin == "undefined" ? cellSize * 4 : margin;
      const size = _this.getModuleCount() * cellSize + margin * 2;
      let img = "";
      img += "<img";
      img += ' src="';
      img += _this.createDataURL(cellSize, margin);
      img += '"';
      img += ' width="';
      img += size;
      img += '"';
      img += ' height="';
      img += size;
      img += '"';
      if (alt) {
        img += ' alt="';
        img += escapeXml(alt);
        img += '"';
      }
      img += "/>";
      return img;
    };
    const escapeXml = function(s) {
      let escaped = "";
      for (let i = 0; i < s.length; i += 1) {
        const c = s.charAt(i);
        switch (c) {
          case "<":
            escaped += "&lt;";
            break;
          case ">":
            escaped += "&gt;";
            break;
          case "&":
            escaped += "&amp;";
            break;
          case '"':
            escaped += "&quot;";
            break;
          default:
            escaped += c;
            break;
        }
      }
      return escaped;
    };
    const _createHalfASCII = function(margin) {
      const cellSize = 1;
      margin = typeof margin == "undefined" ? cellSize * 2 : margin;
      const size = _this.getModuleCount() * cellSize + margin * 2;
      const min = margin;
      const max = size - margin;
      let y, x, r1, r2, p;
      const blocks = {
        "\u2588\u2588": "\u2588",
        "\u2588 ": "\u2580",
        " \u2588": "\u2584",
        "  ": " "
      };
      const blocksLastLineNoMargin = {
        "\u2588\u2588": "\u2580",
        "\u2588 ": "\u2580",
        " \u2588": " ",
        "  ": " "
      };
      let ascii = "";
      for (y = 0; y < size; y += 2) {
        r1 = Math.floor((y - min) / cellSize);
        r2 = Math.floor((y + 1 - min) / cellSize);
        for (x = 0; x < size; x += 1) {
          p = "\u2588";
          if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
            p = " ";
          }
          if (min <= x && x < max && min <= y + 1 && y + 1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
            p += " ";
          } else {
            p += "\u2588";
          }
          ascii += margin < 1 && y + 1 >= max ? blocksLastLineNoMargin[p] : blocks[p];
        }
        ascii += "\n";
      }
      if (size % 2 && margin > 0) {
        return ascii.substring(0, ascii.length - size - 1) + Array(size + 1).join("\u2580");
      }
      return ascii.substring(0, ascii.length - 1);
    };
    _this.createASCII = function(cellSize, margin) {
      cellSize = cellSize || 1;
      if (cellSize < 2) {
        return _createHalfASCII(margin);
      }
      cellSize -= 1;
      margin = typeof margin == "undefined" ? cellSize * 2 : margin;
      const size = _this.getModuleCount() * cellSize + margin * 2;
      const min = margin;
      const max = size - margin;
      let y, x, r, p;
      const white = Array(cellSize + 1).join("\u2588\u2588");
      const black = Array(cellSize + 1).join("  ");
      let ascii = "";
      let line = "";
      for (y = 0; y < size; y += 1) {
        r = Math.floor((y - min) / cellSize);
        line = "";
        for (x = 0; x < size; x += 1) {
          p = 1;
          if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
            p = 0;
          }
          line += p ? white : black;
        }
        for (r = 0; r < cellSize; r += 1) {
          ascii += line + "\n";
        }
      }
      return ascii.substring(0, ascii.length - 1);
    };
    _this.renderTo2dContext = function(context, cellSize) {
      cellSize = cellSize || 2;
      const length = _this.getModuleCount();
      for (let row = 0; row < length; row++) {
        for (let col = 0; col < length; col++) {
          context.fillStyle = _this.isDark(row, col) ? "black" : "white";
          context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
      }
    };
    return _this;
  };
  qrcode.stringToBytes = function(s) {
    const bytes = [];
    for (let i = 0; i < s.length; i += 1) {
      const c = s.charCodeAt(i);
      bytes.push(c & 255);
    }
    return bytes;
  };
  qrcode.createStringToBytes = function(unicodeData, numChars) {
    const unicodeMap = (function() {
      const bin = base64DecodeInputStream(unicodeData);
      const read = function() {
        const b = bin.read();
        if (b == -1) throw "eof";
        return b;
      };
      let count = 0;
      const unicodeMap2 = {};
      while (true) {
        const b0 = bin.read();
        if (b0 == -1) break;
        const b1 = read();
        const b2 = read();
        const b3 = read();
        const k = String.fromCharCode(b0 << 8 | b1);
        const v = b2 << 8 | b3;
        unicodeMap2[k] = v;
        count += 1;
      }
      if (count != numChars) {
        throw count + " != " + numChars;
      }
      return unicodeMap2;
    })();
    const unknownChar = "?".charCodeAt(0);
    return function(s) {
      const bytes = [];
      for (let i = 0; i < s.length; i += 1) {
        const c = s.charCodeAt(i);
        if (c < 128) {
          bytes.push(c);
        } else {
          const b = unicodeMap[s.charAt(i)];
          if (typeof b == "number") {
            if ((b & 255) == b) {
              bytes.push(b);
            } else {
              bytes.push(b >>> 8);
              bytes.push(b & 255);
            }
          } else {
            bytes.push(unknownChar);
          }
        }
      }
      return bytes;
    };
  };
  var QRMode = {
    MODE_NUMBER: 1 << 0,
    MODE_ALPHA_NUM: 1 << 1,
    MODE_8BIT_BYTE: 1 << 2,
    MODE_KANJI: 1 << 3
  };
  var QRErrorCorrectionLevel = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2
  };
  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
  var QRUtil = (function() {
    const PATTERN_POSITION_TABLE = [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170]
    ];
    const G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
    const G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
    const G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
    const _this = {};
    const getBCHDigit = function(data) {
      let digit = 0;
      while (data != 0) {
        digit += 1;
        data >>>= 1;
      }
      return digit;
    };
    _this.getBCHTypeInfo = function(data) {
      let d = data << 10;
      while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
        d ^= G15 << getBCHDigit(d) - getBCHDigit(G15);
      }
      return (data << 10 | d) ^ G15_MASK;
    };
    _this.getBCHTypeNumber = function(data) {
      let d = data << 12;
      while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
        d ^= G18 << getBCHDigit(d) - getBCHDigit(G18);
      }
      return data << 12 | d;
    };
    _this.getPatternPosition = function(typeNumber) {
      return PATTERN_POSITION_TABLE[typeNumber - 1];
    };
    _this.getMaskFunction = function(maskPattern) {
      switch (maskPattern) {
        case QRMaskPattern.PATTERN000:
          return function(i, j) {
            return (i + j) % 2 == 0;
          };
        case QRMaskPattern.PATTERN001:
          return function(i, j) {
            return i % 2 == 0;
          };
        case QRMaskPattern.PATTERN010:
          return function(i, j) {
            return j % 3 == 0;
          };
        case QRMaskPattern.PATTERN011:
          return function(i, j) {
            return (i + j) % 3 == 0;
          };
        case QRMaskPattern.PATTERN100:
          return function(i, j) {
            return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
          };
        case QRMaskPattern.PATTERN101:
          return function(i, j) {
            return i * j % 2 + i * j % 3 == 0;
          };
        case QRMaskPattern.PATTERN110:
          return function(i, j) {
            return (i * j % 2 + i * j % 3) % 2 == 0;
          };
        case QRMaskPattern.PATTERN111:
          return function(i, j) {
            return (i * j % 3 + (i + j) % 2) % 2 == 0;
          };
        default:
          throw "bad maskPattern:" + maskPattern;
      }
    };
    _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
      let a = qrPolynomial([1], 0);
      for (let i = 0; i < errorCorrectLength; i += 1) {
        a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
      }
      return a;
    };
    _this.getLengthInBits = function(mode, type) {
      if (1 <= type && type < 10) {
        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 10;
          case QRMode.MODE_ALPHA_NUM:
            return 9;
          case QRMode.MODE_8BIT_BYTE:
            return 8;
          case QRMode.MODE_KANJI:
            return 8;
          default:
            throw "mode:" + mode;
        }
      } else if (type < 27) {
        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 12;
          case QRMode.MODE_ALPHA_NUM:
            return 11;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 10;
          default:
            throw "mode:" + mode;
        }
      } else if (type < 41) {
        switch (mode) {
          case QRMode.MODE_NUMBER:
            return 14;
          case QRMode.MODE_ALPHA_NUM:
            return 13;
          case QRMode.MODE_8BIT_BYTE:
            return 16;
          case QRMode.MODE_KANJI:
            return 12;
          default:
            throw "mode:" + mode;
        }
      } else {
        throw "type:" + type;
      }
    };
    _this.getLostPoint = function(qrcode2) {
      const moduleCount = qrcode2.getModuleCount();
      let lostPoint = 0;
      for (let row = 0; row < moduleCount; row += 1) {
        for (let col = 0; col < moduleCount; col += 1) {
          let sameCount = 0;
          const dark = qrcode2.isDark(row, col);
          for (let r = -1; r <= 1; r += 1) {
            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }
            for (let c = -1; c <= 1; c += 1) {
              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }
              if (r == 0 && c == 0) {
                continue;
              }
              if (dark == qrcode2.isDark(row + r, col + c)) {
                sameCount += 1;
              }
            }
          }
          if (sameCount > 5) {
            lostPoint += 3 + sameCount - 5;
          }
        }
      }
      ;
      for (let row = 0; row < moduleCount - 1; row += 1) {
        for (let col = 0; col < moduleCount - 1; col += 1) {
          let count = 0;
          if (qrcode2.isDark(row, col)) count += 1;
          if (qrcode2.isDark(row + 1, col)) count += 1;
          if (qrcode2.isDark(row, col + 1)) count += 1;
          if (qrcode2.isDark(row + 1, col + 1)) count += 1;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }
      for (let row = 0; row < moduleCount; row += 1) {
        for (let col = 0; col < moduleCount - 6; col += 1) {
          if (qrcode2.isDark(row, col) && !qrcode2.isDark(row, col + 1) && qrcode2.isDark(row, col + 2) && qrcode2.isDark(row, col + 3) && qrcode2.isDark(row, col + 4) && !qrcode2.isDark(row, col + 5) && qrcode2.isDark(row, col + 6)) {
            lostPoint += 40;
          }
        }
      }
      for (let col = 0; col < moduleCount; col += 1) {
        for (let row = 0; row < moduleCount - 6; row += 1) {
          if (qrcode2.isDark(row, col) && !qrcode2.isDark(row + 1, col) && qrcode2.isDark(row + 2, col) && qrcode2.isDark(row + 3, col) && qrcode2.isDark(row + 4, col) && !qrcode2.isDark(row + 5, col) && qrcode2.isDark(row + 6, col)) {
            lostPoint += 40;
          }
        }
      }
      let darkCount = 0;
      for (let col = 0; col < moduleCount; col += 1) {
        for (let row = 0; row < moduleCount; row += 1) {
          if (qrcode2.isDark(row, col)) {
            darkCount += 1;
          }
        }
      }
      const ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;
      return lostPoint;
    };
    return _this;
  })();
  var QRMath = (function() {
    const EXP_TABLE = new Array(256);
    const LOG_TABLE = new Array(256);
    for (let i = 0; i < 8; i += 1) {
      EXP_TABLE[i] = 1 << i;
    }
    for (let i = 8; i < 256; i += 1) {
      EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
    }
    for (let i = 0; i < 255; i += 1) {
      LOG_TABLE[EXP_TABLE[i]] = i;
    }
    const _this = {};
    _this.glog = function(n) {
      if (n < 1) {
        throw "glog(" + n + ")";
      }
      return LOG_TABLE[n];
    };
    _this.gexp = function(n) {
      while (n < 0) {
        n += 255;
      }
      while (n >= 256) {
        n -= 255;
      }
      return EXP_TABLE[n];
    };
    return _this;
  })();
  var qrPolynomial = function(num, shift) {
    if (typeof num.length == "undefined") {
      throw num.length + "/" + shift;
    }
    const _num = (function() {
      let offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset += 1;
      }
      const _num2 = new Array(num.length - offset + shift);
      for (let i = 0; i < num.length - offset; i += 1) {
        _num2[i] = num[i + offset];
      }
      return _num2;
    })();
    const _this = {};
    _this.getAt = function(index) {
      return _num[index];
    };
    _this.getLength = function() {
      return _num.length;
    };
    _this.multiply = function(e) {
      const num2 = new Array(_this.getLength() + e.getLength() - 1);
      for (let i = 0; i < _this.getLength(); i += 1) {
        for (let j = 0; j < e.getLength(); j += 1) {
          num2[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j)));
        }
      }
      return qrPolynomial(num2, 0);
    };
    _this.mod = function(e) {
      if (_this.getLength() - e.getLength() < 0) {
        return _this;
      }
      const ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0));
      const num2 = new Array(_this.getLength());
      for (let i = 0; i < _this.getLength(); i += 1) {
        num2[i] = _this.getAt(i);
      }
      for (let i = 0; i < e.getLength(); i += 1) {
        num2[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
      }
      return qrPolynomial(num2, 0).mod(e);
    };
    return _this;
  };
  var QRRSBlock = (function() {
    const RS_BLOCK_TABLE = [
      // L
      // M
      // Q
      // H
      // 1
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],
      // 2
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],
      // 3
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],
      // 4
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],
      // 5
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],
      // 6
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],
      // 7
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],
      // 8
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],
      // 9
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],
      // 10
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],
      // 11
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],
      // 12
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],
      // 13
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],
      // 14
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],
      // 15
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12, 7, 37, 13],
      // 16
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],
      // 17
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],
      // 18
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],
      // 19
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],
      // 20
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],
      // 21
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],
      // 22
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],
      // 23
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],
      // 24
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],
      // 25
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],
      // 26
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],
      // 27
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],
      // 28
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],
      // 29
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],
      // 30
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],
      // 31
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],
      // 32
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],
      // 33
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],
      // 34
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],
      // 35
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],
      // 36
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],
      // 37
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],
      // 38
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],
      // 39
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],
      // 40
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];
    const qrRSBlock = function(totalCount, dataCount) {
      const _this2 = {};
      _this2.totalCount = totalCount;
      _this2.dataCount = dataCount;
      return _this2;
    };
    const _this = {};
    const getRsBlockTable = function(typeNumber, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case QRErrorCorrectionLevel.L:
          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
        case QRErrorCorrectionLevel.M:
          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
        case QRErrorCorrectionLevel.Q:
          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
        case QRErrorCorrectionLevel.H:
          return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {
      const rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);
      if (typeof rsBlock == "undefined") {
        throw "bad rs block @ typeNumber:" + typeNumber + "/errorCorrectionLevel:" + errorCorrectionLevel;
      }
      const length = rsBlock.length / 3;
      const list = [];
      for (let i = 0; i < length; i += 1) {
        const count = rsBlock[i * 3 + 0];
        const totalCount = rsBlock[i * 3 + 1];
        const dataCount = rsBlock[i * 3 + 2];
        for (let j = 0; j < count; j += 1) {
          list.push(qrRSBlock(totalCount, dataCount));
        }
      }
      return list;
    };
    return _this;
  })();
  var qrBitBuffer = function() {
    const _buffer = [];
    let _length = 0;
    const _this = {};
    _this.getBuffer = function() {
      return _buffer;
    };
    _this.getAt = function(index) {
      const bufIndex = Math.floor(index / 8);
      return (_buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
    };
    _this.put = function(num, length) {
      for (let i = 0; i < length; i += 1) {
        _this.putBit((num >>> length - i - 1 & 1) == 1);
      }
    };
    _this.getLengthInBits = function() {
      return _length;
    };
    _this.putBit = function(bit) {
      const bufIndex = Math.floor(_length / 8);
      if (_buffer.length <= bufIndex) {
        _buffer.push(0);
      }
      if (bit) {
        _buffer[bufIndex] |= 128 >>> _length % 8;
      }
      _length += 1;
    };
    return _this;
  };
  var qrNumber = function(data) {
    const _mode = QRMode.MODE_NUMBER;
    const _data = data;
    const _this = {};
    _this.getMode = function() {
      return _mode;
    };
    _this.getLength = function(buffer) {
      return _data.length;
    };
    _this.write = function(buffer) {
      const data2 = _data;
      let i = 0;
      while (i + 2 < data2.length) {
        buffer.put(strToNum(data2.substring(i, i + 3)), 10);
        i += 3;
      }
      if (i < data2.length) {
        if (data2.length - i == 1) {
          buffer.put(strToNum(data2.substring(i, i + 1)), 4);
        } else if (data2.length - i == 2) {
          buffer.put(strToNum(data2.substring(i, i + 2)), 7);
        }
      }
    };
    const strToNum = function(s) {
      let num = 0;
      for (let i = 0; i < s.length; i += 1) {
        num = num * 10 + chatToNum(s.charAt(i));
      }
      return num;
    };
    const chatToNum = function(c) {
      if ("0" <= c && c <= "9") {
        return c.charCodeAt(0) - "0".charCodeAt(0);
      }
      throw "illegal char :" + c;
    };
    return _this;
  };
  var qrAlphaNum = function(data) {
    const _mode = QRMode.MODE_ALPHA_NUM;
    const _data = data;
    const _this = {};
    _this.getMode = function() {
      return _mode;
    };
    _this.getLength = function(buffer) {
      return _data.length;
    };
    _this.write = function(buffer) {
      const s = _data;
      let i = 0;
      while (i + 1 < s.length) {
        buffer.put(
          getCode(s.charAt(i)) * 45 + getCode(s.charAt(i + 1)),
          11
        );
        i += 2;
      }
      if (i < s.length) {
        buffer.put(getCode(s.charAt(i)), 6);
      }
    };
    const getCode = function(c) {
      if ("0" <= c && c <= "9") {
        return c.charCodeAt(0) - "0".charCodeAt(0);
      } else if ("A" <= c && c <= "Z") {
        return c.charCodeAt(0) - "A".charCodeAt(0) + 10;
      } else {
        switch (c) {
          case " ":
            return 36;
          case "$":
            return 37;
          case "%":
            return 38;
          case "*":
            return 39;
          case "+":
            return 40;
          case "-":
            return 41;
          case ".":
            return 42;
          case "/":
            return 43;
          case ":":
            return 44;
          default:
            throw "illegal char :" + c;
        }
      }
    };
    return _this;
  };
  var qr8BitByte = function(data) {
    const _mode = QRMode.MODE_8BIT_BYTE;
    const _data = data;
    const _bytes = qrcode.stringToBytes(data);
    const _this = {};
    _this.getMode = function() {
      return _mode;
    };
    _this.getLength = function(buffer) {
      return _bytes.length;
    };
    _this.write = function(buffer) {
      for (let i = 0; i < _bytes.length; i += 1) {
        buffer.put(_bytes[i], 8);
      }
    };
    return _this;
  };
  var qrKanji = function(data) {
    const _mode = QRMode.MODE_KANJI;
    const _data = data;
    const stringToBytes2 = qrcode.stringToBytes;
    !(function(c, code) {
      const test = stringToBytes2(c);
      if (test.length != 2 || (test[0] << 8 | test[1]) != code) {
        throw "sjis not supported.";
      }
    })("\u53CB", 38726);
    const _bytes = stringToBytes2(data);
    const _this = {};
    _this.getMode = function() {
      return _mode;
    };
    _this.getLength = function(buffer) {
      return ~~(_bytes.length / 2);
    };
    _this.write = function(buffer) {
      const data2 = _bytes;
      let i = 0;
      while (i + 1 < data2.length) {
        let c = (255 & data2[i]) << 8 | 255 & data2[i + 1];
        if (33088 <= c && c <= 40956) {
          c -= 33088;
        } else if (57408 <= c && c <= 60351) {
          c -= 49472;
        } else {
          throw "illegal char at " + (i + 1) + "/" + c;
        }
        c = (c >>> 8 & 255) * 192 + (c & 255);
        buffer.put(c, 13);
        i += 2;
      }
      if (i < data2.length) {
        throw "illegal char at " + (i + 1);
      }
    };
    return _this;
  };
  var byteArrayOutputStream = function() {
    const _bytes = [];
    const _this = {};
    _this.writeByte = function(b) {
      _bytes.push(b & 255);
    };
    _this.writeShort = function(i) {
      _this.writeByte(i);
      _this.writeByte(i >>> 8);
    };
    _this.writeBytes = function(b, off, len) {
      off = off || 0;
      len = len || b.length;
      for (let i = 0; i < len; i += 1) {
        _this.writeByte(b[i + off]);
      }
    };
    _this.writeString = function(s) {
      for (let i = 0; i < s.length; i += 1) {
        _this.writeByte(s.charCodeAt(i));
      }
    };
    _this.toByteArray = function() {
      return _bytes;
    };
    _this.toString = function() {
      let s = "";
      s += "[";
      for (let i = 0; i < _bytes.length; i += 1) {
        if (i > 0) {
          s += ",";
        }
        s += _bytes[i];
      }
      s += "]";
      return s;
    };
    return _this;
  };
  var base64EncodeOutputStream = function() {
    let _buffer = 0;
    let _buflen = 0;
    let _length = 0;
    let _base64 = "";
    const _this = {};
    const writeEncoded = function(b) {
      _base64 += String.fromCharCode(encode(b & 63));
    };
    const encode = function(n) {
      if (n < 0) {
        throw "n:" + n;
      } else if (n < 26) {
        return 65 + n;
      } else if (n < 52) {
        return 97 + (n - 26);
      } else if (n < 62) {
        return 48 + (n - 52);
      } else if (n == 62) {
        return 43;
      } else if (n == 63) {
        return 47;
      } else {
        throw "n:" + n;
      }
    };
    _this.writeByte = function(n) {
      _buffer = _buffer << 8 | n & 255;
      _buflen += 8;
      _length += 1;
      while (_buflen >= 6) {
        writeEncoded(_buffer >>> _buflen - 6);
        _buflen -= 6;
      }
    };
    _this.flush = function() {
      if (_buflen > 0) {
        writeEncoded(_buffer << 6 - _buflen);
        _buffer = 0;
        _buflen = 0;
      }
      if (_length % 3 != 0) {
        const padlen = 3 - _length % 3;
        for (let i = 0; i < padlen; i += 1) {
          _base64 += "=";
        }
      }
    };
    _this.toString = function() {
      return _base64;
    };
    return _this;
  };
  var base64DecodeInputStream = function(str) {
    const _str = str;
    let _pos = 0;
    let _buffer = 0;
    let _buflen = 0;
    const _this = {};
    _this.read = function() {
      while (_buflen < 8) {
        if (_pos >= _str.length) {
          if (_buflen == 0) {
            return -1;
          }
          throw "unexpected end of file./" + _buflen;
        }
        const c = _str.charAt(_pos);
        _pos += 1;
        if (c == "=") {
          _buflen = 0;
          return -1;
        } else if (c.match(/^\s$/)) {
          continue;
        }
        _buffer = _buffer << 6 | decode(c.charCodeAt(0));
        _buflen += 6;
      }
      const n = _buffer >>> _buflen - 8 & 255;
      _buflen -= 8;
      return n;
    };
    const decode = function(c) {
      if (65 <= c && c <= 90) {
        return c - 65;
      } else if (97 <= c && c <= 122) {
        return c - 97 + 26;
      } else if (48 <= c && c <= 57) {
        return c - 48 + 52;
      } else if (c == 43) {
        return 62;
      } else if (c == 47) {
        return 63;
      } else {
        throw "c:" + c;
      }
    };
    return _this;
  };
  var gifImage = function(width, height) {
    const _width = width;
    const _height = height;
    const _data = new Array(width * height);
    const _this = {};
    _this.setPixel = function(x, y, pixel) {
      _data[y * _width + x] = pixel;
    };
    _this.write = function(out) {
      out.writeString("GIF87a");
      out.writeShort(_width);
      out.writeShort(_height);
      out.writeByte(128);
      out.writeByte(0);
      out.writeByte(0);
      out.writeByte(0);
      out.writeByte(0);
      out.writeByte(0);
      out.writeByte(255);
      out.writeByte(255);
      out.writeByte(255);
      out.writeString(",");
      out.writeShort(0);
      out.writeShort(0);
      out.writeShort(_width);
      out.writeShort(_height);
      out.writeByte(0);
      const lzwMinCodeSize = 2;
      const raster = getLZWRaster(lzwMinCodeSize);
      out.writeByte(lzwMinCodeSize);
      let offset = 0;
      while (raster.length - offset > 255) {
        out.writeByte(255);
        out.writeBytes(raster, offset, 255);
        offset += 255;
      }
      out.writeByte(raster.length - offset);
      out.writeBytes(raster, offset, raster.length - offset);
      out.writeByte(0);
      out.writeString(";");
    };
    const bitOutputStream = function(out) {
      const _out = out;
      let _bitLength = 0;
      let _bitBuffer = 0;
      const _this2 = {};
      _this2.write = function(data, length) {
        if (data >>> length != 0) {
          throw "length over";
        }
        while (_bitLength + length >= 8) {
          _out.writeByte(255 & (data << _bitLength | _bitBuffer));
          length -= 8 - _bitLength;
          data >>>= 8 - _bitLength;
          _bitBuffer = 0;
          _bitLength = 0;
        }
        _bitBuffer = data << _bitLength | _bitBuffer;
        _bitLength = _bitLength + length;
      };
      _this2.flush = function() {
        if (_bitLength > 0) {
          _out.writeByte(_bitBuffer);
        }
      };
      return _this2;
    };
    const getLZWRaster = function(lzwMinCodeSize) {
      const clearCode = 1 << lzwMinCodeSize;
      const endCode = (1 << lzwMinCodeSize) + 1;
      let bitLength = lzwMinCodeSize + 1;
      const table = lzwTable();
      for (let i = 0; i < clearCode; i += 1) {
        table.add(String.fromCharCode(i));
      }
      table.add(String.fromCharCode(clearCode));
      table.add(String.fromCharCode(endCode));
      const byteOut = byteArrayOutputStream();
      const bitOut = bitOutputStream(byteOut);
      bitOut.write(clearCode, bitLength);
      let dataIndex = 0;
      let s = String.fromCharCode(_data[dataIndex]);
      dataIndex += 1;
      while (dataIndex < _data.length) {
        const c = String.fromCharCode(_data[dataIndex]);
        dataIndex += 1;
        if (table.contains(s + c)) {
          s = s + c;
        } else {
          bitOut.write(table.indexOf(s), bitLength);
          if (table.size() < 4095) {
            if (table.size() == 1 << bitLength) {
              bitLength += 1;
            }
            table.add(s + c);
          }
          s = c;
        }
      }
      bitOut.write(table.indexOf(s), bitLength);
      bitOut.write(endCode, bitLength);
      bitOut.flush();
      return byteOut.toByteArray();
    };
    const lzwTable = function() {
      const _map = {};
      let _size = 0;
      const _this2 = {};
      _this2.add = function(key) {
        if (_this2.contains(key)) {
          throw "dup key:" + key;
        }
        _map[key] = _size;
        _size += 1;
      };
      _this2.size = function() {
        return _size;
      };
      _this2.indexOf = function(key) {
        return _map[key];
      };
      _this2.contains = function(key) {
        return typeof _map[key] != "undefined";
      };
      return _this2;
    };
    return _this;
  };
  var createDataURL = function(width, height, getPixel) {
    const gif = gifImage(width, height);
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        gif.setPixel(x, y, getPixel(x, y));
      }
    }
    const b = byteArrayOutputStream();
    gif.write(b);
    const base64 = base64EncodeOutputStream();
    const bytes = b.toByteArray();
    for (let i = 0; i < bytes.length; i += 1) {
      base64.writeByte(bytes[i]);
    }
    base64.flush();
    return "data:image/gif;base64," + base64;
  };
  var qrcode_default = qrcode;
  var stringToBytes = qrcode.stringToBytes;

  // src/app/qr.ts
  function createQrSvg(value, size = 23) {
    const qr = qrcode_default(0, "M");
    qr.addData(value);
    qr.make();
    const moduleCount = qr.getModuleCount();
    const rects = [];
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (qr.isDark(row, col)) {
          rects.push(`<rect x="${col}" y="${row}" width="1" height="1"/>`);
        }
      }
    }
    return [
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${moduleCount} ${moduleCount}" shape-rendering="crispEdges">`,
      '<rect width="100%" height="100%" fill="#fff"/>',
      '<g fill="#000">',
      rects.join(""),
      "</g>",
      "</svg>"
    ].join("");
  }

  // src/app/card.ts
  var VIDEO_QR_SIZE = 23;
  async function fillRowData(row, item, baseDiscountRaw) {
    if (item == null ? void 0 : item.sku) {
      row.name = String(item.sku);
    }
    const map = {
      [CONFIG.ROW_SKU]: item.sku,
      [CONFIG.ROW_SPECS]: item.specs,
      [CONFIG.ROW_MIN]: item.min,
      [CONFIG.ROW_QTY]: item.qty,
      [CONFIG.ROW_PRICE]: normalizePriceText(String(item.price || "")),
      [CONFIG.BOX_PRICE]: normalizePriceText(String(item.boxPrice || item.price || "")),
      [CONFIG.BOX_QTY]: normalizeMultiplicityText(String(item.multiplicity || item.boxQty || item.qty || ""))
    };
    for (const [key, val] of Object.entries(map)) {
      const node = findTextInRow(row, key);
      if (node) {
        await loadFontForNode(node);
        node.characters = val ? String(val) : "-";
        if ((key === CONFIG.ROW_SKU || key === CONFIG.ROW_SPECS) && item.productUrl) {
          setTextHyperlink(node, item.productUrl);
        }
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
    const shouldShow = rowDiscount !== null && (baseDiscount === null || baseDiscount !== rowDiscount);
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
    const discountInfoWrapper = findNodeInCard(card, CONFIG.DISCOUNT_INFO);
    if (discountInfo) {
      await loadFontForNode(discountInfo);
      if (group.discountInfoText) {
        discountInfo.characters = String(group.discountInfoText);
        discountInfo.visible = true;
        if (discountInfoWrapper) discountInfoWrapper.visible = true;
      } else {
        discountInfo.visible = false;
        discountInfo.characters = "";
        if (discountInfoWrapper) discountInfoWrapper.visible = false;
      }
    } else if (discountInfoWrapper && !group.discountInfoText) {
      discountInfoWrapper.visible = false;
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
    await setOptionalCardText(card, CONFIG.BOX_PRICE, group.boxPriceText ? normalizePriceText(String(group.boxPriceText)) : group.boxPriceText);
    await setOptionalCardText(card, CONFIG.BOX_QTY, normalizeMultiplicityText(String(group.boxQtyText || "")));
    await setOptionalCardText(card, CONFIG.BOX_NOTICE, group.boxNoticeText);
    await setVideoLink(card, group.videoUrl);
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
          safeSetPosition(
            logoNode,
            Math.round((container.width - logoNode.width) / 2),
            Math.round((container.height - logoNode.height) / 2),
            "\u043B\u043E\u0433\u043E\u0442\u0438\u043F"
          );
        }
        if ("clipsContent" in logoNode) {
          logoNode.clipsContent = true;
        }
      } catch (err) {
        postLog(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440 \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u0430: ${err}`);
      }
    }
  }
  function safeSetPosition(node, x, y, label) {
    var _a;
    if (((_a = node.parent) == null ? void 0 : _a.type) === "INSTANCE") {
      postLog(`\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u044B \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B ${label}: \u0441\u043B\u043E\u0439 \u0432\u043D\u0443\u0442\u0440\u0438 instance`);
      return;
    }
    try {
      node.x = x;
      node.y = y;
    } catch (err) {
      postLog(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B ${label}: ${String((err == null ? void 0 : err.message) || err)}`);
    }
  }
  async function setOptionalCardText(card, layerName, value) {
    const node = findTextInNode(card, layerName);
    if (!node) return;
    await loadFontForNode(node);
    const text = value ? String(value).trim() : "";
    node.characters = text;
    node.visible = text !== "";
  }
  async function setVideoLink(card, videoUrl) {
    const wrapper = findNodeInCard(card, CONFIG.VIDEO_QR_WRAPPER);
    const link = findTextInNode(card, CONFIG.VIDEO_LINK);
    const url = normalizeUrlLocal(videoUrl);
    if (!url) {
      removeGeneratedQr(card);
      if (wrapper && "findAll" in wrapper) removeGeneratedQr(wrapper);
      safeSetVisible(wrapper, false, "video QR wrapper");
      if (link) {
        await loadFontForNode(link);
        link.characters = "";
        safeSetVisible(link, false, "video link");
      }
      return;
    }
    safeSetVisible(wrapper, true, "video QR wrapper");
    createOrReplaceVideoQr(card, wrapper, url);
    if (link) {
      await loadFontForNode(link);
      if (!String(link.characters || "").trim()) {
        link.characters = "\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0438\u0434\u0435\u043E";
      }
      safeSetVisible(link, true, "video link");
      setTextHyperlink(link, url);
    }
  }
  function createOrReplaceVideoQr(card, wrapper, url) {
    try {
      removeGeneratedQr(card);
      if (wrapper && "findAll" in wrapper) removeGeneratedQr(wrapper);
      if (!wrapper || !("width" in wrapper) || !("height" in wrapper)) return;
      const qrNode = createVideoQrNode(url);
      if (appendQrIntoWrapper(wrapper, qrNode)) return;
      trySetAbsoluteLayout(qrNode);
      if (!safeAppendChild(card, qrNode, "video QR")) return;
      const pos = getRelativePosition(wrapper, card);
      safeSetPosition(qrNode, pos.x + centerOffset(wrapper.width, qrNode.width), pos.y + centerOffset(wrapper.height, qrNode.height), "video QR");
    } catch (err) {
      postLog(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C QR \u0432\u0438\u0434\u0435\u043E: ${String((err == null ? void 0 : err.message) || err)}`);
    }
  }
  function createVideoQrNode(url) {
    const svgNode = figma.createNodeFromSvg(createQrSvg(url, VIDEO_QR_SIZE));
    svgNode.name = "VideoQrGeneratedSource";
    resizeQrNode(svgNode, VIDEO_QR_SIZE, VIDEO_QR_SIZE);
    const merged = flattenQrSource(svgNode);
    merged.name = "VideoQrGenerated";
    resizeQrNode(merged, VIDEO_QR_SIZE, VIDEO_QR_SIZE);
    return merged;
  }
  function flattenQrSource(source) {
    const temp = figma.createFrame();
    temp.name = "VideoQrTemp";
    temp.resizeWithoutConstraints(VIDEO_QR_SIZE, VIDEO_QR_SIZE);
    temp.fills = [];
    temp.clipsContent = false;
    let result = source;
    try {
      temp.appendChild(source);
      safeSetPosition(source, 0, 0, "video QR source");
      const flatten = figma.flatten;
      if (typeof flatten !== "function") return source;
      result = flatten([source], temp);
      if (result.parent === temp) {
        figma.currentPage.appendChild(result);
        safeSetPosition(result, 0, 0, "video QR merged");
      }
      return result;
    } catch (err) {
      postLog(`QR \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0431\u044A\u0435\u0434\u0438\u043D\u0438\u0442\u044C \u0432 \u043E\u0434\u0438\u043D \u0432\u0435\u043A\u0442\u043E\u0440: ${String((err == null ? void 0 : err.message) || err)}`);
      if (source.parent === temp) {
        figma.currentPage.appendChild(source);
        safeSetPosition(source, 0, 0, "video QR source");
      }
      result = source;
      return result;
    } finally {
      try {
        if (temp.parent) temp.remove();
      } catch (e) {
      }
    }
  }
  function appendQrIntoWrapper(wrapper, qrNode) {
    if (!canAppendIntoNode(wrapper)) return false;
    if (findInstanceAncestor(wrapper)) return false;
    try {
      wrapper.appendChild(qrNode);
      safeSetPosition(qrNode, centerOffset(wrapper.width, qrNode.width), centerOffset(wrapper.height, qrNode.height), "video QR");
      return true;
    } catch (err) {
      postLog(`QR \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u044C \u0432\u043D\u0443\u0442\u0440\u044C #VideoQrWrapper: ${String((err == null ? void 0 : err.message) || err)}`);
      return false;
    }
  }
  function centerOffset(parentSize, childSize) {
    return Math.round((parentSize - childSize) / 2);
  }
  function canAppendIntoNode(node) {
    return node.type === "FRAME" || node.type === "COMPONENT" || node.type === "SECTION";
  }
  function findInstanceAncestor(node) {
    let parent = node.parent;
    while (parent && parent.type !== "PAGE") {
      if (parent.type === "INSTANCE") return parent;
      parent = parent.parent;
    }
    return null;
  }
  function safeAppendChild(parent, child, label) {
    try {
      parent.appendChild(child);
      return true;
    } catch (err) {
      try {
        child.remove();
      } catch (e) {
      }
      postLog(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C ${label} \u0432 ${parent.name}: ${String((err == null ? void 0 : err.message) || err)}`);
      return false;
    }
  }
  function removeGeneratedQr(root) {
    const nodes = root.findAll((node) => node.name === "VideoQrGenerated");
    for (const node of nodes) {
      try {
        node.remove();
      } catch (e) {
      }
    }
  }
  function resizeQrNode(node, width, height) {
    var _a, _b;
    const resizable = node;
    try {
      (_a = resizable.resizeWithoutConstraints) == null ? void 0 : _a.call(resizable, width, height);
    } catch (e) {
      try {
        (_b = resizable.resize) == null ? void 0 : _b.call(resizable, width, height);
      } catch (e2) {
      }
    }
  }
  function safeSetVisible(node, visible, label) {
    if (!node) return;
    try {
      node.visible = visible;
    } catch (err) {
      postLog(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u044C ${label}: ${String((err == null ? void 0 : err.message) || err)}`);
    }
  }
  function trySetAbsoluteLayout(node) {
    try {
      node.layoutPositioning = "ABSOLUTE";
    } catch (e) {
    }
  }
  function getRelativePosition(node, ancestor) {
    const nodeAbs = node.absoluteTransform;
    const ancestorAbs = ancestor.absoluteTransform;
    return {
      x: Math.round(nodeAbs[0][2] - ancestorAbs[0][2]),
      y: Math.round(nodeAbs[1][2] - ancestorAbs[1][2])
    };
  }
  function setTextHyperlink(node, url) {
    const href = normalizeUrlLocal(url);
    if (!href || !node.characters) return;
    try {
      node.setRangeHyperlink(0, node.characters.length, {
        type: "URL",
        value: href
      });
    } catch (err) {
      postLog(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 ${node.name}: ${String((err == null ? void 0 : err.message) || err)}`);
    }
  }
  function normalizeUrlLocal(value) {
    const text = String(value || "").replace(/\\\//g, "/").trim();
    return /^https?:\/\//i.test(text) ? text : "";
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
    const lockedInstance = listNode ? findInstanceAncestorBefore(listNode, card) : null;
    if (lockedInstance) {
      try {
        lockedInstance.detachInstance();
        return getOrCreateListFrame(card);
      } catch (err) {
        postLog(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C detach instance \u0432\u043E\u043A\u0440\u0443\u0433 ListContainer: ${String((err == null ? void 0 : err.message) || err)}`);
      }
    }
    if (lockedInstance) return null;
    if (listNode && listNode.type === "INSTANCE") {
      const detached = listNode.detachInstance();
      listNode = detached;
    }
    const textListNode = listNode;
    if (textListNode && textListNode.type === "TEXT" && textListNode.parent && "children" in textListNode.parent) {
      const parent = textListNode.parent;
      const idx = parent.children.indexOf(textListNode);
      const frame = figma.createFrame();
      frame.name = CONFIG.LIST_CONTAINER;
      safeSetPosition(frame, textListNode.x, textListNode.y, "fallback list container");
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
  function findInstanceAncestorBefore(node, stopAt) {
    let parent = node.parent;
    while (parent && parent !== stopAt) {
      if (parent.type === "INSTANCE") return parent;
      parent = parent.parent;
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
    enableHugHeight(card);
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
    rowNode.fills = [];
    await fillRowData(rowNode, item, baseDiscountRaw);
    return rowNode;
  }
  async function appendRowsToCardList(list, card, rowMaster, items, baseDiscountRaw, rowOffset = 0, allowFallback = true) {
    var _a;
    const lockedInstance = findInstanceAncestorBefore(list, card);
    if (lockedInstance) {
      try {
        lockedInstance.detachInstance();
        const nextList = getOrCreateListFrame(card) || createFallbackListFrame(card);
        if (!nextList || nextList === list) {
          postLog(`ListContainer locked in instance for ${card.name}`);
          if (allowFallback) {
            const fallback = createFallbackListFrameFromList(card, list);
            await appendRowsToCardList(fallback, card, rowMaster, items, baseDiscountRaw, rowOffset, false);
          }
          return;
        }
        await appendRowsToCardList(nextList, card, rowMaster, items, baseDiscountRaw, rowOffset);
        return;
      } catch (err) {
        postLog(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0440\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C ListContainer \u0432 ${card.name}: ${String((err == null ? void 0 : err.message) || err)}`);
        return;
      }
    }
    prepareListFrame(list, card);
    for (let i = 0; i < items.length; i++) {
      const rowNode = await createFilledRow(rowMaster, items[i], rowOffset + i, baseDiscountRaw);
      if (list.layoutMode !== "NONE") {
        rowNode.layoutAlign = "STRETCH";
      }
      try {
        list.appendChild(rowNode);
      } catch (err) {
        rowNode.remove();
        postLog(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0443 ${((_a = items[i]) == null ? void 0 : _a.sku) || ""} \u0432 ${card.name}: ${String((err == null ? void 0 : err.message) || err)}`);
        return;
      }
      if (i < items.length - 1) {
        try {
          list.appendChild(createRowSeparator());
        } catch (err) {
          postLog(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0440\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0441\u0442\u0440\u043E\u043A \u0432 ${card.name}: ${String((err == null ? void 0 : err.message) || err)}`);
        }
      }
    }
    fallbackResizeOnlyIfHugFailed(list, card);
  }
  function createRowSeparator() {
    const separator = figma.createFrame();
    separator.name = "rowSeparator";
    separator.resize(COL_W, 0.5);
    separator.fills = [{ type: "SOLID", color: { r: 0.86, g: 0.86, b: 0.86 } }];
    separator.clipsContent = false;
    separator.layoutAlign = "STRETCH";
    return separator;
  }
  async function fillCardData(card, group, rowMaster) {
    await fillCardStatic(card, group);
    const list = getOrCreateListFrame(card) || createFallbackListFrame(card);
    if (!list) {
      postLog(`ListContainer not found in ${card.name}`);
      return;
    }
    clearProductRows(list);
    await appendRowsToCardList(list, card, rowMaster, group.items, group.discountText || null, 0);
  }
  function clearProductRows(list) {
    for (const child of [...list.children]) {
      if (shouldKeepListChild(child)) continue;
      child.remove();
    }
  }
  function shouldKeepListChild(node) {
    const name = normalizeNameLocal(node.name || "");
    return name === "heading" || name === "header" || name === "tableheader" || name === "listheader" || name === "columns" || name === "columnnames" || name === "\u0448\u0430\u043F\u043A\u0430" || name === "\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A";
  }
  function createFallbackListFrame(card) {
    const frame = figma.createFrame();
    frame.name = CONFIG.LIST_CONTAINER;
    safeSetPosition(frame, 0, Math.max(0, card.height - 1), "fallback list frame");
    frame.resize(card.width, 1);
    frame.fills = [];
    card.appendChild(frame);
    postLog(`Created fallback ListContainer in ${card.name}`);
    return frame;
  }
  function createFallbackListFrameFromList(card, sourceList) {
    const frame = figma.createFrame();
    frame.name = CONFIG.LIST_CONTAINER;
    const pos = getRelativePosition(sourceList, card);
    safeSetPosition(frame, pos.x, pos.y, "fallback list frame");
    frame.resize(sourceList.width || card.width, Math.max(1, sourceList.height || 1));
    frame.fills = [];
    safeAppendChild(card, frame, "fallback ListContainer");
    postLog(`Created fallback ListContainer from locked list in ${card.name}`);
    return frame;
  }
  function enableHugHeight(node) {
    try {
      if (node.layoutMode === "VERTICAL") {
        node.primaryAxisSizingMode = "AUTO";
      } else if (node.layoutMode === "HORIZONTAL") {
        node.counterAxisSizingMode = "AUTO";
      }
    } catch (e) {
    }
  }
  function fallbackResizeOnlyIfHugFailed(list, card) {
    const rows = [...list.children];
    if (rows.length === 0) return;
    const contentH = rows.reduce((sum, row) => sum + row.height, 0) + Math.max(0, rows.length - 1) * CONFIG.ITEM_GAP;
    const targetListH = Math.max(1, contentH);
    const listBottom = list.y + targetListH;
    if (list.height + 1 < targetListH && list.layoutMode === "NONE") {
      try {
        list.resize(list.width || card.width, targetListH);
      } catch (e) {
      }
    }
    if (listBottom > card.height + 1 && card.layoutMode === "NONE") {
      try {
        card.resize(card.width, listBottom);
      } catch (e) {
      }
    }
  }
  async function buildSplitCards(cardMaster, rowMaster, group, maxColH, firstChunkMaxColH, metrics) {
    const splitMetrics = metrics || {
      minCardHeight: CONFIG.MIN_CARD_HEIGHT,
      baseRows: CONFIG.BASE_CARD_ROWS,
      rowGrowth: CONFIG.ESTIMATED_ROW_HEIGHT
    };
    const baseCard = cardMaster.createInstance().detachInstance();
    baseCard.name = group.mainSku ? `Card${String(group.mainSku)}` : "Unknown SKU";
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
        await fillCardStatic(card, group);
      }
      const list = getOrCreateListFrame(card);
      if (!list) {
        cards.push(card);
        continue;
      }
      prepareListFrame(list, card);
      clearProductRows(list);
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
      const target = normalizeNameKey(name);
      const node = card.findOne((n) => normalizeNameKey(n.name || "") === target);
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

  // src/app/promoRules.ts
  var MAIN_CATEGORY_RULES = [
    { match: "\u0430\u0431\u0440\u0430\u0437\u0438\u0432", title: "\u0410\u0431\u0440\u0430\u0437\u0438\u0432\u043D\u044B\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442" },
    { match: "\u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u044C", title: "\u0410\u0432\u0442\u043E\u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442" },
    { match: "\u0438\u0437\u043C\u0435\u0440", title: "\u0418\u0437\u043C\u0435\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442" },
    { match: "\u043B\u0435\u0441\u0442\u043D\u0438\u0446", title: "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u044B" },
    { match: "\u043F\u0435\u0440\u0447\u0430\u0442", title: "\u041F\u0435\u0440\u0447\u0430\u0442\u043A\u0438" },
    { match: "\u0441\u043A\u043E\u0431", title: "\u0421\u043A\u043E\u0431\u044F\u043D\u044B\u0435 \u0438\u0437\u0434\u0435\u043B\u0438\u044F" },
    { match: "\u0441\u043B\u0435\u0441\u0430\u0440", title: "\u0421\u043B\u0435\u0441\u0430\u0440\u043D\u044B\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442" },
    { match: "\u0441\u0442\u043E\u043B\u044F\u0440", title: "\u0421\u0442\u043E\u043B\u044F\u0440\u043D\u044B\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442" },
    { match: "\u0445\u043E\u0437\u044F\u0439", title: "\u0425\u043E\u0437\u044F\u0439\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442" },
    { match: "\u0448\u043B\u0438\u0444", title: "\u0428\u043B\u0438\u0444\u043E\u0432\u0430\u043B\u044C\u043D\u044B\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442" },
    { match: "\u0448\u0442\u0443\u043A\u0430\u0442\u0443\u0440", title: "\u0428\u0442\u0443\u043A\u0430\u0442\u0443\u0440\u043D\u044B\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442" }
  ];
  function resolveMainCategory(rawName) {
    const name = String(rawName || "").replace(/\s+/g, " ").trim();
    const key = name.toLowerCase();
    const rule = MAIN_CATEGORY_RULES.find((item) => key.includes(item.match.toLowerCase()));
    return rule ? rule.title : name;
  }

  // src/app/promoTitles.ts
  var COMMON_PROMO_TITLES = [
    "\u0412\u044B\u0433\u043E\u0434\u043D\u0430\u044F \u0430\u043A\u0446\u0438\u044F \u043C\u0435\u0441\u044F\u0446\u0430",
    "\u041B\u0443\u0447\u0448\u0438\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043C\u0435\u0441\u044F\u0446\u0430",
    "\u041C\u0435\u0441\u044F\u0446 \u0432\u044B\u0433\u043E\u0434\u043D\u044B\u0445 \u043F\u043E\u043A\u0443\u043F\u043E\u043A",
    "\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u043F\u043E \u0430\u043A\u0446\u0438\u0438",
    "\u0410\u043A\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0442\u043E\u0432\u0430\u0440\u044B \u043C\u0435\u0441\u044F\u0446\u0430",
    "\u0412\u044B\u0433\u043E\u0434\u0430 \u043D\u0430 \u043D\u0443\u0436\u043D\u044B\u0435 \u0442\u043E\u0432\u0430\u0440\u044B",
    "\u0421\u043F\u0435\u0446\u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043C\u0435\u0441\u044F\u0446\u0430",
    "\u0411\u043E\u043B\u044C\u0448\u0435 \u0432\u044B\u0433\u043E\u0434\u044B \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0435",
    "\u041F\u043E\u0434\u0431\u043E\u0440\u043A\u0430 \u0430\u043A\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0442\u043E\u0432\u0430\u0440\u043E\u0432",
    "\u041F\u0440\u0430\u043A\u0442\u0438\u0447\u043D\u0430\u044F \u0432\u044B\u0433\u043E\u0434\u0430 \u043C\u0435\u0441\u044F\u0446\u0430"
  ];
  var FIXED_PROMO_TITLES = [
    "\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0446\u0435\u043D\u044B \u043C\u0435\u0441\u044F\u0446\u0430",
    "\u0426\u0435\u043D\u044B \u0437\u0430\u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u044B",
    "\u0424\u0438\u043A\u0441-\u0430\u043A\u0446\u0438\u044F \u043C\u0435\u0441\u044F\u0446\u0430",
    "\u0421\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u0430\u044F \u0446\u0435\u043D\u0430 \u043D\u0430 \u0442\u043E\u0432\u0430\u0440\u044B",
    "\u0422\u043E\u0432\u0430\u0440\u044B \u043F\u043E \u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u0446\u0435\u043D\u0435"
  ];
  var BOX_PROMO_TITLE = "\u0410\u043A\u0446\u0438\u044F \u043A\u043E\u0440\u043E\u0431\u043A\u043E\u0439 \u0434\u0435\u0448\u0435\u0432\u043B\u0435!";
  function choosePromoTitle(type, seed) {
    if (type === "box") return BOX_PROMO_TITLE;
    const titles = type === "fixed" ? FIXED_PROMO_TITLES : COMMON_PROMO_TITLES;
    const index = Math.abs(hashText(seed)) % titles.length;
    return titles[index];
  }
  function hashText(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }

  // src/app/banner.ts
  async function updateSaleBannerInfo(infoMap, groups = [], scope, promoType = "auto") {
    const { monthLabel, monthGenitive, year, lastDay } = getNextMonthInfo();
    const saleMonthText = `${capitalize(monthLabel)} ${year}`;
    const saleDateText = `\u0421 1 \u0434\u043E ${lastDay} ${monthGenitive}`;
    const isBox = promoType === "box" || promoType === "auto" && isBoxInfoMap(infoMap, groups);
    const isFixed = promoType === "fixed";
    const bannerScope = normalizeScope(scope) || await findBannerScope();
    const totalSaleNodes = findTextNodesByNameAny(["totalSale"], bannerScope);
    const saleMonthNodes = findTextNodesByNameAny(["saleMonth"], bannerScope);
    const saleDateNodes = findTextNodesByNameAny(["saleDate"], bannerScope);
    const titleNodes = findTextNodesByNameAny(["#Title", "Title"], bannerScope);
    const descriptionNodes = findTextNodesByNameAny(["#Description", "Description"], bannerScope);
    const saleLabelNodes = findNodesByNameAny(["SALE LABEL", "Sale Label", "saleLabel"], bannerScope);
    const maxDiscount = getMaxDiscount(infoMap);
    if (!isBox && maxDiscount !== null) {
      const totalSaleText = `${maxDiscount}%`;
      for (const node of totalSaleNodes) {
        await loadFontForNode(node);
        node.characters = totalSaleText;
      }
    }
    if (isBox) {
      for (const node of saleLabelNodes) node.visible = false;
      for (const node of titleNodes) {
        await loadFontForNode(node);
        node.characters = choosePromoTitle("box", buildTitleSeed(infoMap, groups));
      }
      await setDescription(descriptionNodes, buildCategoriesText(infoMap));
    } else {
      for (const node of titleNodes) {
        await loadFontForNode(node);
        node.characters = choosePromoTitle(isFixed ? "fixed" : "common", buildTitleSeed(infoMap, groups));
      }
      const description = [buildCategoriesText(infoMap), buildRoundedProductsText(groups)].filter(Boolean).join("\n");
      await setDescription(descriptionNodes, description);
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
  function buildTitleSeed(infoMap, groups) {
    return `${buildCategoriesText(infoMap)}:${Array.isArray(groups) ? groups.length : 0}`;
  }
  async function setDescription(nodes, text) {
    if (!text) return;
    for (const node of nodes) {
      await loadFontForNode(node);
      node.characters = text;
    }
  }
  function normalizeScope(scope) {
    if (!scope) return null;
    return Array.isArray(scope) ? scope : [scope];
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
    return bannerInstances.length > 0 ? bannerInstances : null;
  }
  function findTextNodesByNameAny(names, scope = null) {
    const wanted = new Set(names.map((n) => normalizeNameKey(n)));
    const roots = scope && scope.length > 0 ? scope : [figma.root];
    const nodes = [];
    for (const root of roots) {
      const found = root.findAll ? root.findAll((n) => n.type === "TEXT") : [];
      nodes.push(...found);
    }
    return nodes.filter((n) => wanted.has(normalizeNameKey(n.name || "")));
  }
  function findNodesByNameAny(names, scope = null) {
    const wanted = new Set(names.map((n) => normalizeNameKey(n)));
    const roots = scope && scope.length > 0 ? scope : [figma.root];
    const nodes = [];
    for (const root of roots) {
      const found = root.findAll ? root.findAll((n) => wanted.has(normalizeNameKey(n.name || ""))) : [];
      nodes.push(...found);
    }
    return nodes;
  }
  function isBoxInfoMap(infoMap, groups) {
    if (groups.some((group) => group.cardType === "box")) return true;
    return Object.values(infoMap || {}).some(
      (entry) => !!String((entry == null ? void 0 : entry.multiplicity) || (entry == null ? void 0 : entry.boxQty) || (entry == null ? void 0 : entry.boxNotice) || "").trim()
    );
  }
  function buildCategoriesText(infoMap) {
    const counts = /* @__PURE__ */ new Map();
    for (const entry of Object.values(infoMap || {})) {
      const rawName = String((entry == null ? void 0 : entry.leafletName) || "").trim();
      if (!rawName) continue;
      const title = resolveMainCategory(rawName);
      const key = title.toLowerCase();
      const current = counts.get(key) || { title, count: 0 };
      current.count++;
      counts.set(key, current);
    }
    const allCategories = [...counts.values()].sort((a, b) => b.count - a.count || a.title.localeCompare(b.title, "ru")).map((item) => item.title);
    const categories = allCategories.slice(0, 4);
    if (allCategories.length > categories.length) categories.push("\u0434\u0440\u0443\u0433\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u044B");
    return joinRuList(categories);
  }
  function joinRuList(values) {
    if (values.length === 0) return "";
    if (values.length === 1) return values[0];
    if (values.length === 2) return `${values[0]} \u0438 ${values[1]}`;
    return `${values.slice(0, -1).join(", ")} \u0438 ${values[values.length - 1]}`;
  }
  function buildRoundedProductsText(groups) {
    const count = Array.isArray(groups) ? groups.length : 0;
    if (count <= 0) return "";
    const rounded = Math.floor(count / 10) * 10;
    if (rounded < 10) return `${count} \u0430\u043A\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0442\u043E\u0432\u0430\u0440\u043E\u0432`;
    return `\u0431\u043E\u043B\u0435\u0435 ${rounded} \u0430\u043A\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0442\u043E\u0432\u0430\u0440\u043E\u0432`;
  }
  function getMaxDiscount(infoMap) {
    var _a;
    let max = null;
    for (const entry of Object.values(infoMap || {})) {
      const item = entry;
      const val = (_a = calculateBoxDiscountPercent(item == null ? void 0 : item.price, item == null ? void 0 : item.boxPrice)) != null ? _a : parseDiscountValue(String((item == null ? void 0 : item.discount) || ""));
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

  // src/app/adPlaceholders.ts
  async function appendAdPlaceholderIfRoom(column, pageNum, getRemainingHeight2, nextCardHeight, nearFitTolerance = 0) {
    const remainingH = Math.floor(getRemainingHeight2(column));
    if (remainingH < CONFIG.AD_PLACEHOLDER_MIN_H) return null;
    if (Number.isFinite(nextCardHeight) && nextCardHeight - remainingH <= nearFitTolerance) return null;
    const width = Math.round(column.width);
    const height = remainingH;
    const placeholder = figma.createFrame();
    placeholder.name = `Ad_${width}x${height}_Page${String(pageNum).padStart(2, "0")}`;
    placeholder.resize(column.width, remainingH);
    placeholder.fills = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
    placeholder.strokes = [{ type: "SOLID", color: { r: 0.72, g: 0.72, b: 0.72 } }];
    placeholder.strokeWeight = 1;
    placeholder.dashPattern = [6, 4];
    placeholder.cornerRadius = 0;
    placeholder.clipsContent = false;
    const text = figma.createText();
    await loadFontCached({ family: "Inter", style: "Bold" });
    text.fontName = { family: "Inter", style: "Bold" };
    text.characters = `\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0439 \u0431\u0430\u043D\u043D\u0435\u0440 \u0441\u044E\u0434\u0430
${width} x ${height}`;
    text.fontSize = 16;
    text.textAlignHorizontal = "CENTER";
    text.textAlignVertical = "CENTER";
    text.resize(placeholder.width - 24, Math.min(96, placeholder.height));
    safeSetPosition2(text, 12, Math.round((placeholder.height - text.height) / 2), "ad text");
    text.fills = [{ type: "SOLID", color: { r: 0.42, g: 0.42, b: 0.42 } }];
    placeholder.appendChild(text);
    if (column.layoutMode !== "NONE") {
      placeholder.layoutAlign = "STRETCH";
    }
    column.appendChild(placeholder);
    return `\u0441\u0442\u0440 ${pageNum}: ${width}x${height}`;
  }
  function safeSetPosition2(node, x, y, label) {
    var _a;
    if (((_a = node.parent) == null ? void 0 : _a.type) === "INSTANCE") {
      figma.ui.postMessage({
        type: "log",
        text: `\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u044B \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B ${label}: \u0441\u043B\u043E\u0439 \u0432\u043D\u0443\u0442\u0440\u0438 instance`
      });
      return;
    }
    try {
      node.x = x;
      node.y = y;
    } catch (err) {
      figma.ui.postMessage({
        type: "log",
        text: `\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B ${label}: ${String((err == null ? void 0 : err.message) || err)}`
      });
    }
  }
  async function appendPageAdPlaceholder(page, pageNum, x, y, width, height) {
    const safeHeight = Math.floor(height);
    if (safeHeight < CONFIG.AD_PLACEHOLDER_MIN_H) return null;
    const safeWidth = Math.floor(width || A4_W - PAD_X * 2);
    const placeholder = figma.createFrame();
    placeholder.name = `Ad_${safeWidth}x${safeHeight}_Page${String(pageNum).padStart(2, "0")}`;
    placeholder.resize(safeWidth, safeHeight);
    placeholder.fills = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
    placeholder.strokes = [{ type: "SOLID", color: { r: 0.72, g: 0.72, b: 0.72 } }];
    placeholder.strokeWeight = 1;
    placeholder.dashPattern = [6, 4];
    placeholder.cornerRadius = 0;
    placeholder.clipsContent = false;
    const text = figma.createText();
    await loadFontCached({ family: "Inter", style: "Bold" });
    text.fontName = { family: "Inter", style: "Bold" };
    text.characters = `\u0420\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0439 \u0431\u0430\u043D\u043D\u0435\u0440 \u0441\u044E\u0434\u0430
${safeWidth} x ${safeHeight}`;
    text.fontSize = 16;
    text.textAlignHorizontal = "CENTER";
    text.textAlignVertical = "CENTER";
    text.resize(Math.max(1, safeWidth - 24), Math.min(96, safeHeight));
    safeSetPosition2(text, 12, Math.round((safeHeight - text.height) / 2), "page ad text");
    text.fills = [{ type: "SOLID", color: { r: 0.42, g: 0.42, b: 0.42 } }];
    placeholder.appendChild(text);
    page.appendChild(placeholder);
    safeSetPosition2(placeholder, Math.round(x), Math.round(y), "page ad");
    return `\u0441\u0442\u0440 ${pageNum}: ${safeWidth}x${safeHeight}`;
  }

  // src/app/runLog.ts
  var LOG_PAGE_NAME = "\u041F\u043E\u043B\u0438\u0442\u0435\u0445 \u0412\u0435\u0440\u0441\u0442\u0430\u043B\u044C\u0449\u0438\u043A - \u043B\u043E\u0433";
  async function writeRunLogPage(report) {
    const page = getOrCreateLogPage();
    clearPage(page);
    const frame = figma.createFrame();
    frame.name = `\u041B\u043E\u0433 ${formatDate(/* @__PURE__ */ new Date())}`;
    safeSetPosition3(frame, 0, 0, "log frame");
    frame.resize(900, 1200);
    frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    page.appendChild(frame);
    const text = figma.createText();
    await loadFontCached({ family: "Inter", style: "Regular" });
    text.fontName = { family: "Inter", style: "Regular" };
    text.fontSize = 16;
    text.lineHeight = { unit: "PIXELS", value: 24 };
    text.characters = buildLogText(report);
    safeSetPosition3(text, 32, 32, "log text");
    text.resize(820, 1100);
    text.fills = [{ type: "SOLID", color: { r: 0.12, g: 0.12, b: 0.12 } }];
    frame.appendChild(text);
  }
  function safeSetPosition3(node, x, y, label) {
    var _a;
    if (((_a = node.parent) == null ? void 0 : _a.type) === "INSTANCE") {
      figma.ui.postMessage({
        type: "log",
        text: `\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u044B \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B ${label}: \u0441\u043B\u043E\u0439 \u0432\u043D\u0443\u0442\u0440\u0438 instance`
      });
      return;
    }
    try {
      node.x = x;
      node.y = y;
    } catch (err) {
      figma.ui.postMessage({
        type: "log",
        text: `\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B ${label}: ${String((err == null ? void 0 : err.message) || err)}`
      });
    }
  }
  function getOrCreateLogPage() {
    const existing = figma.root.children.find((page2) => page2.name === LOG_PAGE_NAME);
    if (existing) return existing;
    const page = figma.createPage();
    page.name = LOG_PAGE_NAME;
    return page;
  }
  function clearPage(page) {
    for (const child of [...page.children]) {
      child.remove();
    }
  }
  function buildLogText(report) {
    var _a, _b, _c;
    const lines = [
      "\u041F\u043E\u043B\u0438\u0442\u0435\u0445 \u0412\u0435\u0440\u0441\u0442\u0430\u043B\u044C\u0449\u0438\u043A",
      `\u041B\u043E\u0433 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438: ${formatDate(/* @__PURE__ */ new Date())}`,
      "",
      `\u0421\u0442\u0440\u0430\u043D\u0438\u0446: ${report.pages || 0}`,
      `\u041B\u0438\u0441\u0442\u043E\u0432\u043E\u043A: ${report.leaflets || 0}`,
      `\u041F\u0435\u0440\u0435\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0439: ${report.overflowCount || 0}`,
      `\u041F\u0443\u0441\u0442\u044B\u0445 \u0441\u0442\u0440\u0430\u043D\u0438\u0446 \u0443\u0434\u0430\u043B\u0435\u043D\u043E: ${report.emptyPagesRemoved || 0}`,
      `\u0424\u043E\u0442\u043E: ${formatMs((_a = report.uiStats) == null ? void 0 : _a.imageFetchMs)}`,
      `\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 UI: ${formatMs((_b = report.uiStats) == null ? void 0 : _b.payloadMs)}`,
      `UI \u0432\u0441\u0435\u0433\u043E: ${formatMs((_c = report.uiStats) == null ? void 0 : _c.totalUiMs)}`,
      `Figma-\u0432\u0435\u0440\u0441\u0442\u043A\u0430: ${formatMs(report.figmaMs)}`,
      `\u041F\u043E\u043B\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F: ${formatMs(report.totalMs)}`,
      "",
      "\u0417\u0430\u043F\u0443\u0441\u043A\u0438:"
    ];
    for (const run of report.runs || []) {
      lines.push(
        `- ${run.title || "\u041B\u0438\u0441\u0442\u043E\u0432\u043A\u0430"}: ${run.pages || 0} \u0441\u0442\u0440., ${run.products || 0} \u0442\u043E\u0432\u0430\u0440\u043E\u0432, \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0445 \u043C\u0435\u0441\u0442 ${run.adPlaceholders || 0}, \u043E\u0448\u0438\u0431\u043E\u043A \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A ${run.cardErrors || 0}, \u0432\u0435\u0440\u0441\u0442\u043A\u0430 ${formatMs(run.layoutMs)}`
      );
      if (Array.isArray(run.adSizes) && run.adSizes.length > 0) {
        lines.push(`  \u0420\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0435 \u043C\u0435\u0441\u0442\u0430: ${run.adSizes.join("; ")}`);
      }
    }
    return lines.join("\n");
  }
  function formatMs(value) {
    if (!Number.isFinite(value || NaN)) return "0\u043C\u0441";
    const ms = Math.round(value || 0);
    return ms >= 1e3 ? `${(ms / 1e3).toFixed(1)}\u0441` : `${ms}\u043C\u0441`;
  }
  function formatDate(date) {
    return date.toLocaleString("ru-RU");
  }

  // src/app/giftBlock.ts
  var LOCAL_GIFT_COMPONENT_NAME = "Ptech Gift Block Common";
  var COMPONENTS_PAGE_NAME = "\u041F\u043E\u043B\u0438\u0442\u0435\u0445 \u0412\u0435\u0440\u0441\u0442\u0430\u043B\u044C\u0449\u0438\u043A - \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u044B";
  async function addCommonGiftBlockToPage(page, topY) {
    const localComponent = await getOrCreateCommonGiftComponent();
    if (!localComponent) return topY;
    const instance = localComponent.createInstance();
    page.appendChild(instance);
    safeSetPosition4(instance, Math.round((A4_W - instance.width) / 2), Math.round(topY), "gift block");
    return instance.y + instance.height;
  }
  async function getOrCreateCommonGiftComponent() {
    const existing = figma.root.findOne(
      (node) => node.type === "COMPONENT" && node.name === LOCAL_GIFT_COMPONENT_NAME
    );
    if (existing) return existing;
    const source = await getComponentByKey(KEY_GIFT_BLOCK_COMMON);
    if (!source) {
      figma.ui.postMessage({ type: "log", text: "Gift block component not found" });
      return null;
    }
    const storagePage = getOrCreateComponentsPage();
    const importedInstance = source.createInstance();
    storagePage.appendChild(importedInstance);
    safeSetPosition4(importedInstance, 0, getNextStorageY(storagePage), "gift block source");
    const detached = importedInstance.detachInstance();
    detached.name = LOCAL_GIFT_COMPONENT_NAME;
    const localComponent = figma.createComponentFromNode(detached);
    localComponent.name = LOCAL_GIFT_COMPONENT_NAME;
    return localComponent;
  }
  function safeSetPosition4(node, x, y, label) {
    var _a;
    if (((_a = node.parent) == null ? void 0 : _a.type) === "INSTANCE") {
      figma.ui.postMessage({ type: "log", text: `\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u044B \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B ${label}: \u0441\u043B\u043E\u0439 \u0432\u043D\u0443\u0442\u0440\u0438 instance` });
      return;
    }
    try {
      node.x = x;
      node.y = y;
    } catch (err) {
      figma.ui.postMessage({
        type: "log",
        text: `\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B ${label}: ${String((err == null ? void 0 : err.message) || err)}`
      });
    }
  }
  function getOrCreateComponentsPage() {
    const existing = figma.root.children.find((page2) => page2.name === COMPONENTS_PAGE_NAME);
    if (existing) return existing;
    const page = figma.createPage();
    page.name = COMPONENTS_PAGE_NAME;
    return page;
  }
  function getNextStorageY(page) {
    let bottom = 0;
    for (const child of page.children) {
      bottom = Math.max(bottom, child.y + child.height);
    }
    return bottom + 80;
  }

  // src/app/layout.ts
  function calculatePackedContentHeight(col) {
    const layoutChildren = getLayoutChildren(col);
    let h = 0;
    layoutChildren.forEach((child) => {
      h += child.height;
    });
    if (layoutChildren.length > 0) h += (layoutChildren.length - 1) * ITEM_GAP;
    return h;
  }
  function getPackedRemainingHeight(col) {
    const gap = getLayoutChildren(col).length > 0 ? ITEM_GAP : 0;
    return col.height - calculatePackedContentHeight(col) - gap;
  }
  function canFitPacked(col, itemH, tolerance = 0) {
    return getPackedRemainingHeight(col) + tolerance >= itemH;
  }
  function getLayoutChildren(col) {
    return col.children.filter((child) => !/^Ad_\d+x\d+_Page\d+/i.test(child.name || ""));
  }
  function createBlankPage(num) {
    const page = figma.createFrame();
    page.name = `\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ${num}`;
    page.resize(A4_W, A4_H);
    safeSetPosition5(page, (num - 1) * (A4_W + 50), page.y, "blank page");
    page.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    page.clipsContent = false;
    return page;
  }
  async function addFooterToPage(page) {
    if (CONFIG.FOOTER_ENABLED === false) return;
    if (!canAppendPageChild(page, "footer")) return;
    const footerComp = await getComponentByKey(KEY_FOOTER);
    if (!footerComp) return;
    const footerInstance = footerComp.createInstance();
    if (!safeAppendChild2(page, footerInstance, "footer")) return;
    safeSetPosition5(footerInstance, 0, Math.max(0, A4_H - FOOTER_H), "footer");
  }
  async function addPaginatorToPage(page, title, pageNumber) {
    if (CONFIG.PAGINATOR_ENABLED === false) return;
    if (isFirstDocumentPage(page)) return;
    if (!canAppendPageChild(page, "paginator")) return;
    const paginatorComp = await getPaginatorComponent();
    if (!paginatorComp) {
      postLog2("Paginator component not found");
      return;
    }
    const paginator = paginatorComp.createInstance();
    if (!safeAppendChild2(page, paginator, "paginator")) return;
    safeSetPosition5(paginator, 0, 0, "paginator");
    resizePaginatorToPageWidth(paginator);
    await setPaginatorText(paginator, "pageTitle", title);
    await setPaginatorText(paginator, "pageCounter", `\u0441\u0442\u0440. ${pageNumber}`);
  }
  function safeAppendChild2(parent, child, label) {
    try {
      parent.appendChild(child);
      return true;
    } catch (err) {
      try {
        child.remove();
      } catch (e) {
      }
      postLog2(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C ${label} \u0432 ${parent.name}: ${String((err == null ? void 0 : err.message) || err)}`);
      return false;
    }
  }
  function canAppendPageChild(page, label) {
    var _a;
    if (((_a = page.parent) == null ? void 0 : _a.type) !== "PAGE") {
      postLog2(`\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D ${label}: ${page.name} \u043D\u0435 \u0432\u0435\u0440\u0445\u043D\u0435\u0443\u0440\u043E\u0432\u043D\u0435\u0432\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430`);
      return false;
    }
    if (Math.abs(page.width - A4_W) > 2 || Math.abs(page.height - A4_H) > 2) {
      postLog2(`\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D ${label}: ${page.name} \u043D\u0435 \u043F\u043E\u0445\u043E\u0436\u0430 \u043D\u0430 A4`);
      return false;
    }
    return true;
  }
  function safeSetPosition5(node, x, y, label) {
    var _a;
    if (((_a = node.parent) == null ? void 0 : _a.type) === "INSTANCE") {
      postLog2(`\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u044B \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B ${label}: \u0441\u043B\u043E\u0439 \u0432\u043D\u0443\u0442\u0440\u0438 instance`);
      return;
    }
    try {
      node.x = x;
      node.y = y;
    } catch (err) {
      postLog2(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B ${label}: ${String((err == null ? void 0 : err.message) || err)}`);
    }
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
  function applyFooterHeightToColumns(page, reservedBottom = FOOTER_H) {
    const footerTop = A4_H - reservedBottom;
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
      const colMaxH = activeColumn.height;
      if (!canFitPacked(activeColumn, cardFrame.height) && activeColumn.children.length > 0) {
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
  function relocateOverflowForFooter(lastPage, pageNum, reservedBottom = FOOTER_H) {
    const footerTop = A4_H - reservedBottom;
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
          const remainingH = maxH - calculatePackedContentHeight(col) - (col.children.length > 0 ? ITEM_GAP : 0);
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
    applyFooterHeightToColumns(currentLast, reservedBottom);
    return { lastPage: currentLast, pageNum: currentPageNum };
  }
  function createPageWithColumns(num, shiftTopPx) {
    const page = figma.createFrame();
    page.name = `\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ${num}`;
    page.resize(A4_W, A4_H);
    safeSetPosition5(page, (num - 1) * (A4_W + 50), page.y, "page");
    page.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    page.clipsContent = false;
    const leftCol = figma.createFrame();
    leftCol.name = "Left Column";
    leftCol.clipsContent = false;
    setupColumnStyle(leftCol, shiftTopPx);
    safeSetPosition5(leftCol, PAD_X, PAD_Y + shiftTopPx, "left column");
    page.appendChild(leftCol);
    const rightCol = figma.createFrame();
    rightCol.name = "Right Column";
    rightCol.clipsContent = false;
    setupColumnStyle(rightCol, shiftTopPx);
    safeSetPosition5(rightCol, PAD_X + COL_W + COL_GAP, PAD_Y + shiftTopPx, "right column");
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
  var FIT_HEIGHT_TOLERANCE = 6;
  var BRAND_COVER_COLOR = { r: 0.76, g: 0.02, b: 0.14 };
  async function createBrochure(groups, layout, opts) {
    var _a;
    const startedAt = Date.now();
    const masters = await loadBrochureMasters();
    const splitMetrics = {
      minCardHeight: CONFIG.MIN_CARD_HEIGHT,
      baseRows: CONFIG.BASE_CARD_ROWS,
      rowGrowth: CONFIG.ESTIMATED_ROW_HEIGHT
    };
    const runs = buildBrochureRuns(groups, layout);
    await prepareDocumentCoverPage();
    const state = { pageNum: 0, lastPage: null, pagesByNumber: /* @__PURE__ */ new Map() };
    const totalGroups = runs.reduce((sum, run) => sum + run.groups.length, 0);
    const reports = [];
    let processedGroups = 0;
    for (let runIndex = 0; runIndex < runs.length; runIndex++) {
      const run = runs[runIndex];
      const runStartedAt = Date.now();
      ensureNotCancelled(opts);
      if (run.groups.length === 0) continue;
      await activateRunFigmaPage(run, runIndex);
      const report2 = await layoutBrochureRun(run, runIndex, layout, masters, splitMetrics, state, opts, (count) => {
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
      report2.layoutMs = Date.now() - runStartedAt;
      reports.push(report2);
    }
    const emptyPagesRemoved = cleanupTrailingEmptyPages(state);
    const overflowCount = countOverflowNodes([...state.pagesByNumber.values()]);
    const report = {
      pages: state.pageNum,
      leaflets: reports.length,
      overflowCount,
      emptyPagesRemoved,
      figmaMs: Date.now() - startedAt,
      totalMs: (Number((_a = layout == null ? void 0 : layout.uiStats) == null ? void 0 : _a.totalUiMs) || 0) + (Date.now() - startedAt),
      uiStats: (layout == null ? void 0 : layout.uiStats) || null,
      runs: reports
    };
    await writeRunLogPage(report);
    figma.ui.postMessage({ type: "complete", text: buildCompleteText(reports, state.pageNum), report });
  }
  async function activateRunFigmaPage(run, runIndex) {
    if (run.useCurrentFigmaPage && runIndex === 0) return;
    const pageName = normalizePageTitle(run.title);
    const page = figma.createPage();
    page.name = pageName;
    await figma.setCurrentPageAsync(page);
  }
  async function prepareDocumentCoverPage() {
    const coverPage = figma.root.children[0] || figma.currentPage;
    coverPage.name = "COVER";
    await figma.setCurrentPageAsync(coverPage);
    try {
      coverPage.backgrounds = [{ type: "SOLID", color: BRAND_COVER_COLOR }];
    } catch (e) {
    }
    for (const child of [...coverPage.children]) {
      if (child.name === "COVER" || child.name === "Cover Title") {
        child.remove();
      }
    }
    const cover = figma.createFrame();
    cover.name = "COVER";
    cover.resize(A4_W, A4_H);
    cover.fills = [{ type: "SOLID", color: BRAND_COVER_COLOR }];
    cover.clipsContent = false;
    safeSetPosition6(cover, 0, 0, "cover frame");
    const title = figma.createText();
    await loadFontCached({ family: "Inter", style: "Bold" });
    title.fontName = { family: "Inter", style: "Bold" };
    title.name = "Cover Title";
    title.characters = `\u0410\u043A\u0446\u0438\u044F ${getNextPromoMonthTitle()}`;
    title.fontSize = 52;
    title.textAlignHorizontal = "CENTER";
    title.textAlignVertical = "CENTER";
    title.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    title.resize(A4_W - 80, 96);
    safeSetPosition6(title, 40, Math.round((A4_H - title.height) / 2), "cover title");
    cover.appendChild(title);
    coverPage.appendChild(cover);
  }
  async function loadBrochureMasters() {
    let rowMaster = figma.root.findOne((n) => n.type === "COMPONENT" && n.name === "RowItem");
    let cardMaster = figma.root.findOne((n) => n.type === "COMPONENT" && n.name === "ProductCard");
    const cardFromKey = await getComponentByKey(KEY_PRODUCT_CARD);
    if (cardFromKey) cardMaster = cardFromKey;
    const boxCardMaster = await getComponentByKey(KEY_PRODUCT_BOX_CARD);
    const boxNoticeTopMaster = await getComponentByKey(KEY_BOX_NOTICE_TOP);
    const boxNoticeBottomMaster = await getComponentByKey(KEY_BOX_NOTICE_BOTTOM);
    const rowFromKey = await getComponentByKey(KEY_ROW_ITEM);
    if (rowFromKey) rowMaster = rowFromKey;
    const boxRowMaster = await getComponentByKey(KEY_ROW_ITEM_BOX);
    if (!rowMaster || rowMaster.removed) {
      rowMaster = await getComponentByKey(KEY_ROW_ITEM);
    }
    if (!cardMaster || cardMaster.removed) {
      cardMaster = await getComponentByKey(KEY_PRODUCT_CARD);
    }
    if (!rowMaster) throw new Error("\u041D\u0435\u0442 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430 RowItem");
    if (!cardMaster) throw new Error("\u041D\u0435\u0442 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430 ProductCard");
    return { cardMaster, boxCardMaster, rowMaster, boxRowMaster, boxNoticeTopMaster, boxNoticeBottomMaster };
  }
  function buildBrochureRuns(groups, layout) {
    if (Array.isArray(layout.runs) && layout.runs.length > 0) {
      return layout.runs.filter((run) => Array.isArray(run.groups) && run.groups.length > 0).map((run, index) => {
        const box = hasBoxGroups(run.groups);
        const fixed = run.promoType === "fixed";
        return {
          title: normalizeLeafletName(run.title) || `\u041B\u0438\u0441\u0442\u043E\u0432\u043A\u0430 ${index + 1}`,
          groups: run.groups,
          orderList: Array.isArray(run.orderList) ? run.orderList : [],
          infoMap: run.infoMap || {},
          promoType: run.promoType,
          useCoverShift: !box && !fixed,
          addBanner: true,
          useCurrentFigmaPage: false
        };
      });
    }
    if (hasBoxGroups(groups)) {
      return [{
        title: "\u041A\u043E\u0440\u043E\u0431\u043E\u0447\u043D\u0430\u044F \u0430\u043A\u0446\u0438\u044F",
        groups,
        useCoverShift: false,
        addBanner: true,
        useCurrentFigmaPage: false
      }];
    }
    const hasLeaflets = groups.some((group) => !!normalizeLeafletName(group.leafletName));
    if (!hasLeaflets) {
      return [{ title: normalizeLeafletName(layout.mainTitle) || "\u041A\u0430\u0442\u0430\u043B\u043E\u0433", groups, useCoverShift: true, addBanner: true }];
    }
    const runs = [
      { title: normalizeLeafletName(layout.mainTitle) || "\u041E\u0431\u0449\u0430\u044F \u043B\u0438\u0441\u0442\u043E\u0432\u043A\u0430", groups, useCoverShift: true, addBanner: true }
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
    if (byLeaflet.size > 1) {
      for (const entry of byLeaflet.values()) {
        runs.push({ title: entry.title, groups: entry.groups, useCoverShift: true, addBanner: true });
      }
    }
    return runs;
  }
  async function layoutBrochureRun(run, runIndex, layout, masters, splitMetrics, state, opts, onProgress) {
    const startPageNum = state.pageNum + 1;
    const giftBlockEnabled = (layout == null ? void 0 : layout.giftBlockEnabled) !== false;
    const orderList = Array.isArray(run.orderList) ? run.orderList : Array.isArray(layout == null ? void 0 : layout.orderList) ? layout.orderList : [];
    const strategy = getRunStrategy(run.groups);
    const boxMode = strategy.boxMode;
    const isCommonPromo = run.promoType === "common" || !run.promoType && !strategy.boxMode;
    const startOnSecondPage = isCommonPromo && !strategy.boxMode && run.useCoverShift && giftBlockEnabled;
    const firstPageShift = run.useCoverShift ? resolveShiftPx(giftBlockEnabled ? 0 : CONFIG.FIRST_PAGE_SHIFT_DEFAULT) : 0;
    if (startOnSecondPage) {
      state.pageNum++;
      const blank = createBlankPage(state.pageNum);
      registerPage(state, state.pageNum, blank);
      nameRunPage(blank, run.title, 1);
      positionPageInRun(blank, runIndex, 1);
      let coverBottom = 0;
      if (run.addBanner) {
        coverBottom = await addBannerToPage(blank, run.infoMap || layout.infoMap || {}, run.groups, run.promoType);
      }
      if (isCommonPromo) {
        await addCommonGiftBlockToPage(blank, coverBottom);
      }
      if (strategy.addTopBoxNotice) {
        await addBoxNoticeToPage(blank, masters.boxNoticeTopMaster, "top");
      }
      if (strategy.addPaginator) {
        await addPaginatorToPage(blank, run.title, 1);
      }
    }
    let localPageNum = startOnSecondPage ? 2 : 1;
    state.pageNum++;
    let currentLayout = createPageWithColumns(state.pageNum, boxMode ? 0 : run.useCoverShift ? firstPageShift : 0);
    registerPage(state, state.pageNum, currentLayout.page);
    nameRunPage(currentLayout.page, run.title, localPageNum);
    positionPageInRun(currentLayout.page, runIndex, localPageNum);
    state.lastPage = currentLayout.page;
    if (run.addBanner && !startOnSecondPage) {
      const bannerBottom = await addBannerToPage(currentLayout.page, run.infoMap || layout.infoMap || {}, run.groups, run.promoType);
      if (strategy.addTopBoxNotice) {
        const noticeBottom = await addBoxNoticeToPage(currentLayout.page, masters.boxNoticeTopMaster, "top", bannerBottom);
        shiftColumnsBelowHeader(currentLayout.columns, Math.max(bannerBottom, noticeBottom));
      }
    }
    if (strategy.addPaginator) {
      await addPaginatorToPage(currentLayout.page, run.title, localPageNum);
    }
    let adPlaceholders = 0;
    const adSizes = [];
    let cardErrors = 0;
    let activeColIndex = 0;
    let activeColumn = currentLayout.columns[0];
    const orderedGroups = orderGroupsBySku(run.groups, orderList);
    for (const group of orderedGroups) {
      ensureNotCancelled(opts);
      const colMaxH = currentLayout.columns[0].height;
      let cardsToPlace = [];
      const groupCardMaster = getCardMasterForGroup(masters, group);
      const groupRowMaster = getRowMasterForGroup(masters, group);
      let cardFrame;
      try {
        cardFrame = await createProductCard(groupCardMaster, group, groupRowMaster);
      } catch (err) {
        cardErrors++;
        cardFrame = await createCardErrorPlaceholder(group, err);
      }
      if (cardFrame.height > colMaxH) {
        let doSplit = !!(opts == null ? void 0 : opts.autoSplit);
        if (!doSplit && (opts == null ? void 0 : opts.askSplit)) {
          doSplit = await opts.askSplit(cardFrame.name, cardFrame.height, colMaxH);
        }
        if (doSplit) {
          cardsToPlace = await buildSplitCards(groupCardMaster, groupRowMaster, group, colMaxH, colMaxH, splitMetrics);
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
        const previousColumn = activeColumn;
        const previousPageNum = state.pageNum;
        const hadContentBeforeCard = previousColumn.children.some((child) => !isAdPlaceholder(child));
        removeAdPlaceholdersFromColumn(activeColumn);
        if (hadContentBeforeCard && !canFitPacked(activeColumn, card.height, FIT_HEIGHT_TOLERANCE)) {
          if (activeColIndex === 0) {
            activeColIndex = 1;
            activeColumn = currentLayout.columns[1];
          } else {
            currentLayout = await createNextPage(state, run.title, ++localPageNum, runIndex, strategy.addPaginator);
            activeColIndex = 0;
            activeColumn = currentLayout.columns[0];
          }
          const adSize = await safeAppendAdPlaceholderIfRoom(
            previousColumn,
            previousPageNum,
            getRemainingHeight,
            card.height,
            FIT_HEIGHT_TOLERANCE
          );
          if (adSize) {
            adPlaceholders++;
            adSizes.push(adSize);
          }
        }
        activeColumn.appendChild(card);
        if (hadContentBeforeCard && isColumnPackedOverflow(activeColumn, FIT_HEIGHT_TOLERANCE)) {
          if (activeColIndex === 0) {
            activeColIndex = 1;
            activeColumn = currentLayout.columns[1];
          } else {
            currentLayout = await createNextPage(state, run.title, ++localPageNum, runIndex, strategy.addPaginator);
            activeColIndex = 0;
            activeColumn = currentLayout.columns[0];
          }
          activeColumn.appendChild(card);
        }
      }
      await onProgress(1);
    }
    balanceRunPagesColumns(state, startPageNum);
    if (rebalanceLonelyLastPageBeforeFooter(state)) {
      localPageNum--;
    }
    const footerAdSize = await finalizeRunFooter(
      state,
      run.title,
      runIndex,
      localPageNum,
      strategy.addBottomBoxNotice ? masters.boxNoticeBottomMaster : null,
      strategy.addPaginator
    );
    if (footerAdSize) {
      adPlaceholders++;
      adSizes.push(footerAdSize);
    }
    return {
      title: normalizePageTitle(run.title),
      pages: state.pageNum - startPageNum + 1,
      products: run.groups.length,
      adPlaceholders,
      adSizes,
      cardErrors
    };
  }
  function rebalanceLonelyLastPageBeforeFooter(state) {
    if (state.pageNum <= 1 || !state.lastPage) return false;
    const lastPage = state.lastPage;
    const previousPage = state.pagesByNumber.get(state.pageNum - 1);
    if (!previousPage) return false;
    const lastColumns = getPageColumns2(lastPage);
    const previousColumns = getPageColumns2(previousPage);
    if (lastColumns.length < 2 || previousColumns.length < 2) return false;
    const lastCards = [];
    for (const col of lastColumns) {
      lastCards.push(...col.children.filter(isProductLikeNode));
    }
    if (lastCards.length !== 1) return false;
    const previousRightColumn = previousColumns[1];
    const lastPreviousChild = previousRightColumn.children[previousRightColumn.children.length - 1];
    if (!lastPreviousChild || !isAdPlaceholder(lastPreviousChild)) return false;
    const card = lastCards[0];
    const availableWithoutAd = getRemainingHeight(previousRightColumn) + lastPreviousChild.height;
    if (card.height > availableWithoutAd + FIT_HEIGHT_TOLERANCE) return false;
    lastPreviousChild.remove();
    fitCardInColumn(previousRightColumn, card);
    previousRightColumn.appendChild(card);
    lastPage.remove();
    state.pagesByNumber.delete(state.pageNum);
    state.pageNum--;
    state.lastPage = previousPage;
    return true;
  }
  function getPageColumns2(page) {
    return page.children.filter(
      (child) => child.type === "FRAME" && /column/i.test(child.name || "")
    );
  }
  function balanceRunPagesColumns(state, startPageNum) {
    for (let pageNum = startPageNum; pageNum <= state.pageNum; pageNum++) {
      const page = state.pagesByNumber.get(pageNum);
      if (!page) continue;
      balancePageColumnsPreservingOrder(page);
    }
  }
  function balancePageColumnsPreservingOrder(page) {
    const columns = getPageColumns2(page);
    if (columns.length < 2) return false;
    const [left, right] = columns;
    let moved = false;
    for (let guard = 0; guard < 10; guard++) {
      const leftCards = left.children.filter(isProductLikeNode);
      if (leftCards.length < 2) break;
      const leftH = calculatePackedContentHeight(left);
      const rightH = calculatePackedContentHeight(right);
      if (leftH - rightH < 120) break;
      const card = leftCards[leftCards.length - 1];
      if (!canFitPacked(right, card.height, FIT_HEIGHT_TOLERANCE)) break;
      right.insertChild(0, card);
      moved = true;
    }
    return moved;
  }
  async function balanceSparseLastPageAndAddAd(page, pageNum, reservedBottom) {
    const columns = getPageColumns2(page);
    if (columns.length < 2) return null;
    const [left, right] = columns;
    const leftCards = left.children.filter(isProductLikeNode);
    const rightCards = right.children.filter(isProductLikeNode);
    if (leftCards.length < 2 || rightCards.length > 0) return null;
    if (page.children.some(isAdPlaceholder)) return null;
    const splitIndex = findBestLastPageSplit(leftCards);
    if (splitIndex <= 0 || splitIndex >= leftCards.length) return null;
    const cardsToMove = leftCards.slice(splitIndex);
    for (const card of cardsToMove) {
      right.appendChild(card);
    }
    const bottomY = shrinkColumnsToContent(columns);
    const footerTop = A4_H - reservedBottom;
    const adGap = 10;
    const adY = bottomY + adGap;
    const adHeight = footerTop - adY;
    return appendPageAdPlaceholder(
      page,
      pageNum,
      PAD_X,
      adY,
      A4_W - PAD_X * 2,
      adHeight
    );
  }
  async function safeAppendAdPlaceholderIfRoom(column, pageNum, getRemainingHeight2, nextCardHeight, nearFitTolerance = 0) {
    try {
      return await appendAdPlaceholderIfRoom(column, pageNum, getRemainingHeight2, nextCardHeight, nearFitTolerance);
    } catch (err) {
      logGenerationIssue(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0439 \u0431\u043B\u043E\u043A: ${String((err == null ? void 0 : err.message) || err)}`);
      return null;
    }
  }
  async function safeBalanceSparseLastPageAndAddAd(page, pageNum, reservedBottom) {
    try {
      return await balanceSparseLastPageAndAddAd(page, pageNum, reservedBottom);
    } catch (err) {
      logGenerationIssue(`\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0435\u0440\u0435\u0440\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u044E\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u043F\u043E\u0434 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0439 \u0431\u043B\u043E\u043A: ${String((err == null ? void 0 : err.message) || err)}`);
      return null;
    }
  }
  function logGenerationIssue(text) {
    figma.ui.postMessage({ type: "log", text });
  }
  function findBestLastPageSplit(cards) {
    let bestIndex = Math.ceil(cards.length / 2);
    let bestDiff = Number.POSITIVE_INFINITY;
    for (let split = 1; split < cards.length; split++) {
      const leftH = estimateStackHeight(cards.slice(0, split));
      const rightH = estimateStackHeight(cards.slice(split));
      const diff = Math.abs(leftH - rightH);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestIndex = split;
      }
    }
    return bestIndex;
  }
  function estimateStackHeight(nodes) {
    const content = nodes.reduce((sum, node) => sum + node.height, 0);
    return content + Math.max(0, nodes.length - 1) * CONFIG.ITEM_GAP;
  }
  function shrinkColumnsToContent(columns) {
    let maxBottom = 0;
    for (const col of columns) {
      const contentH = calculatePackedContentHeight(col);
      const nextH = Math.max(1, contentH);
      try {
        col.resize(col.width, nextH);
      } catch (e) {
      }
      maxBottom = Math.max(maxBottom, col.y + nextH);
    }
    return maxBottom;
  }
  function isProductLikeNode(node) {
    return /^Card/i.test(node.name || "");
  }
  function isAdPlaceholder(node) {
    return /^Ad_\d+x\d+_Page\d+/i.test(node.name || "");
  }
  function removeAdPlaceholdersFromColumn(column) {
    for (const child of [...column.children]) {
      if (isAdPlaceholder(child)) child.remove();
    }
  }
  function cleanupTrailingEmptyPages(state) {
    let removed = 0;
    while (state.pageNum > 0) {
      const page = state.pagesByNumber.get(state.pageNum);
      if (!page || !isEmptyGeneratedPage(page)) break;
      page.remove();
      state.pagesByNumber.delete(state.pageNum);
      state.pageNum--;
      state.lastPage = state.pagesByNumber.get(state.pageNum) || null;
      removed++;
    }
    return removed;
  }
  function isEmptyGeneratedPage(page) {
    for (const child of page.children) {
      if (child.type === "FRAME" && /column/i.test(child.name || "")) {
        if (child.children.length > 0) return false;
        continue;
      }
      return false;
    }
    return true;
  }
  function getRunStrategy(groups) {
    const boxMode = hasBoxGroups(groups);
    return {
      boxMode,
      addPaginator: !boxMode,
      addTopBoxNotice: boxMode,
      addBottomBoxNotice: boxMode
    };
  }
  async function finalizeRunFooter(state, title, runIndex, localPageNum, boxNoticeBottomMaster = null, addPaginators = true) {
    if (!state.lastPage) return null;
    if (CONFIG.FOOTER_ENABLED === false) return null;
    const beforeFooterPageNum = state.pageNum;
    const reservedBottom = CONFIG.FOOTER_H + (boxNoticeBottomMaster ? CONFIG.BOX_FOOTER_NOTICE_H : 0);
    const footerResult = relocateOverflowForFooter(state.lastPage, state.pageNum, reservedBottom);
    state.lastPage = footerResult.lastPage;
    state.pageNum = footerResult.pageNum;
    const footerAdSize = await safeBalanceSparseLastPageAndAddAd(state.lastPage, state.pageNum, reservedBottom);
    await addPaginatorsToRelocatedPages(
      state,
      beforeFooterPageNum + 1,
      state.pageNum,
      title,
      localPageNum + 1,
      runIndex,
      addPaginators
    );
    if (boxNoticeBottomMaster) {
      await addBoxNoticeToPage(state.lastPage, boxNoticeBottomMaster, "bottom");
    }
    await addFooterToPage(state.lastPage);
    return footerAdSize;
  }
  async function addPaginatorsToRelocatedPages(state, fromPageNum, toPageNum, title, startLocalPageNum, runIndex, addPaginator = true) {
    let localPageNum = startLocalPageNum;
    for (let pageNum = fromPageNum; pageNum <= toPageNum; pageNum++) {
      const page = state.pagesByNumber.get(pageNum) || findGeneratedPageByNumber(pageNum);
      if (!page) continue;
      registerPage(state, pageNum, page);
      nameRunPage(page, title, localPageNum);
      positionPageInRun(page, runIndex, localPageNum);
      if (addPaginator) {
        await addPaginatorToPage(page, title, localPageNum);
      }
      localPageNum++;
    }
  }
  async function createNextPage(state, title, localPageNum, runIndex, addPaginator = true) {
    state.pageNum++;
    const nextLayout = createPageWithColumns(state.pageNum, 0);
    registerPage(state, state.pageNum, nextLayout.page);
    nameRunPage(nextLayout.page, title, localPageNum);
    positionPageInRun(nextLayout.page, runIndex, localPageNum);
    state.lastPage = nextLayout.page;
    if (addPaginator) {
      await addPaginatorToPage(nextLayout.page, title, localPageNum);
    }
    return nextLayout;
  }
  function findGeneratedPageByNumber(pageNum) {
    return figma.root.findOne(
      (n) => n.type === "FRAME" && isTopLevelA4Page(n) && getPageNumberFromName(n.name || "") === pageNum
    );
  }
  function registerPage(state, pageNum, page) {
    if (!isTopLevelA4Page(page)) {
      const pageName = page.name || "\u0431\u0435\u0437 \u0438\u043C\u0435\u043D\u0438";
      figma.ui.postMessage({ type: "log", text: `\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0432\u043B\u043E\u0436\u0435\u043D\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B: ${pageName}` });
      return;
    }
    state.pagesByNumber.set(pageNum, page);
  }
  function isTopLevelA4Page(node) {
    var _a;
    if (node.type !== "FRAME") return false;
    if (((_a = node.parent) == null ? void 0 : _a.type) !== "PAGE") return false;
    return Math.abs(node.width - A4_W) <= 2 && Math.abs(node.height - A4_H) <= 2;
  }
  function getPageNumberFromName(name) {
    const match = /(\d+)$/.exec(name);
    if (!match) return null;
    const value = Number(match[1]);
    return Number.isFinite(value) ? value : null;
  }
  function positionPageInRun(page, runIndex, localPageNum) {
    safeSetPosition6(page, (localPageNum - 1) * (A4_W + 50), 0, "run page");
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
    await fillCardData(cardFrame, group, rowMaster);
    return cardFrame;
  }
  async function createCardErrorPlaceholder(group, err) {
    const frame = figma.createFrame();
    frame.name = group.mainSku ? `CardError${String(group.mainSku)}` : "CardError";
    frame.resize(COL_W, CONFIG.MIN_CARD_HEIGHT);
    frame.fills = [{ type: "SOLID", color: { r: 0.96, g: 0.92, b: 0.92 } }];
    frame.strokes = [{ type: "SOLID", color: { r: 0.75, g: 0.2, b: 0.2 } }];
    frame.strokeWeight = 1;
    const text = figma.createText();
    await loadFontCached({ family: "Inter", style: "Bold" });
    text.fontName = { family: "Inter", style: "Bold" };
    text.characters = `\u041E\u0448\u0438\u0431\u043A\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438
${group.mainSku || group.headerName || ""}`;
    text.fontSize = 14;
    text.textAlignHorizontal = "CENTER";
    text.textAlignVertical = "CENTER";
    text.resize(COL_W - 20, frame.height - 20);
    safeSetPosition6(text, 10, 10, "card error text");
    text.fills = [{ type: "SOLID", color: { r: 0.45, g: 0.08, b: 0.08 } }];
    frame.appendChild(text);
    figma.ui.postMessage({ type: "log", text: `\u041E\u0448\u0438\u0431\u043A\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 ${group.mainSku || group.headerName}: ${String((err == null ? void 0 : err.message) || err)}` });
    return frame;
  }
  function getCardMasterForGroup(masters, group) {
    if (group.cardType === "box" && masters.boxCardMaster) {
      return masters.boxCardMaster;
    }
    return masters.cardMaster;
  }
  function getRowMasterForGroup(masters, group) {
    if (group.cardType === "box" && masters.boxRowMaster) {
      return masters.boxRowMaster;
    }
    return masters.rowMaster;
  }
  function hasBoxGroups(groups) {
    return groups.some(
      (group) => group.cardType === "box" || !!group.multiplicityText || !!group.boxQtyText || !!group.boxNoticeText || (group.items || []).some((item) => !!item.multiplicity || !!item.boxQty || !!item.boxNotice)
    );
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
    return getPackedRemainingHeight(column);
  }
  function fitCardInColumn(column, card) {
    const remainingH = getPackedRemainingHeight(column);
    if (card.height > column.height && remainingH < MIN_REMAINING_FOR_SPLIT) {
      return false;
    }
    return canFitPacked(column, card.height, FIT_HEIGHT_TOLERANCE);
  }
  function isColumnPackedOverflow(column, tolerance = 0) {
    return calculatePackedContentHeight(column) > column.height + tolerance;
  }
  function normalizeLeafletName(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }
  function getNextPromoMonthTitle() {
    const now = /* @__PURE__ */ new Date();
    const target = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const monthIndex = target.getMonth();
    const months = [
      "\u042F\u043D\u0432\u0430\u0440\u044C",
      "\u0424\u0435\u0432\u0440\u0430\u043B\u044C",
      "\u041C\u0430\u0440\u0442",
      "\u0410\u043F\u0440\u0435\u043B\u044C",
      "\u041C\u0430\u0439",
      "\u0418\u044E\u043D\u044C",
      "\u0418\u044E\u043B\u044C",
      "\u0410\u0432\u0433\u0443\u0441\u0442",
      "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C",
      "\u041E\u043A\u0442\u044F\u0431\u0440\u044C",
      "\u041D\u043E\u044F\u0431\u0440\u044C",
      "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"
    ];
    return `${months[monthIndex]} ${target.getFullYear()}`;
  }
  function countOverflowNodes(pages) {
    let count = 0;
    for (const page of pages) {
      for (const child of page.children) {
        if (child.x < -0.5 || child.y < -0.5) {
          count++;
          continue;
        }
        if (child.x + child.width > page.width + 0.5 || child.y + child.height > page.height + 0.5) {
          count++;
        }
      }
    }
    return count;
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
  async function addBannerToPage(page, infoMap = {}, groups = [], promoType = "auto") {
    const bannerComp = await getComponentByKey(KEY_BANNER);
    if (!bannerComp) return 0;
    const bannerInstance = bannerComp.createInstance();
    page.appendChild(bannerInstance);
    safeSetPosition6(bannerInstance, 0, 0, "banner");
    await updateSaleBannerInfo(infoMap, groups, bannerInstance, promoType);
    return bannerInstance.y + bannerInstance.height;
  }
  async function addBoxNoticeToPage(page, noticeMaster, placement, topY) {
    if (!noticeMaster) return topY || 0;
    const notice = noticeMaster.createInstance();
    const targetHeight = placement === "top" ? CONFIG.BOX_HEADER_NOTICE_H : CONFIG.BOX_FOOTER_NOTICE_H;
    const targetWidth = placement === "top" ? CONFIG.BOX_HEADER_NOTICE_W : CONFIG.BOX_FOOTER_NOTICE_W || A4_W;
    const noticeX = Math.round((A4_W - targetWidth) / 2);
    resizeNotice(notice, targetWidth, targetHeight);
    let noticeY = 0;
    if (placement === "top") {
      const baseY = topY !== void 0 ? topY : page.children.reduce((max, child) => Math.max(max, child.y + child.height), 0);
      noticeY = baseY + CONFIG.BOX_HEADER_NOTICE_GAP_TOP;
    } else {
      noticeY = Math.max(0, A4_H - CONFIG.FOOTER_H - targetHeight);
    }
    page.appendChild(notice);
    safeSetPosition6(notice, noticeX, noticeY, `${placement} box notice`);
    return notice.y + targetHeight + (placement === "top" ? CONFIG.BOX_HEADER_NOTICE_GAP_BOTTOM : 0);
  }
  function safeSetPosition6(node, x, y, label) {
    var _a;
    if (((_a = node.parent) == null ? void 0 : _a.type) === "INSTANCE") {
      figma.ui.postMessage({ type: "log", text: `\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u044B \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B ${label}: \u0441\u043B\u043E\u0439 \u0432\u043D\u0443\u0442\u0440\u0438 instance` });
      return;
    }
    try {
      node.x = x;
      node.y = y;
    } catch (err) {
      figma.ui.postMessage({ type: "log", text: `\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B ${label}: ${String((err == null ? void 0 : err.message) || err)}` });
    }
  }
  function resizeNotice(notice, width, height) {
    try {
      notice.resizeWithoutConstraints(width, height);
    } catch (e) {
      try {
        notice.resize(width, height);
      } catch (e2) {
      }
    }
  }
  function shiftColumnsBelowHeader(columns, headerBottom) {
    const top = Math.max(0, headerBottom);
    for (const col of columns) {
      safeSetPosition6(col, col.x, top, "column below header");
      col.resize(col.width, Math.max(0, A4_H - top - CONFIG.PAD_Y));
    }
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
    let updatedBoxFields = 0;
    let missingCards = 0;
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
        missingCards++;
        continue;
      }
      foundCards += targetCards.length;
      for (const targetCard of targetCards) {
        const entry = infoMap[code] || {};
        const newDiscount = entry.discount;
        const discountLayer = findTextInNode(targetCard, CONFIG.DISCOUNT);
        const saleStarNode = findNodeInCard(targetCard, CONFIG.SALE_STAR);
        const discountInfoLayer = findTextInNode(targetCard, CONFIG.DISCOUNT_INFO);
        const discountInfoWrapper = findNodeInCard(targetCard, CONFIG.DISCOUNT_INFO);
        const surpriseLayer = findTextInNode(targetCard, CONFIG.SURPRISE);
        const surpriseWrapper = findNodeInCard(targetCard, CONFIG.SURPRISE_WRAPPER);
        const boxPriceLayer = findTextInNode(targetCard, CONFIG.BOX_PRICE);
        const boxQtyLayer = findTextInNode(targetCard, CONFIG.BOX_QTY);
        const boxNoticeLayer = findTextInNode(targetCard, CONFIG.BOX_NOTICE);
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
            if (discountInfoWrapper) discountInfoWrapper.visible = true;
          } else {
            discountInfoLayer.visible = false;
            if (discountInfoWrapper) discountInfoWrapper.visible = false;
          }
        } else if (discountInfoWrapper && !(entry.conditions && String(entry.conditions).trim())) {
          discountInfoWrapper.visible = false;
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
        if (await setOptionalText(boxPriceLayer, normalizePriceText(String(entry.boxPrice || entry.price || "")))) updatedBoxFields++;
        if (await setOptionalText(boxQtyLayer, normalizeMultiplicityText(String(entry.multiplicity || entry.boxQty || "")))) updatedBoxFields++;
        if (await setOptionalText(boxNoticeLayer, entry.boxNotice)) updatedBoxFields++;
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
    postLog3(`[update-info] foundCards: ${foundCards}, updatedDiscounts: ${updatedDiscounts}, updatedPrices: ${updatedPrices}, updatedBoxFields: ${updatedBoxFields}, missingCards: ${missingCards}`);
    await updateSaleBannerInfo(infoMap);
    if (foundCards === 0 && updatedPrices === 0) {
      figma.ui.postMessage({ type: "complete", text: "Cards not found." });
      return;
    }
    const parts = [
      `\u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u043D\u0430\u0439\u0434\u0435\u043D\u043E: ${foundCards}`,
      `\u0441\u043A\u0438\u0434\u043E\u043A: ${updatedDiscounts}`
    ];
    if (updatePrice) parts.push(`\u0446\u0435\u043D: ${updatedPrices}`);
    if (updatedBoxFields > 0) parts.push(`\u043A\u043E\u0440\u043E\u0431\u043E\u0447\u043D\u044B\u0445 \u043F\u043E\u043B\u0435\u0439: ${updatedBoxFields}`);
    if (missingCards > 0) parts.push(`\u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E: ${missingCards}`);
    const text = `\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0433\u043E\u0442\u043E\u0432\u043E: ${parts.join(", ")}`;
    figma.notify(text);
    figma.ui.postMessage({ type: "complete", text });
  }
  async function setOptionalText(node, value) {
    if (!node) return false;
    await loadFontForNode(node);
    const text = value ? String(value).trim() : "";
    const changed = node.characters !== text || node.visible !== (text !== "");
    node.characters = text;
    node.visible = text !== "";
    return changed;
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
        const shouldShow = rowDiscount !== null && (baseDiscount === null || !discountEquals(baseDiscount, rowDiscount));
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
        figma.ui.postMessage({ type: "google-csv-result", csv, gid, sheetName: msg.sheetName || "", requestId: msg.requestId || "" });
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
      ["ProductCardInBox", KEY_PRODUCT_BOX_CARD],
      ["RowItem", KEY_ROW_ITEM],
      ["RowItem4", KEY_ROW_ITEM_BOX],
      ["Footer", KEY_FOOTER],
      ["Paginator", KEY_PAGINATOR],
      ["BoxNoticeTop", KEY_BOX_NOTICE_TOP],
      ["BoxNoticeBottom", KEY_BOX_NOTICE_BOTTOM],
      ["GiftBlockCommon", KEY_GIFT_BLOCK_COMMON]
    ].filter(([, key]) => !!key);
    const results = [];
    for (const [name, key] of entries) {
      const component = await getComponentByKey(key);
      results.push({ name, ok: !!component });
      if (component) {
        for (const layerName of getExpectedLayersForComponent(name)) {
          results.push({
            name: `${name}/${layerName}`,
            ok: hasLayer(component, layerName)
          });
        }
      }
    }
    return results;
  }
  function getExpectedLayersForComponent(name) {
    const map = {
      Banner: ["#Title", "#Description"],
      ProductCard: ["#Image", "#Title", "#Description", "productDiscount", "#ListContainer"],
      ProductCardInBox: ["#Image", "#Title", "#Description", "productDiscount", "#ListContainer", "#PriceBox", "#QtyBox"],
      RowItem: ["#SKU", "#Specs", "#Min", "#Qty", "#Price", "priceProductDiscount"],
      RowItem4: ["#SKU", "#Specs", "#Min", "#Qty", "#PriceBox", "#QtyBox"],
      BoxNoticeTop: [],
      BoxNoticeBottom: []
    };
    return map[name] || [];
  }
  function hasLayer(root, layerName) {
    const target = normalizeNameKey(layerName);
    return !!root.findOne((node) => normalizeNameKey(node.name || "") === target);
  }
  async function loadFonts() {
    await loadFontCached({ family: "Inter", style: "Regular" });
    await loadFontCached({ family: "Inter", style: "Bold" });
  }
})();
