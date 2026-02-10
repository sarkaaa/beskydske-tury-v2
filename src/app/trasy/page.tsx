import ArticleTile from "@/components/ArticleTile";
import HeroHeader from "@/components/HeroHeader";
import { placeholderArticles } from "@/data/placeholder-articles";

export default function TrasyPage() {
  return (
    <>
      <HeroHeader title="Trasy" />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <ul className="mt-8 grid grid-cols-3 gap-5">
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
