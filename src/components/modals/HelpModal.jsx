import React from 'react';
import { HelpCircle, X, Scale, BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MANDATORY_DECLARATIONS, FONT_SIZE_STANDARDS, LEGAL_PENALTIES } from '../../data/legalMetrologyRules';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-gov-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gov-blue dark:text-blue-400" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Legal Metrology (Packaged Commodities) Rules, 2011 Reference Guide
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300">
          {/* Overview */}
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
            <h4 className="font-bold text-gov-blue dark:text-blue-300 text-sm mb-1 flex items-center gap-1.5">
              <Scale className="w-4 h-4" /> About the Legal Framework
            </h4>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              The Legal Metrology (Packaged Commodities) Rules, 2011 are framed under the Legal Metrology Act, 2009 by the Department of Consumer Affairs, Government of India. It safeguards consumers by ensuring uniform, accurate, and mandatory disclosures on all pre-packaged commodities sold in India.
            </p>
          </div>

          {/* 9 Mandatory Declarations Table */}
          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-2">
              Rule 6(1): Mandatory Packaging Declarations
            </h4>
            <div className="divide-y divide-slate-200 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              {MANDATORY_DECLARATIONS.map((d) => (
                <div key={d.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>{d.name}</span>
                    <span className="font-mono text-[10px] text-gov-blue dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">
                      {d.rule}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">{d.description}</p>
                  <div className="text-[11px] text-slate-500 italic mt-0.5">Example: {d.example}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rule 7 Font Size Table */}
          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-2">
              Rule 7: Minimum Font Size Standards (Table-I)
            </h4>
            <table className="w-full text-left border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 dark:bg-slate-800 text-[10px] uppercase font-bold text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="p-2.5">Area of Display Panel (PDP)</th>
                  <th className="p-2.5">Minimum Height of Numerals</th>
                  <th className="p-2.5">Minimum Height of Letters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-[11px]">
                <tr>
                  <td className="p-2.5">Up to 50 cm²</td>
                  <td className="p-2.5 font-bold text-gov-blue">1.5 mm</td>
                  <td className="p-2.5">1.0 mm</td>
                </tr>
                <tr>
                  <td className="p-2.5">&gt; 50 cm² to 100 cm²</td>
                  <td className="p-2.5 font-bold text-gov-blue">2.0 mm</td>
                  <td className="p-2.5">1.5 mm</td>
                </tr>
                <tr>
                  <td className="p-2.5">&gt; 100 cm² to 500 cm²</td>
                  <td className="p-2.5 font-bold text-gov-blue">3.0 mm</td>
                  <td className="p-2.5">2.0 mm</td>
                </tr>
                <tr>
                  <td className="p-2.5">&gt; 500 cm² to 2500 cm²</td>
                  <td className="p-2.5 font-bold text-gov-blue">4.0 mm</td>
                  <td className="p-2.5">4.0 mm</td>
                </tr>
                <tr>
                  <td className="p-2.5">Above 2500 cm²</td>
                  <td className="p-2.5 font-bold text-gov-blue">6.0 mm</td>
                  <td className="p-2.5">6.0 mm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
