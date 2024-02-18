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
  { href: ROUTES.PUBLIC.HOME, label: "Scanning console" },
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
    <header className="mx-4 flex items-center justify-between border-b border-mainColor pb-3 pt-3 text-mainColor">
      <Logo className="h-4" />
      <nav className="absolute right-1/2 translate-x-1/2 ">
        <ul className="flex items-center gap-9">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                // className="border-b border-transparent text-lg font-medium uppercase  text-mainColor/80  transition hover:text-mainColor"
                className={clsx(
                  "border-b border-transparent text-lg font-medium uppercase  text-mainColor/70  transition hover:text-mainColor",
                  {
                    "text-mainColor/100": pathname === href,
                  },
                )}
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
          className="border border-mainColor/30 bg-secondaryColor/80 px-5 py-1 font-main text-sm font-normal uppercase text-mainColor  transition hover:border-mainColor/100 hover:bg-mainColor/10 active:bg-mainColor/70 active:text-secondaryColor"
          onClick={session ? handleSignOut : handleSignIn}
        >
          {session ? "Sign out" : "Sign in"}
        </button>
      </div>
    </header>
  );
};

export default Header;
