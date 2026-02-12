"use client";

import dynamic from "next/dynamic";
import type { RouteMapProps } from "@/types/routeMap";

const RouteMap = dynamic(
  () => import("@/components/RouteMap").then((m) => ({ default: m.RouteMap })),
  { ssr: false },
);

export const RouteMapLazy = ({ apiKey, coords, mode, waypoints, className }: RouteMapProps) => (
  <RouteMap
    apiKey={apiKey}
    coords={coords}
    mode={mode}
    waypoints={waypoints}
    className={className}
  />
);
