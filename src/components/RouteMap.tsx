"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { initMap } from "@/app/scripts/mapy";
import type { RouteMapProps } from "@/types/routeMap";

export function RouteMap({ apiKey, className, coords, mode, waypoints }: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!apiKey || !containerRef.current) return;

    const map = initMap(containerRef.current, apiKey, coords, mode, waypoints);
    return () => {
      map.remove();
    };
  }, [apiKey, coords, mode, waypoints]);

  if (!apiKey) {
    return (
      <div data-testid="route-map-error" className={className}>
        <output>Mapa není k dispozici.</output>
      </div>
    );
  }

  return (
    <div ref={containerRef} data-testid="route-map" className={className} aria-hidden="false" />
  );
}
