import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Scale,
  ShieldCheck,
  ArrowRight,
  Zap
} from 'lucide-react';

export default function ViolationSummary({ product, onOpenViolationsPage, onOpenCopilot }) {
  if (!product) return null;

  const violations = product.violations || [];
  const recommendations = product.recommendations || [];

  return (
    <div className="space-y-4 flex flex-col justify-between h-full">
      {/* Detected Violations Section */}
      <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                Violation Summary
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {violations.length === 0 ? 'Zero Rule Infractions' : `${violations.length} Detected Violations`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {violations.length > 0 && onOpenCopilot && (
              <button
                onClick={onOpenCopilot}
                className="text-[10px] font-bold px-2 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white shadow-xs flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                AI Rectify
              </button>
            )}
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              violations.length === 0
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
            }`}>
              {violations.length === 0 ? 'Compliant' : `${violations.length} Non-Compliances`}
            </span>
          </div>
        </div>

        {/* Violations List / Zero State */}
        <div className="mt-3 space-y-2 max-h-[195px] overflow-y-auto pr-1">
          {violations.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 text-center flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1.5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-xs text-emerald-800 dark:text-emerald-300">
                Full Legal Metrology Compliance
              </h4>
              <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 mt-0.5 max-w-xs">
                Package satisfies all statutory requirements under Legal Metrology Rules, 2011.
              </p>
            </div>
          ) : (
            violations.map((viol) => {
              const isCritical = viol.severity === 'critical';
              return (
                <div
                  key={viol.id}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    isCritical
                      ? 'bg-red-50/80 dark:bg-red-950/30 border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200'
                      : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-sm mt-0.5">
                      {isCritical ? '🔴' : '🟠'}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{viol.title}</span>
                        <span className="text-[9px] font-mono font-semibold px-1 rounded bg-white/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {viol.rule}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {viol.description}
                      </p>
                      {viol.penaltyEstimate && (
                        <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-red-600 dark:text-red-400">
                          <Scale className="w-3 h-3" />
                          Penalty: {viol.penaltyEstimate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* AI Suggestions Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-gov-blue dark:text-blue-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                AI Compliance Recommendations
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Actionable Packaging Advisory
              </p>
            </div>
          </div>

          <span className="text-[10px] font-semibold text-gov-blue dark:text-blue-400 flex items-center gap-0.5">
            <Zap className="w-3 h-3" /> Smart NLP
          </span>
        </div>

        <div className="mt-3 space-y-2 max-h-[180px] overflow-y-auto pr-1">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-2.5 rounded-lg border border-blue-100 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20 text-xs flex items-start gap-2 hover:bg-blue-50/70 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed block">
                  {rec.text}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  {rec.category && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 font-medium">
                      {rec.category}
                    </span>
                  )}
                  {rec.priority && (
                    <span className={`text-[9px] font-bold ${
                      rec.priority === 'Critical' ? 'text-red-500' : rec.priority === 'High' ? 'text-amber-500' : 'text-slate-400'
                    }`}>
                      {rec.priority} Priority
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
