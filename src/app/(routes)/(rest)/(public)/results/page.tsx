import { notFound } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/Accordion";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import SecurityRiskStatusSection from "./SecurityRiskStatusSection";

type Props = {
  searchParams: {
    query?: string;
  };
};

export default async function ResultsPage({ searchParams: { query } }: Props) {
  if (!query) {
    notFound();
  }

  const session = await getServerAuthSession();
  const data = await api.analyze.scan.mutate({ url: query });

  if (!data) {
    notFound();
  }

  // await new Promise((resolve) => {
  //   setTimeout(resolve, 5000);
  // });

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
                {query}
              </h2>
              <div className="w-full border-b border-primary/30 pr-3" />
            </div>

            <div className="pl-6 pr-2 w-full">
              <div className="max-h-[550px] overflow-y-auto w-full">

                <SecurityRiskStatusSection vulnerabilityCoef={data.vulnerabilityCoef} session={session} /> 

                <div className="my-5 border-b-[1px] border-primary/30 mr-4" />

                <div className="mb-7 pl-4 pr-8 pt-2 ">
                  <div className="mb-3 text-sm">
                    <span className="text-base font-medium uppercase">
                      URL Address:{" "}
                    </span>
                    {query}
                  </div>
                  <div className="mb-5 grid grid-cols-2 gap-x-5 gap-y-3">
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

                <Accordion className="pr-4" type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Links found</AccordionTrigger>
                    <AccordionContent className="max-h-[250px] overflow-y-auto">
                      {data.foundLinks.length
                        ? data.foundLinks.map((link) => (
                            <p key={link}>{link}</p>
                          ))
                        : "No links found"}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>JavaScript included</AccordionTrigger>
                    <AccordionContent className="max-h-[250px] overflow-y-auto">
                      {data.referencedScriptLinks.length
                        ? data.referencedScriptLinks.map((link) => (
                            <p key={link}>{link}</p>
                          ))
                        : "No JavaScript included"}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
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
