"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { api } from "~/trpc/react";

export function SendUrl() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const sendUrl = api.analyze.scan.useMutation({
    onSuccess: () => {
      router.refresh();
      setUrl("");
    },
  });

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendUrl.mutate({ url });
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-4">
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={handleChange}
        className="w-full px-4 py-2 text-white font-sans font-bold border border-slate-400 bg-slate-900"
      />
      <button
        type="submit"
        className="px-14 py-4 font-bold font-sans transition hover:bg-indigo-800 border border-slate-400  bg-indigo-900 text-indigo-50"
        disabled={sendUrl.isLoading}
      >
        {sendUrl.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
