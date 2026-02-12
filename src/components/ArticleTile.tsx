import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaRoute } from "react-icons/fa";
import RouteIcon from "@/helpers/routeIcon";
import type { Article } from "@/types/article";

// TODO: Replace with actual default image
const DEFAULT_TILE_IMAGE = "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80";

type ArticleTileProps = {
  article: Article;
};

export default function ArticleTile({ article }: ArticleTileProps) {
  const imageUrl = article.imageUrl ?? DEFAULT_TILE_IMAGE;

  return (
    <Link
      href={`/trasy/${article.slug}`}
      className="group relative flex min-h-[400px] flex-col overflow-hidden rounded-lg shadow-sm transition-[border-color,shadow] hover:border-green-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-green-500 focus-visible:outline-offset-2"
    >
      <span className="absolute inset-0 block">
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </span>
      <span
        className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"
        aria-hidden
      />
      <span
        className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden
      >
        <span className="font-semibold text-2xl text-white uppercase tracking-widest">Detail</span>
      </span>
      <span className="relative flex flex-1 flex-col justify-end gap-0.5 p-4 text-white">
        <h2 className="tile-title">{article.title}</h2>
        <p className="mt-1 flex items-center gap-2 text-sm text-white/90">
          <FaMapMarkerAlt className="h-4 w-4 shrink-0" aria-hidden />
          <span>{article.trailType === "AB" ? "A → B" : "B → A"}</span>
        </p>
        <div className="flex items-center justify-between">
          <p className="mt-1 flex items-center gap-2 text-sm text-white/90">
            <FaRoute className="h-4 w-4 shrink-0" aria-hidden />
            <span>{article.lengthKm} km</span>
          </p>
          <div className="mt-1 flex items-center gap-2 text-sm text-white/90 capitalize">
            {article.destinationType.map(({ type }) => (
              <RouteIcon key={type} type={type} className="h-4 w-4 shrink-0" />
            ))}
          </div>
        </div>
      </span>
    </Link>
  );
}
