import type { StandardColoringPage } from "./types";

type PageSeed = { slug: string; name: string; categorySlug: string };

const pages: PageSeed[] = [
  { slug: "armored-future-soldier", name: "Armored Future Soldier", categorySlug: "sci-fi-robots" },
  { slug: "cyborg-sentinel", name: "Cyborg Sentinel", categorySlug: "sci-fi-robots" },
  { slug: "blue-gold-exosuit-warrior", name: "Blue-Gold Exosuit Warrior", categorySlug: "sci-fi-robots" },
  { slug: "tech-ranger", name: "Tech Ranger", categorySlug: "sci-fi-robots" },
  { slug: "neon-armored-scout", name: "Neon Armored Scout", categorySlug: "sci-fi-robots" },
  { slug: "heavy-power-armor", name: "Heavy Power Armor", categorySlug: "sci-fi-robots" },
  { slug: "shoulder-launcher-soldier", name: "Shoulder Launcher Soldier", categorySlug: "action-adventure" },
  { slug: "power-suit-adventurer", name: "Power Suit Adventurer", categorySlug: "sci-fi-robots" },
  { slug: "cybernetic-heavy-gunner", name: "Cybernetic Heavy Gunner", categorySlug: "sci-fi-robots" },
  { slug: "spider-tank", name: "Spider Tank", categorySlug: "sci-fi-robots" },
  { slug: "futuristic-female-adventurer", name: "Futuristic Female Adventurer", categorySlug: "sci-fi-robots" },
  { slug: "fantasy-spear-warrior", name: "Fantasy Spear Warrior", categorySlug: "fantasy-warriors" },
  { slug: "elf-tech-sword-fighter", name: "Elf Tech Sword Fighter", categorySlug: "fantasy-warriors" },
  { slug: "tactical-female-scout", name: "Tactical Female Scout", categorySlug: "action-adventure" },
  { slug: "wasteland-sniper", name: "Wasteland Sniper", categorySlug: "action-adventure" },
  { slug: "bionic-backpack-explorer", name: "Bionic Backpack Explorer", categorySlug: "sci-fi-robots" },
  { slug: "armored-space-squad", name: "Armored Space Squad", categorySlug: "action-adventure" },
  { slug: "mech-pilot-combat-pod", name: "Mech Pilot Combat Pod", categorySlug: "sci-fi-robots" },
  { slug: "mech-pilot-launch-console", name: "Mech Pilot Launch Console", categorySlug: "sci-fi-robots" },
  { slug: "grenade-lance-scout", name: "Grenade Lance Scout", categorySlug: "action-adventure" },
  { slug: "armored-expedition-explorer", name: "Armored Expedition Explorer", categorySlug: "sci-fi-robots" },
  { slug: "heavy-futuristic-trooper", name: "Heavy Futuristic Trooper", categorySlug: "sci-fi-robots" },
  { slug: "cybernetic-woman-portrait", name: "Cybernetic Woman Portrait", categorySlug: "sci-fi-robots" },
  { slug: "alien-mech-creature", name: "Alien Mech Creature", categorySlug: "sci-fi-robots" },
  { slug: "winter-heavy-gunner", name: "Winter Heavy Gunner", categorySlug: "sci-fi-robots" },
  { slug: "mechanical-arm-train-window", name: "Mechanical Arm at the Train Window", categorySlug: "sci-fi-robots" },
  { slug: "racing-trimaran", name: "Racing Trimaran", categorySlug: "vehicles" },
  { slug: "arcane-mech-warriors", name: "Arcane Mech Warriors", categorySlug: "fantasy-warriors" },
  { slug: "robot-commander-walker", name: "Robot Commander Walker", categorySlug: "sci-fi-robots" },
  { slug: "futuristic-fighter-plane", name: "Futuristic Fighter Plane", categorySlug: "vehicles" },
  { slug: "mechanical-crab-explorer", name: "Mechanical Crab Explorer", categorySlug: "sci-fi-robots" },
  { slug: "winged-flying-robot", name: "Winged Flying Robot", categorySlug: "sci-fi-robots" },
  { slug: "alien-jetpack-creature", name: "Alien Jetpack Creature", categorySlug: "sci-fi-robots" },
  { slug: "alien-crab-laser-beast", name: "Alien Crab Laser Beast", categorySlug: "sci-fi-robots" },
  { slug: "tech-sniper", name: "Tech Sniper", categorySlug: "action-adventure" },
  { slug: "cyborg-portrait", name: "Cyborg Portrait", categorySlug: "sci-fi-robots" },
  { slug: "spiked-knight-armor", name: "Spiked Knight Armor", categorySlug: "fantasy-warriors" },
  { slug: "visor-cyborg", name: "Visor Cyborg", categorySlug: "sci-fi-robots" },
  { slug: "alien-blade-warrior", name: "Alien Blade Warrior", categorySlug: "sci-fi-robots" },
  { slug: "heavy-gun-motorcycle-rider", name: "Heavy-Gun Motorcycle Rider", categorySlug: "action-adventure" },
];

const tips = [
  "Choose two main colors for armor or machinery, then repeat them across matching plates and panels.",
  "Use a darker shade around joins, vents, and cables to bring out the mechanical detail.",
  "Reserve a bright accent color for lights, energy effects, emblems, or small controls.",
];

export const sciFiActionPages: StandardColoringPage[] = pages.map((page, index) => ({
  slug: page.slug,
  categorySlug: page.categorySlug,
  title: `${page.name} Coloring Page`,
  shortIntroduction: `Color this detailed ${page.name.toLowerCase()} illustration with your own sci-fi, fantasy, or adventure palette. Use the color reference for ideas, or invent a completely new design.`,
  coloringTips: tips,
  lineArtImage: `/coloring-pages/scifi-action/${page.slug}-line.jpg`,
  colorImage: `/coloring-pages/scifi-action/${page.slug}-color.jpg`,
  imageAlt: `${page.name} printable coloring page with line art and color reference`,
  seo: {
    title: `${page.name} Coloring Page – Free Printable`,
    description: `Download a free printable ${page.name.toLowerCase()} coloring page with clean line art, a color reference, and coloring tips.`,
  },
  featured: index < 6,
  status: "published",
}));
