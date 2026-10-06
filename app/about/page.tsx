import Link from "next/link";
import { pageMetadata } from "../../lib/seo";
export const metadata = pageMetadata(
  "About MythColoring | Printable Coloring Pages & Creative Discovery",
  "Learn about MythColoring, a growing collection of printable coloring pages featuring flowers, animals, everyday subjects, mythical creatures, folklore, and more.",
  "/about/",
);
export default function Page() {
  return (
    <div className="wrap page-content">
      <header className="page-heading">
        <p className="eyebrow">About MythColoring</p>
        <h1>A World of Coloring, Stories, and Imagination</h1>
        <p>Coloring can be simple, relaxing, creative, and sometimes even a way to discover something new.</p>
      </header>
      <div className="prose">
        <p>At MythColoring, we create and collect printable coloring pages for anyone who enjoys creativity, learning, and relaxing with color — from flowers and animals to everyday objects, legendary creatures, and imaginative worlds.</p>
        <p>Some visitors come here to find a quick page to print. Others enjoy discovering the stories behind unusual creatures and ancient legends.</p>
        <p>Both are welcome here.</p>

        <h2>What Is MythColoring?</h2>
        <p>MythColoring is a growing library of printable coloring pages designed for creativity, relaxation, learning, and fun.</p>
        <p>Our collection includes a wide range of subjects, such as:</p>
        <ul><li>Flowers and plants</li><li>Animals</li><li>Everyday objects</li><li>Nature</li><li>Vehicles</li><li>Mythical creatures</li><li>Legendary beings and folklore</li></ul>
        <p>We continue to expand the collection over time, adding new subjects and improving existing pages.</p>
        <p>Our goal is simple:</p>
        <p><strong>Make it easy to find a coloring page you enjoy, print it, and start creating.</strong></p>

        <h2>More Than Just Coloring Pages</h2>
        <p>Some subjects are more than an image.</p>
        <p>A flower may have a distinctive shape worth observing. An animal may introduce someone to a species they have never seen before. A mythical creature may come from a story told hundreds or even thousands of years ago.</p>
        <p>For selected pages, especially legendary creatures, we also provide background information, stories, and references to help visitors understand where the subject comes from.</p>
        <p>Coloring can be the starting point for curiosity.</p>

        <h2>Printable and Easy to Use</h2>
        <p>Our coloring pages are designed with printing in mind.</p>
        <p>Many pages use clean line art and a simple white background so they are easy to print at home, in classrooms, or for creative activities.</p>
        <p>Visitors can browse a page, view a color reference when available, print the line artwork, or download the printable image.</p>
        <p>We aim to keep the experience straightforward and accessible.</p>

        <h2>How We Prepare Our Coloring Pages</h2>
        <p>Our collection is carefully prepared for printing, coloring, and creative use. We focus on clear line art, useful subject information, and a simple experience for browsing, printing, and downloading.</p>
        <p>Some subjects are inspired by nature and everyday life, while others come from mythology, folklore, history, and imagination. When background information is available, we use reliable references to help explain the subject and its story.</p>

        <h2>Creativity Comes First</h2>
        <p>There is no single correct way to color a page.</p>
        <p>A flower does not always have to match its natural color. A dragon does not have to look the way someone else imagined it. A simple object can become something completely different through color.</p>
        <p>You can follow the reference image, ignore it, or invent your own version.</p>
        <p>That freedom is part of the fun.</p>

        <h2>Keep Exploring</h2>
        <p>MythColoring is a growing collection, and new coloring pages and subjects are added over time.</p>
        <p>You might arrive looking for a flower, an animal, a familiar object, or a legendary creature you have never heard of before.</p>
        <p>Wherever you begin, we hope you find something that makes you want to pick up a color and create.</p>
        <p><strong>Color. Create. Explore.</strong></p>
        <Link className="button primary" href="/coloring-pages/">
          Explore Coloring Pages
        </Link>
        <Link className="button" href="/creatures/">
          Discover Mythical Creatures
        </Link>
      </div>
    </div>
  );
}
