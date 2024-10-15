import { recipe } from "@vanilla-extract/recipes";
import { colorByMode, global } from "./preset.css";
import { style } from "@vanilla-extract/css";

export const button = recipe({
    base: {
        color: "#fff",
        background: global.color.primary,
        border: "none",
        borderRadius: "5px",
        padding: "0.5rem",

        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        textAlign: "center",
        fontSize: "1.2rem",
        textDecoration: "none",
        cursor: "pointer",

        selectors: {
            "&:hover": {
                background: global.bg.primary90,
            },
            "&:focus": {
                background: global.bg.primary90,
                outline: `solid 2px ${global.bg.primary90}`
            }    
        }
    },
   
    variants: {
        types: {
            disabled: {
                color: global.color.disabled,
                background: global.bg.disabled,
                cursor: "auto",
                
                selectors: {
                    "&:hover": {
                        background: global.bg.disabled
                    }                    
                }
            },
            secondary: {
                background: global.color.secondary,

                selectors: {
                    "&:hover": {
                        background: global.bg.secondary
                    }    
                }
            }
        },
    },
});

export const iconButton = recipe({
    base: {
        borderRadius: "50%",
        border: "none",
        display: "flex !important",
        alignItems: "center",
        justifyContent: "center",
        width: "1.5em",
        height: "1.5em",
        background: "transparent",
        cursor: "pointer",
        textDecoration: "none",
        color: colorByMode.color.text,
    
        selectors: {
            "&:hover": {
                background: global.color.greyRing
            },
        
            "&:focus": {
                background: global.color.greyRing,
                outline: `solid 2px ${global.bg.secondary}`
            }    
        }
    },

    variants: {
        types: {
            nav: {
                color: colorByMode.color.text,
                background: "transparent",
                borderRadius: "8px",
                textDecoration: "none",
                padding: "1rem",
                margin: "0.5rem",
                
                selectors: {
                    "&:hover": {
                        background: global.color.greyRing,
                        color: global.color.secondary
                    },
                
                    "&:focus": {
                        background: global.color.greyRing,
                        outline: `solid 2px ${global.bg.secondary}`,
                        color: global.color.secondary
                    }    
                }
            },
            on: {
                color: global.color.secondary
            },
            navMenu: {
                borderRadius: "10px",
                background: colorByMode.bg.nav,
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                width: "4.5rem",
                height: "4.5rem",

                display: "none",
                alignItems: "center",
                justifyContent: "center",
                bottom: 0,
                left: 0,
                margin: "1rem",
                position: "fixed",
                flexDirection: "column",
                gap: "0.5rem",

                "@media": {
                    "screen and (min-width: 768px)": {
                        display: "flex",
                    }
                },

                selectors: {
                    "&:hover": {
                        backdropFilter: "blur(10px)"
                    },
                    "&:focus": {
                        backdropFilter: "blur(10px)"    
                    }
                }
            }
        }
    }
});

export const toggleSwitch = style({
    appearance: "none",
    position: "relative",
    border: "max(2px, 0.1em) solid gray",
    borderRadius: "1.25em", 
    width: "3.5em",
    height: "1.6em",
    cursor: "pointer",

    selectors: {
        "&::before": {
            content: "",
            position: "absolute",
            left: 0,
            width: "1.2em",
            height: "1.2em",
            margin: "0.05em",
            borderRadius: "50%",
            backgroundColor: global.color.grey,
            transition: "left 250ms linear"
        },
        "&:checked": {
            backgroundColor: global.color.secondary,
            borderColor: global.color.secondary
        },
        "&:checked::before": {
            backgroundColor: colorByMode.bg.main,
            left: "1.9em"
        },
        "&:focus": {
            outlineOffset: "max(2px, 0.1em)",
            outline: `max(2px, 0.1em) solid ${global.color.secondary}`
        },
        "&:enabled:hover": {
            backgroundColor: global.bg.secondary30
        }
    }
})

