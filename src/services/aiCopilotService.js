/**
 * AI Compliance Copilot Engine
 * Provides statutory rule references under Legal Metrology (Packaged Commodities) Rules, 2011,
 * generates AI recommendations, compliant declaration corrections, and export utilities.
 */

export const RULE_STATUTES = {
  'Rule 6(1)(a)': {
    statute: 'Legal Metrology (Packaged Commodities) Rules, 2011, Rule 6(1)(a)',
    legalTitle: 'Name and Address of Manufacturer, Packer or Importer',
    penaltyClause: 'Section 36(1) of Legal Metrology Act, 2009: Fine up to ₹25,000 for first offence.',
    statutoryMandate: 'Every package shall bear the name and complete physical address of the manufacturer or packer, including street, city, state and PIN code. For imported commodities, name and address of importer is mandatory.'
  },
  'Rule 6(1)(b)': {
    statute: 'Legal Metrology (Packaged Commodities) Rules, 2011, Rule 6(1)(b)',
    legalTitle: 'Generic or Common Name of Commodity',
    penaltyClause: 'Section 36(1) Notice for Misleading Description.',
    statutoryMandate: 'The common or generic name of the commodity contained in the package must appear on the Principal Display Panel (PDP) in clear, unambiguous terms.'
  },
  'Rule 6(1)(c)': {
    statute: 'Legal Metrology (Packaged Commodities) Rules, 2011, Rule 6(1)(c) & Rule 7',
    legalTitle: 'Net Quantity Declaration in Standard Metric Units',
    penaltyClause: 'Section 36(1) Penalty up to ₹25,000 & potential seizure of non-standard quantity batches.',
    statutoryMandate: 'Net quantity must be declared in standard SI units (g, kg, ml, l, or number N). No non-standard abbreviations (gms, kgs, ltr) or imperial units allowed as primary.'
  },
  'Rule 6(1)(d)': {
    statute: 'Legal Metrology (Packaged Commodities) Rules, 2011, Rule 6(1)(d)',
    legalTitle: 'Date of Manufacture / Packing and Batch / Lot Identification',
    penaltyClause: 'Section 36(1) Notice & Consumer Protection Act liability for expired goods.',
    statutoryMandate: 'The month and year in which commodity is manufactured, packed or imported (MM/YYYY) along with distinct batch or lot number must be conspicuous.'
  },
  'Rule 6(1)(e)': {
    statute: 'Legal Metrology (Packaged Commodities) Rules, 2011, Rule 6(1)(e) & 2022 Amendments',
    legalTitle: 'Maximum Retail Price (MRP) & Unit Sale Price (USP)',
    penaltyClause: 'Section 36(1) Penalty up to ₹25,000. Subsequent offence up to ₹50,000 or 1 year imprisonment.',
    statutoryMandate: 'MRP must be stated as "MRP ₹... (inclusive of all taxes)" or "Maximum Retail Price ₹... (incl. of all taxes)". For packages > 1kg/1L, Unit Sale Price (e.g. ₹/g or ₹/ml) is strictly mandatory.'
  },
  'Rule 6(1)(f)': {
    statute: 'Legal Metrology (Packaged Commodities) Rules, 2011, Rule 6(1)(f)',
    legalTitle: 'Consumer Care Helpline, Designation, Address and Email',
    penaltyClause: 'Section 36(1) Rectification Order within 15 days.',
    statutoryMandate: 'Every package shall declare the name or designation of the consumer care official, physical address, active telephone/toll-free helpline number, and email address.'
  },
  'Rule 6(1)(g)': {
    statute: 'Legal Metrology (Packaged Commodities) Rules, 2011, Rule 6(1)(g) (2020 Amendment)',
    legalTitle: 'Country of Origin Declaration',
    penaltyClause: 'Immediate customs or market holding notice under Rule 6(1)(g).',
    statutoryMandate: 'Mandatory declaration of "Country of Origin: [Country]" on all pre-packaged commodities, whether domestic or imported.'
  },
  'Rule 7': {
    statute: 'Legal Metrology (Packaged Commodities) Rules, 2011, Rule 7 & Schedule II',
    legalTitle: 'Principal Display Panel (PDP) Dimensions & Minimum Font Height',
    penaltyClause: 'Rule 7 Violation: Rectification notice & fine under Section 36.',
    statutoryMandate: 'Font height of declarations must conform strictly to Schedule II based on PDP surface area (1.0mm to 6.0mm).'
  },
  'Rule 8': {
    statute: 'Legal Metrology (Packaged Commodities) Rules, 2011, Rule 8',
    legalTitle: 'Declaration Visibility and Prominence',
    penaltyClause: 'Section 36(1) Obscurity Notice.',
    statutoryMandate: 'All declarations must be conspicuous, legible, distinct from surrounding background, and placed without hiding in folds or seams.'
  }
};

