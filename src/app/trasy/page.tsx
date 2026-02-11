import type { Metadata } from "next";
import ArticleTile from "@/components/ArticleTile";
import HeroHeader from "@/components/HeroHeader";
import { placeholderArticles } from "@/data/placeholder-articles";

export const metadata: Metadata = {
  title: "Trasy",
  description:
    "Přehled pěších tras v Moravskoslezských Beskydech. Vyberte si trasu podle délky, převýšení a dostupnosti vlakem, autobusem nebo autem.",
};

export default function TrasyPage() {
  return (
    <>
      <HeroHeader title="Trasy" />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <ul className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {placeholderArticles.map((article) => (
            <li key={article.slug}>
              <ArticleTile article={article} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
