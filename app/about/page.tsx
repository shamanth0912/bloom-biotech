import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Company",
  description: "Bloom Biotech overview - Chikkamagaluru green biotechnology plant.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-soil">Overview</p>
      <h1 className="mt-3 font-serif text-4xl text-forest md:text-5xl">
        A manufacturing plant in coffee country, not a trading desk in a city
        mall.
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
        <p>
          Bloom Biotech is an agri-biotechnology firm in Chikkamagaluru,
          Karnataka. Public directories list the plant at Survey No. 259/1,
          Hampapura Bypass Road, Beekanahalli / Joythinagar - on the main
          approach, which is how Google reviewers find it.
        </p>
        <p>
          The work is green biotechnology: microbial consortia, Trichoderma,
          Pseudomonas, nematode management, compost decomposers, and soil
          conditioners. IndiaMART shows the commercial names farmers already
          ask for - Bio Sanjiveeni, Bhu Samruddhi, Bluderma, Blumonas, Bio
          Astra, Bio Charge, Root Care, Bio Vanish, Bio Hit, Bio Erase.
        </p>
        <p>
          ICAR-IIHR’s active technology licence list names Bloom Biotech and
          Suhas Mohan for Arka Microbial Consortium (solid and liquid). That
          licence is the spine of the company story we tell institutions and
          estates. Google’s knowledge panel also notes collaboration around
          Arka Microbial Consortium and Arka Actino Consortium - we treat
          that as a claim to verify on letterhead before you print a tender.
        </p>
        <p>
          Instagram{" "}
          <a className="text-leaf underline" href={site.instagram}>
            @bloom_biotech
          </a>{" "}
          is the living scrapbook: tissue-culture / nursery trays, earthmoving
          around organic matter, field sampling with buckets, and bags of
          water-soluble NPK (Van Iperen 19-19-19). That last part matters - 
          many customers run biology next to soluble nutrition, not instead of
          it.
        </p>
        <p>
          Legal shape in public records: proprietorship, GST registered in
          Karnataka (2018), listed as manufacturer and retailer, roughly a
          decade in market. bloombiotech.in currently says “launching soon”.
          This site is the working presence: catalogue, journal, photos, and a
          quote form.
        </p>
      </div>
      <div className="mt-10 rounded-2xl border border-forest/10 bg-white/60 p-6">
        <h2 className="font-serif text-2xl text-forest">Plant</h2>
        <p className="mt-3 text-muted">
          {site.addressLines.join(", ")}
        </p>
        <p className="mt-2 text-muted">
          {site.phoneDisplay} · {site.email} · {site.hours}
        </p>
        <div className="mt-4 flex gap-4 text-sm text-leaf">
          <a href={site.maps}>Google Maps</a>
          <Link href="/gallery">Photos</Link>
          <Link href="/enquire">Enquire</Link>
        </div>
      </div>
    </article>
  );
}
