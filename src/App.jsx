import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

// Layout
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Dashboard Components
import KPICards from './components/dashboard/KPICards';
import ScannerSection from './components/dashboard/ScannerSection';
import ComplianceResults from './components/dashboard/ComplianceResults';
import ViolationSummary from './components/dashboard/ViolationSummary';
import ProductIngredientsSplitView from './components/dashboard/ProductIngredientsSplitView';
import AnalyticsSection from './components/dashboard/AnalyticsSection';
import ReportsTable from './components/dashboard/ReportsTable';

// Dedicated Pages
import StudioScannerPage from './components/scanner/StudioScannerPage';
import UploadLabelPage from './components/upload/UploadLabelPage';
import ProductRepositoryPage from './components/repository/ProductRepositoryPage';
import ViolationsPage from './components/violations/ViolationsPage';
import SuggestionsPage from './components/suggestions/SuggestionsPage';
import AnalyticsPage from './components/analytics/AnalyticsPage';
import InspectorDashboardPage from './components/inspector/InspectorDashboardPage';
import SettingsPage from './components/settings/SettingsPage';

// Modals
import ProductDetailsModal from './components/repository/ProductDetailsModal';
import ReportModal from './components/modals/ReportModal';
import CameraScanModal from './components/modals/CameraScanModal';
import QrVerificationModal from './components/modals/QrVerificationModal';
import HelpModal from './components/modals/HelpModal';

// Data & Services
import { SAMPLE_PRODUCTS } from './data/sampleProducts';
import { simulateAIOcrScan } from './services/ocrEngine';
import { voiceAssistant } from './services/voiceAssistant';

