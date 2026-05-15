import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
} from '@ionic/react';

import { useEffect, useRef, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { getDistance } from 'geolib';

import MapContainer from '../components/mapContainer';

import {
  speedometerOutline,
  locationOutline,
  timeOutline,
} from 'ionicons/icons';

import { IonIcon } from '@ionic/react';

import './map.css';

interface PositionPoint {
  lat: number;
  lng: number;
}

const Map: React.FC = () => {
  const [tracking, setTracking] = useState(false);

  const [speed, setSpeed] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [time, setTime] = useState<number>(0);

  const [positions, setPositions] = useState<PositionPoint[]>([]);

  const watchIdRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTracking = async () => {
    try {
      setTracking(true);

      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);

      const watchId = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 1000,
          maximumAge: 0,
        },
        (position, err) => {
          if (err) {
            console.error(err);
            return;
          }

          if (!position) return;

          const coords: PositionPoint = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setPositions(prev => {
            if (prev.length > 0) {
              const last = prev[prev.length - 1];

              const meters = getDistance(
                {
                  latitude: last.lat,
                  longitude: last.lng,
                },
                {
                  latitude: coords.lat,
                  longitude: coords.lng,
                }
              );

              setDistance(d => d + meters);
            }

            return [...prev, coords];
          });

          if (position.coords.speed !== null) {
            const kmh = position.coords.speed * 3.6;
            setSpeed(kmh);
          }
        }
      );

      watchIdRef.current = watchId;
    } catch (error) {
      console.error('Tracking error:', error);
    }
  };

  const stopTracking = async () => {
    setTracking(false);

    if (watchIdRef.current) {
      await Geolocation.clearWatch({
        id: watchIdRef.current,
      });

      watchIdRef.current = null;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTracking = () => {
    setSpeed(0);
    setDistance(0);
    setTime(0);
    setPositions([]);
  };

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  const formatTime = () => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;

    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Kartta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen scrollY={false}>
        <div className="map-page">

          <div className="map-section">
            <MapContainer positions={positions} />
          </div>

          <div className="bottom-section">

            <IonCard>
              <IonCardContent>

                <div className="stat-row">
                  <IonIcon
                    icon={speedometerOutline}
                    className="stat-icon"
                  />

                  <div>
                    <h2>Nopeus</h2>
                    <p>{speed.toFixed(1)} km/h</p>
                  </div>
                </div>

                <div className="stat-row">
                  <IonIcon
                    icon={locationOutline}
                    className="stat-icon"
                  />

                  <div>
                    <h2>Matka</h2>
                    <p>{(distance / 1000).toFixed(2)} km</p>
                  </div>
                </div>

                <div className="stat-row">
                  <IonIcon
                    icon={timeOutline}
                    className="stat-icon"
                  />

                  <div>
                    <h2>Aika</h2>
                    <p>{formatTime()}</p>
                  </div>
                </div>

              </IonCardContent>
            </IonCard>

            <div className="map-buttons">

              {!tracking ? (
                <IonButton expand="block" onClick={startTracking}>
                  Aloita seuranta
                </IonButton>
              ) : (
                <IonButton
                  expand="block"
                  color="danger"
                  onClick={stopTracking}
                >
                  Lopeta seuranta
                </IonButton>
              )}

              <IonButton
                expand="block"
                color="medium"
                onClick={resetTracking}
              >
                Resetoi
              </IonButton>

            </div>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Map;