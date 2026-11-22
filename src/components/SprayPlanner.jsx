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
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Droplet className="w-4 h-4 text-emerald-400" />
              Variable-Rate Spot-Spraying (VRA) Prescription Planner
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
              RTK Centimeter Nozzle Actuation
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Generates MAVLink / GeoJSON prescription missions to open solenoid valves only above verified pest micro-clusters
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={downloadPrescriptionGeoJSON}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export GeoJSON / KML</span>
          </button>

          <button
            onClick={handleArmMission}
            disabled={missionArmed && missionProgress < 100}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
              missionArmed && missionProgress < 100
                ? 'bg-amber-600 text-white cursor-wait'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 hover:scale-[1.02]'
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

      {/* Chemical Savings & Quantitative ROI Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 rounded-xl p-5">
          <span className="text-xs font-semibold uppercase text-emerald-400 tracking-wider">
            Chemical Reduction
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{savingsPercent}%</span>
            <span className="text-xs font-bold text-emerald-400">Pesticide Saved</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Spot-spraying uses {spotVolumeL} L vs {blanketVolumeL} L blanket drenching
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
            Agrochemical Saved
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{savedVolumeL}</span>
            <span className="text-xs font-semibold text-slate-300">Liters / round</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Zero runoff into garden perimeter drainage systems
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
            Cost Saved / Cycle
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">₹{Number(costSavingsINR).toLocaleString()}</span>
            <span className="text-xs font-semibold text-emerald-400">Direct Savings</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Based on current tea estate chemical procurement rates
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
            Water Saved
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">420</span>
            <span className="text-xs font-semibold text-slate-300">Liters Water</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
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
            <div className="bg-slate-900 border border-emerald-500/40 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <Radio className="w-4 h-4 animate-pulse text-emerald-400" />
                  Live RTK Spot-Spraying Mission in Progress • Section 4B
                </span>
                <span className="font-mono text-white font-bold">{missionProgress}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${missionProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                <span>Waypoint {Math.min(9, Math.ceil((missionProgress / 100) * 9))} of 9</span>
                <span>Altitude: 18m AGL • Flow: 1.2 L/min</span>
              </div>
            </div>
          )}

          {/* Hotspot Target Queue */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <h3 className="text-sm font-bold text-white">Targeted Micro-Clusters ({selectedSection.hotspotsCount})</h3>
                <p className="text-xs text-slate-400">Coordinate actuation points for Section 4B</p>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Centimeter RTK-Fix
              </span>
            </div>

            <div className="space-y-2.5">
              {DETECTED_HOTSPOTS.map((hs, idx) => (
                <div
                  key={hs.id}
                  className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 font-mono font-bold text-slate-300 flex items-center justify-center text-[11px]">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white font-mono">{hs.id}</strong>
                        <span className="italic text-slate-300 font-medium">({hs.pestName})</span>
                        <span className="text-[10px] px-1.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                          {hs.severity}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Lat: {hs.lat.toFixed(5)}, Lng: {hs.lng.toFixed(5)} • Radius: {hs.affectedRadiusMeters}m
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-emerald-400 font-bold block">{hs.spotSprayVolumeL} L</span>
                    <span className="text-[10px] text-slate-400">PWM Duty: 75%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Solenoid Nozzle Parameters & Droplet Simulation */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              Solenoid & Droplet Configuration
            </h3>

            {/* Slider 1: PWM Frequency */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>PWM Pulse Frequency:</span>
                <span className="font-mono font-bold text-emerald-400">{pwmFrequencyHz} Hz</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={pwmFrequencyHz}
                onChange={(e) => setPwmFrequencyHz(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Regulates high-frequency micro-burst timing</span>
            </div>

            {/* Slider 2: Droplet Size */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Droplet VMD Spectrum:</span>
                <span className="font-mono font-bold text-emerald-400">{dropletSizeMicrons} µm</span>
              </div>
              <input
                type="range"
                min="150"
                max="300"
                value={dropletSizeMicrons}
                onChange={(e) => setDropletSizeMicrons(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Anti-drift envelope to prevent off-target runoff</span>
            </div>

            {/* Water Sensitive Paper (WSP) Simulation Preview */}
            <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white block">
                Water-Sensitive Paper (WSP) Card Simulator
              </span>
              <p className="text-[11px] text-slate-400">
                Canopy penetration validation: Target &gt;70 droplets/cm²
              </p>
              
              <div className="h-20 rounded bg-amber-200 relative overflow-hidden flex items-center justify-center p-2 border border-amber-300">
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
                <div className="absolute bottom-1 right-1 bg-slate-900/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-emerald-400">
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
