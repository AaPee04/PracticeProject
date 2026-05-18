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
    IonAccordion,
    IonAccordionGroup,
} from '@ionic/react';

import { useTheme } from "../theme/themeProvider";
import type { FontSizeMode } from "../theme/themeProvider";

import {
    moon,
    text,
    contrast,
    time,
} from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import './settings.css';

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
    const [accordionValue, setAccordionValue] = useState<string | undefined>();

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
                <IonListHeader>
                    Ulkonäkö
                </IonListHeader>
                <IonList inset={true}>
                    <IonItem>
                        <IonLabel>
                            <IonIcon icon={moon} className="setting-icon" />
                            Tumma tila
                        </IonLabel>
                        <IonToggle
                            justify="end"
                            checked={mode === "dark"}
                            onIonChange={(e) => setThemeMode(e.detail.checked ? "dark" : "light")}
                        >
                        </IonToggle>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <IonIcon icon={text} className="setting-icon" />
                            Tekstin koko
                        </IonLabel>
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
                        <IonLabel>
                            <IonIcon icon={contrast} className="setting-icon" />
                            Suurennettu teksti
                        </IonLabel>
                        <IonToggle
                            justify="end"
                            checked={fontWeight === "bold"}
                            onIonChange={(e) => setFontWeightMode(e.detail.checked ? "bold" : "normal")}
                        />
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <IonIcon icon={time} className="setting-icon" />
                            Yötila
                        </IonLabel>
                        <IonToggle
                            justify="end"
                            checked={autoDark}
                            onIonChange={(e) => setAutoDark(e.detail.checked)}
                        />
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default Settings;