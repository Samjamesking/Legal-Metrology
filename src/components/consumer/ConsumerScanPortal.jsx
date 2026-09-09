import React, { useState } from 'react';
import {
  Scan,
  Smartphone,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Camera,
  Upload,
  CheckCircle2,
  XCircle,
  QrCode,
  Send,
  X,
  FileCheck,
  AlertOctagon,
  HelpCircle,
  Sparkles,
  MapPin,
  Store
} from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../../data/sampleProducts';
import { consumerReportService } from '../../services/consumerReportService';

export default function ConsumerScanPortal({ onOpenQrModal }) {
  const [selectedProduct, setSelectedProduct] = useState(SAMPLE_PRODUCTS[0]);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // Report Form State
  const [reportForm, setReportForm] = useState({
    productName: '',
    brand: '',
    storeName: 'Reliance Smart Supermarket, MG Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    violationCategory: 'Overcharging above printed MRP',
    mrpPrinted: '₹150.00',
    priceCharged: '₹180.00',
    description: 'Shopkeeper glued secondary price sticker and refused to bill at printed Maximum Retail Price.',
    photoUrl: null
  });

  const handleSimulateScan = (prod) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedProduct(prod);
      setIsScanning(false);
    }, 600);
  };

  const handleOpenReportForProduct = (prod) => {
    setReportForm(prev => ({
      ...prev,
      productName: prod.name,
      brand: prod.brand,
      mrpPrinted: prod.mrp
    }));
    setReportModalOpen(true);
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    consumerReportService.addReport(reportForm);
    setReportModalOpen(false);
    setSuccessToast('Citizen Grievance Report filed successfully! A regulatory inspection token has been queued.');
    setTimeout(() => setSuccessToast(''), 4000);
  };

  const isCompliant = (selectedProduct.complianceScore || 0) >= 80;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Toast */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-600 text-white shadow-xl flex items-center justify-between text-xs font-bold animate-in fade-in">
          <span>{successToast}</span>
          <button onClick={() => setSuccessToast('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Header */}
      <div className="p-5 rounded-gov bg-gradient-to-r from-gov-navy to-indigo-800 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold mb-2">
            <Smartphone className="w-3.5 h-3.5" /> Citizen Consumer Scan Mode
          </div>
          <h1 className="text-xl sm:text-2xl font-black leading-tight">
            Verify Packaged Commodity on Spot
          </h1>
          <p className="text-xs text-blue-100 mt-1 max-w-md">
            Scan any packaged commodity in supermarkets, verify legal MRP, detect tampered stickers, and report non-compliant retailers.
          </p>
        </div>

        <button
          onClick={onOpenQrModal}
          className="px-4 py-2.5 rounded-gov bg-amber-400 text-slate-900 font-extrabold text-xs shadow-lg hover:bg-amber-300 flex items-center gap-2 self-start sm:self-auto"
        >
          <QrCode className="w-4 h-4" />
          Verify QR Seal
        </button>
      </div>

      {/* Mobile-Friendly Scanner Viewfinder Card */}
      <div className="bg-white dark:bg-slate-900 rounded-gov-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-gov-blue dark:text-blue-400" />
            Live Consumer Package Scanner
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            AI Active
          </span>
        </div>

        {/* Viewfinder Target */}
        <div className="relative h-64 sm:h-72 bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center p-4 border-2 border-dashed border-slate-700">
          {/* Viewfinder Corners */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400 rounded-br-lg pointer-events-none" />

          {/* Animated Scanning Laser Line */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_8px_#ef4444] animate-bounce" />

          {/* Product Label Preview in Center */}
          <div className="text-center text-white space-y-2 z-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
              Currently Scanned Item
            </span>
            <h3 className="text-lg font-black">{selectedProduct.name}</h3>
            <p className="text-xs text-slate-300">{selectedProduct.brand} • {selectedProduct.category}</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono">
              MRP: {selectedProduct.mrp}
            </div>
          </div>
        </div>

        {/* Quick Product Switcher for testing */}
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
            Switch Test Commodity:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                onClick={() => handleSimulateScan(prod)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedProduct.id === prod.id
                    ? 'bg-gov-blue text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {prod.name.split(' ')[0]} ({prod.complianceScore}%)
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Consumer Instant Verdict Card */}
      <div className={`p-6 rounded-gov-xl border shadow-lg ${
        isCompliant
          ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
          : 'bg-red-50/80 dark:bg-red-950/30 border-red-300 dark:border-red-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isCompliant ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {isCompliant ? <ShieldCheck className="w-7 h-7" /> : <ShieldAlert className="w-7 h-7" />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-black uppercase tracking-wider ${isCompliant ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                  Consumer Verdict
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 font-bold shadow-xs">
                  {selectedProduct.complianceScore}% Legal Score
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                {isCompliant ? 'Safe & Statutorily Verified Commodity' : 'Warning: Non-Compliant / Suspicious Packaging'}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {isCompliant
                  ? 'All mandatory packaging rules (MRP with taxes, Net Quantity in legal SI units, Date, Address) are verified.'
                  : 'This package has active infractions under Legal Metrology Rules, 2011. Do not pay above printed MRP.'}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <button
              onClick={() => handleOpenReportForProduct(selectedProduct)}
              className="px-4 py-2.5 rounded-gov text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20 flex items-center gap-2"
            >
              <AlertOctagon className="w-4 h-4" />
              Report Product
            </button>
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Legal Net Quantity</span>
            <span className="font-extrabold text-slate-900 dark:text-white">{selectedProduct.netQuantity}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Statutory MRP</span>
            <span className="font-extrabold text-slate-900 dark:text-white">{selectedProduct.mrp}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Batch Number</span>
            <span className="font-mono text-slate-900 dark:text-white">{selectedProduct.batchNo}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Risk Rating</span>
            <span className={`font-extrabold ${selectedProduct.riskLevel === 'Low Risk' ? 'text-emerald-600' : 'text-red-600'}`}>
              {selectedProduct.riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* REPORT PRODUCT MODAL */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-gov-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-red-50/60 dark:bg-red-950/40">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Report Suspicious / Non-Compliant Product
                </h3>
              </div>
              <button onClick={() => setReportModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={reportForm.productName}
                    onChange={(e) => setReportForm({ ...reportForm, productName: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={reportForm.brand}
                    onChange={(e) => setReportForm({ ...reportForm, brand: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Violation Category</label>
                <select
                  value={reportForm.violationCategory}
                  onChange={(e) => setReportForm({ ...reportForm, violationCategory: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
                >
                  <option value="Overcharging above printed MRP">Overcharging above printed MRP</option>
                  <option value="Sticker pasted over original MRP">Sticker pasted over original MRP</option>
                  <option value="Missing or altered expiry date">Missing or altered expiry date</option>
                  <option value="Under-weight / Non-standard Net Quantity">Under-weight / Non-standard Net Quantity</option>
                  <option value="Missing manufacturer contact details">Missing manufacturer contact details</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Store / Retailer Name</label>
                  <input
                    type="text"
                    required
                    value={reportForm.storeName}
                    onChange={(e) => setReportForm({ ...reportForm, storeName: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">City / Location</label>
                  <input
                    type="text"
                    required
                    value={reportForm.city}
                    onChange={(e) => setReportForm({ ...reportForm, city: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">MRP Printed on Pack</label>
                  <input
                    type="text"
                    value={reportForm.mrpPrinted}
                    onChange={(e) => setReportForm({ ...reportForm, mrpPrinted: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Price Demanded / Charged</label>
                  <input
                    type="text"
                    value={reportForm.priceCharged}
                    onChange={(e) => setReportForm({ ...reportForm, priceCharged: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Evidence Description</label>
                <textarea
                  rows={2}
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
                  placeholder="Describe where the product was purchased and how the violation was identified..."
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="px-4 py-2 rounded-gov text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-gov text-xs font-bold bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 shadow-md shadow-red-600/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Report to Regulators
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
