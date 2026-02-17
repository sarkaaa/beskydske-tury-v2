import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";

export function imageUrlFor(source: SanityImageSource) {
  const { projectId, dataset } = client.config();
  return projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;
}
