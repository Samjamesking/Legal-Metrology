import React from 'react';
import { Scale, ShieldCheck, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12 py-6 px-6 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-gov-blue dark:text-blue-400" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Legal Metrology Compliance System © 2026
          </span>
          <span className="hidden md:inline text-slate-400">•</span>
          <span className="hidden md:inline">
            Legal Metrology (Packaged Commodities) Rules, 2011 Verification Engine
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 font-medium">
            <Cpu className="w-3.5 h-3.5 text-emerald-500" />
            Powered by AI OCR + Computer Vision + NLP
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 dark:bg-slate-800 text-gov-blue dark:text-blue-400 font-bold">
            <ShieldCheck className="w-3 h-3" /> Govt. Standards Compliant
          </span>
        </div>
      </div>
    </footer>
  );
}
