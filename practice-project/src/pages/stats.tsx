import React, { useRef, useEffect } from 'react';
import { IonAccordionGroup, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAccordion, IonItem, IonLabel } from '@ionic/react';
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
        <IonAccordionGroup ref={accordionGroup} multiple={true}>
          <IonAccordion value="first">
            <IonItem slot="header" color="light">
              <IonLabel>First Accordion</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              First Content
            </div>
          </IonAccordion>
          <IonAccordion value="second">
            <IonItem slot="header" color="light">
              <IonLabel>Second Accordion</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              Second Content
            </div>
          </IonAccordion>
          <IonAccordion value="third">
            <IonItem slot="header" color="light">
              <IonLabel>Third Accordion</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              Third Content
            </div>
          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default Stats;