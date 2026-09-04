import React, { useState, useEffect } from 'react';
import {
  MessageSquareWarning,
  UploadCloud,
  Search,
  Clock,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  Scale,
  Receipt,
  Building2,
  FileText,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  Send,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  Flame,
  Calendar
} from 'lucide-react';
import GrievanceChatbot from './GrievanceChatbot';
import { grievanceService, KNOWN_MERCHANTS } from '../../services/grievanceService';

export default function ConsumerGrievancePage() {
  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'track' | 'registry'
  const [grievanceList, setGrievanceList] = useState([]);
  const [selectedTokenInput, setSelectedTokenInput] = useState('');
  const [activeGrievance, setActiveGrievance] = useState(null);

  // Upload/preset state for new grievance
  const [uploadedProductImage, setUploadedProductImage] = useState(null);
  const [productNameInput, setProductNameInput] = useState('');
  const [brandInput, setBrandInput] = useState('');

  // Escalation modal/state
  const [escalateModalOpen, setEscalateModalOpen] = useState(false);
  const [escalationReason, setEscalationReason] = useState('Merchant failed to refund or replace within the 15-day statutory resolution window');
  const [noticeModalGrievance, setNoticeModalGrievance] = useState(null);
  const [copiedToken, setCopiedToken] = useState(null);
  const [successToast, setSuccessToast] = useState('');

  // Load grievances on mount
  const refreshGrievances = () => {
    const list = grievanceService.getAll();
    setGrievanceList(list);
    if (activeGrievance) {
      const refreshed = list.find(g => g.token === activeGrievance.token);
      if (refreshed) setActiveGrievance(refreshed);
    } else if (list.length > 0 && !activeGrievance) {
      setActiveGrievance(list[0]);
    }
  };

  useEffect(() => {
    refreshGrievances();
  }, []);

  const showToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  // Lookup token from search input
  const handleSearchToken = (e) => {
    e?.preventDefault();
    if (!selectedTokenInput.trim()) return;
    const found = grievanceService.getByToken(selectedTokenInput);
    if (found) {
      setActiveGrievance(found);
      setActiveTab('track');
    } else {
      showToast(`Token "${selectedTokenInput}" not found. Please verify token number.`);
    }
  };

  // Select token directly
  const handleSelectToken = (tok) => {
    const found = grievanceService.getByToken(tok);
    if (found) {
      setActiveGrievance(found);
      setSelectedTokenInput(tok);
      setActiveTab('track');
    }
  };

  // Trigger escalation
  const handleConfirmEscalation = () => {
    if (!activeGrievance) return;
    const updated = grievanceService.escalateGrievance(activeGrievance.token, escalationReason);
    if (updated) {
      setActiveGrievance(updated);
      refreshGrievances();
      setEscalateModalOpen(false);
      showToast(`Token ${updated.token} escalated to Level-2! Secondary 7-day enforcement time limit issued.`);
    }
  };

  // Fast-forward 15 days simulation
  const handleSimulate15Days = () => {
    if (!activeGrievance) return;
    const updated = grievanceService.simulateTimePassed(activeGrievance.token);
    if (updated) {
      setActiveGrievance(updated);
      refreshGrievances();
      showToast(`Simulated 15 days elapsed on ${activeGrievance.token}. Token is now eligible for immediate escalation!`);
    }
  };

  // Copy helper
  const copyToClipboard = (txt) => {
    navigator.clipboard?.writeText(txt);
    setCopiedToken(txt);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  // Preset options for test upload
  const SAMPLE_DAMAGED_ITEMS = [
    {
      name: 'Amul Gold Homogenised Milk (Expired)',
      brand: 'Amul GCMMF',
      img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
      reason: 'Purchased packet was 14 days past Best Before date, milk completely curdled.'
    },
    {
      name: 'Fortune Sunlite Refined Oil (Pouch Leaking)',
      brand: 'Fortune Adani Wilmar',
      img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
      reason: 'Packaging seal punctured at seam, entire oil leaked out. Seller refused refund.'
    },
    {
      name: 'Britannia Good Day Butter Cookies (Damaged / Mold)',
      brand: 'Britannia Industries',
      img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80',
      reason: 'Packet crushed with tear on side panel, biscuits moldy and unhygienic.'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs font-semibold">{successToast}</div>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold mb-2">
              <MessageSquareWarning className="w-3.5 h-3.5" />
              Consumer Redressal & Statutory Token Escalation
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Damaged / Expired Product Grievance Portal
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Upload proof of defective or expired commodities, chat with NyayaMitra AI, receive an enforceable 15-Day Resolution Token, and escalate if the merchant defaults.
            </p>
          </div>

          {/* Quick Stats Pills */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-center">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">15-Day Window</span>
              <span className="text-sm font-black text-gov-blue dark:text-blue-300">
                {grievanceList.filter(g => g.status === 'PENDING_SELLER_ACTION').length} Active
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-center">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Level-2 Escalated</span>
              <span className="text-sm font-black text-red-600 dark:text-red-400">
                {grievanceList.filter(g => g.status === 'ESCALATED_LEVEL_2').length} Summoned
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-slate-100 dark:border-slate-800 pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('new')}
            className={`px-4 py-2 rounded-gov text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'new'
                ? 'bg-gov-blue text-white shadow-md shadow-gov-blue/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            1. File Grievance (AI Chatbot)
          </button>

          <button
            onClick={() => setActiveTab('track')}
            className={`px-4 py-2 rounded-gov text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'track'
                ? 'bg-gov-blue text-white shadow-md shadow-gov-blue/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            2. Track & Escalate Token
            {activeGrievance?.status === 'ESCALATED_LEVEL_2' && (
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('registry');
              refreshGrievances();
            }}
            className={`px-4 py-2 rounded-gov text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'registry'
                ? 'bg-gov-blue text-white shadow-md shadow-gov-blue/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            3. Grievance Registry & Notices ({grievanceList.length})
          </button>
        </div>
      </div>

      {/* TAB 1: FILE NEW GRIEVANCE (Photo Upload + AI Chatbot) */}
      {activeTab === 'new' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Image Upload & Presets (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gov-blue/10 dark:bg-blue-900/40 text-gov-blue dark:text-blue-400 flex items-center justify-center">
                    <UploadCloud className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      Step 1: Upload Product Proof
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Damaged packaging, broken seal, or expired date stamp
                    </p>
                  </div>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Commodity Name:
                </label>
                <input
                  type="text"
                  value={productNameInput}
                  onChange={(e) => setProductNameInput(e.target.value)}
                  placeholder="e.g. Britannia Good Day / Amul Taaza Milk"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white mb-3"
                />

                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-gov-blue rounded-xl p-6 text-center cursor-pointer bg-slate-50/50 dark:bg-slate-800/40 transition-colors">
                  {uploadedProductImage ? (
                    <div className="space-y-3">
                      <div className="relative max-h-48 overflow-hidden rounded-lg mx-auto border border-slate-200 dark:border-slate-700">
                        <img
                          src={uploadedProductImage}
                          alt="Product proof"
                          className="w-full h-auto object-cover max-h-48 mx-auto"
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Photo Attached
                        </span>
                        <button
                          type="button"
                          onClick={() => setUploadedProductImage(null)}
                          className="text-[11px] text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        Drag or click to attach damaged/expired photo
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP up to 25MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="product-proof-upload"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              setUploadedProductImage(ev.target.result);
                              if (!productNameInput) {
                                setProductNameInput(file.name.replace(/\.[^/.]+$/, ''));
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <label
                        htmlFor="product-proof-upload"
                        className="mt-3 inline-block px-4 py-2 rounded-gov bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer transition-colors"
                      >
                        Select Image File
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* 1-Click Test Presets */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Quick Test Samples (Damaged / Expired):
                </div>
                <div className="space-y-2">
                  {SAMPLE_DAMAGED_ITEMS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setUploadedProductImage(item.img);
                        setProductNameInput(item.name);
                        setBrandInput(item.brand);
                      }}
                      className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-gov-blue hover:bg-slate-50 dark:hover:bg-slate-800 text-left flex items-center gap-3 transition-colors text-xs"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-10 h-10 rounded object-cover shrink-0"
                      />
                      <div className="overflow-hidden">
                        <div className="font-bold text-slate-900 dark:text-white truncate">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">{item.reason}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Statutory Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800/80 p-4 rounded-gov border border-blue-200 dark:border-slate-700 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-gov-navy dark:text-blue-300">
                <Scale className="w-4 h-4 text-gov-blue dark:text-blue-400" />
                Legal Metrology Rules 2011 & Consumer Act 2019
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Selling damaged, tampered, or expired packaged commodities is a cognizable infraction under <strong>Section 36</strong>. Retailers and manufacturers are required to refund or replace within <strong>15 calendar days</strong> of official notice.
              </p>
            </div>
          </div>

          {/* Right Column: AI Chatbot (7 cols) */}
          <div className="lg:col-span-7">
            <GrievanceChatbot
              key={uploadedProductImage || 'fresh-chat'}
              initialProductImage={uploadedProductImage}
              initialProductName={productNameInput}
              initialBrand={brandInput}
              onTokenGenerated={(newGrievance) => {
                refreshGrievances();
                setActiveGrievance(newGrievance);
                showToast(`Token ${newGrievance.token} generated! 15-Day Seller Window active.`);
              }}
              onNavigateToTracker={(token) => {
                handleSelectToken(token);
              }}
            />
          </div>
        </div>
      )}

      {/* TAB 2: TRACK & ESCALATE TOKEN */}
      {activeTab === 'track' && (
        <div className="space-y-5">
          {/* Token Search Bar & Recent Selector */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
            <form onSubmit={handleSearchToken} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={selectedTokenInput}
                  onChange={(e) => setSelectedTokenInput(e.target.value)}
                  placeholder="Enter Grievance Token Number (e.g. LM-GRV-2026-48219)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-gov bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-mono uppercase text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gov-blue"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-gov bg-gov-blue hover:bg-gov-blueLight text-white text-xs font-bold shadow-md shadow-gov-blue/20 flex items-center justify-center gap-2"
              >
                <Search className="w-3.5 h-3.5" />
                Track Token
              </button>
            </form>

            {/* Quick token selector badges */}
            <div className="mt-3 flex flex-wrap gap-2 items-center text-xs">
              <span className="text-[11px] font-bold text-slate-400">Your Tokens:</span>
              {grievanceList.map((g) => {
                const isCurrent = activeGrievance?.token === g.token;
                return (
                  <button
                    key={g.token}
                    onClick={() => handleSelectToken(g.token)}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                      isCurrent
                        ? 'bg-gov-blue text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span>{g.token}</span>
                    {g.status === 'ESCALATED_LEVEL_2' && (
                      <span className="w-2 h-2 rounded-full bg-red-500" title="Escalated" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Token Details View */}
          {activeGrievance ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Details Panel (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft space-y-4">
                  {/* Status Banner */}
                  <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    activeGrievance.status === 'ESCALATED_LEVEL_2'
                      ? 'bg-red-50/80 dark:bg-red-950/40 border-red-300 dark:border-red-900 text-red-900 dark:text-red-200'
                      : activeGrievance.status === 'RESOLVED'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200'
                      : 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200'
                  }`}>
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider">
                        Current Resolution Status
                      </div>
                      <div className="text-base font-black flex items-center gap-2 mt-0.5">
                        {activeGrievance.status === 'ESCALATED_LEVEL_2' ? (
                          <>
                            <AlertOctagon className="w-5 h-5 text-red-600" />
                            LEVEL-2 ESCALATED (ENFORCEMENT SUMMONS)
                          </>
                        ) : activeGrievance.status === 'RESOLVED' ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            GRIEVANCE RESOLVED (REFUND/REPLACED)
                          </>
                        ) : (
                          <>
                            <Clock className="w-5 h-5 text-gov-blue dark:text-blue-400" />
                            UNDER 15-DAY SELLER RESOLUTION WINDOW
                          </>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-white dark:bg-slate-900 shadow-xs">
                        {activeGrievance.token}
                      </span>
                    </div>
                  </div>

                  {/* Product & Issue Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="sm:col-span-1">
                      {activeGrievance.productImage ? (
                        <img
                          src={activeGrievance.productImage}
                          alt={activeGrievance.productName}
                          className="w-full h-32 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                        />
                      ) : (
                        <div className="w-full h-32 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-400">
                          No Photo
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-2 space-y-1.5 text-xs">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {activeGrievance.productName}
                      </h3>
                      <div className="text-slate-500">
                        Brand: <strong>{activeGrievance.brand}</strong> • Category: {activeGrievance.category}
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mt-2">
                        <span className="font-bold text-red-600 dark:text-red-400 block text-[11px]">
                          Reported Defect: {activeGrievance.issueCategory}
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 text-[11px] mt-1">
                          "{activeGrievance.issueDescription}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Purchase Invoice & Merchant Verification */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Purchase Invoice Details</div>
                      <div className="flex justify-between">
                        <span>Invoice No:</span>
                        <strong className="font-mono text-slate-900 dark:text-white">{activeGrievance.billNumber}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Claim Remedy:</span>
                        <strong className="text-emerald-600 font-bold">{activeGrievance.claimType}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Claim Amount:</span>
                        <strong className="text-slate-900 dark:text-white">{activeGrievance.amount}</strong>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Merchant GSTIN Verification</div>
                      <div className="flex justify-between">
                        <span>Merchant:</span>
                        <strong className="text-slate-900 dark:text-white truncate max-w-[140px]" title={activeGrievance.merchantName}>
                          {activeGrievance.merchantName}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span>GSTIN:</span>
                        <strong className="font-mono text-slate-900 dark:text-white">{activeGrievance.gstNumber}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>GST Status:</span>
                        <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Active Taxpayer
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Case History Log */}
                  <div className="pt-2">
                    <div className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                      Statutory Action Log:
                    </div>
                    <div className="space-y-2">
                      {activeGrievance.history.map((h, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border-l-4 border-gov-blue text-xs flex items-start justify-between gap-3"
                        >
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{h.action}</span>
                            <span className="text-slate-500 text-[11px]">{h.note}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {new Date(h.date).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: Resolution Timers & Escalation Action Card (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* 15-Day Timer or Secondary Timer Card */}
                <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gov-blue dark:text-blue-400" />
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                        Statutory Time Clock
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-gov-blue dark:text-blue-300">
                      Rule 6(1) Enforceable
                    </span>
                  </div>

                  {/* Stage 1: 15-Day Seller Window Timer */}
                  <div className={`p-4 rounded-xl border ${
                    activeGrievance.status === 'ESCALATED_LEVEL_2'
                      ? 'bg-slate-50 dark:bg-slate-800/50 opacity-80 border-slate-200 dark:border-slate-700'
                      : 'bg-gradient-to-br from-blue-50/70 to-indigo-50/70 dark:from-slate-800 dark:to-slate-800/90 border-blue-200 dark:border-blue-900'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Primary 15-Day Resolution Window:
                      </span>
                      <span className={`text-xs font-bold ${
                        grievanceService.getTimeRemaining(activeGrievance.deadline15Days).isExpired
                          ? 'text-red-600'
                          : 'text-gov-blue dark:text-blue-400'
                      }`}>
                        {grievanceService.getTimeRemaining(activeGrievance.deadline15Days).text}
                      </span>
                    </div>

                    <div className="mt-2 text-[11px] text-slate-500 space-y-1">
                      <div className="flex justify-between">
                        <span>Initiated Date:</span>
                        <strong>{new Date(activeGrievance.createdAt).toLocaleDateString()}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>15-Day Deadline:</span>
                        <strong className="text-slate-900 dark:text-white">
                          {new Date(activeGrievance.deadline15Days).toLocaleDateString()}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Stage 2: Secondary 7-Day Enforcement Timer (If Escalated) */}
                  {activeGrievance.status === 'ESCALATED_LEVEL_2' && activeGrievance.escalationDetails && (
                    <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-amber-50 dark:from-red-950/40 dark:to-slate-900 border-2 border-red-400/80 shadow-md">
                      <div className="flex items-center justify-between pb-2 border-b border-red-200 dark:border-red-900/60">
                        <span className="text-xs font-extrabold text-red-700 dark:text-red-300 flex items-center gap-1.5">
                          <Flame className="w-4 h-4 text-red-600 animate-pulse" />
                          Secondary Enforcement Limit:
                        </span>
                        <span className="text-xs font-black text-red-600 dark:text-red-400">
                          {grievanceService.getTimeRemaining(activeGrievance.escalationDetails.secondaryDeadlineDate).text}
                        </span>
                      </div>

                      <div className="mt-2 space-y-1.5 text-xs text-red-900 dark:text-red-200">
                        <div className="flex justify-between">
                          <span>Secondary Window:</span>
                          <strong>7 Calendar Days</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Summons Notice:</span>
                          <strong className="font-mono">{activeGrievance.escalationDetails.legalNoticeNo}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Officer Assigned:</span>
                          <strong>{activeGrievance.escalationDetails.assignedOfficer.split('(')[0]}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Final Secondary Deadline:</span>
                          <strong className="underline">
                            {new Date(activeGrievance.escalationDetails.secondaryDeadlineDate).toLocaleDateString()}
                          </strong>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-red-200 dark:border-red-900/60">
                        <button
                          onClick={() => setNoticeModalGrievance(activeGrievance)}
                          className="w-full py-2 rounded-gov bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          View Official Metrology Summons
                        </button>
                      </div>
                    </div>
                  )}

                  {/* "RAISE TOKEN NUMBER" ESCALATION CONTROLS */}
                  {activeGrievance.status === 'PENDING_SELLER_ACTION' && (
                    <div className="pt-2 space-y-3">
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs space-y-1.5">
                        <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          Product not replaced or refunded?
                        </div>
                        <p className="text-[11px] text-amber-700 dark:text-amber-400">
                          If the merchant has failed to fulfill your refund/replacement under the 15-day statutory window, raise this token number to escalate to the Legal Metrology Enforcement Cell.
                        </p>
                      </div>

                      {/* Raise Token Button */}
                      <button
                        onClick={() => setEscalateModalOpen(true)}
                        className="w-full py-3 px-4 rounded-gov text-xs sm:text-sm font-black text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/25 transition-all flex items-center justify-center gap-2"
                      >
                        <ShieldAlert className="w-4 h-4" />
                        Raise Token #{activeGrievance.token.slice(-5)} (Escalate Dispute)
                      </button>

                      {/* Fast-forward 15 days simulation toggle */}
                      <button
                        type="button"
                        onClick={handleSimulate15Days}
                        className="w-full py-2 px-3 rounded-gov text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        [Demo Mode] Simulate 15 Days Expired
                      </button>
                    </div>
                  )}

                  {/* Mark as Resolved Option */}
                  {activeGrievance.status !== 'RESOLVED' && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => {
                          const updated = grievanceService.resolveGrievance(activeGrievance.token, 'Refund or replacement successfully received by consumer.');
                          setActiveGrievance(updated);
                          refreshGrievances();
                          showToast(`Grievance ${activeGrievance.token} marked as Resolved!`);
                        }}
                        className="w-full py-2 rounded-gov text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Mark as Resolved (Refund / Replacement Received)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-gov border border-slate-200 dark:border-slate-800">
              <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No Token Selected
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Enter your grievance token above or pick an existing token from the list.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GRIEVANCE REGISTRY & LEGAL NOTICES */}
      {activeTab === 'registry' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft overflow-x-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Statutory Consumer Grievance Registry
              </h3>
              <span className="text-xs text-slate-500">
                Total Filed: <strong>{grievanceList.length}</strong>
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase text-[10px]">
                  <th className="py-2 px-3">Token No</th>
                  <th className="py-2 px-3">Product / Commodity</th>
                  <th className="py-2 px-3">Issue Type</th>
                  <th className="py-2 px-3">Merchant & GSTIN</th>
                  <th className="py-2 px-3">Statutory Timeline</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {grievanceList.map((item) => {
                  const isEscalated = item.status === 'ESCALATED_LEVEL_2';
                  const rem15 = grievanceService.getTimeRemaining(item.deadline15Days);
                  const remSec = isEscalated && item.escalationDetails ? grievanceService.getTimeRemaining(item.escalationDetails.secondaryDeadlineDate) : null;

                  return (
                    <tr key={item.token} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                        {item.token}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900 dark:text-white">{item.productName}</div>
                        <div className="text-[10px] text-slate-500">{item.brand}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {item.issueCategory}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900 dark:text-white truncate max-w-[150px]">
                          {item.merchantName}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">{item.gstNumber}</div>
                      </td>
                      <td className="py-3 px-3">
                        {isEscalated ? (
                          <div>
                            <span className="font-bold text-red-600 block text-[11px]">
                              Secondary Limit (7 Days)
                            </span>
                            <span className="text-[10px] text-slate-500">{remSec?.text}</span>
                          </div>
                        ) : (
                          <div>
                            <span className="font-bold text-gov-blue dark:text-blue-400 block text-[11px]">
                              15-Day Window
                            </span>
                            <span className="text-[10px] text-slate-500">{rem15.text}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                          isEscalated
                            ? 'bg-red-100 dark:bg-red-950/70 text-red-700 dark:text-red-300'
                            : item.status === 'RESOLVED'
                            ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300'
                            : 'bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300'
                        }`}>
                          {isEscalated ? 'Level-2 Escalated' : item.status === 'RESOLVED' ? 'Resolved' : '15-Day Seller Window'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleSelectToken(item.token)}
                            className="px-2.5 py-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                          >
                            Track
                          </button>
                          {isEscalated && (
                            <button
                              onClick={() => setNoticeModalGrievance(item)}
                              className="px-2.5 py-1.5 rounded bg-red-600 text-white hover:bg-red-500 text-xs font-bold flex items-center gap-1"
                            >
                              <FileText className="w-3 h-3" />
                              Notice
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: RAISE / ESCALATE TOKEN CONFIRMATION */}
      {escalateModalOpen && activeGrievance && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-gov-lg max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/80 text-red-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Raise Token #{activeGrievance.token}
                </h3>
                <p className="text-xs text-slate-500">
                  Escalate to Level-2 District Legal Metrology Enforcement Cell
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span>Commodity:</span>
                <strong>{activeGrievance.productName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Merchant:</span>
                <strong>{activeGrievance.merchantName}</strong>
              </div>
              <div className="flex justify-between">
                <span>GSTIN:</span>
                <strong className="font-mono">{activeGrievance.gstNumber}</strong>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Reason for Escalation:
              </label>
              <select
                value={escalationReason}
                onChange={(e) => setEscalationReason(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white mb-2"
              >
                <option value="Merchant failed to refund or replace within the 15-day statutory resolution window">
                  15 days elapsed without replacement or refund from seller
                </option>
                <option value="Merchant explicitly refused to take liability for damaged/expired product">
                  Merchant rejected return and refused to refund
                </option>
                <option value="Merchant delivered another defective or expired replacement commodity">
                  Replacement unit was also defective / expired
                </option>
                <option value="Seller customer care is unresponsive / contact number non-functional">
                  Seller contact details non-functional
                </option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-900 dark:text-red-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-red-600" />
                Statutory Effect of Raising Token:
              </div>
              <p className="text-[11px] leading-relaxed">
                An official <strong>Enforcement Summons (Section 36 & 49)</strong> will be issued to merchant GSTIN <strong>{activeGrievance.gstNumber}</strong>. A <strong>Secondary 7-Day Time Limit</strong> will be established for mandatory compliance, failing which penal prosecution will be initiated.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEscalateModalOpen(false)}
                className="px-4 py-2 rounded-gov bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmEscalation}
                className="px-5 py-2 rounded-gov bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/25 flex items-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Confirm & Issue Level-2 Summons
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: LEGAL METROLOGY SUMMONS CERTIFICATE MODAL */}
      {noticeModalGrievance && noticeModalGrievance.escalationDetails && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-gov-lg max-w-xl w-full p-6 border-2 border-red-500/40 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="text-center pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/80 text-red-600 mx-auto flex items-center justify-center mb-2">
                <Scale className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Government of India • Ministry of Consumer Affairs
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                DEPARTMENT OF LEGAL METROLOGY
              </h3>
              <p className="text-xs font-semibold text-red-600 dark:text-red-400 mt-0.5">
                STATUTORY SHOW-CAUSE SUMMONS & SECONDARY REDRESSAL NOTICE
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">Summons Notice No:</span>
                <strong className="text-red-600">{noticeModalGrievance.escalationDetails.legalNoticeNo}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Dispute Token Ref:</span>
                <strong>{noticeModalGrievance.token}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Respondent Merchant:</span>
                <strong className="font-sans">{noticeModalGrievance.merchantName}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Merchant GSTIN:</span>
                <strong>{noticeModalGrievance.gstNumber}</strong>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                SECONDARY STATUTORY TIME LIMIT: 7 CALENDAR DAYS
              </div>
              <p className="text-[11px] leading-relaxed">
                WHEREAS the consumer lodged Grievance {noticeModalGrievance.token} with purchase proof on bill #{noticeModalGrievance.billNumber} regarding damaged/expired commodity: <strong>"{noticeModalGrievance.productName}"</strong>;
                <br /><br />
                AND WHEREAS the mandatory 15-day primary resolution window provided to the respondent merchant lapsed without refund or replacement;
                <br /><br />
                NOW THEREFORE, under <strong>Section 36 & 49 of the Legal Metrology Act, 2009</strong>, you are hereby granted a <strong>Secondary Final Time Limit of 7 days</strong> (Deadline: {new Date(noticeModalGrievance.escalationDetails.secondaryDeadlineDate).toLocaleDateString()}) to either refund <strong>{noticeModalGrievance.amount}</strong> or deliver a fresh replacement. Failure to comply shall invite compounding penalties up to ₹25,000 and regulatory seizure.
              </p>
            </div>

            <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                Assigned Inspector: <strong>{noticeModalGrievance.escalationDetails.assignedOfficer}</strong>
              </div>
              <button
                onClick={() => setNoticeModalGrievance(null)}
                className="px-4 py-2 rounded-gov bg-gov-blue text-white text-xs font-bold"
              >
                Close Summons
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
