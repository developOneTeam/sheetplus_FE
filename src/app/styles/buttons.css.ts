import { recipe } from "@vanilla-extract/recipes";
import { colorByMode, global } from "./preset.css";

export const button = recipe({
    base: {
        color: "#fff",
        background: global.color.primary,
        border: "none",
        borderRadius: "5px",
        padding: "0.4em",

        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "1.2rem",

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
                        background: global.bg.secondary,
                        outline: "solid 2px",
                        outlineColor: global.bg.secondary
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1.5em",
        height: "1.5em",
        background: "transparent",
    
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
                aspectRatio: "1/1",
                width: "fit-content",
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
                padding: "2.25rem",

                display: "none",
                alignItems: "center",
                justifyContent: "center",
                bottom: 0,
                left: 0,
                margin: "1rem",
                position: "fixed",

                "@media": {
                    "screen and (min-width: 768px)": {
                        display: "flex",
                    }
                }
            }
        }
    }
});
