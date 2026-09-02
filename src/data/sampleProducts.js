/**
 * Sample Packaged Commodities Dataset
 * Pre-loaded with diverse FMCG packaging labels, simulated OCR text, bounding boxes, compliance evaluation,
 * and comprehensive formulation & ingredient analysis.
 */

export const SAMPLE_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Aashirvaad Superior MP Atta',
    brand: 'ITC Limited',
    category: 'Staples & Flour',
    packagingType: 'Stand-up Poly Pouch',
    pdpAreaCm2: 480,
    complianceScore: 98,
    status: 'Compliant',
    lastScanDate: '2026-09-01 14:22',
    batchNo: 'ITC-MP-260811',
    mrp: '₹275.00 (₹55.00/kg)',
    netQuantity: '5 kg',
    mfgDate: '08/2026',
    expiryDate: 'Best before 4 months',
    countryOfOrigin: 'India',
    customerCare: 'itccares@itc.in | 1800-425-4444',
    riskLevel: 'Low Risk',
    colorTheme: '#7C2D12',
    fssaiLicNo: '10012031000085',
    isVegetarian: true,
    declarations: {
      manufacturer: { status: 'valid', value: 'ITC Limited, 37 J.L. Nehru Road, Kolkata 700071, West Bengal', note: 'Complete postal address with PIN code verified.' },
      generic_name: { status: 'valid', value: 'Whole Wheat Atta', note: 'Generic name clearly printed on principal display panel.' },
      net_quantity: { status: 'valid', value: '5 kg', note: 'Standard SI unit. Font height 4.2mm meets Rule 7 (>4.0mm requirement).' },
      mrp: { status: 'valid', value: '₹275.00 (incl. of all taxes) | USP ₹55.00 / kg', note: 'MRP with all taxes and Unit Sale Price compliant with 2022 amendment.' },
      mfg_date: { status: 'valid', value: 'Pkd: 08/2026', note: 'Month and year clearly legible.' },
      expiry_date: { status: 'valid', value: 'Best before 4 months from packing', note: 'Standard shelf life declaration verified.' },
      batch_no: { status: 'valid', value: 'Batch No: ITC-MP-260811', note: 'Alphanumeric batch number detected.' },
      consumer_care: { status: 'valid', value: 'Executive Consumer Care, ITC Ltd, Toll-Free: 1800-425-4444, itccares@itc.in', note: 'Multi-channel contact details present.' },
      country_of_origin: { status: 'valid', value: 'Country of Origin: India', note: 'Prominently declared.' }
    },
    ingredientsData: {
      rawText: 'INGREDIENTS: Whole Wheat (100%). CONTAINS WHEAT (GLUTEN). NO ADDED PRESERVATIVES OR ARTIFICIAL COLORS. 0% MAIDA.',
      isVegetarian: true,
      fssaiLicNo: '10012031000085',
      items: [
        { name: 'Whole Wheat Grains', percentage: '100%', role: 'Primary Grain Base', nature: 'Natural Whole Grain', isKey: true }
      ],
      allergens: ['Wheat (Gluten)'],
      additives: [
        { code: 'None', name: 'Zero Chemical Additives', type: 'Clean Label Certified', status: 'Clean' }
      ],
      nutritionPer100g: {
        energy: '364 kcal',
        protein: '11.8 g',
        carbohydrates: '75.2 g',
        addedSugar: '0.0 g',
        totalFat: '1.9 g',
        dietaryFiber: '11.1 g',
        sodium: '3.2 mg'
      },
      complianceNotes: [
        { title: 'QUID Declaration', passed: true, note: '100% Whole Wheat explicitly declared on front panel.' },
        { title: 'Allergen Advisory', passed: true, note: '"Contains Wheat (Gluten)" printed conspicuously.' },
        { title: 'Veg Logo Standard', passed: true, note: 'Green dot in green square printed as per FSSAI regulations.' }
      ]
    },
    violations: [],
    recommendations: [
      { id: 'rec-1', text: 'All mandatory declarations under Rule 6(1) are fully compliant.', category: 'Best Practice', priority: 'Low' },
      { id: 'rec-2', text: 'Optional: Consider QR code direct link to digitally verified FSSAI / Legal Metrology portal.', category: 'Enhancement', priority: 'Low' }
    ],
    ocrRawText: `AASHIRVAAD SUPERIOR MP ATTA
100% WHOLE WHEAT FLOUR • 0% MAIDA
NET QUANTITY: 5 kg
MAXIMUM RETAIL PRICE (MRP): ₹275.00 (INCL. OF ALL TAXES)
UNIT SALE PRICE: ₹55.00 / kg
PKD: 08/2026  BATCH NO: ITC-MP-260811
BEST BEFORE 4 MONTHS FROM PACKAGING
INGREDIENTS: WHOLE WHEAT (100%). CONTAINS WHEAT (GLUTEN).
MANUFACTURED & MARKETED BY: ITC LIMITED
VIRGINIA HOUSE, 37 J.L. NEHRU ROAD, KOLKATA - 700071, WB
LIC NO: 10012031000085
FOR CONSUMER FEEDBACK / QUERIES:
MANAGER, CONSUMER CARE CELL, ITC LIMITED
TOLL FREE: 1800-425-4444 | EMAIL: itccares@itc.in
COUNTRY OF ORIGIN: INDIA`,
    boundingBoxes: [
      { x: 10, y: 8, w: 80, h: 12, label: 'Generic Product Name', valid: true },
      { x: 12, y: 24, w: 35, h: 9, label: 'Net Quantity (5 kg)', valid: true },
      { x: 50, y: 24, w: 42, h: 9, label: 'MRP (₹275.00)', valid: true },
      { x: 12, y: 38, w: 38, h: 8, label: 'Batch No & Mfg Date', valid: true },
      { x: 52, y: 38, w: 40, h: 8, label: 'Shelf Life / Expiry', valid: true },
      { x: 10, y: 52, w: 80, h: 14, label: 'Manufacturer Name & Address', valid: true },
      { x: 10, y: 70, w: 80, h: 14, label: 'Consumer Helpline Details', valid: true },
      { x: 12, y: 88, w: 38, h: 7, label: 'Country of Origin', valid: true }
    ]
  },
  {
    id: 'prod-002',
    name: 'Fortune Sunlite Refined Sunflower Oil',
    brand: 'Adani Wilmar Ltd',
    category: 'Edible Oil',
    packagingType: 'Flexible Pouch',
    pdpAreaCm2: 320,
    complianceScore: 84,
    status: 'Partially Compliant',
    lastScanDate: '2026-09-02 09:15',
    batchNo: 'AWL-SNO-442B',
    mrp: '₹148.00 (₹148.00/L)',
    netQuantity: '1 L (910 g)',
    mfgDate: '07/2026',
    expiryDate: 'Best before 9 months',
    countryOfOrigin: 'India',
    customerCare: 'customercare@adaniwilmar.in | 1800-233-9999',
    riskLevel: 'Medium Risk',
    colorTheme: '#D97706',
    fssaiLicNo: '10013021000812',
    isVegetarian: true,
    declarations: {
      manufacturer: { status: 'valid', value: 'Adani Wilmar Limited, Fortune House, Near Navrangpura Rly Crossing, Ahmedabad 380009', note: 'Address verified.' },
      generic_name: { status: 'valid', value: 'Refined Sunflower Oil', note: 'Generic name prominently visible.' },
      net_quantity: { status: 'warning', value: '1 L (910 g)', note: 'Dual declaration (Volume & Equivalent Weight) present, but font height is 2.4mm (legal minimum for 320 cm² PDP is 3.0mm).' },
      mrp: { status: 'valid', value: 'MRP ₹148.00 (incl. of all taxes) | USP ₹148.00 / L', note: 'Compliant with Unit Sale Price.' },
      mfg_date: { status: 'valid', value: '07/2026', note: 'Legible.' },
      expiry_date: { status: 'valid', value: 'Best before 9 months from manufacture', note: 'Valid.' },
      batch_no: { status: 'valid', value: 'AWL-SNO-442B', note: 'Valid.' },
      consumer_care: { status: 'valid', value: 'Toll-Free 1800-233-9999, customercare@adaniwilmar.in', note: 'Complete helpline present.' },
      country_of_origin: { status: 'valid', value: 'India', note: 'Declared.' }
    },
    ingredientsData: {
      rawText: 'INGREDIENTS: Refined Sunflower Oil, Permitted Antioxidant (INS 319 - TBHQ), Vitamin A (Retinyl Palmitate), Vitamin D2 (Ergocalciferol). Free from Argemone Oil.',
      isVegetarian: true,
      fssaiLicNo: '10013021000812',
      items: [
        { name: 'Refined Sunflower Oil', percentage: '99.9%', role: 'Primary Lipid Medium', nature: 'Plant Seed Oil', isKey: true },
        { name: 'Antioxidant (TBHQ - INS 319)', percentage: '<0.02%', role: 'Preservative / Oxidation Inhibitor', nature: 'Permitted Food Additive', isKey: false },
        { name: 'Vitamin A (Retinyl Palmitate)', percentage: '25 IU/g', role: 'Fortification Agent (FSSAI +F)', nature: 'Essential Micronutrient', isKey: false },
        { name: 'Vitamin D2 (Ergocalciferol)', percentage: '4.5 IU/g', role: 'Fortification Agent (FSSAI +F)', nature: 'Essential Micronutrient', isKey: false }
      ],
      allergens: ['Zero Identified Allergens'],
      additives: [
        { code: 'INS 319', name: 'TBHQ (Tertiary Butylhydroquinone)', type: 'Antioxidant', status: 'Approved (Max 200 ppm)' }
      ],
      nutritionPer100g: {
        energy: '900 kcal',
        protein: '0.0 g',
        carbohydrates: '0.0 g',
        totalFat: '100 g',
        saturatedFat: '11.0 g',
        monounsaturatedFat: '28.0 g',
        polyunsaturatedFat: '61.0 g',
        sodium: '0.0 mg'
      },
      complianceNotes: [
        { title: 'Argemone Oil Disclaimer', passed: true, note: 'Mandatory declaration "Free from Argemone Oil" present.' },
        { title: 'Fortification Logo (+F)', passed: true, note: '+F fortified with Vitamins A & D logo certified.' },
        { title: 'Additive INS Code', passed: true, note: 'INS 319 correctly identified alongside generic chemical name.' }
      ]
    },
    violations: [
      {
        id: 'viol-002-1',
        rule: 'Rule 7, Table-I',
        title: 'Font Size Below Legal Limit',
        severity: 'warning',
        color: 'orange',
        description: 'Net Quantity numeral font height measured at 2.4 mm. Packages with PDP area >100 to 500 cm² require minimum 3.0 mm numeral height.',
        penaltyEstimate: 'Rule 7 Rectification Notice'
      }
    ],
    recommendations: [
      { id: 'rec-21', text: 'Increase Net Quantity numeral height from 2.4 mm to minimum 3.0 mm to strictly comply with Rule 7 Table-I.', category: 'Typography', priority: 'High' },
      { id: 'rec-22', text: 'Ensure high contrast between yellow pouch background and dark text for better consumer legibility.', category: 'Design', priority: 'Medium' }
    ],
    ocrRawText: `FORTUNE SUNLITE
REFINED SUNFLOWER OIL
NET QUANTITY: 1 L (910 g)
MRP ₹148.00 INCL. OF ALL TAXES (₹148.00/L)
MFD: 07/2026  BATCH: AWL-SNO-442B
BEST BEFORE 9 MONTHS FROM DATE OF PACKAGING
INGREDIENTS: REFINED SUNFLOWER OIL, PERMITTED ANTIOXIDANT (INS 319), VITAMIN A, VITAMIN D. FREE FROM ARGEMONE OIL.
PACKED & MARKETED BY: ADANI WILMAR LIMITED
FORTUNE HOUSE, NR NAVRANGPURA, AHMEDABAD - 380009
CUSTOMER CARE: 1800-233-9999 | customercare@adaniwilmar.in
COUNTRY OF ORIGIN: INDIA`,
    boundingBoxes: [
      { x: 10, y: 10, w: 80, h: 14, label: 'Product Name', valid: true },
      { x: 12, y: 28, w: 45, h: 10, label: 'Net Quantity (Warning: 2.4mm)', valid: false, isWarning: true },
      { x: 58, y: 28, w: 34, h: 10, label: 'MRP & USP', valid: true },
      { x: 12, y: 44, w: 78, h: 10, label: 'Mfg Date & Batch', valid: true },
      { x: 10, y: 60, w: 80, h: 18, label: 'Packer & Helpline', valid: true },
      { x: 12, y: 84, w: 45, h: 8, label: 'Country of Origin', valid: true }
    ]
  },
  {
    id: 'prod-003',
    name: 'Glow & Bright Advanced Radiant Cream',
    brand: 'Aura Cosmetics Ltd',
    category: 'Personal Care & Cosmetics',
    packagingType: 'Laminated Tube & Carton',
    pdpAreaCm2: 120,
    complianceScore: 42,
    status: 'Non-Compliant',
    lastScanDate: '2026-09-02 11:40',
    batchNo: 'Missing',
    mrp: 'Rs. 299/-',
    netQuantity: '50 g',
    mfgDate: '11/25',
    expiryDate: 'Missing',
    countryOfOrigin: 'Missing',
    customerCare: 'Missing phone/email',
    riskLevel: 'High Risk',
    colorTheme: '#DC2626',
    fssaiLicNo: 'N/A (Cosmetics Lic No. COS/HP/2021/44)',
    isVegetarian: false,
    declarations: {
      manufacturer: { status: 'warning', value: 'Aura Cosmetics, Plot 14, Baddi Ind. Area, HP', note: 'Missing complete postal address and PIN code.' },
      generic_name: { status: 'valid', value: 'Skin Brightening Face Cream', note: 'Generic name detected.' },
      net_quantity: { status: 'valid', value: '50 g', note: 'Standard unit present.' },
      mrp: { status: 'missing', value: 'Rs. 299/-', note: 'Incorrect MRP declaration format. Fails Rule 6(1)(e): "inclusive of all taxes" omitted and Rs symbol used instead of standard ₹.' },
      mfg_date: { status: 'valid', value: '11/25', note: 'Month and year detected.' },
      expiry_date: { status: 'missing', value: 'Not Detected', note: 'Missing expiry date or best before period. Mandatory for cosmetics!' },
      batch_no: { status: 'missing', value: 'Not Detected', note: 'Batch number completely missing from carton and crimp.' },
      consumer_care: { status: 'missing', value: 'Not Detected', note: 'No telephone number, postal address, or email provided for consumer complaints.' },
      country_of_origin: { status: 'missing', value: 'Not Detected', note: 'Country of origin statement omitted.' }
    },
    ingredientsData: {
      rawText: 'INGREDIENTS: Aqua, Stearic Acid, Niacinamide, Glycerin, Isopropyl Myristate, Ethylhexyl Methoxycinnamate, Titanium Dioxide, Fragrance, Methylparaben, Propylparaben, Disodium EDTA.',
      isVegetarian: false,
      fssaiLicNo: 'Cosmetic Mfd Lic: COS/HP/2021/44',
      items: [
        { name: 'Demineralized Water (Aqua)', percentage: '65%', role: 'Vehicle / Base Solvent', nature: 'Purified Water', isKey: true },
        { name: 'Stearic Acid', percentage: '12%', role: 'Emulsifying Thickener', nature: 'Fatty Acid Derivative', isKey: false },
        { name: 'Niacinamide (Vitamin B3)', percentage: '3.5%', role: 'Active Skin Radiant Agent', nature: 'Active Cosmeceutical', isKey: true },
        { name: 'Glycerin', percentage: '5%', role: 'Humectant', nature: 'Skin Moisturizer', isKey: false },
        { name: 'Titanium Dioxide', percentage: '1.5%', role: 'Mineral UV Filter & Opacifier', nature: 'Mineral Pigment', isKey: false },
        { name: 'Parabens (Methyl & Propyl)', percentage: '0.4%', role: 'Chemical Preservatives', nature: 'Paraben Compound', isKey: false }
      ],
      allergens: ['Synthetic Fragrance / Linalool', 'Parabens Sensitivity'],
      additives: [
        { code: 'Parabens', name: 'Methylparaben & Propylparaben', type: 'Preservative', status: 'Caution: Flagged for Sensitive Skin' },
        { code: 'EDTA', name: 'Disodium EDTA', type: 'Chelating Agent', status: 'Approved' }
      ],
      nutritionPer100g: {
        formulationType: 'Oil-in-Water Emulsion',
        phValue: '5.8 (Dermal Safe)',
        heavyMetalsLead: '< 10 ppm (Compliant)',
        heavyMetalsMercury: 'Not Detected',
        microbialCount: '< 100 CFU/g'
      },
      complianceNotes: [
        { title: 'Ingredients Transparency', passed: true, note: 'Full chemical nomenclature list disclosed in descending order.' },
        { title: 'Cosmetic Shelf-Life Rule', passed: false, note: 'Violation: Expiration date or Period After Opening (PAO) missing!' },
        { title: 'Animal Origin Label', passed: false, note: 'Warning: Missing vegetarian/non-vegetarian soap-cosmetics indicator.' }
      ]
    },
    violations: [
      {
        id: 'viol-003-1',
        rule: 'Rule 6(1)(e)',
        title: 'Incorrect MRP Declaration',
        severity: 'critical',
        color: 'red',
        description: 'Declaration states "Rs. 299/-". Rule mandates "Maximum Retail Price ₹..." or "MRP ₹..." followed by "inclusive of all taxes".',
        penaltyEstimate: 'Section 36(1): Fine up to ₹25,000'
      },
      {
        id: 'viol-003-2',
        rule: 'Rule 6(1)(d)',
        title: 'Missing Expiry Date',
        severity: 'critical',
        color: 'red',
        description: 'Expiry date / Best before declaration is completely absent on cosmetics package.',
        penaltyEstimate: 'Section 36(1) & Drugs/Cosmetics Rules'
      },
      {
        id: 'viol-003-3',
        rule: 'Rule 6(1)(f)',
        title: 'Missing Consumer Care Details',
        severity: 'critical',
        color: 'red',
        description: 'No helpline number or email address provided for consumer redressal.',
        penaltyEstimate: 'Rule 6(1)(f) Non-compliance'
      },
      {
        id: 'viol-003-4',
        rule: 'Rule 6(1)(g)',
        title: 'Missing Country of Origin',
        severity: 'critical',
        color: 'red',
        description: 'Country of origin is missing on the packaging.',
        penaltyEstimate: 'Mandatory 2020 Amendment Breach'
      }
    ],
    recommendations: [
      { id: 'rec-31', text: 'Add explicit expiry date / Best before period declaration immediately.', category: 'Legal Urgency', priority: 'Critical' },
      { id: 'rec-32', text: 'Reposition and reformat MRP: Use "MRP ₹ 299.00 (incl. of all taxes)" + Unit Sale Price (₹5.98/g).', category: 'Pricing Rule', priority: 'High' },
      { id: 'rec-33', text: 'Insert complete consumer care contact: Email, Phone/Toll-Free, and official physical address with PIN code.', category: 'Consumer Redressal', priority: 'High' },
      { id: 'rec-34', text: 'Include "Country of Origin: India" prominently.', category: 'Origin Compliance', priority: 'High' }
    ],
    ocrRawText: `GLOW & BRIGHT ADVANCED RADIANT CREAM
SKIN BRIGHTENING FACE CREAM
NET WT: 50 g
Rs. 299/-
MFD 11/25
INGREDIENTS: AQUA, STEARIC ACID, NIACINAMIDE, GLYCERIN, ISOPROPYL MYRISTATE, TITANIUM DIOXIDE, FRAGRANCE, METHYLPARABEN.
MFD BY: AURA COSMETICS
PLOT 14 BADDI INDUSTRIAL AREA HP`,
    boundingBoxes: [
      { x: 10, y: 12, w: 80, h: 15, label: 'Generic Product Name', valid: true },
      { x: 12, y: 32, w: 35, h: 10, label: 'Net Quantity', valid: true },
      { x: 50, y: 32, w: 40, h: 12, label: '❌ Incorrect MRP (Missing Taxes)', valid: false },
      { x: 12, y: 50, w: 40, h: 10, label: 'Mfg Date (Expiry Missing)', valid: false },
      { x: 10, y: 66, w: 80, h: 18, label: '⚠️ Incomplete Address (No PIN)', valid: false }
    ]
  },
  {
    id: 'prod-004',
    name: 'Parle-G Gold Glucose Biscuits',
    brand: 'Parle Products Pvt Ltd',
    category: 'Biscuits & Bakery',
    packagingType: 'BOPP Pillow Pack',
    pdpAreaCm2: 180,
    complianceScore: 95,
    status: 'Compliant',
    lastScanDate: '2026-09-02 12:05',
    batchNo: 'P-GLD-8891A',
    mrp: '₹10.00 (₹0.10/g)',
    netQuantity: '100 g',
    mfgDate: '08/2026',
    expiryDate: 'Best before 6 months',
    countryOfOrigin: 'India',
    countryOfOriginValue: 'Made in India',
    customerCare: 'cs@parle.biz | 022-66916911',
    riskLevel: 'Low Risk',
    colorTheme: '#0F766E',
    fssaiLicNo: '10013022000225',
    isVegetarian: true,
    declarations: {
      manufacturer: { status: 'valid', value: 'Parle Products Pvt. Ltd., V.S. Khandekar Marg, Vile Parle East, Mumbai 400057', note: 'Complete registered office address.' },
      generic_name: { status: 'valid', value: 'Glucose Biscuits', note: 'Prominent on front panel.' },
      net_quantity: { status: 'valid', value: '100 g', note: 'Standard unit.' },
      mrp: { status: 'valid', value: 'MRP ₹10.00 (incl. of all taxes) | USP ₹0.10 / g', note: 'Fully compliant.' },
      mfg_date: { status: 'valid', value: '08/2026', note: 'Clear.' },
      expiry_date: { status: 'valid', value: 'Best before 6 months from packaging', note: 'Clear.' },
      batch_no: { status: 'valid', value: 'P-GLD-8891A', note: 'Clear.' },
      consumer_care: { status: 'valid', value: 'Consumer Care, Parle Products, 022-66916911, cs@parle.biz', note: 'Valid.' },
      country_of_origin: { status: 'valid', value: 'Made in India', note: 'Valid.' }
    },
    ingredientsData: {
      rawText: 'INGREDIENTS: Refined Wheat Flour (Maida) 65%, Sugar 24%, Edible Vegetable Oil (Palm Oil), Invert Sugar Syrup, Raising Agents [INS 503(ii), INS 500(ii)], Salt, Milk Solids (0.6%), Emulsifier [INS 322 from Soy], Dough Conditioner [INS 223]. CONTAINS WHEAT, MILK AND SOY. CONTAINS ADDED FLAVOUR (ARTIFICIAL FLAVOURING SUBSTANCES - MILK & VANILLA).',
      isVegetarian: true,
      fssaiLicNo: '10013022000225',
      items: [
        { name: 'Refined Wheat Flour (Maida)', percentage: '65%', role: 'Cereal Flour Base', nature: 'Milled Grain', isKey: true },
        { name: 'Sugar', percentage: '24%', role: 'Sweetener & Texture', nature: 'Cane Sugar', isKey: true },
        { name: 'Edible Vegetable Oil (Palm Oil)', percentage: '8.5%', role: 'Shortening / Fat', nature: 'Refined Palm', isKey: false },
        { name: 'Invert Sugar Syrup', percentage: '1.2%', role: 'Moisture Retention & Browning', nature: 'Simple Sugar', isKey: false },
        { name: 'Milk Solids', percentage: '0.6%', role: 'Dairy Enrichment', nature: 'Dairy Solid', isKey: false },
        { name: 'Iodised Salt', percentage: '0.4%', role: 'Flavor Enhancer', nature: 'Mineral Salt', isKey: false }
      ],
      allergens: ['Wheat (Gluten)', 'Milk Solids (Lactose)', 'Soy (Lecithin)'],
      additives: [
        { code: 'INS 503(ii)', name: 'Ammonium Hydrogen Carbonate', type: 'Raising Agent', status: 'Approved' },
        { code: 'INS 500(ii)', name: 'Sodium Hydrogen Carbonate', type: 'Raising Agent', status: 'Approved' },
        { code: 'INS 322', name: 'Lecithin (Soy Source)', type: 'Emulsifier', status: 'Approved' },
        { code: 'INS 223', name: 'Sodium Metabisulphite', type: 'Dough Conditioner', status: 'Approved (Contains Sulphites)' }
      ],
      nutritionPer100g: {
        energy: '454 kcal',
        protein: '6.7 g',
        carbohydrates: '77.1 g',
        addedSugar: '25.5 g',
        totalFat: '13.2 g',
        saturatedFat: '6.2 g',
        sodium: '280 mg'
      },
      complianceNotes: [
        { title: 'QUID Flour & Sugar %', passed: true, note: 'Wheat flour (65%) and Sugar (24%) percentages clearly declared.' },
        { title: 'Allergen Box Warning', passed: true, note: '"Contains Wheat, Milk and Soy" clearly emphasized in bold uppercase.' },
        { title: 'Flavor Declaration', passed: true, note: '"Contains Added Artificial Vanilla & Milk Flavors" printed as per Rule 6.' }
      ]
    },
    violations: [],
    recommendations: [
      { id: 'rec-41', text: 'Label complies with all packaging standards under Legal Metrology Rules, 2011.', category: 'Audit Passed', priority: 'Low' }
    ],
    ocrRawText: `PARLE-G GOLD GLUCOSE BISCUITS
NET QUANTITY: 100 g
MRP ₹10.00 INCL. OF ALL TAXES (USP ₹0.10/g)
PKD: 08/2026  BATCH: P-GLD-8891A
BEST BEFORE 6 MONTHS FROM PACKAGING
INGREDIENTS: REFINED WHEAT FLOUR (MAIDA) 65%, SUGAR 24%, PALM OIL, RAISING AGENTS [503(ii), 500(ii)], MILK SOLIDS (0.6%), SOY LECITHIN. CONTAINS WHEAT, MILK, SOY.
MFD & MKTD BY: PARLE PRODUCTS PVT LTD
V.S. KHANDEKAR MARG, VILE PARLE (EAST), MUMBAI - 400057
CONSUMER HELPLINE: 022-66916911 | cs@parle.biz
MADE IN INDIA`,
    boundingBoxes: [
      { x: 10, y: 10, w: 80, h: 14, label: 'Brand & Generic Name', valid: true },
      { x: 12, y: 28, w: 35, h: 10, label: 'Net Quantity', valid: true },
      { x: 50, y: 28, w: 42, h: 10, label: 'MRP & USP', valid: true },
      { x: 12, y: 44, w: 78, h: 10, label: 'Mfg & Batch No', valid: true },
      { x: 10, y: 60, w: 80, h: 18, label: 'Manufacturer & Care', valid: true },
      { x: 12, y: 84, w: 45, h: 8, label: 'Country of Origin', valid: true }
    ]
  },
  {
    id: 'prod-005',
    name: 'Everest Super Garam Masala',
    brand: 'Everest Food Products',
    category: 'Spices & Condiments',
    packagingType: 'Monocarton with Inner Foil',
    pdpAreaCm2: 160,
    complianceScore: 91,
    status: 'Compliant',
    lastScanDate: '2026-09-02 13:10',
    batchNo: 'EV-GM-7023',
    mrp: '₹88.00 (₹0.88/g)',
    netQuantity: '100 g',
    mfgDate: '06/2026',
    expiryDate: 'Best before 12 months',
    countryOfOrigin: 'India',
    customerCare: 'customercare@everestspices.com | 1800-22-3837',
    riskLevel: 'Low Risk',
    colorTheme: '#B91C1C',
    fssaiLicNo: '10012022000078',
    isVegetarian: true,
    declarations: {
      manufacturer: { status: 'valid', value: 'Everest Food Products Pvt Ltd, Krushal Commercial Complex, Chembur West, Mumbai 400089', note: 'Complete.' },
      generic_name: { status: 'valid', value: 'Garam Masala Blend', note: 'Valid.' },
      net_quantity: { status: 'valid', value: '100 g', note: 'Valid.' },
      mrp: { status: 'valid', value: 'MRP ₹88.00 (incl. of all taxes) | USP ₹0.88 / g', note: 'Valid.' },
      mfg_date: { status: 'valid', value: '06/2026', note: 'Valid.' },
      expiry_date: { status: 'valid', value: 'Best before 12 months from packing', note: 'Valid.' },
      batch_no: { status: 'valid', value: 'EV-GM-7023', note: 'Valid.' },
      consumer_care: { status: 'valid', value: '1800-22-3837, customercare@everestspices.com', note: 'Valid.' },
      country_of_origin: { status: 'valid', value: 'India', note: 'Valid.' }
    },
    ingredientsData: {
      rawText: 'INGREDIENTS: Coriander, Cumin, Black Pepper, Dry Ginger, Cassia Bark (Taj), Cardamom Green, Clove, Nutmeg, Mace, Black Cardamom, Star Anise, Bay Leaf, Caraway. 100% PURE SPICES.',
      isVegetarian: true,
      fssaiLicNo: '10012022000078',
      items: [
        { name: 'Coriander Seeds', percentage: '32%', role: 'Aromatic Spice Base', nature: 'Whole Ground Spice', isKey: true },
        { name: 'Cumin (Jeera)', percentage: '18%', role: 'Flavor Core', nature: 'Whole Ground Spice', isKey: true },
        { name: 'Black Pepper', percentage: '12%', role: 'Pungency & Warmth', nature: 'Whole Ground Spice', isKey: false },
        { name: 'Cassia Bark / Cinnamon', percentage: '9%', role: 'Sweet Aromatic Spice', nature: 'Natural Bark', isKey: false },
        { name: 'Green & Black Cardamom', percentage: '8%', role: 'Premium Aromatics', nature: 'Whole Spice Pod', isKey: false },
        { name: 'Clove & Nutmeg Blend', percentage: '6%', role: 'Rich Warming Spices', nature: 'Whole Spice', isKey: false }
      ],
      allergens: ['Zero Added Allergens', 'Processed in facility handling Mustard & Sesame'],
      additives: [
        { code: 'None', name: 'Zero Artificial Color or Starch Fillers', type: 'Pure Ground Spice', status: 'Clean' }
      ],
      nutritionPer100g: {
        energy: '392 kcal',
        protein: '12.4 g',
        carbohydrates: '51.8 g',
        addedSugar: '0.0 g',
        totalFat: '15.6 g',
        dietaryFiber: '24.1 g',
        sodium: '72 mg'
      },
      complianceNotes: [
        { title: 'Pure Spice Standard', passed: true, note: 'Agmark Grade-1 spice purity compliance declared.' },
        { title: 'No Added Color / MSG', passed: true, note: 'Explicit "No artificial colors or preservatives" statement verified.' }
      ]
    },
    violations: [],
    recommendations: [
      { id: 'rec-51', text: 'All standards satisfied. Packaging print is well within legal font tolerances.', category: 'Status', priority: 'Low' }
    ],
    ocrRawText: `EVEREST SUPER GARAM MASALA
SPICE BLEND
NET QTY: 100 g
MRP ₹88.00 (INCL. OF ALL TAXES)  USP: ₹0.88/g
MFD: 06/2026  BATCH: EV-GM-7023
BEST BEFORE 12 MONTHS FROM PACKAGING
INGREDIENTS: CORIANDER, CUMIN, BLACK PEPPER, DRY GINGER, CASSIA, CARDAMOM, CLOVE, NUTMEG, MACE. NO PRESERVATIVES.
EVEREST FOOD PRODUCTS PVT LTD, MUMBAI 400089
FEEDBACK: 1800-22-3837 | customercare@everestspices.com
COUNTRY OF ORIGIN: INDIA`,
    boundingBoxes: [
      { x: 10, y: 10, w: 80, h: 14, label: 'Product Name', valid: true },
      { x: 12, y: 28, w: 40, h: 10, label: 'Net Quantity', valid: true },
      { x: 55, y: 28, w: 38, h: 10, label: 'MRP & USP', valid: true },
      { x: 12, y: 44, w: 78, h: 10, label: 'Dates & Batch', valid: true },
      { x: 10, y: 60, w: 80, h: 18, label: 'Manufacturer & Helpline', valid: true },
      { x: 12, y: 84, w: 45, h: 8, label: 'Origin', valid: true }
    ]
  },
  {
    id: 'prod-006',
    name: 'Himalaya Purifying Neem Face Wash',
    brand: 'The Himalaya Drug Company',
    category: 'Personal Care & Cosmetics',
    packagingType: 'Co-ex Tube',
    pdpAreaCm2: 110,
    complianceScore: 64,
    status: 'Partially Compliant',
    lastScanDate: '2026-09-02 14:02',
    batchNo: 'HDC-NFW-26',
    mrp: '₹175.00',
    netQuantity: '150 ml',
    mfgDate: '05/2026',
    expiryDate: 'Exp: 04/2029',
    countryOfOrigin: 'Missing',
    customerCare: 'contactus@himalayawellness.com | 1800-208-1930',
    riskLevel: 'Medium Risk',
    colorTheme: '#047857',
    fssaiLicNo: 'Ayush Ayurvedic Proprietary Medicine Lic. L-AY-12/2018',
    isVegetarian: true,
    declarations: {
      manufacturer: { status: 'valid', value: 'The Himalaya Drug Company, Makali, Bengaluru 562162, Karnataka', note: 'Valid address.' },
      generic_name: { status: 'valid', value: 'Purifying Neem Face Wash', note: 'Generic name clear.' },
      net_quantity: { status: 'valid', value: '150 ml', note: 'Valid volume unit.' },
      mrp: { status: 'warning', value: 'MRP ₹175.00 (incl. of all taxes)', note: 'Missing Unit Sale Price (USP ₹1.17/ml required under 2022 amendment for packaged goods > 100ml).' },
      mfg_date: { status: 'valid', value: '05/2026', note: 'Valid.' },
      expiry_date: { status: 'valid', value: 'Exp: 04/2029 (36 months)', note: 'Valid.' },
      batch_no: { status: 'valid', value: 'HDC-NFW-26', note: 'Valid.' },
      consumer_care: { status: 'valid', value: '1800-208-1930, contactus@himalayawellness.com', note: 'Valid.' },
      country_of_origin: { status: 'missing', value: 'Not Declared', note: 'Country of origin is not explicitly stated on back panel.' }
    },
    ingredientsData: {
      rawText: 'EACH ML CONTAINS: EXTRACTS: Nimba (Melia Azadirachta Leaf Extract) 50mg, Haridra (Curcuma Longa Rhizome Extract) 50mg. BASE QS. INACTIVES: Aqua, Ammonium Lauryl Sulfate, Cocamidopropyl Betaine, Glycerin, Sodium Hydroxide, Disodium EDTA, Fragrance, Phenoxyethanol, CI 19140, CI 42090.',
      isVegetarian: true,
      fssaiLicNo: 'Ayurvedic Lic. No. L-AY-12/2018',
      items: [
        { name: 'Melia Azadirachta (Neem) Leaf Extract', percentage: '50 mg/ml', role: 'Active Antibacterial Botanical', nature: 'Herbal Extract', isKey: true },
        { name: 'Curcuma Longa (Turmeric) Rhizome Extract', percentage: '50 mg/ml', role: 'Active Anti-inflammatory Botanical', nature: 'Herbal Extract', isKey: true },
        { name: 'Ammonium Lauryl Sulfate', percentage: '15%', role: 'Soap-Free Cleansing Surfactant', nature: 'Anionic Cleanser', isKey: false },
        { name: 'Glycerin', percentage: '6%', role: 'Hydrating Humectant', nature: 'Natural Moisturizer', isKey: false },
        { name: 'Phenoxyethanol', percentage: '0.5%', role: 'Broad Spectrum Preservative', nature: 'Preservative', isKey: false }
      ],
      allergens: ['Perfume Fragrance Allergens', 'Botanical Sensitizers'],
      additives: [
        { code: 'CI 19140', name: 'Tartrazine (Yellow 5)', type: 'Cosmetic Colorant', status: 'Approved' },
        { code: 'CI 42090', name: 'Brilliant Blue (Blue 1)', type: 'Cosmetic Colorant', status: 'Approved' }
      ],
      nutritionPer100g: {
        formulationType: 'Ayurvedic Gel Cleanser',
        activeHerbalContent: '10% v/w Botanical Extracts',
        freeFromSoap: 'Yes (100% Soap Free)',
        dermatologicallyTested: 'Hypoallergenic Certified'
      },
      complianceNotes: [
        { title: 'Active Botanical QUID', passed: true, note: '50mg per ml active Neem & Haridra quantitative dosage declared.' },
        { title: 'Unit Sale Price Missing', passed: false, note: 'Violation: Unit sale price (₹1.17/ml) missing for >100ml pack.' }
      ]
    },
    violations: [
      {
        id: 'viol-006-1',
        rule: 'Rule 6(1)(e) Proviso',
        title: 'Missing Unit Sale Price (USP)',
        severity: 'warning',
        color: 'orange',
        description: 'Unit Sale Price (₹/ml) is absent on retail container with volume > 100 ml.',
        penaltyEstimate: 'Rectification Notice under Rule 6(1)(e)'
      },
      {
        id: 'viol-006-2',
        rule: 'Rule 6(1)(g)',
        title: 'Missing Country of Origin',
        severity: 'warning',
        color: 'orange',
        description: 'No explicit "Made in India" or "Country of Origin: India" statement located.',
        penaltyEstimate: 'Section 36(1) Notice'
      }
    ],
    recommendations: [
      { id: 'rec-61', text: 'Add Unit Sale Price declaration: "USP: ₹1.17 per ml" alongside the MRP.', category: 'Price Transparency', priority: 'High' },
      { id: 'rec-62', text: 'Print "Country of Origin: India" in proximity to the manufacturer address.', category: 'Mandatory Declaration', priority: 'High' }
    ],
    ocrRawText: `HIMALAYA PURIFYING NEEM FACE WASH
SOAP-FREE HERBAL FORMULATION
NET VOLUME: 150 ml
MRP ₹175.00 (INCL. OF ALL TAXES)
MFD: 05/2026  EXP: 04/2029
BATCH: HDC-NFW-26
INGREDIENTS: NEEM EXTRACT (50mg), TURMERIC EXTRACT (50mg), AQUA, AMMONIUM LAURYL SULFATE, GLYCERIN, PHENOXYETHANOL.
MFD BY: THE HIMALAYA DRUG COMPANY
MAKALI, BENGALURU - 562162, KARNATAKA
CUSTOMER CARE: 1800-208-1930 | contactus@himalayawellness.com`,
    boundingBoxes: [
      { x: 10, y: 10, w: 80, h: 14, label: 'Product Generic Name', valid: true },
      { x: 12, y: 28, w: 35, h: 10, label: 'Net Volume (150 ml)', valid: true },
      { x: 50, y: 28, w: 42, h: 10, label: '⚠️ MRP (Missing USP)', valid: false, isWarning: true },
      { x: 12, y: 44, w: 78, h: 10, label: 'Mfg & Exp Dates', valid: true },
      { x: 10, y: 60, w: 80, h: 18, label: 'Manufacturer & Care', valid: true },
      { x: 12, y: 84, w: 45, h: 8, label: '❌ Country of Origin Missing', valid: false }
    ]
  },
  {
    id: 'prod-007',
    name: 'Artisan Belgian Cocoa Hazelnut Spread',
    brand: 'ChocoChâteau Imported',
    category: 'Imported Confectionery',
    packagingType: 'Glass Jar',
    pdpAreaCm2: 240,
    complianceScore: 38,
    status: 'Non-Compliant',
    lastScanDate: '2026-09-02 14:45',
    batchNo: 'BE-990-26B',
    mrp: '€ 4.50 (No INR MRP)',
    netQuantity: '12 oz (340 g)',
    mfgDate: 'Missing',
    expiryDate: 'Exp: 10/2027',
    countryOfOrigin: 'Belgium',
    customerCare: 'Missing Indian Contact',
    riskLevel: 'High Risk',
    colorTheme: '#7F1D1D',
    fssaiLicNo: 'Missing Indian FSSAI Importer Lic',
    isVegetarian: true,
    declarations: {
      manufacturer: { status: 'warning', value: 'ChocoChâteau BV, Gent, Belgium', note: 'Foreign manufacturer stated, but NO registered Indian Importer / Marketer name or address is affixed!' },
      generic_name: { status: 'valid', value: 'Cocoa Hazelnut Spread', note: 'Valid.' },
      net_quantity: { status: 'warning', value: '12 oz (340 g)', note: 'Non-standard imperial unit (oz) displayed prominently over standard SI unit.' },
      mrp: { status: 'missing', value: '€ 4.50', note: 'Violation of Rule 6(1)(e): MRP in Indian Rupees (₹) with all taxes is completely missing!' },
      mfg_date: { status: 'missing', value: 'Not Detected', note: 'Import/Packing date not declared.' },
      expiry_date: { status: 'valid', value: 'Exp: 10/2027', note: 'Valid.' },
      batch_no: { status: 'valid', value: 'BE-990-26B', note: 'Valid.' },
      consumer_care: { status: 'missing', value: 'Not Detected', note: 'No domestic Indian consumer redressal cell with telephone or address.' },
      country_of_origin: { status: 'valid', value: 'Made in Belgium', note: 'Valid.' }
    },
    ingredientsData: {
      rawText: 'INGREDIENTS: Sugar, Sustainable Palm Oil, Hazelnuts (13%), Skimmed Milk Powder (8.7%), Fat-Reduced Cocoa Powder (7.4%), Emulsifier: Lecithins (Soya), Vanillin. ALLERGEN INFORMATION: Contains Hazelnuts, Milk, Soya.',
      isVegetarian: true,
      fssaiLicNo: 'Missing Indian Importer FSSAI No.',
      items: [
        { name: 'Sugar', percentage: '54%', role: 'Primary Sweetener', nature: 'Refined Sugar', isKey: true },
        { name: 'Sustainable Palm Oil', percentage: '16%', role: 'Lipid Base / Spreadability', nature: 'Vegetable Fat', isKey: false },
        { name: 'Roasted Hazelnuts', percentage: '13%', role: 'Characterizing Nut Ingredient', nature: 'Tree Nut', isKey: true },
        { name: 'Skimmed Milk Powder', percentage: '8.7%', role: 'Dairy Solids', nature: 'Milk Powder', isKey: true },
        { name: 'Fat-Reduced Cocoa Powder', percentage: '7.4%', role: 'Cocoa Solids', nature: 'Cocoa', isKey: true },
        { name: 'Soya Lecithin (INS 322)', percentage: '0.5%', role: 'Emulsifier', nature: 'Soy Derivative', isKey: false }
      ],
      allergens: ['Tree Nuts (Hazelnuts 13%)', 'Milk Solids (Dairy Lactose)', 'Soy (Lecithin)'],
      additives: [
        { code: 'INS 322', name: 'Lecithins (Soya)', type: 'Emulsifier', status: 'Approved' },
        { code: 'Flavor', name: 'Vanillin (Synthetic Flavor)', type: 'Flavoring', status: 'Approved' }
      ],
      nutritionPer100g: {
        energy: '539 kcal',
        protein: '6.3 g',
        carbohydrates: '57.5 g',
        addedSugar: '56.3 g',
        totalFat: '30.9 g',
        saturatedFat: '10.6 g',
        sodium: '42 mg'
      },
      complianceNotes: [
        { title: 'EU QUID Hazelnuts %', passed: true, note: 'Hazelnuts (13%) and Cocoa (7.4%) disclosed.' },
        { title: 'Missing Indian Importer Sticker', passed: false, note: 'Critical: No FSSAI Importer details or INR pricing affixed.' },
        { title: 'Missing Indian Veg Green Dot', passed: false, note: 'Violation: Mandatory Indian Vegetarian Green Dot symbol missing on foreign package.' }
      ]
    },
    violations: [
      {
        id: 'viol-007-1',
        rule: 'Rule 6(1)(e)',
        title: 'Missing INR MRP Declaration',
        severity: 'critical',
        color: 'red',
        description: 'Package displays foreign currency (€ 4.50). Legal Metrology mandates Indian Rupee (₹) MRP inclusive of all local taxes.',
        penaltyEstimate: 'Section 36(1): Fine up to ₹25,000 + Seizure'
      },
      {
        id: 'viol-007-2',
        rule: 'Rule 6(1)(a)',
        title: 'Missing Indian Importer Details',
        severity: 'critical',
        color: 'red',
        description: 'For imported goods, the name, complete address, and registration number of the Indian importer/packer must be affixed via non-detachable sticker or overprint.',
        penaltyEstimate: 'Immediate Seizure of Consignment'
      },
      {
        id: 'viol-007-3',
        rule: 'Rule 6(1)(f)',
        title: 'Missing Consumer Care Helpline',
        severity: 'critical',
        color: 'red',
        description: 'No Indian helpline or consumer email for complaint redressal.',
        penaltyEstimate: 'Section 36(1) Notice'
      }
    ],
    recommendations: [
      { id: 'rec-71', text: 'Affix tamper-evident supplementary label with: Importer Name & Address, MRP in Indian Rupees (₹) incl. of all taxes, and Month/Year of Import.', category: 'Import Compliance', priority: 'Critical' },
      { id: 'rec-72', text: 'Establish an Indian Consumer Care Cell with registered phone and email address.', category: 'Consumer Protection', priority: 'Critical' }
    ],
    ocrRawText: `ARTISAN BELGIAN COCOA HAZELNUT SPREAD
NET WT: 12 oz (340 g)
PRICE: € 4.50
EXP: 10/2027  LOT: BE-990-26B
INGREDIENTS: SUGAR, PALM OIL, HAZELNUTS (13%), SKIMMED MILK POWDER (8.7%), COCOA (7.4%), SOY LECITHIN, VANILLIN.
PRODUCED BY: CHCOCHATEAU BV, GENT, BELGIUM
PRODUCT OF BELGIUM`,
    boundingBoxes: [
      { x: 10, y: 10, w: 80, h: 14, label: 'Generic Product Name', valid: true },
      { x: 12, y: 28, w: 40, h: 10, label: '⚠️ Net Weight (Imperial oz)', valid: false, isWarning: true },
      { x: 55, y: 28, w: 38, h: 10, label: '❌ Non-INR Price (€)', valid: false },
      { x: 12, y: 44, w: 78, h: 10, label: 'Expiry & Lot', valid: true },
      { x: 10, y: 60, w: 80, h: 18, label: '❌ Foreign Maker Only (No Importer)', valid: false },
      { x: 12, y: 84, w: 45, h: 8, label: 'Country of Origin (Belgium)', valid: true }
    ]
  },
  {
    id: 'prod-008',
    name: 'Tata Salt Vacuum Evaporated Iodised Salt',
    brand: 'Tata Consumer Products Ltd',
    category: 'Staples & Salt',
    packagingType: 'Multi-layer Poly Pouch',
    pdpAreaCm2: 360,
    complianceScore: 96,
    status: 'Compliant',
    lastScanDate: '2026-09-02 15:30',
    batchNo: 'TT-SLT-904K',
    mrp: '₹28.00 (₹28.00/kg)',
    netQuantity: '1 kg',
    mfgDate: '07/2026',
    expiryDate: 'Best before 24 months',
    countryOfOrigin: 'India',
    customerCare: 'care@tataconsumer.com | 1800-345-1720',
    riskLevel: 'Low Risk',
    colorTheme: '#1E3A8A',
    fssaiLicNo: '10014031001025',
    isVegetarian: true,
    declarations: {
      manufacturer: { status: 'valid', value: 'Tata Consumer Products Ltd, 1 Bishop Lefroy Road, Kolkata 700020, West Bengal', note: 'Valid.' },
      generic_name: { status: 'valid', value: 'Vacuum Evaporated Iodised Salt', note: 'Valid.' },
      net_quantity: { status: 'valid', value: '1 kg', note: 'Valid.' },
      mrp: { status: 'valid', value: 'MRP ₹28.00 (incl. of all taxes) | USP ₹28.00 / kg', note: 'Valid.' },
      mfg_date: { status: 'valid', value: '07/2026', note: 'Valid.' },
      expiry_date: { status: 'valid', value: 'Best before 24 months from packing', note: 'Valid.' },
      batch_no: { status: 'valid', value: 'TT-SLT-904K', note: 'Valid.' },
      consumer_care: { status: 'valid', value: '1800-345-1720, care@tataconsumer.com', note: 'Valid.' },
      country_of_origin: { status: 'valid', value: 'India', note: 'Valid.' }
    },
    ingredientsData: {
      rawText: 'INGREDIENTS: Edible Common Salt, Permitted Anti-caking Agent (INS 551), Potassium Iodate. Iodine Content: Not less than 15 ppm when packed and not less than 30 ppm on dry weight basis.',
      isVegetarian: true,
      fssaiLicNo: '10014031001025',
      items: [
        { name: 'Edible Common Salt (NaCl)', percentage: '99.4%', role: 'Mineral Salt Core', nature: 'Vacuum Evaporated Sea Salt', isKey: true },
        { name: 'Anti-caking Agent (INS 551 - Silicon Dioxide)', percentage: '< 0.5%', role: 'Free Flow Agent', nature: 'Amorphous Silica', isKey: false },
        { name: 'Potassium Iodate (KIO3)', percentage: '30 ppm', role: 'Mandatory Public Health Micronutrient', nature: 'Iodine Fortification', isKey: true }
      ],
      allergens: ['Zero Identified Food Allergens'],
      additives: [
        { code: 'INS 551', name: 'Silicon Dioxide (Amorphous)', type: 'Anti-Caking Agent', status: 'Approved (Max 1%)' }
      ],
      nutritionPer100g: {
        energy: '0 kcal',
        protein: '0.0 g',
        carbohydrates: '0.0 g',
        sodium: '38,700 mg (38.7 g)',
        iodine: '1,500 mcg',
        moisture: '< 0.2%'
      },
      complianceNotes: [
        { title: 'Iodine Statutory Threshold', passed: true, note: 'Iodine >15 ppm at retail level verified.' },
        { title: 'Vacuum Evaporated Seal', passed: true, note: 'Manufacturing process certification declared.' },
        { title: 'INS Code Disclosure', passed: true, note: 'Anti-caking agent INS 551 compliant with FSSAI regulations.' }
      ]
    },
    violations: [],
    recommendations: [
      { id: 'rec-81', text: 'Exemplary packaging compliance across all Legal Metrology Rule 6 guidelines.', category: 'Audit Status', priority: 'Low' }
    ],
    ocrRawText: `TATA SALT
VACUUM EVAPORATED IODISED SALT
DESH KA NAMAK
NET QUANTITY: 1 kg
MRP ₹28.00 (INCL. OF ALL TAXES)  USP: ₹28.00/kg
PKD: 07/2026  BATCH: TT-SLT-904K
BEST BEFORE 24 MONTHS FROM DATE OF PACKAGING
INGREDIENTS: EDIBLE COMMON SALT, ANTI-CAKING AGENT (INS 551), POTASSIUM IODATE. IODINE > 15 PPM.
MKT BY: TATA CONSUMER PRODUCTS LTD
1 BISHOP LEFROY ROAD, KOLKATA - 700020
CUSTOMER CARE: 1800-345-1720 | care@tataconsumer.com
COUNTRY OF ORIGIN: INDIA`,
    boundingBoxes: [
      { x: 10, y: 10, w: 80, h: 14, label: 'Generic Name', valid: true },
      { x: 12, y: 28, w: 35, h: 10, label: 'Net Quantity (1 kg)', valid: true },
      { x: 50, y: 28, w: 42, h: 10, label: 'MRP & USP', valid: true },
      { x: 12, y: 44, w: 78, h: 10, label: 'Mfg Date & Batch', valid: true },
      { x: 10, y: 60, w: 80, h: 18, label: 'Manufacturer & Care', valid: true },
      { x: 12, y: 84, w: 45, h: 8, label: 'Country of Origin', valid: true }
    ]
  }
];

