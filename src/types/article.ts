/**
 * Article (trail) type – placeholder shape for future Sanity CMS content.
 */
export type Article = {
  slug: string;
  coords: {
    origin: {
      lat: number;
      lng: number;
    };
    destination: {
      lat: number;
      lng: number;
    };
  };
  waypoints?: {
    lat: number;
    lng: number;
  }[];
  title: string;
  trailType: string; // e.g. "A → B"
  lengthKm: number;
  difficulty?: "easy" | "medium" | "hard";
  destinationType: {
    type: "car" | "bus" | "train";
    origin: string;
    destination: string;
  }[];
  imageUrl?: string | null;
};
