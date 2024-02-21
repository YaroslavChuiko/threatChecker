"use client";

import { type BuiltInProviderType } from "next-auth/providers/index";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type MouseEventHandler, type ReactNode } from "react";
import Button from "~/components/buttons/Button";
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
    icon: <GoogleIcon className="mr-3 h-4 w-4 drop-shadow-primary-lg" />,
    onClick: () => {
      void signIn("google", { callbackUrl: ROUTES.PUBLIC.HOME });
    },
  },
  {
    id: "github",
    icon: <GithubIcon className="mr-3 h-4 w-4 drop-shadow-primary-lg" />,
    onClick: () => {
      void signIn("github", { callbackUrl: ROUTES.PUBLIC.HOME });
    },
  },
  {
    id: "discord",
    icon: <DiscordIcon className="mr-3 h-4 w-4 drop-shadow-primary-lg" />,
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

  const handleSignUpEmailClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push(ROUTES.AUTH.SIGNUP_EMAIL);
  };

  return (
    <>
      <div className="mb-[50px] mt-[50px] text-lg font-medium uppercase text-shadow-primary-lg">
        Create an account
      </div>
      <div className="mb-10 flex flex-col gap-2 text-start">
        {providerButtons.map((provider) => (
          <Button
            key={provider.id}
            variant="secondary"
            onClick={provider.onClick}
          >
            {provider.icon}
            Sign up with{" "}
            {provider.id.charAt(0).toUpperCase() + provider.id.slice(1)}
          </Button>
        ))}
        <Button variant="secondary" onClick={handleSignUpEmailClick}>
          <EnvelopeIcon className="mr-3 h-4 w-4 drop-shadow-primary-lg" /> Sign up with Email
        </Button>
      </div>

      <div className="text-sm uppercase text-primary/80 text-shadow-primary-md">
        Already have an account?{" "}
        <Link
          href={ROUTES.AUTH.SIGNIN}
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </div>
    </>
  );
}
