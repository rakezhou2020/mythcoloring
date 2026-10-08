-- Creature collection: category cards and printable-page metadata. Safe to re-run.
PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO categories (id, name, slug, description, sort_order, status) VALUES
  ('cat-fantasy-creatures', 'Fantasy Creatures', 'fantasy-creatures', 'Whimsical goblins, magical beasts, riders, and imaginative beings to color.', 38, 'published'),
  ('cat-monster-creatures', 'Monster Creatures', 'monster-creatures', 'Detailed alien, insectoid, and otherworldly creature coloring pages.', 39, 'published');

WITH entries(slug, name, category_id, line_asset, color_asset) AS (VALUES
  ('goblin-traveler','Goblin Traveler','cat-fantasy-creatures','bca46655-5c9f-4949-af3a-bf05547a224d.jpg','1a70ecc7-af59-4da0-a49e-51acff7928e9.jpg'),
  ('skeletal-horned-beast','Skeletal Horned Beast','cat-monster-creatures','19df1836-ff3b-48be-871e-3924e02ca6c4.jpg','19df1836-ff3b-48be-871e-3924e02ca6c4.jpg'),
  ('woolly-multieye-creature','Woolly Multi-Eye Creature','cat-fantasy-creatures','3a102fc0-41ab-42b7-90bc-338157fb9c2c.jpg','72ccf2ce-bc40-4b8a-b517-f4c6ab386501.jpg'),
  ('armored-tiger-beast','Armored Tiger Beast','cat-fantasy-creatures','69492363-b991-482a-ba19-93ec2df032b3.jpg','815453a0-ede8-416d-9652-dff4b782dd12.jpg'),
  ('cyclops-beetle-creature','Cyclops Beetle Creature','cat-monster-creatures','5063a78b-f947-4eb5-993a-2d7249bdb899.jpg','9df956a9-a700-4f39-9ca4-b2d6b2252dc6.jpg'),
  ('goblin-cleaver-keeper','Goblin Cleaver Keeper','cat-fantasy-creatures','b702dc0f-7ae7-4be5-a905-4659ee532303.jpg','3db7d16a-a332-422f-8e92-25eae8d85e83.jpg'),
  ('horned-spear-guardian','Horned Spear Guardian','cat-fantasy-creatures','32090225-b8b2-47d4-bc9f-3359736333e4.jpg','4ef83d49-b5d4-43d2-b23d-b71a79745a8a.jpg'),
  ('tiger-gremlin','Tiger Gremlin','cat-fantasy-creatures','d67c2c29-0df4-422b-9eaf-bdc7c3d772cb.png','a8d76470-4f1c-495a-86e9-e0ec87b0fc2e.png'),
  ('fluffy-lion','Fluffy Lion','cat-animals','c8caf9f0-52b6-4ec4-be19-662da9720cad.jpg','254fa12c-96e7-4a4a-951d-89b30c6e0508.png'),
  ('lynx','Lynx','cat-animals','091ba10f-b675-4410-b511-8a17c64395f4.png','e2e536ce-15d4-422a-983e-f71f484fa8fb.png'),
  ('mountain-goat','Mountain Goat','cat-animals','364dbf53-6bc1-416b-b8a9-468cb9da35bd.png','7745eed9-9ec0-4f02-992b-0d4a91ec58ab.png'),
  ('giant-tortoise','Giant Tortoise','cat-animals','98829377-4c14-476f-a420-a7fba9bb216d.png','8c52b361-f9fa-4da1-a7bd-7f0436fd4c7e.png'),
  ('spiky-skeletal-beast','Spiky Skeletal Beast','cat-monster-creatures','03a1b2be-40df-4763-89e6-351b6202d9f6.png','08a200a9-a57b-41dd-9580-f6740bcfe880.png'),
  ('brown-bear','Brown Bear','cat-animals','eb795041-793e-45dd-9e6c-72fb79958041.png','fb5e4379-ec2d-4dd7-8fc3-39e46d362e06.png'),
  ('fluffy-ram','Fluffy Ram','cat-animals','0c84afa4-9863-448a-a957-45d6da095532.png','ca121c09-a634-44ec-96d4-15f3e8593f06.png'),
  ('alien-winged-beast','Alien Winged Beast','cat-monster-creatures','b2f5e60e-8227-4768-bea7-cfd1c4cb4885.png','0ed2c6bd-67a8-4900-8cc1-c6d25e06e635.jpg'),
  ('fish-tailed-alien-beast','Fish-Tailed Alien Beast','cat-monster-creatures','f13fffa8-60f4-4b3e-b55c-250240c85e30.jpg','5dfef752-0b6b-4a77-871b-802f8570d5c9.jpg'),
  ('brainback-predator','Brainback Predator','cat-monster-creatures','8b0f34d1-3aa3-4477-864f-cbd95ea16c2a.jpg','997112fb-b590-4c04-baa0-ae63fc076ce8.jpg'),
  ('alien-spider','Alien Spider','cat-monster-creatures','445e3611-8fb0-4cc9-84d1-e72bb668276e.jpg','82faf899-a288-4da3-8a67-128047f0af5a.jpg'),
  ('bat-winged-worm','Bat-Winged Worm','cat-monster-creatures','67edae4f-4c83-4633-a411-e6ca969ed4bd.jpg','b04a4556-51df-4847-9ecb-cc5b38b0e80d.jpg'),
  ('tribal-guardian','Tribal Guardian','cat-fantasy-creatures','4a5172b7-9516-4581-9edb-39047041837b.jpg','5ec9be43-b8b5-4e93-b5a5-ed39e2fc99fe.jpg'),
  ('armored-horned-monster','Armored Horned Monster','cat-fantasy-creatures','742e0f0e-25e0-434c-bc8a-89515cc3cc7e.jpg','97b6a2c3-ab24-4cc0-a3eb-a1977a5976b9.jpg'),
  ('praying-horned-rider','Praying Horned Rider','cat-fantasy-creatures','6685ddd8-04da-4e6d-8d4d-5822687f693e.jpg','0526cdee-c778-4793-997b-8d65c2ad9f05.jpg'),
  ('bulky-alien','Bulky Alien','cat-monster-creatures','9603c8f7-a9ea-4997-b503-c64ea111d31c.jpg','4dae6610-164e-4a07-a860-08d4e931fc39.jpg'),
  ('skeletal-stalker','Skeletal Stalker','cat-monster-creatures','0c771626-ff34-40ff-9354-58ab35c360b1.jpg','d12f6d6f-257b-4867-908f-777b6297d0e7.jpg'),
  ('horned-alien-humanoid','Horned Alien Humanoid','cat-monster-creatures','600e0d8f-3951-4863-a5f2-1efadfa22d42.jpg','fb7709de-aa96-4c98-a278-0791f4366949.jpg'),
  ('alien-crawler','Alien Crawler','cat-monster-creatures','fe33c47d-c478-4e9c-90b5-283505a9d781.jpg','3464bd38-9585-440f-bbaa-c2b6e4c8722f.jpg'),
  ('winged-horned-beast','Winged Horned Beast','cat-fantasy-creatures','f9df80bf-d467-4e95-a535-bb4985ee89d3.jpg','680c188e-e65e-4b78-840c-9e132c1cdcc0.jpg'),
  ('alien-dragon-portrait','Alien Dragon Portrait','cat-monster-creatures','8e0404ce-0c21-49a3-8715-a2fc5723881d.jpg','9f446602-e6d4-443f-9202-5da6066e8f0d.jpg'),
  ('frog-masked-portrait','Frog-Masked Portrait','cat-monster-creatures','445b35a7-1c00-4d1c-9a2e-4f43dcfe25b3.jpg','afc6b5b1-1ab1-4dea-b542-25e6ed0839d3.jpg'),
  ('alien-fish-portrait','Alien Fish Portrait','cat-monster-creatures','93172164-b963-43bc-affc-a835f937b6e1.jpg','e96589fc-4f24-4ef7-81d6-5a34969e0acf.jpg'),
  ('one-eyed-alien-portrait','One-Eyed Alien Portrait','cat-monster-creatures','f11df003-337f-46a4-88d5-fb4a6d622f24.jpg','1fc5c4a7-499d-4730-b1de-31fece5bd587.jpg'),
  ('spider-humanoid','Spider Humanoid','cat-monster-creatures','190ba6cc-d6a2-451a-80dd-45891e5f296b.jpg','c69716b2-4b28-4beb-a1b7-350d8f769f49.jpg'),
  ('fishing-walker','Fishing Walker','cat-fantasy-creatures','aecaf8b7-e44e-4cba-97bf-837a01bcc8cb.jpg','f6948c4d-924b-4d21-8217-03993e4a39f1.jpg'),
  ('rider-on-spiked-beast','Rider on Spiked Beast','cat-fantasy-creatures','ee273ea9-6601-4a8c-8293-a92bb18580c9.jpg','38c979ec-e606-4e94-aabe-fa6c14666d22.jpg'),
  ('rider-on-longtail-beast','Rider on Longtail Beast','cat-fantasy-creatures','9a81986e-2b2f-403b-a126-5011d3f4146e.jpg','205c9b16-8cee-4d25-b8ea-db74c6de3588.jpg'),
  ('fisher-on-giant-walker','Fisher on Giant Walker','cat-fantasy-creatures','126ea3e8-3d95-4549-8115-edb56b647907.jpg','e31c09b3-3351-46b5-9ed3-a56cdfdad271.jpg'),
  ('dream-guardian-puppet','Dream Guardian Puppet','cat-fantasy-creatures','3993684a-e96a-451e-baf1-c1cf4ef8ce3c.jpg','8ed2c274-9040-456c-927e-1fd4f72ad31b.jpg'),
  ('mechanical-stunt-monster','Mechanical Stunt Monster','cat-sci-fi-robots','90b2fb7b-a9b7-4f7a-b03f-3c39798e458e.jpg','5e9cba04-640d-4514-8de1-c7332ab3760a.jpg'),
  ('two-headed-mutant','Two-Headed Mutant','cat-monster-creatures','fa9ae175-1179-4b0c-bcf6-2b9d290a3d67.jpg','2437184f-45e5-430e-98c2-d40c0df05e8e.jpg'),
  ('horned-rider-warrior','Horned Rider Warrior','cat-fantasy-warriors','1b8d34ad-aed1-4ddb-a664-74e3932f8546.jpg','74de061e-e7f7-4dd5-9e3c-0729415430ee.jpg'),
  ('masked-scout','Masked Scout','cat-fantasy-creatures','c3a6fe9d-348a-4f62-87ad-b863659b956a.jpg','58a183a3-cf9e-4db8-b15c-af23ce1bcdde.jpg'),
  ('seated-horned-giant','Seated Horned Giant','cat-fantasy-creatures','a735f602-5cde-41a7-9db3-9bfd3e3efe47.jpg','21d2ea15-0eae-47c1-bacc-07c116d11e7e.jpg'),
  ('scarfed-wanderer','Scarfed Wanderer','cat-fantasy-creatures','bceaaf92-ab6e-4dc9-a6eb-21cb2c24ce58.jpg','4da6d886-a77a-4b99-84c3-bfbb5df996de.jpg'),
  ('cyber-portrait','Cyber Portrait','cat-sci-fi-robots','c8f52dc8-6cd7-4669-8c6a-3a473007c9f7.jpg','b2d268d1-89c7-4025-890d-d7d022d62042.jpg'),
  ('armored-samurai-turtle','Armored Samurai Turtle','cat-fantasy-warriors','47299104-9e98-4388-a8ca-da2f81157150.jpg','ce101232-6039-4c04-8c7a-72f9fbbbf279.jpg'),
  ('horned-shield-warrior','Horned Shield Warrior','cat-fantasy-warriors','853d0c23-0bf3-4c77-b1e8-f397b1539d65.jpg','53135b09-1a3b-45e0-8649-b58a6f16792d.jpg'),
  ('hybrid-insect-giant','Hybrid Insect Giant','cat-monster-creatures','c8d35ac0-8ef5-4597-ac94-795de7a7ffd8.jpg','c8d35ac0-8ef5-4597-ac94-795de7a7ffd8.jpg')
)
INSERT OR IGNORE INTO coloring_pages (id, content_type, title, slug, short_description, line_art_url, color_reference_url, thumbnail_url, featured, status, sort_order, source_key)
SELECT 'page-creature-' || slug, 'standard', name || ' Coloring Page', slug,
  'Detailed printable creature illustration.',
  '/coloring-pages/creature-collection/codex-clipboard-' || line_asset,
  '/coloring-pages/creature-collection/codex-clipboard-' || color_asset,
  '/coloring-pages/creature-collection/codex-clipboard-' || line_asset,
  CASE WHEN slug IN ('goblin-traveler','woolly-multieye-creature','armored-tiger-beast','cyclops-beetle-creature','fluffy-lion','alien-spider','fishing-walker','horned-rider-warrior') THEN 1 ELSE 0 END,
  'published', 700 + row_number() OVER (), 'standard:creature:' || slug
