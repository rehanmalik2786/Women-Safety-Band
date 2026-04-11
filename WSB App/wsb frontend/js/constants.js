/* ============================================
   WOMEN SAFETY BAND — Constants & Initial Data
   ============================================ */

const { useState, useEffect, useRef } = React;
const h = React.createElement;

const INITIAL_CONTACTS = [
  { id: 1, name: 'Mom',               phone: '+91 98765 43210', sms: true,  call: true,  notif: true  },
  { id: 2, name: 'Sister Zara',       phone: '+91 87654 32109', sms: true,  call: false, notif: true  },
  { id: 3, name: 'Best Friend Priya', phone: '+91 76543 21098', sms: false, call: true,  notif: true  },
];

const INITIAL_HISTORY = [
  { id: 1, ts: '2025-04-09 22:14', lat: 26.9124, lng: 75.7873, status: 'resolved', duration: '4m 32s', loc: 'Vaishali Nagar, Jaipur' },
  { id: 2, ts: '2025-04-07 19:45', lat: 26.8505, lng: 75.8026, status: 'resolved', duration: '2m 10s', loc: 'Malviya Nagar, Jaipur'  },
  { id: 3, ts: '2025-04-02 23:01', lat: 26.9195, lng: 75.8201, status: 'resolved', duration: '6m 55s', loc: 'Raja Park, Jaipur'      },
];

/* ─────────────────────────────────────────────
   WARNING SPEECH
   Played from phone speaker when SOS activates.
   Loops until emergency is ended.
───────────────────────────────────────────── */
const SPEECH = {
  en: "Let the girl go. Your location, audio, and video have been sent to her parents, who can see you live, and also to the police. It would be better for you to let her go, or the police will arrest you.",
  hi: "लड़की को छोड़ दो। तुम्हारी लोकेशन, ऑडियो और वीडियो उसके माता-पिता को भेज दिए गए हैं, जो तुम्हें लाइव देख सकते हैं, और पुलिस को भी। बेहतर होगा कि तुम उसे जाने दो, वरना पुलिस तुम्हें गिरफ्तार कर लेगी।",
};

function playSpeech(lang, opts = {}) {
  if (!window.speechSynthesis) return;
  const loop = opts.loop !== false;
  const onComplete = typeof opts.onComplete === 'function' ? opts.onComplete : null;

  window.speechSynthesis.cancel();
  const text  = SPEECH[lang] || SPEECH.en;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang   = lang === 'hi' ? 'hi-IN' : 'en-IN';
  utter.rate   = 0.88;
  utter.pitch  = 1.1;
  utter.volume = 1;
  utter.onend  = () => {
    if (loop && window._speechActive) {
      setTimeout(() => playSpeech(lang, { ...opts, loop: true }), 1000);
      return;
    }
    window._speechActive = false;
    if (onComplete) onComplete();
  };
  window._speechActive = true;
  window.speechSynthesis.speak(utter);
}

function stopSpeech() {
  window._speechActive = false;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

/* Helper */
function fmtTimer(s) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
