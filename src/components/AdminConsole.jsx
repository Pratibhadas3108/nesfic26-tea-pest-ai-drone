import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Settings, 
  Users, 
  Plane, 
  Droplet, 
  Cpu, 
  CheckCircle2, 
  Lock, 
  Key, 
  FileCheck, 
  Server, 
  AlertTriangle, 
  RefreshCw,
  Sliders,
  Award,
  Database
} from 'lucide-react';
import { DRONE_FLEET, TEA_SECTIONS } from '../data/mockData';

export default function AdminConsole() {
  const [activeAdminTab, setActiveAdminTab] = useState('fleet');
  const [maxWindThreshold, setMaxWindThreshold] = useState(15);
  const [hardBufferMeters, setHardBufferMeters] = useState(100);
  const [quotaLocked, setQuotaLocked] = useState(true);
  const [modelSyncing, setModelSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState("Synchronized (v2.4.1)");

  const handleSyncModel = () => {
    setModelSyncing(true);
    setTimeout(() => {
      setModelSyncing(false);
      setSyncStatus("Quantized TensorRT INT8 Deployed ✓");
    }, 1500);
  };

  const users = [
    { name: "Rangan Bhuyan", role: "Super Admin (Lead Architect)", entity: "TeaTech Labs", access: "Full Root / Avionics / ML", status: "Active" },
    { name: "Dr. B. C. Borah", role: "Entomological Auditor", entity: "TRA Tocklai", access: "Audit / MRL Verification", status: "Active" },
    { name: "Manash Jyoti Saikia", role: "Garden Superintendent", entity: "Jorhat Tea Division", access: "Mission Dispatch / VRA Review", status: "Active" },
    { name: "Kabir Hazarika", role: "Licensed Remote Pilot", entity: "TeaTech Flight Ops", access: "DGCA UIN Flight / Telemetry", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-navy-900 text-blue-400">
              <Settings className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">TeaTech Enterprise Governance Console</h2>
              <p className="text-xs text-slate-500">
                Administration, DGCA compliance interlocks, role-based governance, and edge model distribution
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Govt / Enterprise Verified
          </span>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 gap-2">
        <button
          onClick={() => setActiveAdminTab('fleet')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
            activeAdminTab === 'fleet'
              ? 'border-blue-700 text-blue-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Plane className="w-4 h-4" />
          Fleet & Drone Avionics
        </button>

        <button
          onClick={() => setActiveAdminTab('compliance')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
            activeAdminTab === 'compliance'
              ? 'border-blue-700 text-blue-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          Safety Interlocks & Quotas
        </button>

        <button
          onClick={() => setActiveAdminTab('rbac')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
            activeAdminTab === 'rbac'
              ? 'border-blue-700 text-blue-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Role-Based Access (RBAC)
        </button>

        <button
          onClick={() => setActiveAdminTab('ml-ops')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
            activeAdminTab === 'ml-ops'
              ? 'border-blue-700 text-blue-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4" />
          Edge AI Model Registry
        </button>
      </div>

      {/* Tab 1: Fleet Avionics */}
      {activeAdminTab === 'fleet' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Registered Agricultural UAV Fleet</h3>
              <p className="text-xs text-slate-500">DGCA Type-Certified Drones operating in Assam Green Zones</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors">
              + Register New Airframe
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DRONE_FLEET.map((drone) => (
              <div key={drone.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{drone.name}</h4>
                    <span className="text-xs text-blue-700 font-medium">{drone.role}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                    {drone.dgcaUIN}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-slate-500">Battery Health (SOH):</span>
                    <strong className="text-slate-800 ml-1 font-mono">{drone.battery}% Optimal</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">RTK Positioning:</span>
                    <strong className="text-emerald-700 ml-1 font-mono">Centimeter-Fix</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Payload System:</span>
                    <strong className="text-slate-800 ml-1">{drone.payload || drone.nozzleType}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Airworthiness:</span>
                    <strong className="text-emerald-700 ml-1">Certified (DGCA)</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Safety Interlocks & Quotas */}
      {activeAdminTab === 'compliance' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Statutory Flight & Agrochemical Safety Interlocks</h3>
            <p className="text-xs text-slate-500">Hard-coded hardware safety limits compliant with CIB&RC and DGCA regulations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-800">Wind Velocity Cutoff</span>
              <p className="text-[11px] text-slate-500">Spraying halts automatically if anemometer exceeds threshold.</p>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="range"
                  min="10"
                  max="25"
                  value={maxWindThreshold}
                  onChange={(e) => setMaxWindThreshold(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <span className="font-mono font-bold text-slate-900 text-xs">{maxWindThreshold} km/h</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold block">CIB&RC Recommended: 15 km/h</span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-800">Human Habitation Geofence Buffer</span>
              <p className="text-[11px] text-slate-500">Nozzle lockout zone around worker quarters & streams.</p>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={hardBufferMeters}
                  onChange={(e) => setHardBufferMeters(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <span className="font-mono font-bold text-slate-900 text-xs">{hardBufferMeters} m</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold block">Statutory Buffer: 100 meters</span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="text-xs font-bold text-slate-800">Agrochemical Quota Ceiling</span>
              <p className="text-[11px] text-slate-500">Restricts maximum volume per hectare to prevent chemical spikes.</p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-700">Max 40 L/ha (Spot Only)</span>
                <button
                  onClick={() => setQuotaLocked(!quotaLocked)}
                  className={`text-xs px-2.5 py-1 rounded font-bold ${
                    quotaLocked ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {quotaLocked ? 'Quota Locked ✓' : 'Unlocked'}
                </button>
              </div>
              <span className="text-[10px] text-slate-500 block">Prevents MRL exceedances</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: RBAC Users */}
      {activeAdminTab === 'rbac' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Role-Based Access Control (RBAC)</h3>
              <p className="text-xs text-slate-500">Authorized personnel across TeaTech Labs, TRA Tocklai, and Plantation Estates</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors">
              + Invite Stakeholder
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Stakeholder Name</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Organization</th>
                  <th className="py-2.5 px-3">Access Level</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {users.map((u, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-slate-900">{u.name}</td>
                    <td className="py-3 px-3 text-blue-700 font-medium">{u.role}</td>
                    <td className="py-3 px-3">{u.entity}</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-600">{u.access}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: ML-Ops Model Registry */}
      {activeAdminTab === 'ml-ops' && (
        <div className="bg-white rounded-b-xl border border-t-0 border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Edge AI Computer Vision Model Registry</h3>
              <p className="text-xs text-slate-500">Model synchronization pipeline between cloud training and NVIDIA Jetson edge stations</p>
            </div>
            <button
              onClick={handleSyncModel}
              disabled={modelSyncing}
              className="px-3.5 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${modelSyncing ? 'animate-spin' : ''}`} />
              <span>{modelSyncing ? 'Compiling TensorRT...' : 'Deploy to Jetson GCS'}</span>
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <strong className="text-slate-900">Current Edge Active Model:</strong>
                <span className="font-mono text-blue-700 ml-1.5 font-bold">YOLOv11x-Tea-INT8</span>
              </div>
              <span className="font-mono text-emerald-700 font-semibold">{syncStatus}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2 text-[11px] text-slate-600">
              <div className="p-2.5 bg-white rounded border border-slate-200">
                <span className="text-slate-500 block">Training Dataset:</span>
                <strong>15,400 Annotated Frames</strong>
              </div>
              <div className="p-2.5 bg-white rounded border border-slate-200">
                <span className="text-slate-500 block">Quantization:</span>
                <strong>TensorRT INT8 Calibrated</strong>
              </div>
              <div className="p-2.5 bg-white rounded border border-slate-200">
                <span className="text-slate-500 block">Inference Speed:</span>
                <strong>28.4 ms (35.2 FPS)</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
