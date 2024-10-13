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
            on: {
                color: global.color.secondary
            }
        }
    }
});
