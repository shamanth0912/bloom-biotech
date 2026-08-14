export type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "what-arka-microbial-consortium-does",
    title: "What Arka Microbial Consortium actually does in the field",
    date: "2026-03-12",
    excerpt:
      "One licensed IIHR formulation instead of three separate inoculants - and why that matters on coffee and vegetable ground.",
    tags: ["AMC", "IIHR", "How-to"],
    body: [
      "Most biofertilizer programmes fail because they are fiddly. A nitrogen fixer in one packet, a phosphate solubilizer in another, a zinc solubilizer if you remember. Arka Microbial Consortium (AMC) was designed at ICAR-IIHR so those jobs sit in a single carrier or liquid.",
      "Bloom Biotech appears on IIHR’s active licence list for AMC solid and liquid. That is the difference between a generic ‘bacteria bottle’ and a technology with a public protocol.",
      "IIHR’s published advantages are practical: 5-15% yield movement in vegetables, 25-30% less N and P fertiliser, stronger seedlings, and transplant a few days earlier. None of that replaces compost, drainage, or shade management in coffee.",
      "Start simple. Treat seed. Enrich coco-peat in the nursery. Drench after transplant. Mix with FYM for the main field. If a dealer cannot tell you those four routes, they are selling a slogan.",
    ],
  },
  {
    slug: "soil-biology-coffee-chikkamagaluru",
    title: "Soil biology under coffee: notes from Chikkamagaluru",
    date: "2026-04-02",
    excerpt:
      "Western Ghats estates run on organic matter. Microbes are how that matter becomes crop, not a luxury add-on.",
    tags: ["Coffee", "Estates", "Soil"],
    body: [
      "Coffee in this belt lives on leaf litter, shade, and rain that can drown a root as easily as it feeds it. Chemical NPK still has a place. What does not have a place is sterile soil under a beautiful canopy.",
      "We see the same pattern on estate visits: high soluble fertiliser, thinning mulch, and then a request for a ‘tonic’ when white roots disappear. The tonic is usually compost plus a competent consortium, not a miracle foliar.",
      "For managers: budget microbes next to lime and FYM, not next to pesticide. Ask for a programme by block, not a crate of mixed SKUs.",
    ],
  },
  {
    slug: "trichoderma-in-wet-nurseries",
    title: "Trichoderma in wet nurseries, without magical thinking",
    date: "2026-05-18",
    excerpt:
      "Damping-off loves stagnant trays. Bluderma is a tool. Shade, drainage, and clean media are the system.",
    tags: ["Nursery", "Trichoderma", "IPM"],
    body: [
      "If trays sit in a puddle, no fungus you buy will outrun Pythium. Trichoderma earns its keep when media is aerated, water is timed, and seedlings are not overcrowded.",
      "Use a drench or a mix into coco-peat that has already been enriched - AMC plus Trichoderma is a common nursery pairing. Keep labels. Keep batch numbers. That is how dealers and KVKs take you seriously.",
    ],
  },
  {
    slug: "how-dealers-should-quote-microbials",
    title: "How dealers should quote microbials without overselling",
    date: "2026-06-09",
    excerpt:
      "Farmers remember the season, not the brochure. Quote dose, crop, and what the product will not do.",
    tags: ["Dealers", "Sales"],
    body: [
      "A good quote names the crop, acres, formulation (solid vs liquid), and whether the farmer already uses FYM. A bad quote is a price per bottle with a 40% yield claim.",
      "Bloom Biotech can support dealer boards with pack photos, IIHR licence context, and a simple enquiry form from this site. If you stock Van Iperen water-solubles alongside our biology, say so - farmers already mix programmes.",
      "We would rather lose a rushed order than a reputation in one taluk.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
