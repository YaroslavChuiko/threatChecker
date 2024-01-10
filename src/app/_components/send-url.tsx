"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendUrl.mutate({ url });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={sendUrl.isLoading}
      >
        {sendUrl.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
