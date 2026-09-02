/**
 * Legal Metrology (Packaged Commodities) Rules, 2011
 * Official standards, mandatory declarations, font size matrices, and penalty schedules.
 */

export const MANDATORY_DECLARATIONS = [
  {
    id: 'manufacturer',
    name: 'Manufacturer Name & Address',
    rule: 'Rule 6(1)(a)',
    description: 'Name and complete physical address of the manufacturer, packer, or importer with PIN code.',
    importance: 'Critical',
    example: 'Manufactured by: Britannia Industries Ltd, 5/1A Hungerford Street, Kolkata - 700017, WB'
  },
  {
    id: 'generic_name',
    name: 'Generic Product Name',
    rule: 'Rule 6(1)(b)',
    description: 'Common or generic name of the commodity contained in the package.',
    importance: 'Critical',
    example: 'Refined Sunflower Oil, Vacuum Evaporated Iodized Salt, Wheat Flour'
  },
  {
    id: 'net_quantity',
    name: 'Net Quantity',
    rule: 'Rule 6(1)(c)',
    description: 'Net quantity in terms of standard unit of weight or measure (g, kg, ml, l) or number.',
    importance: 'Critical',
    example: 'Net Qty: 1 kg / 500 ml / 10 N'
  },
  {
    id: 'mrp',
    name: 'Maximum Retail Price (MRP)',
    rule: 'Rule 6(1)(e)',
    description: 'MRP in Indian Rupees (₹) inclusive of all taxes, plus Unit Sale Price (USP) for items > 1kg/1L.',
    importance: 'Critical',
    example: 'MRP ₹150.00 (incl. of all taxes) | ₹15.00 / 100g'
  },
  {
    id: 'mfg_date',
    name: 'Date of Manufacture / Packing',
    rule: 'Rule 6(1)(d)',
    description: 'Month and year in which commodity is manufactured, packed or imported (MM/YYYY).',
    importance: 'High',
    example: 'Mfg: 08/2026 or Packed On: August 2026'
  },
  {
    id: 'expiry_date',
    name: 'Expiry / Best Before Date',
    rule: 'Rule 6(1)(d) & FSSAI',
    description: 'Best before month/year or expiry date for perishable, food, cosmetic, or drug items.',
    importance: 'Critical',
    example: 'Best Before 9 Months from Manufacture or Expiry: 05/2027'
  },
  {
    id: 'batch_no',
    name: 'Batch / Lot Number',
    rule: 'Rule 6(1)(d)',
    description: 'Batch number or lot identifier for traceability.',
    importance: 'High',
    example: 'Batch No: B24-X901'
  },
  {
    id: 'consumer_care',
    name: 'Consumer Care Helpline',
    rule: 'Rule 6(1)(f)',
    description: 'Name, address, telephone number, and email address of person/office to reach in case of consumer complaints.',
    importance: 'Critical',
    example: 'Consumer Cell: feedback@company.com, Toll-Free: 1800-123-4567'
  },
  {
    id: 'country_of_origin',
    name: 'Country of Origin',
    rule: 'Rule 6(1)(g)',
    description: 'Country of origin or manufacture in case of imported packages.',
    importance: 'High',
    example: 'Country of Origin: India / Made in India'
  }
];

export const FONT_SIZE_STANDARDS = [
  { maxPdpAreaCm2: 50, minHeightMm: 1.0, minNumeralMm: 1.5 },
  { maxPdpAreaCm2: 100, minHeightMm: 1.5, minNumeralMm: 2.0 },
  { maxPdpAreaCm2: 500, minHeightMm: 2.0, minNumeralMm: 3.0 },
  { maxPdpAreaCm2: 2500, minHeightMm: 4.0, minNumeralMm: 4.0 },
  { maxPdpAreaCm2: Infinity, minHeightMm: 6.0, minNumeralMm: 6.0 }
];

export const LEGAL_PENALTIES = {
  firstOffence: {
    section: 'Section 36(1) of Legal Metrology Act, 2009',
    description: 'Non-compliance with declaration rules on pre-packaged commodities',
    fine: 'Up to ₹25,000'
  },
  secondOffence: {
    section: 'Section 36(1) second proviso',
    description: 'Second conviction for identical packaging violation',
    fine: 'Up to ₹50,000'
  },
  subsequentOffence: {
    section: 'Section 36(1) third proviso',
    description: 'Subsequent violations by manufacturer/packer',
    fine: '₹50,000 up to ₹1,00,000 or imprisonment up to 1 year or both'
  },
  compounding: {
    section: 'Section 48',
    description: 'Compounding of offences before trial upon payment of compounding fees',
    fee: 'Variable per state rules (Standard ₹10,000 - ₹50,000)'
  }
};

