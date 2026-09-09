import React, { useState } from 'react';
import {
  Languages,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Info,
  Scale,
  RefreshCw
} from 'lucide-react';
import { analyzeMultiLanguageCompliance } from '../../services/multiLangEngine';

export default function MultiLangAnalysisView({ product }) {
  const [activeLangCode, setActiveLangCode] = useState('hi');

  if (!product) return null;

  const multiLangReport = analyzeMultiLanguageCompliance(product.ocrRawText, product);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-gov bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-gov-blue dark:text-blue-300 text-xs font-bold mb-2">
            <Languages className="w-3.5 h-3.5" /> Multi-Language Compliance Engine
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Official Indian Languages Adherence
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Automated verification of mandatory packaging declarations across English, Hindi, Bengali, Tamil, Telugu, and Marathi under Rule 9.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center min-w-[130px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Multi-Lang Score</span>
            <span className="text-2xl font-black text-emerald-500">
              {multiLangReport.multiLangComplianceScore}%
            </span>
            <span className="text-[10px] text-slate-500 block font-semibold">
              {multiLangReport.isBilingual ? 'Bilingual Verified' : 'English Primary'}
            </span>
          </div>
        </div>
      </div>

      {/* Detected Languages Strip */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center justify-between">
          <span>Detected Scripts & Linguistic Confidence</span>
          <span className="text-xs text-slate-400">Rule 9 Dual-Language Standard</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {multiLangReport.activeLanguages.map((lang) => (
            <div
              key={lang.code}
              className={`p-3 rounded-xl border transition-all ${
                lang.code === multiLangReport.primaryLanguage.code
                  ? 'bg-blue-50/80 dark:bg-blue-900/30 border-gov-blue'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  {lang.native}
                </span>
                <span className="text-[10px] font-mono text-gov-blue dark:text-blue-400 font-bold">
                  {lang.confidence}%
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">{lang.name} • {lang.script}</span>

              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-gov-blue rounded-full"
                  style={{ width: `${lang.confidence}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Declarations Cross-Check Table */}
      <div className="bg-white dark:bg-slate-900 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Mandatory Declarations Linguistic Parity Check
          </h3>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            Translation Consistency: {multiLangReport.translationConsistency}%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Mandated Declaration</th>
                <th className="py-3 px-4">Rule Reference</th>
                <th className="py-3 px-4">Primary English Declaration</th>
                <th className="py-3 px-4">Regional / Hindi Translation</th>
                <th className="py-3 px-4">Statutory Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {multiLangReport.declarationsCheck.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {item.field}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {item.rule}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Present & Legible
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {item.regionalPresent ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Conforming Script
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-amber-600 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5" /> Optional / English Fallback
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-gov-blue dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statutory Rule 9 Advisory */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
        <Scale className="w-4 h-4 text-gov-blue dark:text-blue-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">Rule 9 Statutory Guidelines:</span>
          <p className="mt-0.5 leading-relaxed">
            {multiLangReport.statutoryNote} Products intended for retail sale in states requiring regional declarations (e.g. Tamil Nadu, West Bengal, Maharashtra) should display generic names and MRP in the local official language alongside English to prevent consumer deception.
          </p>
        </div>
      </div>
    </div>
  );
}