FROM entries;

WITH entries(slug, category_id) AS (VALUES
  ('goblin-traveler','cat-fantasy-creatures'),('skeletal-horned-beast','cat-monster-creatures'),('woolly-multieye-creature','cat-fantasy-creatures'),('armored-tiger-beast','cat-fantasy-creatures'),('cyclops-beetle-creature','cat-monster-creatures'),('goblin-cleaver-keeper','cat-fantasy-creatures'),('horned-spear-guardian','cat-fantasy-creatures'),('tiger-gremlin','cat-fantasy-creatures'),('fluffy-lion','cat-animals'),('lynx','cat-animals'),('mountain-goat','cat-animals'),('giant-tortoise','cat-animals'),('spiky-skeletal-beast','cat-monster-creatures'),('brown-bear','cat-animals'),('fluffy-ram','cat-animals'),('alien-winged-beast','cat-monster-creatures'),('fish-tailed-alien-beast','cat-monster-creatures'),('brainback-predator','cat-monster-creatures'),('alien-spider','cat-monster-creatures'),('bat-winged-worm','cat-monster-creatures'),('tribal-guardian','cat-fantasy-creatures'),('armored-horned-monster','cat-fantasy-creatures'),('praying-horned-rider','cat-fantasy-creatures'),('bulky-alien','cat-monster-creatures'),('skeletal-stalker','cat-monster-creatures'),('horned-alien-humanoid','cat-monster-creatures'),('alien-crawler','cat-monster-creatures'),('winged-horned-beast','cat-fantasy-creatures'),('alien-dragon-portrait','cat-monster-creatures'),('frog-masked-portrait','cat-monster-creatures'),('alien-fish-portrait','cat-monster-creatures'),('one-eyed-alien-portrait','cat-monster-creatures'),('spider-humanoid','cat-monster-creatures'),('fishing-walker','cat-fantasy-creatures'),('rider-on-spiked-beast','cat-fantasy-creatures'),('rider-on-longtail-beast','cat-fantasy-creatures'),('fisher-on-giant-walker','cat-fantasy-creatures'),('dream-guardian-puppet','cat-fantasy-creatures'),('mechanical-stunt-monster','cat-sci-fi-robots'),('two-headed-mutant','cat-monster-creatures'),('horned-rider-warrior','cat-fantasy-warriors'),('masked-scout','cat-fantasy-creatures'),('seated-horned-giant','cat-fantasy-creatures'),('scarfed-wanderer','cat-fantasy-creatures'),('cyber-portrait','cat-sci-fi-robots'),('armored-samurai-turtle','cat-fantasy-warriors'),('horned-shield-warrior','cat-fantasy-warriors'),('hybrid-insect-giant','cat-monster-creatures')
)
INSERT OR REPLACE INTO page_categories (page_id, category_id, is_primary)
SELECT 'page-creature-' || slug, category_id, 1 FROM entries;
