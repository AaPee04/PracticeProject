import React, { createContext, useContext, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "./theme";
import { set } from "ol/transform";

export type ThemeMode = "light" | "dark";
export type FontWeightMode = "normal" | "bold";
export type FontSizeMode = 0 | 1 | 2;
export type TimeString = string;

type ThemeContextType = {
    theme: any;
    mode: ThemeMode;
    fontWeight: FontWeightMode;
    fontSize: FontSizeMode;

    autoDark: boolean;
    darkStart: TimeString;
    darkEnd: TimeString;

    setThemeMode: (mode: ThemeMode) => void;
    setFontWeightMode: (fontWeight: FontWeightMode) => void;
    setFontSizeMode: (size: FontSizeMode) => void;

    setAutoDark: (enabled: boolean) => void;
    setDarkStart: (time: TimeString) => void;
    setDarkEnd: (time: TimeString) => void;
};


const ThemeContext = createContext<ThemeContextType>({
    theme: lightTheme,
    mode: "light",
    fontWeight: "normal",
    fontSize: 1,
    autoDark: false,
    darkStart: "23:00",
    darkEnd: "07:00",
    setThemeMode: () => { },
    setFontWeightMode: () => { },
    setFontSizeMode: () => { },
    setAutoDark: () => { },
    setDarkStart: () => { },
    setDarkEnd: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>("light");
    const [fontWeight, setFontWeight] = useState<FontWeightMode>("normal");
    const [fontSize, setFontSize] = useState<FontSizeMode>(1);
    const [autoDark, setAutoDark] = useState(false);
    const [darkStart, setDarkStart] = useState<TimeString>("23:00");
    const [darkEnd, setDarkEnd] = useState<TimeString>("07:00");

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

    useEffect(() => {
        if(!autoDark) return;

        const checkAutoDark = () => {
            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();

            const nowMinutes = hour * 60 + minute;

            const [startH, startM] = darkStart.split(":").map(Number);
            const [endH, endM] = darkEnd.split(":").map(Number);

            const startMinutes = startH * 60 + startM;
            const endMinutes = endH * 60 + endM;

            const isNight = 
                startMinutes < endMinutes
                    ? nowMinutes >= startMinutes && nowMinutes < endMinutes
                    : nowMinutes >= startMinutes || nowMinutes < endMinutes;
            
            setMode(isNight ? "dark" : "light");
        };

        checkAutoDark();
        const interval = setInterval(checkAutoDark, 60*1000);
        return () => clearInterval(interval);
    }, [autoDark, darkStart, darkEnd]);

    return (
        <ThemeContext.Provider value={{ theme, mode, fontWeight, fontSize, autoDark, darkStart, darkEnd, setThemeMode: setMode, setFontWeightMode: setFontWeight, setFontSizeMode: setFontSize, setAutoDark: setAutoDark, setDarkStart: setDarkStart, setDarkEnd: setDarkEnd }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);