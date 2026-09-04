import React from 'react';
import {
  LayoutDashboard,
  Scan,
  UploadCloud,
  FileCheck,
  PackageSearch,
  AlertOctagon,
  Sparkles,
  BarChart3,
  ShieldAlert,
  Settings,
  X,
  Scale,
  Award,
  MessageSquareWarning
} from 'lucide-react';

export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'scan', label: 'Scan Product', icon: Scan, badge: 'Live AI' },
  { id: 'upload', label: 'Upload Label', icon: UploadCloud },
  { id: 'grievance', label: 'Grievance & Dispute Bot', icon: MessageSquareWarning, badge: '15-Day Token' },
  { id: 'reports', label: 'Compliance Reports', icon: FileCheck },
  { id: 'repository', label: 'Product Repository', icon: PackageSearch },
  { id: 'violations', label: 'Violations', icon: AlertOctagon, alertCount: 4 },
  { id: 'suggestions', label: 'AI Suggestions', icon: Sparkles },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'inspector', label: 'Inspector Portal', icon: ShieldAlert },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo & Header */}
        <div>
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gov-blue text-white flex items-center justify-center shadow-md shadow-gov-blue/20">
                <Scale className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                    Legal Metrology
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900/60 text-gov-blue dark:text-blue-300">
                    AI
                  </span>
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">
                  Rules, 2011 Verification
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Official Registry Badge */}
          <div className="mx-3 mt-3 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/80 rounded-lg border border-blue-100 dark:border-slate-700/80 flex items-center gap-2">
            <Award className="w-4 h-4 text-gov-blue dark:text-blue-400 shrink-0" />
            <div className="text-[11px] font-semibold text-gov-navy dark:text-slate-200">
              National Compliance Registry
            </div>
          </div>

          {/* Navigation Menu List */}
          <nav className="p-3 space-y-1 mt-1 overflow-y-auto max-h-[calc(100vh-210px)]">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-gov text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-gov-blue text-white shadow-md shadow-gov-blue/25 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-amber-300' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {item.alertCount && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-red-400 text-white' : 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-300'
                      }`}
                    >
                      {item.alertCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Officer Status Card */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-gov-blue/10 dark:bg-blue-900/40 text-gov-blue dark:text-blue-300 flex items-center justify-center font-bold text-xs">
              SKG
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                S. K. Gupta
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Senior Inspector (Active)
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
