"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "~/routes";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { getServerAuthSession } from "~/server/auth";
import Logo from "../Logo";

const links = [
  { href: ROUTES.PUBLIC.HOME, label: "Home" },
  { href: ROUTES.PRIVATE.STATISTICS, label: "Statistics" },
];

type Props = {
  session: Awaited<ReturnType<typeof getServerAuthSession>>;
};

const Header = ({ session }: Props) => {
  const router = useRouter();

  const handleSignOut = () => {
    void signOut();
  };

  const handleSignIn = () => {
    router.push(ROUTES.AUTH.SIGNIN);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-14 pb-4 pt-4 text-white">
      <Logo />
      <nav className="absolute right-1/2 translate-x-1/2">
        <ul className="flex items-center gap-8 text-sm ">
          {links.map(({ href, label }) => (
            <li key={href} className="">
              <Link href={href} className="transition hover:text-indigo-400 border-transparent border-b hover:border-indigo-400">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="border border-dashed border-slate-400 bg-indigo-900/30 px-6 py-2 font-sans text-sm font-bold text-indigo-50  transition hover:bg-indigo-800"
        onClick={session ? handleSignOut : handleSignIn}
      >
        {session ? "Sign out" : "Sign in"}
      </button>
    </header>
  );
};
export default Header;
