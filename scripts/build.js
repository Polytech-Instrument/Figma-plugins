const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const srcDir = path.join(root, 'src');
const distDir = path.join(root, 'dist');

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

esbuild.build({
  entryPoints: [path.join(srcDir, 'app', 'main.ts')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: ['es2017'],
  outfile: path.join(distDir, 'code.js'),
}).catch((e) => {
  console.error(e);
  process.exit(1);
});

for (const file of ['ui.html', 'manifest.json']) {
  const srcPath = path.join(srcDir, file);
  const outPath = path.join(distDir, file);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, outPath);
  }
}