export const MULTI_LANG_STRINGS = {
  en: {
    title: 'Legal Metrology AI',
    subtitle: 'Packaged Commodity Compliance System',
    tagline: 'Govt. of India • Department of Consumer Affairs',
    scanLabel: 'Analyze Label',
    complianceScore: 'Compliance Score',
    declarations: 'Detected Declarations',
    violations: 'Detected Violations',
    recommendations: 'AI Compliance Recommendations',
    voicePrompt: 'Reading compliance summary for scanned product: ',
    statusCompliant: 'Fully Compliant',
    statusPartial: 'Partially Compliant',
    statusNonCompliant: 'Non-Compliant'
  },
  hi: {
    title: 'विधिक मापविज्ञान एआई',
    subtitle: 'पैकेज्ड कमोडिटी अनुपालन प्रणाली',
    tagline: 'भारत सरकार • उपभोक्ता मामले विभाग',
    scanLabel: 'लेबल विश्लेषण करें',
    complianceScore: 'अनुपालन स्कोर',
    declarations: 'पहचानी गई घोषणाएं',
    violations: 'पाए गए उल्लंघन',
    recommendations: 'एआई अनुपालन अनुशंसाएं',
    voicePrompt: 'स्कैन किए गए उत्पाद की अनुपालन रिपोर्ट पढ़ रहे हैं: ',
    statusCompliant: 'पूर्णतः अनुपालन',
    statusPartial: 'आंशिक अनुपालन',
    statusNonCompliant: 'गैर-अनुपालन'
  },
  bn: {
    title: 'আইনগত ওজন ও পরিমাপ এআই',
    subtitle: 'প্যাকেজড পণ্য সম্মতি সিস্টেম',
    tagline: 'ভারত সরকার • উপভোক্তা বিষয়ক বিভাগ',
    scanLabel: 'লেবেল বিশ্লেষণ করুন',
    complianceScore: 'সম্মতি স্কোর',
    declarations: 'শনাক্ত করা ঘোষণাসমূহ',
    violations: 'চিহ্নিত লঙ্ঘনসমূহ',
    recommendations: 'এআই সম্মতি পরামর্শ',
    voicePrompt: 'স্ক্যান করা পণ্যের সম্মতি প্রতিবেদন পড়ছি: ',
    statusCompliant: 'সম্পূর্ণ অনুগত',
    statusPartial: 'আংশিক অনুগত',
    statusNonCompliant: 'অ-সম্মতিপূর্ণ'
  },
  ta: {
    title: 'சட்ட அளவியல் AI',
    subtitle: 'தொகுக்கப்பட்ட பொருட்களின் இணக்க அமைப்பு',
    tagline: 'இந்திய அரசு • நுகர்வோர் விவகாரங்கள் துறை',
    scanLabel: 'லேபிளை ஆய்வு செய்',
    complianceScore: 'இணக்க மதிப்பீடு',
    declarations: 'கண்டறியப்பட்ட அறிவிப்புகள்',
    violations: 'கண்டறியப்பட்ட மீறல்கள்',
    recommendations: 'AI இணக்கப் பரிந்துரைகள்',
    voicePrompt: 'தயாரிப்பின் இணக்க சுருக்கத்தை வாசிக்கிறது: ',
    statusCompliant: 'முழுமையான இணக்கம்',
    statusPartial: 'பகுதி இணக்கம்',
    statusNonCompliant: 'இணக்கமின்மை'
  },
  te: {
    title: 'లీగల్ మెట్రాలజీ AI',
    subtitle: 'ప్యాక్ చేసిన వస్తువుల వర్తింపు వ్యవస్థ',
    tagline: 'భారత ప్రభుత్వం • వినియోగదారుల వ్యవహారాల శాఖ',
    scanLabel: 'లేబుల్ విశ్లేషించండి',
    complianceScore: 'వర్తింపు స్కోరు',
    declarations: 'గుర్తించబడిన ప్రకటనలు',
    violations: 'గుర్తించిన ఉల్లంఘనలు',
    recommendations: 'AI వర్తింపు సిఫార్సులు',
    voicePrompt: 'ఉత్పత్తి వర్తింపు నివేదిక చదువుతోంది: ',
    statusCompliant: 'పూర్తిగా వర్తింపు',
    statusPartial: 'పాక్షిక వర్తింపు',
    statusNonCompliant: 'వర్తింపు లేదు'
  },
  mr: {
    title: 'वैधानिक मापनशास्त्र एआय',
    subtitle: 'पॅकेज्ड वस्तू अनुपालन प्रणाली',
    tagline: 'भारत सरकार • ग्राहक व्यवहार विभाग',
    scanLabel: 'लेबल विश्लेषण करा',
    complianceScore: 'अनुपालन स्कोअर',
    declarations: 'शोधलेल्या घोषणा',
    violations: 'आढळलेली उल्लंघने',
    recommendations: 'एआय अनुपालन शिफारसी',
    voicePrompt: 'स्कॅन केलेल्या उत्पादनाचा अहवाल वाचत आहे: ',
    statusCompliant: 'पूर्णपणे अनुपालन',
    statusPartial: 'अंशतः अनुपालन',
    statusNonCompliant: 'गैर-अनुपालन'
  }
};
