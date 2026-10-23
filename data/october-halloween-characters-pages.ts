import type { StandardColoringPage } from "./types";

type PageSeed = {
  slug: string;
  title: string;
  line: string;
  lineExtension: "jpg" | "png";
  color: string;
  colorExtension: "jpg" | "png";
};

const image = (id: string, extension: "jpg" | "png") =>
  `/coloring-pages/october-halloween-characters/codex-clipboard-${id}.${extension}`;

const seeds: PageSeed[] = [
  { slug: "cute-ghost", title: "Cute Ghost", line: "c84bc1b5-f3c1-438c-9b70-eea47f7dc63c", lineExtension: "jpg", color: "325e05a2-b621-4358-9f15-6904bf1c7187", colorExtension: "jpg" },
  { slug: "little-vampire-boy", title: "Little Vampire Boy", line: "d41d3883-dc35-439b-bbcb-f569171fd20a", lineExtension: "jpg", color: "cff0a86a-04a8-4d40-a89f-f5e6c444c980", colorExtension: "jpg" },
  { slug: "vampire-pumpkin-treat-bag", title: "Vampire with a Pumpkin Treat Bag", line: "776c103a-2fd6-44b2-80d4-36d8e7039239", lineExtension: "jpg", color: "5d1cc2b6-03f0-4899-bda7-bf392385b0ae", colorExtension: "jpg" },
  { slug: "little-witch", title: "Little Witch", line: "81b97a03-a16c-4095-a9ef-67867126f911", lineExtension: "jpg", color: "d0bc01da-12db-4b0e-9446-b92ac8662842", colorExtension: "jpg" },
  { slug: "mummy-vampire", title: "Mummy Vampire", line: "0027feca-7d22-4a9d-a4e5-43384a04991a", lineExtension: "jpg", color: "c91353c4-c0a1-4d4f-be5d-da9afc6045e7", colorExtension: "jpg" },
  { slug: "haunted-house", title: "Haunted House", line: "b33a6a2a-11c1-466a-a509-5cba6c7e781b", lineExtension: "jpg", color: "f01a6168-ad5f-44e6-8562-23ba1cdb25fc", colorExtension: "jpg" },
  { slug: "cute-skull", title: "Cute Skull", line: "b14c401e-ff9c-4588-a468-d868c6388dab", lineExtension: "jpg", color: "38bbc6f8-080a-46c4-b30d-32be222a03d2", colorExtension: "jpg" },
  { slug: "chibi-costumed-character", title: "Chibi Costumed Character", line: "b83a7fc1-c280-422b-a311-bfd9524fe443", lineExtension: "jpg", color: "a9d9ce96-6257-4a33-a82b-022595a3037a", colorExtension: "jpg" },
  { slug: "witch-on-broom", title: "Witch on a Broom", line: "78620b0b-0bce-4ae9-b77e-20128e7bf4b7", lineExtension: "jpg", color: "6f53ce93-028a-4bd2-a619-dc32cab8689c", colorExtension: "jpg" },
  { slug: "flying-bat", title: "Flying Bat", line: "80d133b8-0fd2-473f-9032-f500366c4420", lineExtension: "jpg", color: "947a4aa1-512d-4863-af52-4e99e7bbd3bf", colorExtension: "jpg" },
  { slug: "vampire-girl", title: "Vampire Girl", line: "d016fca8-c41c-4932-9fc4-2d75d4bc613a", lineExtension: "jpg", color: "4e915bf8-29f5-42a3-aa00-fa6c79391582", colorExtension: "jpg" },
  { slug: "waving-vampire", title: "Waving Vampire", line: "4c934744-0c5f-424b-ada7-02f7298c4c50", lineExtension: "png", color: "67f12fba-39b6-4fda-b00d-8f902d85f995", colorExtension: "png" },
  { slug: "waving-ghost", title: "Waving Ghost", line: "d89c2c74-084c-4b3e-b0ed-f8d2ee962be9", lineExtension: "png", color: "d21434dc-269d-47d0-ab18-faf53f872bc0", colorExtension: "png" },
  { slug: "waving-mummy", title: "Waving Mummy", line: "fcb980f5-dad3-4eab-82ec-3c81770134bd", lineExtension: "png", color: "1b696bab-8131-445f-a7c4-0d7882afc41c", colorExtension: "png" },
  { slug: "mummy-peace-sign", title: "Mummy Peace Sign", line: "ddbe2bba-6f0e-48ef-a140-41ffa73bb261", lineExtension: "png", color: "fd38f35f-ee30-4155-a397-73b1276e8f38", colorExtension: "png" },
  { slug: "flying-witch", title: "Flying Witch", line: "977a87d4-accc-4445-8358-b48a424f4de0", lineExtension: "png", color: "1ac5ee7c-2bb0-4709-abe8-9124bb7b8240", colorExtension: "png" },
  { slug: "ghost-witch-pumpkin", title: "Ghost Witch on a Pumpkin", line: "bf52c316-89ed-41fa-9a60-ad2df7d12ca9", lineExtension: "png", color: "1cdc3bb7-cec0-4e9f-b3ae-d1377b6be939", colorExtension: "png" },
  { slug: "stacked-pumpkins", title: "Stacked Pumpkin Candles", line: "f2809074-c155-4374-befb-e41e6f8ab5ef", lineExtension: "png", color: "54373827-565e-4d12-aeec-3895c88b2b87", colorExtension: "png" },
  { slug: "vampire-with-bats", title: "Vampire with Bats", line: "e40e562e-e281-4507-8ca6-7f52d7cfc64b", lineExtension: "jpg", color: "a7d52453-390c-440e-8915-872ab783f593", colorExtension: "jpg" },
  { slug: "mummy-with-present", title: "Mummy with a Present", line: "acf060eb-39d8-419a-93c0-105113f02dc1", lineExtension: "png", color: "46d68f5f-c1c6-42e1-b39a-3b6161a0bfe3", colorExtension: "png" },
  { slug: "werewolf", title: "Friendly Werewolf", line: "75ab5220-159f-4a83-8462-7aacc791da8b", lineExtension: "png", color: "c5be6983-e9df-4766-bcb1-0ba0fe8c9d6c", colorExtension: "png" },
  { slug: "jack-o-lantern", title: "Jack-o'-Lantern", line: "5c269df1-b272-4edd-9d62-db85bfd42cfc", lineExtension: "png", color: "8ce21b2a-8ac4-4dd2-b156-8c13eec15fda", colorExtension: "png" },
  { slug: "dancing-mummy", title: "Dancing Mummy", line: "077cc380-3658-403c-89f8-d19aa2ada41a", lineExtension: "jpg", color: "90cdb4c8-e5b8-44e4-b79c-99d4945fa970", colorExtension: "png" },
];

export const octoberHalloweenCharacterPages: StandardColoringPage[] = seeds.map((seed, index) => ({
  slug: seed.slug,
  categorySlug: "halloween",
  title: `${seed.title} Coloring Page`,
  shortIntroduction: `Color this ${seed.title.toLowerCase()} illustration with printable line art and a matching color reference.`,
  coloringTips: [
    "Use the color reference as a starting point, or create a palette of your own.",
    "Build depth with a darker shade around the edges and in folds or small details.",
    "Leave small highlights light for a crisp, playful finish.",
  ],
  lineArtImage: image(seed.line, seed.lineExtension),
  colorImage: image(seed.color, seed.colorExtension),
  imageAlt: `${seed.title} Halloween coloring page printable line art`,
  seo: {
    title: `${seed.title} Coloring Page – Free Printable`,
    description: `Download a free printable ${seed.title.toLowerCase()} coloring page with line art and a color reference.`,
  },
  featured: index < 8,
  status: "published",
}));
