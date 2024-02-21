"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import SignInWithEmailResult from "~/components/SignInWithEmailResult";
import Button from "~/components/buttons/Button";
import { ROUTES } from "~/routes";

const errorMessages = "Please enter a valid email address.";

const EmailSignUpSchema = z.object({
  email: z
    .string({
      required_error: errorMessages,
    })
    .trim()
    .email({
      message: errorMessages,
    }),
});

type EmailSignUpForm = z.infer<typeof EmailSignUpSchema>;

export default function SignUpWithEmailPage() {
  const {
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    getValues,
    handleSubmit,
  } = useForm<EmailSignUpForm>({
    resolver: zodResolver(EmailSignUpSchema),
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<EmailSignUpForm> = async ({ email }) => {
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
          <h2 className="mb-[30px] mt-[50px] text-lg font-medium uppercase text-shadow-primary-lg">
            Sign up with email
          </h2>
          <div className="mb-[50px] text-sm text-primary/80 text-shadow-primary-md">
            Enter your email address to create an account.
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-10 flex flex-col gap-2 text-start"
          >
            <div className="flex flex-col gap-1 text-start">
              <label
                htmlFor="email"
                className="ml-2 font-medium uppercase text-primary text-shadow-primary-lg"
              >
                ENTER Email:
              </label>
              <input
                aria-label="email"
                id="email"
                type="text"
                className="h-[40px] w-full flex-grow border border-primary bg-primary/10 px-2 py-2 font-main font-medium text-primary placeholder-primary/70 text-shadow-primary-md"
                {...register("email")}
              />
              {errors?.email && (
                <div className="ml-2 font-main text-sm font-medium text-error text-shadow-error-md">
                  {errors.email.message}
                </div>
              )}
            </div>
            <Button isLoading={isSubmitting} variant="primary" type="submit">
              Next
            </Button>
          </form>
          <div className="text-center">
            <Link
              href={ROUTES.AUTH.SIGNUP}
              className="text-sm font-medium uppercase text-primary hover:underline text-shadow-primary-lg"
            >
              {"<"} All sign up options
            </Link>
          </div>
        </>
      )}
    </>
  );
}
