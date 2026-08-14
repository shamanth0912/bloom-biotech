import Link from "next/link";
import type { Product } from "@/lib/products";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <Link href={`/products/${product.slug}`} className="ledger-card group flex flex-col p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {String(index + 1).padStart(2, "0")} · {product.category}
        </p>
        <span className="text-leaf transition-transform duration-500 group-hover:translate-x-1" style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
          →
        </span>
      </div>
      <h3 className="mt-3 font-serif text-[1.65rem] leading-tight text-forest">
        {product.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {product.short}
      </p>
      <p className="mt-4 font-mono text-[11px] text-moss">{product.crops.slice(0, 3).join(" · ")}</p>
    </Link>
  );
}
