import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import assert from 'node:assert/strict';

const root = join(process.cwd(), 'out');
const origin = 'https://mythcoloring.com';
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
const files = walk(root).filter(file => file.endsWith('.html'));
const titles = new Set();
let links = 0;
function resolve(pathname) {
  const file = join(root, decodeURIComponent(pathname));
  return existsSync(file) && statSync(file).isFile() ? file : join(file, 'index.html');
}
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const path = '/' + relative(root, file).replaceAll('\\', '/').replace(/index\.html$/, '');
  for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = new URL(raw.replaceAll('&amp;', '&'), origin + path);
    if (url.origin !== origin) continue;
    const target = resolve(url.pathname);
    assert(existsSync(target), `${path}: missing ${url.pathname}`);
    if (url.hash && target.endsWith('.html')) assert(readFileSync(target, 'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing anchor: ${url}`);
    links++;
  }
  if (path.includes('404')) continue;
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title && !titles.has(title), `Missing or duplicate title: ${path}`);
  titles.add(title);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `H1: ${path}`);
  assert(html.includes('name="description" content="'), `Description: ${path}`);
  assert(html.includes(`rel="canonical" href="${origin + path}"`), `Canonical: ${path}`);
}
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(urls.length, titles.size, 'Sitemap must cover public pages');
for (const url of urls) assert(existsSync(resolve(new URL(url).pathname)), `Sitemap: ${url}`);
assert(readFileSync(join(root, 'robots.txt'), 'utf8').includes(origin + '/sitemap.xml'));
assert.equal((readFileSync(join(root, 'index.html'), 'utf8').match(/class="coloring-card"/g) || []).length, 8);
const deerAssets = ['lineart.png', 'color-guide.png', 'finished.png', 'print.pdf'];
for (const asset of deerAssets) assert(existsSync(join(root, 'products', 'nine-colored-deer', asset)), `Missing published deer asset: ${asset}`);
const home = readFileSync(join(root, 'index.html'), 'utf8');
assert.equal(home.match(/<article class="coloring-card" id="([^"]+)"/)?.[1], 'nine-colored-deer', 'Nine-Colored Deer must be the first homepage card');
assert(home.includes('/products/nine-colored-deer/lineart.png'), 'Homepage hero must contain deer line art');
assert(home.includes('/products/nine-colored-deer/finished.png'), 'Homepage hero must contain deer finished artwork');
assert(readFileSync(join(root, 'creatures', 'nine-colored-deer', 'index.html'), 'utf8').includes('/products/nine-colored-deer/print.pdf'), 'Deer detail must provide its printable PDF');
for (const draft of ['japanese-yokai', 'korean-folklore', 'greek-mythology', 'norse-mythology']) assert(!existsSync(join(root, 'themes', draft)));
assert(readFileSync(join(root, '_redirects'), 'utf8').includes('https://www.mythcoloring.com/* https://mythcoloring.com/:splat 301'));
console.log(`Verified ${titles.size} public pages, ${links} internal links/assets, sitemap, robots, 8 homepage cards, Nine-Colored Deer assets, and redirects.`);
