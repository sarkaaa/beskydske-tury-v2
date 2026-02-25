import Link from "next/link";

export default function NotFound() {
  return (
    <div
      data-testid="not-found-container"
      className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6"
    >
      <p className="font-semibold text-6xltext-amber-600">404</p>
      <h1 data-testid="not-found-title" className="mt-4 font-semibold text-2xl text-zinc-900">
        Stránka nenalezena
      </h1>
      <p data-testid="not-found-description" className="mt-2 text-zinc-600">
        Tato stránka nebo trasa nebyla nalezena. ⚠️
      </p>
      <div className="mt-4 flex justify-center gap-4">
        <Link
          href="/"
          className="rounded-md border-2 border-amber-500 bg-white px-4 py-2 text-center text-amber-500 hover:border-amber-600 hover:bg-amber-600 hover:text-white focus:border-amber-600 focus:bg-amber-600 focus:text-white"
          data-testid="homepage-link"
        >
          Hlavní stránka
        </Link>
        <Link
          href="/trasy"
          className="rounded-md border-2 border-amber-500 bg-amber-500 px-4 py-2 text-center text-white hover:border-amber-600 hover:bg-amber-600 focus:border-amber-600 focus:bg-amber-600"
          data-testid="trails-link"
        >
          Zobrazit trasy
        </Link>
      </div>
    </div>
  );
}
