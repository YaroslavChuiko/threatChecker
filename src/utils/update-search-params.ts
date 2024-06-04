import { type ReadonlyURLSearchParams } from "next/navigation";

export const updateSearchParams = (
  searchParams: ReadonlyURLSearchParams,
  name: string,
  value: string,
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return params.toString();
};
