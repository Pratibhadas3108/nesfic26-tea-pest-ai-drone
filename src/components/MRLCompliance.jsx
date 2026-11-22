import React from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  Download, 
  FileCheck, 
  Globe, 
  Check, 
  Info,
  Award
} from 'lucide-react';
import { MRL_LEDGER } from '../data/mockData';

export default function MRLCompliance() {
  const downloadComplianceReport = () => {
    const reportData = {
      title: "TRA Tocklai MRL & Agro-Chemical Compliance Certificate",
      challenge: "NESFIC-I-07 Government Track",
      estate: "TRA Tocklai Experimental Station, Jorhat",
      dateGenerated: new Date().toLocaleDateString(),
      exportReadinessIndex: "98/100 (Pass)",
      records: MRL_LEDGER
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TRA_MRL_Compliance_Certificate.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              TRA Tocklai MRL & Export Compliance Ledger
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
              Plant Protection Code (PPC) Audit Ready
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated monitoring of Maximum Residue Limits (MRLs) and Pre-Harvest Intervals (PHI) for EU, Codex, and FSSAI export standards
          </p>
        </div>

        <button
          onClick={downloadComplianceReport}
          className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Audit Certificate</span>
        </button>
      </div>

      {/* Compliance Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">EU Export Clearance</span>
            <Globe className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">100% Pass</span>
            <span className="text-xs font-bold text-emerald-400">All Batches</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Zero samples exceeding 0.05 ppm EU MRL standard
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">FSSAI Domestic Safety</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">Full Conformity</span>
            <span className="text-xs font-bold text-emerald-400">Verified</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Compliant with TRA Plant Protection Code Version 16
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Traceability Score</span>
            <Award className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">98 / 100</span>
            <span className="text-xs font-bold text-indigo-400">Grade A</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Immutable GPS waypoint logging for every spray burst
          </p>
        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-3">
          Agro-Chemical Application & Pre-Harvest Interval (PHI) Tracker
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Chemical / Bio-Agent</th>
                <th className="py-3 px-3">Target Pest</th>
                <th className="py-3 px-3">Dosage & Reduction</th>
                <th className="py-3 px-3">Section</th>
                <th className="py-3 px-3">PHI Safe Harvest Date</th>
                <th className="py-3 px-3">EU MRL Status</th>
                <th className="py-3 px-3 text-right">Readiness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {MRL_LEDGER.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3 font-medium text-white">
                    {item.chemical}
                    <span className="block text-[11px] text-slate-400">{item.applicationMethod}</span>
                  </td>
                  <td className="py-3.5 px-3 italic">{item.targetPest}</td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-emerald-400">{item.dosageAppliedHa}</span>
                  </td>
                  <td className="py-3.5 px-3 font-mono">{item.lastSprayedSection}</td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      <span className="font-bold text-slate-200">{item.safeHarvestDate}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">PHI: {item.phiDays} days</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <Check className="w-3 h-3" /> {item.euMrlStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span className="font-mono font-bold text-emerald-400">{item.exportReadinessScore}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
