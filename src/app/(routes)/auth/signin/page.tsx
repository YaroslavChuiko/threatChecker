"use client";

import { type BuiltInProviderType } from "next-auth/providers/index";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type MouseEvent, useEffect, type MouseEventHandler, type ReactNode } from "react";
import Button from "~/components/buttons/Button";
import DiscordIcon from "~/components/icons/DiscordIcon";
import EnvelopeIcon from "~/components/icons/EnvelopeIcon";
import GithubIcon from "~/components/icons/GithubIcon";
import GoogleIcon from "~/components/icons/GoogleIcon";
import { ROUTES } from "~/routes";

type ProviderButton = {
  id: BuiltInProviderType;
  icon: ReactNode;
};

const providerButtons: ProviderButton[] = [
  {
    id: "google",
    icon: <GoogleIcon className="mr-3 h-4 w-4 drop-shadow-primary-lg" />,
  },
  {
    id: "github",
    icon: <GithubIcon className="mr-3 h-4 w-4 drop-shadow-primary-lg" />,
  },
  {
    id: "discord",
    icon: <DiscordIcon className="mr-3 h-4 w-4 drop-shadow-primary-lg" />,
  },
];

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    router.prefetch(ROUTES.AUTH.SIGNIN_EMAIL);
  });

  const handleSignInProviderClick = (providerId: string) => {
    return (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      void signIn(providerId, { callbackUrl: searchParams.get("from") ?? ROUTES.PUBLIC.HOME });
    }
  }

  const handleSignInEmailClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push(`${ROUTES.AUTH.SIGNIN_EMAIL}?${searchParams.toString()}`);
  };

  return (
    <>
      <div className="mb-[50px] mt-[50px] text-lg font-medium uppercase text-shadow-primary-lg">
        Sign in
      </div>
      <div className="mb-10 flex flex-col gap-2 text-start">
        {providerButtons.map((provider) => (
          <Button
            key={provider.id}
            variant="secondary"
            onClick={handleSignInProviderClick(provider.id)}
          >
            {provider.icon}
            Sign in with{" "}
            {provider.id.charAt(0).toUpperCase() + provider.id.slice(1)}
          </Button>
        ))}
        <Button variant="secondary" onClick={handleSignInEmailClick}>
          <EnvelopeIcon className="mr-3 h-4 w-4 drop-shadow-primary-lg" /> Sign in with Email
        </Button>
      </div>

      <div className="text-sm uppercase text-primary/80 text-shadow-primary-lg">
        Don&apos;t have an account?{" "}
        <Link
          href={`${ROUTES.AUTH.SIGNUP}?${searchParams.toString()}`}
          className="font-medium text-primary hover:underline"
        >
          Sign up
        </Link>
      </div>
    </>
  );
}
