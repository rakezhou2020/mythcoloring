"use client";

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params: Record<string, string>) => void;
  }
}

/** Sends non-identifying interaction events only when GA4 is available. */
export function trackColoringEvent(name: "print_coloring_page" | "download_coloring_page" | "color_reference_view", page: { slug: string; category?: string; title: string }) {
  window.gtag?.("event", name, {
    content_type: "coloring_page",
    item_id: page.slug,
    item_name: page.title,
    ...(page.category ? { content_group: page.category } : {}),
  });
}
