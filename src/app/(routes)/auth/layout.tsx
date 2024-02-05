import Logo from "~/components/Logo";
import { generateRows } from "~/utils/generateTextRows";

const rows = generateRows(100, 300);

export default async function Layout({ children }: { children: React.ReactNode }) {

  const textGroup = (
    <div className="animate-[verticalTicker_60s_linear_infinite]">
      {rows.map((row, index) => (
        <div
          className="animate-[textGlitch_1.6s_linear_infinite] whitespace-pre font-mono text-[12px] leading-tight text-[#7d9ddf]"
          // style={{ fontFamily: "Courier, monospace" }}
          key={index}
        >
          {row}
        </div>
      ))}
    </div>
  );
  return (
    <main className="flex min-h-screen items-start justify-center">
      <div className="relative h-screen flex-grow">
        <div className="absolute inset-6 flex  items-center justify-center overflow-hidden rounded-3xl border-2 border-[#061434] bg-[#061434] shadow-lg shadow-[rgba(8,11,22,.2)] ">
          <div className="bg-[rgb(6, 20, 52)] pointer-events-none  absolute inset-0 h-full w-full select-none before:pointer-events-none before:absolute before:inset-0 before:z-10 before:block before:bg-gradient-scanlines  before:bg-size-scanlines before:blur-[0.5px] before:content-[''] ">
            {textGroup}
            {textGroup}
          </div>
        </div>
      </div>

      <div className="flex w-[400px] items-start justify-center px-10 py-[80px]">
        <div className="w-full flex-col pt-[60px] items-start justify-center text-center shadow-xl shadow-[rgba(8,11,22,.2)]">
          <Logo />
          {children}
        </div>
      </div>
    </main>
  );
}
