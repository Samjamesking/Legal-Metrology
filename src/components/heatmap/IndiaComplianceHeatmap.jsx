import React, { useState } from 'react';
import {
  MapPin,
  Flame,
  Filter,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Building,
  Calendar,
  Layers,
  BarChart3
} from 'lucide-react';

// Comprehensive Indian State Compliance Dataset
const STATE_COMPLIANCE_DATA = [
  { id: 'DL', name: 'Delhi NCR', score: 86, violations: 142, highRiskDensity: 'Medium', topViolation: 'Rule 6(1)(e) USP Omission', inspected: 1240, status: 'Performing' },
  { id: 'MH', name: 'Maharashtra', score: 89, violations: 198, highRiskDensity: 'Low', topViolation: 'Rule 6(1)(g) Origin on Imports', inspected: 2150, status: 'Top Performer' },
  { id: 'KA', name: 'Karnataka', score: 92, violations: 110, highRiskDensity: 'Low', topViolation: 'Rule 7 Font Size on Tubes', inspected: 1680, status: 'Top Performer' },
  { id: 'TN', name: 'Tamil Nadu', score: 91, violations: 125, highRiskDensity: 'Low', topViolation: 'Rule 6(1)(f) Care Email Omission', inspected: 1540, status: 'Top Performer' },
  { id: 'GJ', name: 'Gujarat', score: 94, violations: 88, highRiskDensity: 'Low', topViolation: 'Rule 6(1)(c) Net Measure Rounding', inspected: 1980, status: 'Top Performer' },
  { id: 'WB', name: 'West Bengal', score: 79, violations: 245, highRiskDensity: 'High', topViolation: 'Rule 6(1)(e) MRP Taxes Missing', inspected: 1420, status: 'Vulnerable' },
  { id: 'UP', name: 'Uttar Pradesh', score: 71, violations: 412, highRiskDensity: 'High', topViolation: 'Rule 6(1)(d) Batch Number Scratched', inspected: 2890, status: 'High Risk' },
  { id: 'BR', name: 'Bihar', score: 68, violations: 368, highRiskDensity: 'High', topViolation: 'Rule 6(1)(a) Incomplete Address/PIN', inspected: 1840, status: 'High Risk' },
  { id: 'RJ', name: 'Rajasthan', score: 82, violations: 176, highRiskDensity: 'Medium', topViolation: 'Rule 6(1)(c) Non-metric units', inspected: 1350, status: 'Performing' },
  { id: 'MP', name: 'Madhya Pradesh', score: 78, violations: 220, highRiskDensity: 'Medium', topViolation: 'Rule 6(1)(d) Mfg Month missing', inspected: 1410, status: 'Vulnerable' },
  { id: 'PB', name: 'Punjab', score: 85, violations: 132, highRiskDensity: 'Medium', topViolation: 'Rule 7 Numeral Height on Pouches', inspected: 980, status: 'Performing' },
  { id: 'HR', name: 'Haryana', score: 88, violations: 118, highRiskDensity: 'Low', topViolation: 'Rule 6(1)(e) Dual MRP Sticker', inspected: 1120, status: 'Top Performer' },
  { id: 'KL', name: 'Kerala', score: 95, violations: 64, highRiskDensity: 'Low', topViolation: 'Rule 6(1)(f) Helpline timing', inspected: 1220, status: 'Top Performer' },
  { id: 'AP', name: 'Andhra Pradesh', score: 87, violations: 135, highRiskDensity: 'Low', topViolation: 'Rule 6(1)(e) Unit Price Missing', inspected: 1190, status: 'Performing' },
  { id: 'TS', name: 'Telangana', score: 90, violations: 98, highRiskDensity: 'Low', topViolation: 'Rule 6(1)(a) Registered entity name', inspected: 1310, status: 'Top Performer' },
  { id: 'OD', name: 'Odisha', score: 76, violations: 194, highRiskDensity: 'High', topViolation: 'Rule 6(1)(d) Expiry date missing', inspected: 1040, status: 'Vulnerable' },
  { id: 'AS', name: 'Assam & North East', score: 73, violations: 215, highRiskDensity: 'High', topViolation: 'Rule 6(1)(g) Origin on border goods', inspected: 890, status: 'High Risk' }
];

