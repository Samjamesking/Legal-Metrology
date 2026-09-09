import React, { useState } from 'react';
import {
  Sparkles,
  Scale,
  Copy,
  Check,
  Download,
  FileText,
  AlertOctagon,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  X,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import {
  generateFullCopilotReport,
  downloadCorrectedLabelText,
  exportCopilotJson
} from '../../services/aiCopilotService';

export default function ComplianceCopilotPanel({ product, isOpen, onClose }) {
  const [copiedId, setCopiedId] = useState(null);
  const [copiedFull, setCopiedFull] = useState(false);
  const [activeTab, setActiveTab] = useState('violations'); // 'violations' | 'fullTemplate'

  if (!isOpen || !product) return null;

  const report = generateFullCopilotReport(product);

  const handleCopyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyFull = () => {
    navigator.clipboard.writeText(report.fullCorrectedLabel);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 transition-transform">
        {/* Top Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-purple-50 via-blue-50 to-white dark:from-slate-900 dark:via-purple-950/30 dark:to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Compliance Copilot
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                  AI Legal Advisor
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Legal Metrology (Packaged Commodities) Rules, 2011 Assistant
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

        {/* Product Status Bar */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Inspected Commodity</span>
            <span className="font-extrabold text-slate-900 dark:text-white">{product.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Compliance</span>
              <span className={`font-black text-sm ${product.complianceScore >= 80 ? 'text-emerald-500' : 'text-red-500'}`}>
                {product.complianceScore}%
              </span>
            </div>
            <span className={`px-2 py-1 rounded text-[10px] font-bold ${
              report.criticalCount > 0 ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
            }`}>
              {report.overallSeverity}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-5 border-b border-slate-200 dark:border-slate-800 flex gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('violations')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'violations'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <AlertOctagon className="w-4 h-4" />
            Violation Rectification ({report.totalViolations})
          </button>

          <button
            onClick={() => setActiveTab('fullTemplate')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'fullTemplate'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            Full Compliant Label Template
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {activeTab === 'violations' && (
            <>
              {report.advices.length === 0 ? (
                <div className="p-8 text-center bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    Full Statutory Compliance Achieved!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-md mx-auto">
                    This package satisfies all mandatory declarations under Rules 6, 7, and 8 of the Legal Metrology (Packaged Commodities) Rules, 2011.
                  </p>
                </div>
              ) : (
                report.advices.map((advice, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 shadow-soft overflow-hidden transition-all"
                  >
                    {/* Violation Header */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/60 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <span className="text-base mt-0.5">
                          {advice.severity === 'critical' ? '🔴' : '🟠'}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                              {advice.violationTitle}
                            </h4>
                          </div>
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] font-mono text-purple-700 dark:text-purple-300 font-semibold">
                            <BookOpen className="w-3.5 h-3.5" />
                            {advice.ruleStatute}
                          </div>
                        </div>
                      </div>

                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        advice.severity === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {advice.severity}
                      </span>
                    </div>

                    {/* Copilot Rationale & Recommendation */}
                    <div className="p-4 space-y-3.5 text-xs">
                      {/* Mandate Description */}
                      <div className="p-2.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 text-purple-900 dark:text-purple-200">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-0.5">
                          Statutory Requirement:
                        </div>
                        <p className="leading-relaxed text-[11px]">{advice.statutoryMandate}</p>
                      </div>

                      {/* AI Recommendation */}
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-purple-500" />
                          AI Recommendation
                        </div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                          {advice.aiRecommendation}
                        </p>
                      </div>

                      {/* Corrected Label Declaration Preview */}
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          <span>Corrected Label Preview</span>
                          <button
                            onClick={() => handleCopyText(advice.correctedLabelText, advice.violationId)}
                            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 flex items-center gap-1 font-bold text-[10px] transition-colors"
                          >
                            {copiedId === advice.violationId ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" /> Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> Copy Declaration
                              </>
                            )}
                          </button>
                        </div>

                        <div className="p-3 bg-slate-900 text-emerald-400 rounded-xl font-mono text-[11px] leading-relaxed border border-slate-700 shadow-inner relative group">
                          <pre className="whitespace-pre-wrap font-mono">{advice.correctedLabelText}</pre>
                        </div>
                      </div>

                      {/* Penalty Clause Warning */}
                      <div className="flex items-center gap-2 text-[10px] text-red-600 dark:text-red-400 font-bold pt-1 border-t border-slate-100 dark:border-slate-800">
                        <Scale className="w-3.5 h-3.5 shrink-0" />
                        <span>Penalty Risk: {advice.penaltyClause}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'fullTemplate' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Synthesized Master Packaging Template</h4>
                  <p className="text-[11px] mt-0.5">
                    This template consolidates all statutory declarations for <strong>{product.name}</strong> to make the packaging 100% compliant with Legal Metrology Rules, 2011.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="p-4 bg-slate-950 text-slate-200 rounded-xl font-mono text-xs leading-relaxed border border-slate-800 shadow-inner max-h-[420px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-mono">{report.fullCorrectedLabel}</pre>
                </div>

                <button
                  onClick={handleCopyFull}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-800/90 text-white hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-md border border-slate-700"
                >
                  {copiedFull ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Master Label!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy All Text</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 font-medium">
            Rule Reference: LM (Packaged Commodities) Rules, 2011
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => downloadCorrectedLabelText(report)}
              className="px-3 py-2 rounded-gov text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-gov-blue dark:text-blue-400" />
              Download Label (.txt)
            </button>

            <button
              onClick={() => exportCopilotJson(report)}
              className="px-3 py-2 rounded-gov text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/25 flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-purple-200" />
              Export Corrections (.json)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
