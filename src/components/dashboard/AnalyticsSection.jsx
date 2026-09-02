import React from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { TrendingUp, PieChart as PieIcon, BarChart3, Activity } from 'lucide-react';
import { MOCK_ANALYTICS_DATA } from '../../data/sampleProducts';

export default function AnalyticsSection() {
  const { monthlyCompliance, violationCategories, categoryDistribution } = MOCK_ANALYTICS_DATA;

  return (
    <div className="mt-6 space-y-5">
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-gov-blue dark:text-blue-400" />
            Compliance Analytics & Trends
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time compliance intelligence powered by Recharts
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-gov-blue dark:text-blue-300 border border-blue-100 dark:border-blue-900/60">
          FY 2026-27 Stream
        </span>
      </div>

      {/* 3 Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart 1: Compliance Trend (Line Chart) */}
        <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Compliance Trend (Line Chart)
              </h3>
              <p className="text-[11px] text-slate-500">Monthly compliance percentages</p>
            </div>
            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
              94% Current
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyCompliance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis domain={[75, 100]} tick={{ fontSize: 10, fill: '#64748b' }} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }}
                  formatter={(val) => [`${val}%`, 'Compliance Rate']}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#0F4C81' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Violation Categories (Pie Chart) */}
        <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <PieIcon className="w-4 h-4 text-red-500" />
                Violation Categories (Pie Chart)
              </h3>
              <p className="text-[11px] text-slate-500">Breakdown of non-compliance issues</p>
            </div>
          </div>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={violationCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {violationCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }}
                  formatter={(val) => [`${val}%`, 'Share']}
                />
                <Legend
                  wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }}
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Product Compliance Distribution (Bar Chart) */}
        <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-gov-blue dark:text-blue-400" />
                Product Compliance Distribution
              </h3>
              <p className="text-[11px] text-slate-500">Compliant vs Non-Compliant by sector</p>
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                <XAxis dataKey="category" tick={{ fontSize: 9, fill: '#64748b' }} interval={0} angle={-15} textAnchor="end" height={35} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="compliant" name="Compliant %" fill="#0F4C81" radius={[4, 4, 0, 0]} />
                <Bar dataKey="nonCompliant" name="Non-Compliant %" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
