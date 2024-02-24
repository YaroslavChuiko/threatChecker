import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#a9d7a4", //b0d9bf ff3845 a9d7a4 cce454 1cd77c
        secondary: "#0E0E17",
        success: '#1ded83',
        warning: '#f0b537',
        error: "#ff3845",
      },
      fontFamily: {
        main: ["var(--font-main)", ...fontFamily.serif],
        complementary: ["var(--font-complementary)", ...fontFamily.serif],
      },
      dropShadow: {
        "primary-md": "-3px -4px 1px rgb(var(--color-primary) / 0.2)",
        "primary-lg": "-4px -4px 2px rgb(var(--color-primary) / 0.2)",
        "success-md": "-3px -4px 1px rgb(var(--color-success) / 0.2)",
        "success-lg": "-4px -4px 2px rgb(var(--color-success) / 0.2)",
        "warning-md": "-3px -4px 1px rgb(var(--color-warning) / 0.2)",
        "warning-lg": "-4px -4px 2px rgb(var(--color-warning) / 0.2)",
        "error-md": "-3px -4px 1px rgb(var(--color-error) / 0.2)",
        "error-lg": "-4px -4px 2px rgb(var(--color-error) / 0.2)",
      },
      backgroundImage: {
        "gradient-scanlines":
          "linear-gradient(hsla(0,6%,7%,0) 50%,rgba(0,0,0,.25) 0),linear-gradient(90deg,rgba(255,0,0,.06),rgba(0,255,0,.02),rgba(0,0,255,.06));",
        // "gradient-scanlines":
        //   "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));",
      },
      backgroundSize: {
        "size-scanlines": "100% 3px, 3px 100%;",
      },
      keyframes: {
        verticalTicker: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(0, -100%, 0)" },
        },
        buttonLoading: {
          from: { backgroundPosition: "-300px 0" },
          to: { backgroundPosition: "300px 0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
