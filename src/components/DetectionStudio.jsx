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
      {/* Studio Header - White Corporate */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-700" />
              Edge AI Computer Vision Diagnostic Studio
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-bold">
              YOLOv11x-Tea v2.4
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time inference on 4K drone aerial imagery at 0.5 cm/pixel ground sampling distance (GSD)
          </p>
        </div>

        {/* Model Edge Inference Specs */}
        <div className="flex items-center gap-3 text-xs bg-slate-50 p-2 rounded-lg border border-slate-200">
          <div className="text-center px-2.5 border-r border-slate-200">
            <span className="text-[10px] text-slate-500 block">Edge Station</span>
            <span className="font-mono font-bold text-slate-900">NVIDIA Jetson Orin</span>
          </div>
          <div className="text-center px-2.5 border-r border-slate-200">
            <span className="text-[10px] text-slate-500 block">Latency</span>
            <span className="font-mono font-bold text-blue-700">28.4 ms / frame</span>
          </div>
          <div className="text-center px-2.5">
            <span className="text-[10px] text-slate-500 block">Precision</span>
            <span className="font-mono font-bold text-emerald-700">94.6% mAP@50</span>
          </div>
        </div>
      </div>

      {/* Main Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Image Viewport */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            {/* Viewport Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-bold">Target Species:</span>
                <div className="flex gap-1.5">
                  {PEST_SPECIES.map((pest) => (
                    <button
                      key={pest.id}
                      onClick={() => setSelectedPest(pest)}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                        selectedPest.id === pest.id
                          ? 'bg-blue-700 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                      }`}
                    >
                      {pest.commonName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Controls */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium select-none">
                  <input
                    type="checkbox"
                    checked={showBoundingBoxes}
                    onChange={(e) => setShowBoundingBoxes(e.target.checked)}
                    className="rounded bg-slate-100 border-slate-300 text-blue-600 focus:ring-0"
                  />
                  <span>AI Bounding Boxes</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium select-none">
                  <input
                    type="checkbox"
                    checked={showHeatmapOverlay}
                    onChange={(e) => setShowHeatmapOverlay(e.target.checked)}
                    className="rounded bg-slate-100 border-slate-300 text-blue-600 focus:ring-0"
                  />
                  <span>Thermal / Stress Heatmap</span>
                </label>
              </div>
            </div>

            {/* Canvas / Image Display Frame */}
            <div className="relative mt-4 aspect-video rounded-lg overflow-hidden border border-slate-300 bg-slate-950 flex items-center justify-center group shadow-inner">
              {/* High-Res Foliage Background */}
              <img
                src={selectedPest.detectedImages[0].url}
                alt={selectedPest.commonName}
                className="w-full h-full object-cover brightness-95 contrast-105"
              />

              {/* Stress Heatmap Layer Overlay */}
              {showHeatmapOverlay && (
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/35 via-amber-500/25 to-blue-500/25 mix-blend-color pointer-events-none" />
              )}

              {/* AI Bounding Boxes */}
              {showBoundingBoxes &&
                detections.map((det) => (
                  <div
                    key={det.id}
                    className="absolute border-2 border-rose-500 bg-rose-500/15 rounded shadow-lg transition-all hover:bg-rose-500/25"
                    style={{
                      left: `${det.x}%`,
                      top: `${det.y}%`,
                      width: `${det.w}%`,
                      height: `${det.h}%`,
                    }}
                  >
                    <div className="absolute -top-6 left-0 bg-rose-700 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap flex items-center gap-1">
                      <span>{det.label}</span>
                      <span className="bg-rose-950/70 px-1 rounded">{det.confidence}%</span>
                    </div>
                  </div>
                ))}

              {/* Image HUD Overlays */}
              <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700 text-[11px] font-mono text-white">
                RAW-RGB • 48MP • 15m AGL • GSD 0.42 cm/px
              </div>

              <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700 text-[11px] font-mono text-emerald-400">
                TRA Plant Protection Code Validated
              </div>
            </div>

            {/* Slider Controls */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-3 w-full max-w-sm">
                <Sliders className="w-4 h-4 text-blue-700" />
                <span className="whitespace-nowrap font-medium">Confidence Threshold:</span>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                  className="w-full accent-blue-700 cursor-pointer"
                />
                <span className="font-mono font-bold text-slate-900">{confidenceThreshold}%</span>
              </div>
              <span className="text-[11px] text-slate-500">Suppresses false positives from shade-tree canopy shadows</span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Entomological & Agronomic Prescription Panel */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-[10px] font-mono uppercase text-blue-700 font-bold tracking-wider">
                Taxonomic Diagnosis
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                {selectedPest.commonName}
              </h3>
              <p className="text-xs text-slate-500 italic">
                {selectedPest.scientificName} ({selectedPest.order})
              </p>
            </div>

            {/* Threat Severity & Economic Threshold Level */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium">Economic Threshold Level (ETL):</span>
                <p className="font-bold text-amber-800">{selectedPest.etl}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium">Damage Symptoms & Canopy Impact:</span>
                <p className="text-slate-700 text-[11px] leading-relaxed">{selectedPest.symptoms}</p>
              </div>
            </div>

            {/* TRA Tocklai Recommended Prescription */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>TRA Tocklai Plant Protection Protocol</span>
              </div>
              <p className="text-slate-800 text-xs leading-relaxed">
                {selectedPest.traRecommendation}
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200 text-[11px]">
                <div>
                  <span className="text-slate-600">EU MRL Limit:</span>
                  <span className="font-mono text-emerald-800 font-bold ml-1">{selectedPest.mrlPpmEU} ppm</span>
                </div>
                <div>
                  <span className="text-slate-600">FSSAI Limit:</span>
                  <span className="font-mono text-emerald-800 font-bold ml-1">{selectedPest.mrlPpmFSSAI} ppm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
