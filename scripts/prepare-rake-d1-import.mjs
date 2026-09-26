/**
 * Builds a deterministic, idempotent D1 import plan from the current static
 * data sources. It never connects to Cloudflare or writes to D1 by itself.
 *
 *   node scripts/prepare-rake-d1-import.mjs            # audit report only
 *   node scripts/prepare-rake-d1-import.mjs --sql path # generate import SQL
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const moduleCache = new Map();
const load = (filename) => {
  if (moduleCache.has(filename)) return moduleCache.get(filename);
  const source = readFileSync(path.join(root, filename), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  moduleCache.set(filename, module.exports);
  const localRequire = (specifier) => {
    if (!specifier.startsWith(".")) return {};
    const resolved = path.relative(root, path.resolve(root, path.dirname(filename), specifier)).replaceAll("\\", "/");
    if (resolved.endsWith(".json")) return { default: JSON.parse(readFileSync(path.join(root, resolved), "utf8")) };
    return load(resolved.endsWith(".ts") ? resolved : `${resolved}.ts`);
  };
  new Function("exports", "require", "module", "__filename", "__dirname", compiled)(module.exports, localRequire, module, filename, path.dirname(filename));
  moduleCache.set(filename, module.exports);
  return module.exports;
};
const pagesData = load("data/coloring-pages.ts");
const standardData = load("data/standard-coloring-pages.ts");
const themesData = load("data/themes.ts");
const creaturesData = load("data/creatures.ts");
const stableId = (scope, key) => {
  const value = createHash("sha256").update(`${scope}:${key}`).digest("hex").slice(0, 32);
  return `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`;
};
const sql = (value) => value == null ? "NULL" : typeof value === "number" ? String(value) : `'${String(value).replaceAll("'", "''")}'`;
const excludedEmptyDrafts = pagesData.coloringPages.filter((page) => page.status === "draft" && !page.lineArtImage && !page.colorGuideImage && !page.finishedImage && !page.printPdf);
const pageRows = [
  ...pagesData.coloringPages.filter((page) => !excludedEmptyDrafts.includes(page)).map((page) => ({
    sourceKey: `mythology:${page.id}`,
    contentType: "mythology",
    title: page.title,
    slug: page.slug,
    creatureSlug: page.creatureSlug,
    shortDescription: "",
    lineArtUrl: page.lineArtImage,
    colorReferenceUrl: page.colorGuideImage,
    finishedUrl: page.finishedImage,
    thumbnailUrl: page.lineArtImage,
    printPdfUrl: page.printPdf,
    productType: page.type,
    difficulty: page.difficulty,
    colorCount: page.colorCount,
    seoTitle: null,
    metaDescription: null,
    canonical: null,
    featured: page.featured,
    status: page.status,
    themeSlug: page.themeSlug,
    categorySlug: null,
  })),
  ...standardData.standardColoringPages.map((page) => ({
    sourceKey: `standard:${page.categorySlug}:${page.slug}`,
    contentType: "standard",
    title: page.title,
    slug: page.slug,
    creatureSlug: null,
    shortDescription: page.shortIntroduction,
    lineArtUrl: page.lineArtImage,
    colorReferenceUrl: page.colorImage,
    finishedUrl: page.colorImage,
    thumbnailUrl: page.lineArtImage,
    printPdfUrl: null,
    productType: "Coloring Page",
    difficulty: null,
    colorCount: null,
    seoTitle: page.seo?.title ?? null,
    metaDescription: page.seo?.description ?? null,
    canonical: null,
    featured: page.featured,
    status: page.status,
    themeSlug: null,
    categorySlug: page.categorySlug,
  })),
];
const categories = standardData.standardColoringCategories.map((category) => ({ ...category, id: stableId("category", category.slug) }));
const themes = themesData.themes.map((theme) => ({ ...theme, id: stableId("theme", theme.slug) }));
const bySlug = new Map(); const duplicateSlugs = new Set();
for (const page of pageRows) { if (bySlug.has(page.slug)) duplicateSlugs.add(page.slug); else bySlug.set(page.slug, page); }
const missingSlugs = pageRows.filter((page) => !page.slug).map((page) => page.title);
const imageIssues = pageRows.flatMap((page) => ["lineArtUrl", "colorReferenceUrl", "thumbnailUrl"].filter((field) => !page[field]).map((field) => ({ slug: page.slug, field })));
const missingLocalAssets = pageRows.flatMap((page) => [page.lineArtUrl, page.colorReferenceUrl, page.finishedUrl, page.thumbnailUrl, page.printPdfUrl].filter((url) => typeof url === "string" && url.startsWith("/") && !existsSync(path.join(root, "public", url.slice(1)))).map((url) => ({ slug: page.slug, url })));
const creatureSlugs = new Set(creaturesData.creatures.map((creature) => creature.slug));
const unmatchedCreaturePages = pageRows.filter((page) => page.contentType === "mythology" && !creatureSlugs.has(page.creatureSlug)).map((page) => page.slug);
const themeRelationships = pageRows.filter((page) => page.themeSlug && themes.some((theme) => theme.slug === page.themeSlug));
const report = {
  sources: {
    mythologyColoringPages: pagesData.coloringPages.length,
    standardColoringPages: standardData.standardColoringPages.length,
    animals: standardData.standardColoringPages.filter((page) => page.categorySlug === "animals").length,
    plantsAndFlowers: standardData.standardColoringPages.filter((page) => page.categorySlug === "flowers-plants").length,
    creatures: creaturesData.creatures.length,
    themes: themesData.themes.length,
    standardCategories: categories.length,
  },
  plannedImport: {
    coloringPages: pageRows.length,
    categories: categories.length,
    themes: themes.length,
    pageCategoryRelationships: pageRows.filter((page) => page.categorySlug).length,
    pageThemeRelationships: themeRelationships.length,
    productLinks: 0,
  },
  quality: {
    missingSlugs,
    duplicateSlugs: [...duplicateSlugs],
    missingRequiredImageUrls: imageIssues,
    missingLocalAssets,
    excludedEmptyDrafts: excludedEmptyDrafts.map((page) => page.slug),
    mythologyPagesWithoutMatchingCreature: unmatchedCreaturePages,
  },
  decision: "Creatures remain in their existing Creature archive data for this migration. Their linked mythology coloring products are imported separately; ordinary coloring pages retain their existing category relationship.",
};
const hasBlockingProblems = missingSlugs.length || duplicateSlugs.size || imageIssues.length || unmatchedCreaturePages.length;
// Wrangler's remote D1 SQL-file importer manages atomicity itself and rejects
// explicit BEGIN/COMMIT statements, so emit idempotent statements only.
const sqlLines = [];
for (const category of categories) sqlLines.push(`INSERT INTO categories (id,name,slug,description,sort_order,status) VALUES (${[category.id, category.name, category.slug, category.description, 0, category.status].map(sql).join(",")}) ON CONFLICT(slug) DO UPDATE SET name=excluded.name,description=excluded.description,sort_order=excluded.sort_order,status=excluded.status,updated_at=CURRENT_TIMESTAMP;`);
for (const theme of themes) sqlLines.push(`INSERT INTO themes (id,name,slug,cover_url,short_description,long_description,status) VALUES (${[theme.id, theme.name, theme.slug, theme.heroImage, theme.shortDescription, theme.longDescription, theme.status].map(sql).join(",")}) ON CONFLICT(slug) DO UPDATE SET name=excluded.name,cover_url=excluded.cover_url,short_description=excluded.short_description,long_description=excluded.long_description,status=excluded.status,updated_at=CURRENT_TIMESTAMP;`);
for (const page of pageRows) {
  const pageId = stableId("page", page.sourceKey); const values = [pageId, page.contentType, page.title, page.slug, page.creatureSlug, page.shortDescription, "", page.lineArtUrl, page.colorReferenceUrl, page.finishedUrl, page.thumbnailUrl, page.printPdfUrl, page.productType, page.difficulty, page.colorCount, page.seoTitle, page.metaDescription, page.canonical, page.featured ? 1 : 0, page.status, 0, page.sourceKey];
  sqlLines.push(`INSERT INTO coloring_pages (id,content_type,title,slug,creature_slug,short_description,long_description,line_art_url,color_reference_url,finished_url,thumbnail_url,print_pdf_url,product_type,difficulty,color_count,seo_title,meta_description,canonical,featured,status,sort_order,source_key) VALUES (${values.map(sql).join(",")}) ON CONFLICT(source_key) DO UPDATE SET content_type=excluded.content_type,title=excluded.title,slug=excluded.slug,creature_slug=excluded.creature_slug,short_description=excluded.short_description,line_art_url=excluded.line_art_url,color_reference_url=excluded.color_reference_url,finished_url=excluded.finished_url,thumbnail_url=excluded.thumbnail_url,print_pdf_url=excluded.print_pdf_url,product_type=excluded.product_type,difficulty=excluded.difficulty,color_count=excluded.color_count,seo_title=excluded.seo_title,meta_description=excluded.meta_description,canonical=excluded.canonical,featured=excluded.featured,status=excluded.status,updated_at=CURRENT_TIMESTAMP;`);
  if (page.categorySlug) sqlLines.push(`INSERT OR REPLACE INTO page_categories (page_id,category_id,is_primary) VALUES (${sql(pageId)},${sql(stableId("category", page.categorySlug))},1);`);
  if (page.themeSlug) sqlLines.push(`INSERT OR IGNORE INTO page_themes (page_id,theme_id) VALUES (${sql(pageId)},${sql(stableId("theme", page.themeSlug))});`);
}
console.log(JSON.stringify(report, null, 2));
const argument = process.argv.indexOf("--sql");
if (argument >= 0) {
  if (hasBlockingProblems) {
    console.error("Import SQL was not generated because the audit found blocking source-data issues.");
    process.exitCode = 2;
  } else {
    const output = process.argv[argument + 1];
    if (!output) throw new Error("Pass an output path after --sql.");
    writeFileSync(path.resolve(root, output), sqlLines.join("\n") + "\n");
  }
}
