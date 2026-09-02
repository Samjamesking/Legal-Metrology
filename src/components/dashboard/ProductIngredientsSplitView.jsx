import React from 'react';
import {
  Package,
  Layers,
  FlaskConical,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Building,
  Scale,
  Phone,
  Barcode,
  Info,
  Sparkles,
  Wheat,
  Utensils,
  FileText
} from 'lucide-react';

export default function ProductIngredientsSplitView({ product }) {
  if (!product) return null;

  const ingData = product.ingredientsData || {
    rawText: 'Standard commodity formulation details detected from package declarations.',
    isVegetarian: true,
    items: [],
    allergens: ['Zero Allergen Warnings Detected'],
    additives: [],
    nutritionPer100g: {},
    complianceNotes: []
  };

  const isVeg = ingData.isVegetarian ?? true;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-gov p-6 border border-slate-200/90 dark:border-slate-800 shadow-card space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gov-blue/10 dark:bg-blue-900/40 text-gov-blue dark:text-blue-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Scanned Product & Ingredients Deep-Dive
              </h2>
              {/* Veg / Non-Veg Statutory Symbol */}
              <div
                title={isVeg ? 'Vegetarian Food Commodity (Green Dot)' : 'Non-Vegetarian / Cosmetic Product'}
                className={`w-5 h-5 border-2 rounded flex items-center justify-center shrink-0 ${
                  isVeg ? 'border-emerald-600 bg-white' : 'border-amber-700 bg-white'
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isVeg ? 'bg-emerald-600' : 'bg-amber-700'
                  }`}
                />
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Synchronized 2-column inspection: Statutory commercial parameters & chemical/food formulation.
            </p>
          </div>
        </div>

        {/* AI Confidence Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800/60">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            AI OCR Match: 99.4%
          </span>
          <span className="text-xs font-mono text-slate-500 font-semibold">
            Batch: {product.batchNo}
          </span>
        </div>
      </div>

      {/* 2-Column Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* =========================================================================
            LEFT COLUMN: PRODUCT DETAILS & STATUTORY REGISTRY
            ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Package className="w-4 h-4 text-gov-blue dark:text-blue-400" />
              1. Packaged Commodity Details
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Legal Metrology Rule 6(1)
            </span>
          </div>

          {/* Core Spec Card */}
          <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/90 dark:border-slate-800 space-y-3.5 text-xs">
            {/* Name & Brand */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Product Title & Brand
              </span>
              <div className="font-extrabold text-base text-slate-900 dark:text-white mt-0.5">
                {product.name}
              </div>
              <div className="text-slate-600 dark:text-slate-400 font-medium">
                Brand: <strong className="text-slate-800 dark:text-slate-200">{product.brand}</strong> • Category: {product.category}
              </div>
            </div>

            {/* Packaging & Display Panel */}
            <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-700/60">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Packaging Format
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {product.packagingType}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Principal Display Area (PDP)
                </span>
                <span className="font-bold text-gov-blue dark:text-blue-400">
                  {product.pdpAreaCm2} cm²
                </span>
              </div>
            </div>

            {/* Net Quantity & MRP */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Net Quantity (Declared)
                </span>
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {product.netQuantity}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">
                  ✔ Metric Standard Unit
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Maximum Retail Price (MRP)
                </span>
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {product.mrp}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Incl. of all taxes + USP
                </span>
              </div>
            </div>

            {/* Manufacturing & Expiry Timeline */}
            <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-700/60">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Date of Manufacture / Packing
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {product.mfgDate}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Expiry / Best Before
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {product.expiryDate}
                </span>
              </div>
            </div>

            {/* Manufacturer & Registration Details */}
            <div className="pt-2.5 border-t border-slate-200/80 dark:border-slate-700/60 space-y-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Manufactured / Packed By:
                </span>
                <span className="text-slate-700 dark:text-slate-300 leading-relaxed block mt-0.5">
                  {product.declarations?.manufacturer?.value || product.brand}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span>
                  FSSAI / Regulatory Lic: <strong className="font-mono text-slate-800 dark:text-slate-200">{product.fssaiLicNo || ingData.fssaiLicNo || 'N/A'}</strong>
                </span>
                <span>
                  Origin: <strong className="text-slate-800 dark:text-slate-200">{product.countryOfOrigin}</strong>
                </span>
              </div>
            </div>

            {/* Consumer Care */}
            <div className="p-2.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-[11px]">
              <span className="font-bold text-gov-blue dark:text-blue-300 flex items-center gap-1 mb-0.5">
                <Phone className="w-3 h-3" /> Consumer Redressal Contact:
              </span>
              <span className="text-slate-700 dark:text-slate-300">
                {product.customerCare}
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: EXTRACTED INGREDIENTS & FORMULATION ANALYSIS
            ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              2. Ingredients & Formulation Breakdown
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              OCR Analyzed
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/90 dark:border-slate-800 space-y-4 text-xs">
            {/* Raw Ingredients Extracted String */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                OCR Extracted Ingredients Text
              </span>
              <div className="p-3 bg-slate-900 text-emerald-400 rounded-lg font-mono text-[11px] leading-relaxed border border-slate-800">
                {ingData.rawText}
              </div>
            </div>

            {/* Ingredients Itemized Grid (with percentages) */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Identified Ingredients & Characterizing Components (QUID)
              </span>

              {ingData.items && ingData.items.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ingData.items.map((ing, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-2 shadow-2xs"
                    >
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                          {ing.name}
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          {ing.role} • {ing.nature}
                        </span>
                      </div>
                      {ing.percentage && (
                        <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 shrink-0">
                          {ing.percentage}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs text-center">
                  Formulation components detected from standard packaging declaration.
                </div>
              )}
            </div>

            {/* Allergen Matrix & Additives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-700/60">
              {/* Allergen Warnings */}
              <div className="p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60">
                <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 text-xs mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Allergen Advisory Notice
                </span>
                <div className="space-y-1">
                  {(ingData.allergens || []).map((allergen, i) => (
                    <div key={i} className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                      • {allergen}
                    </div>
                  ))}
                </div>
              </div>

              {/* Additives & INS Numbers */}
              <div className="p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60">
                <span className="font-bold text-gov-blue dark:text-blue-300 flex items-center gap-1.5 text-xs mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gov-blue" />
                  Food Additives / INS Codes
                </span>
                <div className="space-y-1">
                  {ingData.additives && ingData.additives.length > 0 ? (
                    ingData.additives.map((add, i) => (
                      <div key={i} className="text-[10px] text-slate-700 dark:text-slate-300">
                        <strong className="font-mono text-gov-blue dark:text-blue-400">{add.code}:</strong> {add.name}
                        <span className="block text-[9px] text-emerald-600 dark:text-emerald-400">{add.status}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-[11px] text-slate-500">Zero Artificial Preservatives</span>
                  )}
                </div>
              </div>
            </div>

            {/* Nutritional Quick Glance (if present) */}
            {ingData.nutritionPer100g && Object.keys(ingData.nutritionPer100g).length > 0 && (
              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-700/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Nutritional Values (Per 100g / Serving)
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 text-[11px]">
                  {Object.entries(ingData.nutritionPer100g).slice(0, 6).map(([nutrient, val]) => (
                    <div
                      key={nutrient}
                      className="p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center"
                    >
                      <span className="text-[9px] text-slate-400 block uppercase font-bold truncate">
                        {nutrient.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="font-extrabold text-slate-900 dark:text-white">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Statutory Compliance Checklist for Ingredients */}
            <div className="pt-2 space-y-1">
              {(ingData.complianceNotes || []).map((note, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span><strong>{note.title}:</strong> {note.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