export default function IndiaComplianceHeatmap() {
  const [selectedState, setSelectedState] = useState(STATE_COMPLIANCE_DATA[0]);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [dateRange, setDateRange] = useState('30d');

  const topStates = [...STATE_COMPLIANCE_DATA].sort((a, b) => b.score - a.score).slice(0, 4);
  const highRiskStates = [...STATE_COMPLIANCE_DATA].sort((a, b) => a.score - b.score).slice(0, 4);

  // Choropleth color calculator
  const getColor = (score) => {
    if (score >= 90) return '#10B981'; // Emerald
    if (score >= 80) return '#3B82F6'; // Blue
    if (score >= 75) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-gov-blue dark:text-blue-300 text-xs font-bold mb-2">
            <Flame className="w-3.5 h-3.5 text-red-500" /> National Metrology Geospatial Intelligence
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            India Compliance Heatmap Analytics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time statutory adherence telemetry, violation density heatmaps, and state enforcement matrices across India.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-gov text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          >
            <option value="ALL">All Product Categories</option>
            <option value="Edible Oils">Edible Oils & Fats</option>
            <option value="Cosmetics">Cosmetics & Toiletries</option>
            <option value="Staples">Food Staples & Flour</option>
            <option value="Imports">Imported Confectionery</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 rounded-gov text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Current Quarter (Q3)</option>
            <option value="1y">Year to Date (2026)</option>
          </select>
        </div>
      </div>

      {/* Top Performing vs High Risk States Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top States Card */}
        <div className="p-4 rounded-gov bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Top Performing States (Adherence &gt; 90%)
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Gold Tier</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {topStates.map(s => (
              <div
                key={s.id}
                onClick={() => setSelectedState(s)}
                className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                  selectedState.id === s.id ? 'ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300' : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span className="text-xs font-black text-slate-900 dark:text-white block">{s.name}</span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block">{s.score}%</span>
                <span className="text-[9px] text-slate-400 block">{s.inspected} Inspected</span>
              </div>
            ))}
          </div>
        </div>

        {/* High Risk States Card */}
        <div className="p-4 rounded-gov bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-xs text-red-600 dark:text-red-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> High-Risk Surveillance Zones
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Intensive Audit Priority</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {highRiskStates.map(s => (
              <div
                key={s.id}
                onClick={() => setSelectedState(s)}
                className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                  selectedState.id === s.id ? 'ring-2 ring-red-500 bg-red-50 dark:bg-red-950/40 border-red-300' : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                }`}
              >
                <span className="text-xs font-black text-slate-900 dark:text-white block">{s.name}</span>
                <span className="text-sm font-black text-red-600 dark:text-red-400 mt-0.5 block">{s.score}%</span>
                <span className="text-[9px] text-red-500 font-semibold block">{s.violations} Infractions</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Heatmap Grid: Interactive India Region Map & Selected State Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Interactive Geospatial State Selector (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gov-blue dark:text-blue-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                All India State Heatmap Matrix
              </h3>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"/> &gt;90%</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"/> 80-89%</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"/> 75-79%</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"/> &lt;75%</span>
            </div>
          </div>

          {/* Interactive Geographic Cards Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
            {STATE_COMPLIANCE_DATA.map((state) => {
              const isSelected = selectedState.id === state.id;
              const col = getColor(state.score);

              return (
                <div
                  key={state.id}
                  onClick={() => setSelectedState(state)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'ring-2 ring-gov-blue bg-blue-50/70 dark:bg-blue-900/30 border-gov-blue shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div
                    className="absolute top-0 left-0 bottom-0 w-1.5"
                    style={{ backgroundColor: col }}
                  />

                  <div className="pl-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                        {state.name}
                      </span>
                      <span
                        className="font-black text-xs font-mono ml-1"
                        style={{ color: col }}
                      >
                        {state.score}%
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
                      <span>{state.inspected} Scans</span>
                      <span className={state.highRiskDensity === 'High' ? 'text-red-500 font-bold' : 'text-slate-400'}>
                        {state.violations} Violations
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Selected State Dossier (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  State Enforcement Dossier
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  {selectedState.name}
                </h3>
              </div>

              <span
                className="text-xs font-black px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: getColor(selectedState.score) }}
              >
                {selectedState.score}% Score
              </span>
            </div>

            {/* Metrics Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Total Retail Inspections:</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{selectedState.inspected} Packages</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Recorded Violations:</span>
                <span className="font-extrabold text-red-600 dark:text-red-400">{selectedState.violations} Infractions</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Risk Density Rating:</span>
                <span className={`font-extrabold ${selectedState.highRiskDensity === 'High' ? 'text-red-600' : 'text-emerald-600'}`}>
                  {selectedState.highRiskDensity} Density
                </span>
              </div>

              <div className="p-3 rounded-xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200">
                <div className="text-[10px] uppercase font-bold text-red-600 mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Most Prevalent Local Infraction:
                </div>
                <div className="font-bold text-xs">{selectedState.topViolation}</div>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1">
                  Enforcement officers in {selectedState.name} are instructed to focus field audits on this statutory breach.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Jurisdiction: State Metrology Controller</span>
            <button
              onClick={() => alert(`Report for ${selectedState.name} exported.`)}
              className="font-bold text-gov-blue dark:text-blue-400 hover:underline"
            >
              Export State Report (.PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
