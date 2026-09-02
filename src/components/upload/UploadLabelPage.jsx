import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  Scan,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../../data/sampleProducts';

export default function UploadLabelPage({ onAnalyzeProduct }) {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [sideImage, setSideImage] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(SAMPLE_PRODUCTS[0]);
  const [commodityType, setCommodityType] = useState('Standard Retail Package');

  const handleSimulateBulkUpload = () => {
    onAnalyzeProduct(selectedPreset);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-gov-blue dark:text-blue-300 text-xs font-bold mb-2">
          <UploadCloud className="w-3.5 h-3.5" /> Multi-Angle Label Scanner
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          Upload Packaging Labels & Panels
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Upload all packaging panels (Front PDP, Back Declaration, Side Barcode) for comprehensive 360° compliance audit.
        </p>
      </div>

      {/* 3-Panel Upload Zone */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Panel 1: Front Principal Display Panel (PDP) */}
        <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-xs text-slate-900 dark:text-white">Panel 1: Front (PDP)</span>
              <span className="text-[10px] uppercase font-bold text-gov-blue">Mandatory</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Principal Display Panel showing Generic Name, Brand, and Net Quantity.
            </p>

            <div className="mt-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:border-gov-blue transition-colors cursor-pointer bg-slate-50/50 dark:bg-slate-800/40">
              <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {frontImage ? 'Front Label Uploaded' : 'Drag or click to upload PDP'}
              </div>
              <span className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 25MB</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFrontImage('sample-front')}
            className="w-full py-2 rounded-gov text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
          >
            {frontImage ? '✔ Panel Attached' : 'Select Front Panel File'}
          </button>
        </div>

        {/* Panel 2: Back Declaration Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-xs text-slate-900 dark:text-white">Panel 2: Back Declaration</span>
              <span className="text-[10px] uppercase font-bold text-gov-blue">Mandatory</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Back panel containing MRP, Manufacturer details, Expiry, Batch, and Consumer Care.
            </p>

            <div className="mt-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:border-gov-blue transition-colors cursor-pointer bg-slate-50/50 dark:bg-slate-800/40">
              <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {backImage ? 'Back Label Uploaded' : 'Drag or click to upload Back'}
              </div>
              <span className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 25MB</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setBackImage('sample-back')}
            className="w-full py-2 rounded-gov text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
          >
            {backImage ? '✔ Panel Attached' : 'Select Back Panel File'}
          </button>
        </div>

        {/* Panel 3: Side Barcode & Country of Origin */}
        <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-xs text-slate-900 dark:text-white">Panel 3: Side / Bottom</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Optional</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              EAN/UPC Barcode, QR registration code, and Country of Origin overprint.
            </p>

            <div className="mt-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:border-gov-blue transition-colors cursor-pointer bg-slate-50/50 dark:bg-slate-800/40">
              <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {sideImage ? 'Side Panel Attached' : 'Attach Side / Barcode Panel'}
              </div>
              <span className="text-[10px] text-slate-400">Optional supplementary panel</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSideImage('sample-side')}
            className="w-full py-2 rounded-gov text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
          >
            {sideImage ? '✔ Panel Attached' : 'Select Side Panel'}
          </button>
        </div>
      </div>

      {/* Bulk Batch Configuration & Preset Evaluator */}
      <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Execute Automated Multi-Panel Legal Metrology Audit
            </h3>
            <p className="text-xs text-slate-500">
              AI model will concatenate text tokens, cross-validate Rule 6 declarations, and measure font heights.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedPreset.id}
              onChange={(e) => {
                const found = SAMPLE_PRODUCTS.find(p => p.id === e.target.value);
                if (found) setSelectedPreset(found);
              }}
              className="p-2 rounded-gov bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
            >
              {SAMPLE_PRODUCTS.map(p => (
                <option key={p.id} value={p.id}>Map to: {p.name}</option>
              ))}
            </select>

            <button
              onClick={handleSimulateBulkUpload}
              className="px-5 py-2.5 rounded-gov text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 flex items-center gap-2"
            >
              <Scan className="w-4 h-4" />
              Begin Multi-Panel Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
