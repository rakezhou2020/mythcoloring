"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./rake-admin.module.css";

type Page = { id: string; title: string; slug: string; thumbnail_url: string | null; categories?: string; themes?: string; theme_ids?: string; status: string; product_link_count: number; updated_at: string };
type Dashboard = { totals: number[]; recent: Page[] };
type Taxonomy = { id: string; name: string; slug: string; page_count?: number };
type ProductLink = { id: string; page_id: string; title: string; slug: string; thumbnail_url: string | null; url: string; platform: string; market: string | null; enabled: number };
type AuthState = "loading" | "guest" | "admin";
type RelationshipAction = "set_category" | "assign_theme" | "remove_theme";

const nav = [["Dashboard", "/rake/"], ["Coloring Pages", "/rake/coloring-pages/"], ["Themes", "/rake/themes/"], ["Amazon Links", "/rake/product-links/"]];
const api = async <T,>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`/api/rake/${path}`, { ...init, credentials: "same-origin", headers: { "content-type": "application/json", ...(init?.headers ?? {}) } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error ?? "Request failed.");
  return payload;
};

export function RakeAdmin() {
  const [auth, setAuth] = useState<AuthState>("loading");
  const [pathname, setPathname] = useState("/rake/");
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [categories, setCategories] = useState<Taxonomy[]>([]);
  const [themes, setThemes] = useState<Taxonomy[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [themeFilter, setThemeFilter] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const section = useMemo(() => pathname.split("/").filter(Boolean)[1] ?? "dashboard", [pathname]);
  const coloringPagesPath = `coloring-pages?q=${encodeURIComponent(query)}${categoryFilter ? `&categoryId=${encodeURIComponent(categoryFilter)}` : ""}${themeFilter ? `&themeId=${encodeURIComponent(themeFilter)}` : ""}`;
  const listPath = section === "coloring-pages" ? coloringPagesPath : "coloring-pages";
  const refreshTaxonomy = async () => {
    const [nextCategories, nextThemes] = await Promise.all([api<Taxonomy[]>("categories"), api<Taxonomy[]>("themes")]);
    setCategories(nextCategories); setThemes(nextThemes);
  };
  const refreshPages = async () => setPages(await api<Page[]>(listPath));
  const navigate = (href: string) => { window.history.pushState({}, "", href); setPathname(href); };

  useEffect(() => { api<{ authenticated: boolean }>("session").then(() => setAuth("admin")).catch(() => setAuth("guest")); }, []);
  useEffect(() => { setPathname(window.location.pathname); const listener = () => setPathname(window.location.pathname); window.addEventListener("popstate", listener); return () => window.removeEventListener("popstate", listener); }, []);
  useEffect(() => {
    if (auth !== "admin") return;
    setError("");
    const load = async () => {
      try {
        if (section === "dashboard") setDashboard(await api<Dashboard>("dashboard"));
        if (["coloring-pages", "themes", "product-links"].includes(section)) await Promise.all([refreshPages(), refreshTaxonomy()]);
      } catch (loadError) { setError((loadError as Error).message); }
    };
    void load();
  }, [auth, section, query, categoryFilter, themeFilter]);

  const runRelationship = async (action: RelationshipAction, targetId: string) => {
    if (!selected.length || !targetId) return;
    try {
      await api("relationships", { method: "POST", body: JSON.stringify({ action, targetId, pageIds: selected }) });
      setNotice(`${selected.length} coloring page${selected.length === 1 ? "" : "s"} updated.`);
      setSelected([]);
      await Promise.all([refreshPages(), refreshTaxonomy()]);
    } catch (operationError) { setError((operationError as Error).message); }
  };
  const logout = async () => { await api("logout", { method: "POST" }).catch(() => undefined); setDashboard(null); setPages([]); setSelected([]); setAuth("guest"); navigate("/rake/"); };

  if (auth === "loading") return <div className={styles.loginShell}><p>Loading admin workspace…</p></div>;
  if (auth === "guest") return <Login onSuccess={() => setAuth("admin")} />;

  return <div className={styles.shell}>
    <aside className={styles.sidebar}>
      <div><strong>MythColoring</strong><span>Content admin</span></div>
      <nav>{nav.map(([label, href]) => <a key={href} className={section === (href.split("/").filter(Boolean)[1] ?? "dashboard") ? styles.active : ""} href={href} onClick={(event) => { event.preventDefault(); navigate(href); }}>{label}</a>)}</nav>
      <button className={styles.logout} onClick={logout}>Log out</button>
    </aside>
    <main className={styles.main}>
      <header className={styles.topbar}><span>Private workspace</span><span>Session active</span></header>
      {error && <p className={styles.error} role="alert">{error}</p>}
      {notice && <p className={styles.notice} role="status">{notice}</p>}
      {section === "dashboard" && <DashboardView data={dashboard} navigate={navigate} />}
      {section === "coloring-pages" && <PagesView pages={pages} categories={categories} themes={themes} query={query} setQuery={setQuery} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} themeFilter={themeFilter} setThemeFilter={setThemeFilter} selected={selected} setSelected={setSelected} runRelationship={runRelationship} />}
      {section === "themes" && <ThemesView pages={pages} themes={themes} selected={selected} setSelected={setSelected} runRelationship={runRelationship} />}
      {section === "product-links" && <ProductLinksView pages={pages} onNotice={setNotice} onError={setError} />}
    </main>
  </div>;
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [saving, setSaving] = useState(false);
  const submit = async (event: FormEvent) => { event.preventDefault(); setSaving(true); setError(""); try { await api("login", { method: "POST", body: JSON.stringify({ password }) }); setPassword(""); onSuccess(); } catch (loginError) { setError((loginError as Error).message); } finally { setSaving(false); } };
  return <main className={styles.loginShell}><form className={styles.loginCard} onSubmit={submit}><p className={styles.kicker}>MYTHCOLORING</p><h1>Admin login</h1><p>Enter the administrator password to continue.</p><label htmlFor="rake-password">Password</label><input id="rake-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required autoFocus />{error && <p className={styles.error}>{error}</p>}<button disabled={saving}>{saving ? "Logging in…" : "Log in"}</button></form></main>;
}

