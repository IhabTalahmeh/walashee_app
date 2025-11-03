import { hexWithOpacity } from "src/common/utils";

export const lightTheme = {
    mode: 'light',
    colors: {
        topBackground: '#E7EAF1',
        background: '#FFFFFF',
        text: '#142C52',
        primary: '#2a2b2a',
        secondary: '#2a2b2a',
        warning: '#FFA500',
        success: '#00C650',
        error: '#F7403C',
        card: '#f9f9f9',
        border: hexWithOpacity('#60709F', 0.15),
        pureBorder: '#60709F',
        white: '#ffffff',
        black: '#000000',
        link: '#0095F6',
        dark: '#142C52',
        gray: '#6B7F94',
        lightgray: '#B8C1CC',
        inputBackground: hexWithOpacity('#60709F', 0.10),
        neutral: '#142C52',
        transparent: 'transparent',
    }
};

export const darkTheme = {
    mode: 'dark',
    colors: {
        topBackground: '#071018',
        background: '#141F2C',
        text: '#ffffff',
        primary: '#2a2b2a',
        secondary: '#2a2b2a',
        warning: '#FFA500',
        success: '#00C650',
        error: '#F7403C',
        card: '#1e1e1e',
        border: hexWithOpacity('#60709F', 0.15),
        pureBorder: '#60709F',
        white: '#ffffff',
        black: '#000000',
        link: '#0095F6',
        dark: '#142C52',
        gray: '#6B7F94',
        lightgray: '#B8C1CC',
        inputBackground: hexWithOpacity('#60709F', 0.10),
        neutral: '#ffffff',
        transparent: 'transparent',
    }
};

export const fonts = {
    thin: 'WorkSans-Thin',
    thinItalic: 'WorkSans-ThinItalic',
    extraLight: 'WorkSans-ExtraLight',
    extraLightItalic: 'WorkSans-ExtraLightItalic',
    light: 'WorkSans-Light',
    lightItalic: 'WorkSans-LightItalic',
    regular: 'WorkSans-Regular',
    italic: 'WorkSans-Italic',
    medium: 'WorkSans-Medium',
    mediumItalic: 'WorkSans-MediumItalic',
    semiBold: 'WorkSans-SemiBold',
    semiBoldItalic: 'WorkSans-SemiBoldItalic',
    bold: 'WorkSans-Bold',
    boldItalic: 'WorkSans-BoldItalic',
    extraBold: 'WorkSans-ExtraBold',
    extraBoldItalic: 'WorkSans-ExtraBoldItalic',
    black: 'WorkSans-Black',
    blackItalic: 'WorkSans-BlackItalic',
};

export type FontWeightKey = keyof typeof fonts;

export type Theme = typeof lightTheme;