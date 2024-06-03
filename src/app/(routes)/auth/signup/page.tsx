"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, type MouseEvent, type MouseEventHandler } from "react";
import Button from "~/components/buttons/Button";
import { AUTH_PROVIDERS } from "~/constants/auth-providers";
import { ROUTES } from "~/routes";
import { getProviderIcon } from "~/services/provider-icon-service";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const EmailProviderIcon = getProviderIcon("email");

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
        {AUTH_PROVIDERS.map((provider) => {
          const Icon = getProviderIcon(provider);

          return (
            <Button
              key={provider}
              variant="secondary"
              onClick={handleSignInProviderClick(provider)}
            >
              <Icon className="mr-3 h-4 w-4 drop-shadow-primary-lg" />
              Sign up with {provider}
            </Button>
          );
        })}
        <Button variant="secondary" onClick={handleSignUpEmailClick}>
          <EmailProviderIcon className="mr-3 h-4 w-4 drop-shadow-primary-lg" />{" "}
          Sign up with Email
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
