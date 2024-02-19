import React from "react";

const Footer = () => {
  return (
    <footer className="absolute inset-x-4 bottom-4 flex h-16 select-none items-end bg-mainColor px-6 py-2 bg-noise">
      <div className="flex w-full items-center justify-between font-medium text-secondaryColor">
        <div>INTERFACE LOADED</div>
        <div className="pr-60">PROVIDED BY NEXUS NETWORK V10.8</div>
        <div>BUILD 6.47.48441.R15</div>
      </div>
    </footer>
  );
};

export default Footer;
