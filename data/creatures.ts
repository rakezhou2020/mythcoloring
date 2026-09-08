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
    heroImage: "/products/nine-colored-deer/finished.jpg",
    featured: true,
    status: "published",
  },
  {
    slug: "white-ape",
    name: "White Ape",
    localName: "白猿",
    themeSlug: "shan-hai-jing",
    origin:
      "The White Ape appears in the Southern Mountains section of the Shan Hai Jing, where Tangting Mountain is described as a place rich in yan trees, water jade, gold, and many white apes. The ancient text gives only a brief glimpse, but later Chinese storytelling transformed the white ape into something far more mysterious: a long-lived mountain spirit, a shapeshifter, and even a master of swordsmanship.",
    shortDescription:
      "High in the mountains lives the White Ape—an ancient creature whose legend grew from a fleeting line in the Shan Hai Jing into stories of hidden wisdom, transformation, and impossible swordplay.",
    appearance:
      "The Shan Hai Jing simply places white apes among the wild riches of Tangting Mountain, leaving their exact form to the imagination. Later tradition pictures the white ape as an unusually old and intelligent mountain being: pale-furred, swift, elusive, and close to the boundary between animal and immortal. Our artwork builds on that tradition, presenting it as a supernatural guardian of the high mountains rather than an ordinary ape.",
    legend:
      "One of the most famous later white-ape stories appears in the Wu Yue Chun Qiu. A legendary swordswoman of Yue was traveling north to meet the king when an old man stopped her on the road. He called himself Yuan Gong and asked to test her sword skill. The two fought using a bamboo branch as a weapon. The woman matched his attacks and struck back. In an instant, the mysterious old man sprang into a tree and transformed into a white ape before disappearing into the forest. That brief encounter became one of the classic images of the White Ape in Chinese legend: an ancient being hiding extraordinary skill behind an ordinary shape, appearing only long enough to test a worthy human before vanishing again into the mountains.",
    symbolism:
      "The White Ape stands at the edge between wilderness and wisdom. In the Shan Hai Jing it belongs to a remote mountain world filled with strange animals, precious stone, and gold; in later legend it becomes a creature of transformation and hidden mastery. That combination makes the White Ape feel less like a monster to be defeated and more like a secret of the mountains—watchful, ancient, and never fully understood.",
    heroImage: "/products/winged-monkey/finished.jpg",
    featured: true,
    status: "published",
  },
  {
    slug: "armadillo",
    name: "Armadillo",
    localName: "犰狳",
    themeSlug: "shan-hai-jing",
    origin: "Myth-inspired coloring artwork.",
    shortDescription:
      "A small armored creature rests among curling leaves, golden flower heads, and ornamental forms.",
    appearance:
      "Its long tail, layered dark shell, tall ears, and plant-filled setting make it easy to recognize.",
    legend:
      "Its poster presents the armadillo as a calm traveler in a detailed garden landscape.",
    symbolism:
      "The art balances a protected shell with a gentle, living garden.",
    heroImage: "/products/armadillo/finished.jpg",
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
