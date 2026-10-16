import { createRequire } from 'node:module';
const require = createRequire('/workspace/cloud-setup/animation/package.json');
const { chromium } = require('@playwright/test');
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
const [input, output, duration = '1', fps = '30'] = process.argv.slice(2);
if (!input || !output || !(+duration > 0) || !(+fps > 0)) throw Error('Usage: node render.mjs anim.html output-directory [seconds=1] [fps=30]');
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true });
const root = path.dirname(path.resolve(input));
const server = http.createServer((req, res) => {
  const target = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (!target.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(target, (err, data) => {
    if (err) { res.writeHead(404).end(); return; }
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' };
    res.setHeader('Content-Type', types[path.extname(target)] || 'application/octet-stream');
    res.end(data);
  });
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
try {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/${path.basename(input)}`);
  await page.evaluate(() => window.ready);
  for (let i = 0; i < Math.round(+duration * +fps); i++) {
    const data = await page.evaluate(t => window.draw({ t }), i / +fps);
    if (!data) throw Error('Empty rendered frame');
    fs.writeFileSync(path.join(output, `${String(i).padStart(5, '0')}.jpg`), Buffer.from(data, 'base64'));
  }
  if (errors.length) throw Error(errors.join('\n'));
  console.log(`Rendered ${Math.round(+duration * +fps)} frames: ${input}`);
} finally { await browser.close(); server.close(); }
