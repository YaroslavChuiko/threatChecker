import Footer from "~/components/Footer";
import Logo from "~/components/Logo";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-4"></div>
      <div className="bg-primary flex items-center justify-center text-secondary mx-6 py-3 bg-noise shadow-[-5px_-2px_1px_0px_rgba(169,215,164,0.2),-12px_-4px_1px_0px_rgba(169,215,164,0.1),-18px_-6px_1px_0px_rgba(169,215,164,0.04),5px_-2px_1px_0px_rgba(169,215,164,0.2),12px_-4px_1px_0px_rgba(169,215,164,0.1),18px_-6px_1px_0px_rgba(169,215,164,0.04)]">
        <Logo className="h-4" />
      </div>
      <main className="flex items-start justify-center">
        <div className="flex w-[400px] items-start justify-center px-10 py-[100px]">
          <div className="w-full flex-col items-center justify-center text-center">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
