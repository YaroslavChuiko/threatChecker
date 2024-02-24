import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/Accordion";
import AttentionIcon from "~/components/icons/AttentionIcon";
import { ROUTES } from "~/routes";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

type Props = {
  searchParams: {
    query?: string;
  };
};

export default async function ResultsPage({ searchParams: { query } }: Props) {
  if (!query) {
    notFound();
  }

  // const data = await api.analyze.scan.mutate({ url: query });

  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
  // const session = await getServerAuthSession();

  return (
    <section className="flex grow content-start items-center justify-center">
      <div className="max-w-3xl ">
        <div className="grid grid-cols-[40px_minmax(200px,_580px)] items-end">
          <div className="relative flex h-[calc(100%-1px)] select-none items-center justify-between bg-primary text-lg font-medium leading-none text-secondary/90 shadow-[0px_0px_10px_3px] shadow-primary/20 before:absolute before:inset-y-16 before:right-0 before:z-10 before:block before:w-[1px] before:bg-secondary/90 before:content-['']">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-3 origin-top-left -rotate-90 whitespace-nowrap text-[9px] uppercase"
            >
              NC 382 248 40270 454540 9987
            </div>
          </div>
          <div className="flex flex-col items-start border border-primary bg-primary/5 pb-8 pt-8 shadow-[0px_0px_5px_2px] shadow-primary/20">
            <div className="mb-5 w-full px-6">
              <h2 className="text-shadow-primary-lg mb-5 w-full truncate text-lg  font-medium leading-none">
                https://github.com/vuejs/ecosystem-ci/actions/runs/8029583738/job/21936045284
              </h2>
              <div className="w-full border-b border-primary/30 pr-3" />
            </div>

            <div className="ml-6 mr-2 max-h-[550px] overflow-y-auto">
              <div className="pl-4 pr-8 mb-7">
                <div className="mb-6 flex items-center justify-center gap-2 text-base font-medium uppercase text-warning">
                  <AttentionIcon className="h-8 drop-shadow-warning-lg" />
                  <div className="text-shadow-warning-lg">
                    Hight security risc
                  </div>
                </div>
                <div className="relative mb-8">
                  <div className="mb-1 h-[5px] bg-warning/20 drop-shadow-warning-lg">
                    <div className="h-full w-[33%] bg-warning"></div>
                  </div>

                  <div className="text-shadow-warning-md flex items-center justify-between text-xs font-medium text-warning">
                    <div>Minimal</div>
                    <div>Low</div>
                    <div>Medium</div>
                    <div>High</div>
                    <div>Critical</div>
                  </div>
                </div>

                {/* <div className="text-shadow-warning-lg mb-3 text-sm text-warning">
                  <span className="text-base font-medium uppercase">
                    Possible attacks:{" "}
                  </span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati dignissimos placeat quod recusandae sit minus
                  officia, ipsam, impedit quasi quisquam hic. Error, quis.
                  Aperiam recusandae blanditiis vero repellendus, ea, in, autem
                  incidunt quae atque magni mollitia harum totam maiores
                  adipisci dolorem quis illo? Enim aliquid fugit nemo
                  necessitatibus facere dolor!
                </div> */}

                <div className="mb-3 flex flex-col items-center justify-center bg-warning px-6 py-2 text-sm  text-secondary drop-shadow-warning-lg">
                  <div className="font-bold uppercase">Access denied!</div>
                  <div className="font-medium">
                    <Link
                      href={ROUTES.AUTH.SIGNIN}
                      className="font-semibold underline"
                    >
                      Sign in
                    </Link>{" "}
                    to access the report and more details
                  </div>
                </div>
              </div>

              <div className="my-5 mr-4  border-b-[1px] border-primary/30" />

              <div className="mb-7 pl-4 pr-8 pt-2 ">
                <div className="mb-5 text-sm">
                  <span className="text-base font-medium uppercase">
                    URL Address:{" "}
                  </span>
                  https://github.com/vuejs/ecosystem-ci/actions/runs/8029583738/job/21936045284
                </div>
                <div className="mb-5 grid grid-cols-2 gap-3">
                  <div className=" text-base">
                    <span className="text-base font-medium uppercase">
                      IP Address:{" "}
                    </span>
                    151.101.1.197
                  </div>
                  <div className="text-base">
                    <span className="text-base font-medium uppercase">
                      Hosting:{" "}
                    </span>
                    N/A
                  </div>
                  <div className=" text-base">
                    <span className="text-base font-medium uppercase">
                      Server:{" "}
                    </span>
                    N/A
                  </div>
                  <div className=" text-base">
                    <span className="text-base font-medium uppercase">
                      CMS:{" "}
                    </span>
                    N/A
                  </div>
                  <div className=" text-base">
                    <span className="text-base font-medium uppercase">
                      Powered by:{" "}
                    </span>
                    N/A
                  </div>
                </div>
              </div>

              <Accordion className="mr-4" type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Internal links found</AccordionTrigger>
                  <AccordionContent className="max-h-[250px] overflow-y-auto">
                    <p>/work</p>
                    <p>/</p>
                    <p>/graphic-design</p>
                    <p>/art</p>
                    <p>/about</p>
                    <p>/contact</p>
                    <p>/quote</p>
                    <p>/social</p>
                    <p>/privacy-policy</p>
                    <p>/s/2nd-Amendment-Logo-Resource-3lne.zip</p>
                    <p>/s/4ST-Store-Logo-Resource-cybc.zip</p>
                    <p>/s/6th-Street-Gang-Logo-Resource-d3kz.zip</p>
                    <p>/s/18-Logo-Resource.zip</p>
                    <p>/s/24-7-Store-Logo-Resource-epah.zip</p>
                    <p>/s/54-News-logo-Resource.zip</p>
                    <p>/s/Aerondight-Logo-Resource.zip</p>
                    <p>/s/Aldecaldos-logo-Resource.zip</p>
                    <p>/s/All-Foods-Logo-Resources-z2xg.zip</p>
                    <p>/s/All-World-Insurance-Logo-Resource.zip</p>
                    <p>/s/Animals-Logo-Resource-ctk9.zip</p>
                    <p>/s/Aoba-logo-Resource.zip</p>
                    <p>/s/Arasaka-Logo-Resources-876x.zip</p>
                    <p>/s/Archer-logo-Resource.zip</p>
                    <p>/s/Archer-Tires-logo-Resource.zip</p>
                    <p>/s/Astoria-logo-resource.zip</p>
                    <p>/s/ATAK-Logo-Resource.zip</p>
                    <p>/s/Attuned-In-logo-Resource.zip</p>
                    <p>/s/Avante-Logo-Resource.zip</p>
                    <p>/s/Ballsy-logo-Resource.zip</p>
                    <p>/s/Battys-Hotel-logo-Resource.zip</p>
                    <p>/s/Bayside-Cachet-logo-Resource.zip</p>
                    <p>/s/Beep-logo-Resource.zip</p>
                    <p>/s/Below-Deck-logo-Resource-5xnx.zip</p>
                    <p>/s/Biotechnica-logo-Resource.zip</p>
                    <p>/s/Bliss-Logo-Resource-e57l.zip</p>
                    <p>/s/Bohemia-logo-Resource.zip</p>
                    <p>/s/Bolshevik-logo-Resource.zip</p>
                    <p>/s/Bottoms-at-the-Top-Resource.zip</p>
                    <p>/s/Brain-Wash-logo-Resource.zip</p>
                    <p>/s/Braindance-Caution-Tag-Resource-psrn.zip</p>
                    <p>/s/Braindance-logo-resource-2dc5.zip</p>
                    <p>/s/Braingasm-logo-Resource.zip</p>
                    <p>/s/Brennan-logo-Resource.zip</p>
                    <p>/s/Brooklyn-Barista-Logo-Resource-4jxw.zip</p>
                    <p>/s/Buck-A-Slice-Logo-Resource-p4h2.zip</p>
                    <p>/s/Budget-Arms-Resource.zip</p>
                    <p>/s/Bumelant-Logo-Resource-cewb.zip</p>
                    <p>/s/Burrito-XXL-logo-Resource.zip</p>
                    <p>/s/BuryGer-logo-Resource.zip</p>
                    <p>/s/Cali-Express-Logo-Resource-py5l.zip</p>
                    <p>/s/Capitan-Caliente-Logo-Resource-tplz.zip</p>
                    <p>/s/CC-Logo-Resources.zip</p>
                    <p>/s/Centzon-Totochtin-Resource-sbhp.zip</p>
                    <p>/s/Champaradise-logo-Resource.zip</p>
                    <p>/s/Channel-54-Logo-Resource.zip</p>
                    <p>/s/Checkered-Flags-logo-Resource.zip</p>
                    <p>/s/Chevillon-logo-Resource.zip</p>
                    <p>/s/Chromanticore-logo-Resource-6g39.zip</p>
                    <p>/s/Cinema-logo-resource-tcx8.zip</p>
                    <p>/s/Cirrus-Cola-Logos-Resource-brgj.zip</p>
                    <p>/s/Clouds-Clouds-logo-Resource.zip</p>
                    <p>/s/Combat-Cab-Logo-Resource-st95.zip</p>
                    <p>/s/Connected-Disconnected-icon-Resource-fghs.zip</p>
                    <p>/s/Constitutional-Arms-Resource-pa2t.zip</p>
                    <p>/s/Corp-Bud-logo-Resource.zip</p>
                    <p>/s/Cyberdeck-Module-logo-Resource.zip</p>
                    <p>/s/Cyberpunk-logo-Resource.zip</p>
                    <p>/s/Cyberware-Logo-Resource-x36y.zip</p>
                    <p>/s/Dakai-logo-Resource.zip</p>
                    <p>/s/Darra-Polytechnic-logo-Resource.zip</p>
                    <p>/s/Data-Inc-Logo-Resource-52s4.zip</p>
                    <p>/s/Ded-Zed-Logo-Resource.zip</p>
                    <p>/s/Delamain-Taxi-logo-resource-y9fx.zip</p>
                    <p>/s/Devils-Luck-logo-Resource-2rc3.zip</p>
                    <p>/s/Dewdrop-Inn-logo-Resource.zip</p>
                    <p>/s/Dex-Logo-Resources-wtyj.zip</p>
                    <p>/s/DTR_Logo.zip</p>
                    <p>/s/Dynalar-logo-Resource-74e3.zip</p>
                    <p>/s/Edgenet-logo-Resource.zip</p>
                    <p>/s/EezyBeef-logo-Resource.zip</p>
                    <p>/s/El-Coyote-Cojo-Logo-Resource.zip</p>
                    <p>/s/El-Guapo-Logo-Resource-cr9a.zip</p>
                    <p>/s/El-Pinche-Pollo-Logo-Resource.zip</p>
                    <p>/s/Electronic-Murderer-logo-Resource.zip</p>
                    <p>/s/Sample-Text-logo-Resource.zip</p>
                    <p>/s/Exit-Sign-Green-Resource-e5h5.zip</p>
                    <p>/s/Fingers-MD-logo-Resource.zip</p>
                    <p>/s/Foodscape-Logo-Resource-t6n9.zip</p>
                    <p>/s/Free-City-Beauty-logo-Resource.zip</p>
                    <p>/s/Fuyutsuki-Logo-Resource-4ysx.zip</p>
                    <p>/s/Gas-Logo-Resource.zip</p>
                    <p>/s/Got-Chrome-Logo-Resource.zip</p>
                    <p>/s/Grand-Imperial-Mall-logo-Resource-acz9.zip</p>
                    <p>/s/Guard-Pacc-logo-resource-w5zf.zip</p>
                    <p>/s/Hamra-Levantine-Cuisine-logo-Resource.zip</p>
                    <p>/s/Herrera-logo-Resource.zip</p>
                    <p>/s/Hot-Mess-Logo-Resource-92kf.zip</p>
                    <p>/s/Hotel-Marquess-logo-Resource.zip</p>
                    <p>/s/Hydro-Subsidium-logo-Resource.zip</p>
                    <p>/s/Infinity-Symbol-Logo-Resource.zip</p>
                    <p>/s/Insta-Food-logo-Resource.zip</p>
                    <p>/s/Jacked-and-Coke-logo-Resource.zip</p>
                    <p>/s/Jig-Jig-Street-logo-Resource.zip</p>
                    <p>/s/Jinguji-logo-Resource.zip</p>
                    <p>/s/Kabayan-Foods-Logo-Resource-bhrb.zip</p>
                    <p>/s/Kang-Tao-logo-Resource.zip</p>
                    <p>/s/Karaoke-logo-Resource.zip</p>
                    <p>/s/Kaukaz-logo-Resource.zip</p>
                    <p>/s/Kendachi-Logo-Resource.zip</p>
                    <p>/s/Khalil-Rousseau-Logo-Resource.zip</p>
                    <p>/s/King-Size-logo-Resource-cd8m.zip</p>
                    <p>/s/Kiroshi-logo-resource-tphl.zip</p>
                    <p>/s/Konpeki-Plaza-logo-Resource.zip</p>
                    <p>/s/Las-Palapas-logo-Resource.zip</p>
                    <p>/s/Lizzies-Bar-Logo-Resource.zip</p>
                    <p>/s/Lizzies-Logo-Resource.zip</p>
                    <p>/s/Lizzy-Wizzy-logo-Resource-839m.zip</p>
                    <p>/s/Loading-Archive-logo-Resource.zip</p>
                    <p>/s/Los-Osos-logo-Resource.zip</p>
                    <p>/s/Love-Hub-logo-Resource.zip</p>
                    <p>/s/Love-logo-Resource.zip</p>
                    <p>/s/Mac-N-Cheezus-Logo-Resource.zip</p>
                    <p>/s/Macroware-Logo-Resource-phna.zip</p>
                    <p>/s/Maelstrom-Logos-Resource-bshf.zip</p>
                    <p>/s/Mahir-logo-Resource.zip</p>
                    <p>/s/Makigai-logo-Resource.zip</p>
                    <p>/s/Malorian-logo-Resource.zip</p>
                    <p>/s/Mark-X-24-logo-resource-gx7e.zip</p>
                    <p>/s/Masala-Studios-Resource-dzlx.zip</p>
                    <p>/s/Matapang-Coffee-logo-Resource.zip</p>
                    <p>/s/Maxiwear-Logo-Resource.zip</p>
                    <p>/s/MAX-TAC-logo-Resource.zip</p>
                    <p>/s/Medtech-Logo-Resource-e9ms.zip</p>
                    <p>/s/Megapax-Export-logo-Resource.zip</p>
                    <p>/s/Metro-Logo-Resource-d5zx.zip</p>
                    <p>/s/Microwave-logo-Resource.zip</p>
                    <p>/s/Midnight-Arms-logo-Resource.zip</p>
                    <p>/s/Midnight-Lady-Logo-Resource.zip</p>
                    <p>/s/Milfguard-logo-Resource.zip</p>
                    <p>/s/Militech-Logo-Resources-w7xy.zip</p>
                    <p>/s/Mistys-Clock-design-Resource.zip</p>
                    <p>/s/Esoterica-logo-Resource.zip</p>
                    <p>/s/Mizutani-Logo-Resource.zip</p>
                    <p>/s/Moore-Logo-Resource.zip</p>
                    <p>/s/Mr-Stud-logo-resource.zip</p>
                    <p>/s/NC-Industries-Logo-Resource-ljed.zip</p>
                    <p>/s/NCART-logo-resource-jh8b.zip</p>
                    <p>/s/NCPD-logo-resource-mhhp.zip</p>
                    <p>/s/Netwatch-logo-resource-5nmc.zip</p>
                    <p>/s/New-Empire-logo-Resource.zip</p>
                    <p>/s/Next-Technology-logo-Resource.zip</p>
                    <p>/s/Nicola-logo-Resource-7h2g.zip</p>
                    <p>/s/Night-City-Hall-logo-resource.zip</p>
                    <p>/s/Night-City-Pin-logo-Resource.zip</p>
                    <p>
                      /s/Night-City-Police-Department-Full-logo-Resource.zip
                    </p>
                    <p>/s/Night-City-Vending-Machines-Logo-Resource.zip</p>
                    <p>/s/Nokota-logo-Resource.zip</p>
                    <p>/s/Numbers-Resource.zip</p>
                    <p>/s/Orbital-Air-logo-Resource-b3f4.zip</p>
                    <p>/s/Peep-Show-logo-Resource.zip</p>
                    <p>/s/Petrochem-logo-Resource.zip</p>
                    <p>/s/Planetran-logo-resource.zip</p>
                    <p>/s/Pierogi-World-logo-Resource.zip</p>
                    <p>/s/Piez-Logo-Resource-gy7e.zip</p>
                    <p>/s/Protocol-Logos-Resource.zip</p>
                    <p>/s/P-Sky-System-Logo-Resource.zip</p>
                    <p>/s/Pure-Overkill-logo-Resource.zip</p>
                    <p>/s/Quadra-Logo-Resource-wxtc.zip</p>
                    <p>/s/Rayfield-logo-Resource.zip</p>
                    <p>/s/RCS-Logo-Resource.zip</p>
                    <p>/s/Real-Water-logo-Resource.zip</p>
                    <p>/s/Relic-Logo-Resource.zip</p>
                    <p>/s/Riot-Logo-Resource-wrbk.zip</p>
                    <p>/s/Rostovic-logo-Resource.zip</p>
                    <p>/s/RX-7000F-Logo-Resource.zip</p>
                    <p>/s/Samurai-Logo-Resource.zip</p>
                    <p>/s/Sandblast-logo-Resource.zip</p>
                    <p>/s/Set-Sail-Logo-Resource.zip</p>
                    <p>/s/Shwab-logo-resource-hxzc.zip</p>
                    <p>/s/Softsys-Revised-Logo-Resource-7bbn.zip</p>
                    <p>/s/Sojasil-Machistador-Logo-Resource.zip</p>
                    <p>/s/Somos-la-Muerte-logo-Resource.zip</p>
                    <p>/s/Spunky-Monkey-Logo-Resource-m9px.zip</p>
                    <p>/s/Stand-Clear-logo-Resource.zip</p>
                    <p>/s/Tao-Industries-Logo-Resource-p6ds.zip</p>
                    <p>/s/Tengu-Logo-Resource.zip</p>
                    <p>/s/Textpohnka-logo-Resource.zip</p>
                    <p>/s/The-Afterlife-logo-resource.zip</p>
                    <p>/s/The-Atlantis-logo-Resource-b4ww.zip</p>
                    <p>/s/Madqueen-Show-Logo-Resource.zip</p>
                    <p>/s/The-Moxes-Logo-Resource.zip</p>
                    <p>/s/Thorton-logo-Resource-ex2j.zip</p>
                    <p>/s/Totentanz-Logo-Resource-kgnj.zip</p>
                    <p>/s/Toxic-Symbol-Resource.zip</p>
                    <p>/s/Trauma-Team-logo-Resources.zip</p>
                    <p>/s/Tsunami-logo-Resource.zip</p>
                    <p>/s/Turbo-Logo-Resource-neey.zip</p>
                    <p>/s/Tyger-Claws-Full-logo-Resource.zip</p>
                    <p>/s/Valentinos-Gang-Logo-Resource-638w.zip</p>
                    <p>/s/Vargas-Logo-Resource-zkfs.zip</p>
                    <p>/s/Villefort-logo-Resource.zip</p>
                    <p>/s/Voodoo-Boys-Logo-Resource-h74h.zip</p>
                    <p>/s/Warning-Labels-Resource.zip</p>
                    <p>/s/Wet-Dream-logo-Resource.zip</p>
                    <p>/s/WNS-News-logo-Resource.zip</p>
                    <p>/s/X9-Resource-54zm.zip</p>
                    <p>/s/Yaiba-logo-resource-54js.zip</p>
                    <p>/s/Zetatech-Logo-Resource-4pll.zip</p>
                    <p>/s/Ziggy-Q-logo-Resource.zip</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>External links found</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <div
          className="flex justify-between py-2 text-primary/60"
          aria-hidden="true"
        >
          <div
            className="text-shadow-primary-md flex select-none flex-col  items-start gap-[2px] text-[8px] uppercase leading-none"
            aria-hidden="true"
          >
            <span>Only CC35 certified and DMSF 5im class</span>
            <span>Officers are allowed to manipulate_Access</span>
            <span>or disable this device.</span>
          </div>
          <div
            className="text-shadow-primary-md flex select-none flex-col  items-start gap-[2px] text-[8px] uppercase leading-none"
            aria-hidden="true"
          >
            <span>loaded address: 0000020010000</span>
            <span>entry point: 0000020010000</span>
          </div>
        </div>
      </div>
    </section>
  );
}
