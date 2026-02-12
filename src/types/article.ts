/**
 * Article (trail) type – placeholder shape for future Sanity CMS content.
 */
export type Article = {
  slug: string;
  title: string;
  trailType: string; // e.g. "A → B"
  lengthKm: number;
  ascentM?: number;
  descentM?: number;
  destinationType: {
    type: "car" | "bus" | "train";
    origin: string;
    destination: string;
  }[];
  imageUrl?: string | null;
};
