"use client";

import { useEffect, useState } from "react";
import { weeklyStableOrder } from "../lib/stable-order";

export type HeroRevealItem = { slug: string; title: string; lineArtImage: string; colorImage: string; imageAlt: string };

export function HomeHeroReveal({ items }: { items: HeroRevealItem[] }) {
  const [ordered, setOrdered] = useState(items);
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [loadedItems, setLoadedItems] = useState<Set<string>>(() => new Set());
  const [waitingForNext, setWaitingForNext] = useState(false);

  useEffect(() => {
    setOrdered(weeklyStableOrder(items));
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [items]);
  const current = ordered[index % ordered.length];
  const next = ordered[(index + 1) % ordered.length];

  useEffect(() => {
    const itemsToPrepare = [current, next].filter((item): item is HeroRevealItem => Boolean(item));
    let cancelled = false;

    itemsToPrepare.forEach((item) => {
      if (loadedItems.has(item.slug)) return;
      Promise.all([preloadImage(item.lineArtImage), preloadImage(item.colorImage)]).then(() => {
        if (!cancelled) {
          setLoadedItems((ready) => new Set(ready).add(item.slug));
        }
      });
    });

    return () => { cancelled = true; };
  }, [current, next, loadedItems]);

  useEffect(() => {
    if (waitingForNext && next && loadedItems.has(next.slug)) {
      setIndex((value) => (value + 1) % ordered.length);
      setWaitingForNext(false);
    }
  }, [loadedItems, next, ordered.length, waitingForNext]);

  if (!current) return null;
  const currentIsLoaded = loadedItems.has(current.slug);

  const moveToNext = () => {
    if (!next || reduced || ordered.length < 2) return;
    if (loadedItems.has(next.slug)) {
      setIndex((value) => (value + 1) % ordered.length);
    } else {
      // Keep the completed color image on screen until the next pair is cached.
      setWaitingForNext(true);
    }
  };

  return <div className="hero-reveal" aria-label={`${current.title} line art and color reveal`}>
    <RevealSlide key={current.slug} item={current} active ready={currentIsLoaded} reduced={reduced} onComplete={moveToNext} />
    <p>{current.title}</p>
  </div>;
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
    if (image.complete) resolve();
  });
}

function RevealSlide({ item, active = false, ready = false, reduced = false, onComplete }: {
  item: HeroRevealItem;
  active?: boolean;
  ready?: boolean;
  reduced?: boolean;
  onComplete?: () => void;
}) {
  const className = ["hero-reveal-slide", active && "is-active", ready && "is-ready", reduced && "is-reduced"]
    .filter(Boolean)
    .join(" ");
  return <figure className={className}>
    <img src={item.lineArtImage} alt={active ? item.imageAlt : ""} width={600} height={750} loading="eager" fetchPriority={active ? "high" : "auto"} />
    <img className="hero-reveal-color" src={item.colorImage} alt="" width={600} height={750} loading="eager" aria-hidden="true" onAnimationEnd={ready && !reduced ? onComplete : undefined} />
  </figure>;
}
