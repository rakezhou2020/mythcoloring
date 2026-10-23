-- Halloween character collection. Safe to re-run.
PRAGMA foreign_keys = ON;

WITH entries(slug, name, line_asset, color_asset) AS (VALUES
  ('cute-ghost','Cute Ghost','c84bc1b5-f3c1-438c-9b70-eea47f7dc63c.jpg','325e05a2-b621-4358-9f15-6904bf1c7187.jpg'),
  ('little-vampire-boy','Little Vampire Boy','d41d3883-dc35-439b-bbcb-f569171fd20a.jpg','cff0a86a-04a8-4d40-a89f-f5e6c444c980.jpg'),
  ('vampire-pumpkin-treat-bag','Vampire with a Pumpkin Treat Bag','776c103a-2fd6-44b2-80d4-36d8e7039239.jpg','5d1cc2b6-03f0-4899-bda7-bf392385b0ae.jpg'),
  ('little-witch','Little Witch','81b97a03-a16c-4095-a9ef-67867126f911.jpg','d0bc01da-12db-4b0e-9446-b92ac8662842.jpg'),
  ('mummy-vampire','Mummy Vampire','0027feca-7d22-4a9d-a4e5-43384a04991a.jpg','c91353c4-c0a1-4d4f-be5d-da9afc6045e7.jpg'),
  ('haunted-house','Haunted House','b33a6a2a-11c1-466a-a509-5cba6c7e781b.jpg','f01a6168-ad5f-44e6-8562-23ba1cdb25fc.jpg'),
  ('cute-skull','Cute Skull','b14c401e-ff9c-4588-a468-d868c6388dab.jpg','38bbc6f8-080a-46c4-b30d-32be222a03d2.jpg'),
  ('chibi-costumed-character','Chibi Costumed Character','b83a7fc1-c280-422b-a311-bfd9524fe443.jpg','a9d9ce96-6257-4a33-a82b-022595a3037a.jpg'),
  ('witch-on-broom','Witch on a Broom','78620b0b-0bce-4ae9-b77e-20128e7bf4b7.jpg','6f53ce93-028a-4bd2-a619-dc32cab8689c.jpg'),
  ('flying-bat','Flying Bat','80d133b8-0fd2-473f-9032-f500366c4420.jpg','947a4aa1-512d-4863-af52-4e99e7bbd3bf.jpg'),
  ('vampire-girl','Vampire Girl','d016fca8-c41c-4932-9fc4-2d75d4bc613a.jpg','4e915bf8-29f5-42a3-aa00-fa6c79391582.jpg'),
  ('waving-vampire','Waving Vampire','4c934744-0c5f-424b-ada7-02f7298c4c50.png','67f12fba-39b6-4fda-b00d-8f902d85f995.png'),
  ('waving-ghost','Waving Ghost','d89c2c74-084c-4b3e-b0ed-f8d2ee962be9.png','d21434dc-269d-47d0-ab18-faf53f872bc0.png'),
  ('waving-mummy','Waving Mummy','fcb980f5-dad3-4eab-82ec-3c81770134bd.png','1b696bab-8131-445f-a7c4-0d7882afc41c.png'),
  ('mummy-peace-sign','Mummy Peace Sign','ddbe2bba-6f0e-48ef-a140-41ffa73bb261.png','fd38f35f-ee30-4155-a397-73b1276e8f38.png'),
  ('flying-witch','Flying Witch','977a87d4-accc-4445-8358-b48a424f4de0.png','1ac5ee7c-2bb0-4709-abe8-9124bb7b8240.png'),
  ('ghost-witch-pumpkin','Ghost Witch on a Pumpkin','bf52c316-89ed-41fa-9a60-ad2df7d12ca9.png','1cdc3bb7-cec0-4e9f-b3ae-d1377b6be939.png'),
  ('stacked-pumpkins','Stacked Pumpkin Candles','f2809074-c155-4374-befb-e41e6f8ab5ef.png','54373827-565e-4d12-aeec-3895c88b2b87.png'),
  ('vampire-with-bats','Vampire with Bats','e40e562e-e281-4507-8ca6-7f52d7cfc64b.jpg','a7d52453-390c-440e-8915-872ab783f593.jpg'),
  ('mummy-with-present','Mummy with a Present','acf060eb-39d8-419a-93c0-105113f02dc1.png','46d68f5f-c1c6-42e1-b39a-3b6161a0bfe3.png'),
  ('werewolf','Friendly Werewolf','75ab5220-159f-4a83-8462-7aacc791da8b.png','c5be6983-e9df-4766-bcb1-0ba0fe8c9d6c.png'),
  ('jack-o-lantern','Jack-o''-Lantern','5c269df1-b272-4edd-9d62-db85bfd42cfc.png','8ce21b2a-8ac4-4dd2-b156-8c13eec15fda.png'),
  ('dancing-mummy','Dancing Mummy','077cc380-3658-403c-89f8-d19aa2ada41a.jpg','90cdb4c8-e5b8-44e4-b79c-99d4945fa970.png')
)
INSERT OR IGNORE INTO coloring_pages (id, content_type, title, slug, short_description, line_art_url, color_reference_url, thumbnail_url, featured, status, sort_order, source_key)
SELECT 'page-october-' || slug, 'standard', name || ' Coloring Page', slug,
  'Printable line art with a matching color reference.',
  '/coloring-pages/october-halloween-characters/codex-clipboard-' || line_asset,
  '/coloring-pages/october-halloween-characters/codex-clipboard-' || color_asset,
  '/coloring-pages/october-halloween-characters/codex-clipboard-' || line_asset,
  CASE WHEN row_number() OVER () <= 8 THEN 1 ELSE 0 END, 'published', 1300 + row_number() OVER (), 'standard:october-halloween-characters:' || slug
FROM entries;

INSERT OR REPLACE INTO page_categories (page_id, category_id, is_primary)
SELECT id, 'cat-halloween', 1
FROM coloring_pages
WHERE source_key LIKE 'standard:october-halloween-characters:%';
