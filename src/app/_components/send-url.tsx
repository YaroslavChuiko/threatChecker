"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { api } from "~/trpc/react";

export function SendUrl() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const sendUrl = api.analyze.scan.useMutation({
    onSuccess: () => {
      // router.refresh();
      setUrl("");
    },
  });

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sendUrl.isLoading) {
      return;
    }

    sendUrl.mutate({ url });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-[1fr_auto] w-full gap-5">
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={handleChange}
        className="w-full border border-slate-400 bg-slate-900 px-4 py-2 font-sans font-bold text-white"
      />
      <button
        type="submit"
        className={clsx(
          "border border-slate-400 bg-indigo-900 h-[60px] min-w-[200px] flex items-center justify-center font-sans font-bold text-indigo-50  transition hover:bg-indigo-800",
          {
            "animate-[buttonLoading_1.3s_linear_infinite] bg-gradient-to-r from-indigo-900 from-10% via-indigo-700 via-20% to-indigo-900 to-60% bg-[length:600px_50px]":
              sendUrl.isLoading,
          },
        )}
        disabled={sendUrl.isLoading}
      >
        {sendUrl.isLoading ? "Scanning..." : "Scan Website"}
      </button>
    </form>
  );
}
