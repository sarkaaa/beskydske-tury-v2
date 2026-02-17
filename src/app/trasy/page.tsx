import type { Metadata } from "next";
import type { SanityDocument } from "next-sanity";
import ArticleTile from "@/components/ArticleTile";
import HeroHeader from "@/components/HeroHeader";
import { client } from "@/sanity/client";
import type { Article } from "@/types/article";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, trailType, sameWay, destinationType, coords, mode, waypoints, imageUrl, image}`;

const options = { next: { revalidate: 30 } };

export const metadata: Metadata = {
  title: "Trasy",
  description: "Přehled pěších tras v Moravskoslezských Beskydech.",
};

export default async function TrasyPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <>
      <HeroHeader title="Trasy" />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {posts.map(({ _id, ...post }) => (
            <li key={_id}>
              <ArticleTile article={post as unknown as Omit<Article, "difficulty">} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
