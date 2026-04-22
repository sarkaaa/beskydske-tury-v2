import type { Metadata } from "next";
import type { SanityDocument } from "next-sanity";
import { Suspense } from "react";
import ArticleTile from "@/components/ArticleTile";
import HeroHeader from "@/components/HeroHeader";
import TrailFilters from "@/components/TrailFilters";
import { getRouteLength } from "@/helpers/routeData";
import { client } from "@/sanity/client";
import type { Article } from "@/types/article";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc){_id, title, slug, trailType, sameWay, destinationType, coords, mode, waypoints, imageUrl, image, difficulty}`;

const options = { next: { revalidate: 30 } };

export const metadata: Metadata = {
  title: "Trasy",
  description: "Přehled pěších tras v Moravskoslezských Beskydech.",
};

type SearchParams = Promise<{
  transport?: string;
  trailType?: string;
  length?: string;
  difficulty?: string;
}>;

export default async function TrasyPage({ searchParams }: { searchParams: SearchParams }) {
  const { transport, trailType, length, difficulty } = await searchParams;

  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  const activeTransport = transport?.split(",").filter(Boolean) ?? [];

  const preFiltered = posts.filter(({ trailType: tt, destinationType: dt, difficulty: diff }) => {
    if (trailType && tt !== trailType) return false;
    if (difficulty && diff !== difficulty) return false;
    if (activeTransport.length > 0) {
      const types = (dt as { type: string }[]).map(({ type }) => type);
      if (!activeTransport.some((t) => types.includes(t))) return false;
    }
    return true;
  });

  const postsWithLength = await Promise.all(
    preFiltered.map(async ({ _id, ...post }) => {
      const article = post as unknown as Article;
      const km = await getRouteLength(
        article.coords,
        article.mode,
        article.waypoints,
        article.sameWay,
      );
      return { _id, article, km };
    }),
  );

  const filtered = postsWithLength.filter(({ km }) => {
    if (!length) return true;
    if (length === "10") return km <= 10;
    if (length === "15") return km <= 15;
    if (length === "15plus") return km > 15;
    return true;
  });

  return (
    <>
      <HeroHeader title="Trasy" />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Suspense>
          <TrailFilters />
        </Suspense>
        {filtered.length > 0 ? (
          <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map(({ _id, article }) => (
              <li key={_id}>
                <ArticleTile article={article as unknown as Omit<Article, "difficulty">} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-12 text-center text-gray-500">
            Žádné trasy neodpovídají zvoleným filtrům.
          </p>
        )}
      </div>
    </>
  );
}
