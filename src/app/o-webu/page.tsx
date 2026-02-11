import HeroHeader from "@/components/HeroHeader";
import Link from "next/link";
import Image from "next/image";
import me from "@/images/me.png";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function AboutPage() {
  return (
    <>
      <HeroHeader title="O webu" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            O Beskydských túrách
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Beskydské túry jsou webová stránka s tipy na pěší túry v
            Moravskoslezských Beskydech. Cílem je nabídnout přehledný výběr tras
            s důležitými informacemi na jednom místě — délka, převýšení,
            dostupnost dopravou a typ trasy — aby si každý mohl vybrat výlet
            podle svých možností.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Trasy jsou rozlišeny podle toho, jak se na ně dostanete a jak je
            ukončíte:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Z bodu A do bodu A</strong> — vhodné pro ty, kdo jedou
              autem. Start i cíl jsou na stejném místě, takže se po túře vracíte
              ke svému vozu.
            </li>
            <li>
              <strong>Z bodu A do bodu B</strong> — vhodné pro cestu vlakem nebo
              autobusem. Trasa končí jinde než začíná, přičemž začátek i konec
              jsou u veřejné dopravy (zastávka nebo nádraží).
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            U každé trasy najdete také mapu (Mapy.com), odkazy na dopravu a
            další detaily, které vám pomohou výlet naplánovat.
          </p>
        </section>
        <hr className="border-gray-200" />
        <section className="flex flex-col sm:flex-row gap-12 items-end justify-center">
          <div className="flex-3">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">O mně</h2>
            <p className="text-gray-700 leading-relaxed">
              Beskydské túry jsem vytvořila jako menší projekt, na kterém si
              rozšiřuji svoje technické znalosti. Zároveň jsem chtěla vytvořit
              něco, co neskončí v šuplíku a trochu pomůže naplánovat fajn výšlap.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Pokud mi to čas dovolí, ráda chodím na výlety do Beskyd. Na krátký
              odpolední popracovní výšlap nejraději chodím na Prašivou nebo
              Ondřejník, jinak mám ráda vrch Ostrý, Javorový nebo Lysou horu.
            </p>
          </div>
          <div className="flex-2 rounded-lg overflow-hidden">
            <Image src={me} alt="O mně" className="aspect-square object-cover" />
          </div>
        </section>
        <hr className="border-gray-200" />
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Technické řešení
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Projekt vznikl jako volnočasový projekt. Stránka je postavená na{" "}
            <strong>Next.js</strong> (React), <strong>TypeScriptu</strong>,{" "}
            <strong>Tailwind CSS</strong> a <strong>Playwright</strong>. Stránka běží na headless CMS Sanity.
            Mapy zobrazuji přes API od Mapy.com.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Celý kód je open-source a je veřejně dostupný na <Link
            href="https://github.com/sarkaaa/beskydske-tury-v2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            GitHubu <FaExternalLinkAlt className="ml-1 h-3 w-3" />
          </Link>. Ráda
            uvítám připomínky, nápady na vylepšení nebo pull requesty.
          </p>
          
        </section>
      </div>
    </>
  );
}
