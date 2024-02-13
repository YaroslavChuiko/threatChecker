"use client";

import { AnimatePresence, motion } from "framer-motion";
import { generateRows } from "~/utils/generateTextRows";
import useAnimationVariants from "./useAnimationVariants";
import { ScanURLForm } from "~/components/forms/ScanURLForm";

const rows = generateRows(100, 500);

const Intro = () => {
  const { formVariants, introVariants, tickerVariants } =
    useAnimationVariants();

  const textGroup = (
    <div className="animate-[verticalTicker_60s_linear_infinite]">
      {rows.map((row, index) => (
        <div
          className="animate-[textGlitch_1.6s_linear_infinite] whitespace-pre font-main text-[12px] leading-tight text-[#7d9ddf]"
          // style={{ fontFamily: "Courier, monospace" }}
          key={index}
        >
          {row}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative h-screen w-full">
      <AnimatePresence>
        <motion.div
          className="absolute inset-x-12 bottom-12 top-[72px] z-50 flex items-center justify-center"
          variants={introVariants}
          initial="initial"
          animate="enter"
          transition={{
            type: "easeOut",
            duration: 1,
            delay: 0.3,
          }}
        >
          <motion.div
            className="z-20 mx-20 flex max-w-7xl flex-col items-center rounded-sm border-2 border-slate-600 bg-[#061434] p-12  text-center shadow-xl shadow-[rgba(8,11,22,.2)]"
            variants={formVariants}
            initial="initial"
            animate="enter"
            transition={{
              type: "easeOut",
              duration: 0.5,
              delay: 1,
            }}
          >
            <h2 className="mb-8 text-3xl leading-none">
              Free website malware and security checker
            </h2>
            <p className="mb-10 text-base text-slate-300">
              Enter a URL like example.com and the ThreatChecker scanner will
              check the website for known malware, viruses, blacklisting status,
              website errors, out-of-date software, and malicious code.
            </p>
            <ScanURLForm />
            <p className="mt-8 text-sm italic text-slate-400">
              <strong>Disclaimer:</strong> ThreatChecker is a free website
              security scanner. Remote scanners have limited access and results
              are not guaranteed.
            </p>
          </motion.div>
          <motion.div
            className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-[#061434] bg-[#061434] shadow-lg shadow-[rgba(8,11,22,.2)] "
            variants={tickerVariants}
            initial="initial"
            animate="enter"
            transition={{
              type: "easeOut",
              duration: 1,
              delay: 0.3,
            }}
          >
            <div className="bg-[rgb(6, 20, 52)] pointer-events-none absolute inset-0 h-full w-full select-none before:pointer-events-none before:absolute before:inset-0 before:z-10 before:block before:bg-gradient-scanlines  before:bg-size-scanlines before:blur-[0.5px] before:content-[''] ">
              {textGroup}
              {textGroup}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Intro;
