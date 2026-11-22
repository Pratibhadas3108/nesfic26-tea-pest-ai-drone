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
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">NESFIC-I-07</span>
            <span>•</span>
            <span>AI-Driven Drone-Based Pest Detection & Targeted Spot-Spraying</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">TRA Tocklai Agro-Protocol</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built for Assam Startup Innovation Challenge 2026
            </span>
            <a
              href="https://github.com/RonHatibaruah/nesfic-i-07-drone-pest-detection"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
