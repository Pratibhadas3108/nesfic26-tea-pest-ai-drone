import React from 'react';
import { 
  Plane, 
  ShieldCheck, 
  TrendingDown, 
  Users, 
  Building2, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Target, 
  Cpu, 
  Droplet, 
  Layers, 
  Globe, 
  Award, 
  ChevronRight,
  BookOpen,
  IndianRupee
} from 'lucide-react';

export default function LandingPage({ setActiveTab, setIsTutorialOpen }) {
  const clientSegments = [
    {
      title: "Commercial Tea Groups",
      scale: "800+ Organized Tea Estates",
      examples: "Tata Consumer Products, Goodricke, McLeod Russel, Apeejay, Rossell Tea",
      icon: Building2,
      benefit: "Saves ₹1.4M–₹2.8M annually per estate in agrochemicals while safeguarding European Union (EU) export compliance.",
      tags: ["Enterprise Fleet", "Multi-Division GIS", "Export Compliance"]
    },
    {
      title: "Small Tea Growers (STGs)",
      scale: "100,000+ Growers in Assam",
      examples: "STG Cooperatives, Bought Leaf Factories (BLFs), Custom Hiring Centers (CHCs)",
      icon: Users,
      benefit: "Brings precision drone spraying within reach via pay-per-acre Custom Hiring Centers, protecting smallholder yields without toxic knapsack spraying.",
      tags: ["Pay-Per-Acre", "Community Hubs", "Worker Safety"]
    },
    {
      title: "Government & Research Bodies",
      scale: "State & Regional Oversight",
      examples: "Tea Research Association (TRA) Tocklai, Tea Board of India, Assam Startup (AISF/DIIS)",
      icon: ShieldCheck,
      benefit: "Standardizes Plant Protection Code (PPC) validation, tracks regional pest vectors, and creates sovereign digital agricultural records.",
      tags: ["PPC Standardization", "Digital Traceability", "Public Policy"]
    },
    {
      title: "Agri-Drone Service Providers",
      scale: "Commercial UAV Operators",
      examples: "DGCA-Certified Drone Service Enterprises, Precision Ag Hubs",
      icon: Plane,
      benefit: "Turnkey software stack converting off-the-shelf multispectral and spray drones into intelligent tea protection units with zero software R&D.",
      tags: ["MAVLink Integration", "VRA Prescription", "Autonomous Flight"]
    }
  ];

  const useCases = [
    {
      title: "1. Early Micro-Infestation Hotspot Detection",
      desc: "Detects Stage-1 feeding punctures of Helopeltis theivora (1-2mm necrotic lesions) and initial mite chlorosis 5 to 7 days before canopy collapse occurs.",
      icon: Target
    },
    {
      title: "2. Variable-Rate Spot-Spraying (68.4% Savings)",
      desc: "RTK-guided hexacopter with 4 PWM high-frequency solenoid nozzles opens bursts exclusively over infected bushes, completely bypassing healthy bushes.",
      icon: Droplet
    },
    {
      title: "3. Zero-Exceedance Export MRL & PHI Tracking",
      desc: "Dynamic countdown tracking Pre-Harvest Intervals (PHI) to guarantee pesticide residue levels remain strictly below EU (0.05 ppm) and FSSAI ceilings.",
      icon: Globe
    },
    {
      title: "4. Autonomous Canopy Recovery Monitoring",
      desc: "Multispectral NDVI and vegetative stress tracking post-prune (Light Pruned, Deep Skiffed) to measure flush vigor and biomass regeneration.",
      icon: Layers
    }
  ];

  return (
    <div className="space-y-12 pb-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900 text-white p-8 md:p-12 shadow-xl border border-navy-700">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NESFIC-I-07 Government Track • Partnered with TRA Tocklai</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            AI-Driven Aerial Precision for Assam Tea Estates
          </h1>

          <p className="text-slate-200 text-sm md:text-base leading-relaxed">
            <strong>AeroPest-Tea</strong> by <strong>TeaTech Labs</strong> (Lead Applicant: <em>Rangan Bhuyan</em>) transforms tea crop protection from reactive calendar-based blanket spraying to autonomous sub-meter aerial scouting and surgical spot-spraying.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => setActiveTab('gis-map')}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
            >
              <Plane className="w-4 h-4" />
              <span>Launch Mission Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsTutorialOpen(true)}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>How to Use Tutorial</span>
            </button>

            <button
              onClick={() => setActiveTab('proposal')}
              className="px-4 py-3 rounded-xl bg-navy-950/80 hover:bg-navy-950 text-slate-300 border border-navy-700 font-semibold text-xs flex items-center gap-1.5 transition-all"
            >
              <span>View NESFIC Proposal</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
          <div>
            <span className="block text-2xl font-extrabold text-emerald-400">68.4%</span>
            <span className="text-xs text-slate-300">Pesticide Reduction</span>
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-blue-300">12.8x</span>
            <span className="text-xs text-slate-300">Faster Coverage</span>
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-amber-300">94.6%</span>
            <span className="text-xs text-slate-300">AI Detection mAP@50</span>
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-white">100% Pass</span>
            <span className="text-xs text-slate-300">EU & FSSAI MRL Safety</span>
          </div>
          <div>
            <span className="block text-2xl font-extrabold text-emerald-300 font-mono">₹40 Lakhs</span>
            <span className="text-xs text-slate-300">Grant (50% Tech Team)</span>
          </div>
        </div>
      </div>

      {/* Primary Use Cases Section */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Application Capabilities
          </span>
          <h2 className="text-2xl font-bold text-slate-900">What Does AeroPest-Tea Accomplish?</h2>
          <p className="text-xs text-slate-600">
            A closed-loop agronomic platform bridging aerial robotics, computer vision, and agrochemical compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-3">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">{uc.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{uc.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Probable Client Base & Market Segments */}
      <div className="bg-slate-100/70 rounded-2xl p-6 md:p-8 border border-slate-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              Commercial Viability & Market Adoption
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">Target Client Base & Industry Beneficiaries</h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Structured deployment models across the ₹18,000+ Crore Assam tea industry.
            </p>
          </div>
          <span className="text-xs font-mono font-bold bg-white px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 shadow-sm">
            Total Addressable Market: 330,000+ Ha in Assam
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {clientSegments.map((seg, idx) => {
            const Icon = seg.icon;
            return (
              <div key={idx} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-blue-300 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-navy-900 text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{seg.title}</h3>
                      <span className="text-xs font-medium text-blue-700">{seg.scale}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {seg.benefit}
                </p>

                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <strong className="text-slate-700">Representative Partners:</strong> {seg.examples}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {seg.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicative Resource & Budget Allocation Section */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Financial Blueprint • NESFIC-I-07
          </span>
          <h2 className="text-2xl font-bold text-slate-900">Indicative Resource & Budget Allocation</h2>
          <p className="text-xs text-slate-600">
            Strategic breakdown of the <strong>₹40.0 Lakhs Problem Statement Grant</strong> with <strong>50% (₹20.0 Lakhs) dedicated to the Technical Engineering Team</strong>.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-3.5 flex overflow-hidden p-0.5 border border-slate-200">
              <div className="bg-navy-800 h-full rounded-l-full" style={{ width: '50%' }} title="Technical Engineering Team (50%)" />
              <div className="bg-sky-600 h-full" style={{ width: '30%' }} title="Hardware Assets & Avionics (30%)" />
              <div className="bg-emerald-600 h-full" style={{ width: '11.25%' }} title="Field Pilot Validation (11.25%)" />
              <div className="bg-amber-500 h-full rounded-r-full" style={{ width: '8.75%' }} title="Logistics & Regulatory (8.75%)" />
            </div>
            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-medium px-1">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-navy-800 inline-block"></span> 1. Technical Team (₹20.0L | 50%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-sky-600 inline-block"></span> 2. Hardware Assets (₹12.0L | 30%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-emerald-600 inline-block"></span> 3. Field Trials & TRA (₹4.5L | 11.25%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-amber-500 inline-block"></span> 4. Logistics & DGCA (₹3.5L | 8.75%)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-navy-200 bg-navy-50/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-navy-900">1. Technical Team & R&D</span>
                <span className="font-mono font-bold text-navy-800 bg-white border border-navy-200 px-1.5 py-0.5 rounded text-[10px]">50%</span>
              </div>
              <div className="text-xl font-extrabold text-navy-950 font-mono">₹20.0 Lakhs</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Lead Precision Agritech Architect (Rangan Bhuyan), Senior Computer Vision/AI Engineer, UAV Avionics Firmware Engineer & Full-Stack GIS Developer.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-900">2. Hardware & Avionics</span>
                <span className="font-mono font-bold text-sky-800 bg-white border border-sky-200 px-1.5 py-0.5 rounded text-[10px]">30%</span>
              </div>
              <div className="text-xl font-extrabold text-sky-950 font-mono">₹12.0 Lakhs</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Multispectral scout UAV (₹3.5L), 16L agricultural spray drone with 4 PWM nozzles (₹5.5L), NVIDIA Jetson Orin GCS & RTK D-GNSS base (₹3.0L).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900">3. Field Pilot & TRA Trials</span>
                <span className="font-mono font-bold text-emerald-800 bg-white border border-emerald-200 px-1.5 py-0.5 rounded text-[10px]">11.25%</span>
              </div>
              <div className="text-xl font-extrabold text-emerald-950 font-mono">₹4.5 Lakhs</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                TRA Tocklai test plots (10 Ha), 100 Ha commercial estate trials, WSP droplet analysis & third-party GC-MS/MS laboratory residue testing.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900">4. Logistics & Regulatory</span>
                <span className="font-mono font-bold text-amber-800 bg-white border border-amber-200 px-1.5 py-0.5 rounded text-[10px]">8.75%</span>
              </div>
              <div className="text-xl font-extrabold text-amber-950 font-mono">₹3.5 Lakhs</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                High-capacity smart LiPo battery packs, field charging hub, multi-estate transit across Upper Assam, DGCA insurance & statutory filings.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-base font-bold text-slate-900">Ready to Explore the Live Operational Prototype?</h3>
          <p className="text-xs text-slate-600">
            Inspect real-time GIS mapping, edge detection studio, and download official NESFIC-I-07 proposal documents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('gis-map')}
            className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <span>Open Mission Map</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setActiveTab('proposal')}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold text-xs transition-colors"
          >
            Proposal PDF Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
