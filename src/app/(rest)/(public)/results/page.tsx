import { notFound } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

type Props = {
  searchParams: {
    query?: string;
  };
};

export default async function ResultsPage({ searchParams: { query } }: Props) {
  if (!query) {
    notFound();
  }

  const data = await api.analyze.scan.mutate({ url: query });

  // await new Promise((resolve) => {
  //   setTimeout(resolve, 5000);
  // });
  // const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      {data?.vulnerabilityCoef ? (
        <p className="text-2xl text-white">{data.vulnerabilityCoef}</p>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
