import { articles } from "./articles";
import { products } from "./products";
import { site } from "./site";

export type KnowledgeChunk = {
  id: string;
  title: string;
  text: string;
  href?: string;
};

export function companyKnowledge(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [
    {
      id: "overview",
      title: "Company overview",
      href: "/about",
      text: `${site.name} is a green biotechnology / agri-biotech company in Chikkamagaluru, Karnataka, India. It manufactures and supplies microbial biofertilizers, biocontrols, and soil-health inputs. Tagline: ${site.tagline}. ${site.description}`,
    },
    {
      id: "contact",
      title: "Contact, hours, and plant address",
      href: "/enquire",
      text: `Phone ${site.phoneDisplay}. Email ${site.email}. Hours: ${site.hours}. WhatsApp is the fastest for quotes. Instagram ${site.instagram}. Address: ${site.addressLines.join(", ")}. Google rating ${site.googleRating} from ${site.googleReviews} reviews. Maps: ${site.maps}.`,
    },
    {
      id: "licence",
      title: "ICAR-IIHR licence",
      href: "/products/arka-microbial-consortium",
      text: `Bloom Biotech is listed on ICAR-IIHR active technology licences for Arka Microbial Consortium (solid and liquid), contact name Suhas Mohan, Chikkamagaluru. AMC is an all-in-one inoculant: nitrogen-fixing, phosphorus and zinc solubilizing, and plant-growth promoting microbes. IIHR notes 5-15% vegetable yield gains and 25-30% lower N and P fertiliser need. Typical use: 10-20 g per 100-200 g seed; 1 kg AMC per tonne coco-peat; 20 g/L root-zone drench; 5 kg with 500 kg FYM per acre.`,
    },
    {
      id: "audiences",
      title: "Who we serve",
      href: "/enquire",
      text: `The website and plant serve farmers and growers (coffee, horticulture, field crops), dealers and distributors needing bulk quotes, plantation estates, and institutions such as KVKs and research partners.`,
    },
    {
      id: "quote",
      title: "How to get a quote",
      href: "/enquire",
      text: `Request a quote at /enquire or WhatsApp ${site.phoneDisplay}. Include crop, acres, and whether you need solid or liquid packs. This site captures enquiries for farmers, dealers, estates, and institutions. We do not run online checkout or published price lists on the website - prices are quoted by the plant.`,
    },
  ];

  for (const p of products) {
    chunks.push({
      id: `product:${p.slug}`,
      title: p.name,
      href: `/products/${p.slug}`,
      text: `${p.name} (${p.category}). ${p.short} Crops: ${p.crops.join(", ")}. Use: ${p.use}. Pack: ${p.pack}. ${p.body.join(" ")}`,
    });
  }

  for (const a of articles) {
    chunks.push({
      id: `article:${a.slug}`,
      title: a.title,
      href: `/journal/${a.slug}`,
      text: `${a.title}. ${a.excerpt} ${a.body.join(" ")} Tags: ${a.tags.join(", ")}`,
    });
  }

  return chunks;
}

export function retrieveKnowledge(query: string, limit = 6) {
  const q = query.toLowerCase();
  const terms = q.split(/[^a-z0-9+]+/).filter((t) => t.length > 2);
  const scored = companyKnowledge().map((chunk) => {
    const hay = `${chunk.title} ${chunk.text}`.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (hay.includes(t)) score += 2;
    }
    if (q.includes("where") && chunk.id === "contact") score += 8;
    if (q.includes("phone") || q.includes("whatsapp") || q.includes("email")) {
      if (chunk.id === "contact") score += 8;
    }
    if (q.includes("amc") || q.includes("arka") || q.includes("consortium")) {
      if (chunk.id === "licence" || chunk.id.includes("arka")) score += 8;
    }
    if (q.includes("price") || q.includes("quote") || q.includes("cost")) {
      if (chunk.id === "quote") score += 8;
    }
    return { chunk, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.chunk);
}
