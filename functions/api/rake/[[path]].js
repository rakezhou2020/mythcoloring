const json = (value, status = 200) => new Response(JSON.stringify(value), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
const id = () => crypto.randomUUID();
const now = () => new Date().toISOString();
const statusValues = new Set(["draft", "published", "hidden"]);
const text = (value, fallback = "") => typeof value === "string" ? value.trim() : fallback;

function admin(context) {
  const email = context.request.headers.get("Cf-Access-Authenticated-User-Email")?.toLowerCase();
  const allowed = context.env.ADMIN_EMAIL?.toLowerCase();
  return email && allowed && email === allowed ? email : null;
}
async function body(request) { try { return await request.json(); } catch { return {}; } }
async function audit(db, actor, action, entity, entityId, details = {}) {
  await db.prepare("INSERT INTO admin_audit_log (id, actor_email, action, entity_type, entity_id, details_json) VALUES (?, ?, ?, ?, ?, ?)").bind(id(), actor, action, entity, entityId, JSON.stringify(details)).run();
}
function pageValues(data = {}) {
  const status = statusValues.has(data.status) ? data.status : "draft";
  return [text(data.contentType, "mythology"), text(data.title), text(data.slug), text(data.creatureSlug) || null, text(data.shortDescription), text(data.longDescription), text(data.lineArtUrl) || null, text(data.colorReferenceUrl) || null, text(data.finishedUrl) || null, text(data.thumbnailUrl) || null, text(data.printPdfUrl) || null, text(data.productType) || null, text(data.difficulty) || null, Number.isInteger(data.colorCount) ? data.colorCount : null, text(data.seoTitle) || null, text(data.metaDescription) || null, text(data.canonical) || null, data.featured ? 1 : 0, status, Number.isInteger(data.sortOrder) ? data.sortOrder : 0];
}
async function pageList(db, url) {
  const q = text(url.searchParams.get("q"));
  const status = text(url.searchParams.get("status"));
  const featured = url.searchParams.get("featured");
  const clauses = []; const values = [];
  if (q) { clauses.push("(p.title LIKE ? OR p.slug LIKE ?)"); values.push(`%${q}%`, `%${q}%`); }
  if (statusValues.has(status)) { clauses.push("p.status = ?"); values.push(status); }
  if (featured === "true") clauses.push("p.featured = 1");
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const result = await db.prepare(`SELECT p.*, GROUP_CONCAT(DISTINCT c.name) AS categories, GROUP_CONCAT(DISTINCT t.name) AS themes, COUNT(DISTINCT l.id) AS product_link_count FROM coloring_pages p LEFT JOIN page_categories pc ON pc.page_id=p.id LEFT JOIN categories c ON c.id=pc.category_id LEFT JOIN page_themes pt ON pt.page_id=p.id LEFT JOIN themes t ON t.id=pt.theme_id LEFT JOIN product_links l ON l.page_id=p.id AND l.enabled=1 ${where} GROUP BY p.id ORDER BY p.sort_order, p.title`).bind(...values).all();
  return result.results;
}

export async function onRequest(context) {
  const actor = admin(context);
  if (!actor) return json({ error: "Administrator authorization is required." }, 403);
  const db = context.env.MYTHCOLORING_DB;
  if (!db) return json({ error: "MYTHCOLORING_DB is not bound." }, 503);
  const url = new URL(context.request.url); const path = (context.params.path || []).join("/"); const method = context.request.method;
  if (path === "dashboard" && method === "GET") {
    const rows = await db.batch(["SELECT COUNT(*) AS value FROM coloring_pages", "SELECT COUNT(*) AS value FROM coloring_pages WHERE status='published'", "SELECT COUNT(*) AS value FROM coloring_pages WHERE status='draft'", "SELECT COUNT(*) AS value FROM coloring_pages WHERE status='hidden'", "SELECT COUNT(*) AS value FROM themes", "SELECT COUNT(*) AS value FROM media", "SELECT COUNT(DISTINCT page_id) AS value FROM product_links WHERE enabled=1", "SELECT COUNT(*) AS value FROM coloring_pages WHERE id NOT IN (SELECT DISTINCT page_id FROM product_links WHERE enabled=1)"].map((sql) => db.prepare(sql)));
    const recent = await db.prepare("SELECT id, title, slug, status, created_at FROM coloring_pages ORDER BY created_at DESC LIMIT 8").all();
    return json({ totals: rows.map((entry) => entry.results[0].value), recent: recent.results });
  }
  if (path === "coloring-pages" && method === "GET") return json(await pageList(db, url));
  if (path === "coloring-pages" && method === "POST") {
    const data = await body(context.request); if (!text(data.title) || !text(data.slug)) return json({ error: "Title and slug are required." }, 422);
    const pageId = id(); const values = pageValues(data);
    try { await db.prepare("INSERT INTO coloring_pages (id, content_type, title, slug, creature_slug, short_description, long_description, line_art_url, color_reference_url, finished_url, thumbnail_url, print_pdf_url, product_type, difficulty, color_count, seo_title, meta_description, canonical, featured, status, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(pageId, ...values).run(); } catch { return json({ error: "The slug must be unique." }, 409); }
    await audit(db, actor, "create", "coloring_page", pageId); return json({ id: pageId }, 201);
  }
  const pageMatch = path.match(/^coloring-pages\/([^/]+)$/);
  if (pageMatch && method === "GET") { const result = await db.prepare("SELECT * FROM coloring_pages WHERE id=?").bind(pageMatch[1]).first(); return result ? json(result) : json({ error: "Not found." }, 404); }
  if (pageMatch && method === "PATCH") {
    const data = await body(context.request); if (!text(data.title) || !text(data.slug)) return json({ error: "Title and slug are required." }, 422);
    try { await db.prepare("UPDATE coloring_pages SET content_type=?, title=?, slug=?, creature_slug=?, short_description=?, long_description=?, line_art_url=?, color_reference_url=?, finished_url=?, thumbnail_url=?, print_pdf_url=?, product_type=?, difficulty=?, color_count=?, seo_title=?, meta_description=?, canonical=?, featured=?, status=?, sort_order=?, updated_at=? WHERE id=?").bind(...pageValues(data), now(), pageMatch[1]).run(); } catch { return json({ error: "The slug must be unique." }, 409); }
    await audit(db, actor, "update", "coloring_page", pageMatch[1]); return json({ ok: true });
  }
  if (pageMatch && method === "DELETE") { await db.prepare("DELETE FROM coloring_pages WHERE id=?").bind(pageMatch[1]).run(); await audit(db, actor, "delete", "coloring_page", pageMatch[1]); return json({ ok: true }); }
  if (path === "coloring-pages/bulk" && method === "POST") {
    const data = await body(context.request); const ids = Array.isArray(data.ids) ? data.ids.filter((value) => typeof value === "string") : []; if (!ids.length) return json({ error: "Select at least one coloring page." }, 422);
    const placeholders = ids.map(() => "?").join(","); const action = text(data.action);
    if (["published", "draft", "hidden"].includes(action)) await db.prepare(`UPDATE coloring_pages SET status=?, updated_at=? WHERE id IN (${placeholders})`).bind(action, now(), ...ids).run();
    else if (["feature", "unfeature"].includes(action)) await db.prepare(`UPDATE coloring_pages SET featured=?, updated_at=? WHERE id IN (${placeholders})`).bind(action === "feature" ? 1 : 0, now(), ...ids).run();
    else if (action === "delete") await db.prepare(`DELETE FROM coloring_pages WHERE id IN (${placeholders})`).bind(...ids).run();
    else return json({ error: "Unsupported bulk action." }, 422);
    await audit(db, actor, `bulk_${action}`, "coloring_page", null, { ids }); return json({ ok: true });
  }
  if (path === "themes" && method === "GET") return json((await db.prepare("SELECT t.*, COUNT(pt.page_id) AS page_count FROM themes t LEFT JOIN page_themes pt ON pt.theme_id=t.id GROUP BY t.id ORDER BY t.sort_order, t.name").all()).results);
  if (path === "themes" && method === "POST") {
    const data = await body(context.request); if (!text(data.name) || !text(data.slug)) return json({ error: "Name and slug are required." }, 422); const themeId = id();
    try { await db.prepare("INSERT INTO themes (id,name,slug,cover_url,short_description,long_description,seo_title,meta_description,canonical,featured,status,sort_order) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)").bind(themeId,text(data.name),text(data.slug),text(data.coverUrl)||null,text(data.shortDescription),text(data.longDescription),text(data.seoTitle)||null,text(data.metaDescription)||null,text(data.canonical)||null,data.featured?1:0,statusValues.has(data.status)?data.status:"draft",Number.isInteger(data.sortOrder)?data.sortOrder:0).run(); } catch { return json({ error: "The slug must be unique." }, 409); }
    await audit(db, actor, "create", "theme", themeId); return json({ id: themeId }, 201);
  }
  const themeMatch = path.match(/^themes\/([^/]+)$/);
  if (themeMatch && method === "PATCH") { const data = await body(context.request); if (!text(data.name) || !text(data.slug)) return json({ error: "Name and slug are required." }, 422); try { await db.prepare("UPDATE themes SET name=?,slug=?,cover_url=?,short_description=?,long_description=?,seo_title=?,meta_description=?,canonical=?,featured=?,status=?,sort_order=?,updated_at=? WHERE id=?").bind(text(data.name),text(data.slug),text(data.coverUrl)||null,text(data.shortDescription),text(data.longDescription),text(data.seoTitle)||null,text(data.metaDescription)||null,text(data.canonical)||null,data.featured?1:0,statusValues.has(data.status)?data.status:"draft",Number.isInteger(data.sortOrder)?data.sortOrder:0,now(),themeMatch[1]).run(); } catch { return json({ error: "The slug must be unique." }, 409); } await audit(db,actor,"update","theme",themeMatch[1]); return json({ ok:true }); }
  if (themeMatch && method === "DELETE") { await db.prepare("DELETE FROM themes WHERE id=?").bind(themeMatch[1]).run(); await audit(db,actor,"delete","theme",themeMatch[1]); return json({ ok:true }); }
  if (path === "categories" && method === "GET") return json((await db.prepare("SELECT c.*, COUNT(pc.page_id) AS page_count FROM categories c LEFT JOIN page_categories pc ON pc.category_id=c.id GROUP BY c.id ORDER BY c.sort_order, c.name").all()).results);
  if (path === "categories" && method === "POST") { const data = await body(context.request); if (!text(data.name)||!text(data.slug)) return json({error:"Name and slug are required."},422); const categoryId=id(); try { await db.prepare("INSERT INTO categories (id,name,slug,description,sort_order,status) VALUES (?,?,?,?,?,?)").bind(categoryId,text(data.name),text(data.slug),text(data.description),Number.isInteger(data.sortOrder)?data.sortOrder:0,statusValues.has(data.status)?data.status:"draft").run(); } catch { return json({error:"The slug must be unique."},409); } await audit(db,actor,"create","category",categoryId); return json({id:categoryId},201); }
  const categoryMatch = path.match(/^categories\/([^/]+)$/);
  if (categoryMatch && method === "PATCH") { const data=await body(context.request); if (!text(data.name)||!text(data.slug)) return json({error:"Name and slug are required."},422); try { await db.prepare("UPDATE categories SET name=?,slug=?,description=?,sort_order=?,status=?,updated_at=? WHERE id=?").bind(text(data.name),text(data.slug),text(data.description),Number.isInteger(data.sortOrder)?data.sortOrder:0,statusValues.has(data.status)?data.status:"draft",now(),categoryMatch[1]).run(); } catch { return json({error:"The slug must be unique."},409); } await audit(db,actor,"update","category",categoryMatch[1]); return json({ok:true}); }
  if (categoryMatch && method === "DELETE") { await db.prepare("DELETE FROM categories WHERE id=?").bind(categoryMatch[1]).run(); await audit(db,actor,"delete","category",categoryMatch[1]); return json({ok:true}); }
  if (path === "product-links" && method === "GET") return json((await db.prepare("SELECT l.*, p.title, p.slug, p.thumbnail_url FROM product_links l JOIN coloring_pages p ON p.id=l.page_id ORDER BY l.updated_at DESC").all()).results);
  if (path === "product-links" && method === "POST") { const data=await body(context.request); if (!text(data.pageId)||!text(data.platform)||!text(data.url)) return json({error:"Page, platform, and URL are required."},422); const linkId=id(); await db.prepare("INSERT INTO product_links (id,page_id,platform,market,label,url,enabled,sort_order) VALUES (?,?,?,?,?,?,?,?)").bind(linkId,text(data.pageId),text(data.platform),text(data.market)||null,text(data.label),text(data.url),data.enabled===false?0:1,Number.isInteger(data.sortOrder)?data.sortOrder:0).run(); await audit(db,actor,"create","product_link",linkId); return json({id:linkId},201); }
  const linkMatch=path.match(/^product-links\/([^/]+)$/);
  if (linkMatch && method === "PATCH") { const data=await body(context.request); if (!text(data.pageId)||!text(data.platform)||!text(data.url)) return json({error:"Page, platform, and URL are required."},422); await db.prepare("UPDATE product_links SET page_id=?,platform=?,market=?,label=?,url=?,enabled=?,sort_order=?,updated_at=? WHERE id=?").bind(text(data.pageId),text(data.platform),text(data.market)||null,text(data.label),text(data.url),data.enabled===false?0:1,Number.isInteger(data.sortOrder)?data.sortOrder:0,now(),linkMatch[1]).run(); await audit(db,actor,"update","product_link",linkMatch[1]); return json({ok:true}); }
  if (linkMatch && method === "DELETE") { await db.prepare("DELETE FROM product_links WHERE id=?").bind(linkMatch[1]).run(); await audit(db,actor,"delete","product_link",linkMatch[1]); return json({ok:true}); }
  if (path === "relationships" && method === "POST") { const data=await body(context.request); const pageIds=Array.isArray(data.pageIds)?data.pageIds.filter((value)=>typeof value==="string"):[]; const targetId=text(data.targetId); if(!pageIds.length||!targetId) return json({error:"Pages and a target are required."},422); const action=text(data.action); const statements=[]; for(const pageId of pageIds) { if(action==="set_category") statements.push(db.prepare("DELETE FROM page_categories WHERE page_id=?").bind(pageId),db.prepare("INSERT OR REPLACE INTO page_categories (page_id,category_id,is_primary) VALUES (?,?,1)").bind(pageId,targetId)); if(action==="assign_theme") statements.push(db.prepare("INSERT OR IGNORE INTO page_themes (page_id,theme_id) VALUES (?,?)").bind(pageId,targetId)); if(action==="remove_theme") statements.push(db.prepare("DELETE FROM page_themes WHERE page_id=? AND theme_id=?").bind(pageId,targetId)); } if(!statements.length) return json({error:"Unsupported relationship action."},422); await db.batch(statements); await audit(db,actor,action,"coloring_page",null,{pageIds,targetId}); return json({ok:true}); }
  if (path === "media" && method === "GET") return json((await db.prepare("SELECT m.*, CASE WHEN m.url IN (SELECT line_art_url FROM coloring_pages UNION SELECT color_reference_url FROM coloring_pages UNION SELECT finished_url FROM coloring_pages UNION SELECT thumbnail_url FROM coloring_pages) THEN 1 ELSE 0 END AS in_use FROM media m ORDER BY m.created_at DESC").all()).results);
  return json({ error: "Route not found." }, 404);
}
