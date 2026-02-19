import type { SanityImageSource } from "@sanity/image-url";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type SanityDocument } from "next-sanity";
import { FaArrowLeft, FaArrowRight, FaChartLine, FaMapMarkerAlt, FaRoute } from "react-icons/fa";
import { RouteMapLazy } from "@/components/RouteMapLazy";
import { imageUrlFor } from "@/helpers/imageData";
import { getRouteLength, getRouteUrl } from "@/helpers/routeData";
import RouteIcon from "@/helpers/routeIcon";
import defaultHeaderImage from "@/images/header.png";
import { client } from "@/sanity/client";
import type { Article } from "@/types/article";

type Props = {
  params: Promise<{ slug: string }>;
};

const POST_QUERY_META = `*[_type == "post" && slug.current == $slug][0]{ title, image }`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await client.fetch<{
    title?: string;
    image?: SanityImageSource;
  } | null>(POST_QUERY_META, { slug }, options);

  const title = post?.title ?? "Trasa nenalezena";
  if (title === "Trasa nenalezena") return { title: "Trasa nenalezena" };

  const description = `Pěší trasa ${title}.`;
  const imageUrl =
    (post?.image && imageUrlFor(post.image)?.width(1200).height(630).url()) ??
    defaultHeaderImage.src;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function destinationLabel(type: "car" | "bus" | "train") {
  if (type === "train") return "Nádraží";
  if (type === "bus") return "Autobusová zastávka";
  return "Parkoviště";
}