function DashboardView({ data, navigate }: { data: Dashboard | null; navigate: (href: string) => void }) {
  const stats = [["Coloring Pages", data?.totals[0]], ["Published", data?.totals[1]], ["Categories", data?.totals[5]], ["Themes", data?.totals[4]], ["Amazon Links", data?.totals[7]]];
  return <><div className={styles.heading}><div><p className={styles.kicker}>DASHBOARD</p><h1>Content overview</h1><p>Manage your existing coloring-page catalog and poster links.</p></div><button onClick={() => navigate("/rake/coloring-pages/")}>View Coloring Pages</button></div><div className={styles.stats}>{stats.map(([label, value]) => <article key={String(label)}><span>{label}</span><strong>{value ?? "—"}</strong></article>)}</div><section className={styles.tablePanel}><div className={styles.panelHeader}><div><h2>Recent coloring pages</h2><p>Latest entries from the current D1 catalog.</p></div><button className={styles.textButton} onClick={() => navigate("/rake/coloring-pages/")}>View all</button></div><table><thead><tr><th>Title</th><th>Status</th><th>Updated</th></tr></thead><tbody>{data?.recent.map((page) => <tr key={page.id}><td><strong>{page.title}</strong><small>/{page.slug}</small></td><td><Status value={page.status} /></td><td>{dateLabel(page.updated_at)}</td></tr>)}</tbody></table></section></>;
}

function PagesView({ pages, categories, themes, query, setQuery, categoryFilter, setCategoryFilter, themeFilter, setThemeFilter, selected, setSelected, runRelationship }: { pages: Page[]; categories: Taxonomy[]; themes: Taxonomy[]; query: string; setQuery: (value: string) => void; categoryFilter: string; setCategoryFilter: (value: string) => void; themeFilter: string; setThemeFilter: (value: string) => void; selected: string[]; setSelected: (value: string[]) => void; runRelationship: (action: RelationshipAction, targetId: string) => void }) {
  const [categoryId, setCategoryId] = useState(""); const [themeId, setThemeId] = useState("");
  return <><div className={styles.heading}><div><p className={styles.kicker}>COLORING PAGES</p><h1>Catalog</h1><p>{pages.length} matching page{pages.length === 1 ? "" : "s"}</p></div></div><section className={styles.toolbar}><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title or slug" aria-label="Search coloring pages" /><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option value="">All categories</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><select value={themeFilter} onChange={(event) => setThemeFilter(event.target.value)}><option value="">All themes</option>{themes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>{(query || categoryFilter || themeFilter) && <button className={styles.textButton} onClick={() => { setQuery(""); setCategoryFilter(""); setThemeFilter(""); }}>Clear filters</button>}</section><BulkBar selected={selected} setSelected={setSelected} pages={pages} categories={categories} themes={themes} categoryId={categoryId} setCategoryId={setCategoryId} themeId={themeId} setThemeId={setThemeId} runRelationship={runRelationship} /><PageTable pages={pages} selected={selected} setSelected={setSelected} /></>;
}

