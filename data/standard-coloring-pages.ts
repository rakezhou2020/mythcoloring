import type {
  ContentTheme,
  StandardColoringCategory,
  StandardColoringPage,
} from "./types";

// This catalog is intentionally independent from data/coloring-pages.ts.
// Add ordinary printable content here; mythology creatures remain in their
// existing Creature + ColoringPage data pipeline.
export const standardColoringCategories: StandardColoringCategory[] = [
  {
    slug: "flowers-plants",
    name: "Flowers & Plants",
    description: "Printable flowers, leaves, houseplants, and garden-inspired coloring pages.",
    status: "published",
  },
  { slug: "animals", name: "Animals", description: "Everyday animal coloring pages for quiet creative time.", status: "draft" },
  { slug: "buildings", name: "Buildings", description: "Homes, landmarks, and architectural coloring pages.", status: "draft" },
  { slug: "food", name: "Food", description: "Delicious, playful food coloring pages.", status: "draft" },
  { slug: "vehicles", name: "Vehicles", description: "Things that move, ready to color.", status: "draft" },
  { slug: "nature", name: "Nature", description: "Landscapes and the natural world to color.", status: "draft" },
  { slug: "fantasy", name: "Fantasy", description: "Imaginative worlds beyond the creature stories.", status: "draft" },
];

const imageOrigin = "https://images.mythcoloring.com";

export const standardColoringPages: StandardColoringPage[] = [
  {
    slug: "orchid",
    categorySlug: "flowers-plants",
    title: "Orchid Coloring Page",
    shortIntroduction:
      "Bring this graceful orchid spray to life with your favorite colors. The open blooms, buds, and long leaves offer an easygoing balance of broad areas and small details.",
    coloringTips: [
      "Try soft pinks, purples, or coral tones for the petals, then add a slightly deeper shade near each flower center.",
      "Use two greens on the leaves and stems to give the plant a little depth.",
      "Leave small areas of the petals white for a light, luminous finish.",
    ],
    lineArtImage: `${imageOrigin}/plants/orchid/line-art.png`,
    colorImage: `${imageOrigin}/plants/orchid/color.png`,
    imageAlt: "Orchid flowers and leaves printable coloring page",
    seo: {
      title: "Orchid Coloring Page – Free Printable",
      description: "Download a free printable orchid coloring page with clean line art, a color reference, and easy coloring ideas.",
    },
    relatedSlugs: ["calla-lily", "lily-of-the-valley"],
    featured: true,
    status: "published",
  },
  {
    slug: "calla-lily",
    categorySlug: "flowers-plants",
    title: "Calla Lily Coloring Page",
    shortIntroduction:
      "This calla lily coloring page features a tall group of elegant blooms and leafy stems. Its clear shapes make a calm, satisfying page for colored pencils, crayons, or markers.",
    coloringTips: [
      "Start with creamy white petals and add a pale yellow or soft green shadow near the base of each bloom.",
      "Color the spadix in warm gold or yellow for a small pop of contrast.",
      "Layer dark and light greens across the leaves to make the flowers stand out.",
    ],
    lineArtImage: `${imageOrigin}/plants/calla-lily/line-art.png`,
    colorImage: `${imageOrigin}/plants/calla-lily/color.png`,
    imageAlt: "Calla lily flowers and green leaves printable coloring page",
    seo: {
      title: "Calla Lily Coloring Page – Free Printable",
      description: "Download a free printable calla lily coloring page with crisp line art, a color reference, and simple coloring tips.",
    },
    relatedSlugs: ["orchid", "lily-of-the-valley"],
    featured: true,
    status: "published",
  },
  {
    slug: "lily-of-the-valley",
    categorySlug: "flowers-plants",
    title: "Lily of the Valley Coloring Page",
    shortIntroduction:
      "Color a gentle cluster of lily of the valley bells, curved stems, and fresh leaves. This printable is a lovely choice for a quiet spring-inspired coloring break.",
    coloringTips: [
      "Keep the bell-shaped flowers creamy white, then softly shade their bases with pale green or gray.",
      "Use a few shades of green from light to deep for the leaves and stems.",
      "A faint blue or warm gray background can make the white flowers feel brighter.",
    ],
    lineArtImage: `${imageOrigin}/plants/lily-of-the-valley/line-art.png`,
    colorImage: `${imageOrigin}/plants/lily-of-the-valley/color.png`,
    imageAlt: "Lily of the valley flowers and leaves printable coloring page",
    seo: {
      title: "Lily of the Valley Coloring Page – Free Printable",
      description: "Download a free printable lily of the valley coloring page with line art, a color reference, and relaxed coloring tips.",
    },
    relatedSlugs: ["orchid", "calla-lily"],
    featured: true,
    status: "published",
  },
];

export const publishedStandardColoringCategories = standardColoringCategories.filter(
  (category) => category.status === "published",
);
export const publishedStandardColoringPages = standardColoringPages.filter(
  (page) => page.status === "published",
);

export const contentThemes: ContentTheme[] = [
  {
    slug: "nature",
    name: "Nature",
    description: "Flowers, plants, animals, birds, insects, and the outdoors in one creative world.",
    categorySlugs: ["flowers-plants", "animals", "nature"],
    status: "published",
  },
  {
    slug: "architecture",
    name: "Architecture",
    description: "Houses, castles, temples, landmarks, and places to imagine.",
    categorySlugs: ["buildings"],
    status: "draft",
  },
  {
    slug: "chinese-mythology",
    name: "Chinese Mythology",
    description: "Shan Hai Jing, mythical creatures, and legendary animals with stories to discover.",
    categorySlugs: [],
    status: "published",
  },
  {
    slug: "seasonal",
    name: "Seasonal",
    description: "Spring, Halloween, Christmas, and more moments to color through the year.",
    categorySlugs: [],
    status: "draft",
  },
];
