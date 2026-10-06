import type { StandardColoringCategory, StandardColoringPage } from "../data/types";

function subjectName(title: string) {
  return title.replace(/ Coloring Page$/, "");
}

export function standardPageSeo(page: StandardColoringPage, category: StandardColoringCategory) {
  const subject = subjectName(page.title);
  const categoryLabel = category.slug === "flowers-plants"
    ? "Flower"
    : category.slug === "animals"
      ? "Animal"
      : category.name.replace(/ & /g, " and ").replace(/s$/, "");
  const title = `${subject} Coloring Page – Free Printable ${categoryLabel} Coloring Sheet`;
  const description = `Print or download this free ${subject.toLowerCase()} coloring page. This printable ${categoryLabel.toLowerCase()} coloring sheet includes clean line art, a color reference, and simple coloring ideas.`;
  return { title, description, subject };
}

/** Adds useful, category-specific context without replacing the page's own editorial introduction. */
export function printableIntroduction(page: StandardColoringPage, category: StandardColoringCategory) {
  const subject = subjectName(page.title);
  if (category.slug === "flowers-plants") {
    return `This free printable ${subject.toLowerCase()} coloring sheet gives you petals, leaves, and natural shapes to color at your own pace. Print the line art for an A4 page, or download the PNG to keep on hand. The color reference is optional inspiration—try soft blends, bright garden colors, or a palette of your own.`;
  }
  if (category.slug === "animals") {
    return `This free printable ${subject.toLowerCase()} coloring sheet highlights its distinctive shapes and details for a relaxed coloring session. Print the line art at A4 size or download the PNG, then use the color reference as inspiration or make the animal entirely your own.`;
  }
  return `This free printable ${subject.toLowerCase()} coloring sheet focuses on its recognizable form and useful details. Print the clean line art at A4 size or download the PNG for later, then use the color reference as inspiration while you create your own version.`;
}

export function relatedStandardPages(page: StandardColoringPage, pages: StandardColoringPage[]) {
  const sameCategory = pages.filter((item) => item.categorySlug === page.categorySlug && item.slug !== page.slug);
  const preferred = (page.relatedSlugs ?? [])
    .map((slug) => sameCategory.find((item) => item.slug === slug))
    .filter((item): item is StandardColoringPage => Boolean(item));
  const remaining = sameCategory.filter((item) => !preferred.some((preferredItem) => preferredItem.slug === item.slug));
  return [...preferred, ...remaining].slice(0, 8);
}
