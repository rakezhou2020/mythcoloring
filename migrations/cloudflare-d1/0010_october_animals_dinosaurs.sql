-- October animals and dinosaurs collection. Safe to re-run.
PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO categories (id, name, slug, description, sort_order, status) VALUES
  ('cat-dinosaurs', 'Dinosaurs', 'dinosaurs', 'Friendly dinosaur coloring pages, from playful cartoons to detailed prehistoric favorites.', 41, 'published');

WITH entries(slug, name, category_id, line_asset, color_asset) AS (VALUES
  ('anime-swirled-eyes-girl','Swirled-Eyes Anime Girl','cat-anime-character-art','0489577c-883c-4c9d-98fd-19be1c147c0e.jpg','068d8a00-c6e2-4230-9ec4-d5fa739e63b9.jpg'),
  ('banded-salamander','Banded Salamander','cat-animals','e61fa9ef-b819-4257-99b9-97b04f7d4186.jpg','e326dacf-6e9a-4b11-bb98-7bdcec4950aa.jpg'),
  ('spotted-gecko','Spotted Gecko','cat-animals','420e8cc0-fe8c-4763-9e56-c458fa3f07e1.jpg','87f1103c-4d74-4685-b912-1a1a53864620.jpg'),
  ('green-gecko','Green Gecko','cat-animals','ad5605db-36bd-4103-a053-285fa6094c58.jpg','b31bbd3e-00d8-4b9c-8eba-e12f36fb11fc.jpg'),
  ('frog-with-horn','Frog with a Horn','cat-animals','3935ce03-8e78-459c-974e-643df932ed77.jpg','acad11a6-5b81-498d-b4fd-bb5b6e69010a.jpg'),
  ('friendly-tadpole','Friendly Tadpole','cat-animals','6973dd52-d422-46b4-bad1-261dab8280ba.jpg','25865749-ea9f-4007-a995-f539d888cca9.jpg'),
  ('frog-sword-warrior','Frog Sword Warrior','cat-animals','8d7e6e6a-7722-4cdf-af15-d2f42b620176.jpg','581c0925-6e87-46b0-9214-67b5202166d5.jpg'),
  ('two-eyed-gecko','Two-Eyed Gecko','cat-animals','22693f6d-74e2-458a-99fb-6cdc288e85f7.jpg','8bf006f6-2c12-47e8-bdf1-9aadd39cbbac.jpg'),
  ('jumping-frog','Jumping Frog','cat-animals','766be766-28da-4509-ac98-18864f1f1530.jpg','ea5678fe-0a87-4ef2-aa06-3d298f0f7622.jpg'),
  ('frog-painter','Frog Painter','cat-animals','3c3fbe5b-8795-4c09-bb0b-ca07bd953896.jpg','6a17e098-4045-4c81-9c76-56f9c9eb4efe.jpg'),
  ('frog-sipping-drink','Frog Sipping a Drink','cat-animals','4e0e47f0-242d-49ce-aeed-6e68400e05fc.jpg','d19a5450-6112-4bbd-a4e2-f3232a57872d.jpg'),
  ('frog-with-fan','Frog with a Fan','cat-animals','0c6b251a-42e9-47b3-a0a6-822e3a50865f.jpg','acd0b3ab-9dad-41c5-9b81-b98f9ce6d607.jpg'),
  ('cute-stegosaurus','Cute Stegosaurus','cat-dinosaurs','8965409f-e501-4fd9-91df-54356cd5a927.jpg','e98efa72-e333-43dc-a0de-830e371c535c.jpg'),
  ('bowtie-dinosaur','Bow Tie Dinosaur','cat-dinosaurs','237bdef4-20a8-4ff0-aad6-6f35b4198ddb.jpg','55fcbd0f-9610-4fb2-8f81-5c9824e0bb1d.jpg'),
  ('angry-cartoon-dinosaur','Angry Cartoon Dinosaur','cat-dinosaurs','c408c308-a6ae-43dd-b93e-91001fb283c9.jpg','2a58b558-49ee-46cb-abaa-04711607b568.jpg'),
  ('dinosaur-chef','Dinosaur Chef','cat-dinosaurs','5bffa2bc-4637-45a5-bd03-3de1444183aa.jpg','4a32f2aa-7ee4-4b91-8af1-cdf4c6ba4789.jpg'),
  ('running-dinosaur','Running Dinosaur','cat-dinosaurs','aad547f5-9078-47a0-a516-39a58429c733.jpg','f9c7c145-afd2-4e10-8d6c-03c23099d1a7.jpg'),
  ('basic-cartoon-lizard','Basic Cartoon Lizard','cat-animals','d51b8fec-0a8e-4a4d-b1e1-3a8ba0ea90b0.jpg','e4e9b091-42c3-4986-8723-c0ff4c3d894c.jpg'),
  ('cartoon-praying-mantis','Cartoon Praying Mantis','cat-animals','047eddbd-0883-4d0d-9939-c3a3b1f2b86e.jpg','41b0c07f-1f13-481e-a400-f35ebd0fb031.jpg'),
  ('dragonfly','Dragonfly','cat-animals','e8f74e4f-116b-4486-aa6c-a5b5bf27d450.png','9462eb5c-8ab6-4198-b29b-f08956e441b5.png'),
  ('triceratops','Triceratops','cat-dinosaurs','ee6f013d-bc8c-4f33-becf-449777a602c0.png','fbce20b6-d537-4ce5-bd47-079cac0c9a85.png'),
  ('tyrannosaurus-rex','Tyrannosaurus Rex','cat-dinosaurs','2f390920-80db-4b7e-a528-8d59f94bcf77.png','ef23ebf5-a7c2-42f6-9f17-7e1a2fc4fc35.png'),
  ('long-neck-dinosaur','Long-Neck Dinosaur','cat-dinosaurs','e2333ced-2816-4b46-b668-2ee9fb493a5e.png','c33e7085-3e2b-4148-aee4-4bafc607d1d7.png'),
  ('standing-lizard','Standing Lizard','cat-animals','2d0d6e7e-5453-44bd-b190-671e5744408e.png','c23153bc-b1d0-4b3e-968b-bf23e97f52fb.png'),
  ('cartoon-chameleon','Cartoon Chameleon','cat-animals','6903d2f9-bdf2-4ec2-b894-460f29d5c455.png','9878cb20-a91d-496c-b357-0452c6185c66.png'),
  ('therizinosaurus','Therizinosaurus','cat-dinosaurs','db36d7c0-6a7e-4f96-85e7-758bbcce601f.png','5949042c-b41a-49ce-9869-aca94de70664.png'),
  ('simple-salamander','Simple Salamander','cat-animals','71a66196-368d-4463-9207-5513c6d96b43.png','43b33990-15ad-464b-86e0-cce70a718c53.png'),
  ('spotted-salamander','Spotted Salamander','cat-animals','878894da-9ed3-4900-9c28-d83a066cdbf1.png','2d1fd796-176f-4e99-bba4-217f449e32c6.png'),
  ('bowtie-gecko','Bow Tie Gecko','cat-animals','4c003699-7635-4b37-ae57-514b8dbb8486.png','1b7ae8e3-da53-4b5c-833a-12ed4e469c05.png'),
  ('bowtie-salamander','Bow Tie Salamander','cat-animals','946f6801-b749-499d-b3a6-421848888972.png','46c084fa-f0bd-40e0-8892-e9d69aaae0cc.png'),
  ('sauropod','Sauropod','cat-dinosaurs','b594accd-adae-48e6-996f-9df6426fe187.png','23eb27f8-96dd-4cef-bb54-f739234a79ac.png'),
  ('detailed-chameleon','Detailed Chameleon','cat-animals','d3dd3d6e-2d67-4c53-9c29-c8cf83fdedd7.png','58de136c-c63d-414e-9145-9dd1a942dbe4.png'),
  ('stegosaurus','Stegosaurus','cat-dinosaurs','d25eeac5-6dab-4191-b5b4-dd2f097cdf60.png','cb06e19b-f61a-4664-9030-185eda345e75.png')
)
INSERT OR IGNORE INTO coloring_pages (id, content_type, title, slug, short_description, line_art_url, color_reference_url, thumbnail_url, featured, status, sort_order, source_key)
SELECT 'page-october-' || slug, 'standard', name || ' Coloring Page', slug,
  'Printable line art with a matching color reference.',
  '/coloring-pages/october-animals-dinosaurs/codex-clipboard-' || line_asset,
  '/coloring-pages/october-animals-dinosaurs/codex-clipboard-' || color_asset,
  '/coloring-pages/october-animals-dinosaurs/codex-clipboard-' || line_asset,
  CASE WHEN row_number() OVER () <= 10 THEN 1 ELSE 0 END, 'published', 1100 + row_number() OVER (), 'standard:october-animals-dinosaurs:' || slug
