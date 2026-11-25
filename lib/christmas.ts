import type { StandardColoringPage } from "../data/types";

const groups = [
  { title: "Santa Claus", match: /santa/ },
  { title: "Christmas Trees", match: /christmas-tree|decorated-tree|ribbon-tree/ },
  { title: "Snowmen", match: /snowman/ },
  { title: "Reindeer", match: /reindeer/ },
  { title: "Gingerbread", match: /gingerbread/ },
  { title: "Christmas Gifts & Stockings", match: /stocking|gift/ },
  { title: "Christmas Decorations", match: /ornament|candy-cane|fireplace|garland/ },
  { title: "Winter Wonderland", match: /snow-globe|winter-village/ },
];

export function christmasThemeGroups(pages: StandardColoringPage[]) {
  const assigned = new Set<string>();
  return groups.map((group) => {
    const matches = pages.filter((page) => !assigned.has(page.slug) && group.match.test(page.slug));
    matches.forEach((page) => assigned.add(page.slug));
    return { ...group, pages: matches };
  }).filter((group) => group.pages.length > 0);
}

export function christmasPrintableIntroduction(page: StandardColoringPage) {
  const subject = page.title.replace(/ Coloring Page$/, "").toLowerCase();
  return `This free printable ${subject} coloring sheet is made for a festive winter activity at home, in a classroom, or during a holiday gathering. Print the clean line art at A4 size or download the PNG, then use the color reference as optional inspiration.`;
}
