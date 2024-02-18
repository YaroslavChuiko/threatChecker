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
      <div className="bg-mainColor flex items-center justify-center text-secondaryColor mx-4 py-3">
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
