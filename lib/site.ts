export const site = {
  name: "Bloom Biotech",
  tagline: "Green biotechnology",
  headline: "Soil biology for Western Ghats farms",
  description:
    "Bloom Biotech manufactures and supplies microbial biofertilizers, biocontrols, and soil health inputs from Chikkamagaluru, Karnataka. Licensed producer of ICAR-IIHR Arka Microbial Consortium.",
  phone: "8884568019",
  phoneDisplay: "+91 88845 68019",
  email: "suhasmohan82@gmail.com",
  instagram: "https://www.instagram.com/bloom_biotech/",
  facebook: "https://www.facebook.com/bloombiotech/",
  maps:
    "https://www.google.com/maps/search/?api=1&query=Bloom+Biotech+Chikkamagaluru",
  addressLines: [
    "Sy No 259/1, Hampapura Bypass Road",
    "Beekanahalli Village Limit, Joythinagar Post",
    "Chikkamagaluru, Karnataka 577102",
  ],
  hours: "Opens 9:30 am",
  googleRating: "5.0",
  googleReviews: 18,
} as const;

export function telHref() {
  return `tel:+91${site.phone}`;
}

export function whatsappUrl(text?: string) {
  const message =
    text ??
    "Hello Bloom Biotech, I would like a quote for biofertilizer / microbial products.";
  return `https://wa.me/91${site.phone}?text=${encodeURIComponent(message)}`;
}
