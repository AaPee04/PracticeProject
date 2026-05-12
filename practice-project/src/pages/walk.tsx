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
  IonCardSubtitle
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './walk.css';
import { chevronUpCircle, colorPalette, globe, searchCircle, square, trashBin } from 'ionicons/icons';

const Walk: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Walk</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar searchIcon={searchCircle} showClearButton="always" clearIcon={trashBin} placeholder="Search for a Walk"></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Walk</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Walk page" />
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={chevronUpCircle}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton>
              <IonIcon icon={square}></IonIcon>
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={colorPalette}></IonIcon>
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={globe}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Walks</IonCardTitle>
            <IonCardSubtitle>Once the Database is in create a automaticly a new card for a walk</IonCardSubtitle>
          </IonCardHeader>
          <IonButton fill="clear">Route</IonButton>
          <IonButton fill="clear">Delete</IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Walk;
