"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Button from "~/components/buttons/Button";
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
          <div className="mb-[50px] text-sm text-mainColor/80">
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
                className="ml-2 font-medium uppercase text-mainColor"
              >
                ENTER Email:
              </label>
              <input
                aria-label="email"
                id="email"
                type="text"
                className="h-[40px] w-full flex-grow border border-mainColor bg-mainColor/10 px-2 py-2 font-main font-medium text-mainColor placeholder-mainColor/70 "
                {...register("email")}
              />
              {errors?.email && (
                <div className="ml-2 font-main text-sm font-medium text-[#ff3845]">
                  {errors.email.message}
                </div>
              )}
            </div>
            <Button
              isLoading={isSubmitting}
              variant="primary"
              type="submit"
            >
              Next
            </Button>
          </form>
          <div className="text-center">
            <Link
              href={ROUTES.AUTH.SIGNIN}
              className="text-sm font-medium uppercase text-mainColor hover:underline"
            >
              {"<"} All sign in options
            </Link>
          </div>
        </>
      )}
    </>
  );
}
