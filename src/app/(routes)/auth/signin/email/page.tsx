"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import SignInWithEmailResult from "~/components/SignInWithEmailResult";
import { ROUTES } from "~/routes";

const errorMessages = "Please enter a valid email address.";

const EmailSignInSchema = z.object({
  email: z
    .string({
      required_error: errorMessages,
    })
    .trim()
    .email({
      message: errorMessages,
    }),
});

type EmailSignInForm = z.infer<typeof EmailSignInSchema>;

export default function SignInWithEmailPage() {
  const {
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    getValues,
    handleSubmit,
  } = useForm<EmailSignInForm>({
    resolver: zodResolver(EmailSignInSchema),
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<EmailSignInForm> = async ({ email }) => {
    await signIn("email", { email, callbackUrl: ROUTES.PUBLIC.HOME, redirect: false });
  };

  return (
    <>
      {isSubmitSuccessful ? (
        <SignInWithEmailResult email={getValues("email")} />
      ) : (
        <>
          <h2 className="mb-[30px] mt-[50px] text-lg">Sign in with email</h2>
          <div className="mb-[50px] text-sm text-slate-400">
            Enter the email address associated with your account, and we&apos;ll
            send a magic link to your inbox.
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-10 flex flex-col gap-5 text-start"
          >
            <div className="flex flex-col gap-1 text-start">
              <label htmlFor="email" className="text-sm text-slate-400">
                Email
              </label>
              <input
                aria-label="email"
                id="email"
                type="text"
                placeholder="Your email address"
                className="h-[44px] w-full border border-slate-400 bg-slate-900 px-4 py-2 font-sans text-sm text-white"
                {...register("email")}
              />
              {errors?.email && (
                <div className="font-sans text-sm font-bold text-rose-600">
                  {errors.email.message}
                </div>
              )}
            </div>
            <button
              className={clsx(
                "flex h-[44px] w-full items-center justify-center border border-slate-400 bg-indigo-900/30 px-6 py-2 font-sans text-sm font-bold text-indigo-50  transition hover:bg-indigo-800",
                {
                  "animate-[buttonLoading_1.3s_linear_infinite] bg-gradient-to-r from-indigo-900 from-10% via-indigo-700 via-20% to-indigo-900 to-60% bg-[length:600px_50px]":
                    isSubmitting,
                },
              )}
            >
              Next
            </button>
          </form>
          <div className="text-sm text-slate-400">
            <Link
              href={ROUTES.AUTH.SIGNIN}
              className="flex items-center justify-center text-indigo-400 hover:underline"
            >
              {"<"} All sign in options
            </Link>
          </div>
        </>
      )}
    </>
  );
}
