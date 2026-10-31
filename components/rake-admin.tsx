"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./rake-admin.module.css";

type Page = { id: string; title: string; slug: string; thumbnail_url: string | null; categories?: string; themes?: string; theme_ids?: string; status: string; product_link_count: number; updated_at: string };
type Dashboard = { totals: number[]; recent: Page[] };
type Taxonomy = { id: string; name: string; slug: string; page_count?: number };
type ProductLink = { id: string; page_id: string; title: string; slug: string; thumbnail_url: string | null; url: string; platform: string; market: string | null; enabled: number };
type AuthState = "loading" | "guest" | "admin";
type RelationshipAction = "set_category" | "assign_theme" | "remove_theme";

const ui = {
  dashboard: "控制台", pages: "涂色页面", themes: "主题管理", amazonLinks: "商品链接", logout: "退出登录",
  loadingWorkspace: "正在加载后台…", contentAdmin: "内容管理后台", privateWorkspace: "私有工作区", sessionActive: "登录状态正常",
  searchTitleSlug: "按标题或 slug 搜索", searchPages: "搜索涂色页面", allCategories: "全部分类", allThemes: "全部主题", clearFilters: "清除筛选",
  chooseCategory: "选择分类", chooseTheme: "选择主题", assignCategory: "分配分类", addTheme: "加入主题", removeTheme: "移出主题",
  selected: "已选择", visible: "当前可见", clear: "清除", preview: "预览", titleSlug: "标题 / slug", category: "分类", status: "状态", updated: "更新时间",
  amazon: "Amazon", actions: "操作", unassigned: "未分类", noPages: "没有符合当前筛选条件的涂色页面。",
  save: "保存", cancel: "取消", edit: "编辑", disable: "停用", enable: "启用", missing: "未添加", linked: "已关联",
};

const nav = [[ui.dashboard, "/rake/"], [ui.pages, "/rake/coloring-pages/"], [ui.themes, "/rake/themes/"], [ui.amazonLinks, "/rake/product-links/"]];
const localizeError = (message: string) => {
  if (/[\u4e00-\u9fff]/.test(message)) return message;
  if (/incorrect password/i.test(message)) return "密码错误";
  if (/administrator login is required|unauthorized/i.test(message)) return "未登录或无权限";
  if (/session/i.test(message)) return "登录已过期，请重新登录";
  if (/not configured/i.test(message)) return "后台服务配置不完整";
  return "操作失败，请稍后重试";
};
const statusLabel = (value: string) => ({ published: "已发布", draft: "草稿", hidden: "已隐藏", Linked: ui.linked, Missing: ui.missing, Enabled: "已启用", Disabled: "已停用" }[value] ?? value);
const api = async <T,>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`/api/rake/${path}`, { ...init, credentials: "same-origin", headers: { "content-type": "application/json", ...(init?.headers ?? {}) } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(localizeError(payload.error ?? ""));
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
      } catch (loadError) { setError(localizeError((loadError as Error).message)); }
    };
    void load();
  }, [auth, section, query, categoryFilter, themeFilter]);

  const runRelationship = async (action: RelationshipAction, targetId: string) => {
    if (!selected.length || !targetId) return;
    try {
      await api("relationships", { method: "POST", body: JSON.stringify({ action, targetId, pageIds: selected }) });
      setNotice(`已更新 ${selected.length} 个涂色页面。`);
      setSelected([]);
      await Promise.all([refreshPages(), refreshTaxonomy()]);
    } catch (operationError) { setError(localizeError((operationError as Error).message)); }
  };
  const logout = async () => { await api("logout", { method: "POST" }).catch(() => undefined); setDashboard(null); setPages([]); setSelected([]); setAuth("guest"); navigate("/rake/"); };

  if (auth === "loading") return <div className={styles.loginShell}><p>{ui.loadingWorkspace}</p></div>;
  if (auth === "guest") return <Login onSuccess={() => setAuth("admin")} />;

  return <div className={styles.shell}>
    <aside className={styles.sidebar}>
      <div><strong>MythColoring</strong><span>{ui.contentAdmin}</span></div>
      <nav>{nav.map(([label, href]) => <a key={href} className={section === (href.split("/").filter(Boolean)[1] ?? "dashboard") ? styles.active : ""} href={href} onClick={(event) => { event.preventDefault(); navigate(href); }}>{label}</a>)}</nav>
      <button className={styles.logout} onClick={logout}>{ui.logout}</button>
    </aside>
    <main className={styles.main}>
      <header className={styles.topbar}><span>{ui.privateWorkspace}</span><span>{ui.sessionActive}</span></header>
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
  return <main className={styles.loginShell}><form className={styles.loginCard} onSubmit={submit}><p className={styles.kicker}>MYTHCOLORING</p><h1>MythColoring 后台管理</h1><p>请输入管理密码以继续。</p><label htmlFor="rake-password">管理密码</label><input id="rake-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required autoFocus />{error && <p className={styles.error}>{error}</p>}<button disabled={saving}>{saving ? "正在登录…" : "登录"}</button></form></main>;
}

