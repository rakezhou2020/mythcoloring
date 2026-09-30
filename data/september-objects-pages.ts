import type { StandardColoringPage } from "./types";

type ObjectPage = {
  slug: string;
  name: string;
  description: string;
  group: "bags" | "traffic";
};

const bagTips = [
  "Choose one main material color, then add a deeper shade around seams, straps, and folds.",
  "Use a warm tan, gray, or cream for small metal and fabric details.",
  "Leave a thin white highlight along curved edges to suggest a smooth finish.",
];

const trafficTips = [
  "Use bright, high-contrast colors so the sign or safety object stays easy to read.",
  "Try warm browns for wood and cool gray or silver tones for metal parts.",
  "Add a pale blue-gray background only after the main object is finished.",
];

const objects: ObjectPage[] = [
  { slug: "tagged-handbag", name: "Tagged Handbag", description: "A roomy handbag with a hanging tag and sturdy shoulder straps.", group: "bags" },
  { slug: "leather-satchel", name: "Leather Satchel", description: "A classic flap satchel with buckles, a handle, and textured leather panels.", group: "bags" },
  { slug: "travel-suitcase", name: "Travel Suitcase", description: "A compact travel suitcase with reinforced corners, a handle, and a central clasp.", group: "bags" },
  { slug: "leather-crossbody-bag", name: "Leather Crossbody Bag", description: "A detailed crossbody bag with a long strap, stitched panels, and a round clasp.", group: "bags" },
  { slug: "road-barricade", name: "Road Barricade", description: "A striped road barricade with a warning light and folding support legs.", group: "traffic" },
  { slug: "merge-warning-signs", name: "Merge Warning Signs", description: "A pair of warning road signs showing lane-merging symbols.", group: "traffic" },
  { slug: "stop-sign-and-cone", name: "Stop Sign and Traffic Cone", description: "A familiar stop sign standing beside a striped safety cone.", group: "traffic" },
  { slug: "sandbag-barrier", name: "Sandbag Barrier", description: "A sturdy filled sandbag used as a temporary safety barrier.", group: "traffic" },
  { slug: "parking-sign", name: "Parking Sign", description: "A round parking sign on a tall post with a directional arrow.", group: "traffic" },
  { slug: "wooden-direction-sign", name: "Wooden Direction Sign", description: "A weathered wooden signpost with arrows pointing in different directions.", group: "traffic" },
  { slug: "weather-vane", name: "Weather Vane", description: "A compass-style weather vane with cardinal direction letters and an arrow.", group: "traffic" },
  { slug: "right-turn-sign", name: "Right Turn Sign", description: "A diamond-shaped road sign with a bold right-turn arrow.", group: "traffic" },
  { slug: "steering-wheel", name: "Steering Wheel", description: "A detailed steering wheel with padded grips and a central horn button.", group: "traffic" },
  { slug: "vehicle-horn", name: "Vehicle Horn", description: "A classic vehicle horn with a flared speaker and sturdy base.", group: "traffic" },
  { slug: "traffic-light", name: "Traffic Light", description: "A three-color traffic signal with red, amber, and green lenses.", group: "traffic" },
  { slug: "roadside-billboard", name: "Roadside Billboard", description: "A blank roadside billboard ready for an original message or design.", group: "traffic" },
  { slug: "intersection-warning-sign", name: "Intersection Warning Sign", description: "A road warning sign showing a four-way intersection ahead.", group: "traffic" },
  { slug: "crossed-road-tools", name: "Crossed Road Tools", description: "A shovel and hoe crossed in front of a work-zone sign.", group: "traffic" },
  { slug: "traffic-cone", name: "Traffic Cone", description: "A striped traffic cone on a wide square base.", group: "traffic" },
  { slug: "rubber-mallet", name: "Rubber Mallet", description: "A sturdy rubber mallet with a long wooden handle.", group: "traffic" },
  { slug: "blank-road-sign", name: "Blank Road Sign", description: "An empty road sign panel that invites children to invent their own symbol.", group: "traffic" },
  { slug: "traffic-delineator", name: "Traffic Delineator", description: "A tall reflective traffic delineator with round safety lenses.", group: "traffic" },
];

export const septemberObjectPages: StandardColoringPage[] = objects.map((item) => ({
  slug: item.slug,
  categorySlug: item.group === "bags" ? "bags-travel" : "road-safety",
  title: `${item.name} Coloring Page`,
  shortIntroduction: `Color ${item.description.toLowerCase()} Use the reference image for inspiration, or create a design entirely your own.`,
  coloringTips: item.group === "bags" ? bagTips : trafficTips,
  lineArtImage: `/coloring-pages/objects/${item.slug}/line-art.webp`,
  colorImage: `/coloring-pages/objects/${item.slug}/color.webp`,
  imageAlt: `${item.name} printable coloring page with line art and color reference`,
  seo: {
    title: `${item.name} Coloring Page – Free Printable`,
    description: `Download a free printable ${item.name.toLowerCase()} coloring page with clean line art and a color reference.`,
  },
  featured: item.slug === "tagged-handbag" || item.slug === "road-barricade",
  status: "published",
}));