function getDifficultyLabel(difficulty: Article["difficulty"]) {
  if (difficulty === "easy") return "Snadná";
  if (difficulty === "medium") return "Střední";
  if (difficulty === "hard") return "Těžká";
  return "";
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const options = { next: { revalidate: 30 } };

/** Build a minimal article from a Sanity post when there is no placeholder for this slug. */
function articleFromPost(
  slug: string,
  post?: SanityDocument & Partial<Omit<Article, "slug" | "imageUrl" | "image">>,
  imageUrl?: string | null,
): Article {
  return {
    slug,
    coords:
      post?.coords ??
      ({ origin: { lat: 0, lng: 0 }, destination: { lat: 0, lng: 0 } } as {
        origin: { lat: number; lng: number };
        destination: { lat: number; lng: number };
      }),
    waypoints: post?.waypoints ?? [],
    mode: post?.mode ?? "foot_hiking",
    title: post?.title ?? "Trasa",
    trailType: post?.trailType ?? "AA",
    sameWay: post?.sameWay ?? false,
    difficulty: post?.difficulty,
    destinationType: post?.destinationType ?? [],
    imageUrl: imageUrl ?? null,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const [, post] = await Promise.all([
    Promise.resolve(slug as string),
    client.fetch<SanityDocument>(POST_QUERY, { slug }, options),
  ]);

  if (!post) {
    notFound();
  }

  const postImageUrl = post.image ? imageUrlFor(post.image)?.url() : null;
  const article = articleFromPost(slug, post, postImageUrl ?? null);

  const {
    title,
    trailType,
    destinationType,
    imageUrl,
    difficulty,
    coords,
    mode,
    waypoints,
    sameWay,
  } = article;

  const trailLengthKm = await getRouteLength(coords, mode, waypoints, sameWay);

  return (
    <article>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="relative mt-10 min-h-[560px] rounded-xl sm:min-h-[420px]">
          <span className="absolute inset-0 block rounded-xl">
            <Image
              src={postImageUrl ?? imageUrl ?? defaultHeaderImage}
              alt={`${title} - ${trailType}`}
              fill
              className="rounded-xl object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </span>
          <span
            className="absolute inset-0 rounded-xl bg-linear-to-t from-black/70 via-black/70 to-transparent sm:via-black/20"
            aria-hidden
          />

          <Link
            href="/trasy"
            className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-white/90 p-2 font-medium text-amber-800 text-sm shadow-sm transition-colors hover:bg-white hover:text-amber-900 hover:ring-2 hover:ring-amber-800"
          >
            <FaArrowLeft className="h-5 w-5 shrink-0" />
            <span className="sr-only">Zpět na Trasy</span>
          </Link>

          <div className="absolute right-0 -bottom-[80px] left-0 z-10 p-4 sm:p-6">
            <h1 className="mb-4 font-semibold text-2xl text-white leading-tight drop-shadow-md sm:text-3xl">
              {title}
            </h1>

            <div className="relative z-10 rounded-xl border border-gray-100 bg-white p-4 shadow-md sm:p-5">
              <div
                className={`grid gap-3 sm:gap-4 ${article.destinationType.length > 1 ? "sm:grid-cols-3" : "sm:grid-cols-4"}`}
              >
                {article.trailType != null && (
                  <div className="flex items-start gap-3 border-gray-200 pr-2 sm:border-r">
                    <FaMapMarkerAlt className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                    <dl>
                      <dt className="font-bold text-amber-800 text-xs uppercase tracking-wide">
                        Typ trasy
                      </dt>
                      <dd className="mt-0.5 text-zinc-900">
                        {article.trailType === "AB" ? "A → B" : "A → A"}
                      </dd>
                    </dl>
                  </div>
                )}
                <div className="flex items-start gap-3 border-gray-200 pr-2 sm:border-r">
                  <FaRoute className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                  <dl>
                    <dt className="font-bold text-amber-800 text-xs uppercase tracking-wide">
                      Délka
                    </dt>
                    <dd className="mt-0.5 text-zinc-900">{trailLengthKm} km</dd>
                  </dl>
                </div>
                {difficulty != null && (
                  <div
                    className={`flex items-start gap-3 ${destinationType.length > 1 ? "" : "border-gray-200 pr-2 sm:border-r"}`}
                  >
                    <FaChartLine className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                    <dl>
                      <dt className="font-bold text-amber-800 text-xs uppercase tracking-wide">
                        Obtížnost
                      </dt>
                      <dd className="mt-0.5 text-zinc-900">{getDifficultyLabel(difficulty)}</dd>
                    </dl>
                  </div>
                )}
                {destinationType?.map((d: Article["destinationType"][number], i: number) => (
                  <div
                    key={`${d.type}-${d.origin}`}
                    className={`flex items-start gap-3 ${i === destinationType.length - 1 ? "" : "border-gray-200 pr-2 sm:border-r"}`}
                  >
                    <RouteIcon type={d.type} className="h-5 w-5 shrink-0 text-green-700" />
                    <dl>
                      <dt className="mb-2 font-bold text-amber-800 text-xs uppercase tracking-wide">
                        {destinationLabel(d.type)}
                      </dt>
                      <dd className="flex items-center gap-2">
                        <FaArrowRight className="h-3 w-3 shrink-0 text-green-700" />
                        <span className="text-zinc-900">{d.origin}</span>
                      </dd>
                      {trailType === "AB" && d.destination && (
                        <dd className="flex items-center gap-2">
                          <FaArrowLeft className="h-3 w-3 shrink-0 text-green-700" />
                          <span className="text-zinc-900">{d.destination}</span>
                        </dd>
                      )}
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="mt-12 py-8">
          <h2>Popis trasy</h2>
          <div className="text-zinc-900/80">
            {post && Array.isArray(post.body) ? (
              <PortableText value={post.body} />
            ) : (
              <p>Obsah nenalezen.</p>
            )}
          </div>
        </div>

        <div className="pb-8">
          <h2>Mapa</h2>
          <div className="mt-4">
            {article.coords.origin.lat &&
              article.coords.origin.lng &&
              article.coords.destination.lat &&
              article.coords.destination.lng && (
                <RouteMapLazy
                  apiKey={process.env.MAPY_API_KEY ?? ""}
                  coords={article.coords}
                  waypoints={article.waypoints}
                  mode={article.mode}
                  className="h-[450px] w-full rounded-lg"
                />
              )}
            <div className="flex justify-center">
              <a
                href={getRouteUrl(article.coords, article.mode, article.waypoints)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 rounded-md bg-amber-500 px-4 py-2 text-center text-white hover:bg-amber-600 hover:text-white focus:bg-amber-600 focus:text-white"
              >
                Otevřít mapu v Mapy.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
