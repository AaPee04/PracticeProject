import React, { useRef, useEffect } from 'react';
import { IonAccordionGroup, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAccordion, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonCol, IonRow } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './stats.css';

const Stats: React.FC = () => {

  const [stats, setStats] = React.useState({
    total_distance: 0,
    total_duration: 0,
    total_walks: 0,
    avg_speed: 0
  });

  useEffect(() => {
    const loadStats = () => {
      fetch("http://localhost/api/get_stats.php")
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.status === "success") {
            setStats(data);
          }
        });
    };

    loadStats();
  }, []);

  function formatTime(sec: number) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}h ${m}m ${s}s`;
  }

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
                  <IonCardSubtitle>
                    {stats.total_distance.toFixed(2)} m
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="6" size-md="6" size-lg="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Time</IonCardTitle>
                  <IonCardSubtitle>
                    {formatTime(stats.total_duration)}
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="6" size-md="6" size-lg="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Walks</IonCardTitle>
                  <IonCardSubtitle>
                    {stats.total_walks}
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="6" size-md="6" size-lg="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Speed</IonCardTitle>
                  <IonCardSubtitle>
                    {stats.avg_speed.toFixed(2)} km/h
                  </IonCardSubtitle>
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