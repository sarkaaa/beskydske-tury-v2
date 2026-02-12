export type RouteMapProps = {
  apiKey: string;
  className?: string;
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
  mode?: "foot_hiking" | "foot_fast";
  waypoints?: {
    lat: number;
    lng: number;
  }[];
};
