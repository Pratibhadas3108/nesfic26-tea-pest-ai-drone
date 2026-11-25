import React, { useState } from 'react';
import { 
  Plane, 
  Droplet, 
  CheckCircle, 
  Download, 
  TrendingDown, 
  ShieldAlert, 
  Play, 
  Sliders, 
  Layers, 
  CheckCircle2, 
  FileCode,
  Radio,
  Sparkles
} from 'lucide-react';
import { TEA_SECTIONS, DETECTED_HOTSPOTS } from '../data/mockData';

export default function SprayPlanner() {
  const [selectedSection, setSelectedSection] = useState(TEA_SECTIONS[1]); // Section 4B
  const [pwmFrequencyHz, setPwmFrequencyHz] = useState(20);
  const [dropletSizeMicrons, setDropletSizeMicrons] = useState(200);
  const [missionArmed, setMissionArmed] = useState(false);
  const [missionProgress, setMissionProgress] = useState(0);

  // Calculations for chemical savings
  const blanketVolumeL = (selectedSection.areaHa * 10).toFixed(1); // 10L/ha standard blanket
  const spotVolumeL = (selectedSection.hotspotsCount * 2.4).toFixed(1); // Spot spray per hotspot
  const savedVolumeL = (blanketVolumeL - spotVolumeL).toFixed(1);
  const savingsPercent = (((blanketVolumeL - spotVolumeL) / blanketVolumeL) * 100).toFixed(1);
  const costSavingsINR = (savedVolumeL * 165).toFixed(0); // ₹165/L pesticide cost

  const handleArmMission = () => {
    setMissionArmed(true);
    setMissionProgress(0);
    const interval = setInterval(() => {
      setMissionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 600);
  };

  const downloadPrescriptionGeoJSON = () => {
    const geojson = {
      type: "FeatureCollection",
      metadata: {
        mission: "NESFIC-I-07-SpotSpray",
        section: selectedSection.name,
        estate: "TRA Tocklai Experimental Station",
        targetPest: "Helopeltis theivora",
        chemicalSavedPct: savingsPercent,
        generatedAt: new Date().toISOString()
      },
      features: DETECTED_HOTSPOTS.map((hs) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [hs.lng, hs.lat]
        },
        properties: {
          hotspotId: hs.id,
          pest: hs.pestName,
          severity: hs.severity,
          sprayRadiusM: hs.affectedRadiusMeters,
          prescribedVolumeL: hs.spotSprayVolumeL,
          pwmDutyCyclePct: 75,
          dropletVMDMicrons: dropletSizeMicrons
        }
      }))
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VRA_Prescription_${selectedSection.id}.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header - White Corporate */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-blue-700" />
              Variable-Rate Spot-Spraying (VRA) Prescription Planner
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-bold">
              RTK Centimeter Nozzle Actuation
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Generates MAVLink / GeoJSON prescription missions to open solenoid valves only above verified pest micro-clusters
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={downloadPrescriptionGeoJSON}
            className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-blue-700" />
            <span>Export GeoJSON / KML</span>
          </button>

          <button
            onClick={handleArmMission}
            disabled={missionArmed && missionProgress < 100}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow-sm transition-all ${
              missionArmed && missionProgress < 100
                ? 'bg-amber-600 text-white cursor-wait'
                : 'bg-blue-700 hover:bg-blue-800 text-white hover:scale-[1.02]'
            }`}
          >
            <Plane className="w-4 h-4" />
            <span>
              {missionArmed && missionProgress < 100
                ? `Executing Mission (${missionProgress}%)`
                : missionProgress === 100
                ? 'Mission Completed ✓'
                : 'Arm & Launch Spot-Sprayer'}
            </span>
          </button>
        </div>
      </div>

      {/* Chemical Savings & Quantitative ROI Card - White / Light Gray */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs font-bold uppercase text-emerald-800 tracking-wider">
            Chemical Reduction
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-950">{savingsPercent}%</span>
            <span className="text-xs font-bold text-emerald-700">Pesticide Saved</span>
          </div>
          <p className="text-[11px] text-emerald-800 mt-2 font-medium">
            Spot-spraying uses {spotVolumeL} L vs {blanketVolumeL} L blanket drenching
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
            Agrochemical Saved
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{savedVolumeL}</span>
            <span className="text-xs font-semibold text-slate-500">Liters / round</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Zero runoff into garden perimeter drainage systems
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
            Cost Saved / Cycle
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">₹{Number(costSavingsINR).toLocaleString()}</span>
            <span className="text-xs font-bold text-emerald-700">Direct Savings</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Based on current tea estate chemical procurement rates
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
            Water Saved
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">420</span>
            <span className="text-xs font-semibold text-slate-500">Liters Water</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Ultra-Low Volume (ULV) atomization efficiency
          </p>
        </div>
      </div>

      {/* Main Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Actuation Profile & Hotspot Target List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Mission Progress Bar if armed */}
          {missionArmed && (
            <div className="bg-white border border-blue-300 rounded-xl p-4 space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-800 flex items-center gap-1.5">
                  <Radio className="w-4 h-4 animate-pulse text-blue-600" />
                  Live RTK Spot-Spraying Mission in Progress • Section 4B
                </span>
                <span className="font-mono text-slate-900 font-bold">{missionProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${missionProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                <span>Waypoint {Math.min(9, Math.ceil((missionProgress / 100) * 9))} of 9</span>
                <span>Altitude: 18m AGL • Flow: 1.2 L/min</span>
              </div>
            </div>
          )}

          {/* Hotspot Target Queue - White Corporate */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Targeted Micro-Clusters ({selectedSection.hotspotsCount})</h3>
                <p className="text-xs text-slate-500">Coordinate actuation points for Section 4B</p>
              </div>
              <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 font-mono">
                Centimeter RTK-Fix
              </span>
            </div>

            <div className="space-y-2.5">
              {DETECTED_HOTSPOTS.map((hs, idx) => (
                <div
                  key={hs.id}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs hover:border-blue-300 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-200 font-mono font-bold text-slate-700 flex items-center justify-center text-[11px]">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-900 font-mono">{hs.id}</strong>
                        <span className="italic text-slate-700 font-medium">({hs.pestName})</span>
                        <span className="text-[10px] px-1.5 rounded bg-rose-100 text-rose-800 font-bold">
                          {hs.severity}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        Lat: {hs.lat.toFixed(5)}, Lng: {hs.lng.toFixed(5)} • Radius: {hs.affectedRadiusMeters}m
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-emerald-700 font-bold block">{hs.spotSprayVolumeL} L</span>
                    <span className="text-[10px] text-slate-500 font-medium">PWM Duty: 75%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Solenoid Nozzle Parameters & Droplet Simulation */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
              Solenoid & Droplet Configuration
            </h3>

            {/* Slider 1: PWM Frequency */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-700 font-medium">
                <span>PWM Pulse Frequency:</span>
                <span className="font-mono font-bold text-blue-700">{pwmFrequencyHz} Hz</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={pwmFrequencyHz}
                onChange={(e) => setPwmFrequencyHz(Number(e.target.value))}
                className="w-full accent-blue-700 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Regulates high-frequency micro-burst timing</span>
            </div>

            {/* Slider 2: Droplet Size */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Droplet VMD Spectrum:</span>
                <span className="font-mono font-bold text-blue-700">{dropletSizeMicrons} µm</span>
              </div>
              <input
                type="range"
                min="150"
                max="300"
                value={dropletSizeMicrons}
                onChange={(e) => setDropletSizeMicrons(Number(e.target.value))}
                className="w-full accent-blue-700 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Anti-drift envelope to prevent off-target runoff</span>
            </div>

            {/* Water Sensitive Paper (WSP) Simulation Preview */}
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-900 block">
                Water-Sensitive Paper (WSP) Card Simulator
              </span>
              <p className="text-[11px] text-slate-500">
                Canopy penetration validation: Target &gt;70 droplets/cm²
              </p>
              
              <div className="h-20 rounded bg-amber-100 relative overflow-hidden flex items-center justify-center p-2 border border-amber-300">
                {/* Simulated droplet dots on yellow paper */}
                <div className="w-full h-full relative">
                  {[...Array(35)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-blue-700 opacity-80"
                      style={{
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        top: `${Math.random() * 85}%`,
                        left: `${Math.random() * 95}%`,
                      }}
                    />
                  ))}
                </div>
                <div className="absolute bottom-1 right-1 bg-white/95 px-1.5 py-0.5 rounded text-[9px] font-mono text-emerald-800 font-bold border border-slate-200 shadow-sm">
                  Density: 82 droplets/cm² (OPTIMAL)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
