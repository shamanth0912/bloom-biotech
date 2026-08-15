import type { Metadata } from "next";
import Image from "next/image";
import { gallery } from "@/lib/gallery";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Photos",
  description: "Plant, nursery, and field imagery for Bloom Biotech.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-soil">Photos</p>
      <h1 className="mt-2 font-serif text-4xl text-forest">Gallery</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Instagram login walls block a live scrape. These stock frames stand in
        for the real plant, nursery, and coffee landscapes until you drop in
        originals from{" "}
        <a className="text-leaf underline" href={site.instagram}>
          @bloom_biotech
        </a>{" "}
        and the Google listing.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {gallery.map((item) => (
          <figure
            key={item.src}
            className="photo-frame overflow-hidden rounded-2xl border border-forest/10 bg-white"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover photo-zoom"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
            <figcaption className="p-4 text-sm text-muted">
              {item.caption}{" "}
              <span className="text-xs text-soil">({item.credit})</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
