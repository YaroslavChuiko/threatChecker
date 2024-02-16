"use client";

import { type BuiltInProviderType } from "next-auth/providers/index";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type MouseEventHandler, type ReactNode } from "react";
import DiscordIcon from "~/components/icons/DiscordIcon";
import EnvelopeIcon from "~/components/icons/EnvelopeIcon";
import GithubIcon from "~/components/icons/GithubIcon";
import GoogleIcon from "~/components/icons/GoogleIcon";
import { ROUTES } from "~/routes";

type ProviderButton = {
  id: BuiltInProviderType;
  icon: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const providerButtons: ProviderButton[] = [
  {
    id: "google",
    icon: <GoogleIcon className="mr-3 h-4 w-4" />,
    onClick: () => {
      void signIn("google", { callbackUrl: ROUTES.PUBLIC.HOME });
    },
  },
  {
    id: "github",
    icon: <GithubIcon className="mr-3 h-4 w-4" />,
    onClick: () => {
      void signIn("github", { callbackUrl: ROUTES.PUBLIC.HOME });
    },
  },
  {
    id: "discord",
    icon: <DiscordIcon className="mr-3 h-4 w-4" />,
    onClick: () => {
      void signIn("discord", { callbackUrl: ROUTES.PUBLIC.HOME });
    },
  },
];

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(ROUTES.AUTH.SIGNIN_EMAIL);
  });

  const handleSignInEmailClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push(ROUTES.AUTH.SIGNIN_EMAIL);
  };

  return (
    <>
      <div className="mb-[50px] mt-[50px] text-lg uppercase font-medium">Sign in</div>
      <div className="mb-10 flex flex-col gap-2 text-start">
        {providerButtons.map((provider) => (
          <button
            key={provider.id}
            className="flex h-[40px] w-full items-center justify-center border border-mainColor/30 bg-mainColor/10 px-6 py-2 font-medium  uppercase text-mainColor  transition hover:border-mainColor/100 hover:bg-mainColor hover:bg-mainColor/20 active:bg-mainColor/70 active:text-secondaryColor"
            onClick={provider.onClick}
          >
            {provider.icon}
            Sign in with{" "}
            {provider.id.charAt(0).toUpperCase() + provider.id.slice(1)}
          </button>
        ))}
        <button
          className="flex h-[40px] w-full items-center justify-center border border-mainColor/30 bg-mainColor/10 px-6 py-2 font-medium  uppercase text-mainColor  transition hover:border-mainColor/100 hover:bg-mainColor hover:bg-mainColor/20 active:bg-mainColor/70 active:text-secondaryColor"
          onClick={handleSignInEmailClick}
        >
          <EnvelopeIcon className="mr-3 h-4 w-4" /> Sign in with Email
        </button>
      </div>

      <div className="text-sm text-mainColor/80 uppercase">
        Don&apos;t have an account?{" "}
        <Link
          href={ROUTES.AUTH.SIGNUP}
          className="text-mainColor hover:underline font-medium"
        >
          Sign up
        </Link>
      </div>
    </>
  );
}
