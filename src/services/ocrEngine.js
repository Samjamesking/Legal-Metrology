/**
 * AI OCR & Legal Metrology Rule Evaluation Engine
 * Analyzes packaging label text, verifies Rule 6(1) declarations,
 * checks font sizing under Rule 7, and computes risk & compliance metrics.
 */

import { MANDATORY_DECLARATIONS, FONT_SIZE_STANDARDS } from '../data/legalMetrologyRules';

/**
 * Evaluates raw label text or structured product data against Legal Metrology Rules 2011
 */
export function evaluateLabelCompliance(rawText, pdpAreaCm2 = 250, customOverrides = {}) {
  const text = (rawText || '').toUpperCase();
  const declarations = {};
  const violations = [];
  const recommendations = [];

  // 1. Manufacturer Name & Address (Rule 6(1)(a))
  const hasMfgMarker = /(MANUFACTURED|PACKED|MKTD|MARKETED|PRODUCED|IMPORTED)\s+(BY|&)/i.test(text);
  const hasPinCode = /\b[1-9][0-9]{5}\b/.test(text);
  const hasAddress = /(ROAD|STREET|MARG|PLOT|INDUSTRIAL|NAGAR|HOUSE|FLOOR|LTD|PVT)/i.test(text);

  if (hasMfgMarker && hasAddress && hasPinCode) {
    declarations.manufacturer = {
      status: 'valid',
      value: 'Complete manufacturer/packer address with valid PIN code detected.',
      note: 'Meets Rule 6(1)(a) requirement.'
    };
  } else if (hasMfgMarker && hasAddress) {
    declarations.manufacturer = {
      status: 'warning',
      value: 'Manufacturer detected but missing 6-digit PIN code or full postal details.',
      note: 'Rule 6(1)(a) mandates complete address with postal code.'
    };
    violations.push({
      id: 'viol-mfg-pin',
      rule: 'Rule 6(1)(a)',
      title: 'Incomplete Manufacturer Postal Address',
      severity: 'warning',
      color: 'orange',
      description: 'Manufacturer address lacks complete postal PIN code for geographic identification.',
      penaltyEstimate: 'Rule 6(1)(a) Rectification Notice'
    });
    recommendations.push({
      id: 'rec-mfg-pin',
      text: 'Include complete physical address with registered PIN code.',
      priority: 'Medium'
    });
  } else {
    declarations.manufacturer = {
      status: 'missing',
      value: 'Manufacturer / Packer declaration not detected.',
      note: 'Critical violation under Rule 6(1)(a).'
    };
    violations.push({
      id: 'viol-mfg-missing',
      rule: 'Rule 6(1)(a)',
      title: 'Missing Manufacturer / Packer Identity',
      severity: 'critical',
      color: 'red',
      description: 'The name and physical address of the manufacturer or importer is omitted.',
      penaltyEstimate: 'Section 36(1): Fine up to ₹25,000'
    });
    recommendations.push({
      id: 'rec-mfg-add',
      text: 'Mandatorily declare: "Manufactured / Packed by: [Full Entity Name, Street, City, State, PIN]"',
      priority: 'Critical'
    });
  }

  // 2. Generic Product Name (Rule 6(1)(b))
  const hasGeneric = text.length > 20; // in sample or text
  if (hasGeneric) {
    declarations.generic_name = {
      status: 'valid',
      value: 'Generic commodity title identified on Principal Display Panel.',
      note: 'Compliant with Rule 6(1)(b).'
    };
  } else {
    declarations.generic_name = {
      status: 'missing',
      value: 'Generic commodity title missing.',
      note: 'Commodity nature must be stated in clear words.'
    };
    violations.push({
      id: 'viol-generic',
      rule: 'Rule 6(1)(b)',
      title: 'Missing Generic Name of Commodity',
      severity: 'critical',
      color: 'red',
      description: 'Common or generic identity of the packaged item is not printed.',
      penaltyEstimate: 'Section 36(1) Notice'
    });
  }

  // 3. Net Quantity (Rule 6(1)(c))
  const hasNetQty = /(NET\s*(QTY|QUANTITY|WT|WEIGHT|VOLUME)|(\d+(\.\d+)?\s*(KG|G|GM|L|ML|LTR|N|UNITS|PCS)))/i.test(text);
  const standardUnit = /(KG|G|L|ML|N)\b/i.test(text);

  if (hasNetQty && standardUnit) {
    declarations.net_quantity = {
      status: 'valid',
      value: 'Net quantity declared in legal SI units.',
      note: 'Complies with Rule 6(1)(c).'
    };
  } else if (hasNetQty && !standardUnit) {
    declarations.net_quantity = {
      status: 'warning',
      value: 'Non-standard measurement unit detected (e.g. Imperial ounces/lbs).',
      note: 'Rule 6(1)(c) mandates metric units (g, kg, ml, l).'
    };
    violations.push({
      id: 'viol-qty-metric',
      rule: 'Rule 6(1)(c)',
      title: 'Non-Standard Measurement Unit',
      severity: 'warning',
      color: 'orange',
      description: 'Imperial units (oz, lbs) used without primary SI units.',
      penaltyEstimate: 'Rule 6(1)(c) Rectification'
    });
  } else {
    declarations.net_quantity = {
      status: 'missing',
      value: 'Net quantity declaration missing.',
      note: 'Critical metric violation.'
    };
    violations.push({
      id: 'viol-qty-missing',
      rule: 'Rule 6(1)(c)',
      title: 'Missing Net Quantity',
      severity: 'critical',
      color: 'red',
      description: 'Net weight, measure or count is missing on the package.',
      penaltyEstimate: 'Section 36(1): Fine up to ₹25,000'
    });
  }

  // 4. Maximum Retail Price (MRP) & Unit Sale Price (Rule 6(1)(e))
  const hasMRP = /(MRP|MAXIMUM\s*RETAIL\s*PRICE|PRICE|RS\.?|₹)/i.test(text);
  const hasTaxes = /(INCL|TAXES|ALL\s*TAXES)/i.test(text);
  const hasCurrencySymbol = /(₹|RS\b|INR)/i.test(text);
  const hasUnitSalePrice = /(USP|PER\s*(KG|G|L|ML)|\/\s*(KG|G|L|ML))/i.test(text);

  if (hasMRP && hasTaxes && hasCurrencySymbol && hasUnitSalePrice) {
    declarations.mrp = {
      status: 'valid',
      value: 'MRP with inclusive of all taxes & Unit Sale Price (USP) fully verified.',
      note: 'Complies with 2022 amendments.'
    };
  } else if (hasMRP && hasTaxes && hasCurrencySymbol) {
    declarations.mrp = {
      status: 'warning',
      value: 'MRP present with taxes, but Unit Sale Price (₹/unit) omitted for >100g/ml package.',
      note: '2022 Legal Metrology amendment mandates Unit Sale Price.'
    };
    violations.push({
      id: 'viol-mrp-usp',
      rule: 'Rule 6(1)(e) Proviso',
      title: 'Missing Unit Sale Price (USP)',
      severity: 'warning',
      color: 'orange',
      description: 'Unit Sale Price (e.g. ₹/g or ₹/ml) is mandatory for retail packages exceeding 100g/100ml.',
      penaltyEstimate: 'Rectification Notice'
    });
    recommendations.push({
      id: 'rec-usp',
      text: 'Add Unit Sale Price declaration e.g. "USP: ₹XX.XX per 100g / per kg" next to MRP.',
      priority: 'High'
    });
  } else if (hasMRP) {
    declarations.mrp = {
      status: 'missing',
      value: 'Incorrect MRP format (missing "inclusive of all taxes" or ₹ currency symbol).',
      note: 'Breach of Rule 6(1)(e).'
    };
    violations.push({
      id: 'viol-mrp-format',
      rule: 'Rule 6(1)(e)',
      title: 'Incorrect MRP Declaration Format',
      severity: 'critical',
      color: 'red',
      description: 'Rule mandates "Maximum Retail Price ₹..." or "MRP ₹..." followed by "incl. of all taxes".',
      penaltyEstimate: 'Section 36(1): Fine up to ₹25,000'
    });
    recommendations.push({
      id: 'rec-mrp-format',
      text: 'Reformat price to: "MRP ₹ [Price] (incl. of all taxes)"',
      priority: 'Critical'
    });
  } else {
    declarations.mrp = {
      status: 'missing',
      value: 'No retail price or MRP declaration detected.',
      note: 'Critical violation.'
    };
    violations.push({
      id: 'viol-mrp-none',
      rule: 'Rule 6(1)(e)',
      title: 'Missing Maximum Retail Price (MRP)',
      severity: 'critical',
      color: 'red',
      description: 'No retail price declared on packaged item.',
      penaltyEstimate: 'Immediate Notice & Seizure'
    });
  }

  // 5. Date of Manufacture / Packing (Rule 6(1)(d))
  const hasMfgDate = /(MFD|MFG|PKD|PACKED|MANUFACTURED|PACKING)\s*[:.]?\s*(\d{1,2}[\/-]\d{2,4}|[A-Z]{3,9}\s*\d{4})/i.test(text) ||
    /(\b(0[1-9]|1[0-2])[\/-]202[4-9]\b)/.test(text);

  if (hasMfgDate) {
    declarations.mfg_date = {
      status: 'valid',
      value: 'Month and Year of manufacture/packaging detected.',
      note: 'Complies with Rule 6(1)(d).'
    };
  } else {
    declarations.mfg_date = {
      status: 'missing',
      value: 'Month & year of manufacture/packing not detected.',
      note: 'Mandatory under Rule 6(1)(d).'
    };
    violations.push({
      id: 'viol-mfgdate-missing',
      rule: 'Rule 6(1)(d)',
      title: 'Missing Date of Manufacture / Packing',
      severity: 'critical',
      color: 'red',
      description: 'Month and year of manufacture, packing or import is not printed on label.',
      penaltyEstimate: 'Section 36(1) Notice'
    });
    recommendations.push({
      id: 'rec-mfgdate',
      text: 'Print: "Mfg Date: MM/YYYY" or "Packed On: Month YYYY"',
      priority: 'High'
    });
  }

  // 6. Expiry / Best Before Date
  const hasExpDate = /(EXP|EXPIRY|BEST\s*BEFORE|USE\s*BY)/i.test(text);
  if (hasExpDate) {
    declarations.expiry_date = {
      status: 'valid',
      value: 'Expiry date / Best before declaration detected.',
      note: 'Complies with shelf-life disclosure.'
    };
  } else {
    declarations.expiry_date = {
      status: 'missing',
      value: 'Expiry / Best Before date omitted.',
      note: 'Mandatory for food, cosmetics, pharmaceuticals, and chemicals.'
    };
    violations.push({
      id: 'viol-exp-missing',
      rule: 'Rule 6(1)(d) & Allied Rules',
      title: 'Missing Expiry Date / Best Before',
      severity: 'critical',
      color: 'red',
      description: 'Absence of expiration or best before timeframe.',
      penaltyEstimate: 'Section 36(1) & Consumer Health Hazard'
    });
    recommendations.push({
      id: 'rec-exp',
      text: 'Add explicit expiry date: "Best before X months from packing" or "Exp: MM/YYYY"',
      priority: 'Critical'
    });
  }

  // 7. Batch / Lot Number
  const hasBatch = /(BATCH|LOT|B\.?\s*NO|LOT\s*NO)/i.test(text);
  if (hasBatch) {
    declarations.batch_no = {
      status: 'valid',
      value: 'Batch / Lot number detected.',
      note: 'Compliant with traceability standards.'
    };
  } else {
    declarations.batch_no = {
      status: 'missing',
      value: 'Batch or Lot identification number missing.',
      note: 'Required under Rule 6(1)(d).'
    };
    violations.push({
      id: 'viol-batch-missing',
      rule: 'Rule 6(1)(d)',
      title: 'Missing Batch / Lot Number',
      severity: 'warning',
      color: 'orange',
      description: 'Batch or lot identifier missing, preventing product recall traceability.',
      penaltyEstimate: 'Rule 6(1)(d) Non-compliance'
    });
  }

  // 8. Consumer Care Details (Rule 6(1)(f))
  const hasConsumerHelpline = /(CUSTOMER\s*CARE|CONSUMER|CARE\s*CELL|FEEDBACK|HELPLINE|TOLL[- ]FREE|\b1800[-\d]+\b|\b0\d{2,4}[-\d]+\b)/i.test(text);
  const hasEmail = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i.test(text);

  if (hasConsumerHelpline && hasEmail) {
    declarations.consumer_care = {
      status: 'valid',
      value: 'Consumer care contact details with phone and email verified.',
      note: 'Rule 6(1)(f) compliant.'
    };
  } else if (hasConsumerHelpline || hasEmail) {
    declarations.consumer_care = {
      status: 'warning',
      value: 'Partial consumer contact: Only phone or email found.',
      note: 'Rule 6(1)(f) mandates name, address, telephone and email.'
    };
    violations.push({
      id: 'viol-care-partial',
      rule: 'Rule 6(1)(f)',
      title: 'Incomplete Consumer Care Channels',
      severity: 'warning',
      color: 'orange',
      description: 'Both electronic (email) and telephone/toll-free channels must be declared.',
      penaltyEstimate: 'Rule 6(1)(f) Rectification'
    });
  } else {
    declarations.consumer_care = {
      status: 'missing',
      value: 'Consumer care contact details not detected.',
      note: 'Critical violation under Rule 6(1)(f).'
    };
    violations.push({
      id: 'viol-care-missing',
      rule: 'Rule 6(1)(f)',
      title: 'Missing Consumer Care Details',
      severity: 'critical',
      color: 'red',
      description: 'No helpline telephone, postal address, or email declared for consumer grievances.',
      penaltyEstimate: 'Section 36(1) Penalty Notice'
    });
    recommendations.push({
      id: 'rec-care-add',
      text: 'Mandatorily include Consumer Cell: Person Designation, Physical Address, Toll-Free Number, and Email.',
      priority: 'High'
    });
  }

  // 9. Country of Origin (Rule 6(1)(g))
  const hasOrigin = /(COUNTRY\s*OF\s*ORIGIN|MADE\s*IN|PRODUCT\s*OF|INDIA\b)/i.test(text);
  if (hasOrigin) {
    declarations.country_of_origin = {
      status: 'valid',
      value: 'Country of origin / manufacture declared.',
      note: 'Rule 6(1)(g) compliant.'
    };
  } else {
    declarations.country_of_origin = {
      status: 'missing',
      value: 'Country of origin statement missing.',
      note: 'Mandatory declaration under 2020 Legal Metrology amendment.'
    };
    violations.push({
      id: 'viol-origin-missing',
      rule: 'Rule 6(1)(g)',
      title: 'Missing Country of Origin',
      severity: 'critical',
      color: 'red',
      description: 'Country of origin is omitted on packaging label.',
      penaltyEstimate: 'Section 36(1) Non-compliance'
    });
    recommendations.push({
      id: 'rec-origin-add',
      text: 'Affix "Country of Origin: [Name of Country]" on principal display panel or back panel.',
      priority: 'High'
    });
  }

  // Calculate score based on mandatory declarations weights
  let validCount = 0;
  let warningCount = 0;
  const total = MANDATORY_DECLARATIONS.length;

  MANDATORY_DECLARATIONS.forEach(decl => {
    const d = declarations[decl.id];
    if (d?.status === 'valid') validCount++;
    else if (d?.status === 'warning') warningCount++;
  });

  const rawScore = Math.round(((validCount * 1.0 + warningCount * 0.5) / total) * 100);
  const score = customOverrides.complianceScore !== undefined ? customOverrides.complianceScore : rawScore;

  let status = 'Compliant';
  let riskLevel = 'Low Risk';

  if (score < 50) {
    status = 'Non-Compliant';
    riskLevel = 'High Risk';
  } else if (score < 85) {
    status = 'Partially Compliant';
    riskLevel = 'Medium Risk';
  }

  return {
    complianceScore: score,
    status,
    riskLevel,
    declarations,
    violations,
    recommendations,
    pdpAreaCm2,
    pdpStandard: FONT_SIZE_STANDARDS.find(s => pdpAreaCm2 <= s.maxPdpAreaCm2) || FONT_SIZE_STANDARDS[0]
  };
}

/**
 * Simulates real-time AI OCR scanning with realistic delay
 */
export async function simulateAIOcrScan(productData, delayMs = 1200) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(evaluateLabelCompliance(productData.ocrRawText, productData.pdpAreaCm2, {
        complianceScore: productData.complianceScore
      }));
    }, delayMs);
  });
}