export const MOCK_INSPECTION_HISTORY = [
  { id: 'INSP-2026-901', date: '2026-09-02 11:30', officer: 'S. K. Gupta (Zone-1)', location: 'Reliance Fresh Superstore, Connaught Place, New Delhi', status: 'Seizure Issued', productsChecked: 14, violationsFound: 3 },
  { id: 'INSP-2026-902', date: '2026-09-02 09:15', officer: 'Inspector S. Patel (Zone-3)', location: 'D-Mart Mega Store, SG Highway, Ahmedabad', status: 'Notice Dispatched', productsChecked: 28, violationsFound: 1 },
  { id: 'INSP-2026-903', date: '2026-09-01 16:45', officer: 'Inspector V. Anand (Zone-2)', location: 'Spencer’s Retail, Park Street, Kolkata', status: 'Passed Verified', productsChecked: 32, violationsFound: 0 },
  { id: 'INSP-2026-904', date: '2026-09-01 14:10', officer: 'S. K. Gupta (Zone-1)', location: 'BigBasket Fulfillment Hub, Okhla Phase III, New Delhi', status: 'Rectification Order', productsChecked: 45, violationsFound: 2 },
  { id: 'INSP-2026-905', date: '2026-08-31 10:20', officer: 'Inspector K. Reddy (Zone-4)', location: 'Ratnadeep Supermarket, Banjara Hills, Hyderabad', status: 'Passed Verified', productsChecked: 21, violationsFound: 0 }
];

