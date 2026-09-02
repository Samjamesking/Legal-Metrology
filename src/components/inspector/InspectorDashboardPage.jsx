import React, { useState } from 'react';
import {
  ShieldAlert,
  MapPin,
  Calendar,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  Plus,
  Search,
  UserCheck,
  Building,
  Award
} from 'lucide-react';
import { MOCK_INSPECTION_HISTORY } from '../../data/sampleProducts';

export default function InspectorDashboardPage() {
  const [history, setHistory] = useState(MOCK_INSPECTION_HISTORY);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [newProductsCount, setNewProductsCount] = useState('15');

  const handleCreateInspection = (e) => {
    e.preventDefault();
    if (!newLocation) return;
    const newEntry = {
      id: `INSP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      officer: 'S. K. Gupta (Zone-1)',
      location: newLocation,
      status: 'Passed Verified',
      productsChecked: parseInt(newProductsCount, 10) || 10,
      violationsFound: 0
    };
    setHistory([newEntry, ...history]);
    setNewLocation('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-gov-blue dark:text-blue-300 text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Enforcement Portal
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Metrology Inspector Field Log & Surveillance
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Official field inspection records, geotagged market checks, and seizure registers.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-gov text-xs font-bold bg-gov-blue text-white hover:bg-gov-blueLight shadow-md shadow-gov-blue/20 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Log Field Inspection
        </button>
      </div>

      {/* Inspector Profile Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gov-blue/10 text-gov-blue flex items-center justify-center font-bold text-sm">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Officer in Charge</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">S. K. Gupta</h4>
            <span className="text-[11px] text-emerald-600 font-medium">Badge #DL-LM-0419</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Assigned Jurisdiction</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">North Zone HQ</h4>
            <span className="text-[11px] text-slate-500">Connaught Place & NCR</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-sm">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Monthly Quota</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">147 / 150 Target</h4>
            <span className="text-[11px] text-emerald-600 font-medium">98% Completed</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Audit Rating</span>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Grade A+ Certified</h4>
            <span className="text-[11px] text-slate-500">ISO 17020 Compliant</span>
          </div>
        </div>
      </div>

      {/* Inspection History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gov-blue" />
          Official Inspection Ledger (Recent Visits)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-y border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-3">Inspection ID</th>
                <th className="py-3 px-3">Date & Timestamp</th>
                <th className="py-3 px-3">Inspecting Officer</th>
                <th className="py-3 px-3">Location / Establishment</th>
                <th className="py-3 px-3 text-center">Items Checked</th>
                <th className="py-3 px-3 text-center">Violations</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-mono font-bold text-gov-blue dark:text-blue-400">
                    {item.id}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap text-slate-500">
                    {item.date}
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">
                    {item.officer}
                  </td>
                  <td className="py-3 px-3">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {item.location}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-bold">
                    {item.productsChecked}
                  </td>
                  <td className="py-3 px-3 text-center font-bold">
                    <span className={`px-2 py-0.5 rounded-full ${
                      item.violationsFound > 0 ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {item.violationsFound}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${
                      item.status === 'Passed Verified' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      item.status === 'Notice Dispatched' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Inspection Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-gov-xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
              Log Field Inspection Entry
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Record physical packaging inspection under Section 15 Powers of Inspection.
            </p>

            <form onSubmit={handleCreateInspection} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Establishment Name & Address:
                </label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Modern Bazaar, Sector 18, Noida"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Total Packaged Commodities Inspected:
                </label>
                <input
                  type="number"
                  min="1"
                  value={newProductsCount}
                  onChange={(e) => setNewProductsCount(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-gov bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-gov bg-gov-blue text-white font-bold"
                >
                  Save Field Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
