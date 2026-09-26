"use client";

import { useState } from "react";
import type { StandardColoringPage } from "../data/types";

export function StandardColoringPage({ page }: { page: StandardColoringPage }) {
  const [view, setView] = useState<"line" | "color">("line");
  const image = view === "line" ? page.lineArtImage : page.colorImage;

  async function printCurrentImage() {
    // Open synchronously from the click so browsers do not block the window,
    // then print a local document once the original PNG bytes have loaded.
    const popup = window.open("", "_blank");
    if (!popup) return;
    popup.opener = null;
    popup.document.write(`<!doctype html><html><head><title>${page.title}</title><style>
      @page { margin: 12mm; }
      body { margin: 0; display: grid; place-items: center; background: #fff; }
      img { display: block; max-width: 100%; max-height: 260mm; object-fit: contain; }
    </style></head><body></body></html>`);
    popup.document.close();

    try {
      const response = await fetch(image);
      if (!response.ok) throw new Error("Unable to load the printable image.");
      const objectUrl = URL.createObjectURL(await response.blob());
      const printableImage = popup.document.createElement("img");
      printableImage.alt = page.imageAlt;
      printableImage.onload = () => {
        popup.focus();
        popup.print();
      };
      popup.addEventListener("afterprint", () => {
        URL.revokeObjectURL(objectUrl);
        popup.close();
      }, { once: true });
      printableImage.src = objectUrl;
      popup.document.body.appendChild(printableImage);
    } catch {
      popup.close();
    }
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
