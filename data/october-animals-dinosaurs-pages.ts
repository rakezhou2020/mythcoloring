import type { StandardColoringPage } from "./types";

type PageSeed = {
  slug: string;
  title: string;
  categorySlug: "animals" | "dinosaurs" | "anime-character-art";
  line: string;
  color: string;
  extension: "jpg" | "png";
};

const asset = (id: string, extension: PageSeed["extension"]) =>
  `/coloring-pages/october-animals-dinosaurs/codex-clipboard-${id}.${extension}`;

const seeds: PageSeed[] = [
  { slug: "anime-swirled-eyes-girl", title: "Swirled-Eyes Anime Girl", categorySlug: "anime-character-art", line: "0489577c-883c-4c9d-98fd-19be1c147c0e", color: "068d8a00-c6e2-4230-9ec4-d5fa739e63b9", extension: "jpg" },
  { slug: "banded-salamander", title: "Banded Salamander", categorySlug: "animals", line: "e61fa9ef-b819-4257-99b9-97b04f7d4186", color: "e326dacf-6e9a-4b11-bb98-7bdcec4950aa", extension: "jpg" },
  { slug: "spotted-gecko", title: "Spotted Gecko", categorySlug: "animals", line: "420e8cc0-fe8c-4763-9e56-c458fa3f07e1", color: "87f1103c-4d74-4685-b912-1a1a53864620", extension: "jpg" },
  { slug: "green-gecko", title: "Green Gecko", categorySlug: "animals", line: "ad5605db-36bd-4103-a053-285fa6094c58", color: "b31bbd3e-00d8-4b9c-8eba-e12f36fb11fc", extension: "jpg" },
  { slug: "frog-with-horn", title: "Frog with a Horn", categorySlug: "animals", line: "3935ce03-8e78-459c-974e-643df932ed77", color: "acad11a6-5b81-498d-b4fd-bb5b6e69010a", extension: "jpg" },
  { slug: "friendly-tadpole", title: "Friendly Tadpole", categorySlug: "animals", line: "6973dd52-d422-46b4-bad1-261dab8280ba", color: "25865749-ea9f-4007-a995-f539d888cca9", extension: "jpg" },
  { slug: "frog-sword-warrior", title: "Frog Sword Warrior", categorySlug: "animals", line: "8d7e6e6a-7722-4cdf-af15-d2f42b620176", color: "581c0925-6e87-46b0-9214-67b5202166d5", extension: "jpg" },
  { slug: "two-eyed-gecko", title: "Two-Eyed Gecko", categorySlug: "animals", line: "22693f6d-74e2-458a-99fb-6cdc288e85f7", color: "8bf006f6-2c12-47e8-bdf1-9aadd39cbbac", extension: "jpg" },
  { slug: "jumping-frog", title: "Jumping Frog", categorySlug: "animals", line: "766be766-28da-4509-ac98-18864f1f1530", color: "ea5678fe-0a87-4ef2-aa06-3d298f0f7622", extension: "jpg" },
  { slug: "frog-painter", title: "Frog Painter", categorySlug: "animals", line: "3c3fbe5b-8795-4c09-bb0b-ca07bd953896", color: "6a17e098-4045-4c81-9c76-56f9c9eb4efe", extension: "jpg" },
  { slug: "frog-sipping-drink", title: "Frog Sipping a Drink", categorySlug: "animals", line: "4e0e47f0-242d-49ce-aeed-6e68400e05fc", color: "d19a5450-6112-4bbd-a4e2-f3232a57872d", extension: "jpg" },
  { slug: "frog-with-fan", title: "Frog with a Fan", categorySlug: "animals", line: "0c6b251a-42e9-47b3-a0a6-822e3a50865f", color: "acd0b3ab-9dad-41c5-9b81-b98f9ce6d607", extension: "jpg" },
  { slug: "cute-stegosaurus", title: "Cute Stegosaurus", categorySlug: "dinosaurs", line: "8965409f-e501-4fd9-91df-54356cd5a927", color: "e98efa72-e333-43dc-a0de-830e371c535c", extension: "jpg" },
  { slug: "bowtie-dinosaur", title: "Bow Tie Dinosaur", categorySlug: "dinosaurs", line: "237bdef4-20a8-4ff0-aad6-6f35b4198ddb", color: "55fcbd0f-9610-4fb2-8f81-5c9824e0bb1d", extension: "jpg" },
  { slug: "angry-cartoon-dinosaur", title: "Angry Cartoon Dinosaur", categorySlug: "dinosaurs", line: "c408c308-a6ae-43dd-b93e-91001fb283c9", color: "2a58b558-49ee-46cb-abaa-04711607b568", extension: "jpg" },
  { slug: "dinosaur-chef", title: "Dinosaur Chef", categorySlug: "dinosaurs", line: "5bffa2bc-4637-45a5-bd03-3de1444183aa", color: "4a32f2aa-7ee4-4b91-8af1-cdf4c6ba4789", extension: "jpg" },
  { slug: "running-dinosaur", title: "Running Dinosaur", categorySlug: "dinosaurs", line: "aad547f5-9078-47a0-a516-39a58429c733", color: "f9c7c145-afd2-4e10-8d6c-03c23099d1a7", extension: "jpg" },
  { slug: "basic-cartoon-lizard", title: "Basic Cartoon Lizard", categorySlug: "animals", line: "d51b8fec-0a8e-4a4d-b1e1-3a8ba0ea90b0", color: "e4e9b091-42c3-4986-8723-c0ff4c3d894c", extension: "jpg" },
  { slug: "cartoon-praying-mantis", title: "Cartoon Praying Mantis", categorySlug: "animals", line: "047eddbd-0883-4d0d-9939-c3a3b1f2b86e", color: "41b0c07f-1f13-481e-a400-f35ebd0fb031", extension: "jpg" },
  { slug: "dragonfly", title: "Dragonfly", categorySlug: "animals", line: "e8f74e4f-116b-4486-aa6c-a5b5bf27d450", color: "9462eb5c-8ab6-4198-b29b-f08956e441b5", extension: "png" },
  { slug: "triceratops", title: "Triceratops", categorySlug: "dinosaurs", line: "ee6f013d-bc8c-4f33-becf-449777a602c0", color: "fbce20b6-d537-4ce5-bd47-079cac0c9a85", extension: "png" },
  { slug: "tyrannosaurus-rex", title: "Tyrannosaurus Rex", categorySlug: "dinosaurs", line: "2f390920-80db-4b7e-a528-8d59f94bcf77", color: "ef23ebf5-a7c2-42f6-9f17-7e1a2fc4fc35", extension: "png" },
  { slug: "long-neck-dinosaur", title: "Long-Neck Dinosaur", categorySlug: "dinosaurs", line: "e2333ced-2816-4b46-b668-2ee9fb493a5e", color: "c33e7085-3e2b-4148-aee4-4bafc607d1d7", extension: "png" },
  { slug: "standing-lizard", title: "Standing Lizard", categorySlug: "animals", line: "2d0d6e7e-5453-44bd-b190-671e5744408e", color: "c23153bc-b1d0-4b3e-968b-bf23e97f52fb", extension: "png" },
  { slug: "cartoon-chameleon", title: "Cartoon Chameleon", categorySlug: "animals", line: "6903d2f9-bdf2-4ec2-b894-460f29d5c455", color: "9878cb20-a91d-496c-b357-0452c6185c66", extension: "png" },
  { slug: "therizinosaurus", title: "Therizinosaurus", categorySlug: "dinosaurs", line: "db36d7c0-6a7e-4f96-85e7-758bbcce601f", color: "5949042c-b41a-49ce-9869-aca94de70664", extension: "png" },
  { slug: "simple-salamander", title: "Simple Salamander", categorySlug: "animals", line: "71a66196-368d-4463-9207-5513c6d96b43", color: "43b33990-15ad-464b-86e0-cce70a718c53", extension: "png" },
  { slug: "spotted-salamander", title: "Spotted Salamander", categorySlug: "animals", line: "878894da-9ed3-4900-9c28-d83a066cdbf1", color: "2d1fd796-176f-4e99-bba4-217f449e32c6", extension: "png" },
  { slug: "bowtie-gecko", title: "Bow Tie Gecko", categorySlug: "animals", line: "4c003699-7635-4b37-ae57-514b8dbb8486", color: "1b7ae8e3-da53-4b5c-833a-12ed4e469c05", extension: "png" },
  { slug: "bowtie-salamander", title: "Bow Tie Salamander", categorySlug: "animals", line: "946f6801-b749-499d-b3a6-421848888972", color: "46c084fa-f0bd-40e0-8892-e9d69aaae0cc", extension: "png" },
  { slug: "sauropod", title: "Sauropod", categorySlug: "dinosaurs", line: "b594accd-adae-48e6-996f-9df6426fe187", color: "23eb27f8-96dd-4cef-bb54-f739234a79ac", extension: "png" },
  { slug: "detailed-chameleon", title: "Detailed Chameleon", categorySlug: "animals", line: "d3dd3d6e-2d67-4c53-9c29-c8cf83fdedd7", color: "58de136c-c63d-414e-9145-9dd1a942dbe4", extension: "png" },
  { slug: "stegosaurus", title: "Stegosaurus", categorySlug: "dinosaurs", line: "d25eeac5-6dab-4191-b5b4-dd2f097cdf60", color: "cb06e19b-f61a-4664-9030-185eda345e75", extension: "png" },
];

export const octoberAnimalsDinosaursPages: StandardColoringPage[] = seeds.map((seed, index) => ({
  slug: seed.slug,
  categorySlug: seed.categorySlug,
  title: `${seed.title} Coloring Page`,
  shortIntroduction: `Color this ${seed.title.toLowerCase()} illustration with the printable line art and matching color reference.`,
  coloringTips: [
    "Use the color reference as a starting point, then make the character or creature your own.",
    "Layer a darker tone along edges and underneath the body to add depth.",
    "Keep small highlights light for a bright, playful finish.",
  ],
  lineArtImage: asset(seed.line, seed.extension),
  colorImage: asset(seed.color, seed.extension),
  imageAlt: `${seed.title} printable coloring page with line art and color reference`,
  seo: {
    title: `${seed.title} Coloring Page – Free Printable`,
    description: `Download a free printable ${seed.title.toLowerCase()} coloring page with line art and a color reference.`,
  },
  featured: index < 10,
  status: "published",
}));
