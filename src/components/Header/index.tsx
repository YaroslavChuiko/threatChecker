import Image from "next/image";
import Link from "next/link";
import Logo from "~/assets/MJ_LogoType.png";
import { ROUTES } from "~/routes";

const links = [
  { href: ROUTES.PUBLIC.HOME, label: "Home" },
  { href: ROUTES.PRIVATE.STATISTICS, label: "Statistics" },
];

const Header = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-14 pb-8 pt-6 text-white">
      <Link
        className="absolute right-1/2 translate-x-1/2"
        href={ROUTES.PUBLIC.HOME}
      >
        <Image width={230} height={30} src={Logo.src} alt="" />
      </Link>
      <nav className="">
        <ul className="flex items-center gap-4 font-sans font-bold">
          {links.map(({ href, label }) => (
            <li
              key={href}
              // className="rounded-full bg-white/10 px-5 py-2 font-sans font-bold transition hover:bg-white/20"
            >
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className="rounded-full bg-yellow-900/20 px-5 py-2 font-sans font-bold text-yellow-50 backdrop-blur-sm transition hover:bg-yellow-900 hover:bg-opacity-100">
        Sign In
      </button>
    </header>
  );
};

export default Header;
