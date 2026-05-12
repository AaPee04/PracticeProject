import React, { useRef, useEffect } from 'react';
import { IonAccordionGroup, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAccordion, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './stats.css';

const Stats: React.FC = () => {
  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);

  useEffect(() => {
    if (!accordionGroup.current) {
      return;
    }

    accordionGroup.current.value = [];
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Statistics</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Statistics</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Statistics page" />
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Length</IonCardTitle>
            <IonCardSubtitle>Length Walked</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Time</IonCardTitle>
            <IonCardSubtitle>Time Walked</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Walks</IonCardTitle>
            <IonCardSubtitle>Amount of Walks</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Speed</IonCardTitle>
            <IonCardSubtitle>Average Speed of all Walks</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Stats;