import type { Creature } from "./types";
// Draft examples are not rendered or included in static routes.
export const creatures: Creature[] = [
  {
    slug: "nine-colored-deer",
    name: "Nine-Colored Deer",
    localName: "九色鹿",
    themeSlug: "shan-hai-jing",
    origin: "A beloved deer figure in Chinese Buddhist storytelling.",
    shortDescription:
      "A graceful, many-hued deer created here as the first finished coloring product.",
    appearance:
      "A luminous deer with an elegant silhouette, long legs, branching antlers, and a richly patterned coat.",
    legend:
      "A fuller editorial account will be added with the next round of creature research.",
    symbolism:
      "Its visual design is associated with kindness, courage, and the meeting of the natural and the wondrous.",
    heroImage: "/products/nine-colored-deer/finished.png",
    featured: true,
    status: "published",
  },
  {
    slug: "nine-tailed-fox",
    name: "Nine-Tailed Fox",
    localName: "九尾狐",
    themeSlug: "shan-hai-jing",
    origin: "Chinese mythology.",
    shortDescription:
      "A fox with nine tails, imagined here as a starting point for coloring.",
    appearance:
      "Nine flowing tails give this creature a distinctive silhouette.",
    legend:
      "Detailed story notes are being prepared for this introductory creature entry.",
    symbolism:
      "An expanded editorial introduction will explore how its meanings vary across stories.",
    heroImage: null,
    featured: true,
    status: "published",
  },
  ...[
    ["taotie", "Taotie", "饕餮"],
    ["qilin", "Qilin", "麒麟"],
    ["xuanwu", "Xuanwu", "玄武"],
    ["fenghuang", "Fenghuang", "凤凰"],
    ["qiongqi", "Qiongqi", "穷奇"],
    ["bifang", "Bifang", "毕方"],
    ["lushu", "Lushu", "鹿蜀"],
    ["qinglong", "Qinglong", "青龙"],
  ].map(
    ([slug, name, localName]): Creature => ({
      slug,
      name,
      localName,
      themeSlug: "shan-hai-jing",
      origin: "",
      shortDescription: "",
      appearance: "",
      legend: "",
      symbolism: "",
      heroImage: null,
      featured: false,
      status: "draft",
    }),
  ),
];
export const publishedCreatures = creatures.filter(
  (c) => c.status === "published",
);
