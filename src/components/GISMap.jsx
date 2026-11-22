import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  Crosshair, 
  Layers, 
  Play, 
  Pause, 
  RotateCcw, 
  Plane, 
  AlertTriangle, 
  Droplet, 
  ShieldCheck, 
  Eye, 
  Info,
  Maximize2
} from 'lucide-react';
import { TEA_SECTIONS, DETECTED_HOTSPOTS } from '../data/mockData';

// Fix Leaflet Default Icon in Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Hotspot Marker Icon
const createHotspotIcon = (severity) => {
  const color = severity === 'Critical' ? '#f43f5e' : severity === 'High' ? '#f97316' : '#eab308';
  return L.divIcon({
    className: 'custom-hotspot-pin',
    html: `
      <div style="
        background: ${color};
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 10px ${color};
        animation: pulse 1.5s infinite;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 6px; height: 6px; background: white; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
};

// Drone Marker Icon
const droneIcon = L.divIcon({
  className: 'custom-drone-pin',
  html: `
    <div style="
      background: #10b981;
      width: 26px;
      height: 26px;
      border-radius: 8px;
      border: 2px solid #ecfdf5;
      box-shadow: 0 0 15px #10b981;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(45deg);
    ">
      <span style="font-size: 13px; transform: rotate(-45deg);">✈️</span>
    </div>
  `,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

// Helper component to recenter map
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 16, { duration: 1.5 });
  }, [center, map]);
  return null;
}

export default function GISMap({ selectedEstate, setActiveTab }) {
  const [selectedSection, setSelectedSection] = useState(TEA_SECTIONS[1]); // Default Section 4B
  const [activeLayers, setActiveLayers] = useState({
    sections: true,
    hotspots: true,
    sprayRadius: true,
    flightPath: true,
    ndviOverlay: false,
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [droneStep, setDroneStep] = useState(0);

  // Simulated flight path waypoints over Section 4B
  const flightWaypoints = [
    [26.7515, 94.2270],
    [26.7520, 94.2285],
    [26.7512, 94.2295], // Hotspot HS-101
    [26.7521, 94.2308], // Hotspot HS-102
    [26.7530, 94.2315],
    [26.7515, 94.2325],
    [26.7498, 94.2315], // Hotspot HS-103
    [26.7485, 94.2290], // Hotspot HS-104
    [26.7475, 94.2285]
  ];

  // Simulation animation loop
  useEffect(() => {
    let timer;
    if (isSimulating) {
      timer = setInterval(() => {
        setDroneStep((prev) => (prev + 1) % flightWaypoints.length);
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isSimulating, flightWaypoints.length]);

  const toggleLayer = (layerKey) => {
    setActiveLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const currentDronePos = flightWaypoints[droneStep];

  return (
    <div className="space-y-4">
      {/* Top Map Control Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-emerald-400" />
            Tea Garden Geospatial GIS Engine • Section 4B (Jorhat)
          </h2>
          <p className="text-xs text-slate-400">
            Centimeter-accurate RTK coordinate mapping of tea bush canopies and pest clusters
          </p>
        </div>

        {/* Flight Simulation Controls */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-all ${
              isSimulating
                ? 'bg-rose-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'Pause Mission' : 'Simulate Drone Flight'}</span>
          </button>
          
          <button
            onClick={() => {
              setIsSimulating(false);
              setDroneStep(0);
            }}
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200"
            title="Reset flight path"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Layer Toggles */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => toggleLayer('hotspots')}
            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 transition-all ${
              activeLayers.hotspots
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            Pest Hotspots ({DETECTED_HOTSPOTS.length})
          </button>

          <button
            onClick={() => toggleLayer('sprayRadius')}
            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 transition-all ${
              activeLayers.sprayRadius
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            VRA Spot Buffers
          </button>

          <button
            onClick={() => toggleLayer('flightPath')}
            className={`px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 transition-all ${
              activeLayers.flightPath
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Plane className="w-3 h-3 text-emerald-400" />
            Flight Path
          </button>
        </div>
      </div>

      {/* Main Map + Side Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Map Container (3 Cols) */}
        <div className="lg:col-span-3 h-[580px] rounded-xl overflow-hidden border border-slate-800 relative z-0">
          <MapContainer
            center={[26.7509, 94.2270]}
            zoom={16}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <MapController center={[26.7509, 94.2270]} />

            {/* Satellite / Dark Base Layer */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Tea Sections Polygon Layers */}
            {activeLayers.sections &&
              TEA_SECTIONS.map((sec) => {
                const isSelected = selectedSection.id === sec.id;
                const strokeColor = sec.status === 'critical' ? '#f43f5e' : sec.status === 'warning' ? '#eab308' : '#10b981';
                const fillColor = sec.status === 'critical' ? '#e11d48' : sec.status === 'warning' ? '#ca8a04' : '#059669';

                return (
                  <Polygon
                    key={sec.id}
                    positions={sec.coordinates}
                    pathOptions={{
                      color: strokeColor,
                      weight: isSelected ? 3 : 1.5,
                      fillColor: fillColor,
                      fillOpacity: isSelected ? 0.35 : 0.18,
                    }}
                    eventHandlers={{
                      click: () => setSelectedSection(sec),
                    }}
                  >
                    <Popup>
                      <div className="p-1 space-y-1 text-slate-100">
                        <h4 className="font-bold text-sm text-white">{sec.name}</h4>
                        <p className="text-xs text-slate-300">
                          Acreage: <strong>{sec.areaHa} Ha</strong> ({sec.bushes.toLocaleString()} bushes)
                        </p>
                        <p className="text-xs">
                          Status:{' '}
                          <span className={sec.status === 'critical' ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                            {sec.status.toUpperCase()} ({sec.infestationRate}% Infestation)
                          </span>
                        </p>
                        <p className="text-xs text-slate-400 italic">
                          Dominant Pest: {sec.dominantPest}
                        </p>
                      </div>
                    </Popup>
                  </Polygon>
                );
              })}

            {/* Hotspot Markers & Spot Buffers */}
            {activeLayers.hotspots &&
              DETECTED_HOTSPOTS.map((hs) => (
                <React.Fragment key={hs.id}>
                  <Marker
                    position={[hs.lat, hs.lng]}
                    icon={createHotspotIcon(hs.severity)}
                  >
                    <Popup>
                      <div className="p-1.5 space-y-2 text-slate-100 max-w-[220px]">
                        <div className="flex items-center justify-between border-b border-slate-700 pb-1">
                          <span className="font-mono text-xs font-bold text-emerald-400">{hs.id}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            hs.severity === 'Critical' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {hs.severity}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white italic">{hs.pestName}</p>
                          <p className="text-[11px] text-slate-300">Confidence: <strong>{hs.confidence}%</strong></p>
                          <p className="text-[11px] text-slate-300">Affected Bushes: <strong>{hs.bushCount}</strong></p>
                          <p className="text-[11px] text-slate-300">Prescribed Spot-Spray: <strong>{hs.spotSprayVolumeL} L</strong></p>
                        </div>
                        <button
                          onClick={() => setActiveTab('spray-planner')}
                          className="w-full text-center py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-semibold"
                        >
                          Arm Solenoid Nozzle
                        </button>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Spot-Spraying Buffer Circle */}
                  {activeLayers.sprayRadius && (
                    <Circle
                      center={[hs.lat, hs.lng]}
                      radius={hs.affectedRadiusMeters}
                      pathOptions={{
                        color: hs.severity === 'Critical' ? '#f43f5e' : '#f59e0b',
                        weight: 1,
                        fillColor: hs.severity === 'Critical' ? '#f43f5e' : '#f59e0b',
                        fillOpacity: 0.25,
                        dashArray: '4, 4'
                      }}
                    />
                  )}
                </React.Fragment>
              ))}

            {/* Flight Path Polyline */}
            {activeLayers.flightPath && (
              <Polyline
                positions={flightWaypoints}
                pathOptions={{
                  color: '#34d399',
                  weight: 2,
                  dashArray: '5, 8',
                  opacity: 0.8
                }}
              />
            )}

            {/* Simulated Live Drone Marker */}
            <Marker position={currentDronePos} icon={droneIcon}>
              <Popup>
                <div className="p-1 text-slate-100 text-xs">
                  <strong className="text-emerald-400">HexaSpray VRA-16 (Live)</strong>
                  <p>Altitude: 18m AGL</p>
                  <p>Speed: 6.8 m/s</p>
                  <p>Status: {isSimulating ? 'Active Spot Spraying' : 'Hover / Standby'}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>

          {/* Map Floating Telemetry HUD */}
          <div className="absolute bottom-4 left-4 z-10 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 text-xs text-slate-200 shadow-xl space-y-1.5 min-w-[200px]">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1">
              <span className="font-semibold text-[11px] uppercase tracking-wider">Drone Telemetry</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Waypoint:</span>
              <span className="font-mono font-bold text-white">{droneStep + 1} / {flightWaypoints.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Altitude AGL:</span>
              <span className="font-mono text-emerald-400 font-semibold">18.4 meters</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">GNSS Accuracy:</span>
              <span className="font-mono text-emerald-400 font-semibold">±1.8 cm (RTK-Fix)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">PWM Solenoid:</span>
              <span className="font-mono text-amber-400 font-bold">
                {isSimulating && [2, 3, 6, 7].includes(droneStep) ? 'PULSING (Active)' : 'STANDBY (0 L/m)'}
              </span>
            </div>
          </div>
        </div>

        {/* Selected Section Details & Hotspot List (1 Col) */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white">{selectedSection.name}</h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                selectedSection.status === 'critical'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {selectedSection.status.toUpperCase()}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Block Area:</span>
                <span className="font-mono text-slate-200 font-semibold">{selectedSection.areaHa} Hectares</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Plantation Clone:</span>
                <span className="text-slate-200 font-medium">TV-1 Heritage Clone</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Infestation Rate:</span>
                <span className="font-bold text-rose-400">{selectedSection.infestationRate}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Detected Hotspots:</span>
                <span className="font-bold text-amber-400">{selectedSection.hotspotsCount} micro-clusters</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Target Pest:</span>
                <span className="italic text-slate-200">Helopeltis theivora</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('spray-planner')}
              className="w-full mt-2 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
            >
              <Droplet className="w-4 h-4 text-emerald-200" />
              <span>Load VRA Prescription</span>
            </button>
          </div>

          {/* Hotspot Priority List */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Hotspot Geotags ({DETECTED_HOTSPOTS.length})
            </h4>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {DETECTED_HOTSPOTS.map((hs) => (
                <div
                  key={hs.id}
                  className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-emerald-400">{hs.id}</span>
                    <span className="text-[10px] text-slate-400">{hs.timestamp}</span>
                  </div>
                  <p className="text-white font-medium italic mt-1">{hs.pestName}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>{hs.bushCount} bushes</span>
                    <span className="font-mono text-amber-400 font-semibold">{hs.spotSprayVolumeL} L</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
