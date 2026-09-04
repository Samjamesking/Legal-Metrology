import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Bot,
  User,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Upload,
  Clock,
  Sparkles,
  CheckCircle2,
  Receipt,
  Building2,
  Copy,
  Check,
  ArrowRight,
  AlertOctagon,
  Scale,
  RefreshCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { grievanceService, KNOWN_MERCHANTS } from '../../services/grievanceService';

export default function GrievanceChatbot({
  initialProductImage = null,
  initialProductName = '',
  initialBrand = '',
  onTokenGenerated = null,
  onNavigateToTracker = null
}) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(initialProductImage ? 'AWAITING_PROBLEM_DESCRIPTION' : 'AWAITING_PRODUCT_IMAGE');
  
  // Grievance draft state
  const [draft, setDraft] = useState({
    productImage: initialProductImage,
    productName: initialProductName || 'Packaged Commodity',
    brand: initialBrand || 'Standard Brand',
    issueCategory: 'Damaged / Expired Product',
    issueDescription: '',
    billImage: null,
    billNumber: '',
    gstNumber: '',
    merchantName: '',
    claimType: 'Full Refund or Replacement',
    amount: '₹149.00'
  });

  const [billFileUploaded, setBillFileUploaded] = useState(false);
  const [copiedToken, setCopiedToken] = useState(null);
  const messagesEndRef = useRef(null);
  const billInputRef = useRef(null);
  const photoInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      if (initialProductImage) {
        setMessages([
          {
            id: 'm1',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: `Namaste! I am NyayaMitra, your Consumer Protection & Legal Metrology AI Redressal Assistant. I have received the uploaded image of your product for inspection.`,
            image: initialProductImage,
            actionNeeded: 'PROBLEM_INPUT'
          },
          {
            id: 'm2',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: `Please describe what is wrong with this product (for example: expired food date, broken packaging seal, curdled/damaged contents, or storekeeper refusal to refund).`,
            quickOptions: [
              'Food item has passed printed Expiry / Best-Before date',
              'Packaging arrived damaged, seal broken and leaking',
              'Contaminated food / foreign odor upon opening',
              'Weight is significantly less than declared Net Quantity',
              'Shopkeeper refused replacement/refund on damaged item'
            ]
          }
        ]);
        setCurrentStep('AWAITING_PROBLEM_DESCRIPTION');
      } else {
        setMessages([
          {
            id: 'm0',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: `Namaste! I am NyayaMitra, your Consumer Protection & Legal Metrology Redressal Assistant.\n\nHave you purchased a product that is damaged, leaking, or past its expiry date? To start filing your statutory grievance, please upload a photo of the damaged commodity or expired label below.`,
            actionNeeded: 'UPLOAD_PHOTO'
          }
        ]);
        setCurrentStep('AWAITING_PRODUCT_IMAGE');
      }
    }
  }, [initialProductImage]);

  // Handle user sending text message
  const handleSendMessage = (textToSend = null) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Process depending on step
    setTimeout(() => {
      processBotWorkflow(text);
      setIsTyping(false);
    }, 900);
  };

  // Bot state machine
  const processBotWorkflow = (userInput) => {
    // If user is inquiring about an existing token (e.g. "LM-GRV-...")
    if (userInput.toUpperCase().includes('LM-GRV-') || userInput.toLowerCase().includes('raise token') || userInput.toLowerCase().includes('escalate')) {
      const tokenMatch = userInput.match(/LM-GRV-\d{4}-\d{5}/i);
      const tokenToLookup = tokenMatch ? tokenMatch[0].toUpperCase() : null;
      
      if (tokenToLookup) {
        const found = grievanceService.getByToken(tokenToLookup);
        if (found) {
          if (found.status === 'ESCALATED_LEVEL_2') {
            setMessages(prev => [
              ...prev,
              {
                id: `b-${Date.now()}`,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text: `Token ${tokenToLookup} has ALREADY been escalated to Level-2 Metrology Enforcement Cell. Legal notice ${found.escalationDetails?.legalNoticeNo} is active with officer ${found.escalationDetails?.assignedOfficer}. Secondary deadline: ${new Date(found.escalationDetails?.secondaryDeadlineDate).toLocaleDateString()}.`,
                tokenCard: found
              }
            ]);
          } else {
            // Escalate token
            const escalated = grievanceService.escalateGrievance(tokenToLookup, 'Escalated by consumer via NyayaMitra Assistant: 15-day seller window expired without resolution');
            setMessages(prev => [
              ...prev,
              {
                id: `b-${Date.now()}`,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text: `⚖️ TOKEN ESCALATED SUCCESSFULLY! Because the seller failed to replace or refund within the 15-day window, Token ${tokenToLookup} has been escalated to Level-2 Enforcement. A secondary statutory time limit of 7 DAYS has been issued with Legal Notice ${escalated.escalationDetails.legalNoticeNo}.`,
                tokenCard: escalated,
                escalated: true
              }
            ]);
          }
          return;
        }
      }
    }

    if (currentStep === 'AWAITING_PROBLEM_DESCRIPTION') {
      const updatedDraft = {
        ...draft,
        issueDescription: userInput,
        issueCategory: userInput.toLowerCase().includes('expire') ? 'Expired Food Product' : 'Damaged / Leaking Packaging'
      };
      setDraft(updatedDraft);
      setCurrentStep('AWAITING_BILL_AND_GST');

      setMessages(prev => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Under the Consumer Protection Act, 2019 and Legal Metrology Rules, retailers are strictly liable for supplying damaged or expired commodities.\n\nTo file your official grievance and hold the seller accountable, please provide your **Purchase Bill / Cash Memo** and the **Seller's 15-digit GST Number**.`,
          actionNeeded: 'BILL_AND_GST_FORM'
        }
      ]);
    } else if (currentStep === 'AWAITING_BILL_AND_GST') {
      // User sent text while form is pending
      setMessages(prev => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Please complete the Bill & GSTIN verification card above so I can issue your official 15-Day Statutory Resolution Token.`,
          actionNeeded: 'BILL_AND_GST_FORM'
        }
      ]);
    }
  };

  // When user uploads product image in chat
  const handleProductImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgUrl = e.target.result;
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      setDraft(prev => ({
        ...prev,
        productImage: imgUrl,
        productName: cleanName
      }));

      setMessages(prev => [
        ...prev,
        {
          id: `u-${Date.now()}`,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Attached image of damaged/expired product: ${file.name}`,
          image: imgUrl
        }
      ]);

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: `Image received and verified. What specific issue did you face with this product?`,
            quickOptions: [
              'Food item has passed printed Expiry / Best-Before date',
              'Packaging arrived damaged, seal broken and leaking',
              'Contaminated food / foreign odor upon opening',
              'Shopkeeper refused replacement/refund on damaged item'
            ]
          }
        ]);
        setCurrentStep('AWAITING_PROBLEM_DESCRIPTION');
      }, 700);
    };
    reader.readAsDataURL(file);
  };

  // Handle user completing Bill & GST submission
  const handleSubmitBillAndGst = (formData) => {
    setIsTyping(true);

    const gstCheck = grievanceService.validateGSTIN(formData.gstNumber);
    const merchantName = gstCheck.merchant?.name || formData.merchantName || 'Retail Merchant';

    // Update draft
    const finalDraft = {
      ...draft,
      billNumber: formData.billNumber || `INV-${Math.floor(100000 + Math.random() * 900000)}`,
      billImage: formData.billImage || null,
      gstNumber: formData.gstNumber.toUpperCase(),
      merchantName: merchantName,
      claimType: formData.claimType,
      amount: formData.amount || '₹180.00'
    };

    setDraft(finalDraft);

    // Create official grievance token with 15-day resolution window
    const newGrievance = grievanceService.createGrievance({
      productName: finalDraft.productName,
      brand: finalDraft.brand,
      category: finalDraft.category,
      issueCategory: finalDraft.issueCategory,
      issueDescription: finalDraft.issueDescription,
      productImage: finalDraft.productImage,
      billNumber: finalDraft.billNumber,
      billImage: finalDraft.billImage,
      gstNumber: finalDraft.gstNumber,
      merchantName: finalDraft.merchantName,
      claimType: finalDraft.claimType,
      amount: finalDraft.amount
    });

    setTimeout(() => {
      setIsTyping(false);
      setCurrentStep('TOKEN_GENERATED');

      setMessages(prev => [
        ...prev,
        {
          id: `u-${Date.now()}`,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Submitted Bill (${finalDraft.billNumber}) and GSTIN (${finalDraft.gstNumber}) for ${finalDraft.claimType}.`
        },
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `✅ **GSTIN & PURCHASE BILL VERIFIED!**\n\nYour grievance has been successfully registered on the Legal Metrology Consumer Redressal Network. An official Statutory Grievance Token has been generated with a **15-Day Resolution Window** served to the merchant.`,
          tokenCard: newGrievance,
          isNewToken: true
        },
        {
          id: `b2-${Date.now()}`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `📌 **Next Steps & Legal Rights:**\n• The merchant has exactly **15 days** from today to either issue a full refund (${newGrievance.amount}) or provide a fresh replacement.\n• **If the product is not replaced or refunded within 15 days**, you can click the **"Raise Token"** button in the Tracker or write to me here with your token number. We will immediately escalate your case to Level-2 District Metrology Enforcement Cell and issue an enforceable secondary summons with a 7-day compliance deadline!`
        }
      ]);

      if (onTokenGenerated) {
        onTokenGenerated(newGrievance);
      }
    }, 1200);
  };

  const copyToken = (tok) => {
    navigator.clipboard?.writeText(tok);
    setCopiedToken(tok);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-gov border border-slate-200/90 dark:border-slate-800 shadow-soft overflow-hidden">
      {/* Bot Header */}
      <div className="px-4 py-3.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gov-blue text-white flex items-center justify-center shadow-md shadow-gov-blue/20">
              <Bot className="w-5 h-5 text-amber-300" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                NyayaMitra AI
              </h3>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900/60 text-gov-blue dark:text-blue-300">
                Dispute Bot
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Legal Metrology & Consumer Redressal Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-200 dark:border-emerald-800/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Act 2009 & Rules 2011
          </span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[580px] min-h-[420px] bg-slate-50/40 dark:bg-slate-950/40">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-lg bg-gov-blue/10 dark:bg-blue-900/40 text-gov-blue dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[75%] space-y-2.5`}>
                {/* Message Bubble */}
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isBot
                      ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-xs'
                      : 'bg-gov-blue text-white rounded-tr-none shadow-md shadow-gov-blue/20'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Attached Image Preview */}
                  {msg.image && (
                    <div className="mt-2.5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 max-h-56 flex items-center justify-center">
                      <img
                        src={msg.image}
                        alt="Product Proof"
                        className="w-full h-auto object-cover max-h-52"
                      />
                    </div>
                  )}

                  <div
                    className={`text-[10px] mt-1.5 text-right ${
                      isBot ? 'text-slate-400' : 'text-blue-200'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {/* Quick Option Buttons */}
                {msg.quickOptions && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.quickOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(opt)}
                        className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-gov-blue dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 hover:text-gov-blue dark:hover:text-blue-300 transition-colors shadow-xs text-left"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Upload Photo Card if no photo provided yet */}
                {msg.actionNeeded === 'UPLOAD_PHOTO' && (
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-gov-blue/50 dark:border-blue-500/50 shadow-xs space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white">
                      <Upload className="w-4 h-4 text-gov-blue dark:text-blue-400" />
                      Upload Photo of Damaged / Expired Product
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Snap a photo showing the broken seal, torn pouch, expired date, or leaked commodity.
                    </p>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleProductImageUpload(e.target.files[0]);
                        }
                      }}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => photoInputRef.current?.click()}
                        className="px-4 py-2 rounded-gov bg-gov-blue hover:bg-gov-blueLight text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Choose Photo File
                      </button>
                      <button
                        onClick={() => {
                          // Quick preset sample
                          const sampleUrl = 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80';
                          setDraft(prev => ({
                            ...prev,
                            productImage: sampleUrl,
                            productName: 'Amul Taaza Milk Carton (Expired)'
                          }));
                          setMessages(prev => [
                            ...prev,
                            {
                              id: `u-${Date.now()}`,
                              sender: 'user',
                              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                              text: 'Selected Sample: Expired Dairy Milk Carton',
                              image: sampleUrl
                            }
                          ]);
                          setIsTyping(true);
                          setTimeout(() => {
                            setIsTyping(false);
                            setMessages(prev => [
                              ...prev,
                              {
                                id: `b-${Date.now()}`,
                                sender: 'bot',
                                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                text: 'Sample product photo attached. Please describe what is wrong with this product.',
                                quickOptions: [
                                  'Food item has passed printed Expiry / Best-Before date',
                                  'Packaging arrived damaged, seal broken and leaking'
                                ]
                              }
                            ]);
                            setCurrentStep('AWAITING_PROBLEM_DESCRIPTION');
                          }, 600);
                        }}
                        className="px-3 py-2 rounded-gov bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold"
                      >
                        Use Sample Expired Milk
                      </button>
                    </div>
                  </div>
                )}

                {/* Bill & GST Verification Form Card */}
                {msg.actionNeeded === 'BILL_AND_GST_FORM' && currentStep === 'AWAITING_BILL_AND_GST' && (
                  <BillAndGstFormCard
                    billInputRef={billInputRef}
                    onSubmit={handleSubmitBillAndGst}
                  />
                )}

                {/* Generated Token Card */}
                {msg.tokenCard && (
                  <TokenDisplayCard
                    grievance={msg.tokenCard}
                    onCopy={() => copyToken(msg.tokenCard.token)}
                    isCopied={copiedToken === msg.tokenCard.token}
                    onNavigateToTracker={onNavigateToTracker}
                  />
                )}
              </div>

              {!isBot && (
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-8 h-8 rounded-lg bg-gov-blue/10 dark:bg-blue-900/40 text-gov-blue dark:text-blue-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gov-blue animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-gov-blue animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-gov-blue animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              currentStep === 'AWAITING_PROBLEM_DESCRIPTION'
                ? 'Type what is damaged or expired on this product...'
                : currentStep === 'TOKEN_GENERATED'
                ? 'Type to ask a question or raise a token (e.g. "Raise LM-GRV-...")...'
                : 'Write your message to NyayaMitra...'
            }
            className="flex-1 px-4 py-2.5 rounded-gov bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gov-blue/30 focus:border-gov-blue"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-gov bg-gov-blue hover:bg-gov-blueLight disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-gov-blue/20 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

// Sub-component: Form inside chat to collect Bill and GSTIN
function BillAndGstFormCard({ billInputRef, onSubmit }) {
  const [billNumber, setBillNumber] = useState('INV-2026-98145');
  const [billFileName, setBillFileName] = useState('');
  const [gstNumber, setGstNumber] = useState('27AABCU9603R1ZM'); // Default Reliance test GSTIN
  const [merchantName, setMerchantName] = useState('Reliance Retail Hypermarket Ltd.');
  const [claimType, setClaimType] = useState('Full Refund or Replacement');
  const [amount, setAmount] = useState('₹185.00');
  const [gstFeedback, setGstFeedback] = useState(null);

  // Trigger check on GSTIN
  const handleGstChange = (val) => {
    setGstNumber(val.toUpperCase());
    const res = grievanceService.validateGSTIN(val);
    if (res.merchant) {
      setMerchantName(res.merchant.name);
      setGstFeedback(res);
    } else {
      setGstFeedback(null);
    }
  };

  useEffect(() => {
    handleGstChange(gstNumber);
  }, []);

  const handleBillFile = (file) => {
    setBillFileName(file.name);
  };

  return (
    <div className="bg-white dark:bg-slate-800/95 rounded-xl p-4 border-2 border-gov-blue/30 dark:border-blue-500/30 shadow-md space-y-3.5 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
          <Receipt className="w-4 h-4 text-gov-blue dark:text-blue-400" />
          Required: Bill of Product & GSTIN
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
          Statutory Requirement
        </span>
      </div>

      {/* Bill Upload & Bill Number */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
            Bill / Invoice Number:
          </label>
          <input
            type="text"
            value={billNumber}
            onChange={(e) => setBillNumber(e.target.value)}
            placeholder="e.g. INV-98124 or Cash Memo #12"
            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gov-blue"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
            Upload Bill / Cash Receipt:
          </label>
          <input
            ref={billInputRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleBillFile(e.target.files[0]);
              }
            }}
          />
          <button
            type="button"
            onClick={() => billInputRef.current?.click()}
            className="w-full px-3 py-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 hover:border-gov-blue bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-gov-blue" />
            {billFileName ? `Attached: ${billFileName.slice(0, 15)}...` : 'Attach Receipt Image / PDF'}
          </button>
        </div>
      </div>

      {/* GSTIN Input with Real-time Merchant Lookup */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
            Seller GST Number (15-digit GSTIN):
          </label>
          <span className="text-[10px] text-slate-400">Printed on shop invoice</span>
        </div>
        <input
          type="text"
          maxLength={15}
          value={gstNumber}
          onChange={(e) => handleGstChange(e.target.value)}
          placeholder="e.g. 27AABCU9603R1ZM"
          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-white uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-gov-blue"
        />

        {/* GSTIN Autofill chips */}
        <div className="mt-1.5 flex flex-wrap gap-1 items-center">
          <span className="text-[10px] text-slate-400">1-Click Test GSTIN:</span>
          {Object.entries(KNOWN_MERCHANTS).slice(0, 3).map(([gstKey, info]) => (
            <button
              key={gstKey}
              type="button"
              onClick={() => handleGstChange(gstKey)}
              className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                gstNumber === gstKey
                  ? 'bg-gov-blue text-white border-gov-blue'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              {info.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Verified Merchant Badge */}
        {gstFeedback && gstFeedback.merchant && (
          <div className="mt-2 p-2 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  {gstFeedback.merchant.name}
                </span>
                <span className="text-slate-500 block text-[10px]">
                  {gstFeedback.merchant.city} • Status: Active Taxpayer
                </span>
              </div>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
              GST Verified
            </span>
          </div>
        )}
      </div>

      {/* Claim Option & Amount */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
            Redressal Remedy:
          </label>
          <select
            value={claimType}
            onChange={(e) => setClaimType(e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
          >
            <option value="100% Refund">100% Cash/UPI Refund</option>
            <option value="Fresh Replacement">Fresh Fresh Replacement</option>
            <option value="Full Refund or Replacement">Full Refund or Replacement</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
            Purchase Amount:
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-bold"
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        type="button"
        onClick={() => onSubmit({ billNumber, billImage: null, gstNumber, merchantName, claimType, amount })}
        className="w-full py-2.5 px-4 rounded-gov text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 mt-2"
      >
        <ShieldCheck className="w-4 h-4" />
        Verify Details & Generate 15-Day Resolution Token
      </button>
    </div>
  );
}

// Sub-component: Official Token Display Card
function TokenDisplayCard({ grievance, onCopy, isCopied, onNavigateToTracker }) {
  const isEscalated = grievance.status === 'ESCALATED_LEVEL_2';
  const remaining15 = grievanceService.getTimeRemaining(grievance.deadline15Days);
  const remainingSec = isEscalated && grievance.escalationDetails
    ? grievanceService.getTimeRemaining(grievance.escalationDetails.secondaryDeadlineDate)
    : null;

  return (
    <div className={`p-4 rounded-xl border-2 shadow-lg transition-all ${
      isEscalated
        ? 'bg-gradient-to-br from-amber-50 to-red-50 dark:from-slate-900 dark:to-red-950/40 border-red-500/50 ring-2 ring-red-500/20'
        : 'bg-gradient-to-br from-blue-50/60 to-emerald-50/60 dark:from-slate-900 dark:to-slate-800 border-gov-blue/40 dark:border-blue-500/40'
    }`}>
      {/* Header with Token & Status */}
      <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-gov-blue dark:text-blue-400 block">
            Official Statutory Grievance Token
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-base sm:text-lg font-black font-mono text-slate-900 dark:text-white">
              {grievance.token}
            </span>
            <button
              onClick={onCopy}
              className="p-1 rounded hover:bg-white dark:hover:bg-slate-700 text-slate-500 transition-colors"
              title="Copy Token"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 ${
          isEscalated
            ? 'bg-red-500 text-white shadow-xs'
            : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
        }`}>
          {isEscalated ? (
            <>
              <AlertOctagon className="w-3 h-3" />
              Level-2 Escalated
            </>
          ) : (
            <>
              <Clock className="w-3 h-3" />
              15-Day Seller Window
            </>
          )}
        </span>
      </div>

      {/* Resolution Countdown Clock */}
      <div className="my-3 p-3 rounded-lg bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
            {isEscalated ? 'Secondary Enforcement Time Limit (7 Days):' : 'Statutory Resolution Time Window (15 Days):'}
          </div>
          <div className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
            <Clock className={`w-4 h-4 ${isEscalated ? 'text-red-500 animate-spin' : 'text-gov-blue dark:text-blue-400'}`} />
            <span>
              {isEscalated ? (
                remainingSec?.isExpired ? 'Secondary Limit Expired - Immediate Prosecution' : remainingSec?.text
              ) : (
                remaining15?.isExpired ? '15 Days Expired - Eligible to Raise Token' : remaining15?.text
              )}
            </span>
          </div>
        </div>

        <div className="text-right text-[11px]">
          <span className="text-slate-400 block text-[10px]">Statutory Deadline</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {new Date(isEscalated ? grievance.escalationDetails?.secondaryDeadlineDate : grievance.deadline15Days).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Case Details */}
      <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex justify-between">
          <span>Commodity:</span>
          <strong className="text-slate-900 dark:text-white">{grievance.productName}</strong>
        </div>
        <div className="flex justify-between">
          <span>Merchant Name:</span>
          <strong className="text-slate-900 dark:text-white">{grievance.merchantName}</strong>
        </div>
        <div className="flex justify-between">
          <span>Seller GSTIN:</span>
          <strong className="font-mono text-slate-900 dark:text-white">{grievance.gstNumber}</strong>
        </div>
        <div className="flex justify-between">
          <span>Claim Requested:</span>
          <strong className="text-emerald-600 dark:text-emerald-400">{grievance.claimType} ({grievance.amount})</strong>
        </div>

        {isEscalated && grievance.escalationDetails && (
          <div className="mt-2 pt-2 border-t border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-300 text-[11px] space-y-1">
            <div className="font-bold flex items-center gap-1 text-red-600 dark:text-red-400">
              <Scale className="w-3.5 h-3.5" />
              Legal Summons: {grievance.escalationDetails.legalNoticeNo}
            </div>
            <div>Officer: {grievance.escalationDetails.assignedOfficer}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">{grievance.escalationDetails.penalSection}</div>
          </div>
        )}
      </div>

      {/* Action to View in Tracker */}
      {onNavigateToTracker && (
        <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <span className="text-[10px] text-slate-500">
            Track countdown or raise token if seller defaults:
          </span>
          <button
            onClick={() => onNavigateToTracker(grievance.token)}
            className="text-xs font-bold text-gov-blue dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            Open Token Tracker
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
