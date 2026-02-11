import type { Article } from "@/types/article";

// TEMPORARY DATA FOR DEVELOPMENT

/** Default cover image for tiles when no imageUrl is set (Beskydy-style landscape). */
const DEFAULT_TILE_IMAGE = "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80";

/**
 * Placeholder articles – replace with Sanity CMS fetch later.
 */
export const placeholderArticles: Article[] = [
  {
    slug: "lysa-hora-malenovice",
    title: "Lysá hora – Malenovice",
    trailType: "AB",
    lengthKm: 16.8,
    ascentM: 720,
    descentM: 680,
    destinationType: [
      {
        type: "car",
        origin: "Parkoviště u hradu",
        destination: "Parkoviště u prehrady",
      },
      {
        type: "bus",
        origin: "Parkoviště u hradu",
        destination: "Morávka, Úspolka",
      },
      {
        type: "train",
        origin: "Frýdek-Místek",
        destination: "Frýdlant nad Ostravicí",
      },
    ],
    imageUrl: DEFAULT_TILE_IMAGE,
  },
  {
    slug: "lysa-hora-malenovice2",
    title: "Lysá hora – Malenovice",
    trailType: "A → B",
    lengthKm: 16.8,
    ascentM: 650,
    descentM: 620,
    destinationType: [
      {
        type: "bus",
        origin: "Parkoviště u hradu",
        destination: "Parkoviště u hradu",
      },
      {
        type: "car",
        origin: "Parkoviště u hradu",
        destination: "Parkoviště u hradu",
      },
    ],
    imageUrl: DEFAULT_TILE_IMAGE,
  },
  {
    slug: "lysa-hora-malenovice3",
    title: "Lysá hora – Malenovice",
    trailType: "A → B",
    lengthKm: 16.8,
    ascentM: 700,
    descentM: 700,
    destinationType: [
      {
        type: "car",
        origin: "Parkoviště u hradu",
        destination: "Parkoviště u hradu",
      },
    ],
    imageUrl: DEFAULT_TILE_IMAGE,
  },
  {
    slug: "lysa-hora-malenovice4",
    title: "Lysá hora – Malenovice",
    trailType: "A → B",
    lengthKm: 16.8,
    destinationType: [
      {
        type: "car",
        origin: "Parkoviště u hradu",
        destination: "Parkoviště u hradu",
      },
    ],
    imageUrl: DEFAULT_TILE_IMAGE,
  },
  {
    slug: "lysa-hora-malenovice5",
    title: "Lysá hora – Malenovice",
    trailType: "A → B",
    lengthKm: 16.8,
    destinationType: [
      {
        type: "car",
        origin: "Parkoviště u hradu",
        destination: "Parkoviště u hradu",
      },
    ],
    imageUrl: DEFAULT_TILE_IMAGE,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return placeholderArticles.find((a) => a.slug === slug);
}
