import React from 'react';
import {
  X,
  Printer,
  Download,
  Scale,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  QrCode
} from 'lucide-react';
import { MANDATORY_DECLARATIONS } from '../../data/legalMetrologyRules';

export default function ReportModal({ product, onClose }) {
  if (!product) return null;

  const handlePrint = () => {
    window.print();
  };

  const reportId = `GOI-LM-${product.batchNo.replace(/[^a-zA-Z0-9]/g, '') || '8810'}-2026`;
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white text-slate-900 rounded-gov-xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-300 print:m-0 print:p-0 print:border-none print:shadow-none print:max-w-none">
        {/* Modal Top Bar (Hidden during print) */}
        <div className="px-6 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-100/80 print:hidden">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-gov-blue" />
            <span className="font-bold text-sm text-slate-900">
              Official Statutory Inspection Certificate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-gov text-xs font-bold bg-gov-blue text-white hover:bg-gov-blueLight flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Certificate Body */}
        <div id="printable-report" className="p-8 overflow-y-auto space-y-6 text-slate-900 bg-white">
          {/* Official Govt Letterhead */}
          <div className="text-center border-b-2 border-gov-blue pb-4 space-y-1 relative">
            <div className="flex justify-center mb-1">
              <div className="w-12 h-12 rounded-full border-2 border-gov-blue text-gov-blue flex items-center justify-center font-bold text-xl">
                ⚖️
              </div>
            </div>
            <div className="text-xs uppercase tracking-widest font-extrabold text-slate-600">
              Government of India • Ministry of Consumer Affairs, Food & Public Distribution
            </div>
            <h1 className="text-xl font-black text-gov-blue tracking-tight">
              DIRECTORATE OF LEGAL METROLOGY
            </h1>
            <div className="text-xs text-slate-600 font-serif italic">
              Statutory Inspection Certificate under the Legal Metrology (Packaged Commodities) Rules, 2011
            </div>

            {/* Top Right Reference */}
            <div className="text-right text-[11px] text-slate-500 font-mono mt-2 flex justify-between items-center pt-2">
              <span>Certificate No: <strong>{reportId}</strong></span>
              <span>Date of Inspection: <strong>{currentDate}</strong></span>
            </div>
          </div>

          {/* Commodity & Manufacturer Specifics */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div>
              <div className="text-slate-500 uppercase text-[10px] font-bold">Packaged Commodity</div>
              <div className="font-extrabold text-sm text-slate-900">{product.name}</div>
              <div className="text-slate-600 mt-0.5">{product.category} • Net Qty: {product.netQuantity}</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase text-[10px] font-bold">Manufacturer / Packer</div>
              <div className="font-bold text-slate-900">{product.brand}</div>
              <div className="text-slate-600 mt-0.5 font-mono text-[11px]">Batch: {product.batchNo} | MRP: {product.mrp}</div>
            </div>
          </div>

          {/* Compliance Evaluation Score Banner */}
          <div className="flex items-center justify-between p-3.5 rounded-lg border border-slate-300 bg-slate-50">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase">AI Statutory Compliance Score</div>
              <div className="text-2xl font-black text-gov-blue">{product.complianceScore}%</div>
            </div>
            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${
                product.complianceScore >= 80 ? 'bg-emerald-100 text-emerald-800' :
                product.complianceScore >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.status.toUpperCase()}
              </span>
              <div className="text-[10px] text-slate-500 mt-0.5">Risk Rating: {product.riskLevel}</div>
            </div>
          </div>

          {/* Statutory 9-Declaration Findings */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
              Audit Findings under Rule 6(1)
            </h3>
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-[10px] uppercase font-bold text-slate-600 border-b">
                <tr>
                  <th className="p-2">Rule Reference</th>
                  <th className="p-2">Mandatory Declaration</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Inspected Value / Observation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {MANDATORY_DECLARATIONS.map((d) => {
                  const item = product.declarations?.[d.id] || { status: 'missing', value: 'Not Detected' };
                  const isValid = item.status === 'valid';
                  const isWarning = item.status === 'warning';

                  return (
                    <tr key={d.id} className="hover:bg-slate-50">
                      <td className="p-2 font-mono text-[11px] font-bold text-slate-600">{d.rule}</td>
                      <td className="p-2 font-bold text-slate-900">{d.name}</td>
                      <td className="p-2">
                        {isValid ? (
                          <span className="text-emerald-700 font-bold">✔ Compliant</span>
                        ) : isWarning ? (
                          <span className="text-amber-700 font-bold">⚠ Notice</span>
                        ) : (
                          <span className="text-red-700 font-bold">❌ Violation</span>
                        )}
                      </td>
                      <td className="p-2 text-slate-600 font-mono text-[10px]">{item.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Violations & Legal Orders if any */}
          {product.violations && product.violations.length > 0 && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-xs">
              <h4 className="font-bold text-red-900 mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Legal Metrology Notice & Penalty Order
              </h4>
              <p className="text-red-800 text-[11px] leading-relaxed">
                The above packaged commodity was found in violation of specified provisions of the Legal Metrology (Packaged Commodities) Rules, 2011. Notice is hereby issued under Section 36 of the Legal Metrology Act, 2009. The manufacturer/packer is required to rectify non-compliances within 15 working days.
              </p>
            </div>
          )}

          {/* Inspector Digital Stamp & QR Verification Code */}
          <div className="pt-6 border-t border-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 p-1 border border-slate-300 rounded bg-white flex items-center justify-center">
                <QrCode className="w-12 h-12 text-slate-800" />
              </div>
              <div className="text-[10px] text-slate-500">
                <div className="font-bold text-slate-800">Scan QR to Verify Authenticity</div>
                <div>Legal Metrology Verification Portal</div>
                <div className="font-mono text-[9px]">https://legalmetrology.gov.in/verify</div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-serif italic text-base text-gov-blue font-bold">
                S. K. Gupta
              </div>
              <div className="text-[11px] font-bold text-slate-800">Senior Metrology Inspector</div>
              <div className="text-[10px] text-slate-500">Enforcement Wing, North Zone • Seal Verified</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
