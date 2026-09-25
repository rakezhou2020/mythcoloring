"use client";

import { useState } from "react";
import type { StandardColoringPage } from "../data/types";

export function StandardColoringPage({ page }: { page: StandardColoringPage }) {
  const [view, setView] = useState<"line" | "color">("line");
  const image = view === "line" ? page.lineArtImage : page.colorImage;

  function printCurrentImage() {
    const popup = window.open(image, "_blank");
    if (!popup) return;
    popup.opener = null;
    popup.addEventListener("load", () => popup.print(), { once: true });
  }

  async function downloadCurrentImage() {
    const response = await fetch(image);
    if (!response.ok) return;
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `${page.slug}-${view === "line" ? "line-art" : "color"}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
  }

  return (
    <section className="standard-page-art" aria-label={page.title + " artwork"}>
      <div className="artwork-views" role="tablist" aria-label="Artwork view">
        <button role="tab" aria-selected={view === "line"} onClick={() => setView("line")}>Line Art</button>
        <button role="tab" aria-selected={view === "color"} onClick={() => setView("color")}>Color</button>
      </div>
      <img className="standard-artwork" src={image} alt={page.imageAlt} width={1200} height={1500} />
      <div className="standard-actions">
        <button className="button primary" onClick={printCurrentImage}>Print Coloring Page</button>
        <button className="button" onClick={downloadCurrentImage}>Download PNG</button>
      </div>
    </section>
  );
}
