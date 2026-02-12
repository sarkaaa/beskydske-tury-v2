import { getRouteInfo } from "@/app/scripts/mapy";
import type { Article } from "@/types/article";
import type { RouteMapProps } from "@/types/routeMap";

export async function getRouteLength(
  coords: Article["coords"],
  mode?: Article["mode"],
  waypoints?: Article["waypoints"],
) {
  const routeInfo = await getRouteInfo(process.env.MAPY_API_KEY ?? "", coords, mode, waypoints);
  return Math.round((routeInfo.length / 1000) * 100) / 100;
}

export function getRouteUrl(
  coords: RouteMapProps["coords"],
  mode?: RouteMapProps["mode"],
  waypoints?: RouteMapProps["waypoints"],
) {
  const baseUrl = "https://mapy.com/fnc/v1/route?mapset=outdoor";
  const routeType = mode || "foot_hiking";
  const start = `${coords.origin.lng},${coords.origin.lat}`;
  const end = `${coords.destination.lng},${coords.destination.lat}`;
  const waypointsParam = waypoints?.map((waypoint) => `${waypoint.lng},${waypoint.lat}`).join(";");
  const url = new URL(baseUrl);
  url.searchParams.set("routeType", routeType);
  url.searchParams.set("start", start);
  url.searchParams.set("end", end);
  url.searchParams.set("waypoints", waypointsParam ?? "");

  return url.toString();
}
