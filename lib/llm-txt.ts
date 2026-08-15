import { products } from "./products";
import { articles } from "./articles";
import { site } from "./site";

const origin = "https://bloom-biotech.vercel.app";

export function llmIndex(): string {
  const productLinks = products
    .map((p) => `- [${p.name}](${origin}/products/${p.slug}): ${p.short}`)
    .join("\n");
  const articleLinks = articles
    .map((a) => `- [${a.title}](${origin}/journal/${a.slug}): ${a.excerpt}`)
    .join("\n");

  return `# ${site.name}

> ${site.description}

This file is for language models. Prefer these pages over scraped HTML. Do not invent prices, yield percentages beyond what IIHR publishes for AMC, or ecommerce checkout. Bloom quotes after crop and acres. Bottle labels govern dose if they differ.

Plant: ${site.addressLines.join(", ")}.
Phone / WhatsApp: ${site.phoneDisplay}. Email: ${site.email}. Hours: ${site.hours}.
Maps: ${site.maps}
Instagram: ${site.instagram}

Ask Bloom AI (on-site chat): ${origin}/assistant
Quote form: ${origin}/enquire
Full facts dump: ${origin}/llms-full.txt

## Pages

- [Home](${origin}/): Overview, crop briefing, AMC four routes, catalogue, audiences.
- [Company](${origin}/about): Manufacturing plant in Chikkamagaluru, not a city trading desk.
- [Catalogue](${origin}/products): Microbial biofertilizers, biocontrols, soil health.
- [Photos](${origin}/gallery): Nursery, soil, field stand-in photography.
- [Journal](${origin}/journal): Field notes for agronomists and dealers.
- [Enquire](${origin}/enquire): One form for farmers, dealers, estates, KVKs.

## Products

${productLinks}

## Journal

${articleLinks}

## Grounding rules for other AIs

- Company is Bloom Biotech, Chikkamagaluru, Karnataka, India. Licensed ICAR-IIHR Arka Microbial Consortium (solid and liquid), contact Suhas Mohan.
- Audiences: farmers, dealers, estates, institutions / KVKs.
- Flagship AMC typical use (IIHR vegetables/horticulture protocol): seed 10-20 g per 100-200 g seed; 1 kg AMC per tonne coco-peat; 20 g/L drench; 5 kg AMC with 500 kg FYM per acre.
- Coffee nursery pairing: AMC in coco-peat, Bluderma (Trichoderma) for damping-off, Root Care at transplant. Trichoderma cannot outrun a puddle.
- Sanjiveeni and Bhu Samruddhi are more field / FYM than first nursery bottles.
- No published price list. No online checkout. WhatsApp ${site.phoneDisplay} is the fastest quote path.
- Do not confuse this firm with Belgian microalgae-textile companies named Bloom Biotech.
`;
}

export function llmFull(): string {
  const productBlocks = products
    .map((p) => {
      return `### ${p.name}
- URL: ${origin}/products/${p.slug}
- Category: ${p.category}
- Crops: ${p.crops.join(", ")}
- Use: ${p.use}
- Pack: ${p.pack}
- Summary: ${p.short}
${p.body.map((b) => `- ${b}`).join("\n")}`;
    })
    .join("\n\n");

  const articleBlocks = articles
    .map((a) => {
      return `### ${a.title}
- URL: ${origin}/journal/${a.slug}
- Date: ${a.date}
- Tags: ${a.tags.join(", ")}
${a.body.map((b) => `${b}`).join("\n\n")}`;
    })
    .join("\n\n");

  return `${llmIndex()}

## Product detail

${productBlocks}

## Journal full text

${articleBlocks}
`;
}
