"use client";

import { useState } from "react";
import { site, whatsappUrl } from "@/lib/site";
import { products } from "@/lib/products";

const audiences = ["Farmer", "Dealer", "Estate / plantation", "Institution / KVK"] as const;

export function EnquiryForm({ presetProduct }: { presetProduct?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-leaf/30 bg-lime/20 p-6">
        <h3 className="font-serif text-2xl">Received.</h3>
        <p className="mt-2 text-muted">
          We stored this enquiry. For a faster reply, message the plant on
          WhatsApp.
        </p>
        <a
          href={whatsappUrl()}
          className="mt-4 inline-block rounded-full bg-forest px-5 py-2 text-cream"
          target="_blank"
          rel="noreferrer"
        >
          Open WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Name
          <input
            required
            name="name"
            className="mt-1 w-full rounded-lg border border-forest/20 bg-white px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Phone
          <input
            required
            name="phone"
            type="tel"
            className="mt-1 w-full rounded-lg border border-forest/20 bg-white px-3 py-2"
          />
        </label>
      </div>
      <label className="block text-sm">
        Email
        <input
          name="email"
          type="email"
          className="mt-1 w-full rounded-lg border border-forest/20 bg-white px-3 py-2"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          I am a
          <select
            name="audience"
            className="mt-1 w-full rounded-lg border border-forest/20 bg-white px-3 py-2"
            defaultValue="Farmer"
          >
            {audiences.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Product of interest
          <select
            name="product"
            className="mt-1 w-full rounded-lg border border-forest/20 bg-white px-3 py-2"
            defaultValue={presetProduct ?? ""}
          >
            <option value="">Not sure yet</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm">
        Crop, acres, and what you need
        <textarea
          required
          name="message"
          rows={5}
          className="mt-1 w-full rounded-lg border border-forest/20 bg-white px-3 py-2"
          placeholder="e.g. 12 acres robusta, want AMC liquid + Trichoderma for nursery"
        />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-forest px-6 py-2.5 text-cream disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <a
          href={`mailto:${site.email}`}
          className="text-sm text-muted hover:text-forest"
        >
          Or email {site.email}
        </a>
      </div>
      {status === "err" ? (
        <p className="text-sm text-soil">
          Could not save on this server. Use WhatsApp {site.phoneDisplay}{" "}
          instead.
        </p>
      ) : null}
    </form>
  );
}
