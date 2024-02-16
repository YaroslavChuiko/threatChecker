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
    await signIn("email", {
      email,
      callbackUrl: ROUTES.PUBLIC.HOME,
      redirect: false,
    });
  };

  return (
    <>
      {isSubmitSuccessful ? (
        <SignInWithEmailResult email={getValues("email")} />
      ) : (
        <>
          <h2 className="mb-[30px] mt-[50px] text-lg font-medium uppercase">
            Sign in with email
          </h2>
          <div className="text-mainColor/80 mb-[50px] text-sm">
            Enter the email address associated with your account, and we&apos;ll
            send a magic link to your inbox.
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-10 flex flex-col gap-2 text-start"
          >
            <div className="flex flex-col gap-1 text-start">
              <label
                htmlFor="email"
                className="text-mainColor ml-2 font-medium uppercase"
              >
                ENTER Email:
              </label>
              <input
                aria-label="email"
                id="email"
                type="text"
                className="border-mainColor bg-mainColor/10 text-mainColor placeholder-mainColor/70 h-[40px] w-full flex-grow border px-2 py-2 font-main font-medium "
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
                "bg-mainColor text-secondaryColor hover:bg-mainColor/70 flex h-[40px] w-full min-w-[150px] flex-shrink-0 items-center justify-center px-6 py-2 font-main  text-base font-medium uppercase  transition",
                {
                  "animate-[buttonLoading_1.3s_linear_infinite] bg-gradient-to-r from-indigo-900 from-10% via-indigo-700 via-20% to-indigo-900 to-60% bg-[length:600px_50px]":
                    isSubmitting,
                },
              )}
            >
              Next
            </button>
          </form>
          <div className=" text-center">
            <Link
              href={ROUTES.AUTH.SIGNIN}
              className="text-mainColor text-sm font-medium uppercase hover:underline"
            >
              {"<"} All sign in options
            </Link>
          </div>
        </>
      )}
    </>
  );
}
