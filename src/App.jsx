import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Overview from './components/Overview';
import GISMap from './components/GISMap';
import DetectionStudio from './components/DetectionStudio';
import SprayPlanner from './components/SprayPlanner';
import MRLCompliance from './components/MRLCompliance';
import ProposalViewer from './components/ProposalViewer';
import AdminConsole from './components/AdminConsole';
import TutorialModal from './components/TutorialModal';
import { ESTATES } from './data/mockData';
import { ShieldCheck, GitBranch, ExternalLink, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [selectedEstate, setSelectedEstate] = useState(ESTATES[0]);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Corporate Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedEstate={selectedEstate}
        setSelectedEstate={setSelectedEstate}
        estates={ESTATES}
        setIsTutorialOpen={setIsTutorialOpen}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'landing' && (
          <LandingPage setActiveTab={setActiveTab} setIsTutorialOpen={setIsTutorialOpen} />
        )}
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
        {activeTab === 'admin' && (
          <AdminConsole />
        )}
        {activeTab === 'proposal' && (
          <ProposalViewer />
        )}
      </main>

      {/* Interactive Tutorial Modal */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        setActiveTab={setActiveTab}
      />

      {/* Corporate Navy/White Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {/* Main Footer Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
                  AeroPest<span className="text-blue-700">Tea</span>
                </span>
                <span className="text-slate-400">•</span>
                <span className="font-semibold text-slate-700">NESFIC-I-07 Government Track</span>
                <span className="text-slate-400">•</span>
                <span className="text-blue-700 font-medium">TRA Tocklai Agro-Innovation Protocol</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-slate-600 text-[11px]">
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded border border-blue-200 font-bold">
                  Lead Applicant: Rangan Bhuyan
                </span>
                <span className="text-slate-400">•</span>
                <span>
                  Developed by <strong className="text-slate-800">TeaTech Labs</strong>
                </span>
                <span className="text-slate-400">•</span>
                <span>Jorhat, Assam, India</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsTutorialOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Tutorial Guide</span>
              </button>

              <a
                href="https://nesfic-i-07-drone-pest-detection.pages.dev"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-semibold text-xs transition-colors flex items-center gap-1"
              >
                <span>Live Deployment</span>
              </a>

              <a
                href="https://github.com/Pratibhadas3108/nesfic26-tea-pest-ai-drone"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-medium text-xs transition-colors flex items-center gap-1.5"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Legal Disclaimer & Copyrights */}
          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] leading-relaxed text-slate-600">
              <strong className="text-slate-800 font-semibold uppercase tracking-wider block mb-1">
                Regulatory & Operational Disclaimer
              </strong>
              AeroPest-Tea is an advanced agronomic decision-support and precision drone automation prototype engineered for the <strong>North East Seva First Innovation Challenge (NESFIC) 2026</strong> under the Department of Innovation, Incubation and Startups (DIIS), Government of Assam, in technical alignment with the <strong>Tea Research Association (TRA) Tocklai</strong> Plant Protection Code (PPC). All aerial pesticide spot-spraying flight missions must strictly comply with the Directorate General of Civil Aviation (DGCA) Drone Rules 2021, DigitalSky Green Zone provisions, and Central Insecticides Board &amp; Registration Committee (CIB&amp;RC) aerial application buffer protocols before commercial deployment in active tea gardens.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
              <p>
                &copy; 2026 <strong>TeaTech Labs</strong>. All rights reserved.
              </p>
              <p className="flex items-center gap-1 text-slate-600">
                Lead Applicant: <strong className="text-blue-700 font-semibold">Rangan Bhuyan</strong> (TeaTech Labs) • Jorhat, Assam, India
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
