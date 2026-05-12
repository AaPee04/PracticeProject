import React, { useEffect, useRef } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile";
import TileJSON from "ol/source/TileJSON.js";
import Attribution from "ol/control/Attribution.js";
import Control from "ol/control/Control";
import { defaults as defaultControls } from "ol/control/defaults.js";
import { fromLonLat } from "ol/proj.js";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Style, Icon } from "ol/style";

import "./mapContainer.css";

const key = "Sef0x7LTO0dkohPrF8Qh";

const MapContainer: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const attribution = new Attribution({ collapsible: false });

    const streetLayer = new TileLayer({
      source: new TileJSON({
        url: `https://api.maptiler.com/maps/openstreetmap/tiles.json?key=${key}`,
        tileSize: 512,
        crossOrigin: "anonymous",
      }),
      visible: true,
    });

    const satelliteLayer = new TileLayer({
      source: new TileJSON({
        url: `https://api.maptiler.com/maps/hybrid/tiles.json?key=${key}`,
        tileSize: 512,
        crossOrigin: "anonymous",
      }),
      visible: false,
    });

    const map = new Map({
      target: mapRef.current,
      layers: [streetLayer, satelliteLayer],
      controls: defaultControls({ attribution: false }).extend([attribution]),
      view: new View({
        center: fromLonLat([25.4682, 65.0121]),
        zoom: 10,
        constrainResolution: true,
      }),
    });

    const userLocationFeature = new Feature({
      geometry: new Point(fromLonLat([0, 0])),
    });

    userLocationFeature.setStyle(
      new Style({
        image: new Icon({
          src: "data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='deepskyblue'>\
<circle cx='12' cy='12' r='10' />\
</svg>",
          anchor: [0.5, 0.5],
          scale: 1,
        }),
      })
    );

    const userLocationSource = new VectorSource({
      features: [userLocationFeature],
    });

    const userLocationLayer = new VectorLayer({
      source: userLocationSource,
      visible: false,
    });

    map.addLayer(userLocationLayer);

    const stackElement = document.createElement("div");
    stackElement.className = "ol-control-stack ol-unselectable ol-control";

    const zoomInButton = document.createElement("button");
    const zoomOutButton = document.createElement("button");
    const gpsButton = document.createElement("button");
    const mapToggleButton = document.createElement("button");


    map.once("postrender", () => {
      stackElement.appendChild(zoomInButton);
      stackElement.appendChild(zoomOutButton);

      stackElement.appendChild(gpsButton);

      stackElement.appendChild(mapToggleButton);

      const stackControl = new Control({ element: stackElement });
      map.addControl(stackControl);
    });

    let watchId: number | null = null;

    zoomInButton.className = "ol-zoom-btn";
    zoomInButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 512 512" fill="white">
    <path d="M256 112v288M112 256h288" stroke="white" stroke-width="48" stroke-linecap="round"/>
  </svg>
`;
    stackElement.appendChild(zoomInButton);

    zoomInButton.addEventListener("click", () => {
      map.getView().animate({ zoom: (map.getView().getZoom() as number) + 1 });
    });

    zoomOutButton.className = "ol-zoom-btn";
    zoomOutButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 512 512" fill="white">
    <path d="M112 256h288" stroke="white" stroke-width="48" stroke-linecap="round"/>
  </svg>
`;
    stackElement.appendChild(zoomOutButton);

    zoomOutButton.addEventListener("click", () => {
      map.getView().animate({ zoom: (map.getView().getZoom() as number) - 1 });
    });


    gpsButton.className = "ol-gps-btn";
    gpsButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 512 512" fill="white">
    <path d="M256 48a208 208 0 1 0 208 208A208.23 208.23 0 0 0 256 48Zm0 368a160 160 0 1 1 160-160 160.18 160.18 0 0 1-160 160Zm0-272a112 112 0 1 0 112 112 112.14 112.14 0 0 0-112-112Z"/>
  </svg>
`;

    gpsButton.addEventListener("click", () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;

        userLocationLayer.setVisible(false);
        gpsButton.style.background = "rgba(0,0,0,0.4)";
        return;
      }


      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          userLocationFeature.getGeometry()?.setCoordinates(
            fromLonLat([longitude, latitude])
          );

          userLocationLayer.setVisible(true);

          map.getView().animate({
            center: fromLonLat([longitude, latitude]),
            zoom: 15,
            duration: 500,
          });
        },
        (err) => console.error("GPS error:", err),
        { enableHighAccuracy: true }
      );


      gpsButton.style.background = "rgba(0,150,0,0.6)";
    });

    mapToggleButton.className = "ol-map-toggle-btn";
    mapToggleButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 512 512" fill="white">
    <path d="M256 32 20 176l236 144 236-144Zm0 448 236-144-52.92-32.28L256 416 72.92 303.72 20 336Zm0-112 236-144-52.92-32.28L256 304 72.92 191.72 20 224Z"/>
  </svg>
`;

    mapToggleButton.addEventListener("click", () => {
      const streetVisible = streetLayer.getVisible();
      streetLayer.setVisible(!streetVisible);
      satelliteLayer.setVisible(streetVisible);
    });

    const stackControl = new Control({ element: stackElement });


    return () => map.setTarget(undefined);
  }, []);

  return (
    <div className="map-wrap">
      <div ref={mapRef} className="map" />
    </div>
  );
};

export default MapContainer;
