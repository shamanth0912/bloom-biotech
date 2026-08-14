import { products, type Product } from "./products";
import { site, whatsappUrl } from "./site";

export type ChatLink = { label: string; href: string };

export type ChatAnswer = {
  title: string;
  bullets: string[];
  cta?: string;
  links: ChatLink[];
  followUps: string[];
};

export const welcomeAnswer: ChatAnswer = {
  title: "Ask Bloom",
  bullets: [
    "Short answers on products, the plant, and quotes.",
    "No price list online — the plant quotes after crop + acres.",
    "Tap a topic below, or type a crop name.",
  ],
  links: [
    { label: "Products", href: "/products" },
    { label: "Quote", href: "/enquire" },
    { label: "Company", href: "/about" },
  ],
  followUps: [
    "What is AMC?",
    "Plant address & phone",
    "Coffee nursery pack",
    "Dealer quote",
  ],
};

const nav = {
  product: (p: Product): ChatLink => ({
    label: p.name,
    href: `/products/${p.slug}`,
  }),
  quote: { label: "Request a quote", href: "/enquire" },
  whatsapp: { label: "WhatsApp", href: whatsappUrl() },
  about: { label: "Company", href: "/about" },
  products: { label: "All products", href: "/products" },
  gallery: { label: "Photos", href: "/gallery" },
  journal: { label: "Journal", href: "/journal" },
};

function matchProducts(q: string) {
  const hay = q.toLowerCase();
  return products.filter((p) => {
    const blob = `${p.name} ${p.slug} ${p.category} ${p.crops.join(" ")} ${p.short}`.toLowerCase();
    return hay.split(/[^a-z0-9]+/).some((t) => t.length > 2 && blob.includes(t));
  });
}

function cropHits(q: string) {
  const hay = q.toLowerCase();
  const crops = [
    "coffee",
    "nursery",
    "vegetable",
    "horticulture",
    "arecanut",
    "pepper",
    "banana",
    "plantation",
  ];
  const found = crops.filter((c) => hay.includes(c));
  if (!found.length) return [];
  return products.filter((p) =>
    p.crops.some((c) => found.some((f) => c.toLowerCase().includes(f) || f.includes(c.toLowerCase().slice(0, 5)))),
  );
}

