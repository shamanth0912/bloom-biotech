import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-forest text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <div className="inline-flex bg-white px-3 py-2">
            <div className="h-14">
              <Logo />
            </div>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-paper/75">
            Microbial inputs from Chikkamagaluru. Licensed ICAR-IIHR Arka
            Microbial Consortium.
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">
            Visit
          </p>
          <address className="mt-3 not-italic text-sm leading-relaxed text-paper/80">
            {site.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="mt-2 block">{site.hours}</span>
          </address>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">
            Connect
          </p>
          <a className="block hover:underline" href={`tel:+91${site.phone}`}>
            {site.phoneDisplay}
          </a>
          <a className="block hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a className="block hover:underline" href={site.instagram}>
            Instagram @bloom_biotech
          </a>
          <Link className="block hover:underline" href="/enquire">
            Enquiry form
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center font-mono text-[10px] tracking-wide text-paper/50">
        © {new Date().getFullYear()} Bloom Biotech, Chikkamagaluru
      </div>
    </footer>
  );
}
