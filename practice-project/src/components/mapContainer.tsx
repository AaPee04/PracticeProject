import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import TileJSON from 'ol/source/TileJSON.js';
import Attribution from 'ol/control/Attribution.js';
import { defaults as defaultControls } from 'ol/control/defaults.js';
import { fromLonLat } from 'ol/proj.js';

const key = 'Sef0x7LTO0dkohPrF8Qh';

const attribution = new Attribution({
  collapsible: false,
});

const source = new TileJSON({
  url: `https://api.maptiler.com/maps/openstreetmap/tiles.json?key=${key}`, // source URL
  tileSize: 512,
  crossOrigin: 'anonymous'
});

const MapContainer = new Map({
  layers: [
    new TileLayer({
      source: source
    })
  ],
  controls: defaultControls({attribution: false}).extend([attribution]),
  target: 'map',
  view: new View({
    constrainResolution: true,
    center: fromLonLat([25.4682, 65.0121]), // starting position [lng, lat]
    zoom: 2 // starting zoom
  })
});

export default MapContainer;