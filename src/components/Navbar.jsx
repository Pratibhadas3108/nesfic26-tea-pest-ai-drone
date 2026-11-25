import React from 'react';
import { 
  Plane, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Cpu, 
  Crosshair, 
  Activity, 
  Droplet, 
  Settings,
  BookOpen,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  selectedEstate, 
  setSelectedEstate, 
  estates, 
  setIsTutorialOpen 
}) {
  return (
    <header className="bg-navy-900 border-b border-navy-800 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Lead Info */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('landing')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:bg-blue-500 transition-colors">
                <Plane className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold tracking-tight text-white">
                    AeroPest<span className="text-emerald-400">Tea</span>
                  </span>
                  <span className="text-[10px] font-bold bg-navy-800 text-blue-300 border border-blue-400/20 px-1.5 py-0.5 rounded">
                    TeaTech Labs
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-none">
                  NESFIC-I-07 • Lead: <strong className="text-slate-300">Rangan Bhuyan</strong>
                </p>
              </div>
            </button>
          </div>

          {/* Decluttered, Clean Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'landing'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              Overview & Uses
            </button>

            <button
              onClick={() => setActiveTab('gis-map')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'gis-map'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
              GIS Mission Map
            </button>

            <button
              onClick={() => setActiveTab('ai-studio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'ai-studio'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-blue-300" />
              AI Diagnostics
            </button>

            <button
              onClick={() => setActiveTab('spray-planner')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'spray-planner'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <Droplet className="w-3.5 h-3.5 text-amber-400" />
              Spot-Spraying VRA
            </button>

            <button
              onClick={() => setActiveTab('compliance')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'compliance'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              TRA MRL Ledger
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'admin'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-indigo-300" />
              Admin
            </button>

            <button
              onClick={() => setActiveTab('proposal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'proposal'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-amber-300 hover:bg-navy-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Proposal Dossier
            </button>
          </nav>

          {/* Right Action Items: How-To Tutorial & Estate Selector */}
          <div className="flex items-center gap-2.5">
            {/* Tutorial Button */}
            <button
              onClick={() => setIsTutorialOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title="Step-by-step application tutorial"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>How to Use</span>
            </button>

            {/* Estate Selector */}
            <div className="relative">
              <select
                value={selectedEstate.id}
                onChange={(e) => {
                  const found = estates.find(es => es.id === e.target.value);
                  if (found) setSelectedEstate(found);
                }}
                className="bg-navy-800 text-white text-xs border border-navy-700 rounded-lg pl-2.5 pr-7 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none"
              >
                {estates.map(es => (
                  <option key={es.id} value={es.id} className="bg-navy-900 text-white">
                    {es.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center overflow-x-auto py-2 border-t border-navy-800 space-x-2 text-xs no-scrollbar">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'landing' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('gis-map')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'gis-map' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            GIS Map
          </button>
          <button
            onClick={() => setActiveTab('ai-studio')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'ai-studio' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            AI Diagnostics
          </button>
          <button
            onClick={() => setActiveTab('spray-planner')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'spray-planner' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            Spot-Spray
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'compliance' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            MRL Ledger
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'admin' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            Admin
          </button>
          <button
            onClick={() => setActiveTab('proposal')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'proposal' ? 'bg-amber-500 text-slate-900 font-bold' : 'text-amber-300'}`}
          >
            Proposal
          </button>
        </div>
      </div>
    </header>
  );
}
