import Link from "next/link";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col rounded-2xl border border-forest/10 bg-white/70 p-5 transition hover:-translate-y-0.5 hover:border-leaf/40 hover:shadow-sm"
    >
      <p className="text-xs uppercase tracking-[0.18em] text-soil">
        {product.category}
      </p>
      <h3 className="mt-2 font-serif text-2xl text-forest group-hover:text-leaf">
        {product.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {product.short}
      </p>
      <p className="mt-4 text-sm text-leaf">View details →</p>
    </Link>
  );
}
