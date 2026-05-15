import React, { createContext, useContext, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "./theme";

export type ThemeMode = "light" | "dark";
export type FontWeightMode = "normal" | "bold";
export type FontSizeMode = 0 | 1 | 2; // small, medium, large

type ThemeContextType = {
    theme: any;
    mode: ThemeMode;
    fontWeight: FontWeightMode;
    fontSize: FontSizeMode;
    setThemeMode: (mode: ThemeMode) => void;
    setFontWeightMode: (fontWeight: FontWeightMode) => void;
    setFontSizeMode: (fontSize: FontSizeMode) => void;
};

const ThemeContext = createContext<ThemeContextType>({
    theme: lightTheme,
    mode: "light",
    fontWeight: "normal",
    fontSize: 1,
    setThemeMode: () => { },
    setFontWeightMode: () => { },
    setFontSizeMode: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>("light");
    const [fontWeight, setFontWeight] = useState<FontWeightMode>("normal");
    const [fontSize, setFontSize] = useState<FontSizeMode>(1);

    const theme = mode === "dark" ? darkTheme : lightTheme;

    useEffect(() => {
        document.body.classList.remove("dark");
    }, []);

    useEffect(() => {
        if (mode === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [mode]);

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--app-font-weight",
            fontWeight === "bold" ? "700" : "400"
        );
    }, [fontWeight]);

    useEffect(() => {
        const sizePx = fontSize === 0 ? "14px" : fontSize === 1 ? "16px" : "20px";
        document.documentElement.style.setProperty("--app-font-size", sizePx);
    }, [fontSize]);

    return (
        <ThemeContext.Provider value={{ theme, mode, fontWeight, fontSize, setThemeMode: setMode, setFontWeightMode: setFontWeight, setFontSizeMode: setFontSize }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);