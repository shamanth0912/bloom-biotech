import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Logo } from "@/components/Logo";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a quote",
};

export default function EnquirePage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-2">
      <div>
        <div className="mb-6 h-14">
          <Logo />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-soil">Leads</p>
        <h1 className="mt-2 font-serif text-4xl text-forest">
          Tell us the crop. We will tell you the pack.
        </h1>
        <p className="mt-4 text-muted leading-relaxed">
          Farmers, dealers, estates, and KVKs use the same form. WhatsApp is
          usually faster than email during {site.hours.toLowerCase()}.
        </p>
        <ul className="mt-8 space-y-3 text-sm text-muted">
          <li>
            Phone{" "}
            <a className="text-leaf" href={`tel:+91${site.phone}`}>
              {site.phoneDisplay}
            </a>
          </li>
          <li>
            Email{" "}
            <a className="text-leaf" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
          <li>
            <a className="text-leaf" href={whatsappUrl()}>
              WhatsApp chat
            </a>
          </li>
          <li>{site.addressLines.join(", ")}</li>
        </ul>
      </div>
      <div className="rounded-2xl border border-forest/10 bg-white/70 p-6">
        <EnquiryForm />
      </div>
    </div>
  );
}
