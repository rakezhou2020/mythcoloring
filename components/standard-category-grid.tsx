"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { StandardColoringPage } from "../data/types";

const PAGE_SIZE = 60;

type Props = {
  items: StandardColoringPage[];
};

/** Category catalog grid with a fixed, device-independent page size. */
export function StandardCategoryGrid({ items }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const displayedItems = useMemo(() => {
    const firstItem = (currentPage - 1) * PAGE_SIZE;
    return items.slice(firstItem, firstItem + PAGE_SIZE);
  }, [currentPage, items]);

  return (
    <>
      <div className="standard-page-grid">
        {displayedItems.map((page) => (
          <Link className="standard-page-card" key={page.slug} href={`/coloring-pages/${page.categorySlug}/${page.slug}/`}>
            <div className="standard-card-art">
              <img src={page.lineArtImage} alt={page.imageAlt} width={600} height={750} />
              <img className="standard-card-color" src={page.colorImage} alt="" width={600} height={750} aria-hidden="true" />
              <span className="preview-hint" aria-hidden="true">View color artwork</span>
            </div>
            <span>{page.title}</span>
          </Link>
        ))}
      </div>
      {totalPages > 1 && (
        <nav className="catalog-pagination" aria-label="Coloring page pagination">
          <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span aria-live="polite">Page {currentPage} of {totalPages}</span>
          <button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages}>
            Next
          </button>
        </nav>
      )}
    </>
  );
}
