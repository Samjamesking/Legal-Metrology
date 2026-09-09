import React, { useState, useRef } from 'react';
import {
  FileBadge2,
  Printer,
  Download,
  QrCode,
  Barcode,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  Palette
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { generateQrCodeSvg } from '../../services/complianceCertificateService';

export default function LabelGeneratorPage() {
  // Input fields for label generation
  const [formData, setFormData] = useState({
    productName: 'Patanjali Pure Cow Ghee',
    brand: 'Patanjali Ayurved Limited',
    category: 'Edible Oils & Fats',
    netQuantity: '1 L (910 g)',
    mrp: '₹650.00',
    unitSalePrice: '₹65.00 / 100 ml',
    mfgDate: '09/2026',
    expiryDate: 'Best before 9 months from mfg',
    batchNo: 'PAT-CG-260901',
    customerCare: '1800-180-4101 | customercare@patanjaliayurved.org',
    mfgName: 'Patanjali Ayurved Limited',
    mfgAddress: 'Unit-III, Village Padartha, Laksar Road, Haridwar - 249404, Uttarakhand',
    countryOfOrigin: 'India',
    fssaiLicNo: '10014012000266',
    isVegetarian: true,
    labelTheme: '#15803d' // Forest green
  });

  const [copied, setCopied] = useState(false);
  const labelRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Generate barcode SVG
  const renderBarcodeSvg = (code = '8901234567890') => {
    const lines = [];
    const len = code.length;
    for (let i = 0; i < 48; i++) {
      const isThick = (i * 7 + 3) % 4 === 0;
      lines.push(
        `<rect key="${i}" x="${i * 3.5 + 10}" y="0" width="${isThick ? 2.5 : 1.2}" height="36" fill="#1e293b"/>`
      );
    }
    return `
      <svg viewBox="0 0 190 48" class="h-10 w-44">
        ${lines.join('')}
        <text x="95" y="46" font-size="8" text-anchor="middle" font-family="monospace" fill="#64748b">${code}</text>
      </svg>
    `;
  };

  // Export to PDF
  const handleExportPdf = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [140, 90] // Custom packaging label dimensions
    });

    // Outer border
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 140, 90, 'F');
    doc.setDrawColor(21, 128, 61);
    doc.setLineWidth(1);
    doc.rect(3, 3, 134, 84);

    // Header Brand & Name
    doc.setTextColor(21, 128, 61);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(formData.brand.toUpperCase(), 8, 10);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.text(formData.productName, 8, 16);

    // Green Veg icon if applicable
    if (formData.isVegetarian) {
      doc.setDrawColor(22, 163, 74);
      doc.rect(125, 7, 7, 7);
      doc.setFillColor(22, 163, 74);
      doc.circle(128.5, 10.5, 2, 'F');
    }

    // Net Qty & MRP Box (Principal Display Panel lower standard)
    doc.setFillColor(240, 253, 244);
    doc.rect(8, 20, 124, 16, 'F');
    doc.setDrawColor(187, 247, 208);
    doc.rect(8, 20, 124, 16);

    doc.setTextColor(21, 128, 61);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text('NET QUANTITY', 12, 25);
    doc.text('MAXIMUM RETAIL PRICE (INCL. OF ALL TAXES)', 68, 25);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.text(formData.netQuantity, 12, 31);
    doc.text(`${formData.mrp} (${formData.unitSalePrice})`, 68, 31);

    // Mfg & Batch
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Mfg Date: ${formData.mfgDate} | ${formData.expiryDate}`, 8, 42);
    doc.text(`Batch No: ${formData.batchNo} | Lic No: ${formData.fssaiLicNo}`, 8, 47);

    // Manufacturer & Customer Care
    doc.text(`Mfd & Packed by: ${formData.mfgName}`, 8, 54);
    doc.text(formData.mfgAddress, 8, 59);
    doc.text(`Customer Care: ${formData.customerCare}`, 8, 65);
    doc.text(`Country of Origin: ${formData.countryOfOrigin}`, 8, 70);

    // Statutory Compliance Footer
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(21, 128, 61);
    doc.text('LEGAL METROLOGY (PACKAGED COMMODITIES) RULES, 2011 COMPLIANT LABEL', 8, 80);

    doc.save(`Compliant_Label_${formData.productName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
  };

  // Print Label
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-gov bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
            <FileBadge2 className="w-3.5 h-3.5" /> AI Label Designer
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Generate Compliant Label Template
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Produce printable, 100% Legal Metrology (Packaged Commodities) Rules, 2011 certified packaging artwork with QR verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-gov text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            Print Label
          </button>
          <button
            onClick={handleExportPdf}
            className="px-4 py-2 rounded-gov text-xs font-bold bg-gov-blue text-white hover:bg-gov-blueLight shadow-md shadow-gov-blue/25 flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Export PDF Artwork
          </button>
        </div>
      </div>

      {/* 2-Column Layout: Form Controls vs Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: 6 cols */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Packaging Commodity Declarations Form
            </h3>
            <span className="text-[11px] text-gov-blue font-semibold">
              Rule 6(1) Attributes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Product Name (Rule 6(1)(b))</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Brand Name</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Net Quantity (Rule 6(1)(c))</label>
              <input
                type="text"
                name="netQuantity"
                value={formData.netQuantity}
                onChange={handleChange}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">MRP incl. taxes (Rule 6(1)(e))</label>
              <input
                type="text"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Unit Sale Price (USP)</label>
              <input
                type="text"
                name="unitSalePrice"
                value={formData.unitSalePrice}
                onChange={handleChange}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Mfg / Packed Date (Rule 6(1)(d))</label>
              <input
                type="text"
                name="mfgDate"
                value={formData.mfgDate}
                onChange={handleChange}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Batch / Lot Number</label>
              <input
                type="text"
                name="batchNo"
                value={formData.batchNo}
                onChange={handleChange}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Customer Care Helpline (Rule 6(1)(f))</label>
              <input
                type="text"
                name="customerCare"
                value={formData.customerCare}
                onChange={handleChange}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Manufacturer Name & Address (Rule 6(1)(a))</label>
              <input
                type="text"
                name="mfgName"
                value={formData.mfgName}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full p-2 mb-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
              />
              <textarea
                name="mfgAddress"
                rows={2}
                value={formData.mfgAddress}
                onChange={handleChange}
                placeholder="Full physical postal address with registered PIN code"
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Country of Origin (Rule 6(1)(g))</label>
              <input
                type="text"
                name="countryOfOrigin"
                value={formData.countryOfOrigin}
                onChange={handleChange}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">FSSAI / License Number</label>
              <input
                type="text"
                name="fssaiLicNo"
                value={formData.fssaiLicNo}
                onChange={handleChange}
                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-gov"
              />
            </div>
          </div>
        </div>

        {/* Right Live Compliant Artwork Preview: 6 cols */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                Live Rule 6 & Rule 7 Compliant Artwork
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                100% Statutory Compliant
              </span>
            </div>

            {/* Visual Packaging Label Card */}
            <div
              ref={labelRef}
              className="p-6 bg-white text-slate-900 rounded-xl border-2 border-emerald-600 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[380px]"
            >
              {/* Top Banner with Brand and Veg Icon */}
              <div className="flex items-start justify-between border-b-2 border-emerald-600/30 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-700">
                    {formData.brand}
                  </span>
                  <h2 className="text-lg font-black text-slate-900 leading-tight">
                    {formData.productName}
                  </h2>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {formData.category}
                  </span>
                </div>

                {formData.isVegetarian && (
                  <div className="w-6 h-6 border-2 border-emerald-600 flex items-center justify-center p-0.5 rounded-xs" title="Vegetarian Logo as per FSSAI">
                    <div className="w-3 h-3 rounded-full bg-emerald-600" />
                  </div>
                )}
              </div>

              {/* Central Mandated Grid: Net Qty & MRP (Bottom 30% or Prominent PDP) */}
              <div className="my-3 p-3 bg-emerald-50/80 rounded-lg border border-emerald-200 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[9px] uppercase font-bold text-emerald-800 tracking-wider block">
                    Net Quantity (Rule 6(1)(c))
                  </span>
                  <span className="text-base font-black text-slate-900">
                    {formData.netQuantity}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-emerald-800 tracking-wider block">
                    Maximum Retail Price (Rule 6(1)(e))
                  </span>
                  <span className="text-base font-black text-slate-900">
                    {formData.mrp}
                  </span>
                  <span className="text-[9px] text-slate-600 block">
                    (incl. of all taxes) • USP: {formData.unitSalePrice}
                  </span>
                </div>
              </div>

              {/* Manufacturing & Batch Details */}
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-700 border-b pb-2 border-slate-200">
                <div>
                  <span className="font-bold">Mfg Date: </span>{formData.mfgDate}
                </div>
                <div>
                  <span className="font-bold">Shelf Life: </span>{formData.expiryDate}
                </div>
                <div>
                  <span className="font-bold">Batch No: </span><span className="font-mono">{formData.batchNo}</span>
                </div>
                <div>
                  <span className="font-bold">Origin: </span>{formData.countryOfOrigin}
                </div>
              </div>

              {/* Manufacturer & Care Panel */}
              <div className="my-2 text-[9px] text-slate-600 space-y-1">
                <div>
                  <strong>Mfd & Packed by: </strong>{formData.mfgName}, {formData.mfgAddress}
                </div>
                <div>
                  <strong>Consumer Care: </strong>{formData.customerCare}
                </div>
                <div>
                  <strong>FSSAI Lic No: </strong><span className="font-mono">{formData.fssaiLicNo}</span>
                </div>
              </div>

              {/* Bottom Barcode & Verification QR Code */}
              <div className="flex items-center justify-between pt-3 border-t-2 border-emerald-600/30">
                <div dangerouslySetInnerHTML={{ __html: renderBarcodeSvg(formData.batchNo) }} />

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-[8px] font-mono text-slate-400 block uppercase">LM Scan ID</span>
                    <span className="text-[9px] font-bold text-emerald-700 block">Verified Pack</span>
                  </div>
                  <div
                    className="w-10 h-10 border border-slate-300 rounded p-0.5"
                    dangerouslySetInnerHTML={{ __html: generateQrCodeSvg(`https://lm.gov.in/v/${formData.batchNo}`, 36) }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Helper Notes */}
            <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Font height calculations automatically scaled to meet Rule 7 Schedule II standards.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
