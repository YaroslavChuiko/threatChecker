import Link from "next/link";
import React from "react";
import EyeIcon from "../icons/EyeIcon";
import { ROUTES } from "~/routes";

const Logo = () => {
  return (
    <Link className="flex items-center justify-center" href={ROUTES.PUBLIC.HOME}>
      <EyeIcon className="h-8 w-8" />
      <span className="pl-2 font-mono text-lg leading-none">ThreatMinder</span>
    </Link>
  );
};

export default Logo;
