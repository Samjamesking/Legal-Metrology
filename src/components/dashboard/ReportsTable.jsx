import React, { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  FileSpreadsheet,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../../data/sampleProducts';

export default function ReportsTable({ onSelectProduct, onViewReport, onExportExcel }) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [tableSearch, setTableSearch] = useState('');

  const filteredProducts = SAMPLE_PRODUCTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(tableSearch.toLowerCase()) ||
      p.batchNo.toLowerCase().includes(tableSearch.toLowerCase());

    if (filterStatus === 'ALL') return matchesSearch;
    if (filterStatus === 'COMPLIANT') return matchesSearch && p.status === 'Compliant';
    if (filterStatus === 'PARTIAL') return matchesSearch && p.status === 'Partially Compliant';
    if (filterStatus === 'NON_COMPLIANT') return matchesSearch && p.status === 'Non-Compliant';
    return matchesSearch;
  });

  const handleExportCsv = () => {
    const headers = ['Product Name', 'Brand', 'Category', 'Scan Date', 'Compliance Score', 'Status', 'Violations Count', 'Batch No', 'MRP'];
    const rows = filteredProducts.map(p => [
      `"${p.name}"`,
      `"${p.brand}"`,
      `"${p.category}"`,
      `"${p.lastScanDate}"`,
      `${p.complianceScore}%`,
      `"${p.status}"`,
      p.violations?.length || 0,
      `"${p.batchNo}"`,
      `"${p.mrp}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Legal_Metrology_Reports_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-6 bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-gov-blue dark:text-blue-400" />
            Compliance Reports Registry
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Official statutory audit registry for packaged goods
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Filter Buttons */}
          <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800 text-xs">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                filterStatus === 'ALL' ? 'bg-white dark:bg-slate-900 shadow-xs text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All ({SAMPLE_PRODUCTS.length})
            </button>
            <button
              onClick={() => setFilterStatus('COMPLIANT')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                filterStatus === 'COMPLIANT' ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Compliant
            </button>
            <button
              onClick={() => setFilterStatus('NON_COMPLIANT')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                filterStatus === 'NON_COMPLIANT' ? 'bg-red-500 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Violations
            </button>
          </div>

          {/* Export Excel / CSV Button */}
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-gov text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors shadow-xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Table Filter Input */}
      <div className="my-3 flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
            placeholder="Filter table by product or manufacturer..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
          />
        </div>
        <span className="text-xs text-slate-500">
          Showing {filteredProducts.length} records
        </span>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-y border-slate-200 dark:border-slate-700">
            <tr>
              <th className="py-3 px-3">Product Name</th>
              <th className="py-3 px-3">Manufacturer</th>
              <th className="py-3 px-3">Scan Date</th>
              <th className="py-3 px-3">Compliance Score</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-center">Violations</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredProducts.map((prod) => {
              const violationsCount = prod.violations?.length || 0;

              return (
                <tr
                  key={prod.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Product Name */}
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900 dark:text-white leading-tight">
                      {prod.name}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      Batch: {prod.batchNo} • {prod.netQuantity}
                    </div>
                  </td>

                  {/* Manufacturer */}
                  <td className="py-3 px-3">
                    <span className="font-medium text-slate-800 dark:text-slate-200 block">
                      {prod.brand}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate block max-w-xs">
                      {prod.category}
                    </span>
                  </td>

                  {/* Scan Date */}
                  <td className="py-3 px-3 whitespace-nowrap text-slate-500">
                    {prod.lastScanDate}
                  </td>

                  {/* Compliance Score */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            prod.complianceScore >= 80 ? 'bg-emerald-500' : prod.complianceScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${prod.complianceScore}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {prod.complianceScore}%
                      </span>
                    </div>
                  </td>

                  {/* Status Badges */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    {prod.status === 'Compliant' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        🟢 Compliant
                      </span>
                    )}
                    {prod.status === 'Partially Compliant' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        🟡 Partially Compliant
                      </span>
                    )}
                    {prod.status === 'Non-Compliant' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        🔴 Non-Compliant
                      </span>
                    )}
                  </td>

                  {/* Violations Count */}
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex items-center justify-center font-bold px-2 py-0.5 rounded-full text-[10px] ${
                      violationsCount === 0 ? 'bg-slate-100 dark:bg-slate-800 text-slate-500' : 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400'
                    }`}>
                      {violationsCount}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      {/* View button */}
                      <button
                        onClick={() => onSelectProduct(prod)}
                        title="View Details & Inspect"
                        className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-gov-blue transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Download PDF button */}
                      <button
                        onClick={() => onViewReport(prod)}
                        title="Generate Official PDF Report"
                        className="p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
