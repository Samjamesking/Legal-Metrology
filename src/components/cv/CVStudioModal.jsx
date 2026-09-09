import React, { useState } from 'react';
import { X, Ruler, LayoutGrid, ShieldAlert, Sparkles } from 'lucide-react';
import FontSizeValidationView from './FontSizeValidationView';
import LabelPlacementView from './LabelPlacementView';
import CounterfeitDetectionView from './CounterfeitDetectionView';

export default function CVStudioModal({ product, isOpen, onClose, initialTab = 'fontSize' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-gov-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gov-blue text-white flex items-center justify-center font-bold text-sm shadow-md shadow-gov-blue/20">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Computer Vision Inspection Suite
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Inspecting: <strong>{product.name}</strong> ({product.brand})
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

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('fontSize')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'fontSize'
                ? 'border-gov-blue text-gov-blue dark:text-blue-400 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Ruler className="w-4 h-4" />
            Rule 7 Font Size Validation
          </button>

          <button
            onClick={() => setActiveTab('placement')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'placement'
                ? 'border-gov-blue text-gov-blue dark:text-blue-400 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Label Placement Verification
          </button>

          <button
            onClick={() => setActiveTab('tampering')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'tampering'
                ? 'border-gov-blue text-gov-blue dark:text-blue-400 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-red-500" />
            Counterfeit & Tampering Detection
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'fontSize' && <FontSizeValidationView product={product} />}
          {activeTab === 'placement' && <LabelPlacementView product={product} />}
          {activeTab === 'tampering' && <CounterfeitDetectionView product={product} />}
        </div>
      </div>
    </div>
  );
}
