/**
 * Web Speech API Voice Assistant for Legal Metrology Compliance Readout
 */

import { MULTI_LANG_STRINGS } from '../data/legalMetrologyRules';

class VoiceAssistantService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isSpeaking = false;
  }

  speakComplianceSummary(product, language = 'en', onEndCallback = null) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser environment.');
      return false;
    }

    this.stop();

    const langConfig = MULTI_LANG_STRINGS[language] || MULTI_LANG_STRINGS.en;
    let text = `${langConfig.voicePrompt} ${product.name}. `;
    text += `${langConfig.complianceScore}: ${product.complianceScore} percent. `;
    text += `Status: ${product.status}. `;

    if (product.violations && product.violations.length > 0) {
      text += `Detected ${product.violations.length} violations: `;
      product.violations.forEach((v, idx) => {
        text += `Number ${idx + 1}: ${v.title}. `;
      });
    } else {
      text += 'All mandatory Legal Metrology declarations are fully satisfied.';
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick appropriate voice if available
    const voices = this.synth.getVoices();
    const langCodePrefix = language === 'hi' ? 'hi' : language === 'bn' ? 'bn' : language === 'ta' ? 'ta' : language === 'te' ? 'te' : language === 'mr' ? 'mr' : 'en';
    const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(langCodePrefix));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      this.isSpeaking = false;
      if (onEndCallback) onEndCallback();
    };

    this.synth.speak(utterance);
    return true;
  }

  stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }
}

export const voiceAssistant = new VoiceAssistantService();
