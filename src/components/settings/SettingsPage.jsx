import React, { useState } from 'react';
import {
  Settings,
  Moon,
  Sun,
  Languages,
  Sliders,
  Bell,
  Scale,
  Save,
  CheckCircle,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function SettingsPage({
  darkMode,
  setDarkMode,
  language,
  setLanguage
}) {
  const [minScoreThreshold, setMinScoreThreshold] = useState(80);
  const [autoIssueNotices, setAutoIssueNotices] = useState(false);
  const [ocrEngineModel, setOcrEngineModel] = useState('v2.4-neural-enhanced');
  const [rulesAmendmentYear, setRulesAmendmentYear] = useState('2022-usp');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-gov-blue dark:text-blue-300 text-xs font-bold mb-2">
          <Settings className="w-3.5 h-3.5" /> System Configuration
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          System Preferences & Metrology Standards
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure rule compliance thresholds, OCR vision models, and administrative parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Appearance & Interface */}
        <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b pb-2 border-slate-100 dark:border-slate-800">
            <Sliders className="w-4 h-4 text-gov-blue" />
            Display & Regional Settings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Dark Mode Toggle */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Color Theme</span>
                <span className="text-[11px] text-slate-500">Dark or light dashboard UI</span>
              </div>
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="px-3 py-1.5 rounded-gov bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold flex items-center gap-1.5"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>

            {/* Language Switcher */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">Default Language</span>
                <span className="text-[11px] text-slate-500">Official language for readouts</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="p-1.5 rounded-gov bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-semibold"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Legal Metrology Verification Engine Rules */}
        <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b pb-2 border-slate-100 dark:border-slate-800">
            <Scale className="w-4 h-4 text-gov-blue" />
            Statutory Rule Amendments & Thresholds
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                Legal Metrology (Packaged Commodities) Rules Edition:
              </label>
              <select
                value={rulesAmendmentYear}
                onChange={(e) => setRulesAmendmentYear(e.target.value)}
                className="w-full p-2.5 rounded-gov bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              >
                <option value="2022-usp">2022 Amendment (Mandatory Unit Sale Price & Metric Standards)</option>
                <option value="2021-ecom">2021 Amendment (E-Commerce declarations & Country of Origin)</option>
                <option value="2017-standard">2017 Amendment (Medical devices & Barcode rules)</option>
                <option value="2011-base">Principal Rules, 2011 Base Standards</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-800 dark:text-slate-200">
                  Minimum Compliance Score Threshold for Passing:
                </label>
                <span className="font-extrabold text-emerald-600">{minScoreThreshold}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                step="5"
                value={minScoreThreshold}
                onChange={(e) => setMinScoreThreshold(Number(e.target.value))}
                className="w-full accent-gov-blue"
              />
              <span className="text-[10px] text-slate-400">
                Products scoring below {minScoreThreshold}% are flagged for Show Cause Notice under Section 36.
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Automatic Show Cause Notice Dispatch
                </span>
                <span className="text-[11px] text-slate-500">
                  Automatically generate Section 36 notice for packages missing MRP or Expiry dates
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoIssueNotices}
                onChange={(e) => setAutoIssueNotices(e.target.checked)}
                className="w-4 h-4 rounded text-gov-blue accent-gov-blue"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between">
          {savedSuccess ? (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle className="w-4 h-4" /> Preferences saved successfully!
            </span>
          ) : (
            <span className="text-xs text-slate-400">Changes apply to all active sessions.</span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-gov text-xs font-bold bg-gov-blue hover:bg-gov-blueLight text-white shadow-md shadow-gov-blue/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
