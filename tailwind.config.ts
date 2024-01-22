import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-jetBrains-mono)"],
      },
      backgroundImage: {
        "gradient-scanlines":
          "linear-gradient(hsla(0,6%,7%,0) 50%,rgba(0,0,0,.25) 0),linear-gradient(90deg,rgba(255,0,0,.06),rgba(0,255,0,.02),rgba(0,0,255,.06));",
      },
      backgroundSize: {
        "size-scanlines": "100% 2px,3px 100%;",
      },
      keyframes: {
        verticalTicker: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(0, -100%, 0)" },
        },
      },
      // animation: {
      //   verticalTicker:
      //     "verticalTicker 15s linear infinite",
      // },
    },
  },
  plugins: [],
} satisfies Config;
