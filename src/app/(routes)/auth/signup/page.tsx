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

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(ROUTES.AUTH.SIGNUP_EMAIL);
  });

  const handleSignInEmailClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push(ROUTES.AUTH.SIGNUP_EMAIL);
  };

  return (
    <>
      <div className="mb-[50px] mt-[50px] text-lg">Create an account</div>
      <div className="mb-10 flex flex-col gap-3 text-start">
        {providerButtons.map((provider) => (
          <button
            key={provider.id}
            className="flex h-[44px] w-full items-center justify-center border border-slate-400 bg-indigo-900/30 px-6 py-2 font-sans text-sm font-bold text-indigo-50  transition hover:bg-indigo-800"
            onClick={provider.onClick}
          >
            {provider.icon}
            Sign in with{" "}
            {provider.id.charAt(0).toUpperCase() + provider.id.slice(1)}
          </button>
        ))}
        <button
          className="flex h-[44px] w-full items-center justify-center border border-slate-400 bg-indigo-900/30 px-6 py-2 font-sans text-sm font-bold text-indigo-50  transition hover:bg-indigo-800"
          onClick={handleSignInEmailClick}
        >
          <EnvelopeIcon className="mr-3 h-4 w-4" /> Sign in with Email
        </button>
      </div>

      <div className="text-sm text-slate-400">
        Already have an account?{" "}
        <Link
          href={ROUTES.AUTH.SIGNIN}
          className="text-indigo-400 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </>
  );
}
