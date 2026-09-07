"use client";
import { useRef, useState } from "react";
import type { ColoringPage } from "../data/types";
import { Artwork } from "./artwork";
export function ColoringGrid({ items }: { items: ColoringPage[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<ColoringPage | null>(null);
  const [ready, setReady] = useState(false);
  function open(item: ColoringPage) {
    setSelected(item);
    setReady(false);
    dialog.current?.showModal();
  }
  return (
    <>
      <div className="coloring-grid">
        {items.map((item) => (
          <article className="coloring-card" id={item.slug} key={item.id}>
            <button
              className="preview-button"
              onClick={() => open(item)}
              aria-label={"Preview " + item.title + " " + item.type}
            >
              <div className="art-layer">
                <Artwork name={item.title} src={item.lineArtImage} />
              </div>
              <div className="art-layer color-layer" aria-hidden="true">
                <Artwork name={item.title} src={item.colorImage} colored />
              </div>
            </button>
            <div className="card-body">
              <p className="eyebrow">{item.type}</p>
              <h3>{item.title}</h3>
              <p className="card-detail">
                {item.colorCount ? item.colorCount + " colors · " : ""}
                {item.difficulty}
              </p>
              <div className="card-actions">
                <button onClick={() => open(item)}>Print</button>
                {item.pdfUrl ? (
                  <a href={item.pdfUrl} download>
                    Download
                  </a>
                ) : (
                  <button
                    disabled
                    aria-label={item.title + " download unavailable"}
                  >
                    Download
                  </button>
                )}
              </div>
              {!item.pdfUrl && (
                <p className="availability">
                  Sample preview · printable coming soon
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="print-dialog"
        aria-label="Coloring page preview"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        {selected && (
          <>
            <div className="dialog-toolbar">
              <span>Coloring preview</span>
              <button autoFocus onClick={() => dialog.current?.close()}>
                Close ×
              </button>
            </div>
            <div className="print-sheet">
              <h2>{selected.title}</h2>
              {selected.printImage ? (
                <img
                  key={selected.printImage}
                  src={selected.printImage}
                  alt={selected.title + " printable coloring artwork"}
                  width={600}
                  height={750}
                  onLoad={() => setReady(true)}
                  onError={() => setReady(false)}
                />
              ) : (
                <Artwork name={selected.title} src={selected.lineArtImage} />
              )}
            </div>
            <div className="dialog-actions">
              <p>
                {selected.printImage
                  ? "Print your coloring page on plain paper."
                  : "This is a layout sample. Printable artwork is being prepared."}
              </p>
              <button
                className="button primary"
                disabled={!selected.printImage || !ready}
                onClick={() => window.print()}
              >
                Print this page
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