/**
 * Generates an actionable AI compliance correction object for a given violation
 */
export function generateCopilotAdvice(violation, product) {
  const ruleKey = Object.keys(RULE_STATUTES).find(k => violation.rule?.includes(k)) || 'Rule 6(1)(a)';
  const statuteInfo = RULE_STATUTES[ruleKey] || RULE_STATUTES['Rule 6(1)(a)'];

  let aiRecommendation = '';
  let correctedLabelText = '';
  let legalRationale = '';

  const productName = product.name || 'Commodity';
  const brand = product.brand || 'Manufacturer';
  const netQty = product.netQuantity || '500 g';
  const mrp = product.mrp || '₹100.00';

  if (violation.id?.includes('mfg') || violation.rule?.includes('6(1)(a)')) {
    aiRecommendation = `Affix full corporate entity name and registered postal address with 6-digit PIN code on the rear or principal display panel.`;
    correctedLabelText = `Manufactured & Packed by:\n${brand} India Pvt. Ltd.\nPlot No. 42, Sector 18, Industrial Estate,\nGurugram - 122015, Haryana, India`;
    legalRationale = 'Prevents phantom manufacturing and satisfies legal traceability requirements under Rule 6(1)(a).';
  } else if (violation.id?.includes('qty') || violation.rule?.includes('6(1)(c)')) {
    aiRecommendation = `Standardize net quantity representation into legal SI metric units (g, kg, ml, l) with required numeral height (minimum 3.0mm for ${product.pdpAreaCm2 || 250} cm² PDP).`;
    correctedLabelText = `NET QUANTITY: ${netQty}\n(Numerals min 3.0mm, lettering min 2.0mm as per Rule 7)`;
    legalRationale = 'Ensures consumer cannot be deceived by ambiguous or imperial measurement standards.';
  } else if (violation.id?.includes('mrp') || violation.rule?.includes('6(1)(e)')) {
    const rawPrice = mrp.match(/[\d.]+/)?.[0] || '199.00';
    aiRecommendation = `Reformat retail price declaration to explicitly include "inclusive of all taxes" and accompany with statutory Unit Sale Price (USP).`;
    correctedLabelText = `MAXIMUM RETAIL PRICE (MRP): ₹${rawPrice} (INCL. OF ALL TAXES)\nUNIT SALE PRICE: ₹${(parseFloat(rawPrice) / 5).toFixed(2)} / 100 g`;
    legalRationale = 'Statutory 2022 amendment mandates Unit Sale Price to empower consumer price comparison.';
  } else if (violation.id?.includes('care') || violation.rule?.includes('6(1)(f)')) {
    aiRecommendation = `Provide multi-channel customer care details: Designated officer, Toll-free helpline, physical address, and electronic email address.`;
    correctedLabelText = `CONSUMER CARE CELL:\nManager - Consumer Relations, ${brand}\nAddress: Registered Corporate Office, Sector 18, Gurugram - 122015\nToll Free: 1800-209-4455 | Email: support@${brand.toLowerCase().replace(/[^a-z]/g, '')}.in`;
    legalRationale = 'Ensures accessible grievance redressal mechanisms under Rule 6(1)(f).';
  } else if (violation.id?.includes('origin') || violation.rule?.includes('6(1)(g)')) {
    aiRecommendation = `Print distinct Country of Origin label on the front or rear principal panel.`;
    correctedLabelText = `COUNTRY OF ORIGIN: INDIA`;
    legalRationale = 'Mandatory declaration enacted to uphold consumer transparency regarding imported vs indigenous goods.';
  } else if (violation.id?.includes('exp') || violation.id?.includes('mfgdate') || violation.rule?.includes('6(1)(d)')) {
    aiRecommendation = `Declare clear month and year of packaging alongside batch traceability identifier.`;
    correctedLabelText = `MFD: ${product.mfgDate || '08/2026'} | BATCH NO: ${product.batchNo || 'LM-2026-X01'}\nBEST BEFORE 12 MONTHS FROM PACKAGING`;
    legalRationale = 'Prevents sale of stale/expired stock and enables batch recall if contamination is detected.';
  } else {
    aiRecommendation = `Rectify declaration typography and placement to adhere to statutory font height and PDP layout rules.`;
    correctedLabelText = `${violation.title}: Compliant declaration text matching Legal Metrology Rules, 2011.`;
    legalRationale = statuteInfo.statutoryMandate;
  }

  return {
    violationId: violation.id,
    violationTitle: violation.title,
    severity: violation.severity || 'critical',
    rule: violation.rule,
    ruleStatute: statuteInfo.statute,
    legalTitle: statuteInfo.legalTitle,
    statutoryMandate: statuteInfo.statutoryMandate,
    penaltyClause: statuteInfo.penaltyClause,
    aiRecommendation,
    correctedLabelText,
    legalRationale
  };
}

