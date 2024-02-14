"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { ROUTES } from "~/routes";

const errorMessages =
  "Please enter a valid website URL. (e.g. https://www.example.com)";

const ScanUrlSchema = z.object({
  url: z
    .string({
      required_error: errorMessages,
    })
    .trim()
    .url({
      message: errorMessages,
    }),
});
//!! mb update url validation to allow only http and https

type ScanUrlForm = z.infer<typeof ScanUrlSchema>;

export function ScanURLForm() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ScanUrlForm>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(ScanUrlSchema),
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<ScanUrlForm> = ({ url }) => {
    if (isScanning) {
      return;
    }

    setIsScanning(true); // when this comment was write there is no router events in App router
    router.push(`${ROUTES.PUBLIC.RESULTS}?query=${url}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-5"
    >
      <div className="flex w-full gap-5">
        <input
          type="text"
          placeholder="https://www.example.com"
          className="h-[60px] w-full flex-grow border border-[#ff3845] bg-[#ff3845]/10 px-4 py-2 font-main font-bold text-[#ff3845] placeholder-[#ff3845]/70"
          {...register("url")}
        />
        <button
          type="submit"
          className={clsx(
            "flex h-[60px] min-w-[200px] flex-shrink-0 items-center justify-center bg-[#ff3845] font-main uppercase text-lg font-medium text-[#0E0E17]  transition hover:bg-[#ff3845]/70",
            {
              "animate-[buttonLoading_1.3s_linear_infinite] bg-gradient-to-r from-indigo-900 from-10% via-indigo-700 via-20% to-indigo-900 to-60% bg-[length:600px_50px]":
                isScanning,
            },
          )}
        >
          {isScanning ? "Processing..." : "Scan Website"}
        </button>
      </div>
      {errors?.url && (
        <div className="font-sans text-base font-bold text-rose-600">
          {errors.url.message}
        </div>
      )}
    </form>
  );
}