export const MOCK_ANALYTICS_DATA = {
  monthlyCompliance: [
    { month: 'Apr 2026', rate: 86, scanned: 940, violations: 131 },
    { month: 'May 2026', rate: 88, scanned: 1120, violations: 134 },
    { month: 'Jun 2026', rate: 89, scanned: 1250, violations: 137 },
    { month: 'Jul 2026', rate: 91, scanned: 1410, violations: 126 },
    { month: 'Aug 2026', rate: 93, scanned: 1580, violations: 110 },
    { month: 'Sep 2026', rate: 94, scanned: 1690, violations: 101 }
  ],
  violationCategories: [
    { name: 'MRP & USP Issues', value: 34, color: '#EF4444' },
    { name: 'Missing Expiry / Dates', value: 24, color: '#F59E0B' },
    { name: 'Font Size Below Limit', value: 18, color: '#3B82F6' },
    { name: 'Customer Care Details', value: 14, color: '#8B5CF6' },
    { name: 'Missing Country of Origin', value: 10, color: '#10B981' }
  ],
  categoryDistribution: [
    { category: 'Staples & Flour', compliant: 94, nonCompliant: 6 },
    { category: 'Edible Oil', compliant: 82, nonCompliant: 18 },
    { category: 'Cosmetics', compliant: 61, nonCompliant: 39 },
    { category: 'Biscuits/Snacks', compliant: 92, nonCompliant: 8 },
    { category: 'Imported Goods', compliant: 52, nonCompliant: 48 },
    { category: 'Spices', compliant: 89, nonCompliant: 11 }
  ]
};
