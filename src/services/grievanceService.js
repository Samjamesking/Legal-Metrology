/**
 * grievanceService.js
 * Manages Consumer Grievances for Damaged & Expired Commodities
 * under Legal Metrology Act, 2009 and Consumer Protection (Packaged Commodities) Rules, 2011.
 */

const STORAGE_KEY = 'lm_consumer_grievances_v1';

// Preset sample merchants for GSTIN verification
export const KNOWN_MERCHANTS = {
  '27AABCU9603R1ZM': {
    name: 'Reliance Retail Hypermarket Ltd.',
    state: 'Maharashtra',
    status: 'ACTIVE',
    city: 'Mumbai',
    category: 'Supermarket & FMCG'
  },
  '07AAACG0532F1Z8': {
    name: 'Blinkit Commerce / Grofers India Pvt Ltd',
    state: 'Delhi NCR',
    status: 'ACTIVE',
    city: 'New Delhi',
    category: 'Quick Commerce Fulfillment'
  },
  '29AABCS1429B1ZB': {
    name: 'More Consumer Retail Chain',
    state: 'Karnataka',
    status: 'ACTIVE',
    city: 'Bengaluru',
    category: 'Grocery & Dairy Depot'
  },
  '06AAACD1123P1ZQ': {
    name: 'D-Mart Avenue Supermarts Ltd.',
    state: 'Haryana',
    status: 'ACTIVE',
    city: 'Gurugram',
    category: 'FMCG Retail Warehouse'
  }
};

// Initial Seed Data so the user can immediately test tracking and escalation
const INITIAL_GRIEVANCES = [
  {
    token: 'LM-GRV-2026-48219',
    productName: 'Amul Taaza Homogenised Toned Milk (1L)',
    brand: 'Amul GCMMF',
    category: 'Dairy & Perishables',
    issueCategory: 'Expired Food Product',
    issueDescription: 'Milk carton was purchased yesterday but the best-before printed date is expired by 18 days. Carton was curdled inside.',
    productImage: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
    billNumber: 'INV-BLNK-984210',
    billImage: null,
    gstNumber: '07AAACG0532F1Z8',
    merchantName: 'Blinkit Commerce / Grofers India Pvt Ltd',
    claimType: 'Full Refund + Replacement',
    amount: '₹74.00',
    status: 'PENDING_SELLER_ACTION', // 'PENDING_SELLER_ACTION' | 'ESCALATED_LEVEL_2' | 'RESOLVED'
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    deadline15Days: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days left of 15
    escalationDetails: null,
    history: [
      {
        date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        action: 'Grievance Token Generated',
        note: '15-Day Statutory Notice served to Merchant (GST: 07AAACG0532F1Z8).'
      }
    ]
  },
  {
    token: 'LM-GRV-2026-31084',
    productName: 'Fortune Sunlite Refined Sunflower Oil (1L)',
    brand: 'Fortune Adani Wilmar',
    category: 'Edible Oils',
    issueCategory: 'Damaged & Leaking Packaging',
    issueDescription: 'Pouch arrived punctured at the corner weld seam, entire oil leaked inside the grocery bag. Storekeeper refused replacement.',
    productImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    billNumber: 'RRT-2026-004812',
    billImage: null,
    gstNumber: '27AABCU9603R1ZM',
    merchantName: 'Reliance Retail Hypermarket Ltd.',
    claimType: '100% Refund',
    amount: '₹165.00',
    status: 'ESCALATED_LEVEL_2',
    createdAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(), // 16 days ago (15 days expired)
    deadline15Days: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    escalationDetails: {
      escalatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      reason: '15-day merchant window lapsed without refund or replacement',
      secondaryDeadlineDays: 7,
      secondaryDeadlineDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days left of secondary
      legalNoticeNo: 'SCN-MET-2026-8814',
      assignedOfficer: 'Insp. R. K. Sharma (District Metrology Enforcement Cell)',
      penalSection: 'Section 36(1) of Legal Metrology Act, 2009 (Compounding Fine up to ₹25,000)'
    },
    history: [
      {
        date: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
        action: 'Grievance Token Generated',
        note: '15-Day Statutory Resolution Window initiated.'
      },
      {
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        action: 'Escalated by Consumer (Token Raised)',
        note: 'Merchant failed to redress within 15 days. Level-2 Legal Notice SCN-MET-2026-8814 issued with 7-Day Secondary Time Limit.'
      }
    ]
  }
];

