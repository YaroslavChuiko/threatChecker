import Header from "~/components/Header";
import { getServerAuthSession } from "~/server/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();

  return (
    <>
      {/* <div className=" bg-gradient-to-b from-[#061434] to-[#060522] to-[70svh]"> */}
      <Header session={session}/>
      <main>{children}</main>
      {/* </div> */}
    </>
  );
}
