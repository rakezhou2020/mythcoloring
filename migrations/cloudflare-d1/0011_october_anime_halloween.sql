-- October anime characters and Halloween collection. Safe to re-run.
PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO categories (id, name, slug, description, sort_order, status) VALUES
  ('cat-halloween', 'Halloween', 'halloween', 'Friendly ghosts, bats, vampires, and other spooky-season coloring pages.', 42, 'published');

WITH entries(slug, name, category_id, line_asset, color_asset) AS (VALUES
  ('anime-friends-living-room','Anime Friends in a Living Room','cat-anime-character-art','340d0132-ddbf-4c80-935b-1630d495ff7f','33759361-b9f8-4fc2-9df1-e6ca7cc45bc8'),
  ('anime-girl-formal-dress','Anime Girl in a Formal Dress','cat-anime-character-art','efe0293c-04c3-4b18-9f39-bbaaf085e4f4','9c1766a9-9b6c-4cf6-985d-4abea0351937'),
  ('anime-schoolgirl-backpack','Anime Schoolgirl with Backpack','cat-anime-character-art','0ceaa41f-9d88-4aba-9f78-8c87d35654ef','6f2b8133-02e0-4382-b77a-96237203093e'),
  ('anime-bandana-girl','Anime Bandana Girl','cat-anime-character-art','5a17a9d6-cd0b-447f-8ea3-d5b51b445ee8','a462e81c-070b-4ffc-8638-d9ac907d6d04'),
  ('anime-girl-with-crayon','Anime Girl with a Giant Crayon','cat-anime-character-art','10a1ea4e-9fa8-4f00-a8f9-c421ceb9e39c','7b6b6565-4310-4b35-bb2a-6f03b1efa087'),
  ('anime-bandana-teacher','Anime Bandana Teacher','cat-anime-character-art','1a1d481f-7bf4-418f-b40b-4e050563922b','168ce80a-bc64-4fe6-92ac-78977409c9de'),
  ('friendly-skull','Friendly Skull','cat-halloween','0cb66801-71b7-4acd-8ebc-6034b01a85bc','db7ddcc5-acd3-4272-be20-c97546620be3'),
  ('little-vampire','Little Vampire','cat-halloween','ce5a1189-0ede-4e86-a49e-a6020ecca16a','d09aeec9-ee47-4218-bb8e-366eed576896'),
  ('ghost-witch','Ghost Witch','cat-halloween','fc9e3abb-7b71-48f3-aae4-a42bddddaee4','04acdbbf-439f-45e7-8f59-f71704da0041'),
  ('friendly-bat','Friendly Bat','cat-halloween','c8581daf-c3f9-4434-9533-9536d3a29557','159adb26-2e70-49e9-93e0-0dbf3e65bc12'),
  ('vampire-bat','Vampire Bat','cat-halloween','1b98efb1-f0b1-444c-841f-53ff5b9ac240','936bdee4-7586-49e7-9b8f-ba4a7c27a5fa'),
  ('bat-with-balloon','Bat with a Balloon','cat-halloween','4ab5e3ba-f42a-4a32-9179-6563daad8386','09042875-a32f-4b97-9aa9-442eb3da5194')
)
INSERT OR IGNORE INTO coloring_pages (id, content_type, title, slug, short_description, line_art_url, color_reference_url, thumbnail_url, featured, status, sort_order, source_key)
SELECT 'page-october-' || slug, 'standard', name || ' Coloring Page', slug,
  'Printable line art with a matching color reference.',
  '/coloring-pages/october-anime-halloween/codex-clipboard-' || line_asset || '.png',
  '/coloring-pages/october-anime-halloween/codex-clipboard-' || color_asset || '.png',
  '/coloring-pages/october-anime-halloween/codex-clipboard-' || line_asset || '.png',
  CASE WHEN row_number() OVER () <= 6 THEN 1 ELSE 0 END, 'published', 1200 + row_number() OVER (), 'standard:october-anime-halloween:' || slug
FROM entries;

WITH entries(slug, category_id) AS (VALUES
  ('anime-friends-living-room','cat-anime-character-art'),('anime-girl-formal-dress','cat-anime-character-art'),('anime-schoolgirl-backpack','cat-anime-character-art'),('anime-bandana-girl','cat-anime-character-art'),('anime-girl-with-crayon','cat-anime-character-art'),('anime-bandana-teacher','cat-anime-character-art'),('friendly-skull','cat-halloween'),('little-vampire','cat-halloween'),('ghost-witch','cat-halloween'),('friendly-bat','cat-halloween'),('vampire-bat','cat-halloween'),('bat-with-balloon','cat-halloween')
)
INSERT OR REPLACE INTO page_categories (page_id, category_id, is_primary)
SELECT 'page-october-' || slug, category_id, 1 FROM entries;
