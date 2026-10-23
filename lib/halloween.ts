import type { StandardColoringPage } from "../data/types";

type HalloweenTheme = {
  title: string;
  description: string;
  slugs: string[];
};

export const halloweenThemes: HalloweenTheme[] = [
  {
    title: "Pumpkins & Jack-o'-Lanterns",
    description: "Carved faces, pumpkin candles, and playful pumpkin scenes.",
    slugs: ["jack-o-lantern", "stacked-pumpkins", "ghost-witch-pumpkin", "vampire-pumpkin-treat-bag"],
  },
  {
    title: "Ghosts & Witches",
    description: "Floating ghosts, witch hats, and broomstick adventures.",
    slugs: ["cute-ghost", "waving-ghost", "ghost-witch", "little-witch", "witch-on-broom", "flying-witch"],
  },
  {
    title: "Bats & Nighttime Friends",
    description: "Friendly bats and nighttime Halloween characters.",
    slugs: ["flying-bat", "friendly-bat", "vampire-bat", "bat-with-balloon", "vampire-with-bats"],
  },
  {
    title: "Haunted Houses & Halloween Fun",
    description: "A haunted house and costume-ready Halloween scenes.",
    slugs: ["haunted-house", "chibi-costumed-character"],
  },
  {
    title: "Spooky Creatures",
    description: "Mummies, vampires, a werewolf, and other friendly spooky characters.",
    slugs: ["little-vampire", "little-vampire-boy", "vampire-girl", "waving-vampire", "mummy-vampire", "waving-mummy", "mummy-peace-sign", "mummy-with-present", "dancing-mummy", "friendly-skull", "cute-skull", "werewolf"],
  },
];

const halloweenDetailCopy: Record<string, string> = {
  "cute-ghost": "This friendly ghost has a soft floating shape and big expressive eyes for a playful Halloween coloring session.",
  "waving-ghost": "This waving ghost offers an open, simple silhouette that works well for a cheerful Halloween activity.",
  "ghost-witch": "This page combines a ghostly character with a witch costume for a lighthearted Halloween scene.",
  "little-witch": "The little witch's hat, outfit, and small details make this a charming Halloween printable to color.",
  "witch-on-broom": "This witch rides a broom through a classic Halloween scene, with clear costume details to bring to life.",
  "flying-witch": "This flying witch and broom create a familiar Halloween silhouette with plenty of costume details.",
  "jack-o-lantern": "This carved jack-o'-lantern has a big expressive face and a classic autumn Halloween look.",
  "stacked-pumpkins": "These stacked pumpkins and candle flame make a warm, decorative Halloween design to color.",
  "ghost-witch-pumpkin": "A small ghost in a witch hat sits on a glowing pumpkin in this playful Halloween illustration.",
  "vampire-pumpkin-treat-bag": "This vampire character carries a pumpkin treat bag, making it a natural choice for Halloween party activities.",
  "haunted-house": "The old house, windows, and Halloween setting give this printable a gently spooky atmosphere.",
  "flying-bat": "Wide wings and a smiling face make this bat a friendly nighttime Halloween symbol to color.",
  "friendly-bat": "This friendly bat has simple wing shapes and a playful expression for an easy spooky-season page.",
  "vampire-bat": "This bat has a tiny vampire-inspired look, bringing a classic Halloween creature to the page.",
  "bat-with-balloon": "A bat with a balloon adds a playful twist to a familiar Halloween nighttime character.",
  "vampire-with-bats": "This vampire character is joined by bats, giving the printable a clear spooky-season setting.",
  "little-vampire": "This little vampire has a friendly expression and classic costume details for a light spooky coloring activity.",
  "little-vampire-boy": "This young vampire character uses a simple costume and expressive face for a playful Halloween page.",
  "vampire-girl": "This vampire girl combines a costume, fangs, and cheerful expression in a friendly Halloween design.",
  "waving-vampire": "This waving vampire is an approachable Halloween character with a clear costume silhouette.",
  "mummy-vampire": "This wrapped mummy-vampire character mixes two familiar Halloween costume ideas in one printable design.",
  "waving-mummy": "This waving mummy has bold bandage shapes that make it satisfying to color section by section.",
  "mummy-peace-sign": "This mummy makes a peace sign, turning a classic Halloween character into a cheerful activity page.",
  "mummy-with-present": "This mummy holds a wrapped gift for a playful Halloween scene with clear stripes and simple shapes.",
  "dancing-mummy": "This dancing mummy uses lively wrapped shapes and a big smile for a fun Halloween coloring break.",
  "friendly-skull": "This friendly skull uses rounded features and bright eye shapes for a cute, not-too-spooky Halloween design.",
  "cute-skull": "This rounded skull has shiny eyes and a gentle expression for a cute Halloween coloring page.",
  werewolf: "This friendly werewolf has a furry costume, tail, and playful expression for a character-led Halloween page.",
  "chibi-costumed-character": "This chibi character wears a festive costume with a bold headpiece and playful Halloween-ready details.",
};

export function halloweenThemeForSlug(slug: string) {
  return halloweenThemes.find((theme) => theme.slugs.includes(slug));
}

export function halloweenThemeGroups(pages: StandardColoringPage[]) {
  return halloweenThemes
    .map((theme) => ({ ...theme, pages: theme.slugs.map((slug) => pages.find((page) => page.slug === slug)).filter((page): page is StandardColoringPage => Boolean(page)) }))
    .filter((theme) => theme.pages.length > 0);
}

export function halloweenPrintableIntroduction(page: StandardColoringPage) {
  const subject = page.title.replace(/ Coloring Page$/, "").toLowerCase();
  const detail = halloweenDetailCopy[page.slug] ?? `This ${subject} design brings a recognizable Halloween subject to a printable coloring page.`;
  return `${detail} Print the clean line art for home, classroom, or Halloween activities, or download the PNG for later. Use the color reference as a starting point, then choose your own seasonal palette.`;
}
