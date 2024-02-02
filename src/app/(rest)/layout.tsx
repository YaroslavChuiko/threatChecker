import Header from "~/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" bg-gradient-to-b from-[#061434] to-[#060522] to-[70svh]">
      <Header />
      <main>{children}</main>
    </div>
  );
}
