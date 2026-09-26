"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./rake-admin.module.css";

type Page = { id: string; title: string; slug: string; thumbnail_url: string | null; categories?: string; themes?: string; theme_ids?: string; status: string; product_link_count: number; updated_at: string };
type Dashboard = { totals: number[]; recent: Page[] };
type Taxonomy = { id: string; name: string; slug: string; page_count?: number };
type ProductLink = { id: string; page_id: string; title: string; slug: string; url: string; platform: string; market: string | null; enabled: number };
type AuthState = "loading" | "guest" | "admin";
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
  const section = useMemo(() => pathname.split("/").filter(Boolean)[1] ?? "dashboard", [pathname]);
  const pageQuery = `coloring-pages?q=${encodeURIComponent(query)}${categoryFilter ? `&categoryId=${encodeURIComponent(categoryFilter)}` : ""}${themeFilter ? `&themeId=${encodeURIComponent(themeFilter)}` : ""}`;
  const refreshPages = async () => setPages(await api<Page[]>(pageQuery));
  const refreshTaxonomy = async () => {
    const [nextCategories, nextThemes] = await Promise.all([api<Taxonomy[]>("categories"), api<Taxonomy[]>("themes")]);
    setCategories(nextCategories); setThemes(nextThemes);
  };
  const navigate = (href: string) => { window.history.pushState({}, "", href); setPathname(href); };

  useEffect(() => { api<{ authenticated: boolean }>("session").then(() => setAuth("admin")).catch(() => setAuth("guest")); }, []);
  useEffect(() => { setPathname(window.location.pathname); const listener = () => setPathname(window.location.pathname); window.addEventListener("popstate", listener); return () => window.removeEventListener("popstate", listener); }, []);
  useEffect(() => {
    if (auth !== "admin") return;
    setError("");
    const load = async () => {
      try {
        if (section === "dashboard") setDashboard(await api<Dashboard>("dashboard"));
        if (["coloring-pages", "themes", "product-links"].includes(section)) { await Promise.all([refreshPages(), refreshTaxonomy()]); }
      } catch (loadError) { setError((loadError as Error).message); }
    };
    void load();
  }, [auth, section, query, categoryFilter, themeFilter]);

  const bulkRelationship = async (action: "set_category" | "assign_theme" | "remove_theme", targetId: string) => {
    if (!selected.length || !targetId) return;
    try { await api("relationships", { method: "POST", body: JSON.stringify({ action, targetId, pageIds: selected }) }); setSelected([]); await Promise.all([refreshPages(), refreshTaxonomy()]); }
    catch (operationError) { setError((operationError as Error).message); }
  };
  const logout = async () => { await api("logout", { method: "POST" }).catch(() => undefined); setDashboard(null); setPages([]); setSelected([]); setAuth("guest"); navigate("/rake/"); };
  if (auth === "loading") return <div className={styles.loginShell}><p>Loading secure workspace…</p></div>;
  if (auth === "guest") return <Login onSuccess={() => setAuth("admin")} />;

  return <div className={styles.shell}>
    <aside className={styles.sidebar}><strong>MythColoring Admin</strong><nav>{nav.map(([label, href]) => <a key={href} className={section === (href.split("/").filter(Boolean)[1] ?? "dashboard") ? styles.active : ""} href={href} onClick={(event) => { event.preventDefault(); navigate(href); }}>{label}</a>)}</nav><button className={styles.logout} onClick={logout}>Log out</button></aside>
    <main className={styles.main}><header className={styles.topbar}><p>Private content workspace</p><span>Password protected</span></header>{error && <p className={styles.error}>{error}</p>}
      {section === "dashboard" && <DashboardView data={dashboard} navigate={navigate} />}
      {section === "coloring-pages" && <PagesView pages={pages} categories={categories} themes={themes} query={query} setQuery={setQuery} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} themeFilter={themeFilter} setThemeFilter={setThemeFilter} selected={selected} setSelected={setSelected} relationship={bulkRelationship} />}
      {section === "themes" && <ThemesView pages={pages} themes={themes} selected={selected} setSelected={setSelected} relationship={bulkRelationship} />}
      {section === "product-links" && <ProductLinksView pages={pages} />}
    </main>
  </div>;
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [saving, setSaving] = useState(false);
  const submit = async (event: FormEvent) => { event.preventDefault(); setSaving(true); setError(""); try { await api("login", { method: "POST", body: JSON.stringify({ password }) }); setPassword(""); onSuccess(); } catch (loginError) { setError((loginError as Error).message); } finally { setSaving(false); } };
  return <main className={styles.loginShell}><form className={styles.loginCard} onSubmit={submit}><p className="eyebrow">MythColoring</p><h1>Admin login</h1><p>Enter the administrator password to manage coloring pages and artwork links.</p><label htmlFor="rake-password">Password</label><input id="rake-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required autoFocus />{error && <p className={styles.error}>{error}</p>}<button disabled={saving}>{saving ? "Logging in…" : "Log in"}</button></form></main>;
}

