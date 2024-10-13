import { style } from "@vanilla-extract/css";
import { iconDesc, inputWrapper } from "./layouts.css";
import { global } from "./preset.css";
import { recipe } from "@vanilla-extract/recipes";
import { iconButton } from "./buttons.css";

export const faqLink = style({
    color: global.color.grey,
    textDecoration: "solid 1.2px underline",
    fontSize: "0.9rem"
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
        }
    }
})

export const icon = style({
    fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24",

    selectors: {
        [`${inputWrapper()} &`]: {
            fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 32",
        },
        [`${iconDesc} &`]: {
            color: global.color.secondary,
            fontSize: "4em !important",
            fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48",
        },
        [`${iconButton({ types: "navMenu" })}&`]: {
            fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 48"    
        } 
    }
})