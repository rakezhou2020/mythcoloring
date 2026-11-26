-- Remove the rejected November 2 page and its dependent admin relationships.
DELETE FROM page_categories
WHERE page_id IN (
  SELECT id FROM coloring_pages
  WHERE source_key = 'standard:halloween:november-2-haunted-gingerbread-house'
);

DELETE FROM page_themes
WHERE page_id IN (
  SELECT id FROM coloring_pages
  WHERE source_key = 'standard:halloween:november-2-haunted-gingerbread-house'
);

DELETE FROM product_links
WHERE page_id IN (
  SELECT id FROM coloring_pages
  WHERE source_key = 'standard:halloween:november-2-haunted-gingerbread-house'
);

DELETE FROM coloring_pages
WHERE source_key = 'standard:halloween:november-2-haunted-gingerbread-house';
