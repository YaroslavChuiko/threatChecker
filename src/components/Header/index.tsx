"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "~/routes";
import clsx from "clsx";
import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { getServerAuthSession } from "~/server/auth";
import { cn } from "~/utils/cn";
import Logo from "../Logo";
import AttentionAltIcon from "../icons/AttentionAltIcon";
import { concealEmail } from "~/utils/conceal-email";

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
  const searchParams = useSearchParams();
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    router.prefetch(ROUTES.AUTH.SIGNIN);
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSignOut = () => {
    void signOut();
  };

  const handleSignIn = () => {
    router.push(
      `${ROUTES.AUTH.SIGNIN}?from=${pathname}?${searchParams.toString()}`,
    );
  };

  const loginButton = (
    <div className="flex items-center gap-10">
      {session?.user?.email ? (
        <div className="text-shadow-primary-md text-xs md:hidden">
          {concealEmail(session.user.email)}
        </div>
      ) : null}
      <button
        className="text-shadow-primary-lg relative mr-7 flex items-center gap-2 font-main text-base font-normal uppercase text-primary/80 transition hover:text-primary"
        onClick={session ? handleSignOut : handleSignIn}
      >
        <AttentionAltIcon className="h-[14px] drop-shadow-primary-lg" />
        {session ? "Sign out" : "Sign in"}

        <div
          className="pointer-events-none absolute bottom-[-18px] left-1 w-[110px] select-none text-left text-[4px] uppercase leading-none text-primary/60"
          aria-hidden="true"
        >
          Only CC35 certified and DMSF 5im class Officers are allowed to
          manipulate_Access or disable this device.
        </div>
      </button>
    </div>
  );

  const navMenu = (
    <nav className="bg-noise absolute bottom-[-3px] right-1/2 translate-x-1/2 bg-secondary p-1">
      <ul className="flex items-center gap-1">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`text-shadow-primary-lg ${cn(
                clsx(
                  "border-b-[3px] border-primary/30 px-3 py-1  text-lg font-medium uppercase  text-primary/70 transition hover:border-primary/90 hover:text-primary/90",
                  {
                    "border-primary/90 text-primary/90": pathname === href,
                  },
                ),
              )}`}
            >
              {label}
            </Link>
          </li>
        ))}
        {isMobile && loginButton}
      </ul>
    </nav>
  );

  return (
    <header className="relative mx-10 flex items-center justify-between border-b border-primary/70 pb-1 pt-7 text-primary/80">
      <div className="relative">
        <Logo className=" h-[15px] drop-shadow-primary-lg " />
        <div
          className="pointer-events-none absolute bottom-[-24px] left-0 flex select-none items-end gap-[2px] rounded bg-primary/80 px-1 text-[8px] font-medium  text-secondary drop-shadow-primary-lg"
          aria-hidden="true"
        >
          <span className="text-[3px] font-semibold">JI 0 VV55830</span> JNK 102
          CKC 151 CC10 AS5
        </div>
      </div>
      {isMobile ? (
        <div>
          {showMenu ? navMenu : null}
          <button
            className="text-shadow-primary-lg relative ml-7 flex items-center gap-2 font-main text-base font-normal uppercase text-primary/80 transition hover:text-primary"
            onClick={toggleMenu}
          >
            <AttentionAltIcon className="h-[14px] drop-shadow-primary-lg" />
            Menu
          </button>
        </div>
      ) : (
        navMenu
      )}

      {!isMobile && loginButton}
    </header>
  );
};

export default Header;
