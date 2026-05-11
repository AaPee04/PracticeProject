import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './mapContainer.css';

export default function MapContainer() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const oulu = { lng: 25.4682 , lat: 65.0121 }; // Oulu, Finland
  const zoom = 14;
  maptilersdk.config.apiKey = 'Sef0x7LTO0dkohPrF8Qh';

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
    if (!mapContainer.current) return; // ensure container exists

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: "openstreetmap",
      center: [oulu.lng, oulu.lat],
      zoom: zoom
    });

  }, [oulu.lng, oulu.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}