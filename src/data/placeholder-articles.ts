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
    coords: {
      origin: {
        lat: 49.5462228,
        lng: 18.4471314,
      },
      destination: {
        lat: 49.5441725,
        lng: 18.4947875,
      },
    },
    waypoints: [
      {
        lat: 49.5225211,
        lng: 18.4911197,
      },
    ],
    title: "Lysá hora – Malenovice",
    trailType: "AB",
    lengthKm: 16.8,
    difficulty: "easy",
    destinationType: [
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
  // {
  //   slug: "lysa-hora-malenovice2",
  //   coords: [[14.8981184, 49.8729317], [14.8981184, 49.8729317]],
  //   title: "Lysá hora – Malenovice",
  //   trailType: "A → B",
  //   lengthKm: 16.8,
  //   difficulty: "easy",
  //   destinationType: [
  //     {
  //       type: "bus",
  //       origin: "Parkoviště u hradu",
  //       destination: "Parkoviště u hradu",
  //     },
  //     {
  //       type: "car",
  //       origin: "Parkoviště u hradu",
  //       destination: "Parkoviště u hradu",
  //     },
  //   ],
  //   imageUrl: DEFAULT_TILE_IMAGE,
  // },
  // {
  //   slug: "lysa-hora-malenovice3",
  //   coords: [[14.8981184, 49.8729317], [14.8981184, 49.8729317]],
  //   title: "Lysá hora – Malenovice",
  //   trailType: "A → B",
  //   lengthKm: 16.8,
  //   difficulty: "medium",
  //   destinationType: [
  //     {
  //       type: "car",
  //       origin: "Parkoviště u hradu",
  //       destination: "Parkoviště u hradu",
  //     },
  //   ],
  //   imageUrl: DEFAULT_TILE_IMAGE,
  // },
  // {
  //   slug: "lysa-hora-malenovice4",
  //   title: "Lysá hora – Malenovice",
  //   coords: [[14.8981184, 49.8729317], [14.8981184, 49.8729317]],
  //   trailType: "A → B",
  //   lengthKm: 16.8,
  //   difficulty: "hard",
  //   destinationType: [
  //     {
  //       type: "car",
  //       origin: "Parkoviště u hradu",
  //       destination: "Parkoviště u hradu",
  //     },
  //   ],
  //   imageUrl: DEFAULT_TILE_IMAGE,
  // },
  // {
  //   slug: "lysa-hora-malenovice5",
  //   title: "Lysá hora – Malenovice",
  //   coords: [[14.8981184, 49.8729317], [14.8981184, 49.8729317]],
  //   trailType: "A → B",
  //   lengthKm: 16.8,
  //   difficulty: "hard",
  //   destinationType: [
  //     {
  //       type: "car",
  //       origin: "Parkoviště u hradu",
  //       destination: "Parkoviště u hradu",
  //     },
  //   ],
  //   imageUrl: DEFAULT_TILE_IMAGE,
  // },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return placeholderArticles.find((a) => a.slug === slug);
}
