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
    <header className="mx-6 flex items-center justify-between border-b border-primary pb-3 pt-3 text-primary">
      <Logo className="h-4 drop-shadow-primary-lg" />
      <nav className="absolute right-1/2 translate-x-1/2 ">
        <ul className="flex items-center gap-9">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-lg font-medium uppercase  text-primary/80  transition hover:text-primary text-shadow-primary-lg"
                // className={clsx(
                //   "border-b border-transparent text-lg font-medium uppercase  text-primary/70  transition hover:text-primary",
                //   {
                //     "text-primary/100": pathname === href,
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
          className="border border-primary/30 bg-secondary/10 px-5 py-1 font-main text-sm font-normal uppercase text-primary  transition hover:border-primary/100 hover:bg-primary/10 active:bg-primary/70 active:text-secondary shadow-[0px_0px_7px_1px]  hover:shadow-primary/30 shadow-primary/10 text-shadow-primary-lg"
          onClick={session ? handleSignOut : handleSignIn}
        >
          {session ? "Sign out" : "Sign in"}
        </button>
      </div>
    </header>
  );
};

export default Header;
