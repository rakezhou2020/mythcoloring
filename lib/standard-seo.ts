import type { StandardColoringCategory, StandardColoringPage } from "../data/types";
import { halloweenPrintableIntroduction, halloweenThemeForSlug } from "./halloween";

function subjectName(title: string) {
  return title.replace(/ Coloring Page$/, "");
}

export function standardPageSeo(page: StandardColoringPage, category: StandardColoringCategory) {
  const subject = subjectName(page.title);
  if (category.slug === "halloween") {
    const title = subject === "Haunted House"
      ? "Haunted House Coloring Page – Printable Halloween Page"
      : `${subject} Halloween Coloring Page – Free Printable`;
    const theme = halloweenThemeForSlug(page.slug);
    const description = `Print or download this free ${subject.toLowerCase()} Halloween coloring page with clean line art, a color reference, and ${theme ? theme.title.toLowerCase() : "spooky-season"} inspiration.`;
    return { title, description, subject };
  }
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
  if (category.slug === "halloween") {
    // Kept in a small seasonal helper so each real Halloween subject gets tailored copy.
    return halloweenPrintableIntroduction(page);
  }
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
  if (page.categorySlug === "halloween") {
    const theme = halloweenThemeForSlug(page.slug);
    const sameTheme = sameCategory.filter((item) => halloweenThemeForSlug(item.slug)?.title === theme?.title);
    const remaining = sameCategory.filter((item) => !sameTheme.some((preferred) => preferred.slug === item.slug));
    return [...sameTheme, ...remaining].slice(0, 8);
  }
  const preferred = (page.relatedSlugs ?? [])
    .map((slug) => sameCategory.find((item) => item.slug === slug))
    .filter((item): item is StandardColoringPage => Boolean(item));
  const remaining = sameCategory.filter((item) => !preferred.some((preferredItem) => preferredItem.slug === item.slug));
  return [...preferred, ...remaining].slice(0, 8);
}
