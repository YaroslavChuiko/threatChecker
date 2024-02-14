"use client";

import { ScanURLForm } from "~/components/forms/ScanURLForm";

const Intro = () => {
  return (
    <div className="max-w-7xl">
      <div className="relative flex h-10 w-[calc(100%-1px)] items-center bg-[#ff3845] px-5 text-lg font-medium leading-none text-[#0E0E17]/90 before:absolute before:inset-x-4 before:bottom-0 before:z-10 before:block before:h-[1px] before:bg-[#0E0E17]/90 before:content-[''] ">
        <span>SYBERSPACE SCANNING CONSOLE</span>
      </div>
      <div className="flex flex-col items-center border border-[#ff3845] bg-[#ff3845]/10 p-12 text-center">
        <h2 className="mb-8 text-3xl font-medium uppercase leading-none">
          Free website malware and security checker
        </h2>
        <p className="mb-10 text-base ">
          Enter a URL like example.com and the ThreatChecker scanner will check
          the website for known malware, viruses, blacklisting status, website
          errors, out-of-date software, and malicious code.
        </p>
        <ScanURLForm />
        <p className="mt-8 text-sm text-[#ff3845]/70">
          <strong>Disclaimer:</strong> ThreatChecker is a free website security
          scanner. Remote scanners have limited access and results are not
          guaranteed.
        </p>
      </div>
    </div>
  );
};

export default Intro;
