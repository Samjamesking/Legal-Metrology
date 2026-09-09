import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Scale,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { manufacturerDb } from '../../services/manufacturerDbService';

export default function ManufacturerAnalyticsView({ onSelectProduct = null }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL'); // 'ALL' | 'High Risk' | 'Medium Risk' | 'Low Risk'

  const manufacturers = manufacturerDb.getAll();

  const filtered = manufacturers.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.headquarters.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'ALL' || m.riskCategory === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const highRiskCount = manufacturers.filter(m => m.riskCategory === 'High Risk').length;
  const repeatOffenderCount = manufacturers.filter(m => m.repeatOffender).length;
  const avgComplianceRate = Math.round(
    manufacturers.reduce((acc, m) => acc + m.complianceRate, 0) / manufacturers.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-gov-blue dark:text-blue-300 text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" /> Corporate Metrology Registry
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Manufacturer Compliance History & Risk Registry
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Official statutory tracking of manufacturers, packaging inspection records, repeat offenders, and legal penalty notices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-gov bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200">
            {manufacturers.length} Registered Corporates
          </span>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-gov-blue flex items-center justify-center font-bold text-sm">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Average Adherence</span>
            <h4 className="font-black text-lg text-slate-900 dark:text-white">{avgComplianceRate}%</h4>
            <span className="text-[10px] text-emerald-600 font-semibold">National Industry Benchmark</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold text-sm">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">High-Risk Entities</span>
            <h4 className="font-black text-lg text-red-600 dark:text-red-400">{highRiskCount} Corporates</h4>
            <span className="text-[10px] text-red-500 font-semibold">Active Seizure Surveillance</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Repeat Offenders</span>
            <h4 className="font-black text-lg text-amber-600 dark:text-amber-400">{repeatOffenderCount} Entities</h4>
            <span className="text-[10px] text-amber-600 font-semibold">Multiple Infractions &gt; 2</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Verified Clean Record</span>
            <h4 className="font-black text-lg text-emerald-600 dark:text-emerald-400">
              {manufacturers.filter(m => m.riskCategory === 'Low Risk').length} Corporates
            </h4>
            <span className="text-[10px] text-emerald-600 font-semibold">Zero Outstanding Notices</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search manufacturer, corporate name, or state..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov text-xs text-slate-800 dark:text-slate-200"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Risk Filter:</span>
          {['ALL', 'Low Risk', 'Medium Risk', 'High Risk'].map((rf) => (
            <button
              key={rf}
              onClick={() => setRiskFilter(rf)}
              className={`px-3 py-1.5 rounded-gov text-xs font-bold transition-colors ${
                riskFilter === rf
                  ? 'bg-gov-blue text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {rf}
            </button>
          ))}
        </div>
      </div>

      {/* Manufacturers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((mfg) => {
          const isHigh = mfg.riskCategory === 'High Risk';
          const isMedium = mfg.riskCategory === 'Medium Risk';
          const isLow = mfg.riskCategory === 'Low Risk';

          return (
            <div
              key={mfg.id}
              className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                      {mfg.name}
                    </h3>
                    <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                      HQ: {mfg.headquarters} • CIN: {mfg.registeredCin}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    isHigh
                      ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                      : isMedium
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {mfg.riskCategory}
                  </span>
                </div>

                {/* Compliance Metrics Gauge */}
                <div className="my-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-bold block">Compliance</span>
                    <span className={`font-black text-sm ${mfg.complianceRate >= 85 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {mfg.complianceRate}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-bold block">Audited Packs</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                      {mfg.totalProductsChecked}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-bold block">Risk Score</span>
                    <span className={`font-black text-sm ${isHigh ? 'text-red-600' : 'text-slate-700 dark:text-slate-200'}`}>
                      {mfg.riskScore}/100
                    </span>
                  </div>
                </div>

                {/* Repeat Offender Badge */}
                {mfg.repeatOffender && (
                  <div className="mb-2 p-2 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-[11px] text-red-700 dark:text-red-300 font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    Repeat Offender: Multiple packaging notices under Section 36(1)
                  </div>
                )}

                {/* Top Categories */}
                <div className="mb-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Portfolio</span>
                  <div className="flex flex-wrap gap-1">
                    {mfg.topCategories.map((cat, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Previous Violations Log */}
                {mfg.previousViolations.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Statutory Violations Log ({mfg.previousViolations.length})</span>
                    {mfg.previousViolations.slice(0, 2).map((v) => (
                      <div key={v.id} className="text-[10px] p-1.5 rounded bg-slate-100/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 flex items-center justify-between">
                        <span><strong>{v.rule}</strong>: {v.description}</span>
                        <span className="font-mono text-red-600 font-semibold">{v.penalty}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Inspection Date */}
              <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Last Audit: {mfg.lastInspectionDate}
                </span>
                <span className="font-mono text-[10px] text-gov-blue dark:text-blue-400 font-semibold">
                  Fines: {mfg.penaltiesPaid}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
