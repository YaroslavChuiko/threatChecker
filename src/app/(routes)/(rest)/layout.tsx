import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { getServerAuthSession } from "~/server/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();
  console.log("session",session)

  return (
    <>
      <Header session={session}/>
      <main className="flex flex-col grow">{children}</main>
      {/* <Footer /> */}
    </>
  );
}
