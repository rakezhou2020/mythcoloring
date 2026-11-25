import type { Creature, StandardColoringPage } from "../data/types";

type CreatureReference = { label: string; href: string; note: string };

export function creatureEntityContext(creature: Creature): {
  aliases: string[];
  culturalContext: string;
  references: CreatureReference[];
} {
  const shanHaiJingCreatures = new Set(["xuan-gui", "lushu", "cong-long", "qu-ru", "qiongqi"]);
  const fourSymbols = new Set(["qinglong", "xuanwu", "zhuque"]);
  if (creature.slug === "qinglong") {
    return {
      aliases: ["Azure Dragon", "Qing Long"],
      culturalContext: "Qinglong is one of the Four Symbols of Chinese astronomy and mythology, associated with the eastern sky. It is a celestial guardian, not a creature from the Shan Hai Jing.",
      references: [{
        label: "Smithsonian Hirshhorn: Dragon",
        href: "https://hirshhorn.si.edu/explore/zodiac-heads-dragon/",
        note: "Background on the Qinglong constellation as a symbol of the east.",
      }],
    };
  }

  if (fourSymbols.has(creature.slug)) {
    return {
      aliases: creature.slug === "xuanwu" ? ["Black Tortoise", "Black Warrior"] : creature.slug === "zhuque" ? ["Vermilion Bird"] : [],
      culturalContext: "This creature belongs to the Four Symbols of traditional Chinese celestial imagery; the page separates that astronomical and cultural context from MythColoring's artwork interpretation.",
      references: [{ label: "British Library: The regions of the Chinese sky", href: "https://idp.bl.uk/discover/learning/chinese-astronomy/articles/the-chinese-sky/the-regions-of-the-sky/", note: "Background on the Four Symbols and their directional celestial associations." }],
    };
  }

  if (shanHaiJingCreatures.has(creature.slug)) {
    return {
      aliases: [],
      culturalContext: "This creature is presented from the Classic of Mountains and Seas tradition; visual details beyond the surviving text are identified as MythColoring's interpretation.",
      references: [{ label: "Chinese Text Project: Classic of Mountains and Seas", href: "https://ctext.org/shan-hai-jing", note: "Primary-text collection for the Shan Hai Jing tradition." }],
    };
  }

  return {
    aliases: [],
    culturalContext: "This page distinguishes the traditional record described in its origin and mythology notes from MythColoring's visual interpretation.",
    references: [],
  };
}

export function coloringPageEntityNote(page: StandardColoringPage) {
  switch (page.slug) {
    case "cosmos":
      return "Cosmos flowers are known for open, daisy-like flower heads: broad outer petals surround a compact central disk. Those clear, separate shapes make this page a good choice for light petal blends and a contrasting center.";
    case "calla-lily":
      return "A calla lily's distinctive funnel-like form is a spathe, a leaf-like structure that wraps around the central spadix. This page keeps those two recognizable parts clear, along with the long leaves and stems.";
    case "traffic-cone":
      return "A traffic cone is a portable, high-visibility marker used to guide people around temporary hazards, work areas, or changes in traffic flow. Its tapered body, reflective bands, and wide base make the subject easy to recognize and color.";
    default:
      return null;
  }
}
