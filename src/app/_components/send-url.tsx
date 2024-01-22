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
        className="w-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="bg-white/10 px-14 py-4 font-semibold transition hover:bg-white/20"
        disabled={sendUrl.isLoading}
      >
        {sendUrl.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
