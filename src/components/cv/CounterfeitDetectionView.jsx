import React, { useState } from 'react';
import {
  ShieldAlert,
  Flame,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Layers,
  ZoomIn,
  Search,
  Crosshair,
  BadgeAlert
} from 'lucide-react';
import { evaluateLabelAuthenticity } from '../../services/cvEngine';
import PackagingPreview from '../common/PackagingPreview';

export default function CounterfeitDetectionView({ product }) {
  const [activeAnomaly, setActiveAnomaly] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(true);

  if (!product) return null;

  const authReport = evaluateLabelAuthenticity(product);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-gov bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-300 text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Anti-Counterfeit & Tamper Vision
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Label Tampering & Counterfeit Detection
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Optical edge-disparity and multi-spectral anomaly scan for sticker overlays, edited MRPs, and manipulated expiry stamps.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center min-w-[140px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Authenticity Score</span>
            <span className={`text-2xl font-black ${
              authReport.authenticityScore >= 80 ? 'text-emerald-500' : authReport.authenticityScore >= 50 ? 'text-amber-500' : 'text-red-500'
            }`}>
              {authReport.authenticityScore}%
            </span>
            <span className={`text-[10px] font-bold block ${
              authReport.authenticityScore >= 80 ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {authReport.authenticityGrade}
            </span>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Heatmap Canvas */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Tamper Anomaly Visual Heatmap
              </h3>
            </div>

            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                showHeatmap ? 'bg-red-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
              }`}
            >
              {showHeatmap ? 'Hide Thermal Heatmap' : 'Show Thermal Heatmap'}
            </button>
          </div>

          <div className="relative min-h-[360px] flex-1 bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-2">
            <PackagingPreview product={product} />

            {/* Thermal / Anomaly Heatmap Gradient Overlay */}
            {showHeatmap && (
              <div className="absolute inset-0 pointer-events-none">
                {authReport.heatmaps.map((h, idx) => (
                  <div
                    key={idx}
                    className="absolute rounded-xl transition-opacity animate-pulse"
                    style={{
                      left: `${h.x}%`,
                      top: `${h.y}%`,
                      width: `${h.w}%`,
                      height: `${h.h}%`,
                      background: h.intensity > 0.5
                        ? `radial-gradient(circle, rgba(239,68,68,0.7) 0%, rgba(245,158,11,0.5) 50%, rgba(239,68,68,0) 80%)`
                        : `radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0) 70%)`
                    }}
                  >
                    {h.intensity > 0.5 && (
                      <div className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-md flex items-center gap-1">
                        <Crosshair className="w-3 h-3" />
                        {h.label}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Anomaly List & Forensic Diagnostics */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center justify-between">
              <span>Detected Surface Anomalies & Disparities</span>
              <span className="text-xs font-bold text-red-500">
                {authReport.anomalies.length} Suspicious Regions
              </span>
            </h3>

            {authReport.anomalies.length === 0 ? (
              <div className="p-6 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                <h4 className="font-extrabold text-xs text-emerald-800 dark:text-emerald-300">
                  Zero Tampering Signatures Detected
                </h4>
                <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400/80 mt-1 max-w-xs mx-auto">
                  Package surface exhibits uniform ink micro-density, consistent typography, and unbroken original substrate borders.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {authReport.anomalies.map((anom, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveAnomaly(anom)}
                    className="p-3.5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20 text-xs space-y-2 cursor-pointer hover:bg-red-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-red-900 dark:text-red-200">
                        <BadgeAlert className="w-4 h-4 text-red-600" />
                        {anom.type}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600 text-white">
                        {anom.confidence}% AI Confidence
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                      {anom.description}
                    </p>

                    <div className="p-2 rounded bg-white/80 dark:bg-slate-800/80 border border-red-100 dark:border-red-900/40 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                      <strong>Forensic Evidence:</strong> {anom.evidence}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Legal Consequence Alert */}
          {authReport.isSuspicious && (
            <div className="p-4 rounded-xl bg-red-600 text-white shadow-lg space-y-1 text-xs">
              <div className="font-extrabold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-300" />
                Statutory Notice: Section 36 Offence
              </div>
              <p className="text-red-100 text-[11px] leading-relaxed">
                Altering pre-printed MRP or tampering with expiry dates constitutes an offense under Section 36(1) of the Legal Metrology Act, 2009 and Section 318 of BNS. Immediate product seizure recommended.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
