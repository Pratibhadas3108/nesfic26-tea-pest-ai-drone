import React from 'react';
import { 
  Plane, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingDown, 
  Droplet, 
  Activity, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Layers, 
  CheckCircle,
  Percent,
  Sparkles
} from 'lucide-react';
import { TEA_SECTIONS, PEST_SPECIES, DETECTED_HOTSPOTS, DRONE_FLEET } from '../data/mockData';

export default function Overview({ setActiveTab, selectedEstate }) {
  const criticalSections = TEA_SECTIONS.filter(s => s.status === 'critical');
  const totalBushes = TEA_SECTIONS.reduce((acc, s) => acc + s.bushes, 0);
  const totalHotspots = DETECTED_HOTSPOTS.length;

  return (
    <div className="space-y-6">
      {/* Hero Problem Statement & System Status Banner - Navy Blue Corporate */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900 text-white p-6 md:p-8 shadow-md border border-navy-700">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TRA Tocklai Agro-Innovation Protocol • NESFIC-I-07</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-medium border border-white/10">
                <span>Lead Applicant: <strong className="text-white">Rangan Bhuyan</strong></span>
                <span className="text-slate-400">•</span>
                <span className="text-blue-300">TeaTech Labs</span>
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              AI-Driven Drone Pest Detection & Variable-Rate Spot-Spraying
            </h1>
            
            <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
              Replacing calendar-based blanket pesticide drenching with sub-meter computer vision scouting and targeted solenoid spot-spraying across Assam tea plantations. Slashing agrochemical usage, preserving beneficial fauna, and ensuring zero-exceedance export MRL compliance.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Station: {selectedEstate.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>Last Aerial Survey: {selectedEstate.lastSurvey}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Plant Protection Code (PPC) Validated</span>
              </div>
            </div>
          </div>

          {/* Quick Action Button Group */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 min-w-[200px]">
            <button
              onClick={() => setActiveTab('gis-map')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Plane className="w-4 h-4" />
              <span>Launch Mission Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('spray-planner')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Droplet className="w-4 h-4 text-amber-300" />
              <span>Plan Spot-Spraying</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Alert for Critical Section */}
      {criticalSections.length > 0 && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-700 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                Action Required: {criticalSections[0].name} Exceeds Economic Threshold Level (ETL)
              </h3>
              <p className="text-xs text-amber-800 mt-0.5">
                Aerial survey identified <strong>{criticalSections[0].hotspotsCount} micro-infestation clusters</strong> of <em>Helopeltis theivora</em> (24.8% foliage attack). Automated spot-spray prescription is generated.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('spray-planner')}
            className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs whitespace-nowrap transition-all shadow-sm"
          >
            Review & Arm Drone
          </button>
        </div>
      )}

      {/* KPI Cards - White Corporate Background with Navy Accents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Chemical Reduction */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-400 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Agrochemical Saved</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">68.4%</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-0.5">
              ↓ 87.8 Liters
            </span>
          </div>
          <p className="text-slate-500 text-xs mt-1.5">
            Versus conventional blanket spraying in Section 4B
          </p>
        </div>

        {/* KPI 2: Surveyed Area & Bushes */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-400 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Canopy Monitored</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{selectedEstate.totalAreaHa}</span>
            <span className="text-xs font-semibold text-slate-500">Hectares</span>
          </div>
          <p className="text-slate-500 text-xs mt-1.5">
            {totalBushes.toLocaleString()} tea bushes across 4 estate blocks
          </p>
        </div>

        {/* KPI 3: AI Detection Precision */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-400 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">AI Precision (mAP@50)</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">94.6%</span>
            <span className="text-xs font-bold text-indigo-700">YOLOv11 Edge</span>
          </div>
          <p className="text-slate-500 text-xs mt-1.5">
            Early Stage-1 lesion tagging on <em>Helopeltis</em> & Mites
          </p>
        </div>

        {/* KPI 4: Export MRL Compliance */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-blue-400 transition-all">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Export MRL Score</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">98 / 100</span>
            <span className="text-xs font-bold text-emerald-700">EU / FSSAI Pass</span>
          </div>
          <p className="text-slate-500 text-xs mt-1.5">
            Zero chemical drift onto non-target plucking bushes
          </p>
        </div>
      </div>

      {/* Comparative Analysis: Blanket Spraying vs AeroPest Drone Spot-Spraying */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-700" />
              Paradigm Shift: Conventional Blanket Spraying vs. AeroPest Spot-Spraying
            </h2>
            <p className="text-xs text-slate-500">
              Benchmarked on a typical 12-Hectare Assam Tea Section (Section 4B - TV1 clone)
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            Certified by TRA Tocklai Protocol
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <span className="text-xs text-slate-600 font-bold">Chemical Dosage per Round</span>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-rose-700">Manual / Blanket:</span>
                <span className="font-mono text-rose-800 font-bold">120 Liters</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-emerald-700">AeroPest Spot:</span>
                <span className="font-mono text-emerald-800 font-extrabold">32.2 Liters</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: '27%' }}></div>
            </div>
            <p className="text-[11px] text-emerald-700 mt-2 font-bold">73.1% volume reduction</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <span className="text-xs text-slate-600 font-bold">Labor & Time to Complete</span>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-rose-700">Manual Knapsack:</span>
                <span className="font-mono text-rose-800 font-bold">18 Hours (6 workers)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-blue-700">AeroPest Drone:</span>
                <span className="font-mono text-blue-800 font-extrabold">1.4 Hours (1 pilot)</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '8%' }}></div>
            </div>
            <p className="text-[11px] text-blue-700 mt-2 font-bold">12.8x faster coverage</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <span className="text-xs text-slate-600 font-bold">Pesticide Cost / Ha / Cycle</span>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-rose-700">Conventional:</span>
                <span className="font-mono text-rose-800 font-bold">₹1,850 / ha</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-emerald-700">AeroPest VRA:</span>
                <span className="font-mono text-emerald-800 font-extrabold">₹540 / ha</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: '29%' }}></div>
            </div>
            <p className="text-[11px] text-emerald-700 mt-2 font-bold">Save ₹15,700 per 12-ha cycle</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <span className="text-xs text-slate-600 font-bold">Human Toxicity Exposure</span>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-rose-700">Manual Spraying:</span>
                <span className="font-mono text-rose-800 font-bold">High Inhalation Risk</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-emerald-700">AeroPest Drone:</span>
                <span className="font-mono text-emerald-800 font-extrabold">Zero Human Contact</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
            <p className="text-[11px] text-emerald-700 mt-2 font-bold">100% worker safety</p>
          </div>
        </div>
      </div>

      {/* Grid: Tea Sections Overview & Active Drone Fleet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tea Garden Sections Status */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Tea Garden Sections & Health Index</h3>
              <p className="text-xs text-slate-500">Monitored sections in {selectedEstate.name}</p>
            </div>
            <button
              onClick={() => setActiveTab('gis-map')}
              className="text-xs text-blue-700 hover:text-blue-800 font-bold flex items-center gap-1"
            >
              <span>View Map</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Section</th>
                  <th className="py-2.5 px-3">Area / Bushes</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Dominant Pest</th>
                  <th className="py-2.5 px-3">Hotspots</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {TEA_SECTIONS.map((sec) => (
                  <tr key={sec.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">
                      {sec.name}
                      <span className="block text-[11px] text-slate-500 font-normal">{sec.pruningStatus}</span>
                    </td>
                    <td className="py-3 px-3">
                      {sec.areaHa} Ha
                      <span className="block text-[11px] text-slate-500 font-normal">{sec.bushes.toLocaleString()} bushes</span>
                    </td>
                    <td className="py-3 px-3">
                      {sec.status === 'critical' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold">
                          <AlertTriangle className="w-3 h-3" /> Critical ({sec.infestationRate}%)
                        </span>
                      ) : sec.status === 'warning' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold">
                          Warning ({sec.infestationRate}%)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                          <CheckCircle className="w-3 h-3" /> Healthy
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="italic font-medium">{sec.dominantPest}</span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      {sec.hotspotsCount}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setActiveTab('gis-map')}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active UAV Hardware Fleet */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">DGCA-Certified Drone Fleet</h3>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
              Green Zone
            </span>
          </div>

          <div className="space-y-3">
            {DRONE_FLEET.map((drone) => (
              <div key={drone.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
                      <Plane className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{drone.name}</h4>
                      <p className="text-[11px] text-slate-500">{drone.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    {drone.status}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-600 border-t border-slate-200 pt-2.5">
                  <div>
                    <span>Battery:</span>
                    <strong className="text-slate-900 ml-1 font-mono">{drone.battery}%</strong>
                  </div>
                  <div>
                    <span>GNSS:</span>
                    <strong className="text-slate-900 ml-1 font-mono">Dual RTK</strong>
                  </div>
                  <div className="col-span-2 text-[10px] text-slate-500 font-mono truncate">
                    {drone.dgcaUIN}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
