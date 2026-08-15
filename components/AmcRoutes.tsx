"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const routes = [
  {
    id: "seed",
    step: "01",
    name: "Seed",
    dose: "10-20 g AMC for 100-200 g vegetable seed",
    why: "Coat the seed so the consortium is on the plant from day one. Farmers do not need a separate N-fixer packet.",
    photo:
      "https://images.unsplash.com/photo-1447903196606-76e102ef24f9?auto=format&fit=crop&w=1200&q=80",
    alt: "Close-up of vegetable seeds ready for coating",
  },
  {
    id: "media",
    step: "02",
    name: "Coco-peat",
    dose: "1 kg AMC per tonne of nursery media",
    why: "Coffee and horticulture trays live in coco-peat. Enrich the mix before sowing, not after damping-off starts.",
    photo:
      "https://images.unsplash.com/photo-1584747420644-5c767eebcbe6?auto=format&fit=crop&w=1200&q=80",
    alt: "Hands holding brown coco-peat nursery media",
  },
  {
    id: "drench",
    step: "03",
    name: "Drench",
    dose: "20 g per litre at the root zone after transplant",
    why: "A short drench puts biology where white roots actually are. Follow the bottle if the pack in hand differs.",
    photo:
      "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=1200&q=80",
    alt: "Watering can drenching plants at the soil line",
  },
  {
    id: "fym",
    step: "04",
    name: "FYM / field",
    dose: "5 kg AMC with 500 kg FYM per acre near roots",
    why: "Main-field biology rides on manure you already have. This is not a foliar tonic and not a full NPK replacement.",
    photo:
      "https://images.unsplash.com/photo-1545333212-ffebc7933c12?auto=format&fit=crop&w=1200&q=80",
    alt: "Hands holding farmyard manure and compost",
  },
] as const;

const THRESHOLD = 90;
const COUNT = routes.length;

export function AmcRoutes() {
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const start = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef(false);
  const lock = useRef(false);

  const stacked = [0, 1, 2].map((offset) => routes[(index + offset) % COUNT]);

  function moveTo(next: { x: number; y: number }) {
    posRef.current = next;
    setPos(next);
  }

  function step(dir: -1 | 1) {
    if (lock.current) return;
    lock.current = true;
    dragRef.current = false;
    setLeaving(true);
    setDragging(false);
    moveTo({ x: dir * 520, y: posRef.current.y * 0.2 });
    window.setTimeout(() => {
      setIndex((i) => (i + dir + COUNT) % COUNT);
      moveTo({ x: 0, y: 0 });
      setLeaving(false);
      lock.current = false;
    }, 280);
  }

  function onPointerDown(e: React.PointerEvent) {
    if (lock.current) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
    dragRef.current = true;
    setDragging(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current || lock.current) return;
    moveTo({
      x: e.clientX - start.current.x,
      y: e.clientY - start.current.y,
    });
  }

  function onPointerUp() {
    if (!dragRef.current || lock.current) return;
    dragRef.current = false;
    setDragging(false);
    const x = posRef.current.x;
    if (x > THRESHOLD) step(1);
    else if (x < -THRESHOLD) step(-1);
    else moveTo({ x: 0, y: 0 });
  }

  function onNav(dir: -1 | 1, e: React.PointerEvent) {
    e.preventDefault();
    e.stopPropagation();
    step(dir);
  }

  const rot = pos.x / 18;
  const stamp = pos.x > 40 ? "next" : pos.x < -40 ? "prev" : "";

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        02b / How AMC moves
      </p>
      <h2 className="mt-2 max-w-xl font-serif text-3xl text-forest md:text-4xl">
        Four routes. One licensed consortium.
      </h2>
      <p className="mt-3 max-w-lg text-sm text-muted">
        Swipe the photo or tap the arrows. After FYM the deck returns to seed.
        IIHR protocol numbers for vegetables and horticulture. Coffee estates
        use the same paths in nursery media and with FYM.
      </p>

      <div className="swipe-deck mt-8">
        {[...stacked].reverse().map((card, i, arr) => {
          const isTop = i === arr.length - 1;
          const depth = arr.length - 1 - i;
          return (
            <article
              key={`${card.id}-${index}-${depth}`}
              className={`swipe-card ${isTop ? "is-top" : ""}`}
              style={
                isTop
                  ? {
                      transform: `translate(${pos.x}px, ${pos.y * 0.35}px) rotate(${rot}deg)`,
                      transition:
                        dragging && !leaving
                          ? "none"
                          : "transform 0.28s ease-out",
                    }
                  : {
                      transform: `scale(${1 - depth * 0.05}) translateY(${depth * 10}px)`,
                    }
              }
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? onPointerUp : undefined}
              onPointerCancel={isTop ? onPointerUp : undefined}
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={card.photo}
                  alt={card.alt}
                  fill
                  draggable={false}
                  sizes="(min-width: 640px) 22rem, 85vw"
                  className="object-cover"
                  priority={card.id === "seed"}
                />
                <div className="swipe-title">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-lime">
                    {card.step} / AMC
                  </p>
                  <h3 className="font-serif text-4xl text-white">{card.name}</h3>
                </div>
                {isTop && stamp ? (
                  <span className={`swipe-stamp ${stamp}`}>{stamp}</span>
                ) : null}
              </div>
              <div className="p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-leaf">
                  {card.name} · dose
                </p>
                <p className="mt-1 font-serif text-xl leading-snug text-forest">
                  {card.dose}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{card.why}</p>
              </div>
            </article>
          );
        })}
        <button
          type="button"
          className="swipe-hit prev"
          aria-label="Previous route"
          onPointerDown={(e) => onNav(-1, e)}
        >
          <span className="swipe-chevron" aria-hidden>
            ‹
          </span>
        </button>
        <button
          type="button"
          className="swipe-hit next"
          aria-label="Next route"
          onPointerDown={(e) => onNav(1, e)}
        >
          <span className="swipe-chevron" aria-hidden>
            ›
          </span>
        </button>
      </div>

      <p className="mt-5 text-center font-mono text-[11px] text-muted">
        {index + 1} / {COUNT} · swipe or tap the arrows
      </p>

      <p className="mt-4 text-center">
        <Link href="/products/arka-microbial-consortium" className="nav-link text-sm">
          Open AMC product
        </Link>
      </p>
    </section>
  );
}
