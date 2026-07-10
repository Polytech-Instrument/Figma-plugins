const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = process.cwd();
const srcDir = path.join(root, 'src');
const distDir = path.join(root, 'dist');
const pkg = require(path.join(root, 'package.json'));

async function main() {
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

  await esbuild.build({
    entryPoints: [path.join(srcDir, 'app', 'main.ts')],
    bundle: true,
    platform: 'browser',
    format: 'iife',
    target: ['es2017'],
    outfile: path.join(distDir, 'code.js'),
  });

  for (const file of ['ui.html', 'manifest.json']) {
    const srcPath = path.join(srcDir, file);
    const outPath = path.join(distDir, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, outPath);
    }
  }
  embedUiSupportScripts();
  embedProductCatalog();

  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\..+/, '').replace('T', '-');
  const productCount = getProductCatalogCount();
  const buildInfo = {
    name: pkg.name,
    version: pkg.version,
    builtAt: new Date().toISOString(),
    productCount,
    files: ['code.js', 'ui.html', 'manifest.json']
  };
  fs.writeFileSync(path.join(distDir, 'build-info.json'), JSON.stringify(buildInfo, null, 2));
  createZip(stamp);
}

function embedUiSupportScripts() {
  const uiPath = path.join(distDir, 'ui.html');
  const sharedEntry = path.join(srcDir, 'shared', 'index.ts');
  const sharedOut = path.join(distDir, 'ui-support.js');
  if (!fs.existsSync(uiPath) || !fs.existsSync(sharedEntry)) return;
  esbuild.buildSync({
    entryPoints: [sharedEntry],
    bundle: true,
    platform: 'browser',
    format: 'iife',
    target: ['es2017'],
    outfile: sharedOut
  });
  const ui = fs.readFileSync(uiPath, 'utf8');
  const support = fs.readFileSync(sharedOut, 'utf8');
  fs.rmSync(sharedOut, { force: true });
  const marker = '<script>';
  const injected = `<script>\n${support}\n</script>\n\n<script>`;
  const nextUi = ui.replace(marker, injected);
  if (nextUi === ui) {
    throw new Error('Failed to embed UI support scripts');
  }
  fs.writeFileSync(uiPath, nextUi);
}

function getProductCatalogCount() {
  const catalogPath = path.join(root, 'allProducts.json');
  if (!fs.existsSync(catalogPath)) return 0;
  const products = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  return Array.isArray(products) ? products.length : 0;
}

function embedProductCatalog() {
  const catalogPath = path.join(root, 'allProducts.json');
  const uiPath = path.join(distDir, 'ui.html');
  if (!fs.existsSync(catalogPath) || !fs.existsSync(uiPath)) return;
  const products = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const productJson = JSON.stringify(products);
  const ui = fs.readFileSync(uiPath, 'utf8');
  const nextUi = ui.replace('const EMBEDDED_PRODUCTS = [];', `const EMBEDDED_PRODUCTS = ${productJson};`);
  if (nextUi === ui) {
    throw new Error('Failed to embed product catalog into ui.html');
  }
  fs.writeFileSync(uiPath, nextUi);
}

function createZip(stamp) {
  const version = String(pkg.version || '0.0.0').replace(/[^0-9A-Za-z._-]/g, '_');
  const zipName = `dist-v${version}-${stamp}.zip`;
  for (const file of fs.readdirSync(distDir)) {
    if (/\.zip$/i.test(file)) fs.rmSync(path.join(distDir, file), { force: true });
  }
  const script = [
    '$ErrorActionPreference = "Stop"',
    'Compress-Archive -Path code.js,ui.html,manifest.json,build-info.json -DestinationPath dist.zip -Force',
    `Copy-Item -Path dist.zip -Destination ${JSON.stringify(zipName)} -Force`
  ].join('; ');
  const result = spawnSync('powershell', ['-NoProfile', '-Command', script], {
    cwd: distDir,
    stdio: 'inherit'
  });
  if (result.status !== 0) {
    throw new Error('Failed to create dist.zip');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
