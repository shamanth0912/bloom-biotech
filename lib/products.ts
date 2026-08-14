export type Product = {
  slug: string;
  name: string;
  category: "Consortium" | "Biofertilizer" | "Biocontrol" | "Soil health";
  short: string;
  crops: string[];
  use: string;
  pack: string;
  body: string[];
};

export const products: Product[] = [
  {
    slug: "arka-microbial-consortium",
    name: "Arka Microbial Consortium",
    category: "Consortium",
    short:
      "ICAR-IIHR licensed all-in-one inoculant: N-fixing, P & Zn solubilizing, and plant-growth microbes in one formulation.",
    crops: ["Vegetables", "Coffee", "Horticulture", "Nursery"],
    use: "Seed treatment, coco-peat enrichment, soil drench, FYM mix",
    pack: "Solid (carrier) and liquid formulations",
    body: [
      "Bloom Biotech is listed by ICAR-IIHR as a licensed producer of Arka Microbial Consortium (solid and liquid). Farmers do not need separate N-fixing, phosphate-solubilizing, and growth-promoting inoculants.",
      "IIHR reports 5–15% yield gains in vegetables, 25–30% lower N and P fertilizer need, stronger seedlings, and earlier transplant readiness.",
      "Typical use: 10–20 g per 100–200 g seed; 1 kg AMC per tonne of coco-peat; 20 g/L as a root-zone drench; 5 kg mixed with 500 kg FYM per acre near the root zone.",
    ],
  },
  {
    slug: "bio-sanjiveeni",
    name: "Bio Sanjiveeni",
    category: "Biofertilizer",
    short:
      "Field biofertilizer blend used to revive tired soils and support vegetative growth after planting or pruning.",
    crops: ["Coffee", "Arecanut", "Vegetables", "Plantation"],
    use: "Soil application with FYM or compost",
    pack: "Pouch",
    body: [
      "Positioned for estates and smallholders who want a practical microbial boost alongside farmyard manure rather than a purely chemical programme.",
      "Ask the plant for crop-wise dose; we match packs to coffee, horticulture, and open-field vegetables around Chikkamagaluru.",
    ],
  },
  {
    slug: "bhu-samruddhi",
    name: "Bhu Samruddhi",
    category: "Soil health",
    short:
      "Soil-enrichment input for organic matter cycling and root-zone fertility on plantation and field crops.",
    crops: ["Coffee", "Pepper", "Field crops"],
    use: "Basal / root-zone application",
    pack: "Liquid bottle",
    body: [
      "Named for ‘soil prosperity’ — used where soils have been mined of biology after years of soluble fertiliser.",
      "Works best with compost, mulch, and reduced shock doses of urea.",
    ],
  },
  {
    slug: "bluderma",
    name: "Bluderma (Trichoderma)",
    category: "Biocontrol",
    short:
      "Liquid Trichoderma for soil-borne fungal pressure and healthier nursery media.",
    crops: ["Nursery", "Vegetables", "Plantation"],
    use: "Seedling dip, drench, media mix",
    pack: "Liquid bottle",
    body: [
      "Trichoderma colonises the root zone and competes with damping-off and wilt fungi common in wet Western Ghats nurseries.",
      "Use as part of an integrated programme — not a substitute for drainage and clean planting material.",
    ],
  },
  {
    slug: "blumonas",
    name: "Blumonas (Pseudomonas)",
    category: "Biocontrol",
    short:
      "Pseudomonas-based plant growth and disease-suppression inoculant.",
    crops: ["Vegetables", "Flowers", "Horticulture"],
    use: "Seed treatment and soil drench",
    pack: "Liquid bottle",
    body: [
      "Fluorescent pseudomonads are used for induced resistance and root health in intensive vegetable blocks.",
    ],
  },
  {
    slug: "bio-astra",
    name: "Bio Astra",
    category: "Biofertilizer",
    short: "Growth-support biofertilizer for active crop stages.",
    crops: ["Vegetables", "Plantation"],
    use: "Foliar or soil as advised",
    pack: "Pouch",
    body: ["Ask for the current technical sheet and crop calendar when you enquire."],
  },
  {
    slug: "bio-charge",
    name: "Bio Charge",
    category: "Biofertilizer",
    short: "Energy-stage microbial support around flowering and fruit set.",
    crops: ["Vegetables", "Fruit"],
    use: "Soil / foliar programme",
    pack: "Liquid bottle",
    body: ["Pair with balanced nutrition; microbes are not a full NPK replacement."],
  },
  {
    slug: "root-care",
    name: "Root Care",
    category: "Soil health",
    short: "Root-zone conditioner for establishment after transplant or drought stress.",
    crops: ["Nursery", "Coffee", "Vegetables"],
    use: "Drench at planting",
    pack: "Liquid bottle",
    body: [
      "Aimed at white-root recovery and better uptake when soils crust or stay waterlogged in monsoon weeks.",
    ],
  },
  {
    slug: "bio-vanish",
    name: "Bio Vanish Nematicide",
    category: "Biocontrol",
    short: "Biological nematode-management input for root-knot pressure.",
    crops: ["Vegetables", "Banana", "Polyhouse"],
    use: "Soil application as directed",
    pack: "As supplied",
    body: [
      "Nematodes are a quiet yield thief in intensive horticulture. Combine with crop rotation and clean nursery media.",
    ],
  },
  {
    slug: "bio-hit",
    name: "Bio Hit",
    category: "Biocontrol",
    short: "Bio-pesticide line for targeted pest pressure.",
    crops: ["Vegetables", "Plantation"],
    use: "As per label",
    pack: "Pouch",
    body: ["Request the active ingredient sheet before large estate orders."],
  },
  {
    slug: "bio-erase",
    name: "Bio Erase",
    category: "Biocontrol",
    short: "Bio-pesticide companion product in the Bloom crop-protection set.",
    crops: ["Vegetables", "Field crops"],
    use: "As per label",
    pack: "As supplied",
    body: ["Use inside an IPM calendar, not as a calendar spray by default."],
  },
  {
    slug: "decomposer",
    name: "Decomposer",
    category: "Soil health",
    short: "Microbial compost accelerator for farm waste, husk, and residue.",
    crops: ["All farms with residue"],
    use: "Heap or pit composting",
    pack: "As supplied",
    body: [
      "Turns coffee pulp, weeds, and crop residue into usable manure faster — the cheapest fertility most estates already have.",
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
