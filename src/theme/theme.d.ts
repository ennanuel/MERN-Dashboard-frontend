import { TypeBackground, PaletteColor, Palette } from '@mui/material'

export type TokenKey = {
    0?: string
    10?: string
    50?: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
    1000?: string
}

export type Token = {
    grey: TokenKey
    primary: TokenKey
    secondary: TokenKey
}

declare module '@mui/material' {
    interface TypeBackground {
        alt: string
    };

    interface Palette {
        neutral: PaletteColor
    }
    
    interface PaletteColor {
        0?: string
        10?: string
        50?: string
        100: string
        200: string
        300: string
        400: string
        500: string
        600: string
        700: string
        800: string
        900: string
        1000?: string
    }
}