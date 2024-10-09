import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Choose JSX Framework
  jsxFramework: "react",

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          schu: {
            primary: { value: "#26539C"},
            secondary: { value: "#1C9AD6"},
            primaryBg: { value: "#26539C1A"},
            secondaryBg: { value: "#1C9AD6E6"},
            disabled: { value: "#7E7E7E"},
            disabledBg: { value: "#D9D9D9"},
            grey: { value: "#959595"},
            greyRing: { value: "#959595E6"},
            text: { value: "#1C1B1F"},
            shadow: { value: "#C9C9C9" },
            navBg: { value: "#FAFAFA"}
          }
        }
      }
    },
  },

  // The output directory for your css system
  outdir: "src/styled-system",
});
