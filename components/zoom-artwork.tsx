"use client";
import { useRef, useState, type PointerEvent } from "react";
import { displayImageSrc } from "../lib/display-image";

type Point = { x: number; y: number };
export function ZoomArtwork({ src, alt, expanded, onExpand }: {
  src: string; alt: string; expanded: boolean; onExpand: () => void;
}) {
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const pointers = useRef(new Map<number, Point>());
  const viewport = useRef<HTMLDivElement>(null);
  function zoom(factor: number) {
    setTransform((t) => {
      const scale = Math.max(1, Math.min(6, t.scale * factor));
      return scale === 1 ? { scale, x: 0, y: 0 } : { ...t, scale };
    });
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId)) return;
    const before = [...pointers.current.values()];
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const after = [...pointers.current.values()];
    const center = (points: Point[]) => ({
      x: points.reduce((s, p) => s + p.x, 0) / points.length,
      y: points.reduce((s, p) => s + p.y, 0) / points.length,
    });
    const prev = center(before), next = center(after);
    const distance = (points: Point[]) => points.length === 2
      ? Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y) : 0;
    const ratio = before.length === 2 && distance(before) > 0 ? distance(after) / distance(before) : 1;
    const box = viewport.current!.getBoundingClientRect();
    setTransform((t) => {
      const scale = Math.max(1, Math.min(6, t.scale * ratio));
      if (scale === 1) return { scale, x: 0, y: 0 };
      const r = scale / t.scale;
      const anchor = { x: prev.x - box.left - box.width / 2, y: prev.y - box.top - box.height / 2 };
      const limitX = box.width * (scale - 1) / 2;
      const limitY = box.height * (scale - 1) / 2;
      return { scale,
        x: Math.max(-limitX, Math.min(limitX, anchor.x + (t.x - anchor.x) * r + next.x - prev.x)),
        y: Math.max(-limitY, Math.min(limitY, anchor.y + (t.y - anchor.y) * r + next.y - prev.y)) };
    });
  }
  const displaySrc = displayImageSrc(src);
  if (!expanded) return <button className="enlarge-artwork" onClick={onExpand} aria-label="Enlarge artwork">
    <img src={displaySrc} alt={alt} width={2100} height={2970} />
    <span>Tap to enlarge</span>
  </button>;
  return <div className="zoom-artwork">
    <div className="zoom-controls" aria-label="Image zoom controls">
      <button onClick={() => zoom(1 / 1.4)} aria-label="Zoom out">−</button>
      <span aria-live="polite">{Math.round(transform.scale * 100)}%</span>
      <button onClick={() => zoom(1.4)} aria-label="Zoom in">+</button>
      <button onClick={() => setTransform({ scale: 1, x: 0, y: 0 })}>Reset</button>
    </div>
    <div ref={viewport} className="zoom-viewport" aria-label="Artwork; pinch to zoom and drag to pan"
      onPointerDown={(event) => {
        if (pointers.current.size >= 2 || event.button !== 0) return;
        pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={move}
      onPointerUp={(event) => pointers.current.delete(event.pointerId)}
      onPointerCancel={(event) => pointers.current.delete(event.pointerId)}
      onLostPointerCapture={(event) => pointers.current.delete(event.pointerId)}>
      <img src={displaySrc} alt={alt} draggable={false} width={2100} height={2970}
        style={{ transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})` }} />
    </div>
  </div>;
}
