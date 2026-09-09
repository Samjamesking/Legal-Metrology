import React, { useState } from 'react';
import {
  Ruler,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Info,
  Layers,
  Sparkles,
  Scale
} from 'lucide-react';
import { evaluateFontSizeCompliance } from '../../services/cvEngine';

export default function FontSizeValidationView({ product }) {
  const [activeItem, setActiveItem] = useState(null);

  if (!product) return null;

  const fontReport = evaluateFontSizeCompliance(product);

  return (
    <div className="space-y-6">
      {/* Top Banner / Summary */}
      <div className="p-5 rounded-gov bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-gov-blue dark:text-blue-300 text-xs font-bold mb-2">
            <Ruler className="w-3.5 h-3.5" /> Computer Vision Font Sizing Engine
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Rule 7 Font Size Compliance Report
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Statutory minimum lettering and numeral height enforcement based on Principal Display Panel (PDP) surface area.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">PDP Surface Area</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white">{fontReport.pdpAreaCm2} cm²</span>
            <span className="text-[10px] text-slate-500 block">Schedule II Tier</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center min-w-[100px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Font Score</span>
            <span className={`text-xl font-black ${
              fontReport.overallFontScore >= 80 ? 'text-emerald-500' : fontReport.overallFontScore >= 50 ? 'text-amber-500' : 'text-red-500'
            }`}>
              {fontReport.overallFontScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Statutory Rule 7 Threshold Reference Card */}
      <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/80 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-blue-900 dark:text-blue-200">
        <div className="flex items-center gap-2.5">
          <Scale className="w-5 h-5 text-gov-blue dark:text-blue-400 shrink-0" />
          <div>
            <span className="font-bold block">Legal Standard for PDP Area {fontReport.pdpAreaCm2} cm²:</span>
            <span className="text-[11px] text-blue-700 dark:text-blue-300">
              Minimum General Lettering: <strong>{fontReport.minHeightMm} mm ({fontReport.minHeightPt} pt)</strong> | Numerals (Net Qty & MRP): <strong>{fontReport.minNumeralMm} mm ({fontReport.minNumeralPt} pt)</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
            {fontReport.compliantCount} Valid
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-bold">
            {fontReport.warningCount} Warning
          </span>
          <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 text-[10px] font-bold">
            {fontReport.nonCompliantCount} Non-Compliant
          </span>
        </div>
      </div>

      {/* Font Compliance Table */}
      <div className="bg-white dark:bg-slate-900 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-gov-blue dark:text-blue-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Optical Font Measurement Results
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">
            Calculated via Computer Vision Bounding Box Spatial Transform
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Packaging Declaration</th>
                <th className="py-3 px-4">Detected Size</th>
                <th className="py-3 px-4">Statutory Threshold</th>
                <th className="py-3 px-4">Ratio</th>
                <th className="py-3 px-4">Legal Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {fontReport.items.map((item) => {
                const isValid = item.status === 'Valid';
                const isWarning = item.status === 'Warning';
                const isViolation = item.status === 'Non-Compliant';

                return (
                  <tr
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                      activeItem?.id === item.id ? 'bg-blue-50/40 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{item.name}</div>
                      <div className="text-[10px] text-slate-400">{item.location} • {item.rule}</div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold">
                      <span className={isViolation ? 'text-red-600 dark:text-red-400' : isWarning ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}>
                        {item.detectedMm} mm
                      </span>
                      <span className="text-[10px] text-slate-400 ml-1.5 font-normal">({item.detectedPt} pt)</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                      {item.requiredMm} mm
                      <span className="text-[10px] text-slate-400 ml-1.5">({item.requiredPt} pt)</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isValid ? 'bg-emerald-500' : isWarning ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(100, item.ratio)}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          {item.ratio}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        isValid
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                          : isWarning
                          ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                          : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800'
                      }`}>
                        {isValid ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : isWarning ? (
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-600" />
                        )}
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveItem(item);
                        }}
                        className="text-gov-blue dark:text-blue-400 hover:underline font-semibold text-xs inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Token Detail Inspector */}
      {activeItem && (
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-xs space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Ruler className="w-4 h-4 text-gov-blue dark:text-blue-400" />
              Token Inspection: {activeItem.name}
            </h4>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              activeItem.status === 'Valid' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
            }`}>
              {activeItem.status}
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-xs">
            Detected font height: <strong>{activeItem.detectedMm} mm ({activeItem.detectedPt} pt)</strong>. Required minimum under Rule 7 for {fontReport.pdpAreaCm2} cm² package: <strong>{activeItem.requiredMm} mm ({activeItem.requiredPt} pt)</strong>.
            {activeItem.status === 'Non-Compliant' && (
              <span className="text-red-600 dark:text-red-400 font-bold block mt-1">
                Rectification Advisory: Increase font size by at least {((activeItem.requiredMm - activeItem.detectedMm) * 2.834).toFixed(1)} pt to meet statutory legibility requirements.
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
