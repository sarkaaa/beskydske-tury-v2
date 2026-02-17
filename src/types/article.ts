import type { SanityImageSource } from "@sanity/image-url";

/* Article (trail) type */
export type Article = {
  slug: string | { current: string };
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
  mode?: "foot_hiking" | "foot_fast";
  title: string;
  trailType: "AA" | "AB";
  sameWay?: boolean;
  difficulty?: "easy" | "medium" | "hard";
  destinationType: {
    type: "car" | "bus" | "train";
    origin: string;
    destination: string;
  }[];
  imageUrl?: string | null;
  image?: SanityImageSource | null;
};
