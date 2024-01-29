import Link from "next/link";
import { ROUTES } from "~/routes";
import EyeIcon from "../icons/EyeIcon/Eye";

const links = [
  { href: ROUTES.PUBLIC.HOME, label: "Home" },
  { href: ROUTES.PRIVATE.STATISTICS, label: "Statistics" },
];

const Header = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-14 pb-4 pt-4 text-white">
      <Link
        className="flex items-center"
        href={ROUTES.PUBLIC.HOME}
      >
        <EyeIcon className="w-8 h-8" />
        <span className="pl-2 font-mono leading-none text-lg">ThreatMinder</span>
      </Link>
      <nav className="absolute right-1/2 translate-x-1/2">
        <ul className="flex items-center gap-6 font-sans font-bold text-sm">
          {links.map(({ href, label }) => (
            <li
              key={href}
              // className="rounded-full bg-white/10 px-5 py-2 font-sans font-bold transition hover:bg-white/20"
              className="transition hover:text-indigo-400"
            >
              <Link href={href} className="p-2">{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* <button className="rounded-full bg-yellow-900/20 px-5 py-2 font-sans font-bold text-yellow-50 backdrop-blur-sm transition hover:bg-yellow-900 hover:bg-opacity-100">
        Sign In
      </button> */}
      <button className="px-6 py-2 font-bold text-sm font-sans transition hover:bg-indigo-800 border border-dashed border-slate-400  bg-indigo-900/30 text-indigo-50">
        Sign In
      </button>
    </header>
  );
};
export default Header;
