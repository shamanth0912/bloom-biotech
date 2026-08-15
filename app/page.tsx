import Link from "next/link";
import { products } from "@/lib/products";
import { articles } from "@/lib/articles";
import { ProductCard } from "@/components/ProductCard";
import { Photo } from "@/components/Photo";
import { Button } from "@/components/Button";
import { AudienceBoard } from "@/components/AudienceBoard";
import { CropGuide } from "@/components/CropGuide";
import { AmcRoutes } from "@/components/AmcRoutes";
import { StatsStrip } from "@/components/StatsStrip";
import { site, whatsappUrl } from "@/lib/site";
import { heroPhoto } from "@/lib/gallery";

const ticker = [
  "Arka Microbial Consortium",
  "Coffee nursery packs",
  "Trichoderma · Bluderma",
  "Bio Sanjiveeni",
  "Root Care",
  "Estate programmes",
  "Dealer quotes",
  "ICAR-IIHR licensed",
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-[1.05fr_0.95fr] md:py-16">
          <div className="reveal">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
              Chikkamagaluru · Karnataka · Plant
            </p>
            <h1 className="mt-5 max-w-xl font-serif text-[2rem] leading-[1.1] text-forest sm:text-5xl md:text-[3.4rem]">
              Microbes for soil that still has to work next season.
            </h1>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted">
              Licensed ICAR-IIHR Arka Microbial Consortium from the coffee belt,
              not a generic bacteria bottle, not a city trading desk.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/enquire">Request a quote</Button>
              <Button href="/products" variant="ghost">
                Open catalogue
              </Button>
            </div>
          </div>
          <div className="reveal" style={{ animationDelay: "120ms" }}>
            <Photo
              src={heroPhoto.src}
              alt={heroPhoto.alt}
              caption={`${heroPhoto.kicker} — ${heroPhoto.caption}`}
              priority
              sizes="(min-width: 768px) 42vw, 100vw"
              ratio="aspect-[4/5] sm:aspect-[5/6] md:aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <StatsStrip />

      <CropGuide />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              02 / Catalogue
            </p>
            <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">
              What we put in the ground
            </h2>
          </div>
          <Link href="/products" className="nav-link text-sm">
            All products
          </Link>
        </div>
        <div className="mt-8 grid gap-px bg-forest/10 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((p, i) => (
            <div key={p.slug} className="bg-paper">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      <AmcRoutes />

      <AudienceBoard />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-3xl text-forest">From the journal</h2>
          <Link href="/journal" className="nav-link text-sm">
            All articles
          </Link>
        </div>
        <div className="mt-8 divide-y divide-forest/10 border-y border-forest/10">
          {articles.slice(0, 3).map((a) => (
            <Link
              key={a.slug}
              href={`/journal/${a.slug}`}
              className="group grid gap-2 py-6 md:grid-cols-[8rem_1fr]"
            >
              <p className="font-mono text-[11px] text-muted">{a.date}</p>
              <div>
                <h3 className="font-serif text-2xl text-forest group-hover:text-moss">
                  {a.title}
                </h3>
                <p className="mt-1 max-w-xl text-sm text-muted">{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-forest/10 px-4 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-3xl text-forest">
              Need a pack list this week?
            </h2>
            <p className="mt-2 font-mono text-[12px] text-muted">
              {site.phoneDisplay} · {site.hours} · Joythinagar
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={whatsappUrl()}>WhatsApp the plant</Button>
            <Button href="/enquire" variant="ghost">
              Written quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
