/* ============================================
   SCREEN — Emergency (Active SOS)
   Plays warning speech from phone speaker on load.
   Props: { timer, lat, lng, alertSent, contacts, endEmergency, speechLang }
   ============================================ */

function EmergencyScreen({ timer, lat, lng, alertSent, contacts, endEmergency, speechLang }) {

  // Start speech as soon as emergency screen mounts
  useEffect(() => {
    playSpeech(speechLang);
    return () => stopSpeech(); // stop when screen unmounts
  }, [speechLang]);

  const speechText = SPEECH[speechLang] || SPEECH.en;

  return h('div', { style: { minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0f0000' } },

    // ── Top Bar ──
    h('div', {
      style: { background: '#1a0000', borderBottom: '2px solid var(--red)', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
    },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
        h('div', { style: { width: 10, height: 10, borderRadius: '50%', background: 'var(--red2)', boxShadow: '0 0 8px var(--red2)', animation: 'blink 1s infinite' } }),
        h('span', { style: { color: 'var(--red2)', fontWeight: 700, fontSize: 15, letterSpacing: 1 } }, 'EMERGENCY ACTIVE'),
      ),
      h('div', { style: { color: 'white', fontSize: 18, fontFamily: 'monospace', fontWeight: 700, letterSpacing: 2 } }, fmtTimer(timer)),
    ),

    // ── Alert sent banner ──
    alertSent && h('div', {
      style: { background: '#001a00', borderBottom: '1px solid #22cc7744', padding: '8px 20px', display: 'flex', alignItems: 'center', gap: 8 }
    },
      h('span', { style: { fontSize: 14 } }, '\u2705'),
      h('span', { style: { color: 'var(--green)', fontSize: 12 } },
        'Alert sent to ' + contacts.filter(c => c.notif || c.sms).map(c => c.name).join(', ')
      ),
    ),

    // ── Speaker Warning Box ──
    h('div', {
      style: { background: '#1a0505', border: '1px solid var(--red)55', margin: '12px 16px 0', borderRadius: 12, padding: '12px 16px' }
    },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
        h('span', { style: { fontSize: 18 } }, '\uD83D\uDD0A'),
        h('span', { style: { fontSize: 12, color: 'var(--red2)', fontWeight: 700, letterSpacing: 1 } }, 'SPEAKER WARNING ACTIVE'),
        h('span', { style: { fontSize: 11, color: 'var(--text3)', marginLeft: 'auto' } }, speechLang === 'hi' ? 'Hindi' : 'English'),
      ),
      // Scrolling speech text
      h('div', {
        style: {
          background:   '#0f0000',
          borderRadius: 8,
          padding:      '10px 14px',
          fontSize:     13,
          color:        'var(--text2)',
          lineHeight:   1.7,
          fontStyle:    'italic',
          maxHeight:    80,
          overflowY:    'auto',
        }
      }, '"' + speechText + '"'),
    ),

    // ── Content ──
    h('div', { style: { padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 } },

      // Map
      h('div', { style: { background: 'var(--bg2)', border: '1px solid #cc333333', borderRadius: 12, overflow: 'hidden', height: 160 } },
        h(MapSim, { lat, lng, active: true }),
      ),

      // GPS + Alerts
      h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        h('div', { style: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 12 } },
          h('div', { style: { fontSize: 11, color: 'var(--text3)', marginBottom: 4 } }, 'GPS LOCATION'),
          h('div', { style: { fontSize: 12, color: 'var(--text)', fontFamily: 'monospace' } }, lat.toFixed(4) + '°N'),
          h('div', { style: { fontSize: 12, color: 'var(--text)', fontFamily: 'monospace' } }, lng.toFixed(4) + '°E'),
          h('div', { style: { fontSize: 10, color: 'var(--green)', marginTop: 4 } }, '\u25CF Updating...'),
        ),
        h('div', { style: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 12 } },
          h('div', { style: { fontSize: 11, color: 'var(--text3)', marginBottom: 4 } }, 'ALERTS SENT'),
          contacts.slice(0, 3).map(c =>
            h('div', { key: c.id, style: { fontSize: 11, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 } },
              h('div', { style: { width: 6, height: 6, borderRadius: '50%', background: alertSent ? 'var(--green)' : 'var(--text3)' } }),
              c.name,
            )
          ),
        ),
      ),

      // Camera + Active features row
      h('div', { style: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 12 } },
        h('div', { style: { fontSize: 11, color: 'var(--text3)', marginBottom: 8 } }, 'ACTIVE NOW'),
        h('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap' } },
          [
            { icon: '\uD83D\uDCF7', label: 'Camera', color: 'var(--red2)'  },
            { icon: '\uD83C\uDFA4', label: 'Audio',  color: 'var(--orange)' },
            { icon: '\uD83D\uDCCD', label: 'GPS',    color: 'var(--green)'  },
            { icon: '\uD83D\uDD0A', label: 'Speaker',color: 'var(--blue)'   },
          ].map(f =>
            h('div', { key: f.label, style: { display: 'flex', alignItems: 'center', gap: 4, background: '#1a1a1a', border: `1px solid ${f.color}44`, borderRadius: 6, padding: '4px 10px' } },
              h('span', { style: { fontSize: 14 } }, f.icon),
              h('span', { style: { fontSize: 11, color: f.color, fontWeight: 600 } }, f.label),
              h('div',  { style: { width: 5, height: 5, borderRadius: '50%', background: f.color, animation: 'blink 1s infinite' } }),
            )
          )
        ),
      ),

      // End Emergency
      h('button', {
        onClick: endEmergency,
        style: { width: '100%', padding: 14, background: '#1a0000', border: '2px solid var(--red)', borderRadius: 10, color: 'var(--red2)', fontSize: 15, fontWeight: 700, cursor: 'pointer', letterSpacing: 1 }
      }, 'I AM SAFE — END EMERGENCY'),
    ),
  );
}
