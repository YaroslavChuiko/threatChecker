import React from "react";

// box-shadow: -10px 10px 0px 0px rgba(33,33,33,0.7),
// -20px 20px 0px 0px rgba(33,33,33,0.4),
// -30px 30px 0px 0px rgba(33,33,33,0.1);

// shadow-[-10px_10px_0px_0px_rgba(33,33,33,0.7),-20px_20px_0px_0px_rgba(33,33,33,0.4),-30px_30px_0px_0px_rgba(33,33,33,0.1)]

const Footer = () => {
  return (
    <footer className="absolute inset-x-6 bottom-4 flex h-16 select-none items-end bg-primary px-6 py-2 bg-noise shadow-[-5px_2px_1px_0px_rgba(169,215,164,0.2),-12px_4px_1px_0px_rgba(169,215,164,0.1),-18px_6px_1px_0px_rgba(169,215,164,0.04),5px_2px_1px_0px_rgba(169,215,164,0.2),12px_4px_1px_0px_rgba(169,215,164,0.1),18px_6px_1px_0px_rgba(169,215,164,0.04)]">
      <div className="flex w-full items-center justify-between font-medium text-secondary">
        <div>INTERFACE LOADED</div>
        <div className="pr-60">PROVIDED BY NEXUS NETWORK V10.8</div>
        <div>BUILD 6.47.48441.R15</div>
      </div>
    </footer>
  );
};

export default Footer;
