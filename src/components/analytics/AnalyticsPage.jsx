import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Flame,
  ShieldCheck,
  BrainCircuit,
  MapPin,
  Calendar
} from 'lucide-react';
import { MOCK_ANALYTICS_DATA } from '../../data/sampleProducts';

export default function AnalyticsPage() {
  const { monthlyCompliance, violationCategories, categoryDistribution } = MOCK_ANALYTICS_DATA;

  // Heatmap rules data
  const ruleHeatmap = [
    { rule: 'Rule 6(1)(e) - MRP & USP Taxes', violations: 142, severity: 'Critical', color: 'bg-red-500' },
    { rule: 'Rule 6(1)(d) - Expiry / Mfg Dates', violations: 98, severity: 'Critical', color: 'bg-red-500' },
    { rule: 'Rule 7 - Font Size Below Legal Limit', violations: 76, severity: 'Warning', color: 'bg-amber-500' },
    { rule: 'Rule 6(1)(f) - Consumer Helpline/Email', violations: 58, severity: 'Critical', color: 'bg-red-500' },
    { rule: 'Rule 6(1)(g) - Country of Origin', violations: 41, severity: 'Warning', color: 'bg-amber-500' },
    { rule: 'Rule 6(1)(c) - Net Quantity Non-Standard', violations: 24, severity: 'Warning', color: 'bg-amber-500' },
    { rule: 'Rule 6(1)(a) - Incomplete Postal Address', violations: 19, severity: 'Minor', color: 'bg-blue-500' }
  ];

  // Predictive risk scores
  const predictiveRisk = [
    { category: 'Imported Confectionery', projectedRisk: 78, trend: '+12% risk in Q3', reason: 'Missing INR MRP & Importer stickers' },
    { category: 'Cosmetics & Tubes', projectedRisk: 64, trend: '+8% risk in Q3', reason: 'Omission of batch crimp & shelf life' },
    { category: 'Edible Oils in Pouches', projectedRisk: 42, trend: '-5% risk in Q3', reason: 'Font height under-sizing on 1L pouches' },
    { category: 'Food Staples & Atta', projectedRisk: 12, trend: '-18% low risk', reason: 'Large brands automated digital printing' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-gov-blue dark:text-blue-300 text-xs font-bold mb-2">
            <BarChart3 className="w-3.5 h-3.5" /> Macro Compliance Intelligence
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Legal Metrology Analytics & Heatmap
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Predictive AI models, national compliance trajectory, and most-violated rule telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-gov bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200">
            Real-Time Audit Sync
          </span>
        </div>
      </div>

      {/* Main Charts: Area & Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Growth Area Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Monthly Scans vs Compliance Rate
          </h3>
          <p className="text-xs text-slate-500 mb-4">Inspection throughput growth across zones</p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyCompliance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scannedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0F4C81" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }} />
                <Area type="monotone" dataKey="scanned" name="Scanned Packages" stroke="#0F4C81" fillOpacity={1} fill="url(#scannedGradient)" />
                <Line type="monotone" dataKey="rate" name="Compliance %" stroke="#10B981" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sectoral Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-gov-blue dark:text-blue-400" />
            Sectoral Adherence Comparison
          </h3>
          <p className="text-xs text-slate-500 mb-4">Percentage compliance by commodity sector</p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                <XAxis dataKey="category" tick={{ fontSize: 9, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }} />
                <Bar dataKey="compliant" name="Compliant %" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="nonCompliant" name="Non-Compliant %" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Compliance Heatmap Section */}
      <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Compliance Heatmap: Most Violated Legal Rules
              </h3>
              <p className="text-xs text-slate-500">
                Frequency distribution of non-compliant declarations under Rules 2011
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2.5 py-1 rounded">
            Top 7 Infractions
          </span>
        </div>

        <div className="space-y-3">
          {ruleHeatmap.map((item, idx) => {
            const pct = Math.round((item.violations / 150) * 100);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800 dark:text-slate-200">{item.rule}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{item.violations} Infractions</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded text-white ${
                      item.severity === 'Critical' ? 'bg-red-600' : item.severity === 'Warning' ? 'bg-amber-600' : 'bg-blue-600'
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      item.severity === 'Critical' ? 'bg-red-500' : item.severity === 'Warning' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Violation Prediction Section */}
      <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
          <BrainCircuit className="w-5 h-5 text-gov-blue dark:text-blue-400" />
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              AI Violation Risk Projection (Next Quarter)
            </h3>
            <p className="text-xs text-slate-500">
              Machine learning forecasting for proactive market surveillance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {predictiveRisk.map((risk, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {risk.category}
                  </span>
                  <span className={`text-xs font-black px-2 py-0.5 rounded ${
                    risk.projectedRisk > 60 ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
                    risk.projectedRisk > 30 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                    'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {risk.projectedRisk}% Risk
                  </span>
                </div>
                <div className="text-[11px] font-bold text-slate-500 mt-1">
                  {risk.trend}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  {risk.reason}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/70 dark:border-slate-700 text-[10px] text-gov-blue dark:text-blue-400 font-semibold">
                Surveillance Priority: {risk.projectedRisk > 60 ? 'Immediate Field Check' : 'Routine Monitoring'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
