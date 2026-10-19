-- Anime character collection: entries 130 through 182. Safe to re-run.
PRAGMA foreign_keys = ON;

WITH RECURSIVE entries(number) AS (
  SELECT 130
  UNION ALL
  SELECT number + 1 FROM entries WHERE number < 182
)
INSERT OR IGNORE INTO coloring_pages (
  id, content_type, title, slug, short_description, line_art_url, color_reference_url,
  thumbnail_url, featured, status, sort_order, source_key
)
SELECT
  'page-anime-october-' || number,
  'standard',
  'Anime Character ' || number || ' Coloring Page',
  'anime-character-' || number,
  'Printable anime character line art with a color reference.',
  '/coloring-pages/anime-characters-october/anime-character-' || number || '-line.jpg',
  '/coloring-pages/anime-characters-october/anime-character-' || number || '-color.jpg',
  '/coloring-pages/anime-characters-october/anime-character-' || number || '-line.jpg',
  CASE WHEN number < 138 THEN 1 ELSE 0 END,
  'published',
  900 + number,
  'standard:anime-october:' || number
FROM entries;

INSERT OR REPLACE INTO page_categories (page_id, category_id, is_primary)
SELECT id, 'cat-anime-character-art', 1
FROM coloring_pages
WHERE source_key LIKE 'standard:anime-october:%';
