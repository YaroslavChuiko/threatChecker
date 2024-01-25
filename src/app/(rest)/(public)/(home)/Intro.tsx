import { SendUrl } from "~/app/_components/send-url";
import { generateRows } from "~/utils/generateTextRows";

const Intro = () => {
  const rows = generateRows(100, 300);

  const textGroup = (
    <div className="animate-[verticalTicker_60s_linear_infinite]">
      {rows.map((row, index) => (
        <div
          className="animate-[textGlitch_1.6s_linear_infinite] whitespace-pre font-mono text-[12px] leading-tight text-[#7d9ddf]"
          style={{ fontFamily: "Courier, monospace" }}
          key={index}
        >
          {row}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative h-screen w-full bg-gradient-to-t from-[#060522] to-[#061434] to-30%">
      <div className="absolute inset-x-12 bottom-12 top-[72px]">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-[#061434] bg-[#061434] shadow-lg shadow-[rgba(8,11,22,.2)] ">
          <div className="z-10 mx-20 flex max-w-7xl flex-col items-center rounded-2xl bg-slate-600/50 p-12  text-center shadow-xl shadow-[rgba(8,11,22,.2)]  backdrop-blur-[6px]">
            {/* bg-slate-700/50 */}
            <h2 className="mb-8 text-3xl leading-none">
              Free website malware and security checker
            </h2>
            <p className="mb-10 text-base text-slate-300">
              Enter a URL like example.com and the ThreatChecker scanner will
              check the website for known malware, viruses, blacklisting status,
              website errors, out-of-date software, and malicious code.
            </p>
            <SendUrl />
            <p className="mt-8 text-sm italic text-slate-400">
              <strong>Disclaimer:</strong> ThreatChecker is a free website
              security scanner. Remote scanners have limited access and results
              are not guaranteed.
            </p>
          </div>
          <div className="bg-[rgb(6, 20, 52)] before:z-2 pointer-events-none absolute inset-0 h-full w-full select-none blur-[0.5px] before:pointer-events-none before:absolute before:inset-0 before:block  before:bg-gradient-scanlines before:bg-size-scanlines before:content-[''] ">
            {textGroup}
            {textGroup}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
