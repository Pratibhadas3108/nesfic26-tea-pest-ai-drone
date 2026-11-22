import React, { useState } from 'react';
import { 
  Cpu, 
  Search, 
  Sliders, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Zap, 
  Maximize2, 
  Eye, 
  Tag, 
  Sparkles,
  Info
} from 'lucide-react';
import { PEST_SPECIES } from '../data/mockData';

export default function DetectionStudio() {
  const [selectedPest, setSelectedPest] = useState(PEST_SPECIES[0]);
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [showHeatmapOverlay, setShowHeatmapOverlay] = useState(false);

  // Simulated detection boxes for Helopeltis
  const detections = [
    { id: 1, label: 'Helopeltis feeding puncture', confidence: 96.4, x: 28, y: 32, w: 22, h: 26, stage: 'Stage 2 Necrosis' },
    { id: 2, label: 'Helopeltis early lesion', confidence: 91.8, x: 58, y: 45, w: 18, h: 20, stage: 'Stage 1 Puncture' },
    { id: 3, label: 'Secondary flush damage', confidence: 84.2, x: 40, y: 65, w: 25, h: 22, stage: 'Stage 2 Necrosis' },
  ];

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Edge AI Computer Vision Diagnostic Studio
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
              YOLOv11x-Tea v2.4
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time inference on 4K drone aerial imagery at 0.5 cm/pixel ground sampling distance (GSD)
          </p>
        </div>

        {/* Model Edge Inference Specs */}
        <div className="flex items-center gap-3 text-xs bg-slate-950 p-2 rounded-lg border border-slate-800">
          <div className="text-center px-2 border-r border-slate-800">
            <span className="text-[10px] text-slate-400 block">Edge Hardware</span>
            <span className="font-mono font-bold text-white">NVIDIA Jetson Orin</span>
          </div>
          <div className="text-center px-2 border-r border-slate-800">
            <span className="text-[10px] text-slate-400 block">Latency</span>
            <span className="font-mono font-bold text-emerald-400">28.4 ms / frame</span>
          </div>
          <div className="text-center px-2">
            <span className="text-[10px] text-slate-400 block">Precision</span>
            <span className="font-mono font-bold text-indigo-400">94.6% mAP@50</span>
          </div>
        </div>
      </div>

      {/* Main Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Image Viewport */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            {/* Viewport Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium">Target Species:</span>
                <div className="flex gap-1.5">
                  {PEST_SPECIES.map((pest) => (
                    <button
                      key={pest.id}
                      onClick={() => setSelectedPest(pest)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                        selectedPest.id === pest.id
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {pest.commonName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Controls */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={showBoundingBoxes}
                    onChange={(e) => setShowBoundingBoxes(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0"
                  />
                  <span>AI Bounding Boxes</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={showHeatmapOverlay}
                    onChange={(e) => setShowHeatmapOverlay(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0"
                  />
                  <span>Thermal / Stress Heatmap</span>
                </label>
              </div>
            </div>

            {/* Canvas / Image Display Frame */}
            <div className="relative mt-4 aspect-video rounded-lg overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center group">
              {/* Simulated High-Res Foliage Background */}
              <img
                src={selectedPest.detectedImages[0].url}
                alt={selectedPest.commonName}
                className="w-full h-full object-cover brightness-95 contrast-105"
              />

              {/* Stress Heatmap Layer Overlay */}
              {showHeatmapOverlay && (
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/30 via-amber-500/20 to-emerald-500/20 mix-blend-color pointer-events-none" />
              )}

              {/* AI Bounding Boxes */}
              {showBoundingBoxes &&
                detections.map((det) => (
                  <div
                    key={det.id}
                    className="absolute border-2 border-rose-500 bg-rose-500/10 rounded shadow-lg shadow-rose-500/20 transition-all hover:bg-rose-500/20"
                    style={{
                      left: `${det.x}%`,
                      top: `${det.y}%`,
                      width: `${det.w}%`,
                      height: `${det.h}%`,
                    }}
                  >
                    <div className="absolute -top-6 left-0 bg-rose-600 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap flex items-center gap-1">
                      <span>{det.label}</span>
                      <span className="bg-rose-950/60 px-1 rounded">{det.confidence}%</span>
                    </div>
                  </div>
                ))}

              {/* Image HUD Overlays */}
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-800 text-[11px] font-mono text-slate-300">
                RAW-RGB • 48MP • 15m AGL • GSD 0.42 cm/px
              </div>

              <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-slate-800 text-[11px] font-mono text-emerald-400">
                TRA Plant Protection Code Validated
              </div>
            </div>

            {/* Slider Controls */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3 w-full max-w-sm">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span className="whitespace-nowrap">Confidence Threshold:</span>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <span className="font-mono font-bold text-white">{confidenceThreshold}%</span>
              </div>
              <span className="text-[11px] text-slate-500">Filters false positives from shade-tree shadows</span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Entomological & Agronomic Prescription Panel */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                Taxonomic Diagnosis
              </span>
              <h3 className="text-base font-extrabold text-white mt-0.5">
                {selectedPest.commonName}
              </h3>
              <p className="text-xs text-slate-400 italic">
                {selectedPest.scientificName} ({selectedPest.order})
              </p>
            </div>

            {/* Threat Severity & Economic Threshold Level */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium">Economic Threshold Level (ETL):</span>
                <p className="font-semibold text-amber-300">{selectedPest.etl}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium">Damage Symptoms & Canopy Impact:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{selectedPest.symptoms}</p>
              </div>
            </div>

            {/* TRA Tocklai Recommended Prescription */}
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>TRA Tocklai Plant Protection Protocol</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                {selectedPest.traRecommendation}
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-900/50 text-[11px]">
                <div>
                  <span className="text-slate-400">EU MRL Limit:</span>
                  <span className="font-mono text-emerald-300 font-bold ml-1">{selectedPest.mrlPpmEU} ppm</span>
                </div>
                <div>
                  <span className="text-slate-400">FSSAI Limit:</span>
                  <span className="font-mono text-emerald-300 font-bold ml-1">{selectedPest.mrlPpmFSSAI} ppm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
