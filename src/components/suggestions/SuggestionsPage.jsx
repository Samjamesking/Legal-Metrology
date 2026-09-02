import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Palette,
  Ruler,
  Languages,
  ArrowRight,
  ShieldCheck,
  Download
} from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../../data/sampleProducts';

export default function SuggestionsPage({ onSelectProduct }) {
  const [selectedProduct, setSelectedProduct] = useState(SAMPLE_PRODUCTS[2]); // Glow & Bright (lots of suggestions)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-gov-blue dark:text-blue-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Packaging Advisor
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            AI Compliance Recommendations & Label Redesign
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Automated recommendations for manufacturers, printers, and packaging compliance teams.
          </p>
        </div>

        {/* Product Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500">Examine Product:</label>
          <select
            value={selectedProduct.id}
            onChange={(e) => {
              const found = SAMPLE_PRODUCTS.find(p => p.id === e.target.value);
              if (found) setSelectedProduct(found);
            }}
            className="px-3 py-2 rounded-gov text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          >
            {SAMPLE_PRODUCTS.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.complianceScore}%)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Overview Card for Selected Product */}
      <div className="p-5 rounded-gov bg-gradient-to-r from-gov-navy to-gov-blue text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">
            Current Analysis Target
          </span>
          <h2 className="text-xl font-extrabold mt-0.5">{selectedProduct.name}</h2>
          <p className="text-xs text-blue-100 mt-1">
            Brand: {selectedProduct.brand} • Category: {selectedProduct.category} • PDP: {selectedProduct.pdpAreaCm2} cm²
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-blue-200">Compliance Score</div>
            <div className="text-3xl font-black">{selectedProduct.complianceScore}%</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-amber-300" />
          </div>
        </div>
      </div>

      {/* Modern Recommendations Cards Grid */}
      <div>
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          Priority Recommendations for Compliance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(selectedProduct.recommendations || []).map((rec, index) => (
            <div
              key={index}
              className="p-5 rounded-gov bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gov-blue dark:text-blue-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Recommendation #{index + 1}
                  </span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                    rec.priority === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    {rec.priority || 'Standard'} Priority
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-2 leading-relaxed">
                  {rec.text}
                </p>

                <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">Implementation Guidance:</strong>
                  Ensure this declaration is printed in contrasting colors on the principal display panel (PDP) to meet Rule 9 legibility standards.
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Category: {rec.category || 'Statutory Requirement'}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  Ready to apply <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices Section */}
      <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <Palette className="w-4 h-4 text-gov-blue dark:text-blue-400" />
          Standard Legal Metrology Packaging Guidelines
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">✔ Color Contrast (Rule 9)</h4>
            <p>Ensure declarations are in a color which contrasts conspicuously with the background of the label or package.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">✔ Dual Language (Rule 9(3))</h4>
            <p>Declarations may be made in Hindi in Devanagari script or in English. Additional regional languages are encouraged.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">✔ Unit Sale Price (2022 Amendment)</h4>
            <p>For packages containing more than 1 kg or 1 liter, USP (e.g. ₹/kg or ₹/L) is legally mandatory alongside MRP.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
