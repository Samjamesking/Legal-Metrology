import React from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldAlert,
  Info,
  ChevronRight
} from 'lucide-react';
import { MANDATORY_DECLARATIONS } from '../../data/legalMetrologyRules';

export default function ComplianceResults({
  product,
  onSelectField,
  onOpenCopilot,
  onOpenCV,
  onOpenCertificate
}) {
  if (!product) return null;

  const score = product.complianceScore || 0;

  // Score color thresholds
  const scoreColor =
    score >= 80 ? 'text-emerald-500 stroke-emerald-500' :
    score >= 50 ? 'text-amber-500 stroke-amber-500' :
    'text-red-500 stroke-red-500';

  const scoreBadgeBg =
    score >= 80 ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200' :
    score >= 50 ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200' :
    'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200';

  // SVG Circular Gauge calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft flex flex-col justify-between h-full">
      <div>
        {/* Header with Circular AI Compliance Score */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
              Detected Declarations
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Legal Metrology Rules, 2011 Rule 6(1)
            </p>
          </div>

          {/* Circular Progress Gauge */}
          <div className="relative flex items-center justify-center w-20 h-20">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                className={`transition-all duration-1000 ease-out ${scoreColor}`}
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
                {score}%
              </span>
              <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
                Score
              </span>
            </div>
          </div>
        </div>

        {/* Status Score Banner */}
        <div className={`mt-3 px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-between ${scoreBadgeBg}`}>
          <span>Status: {product.status}</span>
          <span className="text-[11px]">{product.riskLevel}</span>
        </div>

        {/* 9 Mandatory Declarations Checklist */}
        <div className="mt-3 space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
          {MANDATORY_DECLARATIONS.map((decl) => {
            const field = product.declarations?.[decl.id] || { status: 'missing', value: 'Not Detected', note: 'Missing declaration' };
            const isValid = field.status === 'valid';
            const isWarning = field.status === 'warning';

            return (
              <div
                key={decl.id}
                onClick={() => onSelectField && onSelectField(decl)}
                className={`p-2.5 rounded-lg border text-xs transition-all flex items-start justify-between gap-2 hover:shadow-xs cursor-pointer ${
                  isValid
                    ? 'border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30'
                    : isWarning
                    ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20'
                    : 'border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20'
                }`}
              >
                <div className="flex items-start gap-2 min-w-0">
                  <div className="mt-0.5 shrink-0">
                    {isValid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {decl.name}
                      </span>
                      <span className="text-[9px] font-mono px-1 rounded bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {decl.rule}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate mt-0.5 font-medium">
                      {field.value || 'Not Detected'}
                    </p>

                    {field.note && (
                      <p className={`text-[10px] mt-0.5 ${isValid ? 'text-emerald-700 dark:text-emerald-400' : isWarning ? 'text-amber-700 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                        {field.note}
                      </p>
                    )}
                  </div>
                </div>

                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-1" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info Pill & Quick Actions */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span>Principal Display Panel (PDP):</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">{product.pdpAreaCm2} cm²</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onOpenCopilot}
            className="w-full py-1.5 px-2 rounded-gov bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80 text-[11px] font-bold hover:bg-purple-100 flex items-center justify-center gap-1 shadow-xs"
          >
            <span>✨ AI Copilot</span>
          </button>

          <button
            onClick={onOpenCV}
            className="w-full py-1.5 px-2 rounded-gov bg-blue-50 dark:bg-blue-950/50 text-gov-blue dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 text-[11px] font-bold hover:bg-blue-100 flex items-center justify-center gap-1 shadow-xs"
          >
            <span>👁️ CV Inspection</span>
          </button>
        </div>

        {product.complianceScore >= 80 && (
          <button
            onClick={onOpenCertificate}
            className="w-full py-1.5 px-2 rounded-gov bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20"
          >
            <span>📜 View Official QR Certificate</span>
          </button>
        )}
      </div>
    </div>
  );
}
