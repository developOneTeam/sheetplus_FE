import { createGlobalTheme } from "@vanilla-extract/css";

export const global = createGlobalTheme(":root", {
    color: {
        primary: "#26539C",
        secondary: "#1C9AD6",
        disabled: "#7E7E7E",
        error: "#EF4136",
        grey: "#959595",
        greyRing: "#9595951A",
        white: "#FAFAFA"
    },
    bg: {
        primary10: "#26539C1A",
        primary60: "#26539C99",
        primary90: "#26539CE6",
        secondary: "#1C9AD6E6",
        secondary30: "rgba(114, 198, 239, 0.30)",
        disabled: "#D9D9D9"
    },
    iconSize: {
        notice: "80px !important",
        default: "24px",
        medium: "48px"
    },
    fontWeight: {
        light: "300",
        logo: "900",
        bold: "600"
    },
    fontFamily: {
        suite: "SUITE Variable, SUITE"
    }
});

// export const colorByMode = createThemeContract({
export const colorByMode = createGlobalTheme(":root", {
    color: {
        text: "#1C1B1F",
        shadow: "#C9C9C9"
    },
    bg: {
        nav: "#FAFAFA",
        main: "#FFFFFF"
    }
});

// export const dark = createTheme(colorByMode, {
//     color: {
//         text: "#FCFFFC",
//         shadow: "#D4D4D4"
//     },
//     bg: {
//         nav: "#5C5C5C",
//         main: "#1C1B1F"
//     }
// });

export const vars = { global, colorByMode };