export const grievanceService = {
  // Retrieve all grievances
  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GRIEVANCES));
        return INITIAL_GRIEVANCES;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to load grievances from localStorage', e);
      return INITIAL_GRIEVANCES;
    }
  },

  // Save list
  saveAll(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save grievances', e);
    }
  },

  // Lookup token
  getByToken(tokenNumber) {
    if (!tokenNumber) return null;
    const clean = tokenNumber.trim().toUpperCase();
    const all = this.getAll();
    return all.find(g => g.token.toUpperCase() === clean) || null;
  },

  // Validate GST number format and lookup merchant details
  validateGSTIN(gstin) {
    if (!gstin) return { isValid: false, message: 'GSTIN is required' };
    const cleaned = gstin.trim().toUpperCase();
    // 15-character alphanumeric standard Indian GST pattern
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const isValidFormat = gstRegex.test(cleaned);

    const merchant = KNOWN_MERCHANTS[cleaned] || {
      name: `Registered Merchant (${cleaned.slice(2, 7)} Retail)`,
      state: 'State Code ' + cleaned.slice(0, 2),
      status: 'ACTIVE',
      city: 'Commercial Division',
      category: 'General Retail Merchant'
    };

    return {
      isValid: isValidFormat || cleaned.length === 15,
      cleaned,
      merchant
    };
  },

  // Create a new grievance token with 15-day resolution window
  createGrievance({
    productName,
    brand,
    category,
    issueCategory,
    issueDescription,
    productImage,
    billNumber,
    billImage,
    gstNumber,
    merchantName,
    claimType = 'Full Refund or Replacement',
    amount = '₹0.00'
  }) {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const token = `LM-GRV-2026-${randomSuffix}`;
    const now = new Date();
    const deadline15 = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000);

    const gstCheck = this.validateGSTIN(gstNumber);
    const finalMerchantName = merchantName || gstCheck.merchant?.name || 'Authorized Retailer';

    const newGrievance = {
      token,
      productName: productName || 'Packaged Commodity',
      brand: brand || 'Packaged Goods',
      category: category || 'General Retail Package',
      issueCategory: issueCategory || 'Damaged / Expired Product',
      issueDescription,
      productImage: productImage || null,
      billNumber: billNumber || `BILL-${randomSuffix}`,
      billImage: billImage || null,
      gstNumber: gstNumber ? gstNumber.toUpperCase() : '27AABCU9603R1ZM',
      merchantName: finalMerchantName,
      claimType,
      amount: amount || '₹150.00',
      status: 'PENDING_SELLER_ACTION',
      createdAt: now.toISOString(),
      deadline15Days: deadline15.toISOString(),
      escalationDetails: null,
      history: [
        {
          date: now.toISOString(),
          action: 'Grievance Token Generated',
          note: `Official 15-day statutory resolution window opened. Notice transmitted to merchant GSTIN: ${gstNumber}.`
        }
      ]
    };

    const currentList = this.getAll();
    const updated = [newGrievance, ...currentList];
    this.saveAll(updated);

    return newGrievance;
  },

  // Simulate 15 days elapsed on an active token (for instant demo/testing)
  simulateTimePassed(tokenNumber) {
    const all = this.getAll();
    const index = all.findIndex(g => g.token.toUpperCase() === tokenNumber.trim().toUpperCase());
    if (index === -1) return null;

    const item = { ...all[index] };
    // Set createdAt to 16 days ago, deadline to yesterday
    item.createdAt = new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString();
    item.deadline15Days = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString();
    
    all[index] = item;
    this.saveAll(all);
    return item;
  },

  // Escalate Token (User raises token because seller did not replace/refund within 15 days)
  escalateGrievance(tokenNumber, reason = 'Seller failed to replace or refund product within statutory 15 days') {
    const all = this.getAll();
    const index = all.findIndex(g => g.token.toUpperCase() === tokenNumber.trim().toUpperCase());
    if (index === -1) return null;

    const current = all[index];
    const now = new Date();
    // Grant secondary resolution time limit: 7 days
    const secondaryDeadline = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const noticeNo = `SCN-MET-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const escalationDetails = {
      escalatedAt: now.toISOString(),
      reason,
      secondaryDeadlineDays: 7,
      secondaryDeadlineDate: secondaryDeadline.toISOString(),
      legalNoticeNo: noticeNo,
      assignedOfficer: 'Insp. R. K. Sharma (District Legal Metrology Cell)',
      penalSection: 'Section 36 & 49 of Legal Metrology Act, 2009 (Cognizable Enforcement Action)'
    };

    const updatedItem = {
      ...current,
      status: 'ESCALATED_LEVEL_2',
      escalationDetails,
      history: [
        ...current.history,
        {
          date: now.toISOString(),
          action: 'Token Raised / Escalated to Enforcement Cell',
          note: `Statutory 15-day seller window expired without resolution. Secondary 7-day enforcement summons ${noticeNo} issued.`
        }
      ]
    };

    all[index] = updatedItem;
    this.saveAll(all);
    return updatedItem;
  },

  // Mark resolved (e.g. refund credited or replacement received)
  resolveGrievance(tokenNumber, resolutionNote = 'Full refund received from merchant') {
    const all = this.getAll();
    const index = all.findIndex(g => g.token.toUpperCase() === tokenNumber.trim().toUpperCase());
    if (index === -1) return null;

    const current = all[index];
    const now = new Date();
    const updatedItem = {
      ...current,
      status: 'RESOLVED',
      resolvedAt: now.toISOString(),
      resolutionNote,
      history: [
        ...current.history,
        {
          date: now.toISOString(),
          action: 'Grievance Resolved',
          note: resolutionNote
        }
      ]
    };

    all[index] = updatedItem;
    this.saveAll(all);
    return updatedItem;
  },

  // Calculate remaining time helper
  getTimeRemaining(deadlineIso) {
    const total = Date.parse(deadlineIso) - Date.now();
    if (total <= 0) {
      return { isExpired: true, days: 0, hours: 0, minutes: 0, seconds: 0, text: 'Time Expired' };
    }
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      isExpired: false,
      days,
      hours,
      minutes,
      seconds,
      text: `${days}d ${hours}h ${minutes}m left`
    };
  }
};