/**
 * Prepares a complete synthesized Copilot Audit Report for a product
 */
export function generateFullCopilotReport(product) {
  const violations = product.violations || [];
  const advices = violations.map(v => generateCopilotAdvice(v, product));

  const totalViolations = violations.length;
  const criticalCount = violations.filter(v => v.severity === 'critical').length;
  const warningCount = violations.filter(v => v.severity === 'warning').length;

  let overallSeverity = 'Low Severity';
  if (criticalCount > 0) overallSeverity = 'Critical Statutory Breach';
  else if (warningCount > 0) overallSeverity = 'Moderate Non-Compliance';

  // Compliant full label template
  const fullCorrectedLabel = `=====================================================
LEGAL METROLOGY COMPLIANT LABEL DECLARATION TEMPLATE
Complies with: Legal Metrology (Packaged Commodities) Rules, 2011
Product: ${product.name}
Brand: ${product.brand}
=====================================================

1. GENERIC PRODUCT IDENTITY:
   ${product.name}

2. NET QUANTITY (Rule 6(1)(c) & Rule 7):
   Net Quantity: ${product.netQuantity}

3. RETAIL PRICE & UNIT SALE PRICE (Rule 6(1)(e)):
   Maximum Retail Price (MRP): ${product.mrp} (incl. of all taxes)
   Unit Sale Price (USP): Compliant per metric unit

4. DATES & TRACEABILITY (Rule 6(1)(d)):
   Mfg / Packed Date: ${product.mfgDate}
   Expiry / Best Before: ${product.expiryDate}
   Batch / Lot No: ${product.batchNo}

5. MANUFACTURER & PACKER DETAILS (Rule 6(1)(a)):
   Manufactured & Packed by: ${product.brand} Pvt. Ltd.,
   Plot No. 12, Industrial Area, Sector 5,
   New Delhi - 110001, India

6. CONSUMER CARE HELPLINE (Rule 6(1)(f)):
   Consumer Care Executive, ${product.brand}
   Address: Same as manufacturer
   Toll-Free Helpline: 1800-111-9999
   Email: grievance@${product.brand.toLowerCase().replace(/[^a-z]/g, '')}.com

7. COUNTRY OF ORIGIN (Rule 6(1)(g)):
   Country of Origin: ${product.countryOfOrigin || 'India'}

=====================================================
GENERATED BY AI COMPLIANCE COPILOT • GOI LEGAL METROLOGY
=====================================================`;

  return {
    productId: product.id,
    productName: product.name,
    brand: product.brand,
    complianceScore: product.complianceScore,
    totalViolations,
    criticalCount,
    warningCount,
    overallSeverity,
    advices,
    fullCorrectedLabel
  };
}

/**
 * Triggers download of text file containing corrected label
 */
export function downloadCorrectedLabelText(report) {
  const blob = new Blob([report.fullCorrectedLabel], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Corrected_Label_${report.productName.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Exports complete JSON audit recommendations
 */
export function exportCopilotJson(report) {
  const jsonStr = JSON.stringify(report, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AI_Copilot_Advisory_${report.productName.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
