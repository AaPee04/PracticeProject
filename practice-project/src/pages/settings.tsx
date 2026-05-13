import { IonActionSheet, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonToggle, IonLabel } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const Settings: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Settings</IonTitle>
                    </IonToolbar>         
                </IonHeader>
                <ExploreContainer name="Settings page" />
                <IonToggle enableOnOffLabels={true} color="primary"></IonToggle><IonLabel>Enable Dark Mode</IonLabel>
            </IonContent>
        </IonPage>
    );
};

export default Settings;
