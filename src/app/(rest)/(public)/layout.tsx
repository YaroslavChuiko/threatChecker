import PageTransitionEffect from "./PageTransitionEffect";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageTransitionEffect>{children}</PageTransitionEffect>;
}
