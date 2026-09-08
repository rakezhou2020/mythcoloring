import type { Creature } from "./types";
// Draft examples are not rendered or included in static routes.
export const creatures: Creature[] = [
  {
    slug: "nine-colored-deer",
    name: "Nine-Colored Deer",
    localName: "九色鹿",
    themeSlug: "shan-hai-jing",
    origin:
      "The Nine-Colored Deer is best known from the Deer King Jataka mural in Cave 257 of the Mogao Caves at Dunhuang, painted during the Northern Wei period. The tale comes from the Buddhist Jataka tradition, in which the future Buddha appears in an earlier life as a miraculous deer king.",
    shortDescription:
      "A radiant deer saves a drowning stranger, asks only that its hidden home remain secret, and is later betrayed for a royal reward—one of Dunhuang's most enduring tales of compassion, greed, and a broken promise.",
    appearance:
      "In the Dunhuang tradition, the deer is an otherworldly creature of many colors, graceful and luminous, with pale antlers and a noble bearing. Its beauty is not merely decorative: it is exactly what draws human desire toward a creature that wishes only to live in peace.",
    legend:
      "Long ago, beside the Ganges River, the Nine-Colored Deer heard a man crying for help and pulled him from the water. The rescued man offered a reward, but the deer asked for only one thing: never reveal where it lived. Later, a queen dreamed of the extraordinary deer and longed to possess its beautiful hide. The king announced a rich reward for anyone who could lead him to it, and the man who owed the deer his life surrendered its secret. When the hunting party surrounded the deer, it did not flee in terror. Instead, it stood before the king and told him how the informer had once been saved from drowning. Moved by the deer's courage and compassion—and ashamed by the betrayal—the king abandoned the hunt and ordered that the deer be protected. In the famous Dunhuang mural, the story unfolds like an ancient picture scroll, beginning from both ends and drawing the viewer toward this final confrontation.",
    symbolism:
      "The Nine-Colored Deer endures because its legend is more than a story about a magical animal. It is a tale about kindness offered without price, the danger of greed, the weight of a promise, and the power of truth when violence seems inevitable. The deer answers betrayal not with revenge, but with dignity—and that is what makes the story feel legendary even after more than a thousand years.",
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
