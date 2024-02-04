"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type MouseEventHandler, useEffect } from "react";
import { FaEnvelope, FaFacebook, FaGoogle } from "react-icons/fa6";
import { ROUTES } from "~/routes";

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(ROUTES.AUTH.SIGNIN_EMAIL);
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    router.push(ROUTES.AUTH.SIGNIN_EMAIL);
  };

  return (
    <div>
      <div className="mb-[50px] mt-[50px] text-lg">Sign in</div>
      <div className="mb-10 flex flex-col gap-3 text-start">
        <button
          className="flex h-[44px] w-full items-center justify-center border border-slate-400 bg-indigo-900/30 px-6 py-2 font-sans text-sm font-bold text-indigo-50  transition hover:bg-indigo-800"
          onClick={() => signIn("google", { callbackUrl: ROUTES.PUBLIC.HOME })}
        >
          <FaGoogle className="mr-3" size="16px" />
          Sign in with Google
        </button>
        <button className="flex h-[44px] w-full items-center justify-center border border-slate-400 bg-indigo-900/30 px-6 py-2 font-sans text-sm font-bold text-indigo-50  transition hover:bg-indigo-800">
          <FaFacebook className="mr-3" size="16px" /> Sign in with Facebook
        </button>
        <button
          className="flex h-[44px] w-full items-center justify-center border border-slate-400 bg-indigo-900/30 px-6 py-2 font-sans text-sm font-bold text-indigo-50  transition hover:bg-indigo-800"
          onClick={handleClick}
          // href={ROUTES.AUTH.SIGNIN_EMAIL}
        >
          <FaEnvelope className="mr-3" size="16px" /> Sign in with Email
        </button>
      </div>

      <div className="text-sm text-slate-400">
        Don&apos;t have an account?{" "}
        <Link href="#" className="text-indigo-400 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