export function answerQuestion(question: string): ChatAnswer {
  const q = question.toLowerCase().trim();

  if (
    /phone|call|whatsapp|email|address|where|location|map|hour|open|contact/.test(q)
  ) {
    return {
      title: "Plant & contact",
      bullets: [
        `Phone / WhatsApp: ${site.phoneDisplay}`,
        `Email: ${site.email}`,
        `${site.hours} · Chikkamagaluru`,
        site.addressLines[0],
        site.addressLines[2],
      ],
      cta: "WhatsApp is fastest for a same-day quote.",
      links: [nav.whatsapp, nav.quote, { label: "Maps", href: site.maps }],
      followUps: ["How do I get a quote?", "What is AMC?", "Who do you sell to?"],
    };
  }

  if (/price|cost|rate|quote|order|buy|dealer|distributor|bulk/.test(q)) {
    return {
      title: "Get a quote",
      bullets: [
        "No online prices or checkout.",
        "Send crop, acres, solid vs liquid.",
        "Farmers, dealers, estates, and KVKs use the same form.",
        `WhatsApp ${site.phoneDisplay} for a quick reply.`,
      ],
      links: [nav.quote, nav.whatsapp, nav.products],
      followUps: ["Coffee nursery pack", "List of products", "Plant address & phone"],
    };
  }

  if (/dose|how to use|application|fym|drench|seed treatment|per acre/.test(q) && /amc|arka|consortium/.test(q)) {
    return {
      title: "AMC — how to use",
      bullets: [
        "Seed: 10–20 g per 100–200 g seed.",
        "Coco-peat: 1 kg AMC per tonne.",
        "Drench: 20 g per litre at the root zone.",
        "Field: 5 kg + 500 kg FYM per acre.",
      ],
      links: [
        { label: "AMC product", href: "/products/arka-microbial-consortium" },
        nav.quote,
      ],
      followUps: ["Plant address & phone", "Trichoderma for nursery"],
    };
  }

  if (/amc|arka|consortium|iihr|licence|license/.test(q)) {
    return {
      title: "Arka Microbial Consortium",
      bullets: [
        "ICAR-IIHR licensed — solid and liquid.",
        "One pack: N-fix + P/Zn solubilizers + growth microbes.",
        "IIHR: 5–15% veg yield; 25–30% less N & P.",
        "Use: seed, coco-peat, drench, or FYM mix.",
      ],
      cta: "Bottle label wins if the dose differs.",
      links: [
        { label: "AMC product", href: "/products/arka-microbial-consortium" },
        nav.quote,
        { label: "How AMC works", href: "/journal/what-arka-microbial-consortium-does" },
      ],
      followUps: ["AMC dose per acre", "Coffee nursery pack", "Other products"],
    };
  }

  if (/list|catalogue|catalog|products|what do you sell|range|other products/.test(q)) {
    return {
      title: "Product range",
      bullets: products.slice(0, 6).map((p) => `${p.name} — ${p.category.toLowerCase()}`),
      cta: `${products.length} packs on the site. Open a card for crops and use.`,
      links: [nav.products, nav.quote],
      followUps: ["What is AMC?", "Trichoderma", "Nematode product"],
    };
  }

  if (/who are you|about the company|company overview|what is bloom/.test(q)) {
    return {
      title: "Bloom Biotech",
      bullets: [
        "Green biotech plant in Chikkamagaluru.",
        "Biofertilizers, biocontrols, soil health.",
        "Licensed ICAR-IIHR AMC producer.",
        "Serves farmers, dealers, estates, KVKs.",
      ],
      links: [nav.about, nav.products, nav.gallery],
      followUps: ["What is AMC?", "Plant address & phone", "List of products"],
    };
  }

  const named = products.filter((p) => {
    const n = p.name.toLowerCase();
    const slug = p.slug.replace(/-/g, " ");
    return q.includes(n) || q.includes(slug);
  });
  const byAlias = matchProducts(q);
  const byCrop = cropHits(q);
  const picked = named.length ? named : byCrop.length ? byCrop.slice(0, 3) : byAlias.slice(0, 3);

  if (picked.length === 1) {
    const p = picked[0];
    return {
      title: p.name,
      bullets: [
        `${p.category} · ${p.pack}`,
        `Crops: ${p.crops.slice(0, 4).join(", ")}`,
        p.short.length > 110 ? `${p.short.slice(0, 108)}…` : p.short,
        `Use: ${p.use}`,
      ],
      links: [nav.product(p), nav.quote, nav.whatsapp],
      followUps: ["How do I get a quote?", "Other products", "Plant address & phone"],
    };
  }

  if (picked.length > 1) {
    return {
      title: "Best matches",
      bullets: picked.slice(0, 4).map((p) => `${p.name} — ${p.crops[0] ?? p.category}`),
      cta: "Open a pack, or send crop + acres for a quote.",
      links: [
        ...picked.slice(0, 3).map(nav.product),
        nav.quote,
      ],
      followUps: ["What is AMC?", "How do I get a quote?"],
    };
  }

  return {
    title: "I don’t have that yet",
    bullets: [
      "I cover products, AMC, the plant, and quotes.",
      "Try a product name or a crop (coffee, nursery).",
      `For anything else: WhatsApp ${site.phoneDisplay}.`,
    ],
    links: [nav.products, nav.quote, nav.whatsapp],
    followUps: ["List of products", "What is AMC?", "Plant address & phone"],
  };
}

export function parseModelAnswer(raw: string, fallback: ChatAnswer): ChatAnswer {
  try {
    const jsonStart = raw.indexOf("{");
    const jsonEnd = raw.lastIndexOf("}");
    if (jsonStart < 0 || jsonEnd < 0) return compactText(raw, fallback);
    const parsed = JSON.parse(raw.slice(jsonStart, jsonEnd + 1)) as Partial<ChatAnswer>;
    const bullets = (parsed.bullets ?? []).map(String).filter(Boolean).slice(0, 5);
    if (!bullets.length) return compactText(raw, fallback);
    return {
      title: String(parsed.title || fallback.title).slice(0, 60),
      bullets,
      cta: parsed.cta ? String(parsed.cta).slice(0, 120) : undefined,
      links: Array.isArray(parsed.links) && parsed.links.length ? parsed.links : fallback.links,
      followUps:
        Array.isArray(parsed.followUps) && parsed.followUps.length
          ? parsed.followUps.map(String).slice(0, 4)
          : fallback.followUps,
    };
  } catch {
    return compactText(raw, fallback);
  }
}

function compactText(raw: string, fallback: ChatAnswer): ChatAnswer {
  const parts = raw
    .split(/\n+|(?<=\.)\s+/)
    .map((s) => s.replace(/^[-*•]\s*/, "").trim())
    .filter((s) => s.length > 12 && s.length < 140)
    .slice(0, 5);
  if (!parts.length) return fallback;
  return { ...fallback, title: fallback.title, bullets: parts };
}

export const assistantSystemPrompt = `You are Bloom, a brief on-site assistant for Bloom Biotech, Chikkamagaluru.

Return ONLY JSON:
{"title":"max 6 words","bullets":["max 5 items, each under 90 characters"],"cta":"one short next step or omit","links":[{"label":"...","href":"/path"}],"followUps":["short suggested questions"]}

Rules:
- Summarise. No paragraphs.
- Facts only from the knowledge excerpts.
- No invented prices.
- href must be a site path like /products/... or /enquire.
`;
