"use client";

import { type BuiltInProviderType } from "next-auth/providers/index";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useEffect,
  type MouseEventHandler,
  type ReactNode,
  type MouseEvent,
} from "react";
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

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    router.prefetch(ROUTES.AUTH.SIGNUP_EMAIL);
  });

  const handleSignInProviderClick = (providerId: string) => {
    return (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      void signIn(providerId, {
        callbackUrl: searchParams.get("from") ?? ROUTES.PUBLIC.HOME,
      });
    };
  };

  const handleSignUpEmailClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push(`${ROUTES.AUTH.SIGNUP_EMAIL}?${searchParams.toString()}`);
  };

  return (
    <>
      <div className="text-shadow-primary-lg mb-[50px] mt-[50px] text-lg font-medium uppercase">
        Create an account
      </div>
      <div className="mb-10 flex flex-col gap-2 text-start">
        {providerButtons.map((provider) => (
          <Button
            key={provider.id}
            variant="secondary"
            onClick={handleSignInProviderClick(provider.id)}
          >
            {provider.icon}
            Sign up with{" "}
            {provider.id.charAt(0).toUpperCase() + provider.id.slice(1)}
          </Button>
        ))}
        <Button variant="secondary" onClick={handleSignUpEmailClick}>
          <EnvelopeIcon className="mr-3 h-4 w-4 drop-shadow-primary-lg" /> Sign
          up with Email
        </Button>
      </div>

      <div className="text-shadow-primary-md text-sm uppercase text-primary/80">
        Already have an account?{" "}
        <Link
          href={`${ROUTES.AUTH.SIGNIN}?${searchParams.toString()}`}
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </div>
    </>
  );
}
