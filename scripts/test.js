const assert = require('assert');
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const tmpShared = path.join(__dirname, '.shared-test.js');
esbuild.buildSync({
  entryPoints: [path.join(__dirname, '..', 'src', 'shared', 'index.ts')],
  bundle: true,
  platform: 'browser',
  format: 'iife',
  target: ['es2017'],
  outfile: tmpShared
});
require(tmpShared);
fs.rmSync(tmpShared, { force: true });

const csv = globalThis.PtechCsv;
const products = globalThis.PtechProducts;
const discounts = globalThis.PtechDiscounts;

function test(name, fn) {
  try {
    fn();
    console.log(`ok ${name}`);
  } catch (err) {
    console.error(`fail ${name}`);
    throw err;
  }
}

test('parses normal CSV with leaflet names case-insensitively available', () => {
  const text = [
    'Код\tНоменклатура\tСкидка без условий\tБазовая цена\tНазвание листовки',
    '1001\tТовар 1\t20%\t1234,5\tДоп',
    '1002\tТовар 2\t15\t2000\tдоп'
  ].join('\n');
  const info = csv.parseUpdateInfo(text);
  assert.strictEqual(info['1001'].discount, '20%');
  assert.strictEqual(info['1001'].leafletName, 'Доп');
  assert.strictEqual(info['1002'].leafletName.toLowerCase(), 'доп');
  assert.deepStrictEqual(csv.parseOrderList(text), ['1001', '1002']);
});

test('detects box columns', () => {
  const text = [
    'Код\tБазовая цена\tСпец цена\tКратность\tНазвание листовки',
    '2001\t1000\t850\t12\tКоробка'
  ].join('\n');
  const info = csv.parseUpdateInfo(text);
  const columns = csv.detectCsvColumns(text);
  assert.strictEqual(info['2001'].boxPrice, '850');
  assert.strictEqual(info['2001'].multiplicity, '12');
  assert.strictEqual(columns.boxPrice, 'спец цена');
  assert.strictEqual(columns.multiplicity, 'кратность');
});

test('detects duplicate sku rows', () => {
  const text = [
    'Код\tБазовая цена',
    '3001\t100',
    '3001\t120'
  ].join('\n');
  const info = csv.parseUpdateInfo(text);
  assert.deepStrictEqual(info.__duplicateSkus, ['3001']);
  assert.strictEqual(info['3001'].price, '120');
});

test('detects gift condition', () => {
  const text = [
    'Код\tУсловия\tСкидка без условий',
    '4001\tкаждая 12-я в подарок\t'
  ].join('\n');
  const info = csv.parseUpdateInfo(text);
  assert.strictEqual(info['4001'].surpriseText, 'каждая 12-я в подарок');
});

test('groups product variants by CSV order', () => {
  const json = [{
    id: 'p1',
    title: 'Перчатки',
    variants: [{ sku: '1001' }, { sku: '1002' }, { sku: '1003' }]
  }];
  const groups = products.selectGroupedProductsByOrder(json, ['1002', '1001', '1002', '1003', '9999']);
  assert.strictEqual(groups.length, 1);
  assert.deepStrictEqual(groups[0].variants.map(v => v.sku), ['1002', '1001', '1003']);
});

test('row discount visibility rules', () => {
  assert.strictEqual(discounts.shouldShowRowDiscount('20', '20'), false);
  assert.strictEqual(discounts.shouldShowRowDiscount('20', '15'), true);
  assert.strictEqual(discounts.shouldShowRowDiscount('', '15'), true);
  assert.strictEqual(discounts.shouldShowRowDiscount('', ''), false);
});

test('calculates box discount percent', () => {
  assert.strictEqual(discounts.calculateBoxDiscountPercent('1 000,00', '850,00'), 15);
  assert.strictEqual(discounts.calculateBoxDiscountPercent('1000', '1000'), null);
  assert.strictEqual(discounts.calculateBoxDiscountPercent('', '850'), null);
});

test('detects suspicious and invalid box prices', () => {
  assert.strictEqual(discounts.isSuspiciousBoxPrice('1000', '1200'), true);
  assert.strictEqual(discounts.isSuspiciousBoxPrice('1000', '999'), false);
  assert.strictEqual(discounts.isInvalidPrice('0'), true);
  assert.strictEqual(discounts.isInvalidPrice(''), true);
});

test('parses textual multiplicity for box rows', () => {
  const text = [
    'Код\tБазовая цена\tСпец цена\tКратность',
    '5001\t1000\t900\tкратно 12 шт'
  ].join('\n');
  const info = csv.parseUpdateInfo(text);
  assert.strictEqual(info['5001'].multiplicity, 'кратно 12 шт');
  assert.strictEqual(discounts.calculateBoxDiscountPercent(info['5001'].price, info['5001'].boxPrice), 10);
});
