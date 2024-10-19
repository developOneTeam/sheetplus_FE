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
                alignItems: "center"
            },
            false: {
                margin: "1rem",
                width: "calc(100% - 2rem)"
            }
        },
        verticalCenter: {
            true: {
                height: "calc(100vh - 6rem)",
                justifyContent: "center",
                marginTop: "-2rem"
            }
        },
        grid: {
            true: {
                display: "grid",
                gridTemplateRows: "1fr",
                width: "100%",
                justifyContent: "center",

                "@media": {
                    "screen and (max-width: 519px)": {
                        margin: "0 1rem",
                        width: "calc(100% - 2rem)"
                    }
                }
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
    margin: "0 1rem",
    width: "calc(100% - 2rem)",

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

export const header = recipe({
    base: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "1em",
        padding: 0
    },
    variants: {
        section: {
            true: {
                margin: "1em 0",
                alignItems: "flex-end"
            }
        }
    }
});

export const title = style({
    fontSize: "1.4rem",
    fontWeight: "900",
    color: global.color.primary,
    textDecoration: "none",

    selectors: {
        "&:visited": {
            color: global.color.primary,
            textDecoration: "none"
        }
    }
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
    display: "flex",
    alignItems: "center",
    gap: "0.5em",
    color: colorByMode.color.text
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
        alignItems: "center",
    },
    
    variants: {
        active: {
            true: {
                color: global.color.secondary
            }
        },
        align: {
            between: {
                justifyContent: "space-between",
            }
        }
    }
});

export const inputLayout = style({
    border: "none",
    fontSize: "1.2rem",
    flexShrink: 1,
    flexGrow: 1,
    minWidth: 0,
    textAlign: "right",
    color: global.color.grey,
    fontFamily: "inherit",

    selectors: {
        "&:focus": {
            border: "none",
            outline: "none",
        },
        "&::placeholder": {
            color: global.color.grey
        }
    }
});

export const selectLayout = style({
    appearance: "none",
    fontSize: "1.2rem",
    fontFamily: "inherit",
    color: global.color.grey,
    background: "transparent",
    border: "none",
    paddingInlineEnd: "1.2em",
    textAlign: "end",

    selectors: {
        "&:focus": {
            color: global.color.secondary
        }
    }
});

export const selectButton = style({
    selectors: {
        "&::after": {
            content: "↓",
            display: "inline-block",
            background: "transparent",
            color: global.color.grey,
            marginInlineStart: "-1em",
            pointerEvents: "none"
        },
        "&::after:focus": {
            color: global.color.secondary
        }
    }
});

export const navToast = style({
    borderRadius: "25px",
    background: global.bg.primary10,
    textAlign: "center",
});

export const dialogOutline = style({
    boxShadow: `3px 3px 5px ${colorByMode.color.shadow}`,
    padding: "0.5em",
    borderRadius: "10px",
    width: "25rem",
    border: "none",
    opacity: 0
})

export const dialogLayout = style({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
});

export const dialogClose = style({
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: "-1em"
})

export const iconDesc = style({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "0.5rem",
});

export const accentArea = recipe({
    base: {
        background: global.bg.primary10,
        borderRadius: "10px",
        border: "none",
        padding: "0.5em 1em",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        minWidth: 0
    },

    variants: {
        center: {
            true: {
                alignItems: "center",
                textAlign: "center"
            }
        },
        direction: {
            "row": {
                flexDirection: "row"
            }
        },
        overflow: {
            "scroll": {
                overflow: "scroll"
            }
        }
    }
});

export const navLayout = style({
    position: "fixed",
    bottom: "1em",
    margin: "0 1em",
    left: 0,
    right: 0,

    borderRadius: "10px",
    background: colorByMode.bg.nav,
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
    "@media": {
        "screen and (min-width: 768px)": {
            marginLeft: "6rem",
            left: "auto",
            right: "auto"
        }
    }
});

export const navList = style({
    display: "flex",
    alignItems: "center",
    listStyle: "none",
    margin: 0,
    padding: 0
});

export const stampList = style({
    display: "flex",
    alignItems: "center",
    gap: "0.5em",
    margin: "0.5em 0",
    minWidth: 0,
    boxSizing: "border-box",
    width: "100%"
})

export const stamp = style({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5em",
    borderRadius: "50%",
    aspectRatio: "1/1",
    width: "4em",
    background: global.bg.primary60
});

export const stamped = style({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    aspectRatio: "1/1",
    padding: "0.5em",
    background: global.bg.primary10,
    color: global.color.white,
});

export const scheduleTable = style({
    listStyle: "none",
    color: colorByMode.color.text,
    padding: 0,
    marginBottom: "6rem"
})

export const scheduleLine = style({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5em",

    padding: "0.5em",
    textDecoration: "none",
    color: colorByMode.color.text,
    borderBottom: `2px solid ${global.color.grey}`,
});

export const scheduleContentBlock = style({
    display: "flex",
    alignItems: "center",
    gap: "0.5em"
})

export const schedulePlace = style({
    background: global.bg.secondary30,
    overflow: "ellipse",
    height: "2.5rem",
    width: "5rem",
    margin: "0.5rem",
    borderRadius: "10px",
    padding: "0.5em",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
});

export const pickArea = style({
    background: global.bg.primary10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3em 1em",
    borderRadius: "10px",
    width: "max-content",
    height: "max-content",
    textAlign: "center",

    "@media": {
        "screen and (max-width: 519px)": {
            width: "100%",
            maxWidth: "calc(100% - 2rem)"
        }
    }
});

export const pickButtonSet = style({
    display: "flex",
    justifyContent: "center",
    gap: "1em",
    
    position: "fixed",
    bottom: "2em",
    left: "50%",
    right: "50%",
    marginInlineStart: "-29rem",
    width: "58rem",

    "@media":{
        "screen and (max-width: 963px)": {
            width: "calc(100% - 2em)",
            left: 0,
            right: 0,
            bottom: 0,
            margin: "1em",
        },
        "screen and (max-width: 605px)": {
            flexDirection: "column",
            gap: "0.5em"
        }
    }
});

export const pickOptionSet = style({
    display: "flex",
    gap: "2em",
    flexWrap: "wrap",
    alignItems: "center",
});

export const checkBoxSet = style({
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap" 
});
