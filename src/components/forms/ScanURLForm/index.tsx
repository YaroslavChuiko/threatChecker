"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import AttentionIcon from "~/components/icons/AttentionIcon";
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
      <div className="flex w-full items-end gap-3">
        <div className="flex flex-grow flex-col text-start">
          <label htmlFor="url" className="text-mainColor ml-2 text-lg">
            ENTER ADDRESS:
          </label>
          <input
            type="text"
            aria-label="url"
            id="url"
            className="border-mainColor bg-mainColor/10 text-mainColor placeholder-mainColor/70 h-[40px] w-full flex-grow border px-2 py-2 font-main font-medium"
            {...register("url")}
          />
        </div>
        <button
          type="submit"
          className={clsx(
            "bg-mainColor text-secondaryColor hover:bg-mainColor/70 flex h-[40px] min-w-[150px] flex-shrink-0 items-start justify-start px-2 py-1 font-main text-base font-medium  uppercase transition",
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
        <div className="text-[#ff3845] flex items-center gap-2 font-main text-sm font-semibold leading-none">
          <AttentionIcon className="h-8 " />
          <div>{errors.url.message}</div>
        </div>
      )}
    </form>
  );
}
