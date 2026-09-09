/**
 * Consumer Report & Market Surveillance Service
 * Stores citizen-reported product infractions, evidence photos,
 * and feeds the Regulator / Admin inspection workflow.
 */

const INITIAL_REPORTS = [
  {
    id: 'CR-2026-8819',
    date: '2026-09-08 11:34',
    productName: 'ChocoDelight Dark Truffle Bar',
    brand: 'ChocoDelight European Imports',
    storeName: 'Reliance Fresh Supermart, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    violationCategory: 'Over-MRP Charging / Dual MRP Sticker',
    mrpPrinted: '₹220.00',
    priceCharged: '₹280.00',
    description: 'Store pasted white sticker of ₹280 over original printed MRP of ₹220. Refused to sell at printed rate.',
    status: 'Notice Issued',
    severity: 'Critical',
    penaltyRecommended: 'Section 36(1) Notice issued to retailer & distributor'
  },
  {
    id: 'CR-2026-8812',
    date: '2026-09-07 16:15',
    productName: 'Glow & Bright Night Fairness Cream',
    brand: 'Glow Naturals Herbals',
    storeName: 'Gupta Medical Hall, Chandni Chowk',
    city: 'New Delhi',
    state: 'Delhi',
    violationCategory: 'Missing Expiry & Altered Batch Stamp',
    mrpPrinted: '₹145.00',
    priceCharged: '₹145.00',
    description: 'Crimped top has missing expiry date. Crimp looks smeared with acetone.',
    status: 'Under Investigation',
    severity: 'Critical',
    penaltyRecommended: 'Field Inspector assigned for sample seizure'
  },
  {
    id: 'CR-2026-8804',
    date: '2026-09-06 09:20',
    productName: 'Sunrise Pure Mustard Oil 1L',
    brand: 'Emami Agrotech',
    storeName: 'Local Kirana Store, Salt Lake',
    city: 'Kolkata',
    state: 'West Bengal',
    violationCategory: 'Missing Unit Sale Price (USP)',
    mrpPrinted: '₹165.00',
    priceCharged: '₹165.00',
    description: 'Pouch does not show price per 100ml / 1kg as per 2022 amendments.',
    status: 'Resolved',
    severity: 'Warning',
    penaltyRecommended: 'Rectification advisory delivered to packer'
  }
];

class ConsumerReportService {
  constructor() {
    this.storageKey = 'lm_consumer_reports_v1';
    this.reports = this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      // ignore
    }
    return INITIAL_REPORTS;
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.reports));
    } catch (e) {
      // ignore
    }
  }

  getAll() {
    return this.reports;
  }

  getPending() {
    return this.reports.filter(r => r.status === 'Pending Review' || r.status === 'Under Investigation');
  }

  addReport(data) {
    const newReport = {
      id: `CR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      productName: data.productName || 'Packaged Commodity',
      brand: data.brand || 'Unknown Brand',
      storeName: data.storeName || 'Retail Outlet',
      city: data.city || 'National Market',
      state: data.state || 'Delhi',
      violationCategory: data.violationCategory || 'General Non-Compliance',
      mrpPrinted: data.mrpPrinted || 'N/A',
      priceCharged: data.priceCharged || 'N/A',
      description: data.description || 'Consumer noticed non-compliant packaging.',
      photoUrl: data.photoUrl || null,
      status: 'Pending Review',
      severity: data.severity || 'Critical',
      penaltyRecommended: 'Awaiting Metrology Inspector triage'
    };

    this.reports.unshift(newReport);
    this.save();
    return newReport;
  }

  updateStatus(reportId, newStatus, penaltyNote = '') {
    const report = this.reports.find(r => r.id === reportId);
    if (report) {
      report.status = newStatus;
      if (penaltyNote) report.penaltyRecommended = penaltyNote;
      this.save();
    }
    return report;
  }

  getStats() {
    const total = this.reports.length;
    const pending = this.reports.filter(r => r.status === 'Pending Review').length;
    const underInvestigation = this.reports.filter(r => r.status === 'Under Investigation').length;
    const noticeIssued = this.reports.filter(r => r.status === 'Notice Issued').length;
    const resolved = this.reports.filter(r => r.status === 'Resolved').length;

    return {
      total,
      pending,
      underInvestigation,
      noticeIssued,
      resolved
    };
  }
}

export const consumerReportService = new ConsumerReportService();
