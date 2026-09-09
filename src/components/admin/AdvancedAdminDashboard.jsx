import React, { useState } from 'react';
import {
  ShieldAlert,
  BarChart3,
  TrendingUp,
  AlertOctagon,
  Building2,
  FileCheck,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  Scale,
  RefreshCw,
  Search,
  Check,
  Mail
} from 'lucide-react';
import { consumerReportService } from '../../services/consumerReportService';
import { manufacturerDb } from '../../services/manufacturerDbService';
import { jsPDF } from 'jspdf';

export default function AdvancedAdminDashboard() {
  const [reports, setReports] = useState(consumerReportService.getAll());
  const [reportFilter, setReportFilter] = useState('ALL');
  const [successToast, setSuccessToast] = useState('');
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleFrequency, setScheduleFrequency] = useState('Weekly');
  const [recipientEmail, setRecipientEmail] = useState('controller.metrology@nic.in');

  const stats = consumerReportService.getStats();
  const manufacturers = manufacturerDb.getAll();
  const repeatOffenders = manufacturerDb.getRepeatOffenders();
  const highRiskMfgs = manufacturerDb.getHighRisk();

  const handleUpdateStatus = (id, newStatus, note = '') => {
    consumerReportService.updateStatus(id, newStatus, note);
    setReports([...consumerReportService.getAll()]);
    setSuccessToast(`Grievance ${id} updated to: ${newStatus}`);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = ['Report ID', 'Date', 'Product Name', 'Brand', 'Store', 'City', 'Violation Category', 'Status', 'Penalty Recommended'];
    const rows = reports.map(r => [
      r.id,
      `"${r.date}"`,
      `"${r.productName}"`,
      `"${r.brand}"`,
      `"${r.storeName}"`,
      `"${r.city}"`,
      `"${r.violationCategory}"`,
      `"${r.status}"`,
      `"${r.penaltyRecommended}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `National_Metrology_Surveillance_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF Export
  const handleExportPdf = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('GOVERNMENT OF INDIA • DIRECTORATE OF LEGAL METROLOGY', 14, 15);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Enforcement Surveillance Digest • Exported: ${new Date().toLocaleDateString('en-IN')}`, 14, 22);

    doc.setFont('helvetica', 'bold');
    doc.text('Key National Metrics:', 14, 32);
    doc.setFont('helvetica', 'normal');
    doc.text(`• Total Active Citizen Complaints: ${stats.total}`, 14, 38);
    doc.text(`• Pending Statutory Investigation: ${stats.pending + stats.underInvestigation}`, 14, 44);
    doc.text(`• High Risk Manufacturers Under Watch: ${highRiskMfgs.length}`, 14, 50);
    doc.text(`• Repeat Offender Entities: ${repeatOffenders.length}`, 14, 56);

    let y = 68;
    doc.setFont('helvetica', 'bold');
    doc.text('Recent Citizen Grievances & Action Notices:', 14, y);
    y += 8;

    reports.slice(0, 8).forEach(r => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(`${r.id} | ${r.productName} (${r.brand}) - ${r.status}`, 14, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text(`Store: ${r.storeName}, ${r.city} | Category: ${r.violationCategory}`, 14, y + 4);
      y += 10;
    });

    doc.save(`Legal_Metrology_Admin_Digest_${Date.now()}.pdf`);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    setScheduleModalOpen(false);
    setSuccessToast(`Automated ${scheduleFrequency} surveillance digest scheduled to: ${recipientEmail}`);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  const filteredReports = reports.filter(r => {
    if (reportFilter === 'PENDING') return r.status === 'Pending Review' || r.status === 'Under Investigation';
    if (reportFilter === 'NOTICED') return r.status === 'Notice Issued';
    if (reportFilter === 'RESOLVED') return r.status === 'Resolved';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Toast */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-600 text-white shadow-xl flex items-center justify-between text-xs font-bold animate-in fade-in">
          <span>{successToast}</span>
          <button onClick={() => setSuccessToast('')}><XCircle className="w-4 h-4" /></button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-gov-blue dark:text-blue-300 text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Enforcement Regulatory Command Center
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Advanced Regulators & Enforcement Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Triaging citizen complaints, issuing Section 36 statutory notices, tracking repeat offender manufacturers, and scheduled dispatch.
          </p>
        </div>

        {/* Top Export & Schedule Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setScheduleModalOpen(true)}
            className="px-3 py-2 rounded-gov text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 flex items-center gap-1.5 shadow-xs"
          >
            <Calendar className="w-4 h-4 text-gov-blue dark:text-blue-400" />
            Schedule Reports
          </button>
          <button
            onClick={handleExportCsv}
            className="px-3 py-2 rounded-gov text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={handleExportPdf}
            className="px-4 py-2 rounded-gov text-xs font-bold bg-gov-blue text-white hover:bg-gov-blueLight shadow-md shadow-gov-blue/20 flex items-center gap-1.5"
          >
            <FileCheck className="w-4 h-4" />
            Export Digest PDF
          </button>
        </div>
      </div>

      {/* High-Level Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-gov-blue flex items-center justify-center font-bold text-sm">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">National Inspections</span>
            <h4 className="font-black text-lg text-slate-900 dark:text-white">12,480 Units</h4>
            <span className="text-[10px] text-emerald-600 font-semibold">+18% MoM Surge</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Active Citizen Complaints</span>
            <h4 className="font-black text-lg text-amber-600">{stats.pending + stats.underInvestigation} Queued</h4>
            <span className="text-[10px] text-slate-400">{stats.total} Lifetime Reports</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold text-sm">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Repeat Corporate Offenders</span>
            <h4 className="font-black text-lg text-red-600">{repeatOffenders.length} Entities</h4>
            <span className="text-[10px] text-red-500 font-semibold">Section 36(1) Escrow</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Average National Score</span>
            <h4 className="font-black text-lg text-emerald-600">88.4%</h4>
            <span className="text-[10px] text-emerald-600 font-semibold">Target &gt; 85% Met</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column: Citizen Grievance Triage vs High-Risk Manufacturers List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Consumer Reports Moderation Queue */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Citizen Market Surveillance Queue
              </h3>
              <p className="text-xs text-slate-500">
                Incoming field reports submitted by consumers via Mobile Scan Mode
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              {['ALL', 'PENDING', 'NOTICED', 'RESOLVED'].map((f) => (
                <button
                  key={f}
                  onClick={() => setReportFilter(f)}
                  className={`px-2.5 py-1 rounded-gov font-bold text-[11px] transition-colors ${
                    reportFilter === f
                      ? 'bg-gov-blue text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[520px] overflow-y-auto">
            {filteredReports.map((report) => {
              const isNotice = report.status === 'Notice Issued';
              const isResolved = report.status === 'Resolved';
              const isPending = report.status === 'Pending Review' || report.status === 'Under Investigation';

              return (
                <div key={report.id} className="p-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-gov-blue dark:text-blue-400">
                          {report.id}
                        </span>
                        <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                          {report.productName}
                        </span>
                        <span className="text-[11px] text-slate-400">({report.brand})</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Store: <strong>{report.storeName}</strong> ({report.city}, {report.state}) • Date: {report.date}
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase self-start sm:self-auto ${
                      isNotice ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
                      isResolved ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {report.status}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
                    <div className="font-bold text-red-600 dark:text-red-400 mb-0.5">
                      Alleged Infraction: {report.violationCategory}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                      "{report.description}"
                    </p>
                    {report.penaltyRecommended && (
                      <div className="mt-1.5 text-[10px] text-gov-blue dark:text-blue-400 font-semibold">
                        Action Order: {report.penaltyRecommended}
                      </div>
                    )}
                  </div>

                  {/* Regulator Actions Bar */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => handleUpdateStatus(report.id, 'Notice Issued', 'Section 36(1) Notice dispatched to retailer/packer')}
                      className="px-2.5 py-1 rounded text-[11px] font-bold bg-red-600 hover:bg-red-700 text-white shadow-xs flex items-center gap-1"
                    >
                      <Scale className="w-3 h-3" />
                      Issue Statutory Notice
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(report.id, 'Under Investigation', 'Assigned North Zone Inspector for surprise test purchase')}
                      className="px-2.5 py-1 rounded text-[11px] font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-xs"
                    >
                      Assign Inspector
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(report.id, 'Resolved', 'Retailer rectified price sticker and paid ₹10,000 compounding fee')}
                      className="px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                    >
                      Compound & Resolve
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (4 cols): Repeat Offenders & High-Risk Entities Watchlist */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-gov p-5 border border-slate-200/90 dark:border-slate-800 shadow-soft">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              High-Risk Repeat Offenders
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Corporates under active compounding review
            </p>

            <div className="space-y-3">
              {highRiskMfgs.map((mfg) => (
                <div
                  key={mfg.id}
                  className="p-3.5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/20 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{mfg.name}</span>
                    <span className="text-[10px] font-bold px-1.5 rounded bg-red-600 text-white">
                      {mfg.riskScore} Risk
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Compliance Rate: <strong>{mfg.complianceRate}%</strong> • Fines: {mfg.penaltiesPaid}
                  </div>
                  <div className="text-[10px] font-mono text-red-600 font-semibold">
                    {mfg.previousViolations.length} statutory violations logged
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SCHEDULE REPORTS MODAL */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-gov-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-5 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gov-blue" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Schedule Automated Enforcement Digest
                </h3>
              </div>
              <button onClick={() => setScheduleModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Recipient Officer Email
                </label>
                <input
                  type="email"
                  required
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov font-mono text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Dispatch Frequency
                </label>
                <select
                  value={scheduleFrequency}
                  onChange={(e) => setScheduleFrequency(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov text-xs"
                >
                  <option value="Daily Morning Digest (08:00 AM)">Daily Morning Digest (08:00 AM)</option>
                  <option value="Weekly (Every Monday)">Weekly (Every Monday)</option>
                  <option value="Monthly Statutory Summary">Monthly Statutory Summary</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Digest Format
                </label>
                <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800 text-slate-500 font-mono text-[11px]">
                  PDF Statutory Report + Encrypted CSV Dataset Attachment
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setScheduleModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-gov text-xs font-bold bg-gov-blue text-white hover:bg-gov-blueLight flex items-center gap-1.5 shadow-md"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Confirm Automated Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
