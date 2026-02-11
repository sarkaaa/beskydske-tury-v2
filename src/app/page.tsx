import type { Metadata } from "next";
import HeroHeader from "@/components/HeroHeader";
import Image from "next/image";
import Link from "next/link";
import icon1 from "@/images/icons/1.svg";
import icon2 from "@/images/icons/2.svg";
import icon3 from "@/images/icons/3.svg";
import hiker from "@/images/hiker.svg";
import { FaExternalLinkAlt } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Beskydské túry"
};

export default function Home() {
  return (
    <>
      <HeroHeader
        title="Beskydské túry"
        subtitle="Pěší trasy v Beskydech"
        mainHeader
      />
      <section className="mx-auto mt-8 max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-12 items-center justify-center">
          <div className="flex flex-1 flex-col gap-4 items-start">
            <h3>O čem jsou Beskydské túry?</h3>
            <p>
              Beskydské túry je webová stránka s tipy na túry v
              Moravskoslezských Beskydech!
            </p>
            <p>
              Projekt jsem vytvořila jako volnočasovou aktivitu a celý kód je
              zveřejněný jako open-source na{" "}
              <a
                href="https://github.com/beskydsky-tury-v2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                GitHubu <FaExternalLinkAlt className="ml-1 h-3 w-3" />
              </a>
              .
            </p>
            <Link
              href="/o-webu"
              className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600"
            >
              Více o Beskydských túrách
            </Link>
          </div>
          <div className="flex-1 rounded-lg overflow-hidden">
            <Image src={hiker} alt="Hiking" className="rounded-lg" />
          </div>
        </div>
        <hr className="border-gray-200 my-12" />
        <div className="mt-12">
          <h3 className="title-hp">Jak to funguje?</h3>
          <div className="flex flex-col sm:flex-row gap-12 items-stretch justify-center">
            <div className="flex flex-1 flex-col">
              <Image src={icon1} alt="První krok" />
              <span className="sr-only">První krok</span>
              <h4>Výběr trasy</h4>
              <p className="flex-1 relative">
                Vyberte si ze seznamu tras pro Vás tu nejideálnější. Každá karta
                trasy obsahuje základní informace o délce trasy, typu trasy a
                dopravní dostupností (auto, autobus, vlak). Po rozkliknutí karty
                jsou zobrazeny podrobnosti o jednotlivé trase.
                <span className="absolute top-0 left-0 font-extrabold text-green-800 text-9xl opacity-15" aria-hidden="true">1</span>
              </p>
            </div>
            <div className="flex flex-1 flex-col">
              <Image src={icon2} alt="Druhý krok" />
              <span className="sr-only">Druhý krok</span>
              <h4>Zobrazení trasy v mapě</h4>
              <p className="flex-1 relative">
                Každá trasa ve svém detailu obsahuje dynamický mapový podklad
                dostupný z Mapy.com od Seznamu. Každou trasu je možné si otevřít
                v nové záložce přímo na Mapy.cz a tak si trasu uložit do svého
                profilu.
                <span className="absolute top-0 left-0 font-extrabold text-green-800 text-9xl opacity-15" aria-hidden="true">2</span>
              </p>
            </div>
            <div className="flex flex-1 flex-col relative">
              <Image src={icon3} alt="Třetí krok" />
              <span className="sr-only">Třetí krok</span>
              <h4>Výběr trasy</h4>
              <p className="flex-1 relative">
                Tadá! 🎉 Trasa je zvolená, mapa uložená, počasí zkontrolováno a
                teď už se jen stačí sbalit do batohu a s dobrou náladu (a
                telefonem s Mapy.cz aplikací) vyrazit na výlet.
                <span className="absolute top-0 left-0 font-extrabold text-green-800 text-9xl opacity-15" aria-hidden="true">3</span>
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Link
              href="/trasy"
              className="bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600"
            >
              Zobrazit všechny trasy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
