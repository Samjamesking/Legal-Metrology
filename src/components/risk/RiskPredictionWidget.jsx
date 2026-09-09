import React from 'react';
import {
  BrainCircuit,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { predictComplianceRisk } from '../../services/mlRiskPrediction';

export default function RiskPredictionWidget({ product }) {
  if (!product) return null;

  const prediction = predictComplianceRisk(product);
  const prob = prediction.riskProbability;

  // Semi-circular gauge math
  const strokeColor =
    prob >= 70 ? '#ef4444' : prob >= 40 ? '#f59e0b' : '#10b981';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
              AI Risk Prediction Module
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Future Non-Compliance Forecasting Engine
            </p>
          </div>
        </div>

        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
          prediction.riskLevel === 'High Risk' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
          prediction.riskLevel === 'Medium Risk' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
          'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
        }`}>
          {prediction.riskLevel}
        </span>
      </div>

      {/* Radial Meter & Probability Metric */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Animated Circular Gauge */}
        <div className="relative flex items-center justify-center w-28 h-28">
          <svg className="w-28 h-28 transform -rotate-90">
            <circle
              cx="56"
              cy="56"
              r="46"
              className="stroke-slate-200 dark:stroke-slate-700"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="56"
              cy="56"
              r="46"
              stroke={strokeColor}
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 46}
              strokeDashoffset={2 * Math.PI * 46 * (1 - prob / 100)}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-black text-slate-900 dark:text-white leading-none">
              {prob}%
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">
              Risk Probability
            </span>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="flex-1 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Compliance Risk Level:</span>
            <span className="font-extrabold text-slate-900 dark:text-white">{prediction.riskLevel}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Commodity Category:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{product.category}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Enforcement Stance:</span>
            <span className="font-semibold text-gov-blue dark:text-blue-400">{prediction.enforcementAction.split('&')[0]}</span>
          </div>
        </div>
      </div>

      {/* Expected Rule Violations */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
          Projected Future Non-Compliances:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {prediction.expectedViolations.map((v, i) => (
            <span
              key={i}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60"
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* Natural Language AI Explanation */}
      <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 text-xs text-purple-900 dark:text-purple-200 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-[11px] text-purple-700 dark:text-purple-300">
          <Sparkles className="w-3.5 h-3.5" /> Explainable AI Risk Attribution
        </div>
        <p className="text-[11px] leading-relaxed">
          {prediction.aiExplanation}
        </p>
      </div>

      {/* Feature Importance Factors */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
          ML Feature Weight Attribution:
        </span>
        {prediction.explainableFactors.map((f, idx) => (
          <div key={idx} className="space-y-0.5 text-[11px]">
            <div className="flex justify-between font-medium">
              <span className="text-slate-700 dark:text-slate-300">{f.feature}</span>
              <span className="font-mono text-slate-400">{f.percentage}</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${f.contribution * 3.3}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
