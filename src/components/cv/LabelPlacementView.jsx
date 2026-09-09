import React, { useState } from 'react';
import {
  LayoutGrid,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Info,
  ShieldCheck,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { evaluateLabelPlacement } from '../../services/cvEngine';
import PackagingPreview from '../common/PackagingPreview';

export default function LabelPlacementView({ product }) {
  const [selectedPlacement, setSelectedPlacement] = useState(null);

  if (!product) return null;

  const placementReport = evaluateLabelPlacement(product);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-gov bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-gov-blue dark:text-blue-300 text-xs font-bold mb-2">
            <LayoutGrid className="w-3.5 h-3.5" /> Layout & Placement Verification
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Principal Display Panel (PDP) Layout Verification
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Validates statutory quadrant placement for MRP, Net Quantity, Manufacturer, and Customer Care under Rule 6 & Rule 8.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center min-w-[140px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Layout Score</span>
            <span className={`text-2xl font-black ${
              placementReport.layoutScore >= 80 ? 'text-emerald-500' : placementReport.layoutScore >= 50 ? 'text-amber-500' : 'text-red-500'
            }`}>
              {placementReport.layoutScore}%
            </span>
            <span className="text-[10px] text-slate-500 block font-semibold">{placementReport.status}</span>
          </div>
        </div>
      </div>

      {/* 2-Column Grid: Visual Package Layout vs Diagnostic Placement Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Layout Canvas with Quadrant Guides & Overlays */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-gov-blue dark:text-blue-400" />
              PDP Quadrant & Placement Canvas
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">
              Green = Correct • Red = Misplaced
            </span>
          </div>

          {/* Package Preview Canvas with Placement Visual Box Overlays */}
          <div className="relative min-h-[360px] flex-1 bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-2">
            <PackagingPreview product={product} />

            {/* Simulated Quadrant Overlay Lines */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-2 grid-rows-3 border border-dashed border-blue-400/40">
              <div className="border-r border-b border-dashed border-blue-400/30 p-1 text-[8px] font-mono text-blue-400/70">Top Left Header</div>
              <div className="border-b border-dashed border-blue-400/30 p-1 text-[8px] font-mono text-blue-400/70 text-right">Top Right (MRP Zone)</div>
              <div className="border-r border-b border-dashed border-blue-400/30 p-1 text-[8px] font-mono text-blue-400/70">Middle PDP</div>
              <div className="border-b border-dashed border-blue-400/30 p-1 text-[8px] font-mono text-blue-400/70 text-right">Side Flap</div>
              <div className="border-r border-dashed border-blue-400/30 p-1 text-[8px] font-mono text-emerald-500/70 font-bold">Mandatory Net Qty Zone (Bottom 30%)</div>
              <div className="p-1 text-[8px] font-mono text-blue-400/70 text-right">Bottom Seam Zone</div>
            </div>

            {/* Dynamic Placement Highlights */}
            <div className="absolute inset-0 pointer-events-none">
              {placementReport.placements.map((p) => {
                const isSelected = selectedPlacement?.id === p.id;
                const isCompliant = p.isCompliant;
                const box = p.overlayBox;

                return (
                  <div
                    key={p.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlacement(p);
                    }}
                    className={`absolute border-2 rounded transition-all duration-200 pointer-events-auto cursor-pointer ${
                      isCompliant
                        ? 'border-emerald-500 bg-emerald-500/15'
                        : p.isWarning
                        ? 'border-amber-500 bg-amber-500/20'
                        : 'border-red-500 bg-red-500/25 ring-2 ring-red-400'
                    } ${isSelected ? 'scale-105 shadow-xl ring-2 ring-gov-blue' : ''}`}
                    style={{
                      left: `${box.x}%`,
                      top: `${box.y}%`,
                      width: `${box.w}%`,
                      height: `${box.h}%`
                    }}
                  >
                    <div className="relative -top-4 left-0">
                      <span className={`text-[9px] font-bold px-1 rounded shadow-xs ${
                        isCompliant ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                      }`}>
                        {p.element}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Placement Diagnosis List */}
        <div className="lg:col-span-6 space-y-3">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center justify-between">
              <span>Mandatory Declaration Placement Verification</span>
              <span className="text-xs font-semibold text-gov-blue dark:text-blue-400">
                4 Critical Checks
              </span>
            </h3>

            <div className="space-y-3">
              {placementReport.placements.map((item) => {
                const isCompliant = item.isCompliant;
                const isWarning = item.isWarning;
                const isSelected = selectedPlacement?.id === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPlacement(item)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-gov-blue bg-blue-50/50 dark:bg-blue-900/20 border-gov-blue'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          {isCompliant ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : isWarning ? (
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>

                        <div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white">
                            {item.element}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Mandated: <strong>{item.mandatedZone}</strong>
                          </div>
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCompliant
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : isWarning
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}>
                        {isCompliant ? 'Correct Placement' : isWarning ? 'Warning' : 'Misplaced'}
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-lg border border-slate-100 dark:border-slate-700/60 leading-relaxed">
                      {item.notes}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
