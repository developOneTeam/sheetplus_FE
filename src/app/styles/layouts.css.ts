import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { global, colorByMode } from "./preset.css";

export const main = recipe({
    base: {
        width: "100%"
    },

    variants: {
        center: {
            true: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "10rem"
            }
        }
    }
});

export const mainSection = style({
    display: "flex",
    flexDirection: "column",
    gap: "1em",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",

    selectors: {
        [`${main()} &`]: {
            "@media" : {
                "screen and (min-width: 768px)": {
                    width: "25em"
                }
            }        
        }    
    }
});

export const header = style({
    display: "flex",
    justifyContent: "space-between",
    margin: "1em",
    padding: 0
});

export const title = style({
    fontSize: "1.4rem",
    fontWeight: "900",
    margin: 0,
    color: global.color.primary
});

export const sheet = style({
    selectors: {
        [`${title} &`]: {
            fontSize: "1.2rem",
            fontWeight: "300"
        }
    }
});

export const subtitle = style({
    selectors: {
        [`${title} &`]: {
            color: global.color.grey,
            fontSize: "1rem",
            fontWeight: "300",
            display: "block",
        }
    }
});

export const iconNav = style({
    selectors: {
        [`${title} &`]: {
            display: "flex",
            alignItems: "center",
            gap: "0.5em",
            color: colorByMode.color.text
        }
    }
})

export const formLayout = style({
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    width: "100%"
});

export const inputWrapper = recipe({
    base: {
        border: "none",
        borderBottom: `solid 2px ${global.bg.secondary}`,
        color: global.color.grey,
        width: "100%",    
        display: "flex",
        gap: "2px",
        marginBottom: "0.5em",
        fontSize: "1.2em",
    },
    
    variants: {
        active: {
            true: {
                color: global.color.secondary
            }
        }
    }
});

export const inputLayout = style({
    border: "none",
    fontSize: "1.2rem",
    flexShrink: 1,
    minWidth: 0,

    ":focus": {
        border: "none",
        outline: "none"
    }
})

export const navToast = style({
    borderRadius: "25px",
    background: global.bg.primary10,
    textAlign: "center",
});

export const dialogLayout = style({
    borderRadius: "10px",
    boxShadow: `3px 3px 5px ${colorByMode.color.shadow}`,
});

export const iconDesc = style({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
});

export const accentArea = recipe({
    base: {
        background: global.bg.primary10,
        borderRadius: "10px",
        padding: "0.5em 1em",
        width: "100%",
        boxSizing: "border-box"
    },

    variants: {
        center: {
            true: {
                textAlign: "center"
            }
        }
    }
});

export const navLayout = style({
    position: "fixed",
    bottom: "1em",
    margin: "0 1em",
    width: "100%",

    borderRadius: "10px",
    background: colorByMode.bg.nav,
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",

    display: "flex",
    alignItems: "center",
    gap: "0.5em",
});