function DashboardView({ data, navigate }: { data: Dashboard | null; navigate: (href: string) => void }) {
  const labels = ["Total Coloring Pages", "Published", "Draft", "Hidden", "Themes", "Media Records", "Pages With Amazon Links", "Pages Missing Amazon Links"];
  return <><div className={styles.heading}><div><p className="eyebrow">Dashboard</p><h1>Content overview</h1></div><button onClick={() => navigate("/rake/coloring-pages/")}>Manage Coloring Pages</button></div><div className={styles.stats}>{labels.map((label, index) => <article key={label}><span>{label}</span><strong>{data?.totals[index] ?? "—"}</strong></article>)}</div><section className={styles.panel}><h2>Recently Added</h2>{data?.recent.length ? data.recent.map((page) => <p key={page.id}>{page.title} <small>{page.status}</small></p>) : <p>Loading D1 content…</p>}</section></>;
}

function PagesView({ pages, categories, themes, query, setQuery, categoryFilter, setCategoryFilter, themeFilter, setThemeFilter, selected, setSelected, relationship }: { pages: Page[]; categories: Taxonomy[]; themes: Taxonomy[]; query: string; setQuery: (value: string) => void; categoryFilter: string; setCategoryFilter: (value: string) => void; themeFilter: string; setThemeFilter: (value: string) => void; selected: string[]; setSelected: (value: string[]) => void; relationship: (action: "set_category" | "assign_theme" | "remove_theme", targetId: string) => void }) {
  const [categoryId, setCategoryId] = useState(""); const [themeId, setThemeId] = useState(""); const toggle = (id: string) => setSelected(selected.includes(id) ? selected.filter((value) => value !== id) : [...selected, id]);
  return <><div className={styles.heading}><div><p className="eyebrow">Coloring Pages</p><h1>Manage coloring pages</h1></div></div><div className={styles.filters}><input className={styles.search} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title or slug" /><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option value="">All categories</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><select value={themeFilter} onChange={(event) => setThemeFilter(event.target.value)}><option value="">All themes</option>{themes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div><BulkControls selected={selected} categories={categories} themes={themes} categoryId={categoryId} setCategoryId={setCategoryId} themeId={themeId} setThemeId={setThemeId} relationship={relationship} /><PageList pages={pages} selected={selected} toggle={toggle} /></>;
}

function ThemesView({ pages, themes, selected, setSelected, relationship }: { pages: Page[]; themes: Taxonomy[]; selected: string[]; setSelected: (value: string[]) => void; relationship: (action: "assign_theme" | "remove_theme", targetId: string) => void }) {
  const [themeId, setThemeId] = useState(""); const [onlyAssigned, setOnlyAssigned] = useState(true); const activeTheme = themeId || themes[0]?.id || ""; const assigned = (page: Page) => (page.theme_ids || "").split(",").includes(activeTheme); const visiblePages = pages.filter((page) => !onlyAssigned || assigned(page)); const toggle = (id: string) => setSelected(selected.includes(id) ? selected.filter((value) => value !== id) : [...selected, id]);
  return <><div className={styles.heading}><div><p className="eyebrow">Themes</p><h1>Assign coloring pages</h1></div></div><section className={styles.panel}><label htmlFor="theme-picker">Theme</label><select id="theme-picker" value={activeTheme} onChange={(event) => { setThemeId(event.target.value); setSelected([]); }}><option value="">Choose theme</option>{themes.map((theme) => <option key={theme.id} value={theme.id}>{theme.name} ({theme.page_count ?? 0})</option>)}</select><label className={styles.check}><input type="checkbox" checked={onlyAssigned} onChange={(event) => setOnlyAssigned(event.target.checked)} /> Show pages assigned to this theme only</label>{selected.length > 0 && <div className={styles.bulk}><b>{selected.length} selected</b><button onClick={() => relationship("assign_theme", activeTheme)}>Add to Theme</button><button onClick={() => relationship("remove_theme", activeTheme)}>Remove from Theme</button></div>}</section><PageList pages={visiblePages} selected={selected} toggle={toggle} /></>;
}

