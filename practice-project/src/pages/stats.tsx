import React, { useRef, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonGrid, IonCol, IonRow } from '@ionic/react';
import './stats.css';
import {
  walkOutline,
  timeOutline,
  speedometerOutline,
  analyticsOutline
} from 'ionicons/icons';

import { IonIcon } from '@ionic/react';

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
          console.log("RAW STATS:", data);

          if (data.status === "success") {
            setStats({
              total_distance: Number(data.total_distance),
              total_duration: Number(data.total_duration),
              total_walks: Number(data.total_walks),
              avg_speed: Number(data.avg_speed)
            });
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
                  <IonCardTitle>
                    <IonIcon icon={walkOutline} className="stat-icon" />
                    Length
                  </IonCardTitle>
                  <IonCardSubtitle>
                    {(Number(stats.total_distance) || 0).toFixed(2)} m
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="6" size-md="6" size-lg="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <IonIcon icon={timeOutline} className="stat-icon" />
                    Time
                  </IonCardTitle>
                  <IonCardSubtitle>
                    {formatTime(Number(stats.total_duration || 0))}
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="6" size-md="6" size-lg="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <IonIcon icon={analyticsOutline} className="stat-icon" />
                    Walks
                  </IonCardTitle>
                  <IonCardSubtitle>
                    {stats.total_walks}
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
            <IonCol size="6" size-md="6" size-lg="6">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <IonIcon icon={speedometerOutline} className="stat-icon" />
                    Speed
                  </IonCardTitle>
                  <IonCardSubtitle>
                    {Number(stats.avg_speed ?? 0).toFixed(2)} km/h
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