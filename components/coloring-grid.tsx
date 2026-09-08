"use client";
import { useRef, useState } from "react";
import type { ColoringPage } from "../data/types";
import { Artwork } from "./artwork";
import { ZoomArtwork } from "./zoom-artwork";
export function ColoringGrid({ items }: { items: ColoringPage[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<ColoringPage | null>(null);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<"lineArtImage" | "colorGuideImage" | "finishedImage">("lineArtImage");
  const [expanded, setExpanded] = useState(false);
  const viewLabels = {
    lineArtImage: "Line Art",
    colorGuideImage: "Color",
    finishedImage: "Poster",
  } as const;
  function open(item: ColoringPage, printing = false) {
    setSelected(item);
    setReady(false);
    setView(!printing && item.colorGuideImage ? "colorGuideImage" : "lineArtImage");
    setExpanded(false);
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
                <Artwork name={item.title} src={item.colorGuideImage ?? item.finishedImage} colored />
              </div>
              <span className="preview-hint" aria-hidden="true">View color artwork</span>
            </button>
            <div className="card-body">
              <p className="eyebrow">{item.type}</p>
              <h3>{item.title}</h3>
              <p className="card-detail">
                {item.colorCount ? item.colorCount + " colors · " : ""}
                {item.difficulty}
              </p>
              <div className="card-actions">
                <button onClick={() => open(item, true)}>Print</button>
                {item.printPdf ? (
                  <a href={item.printPdf} download>
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
              {!item.printPdf && (
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
        className={"print-dialog" + (expanded ? " artwork-fullscreen" : "")}
        aria-label="Coloring page preview"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        {selected && (
          <>
            {selected.lineArtImage && (
              <img
                className="print-preload"
                src={selected.lineArtImage}
                alt=""
                aria-hidden="true"
                onLoad={() => setReady(true)}
                onError={() => setReady(false)}
              />
            )}
            <div className="dialog-toolbar">
              <span>{viewLabels[view]}</span>
              {expanded && <button onClick={() => setExpanded(false)}>Exit full screen</button>}
              <button autoFocus onClick={() => dialog.current?.close()} aria-label="Close preview">
                ×
              </button>
            </div>
            {selected.colorGuideImage && selected.finishedImage && (
              <div className="artwork-views screen-only" aria-label="Artwork views">
                {([["lineArtImage", "Line Art"], ["colorGuideImage", "Color"], ["finishedImage", "Poster"]] as const).map(([key, label]) =>
                  <button key={key} aria-pressed={view === key} onClick={() => setView(key)}>{label}</button>)}
              </div>
            )}
            <div className="screen-sheet screen-only">
              {selected[view] ? <ZoomArtwork key={view + String(expanded)} src={selected[view]!}
                alt={selected.title + " " + view.replace("Image", "")} expanded={expanded}
                onExpand={() => setExpanded(true)} /> : <Artwork name={selected.title} src={selected.lineArtImage} />}
              {view === "finishedImage" && selected.amazonPosterUrl && (
                <a className="button poster-link" href={selected.amazonPosterUrl} target="_blank" rel="noreferrer">
                  Get This Artwork as a Poster
                </a>
              )}
            </div>
            <div className="print-sheet print-only">
              <h2>{selected.title}</h2>
              {selected.lineArtImage ? (
                <img
                  key={selected.id}
                  src={selected.lineArtImage}
                  alt={selected.title + " printable coloring artwork"}
                  width={600}
                  height={750}
                  onLoad={() => setReady(true)}
                  onError={() => setReady(false)}
                />
              ) : (
                <Artwork name={selected.title} src={selected.lineArtImage} />
              )}
              <p className="print-brand">Myth Coloring · mythcoloring.com</p>
            </div>
            <div className="dialog-actions">
              <p>
                {selected.lineArtImage
                  ? "Printing always uses the clean black-and-white Line Art."
                  : "This is a layout sample. Printable artwork is being prepared."}
              </p>
              <button
                className="button primary"
                disabled={!selected.lineArtImage || !ready}
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
