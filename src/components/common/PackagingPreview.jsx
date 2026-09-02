import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';

export default function PackagingPreview({ product, showBoundingBoxes = false, activeBox = null, onSelectBox = null, customImageUrl = null }) {
  if (customImageUrl) {
    return (
      <div className="relative w-full h-full min-h-[320px] max-h-[460px] bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center p-4">
        <img
          src={customImageUrl}
          alt="Uploaded Commodity Label"
          className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
        />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="relative w-full h-full min-h-[360px] rounded-xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700 select-none transition-all">
      {/* Packaging Graphic Canvas */}
      <div
        className="w-full h-full p-5 flex flex-col justify-between"
        style={{
          background: product.colorTheme
            ? `linear-gradient(135deg, ${product.colorTheme}15 0%, #FFFFFF 40%, ${product.colorTheme}10 100%)`
            : '#FFFFFF'
        }}
      >
        {/* Top Header of Package */}
        <div className="flex items-start justify-between border-b pb-3 border-slate-200 dark:border-slate-700">
          <div>
            <div className="text-[10px] tracking-widest font-bold text-gov-blue uppercase">
              {product.brand}
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-900 leading-tight">
              {product.name}
            </h3>
            <div className="text-[11px] text-slate-600 font-medium">
              {product.category} • {product.packagingType}
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-white shadow-sm border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-gov-blue" />
              PDP: {product.pdpAreaCm2} cm²
            </span>
          </div>
        </div>

        {/* Declarations Grid on Package */}
        <div className="my-3 space-y-2 text-xs text-slate-800">
          {/* Net Qty & MRP Row */}
          <div className="grid grid-cols-2 gap-2 bg-white/90 p-2.5 rounded-lg border border-slate-200/90 shadow-sm">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Net Quantity</span>
              <span className="font-bold text-slate-900 text-sm">{product.netQuantity}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Maximum Retail Price</span>
              <span className="font-bold text-slate-900 text-sm">{product.mrp}</span>
            </div>
          </div>

          {/* Dates and Batch */}
          <div className="grid grid-cols-3 gap-2 bg-white/80 p-2 rounded-lg border border-slate-200/80 text-[11px]">
            <div>
              <span className="text-[9px] uppercase text-slate-500 block font-semibold">Mfg / Pkd</span>
              <span className="font-semibold text-slate-900">{product.mfgDate}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase text-slate-500 block font-semibold">Expiry Date</span>
              <span className="font-semibold text-slate-900">{product.expiryDate}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase text-slate-500 block font-semibold">Batch No.</span>
              <span className="font-semibold font-mono text-slate-900">{product.batchNo}</span>
            </div>
          </div>

          {/* Manufacturer & Care Panel */}
          <div className="bg-white/80 p-2 rounded-lg border border-slate-200/80 text-[10px] space-y-1">
            <div>
              <span className="font-bold text-slate-700">Mfd & Marketed by: </span>
              <span className="text-slate-600">{product.declarations?.manufacturer?.value || product.brand}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700">Consumer Care: </span>
              <span className="text-slate-600">{product.customerCare}</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-slate-200">
              <span className="font-bold text-slate-700">Origin: <span className="font-normal text-slate-600">{product.countryOfOrigin}</span></span>
              <span className="font-mono text-[9px] text-slate-500 tracking-wider">BARCODE: ||||| | |||| |||| ||</span>
            </div>
          </div>
        </div>

        {/* Bottom Compliance Badge */}
        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200">
          <span className="text-slate-500 font-medium">Digital OCR Label Model v2.4</span>
          <span className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full text-[10px] ${
            product.complianceScore >= 85
              ? 'bg-emerald-100 text-emerald-800'
              : product.complianceScore >= 50
              ? 'bg-amber-100 text-amber-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {product.complianceScore >= 85 ? (
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            ) : product.complianceScore >= 50 ? (
              <AlertTriangle className="w-3 h-3 text-amber-600" />
            ) : (
              <XCircle className="w-3 h-3 text-red-600" />
            )}
            {product.complianceScore}% Score
          </span>
        </div>
      </div>

      {/* Bounding Box Overlays (when enabled in Studio Scanner or detail modal) */}
      {showBoundingBoxes && product.boundingBoxes && (
        <div className="absolute inset-0 pointer-events-none">
          {product.boundingBoxes.map((box, idx) => {
            const isHovered = activeBox === idx;
            const borderCol = box.valid ? 'border-emerald-500 bg-emerald-500/10' : box.isWarning ? 'border-amber-500 bg-amber-500/15' : 'border-red-500 bg-red-500/20';
            const badgeCol = box.valid ? 'bg-emerald-600 text-white' : box.isWarning ? 'bg-amber-600 text-white' : 'bg-red-600 text-white';

            return (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectBox) onSelectBox(idx);
                }}
                className={`absolute border-2 rounded transition-all duration-200 pointer-events-auto cursor-pointer ${borderCol} ${
                  isHovered ? 'ring-2 ring-gov-blue scale-[1.01] shadow-lg' : ''
                }`}
                style={{
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.w}%`,
                  height: `${box.h}%`
                }}
              >
                <div className="relative -top-5 left-0">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap ${badgeCol}`}>
                    {box.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
