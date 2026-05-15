import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonFab,
  IonFabList,
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonAlert,
  IonNavLink
} from '@ionic/react';
import { chevronUpCircle, colorPalette, globe, searchCircle, square, trashBin } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import './walk.css';

const Walk: React.FC = () => {
  const [walks, setWalks] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost/api/get_walks.php")
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setWalks(data.walks);
        }
      })
      .catch(err => console.error("Walk fetch error:", err));
  }, []);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Walk</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Walk</IonTitle>
          </IonToolbar>
        </IonHeader>
        {walks.map((walk, index) => (
          <IonCard key={index}>
            <IonCardHeader>
              <IonCardTitle>Walk #{walk.id}</IonCardTitle>
              <IonCardSubtitle>
                {walk.distance.toFixed(2)} m • {walk.duration} s
              </IonCardSubtitle>
            </IonCardHeader>

            <IonButton>
              Route
            </IonButton>

            <IonButton color="danger" id={`delete-${walk.id}`}>
              Delete
            </IonButton>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Walk;