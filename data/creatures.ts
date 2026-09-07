import type { Creature } from "./types";
// Draft examples are not rendered or included in static routes.
export const creatures: Creature[] = [
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
