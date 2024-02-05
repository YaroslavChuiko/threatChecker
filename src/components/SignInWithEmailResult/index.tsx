"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ROUTES } from "~/routes";

type Props = {
  email: string;
};

const SignInWithEmailResult = ({ email }: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(ROUTES.PUBLIC.HOME);
  });

  return (
    <>
      <h2 className="mb-[30px] mt-[50px] text-lg">Check your inbox.</h2>
      <div className="mb-[50px] text-sm text-slate-400">
        Click the link we sent to {email} to sign in.
      </div>
      <button
        className="flex h-[44px] w-full items-center justify-center border border-slate-400 bg-indigo-900/30 px-6 py-2 font-sans text-sm font-bold text-indigo-50  transition hover:bg-indigo-800"
        onClick={() => {
          router.push(ROUTES.PUBLIC.HOME);
        }}
      >
        Ok
      </button>
    </>
  );
};

export default SignInWithEmailResult;
