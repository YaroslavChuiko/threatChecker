import Header from "~/components/Header";
import { getServerAuthSession } from "~/server/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();
  console.log("session",session)

  return (
    <>
      <Header session={session}/>
      <main>{children}</main>
      <footer className="absolute bottom-4 inset-x-4 h-16 px-6 py-2 flex items-end bg-[#ff3845] select-none">
        <div className="flex w-full items-center font-medium justify-between text-[#0E0E17]">
          <div>INTERFACE LOADED</div>
          <div className="pr-60">PROVIDED BY NEXUS NETWORK V10.8</div>
          <div>BUILD 6.47.48441.R15</div>
        </div>
      </footer>
    </>
  );
}
