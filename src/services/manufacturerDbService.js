/**
 * Manufacturer Compliance History Tracking Service
 * Tracks enterprise and regional manufacturers, historical inspections,
 * compliance rates, repeat offender penalties, and dynamic risk scoring.
 */

const INITIAL_MANUFACTURERS = [
  {
    id: 'mfg-001',
    name: 'ITC Limited',
    headquarters: 'Kolkata, West Bengal',
    registeredCin: 'L16005WB1910PLC001985',
    totalProductsChecked: 148,
    complianceRate: 98.2,
    riskScore: 12,
    riskCategory: 'Low Risk',
    lastInspectionDate: '2026-09-01',
    previousViolations: [],
    repeatOffender: false,
    penaltiesPaid: '₹0',
    topCategories: ['Staples & Flour', 'Biscuits & Snacks', 'Personal Care']
  },
  {
    id: 'mfg-002',
    name: 'Adani Wilmar Ltd',
    headquarters: 'Ahmedabad, Gujarat',
    registeredCin: 'L15146GJ1999PLC035320',
    totalProductsChecked: 112,
    complianceRate: 84.5,
    riskScore: 36,
    riskCategory: 'Medium Risk',
    lastInspectionDate: '2026-08-27',
    previousViolations: [
      { id: 'v-mfg-01', date: '2026-06-12', rule: 'Rule 6(1)(e)', description: 'Missing Unit Sale Price on 1L pouch', penalty: '₹10,000 Paid' },
      { id: 'v-mfg-02', date: '2025-11-04', rule: 'Rule 7', description: 'Font height 2.2mm below 3.0mm requirement', penalty: 'Rectification Order' }
    ],
    repeatOffender: false,
    penaltiesPaid: '₹10,000',
    topCategories: ['Edible Oils & Fats', 'Pulses', 'Sugar']
  },
  {
    id: 'mfg-003',
    name: 'Glow Naturals Herbals Pvt Ltd',
    headquarters: 'Baddi, Himachal Pradesh',
    registeredCin: 'U24233HP2018PTC007142',
    totalProductsChecked: 34,
    complianceRate: 41.2,
    riskScore: 88,
    riskCategory: 'High Risk',
    lastInspectionDate: '2026-08-19',
    previousViolations: [
      { id: 'v-mfg-03', date: '2026-08-19', rule: 'Rule 6(1)(a)', description: 'Missing postal PIN code & registered entity name', penalty: 'Notice Issued' },
      { id: 'v-mfg-04', date: '2026-04-10', rule: 'Rule 6(1)(e)', description: 'Price printed without "incl. of all taxes"', penalty: '₹25,000 Fine' },
      { id: 'v-mfg-05', date: '2025-12-01', rule: 'Rule 6(1)(d)', description: 'Batch number missing on crimp', penalty: 'Notice' }
    ],
    repeatOffender: true,
    penaltiesPaid: '₹25,000',
    topCategories: ['Cosmetics & Personal Care', 'Herbal Creams']
  },
  {
    id: 'mfg-004',
    name: 'ChocoDelight European Imports',
    headquarters: 'Mumbai, Maharashtra',
    registeredCin: 'U51909MH2021PTC362109',
    totalProductsChecked: 29,
    complianceRate: 34.0,
    riskScore: 92,
    riskCategory: 'High Risk',
    lastInspectionDate: '2026-09-04',
    previousViolations: [
      { id: 'v-mfg-06', date: '2026-09-04', rule: 'Rule 6(1)(g)', description: 'Missing Country of Origin on imported chocolate', penalty: 'Batch Holding Notice' },
      { id: 'v-mfg-07', date: '2026-07-22', rule: 'Rule 6(1)(e)', description: 'Euro price sticker without INR MRP', penalty: '₹50,000 Fine' },
      { id: 'v-mfg-08', date: '2026-02-15', rule: 'Rule 6(1)(a)', description: 'Importer postal address missing', penalty: 'Section 36 Notice' }
    ],
    repeatOffender: true,
    penaltiesPaid: '₹50,000',
    topCategories: ['Imported Confectionery', 'Snacks']
  },
  {
    id: 'mfg-005',
    name: 'Amul (GCMMF)',
    headquarters: 'Anand, Gujarat',
    registeredCin: 'COOP-GJ-1973',
    totalProductsChecked: 195,
    complianceRate: 99.1,
    riskScore: 8,
    riskCategory: 'Low Risk',
    lastInspectionDate: '2026-09-02',
    previousViolations: [],
    repeatOffender: false,
    penaltiesPaid: '₹0',
    topCategories: ['Dairy & Milk', 'Butter & Ghee', 'Ice Creams']
  },
  {
    id: 'mfg-006',
    name: 'Nestlé India Limited',
    headquarters: 'New Delhi / Gurgaon',
    registeredCin: 'L15202DL1959PLC003786',
    totalProductsChecked: 164,
    complianceRate: 95.8,
    riskScore: 16,
    riskCategory: 'Low Risk',
    lastInspectionDate: '2026-08-30',
    previousViolations: [
      { id: 'v-mfg-09', date: '2025-09-14', rule: 'Rule 7', description: 'Net weight font size warning on 35g bar', penalty: 'Rectification' }
    ],
    repeatOffender: false,
    penaltiesPaid: '₹0',
    topCategories: ['Packaged Foods', 'Beverages', 'Chocolates']
  },
  {
    id: 'mfg-007',
    name: 'Hindustan Unilever Limited',
    headquarters: 'Mumbai, Maharashtra',
    registeredCin: 'L15140MH1933PLC002030',
    totalProductsChecked: 210,
    complianceRate: 96.4,
    riskScore: 14,
    riskCategory: 'Low Risk',
    lastInspectionDate: '2026-09-05',
    previousViolations: [],
    repeatOffender: false,
    penaltiesPaid: '₹0',
    topCategories: ['Soaps & Detergents', 'Personal Care', 'Foods']
  }
];

