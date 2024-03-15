import { getServerAuthSession } from "~/server/auth";
import Statistics from "./Statistics";

export default async function StatisticsPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return <div>You are not signed in</div>;
    // notFound();
  }

  return (
    <Statistics />
  );
}
