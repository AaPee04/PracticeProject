import React, { useEffect, useRef } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile";
import TileJSON from "ol/source/TileJSON.js";
import Attribution from "ol/control/Attribution.js";
import Control from "ol/control/Control";
import { defaults as defaultControls } from "ol/control/defaults.js";
import { fromLonLat } from "ol/proj.js";
import "./mapContainer.css";

const key = "Sef0x7LTO0dkohPrF8Qh";

const MapContainer: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const attribution = new Attribution({ collapsible: false });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new TileJSON({
            url: `https://api.maptiler.com/maps/openstreetmap/tiles.json?key=${key}`,
            tileSize: 512,
            crossOrigin: "anonymous",
          }),
        }),
      ],
      controls: defaultControls({ attribution: false }).extend([attribution]),
      view: new View({
        center: fromLonLat([25.4682, 65.0121]),
        zoom: 10,
        constrainResolution: true,
      }),
    });

    const stackElement = document.createElement("div");
    stackElement.className = "ol-control-stack ol-unselectable ol-control";

    const gpsButton = document.createElement("button");
    gpsButton.className = "ol-gps-btn";
    gpsButton.innerHTML = `<ion-icon name="locate-outline"></ion-icon>`;


    stackElement.appendChild(gpsButton);

    const stackControl = new Control({ element: stackElement });
    map.addControl(stackControl);

    gpsButton.addEventListener("click", () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          map.getView().animate({
            center: fromLonLat([longitude, latitude]),
            zoom: 15,
            duration: 800,
          });
        },
        (err) => console.error("GPS error:", err)
      );
    });


    return () => map.setTarget(undefined);
  }, []);

  return (
    <div className="map-wrap">
      <div ref={mapRef} className="map" />
    </div>
  );
};

export default MapContainer;
