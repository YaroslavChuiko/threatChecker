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
    <form onSubmit={handleSubmit} className="flex w-full">
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={handleChange}
        className="w-full px-4 py-2 text-black font-sans font-bold rounded-l-xl bg-indigo-100"
      />
      <button
        type="submit"
        className="px-14 py-4 font-bold font-sans transition hover:bg-indigo-800 rounded-r-xl bg-indigo-800/60 text-indigo-50 backdrop-blur-sm"
        disabled={sendUrl.isLoading}
      >
        {sendUrl.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