function DashboardView({ data, navigate }: { data: Dashboard | null; navigate: (href: string) => void }) {
  const stats = [["涂色页面总数", data?.totals[0]], ["已发布", data?.totals[1]], ["分类总数", data?.totals[5]], ["主题总数", data?.totals[4]], ["已添加 Amazon 链接", data?.totals[7]]];
  return <><div className={styles.heading}><div><p className={styles.kicker}>控制台</p><h1>内容概览</h1><p>管理现有的涂色页面目录和海报商品链接。</p></div><button onClick={() => navigate("/rake/coloring-pages/")}>查看涂色页面</button></div><div className={styles.stats}>{stats.map(([label, value]) => <article key={String(label)}><span>{label}</span><strong>{value ?? "—"}</strong></article>)}</div><section className={styles.tablePanel}><div className={styles.panelHeader}><div><h2>最近新增</h2><p>当前 D1 内容目录中的最新条目。</p></div><button className={styles.textButton} onClick={() => navigate("/rake/coloring-pages/")}>查看全部</button></div><table><thead><tr><th>标题</th><th>{ui.status}</th><th>{ui.updated}</th></tr></thead><tbody>{data?.recent.map((page) => <tr key={page.id}><td><strong>{page.title}</strong><small>/{page.slug}</small></td><td><Status value={page.status} /></td><td>{dateLabel(page.updated_at)}</td></tr>)}</tbody></table></section></>;
}

function PagesView({ pages, categories, themes, query, setQuery, categoryFilter, setCategoryFilter, themeFilter, setThemeFilter, selected, setSelected, runRelationship }: { pages: Page[]; categories: Taxonomy[]; themes: Taxonomy[]; query: string; setQuery: (value: string) => void; categoryFilter: string; setCategoryFilter: (value: string) => void; themeFilter: string; setThemeFilter: (value: string) => void; selected: string[]; setSelected: (value: string[]) => void; runRelationship: (action: RelationshipAction, targetId: string) => void }) {
  const [categoryId, setCategoryId] = useState(""); const [themeId, setThemeId] = useState("");
  return <><div className={styles.heading}><div><p className={styles.kicker}>{ui.pages}</p><h1>页面目录</h1><p>找到 {pages.length} 个涂色页面</p></div></div><section className={styles.toolbar}><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={ui.searchTitleSlug} aria-label={ui.searchPages} /><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option value="">{ui.allCategories}</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><select value={themeFilter} onChange={(event) => setThemeFilter(event.target.value)}><option value="">{ui.allThemes}</option>{themes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>{(query || categoryFilter || themeFilter) && <button className={styles.textButton} onClick={() => { setQuery(""); setCategoryFilter(""); setThemeFilter(""); }}>{ui.clearFilters}</button>}</section><BulkBar selected={selected} setSelected={setSelected} pages={pages} categories={categories} themes={themes} categoryId={categoryId} setCategoryId={setCategoryId} themeId={themeId} setThemeId={setThemeId} runRelationship={runRelationship} /><PageTable pages={pages} selected={selected} setSelected={setSelected} categories={categories} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} /></>;
}

