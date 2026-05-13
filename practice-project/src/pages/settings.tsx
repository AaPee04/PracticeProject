import React, { useEffect, useState } from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonRange,
    IonText,
    IonTitle,
    IonToggle,
    IonToolbar,
} from '@ionic/react';
import type { ToggleCustomEvent } from '@ionic/react';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';

import './settings.css';

function Settings() {
    const [paletteToggle, setPaletteToggle] = useState(false);

    // Listen for the toggle check/uncheck to toggle the dark palette
    const toggleChange = (event: ToggleCustomEvent) => {
        toggleDarkPalette(event.detail.checked);
    };

    // Add or remove the "ion-palette-dark" class on the html element
    const toggleDarkPalette = (shouldAdd: boolean) => {
        document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    };

    // Check/uncheck the toggle and update the palette based on isDark
    const initializeDarkPalette = (isDark: boolean) => {
        setPaletteToggle(isDark);
        toggleDarkPalette(isDark);
    };

    useEffect(() => {
        // Use matchMedia to check the user preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        // Initialize the dark palette based on the initial
        // value of the prefers-color-scheme media query
        initializeDarkPalette(prefersDark.matches);

        const setDarkPaletteFromMediaQuery = (mediaQuery: MediaQueryListEvent) => {
            initializeDarkPalette(mediaQuery.matches);
        };

        // Listen for changes to the prefers-color-scheme media query
        prefersDark.addEventListener('change', setDarkPaletteFromMediaQuery);

        return () => {
            prefersDark.removeEventListener('change', setDarkPaletteFromMediaQuery);
        };
    }, []);

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
                        <IonToggle checked={paletteToggle} onIonChange={toggleChange} justify="space-between">
                            Dark Mode
                        </IonToggle>
                    </IonItem>
                </IonList>

                <IonList inset={true}>
                    <IonItem button={true}>Text Size</IonItem>
                    <IonItem>
                        <IonToggle justify="space-between">Bold Text</IonToggle>
                    </IonItem>
                </IonList>

                <IonListHeader>Brightness</IonListHeader>
                <IonList inset={true}>
                    <IonItem>
                        <IonRange value={40}>
                            <IonIcon icon={sunnyOutline} slot="start"></IonIcon>
                            <IonIcon icon={sunny} slot="end"></IonIcon>
                        </IonRange>
                    </IonItem>
                    <IonItem>
                        <IonToggle justify="space-between" checked>
                            True Tone
                        </IonToggle>
                    </IonItem>
                </IonList>

                <IonList inset={true}>
                    <IonItem button={true}>
                        <IonLabel>Night Shift</IonLabel>
                        <IonText slot="end" color="medium">
                            11:00 PM to 7:00 AM
                        </IonText>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default Settings;
