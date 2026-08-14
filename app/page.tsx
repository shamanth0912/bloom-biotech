import Link from "next/link";
import { products } from "@/lib/products";
import { articles } from "@/lib/articles";
import { ProductCard } from "@/components/ProductCard";
import { Logo } from "@/components/Logo";
import { site, whatsappUrl } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-forest/10">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(1200px 500px at 80% -10%, #c5d48a, transparent), linear-gradient(180deg, #e7e0cf, #f3efe4)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-end gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="mb-6 h-16">
              <Logo priority />
            </div>
            <p className="text-xs uppercase tracking-[0.28em] text-soil">
              Chikkamagaluru · Karnataka
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.12] text-forest sm:text-5xl md:text-6xl">
              Microbes for soil that still has to work next season.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Bloom Biotech makes and supplies biofertilizers and biocontrols
              from the coffee belt. We are a licensed producer of ICAR-IIHR
              Arka Microbial Consortium — the all-in-one inoculant research
              stations already know by name.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/enquire"
                className="rounded-full bg-leaf px-6 py-3 text-white"
              >
                Request a quote
              </Link>
              <Link
                href="/products"
                className="rounded-full border border-forest/25 px-6 py-3 text-forest"
              >
                Browse products
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["ICAR-IIHR", "Licensed AMC solid & liquid"],
              [site.googleRating, `${site.googleReviews} Google reviews`],
              ["Farmers", "Dealers · Estates · KVKs"],
              ["Plant", "Hampapura Bypass Road"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-2xl border border-forest/10 bg-white/60 p-5"
              >
                <p className="font-serif text-2xl text-forest">{k}</p>
                <p className="mt-1 text-sm text-muted">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-soil">
              Catalogue
            </p>
            <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">
              What we put in the ground
            </h2>
          </div>
          <Link href="/products" className="text-sm text-leaf hover:underline">
            All products
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-forest text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">
              First in line for IIHR microbial technology — not a generic
              bacteria bottle.
            </h2>
            <p className="mt-4 leading-relaxed text-cream/80">
              Public licence records list Bloom Biotech (Suhas Mohan,
              Chikkamagaluru) for Arka Microbial Consortium. The plant sits on
              Hampapura Bypass Road. Instagram{" "}
              <a className="underline decoration-lime/50" href={site.instagram}>
                @bloom_biotech
              </a>{" "}
              shows nursery trays, field work, and water-soluble nutrition
              brands estates already use beside biology.
            </p>
          </div>
          <ul className="space-y-4 text-sm leading-relaxed text-cream/85">
            <li>
              <strong className="text-lime">Farmers</strong> — seed treatment,
              drench, FYM mix. Clear doses, no 40% yield fairy tales.
            </li>
            <li>
              <strong className="text-lime">Dealers</strong> — packs with names
              farmers recognise: Sanjiveeni, Bhu Samruddhi, Bluderma, Root
              Care.
            </li>
            <li>
              <strong className="text-lime">Estates</strong> — block-wise
              programmes for coffee and horticulture, not a mixed crate.
            </li>
            <li>
              <strong className="text-lime">Institutions</strong> — KVK and
              research partners who need licence-backed AMC, not a white-label
              mystery.
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl text-forest">From the journal</h2>
          <Link href="/journal" className="text-sm text-leaf hover:underline">
            All articles
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {articles.slice(0, 2).map((a) => (
            <Link
              key={a.slug}
              href={`/journal/${a.slug}`}
              className="rounded-2xl border border-forest/10 bg-white/50 p-6 hover:border-leaf/40"
            >
              <p className="text-xs text-soil">{a.date}</p>
              <h3 className="mt-2 font-serif text-2xl text-forest">{a.title}</h3>
              <p className="mt-2 text-sm text-muted">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-forest/10 bg-cream-2/50 px-4 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-3xl text-forest">
              Need a pack list this week?
            </h2>
            <p className="mt-2 text-muted">
              {site.phoneDisplay} · {site.hours} · Plant at Joythinagar
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href={whatsappUrl()}
              className="rounded-full bg-leaf px-5 py-2.5 text-white"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp the plant
            </a>
            <Link
              href="/enquire"
              className="rounded-full border border-forest/30 px-5 py-2.5"
            >
              Written quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
