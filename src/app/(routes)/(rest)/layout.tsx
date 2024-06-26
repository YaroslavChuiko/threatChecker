import Header from "~/components/Header";
import { getServerAuthSession } from "~/server/auth";
import { generateRandomRows } from "~/utils/generate-random-rows";

const leftDecorRows = generateRandomRows(200, 3);
const rightDecorRows = generateRandomRows(200, 3);

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  console.log("session", session);

  const leftDecorRowsGroup = (
    <div className="animate-[vertical-ticker_120s_linear_infinite]">
      {leftDecorRows.map((row, i) => (
        <div
          key={i}
          className="text-center text-[4px] font-semibold text-primary/30"
        >
          {row}
        </div>
      ))}
    </div>
  );

  const rightDecorRowsGroup = (
    <div className="animate-[vertical-ticker_140s_linear_infinite]">
      {rightDecorRows.map((row, i) => (
        <div
          key={i}
          className="text-center text-[4px] font-semibold text-primary/30"
        >
          {row}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div
        className="pointer-events-none fixed left-3 top-0 select-none sm:hidden"
        aria-hidden="true"
      >
        {leftDecorRowsGroup}
        {leftDecorRowsGroup}
        <div className="absolute left-0 top-[35dvh] h-[6px] w-full bg-primary/60 after:absolute after:left-3 after:top-0 after:flex after:h-[14px] after:w-[14px] after:items-center after:justify-center after:bg-primary/60 after:text-sm after:font-semibold after:leading-none after:text-secondary after:content-['1'] md:hidden"></div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-[70dvh] origin-top-left -rotate-90 select-none whitespace-nowrap text-[9px] uppercase text-primary/40 sm:hidden"
      >
        00032 05 54 0B CP 00032 05 54 0B CP 00032 05 54 0B CP
      </div>
      <div
        className="pointer-events-none fixed right-3 top-0 select-none sm:hidden"
        aria-hidden="true"
      >
        {rightDecorRowsGroup}
        {rightDecorRowsGroup}
        <div className="absolute right-0 top-[25dvh] h-[6px] w-full bg-primary/60 after:absolute after:left-[-20px] after:top-0 after:flex after:h-[14px] after:w-[14px] after:items-center after:justify-center after:bg-primary/60 after:text-sm after:font-semibold after:leading-none after:text-secondary after:content-['2'] md:hidden"></div>
      </div>
      <div
        className="text-shadow-primary-md pointer-events-none  fixed bottom-1 left-1/2 -translate-x-1/4 select-none text-[10px] uppercase leading-none text-primary/50 sm:hidden"
        aria-hidden="true"
      >
        jhn 102 ckc 151 cc10 as5{" "}
        <span className=" relative top-[1px] text-xl">←</span>
      </div>
      <div className="pointer-events-none fixed bottom-5 left-[80vw] h-[6px] w-[6px] select-none bg-primary/60 after:absolute after:left-3 after:top-0 after:flex after:h-[14px] after:w-[14px] after:items-center after:justify-center after:bg-primary/60 after:text-sm after:font-semibold after:leading-none after:text-secondary after:content-['B'] sm:hidden"></div>

      <Header session={session} />
      <main className="flex grow flex-col px-10 pb-7 sm:px-4">{children}</main>
    </>
  );
}
