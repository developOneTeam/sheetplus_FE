import { styled } from "@/styled-system/jsx";

export const Button = styled("button", {
    base: {
        color: "#fff",
        background: "schu.primary",
        border: "none",
        borderRadius: "5px",

        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "1.2rem",

        _hover: {
            background: "#26539CE6",
        },
        _focus: {
            background: "#26539CE6",
            outline: "solid 2px #26539CE6"
        }
    },
   
    variants: {
        types: {
            disabled: {
                color: "schu.disabled",
                background: { base: "schu.disabledBg", "&:hover": "schu.disabledBg" }                
            },
            secondary: {
                background: "schu.secondary",
                _hover: {
                    background: "1C9AD6E6",
                    outline: "solid 2px",
                    outlineColor: "schu.secondaryBg"
                }
            }
        },
    },
});

export const IconButton = styled("button", {
    base: {
        borderRadius: "50%",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1.5em",
        height: "1.5em",
    
        _hover: {
            background: "schu.greyRing"
        },
    
        _focus: {
            background: "schu.greyRing",
            outline: "solid 2px",
            outlineColor: "schu.secondaryBg"
        }            
    }
});

export const NavButton = styled(IconButton, {
    base: {
        color: "1C1B1F",
        background: "transparent",
        borderRadius: "8px",

        _hover: {
            background: "schu.greyRing"
        },
    
        _focus: {
            background: "schu.greyRing",
            outline: "solid 2px",
            outlineColor: "schu.secondaryBg"
        }
    },

    variants: {
        enabled: {
            true: {
                color: "schu.secondary"
            }
        }
    },
});

export const FaqLink = styled("a", {
    base: {
        color: "schu.grey",
        textDecoration: "solid",
        fontSize: "1rem"    
    }
});

export const InputWrapper = styled("div", {
    base: {
        border: "none",
        borderBottom: "solid 2px",
        borderColor: "schu.secondaryBg",
        color: "schu.grey",
        width: "100%",
        margin: "1em",
    
        display: "flex",
        gap: "2px",

        "& .material-symbols-rounded": {
            fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 32",
        },
        "& input": {
            border: "none",
        },
    },
    
    variants: {
        active: {
            true: {
                color: "schu.secondary"
            }
        }
    }
});

export const NavToast = styled("div", {
    base: {
        borderRadius: "25px",
        background: "schu.primaryBg",
        textAlign: "center",

        _after: {

        }
    }
});

export const Dialog = styled("dialog", {
    base: {
        borderRadius: "10px",
        boxShadow: "3px 3px 5px #c9c9c9"    
    }
});

export const IconDesc = styled("div", {
    base: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",    
        "& .material-symbols-rounded": {
            color: "schu.secondary",
            fontSize: "4em !important",
            fontVariationSettings: `'FILL' 0,'wght' 300,'GRAD' 0,'opsz': 60`,
        },

        "& h2": {
            fontSize: "1.5rem"
        },
    
        "& p": {
            fontSize: "1rem",
        }    
    },
});

export const AccentArea = styled("div", {
    base: {
        background: "schu.primaryBg",
        borderRadius: "10px",
        padding: "0.5em",    
    },

    variants: {
        center: {
            true: {
                textAlign: "center"
            }
        }
    }
});

export const Nav = styled("nav", {
    base: {
        position: "fixed",
        bottom: "1em",
        margin: "0 1em",
        width: "100%",
    
        borderRadius: "10px",
        background: "schu.navBg",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    
        display: "flex",
        alignItems: "center",
        gap: "0.5em",
    
        "& .material-symbols-rounded": {
            fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24",
        },
    }
});

export const Header = styled("header", {
    base: {
        display: "flex",
        justifyContent: "space-between",
        margin: "1em",
    
        "& .title": {
            fontSize: "1.4rem",
            fontWeight: "900",
            color: "schu.primary",
    
            "& .sheet": {
                fontSize: "1.2rem",
                fontWeight: "300",
            },
    
            "& .subtitle": {
                color: "schu.grey",
                fontSize: "1rem",
                fontWeight: "300",
                display: "block",
            }
        },
    
        "& .icon-nav": {
            display: "flex",
            alignItems: "center",
            gap: "0.5em",
            color: "schu.text",
            "& .material-symbols-rounded": {
                fontVariationSettings: "'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24",
            },
        }
    }
});

