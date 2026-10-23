import type { StandardColoringPage } from "./types";

type PageSeed = {
  slug: string;
  title: string;
  categorySlug: "anime-character-art" | "halloween";
  line: string;
  color: string;
};

const image = (id: string) =>
  `/coloring-pages/october-anime-halloween/codex-clipboard-${id}.png`;

const seeds: PageSeed[] = [
  { slug: "anime-friends-living-room", title: "Anime Friends in a Living Room", categorySlug: "anime-character-art", line: "340d0132-ddbf-4c80-935b-1630d495ff7f", color: "33759361-b9f8-4fc2-9df1-e6ca7cc45bc8" },
  { slug: "anime-girl-formal-dress", title: "Anime Girl in a Formal Dress", categorySlug: "anime-character-art", line: "efe0293c-04c3-4b18-9f39-bbaaf085e4f4", color: "9c1766a9-9b6c-4cf6-985d-4abea0351937" },
  { slug: "anime-schoolgirl-backpack", title: "Anime Schoolgirl with Backpack", categorySlug: "anime-character-art", line: "0ceaa41f-9d88-4aba-9f78-8c87d35654ef", color: "6f2b8133-02e0-4382-b77a-96237203093e" },
  { slug: "anime-bandana-girl", title: "Anime Bandana Girl", categorySlug: "anime-character-art", line: "5a17a9d6-cd0b-447f-8ea3-d5b51b445ee8", color: "a462e81c-070b-4ffc-8638-d9ac907d6d04" },
  { slug: "anime-girl-with-crayon", title: "Anime Girl with a Giant Crayon", categorySlug: "anime-character-art", line: "10a1ea4e-9fa8-4f00-a8f9-c421ceb9e39c", color: "7b6b6565-4310-4b35-bb2a-6f03b1efa087" },
  { slug: "anime-bandana-teacher", title: "Anime Bandana Teacher", categorySlug: "anime-character-art", line: "1a1d481f-7bf4-418f-b40b-4e050563922b", color: "168ce80a-bc64-4fe6-92ac-78977409c9de" },
  { slug: "friendly-skull", title: "Friendly Skull", categorySlug: "halloween", line: "0cb66801-71b7-4acd-8ebc-6034b01a85bc", color: "db7ddcc5-acd3-4272-be20-c97546620be3" },
  { slug: "little-vampire", title: "Little Vampire", categorySlug: "halloween", line: "ce5a1189-0ede-4e86-a49e-a6020ecca16a", color: "d09aeec9-ee47-4218-bb8e-366eed576896" },
  { slug: "ghost-witch", title: "Ghost Witch", categorySlug: "halloween", line: "fc9e3abb-7b71-48f3-aae4-a42bddddaee4", color: "04acdbbf-439f-45e7-8f59-f71704da0041" },
  { slug: "friendly-bat", title: "Friendly Bat", categorySlug: "halloween", line: "c8581daf-c3f9-4434-9533-9536d3a29557", color: "159adb26-2e70-49e9-93e0-0dbf3e65bc12" },
  { slug: "vampire-bat", title: "Vampire Bat", categorySlug: "halloween", line: "1b98efb1-f0b1-444c-841f-53ff5b9ac240", color: "936bdee4-7586-49e7-9b8f-ba4a7c27a5fa" },
  { slug: "bat-with-balloon", title: "Bat with a Balloon", categorySlug: "halloween", line: "4ab5e3ba-f42a-4a32-9179-6563daad8386", color: "09042875-a32f-4b97-9aa9-442eb3da5194" },
];

export const octoberAnimeHalloweenPages: StandardColoringPage[] = seeds.map((seed, index) => ({
  slug: seed.slug,
  categorySlug: seed.categorySlug,
  title: `${seed.title} Coloring Page`,
  shortIntroduction: `Color this ${seed.title.toLowerCase()} illustration with printable line art and a matching color reference.`,
  coloringTips: [
    "Use the color reference as a starting point, or create a palette of your own.",
    "Build depth with a darker shade around the edges and in folds or small details.",
    "Leave small highlights light for a crisp, playful finish.",
  ],
  lineArtImage: image(seed.line),
  colorImage: image(seed.color),
  imageAlt: `${seed.title} printable coloring page with line art and color reference`,
  seo: {
    title: `${seed.title} Coloring Page – Free Printable`,
    description: `Download a free printable ${seed.title.toLowerCase()} coloring page with line art and a color reference.`,
  },
  featured: index < 6,
  status: "published",
}));
