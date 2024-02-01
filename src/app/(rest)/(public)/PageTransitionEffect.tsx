"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";
import { useContext, type ReactNode, useRef } from "react";

type FrozenRouterProps = {
  children: ReactNode;
};
// https://stackoverflow.com/questions/77603249/how-to-make-a-page-transition-with-framer-motion-and-next-js-14
function FrozenRouter({ children }: FrozenRouterProps) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  if (!frozen) {
    return <>{children}</>;
  }

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

const variants = {
  hidden: { opacity: 0, x: 0, y: 100 }, // 200
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 100 },
};

type Props = {
  children: ReactNode;
};

export default function PageTransitionEffect({ children }: Props) {
  const key = usePathname();
  return (
    <AnimatePresence
      mode="popLayout" //? wait
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <motion.div
        key={key}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{
          type: "easeIn",
          duration: 0.5,
        }}
        // initial={{ x: 300, opacity: 0 }}
        // animate={{ x: 0, opacity: 1 }}
        // exit={{ x: 300, opacity: 0 }}
        // transition={{
        //   type: "spring",
        //   stiffness: 260,
        //   damping: 20,
        // }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
