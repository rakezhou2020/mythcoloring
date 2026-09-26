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
  {
    slug: "peony",
    categorySlug: "flowers-plants",
    title: "Peony Coloring Page",
    shortIntroduction:
      "Color a full peony branch with ruffled petals, a large open bloom, and leafy stems. The layered petals make this printable especially satisfying for gentle shading.",
    coloringTips: [
      "Build the petals from pale pink outward, then add a deeper rose shade between the layers for depth.",
      "Use warm yellow or gold for the flower center to create a soft focal point.",
      "Mix a medium and dark green on the leaves so the blooms stay bright and prominent.",
    ],
    lineArtImage: `${imageOrigin}/plants/peony/line-art.png`,
    colorImage: `${imageOrigin}/plants/peony/color.png`,
    imageAlt: "Peony flowers and leafy stems printable coloring page",
    seo: {
      title: "Peony Coloring Page – Free Printable",
      description: "Download a free printable peony coloring page with layered flower line art, a color reference, and simple coloring tips.",
    },
    relatedSlugs: ["cosmos", "sunflower", "cherry-blossoms"],
    featured: false,
    status: "published",
  },
  {
    slug: "cosmos",
    categorySlug: "flowers-plants",
    title: "Cosmos Coloring Page",
    shortIntroduction:
      "This cosmos coloring page brings together cheerful open flowers, rounded centers, and fresh green leaves. Its wide petals are a relaxed place to experiment with pink, coral, or lavender.",
    coloringTips: [
      "Start with a light pink or coral base and softly deepen the color where each petal meets the center.",
      "Try golden yellow with tiny brown dots for the flower centers.",
      "Keep a few petal edges lighter to give the flowers an airy, sunlit look.",
    ],
    lineArtImage: `${imageOrigin}/plants/cosmos/line-art.png`,
    colorImage: `${imageOrigin}/plants/cosmos/color.png`,
    imageAlt: "Pink cosmos flowers and green leaves printable coloring page",
    seo: {
      title: "Cosmos Coloring Page – Free Printable",
      description: "Download a free printable cosmos coloring page with flower line art, a color reference, and easy coloring ideas.",
    },
    relatedSlugs: ["peony", "sunflower", "cherry-blossoms"],
    featured: false,
    status: "published",
  },
  {
    slug: "lotus-and-koi",
    categorySlug: "flowers-plants",
    title: "Lotus and Koi Coloring Page",
    shortIntroduction:
      "Bring a peaceful pond scene to life with lotus blossoms, broad floating leaves, seed pods, and two graceful koi. This page offers a lovely mix of flowers, water, and patterned fish.",
    coloringTips: [
      "Use pinks or whites for the lotus petals, keeping the inner petals slightly lighter.",
      "Layer light and deep greens across the leaves, then add a yellow-green center where the veins meet.",
      "Try orange, white, and black patches on the koi, then use a pale blue-gray for a hint of water.",
    ],
    lineArtImage: `${imageOrigin}/plants/lotus-and-koi/line-art.png`,
    colorImage: `${imageOrigin}/plants/lotus-and-koi/color.png`,
    imageAlt: "Lotus flowers, lily pads, and koi fish printable coloring page",
    seo: {
      title: "Lotus and Koi Coloring Page – Free Printable",
      description: "Download a free printable lotus and koi coloring page with pond line art, a color reference, and calming coloring tips.",
    },
    relatedSlugs: ["peony", "mixed-flower-bouquet", "sunflower"],
    featured: false,
    status: "published",
  },
  {
    slug: "mixed-flower-bouquet",
    categorySlug: "flowers-plants",
    title: "Mixed Flower Bouquet Coloring Page",
    shortIntroduction:
      "Color a generous mixed flower bouquet filled with roses, lilies, daisies, and leafy accents. The varied shapes invite you to create a one-of-a-kind arrangement.",
    coloringTips: [
      "Choose two or three main flower colors, then repeat them in small accents to make the bouquet feel cohesive.",
      "Use a warmer green for nearby leaves and a cooler green for leaves farther back.",
      "Color the smallest flowers last with a fine-point pencil or marker to keep their details crisp.",
    ],
    lineArtImage: `${imageOrigin}/plants/mixed-flower-bouquet/line-art.png`,
    colorImage: `${imageOrigin}/plants/mixed-flower-bouquet/color.png`,
    imageAlt: "Mixed flower bouquet with roses, lilies, and daisies printable coloring page",
    seo: {
      title: "Mixed Flower Bouquet Coloring Page – Free Printable",
      description: "Download a free printable mixed flower bouquet coloring page with detailed line art, a color reference, and creative coloring tips.",
    },
    relatedSlugs: ["peony", "lotus-and-koi", "cherry-blossoms"],
    featured: false,
    status: "published",
  },
  {
    slug: "sunflower",
    categorySlug: "flowers-plants",
    title: "Sunflower Coloring Page",
    shortIntroduction:
      "This sunny printable features a lively cluster of sunflowers, round textured centers, and leafy stems. It is a cheerful page for bold yellows and rich summer greens.",
    coloringTips: [
      "Use lemon yellow on the outer petals and a warmer golden yellow closer to the centers.",
      "Add brown, ochre, or tiny dots of black to give each flower center a natural seed texture.",
      "Use a deep green along the leaf veins, then blend toward a lighter green at the edges.",
    ],
    lineArtImage: `${imageOrigin}/plants/sunflower/line-art.png`,
    colorImage: `${imageOrigin}/plants/sunflower/color.png`,
    imageAlt: "Sunflowers with yellow petals and green leaves printable coloring page",
    seo: {
      title: "Sunflower Coloring Page – Free Printable",
      description: "Download a free printable sunflower coloring page with bright floral line art, a color reference, and easy tips for coloring petals and leaves.",
    },
    relatedSlugs: ["cosmos", "peony", "lotus-and-koi"],
    featured: false,
    status: "published",
  },
  {
    slug: "cherry-blossoms",
    categorySlug: "flowers-plants",
    title: "Cherry Blossoms Coloring Page",
    shortIntroduction:
      "Color a blooming cherry branch filled with soft five-petaled flowers, buds, and delicate leaves. This detailed spring page is perfect for building gentle layers of color.",
    coloringTips: [
      "Start with pale blush pink and add a slightly deeper shade near the center of each blossom.",
      "Use warm brown for the branches, leaving small lighter areas to suggest texture.",
      "Color the leaves in two greens and reserve a few blossoms for nearly white petals to add variety.",
    ],
    lineArtImage: `${imageOrigin}/plants/cherry-blossoms/line-art.png`,
    colorImage: `${imageOrigin}/plants/cherry-blossoms/color.png`,
    imageAlt: "Cherry blossom branch with pink flowers and leaves printable coloring page",
    seo: {
      title: "Cherry Blossoms Coloring Page – Free Printable",
      description: "Download a free printable cherry blossoms coloring page with detailed branch line art, a color reference, and spring coloring tips.",
    },
    relatedSlugs: ["cosmos", "peony", "mixed-flower-bouquet"],
    featured: false,
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
