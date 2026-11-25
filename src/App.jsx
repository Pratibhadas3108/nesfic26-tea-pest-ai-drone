import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Overview from './components/Overview';
import GISMap from './components/GISMap';
import DetectionStudio from './components/DetectionStudio';
import SprayPlanner from './components/SprayPlanner';
import MRLCompliance from './components/MRLCompliance';
import ProposalViewer from './components/ProposalViewer';
import { ESTATES } from './data/mockData';
import { ShieldCheck, Heart, GitBranch } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedEstate, setSelectedEstate] = useState(ESTATES[0]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedEstate={selectedEstate}
        setSelectedEstate={setSelectedEstate}
        estates={ESTATES}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <Overview setActiveTab={setActiveTab} selectedEstate={selectedEstate} />
        )}
        {activeTab === 'gis-map' && (
          <GISMap selectedEstate={selectedEstate} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'ai-studio' && (
          <DetectionStudio />
        )}
        {activeTab === 'spray-planner' && (
          <SprayPlanner />
        )}
        {activeTab === 'compliance' && (
          <MRLCompliance />
        )}
        {activeTab === 'proposal' && (
          <ProposalViewer />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Main Footer Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-900 pb-5">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold text-white text-sm tracking-tight flex items-center gap-1.5">
                  AeroPest<span className="text-emerald-400">Tea</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="font-semibold text-slate-300">NESFIC-I-07 Government Track</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-medium">TRA Tocklai Agro-Innovation Protocol</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-slate-300 text-[11px]">
                <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                  Lead Applicant: Rangan Bhuyan
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 font-medium">
                  Developed by <strong className="text-white">TeaTech Labs</strong>
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">Jorhat, Assam, India</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://nesfic-i-07-drone-pest-detection.pages.dev"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-medium text-xs transition-colors flex items-center gap-1"
              >
                <span>Live Deployment</span>
              </a>
              <a
                href="https://github.com/RonHatibaruah/nesfic-i-07-drone-pest-detection"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-medium text-xs transition-colors flex items-center gap-1.5"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
              </a>
            </div>
          </div>

          {/* Legal Disclaimer & Copyrights */}
          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] leading-relaxed text-slate-400">
              <strong className="text-slate-300 font-semibold uppercase tracking-wider block mb-1">
                Regulatory & Operational Disclaimer
              </strong>
              AeroPest-Tea is an advanced agronomic decision-support and precision drone automation prototype engineered for the <strong>North East Seva First Innovation Challenge (NESFIC) 2026</strong> under the Department of Innovation, Incubation and Startups (DIIS), Government of Assam, in technical alignment with the <strong>Tea Research Association (TRA) Tocklai</strong> Plant Protection Code (PPC). All aerial pesticide spot-spraying flight missions must strictly comply with the Directorate General of Civil Aviation (DGCA) Drone Rules 2021, DigitalSky Green Zone provisions, and Central Insecticides Board &amp; Registration Committee (CIB&amp;RC) aerial application buffer protocols before commercial deployment in active tea gardens.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
              <p>
                &copy; 2026 <strong>TeaTech Labs</strong>. All rights reserved.
              </p>
              <p className="flex items-center gap-1 text-slate-400">
                Lead Applicant: <strong className="text-emerald-400 font-medium">Rangan Bhuyan</strong> (TeaTech Labs) • Assam, India
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
