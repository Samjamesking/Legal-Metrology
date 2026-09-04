import React, { useState, useRef } from 'react';
import {
  Upload,
  Camera,
  ScanLine,
  Sparkles,
  RefreshCw,
  Image as ImageIcon,
  Check,
  Zap,
  Info,
  MessageSquareWarning
} from 'lucide-react';
import PackagingPreview from '../common/PackagingPreview';
import { SAMPLE_PRODUCTS } from '../../data/sampleProducts';

export default function ScannerSection({
  selectedProduct,
  onSelectProduct,
  onAnalyze,
  isAnalyzing,
  onOpenCameraModal,
  onOpenGrievance
}) {
  const [dragActive, setDragActive] = useState(false);
  const [customImage, setCustomImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setCustomImage(uploadEvent.target.result);
      // If user uploaded custom image, select sample 3 or create temporary custom wrapper
      onSelectProduct({
        ...selectedProduct,
        id: 'uploaded-custom',
        name: file.name.replace(/\.[^/.]+$/, ''),
        brand: 'Uploaded Commodity',
        category: 'Custom Package Scan',
        pdpAreaCm2: 220
      }, uploadEvent.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gov-blue/10 dark:bg-blue-900/40 text-gov-blue dark:text-blue-400 flex items-center justify-center">
              <ScanLine className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                AI Product Scanner
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Rule 6(1) Computer Vision & OCR
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Zap className="w-3 h-3" /> Live Engine
          </span>
        </div>

        {/* Action Buttons: Upload & Camera */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-gov text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-gov-blue dark:text-blue-400" />
            Upload Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={onOpenCameraModal}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-gov text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <Camera className="w-3.5 h-3.5 text-gov-blue dark:text-blue-400" />
            Camera Scan
          </button>
        </div>

        {/* Large Image Preview Area / Drag & Drop Container */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`mt-4 relative rounded-xl border-2 transition-all min-h-[300px] flex items-center justify-center overflow-hidden ${
            dragActive
              ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-4 ring-emerald-500/20'
              : 'border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40'
          }`}
        >
          {/* Packaging Preview or Uploaded Image */}
          <PackagingPreview
            product={selectedProduct}
            customImageUrl={customImage}
            showBoundingBoxes={!isAnalyzing}
          />

          {/* Scanning Animation Laser Beam */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center z-20">
              <div className="absolute top-0 left-0 w-full h-1 scanner-beam animate-laser"></div>
              <div className="bg-white/90 dark:bg-slate-900/90 rounded-xl px-5 py-3 shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-2">
                <RefreshCw className="w-7 h-7 text-emerald-500 animate-spin" />
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Analyzing Label Declarations...
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Running OCR & Legal Metrology Rules Check
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Sample Selector for 1-Click Evaluation */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Test Sample Commodities:
            </span>
            <span className="text-[10px] text-gov-blue dark:text-blue-400 font-bold">1-Click Scan</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {SAMPLE_PRODUCTS.slice(0, 4).map((p) => {
              const isSelected = selectedProduct?.id === p.id && !customImage;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setCustomImage(null);
                    onSelectProduct(p);
                  }}
                  className={`p-1.5 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'border-gov-blue bg-blue-50/70 dark:bg-blue-900/40 text-gov-blue dark:text-blue-300 ring-2 ring-gov-blue/20'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="text-[10px] font-bold truncate">{p.name.split(' ')[0]}</div>
                  <div className="text-[9px] text-slate-500 truncate">{p.netQuantity}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Green Scan Button: "Analyze Label" */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          disabled={isAnalyzing}
          onClick={onAnalyze}
          className="w-full py-3 px-4 rounded-gov text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-emerald-600/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Scanning Legal Declarations...
            </>
          ) : (
            <>
              <ScanLine className="w-4 h-4 transition-transform group-hover:scale-110" />
              Analyze Label
            </>
          )}
        </button>

        {/* Quick Damaged/Expired Product Grievance Portal Link */}
        {onOpenGrievance && (
          <button
            type="button"
            onClick={onOpenGrievance}
            className="w-full mt-2.5 py-2 px-3 rounded-gov text-xs font-semibold text-amber-900 dark:text-amber-200 bg-amber-50/90 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800/80 flex items-center justify-between transition-colors shadow-xs group"
          >
            <span className="flex items-center gap-1.5 font-bold">
              <MessageSquareWarning className="w-3.5 h-3.5 text-amber-600 transition-transform group-hover:scale-110" />
              Damaged / Expired Product?
            </span>
            <span className="text-[10px] font-bold text-gov-blue dark:text-blue-300 underline flex items-center gap-0.5">
              Dispute Bot & 15-Day Token &rarr;
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
