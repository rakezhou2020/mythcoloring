const creatures = [
  { name: "Taotie", local: "饕餮", type: "Ancient Beast", tone: "ember" },
  { name: "Qiongqi", local: "穷奇", type: "Mythical Beast", tone: "ink" },
  { name: "Bifang", local: "毕方", type: "Sacred Bird", tone: "jade" },
  { name: "Lushu", local: "鹿蜀", type: "Mountain Beast", tone: "sand" },
  { name: "Yingzhao", local: "英招", type: "Divine Creature", tone: "night" },
  { name: "Xuangui", local: "旋龟", type: "Water Creature", tone: "water" },
];

const coloringPages = [
  { name: "Qiongqi", detail: "16 colors · Medium", kind: "Color by Number", mark: "01" },
  { name: "Nine-Tailed Fox", detail: "12 colors · Medium", kind: "Color by Number", mark: "02" },
  { name: "Bifang", detail: "Classic line art", kind: "Coloring Page", mark: "03" },
  { name: "Lushu", detail: "14 colors · Detailed", kind: "Color by Number", mark: "04" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Myth Coloring home">
          <span className="brand-mark">MC</span>
          <span>Myth Coloring</span>
        </a>
        <nav className="nav" aria-label="Primary navigation">
          <a href="#explore">Explore</a>
          <a href="#coloring">Coloring Pages</a>
          <a href="#shan-hai-jing">Collections</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">MYTHS, MONSTERS & LEGENDARY CREATURES</p>
          <h1>Free Mythical Creature Coloring Pages</h1>
          <p className="hero-lead">
            Discover legendary creatures from ancient cultures around the world —
            then bring them to life with free printable coloring pages and
            color-by-number art.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#coloring">Browse Coloring Pages</a>
            <a className="button button-secondary" href="#explore">Explore Creatures</a>
          </div>
          <div className="hero-note">
            <span>Free to print</span>
            <span>No signup</span>
            <span>Stories included</span>
          </div>
        </div>

        <div className="hero-art" aria-label="Mythical creature archive preview">
          <div className="moon" />
          <div className="hero-frame">
            <div className="frame-top">
              <span>CREATURE FILE</span>
              <span>CN · 001</span>
            </div>
            <div className="creature-symbol">饕</div>
            <div className="frame-bottom">
              <strong>Taotie</strong>
              <span>Shan Hai Jing · Ancient China</span>
            </div>
          </div>
          <div className="orbit orbit-one">山</div>
          <div className="orbit orbit-two">海</div>
          <div className="orbit orbit-three">異</div>
        </div>
      </section>

      <section className="world-strip" aria-label="Current featured world">
        <span>NOW EXPLORING</span>
        <strong>Ancient China</strong>
        <span>Shan Hai Jing</span>
        <span>Mythical Beasts</span>
      </section>

      <section className="section collection" id="shan-hai-jing">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">FEATURED COLLECTION</p>
            <h2>Enter the Shan Hai Jing</h2>
          </div>
          <p>
            A strange bestiary of mountains, seas, gods and creatures from one of
            ancient China&apos;s most fascinating texts.
          </p>
        </div>

        <div className="collection-card">
          <div className="collection-map">
            <span className="map-character map-a">山</span>
            <span className="map-character map-b">海</span>
            <span className="map-character map-c">經</span>
            <div className="mountain mountain-a" />
            <div className="mountain mountain-b" />
            <div className="sun" />
          </div>
          <div className="collection-copy">
            <span className="archive-label">COLLECTION 01</span>
            <h3>Creatures of the Shan Hai Jing</h3>
            <p>
              Meet fierce beasts, sacred birds, strange hybrids and forgotten
              spirits — each with its own story and free coloring art.
            </p>
            <a href="#explore" className="text-link">Explore the bestiary <span>→</span></a>
          </div>
        </div>
      </section>

      <section className="section" id="explore">
        <div className="section-heading">
          <p className="eyebrow">THE ARCHIVE</p>
          <h2>Featured Creatures</h2>
          <p className="section-intro">
            Every creature has a file: origin, source, appearance, legend and
            related coloring pages.
          </p>
        </div>

        <div className="creature-grid">
          {creatures.map((creature, index) => (
            <article className="creature-card" key={creature.name}>
              <div className={`creature-visual tone-${creature.tone}`}>
                <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="local-name">{creature.local}</span>
                <div className="visual-ring" />
              </div>
              <div className="creature-meta">
                <div>
                  <h3>{creature.name}</h3>
                  <p>{creature.type}</p>
                </div>
                <span className="region-tag">China</span>
              </div>
              <a className="card-link" href="#about" aria-label={`Learn about ${creature.name}`}>
                View creature file <span>↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section coloring-section" id="coloring">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">FREE TO PRINT</p>
            <h2>Color the creatures</h2>
          </div>
          <p>
            Choose a classic coloring page or follow a numbered palette. Print it,
            download it, or learn the story behind the creature.
          </p>
        </div>

        <div className="coloring-grid">
          {coloringPages.map((page) => (
            <article className="coloring-card" key={page.name}>
              <div className="coloring-preview">
                <span className="preview-mark">{page.mark}</span>
                <div className="line-art">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="palette-dots">
                  <i /><i /><i /><i />
                </div>
              </div>
              <div className="coloring-card-body">
                <span className="archive-label">{page.kind}</span>
                <h3>{page.name}</h3>
                <p>{page.detail}</p>
                <div className="coloring-actions">
                  <button type="button">Print</button>
                  <button type="button">Download</button>
                </div>
                <a href="#about" className="learn-link">Learn about this creature →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section story-section" id="about">
        <div className="story-card">
          <div className="story-symbol">✦</div>
          <div>
            <p className="eyebrow">MORE THAN A PRINTABLE</p>
            <h2>Every creature has a story.</h2>
            <p>
              Myth Coloring is building a visual archive of legendary creatures
              from cultures around the world. We begin with the Shan Hai Jing of
              ancient China, with more mythologies to follow.
            </p>
          </div>
          <a className="button button-secondary" href="#explore">Explore the Archive</a>
        </div>
      </section>

      <footer className="footer">
        <div className="brand footer-brand">
          <span className="brand-mark">MC</span>
          <span>Myth Coloring</span>
        </div>
        <p>Myths to discover. Creatures to color.</p>
        <p className="copyright">© 2026 Myth Coloring</p>
      </footer>
    </main>
  );
}