class ManufacturerDbService {
  constructor() {
    this.storageKey = 'lm_manufacturers_db_v1';
    this.manufacturers = this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      // ignore
    }
    return INITIAL_MANUFACTURERS;
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.manufacturers));
    } catch (e) {
      // ignore
    }
  }

  getAll() {
    return this.manufacturers;
  }

  getById(id) {
    return this.manufacturers.find(m => m.id === id);
  }

  getByName(name = '') {
    const clean = name.toLowerCase();
    return this.manufacturers.find(m => m.name.toLowerCase().includes(clean) || clean.includes(m.name.toLowerCase()));
  }

  getHighRisk() {
    return this.manufacturers.filter(m => m.riskCategory === 'High Risk');
  }

  getRepeatOffenders() {
    return this.manufacturers.filter(m => m.repeatOffender);
  }

  recordAudit(mfgName, passed = true, violation = null) {
    let mfg = this.getByName(mfgName);
    if (!mfg) {
      mfg = {
        id: `mfg-${Date.now()}`,
        name: mfgName,
        headquarters: 'India',
        registeredCin: 'N/A',
        totalProductsChecked: 0,
        complianceRate: 100,
        riskScore: 20,
        riskCategory: 'Low Risk',
        lastInspectionDate: new Date().toISOString().slice(0, 10),
        previousViolations: [],
        repeatOffender: false,
        penaltiesPaid: '₹0',
        topCategories: ['FMCG']
      };
      this.manufacturers.unshift(mfg);
    }

    mfg.totalProductsChecked += 1;
    mfg.lastInspectionDate = new Date().toISOString().slice(0, 10);

    if (!passed && violation) {
      mfg.previousViolations.unshift({
        id: `v-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        rule: violation.rule || 'Rule 6(1)',
        description: violation.title || violation.description,
        penalty: 'Under Notice'
      });
      if (mfg.previousViolations.length >= 2) {
        mfg.repeatOffender = true;
      }
    }

    // Recompute compliance rate & risk
    const violCount = mfg.previousViolations.length;
    mfg.complianceRate = Math.max(15, Math.round(((mfg.totalProductsChecked - violCount) / mfg.totalProductsChecked) * 100));

    if (mfg.complianceRate < 50 || violCount >= 3) {
      mfg.riskCategory = 'High Risk';
      mfg.riskScore = Math.min(95, 60 + violCount * 12);
    } else if (mfg.complianceRate < 85 || violCount >= 1) {
      mfg.riskCategory = 'Medium Risk';
      mfg.riskScore = Math.min(65, 30 + violCount * 10);
    } else {
      mfg.riskCategory = 'Low Risk';
      mfg.riskScore = Math.max(5, 20 - mfg.totalProductsChecked);
    }

    this.save();
    return mfg;
  }
}

export const manufacturerDb = new ManufacturerDbService();
