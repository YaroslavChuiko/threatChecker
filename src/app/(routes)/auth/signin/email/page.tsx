import Link from "next/link";
import { ROUTES } from "~/routes";

export default function SignInWithEmailPage() {
  return (
    <div>
      <h2 className="mb-[30px] mt-[50px] text-lg">Sign in with email</h2>
      <div className="mb-[50px] text-sm text-slate-400">
        Enter the email address associated with your account, and we&apos;ll
        send a magic link to your inbox.
      </div>
      <div className="mb-10 flex flex-col gap-5 text-start">
        <div className="flex flex-col gap-1 text-start">
          <label htmlFor="email" className="text-sm text-slate-400">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Your email address"
            className="h-[44px] w-full border border-slate-400 bg-slate-900 px-4 py-2 font-sans text-sm text-white"
          />
        </div>
        <button className="flex h-[44px] w-full items-center justify-center border border-slate-400 bg-indigo-900/30 px-6 py-2 font-sans text-sm font-bold text-indigo-50  transition hover:bg-indigo-800">
          Continue
        </button>
      </div>

      <div className="text-sm text-slate-400">
        <Link
          href={ROUTES.AUTH.SIGNIN}
          className="flex items-center justify-center text-indigo-400 hover:underline"
        >
          {"<"} All sign in options
        </Link>
      </div>
    </div>
  );
}
