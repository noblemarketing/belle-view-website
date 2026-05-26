import { launch } from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'documents', 'property-summary.html');
const pdfPath = path.join(root, 'documents', 'property-summary.pdf');
const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;

const browser = await launch({ headless: true });
const page = await browser.newPage();
await page.goto(fileUrl, { waitUntil: 'networkidle0' });
await page.pdf({
  path: pdfPath,
  format: 'Letter',
  printBackground: true,
  margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' },
});
await browser.close();
console.log(`Wrote ${pdfPath}`);
