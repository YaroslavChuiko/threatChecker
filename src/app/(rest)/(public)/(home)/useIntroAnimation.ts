import { useEffect, useRef } from "react";

const useIntroAnimation = () => {
  // const initialValue =
  //   typeof window !== "undefined"
  //     ? (JSON.parse(
  //         window?.sessionStorage?.getItem("showIntroAnimation") ?? "true", // global?.window...
  //       ) as boolean)
  //     : true;

  //run intro animation once per session
  const showAnimationRef = useRef(
    JSON.parse(
      window?.sessionStorage?.getItem("showIntroAnimation") ?? "true",
    ) as boolean,
  );

  useEffect(() => {
    if (!window) {
      return;
    }
    const storage = window.sessionStorage;

    showAnimationRef.current = JSON.parse(
      storage.getItem("showIntroAnimation") ?? "true",
    ) as boolean;

    if (showAnimationRef.current) {
      storage.setItem("showIntroAnimation", "false");
    }
  }, []);

  return showAnimationRef.current;
};

export default useIntroAnimation;
