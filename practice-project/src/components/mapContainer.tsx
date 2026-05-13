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
import Overlay from "ol/Overlay";
import LineString from "ol/geom/LineString";
import Stroke from "ol/style/Stroke";

import "./mapContainer.css";

const key = "Sef0x7LTO0dkohPrF8Qh";

const MapContainer: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const attribution = new Attribution({ collapsible: false });

    const streetLayer = new TileLayer({
      source: new TileJSON({
        url: `https://api.maptiler.com/maps/streets/tiles.json?key=${key}`,
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

    const baseLayer = new TileLayer({
      source: new TileJSON({
        url: `https://api.maptiler.com/maps/base/tiles.json?key=${key}`,
        tileSize: 512,
        crossOrigin: "anonymous",
      }),
      visible: false,
    });

    const map = new Map({
      target: mapRef.current,
      layers: [streetLayer, satelliteLayer, baseLayer],
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

    const userLocationSource = new VectorSource({
      features: [userLocationFeature],
    });

    const userLocationLayer = new VectorLayer({
      source: userLocationSource,
      visible: false,
    });

    map.addLayer(userLocationLayer);

    const userLocationEl = document.createElement("div");
    userLocationEl.className = "ol-user-location";

    const userLocationOverlay = new Overlay({
      element: userLocationEl,
      positioning: "center-center",
      stopEvent: false,
    });

    map.addOverlay(userLocationOverlay);

    const stackElement = document.createElement("div");
    stackElement.className = "ol-control-stack ol-unselectable ol-control";

    const zoomInButton = document.createElement("button");
    const zoomOutButton = document.createElement("button");
    const gpsButton = document.createElement("button");
    const mapToggleButton = document.createElement("button");

    const routeFeature = new Feature({
      geometry: new LineString([]),
    });

    routeFeature.setStyle(
      new Style({
        stroke: new Stroke({
          color: "deepskyblue",
          width: 4,
        }),
      })
    );

    const routeSource = new VectorSource({
      features: [routeFeature],
    });

    const routeLayer = new VectorLayer({
      source: routeSource,
      visible: false,
    });

    map.addLayer(routeLayer);

    const walkToggleBtn = document.getElementById("walkToggleBtn");
    if (!walkToggleBtn) {
      console.error("walkToggleBtn not found");
      return;
    }

    let isWalking = false;
    let routeCoords: number[][] = [];
    let walkStartTime: number | null = null;

    map.once("postrender", () => {
      stackElement.appendChild(zoomInButton);
      stackElement.appendChild(zoomOutButton);
      stackElement.appendChild(gpsButton);
      stackElement.appendChild(mapToggleButton);

      const stackControl = new Control({ element: stackElement });
      map.addControl(stackControl);



      walkToggleBtn.addEventListener("click", async () => {
        if (!isWalking) {
          isWalking = true;
          walkToggleBtn.textContent = "Stop Walk";

          routeCoords = [];
          walkStartTime = Date.now();

          routeLayer.setVisible(true);
          userLocationEl.style.display = "block";

          gpsButton.style.pointerEvents = "none";
          gpsButton.style.opacity = "0.4";

          gpsButton.click();

        } else {
          isWalking = false;
          walkToggleBtn.textContent = "Start Walk";

          gpsButton.style.pointerEvents = "auto";
          gpsButton.style.opacity = "1";

          if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
          }

          userLocationEl.style.display = "none";
          routeLayer.setVisible(false);

          const walkEndTime = Date.now();
          const durationSec = Math.floor((walkEndTime - walkStartTime!) / 1000);

          const distance = calculateDistance(routeCoords);

          const avgSpeed =
            distance > 0 && durationSec > 0
              ? (distance / 1000) / (durationSec / 3600)
              : 0;

          await fetch("http://localhost:8000/add_walk.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              distance,
              duration: durationSec,
              avg_speed: avgSpeed,
              route: routeCoords
            })
          });

          alert("Walk Saved!");

          routeCoords = [];
        }
      });
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
      if (isWalking) return;

      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;

        userLocationEl.style.display = "none";

        map.once("postrender", () => {
          userLocationOverlay.setPosition(map.getView().getCenter());
        });

        gpsButton.style.background = "rgba(0,0,0,0.4)";
        return;
      }

      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          const coords = fromLonLat([longitude, latitude]);

          routeCoords.push(coords);
          routeFeature.getGeometry()?.setCoordinates(routeCoords);
          routeLayer.setVisible(true);

          userLocationOverlay.setPosition(coords);
          userLocationEl.style.display = "block";

          map.getView().animate({
            center: coords,
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

  function calculateDistance(coords: number[][]) {
    if (coords.length < 2) return 0;

    let total = 0;

    for (let i = 1; i < coords.length; i++) {
      const [x1, y1] = coords[i - 1];
      const [x2, y2] = coords[i];

      const dx = x2 - x1;
      const dy = y2 - y1;

      total += Math.sqrt(dx * dx + dy * dy);
    }

    return total * 111139; // asteet → metrit
  }

  return (
    <div className="map-wrap">
      <div ref={mapRef} className="map" />
      <button id="walkToggleBtn" className="walk-toggle-btn">Start Walk</button>
    </div>
  );
};

export default MapContainer;