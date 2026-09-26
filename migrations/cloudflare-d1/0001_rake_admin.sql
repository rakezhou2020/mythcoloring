-- MythColoring Rake admin: relational content model.
-- Apply once to the MYTHCOLORING_DB D1 database before importing existing data.
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'hidden')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS themes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  cover_media_id TEXT,
  cover_url TEXT,
  short_description TEXT NOT NULL DEFAULT '',
  long_description TEXT NOT NULL DEFAULT '',
  seo_title TEXT,
  meta_description TEXT,
  canonical TEXT,
  featured INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1)),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'hidden')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coloring_pages (
  id TEXT PRIMARY KEY,
  content_type TEXT NOT NULL DEFAULT 'mythology' CHECK (content_type IN ('mythology', 'standard')),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  creature_slug TEXT,
  short_description TEXT NOT NULL DEFAULT '',
  long_description TEXT NOT NULL DEFAULT '',
  line_art_url TEXT,
  color_reference_url TEXT,
  finished_url TEXT,
  thumbnail_url TEXT,
  print_pdf_url TEXT,
  product_type TEXT,
  difficulty TEXT,
  color_count INTEGER,
  seo_title TEXT,
  meta_description TEXT,
  canonical TEXT,
  featured INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1)),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'hidden')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  source_key TEXT UNIQUE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS page_categories (
  page_id TEXT NOT NULL,
  category_id TEXT NOT NULL,
  is_primary INTEGER NOT NULL DEFAULT 0 CHECK (is_primary IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (page_id, category_id),
  FOREIGN KEY (page_id) REFERENCES coloring_pages(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS page_themes (
  page_id TEXT NOT NULL,
  theme_id TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (page_id, theme_id),
  FOREIGN KEY (page_id) REFERENCES coloring_pages(id) ON DELETE CASCADE,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  mime_type TEXT,
  byte_size INTEGER,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  storage_key TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_links (
  id TEXT PRIMARY KEY,
  page_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  market TEXT,
  label TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1 CHECK (enabled IN (0, 1)),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (page_id) REFERENCES coloring_pages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admin_audit_log (
  id TEXT PRIMARY KEY,
  actor_email TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pages_status_sort ON coloring_pages(status, sort_order, title);
CREATE INDEX IF NOT EXISTS idx_pages_featured ON coloring_pages(featured);
CREATE INDEX IF NOT EXISTS idx_page_categories_category ON page_categories(category_id, page_id);
CREATE INDEX IF NOT EXISTS idx_page_themes_theme ON page_themes(theme_id, page_id);
CREATE INDEX IF NOT EXISTS idx_product_links_page ON product_links(page_id, enabled, sort_order);
CREATE INDEX IF NOT EXISTS idx_media_url ON media(url);
