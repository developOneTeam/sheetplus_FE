import { iconDesc, inputWrapper } from "./layouts.css";
import { global } from "./preset.css";
import { recipe } from "@vanilla-extract/recipes";
import { iconButton } from "./buttons.css";

export const faqLink = recipe({
    base: {
        color: global.color.grey,
        textDecoration: "solid 1.2px underline",
        fontSize: "0.9rem",
        border: "none",
        background: "inherit",
        cursor: "pointer",    
    },
    variants: {
        style: {
            nonButton: {
                background: "none",
            }
        },
        underline: {
            false: {
                textDecoration: "none"
            }
        },
        margin: {
            "updown": {
                margin: "0.5em 0"
            }
        }
    }
});

export const defaultH2 = recipe({
    base: {
        fontSize: "1.5rem",
        fontWeight: 600,

        selectors: {
            [`${iconDesc} &`]: {
                fontWeight: 400,
                margin: 0
            }
        }    
    },
    variants: {
        style: {
            disabled: {
                color: global.color.grey
            },
            primary: {
                color: global.color.primary
            },
            nomargin: {
                margin: 0
            }
        }
    }
});

export const defaultP = recipe({
    base: {
        fontSize: "1.0rem",
        margin: 0,
        wordBreak: "keep-all",
        fontWeight: 400,
    },
    variants: {
        style: {
            error: {
                color: global.color.error,
                marginTop: "1em",
                textAlign: "center"
            },
            disabled: {
                color: global.color.grey,
            },
            secondary: {
                color: global.color.secondary,
            }
        },
        size: {
            sm: {
                fontSize: "0.9rem"
            },
            l: {
                fontSize: "1.1rem"
            },
            lg: {
                fontSize: "1.2rem"
            }
        },
        width: {
            max: {
                width: "max-content"
            },
            block: {
                display: "block"
            },
            time: {
                width: "3rem"
            }
        },
        align: {
            center: {
                textAlign: "center"
            }
        },
        weight: {
            semiBold: {
                fontWeight: 500
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
            },
            disabled: {
                color: global.color.grey
            }
        }
    }
})