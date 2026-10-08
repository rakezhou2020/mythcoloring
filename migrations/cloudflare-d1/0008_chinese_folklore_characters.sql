-- Chinese folklore character coloring collection. Safe to re-run.
PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO categories (id, name, slug, description, sort_order, status) VALUES
  ('cat-chinese-folklore-characters', 'Chinese Folklore Characters', 'chinese-folklore-characters', 'Traditional-inspired scholars, travelers, musicians, warriors, and folk characters to color.', 40, 'published');

WITH entries(slug, name, line_asset, color_asset) AS (VALUES
  ('scholar-with-flute','Scholar with Flute','731f8964-9679-4e43-95fd-e8f0801f95ee','c06fcfa8-5512-4b28-8dd2-88c71cc2ceb9'),
  ('praying-monk','Praying Monk','0393ef93-990f-4b25-8976-f998f372ab5e','ba8a58ce-743b-443d-b855-521ca7fbf19d'),
  ('folk-drummer','Folk Drummer','bbfdec44-7c7c-47cb-8ea8-af0eac31c617','60e81a31-27c3-4a81-91ff-9e744edc9fb9'),
  ('traveling-musician','Traveling Musician','f0ad3d97-4700-4ab5-811c-18c2105987b1','9b54ac14-0af8-468f-aba3-6cc47df4026f'),
  ('flower-crowned-traveler','Flower-Crowned Traveler','a124ba5c-5556-4eb1-80a4-213b236e7a5b','c9cdf2ba-869f-4545-ae55-e9a0e318a2e4'),
  ('bearded-folk-elder','Bearded Folk Elder','a7553eaf-249a-485a-beab-2c268de7a0d6','a89513b6-ede8-45b0-ab9e-a6a580061134'),
  ('elegant-robed-woman','Elegant Robed Woman','28e58614-1de8-4cdc-b736-7f44ecb4f0ab','e6ff1e05-c245-46a1-a2d4-5ed6fb8e8cab'),
  ('graceful-court-lady','Graceful Court Lady','21646e40-83af-4119-ae6a-f1bd9be5461d','96795a85-0441-4f30-9a76-146d314b1384'),
  ('court-scholar','Court Scholar','187a7e34-a804-4a95-8cc1-0f22f002b8c2','4bd6ba49-5b62-413a-9278-3de2180718f5'),
  ('crescent-blade-monk','Crescent-Blade Monk','380b526a-6c93-487b-bd0e-cb3e37d63c8d','edc038aa-713d-4338-9f88-d72f54d413b2'),
  ('flowered-hat-wanderer','Flowered-Hat Wanderer','b9e35a54-2fcc-492a-a30a-9a52ba8aca12','7ed3001b-4273-40f8-81f5-ae223ee7c8a6'),
  ('flower-bearer','Flower Bearer','130af427-ea9d-4014-b710-56260ba61d23','a2b18a39-3424-411e-81fe-945739cd69e9'),
  ('folk-wanderer','Folk Wanderer','04ccc829-860d-436e-982c-1266b9e1e677','d9c91480-615e-4ecd-ac50-7f1013e929e4'),
  ('spear-bearer','Spear Bearer','abd595f3-ebf4-4932-b936-2ef78bebde45','456703af-9f99-44dc-bc5f-18406b99394a'),
  ('fisherman','Fisherman','df0f097f-9ab7-4968-98ee-23d723b04226','97779921-6303-4eae-aad6-4a38a1b1c0d4'),
  ('hooded-archer','Hooded Archer','1fe55c2d-8974-436d-b172-be6b83374115','cd9129ec-93e6-47a1-8b55-010c0bce5d9e'),
  ('fur-cloaked-hunter','Fur-Cloaked Hunter','641bf92e-6b42-4ab0-9aad-58f6d52f914f','b0358392-e471-4ac0-9401-79c8cabcc5f0'),
  ('crouching-porter','Crouching Porter','04c04098-a2dc-4eb6-9359-e88795302bb3','33dbb7d4-b01b-4271-82b5-88971c3fb796'),
  ('halberd-general','Halberd General','209a4222-64ba-41fa-9f72-4bc4c699052a','33a997cd-5abc-4f1f-8a39-2b7e5430adcc'),
  ('feathered-traveler','Feathered Traveler','bca69701-d1a8-45eb-9a9b-8c9a0c4194a5','634aa434-bcfc-4212-9868-89aa5cdd8b6d'),
  ('curved-blade-warrior','Curved-Blade Warrior','9e162094-cbdc-468f-8556-cb7d7fb18cb1','6b82c883-c8f8-48aa-a848-1ebef5514f73'),
  ('ritual-attendant','Ritual Attendant','98f5ddee-5424-4504-924a-eac7340f3286','82ebb6eb-b726-45ee-a6d3-a296074c8829'),
  ('armored-scholar-warrior','Armored Scholar Warrior','603ae2d2-382f-464d-884c-fb1ae46c82d8','54308b12-5724-424c-bfba-e36220803de9'),
  ('fur-crowned-warrior','Fur-Crowned Warrior','4747d661-a934-494b-9b4c-2668c6f3ca4e','344cb601-c17a-4480-8223-a0f153e7354e'),
  ('chain-bearing-wanderer','Chain-Bearing Wanderer','69badd20-79d2-4fb2-9342-d56eb58163d1','707dffe9-e31b-4bd9-839a-439893c16079'),
  ('beaded-ritualist','Beaded Ritualist','9d6d5834-616b-4dc8-86bf-6c7f2149675c','25e8926c-e53d-433a-89bb-7f6da64b4c90')
)
INSERT OR IGNORE INTO coloring_pages (id, content_type, title, slug, short_description, line_art_url, color_reference_url, thumbnail_url, featured, status, sort_order, source_key)
SELECT 'page-folklore-' || slug, 'standard', name || ' Coloring Page', slug, 'Chinese folklore-inspired printable character illustration.',
  '/coloring-pages/chinese-folklore/codex-clipboard-' || line_asset || '.jpg', '/coloring-pages/chinese-folklore/codex-clipboard-' || color_asset || '.jpg', '/coloring-pages/chinese-folklore/codex-clipboard-' || line_asset || '.jpg',
  CASE WHEN slug IN ('scholar-with-flute','praying-monk','folk-drummer','traveling-musician','elegant-robed-woman','halberd-general') THEN 1 ELSE 0 END, 'published', 800 + row_number() OVER (), 'standard:folklore:' || slug
FROM entries;

INSERT OR REPLACE INTO page_categories (page_id, category_id, is_primary)
SELECT id, 'cat-chinese-folklore-characters', 1 FROM coloring_pages WHERE source_key LIKE 'standard:folklore:%';
