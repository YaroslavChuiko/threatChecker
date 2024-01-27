"use client";

import { type ElementRef, useRef, useEffect } from "react";
import { SendUrl } from "~/app/_components/send-url";
import { generateRows } from "~/utils/generateTextRows";

const Intro = () => {
  const rows = generateRows(100, 300);

  const container = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    window.addEventListener("mousemove", handleAnimation);

    return () => {
      window.removeEventListener("mousemove", handleAnimation);
    };
  }, []);

  const handleAnimation = () => {
    if (container.current) {
      window.addEventListener(
        "mousemove",
        animateTransformElement(container.current),
      );
    }
  };

  function animateTransformElement(element: HTMLElement) {
    return (mouseEvent: MouseEvent) => {
      window.requestAnimationFrame(() => transformElement(mouseEvent, element));
    };
  }

  function transformElement(mouseEvent: MouseEvent, element: HTMLElement) {
    const mouseX = mouseEvent.clientX;
    const mouseY = mouseEvent.clientY;
    const box = element?.getBoundingClientRect();

    const constraint = 1500;
    const perspective = 1500;
    const rotateY = (mouseX - box.x - box.width / 2) / constraint;
    const rotateX = (mouseY - box.y - box.height / 2) / constraint;

    element.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

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
    <div className="relative h-screen w-full bg-gradient-to-t from-[#060522] to-[#061434] to-70%">
      <div className="absolute inset-x-12 bottom-12 top-[72px] flex items-center justify-center">
        <div className="z-20 mx-20 flex max-w-7xl flex-col items-center rounded-sm border-2 border-slate-600 bg-[#061434] p-12  text-center shadow-xl shadow-[rgba(8,11,22,.2)]">
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
        <div
          ref={container}
          className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-[#061434] bg-[#061434] shadow-lg shadow-[rgba(8,11,22,.2)] "
        >
          <div className="bg-[rgb(6, 20, 52)] pointer-events-none absolute inset-0 h-full w-full select-none before:pointer-events-none before:absolute  before:inset-0 before:z-10 before:block before:bg-gradient-scanlines  before:bg-size-scanlines before:blur-[0.5px] before:content-[''] ">
            {textGroup}
            {textGroup}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
