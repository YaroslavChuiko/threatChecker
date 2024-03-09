import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/Accordion";
import ChevronLeftIcon from "~/components/icons/ChevronLeftIcon";
import { ROUTES } from "~/routes";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import SecurityRiskStatusSection from "./SecurityRiskStatusSection";
import { formatBytes } from "~/utils/formatBytes";

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
  const result = await api.analysis.scanUrl.mutate({ url: query });

  if (result.status === 'error') {
    return <div>{result.error.message}</div>;
  }

  const {
    blacklistsAnalysis,
    foundLinks,
    possibleAttacks,
    referencedScriptLinks,
    securityRiskCoef,
    siteDetails,
  } = result.data;

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
          <div className="flex flex-col items-start border border-primary bg-primary/5 pb-8 pt-7 shadow-[0px_0px_5px_2px] shadow-primary/20">
            <div className="mb-5 w-full px-6">
              <div className="mb-4 flex items-center gap-1">
                <Link
                  href={ROUTES.PUBLIC.HOME}
                  className="leading-none text-primary drop-shadow-primary-lg"
                >
                  <ChevronLeftIcon className="h-[26px] w-[26px]" />
                </Link>
                <h2 className="w-full truncate text-lg font-medium  leading-none drop-shadow-primary-lg">
                  {query}
                </h2>
              </div>
              <div className="w-full border-b border-primary/30 pr-3" />
            </div>

            <div className="w-full pl-6 pr-2">
              <div className="max-h-[550px] w-full overflow-y-auto overflow-x-hidden">
                <SecurityRiskStatusSection
                  securityRiskCoef={securityRiskCoef}
                  possibleAttacks={possibleAttacks}
                  session={session}
                />

                <div className="my-5 mr-4 border-b-[1px] border-primary/30" />

                <div className="text-shadow-primary-lg mb-5 pl-4 pr-8 pt-2">
                  <div className="mb-3 text-sm">
                    <span className="text-base font-medium uppercase">
                      URL Address:{" "}
                    </span>
                    {query}
                  </div>
                  <div className="mb-3 text-lg font-medium uppercase">
                    <span className="text-base font-medium uppercase">
                      Blacklists:{" "}
                    </span>
                    {blacklistsAnalysis.stats.malicious}/
                    {Object.values(blacklistsAnalysis.stats).reduce(
                      (acc, curr) => acc + curr,
                      0,
                    )}
                  </div>
                  <div>
                    {blacklistsAnalysis.stats.malicious || "No"} security
                    vendors flagged this URL as malicious
                  </div>
                </div>
                <Accordion className="pr-4" type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>details</AccordionTrigger>
                    <AccordionContent className="max-h-[250px] overflow-y-auto">
                      {blacklistsAnalysis.results.length
                        ? blacklistsAnalysis.results.map(
                            ([vendorName, results]) => (
                              <p key={vendorName}>
                                <span className="font-medium">
                                  {vendorName}:
                                </span>{" "}
                                {results.result}
                              </p>
                            ),
                          )
                        : "No vendors found"}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="my-5 mr-4 border-b-[1px] border-primary/30" />

                <div className="text-shadow-primary-lg mb-7 space-y-3 pl-4 pr-8 pt-2">
                  <div className="text-base">
                    <span className="text-base font-medium uppercase">
                      Title:{" "}
                    </span>
                    {siteDetails.title || "N/A"}
                  </div>
                  <div className="text-base">
                    <span className="text-base font-medium uppercase">
                      content type:{" "}
                    </span>
                    {siteDetails.contentType ?? "N/A"}
                  </div>
                  <div className="text-base">
                    <span className="text-base font-medium uppercase">
                      Status:{" "}
                    </span>
                    200
                  </div>
                  <div className="text-base">
                    <span className="text-base font-medium uppercase">
                      connection:{" "}
                    </span>
                    {siteDetails.connection ?? "N/A"}
                  </div>
                  <div className=" text-base">
                    <span className="text-base font-medium uppercase">
                      Server:{" "}
                    </span>
                    {siteDetails.server ?? "N/A"}
                  </div>
                  <div className=" text-base">
                    <span className="text-base font-medium uppercase">
                      Body Length:{" "}
                    </span>
                    {siteDetails.contentLength
                      ? formatBytes(siteDetails.contentLength)
                      : "N/A"}
                  </div>
                </div>

                <Accordion className="pr-4" type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Links found</AccordionTrigger>
                    <AccordionContent className="max-h-[250px] overflow-y-auto">
                      {foundLinks.length
                        ? foundLinks.map((link, i) => <p key={i}>{link}</p>)
                        : "No links found"}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>JavaScript included</AccordionTrigger>
                    <AccordionContent className="max-h-[250px] overflow-y-auto">
                      {referencedScriptLinks.length
                        ? referencedScriptLinks.map((link, i) => (
                            <p key={i}>{link}</p>
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
