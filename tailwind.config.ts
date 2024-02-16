import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        mainColor: "#b0d9bf", //b0d9bf ff3845 a9d7a4 cce454 1cd77c
        secondaryColor: "#0E0E17",
      },
      fontFamily: {
        main: ["var(--font-main)", ...fontFamily.serif],
        complementary: ["var(--font-complementary)", ...fontFamily.serif],
      },
      backgroundImage: {
        "gradient-scanlines":
          "linear-gradient(hsla(0,6%,7%,0) 50%,rgba(0,0,0,.25) 0),linear-gradient(90deg,rgba(255,0,0,.06),rgba(0,255,0,.02),rgba(0,0,255,.06));",
        // "gradient-scanlines":
        //   "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));",
      },
      backgroundSize: {
        "size-scanlines": "100% 2px, 3px 100%;",
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
        textGlitch: {
          "0%": {
            textShadow:
              "0.4389924193300864px 0 1px rgba(0,30,255,0.5), -0.4389924193300864px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "5%": {
            textShadow:
              "2.7928974010788217px 0 1px rgba(0,30,255,0.5), -2.7928974010788217px 0 1px rgba(255,0,80,0.3), 0 0 3px;",
          },
          "10%": {
            textShadow:
              "0.02956275843481219px 0 1px rgba(0,30,255,0.5), -0.02956275843481219px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "15%": {
            textShadow:
              "0.40218538552878136px 0 1px rgba(0,30,255,0.5), -0.40218538552878136px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "20%": {
            textShadow:
              "3.4794037899852017px 0 1px rgba(0,30,255,0.5), -3.4794037899852017px 0 1px rgba(255,0,80,0.3), 0 0 3px;",
          },
          "25%": {
            textShadow:
              "1.6125630401149584px 0 1px rgba(0,30,255,0.5), -1.6125630401149584px 0 1px rgba(255,0,80,0.3), 0 0 3px;",
          },
          "30%": {
            textShadow:
              "0.7015590085143956px 0 1px rgba(0,30,255,0.5), -0.7015590085143956px 0 1px rgba(255,0,80,0.3), 0 0 3px;",
          },
          "35%": {
            textShadow:
              "3.896914047650351px 0 1px rgba(0,30,255,0.5), -3.896914047650351px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "40%": {
            textShadow:
              "3.870905614848819px 0 1px rgba(0,30,255,0.5), -3.870905614848819px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "45%": {
            textShadow:
              "2.231056963361899px 0 1px rgba(0,30,255,0.5), -2.231056963361899px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "50%": {
            textShadow:
              "0.08084290417898504px 0 1px rgba(0,30,255,0.5), -0.08084290417898504px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "55%": {
            textShadow:
              "2.3758461067427543px 0 1px rgba(0,30,255,0.5), -2.3758461067427543px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "60%": {
            textShadow:
              "2.202193051050636px 0 1px rgba(0,30,255,0.5), -2.202193051050636px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "65%": {
            textShadow:
              "2.8638780614874975px 0 1px rgba(0,30,255,0.5), -2.8638780614874975px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "70%": {
            textShadow:
              "0.48874025155497314px 0 1px rgba(0,30,255,0.5), -0.48874025155497314px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "75%": {
            textShadow:
              "1.8948491305757957px 0 1px rgba(0,30,255,0.5), -1.8948491305757957px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "80%": {
            textShadow:
              "0.0833037308038857px 0 1px rgba(0,30,255,0.5), -0.0833037308038857px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "85%": {
            textShadow:
              "0.09769827255241735px 0 1px rgba(0,30,255,0.5), -0.09769827255241735px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "90%": {
            textShadow:
              "3.443339761481782px 0 1px rgba(0,30,255,0.5), -3.443339761481782px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "95%": {
            textShadow:
              "2.1841838852799786px 0 1px rgba(0,30,255,0.5), -2.1841838852799786px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
          "100%": {
            textShadow:
              "2.6208764473832513px 0 1px rgba(0,30,255,0.5), -2.6208764473832513px 0 1px rgba(255,0,80,0.3), 0 0 3px",
          },
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
