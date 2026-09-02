import React from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Scan,
  Download,
  Scale,
  Calendar,
  Layers
} from 'lucide-react';
import PackagingPreview from '../common/PackagingPreview';
import ProductIngredientsSplitView from '../dashboard/ProductIngredientsSplitView';
import { MANDATORY_DECLARATIONS } from '../../data/legalMetrologyRules';

export default function ProductDetailsModal({ product, onClose, onGenerateReport }) {
  if (!product) return null;

  const isLow = product.riskLevel === 'Low Risk';
  const isMed = product.riskLevel === 'Medium Risk';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-gov-xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gov-blue/10 dark:bg-blue-900/40 text-gov-blue dark:text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {product.name}
                </h2>
                {/* AI Risk Assessment Badge */}
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    isLow
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : isMed
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                  }`}
                >
                  {product.riskLevel || 'AI Risk Assessment'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {product.brand} • Batch: {product.batchNo} • Scanned {product.lastScanDate}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Section: Large Preview + OCR Extracted Text Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Large Image Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-gov-blue" />
                Product Label Preview & Bounding Boxes
              </span>
              <div className="h-72 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                <PackagingPreview product={product} showBoundingBoxes={true} />
              </div>
            </div>

            {/* OCR Extracted Text (Scrollable container) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-gov-blue" />
                OCR Raw Extracted Text (Computer Vision Stream)
              </span>
              <div className="h-72 p-3.5 bg-slate-900 rounded-xl border border-slate-800 overflow-y-auto font-mono text-[11px] text-emerald-400 leading-relaxed whitespace-pre-wrap select-text">
                {product.ocrRawText}
              </div>
            </div>
          </div>

          {/* Synchronized Dual-Panel: Product Details (One Side) & Ingredients (Other Side) */}
          <ProductIngredientsSplitView product={product} />

          {/* Compliance Checklist: All Legal Metrology Declarations */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-gov-blue dark:text-blue-400" />
                Compliance Checklist (Rules, 2011 Rule 6(1))
              </h3>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Overall Score: {product.complianceScore}%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {MANDATORY_DECLARATIONS.map((decl) => {
                const item = product.declarations?.[decl.id] || { status: 'missing', value: 'Not Detected', note: 'Missing declaration' };
                const isValid = item.status === 'valid';
                const isWarning = item.status === 'warning';

                return (
                  <div
                    key={decl.id}
                    className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                      isValid
                        ? 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30'
                        : isWarning
                        ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20'
                        : 'border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isValid ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isWarning ? (
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white truncate">
                          {decl.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                        {decl.rule}
                      </span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-1 font-medium line-clamp-2">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer with Action Buttons */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Digital Certificate Hash: <code className="font-mono text-[10px]">SHA256:8f2e-metrology-901c</code>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-gov text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onGenerateReport(product);
              }}
              className="px-4 py-2 rounded-gov text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              Download Official PDF Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
