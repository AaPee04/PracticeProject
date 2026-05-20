import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ThemeService {

    getDebugState() {
        return {
            darkMode: this.darkMode,
            htmlHasDark: document.documentElement.classList.contains("dark"),
            bodyHasDark: document.body.classList.contains("dark"),
            localStorage: localStorage.getItem("darkMode")
        };
    }

    getCssDebug() {
        const styles = getComputedStyle(document.documentElement);

        return {
            appBg: styles.getPropertyValue("--app-bg").trim(),
            appText: styles.getPropertyValue("--app-text").trim(),
            appCard: styles.getPropertyValue("--app-card").trim(),
            appBorder: styles.getPropertyValue("--app-border").trim(),
        };
    }


    private darkMode = false;

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


    loadTheme() {
        this.darkMode = localStorage.getItem("darkMode") === "1";
    }

    applyTheme() {
        const html = document.documentElement;

        if (this.darkMode) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }

    isDark() {
        return this.darkMode;
    }
}
