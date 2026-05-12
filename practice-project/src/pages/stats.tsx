import React, { useRef, useEffect } from 'react';
import { IonAccordionGroup, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAccordion, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonCol, IonRow } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './stats.css';

const Stats: React.FC = () => {

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
        <IonGrid>
          <IonRow>
            <IonCol size="6" size-md="6" size-lg="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Length</IonCardTitle>
                  <IonCardSubtitle>Length Walked</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="6" size-md="6" size-lg="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Time</IonCardTitle>
                  <IonCardSubtitle>Time Walked</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="6" size-md="6" size-lg="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Walks</IonCardTitle>
                  <IonCardSubtitle>Amount of Walks</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="6" size-md="6" size-lg="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Speed</IonCardTitle>
                  <IonCardSubtitle>Average Speed of all Walks</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Stats;