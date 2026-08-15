"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { whatsappUrl } from "@/lib/site";

const scenes = [
  {
    id: "nursery",
    label: "Coffee nursery",
    kicker: "Trays & coco-peat",
    title: "Biology first. Then Trichoderma. Then roots.",
    body: "Wet Western Ghats nurseries fail from puddles and thin white roots more than from a missing foliar. AMC in the media, Bluderma against damping-off, Root Care at transplant if roots look weak.",
    caution: "Trichoderma cannot outrun a puddle. Air, timed water, clean media.",
    packs: [
      { name: "Arka Microbial Consortium", href: "/products/arka-microbial-consortium" },
      { name: "Bluderma (Trichoderma)", href: "/products/bluderma" },
      { name: "Root Care", href: "/products/root-care" },
    ],
    wa: "Hello Bloom Biotech, I need a coffee nursery pack quote. Seedling count:",
  },
  {
    id: "estate",
    label: "Coffee / estate",
    kicker: "Blocks, not crates",
    title: "Quote the block. Mix FYM. Do not buy a tonic.",
    body: "Estates around Chikkamagaluru run on litter, shade, and rain that can drown a root. Sanjiveeni and Bhu Samruddhi sit with manure in the field. AMC still belongs in the nursery and the FYM mix.",
    caution: "We quote by block and acres. No published price list.",
    packs: [
      { name: "Bio Sanjiveeni", href: "/products/bio-sanjiveeni" },
      { name: "Bhu Samruddhi", href: "/products/bhu-samruddhi" },
      { name: "AMC", href: "/products/arka-microbial-consortium" },
    ],
    wa: "Hello Bloom Biotech, estate / coffee block quote. Acres and taluk:",
  },
  {
    id: "veg",
    label: "Vegetables",
    kicker: "Seed to FYM",
    title: "One consortium instead of three bottles.",
    body: "IIHR’s AMC protocol is seed, coco-peat, drench, then FYM in the main field. Blumonas if you already run an intensive vegetable block and want Pseudomonas in the root zone.",
    caution: "Label dose on the pack in hand still wins.",
    packs: [
      { name: "AMC", href: "/products/arka-microbial-consortium" },
      { name: "Blumonas", href: "/products/blumonas" },
      { name: "Decomposer", href: "/products/decomposer" },
    ],
    wa: "Hello Bloom Biotech, vegetable programme quote. Crop and acres:",
  },
  {
    id: "dealer",
    label: "Dealer board",
    kicker: "Stock with a story",
    title: "Name the crop. Never a 40% yield claim.",
    body: "A good board stocks AMC, a Trichoderma, a field biofertilizer, and Root Care. Farmers remember the season, not the brochure. Send acres and solid vs liquid when you reorder.",
    caution: "We would rather lose a rushed order than a taluk’s trust.",
    packs: [
      { name: "Full catalogue", href: "/products" },
      { name: "How to quote", href: "/journal/how-dealers-should-quote-microbials" },
    ],
    wa: "Hello Bloom Biotech, dealer stock quote. I need solid/liquid and these SKUs:",
  },
] as const;

export function CropGuide() {
  const [id, setId] = useState<(typeof scenes)[number]["id"]>("nursery");
  const scene = scenes.find((s) => s.id === id) ?? scenes[0];

  return (
    <section className="border-y border-forest/10 bg-white/35">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          01 / Your ground
        </p>
        <h2 className="mt-2 max-w-xl font-serif text-3xl text-forest md:text-4xl">
          Tap the crop. Get a briefing, not a brochure.
        </h2>
        <p className="mt-3 max-w-lg text-sm text-muted">
          Four real desks we quote for. Pick one. We will not invent a price.
        </p>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
          {scenes.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setId(s.id)}
              aria-pressed={id === s.id}
              className={`path-chip shrink-0 ${id === s.id ? "is-on" : ""}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div key={scene.id} className="path-panel mt-6 grid gap-8 border border-forest/10 bg-paper p-5 sm:p-8 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-leaf">
              {scene.kicker}
            </p>
            <h3 className="mt-2 font-serif text-2xl text-forest sm:text-3xl">
              {scene.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted">{scene.body}</p>
            <p className="mt-4 border-l-2 border-leaf pl-3 text-sm text-forest">
              {scene.caution}
            </p>
          </div>
          <div className="flex flex-col justify-between gap-6">
            <ul className="space-y-2">
              {scene.packs.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="flex items-center justify-between border border-forest/10 bg-white/70 px-3 py-3 text-sm text-forest"
                  >
                    {p.name}
                    <span className="text-leaf">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button href={whatsappUrl(scene.wa)}>WhatsApp this brief</Button>
              <Button href="/enquire" variant="ghost">
                Written quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
