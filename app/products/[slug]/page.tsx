import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { EnquiryForm } from "@/components/EnquiryForm";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr]">
      <article>
        <Link href="/products" className="nav-link text-sm">
          ← Catalogue
        </Link>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {product.category}
        </p>
        <h1 className="mt-2 font-serif text-4xl text-forest">{product.name}</h1>
        <p className="mt-4 text-lg text-muted">{product.short}</p>
        <dl className="mt-8 grid gap-px bg-forest/10 sm:grid-cols-2">
          <div className="bg-paper p-4">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">Crops</dt>
            <dd className="mt-1">{product.crops.join(" · ")}</dd>
          </div>
          <div className="bg-paper p-4">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">Use</dt>
            <dd className="mt-1">{product.use}</dd>
          </div>
          <div className="bg-paper p-4 sm:col-span-2">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">Pack</dt>
            <dd className="mt-1">{product.pack}</dd>
          </div>
        </dl>
        <div className="mt-8 space-y-4 leading-relaxed text-muted">
          {product.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </article>
      <aside className="h-fit border border-forest/10 bg-white/50 p-6">
        <h2 className="font-serif text-2xl text-forest">Ask for this pack</h2>
        <p className="mt-2 mb-6 text-sm text-muted">
          Dealers and estates: include acres and whether you need solid or
          liquid.
        </p>
        <EnquiryForm presetProduct={product.name} />
      </aside>
    </div>
  );
}