export default function App() {
  // Navigation & Theme
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected Commodity & State
  const [selectedProduct, setSelectedProduct] = useState(SAMPLE_PRODUCTS[1]); // Fortune Sunflower Oil (has warning)
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Modals
  const [detailsModalProduct, setDetailsModalProduct] = useState(null);
  const [reportModalProduct, setReportModalProduct] = useState(null);
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  // Synchronize Dark Mode on <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Trigger simulated AI OCR scanning
  const handleAnalyze = async (prod = null) => {
    const target = prod || selectedProduct;
    setIsAnalyzing(true);

    try {
      const evaluation = await simulateAIOcrScan(target, 1200);
      const updatedProduct = {
        ...target,
        complianceScore: evaluation.complianceScore,
        status: evaluation.status,
        riskLevel: evaluation.riskLevel,
        declarations: evaluation.declarations,
        violations: evaluation.violations,
        recommendations: evaluation.recommendations
      };

      setSelectedProduct(updatedProduct);

      // Celebrate if high score!
      if (evaluation.complianceScore >= 90) {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } catch (e) {
      console.error('Scan error:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Voice Assistant Readout
  const handleToggleVoice = () => {
    if (isSpeaking) {
      voiceAssistant.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      voiceAssistant.speakComplianceSummary(selectedProduct, language, () => {
        setIsSpeaking(false);
      });
    }
  };

  // Quick Action from Camera Modal
  const handleCaptureFromCamera = (capturedProduct) => {
    setSelectedProduct(capturedProduct);
    handleAnalyze(capturedProduct);
  };

  // Filtered Products for Search
  const handleSelectSearchedProduct = (prod) => {
    setSelectedProduct(prod);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content Area (offset by sidebar width on desktop) */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        {/* Top Navbar */}
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          language={language}
          setLanguage={setLanguage}
          isSpeaking={isSpeaking}
          onToggleVoice={handleToggleVoice}
          onOpenHelp={() => setHelpModalOpen(true)}
          onOpenQrModal={() => setQrModalOpen(true)}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Global Search Autocomplete Overlay */}
        {searchTerm && (
          <div className="mx-4 sm:mx-6 mt-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl z-20">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-2">
              Matching Commodities & Reports ({SAMPLE_PRODUCTS.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).length})
            </div>
            <div className="space-y-1 max-h-52 overflow-y-auto">
              {SAMPLE_PRODUCTS.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.batchNo.toLowerCase().includes(searchTerm.toLowerCase())
              ).map(p => (
                <div
                  key={p.id}
                  onClick={() => handleSelectSearchedProduct(p)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{p.name}</span>
                    <span className="text-slate-500 block text-[10px]">{p.brand} • Batch: {p.batchNo}</span>
                  </div>
                  <span className={`font-bold text-xs ${p.complianceScore >= 80 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {p.complianceScore}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Body Pages View Container */}
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
          {/* View 1: Dashboard Page */}
          {activePage === 'dashboard' && (
            <div className="space-y-6">
              {/* KPI Cards at top */}
              <KPICards />

              {/* Main 3-Column Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Section 1: AI Product Scanner (4 cols on lg) */}
                <div className="lg:col-span-4">
                  <ScannerSection
                    selectedProduct={selectedProduct}
                    onSelectProduct={(p, customImg = null) => {
                      setSelectedProduct(p);
                    }}
                    onAnalyze={() => handleAnalyze()}
                    isAnalyzing={isAnalyzing}
                    onOpenCameraModal={() => setCameraModalOpen(true)}
                  />
                </div>

                {/* Section 2: Detected Declarations & Score (4 cols on lg) */}
                <div className="lg:col-span-4">
                  <ComplianceResults
                    product={selectedProduct}
                    onSelectField={(decl) => setHelpModalOpen(true)}
                  />
                </div>

                {/* Section 3: Violation Summary & AI Suggestions (4 cols on lg) */}
                <div className="lg:col-span-4">
                  <ViolationSummary
                    product={selectedProduct}
                    onOpenViolationsPage={() => setActivePage('violations')}
                  />
                </div>
              </div>

              {/* Synchronized Dual-Panel: Product Details (One Side) & Ingredients (Other Side) */}
              <ProductIngredientsSplitView product={selectedProduct} />

              {/* Analytics Section (Recharts: Line, Pie, Bar) */}
              <AnalyticsSection />

              {/* Compliance Reports Registry Table */}
              <ReportsTable
                onSelectProduct={(p) => setDetailsModalProduct(p)}
                onViewReport={(p) => setReportModalProduct(p)}
              />
            </div>
          )}

          {/* View 2: Dedicated Scan Studio */}
          {activePage === 'scan' && (
            <StudioScannerPage
              selectedProduct={selectedProduct}
              onSelectProduct={setSelectedProduct}
              onAnalyze={() => handleAnalyze()}
              isAnalyzing={isAnalyzing}
              onToggleVoice={handleToggleVoice}
              language={language}
            />
          )}

          {/* View 3: Upload Label */}
          {activePage === 'upload' && (
            <UploadLabelPage
              onAnalyzeProduct={(p) => {
                setSelectedProduct(p);
                setActivePage('scan');
                handleAnalyze(p);
              }}
            />
          )}

          {/* View 4: Compliance Reports Page */}
          {activePage === 'reports' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Compliance Audit & Verification Registry
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Complete official inspection reports, statutory scores, and legal penalty notices.
                </p>
              </div>

              <ReportsTable
                onSelectProduct={(p) => setDetailsModalProduct(p)}
                onViewReport={(p) => setReportModalProduct(p)}
              />
            </div>
          )}

          {/* View 5: Product Repository */}
          {activePage === 'repository' && (
            <ProductRepositoryPage
              onSelectProduct={(p) => setSelectedProduct(p)}
              onOpenDetailsModal={(p) => setDetailsModalProduct(p)}
              onReScan={(p) => {
                setSelectedProduct(p);
                setActivePage('scan');
                handleAnalyze(p);
              }}
            />
          )}

          {/* View 6: Violations */}
          {activePage === 'violations' && (
            <ViolationsPage
              onSelectProduct={(p) => {
                setSelectedProduct(p);
                setActivePage('scan');
              }}
              onViewReport={(p) => setReportModalProduct(p)}
            />
          )}

          {/* View 7: AI Suggestions */}
          {activePage === 'suggestions' && (
            <SuggestionsPage
              onSelectProduct={(p) => {
                setSelectedProduct(p);
                setActivePage('scan');
              }}
            />
          )}

          {/* View 8: Analytics */}
          {activePage === 'analytics' && (
            <AnalyticsPage />
          )}

          {/* View 9: Inspector Portal */}
          {activePage === 'inspector' && (
            <InspectorDashboardPage />
          )}

          {/* View 10: Settings */}
          {activePage === 'settings' && (
            <SettingsPage
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              language={language}
              setLanguage={setLanguage}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer />
      </div>

      {/* MODALS */}
      {/* 1. Product Details Modal */}
      {detailsModalProduct && (
        <ProductDetailsModal
          product={detailsModalProduct}
          onClose={() => setDetailsModalProduct(null)}
          onGenerateReport={(p) => setReportModalProduct(p)}
        />
      )}

      {/* 2. Official Inspection Report Certificate Modal */}
      {reportModalProduct && (
        <ReportModal
          product={reportModalProduct}
          onClose={() => setReportModalProduct(null)}
        />
      )}

      {/* 3. Real-Time Camera Scan Modal */}
      <CameraScanModal
        isOpen={cameraModalOpen}
        onClose={() => setCameraModalOpen(false)}
        onCaptureProduct={handleCaptureFromCamera}
      />

      {/* 4. QR Code Verification Modal */}
      <QrVerificationModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        onVerifiedProduct={(p) => {
          setSelectedProduct(p);
          setActivePage('scan');
        }}
      />

      {/* 5. Help Reference Modal */}
      <HelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />
    </div>
  );
}
