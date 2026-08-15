import { products, type Product } from "./products";
import { site, whatsappUrl } from "./site";

export type ChatLink = { label: string; href: string };

export type ChatAnswer = {
  title: string;
  summary: string;
  bullets: string[];
  cta?: string;
  links: ChatLink[];
  followUps: string[];
};

export const welcomeAnswer: ChatAnswer = {
  title: "Ask Bloom AI",
  summary:
    "I brief farmers, dealers, estates, and KVKs on Bloom Biotech products and how they are used. Ask about a crop, a pack name, or AMC. I explain what it is, why it is used, and how to apply it. Prices are quoted by the plant after crop and acres.",
  bullets: [
    "Bloom Biotech is a Chikkamagaluru plant making microbial biofertilizers and biocontrols.",
    "Flagship: ICAR-IIHR licensed Arka Microbial Consortium (solid and liquid).",
    "Ask a crop (coffee, nursery, vegetables) for a short programme, not just a name list.",
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

function explain(p: Product) {
  return `${p.name} (${p.category}): ${p.short} Typical use: ${p.use}. Pack: ${p.pack}.`;
}

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
  const scored = products.map((p) => {
    const blob = `${p.name} ${p.crops.join(" ")} ${p.short} ${p.use}`.toLowerCase();
    const hits = found.filter(
      (f) => blob.includes(f) || p.crops.some((c) => c.toLowerCase().includes(f)),
    );
    return { p, n: hits.length };
  });
  return scored
    .filter((s) => s.n > 0)
    .sort((a, b) => b.n - a.n)
    .map((s) => s.p);
}

export function answerQuestion(question: string, priorUser: string[] = []): ChatAnswer {
  const q = question.toLowerCase().trim();
  const ctx = `${priorUser.slice(-2).join(" ")} ${question}`.toLowerCase();

  if (
    /phone|call|whatsapp|email|address|where|location|map|hour|open|contact/.test(q)
  ) {
    return {
      title: "Plant & contact",
      summary: `Bloom Biotech manufactures from a plant at ${site.addressLines.join(", ")}. Public hours start at 9:30 am. WhatsApp is the fastest way to get a pack list. Include crop, acres, and solid vs liquid when you write.`,
      bullets: [
        `Phone / WhatsApp: ${site.phoneDisplay}`,
        `Email: ${site.email}`,
        `${site.hours} · Chikkamagaluru, Karnataka`,
        "Same form for farmers, dealers, estates, and KVKs.",
      ],
      cta: "WhatsApp is usually faster than email on a working day.",
      links: [nav.whatsapp, nav.quote, { label: "Maps", href: site.maps }],
      followUps: ["How do I get a quote?", "What is AMC?", "Who do you sell to?"],
    };
  }

  if (/price|cost|rate|quote|order|buy|dealer|distributor|bulk/.test(q)) {
    return {
      title: "How quoting works",
      summary:
        "Bloom does not publish a price list or run checkout on this site. The plant quotes after it knows crop, area, and whether you need solid or liquid packs. Dealers should say if the order is for stock or a named estate. WhatsApp the same number farmers use.",
      bullets: [
        "Send crop, acres (or seedling count), and solid vs liquid.",
        "Farmers, dealers, estates, and KVKs use one enquiry form.",
        `WhatsApp ${site.phoneDisplay} for a same-day reply during plant hours.`,
        "Bottle labels still win on dose if they differ from this briefing.",
      ],
      links: [nav.quote, nav.whatsapp, nav.products],
      followUps: ["Coffee nursery pack", "List of products", "Plant address & phone"],
    };
  }

  if (
    (/dose|how to use|application|fym|drench|seed treatment|per acre/.test(q) &&
      /amc|arka|consortium/.test(ctx)) ||
    /amc dose/.test(q)
  ) {
    return {
      title: "AMC - how to use",
      summary:
        "Arka Microbial Consortium is meant to be simple: one inoculant instead of separate N-fixers, P and Zn solubilizers, and growth bacteria. IIHR’s published protocol is for vegetables and horticulture; coffee estates use the same routes in nursery media and with FYM. Always follow the pack in hand.",
      bullets: [
        "Seed treatment: 10-20 g inoculum for 100-200 g vegetable seed.",
        "Coco-peat: 1 kg AMC is enough to enrich 1 tonne of media.",
        "Drench: mix 20 g per litre and apply at the root zone after transplant.",
        "Main field: 5 kg AMC mixed into 500 kg FYM per acre near roots.",
        "IIHR notes stronger seedlings and transplant a few days earlier in veg nurseries.",
      ],
      links: [
        { label: "AMC product", href: "/products/arka-microbial-consortium" },
        { label: "How AMC works", href: "/journal/what-arka-microbial-consortium-does" },
        nav.quote,
      ],
      followUps: ["Coffee nursery pack", "Trichoderma for nursery", "Get a quote"],
    };
  }

  if (/amc|arka|consortium|iihr|licence|license/.test(q) && !/nursery pack|coffee nursery/.test(q)) {
    return {
      title: "Arka Microbial Consortium",
      summary:
        "AMC is Bloom’s flagship. It is an ICAR-IIHR technology: nitrogen-fixing, phosphorus and zinc solubilizing, and plant-growth microbes in one solid or liquid. Bloom Biotech (Suhas Mohan, Chikkamagaluru) is on IIHR’s public licence list. IIHR reports 5-15% vegetable yield movement and 25-30% less N and P fertiliser when the protocol is followed. It does not replace compost, drainage, or shade in coffee.",
      bullets: [
        "Licensed AMC solid and liquid from the Chikkamagaluru plant.",
        "One pack instead of three separate inoculants.",
        "Use on seed, coco-peat, as a drench, or mixed with FYM.",
        "Ask for solid vs liquid when you quote. Label dose wins.",
      ],
      cta: "Open the product page for the four application routes.",
      links: [
        { label: "AMC product", href: "/products/arka-microbial-consortium" },
        nav.quote,
        { label: "How AMC works", href: "/journal/what-arka-microbial-consortium-does" },
      ],
      followUps: ["AMC dose per acre", "Coffee nursery pack", "Other products"],
    };
  }

  if (/coffee/.test(q) && /nursery|seedling|coco/.test(q)) {
    const amc = products.find((p) => p.slug === "arka-microbial-consortium")!;
    const tri = products.find((p) => p.slug === "bluderma")!;
    const root = products.find((p) => p.slug === "root-care")!;
    return {
      title: "Coffee nursery pack",
      summary:
        "A coffee nursery in the Western Ghats fails from wet media and weak roots more often than from a missing foliar. Bloom’s usual briefing is AMC in coco-peat for biology, Bluderma (Trichoderma) against damping-off, and Root Care at transplant if white roots look thin. Sanjiveeni or Bhu Samruddhi belong more in the field with FYM, not as the first nursery bottle. Trays still need air, timed water, and clean media. Trichoderma cannot outrun a puddle.",
      bullets: [
        explain(amc),
        explain(tri),
        explain(root),
        "Nursery pairing: enrich coco-peat with AMC, then a Trichoderma drench or mix.",
        "Tell the plant seedling count and whether you already use coco-peat.",
      ],
      cta: "Quote with seedling numbers. Bottle labels still govern dose.",
      links: [nav.product(amc), nav.product(tri), nav.product(root), nav.quote],
      followUps: ["AMC dose per acre", "What is Trichoderma for?", "Get a quote"],
    };
  }

  if (/list|catalogue|catalog|products|what do you sell|range|other products/.test(q)) {
    return {
      title: "Product range",
      summary:
        "Bloom sells microbial biofertilizers, biocontrols, and soil-health inputs. The licence spine is Arka Microbial Consortium. Commercial names farmers already ask for include Bio Sanjiveeni, Bhu Samruddhi, Bluderma (Trichoderma), Blumonas (Pseudomonas), Root Care, Bio Vanish for nematodes, and a decomposer for farm waste. Beauty-salon listings on IndiaMART are noise and are ignored here.",
      bullets: products.slice(0, 7).map((p) => `${p.name}: ${p.short}`),
      cta: "Tap a name for crops and how to apply it.",
      links: [nav.products, nav.quote],
      followUps: ["What is AMC?", "Trichoderma", "Nematode product"],
    };
  }

  if (/who are you|about the company|company overview|what is bloom/.test(q)) {
    return {
      title: "Bloom Biotech",
      summary:
        "Bloom Biotech is a green-biotechnology manufacturer in Chikkamagaluru, Karnataka, not a city trading desk. The plant sits on Hampapura Bypass Road at Joythinagar. Public records list a proprietorship, GST from 2018, and an ICAR-IIHR licence for Arka Microbial Consortium. The site is for farmers, dealers, coffee estates, and institutions such as KVKs.",
      bullets: [
        "Microbial biofertilizers, biocontrols, and soil conditioners.",
        "Licensed AMC solid and liquid (IIHR public licence list).",
        `Contact ${site.phoneDisplay} or the quote form with crop and acres.`,
        "Instagram @bloom_biotech shows nursery trays, field work, and the plant.",
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
  const picked = named.length
    ? named
    : byCrop.length
      ? byCrop.slice(0, 4)
      : byAlias.slice(0, 4);

  if (picked.length === 1) {
    const p = picked[0];
    return {
      title: p.name,
      summary: `${p.short} ${p.body[0] ?? ""} Crops on file: ${p.crops.join(", ")}.`,
      bullets: [
        `${p.category} · ${p.pack}`,
        `How it is used: ${p.use}`,
        p.body[1] ?? "Ask the plant for the current technical sheet on large estate orders.",
        "Prices are quoted. Send crop and acres.",
      ],
      links: [nav.product(p), nav.quote, nav.whatsapp],
      followUps: ["How do I get a quote?", "Other products", "Coffee nursery pack"],
    };
  }

  if (picked.length > 1) {
    return {
      title: "What fits this query",
      summary: `These packs are the closest match in Bloom’s catalogue. ${picked
        .slice(0, 4)
        .map((p) => p.name)
        .join(", ")}. Each line below is what the product is for, not just a crop tag. Open a pack for the full briefing, or send crop and acres for a quote.`,
      bullets: picked.slice(0, 4).map(explain),
      cta: "If this is a coffee nursery, ask “coffee nursery pack” for the AMC + Trichoderma pairing.",
      links: [...picked.slice(0, 3).map(nav.product), nav.quote],
      followUps: ["Coffee nursery pack", "What is AMC?", "How do I get a quote?"],
    };
  }

  return {
    title: "I don’t have that yet",
    summary: `I can brief AMC, Trichoderma, soil packs, the Chikkamagaluru plant, and how to quote. I will not invent a price. For anything outside the catalogue, WhatsApp ${site.phoneDisplay}.`,
    bullets: [
      "Try a product name, or a crop such as coffee or nursery.",
      "Ask how to use AMC if you need doses.",
      "Dealers: include acres and solid vs liquid.",
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
    const parsed = JSON.parse(raw.slice(jsonStart, jsonEnd + 1)) as Partial<ChatAnswer> & {
      summary?: string;
    };
    const bullets = (parsed.bullets ?? []).map(String).filter(Boolean).slice(0, 7);
    const summary = String(parsed.summary || "").trim();
    if (!summary && !bullets.length) return compactText(raw, fallback);
    return {
      title: String(parsed.title || fallback.title).slice(0, 72),
      summary: summary || fallback.summary,
      bullets: bullets.length ? bullets : fallback.bullets,
      cta: parsed.cta ? String(parsed.cta).slice(0, 180) : fallback.cta,
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
    .split(/\n+/)
    .map((s) => s.replace(/^[-*•]\s*/, "").trim())
    .filter((s) => s.length > 20);
  if (!parts.length) return fallback;
  return {
    ...fallback,
    summary: parts.slice(0, 2).join(" "),
    bullets: parts.slice(2, 8).length ? parts.slice(2, 8) : fallback.bullets,
  };
}

export const assistantSystemPrompt = `You are Ask Bloom AI, the on-site agronomy assistant for Bloom Biotech, Chikkamagaluru (green biotechnology: microbial biofertilizers and biocontrols).

Your job is to TEACH, then route. A user who taps "Coffee nursery pack" must leave knowing what to apply, why, and how, not a bare name list.

Return ONLY JSON:
{
  "title": "short heading",
  "summary": "3 to 6 sentences. Explain the idea, the products, why they are paired, and any caution. Use plain language for farmers and dealers.",
  "bullets": ["4 to 7 facts. Each can be up to 180 characters. Include use, crops, or dose when known."],
  "cta": "one next step",
  "links": [{"label":"human label","href":"/products/..."}],
  "followUps": ["up to 4 short follow-up questions"]
}

Rules:
- Facts only from the knowledge excerpts and conversation. Do not invent prices, yields, or licences.
- If several products match, summarise EACH in the bullets (name + what it does + when to use). Never return only "Name - Crop".
- Prefer IIHR AMC protocol numbers when the question is about AMC dose.
- Say when something is nursery vs main field.
- href must be a site path such as /products/arka-microbial-consortium or /enquire.
- No em dashes. No filler. Do not claim to place an order.
`;