function ThemesView({ pages, themes, selected, setSelected, runRelationship }: { pages: Page[]; themes: Taxonomy[]; selected: string[]; setSelected: (value: string[]) => void; runRelationship: (action: "assign_theme" | "remove_theme", targetId: string) => void }) {
  const [themeId, setThemeId] = useState(""); const [view, setView] = useState<"assigned" | "available">("assigned"); const activeTheme = themeId || themes[0]?.id || ""; const active = themes.find((theme) => theme.id === activeTheme); const assigned = (page: Page) => (page.theme_ids || "").split(",").includes(activeTheme); const assignedPages = pages.filter(assigned); const availablePages = pages.filter((page) => !assigned(page)); const visiblePages = view === "assigned" ? assignedPages : availablePages;
  return <><div className={styles.heading}><div><p className={styles.kicker}>THEMES</p><h1>Collection assignment</h1><p>Choose a theme, then select pages from the correct list.</p></div></div><section className={styles.toolbar}><select value={activeTheme} onChange={(event) => { setThemeId(event.target.value); setSelected([]); setView("assigned"); }} aria-label="Theme"><option value="">Choose theme</option>{themes.map((theme) => <option key={theme.id} value={theme.id}>{theme.name} ({theme.page_count ?? 0})</option>)}</select><span className={styles.selectionNote}>{active ? `${active.page_count ?? 0} pages in ${active.name}` : "No theme selected"}</span></section><div className={styles.segments}><button className={view === "assigned" ? styles.activeSegment : ""} onClick={() => { setView("assigned"); setSelected([]); }}>In this theme <span>{assignedPages.length}</span></button><button className={view === "available" ? styles.activeSegment : ""} onClick={() => { setView("available"); setSelected([]); }}>Available to add <span>{availablePages.length}</span></button></div>{selected.length > 0 && <section className={styles.bulkBar}><b>{selected.length} selected</b>{view === "available" ? <button onClick={() => runRelationship("assign_theme", activeTheme)}>Add to theme</button> : <button className={styles.secondary} onClick={() => runRelationship("remove_theme", activeTheme)}>Remove from theme</button>}<button className={styles.textButton} onClick={() => setSelected([])}>Clear</button></section>}<PageTable pages={visiblePages} selected={selected} setSelected={setSelected} />{!visiblePages.length && <p className={styles.empty}>{view === "available" ? "Every current coloring page is already in this theme." : "This theme has no coloring pages yet. Open “Available to add” to begin."}</p>}</>;
}

function BulkBar({ selected, setSelected, pages, categories, themes, categoryId, setCategoryId, themeId, setThemeId, runRelationship }: { selected: string[]; setSelected: (value: string[]) => void; pages: Page[]; categories: Taxonomy[]; themes: Taxonomy[]; categoryId: string; setCategoryId: (value: string) => void; themeId: string; setThemeId: (value: string) => void; runRelationship: (action: RelationshipAction, targetId: string) => void }) {
  if (!selected.length) return null; return <section className={styles.bulkBar}><b>{selected.length} selected</b><select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}><option value="">Choose category</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><button disabled={!categoryId} onClick={() => runRelationship("set_category", categoryId)}>Assign category</button><select value={themeId} onChange={(event) => setThemeId(event.target.value)}><option value="">Choose theme</option>{themes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><button disabled={!themeId} onClick={() => runRelationship("assign_theme", themeId)}>Add theme</button><button className={styles.secondary} disabled={!themeId} onClick={() => runRelationship("remove_theme", themeId)}>Remove theme</button><button className={styles.textButton} onClick={() => setSelected([])}>Clear</button><span>{pages.length} visible</span></section>;
}

function PageTable({ pages, selected, setSelected }: { pages: Page[]; selected: string[]; setSelected: (value: string[]) => void }) {
  const visibleIds = pages.map((page) => page.id); const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selected.includes(id)); const toggleAll = () => setSelected(allSelected ? selected.filter((id) => !visibleIds.includes(id)) : [...new Set([...selected, ...visibleIds])]); const toggle = (id: string) => setSelected(selected.includes(id) ? selected.filter((value) => value !== id) : [...selected, id]);
  return <section className={styles.tablePanel}><div className={styles.tableScroll}><table><thead><tr><th><input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="Select all visible pages" /></th><th>Preview</th><th>Title / slug</th><th>Category</th><th>Themes</th><th>Amazon</th><th>Status</th></tr></thead><tbody>{pages.map((page) => <tr key={page.id}><td><input type="checkbox" checked={selected.includes(page.id)} onChange={() => toggle(page.id)} aria-label={`Select ${page.title}`} /></td><td>{page.thumbnail_url ? <img className={styles.thumb} src={page.thumbnail_url} alt="" /> : <span className={styles.emptyThumb}>—</span>}</td><td><strong>{page.title}</strong><small>/{page.slug}</small></td><td>{page.categories || <span className={styles.muted}>Unassigned</span>}</td><td>{page.themes || <span className={styles.muted}>—</span>}</td><td><Status value={page.product_link_count ? "Linked" : "Missing"} /></td><td><Status value={page.status} /></td></tr>)}</tbody></table></div>{!pages.length && <p className={styles.empty}>No coloring pages match the current filters.</p>}</section>;
}

