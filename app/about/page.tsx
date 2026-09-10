import Link from "next/link";
import { pageMetadata } from "../../lib/seo";
export const metadata = pageMetadata(
  "About MythColoring",
  "Learn how MythColoring brings legendary creatures to life through original artwork, free coloring pages, and stories.",
  "/about/",
);
export default function Page() {
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">About MythColoring</p>
        <h1>Where Legends Come to Life Through Color</h1>
        <p>Every creature has a story.</p>
      </header>
      <div className="prose">
        <h2>Every Creature Has a Story</h2>
        <p>
          For thousands of years, people have looked at mountains, forests,
          oceans, and skies and imagined beings beyond the ordinary world.
        </p>
        <p>
          Some creatures were recorded in ancient books. Others appeared in
          legends passed down through generations. Still others belong to the
          imaginative spaces where people wonder about forgotten civilizations,
          distant worlds, and mysteries beyond what we can see.
        </p>
        <p>
          Whether a legend began with an ancient text or a new idea, it often
          starts with the same question: <strong>What if it were real?</strong>
        </p>

        <h2>Our Belief</h2>
        <p>
          At MythColoring, we believe these creatures deserve to be remembered.
          A fierce mythical beast, a mysterious guardian, or a gentle companion
          from an old tale can each carry a piece of human imagination and culture.
        </p>
        <p>
          Some creatures may look frightening or strange, but every appearance
          can hold a story: a story about courage, kindness, or the unknown world
          around us.
        </p>

        <h2>Why We Create</h2>
        <p>
          MythColoring was created to help people discover legends through
          creativity. Our journey begins with the creatures of the Shan Hai Jing
          (Classic of Mountains and Seas), one of the world&apos;s oldest collections
          of mythical geography and creatures.
        </p>
        <p>
          Through coloring pages, illustrations, and creature archives, we hope
          to introduce these remarkable beings to children, families, and anyone
          who still enjoys wondering what mysteries might exist beyond imagination.
        </p>

        <h2>Our Original Creations</h2>
        <p>
          Every creature featured on MythColoring is thoughtfully reimagined
          through our own creative process. Many legendary beings come from
          ancient myths, historical texts, and stories shared across generations.
        </p>
        <p>
          Each illustration you see here is a new artistic interpretation created
          by MythColoring. We study the legends behind a creature when reliable
          sources are available, then redesign its appearance, details, and
          atmosphere for modern families and creative minds. When a creature is an
          original MythColoring creation, we say so clearly in its archive.
        </p>
        <p>
          From ancient beasts to mysterious guardians, every artwork is our way
          of bringing legends into a new world.
        </p>

        <h2>Our Promise</h2>
        <p>
          We do not want to tell you how a mythical creature must look. A coloring
          page is not only about following instructions. It is about imagination.
        </p>
        <p>
          The colors you choose, the worlds you create, and the stories you
          imagine become part of the legend too. Whether a creature is powerful,
          mysterious, or small and friendly, we hope every visitor finds something
          to love.
        </p>
        <p>
          Welcome to MythColoring. <strong>Color the legends. Discover the stories.</strong>
        </p>
        <Link className="button primary" href="/coloring-pages/">
          Browse Coloring Pages
        </Link>
      </div>
    </div>
  );
}
