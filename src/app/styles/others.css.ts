import { style } from "@vanilla-extract/css";
import { iconDesc, inputWrapper } from "./layouts.css";
import { global } from "./preset.css";
import { recipe } from "@vanilla-extract/recipes";
import { iconButton } from "./buttons.css";

export const faqLink = style({
    color: global.color.grey,
    textDecoration: "solid 1.2px underline",
    fontSize: "0.9rem",
    border: "none",
    background: "inherit",
    cursor: "pointer"
});

export const defaultH2 = style({
    fontSize: "1.5rem",
    selectors: {
        [`${iconDesc} &`]: {
            fontWeight: 400,
            margin: 0
        }
    }
});

export const defaultP = recipe({
    base: {
        fontSize: "1.0rem",
        margin: 0,
        wordBreak: "keep-all",
    },
    variants: {
        error: {
            true: {
                color: global.color.error,
                marginTop: "1em",
                textAlign: "center"
            }
        },
        size: {
            sm: {
                fontSize: "0.9rem"
            }
        },
        width: {
            max: {
                width: "max-content"
            }
        },
        align: {
            center: {
                textAlign: "center"
            }
        }
    }
})

export const icon = recipe({
    base : {
        fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24",

        selectors: {
            [`${inputWrapper()} &`]: {
                fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 32",
            },
            [`${iconDesc} &`]: {
                fontSize: "6em !important",
                fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48",
            },
            [`${iconButton({ types: "navMenu" })}&`]: {
                fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48"    
            } 
        }    
    },

    variants: {
        color: {
            error: {
                color: global.color.error
            },
            notice: {
                color: global.color.secondary
            }
        }
    }
})