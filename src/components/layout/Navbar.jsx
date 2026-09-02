import React, { useState } from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Menu,
  Languages,
  CheckCircle2,
  AlertTriangle,
  QrCode
} from 'lucide-react';
import { MULTI_LANG_STRINGS } from '../../data/legalMetrologyRules';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  isSpeaking,
  onToggleVoice,
  onOpenHelp,
  onOpenQrModal,
  onToggleSidebar
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search product, report or batch number..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 rounded-gov text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-gov-blue/50 focus:border-gov-blue transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Voice Assistant "Read Compliance Status" */}
        <button
          onClick={onToggleVoice}
          title={isSpeaking ? 'Stop Voice Assistant' : 'Read Compliance Status (AI Voice)'}
          className={`px-2.5 py-1.5 rounded-gov text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
            isSpeaking
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100'
          }`}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Stop Audio</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden md:inline">Voice Assistant</span>
            </>
          )}
        </button>

        {/* QR Code Quick Verification */}
        <button
          onClick={onOpenQrModal}
          title="Verify via QR Code"
          className="p-2 rounded-gov text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hidden sm:flex items-center gap-1.5 text-xs font-medium"
        >
          <QrCode className="w-4 h-4 text-gov-blue dark:text-blue-400" />
          <span className="hidden lg:inline">Verify QR</span>
        </button>

        {/* Multi-Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-gov text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-center gap-1.5 text-xs font-medium"
          >
            <Languages className="w-4 h-4 text-gov-blue dark:text-blue-400" />
            <span className="hidden sm:inline">{currentLang.native}</span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100 dark:border-slate-700">
                Select Language
              </div>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                    language === l.code ? 'font-bold text-gov-blue dark:text-blue-400 bg-blue-50/60 dark:bg-blue-900/30' : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span>{l.native}</span>
                  <span className="text-[10px] text-slate-400">({l.label})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark / Light Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle Theme"
          className="p-2 rounded-gov text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition-colors"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-gov text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute 1 top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="absolute 1 top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-2 z-50 animate-in fade-in">
              <div className="px-3 py-1.5 flex items-center justify-between border-b border-slate-100 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-800 dark:text-white">Active Alerts (3)</span>
                <span className="text-[10px] text-gov-blue dark:text-blue-400 cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/60">
                <div className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex gap-2 text-xs">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">Critical Violation Detected</div>
                    <div className="text-[11px] text-slate-500">Aura Cosmetics - Missing Expiry & MRP taxes</div>
                    <span className="text-[9px] text-slate-400">10 mins ago</span>
                  </div>
                </div>
                <div className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex gap-2 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">Font Size Warning</div>
                    <div className="text-[11px] text-slate-500">Fortune Sunflower Oil 1L pouch (2.4mm &lt; 3.0mm)</div>
                    <span className="text-[9px] text-slate-400">1 hour ago</span>
                  </div>
                </div>
                <div className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">Audit Verified Passed</div>
                    <div className="text-[11px] text-slate-500">Aashirvaad Atta 5kg batch ITC-MP-260811</div>
                    <span className="text-[9px] text-slate-400">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help Button */}
        <button
          onClick={onOpenHelp}
          title="Legal Metrology Rules Reference Guide"
          className="p-2 rounded-gov text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80"
        >
          <HelpCircle className="w-4 h-4 text-slate-500" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-full bg-gov-blue text-white flex items-center justify-center font-bold text-xs ring-2 ring-gov-blue/20">
            SKG
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              S. K. Gupta
            </div>
            <div className="text-[10px] text-slate-600 dark:text-slate-400">
              Senior Metrology Inspector
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
