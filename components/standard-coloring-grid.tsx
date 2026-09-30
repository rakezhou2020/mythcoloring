"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { StandardColoringPage } from "../data/types";

type Props = {
  items: StandardColoringPage[];
  limit?: number;
  randomize?: boolean;
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
export function StandardColoringGrid({ items, limit, randomize = false }: Props) {
  const [displayedItems, setDisplayedItems] = useState(() => selectItems(items, limit));

  useEffect(() => {
    setDisplayedItems(selectItems(items, limit, randomize));
  }, [items, limit, randomize]);

  return (
    <div className="standard-related-grid">
      {displayedItems.map((item) => (
        <Link className="standard-related-card" key={item.slug} href={`/coloring-pages/${item.categorySlug}/${item.slug}/`}>
          <div className="standard-card-art">
            <img src={item.lineArtImage} alt={item.imageAlt} width={600} height={750} />
            <img className="standard-card-color" src={item.colorImage} alt="" width={600} height={750} aria-hidden="true" />
            <span className="preview-hint" aria-hidden="true">View color artwork</span>
          </div>
          <span>{item.title}</span>
        </Link>
      ))}
    </div>
  );
}
