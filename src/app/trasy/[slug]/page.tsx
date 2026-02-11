import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBus,
  FaCar,
  FaLevelDownAlt,
  FaLevelUpAlt,
  FaMapMarkerAlt,
  FaRoute,
  FaTrain,
} from "react-icons/fa";
import { getArticleBySlug } from "@/data/placeholder-articles";

const DEFAULT_HEADER_IMAGE =
  "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80";

function DestinationIcon({ type }: { type: "car" | "bus" | "train" }) {
  if (type === "train")
    return <FaTrain className="h-5 w-5 shrink-0 text-green-700" />;
  if (type === "bus")
    return <FaBus className="h-5 w-5 shrink-0 text-green-700" />;
  return <FaCar className="h-5 w-5 shrink-0 text-green-700" />;
}

function destinationLabel(type: "car" | "bus" | "train") {
  if (type === "train") return "Nádraží";
  if (type === "bus") return "Autobusová zastávka";
  return "Parkoviště";
}

type Props = {
  params: Promise<{ slug: string }>;
};

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
        <header className="relative mt-10 min-h-[560px] sm:min-h-[420px] rounded-xl">
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
            className="absolute inset-0 rounded-xl bg-linear-to-t from-black/70 via-black/70 sm:via-black/20 to-transparent"
            aria-hidden
          />

          <Link
            href="/trasy"
            className="absolute left-4 top-4 z-10 flex items-center gap-1 rounded-full bg-white/90 p-2 text-sm font-medium text-amber-800 hover:text-amber-900 hover:ring-2 hover:ring-amber-800 shadow-sm transition-colors hover:bg-white"
          >
            <FaArrowLeft className="h-5 w-5 shrink-0" />
            <span className="sr-only">Zpět na Trasy</span>
          </Link>

          <div className="absolute -bottom-[80px] left-0 right-0 p-4 sm:p-6 z-10">
            <div className="flex sm:items-center justify-between sm:flex-row flex-col">
              <h1 className="mb-4 text-2xl font-semibold leading-tight text-white drop-shadow-md sm:text-3xl">
                {article.title}
              </h1>
              <div className="mb-4 flex items-center gap-2 text-2xl font-bold text-white/90">
                <FaMapMarkerAlt className="h-5 w-5 shrink-0" />
                <span>
                  {article.trailType === "AB" ? "A → B" : article.trailType}
                </span>
              </div>
            </div>

            <div className="relative z-10 rounded-xl border border-gray-100 bg-white p-4 shadow-md sm:p-5">
              <div className={`grid gap-3 sm:gap-4 ${article.destinationType.length > 1 ? "sm:grid-cols-3" : "sm:grid-cols-4"}`}>
                <div className="flex items-start gap-3 sm:border-r border-gray-200 pr-2">
                  <FaRoute className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                  <dl>
                    <dt className="text-xs uppercase tracking-wide text-amber-800 font-bold">
                      Délka
                    </dt>
                    <dd className="mt-0.5 text-zinc-900">
                      {article.lengthKm} km
                    </dd>
                  </dl>
                </div>
                {article.ascentM != null && (
                  <div className="flex items-start gap-3 sm:border-r border-gray-200 pr-2">
                    <FaLevelUpAlt className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                    <dl>
                      <dt className="text-xs uppercase tracking-wide text-amber-800 font-bold">
                        Stoupání
                      </dt>
                      <dd className="mt-0.5 text-zinc-900">
                        {article.ascentM} m
                      </dd>
                    </dl>
                  </div>
                )}
                {article.descentM != null && (
                  <div className={`flex items-start gap-3 ${article.destinationType.length > 1 ? "" : " sm:border-r border-gray-200 pr-2"}`}>
                    <FaLevelDownAlt className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                    <dl>
                      <dt className="text-xs uppercase tracking-wide text-amber-800 font-bold">
                        Klesání
                      </dt>
                      <dd className="mt-0.5 text-zinc-900">
                        {article.descentM} m
                      </dd>
                    </dl>
                  </div>
                )}
                {article.destinationType.map((d, i) => (
                  <div key={i} className={`flex items-start gap-3 ${i === article.destinationType.length - 1 ? "" : "sm:border-r border-gray-200 pr-2"}`}>
                    <DestinationIcon type={d.type} />
                    <dl>
                      <dt className="text-xs uppercase tracking-wide text-amber-800 mb-2 font-bold">
                        {destinationLabel(d.type)}
                      </dt>
                      <dd className="flex items-center gap-2">
                          <FaArrowRight className="h-3 w-3 shrink-0 text-green-700" />
                          <span className="text-zinc-900">
                            {d.origin}
                          </span>
                      </dd>
                      {/* <div className="flex items-center gap-2">
                      </div> */}
                      {
                        d.destination &&
                        <dd className="flex items-center gap-2">
                          <FaArrowLeft className="h-3 w-3 shrink-0 text-green-700" />
                          <span className="text-zinc-900">
                            {d.destination}
                          </span>
                        </dd>
                      }
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="py-8 mt-12">
          <h2>Popis trasy</h2>
          <p className="text-zinc-900/80">
            Obsah článku bude načítán z Sanity CMS.
          </p>
        </div>

        <div className="pb-8">
          <h2>Mapa</h2>
          <div className="mt-4">
            {article.imageUrl && (
              <Image
                src={article.imageUrl}
                alt="Mapa trasy"
                width={1000}
                height={500}
                className="rounded-lg object-cover"
              />
            )}
            <div className="flex justify-center">
              <a
                href="#"
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
