import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Play, 
  MapPin, 
  Cpu, 
  Droplet, 
  ShieldCheck, 
  ExternalLink,
  BookOpen,
  Sparkles
} from 'lucide-react';

export default function TutorialModal({ isOpen, onClose, setActiveTab }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const tutorialSteps = [
    {
      title: "What AeroPest-Tea Does (Overview)",
      badge: "Platform Purpose",
      icon: Sparkles,
      color: "blue",
      description: "AeroPest-Tea is an AI-driven drone crop protection platform built for Assam tea plantations. It replaces wasteful blanket chemical spraying with autonomous aerial scouting, millimeter-scale AI pest detection (Helopeltis & Red Spider Mite), centimeter-accurate spot-spraying, and automated TRA Tocklai MRL export compliance.",
      actionLabel: "View Platform Overview",
      targetTab: "landing",
      tips: [
        "Cuts agrochemical usage by up to 68.4% while protecting beneficial natural predators and soil health.",
        "Ensures 100% EU & FSSAI Maximum Residue Limit (MRL) compliance before leaf plucking begins."
      ]
    },
    {
      title: "Step 1: Inspect Garden Sections & Telemetry",
      badge: "GIS Mission Map",
      icon: MapPin,
      color: "blue",
      description: "Navigate to the GIS Mission Map to view georeferenced tea estate boundaries (e.g. Section 4B at TRA Tocklai Station, Jorhat). Layer controls let you toggle pest density heatmaps, drone flight paths, and RTK centimeter-accurate coordinates.",
      actionLabel: "Open GIS Mission Map",
      targetTab: "gis-map",
      tips: [
        "Click on any tea section polygon to view clone variety (TV-1, TV-23), bush count, and pruning status.",
        "Click 'Simulate Drone Flight' to view real-time RTK GPS telemetry and solenoid valve status."
      ]
    },
    {
      title: "Step 2: Run AI Canopy Diagnostics",
      badge: "Diagnostic Studio",
      icon: Cpu,
      color: "emerald",
      description: "Open the AI Diagnostic Studio to inspect high-resolution 48MP aerial imagery processed with fine-tuned YOLOv11x. The system identifies millimeter-scale Stage-1 feeding punctures of Helopeltis theivora and foliar bronzing of Red Spider Mites.",
      actionLabel: "Open Diagnostic Studio",
      targetTab: "ai-studio",
      tips: [
        "Use the Confidence Threshold slider to filter false positives caused by shade-tree canopy shadows.",
        "Toggle Thermal / Stress Heatmaps to view early chlorophyll degradation before visible foliar necrosis."
      ]
    },
    {
      title: "Step 3: Plan Variable-Rate Spot-Spraying",
      badge: "Spot-Spraying VRA",
      icon: Droplet,
      color: "amber",
      description: "Generate automated Variable-Rate Application (VRA) prescriptions. Instead of blanket-spraying 120 L/ha across the entire block, the drone's PWM solenoid nozzles pulse only above verified pest clusters, achieving a 68.4% chemical reduction.",
      actionLabel: "Configure Spot-Spraying",
      targetTab: "spray-planner",
      tips: [
        "Adjust PWM Pulse Frequency (10–50 Hz) and Anti-Drift Droplet Spectrum (150–300 µm).",
        "Click 'Export GeoJSON / KML' to download flight mission files ready for DJI Agras or PX4/ArduPilot drones."
      ]
    },
    {
      title: "Step 4: Verify TRA Tocklai MRL Clearance",
      badge: "Compliance Ledger",
      icon: ShieldCheck,
      color: "indigo",
      description: "Review automated Pre-Harvest Intervals (PHI) and Maximum Residue Limits (MRL) compliant with the TRA Tocklai Plant Protection Code, FSSAI, and European Union (EU < 0.05 ppm) export standards.",
      actionLabel: "Review MRL Ledger",
      targetTab: "compliance",
      tips: [
        "Check dynamic countdown timers for safe harvest dates before sending plucking squads.",
        "Download cryptographic audit certificate JSON for export clearance and tea buyer assurance."
      ]
    }
  ];

  const step = tutorialSteps[currentStep];
  const StepIcon = step.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-navy-900 px-6 py-4 flex items-center justify-between text-white border-b border-navy-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 flex items-center justify-center border border-blue-400/30 text-blue-300">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">Interactive Platform Guide</h3>
              <p className="text-[11px] text-slate-300">How to operate AeroPest-Tea for precision tea protection</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="px-6 pt-4 pb-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {tutorialSteps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStep ? 'w-8 bg-blue-600' : idx < currentStep ? 'w-4 bg-emerald-500' : 'w-4 bg-slate-300'
                }`}
                title={s.title}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-500 font-mono">
            Step {currentStep + 1} of {tutorialSteps.length}
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 flex-1">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 mt-1">
              <StepIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                {step.badge}
              </span>
              <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {step.description}
              </p>
            </div>
          </div>

          {/* Operational Tips */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Operator Pro-Tips & Actions:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {step.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
              currentStep === 0 
                ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400' 
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab(step.targetTab);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>{step.actionLabel}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {currentStep < tutorialSteps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(prev => Math.min(tutorialSteps.length - 1, prev + 1))}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors"
              >
                Get Started ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
