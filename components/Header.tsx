"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { site, whatsappUrl } from "@/lib/site";

const links = [
  { href: "/about", label: "Company" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Photos" },
  { href: "/journal", label: "Journal" },
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-forest/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5">
        <Link
          href="/"
          className="flex h-12 items-center sm:h-14"
          onClick={() => setOpen(false)}
        >
          <Logo priority className="max-h-12 sm:max-h-14" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-ink md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                path.startsWith(l.href)
                  ? "text-leaf"
                  : "hover:text-leaf transition-colors"
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={whatsappUrl()}
            className="text-sm text-muted hover:text-forest"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <Link
            href="/enquire"
            className="rounded-full bg-leaf px-4 py-2 text-sm font-medium text-white hover:bg-forest transition-colors"
          >
            Request a quote
          </Link>
        </div>
        <button
          type="button"
          className="md:hidden rounded-md border border-forest/20 px-3 py-1.5 text-sm"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          Menu
        </button>
      </div>
      {open ? (
        <div className="border-t border-forest/10 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3 text-forest">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/enquire" onClick={() => setOpen(false)}>
              Request a quote
            </Link>
            <p className="text-sm text-muted">{site.phoneDisplay}</p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
