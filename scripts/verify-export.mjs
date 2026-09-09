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
  assert(!html.includes('name="robots" content="noindex"'), `Unexpected noindex: ${path}`);
}
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(urls.length, titles.size, 'Sitemap must cover public pages');
for (const url of urls) assert(existsSync(resolve(new URL(url).pathname)), `Sitemap: ${url}`);
assert(readFileSync(join(root, 'robots.txt'), 'utf8').includes(origin + '/sitemap.xml'));
assert(readFileSync(join(root, 'index.html'), 'utf8').includes('<h1>Free Printable Coloring Pages</h1>'));
assert(readFileSync(join(root, 'index.html'), 'utf8').includes('"@type":"WebSite"'));
assert(readFileSync(join(root, 'creatures', 'index.html'), 'utf8').includes('<h1>Free Mythical Creature Coloring Pages</h1>'));
for (const creature of readdirSync(join(root, 'creatures'), { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name)) {
  const creatureHtml = readFileSync(join(root, 'creatures', creature, 'index.html'), 'utf8');
  assert(creatureHtml.includes('"@type":"BreadcrumbList"'), `Breadcrumb schema: ${creature}`);
  assert(creatureHtml.includes('"@type":"WebPage"'), `WebPage schema: ${creature}`);
  assert(creatureHtml.includes('Related Coloring Pages'), `Related pages: ${creature}`);
  assert(creatureHtml.includes('mythical creature coloring pages'), `Hub link: ${creature}`);
}
assert.equal((readFileSync(join(root, 'index.html'), 'utf8').match(/class="coloring-card"/g) || []).length, 8, 'Homepage should show exactly eight featured coloring cards');
for (const asset of ['lineart.png', 'color-guide.jpg', 'finished.jpg', 'print.pdf']) {
  assert(existsSync(join(root, 'products', 'chi-ru', asset)), `Missing Chi Ru asset: ${asset}`);
  assert(readFileSync(join(root, 'creatures', 'chi-ru', 'index.html'), 'utf8').includes(`/products/chi-ru/${asset}`), `Chi Ru page missing asset: ${asset}`);
}
assert(readFileSync(join(root, 'creatures', 'chi-ru', 'index.html'), 'utf8').includes('赤鱬'), 'Chi Ru must use its supplied Chinese name');
const deerAssets = ['lineart.png', 'color-guide.jpg', 'finished.jpg', 'print.pdf'];
for (const asset of deerAssets) assert(existsSync(join(root, 'products', 'nine-colored-deer', asset)), `Missing published deer asset: ${asset}`);
const home = readFileSync(join(root, 'index.html'), 'utf8');
assert(home.includes('View all coloring pages'), 'Homepage must link visitors to the coloring pages catalog');
assert(home.includes('href="/coloring-pages/"'), 'Homepage catalog link is missing');
assert(home.includes('/products/nine-colored-deer/lineart.png'), 'Homepage hero must contain deer line art');
assert(home.includes('/products/nine-colored-deer/color-guide.jpg'), 'Homepage hero must contain deer color artwork');
assert(readFileSync(join(root, 'creatures', 'nine-colored-deer', 'index.html'), 'utf8').includes('/products/nine-colored-deer/print.pdf'), 'Deer detail must provide its printable PDF');
for (const draft of ['japanese-yokai', 'korean-folklore', 'greek-mythology', 'norse-mythology']) assert(!existsSync(join(root, 'themes', draft)));
assert(readFileSync(join(root, '_redirects'), 'utf8').includes('https://www.mythcoloring.com/* https://mythcoloring.com/:splat 301'));
console.log(`Verified ${titles.size} public pages, ${links} internal links/assets, sitemap, robots, eight homepage cards, Chi Ru and Nine-Colored Deer assets, and redirects.`);
