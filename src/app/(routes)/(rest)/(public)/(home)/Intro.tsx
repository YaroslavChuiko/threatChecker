"use client";

import { ScanURLForm } from "~/components/forms/ScanURLForm";
import ProtocolIcon from "~/components/icons/ProtocolIcon";

const Intro = () => {
  return (
    <div className="max-w-3xl">
      <div className="relative flex h-10 w-[calc(100%-1px)] items-center justify-between bg-[#ff3845] px-5 text-lg font-medium leading-none text-[#0E0E17]/90 before:absolute before:inset-x-4 before:bottom-0 before:z-10 before:block before:h-[1px] before:bg-[#0E0E17]/90 before:content-[''] ">
        <span>SYBERSPACE SCANNING CONSOLE</span>
        <div
          className="flex select-none flex-col items-start gap-[3px] text-[5px] font-semibold text-[#0E0E17]/90"
          aria-hidden="true"
        >
          <span>IMAGE TYPE: ARM SILVER KERNEL IMAGE</span>
          <span>(LZO COMPRESSED)</span>
          <span>LOAD ADDRESS: 0000020010000</span>
        </div>
      </div>
      <div className="flex flex-col items-start border border-[#ff3845] bg-[#ff3845]/5 px-5 py-6">
        <h2 className="mb-5 text-xl font-medium uppercase leading-none">
          website malware and security checker
        </h2>
        <div className="ml-1">
          <p className="mb-6 text-sm ">
            Enter a URL like example.com and the ThreatChecker scanner will
            check the website for known malware, viruses, blacklisting status,
            website errors, out-of-date software, and malicious code.
          </p>
          <ScanURLForm />
          <p className="mt-6 text-sm text-[#ff3845]/70">
            <strong>Attention:</strong> ThreatChecker is a free website security
            scanner. Remote scanners have limited access and results are not
            guaranteed.
          </p>
        </div>
      </div>
      <div
        className="flex justify-between py-2 text-[#ff3845]/60"
        aria-hidden="true"
      >
        <div
          className="flex select-none flex-col items-start  gap-[2px] text-[9px] leading-none"
          aria-hidden="true"
        >
          <span>CUSTOM GLITCHES ON UI MAY APPEAR, BASED ON THIS ANALYSIS.</span>
          <span>DOCUMENT/D/1IIJTZLABKET3JDHXCDQDTCIIHWMIZ8ZZVBTDESD900</span>
          <span>TYPE: CYBERSPACE</span>
        </div>
        <ProtocolIcon className="h-6" />
      </div>
    </div>
  );
};

export default Intro;
