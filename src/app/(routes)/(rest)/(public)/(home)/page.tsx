import Intro from "./Intro";

export default async function Home() {

  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-white ">
      <Intro />
    </section>
  );
}