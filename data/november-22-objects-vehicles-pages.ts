import type { StandardColoringPage } from "./types";

type Category = "animals" | "bags-travel" | "road-safety" | "toys-games" | "architecture-landscapes" | "sci-fi-robots" | "vehicles";
type Seed = { number: number; slug: string; title: string; categorySlug: Category };

const image = (number: number, kind: "line" | "color") =>
  `/coloring-pages/november-22/${number}-${kind}.jpg`;

const seeds: Seed[] = [
  { number: 645, slug: "decorative-water-well", title: "Decorative Water Well", categorySlug: "toys-games" },
  { number: 646, slug: "school-backpack-books", title: "School Backpack with Books", categorySlug: "bags-travel" },
  { number: 647, slug: "roller-skate-backpack", title: "Roller Skate Backpack", categorySlug: "bags-travel" },
  { number: 648, slug: "hanging-balance-scale", title: "Hanging Balance Scale", categorySlug: "toys-games" },
  { number: 649, slug: "decorative-hanging-lantern", title: "Decorative Hanging Lantern", categorySlug: "toys-games" },
  { number: 650, slug: "blue-street-lantern", title: "Blue Street Lantern", categorySlug: "toys-games" },
  { number: 651, slug: "curved-wall-lantern", title: "Curved Wall Lantern", categorySlug: "toys-games" },
  { number: 652, slug: "red-boxing-glove", title: "Red Boxing Glove", categorySlug: "toys-games" },
  { number: 653, slug: "pink-hanging-lantern", title: "Pink Hanging Lantern", categorySlug: "toys-games" },
  { number: 654, slug: "festival-lantern-string", title: "Festival Lantern String", categorySlug: "toys-games" },
  { number: 655, slug: "colorful-kite", title: "Colorful Kite", categorySlug: "toys-games" },
  { number: 656, slug: "stone-archway-sacks", title: "Stone Archway with Sacks", categorySlug: "architecture-landscapes" },
  { number: 657, slug: "toy-spinning-top", title: "Toy Spinning Top", categorySlug: "toys-games" },
  { number: 658, slug: "wooden-watchtower", title: "Wooden Watchtower", categorySlug: "architecture-landscapes" },
  { number: 659, slug: "fantasy-rocket", title: "Fantasy Rocket", categorySlug: "sci-fi-robots" },
  { number: 660, slug: "crystal-cave-doorway", title: "Crystal Cave Doorway", categorySlug: "architecture-landscapes" },
  { number: 661, slug: "rocket-engine", title: "Rocket Engine", categorySlug: "sci-fi-robots" },
  { number: 662, slug: "cats-picture-frame", title: "Cats in a Picture Frame", categorySlug: "animals" },
  { number: 663, slug: "medieval-market-stall", title: "Medieval Market Stall", categorySlug: "architecture-landscapes" },
  { number: 664, slug: "toy-market-stall", title: "Toy Market Stall", categorySlug: "toys-games" },
  { number: 665, slug: "traffic-light-map", title: "Traffic Light and Map", categorySlug: "road-safety" },
  { number: 666, slug: "striped-traffic-bollard", title: "Striped Traffic Bollard", categorySlug: "road-safety" },
  { number: 667, slug: "two-arrow-wooden-direction-sign", title: "Two-Arrow Wooden Direction Sign", categorySlug: "road-safety" },
  { number: 668, slug: "lane-direction-signal", title: "Lane Direction Signal", categorySlug: "road-safety" },
  { number: 669, slug: "u-turn-sign", title: "U-Turn Sign", categorySlug: "road-safety" },
  { number: 670, slug: "reflective-road-bollard", title: "Reflective Road Bollard", categorySlug: "road-safety" },
  { number: 671, slug: "medieval-supply-wagon", title: "Medieval Supply Wagon", categorySlug: "vehicles" },
  { number: 672, slug: "wooden-cargo-cart", title: "Wooden Cargo Cart", categorySlug: "vehicles" },
  { number: 673, slug: "log-catapult", title: "Log Catapult", categorySlug: "vehicles" },
  { number: 674, slug: "futuristic-watercraft", title: "Futuristic Watercraft", categorySlug: "vehicles" },
  { number: 675, slug: "adventure-supply-cart", title: "Adventure Supply Cart", categorySlug: "vehicles" },
  { number: 676, slug: "blue-starfighter", title: "Blue Starfighter", categorySlug: "sci-fi-robots" },
  { number: 677, slug: "steampunk-airship", title: "Steampunk Airship", categorySlug: "sci-fi-robots" },
  { number: 678, slug: "steampunk-robot", title: "Steampunk Robot", categorySlug: "sci-fi-robots" },
  { number: 679, slug: "green-vintage-car", title: "Green Vintage Car", categorySlug: "vehicles" },
  { number: 680, slug: "red-vintage-car", title: "Red Vintage Car", categorySlug: "vehicles" },
  { number: 681, slug: "blue-train", title: "Blue Train", categorySlug: "vehicles" },
  { number: 683, slug: "red-motorboat", title: "Red Motorboat", categorySlug: "vehicles" },
  { number: 684, slug: "blue-jet-ski", title: "Blue Jet Ski", categorySlug: "vehicles" },
  { number: 685, slug: "futuristic-three-wheel-vehicle", title: "Futuristic Three-Wheel Vehicle", categorySlug: "sci-fi-robots" },
  { number: 686, slug: "futuristic-snow-scooter", title: "Futuristic Snow Scooter", categorySlug: "sci-fi-robots" },
  { number: 687, slug: "classic-red-car", title: "Classic Red Car", categorySlug: "vehicles" },
  { number: 688, slug: "blue-sports-car", title: "Blue Sports Car", categorySlug: "vehicles" },
  { number: 689, slug: "red-motorcycle", title: "Red Motorcycle", categorySlug: "vehicles" },
  { number: 690, slug: "steam-traction-engine", title: "Steam Traction Engine", categorySlug: "vehicles" },
  { number: 691, slug: "horse-drawn-carriage", title: "Horse-Drawn Carriage", categorySlug: "vehicles" },
  { number: 692, slug: "vintage-flying-machine", title: "Vintage Flying Machine", categorySlug: "vehicles" },
  { number: 693, slug: "horse-drawn-wagon", title: "Horse-Drawn Wagon", categorySlug: "vehicles" },
  { number: 694, slug: "vintage-fire-engine", title: "Vintage Fire Engine", categorySlug: "vehicles" },
  { number: 695, slug: "crashed-spaceship", title: "Crashed Spaceship", categorySlug: "sci-fi-robots" },
  { number: 696, slug: "black-horse-carriage", title: "Black Horse Carriage", categorySlug: "vehicles" },
  { number: 697, slug: "futuristic-hovercraft", title: "Futuristic Hovercraft", categorySlug: "sci-fi-robots" },
  { number: 698, slug: "antique-automobile", title: "Antique Automobile", categorySlug: "vehicles" },
  { number: 699, slug: "red-canopy-carriage", title: "Red Canopy Carriage", categorySlug: "vehicles" },
];

const tips = [
  "Use the color reference as inspiration, then choose a palette that suits the subject.",
  "Add a slightly darker shade near outlines and small details for depth.",
  "Leave a few highlights light to keep the finished picture crisp and clear.",
];

export const november22ObjectsVehiclesPages: StandardColoringPage[] = seeds.map((seed, index) => ({
  slug: `november-22-${seed.slug}`,
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
