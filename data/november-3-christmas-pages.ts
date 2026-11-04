import type { StandardColoringPage } from "./types";

type Category = "christmas" | "halloween" | "animals" | "anime-character-art";
type Seed = { number: number; slug: string; title: string; categorySlug: Category };

const image = (number: number, kind: "line" | "color") =>
  `/coloring-pages/november-3/${number}-${kind}.jpg`;

const seeds: Seed[] = [
  { number: 562, slug: "snowflake-christmas-ornament", title: "Snowflake Christmas Ornament", categorySlug: "christmas" },
  { number: 563, slug: "gingerbread-man-santa-hat", title: "Gingerbread Man in a Santa Hat", categorySlug: "christmas" },
  { number: 564, slug: "snowman-santa-hat", title: "Snowman in a Santa Hat", categorySlug: "christmas" },
  { number: 565, slug: "snowman-candy-cane", title: "Snowman with a Candy Cane", categorySlug: "christmas" },
  { number: 566, slug: "cute-santa-claus", title: "Cute Santa Claus", categorySlug: "christmas" },
  { number: 567, slug: "decorated-christmas-tree", title: "Decorated Christmas Tree", categorySlug: "christmas" },
  { number: 568, slug: "reindeer-pulling-sleigh", title: "Reindeer Pulling a Sleigh", categorySlug: "christmas" },
  { number: 569, slug: "santa-gingerbread-friends", title: "Santa and Gingerbread Friends", categorySlug: "christmas" },
  { number: 570, slug: "cozy-winter-village-snow-globe", title: "Cozy Winter Village Snow Globe", categorySlug: "christmas" },
  { number: 571, slug: "gingerbread-man-scarf", title: "Gingerbread Man with a Scarf", categorySlug: "christmas" },
  { number: 572, slug: "candy-cane-bow", title: "Candy Cane with a Bow", categorySlug: "christmas" },
  { number: 573, slug: "gingerbread-family-christmas-tree", title: "Gingerbread Family by a Christmas Tree", categorySlug: "christmas" },
  { number: 574, slug: "snowman-green-hat", title: "Snowman with a Green Hat", categorySlug: "christmas" },
  { number: 575, slug: "little-santa-claus", title: "Little Santa Claus", categorySlug: "christmas" },
  { number: 576, slug: "gingerbread-girl-santa-hat", title: "Gingerbread Girl in a Santa Hat", categorySlug: "christmas" },
  { number: 578, slug: "waving-gingerbread-man", title: "Waving Gingerbread Man", categorySlug: "christmas" },
  { number: 579, slug: "snowman-decorating-tree", title: "Snowman Decorating a Tree", categorySlug: "christmas" },
  { number: 580, slug: "santa-gift-sleigh", title: "Santa on a Gift Sleigh", categorySlug: "christmas" },
  { number: 581, slug: "ribbon-christmas-tree", title: "Ribbon Christmas Tree", categorySlug: "christmas" },
  { number: 582, slug: "winter-birds-branch", title: "Winter Birds on a Branch", categorySlug: "animals" },
  { number: 583, slug: "santa-portrait", title: "Santa Portrait", categorySlug: "christmas" },
  { number: 584, slug: "christmas-cat-candy-cane", title: "Christmas Cat with a Candy Cane", categorySlug: "animals" },
  { number: 585, slug: "reindeer-girl-character", title: "Reindeer Girl Character", categorySlug: "anime-character-art" },
  { number: 588, slug: "zombie-santa", title: "Zombie Santa", categorySlug: "halloween" },
  { number: 589, slug: "ghostly-santa", title: "Ghostly Santa", categorySlug: "halloween" },
  { number: 590, slug: "dark-santa-portrait", title: "Dark Santa Portrait", categorySlug: "halloween" },
  { number: 591, slug: "creepy-green-santa", title: "Creepy Green Santa", categorySlug: "halloween" },
  { number: 592, slug: "skeleton-snowman-tree", title: "Skeleton Snowman and Tree", categorySlug: "halloween" },
  { number: 593, slug: "evil-snowman-cane", title: "Evil Snowman with a Cane", categorySlug: "halloween" },
  { number: 594, slug: "one-eyed-snowman", title: "One-Eyed Snowman", categorySlug: "halloween" },
  { number: 595, slug: "snow-monster-top-hat", title: "Snow Monster in a Top Hat", categorySlug: "halloween" },
  { number: 596, slug: "creepy-snowman-candy-canes", title: "Creepy Snowman with Candy Canes", categorySlug: "halloween" },
  { number: 597, slug: "haunted-gingerbread-cottage", title: "Haunted Gingerbread Cottage", categorySlug: "halloween" },
  { number: 598, slug: "classic-santa-portrait", title: "Classic Santa Portrait", categorySlug: "christmas" },
  { number: 599, slug: "christmas-fireplace-stockings", title: "Christmas Fireplace with Stockings", categorySlug: "christmas" },
  { number: 600, slug: "smiling-christmas-stocking", title: "Smiling Christmas Stocking", categorySlug: "christmas" },
  { number: 601, slug: "cute-stocking-character", title: "Cute Stocking Character", categorySlug: "christmas" },
  { number: 602, slug: "gift-filled-christmas-stocking", title: "Gift-Filled Christmas Stocking", categorySlug: "christmas" },
  { number: 603, slug: "wooden-christmas-stocking", title: "Wooden Christmas Stocking", categorySlug: "christmas" },
  { number: 604, slug: "red-gift-stockings", title: "Red Gift Stocking", categorySlug: "christmas" },
  { number: 605, slug: "fireplace-stocking-garland", title: "Fireplace Stocking Garland", categorySlug: "christmas" },
  { number: 606, slug: "snowman-motif-christmas-stocking", title: "Snowman Motif Christmas Stocking", categorySlug: "christmas" },
  { number: 607, slug: "gingerbread-christmas-stocking", title: "Gingerbread Christmas Stocking", categorySlug: "christmas" },
  { number: 608, slug: "striped-christmas-stocking", title: "Striped Christmas Stocking", categorySlug: "christmas" },
  { number: 609, slug: "candy-cane-christmas-stocking", title: "Candy Cane Christmas Stocking", categorySlug: "christmas" },
  { number: 610, slug: "candy-cane-pattern-stocking", title: "Candy Cane Pattern Stocking", categorySlug: "christmas" },
  { number: 611, slug: "holly-leaf-christmas-stocking", title: "Holly Leaf Christmas Stocking", categorySlug: "christmas" },
  { number: 612, slug: "mug-pattern-christmas-stocking", title: "Mug Pattern Christmas Stocking", categorySlug: "christmas" },
  { number: 613, slug: "mini-stocking-garland", title: "Mini Stocking Garland", categorySlug: "christmas" },
  { number: 614, slug: "star-pattern-christmas-stocking", title: "Star Pattern Christmas Stocking", categorySlug: "christmas" },
];

const tips = [
  "Use the color reference as inspiration, then choose a palette that suits the subject.",
  "Add a slightly darker shade near outlines and small details for depth.",
  "Leave a few highlights light to keep the finished picture crisp and clear.",
];

export const november3ChristmasPages: StandardColoringPage[] = seeds.map((seed, index) => ({
  slug: `november-3-${seed.slug}`,
  categorySlug: seed.categorySlug,
  title: `${seed.title} Coloring Page`,
  shortIntroduction: `Color this ${seed.title.toLowerCase()} illustration with printable line art and a matching color reference.`,
  coloringTips: tips,
  lineArtImage: image(seed.number, "line"),
  colorImage: image(seed.number, "color"),
  imageAlt: `${seed.title} printable coloring page with line art and color reference`,
  seo: {
    title: `${seed.title} Coloring Page – Free Printable`,
    description: `Download a free printable ${seed.title.toLowerCase()} coloring page with clean line art and a matching color reference.`,
  },
  featured: index < 8,
  status: "published",
}));