function ThemesView({ pages, themes, selected, setSelected, runRelationship }: { pages: Page[]; themes: Taxonomy[]; selected: string[]; setSelected: (value: string[]) => void; runRelationship: (action: "assign_theme" | "remove_theme", targetId: string) => void }) {
  const [themeId, setThemeId] = useState(""); const [view, setView] = useState<"assigned" | "available">("assigned"); const activeTheme = themeId || themes[0]?.id || ""; const active = themes.find((theme) => theme.id === activeTheme); const assigned = (page: Page) => (page.theme_ids || "").split(",").includes(activeTheme); const assignedPages = pages.filter(assigned); const availablePages = pages.filter((page) => !assigned(page)); const visiblePages = view === "assigned" ? assignedPages : availablePages;
  return <><div className={styles.heading}><div><p className={styles.kicker}>{ui.themes}</p><h1>主题页面分配</h1><p>选择一个主题，再从对应列表中选择涂色页面。</p></div></div><section className={styles.toolbar}><select value={activeTheme} onChange={(event) => { setThemeId(event.target.value); setSelected([]); setView("assigned"); }} aria-label={ui.themes}><option value="">{ui.chooseTheme}</option>{themes.map((theme) => <option key={theme.id} value={theme.id}>{theme.name} ({theme.page_count ?? 0})</option>)}</select><span className={styles.selectionNote}>{active ? `${active.name} 中已有 ${active.page_count ?? 0} 个页面` : "尚未选择主题"}</span></section><div className={styles.segments}><button className={view === "assigned" ? styles.activeSegment : ""} onClick={() => { setView("assigned"); setSelected([]); }}>已包含页面 <span>{assignedPages.length}</span></button><button className={view === "available" ? styles.activeSegment : ""} onClick={() => { setView("available"); setSelected([]); }}>可添加页面 <span>{availablePages.length}</span></button></div>{selected.length > 0 && <section className={styles.bulkBar}><b>{selected.length} {ui.selected}</b>{view === "available" ? <button onClick={() => runRelationship("assign_theme", activeTheme)}>{ui.addTheme}</button> : <button className={styles.secondary} onClick={() => runRelationship("remove_theme", activeTheme)}>{ui.removeTheme}</button>}<button className={styles.textButton} onClick={() => setSelected([])}>{ui.clear}</button></section>}<PageTable pages={visiblePages} selected={selected} setSelected={setSelected} />{!visiblePages.length && <p className={styles.empty}>{view === "available" ? "当前所有涂色页面都已在此主题中。" : "此主题暂未包含涂色页面，请打开“可添加页面”开始分配。"}</p>}</>;
}

function BulkBar({ selected, setSelected, pages, categories, themes, categoryId, setCategoryId, themeId, setThemeId, runRelationship }: { selected: string[]; setSelected: (value: string[]) => void; pages: Page[]; categories: Taxonomy[]; themes: Taxonomy[]; categoryId: string; setCategoryId: (value: string) => void; themeId: string; setThemeId: (value: string) => void; runRelationship: (action: RelationshipAction, targetId: string) => void }) {
  if (!selected.length) return null; return <section className={styles.bulkBar}><b>{selected.length} {ui.selected}</b><select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}><option value="">{ui.chooseCategory}</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><button disabled={!categoryId} onClick={() => runRelationship("set_category", categoryId)}>{ui.assignCategory}</button><select value={themeId} onChange={(event) => setThemeId(event.target.value)}><option value="">{ui.chooseTheme}</option>{themes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><button disabled={!themeId} onClick={() => runRelationship("assign_theme", themeId)}>{ui.addTheme}</button><button className={styles.secondary} disabled={!themeId} onClick={() => runRelationship("remove_theme", themeId)}>{ui.removeTheme}</button><button className={styles.textButton} onClick={() => setSelected([])}>{ui.clear}</button><span>{pages.length} {ui.visible}</span></section>;
}

function PageTable({ pages, selected, setSelected, categories, categoryFilter, setCategoryFilter }: { pages: Page[]; selected: string[]; setSelected: (value: string[]) => void; categories?: Taxonomy[]; categoryFilter?: string; setCategoryFilter?: (value: string) => void }) {
  const visibleIds = pages.map((page) => page.id); const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selected.includes(id)); const toggleAll = () => setSelected(allSelected ? selected.filter((id) => !visibleIds.includes(id)) : [...new Set([...selected, ...visibleIds])]); const toggle = (id: string) => setSelected(selected.includes(id) ? selected.filter((value) => value !== id) : [...selected, id]);
  return <section className={styles.tablePanel}><div className={styles.tableScroll}><table><thead><tr><th><input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="全选当前可见页面" /></th><th>{ui.preview}</th><th>{ui.titleSlug}</th><th>{categories && setCategoryFilter ? <label className={styles.columnFilter}>{ui.category}<select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="按分类筛选"><option value="">全部</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label> : ui.category}</th><th>{ui.themes}</th><th>{ui.amazon}</th><th>{ui.status}</th></tr></thead><tbody>{pages.map((page) => <tr key={page.id}><td><input type="checkbox" checked={selected.includes(page.id)} onChange={() => toggle(page.id)} aria-label={`选择 ${page.title}`} /></td><td>{page.thumbnail_url ? <img className={styles.thumb} src={page.thumbnail_url} alt="" /> : <span className={styles.emptyThumb}>—</span>}</td><td><strong>{page.title}</strong><small>/{page.slug}</small></td><td>{page.categories || <span className={styles.muted}>{ui.unassigned}</span>}</td><td>{page.themes || <span className={styles.muted}>—</span>}</td><td><Status value={page.product_link_count ? "Linked" : "Missing"} /></td><td><Status value={page.status} /></td></tr>)}</tbody></table></div>{!pages.length && <p className={styles.empty}>{ui.noPages}</p>}</section>;
}

