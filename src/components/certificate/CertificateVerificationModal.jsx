import React, { useState } from 'react';
import {
  Award,
  X,
  Download,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  QrCode,
  Printer
} from 'lucide-react';
import {
  generateComplianceCertificate,
  generateQrCodeSvg,
  exportCertificatePdf,
  shareCertificate
} from '../../services/complianceCertificateService';

export default function CertificateVerificationModal({ product, isOpen, onClose }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  if (!isOpen || !product) return null;

  const cert = generateComplianceCertificate(product);

  const handleShare = async () => {
    const res = await shareCertificate(cert);
    if (res.success) {
      if (res.method === 'clipboard') {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      } else {
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-gov-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in duration-200 flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-slate-850 dark:to-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gov-blue text-white flex items-center justify-center font-bold text-sm shadow-md shadow-gov-blue/20">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Statutory Compliance Certificate
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Digitally Signed
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official Certification under Legal Metrology Rules, 2011
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

        {/* Certificate Body Container */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Certificate Header Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-gov-navy to-gov-blue text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-200 block">
                Certificate Identifier
              </span>
              <h3 className="text-lg font-black font-mono tracking-tight mt-0.5">
                {cert.certId}
              </h3>
              <p className="text-xs text-blue-100 mt-1">
                Issued on {cert.issueDate} • Directorate of Legal Metrology
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-[10px] text-blue-200 block uppercase font-bold">Audit Score</span>
                <span className="text-2xl font-black text-amber-300">{cert.complianceScore}%</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <ShieldCheck className="w-7 h-7 text-amber-300" />
              </div>
            </div>
          </div>

          {/* Product Verified Particulars & QR Code */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2.5 text-xs">
              <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 font-medium">Commodity Name:</span>
                <span className="font-extrabold text-slate-900 dark:text-white text-right">{cert.productName}</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 font-medium">Manufacturer / Brand:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-right">{cert.brand}</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 font-medium">Declared Net Quantity:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{cert.netQuantity}</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 font-medium">Maximum Retail Price:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{cert.mrp}</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 font-medium">Batch / Lot Identifier:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{cert.batchNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Statutory Status:</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {cert.status}
                </span>
              </div>
            </div>

            {/* QR Code Verification Card */}
            <div className="sm:col-span-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center">
              <div
                className="w-32 h-32 flex items-center justify-center p-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white"
                dangerouslySetInnerHTML={{ __html: generateQrCodeSvg(cert.verificationUrl, 120) }}
              />
              <span className="text-[10px] font-mono text-slate-400 mt-2 block">
                Scan to Verify Authenticity
              </span>
              <span className="text-[9px] font-bold text-gov-blue dark:text-blue-400 mt-0.5">
                Central Metrology Portal
              </span>
            </div>
          </div>

          {/* Legal Certification Affirmation */}
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Statutory Affirmation under Rule 6(1) & Rule 7
            </div>
            <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80 leading-relaxed">
              This commodity has been evaluated using Computer Vision AI OCR and complies with all mandatory packaging disclosures, font size matrices, and price disclosures mandated by the Ministry of Consumer Affairs, Government of India.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[10px] font-mono text-slate-400">
            Security Hash: {cert.securityHash}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-gov text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 flex items-center gap-1.5 shadow-xs"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  Link Copied!
                </>
              ) : shareSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  Shared!
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-gov-blue dark:text-blue-400" />
                  Share Certificate
                </>
              )}
            </button>

            <button
              onClick={() => exportCertificatePdf(cert)}
              className="px-4 py-2 rounded-gov text-xs font-bold bg-gov-blue hover:bg-gov-blueLight text-white shadow-md shadow-gov-blue/25 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              Download PDF Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
