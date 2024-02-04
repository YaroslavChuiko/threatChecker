import useIntroAnimation from "./useIntroAnimation";

const introVariants = {
  initial: { opacity: 1, top: 0, bottom: 0, left: 0, right: 0 },
  enter: { opacity: 1, top: 72, bottom: 48, left: 48, right: 48 },
};

const formVariants = {
  initial: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
};

const tickerVariants = {
  initial: { borderRadius: 0 },
  enter: { borderRadius: 24 },
};

const useAnimationVariants = () => {
  const showAnimation = useIntroAnimation();

  if (!showAnimation) {
    return {
      introVariants: {},
      formVariants: {},
      tickerVariants: {}
    }
  }

  return {
    introVariants,
    formVariants,
    tickerVariants
  }
}

export default useAnimationVariants