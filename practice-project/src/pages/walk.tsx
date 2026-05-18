import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
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

          const parsedWalks = data.walks.map((walk: any) => ({
            ...walk,
            id: Number(walk.id),
            distance: Number(walk.distance),
            duration: Number(walk.duration)
          }));

          setWalks(parsedWalks);
        }
      })
      .catch(err => console.error("Walk fetch error:", err));
  }, []);

  const deleteWalk = async (id: number) => {
    try {
      const res = await fetch("http://localhost/api/delete_walk.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.status === "success") {
        setWalks(prev => prev.filter(walk => walk.id !== id));
      } else {
        console.error("Delete error:", data.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

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

            <IonButton
              color="danger"
              onClick={() => deleteWalk(walk.id)}
            >
              Delete
            </IonButton>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Walk;