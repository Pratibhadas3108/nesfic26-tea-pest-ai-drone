import React from 'react';
import { 
  Plane, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Cpu, 
  Crosshair, 
  Activity, 
  Wind, 
  Droplet, 
  Thermometer, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, selectedEstate, setSelectedEstate, estates }) {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      {/* Top Banner / Gov Stakeholder Info */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 px-4 py-1.5 border-b border-emerald-900/40 text-xs flex flex-wrap items-center justify-between gap-2 text-slate-300">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded border border-emerald-500/30">
            NESFIC-I-07
          </span>
          <span className="text-slate-200 font-medium">
            Assam Startup Innovation Challenge 2026
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">
            Government Track in Collaboration with <strong className="text-emerald-400 font-medium">Tea Research Association (TRA) Tocklai</strong>
          </span>
        </div>

        {/* Live Weather & Spray Advisory */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Thermometer className="w-3.5 h-3.5 text-amber-400" />
            <span>{selectedEstate.weather.temp}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Droplet className="w-3.5 h-3.5 text-sky-400" />
            <span>RH {selectedEstate.weather.humidity}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Wind className="w-3.5 h-3.5 text-emerald-400" />
            <span>Wind {selectedEstate.weather.windSpeed}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Spray Safe</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30">
              <Plane className="w-5 h-5 text-white transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
                  AeroPest<span className="text-emerald-400">Tea</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  TeaTech Labs
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-500" />
                {selectedEstate.name}
                <span className="text-slate-600">|</span>
                <span className="text-slate-300">Lead: <strong>Rangan Bhuyan</strong></span>
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'overview'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-4 h-4" />
              Overview & Dashboard
            </button>

            <button
              onClick={() => setActiveTab('gis-map')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'gis-map'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Crosshair className="w-4 h-4" />
              GIS Mission Map
            </button>

            <button
              onClick={() => setActiveTab('ai-studio')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'ai-studio'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Cpu className="w-4 h-4" />
              AI Diagnostic Studio
            </button>

            <button
              onClick={() => setActiveTab('spray-planner')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'spray-planner'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Plane className="w-4 h-4" />
              Spot-Spraying VRA
            </button>

            <button
              onClick={() => setActiveTab('compliance')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'compliance'
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              MRL & PHI Ledger
            </button>

            <button
              onClick={() => setActiveTab('proposal')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'proposal'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-amber-400/80 hover:text-amber-300 hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              NESFIC-I-07 Proposal
            </button>
          </nav>

          {/* Estate Selector */}
          <div className="flex items-center gap-3">
            <select
              value={selectedEstate.id}
              onChange={(e) => {
                const found = estates.find(es => es.id === e.target.value);
                if (found) setSelectedEstate(found);
              }}
              className="bg-slate-800/90 text-slate-200 text-xs border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {estates.map(es => (
                <option key={es.id} value={es.id}>
                  {es.name} ({es.location})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
