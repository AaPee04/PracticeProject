import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ThemeService {

    getDebugState() {
        return {
            darkMode: this.darkMode,
            fontWeightMode: this.fontWeightMode,
            fontSizeMode: this.fontSizeMode,
            htmlHasDark: document.documentElement.classList.contains("dark"),
            bodyHasDark: document.body.classList.contains("dark"),
            localStorage: {
                darkMode: localStorage.getItem("darkMode"),
                fontWeight: localStorage.getItem("fontWeight"),
                fontSize: localStorage.getItem("fontSize")
            }
        };
    }

    getCssDebug() {
        const styles = getComputedStyle(document.documentElement);

        return {
            appBg: styles.getPropertyValue("--app-bg").trim(),
            appText: styles.getPropertyValue("--app-text").trim(),
            appCard: styles.getPropertyValue("--app-card").trim(),
            appBorder: styles.getPropertyValue("--app-border").trim(),
            appFontWeight: styles.getPropertyValue("--app-font-weight").trim(),
            appFontSize: styles.getPropertyValue("--app-font-size").trim(),
        };
    }


    private darkMode = false;
    private fontWeightMode: "normal" | "bold" = "normal";
    private fontSizeMode: 0 | 1 | 2 = 1;

    constructor() {
        this.loadTheme();
        this.applyTheme();
    }

    toggleTheme() {
        this.darkMode = !this.darkMode;
        this.applyTheme();
        localStorage.setItem("darkMode", this.darkMode ? "1" : "0");

        return {
            ...this.getDebugState(),
            css: this.getCssDebug()
        };
    }

    toggleFontWeight() {
        this.fontWeightMode = this.fontWeightMode === "bold" ? "normal" : "bold";
        this.applyFontWeight();
        localStorage.setItem("fontWeight", this.fontWeightMode);

        return {
            ...this.getDebugState(),
            css: this.getCssDebug()
        };
    }

    toggleFontSize() {
        this.fontSizeMode = this.fontSizeMode === 2 ? 0 : (this.fontSizeMode + 1) as 0 | 1 | 2;
        this.applyFontSize();
        localStorage.setItem("fontSize", this.fontSizeMode.toString());

        return {
            ...this.getDebugState(),
            css: this.getCssDebug()
        };
    }

    setFontSizeMode(size: 0 | 1 | 2) {
        this.fontSizeMode = size;
        this.applyFontSize();
        localStorage.setItem("fontSize", this.fontSizeMode.toString());

        return {
            ...this.getDebugState(),
            css: this.getCssDebug()
        };
    }

    getFontSizeMode() {
        return this.fontSizeMode;
    }

    isBold() {
        return this.fontWeightMode === "bold";
    }

    loadTheme() {
        this.darkMode = localStorage.getItem("darkMode") === "1";
        this.fontWeightMode = localStorage.getItem("fontWeight") === "bold" ? "bold" : "normal";
        this.fontSizeMode = localStorage.getItem("fontSize") === "2" ? 2 : localStorage.getItem("fontSize") === "1" ? 1 : 0;
    }

    applyTheme() {
        const html = document.documentElement;

        if (this.darkMode) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }

        this.applyFontWeight();
        this.applyFontSize();
    }

    private applyFontWeight() {
        const root = document.documentElement;
        const weight = this.fontWeightMode === "bold" ? "700" : "400";
        root.style.setProperty("--app-font-weight", weight);
    }

    private applyFontSize() {
        const root = document.documentElement;
        const size = this.fontSizeMode === 0 ? "14px" : this.fontSizeMode === 1 ? "16px" : "20px";
        root.style.setProperty("--app-font-size", size);
    }

    isDark() {
        return this.darkMode;
    }
}
