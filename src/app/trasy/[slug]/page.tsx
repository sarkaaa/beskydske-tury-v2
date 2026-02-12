import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RouteMapLazy } from "@/components/RouteMapLazy";
import { getArticleBySlug } from "@/data/placeholder-articles";

const DEFAULT_HEADER_IMAGE =
  "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Trasa nenalezena" };

  const title = article.title;
  const description = `Pěší trasa ${article.title} – ${article.lengthKm} km, ${article.trailType}. Dostupnost: ${article.destinationType.map((d) => d.type).join(", ")}.`;
  const imageUrl = article.imageUrl ?? DEFAULT_HEADER_IMAGE;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function DestinationIcon({ type }: { type: "car" | "bus" | "train" }) {
  if (type === "train") return <FaTrain className="h-5 w-5 shrink-0 text-green-700" />;
  if (type === "bus") return <FaBus className="h-5 w-5 shrink-0 text-green-700" />;
  return <FaCar className="h-5 w-5 shrink-0 text-green-700" />;
}

function destinationLabel(type: "car" | "bus" | "train") {
  if (type === "train") return "Nádraží";
  if (type === "bus") return "Autobusová zastávka";
  return "Parkoviště";
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const imageUrl = article.imageUrl ?? DEFAULT_HEADER_IMAGE;

  return (
    <article>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="relative mt-10 min-h-[560px] rounded-xl sm:min-h-[420px]">
          <span className="absolute inset-0 block rounded-xl">
            <Image
              src={imageUrl}
              alt={`${article.title} - ${article.trailType}`}
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
            <div className="flex flex-col justify-between sm:flex-row sm:items-center">
              <h1 className="mb-4 font-semibold text-2xl text-white leading-tight drop-shadow-md sm:text-3xl">
                {article.title}
              </h1>
              <div className="mb-4 flex items-center gap-2 font-bold text-2xl text-white/90">
                <FaMapMarkerAlt className="h-5 w-5 shrink-0" />
                <span>{article.trailType === "AB" ? "A → B" : article.trailType}</span>
              </div>
            </div>

            <div className="relative z-10 rounded-xl border border-gray-100 bg-white p-4 shadow-md sm:p-5">
              <div
                className={`grid gap-3 sm:gap-4 ${article.destinationType.length > 1 ? "sm:grid-cols-3" : "sm:grid-cols-4"}`}
              >
                <div className="flex items-start gap-3 border-gray-200 pr-2 sm:border-r">
                  <FaRoute className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                  <dl>
                    <dt className="font-bold text-amber-800 text-xs uppercase tracking-wide">
                      Délka
                    </dt>
                    <dd className="mt-0.5 text-zinc-900">{article.lengthKm} km</dd>
                  </dl>
                </div>
                {article.ascentM != null && (
                  <div className="flex items-start gap-3 border-gray-200 pr-2 sm:border-r">
                    <FaLevelUpAlt className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                    <dl>
                      <dt className="font-bold text-amber-800 text-xs uppercase tracking-wide">
                        Stoupání
                      </dt>
                      <dd className="mt-0.5 text-zinc-900">{article.ascentM} m</dd>
                    </dl>
                  </div>
                )}
                {article.descentM != null && (
                  <div
                    className={`flex items-start gap-3 ${article.destinationType.length > 1 ? "" : "border-gray-200 pr-2 sm:border-r"}`}
                  >
                    <FaLevelDownAlt className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                    <dl>
                      <dt className="font-bold text-amber-800 text-xs uppercase tracking-wide">
                        Klesání
                      </dt>
                      <dd className="mt-0.5 text-zinc-900">{article.descentM} m</dd>
                    </dl>
                  </div>
                )}
                {article.destinationType.map((d, i) => (
                  <div
                    key={`${d.type}-${d.origin}`}
                    className={`flex items-start gap-3 ${i === article.destinationType.length - 1 ? "" : "border-gray-200 pr-2 sm:border-r"}`}
                  >
                    <DestinationIcon type={d.type} />
                    <dl>
                      <dt className="mb-2 font-bold text-amber-800 text-xs uppercase tracking-wide">
                        {destinationLabel(d.type)}
                      </dt>
                      <dd className="flex items-center gap-2">
                        <FaArrowRight className="h-3 w-3 shrink-0 text-green-700" />
                        <span className="text-zinc-900">{d.origin}</span>
                      </dd>
                      {/* <div className="flex items-center gap-2">
                      </div> */}
                      {d.destination && (
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
          <p className="text-zinc-900/80">Obsah článku bude načítán z Sanity CMS.</p>
        </div>

        <div className="pb-8">
          <h2>Mapa</h2>
          <div className="mt-4">
            {article.imageUrl && (
              <RouteMapLazy
                apiKey={process.env.MAPY_API_KEY ?? ""}
                coords={article.coords}
                waypoints={article.waypoints}
                className="h-[450px] w-full rounded-lg"
              />
            )}
            <div className="flex justify-center">
              <a
                href="https://mapy.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-lg bg-amber-500 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-amber-600"
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
