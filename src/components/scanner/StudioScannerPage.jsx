import React, { useState } from 'react';
import {
  Scan,
  Sparkles,
  Layers,
  Ruler,
  FileSearch,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Sliders,
  Languages,
  RotateCcw,
  Volume2
} from 'lucide-react';
import PackagingPreview from '../common/PackagingPreview';
import ProductIngredientsSplitView from '../dashboard/ProductIngredientsSplitView';
import { SAMPLE_PRODUCTS } from '../../data/sampleProducts';
import { FONT_SIZE_STANDARDS, MULTI_LANG_STRINGS } from '../../data/legalMetrologyRules';
import ComplianceCopilotPanel from '../copilot/ComplianceCopilotPanel';
import CVStudioModal from '../cv/CVStudioModal';
import RiskPredictionWidget from '../risk/RiskPredictionWidget';
import MultiLangAnalysisView from '../multilang/MultiLangAnalysisView';

export default function StudioScannerPage({
  selectedProduct,
  onSelectProduct,
  onAnalyze,
  isAnalyzing,
  onToggleVoice,
  language
}) {
  const [activeBoxIndex, setActiveBoxIndex] = useState(null);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [pdpArea, setPdpArea] = useState(selectedProduct?.pdpAreaCm2 || 250);
  const [showCopilot, setShowCopilot] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);

  // Find standard for current PDP area
  const fontStandard = FONT_SIZE_STANDARDS.find(s => pdpArea <= s.maxPdpAreaCm2) || FONT_SIZE_STANDARDS[0];

  const product = selectedProduct || SAMPLE_PRODUCTS[0];

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-gov-blue dark:text-blue-300 text-xs font-bold mb-2">
            <Scan className="w-3.5 h-3.5" /> AI Computer Vision Studio
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Packaged Commodity Label Inspection Studio
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Examine bounding boxes, verify Rule 7 font heights, and review OCR token recognition.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowCopilot(true)}
            className="px-3 py-2 rounded-gov text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1.5 shadow-xs hover:bg-purple-100"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            AI Copilot
          </button>
          <button
            onClick={() => setShowCVModal(true)}
            className="px-3 py-2 rounded-gov text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-gov-blue dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5 shadow-xs hover:bg-blue-100"
          >
            <Layers className="w-4 h-4 text-gov-blue" />
            CV Inspector
          </button>
          <button
            onClick={onToggleVoice}
            className="px-3 py-2 rounded-gov text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 shadow-xs hover:bg-emerald-100"
          >
            <Volume2 className="w-4 h-4 text-emerald-600" />
            Voice Readout
          </button>
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="px-4 py-2 rounded-gov text-xs font-bold bg-gov-blue text-white shadow-md shadow-gov-blue/25 hover:bg-gov-blueLight flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Re-scan Label AI
          </button>
        </div>
      </div>

      {/* Main Studio 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Interactive Label Canvas & Overlay Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-gov-blue dark:text-blue-400" />
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  Computer Vision Canvas
                </span>
              </div>

              {/* Toggle Bounding Boxes */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    showBoundingBoxes
                      ? 'bg-gov-blue text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  {showBoundingBoxes ? 'Hide Bounding Boxes' : 'Show Bounding Boxes'}
                </button>
              </div>
            </div>

            {/* Label Rendering Area */}
            <div className="relative min-h-[420px] bg-slate-50 dark:bg-slate-950/60 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-2">
              <PackagingPreview
                product={product}
                showBoundingBoxes={showBoundingBoxes}
                activeBox={activeBoxIndex}
                onSelectBox={(idx) => setActiveBoxIndex(idx)}
              />
            </div>

            {/* Bounding Box Tokens Strip */}
            {product.boundingBoxes && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Detected Declaration Coordinates (Click to inspect)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.boundingBoxes.map((box, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveBoxIndex(idx === activeBoxIndex ? null : idx)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border transition-all ${
                        activeBoxIndex === idx
                          ? 'bg-gov-blue text-white border-gov-blue shadow-sm'
                          : box.valid
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80'
                          : box.isWarning
                          ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/80'
                          : 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/80'
                      }`}
                    >
                      {box.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Principal Display Panel (PDP) & Font Size Rule 7 Calculator */}
          <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-gov-blue dark:text-blue-400" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Rule 7 Minimum Font Size Calculator
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500">Legal Metrology Table-I</span>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Adjust PDP Area (cm²):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="20"
                    max="1000"
                    step="10"
                    value={pdpArea}
                    onChange={(e) => setPdpArea(Number(e.target.value))}
                    className="w-full accent-gov-blue"
                  />
                  <span className="text-xs font-bold text-slate-900 dark:text-white w-14 text-right">
                    {pdpArea} cm²
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Mandatory Numeral Height
                </span>
                <span className="text-lg font-extrabold text-gov-blue dark:text-blue-400">
                  {fontStandard.minNumeralMm} mm
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Mandatory Letter Height
                </span>
                <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                  {fontStandard.minHeightMm} mm
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Extracted OCR Raw Stream & Compliance Checklist */}
        <div className="lg:col-span-5 space-y-4">
          {/* OCR Raw Text Stream */}
          <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-gov-blue dark:text-blue-400" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  OCR Extracted Text Stream
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                Tesseract / Vision AI
              </span>
            </div>

            <div className="mt-3">
              <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl font-mono text-[11px] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap select-text border border-slate-800">
                {product.ocrRawText}
              </pre>
            </div>
          </div>

          {/* Rule Breakdown Checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Statutory Declarations Status
              </h3>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                product.complianceScore >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.complianceScore}% Score
              </span>
            </div>

            <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1 text-xs">
              {Object.entries(product.declarations || {}).map(([key, item]) => {
                const isValid = item.status === 'valid';
                const isWarning = item.status === 'warning';

                return (
                  <div
                    key={key}
                    className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                      isValid
                        ? 'border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40'
                        : isWarning
                        ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20'
                        : 'border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20'
                    }`}
                  >
                    {isValid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    )}

                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 dark:text-slate-200 capitalize">
                        {key.replace('_', ' ')}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                        {item.value}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {item.note}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Synchronized Dual-Panel: Product Details (One Side) & Ingredients (Other Side) */}
      <ProductIngredientsSplitView product={product} />

      {/* AI Risk Prediction & Multi-Language Compliance Intelligence Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6">
          <RiskPredictionWidget product={product} />
        </div>
        <div className="lg:col-span-6">
          <MultiLangAnalysisView product={product} />
        </div>
      </div>

      {/* AI Compliance Copilot Modal */}
      <ComplianceCopilotPanel
        product={product}
        isOpen={showCopilot}
        onClose={() => setShowCopilot(false)}
      />

      {/* Computer Vision Studio Suite Modal */}
      <CVStudioModal
        product={product}
        isOpen={showCVModal}
        onClose={() => setShowCVModal(false)}
      />
    </div>
  );
}
