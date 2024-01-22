import { SendUrl } from "~/app/_components/send-url";
import { generateRows } from "~/utils/generateTextRows";

const Intro = () => {
  const rows = generateRows(100, 300);

  const textGroup = (
    <div className="animate-[verticalTicker_60s_linear_infinite]">
      {rows.map((row, index) => (
        <div
          className="whitespace-pre font-mono text-[12.0442px] leading-tight text-[#7d9ddf]"
          key={index}
        >
          {row}
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-screen w-full bg-gradient-to-t from-[#060522] to-[#061434] to-30% p-10">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-[#061434] bg-[#061434] shadow-lg shadow-[rgba(8,11,22,.2)] ">
        <div className="t-[50%] r-[50%] absolute z-10 mx-28 flex max-w-6xl flex-col items-center rounded-lg bg-slate-700/50 p-12  text-center shadow-xl shadow-[rgba(8,11,22,.2)]  backdrop-blur-[5px]">
          <h2 className="mb-10 text-4xl">
            Free website malware and security checker
          </h2>
          <div className="mb-10 text-base">
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
