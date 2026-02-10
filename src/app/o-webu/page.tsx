import HeroHeader from "@/components/HeroHeader";

export default function AboutPage() {
  return (
    <>
      <HeroHeader title="O webu" />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <h2>Co jsou Beskydské túry?</h2>
        <p>
          Beskydské túry je stránka, kde se turista může inspirovat vybranými
          trasami pro svůj výlet. Každá trasa obsahuje základní údaje o její
          délce, stoupání, dostupností (auto, bus, vlak) a typu trasy:
          <ul>
            <li>
              Z bodu A do bodu A: tyto trasy jsou vhodné pro turisty, kteří
              jezdí autem. Cíl každé této trasy je tedy na stejném místě jako
              její začátek.
            </li>
            <li>
              Z bodu A do bodu B: perfektní pro všechny turisty, kteří preferují
              transfer veřejnou dopravou a nejsou tedy vázání na to, aby se
              vrátili na stejné místo. Každá trasa, která je označena tímto
              typem tedy končí na jiném místě než začala. Jak počáteční bod, tak
              i ten konečný je v místě, kde je autobusová nebo vlaková zastávka
              (případně stanice).
            </li>
          </ul>
        </p>
        <p>image</p>
        <p>
          Celý projekt je moje “volnočasová” aktivita, kterou jsem vytvořila s
          cílem procvičit a rozšířit si své technické a programovací znalosti.
          Myšlenka vznikla už v roce 2020, ale pak přišly školní povinnosti a
          diplomka, práce, další jiné priority a celková realizace se tedy
          nakonec posunula bezmála o dva (!) roky. Více informací je popsání v
          sekci “Technická část”.
        </p>
        <h2>Technické informace</h2>
        <p>
          Beskydské túry vznikly tedy i proto, že jsem chtěla mít “svůj”
          komplexní “side project”, na kterém si rozšířím své technické
          znalosti. Delší dobu jsem přemýšlela nad tématikou takového
          volnočasového projektu, protože jsem nechtěla, aby skončil v šuplíku a
          pak mě napadly Beskydské túry. Během realizace jsem narazila na
          několik překážek, které se mi podařily relativně dobře vyřešit.
        </p>
        <p>
          Aktuálně dev stack je postaven na: React JS,Gatsby
          JS,styled-components, react-mapycz (velké dík autorovi za tuto
          knihovnu, která poskytuje v Reactu podklady/API od Mapy.cz!), Jest,
          Cypress,Strapi (+ Postgres) a backend aplikace je hostován na Heroku.
          Webová aplikace bude průběžně vylepšována v iteracích.
        </p>
        <p>
          Kód projektu je veřejný a dostupný na Githubu. Každý issue nebo pull
          request je vítán. Case study projektu je na tomto odkaze.
        </p>
      </div>
    </>
  );
}
