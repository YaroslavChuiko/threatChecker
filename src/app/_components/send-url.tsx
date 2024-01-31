"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ROUTES } from "~/routes";

import { api } from "~/trpc/react";

export function SendUrl() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // const sendUrl = api.analyze.scan.useMutation({
  //   onSuccess: () => {
  //     // router.refresh();
  //     router.push(`${ROUTES.PUBLIC.RESULTS}?query=${url}`);
  //     setLoading(false);
  //     setUrl("");
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     setLoading(false);
  //   },
  // });

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (sendUrl.isLoading) {
    //   return;
    // }
    if (loading) {
      return;
    }

    setLoading(true); // when this comment was write there is no router events in App router

    // sendUrl.mutate({ url });
    router.push(`${ROUTES.PUBLIC.RESULTS}?query=${url}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-5">
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={handleChange}
        className="w-full flex-grow border border-slate-400 bg-slate-900 px-4 py-2 font-sans font-bold text-white"
      />
      <button
        type="submit"
        className={clsx(
          "flex h-[60px] min-w-[200px] flex-shrink-0 items-center justify-center border border-slate-400 bg-indigo-900 font-sans font-bold text-indigo-50  transition hover:bg-indigo-800",
          {
            "animate-[buttonLoading_1.3s_linear_infinite] bg-gradient-to-r from-indigo-900 from-10% via-indigo-700 via-20% to-indigo-900 to-60% bg-[length:600px_50px]":
              loading,
          },
        )}
        disabled={loading}
      >
        {loading ? "Scanning..." : "Scan Website"}
      </button>
    </form>
  );
}
