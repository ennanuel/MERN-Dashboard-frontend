import { PaletteMode, ThemeOptions } from "@mui/material"
import { TokenKey, Token } from "./theme.d"

// Type of primary, secondary and grey

export const tokenDark : Token = {
    grey: {
        0: "#ffffff",
        10: "#f6f6f6",
        50: "#f0f0f0",
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
        1000: "#000000",
    },

    primary: {
        100: "#d3d4de",
        200: "#a6a9be",
        300: "#7a7f9d",
        400: "#4d547d",
        500: "#21295c",
        600: "#191f45",
        700: "#141937",
        800: "#0d1025",
        900: "#070812",
    },

    secondary: {
        50: "#f0f0f0",
        100: "#fff6e0",
        200: "#ffedc2",
        300: "#ffe3a3",
        400: "#ffda85",
        500: "#ffd155",
        600: "#cca752",
        700: "#997d3d",
        800: "#665429",
        900: "#332a14"
    }
}

// This function reverses the color object above (ie: 0 becomes 1000 and so on...)

function reverseTokens(tokensDark: Token): Token {
    const reversedTokens = {} as Token;

    Object.entries(tokensDark).forEach(([key, val]) => {
        const reversedObj = {} as TokenKey
        const keys = Object.entries(val)
        const values = Object.values(val).reverse();

        keys.forEach((key1, i) => {
            const prop = +key1[0] as keyof TokenKey;
            reversedObj[prop] = values[i];
        });

        reversedTokens[key as keyof Token] = reversedObj;
    });

    return reversedTokens;
}

export const tokenLight = reverseTokens(tokenDark);


// mui Theme settings

export const themeSettings = (mode: PaletteMode) : ThemeOptions => {
    return {
        palette: {
            mode,
            ...(
                mode === 'dark' ?
                {
                    primary: {
                        ...tokenDark.primary,
                        main: tokenDark.primary[400],
                        light: tokenDark.primary[400]
                    },
                    secondary: {
                        ...tokenDark.secondary,
                        main: tokenDark.secondary[300]
                    },
                    neutral: {
                        ...tokenDark.grey,
                        main: tokenDark.grey[500]
                    },
                    background: {
                        default: tokenDark.primary[600],
                        alt: tokenDark.primary[500]
                    }
                } : 
                {
                    primary: {
                        ...tokenLight.primary,
                        main: tokenDark.grey[50],
                        light: tokenDark.grey[100]
                    },
                    secondary: {
                        ...tokenLight.secondary,
                        main: tokenLight.secondary[600],
                        light: tokenDark.secondary[700]
                    },
                    neutral: {
                        ...tokenLight.grey,
                        main: tokenDark.grey[500]
                    },
                    background: {
                        default: tokenDark.grey[0],
                        alt: tokenDark.grey[50]
                    }
                }
            )
        },

        typography: {
            fontFamily: ['Inter', 'sans-serif'].join(','),
            fontSize: 12,
            h1: {
                fontFamily: ['Inter', 'sans-serif'].join(','),
                fontSize: 40,
            },
            h2: {
                fontFamily: ['Inter', 'sans-serif'].join(','),
                fontSize: 32,
            },
            h3: {
                fontFamily: ['Inter', 'sans-serif'].join(','),
                fontSize: 24
            },
            h4: {
                fontFamily: ['Inter', 'sans-serif'].join(','),
                fontSize: 20
            },
            h5: {
                fontFamily: ['Inter', 'sans-serif'].join(','),
                fontSize: 16
            },
            h6: {
                fontFamily: ['Inter', 'sans-serif'].join(','),
                fontSize: 14
            }
        }
    }
}