import Link from "next/link";
import Image from "next/image";
import { FaBus, FaCar, FaMapMarkerAlt, FaRoute, FaTrain } from "react-icons/fa";
import type { Article } from "@/types/article";

function DestinationIcon({ type }: { type: "car" | "bus" | "train" }) {
  if (type === "train") return <FaTrain className="h-4 w-4 shrink-0" />;
  else if (type === "bus") return <FaBus className="h-4 w-4 shrink-0" />;
  else if (type === "car") return <FaCar className="h-4 w-4 shrink-0" />;
  return;
}

// TODO: Replace with actual default image
const DEFAULT_TILE_IMAGE =
  "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80";

type ArticleTileProps = {
  article: Article;
};

export default function ArticleTile({ article }: ArticleTileProps) {
  const imageUrl = article.imageUrl ?? DEFAULT_TILE_IMAGE;

  return (
    <Link
      href={`/trasy/${article.slug}`}
      className="group relative flex min-h-[400px] flex-col overflow-hidden rounded-lg shadow-sm transition-[border-color,shadow] hover:border-green-400 hover:shadow-md"
    >
      <span className="absolute inset-0 block">
        <Image
          src={imageUrl}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </span>
      <span
        className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"
        aria-hidden
      />
      <span className="relative flex flex-1 flex-col justify-end gap-0.5 p-4 text-white">
        <h2 className="tile-title">{article.title}</h2>
        <p className="mt-1 flex items-center gap-2 text-sm text-white/90">
          <FaMapMarkerAlt className="h-4 w-4 shrink-0" aria-hidden />
          <span>{article.trailType === "AB" ? "A → B" : "B → A"}</span>
        </p>
        <div className="flex justify-between items-center">
          <p className="mt-1 flex items-center gap-2 text-sm text-white/90">
            <FaRoute className="h-4 w-4 shrink-0" aria-hidden />
            <span>{article.lengthKm} km</span>
          </p>
          <div className="mt-1 flex items-center gap-2 text-sm capitalize text-white/90">
            {article.destinationType.map(({ type }) => (
              <DestinationIcon key={type} type={type} />
            ))}
          </div>
        </div>
      </span>
    </Link>
  );
}
