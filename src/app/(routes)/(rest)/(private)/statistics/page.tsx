import { getServerAuthSession } from "~/server/auth";
import Statistics from "./Statistics";
import { api } from "~/trpc/server";

export default async function StatisticsPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return <div>You are not signed in</div>;
    // notFound();
  }

  const statistics = await api.statistics.getLatestStatistics.query();

  return <Statistics statistics={statistics} />;
}
