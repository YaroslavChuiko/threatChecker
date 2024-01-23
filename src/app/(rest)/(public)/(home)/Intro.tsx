import { SendUrl } from "~/app/_components/send-url";
import { generateRows } from "~/utils/generateTextRows";

const Intro = () => {
  const rows = generateRows(100, 300);

  const textGroup = (
    <div className="animate-[verticalTicker_60s_linear_infinite]">
      {rows.map((row, index) => (
        <div
          className="whitespace-pre font-mono text-[14.0442px] leading-tight text-[#7d9ddf]"
          key={index}
        >
          {row}
        </div>
      ))}
    </div>
  );

  return (
    <div className="absolute top-24 inset-x-12 bottom-12">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-[#061434] bg-[#061434] shadow-lg shadow-[rgba(8,11,22,.2)] ">
        <div className="z-10 mx-20 flex max-w-7xl flex-col items-center rounded-2xl bg-slate-600/50 p-12  text-center shadow-xl shadow-[rgba(8,11,22,.2)]  backdrop-blur-[6px]">
        {/* bg-slate-700/50 */}
          <h2 className="mb-8 text-3xl">
            Free website malware and security checker
          </h2>
          <div className="mb-10 text-base text-slate-300">
            Enter a URL like example.com and the Sucuri SiteCheck scanner will
            check the website for known malware, viruses, blacklisting status,
            website errors, out-of-date software, and malicious code.
          </div>
          <SendUrl />
        </div>
        <div className="bg-[rgb(6, 20, 52)] before:z-2 pointer-events-none absolute inset-0 h-full w-full select-none blur-[0.5px] before:pointer-events-none before:absolute before:inset-0 before:block  before:bg-gradient-scanlines before:bg-size-scanlines before:content-['']">
          {textGroup}
          {textGroup}
        </div>
      </div>
    </div>
  );
};

export default Intro;
