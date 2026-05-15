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
    IonDatetime,
} from '@ionic/react';

import { useTheme } from "../theme/themeProvider";
import type { FontSizeMode } from "../theme/themeProvider";

function Settings() {
    const {
        mode,
        setThemeMode,
        fontWeight,
        setFontWeightMode,
        fontSize,
        setFontSizeMode,
        autoDark,
        setAutoDark,
        darkStart,
        setDarkStart,
        darkEnd,
        setDarkEnd
    } = useTheme();
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
                    <IonTitle>Asetukset</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonListHeader>Ulkonäkö</IonListHeader>
                <IonList inset={true}>
                    <IonItem>
                        <IonToggle
                            checked={mode === "dark"}
                            onIonChange={(e) => setThemeMode(e.detail.checked ? "dark" : "light")}
                        >
                            Tumma tila
                        </IonToggle>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Tekstin koko</IonLabel>
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
                            Suurennettu teksti
                        </IonToggle>
                    </IonItem>
                    <IonItem>
                        <IonToggle
                            checked={autoDark}
                            onIonChange={(e) => setAutoDark(e.detail.checked)}
                        >
                            Yötila
                        </IonToggle>
                    </IonItem>
                    {autoDark && (
                        <>
                            <IonItem>
                                <IonLabel>Aloitusaika</IonLabel>
                                <IonDatetime
                                    presentation="time"
                                    value={darkStart}
                                    onIonChange={(e) => setDarkStart(String(e.detail.value))}
                                />
                            </IonItem>

                            <IonItem>
                                <IonLabel>Lopetusaika</IonLabel>
                                <IonDatetime
                                    presentation="time"
                                    value={darkEnd}
                                    onIonChange={(e) => setDarkEnd(String(e.detail.value))}
                                />
                            </IonItem>
                        </>
                    )}
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default Settings;