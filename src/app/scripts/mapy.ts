import { type GeoJSONSource, type LngLatLike, Map as MapLibreMap, Marker } from "maplibre-gl";
import type { RouteMapProps } from "@/types/routeMap";

class LogoControl {
  private _container: HTMLDivElement | undefined;

  onAdd(): HTMLDivElement {
    this._container = document.createElement("div");
    this._container.className = "maplibregl-ctrl";
    this._container.innerHTML =
      '<a href="http://mapy.com/" target="_blank"><img width="100px" src="https://api.mapy.com/img/api/logo.svg"></a>';
    return this._container;
  }

  onRemove(): void {
    if (this._container?.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
    this._container = undefined;
  }
}

function bbox(coords: number[][]) {
  let minLatitude = Infinity;
  let minLongitude = Infinity;
  let maxLatitude = -Infinity;
  let maxLongitude = -Infinity;

  for (const coor of coords) {
    minLongitude = Math.min(coor[0], minLongitude);
    maxLongitude = Math.max(coor[0], maxLongitude);
    minLatitude = Math.min(coor[1], minLatitude);
    maxLatitude = Math.max(coor[1], maxLatitude);
  }

  return [
    [minLongitude, minLatitude],
    [maxLongitude, maxLatitude],
  ] as [[number, number], [number, number]];
}

export async function getRouteInfo(
  apiKey: string,
  coords: RouteMapProps["coords"],
  mode?: RouteMapProps["mode"],
  waypoints?: RouteMapProps["waypoints"],
) {
  const coordsOrigin = [coords.origin.lng, coords.origin.lat];
  const coordsDestination = [coords.destination.lng, coords.destination.lat];
  const url = new URL("https://api.mapy.com/v1/routing/route");
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("lang", "cs");
  url.searchParams.set("start", coordsOrigin.join(","));
  url.searchParams.set("end", coordsDestination.join(","));
  url.searchParams.set("routeType", mode ?? "foot_hiking");
  if (waypoints?.length) {
    url.searchParams.set(
      "waypoints",
      waypoints.map((waypoint) => `${waypoint.lng},${waypoint.lat}`).join(";"),
    );
  }
  url.searchParams.set("avoidToll", "true");
  const response = await fetch(url.toString(), { mode: "cors" });
  const json = await response.json();
  return json;
}

export function initMap(
  container: string | HTMLElement,
  apiKey: string,
  coords: RouteMapProps["coords"],
  mode?: RouteMapProps["mode"],
  waypoints?: RouteMapProps["waypoints"],
): MapLibreMap {
  const map = new MapLibreMap({
    container,
    center: [coords.origin.lng, coords.origin.lat],
    zoom: 8,
    style: {
      version: 8,
      sources: {
        "outdoor-tiles": {
          type: "raster",
          url: `https://api.mapy.com/v1/maptiles/outdoor/tiles.json?apikey=${apiKey}`,
          tileSize: 256,
        },
        "route-geometry": {
          type: "geojson",
          data: {
            type: "LineString",
            coordinates: [],
          },
        },
      },
      layers: [
        {
          id: "tiles",
          type: "raster",
          source: "outdoor-tiles",
        },
        {
          id: "route-geometry",
          type: "line",
          source: "route-geometry",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#0036b5",
            "line-width": 5,
            "line-opacity": 0.7,
          },
        },
      ],
    },
  });

  new Marker().setLngLat([coords.origin.lng, coords.origin.lat]).addTo(map);

  map.addControl(new LogoControl(), "bottom-left");

  async function fetchRoute() {
    try {
      const json = await getRouteInfo(apiKey, coords, mode, waypoints);

      const source = map.getSource("route-geometry");
      if (source && json.geometry) {
        (source as GeoJSONSource).setData(json.geometry);
        const coordinates = json.geometry.geometry?.coordinates;
        if (coordinates?.length) {
          const camera = map.cameraForBounds(bbox(coordinates) as [LngLatLike, LngLatLike], {
            padding: 40,
          });
          if (camera) map.jumpTo(camera);
        }
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  map.on("load", () => {
    fetchRoute();
  });

  return map;
}