function ProductLinksView({ pages, onNotice, onError }: { pages: Page[]; onNotice: (value: string) => void; onError: (value: string) => void }) {
  const [links, setLinks] = useState<ProductLink[]>([]); const [pageId, setPageId] = useState(""); const [url, setUrl] = useState(""); const [editing, setEditing] = useState<ProductLink | null>(null); const [saving, setSaving] = useState(false);
  const refresh = () => api<ProductLink[]>("product-links").then(setLinks).catch((requestError: Error) => onError(requestError.message));
  useEffect(() => { void refresh(); }, []);
  const reset = () => { setEditing(null); setPageId(""); setUrl(""); };
  const choosePage = (nextPageId: string) => { const existing = links.find((link) => link.page_id === nextPageId && link.platform === "amazon"); setPageId(nextPageId); if (existing) { setEditing(existing); setUrl(existing.url); } else { setEditing(null); setUrl(""); } };
  const save = async (event: FormEvent) => { event.preventDefault(); if (!pageId || !url) return; setSaving(true); try { if (editing) await api(`product-links/${editing.id}`, { method: "PATCH", body: JSON.stringify({ pageId, platform: "amazon", market: "US", label: "Get This Artwork as a Poster", url, enabled: Boolean(editing.enabled) }) }); else await api("product-links", { method: "POST", body: JSON.stringify({ pageId, platform: "amazon", market: "US", label: "Get This Artwork as a Poster", url }) }); onNotice(editing ? "Amazon link updated." : "Amazon link saved."); reset(); await refresh(); } catch (saveError) { onError((saveError as Error).message); } finally { setSaving(false); } };
  const toggle = async (link: ProductLink) => { try { await api(`product-links/${link.id}`, { method: "PATCH", body: JSON.stringify({ pageId: link.page_id, platform: link.platform, market: link.market, label: "Get This Artwork as a Poster", url: link.url, enabled: !Boolean(link.enabled) }) }); onNotice(link.enabled ? "Amazon link disabled." : "Amazon link enabled."); await refresh(); } catch (toggleError) { onError((toggleError as Error).message); } };
  return <><div className={styles.heading}><div><p className={styles.kicker}>AMAZON LINKS</p><h1>Poster links</h1><p>{links.filter((link) => link.enabled).length} active link{links.filter((link) => link.enabled).length === 1 ? "" : "s"}</p></div></div><section className={styles.formPanel}><h2>{editing ? "Edit Amazon link" : "Add Amazon link"}</h2><form onSubmit={save}><select value={pageId} onChange={(event) => choosePage(event.target.value)} required><option value="">Choose coloring page</option>{pages.map((page) => <option key={page.id} value={page.id}>{page.title}</option>)}</select><input type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://www.amazon.com/..." required /><button disabled={saving}>{saving ? "Saving…" : editing ? "Save changes" : "Add Amazon link"}</button>{editing && <button type="button" className={styles.secondary} onClick={reset}>Cancel</button>}</form></section><section className={styles.tablePanel}><div className={styles.tableScroll}><table><thead><tr><th>Preview</th><th>Coloring page</th><th>Amazon URL</th><th>Status</th><th>Actions</th></tr></thead><tbody>{links.map((link) => <tr key={link.id}><td>{link.thumbnail_url ? <img className={styles.thumb} src={link.thumbnail_url} alt="" /> : <span className={styles.emptyThumb}>—</span>}</td><td><strong>{link.title}</strong><small>/{link.slug}</small></td><td className={styles.url}><a href={link.url} target="_blank" rel="noreferrer">Open Amazon link</a></td><td><Status value={link.enabled ? "Enabled" : "Disabled"} /></td><td><div className={styles.rowActions}><button className={styles.secondary} onClick={() => { setEditing(link); setPageId(link.page_id); setUrl(link.url); }}>Edit</button><button className={styles.textButton} onClick={() => void toggle(link)}>{link.enabled ? "Disable" : "Enable"}</button></div></td></tr>)}</tbody></table></div>{!links.length && <p className={styles.empty}>No Amazon links have been added yet.</p>}</section></>;
}

function Status({ value }: { value: string }) { return <span className={`${styles.status} ${styles[`status${value.replace(/[^a-z]/gi, "")}`] ?? ""}`}>{value}</span>; }
function dateLabel(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
