-- Keep the Rake theme relationship in sync with the published Seasonal theme.
-- This is idempotent: the composite primary key prevents duplicate links.
INSERT OR IGNORE INTO page_themes (page_id, theme_id)
SELECT page.id, theme.id
FROM coloring_pages AS page
CROSS JOIN themes AS theme
WHERE page.source_key LIKE 'standard:halloween:october-29-%'
  AND theme.slug = 'seasonal';
