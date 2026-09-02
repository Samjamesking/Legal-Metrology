import React, { useState } from 'react';
import {
  AlertOctagon,
  Scale,
  ShieldAlert,
  FileSpreadsheet,
  Send,
  AlertTriangle,
  CheckCircle,
  FileText,
  Filter,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../../data/sampleProducts';
import { LEGAL_PENALTIES } from '../../data/legalMetrologyRules';

export default function ViolationsPage({ onSelectProduct, onViewReport }) {
  const [activeSeverity, setActiveSeverity] = useState('ALL');
  const [issuedNotices, setIssuedNotices] = useState({});

  // Collect all violations across products
  const allViolations = [];
  SAMPLE_PRODUCTS.forEach((prod) => {
    (prod.violations || []).forEach((v) => {
      allViolations.push({
        ...v,
        product: prod
      });
    });
  });

  const filtered = allViolations.filter((v) => {
    if (activeSeverity === 'ALL') return true;
    if (activeSeverity === 'CRITICAL') return v.severity === 'critical';
    if (activeSeverity === 'WARNING') return v.severity === 'warning';
    return true;
  });

  const handleIssueNotice = (violId, prodName) => {
    setIssuedNotices(prev => ({
      ...prev,
      [violId]: {
        noticeNo: `SCN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString()
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-xs font-bold mb-2">
            <AlertOctagon className="w-3.5 h-3.5" /> Enforcement & Penalties
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Statutory Violations & Legal Notices
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Infractions under Legal Metrology Act, 2009 & Packaged Commodities Rules, 2011.
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800 text-xs">
          <button
            onClick={() => setActiveSeverity('ALL')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeSeverity === 'ALL' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            All Infractions ({allViolations.length})
          </button>
          <button
            onClick={() => setActiveSeverity('CRITICAL')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeSeverity === 'CRITICAL' ? 'bg-red-500 text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            🔴 Critical ({allViolations.filter(v => v.severity === 'critical').length})
          </button>
          <button
            onClick={() => setActiveSeverity('WARNING')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeSeverity === 'WARNING' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            🟠 Warnings ({allViolations.filter(v => v.severity === 'warning').length})
          </button>
        </div>
      </div>

      {/* Statutory Penalties Guidance Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border-l-4 border-l-gov-blue border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="text-[10px] uppercase font-bold text-slate-400">First Offence</div>
          <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
            {LEGAL_PENALTIES.firstOffence.fine}
          </div>
          <p className="text-xs text-slate-500 mt-1">{LEGAL_PENALTIES.firstOffence.section}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border-l-4 border-l-amber-500 border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="text-[10px] uppercase font-bold text-slate-400">Second Offence</div>
          <div className="text-sm font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {LEGAL_PENALTIES.secondOffence.fine}
          </div>
          <p className="text-xs text-slate-500 mt-1">{LEGAL_PENALTIES.secondOffence.section}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border-l-4 border-l-red-500 border-slate-200/90 dark:border-slate-800 shadow-soft">
          <div className="text-[10px] uppercase font-bold text-slate-400">Subsequent Conviction</div>
          <div className="text-sm font-extrabold text-red-600 dark:text-red-400 mt-1">
            ₹50,000 - ₹1,00,000 / Jail
          </div>
          <p className="text-xs text-slate-500 mt-1">{LEGAL_PENALTIES.subsequentOffence.section}</p>
        </div>
      </div>

      {/* Violations Cards Grid */}
      <div className="space-y-3">
        {filtered.map((viol) => {
          const isCritical = viol.severity === 'critical';
          const notice = issuedNotices[viol.id];

          return (
            <div
              key={viol.id}
              className={`p-5 rounded-gov border transition-all shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isCritical
                  ? 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/60'
                  : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60'
              }`}
            >
              <div className="flex items-start gap-3.5 max-w-2xl">
                <div className="mt-0.5 text-2xl">
                  {isCritical ? '🔴' : '🟠'}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {viol.title}
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {viol.rule}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                      isCritical ? 'bg-red-200 text-red-900 dark:bg-red-900 dark:text-red-200' : 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200'
                    }`}>
                      {viol.severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {viol.description}
                  </p>

                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 flex-wrap">
                    <span>Commodity: <strong className="text-slate-900 dark:text-white">{viol.product.name}</strong></span>
                    <span>•</span>
                    <span>Maker: <strong>{viol.product.brand}</strong></span>
                    <span>•</span>
                    <span className="font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5" />
                      {viol.penaltyEstimate}
                    </span>
                  </div>

                  {notice && (
                    <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Show Cause Notice Issued: <strong>{notice.noticeNo}</strong> on {notice.date}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onSelectProduct(viol.product)}
                  className="px-3 py-2 rounded-gov text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 shadow-xs"
                >
                  Inspect Label
                </button>

                {!notice ? (
                  <button
                    onClick={() => handleIssueNotice(viol.id, viol.product.name)}
                    className="px-4 py-2 rounded-gov text-xs font-bold bg-gov-blue text-white hover:bg-gov-blueLight shadow-md shadow-gov-blue/20 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Issue Notice
                  </button>
                ) : (
                  <button
                    onClick={() => onViewReport(viol.product)}
                    className="px-4 py-2 rounded-gov text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    View Notice PDF
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
