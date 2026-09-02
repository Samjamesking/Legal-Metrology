import React, { useState } from 'react';
import {
  PackageSearch,
  Search,
  Filter,
  Eye,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../../data/sampleProducts';
import PackagingPreview from '../common/PackagingPreview';

export default function ProductRepositoryPage({ onSelectProduct, onOpenDetailsModal, onReScan }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'Staples & Flour', 'Edible Oil', 'Personal Care & Cosmetics', 'Biscuits & Bakery', 'Spices & Condiments', 'Imported Confectionery'];

  const filtered = SAMPLE_PRODUCTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchCat = selectedCategory === 'ALL' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-gov-blue dark:text-blue-300 text-xs font-bold mb-2">
            <PackageSearch className="w-3.5 h-3.5" /> Commodity Registry
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Scanned Product Repository
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Archived packaging labels, compliance scores, and historical audits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search repository..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov text-xs"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-gov-blue text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat === 'ALL' ? 'All Commodities' : cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((prod) => {
          const score = prod.complianceScore;
          const isHigh = score >= 80;
          const isMid = score >= 50 && score < 80;

          return (
            <div
              key={prod.id}
              className="bg-white dark:bg-slate-900 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Image Preview Container */}
              <div className="relative h-48 bg-slate-100 dark:bg-slate-800/60 p-2 overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <PackagingPreview product={prod} showBoundingBoxes={false} />

                {/* Compliance Score Pill */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-flex items-center gap-1 font-extrabold px-2.5 py-1 rounded-full text-xs shadow-md ${
                      isHigh
                        ? 'bg-emerald-500 text-white'
                        : isMid
                        ? 'bg-amber-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {isHigh ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : isMid ? (
                      <AlertTriangle className="w-3 h-3" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}
                    {score}%
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-gov-blue dark:text-blue-400 tracking-wider">
                    {prod.brand}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {prod.category} • {prod.netQuantity}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{prod.lastScanDate.split(' ')[0]}</span>
                  </div>
                  <span className={`font-semibold ${
                    prod.status === 'Compliant' ? 'text-emerald-600' : prod.status === 'Partially Compliant' ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {prod.status}
                  </span>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenDetailsModal(prod)}
                  className="px-3 py-1.5 rounded-gov text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-gov-blue dark:text-blue-400" />
                  View Details
                </button>

                <button
                  onClick={() => {
                    onSelectProduct(prod);
                    onReScan(prod);
                  }}
                  className="px-3 py-1.5 rounded-gov text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                  Re-scan
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
