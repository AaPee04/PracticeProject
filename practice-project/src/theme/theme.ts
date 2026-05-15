import { text } from "ionicons/icons";

export const lightTheme = {
    mode: "light",
    colors: {
        primary: "#009FE3",
        background: "#E5F7FD",
        white: "#fff",
        text: "#222",
        textSecondary: "#555",
        danger: "#d9534f",
        dangerBackground: "#fff5f5",
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 20,
        xl: 32,
    },
    radius: {
        sm: 6,
        md: 12,
        lg: 20,
    },
    fonts: {
        regular: "Avenir",
        bold: "Avenir-Bold",
    },
};

export const darkTheme = {
    mode: "dark",
    colors: {
        primary: "#4DB8FF",
        background: "#0D1B2A",
        white: "#1B263B",
        text: "#E0E1DD",
        textSecondary: "#A5A7AA",
        danger: "#ff6b6b",
        dangerBackground: "#2b0000",
    },
    spacing: lightTheme.spacing,
    radius: lightTheme.radius,
    fonts: lightTheme.fonts,
};