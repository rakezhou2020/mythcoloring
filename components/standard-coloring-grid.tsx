"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { StandardColoringPage } from "../data/types";
import { weeklyStableOrder } from "../lib/stable-order";

type Props = {
  items: StandardColoringPage[];
  limit?: number;
  randomize?: boolean;
  deferColors?: boolean;
};

function selectItems(items: StandardColoringPage[], limit?: number, randomize = false) {
  const result = [...items];
  if (randomize) {
    for (let index = result.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
  }
  return typeof limit === "number" ? result.slice(0, limit) : result;
}

/** Visual cards for ordinary coloring pages. Kept separate from the creature grid. */
export function StandardColoringGrid({ items, limit, randomize = false, deferColors = false }: Props) {
  const [displayedItems, setDisplayedItems] = useState(() => selectItems(items, limit));
  const [colorReady, setColorReady] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const ordered = randomize ? weeklyStableOrder(items) : items;
    setDisplayedItems(typeof limit === "number" ? ordered.slice(0, limit) : ordered);
  }, [items, limit, randomize]);

  return (
    <div className="standard-related-grid">
      {displayedItems.map((item) => (
        <Link className="standard-related-card" key={item.slug} href={`/coloring-pages/${item.categorySlug}/${item.slug}/`} onPointerEnter={() => deferColors && setColorReady((ready) => new Set(ready).add(item.slug))} onFocus={() => deferColors && setColorReady((ready) => new Set(ready).add(item.slug))}>
          <div className="standard-card-art">
            <img src={item.lineArtImage} alt={item.imageAlt} width={600} height={750} />
            {(!deferColors || colorReady.has(item.slug)) && <img className="standard-card-color" src={item.colorImage} alt="" width={600} height={750} aria-hidden="true" />}
            <span className="preview-hint" aria-hidden="true">View color artwork</span>
          </div>
          <span>{item.title}</span>
        </Link>
      ))}
    </div>
  );
}