function ProductLinksView({ pages, onNotice, onError }: { pages: Page[]; onNotice: (value: string) => void; onError: (value: string) => void }) {
  const [links, setLinks] = useState<ProductLink[]>([]); const [pageId, setPageId] = useState(""); const [url, setUrl] = useState(""); const [editing, setEditing] = useState<ProductLink | null>(null); const [saving, setSaving] = useState(false);
  const refresh = () => api<ProductLink[]>("product-links").then(setLinks).catch((requestError: Error) => onError(localizeError(requestError.message)));
  useEffect(() => { void refresh(); }, []);
  const reset = () => { setEditing(null); setPageId(""); setUrl(""); };
  const choosePage = (nextPageId: string) => { const existing = links.find((link) => link.page_id === nextPageId && link.platform === "amazon"); setPageId(nextPageId); if (existing) { setEditing(existing); setUrl(existing.url); } else { setEditing(null); setUrl(""); } };
  const save = async (event: FormEvent) => { event.preventDefault(); if (!pageId || !url) return; setSaving(true); try { if (editing) await api(`product-links/${editing.id}`, { method: "PATCH", body: JSON.stringify({ pageId, platform: "amazon", market: "US", label: "Get This Artwork as a Poster", url, enabled: Boolean(editing.enabled) }) }); else await api("product-links", { method: "POST", body: JSON.stringify({ pageId, platform: "amazon", market: "US", label: "Get This Artwork as a Poster", url }) }); onNotice(editing ? "Amazon 链接更新成功。" : "Amazon 链接保存成功。"); reset(); await refresh(); } catch (saveError) { onError(localizeError((saveError as Error).message)); } finally { setSaving(false); } };
  const toggle = async (link: ProductLink) => { try { await api(`product-links/${link.id}`, { method: "PATCH", body: JSON.stringify({ pageId: link.page_id, platform: link.platform, market: link.market, label: "Get This Artwork as a Poster", url: link.url, enabled: !Boolean(link.enabled) }) }); onNotice(link.enabled ? "Amazon 链接已停用。" : "Amazon 链接已启用。"); await refresh(); } catch (toggleError) { onError(localizeError((toggleError as Error).message)); } };
  return <><div className={styles.heading}><div><p className={styles.kicker}>{ui.amazonLinks}</p><h1>海报商品链接</h1><p>当前有 {links.filter((link) => link.enabled).length} 条已启用链接</p></div></div><section className={styles.formPanel}><h2>{editing ? "编辑 Amazon 链接" : "添加 Amazon 链接"}</h2><form onSubmit={save}><select value={pageId} onChange={(event) => choosePage(event.target.value)} required><option value="">选择涂色页面</option>{pages.map((page) => <option key={page.id} value={page.id}>{page.title}</option>)}</select><input type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://www.amazon.com/..." required /><button disabled={saving}>{saving ? "正在保存…" : editing ? "保存修改" : "添加 Amazon 链接"}</button>{editing && <button type="button" className={styles.secondary} onClick={reset}>{ui.cancel}</button>}</form></section><section className={styles.tablePanel}><div className={styles.tableScroll}><table><thead><tr><th>{ui.preview}</th><th>涂色页面</th><th>Amazon 链接</th><th>{ui.status}</th><th>{ui.actions}</th></tr></thead><tbody>{links.map((link) => <tr key={link.id}><td>{link.thumbnail_url ? <img className={styles.thumb} src={link.thumbnail_url} alt="" /> : <span className={styles.emptyThumb}>—</span>}</td><td><strong>{link.title}</strong><small>/{link.slug}</small></td><td className={styles.url}><a href={link.url} target="_blank" rel="noreferrer">打开 Amazon 链接</a></td><td><Status value={link.enabled ? "Enabled" : "Disabled"} /></td><td><div className={styles.rowActions}><button className={styles.secondary} onClick={() => { setEditing(link); setPageId(link.page_id); setUrl(link.url); }}>{ui.edit}</button><button className={styles.textButton} onClick={() => void toggle(link)}>{link.enabled ? ui.disable : ui.enable}</button></div></td></tr>)}</tbody></table></div>{!links.length && <p className={styles.empty}>暂未添加 Amazon 链接。</p>}</section></>;
}

function Status({ value }: { value: string }) { return <span className={`${styles.status} ${styles[`status${value.replace(/[^a-z]/gi, "")}`] ?? ""}`}>{statusLabel(value)}</span>; }
function dateLabel(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("zh-CN", { year: "numeric", month: "short", day: "numeric" }); }


