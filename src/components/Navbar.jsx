import React from 'react';
import {
  Plane,
  ShieldCheck,
  FileText,
  Cpu,
  Crosshair,
  Droplet,
  Settings,
  BookOpen,
  ChevronDown,
} from 'lucide-react';
import { APP_ROUTES } from '../routes';

const NAV_ITEMS = [
  { id: 'landing', label: 'Overview & Uses', mobileLabel: 'Overview', icon: null },
  { id: 'gis-map', label: 'GIS Mission Map', mobileLabel: 'GIS Map', icon: Crosshair, iconClass: 'text-emerald-400' },
  { id: 'ai-studio', label: 'AI Diagnostics', mobileLabel: 'AI Diagnostics', icon: Cpu, iconClass: 'text-blue-300' },
  { id: 'spray-planner', label: 'Spot-Spraying VRA', mobileLabel: 'Spot-Spray', icon: Droplet, iconClass: 'text-amber-400' },
  { id: 'compliance', label: 'TRA MRL Ledger', mobileLabel: 'MRL Ledger', icon: ShieldCheck, iconClass: 'text-emerald-400' },
  { id: 'admin', label: 'Admin', mobileLabel: 'Admin', icon: Settings, iconClass: 'text-indigo-300' },
  { id: 'proposal', label: 'Proposal Dossier', mobileLabel: 'Proposal', icon: FileText, isHighlight: true },
];

export default function Navbar({
  activeTab,
  setActiveTab,
  selectedEstate,
  setSelectedEstate,
  estates,
  isTutorialOpen,
  openTutorial,
}) {
  const handleNavClick = (e, tabId) => {
    e.preventDefault();
    setActiveTab(tabId);
  };

  const handleTutorialClick = (e) => {
    e.preventDefault();
    openTutorial();
  };

  return (
    <header className="bg-navy-900 border-b border-navy-800 text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Lead Info */}
          <div className="flex items-center gap-3">
            <a
              href={APP_ROUTES.landing.path}
              onClick={(e) => handleNavClick(e, 'landing')}
              title={APP_ROUTES.landing.title}
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
                  NESFIC-I-07 • Lead: <strong className="text-slate-300">Pratibha Das Hatibaruah</strong>
                </p>
              </div>
            </a>
          </div>

          {/* Decluttered, Clean SEO/GEO-Friendly Navigation Links */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id && !isTutorialOpen;
              const route = APP_ROUTES[item.id];
              return (
                <a
                  key={item.id}
                  href={route.path}
                  onClick={(e) => handleNavClick(e, item.id)}
                  title={route.title}
                  aria-current={isActive ? 'page' : undefined}
                  className={
                    item.isHighlight
                      ? `px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                            : 'text-amber-300 hover:bg-navy-800'
                        }`
                      : `px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-slate-300 hover:text-white hover:bg-navy-800'
                        }`
                  }
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${item.iconClass || ''}`} />}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Items: Tutorial Link & Estate Selector */}
          <div className="flex items-center gap-2.5">
            {/* Tutorial Link — Explains what the app does and how to use it */}
            <a
              href={APP_ROUTES.tutorial.path}
              onClick={handleTutorialClick}
              aria-current={isTutorialOpen ? 'page' : undefined}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                isTutorialOpen
                  ? 'bg-emerald-600 text-white border-emerald-400'
                  : 'bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border-emerald-500/30'
              }`}
              title="Tutorial: What AeroPest-Tea does and how to use it"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
              <span>Tutorial</span>
            </a>

            {/* Estate Selector */}
            <div className="relative">
              <select
                aria-label="Select Assam Tea Estate"
                value={selectedEstate.id}
                onChange={(e) => {
                  const found = estates.find((es) => es.id === e.target.value);
                  if (found) setSelectedEstate(found);
                }}
                className="bg-navy-800 text-white text-xs border border-navy-700 rounded-lg pl-2.5 pr-7 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none"
              >
                {estates.map((es) => (
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
        <nav aria-label="Mobile Navigation" className="lg:hidden flex items-center overflow-x-auto py-2 border-t border-navy-800 space-x-2 text-xs no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id && !isTutorialOpen;
            const route = APP_ROUTES[item.id];
            return (
              <a
                key={item.id}
                href={route.path}
                onClick={(e) => handleNavClick(e, item.id)}
                className={
                  item.isHighlight
                    ? `px-2.5 py-1 rounded whitespace-nowrap ${isActive ? 'bg-amber-500 text-slate-900 font-bold' : 'text-amber-300'}`
                    : `px-2.5 py-1 rounded whitespace-nowrap ${isActive ? 'bg-blue-600 text-white' : 'text-slate-300'}`
                }
              >
                {item.mobileLabel}
              </a>
            );
          })}
          <a
            href={APP_ROUTES.tutorial.path}
            onClick={handleTutorialClick}
            className={`px-2.5 py-1 rounded whitespace-nowrap font-semibold ${
              isTutorialOpen ? 'bg-emerald-600 text-white' : 'text-emerald-300'
            }`}
          >
            Tutorial
          </a>
        </nav>
      </div>
    </header>
  );
}
