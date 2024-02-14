"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "~/routes";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { getServerAuthSession } from "~/server/auth";
import Logo from "../Logo";
import { useEffect } from "react";
import { hideEmail } from "~/utils/hideEmail";
import clsx from "clsx";

const links = [
  { href: ROUTES.PUBLIC.HOME, label: "Home" },
  { href: ROUTES.PRIVATE.STATISTICS, label: "Statistics" },
];

type Props = {
  session: Awaited<ReturnType<typeof getServerAuthSession>>;
};

const Header = ({ session }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    router.prefetch(ROUTES.AUTH.SIGNIN);
  });

  const handleSignOut = () => {
    void signOut();
  };

  const handleSignIn = () => {
    router.push(ROUTES.AUTH.SIGNIN);
  };

  return (
    <header className="mx-4 flex items-center justify-between border-b border-[#ff3845] pb-5 pt-5 text-[#f75049]">
      <Logo className="h-8" />
      <nav className="absolute right-1/2 translate-x-1/2 ">
        <ul className="flex items-center gap-9">
          {links.map(({ href, label }) => (
            <li key={href} className="">
              <Link
                href={href}
                className="border-b border-transparent text-xl font-medium uppercase  text-[#f75049]/80  transition hover:text-[#f75049]"
                // className={clsx(
                //   "border-b border-transparent text-xl font-medium uppercase  text-[#f75049]/70  transition hover:text-[#f75049]",
                //   {
                //     "text-[#f75049]/100": pathname === href,
                //   },
                // )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-6">
        {session?.user?.email ? (
          <div className="text-sm">{hideEmail(session.user.email)}</div>
        ) : null}
        {/* !! add angled corner to btn */}
        <button
          className="border border-[#ff3845]/30 bg-[#0E0E17]/80 px-5 py-1 font-main text-sm font-normal uppercase text-[#ff3845]  transition hover:border-[#ff3845]/100 hover:bg-[#ff3845]/10 active:bg-[#ff3845]/70 active:text-[#0E0E17]"
          onClick={session ? handleSignOut : handleSignIn}
        >
          {session ? "Sign out" : "Sign in"}
        </button>
      </div>
    </header>
  );
};
export default Header;
