import HeroHeader from "@/components/HeroHeader";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroHeader title="Beskydské túry" subtitle="Pěší trasy v Beskydech" mainHeader />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <h3>O čem jsou Beskydské túry?</h3>
          <p>
            Beskydské túry je webová stránka s tipy na túry v Moravskoslezských
            Beskydech!
          </p>
          <p>
            Projekt jsem vytvořila jako volnočasovou aktivitu a celý kód je
            zveřejněný jako open-source na{" "}
            <a
              href="https://github.com/beskydsky-tury-v2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Githubu
            </a>
            .
          </p>
          <Link
            href="/o-webu"
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Více o Beskydských túrách
          </Link>
        </div>
        <div className="mt-12">
          <h3>Jak to funguje?</h3>
          <div className="flex flex-col sm:flex-row gap-12">
            <div>
              <span className="sr-only">První krok</span>
              <h4>Výběr trasy</h4>
              <p>
                Vyberte si ze seznamu tras pro Vás tu nejideálnější. Každá karta
                trasy obsahuje základní informace o délce trasy, typu trasy a
                dopravní dostupností (auto, autobus, vlak). Po rozkliknutí karty
                jsou zobrazeny podrobnosti o jednotlivé trase.
              </p>
            </div>
            <div>
              <span className="sr-only">Druhý krok</span>
              <h4>Zobrazení trasy v mapě</h4>
              <p>
                Každá trasa ve svém detailu obsahuje dynamický mapový podklad
                dostupný z Mapy.com od Seznamu. Každou trasu je možné si otevřít
                v nové záložce přímo na Mapy.cz a tak si trasu uložit do svého
                profilu.
              </p>
            </div>
            <div>
              <span className="sr-only">Třetí krok</span>
              <h4>Výběr trasy</h4>
              <p>
                Tadá! 🎉 Trasa je zvolená, mapa uložená, počasí zkontrolováno a
                teď už se jen stačí sbalit do batohu a s dobrou náladu (a
                telefonem s Mapy.cz aplikací) vyrazit na výlet.
              </p>
            </div>
          </div>
          <Link
            href="/trasy"
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Zobrazit všechny trasy
          </Link>
        </div>
      </div>
    </>
  );
}
