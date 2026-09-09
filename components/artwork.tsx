export function Artwork({
  name,
  src,
  colored = false,
  alt,
  priority = false,
}: {
  name: string;
  src?: string | null;
  colored?: boolean;
  alt?: string;
  priority?: boolean;
}) {
  if (src)
    return (
      <img
        src={displayImageSrc(src)}
        alt={alt ?? name + (colored ? " coloring inspiration" : " free printable coloring page")}
        width={600}
        height={750}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    );
  return (
    <div className={"placeholder-art " + (colored ? "is-colored" : "")}>
      <svg
        viewBox="0 0 240 300"
        role="img"
        aria-label={
          name +
          ": " +
          (colored ? "color" : "line art") +
          " layout placeholder, not final artwork"
        }
      >
        <circle cx="120" cy="130" r="86" className="art-halo" />
        <g className="art-shape" strokeWidth="2" strokeLinejoin="round">
          <path d="M119 214C18 236 19 149 52 132C30 204 92 173 119 214Z" />
          <path d="M119 214C34 160 40 88 72 75C48 154 104 154 119 214Z" />
          <path d="M121 214C219 238 221 150 189 132C210 203 150 175 121 214Z" />
          <path d="M121 214C208 161 201 87 171 75C193 153 138 153 121 214Z" />
          <path d="M97 218Q82 172 106 151L91 100L116 117L143 101L134 149Q159 176 144 218Z" />
          <path
            d="M98 135L119 157L138 133M106 135L112 137M126 137L132 134"
            fill="none"
          />
        </g>
      </svg>
      <span className="placeholder-label">Illustrative placeholder</span>
    </div>
  );
}
import { displayImageSrc } from "../lib/display-image";
