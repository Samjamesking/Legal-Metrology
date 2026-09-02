import React from 'react';
import { Package, AlertTriangle, CheckCircle, FileText, TrendingUp, TrendingDown } from 'lucide-react';

export default function KPICards({ stats = null }) {
  const defaultStats = {
    totalScanned: 12580,
    violations: 415,
    complianceRate: 92,
    reportsGenerated: 1245
  };

  const currentStats = stats || defaultStats;

  const cards = [
    {
      id: 'scanned',
      title: 'Total Products Scanned',
      value: currentStats.totalScanned.toLocaleString(),
      change: '+14.2% from last month',
      isIncrease: true,
      icon: Package,
      iconBg: 'bg-blue-500/10 text-gov-blue dark:text-blue-400',
      borderAccent: 'border-l-4 border-l-gov-blue',
      glow: 'shadow-blue-500/5'
    },
    {
      id: 'violations',
      title: 'Violations Detected',
      value: currentStats.violations.toLocaleString(),
      change: '-5.8% reduction this week',
      isIncrease: false,
      icon: AlertTriangle,
      iconBg: 'bg-red-500/10 text-red-600 dark:text-red-400',
      borderAccent: 'border-l-4 border-l-red-500',
      glow: 'shadow-red-500/5'
    },
    {
      id: 'compliance',
      title: 'Compliance Rate',
      value: `${currentStats.complianceRate}%`,
      change: '+3.1% improved adherence',
      isIncrease: true,
      icon: CheckCircle,
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      borderAccent: 'border-l-4 border-l-emerald-500',
      glow: 'shadow-emerald-500/5'
    },
    {
      id: 'reports',
      title: 'Reports Generated',
      value: currentStats.reportsGenerated.toLocaleString(),
      change: '+185 issued today',
      isIncrease: true,
      icon: FileText,
      iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      borderAccent: 'border-l-4 border-l-amber-500',
      glow: 'shadow-amber-500/5'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft hover:shadow-card transition-all duration-300 ${card.borderAccent} relative overflow-hidden group`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {card.title}
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
                  {card.value}
                </h3>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${card.iconBg}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-xs">
              {card.isIncrease ? (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              )}
              <span className="font-medium text-slate-600 dark:text-slate-300">
                {card.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
