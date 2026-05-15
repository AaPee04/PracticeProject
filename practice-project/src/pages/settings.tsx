import React, { useEffect, useState } from 'react';
import {
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonToggle,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRange,
} from '@ionic/react';

import { useTheme } from "../theme/themeProvider";
import type { FontSizeMode } from "../theme/themeProvider";

function Settings() {
    const { mode, setThemeMode, fontWeight, setFontWeightMode, fontSize, setFontSizeMode } = useTheme();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(mode === "dark");
    }, [mode]);

    const onToggle = (checked: boolean) => {
        setIsDark(checked);
        setThemeMode(checked ? "dark" : "light");
    };

    return (
        <IonPage>
            <IonHeader class="ion-no-border">
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonListHeader>Appearance</IonListHeader>
                <IonList inset={true}>
                    <IonItem>
                        <IonToggle
                            checked={mode === "dark"}
                            onIonChange={(e) => setThemeMode(e.detail.checked ? "dark" : "light")}
                        >
                            Dark Mode
                        </IonToggle>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Text Size</IonLabel>
                        <IonRange
                            min={0}
                            max={2}
                            step={1}
                            snaps={true}
                            ticks={true}
                            value={fontSize}
                            onIonChange={(e) => setFontSizeMode(e.detail.value as FontSizeMode)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonToggle
                            checked={fontWeight === "bold"}
                            onIonChange={(e) => setFontWeightMode(e.detail.checked ? "bold" : "normal")}
                        >
                            Bold Text
                        </IonToggle>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default Settings;