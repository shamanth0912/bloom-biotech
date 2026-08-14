import type { Metadata } from "next";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Products",
  description: "Biofertilizers, consortia, and biocontrols from Bloom Biotech.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-soil">Catalogue</p>
      <h1 className="mt-2 font-serif text-4xl text-forest">Products</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Names and uses are assembled from IndiaMART listings plus IIHR’s AMC
        protocol. Doses on the bottle win if they differ. Beauty-salon
        listings on IndiaMART are ignored.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
