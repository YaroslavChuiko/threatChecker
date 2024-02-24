"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Button from "~/components/buttons/Button";
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
          <label htmlFor="url" className="text-primary ml-2 text-lg text-shadow-primary-lg">
            ENTER ADDRESS:
          </label>
          <input
            type="text"
            aria-label="url"
            id="url"
            className="border-primary bg-primary/10 text-primary placeholder-primary/70 h-[40px] w-full flex-grow border px-2 py-2 font-main font-medium shadow-[0px_0px_7px_1px]  shadow-primary/10 text-shadow-primary-md"
            {...register("url")}
          />
        </div>
        <Button
          variant="primary"
          type="submit"
          isLoading={isScanning}
        >
          {isScanning ? "Processing..." : "Scan Target"}
        </Button>
      </div>
      {errors?.url && (
        <div className="text-error flex items-center gap-2 font-main text-sm font-medium leading-none text-shadow-error-md">
          <AttentionIcon className="h-8 drop-shadow-error-lg" />
          <div>{errors.url.message}</div>
        </div>
      )}
    </form>
  );
}