FROM entries;

WITH entries(slug, category_id) AS (VALUES
  ('anime-swirled-eyes-girl','cat-anime-character-art'),('banded-salamander','cat-animals'),('spotted-gecko','cat-animals'),('green-gecko','cat-animals'),('frog-with-horn','cat-animals'),('friendly-tadpole','cat-animals'),('frog-sword-warrior','cat-animals'),('two-eyed-gecko','cat-animals'),('jumping-frog','cat-animals'),('frog-painter','cat-animals'),('frog-sipping-drink','cat-animals'),('frog-with-fan','cat-animals'),('cute-stegosaurus','cat-dinosaurs'),('bowtie-dinosaur','cat-dinosaurs'),('angry-cartoon-dinosaur','cat-dinosaurs'),('dinosaur-chef','cat-dinosaurs'),('running-dinosaur','cat-dinosaurs'),('basic-cartoon-lizard','cat-animals'),('cartoon-praying-mantis','cat-animals'),('dragonfly','cat-animals'),('triceratops','cat-dinosaurs'),('tyrannosaurus-rex','cat-dinosaurs'),('long-neck-dinosaur','cat-dinosaurs'),('standing-lizard','cat-animals'),('cartoon-chameleon','cat-animals'),('therizinosaurus','cat-dinosaurs'),('simple-salamander','cat-animals'),('spotted-salamander','cat-animals'),('bowtie-gecko','cat-animals'),('bowtie-salamander','cat-animals'),('sauropod','cat-dinosaurs'),('detailed-chameleon','cat-animals'),('stegosaurus','cat-dinosaurs')
)
INSERT OR REPLACE INTO page_categories (page_id, category_id, is_primary)
SELECT 'page-october-' || slug, category_id, 1 FROM entries;
