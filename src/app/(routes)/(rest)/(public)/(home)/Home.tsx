import { ScanURLForm } from "~/components/forms/ScanURLForm";
import ProtocolIcon from "~/components/icons/ProtocolIcon";

const Home = () => {
  return (
    <section className="flex grow content-start items-center justify-center">
      <div className="max-w-2xl">
        <div className="relative flex h-10 w-[calc(100%-1px)] select-none items-center justify-between bg-primary px-5 text-lg font-medium leading-none text-secondary/90 shadow-[0px_0px_10px_3px] shadow-primary/20 before:absolute before:inset-x-4 before:bottom-0 before:z-10 before:block before:h-[1px] before:bg-secondary/90 before:content-['']">
          <span aria-hidden="true">CYBERSPACE SCANNING CONSOLE</span>
          <div
            className="flex select-none flex-col items-start gap-[3px] text-[5px] font-semibold text-secondary/90"
            aria-hidden="true"
          >
            <span>IMAGE TYPE: ARM SILVER KERNEL IMAGE</span>
            <span>(LZO COMPRESSED)</span>
            <span>LOAD ADDRESS: 0000020010000</span>
          </div>
        </div>
        <div className="flex flex-col items-start border border-primary bg-primary/5 px-6 py-8 shadow-[0px_0px_5px_2px] shadow-primary/20">
          <h2 className="text-shadow-primary-lg mb-5 text-xl font-medium uppercase leading-none">
            website malware and security checker
          </h2>
          <div className="ml-1">
            <p className="text-shadow-primary-md mb-6 text-sm">
              Enter a URL like example.com and the ThreatChecker scanner will
              check the website for known malware, viruses, blacklisting status,
              website errors, out-of-date software, and malicious code.
            </p>
            <ScanURLForm />
            <p className="text-shadow-primary-md mt-6 text-xs text-primary/70">
              <span className="font-semibold uppercase">Attention:</span>{" "}
              ThreatChecker is a free website security scanner. Remote scanners
              have limited access and results are not guaranteed.
            </p>
          </div>
        </div>
        <div
          className="flex justify-between py-2 text-primary/60"
          aria-hidden="true"
        >
          <div
            className="text-shadow-primary-md flex select-none flex-col  items-start gap-[2px] text-[8px] leading-none"
            aria-hidden="true"
          >
            <span>
              CUSTOM GLITCHES ON UI MAY APPEAR, BASED ON THIS ANALYSIS.
            </span>
            <span>DOCUMENT/D/1IIJTZLABKET3JDHXCDQDTCIIHWMIZ8ZZVBTDESD900</span>
            <span>TYPE: CYBERSPACE</span>
          </div>
          <ProtocolIcon className="h-6 drop-shadow-primary-md" />
        </div>
      </div>
    </section>
  );
};

export default Home;
