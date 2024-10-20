import { iconDesc, inputWrapper } from "./layouts.css";
import { colorByMode, global } from "./preset.css";
import { recipe } from "@vanilla-extract/recipes";
import { iconButton } from "./buttons.css";
import { style } from "@vanilla-extract/css";

export const adminMenuLink = recipe({
    base: {
        display: "flex",
        alignItems: "center",
        gap: "0.5em",
        textDecoration: "none",
        color: colorByMode.color.text    
    },
    
    variants: {
        selected: {
            true: {
                borderBottom: `solid 2px ${global.color.secondary}`,
                color: global.color.secondary
            }
        }
    }
});

export const adminDashboardLink = style({
    textDecoration: "none",
    color: colorByMode.color.text
})

export const faqLink = recipe({
    base: {
        color: global.color.grey,
        textDecoration: "solid 1.2px underline",
        fontSize: "0.9rem",
        border: "none",
        background: "inherit",
        cursor: "pointer",
        fontFamily: "inherit",
        padding: 0,
    },
    variants: {
        style: {
            nonButton: {
                background: "none",
            },
            pSameSize: {
                fontSize: "1.0rem",
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

export const defaultH3 = style({
    fontSize: "1.3rem",
    fontWeight: 500,
    margin: "0.5em 0"
})

export const defaultP = recipe({
    base: {
        fontSize: "1.0rem",
        margin: 0,
        wordBreak: "keep-all",
        fontWeight: 400,
    },
    variants: {
        style: {
            primary: {
                color: global.color.primary,
            },
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
            },
            max: {
                fontSize: "8rem"
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
                width: "4rem"
            },
            pick: {
                width: "56rem",
                textOverflow: "ellipsis",
                overflow: "hidden",
                textWrap: "nowrap",

                "@media": {
                    "screen and (max-width: 963px)": {
                        width: "calc(100vw - 4rem)",
                        fontSize: "4rem"
                    },
                    "screen and (max-width: 519px)": {
                        width: "100%"
                    },
                }
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
            },
            bold: {
                fontWeight: 600
            }
        },
        lineHeight: {
            ui: {
                lineHeight: 1.6
            }
        },
        flexOptions: {
            notShrink: {
                flexShrink: 0
            }
        },
        margin: {
            false: {
                margin: 0
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
            },
            primary: {
                color: global.color.primary
            }
        },
        size: {
            "lg": {
                fontSize: "3rem"
            }
        }
    }
});

export const checkbox = style({
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    backgroundColor: "transparent",
    margin: "0 0.5em 0 0",

    borderRadius: "50%",
    color: global.color.secondary,
    border: `0.15em solid ${global.color.secondary}`,
    width: "2em",
    height: "2em",

    selectors: {
        "&:checked": {
            background: global.color.secondary
        },
        "&:checked::before": {
            background: "url('/checkbox_check.png') no-repeat 0.01em 0.01em/cover",
            content: "       ",
            whiteSpace: "pre",
            display: "block",
            width: "2em",
            height: "2em",
            margin: "-0.15em"
        }
    }
});

export const input = style({
    
});