function BulkControls({ selected, categories, themes, categoryId, setCategoryId, themeId, setThemeId, relationship }: { selected: string[]; categories: Taxonomy[]; themes: Taxonomy[]; categoryId: string; setCategoryId: (value: string) => void; themeId: string; setThemeId: (value: string) => void; relationship: (action: "set_category" | "assign_theme" | "remove_theme", targetId: string) => void }) {
  if (!selected.length) return null; return <div className={styles.bulk}><b>{selected.length} selected</b><select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}><option value="">Choose category</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><button disabled={!categoryId} onClick={() => relationship("set_category", categoryId)}>Assign Category</button><select value={themeId} onChange={(event) => setThemeId(event.target.value)}><option value="">Choose theme</option>{themes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><button disabled={!themeId} onClick={() => relationship("assign_theme", themeId)}>Assign Theme</button><button disabled={!themeId} onClick={() => relationship("remove_theme", themeId)}>Remove Theme</button></div>;
}

function PageList({ pages, selected, toggle }: { pages: Page[]; selected: string[]; toggle: (id: string) => void }) { return <div className={styles.list}>{pages.map((page) => <article key={page.id}><input type="checkbox" checked={selected.includes(page.id)} onChange={() => toggle(page.id)} />{page.thumbnail_url ? <img src={page.thumbnail_url} alt="" /> : <div className={styles.thumb}>No image</div>}<div><strong>{page.title}</strong><span>/{page.slug}</span><small>{page.categories || "Unassigned"} · {page.themes || "No themes"}</small></div><span className={styles.status}>{page.status}</span><small>{page.product_link_count ? "Amazon link" : "No Amazon link"}</small></article>)}{!pages.length && <p className={styles.empty}>No coloring pages found.</p>}</div>; }

function ProductLinksView({ pages }: { pages: Page[] }) {
  const [links, setLinks] = useState<ProductLink[]>([]); const [pageId, setPageId] = useState(""); const [url, setUrl] = useState(""); const [message, setMessage] = useState("");
  const refresh = () => api<ProductLink[]>("product-links").then(setLinks).catch((requestError: Error) => setMessage(requestError.message));
  useEffect(() => { void refresh(); }, []);
  const save = async () => { try { await api("product-links", { method: "POST", body: JSON.stringify({ pageId, platform: "amazon", market: "US", label: "Get This Artwork as a Poster", url }) }); setUrl(""); setMessage("Amazon link saved."); void refresh(); } catch (saveError) { setMessage((saveError as Error).message); } };
  const update = async (link: ProductLink, enabled: boolean, nextUrl = link.url) => { try { await api(`product-links/${link.id}`, { method: "PATCH", body: JSON.stringify({ pageId: link.page_id, platform: link.platform, market: link.market, label: "Get This Artwork as a Poster", url: nextUrl, enabled }) }); setMessage(enabled ? "Amazon link updated." : "Amazon link disabled."); void refresh(); } catch (updateError) { setMessage((updateError as Error).message); } };
  const edit = (link: ProductLink) => { const nextUrl = window.prompt("Amazon URL", link.url); if (nextUrl && nextUrl !== link.url) void update(link, Boolean(link.enabled), nextUrl); };
  return <><div className={styles.heading}><div><p className="eyebrow">Amazon Links</p><h1>Poster links</h1></div></div><div className={styles.panel}><select value={pageId} onChange={(event) => setPageId(event.target.value)}><option value="">Choose coloring page</option>{pages.map((page) => <option key={page.id} value={page.id}>{page.title}</option>)}</select><input className={styles.search} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://www.amazon.com/..." /><button disabled={!pageId || !url} onClick={save}>Save Amazon URL</button>{message && <p>{message}</p>}</div><div className={styles.list}>{links.map((link) => <article key={link.id}><div className={styles.thumb}>Amazon</div><div><strong>{link.title}</strong><span>{link.url}</span></div><span className={styles.status}>{link.enabled ? "Enabled" : "Disabled"}</span><button onClick={() => edit(link)}>Edit</button><button className={styles.secondary} onClick={() => void update(link, !Boolean(link.enabled))}>{link.enabled ? "Disable" : "Enable"}</button></article>)}</div></>;
}
