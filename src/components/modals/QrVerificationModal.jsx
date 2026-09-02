import React, { useState } from 'react';
import { QrCode, X, CheckCircle, ShieldCheck, AlertTriangle, Search, ExternalLink } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../../data/sampleProducts';

export default function QrVerificationModal({ isOpen, onClose, onVerifiedProduct }) {
  const [qrInput, setQrInput] = useState('https://lm.gov.in/v/ITC-MP-260811');
  const [result, setResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (e) => {
    e.preventDefault();
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      // Match batch or default to product 0
      const matched = SAMPLE_PRODUCTS.find(p => qrInput.includes(p.batchNo)) || SAMPLE_PRODUCTS[0];
      setResult(matched);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-gov-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-gov-blue dark:text-blue-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Official QR Code Authenticity Verifier
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-500">
            Scan packaging QR codes printed on commodities to cross-check statutory registration with the Legal Metrology database.
          </p>

          <form onSubmit={handleVerify} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Scanned QR Payload / National Portal URL:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  placeholder="https://legalmetrology.gov.in/verify/..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov text-xs font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isChecking}
              className="w-full py-2.5 rounded-gov text-xs font-bold bg-gov-blue hover:bg-gov-blueLight text-white shadow-md shadow-gov-blue/20 flex items-center justify-center gap-2"
            >
              {isChecking ? 'Verifying with Central Registry...' : 'Validate QR Record'}
            </button>
          </form>

          {/* Verification Outcome */}
          {result && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Verified Legal Metrology Registration
              </div>
              <div className="text-slate-700 dark:text-slate-300 font-medium">
                <strong>{result.name}</strong> ({result.brand})
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Batch: {result.batchNo} • MRP: {result.mrp}
              </div>
              <button
                onClick={() => {
                  onVerifiedProduct(result);
                  onClose();
                }}
                className="mt-2 w-full py-1.5 rounded bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500"
              >
                Inspect Full Commodity Record
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
