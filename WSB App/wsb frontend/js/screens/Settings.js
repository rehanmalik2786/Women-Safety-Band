/* ============================================
   SCREEN — Settings
   Props: { screen, setScreen, speechLang, setSpeechLang }
   ============================================ */

function SettingsScreen({ screen, setScreen, speechLang, setSpeechLang }) {
  const [testPlaying, setTestPlaying] = useState(false);

  const testSpeech = () => {
    if (testPlaying) {
      stopSpeech();
      setTestPlaying(false);
    } else {
      setTestPlaying(true);
      playSpeech(speechLang, {
        loop: false,
        onComplete: () => setTestPlaying(false),
      });
    }
  };

  const rowStyle = {
    background:     'var(--card)',
    border:         '1px solid var(--border)',
    borderRadius:   12,
    padding:        '16px 18px',
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'center',
  };

  const labelStyle = {
    fontSize:   14,
    fontWeight: 600,
    color:      'var(--text)',
    marginBottom: 2,
  };

  const subStyle = { fontSize: 11, color: 'var(--text3)' };

  return h('div', { style: { minHeight: '100vh', display: 'flex', flexDirection: 'column' } },

    // Header
    h('div', { style: { background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '14px 20px' } },
      h('h2', { style: { fontSize: 17, fontWeight: 600 } }, 'Settings'),
      h('p',  { style: { fontSize: 12, color: 'var(--text3)', marginTop: 4 } }, 'Customize your safety preferences'),
    ),

    h('div', { style: { flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' } },

      // ── Section: Warning Speech ──
      h('div', { style: { fontSize: 11, color: 'var(--text3)', letterSpacing: 1, marginTop: 8, marginBottom: 4, paddingLeft: 4 } },
        'WARNING SPEECH'
      ),

      // Language toggle
      h('div', { style: rowStyle },
        h('div', null,
          h('div', { style: labelStyle }, 'Speech Language'),
          h('div', { style: subStyle }, 'Language spoken from phone speaker during SOS'),
        ),
        h('div', { style: { display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' } },
          ['en', 'hi'].map(lang =>
            h('button', {
              key:     lang,
              onClick: () => setSpeechLang(lang),
              style: {
                padding:    '7px 16px',
                background: speechLang === lang ? 'var(--red)' : 'var(--bg3)',
                color:      speechLang === lang ? 'white' : 'var(--text2)',
                border:     'none',
                fontSize:   13,
                fontWeight: speechLang === lang ? 700 : 400,
                cursor:     'pointer',
              }
            }, lang === 'en' ? 'EN' : 'HI')
          )
        ),
      ),

      // Preview current speech text
      h('div', { style: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 } },
        h('div', { style: { fontSize: 11, color: 'var(--text3)', marginBottom: 10 } }, 'SPEECH PREVIEW'),
        h('div', { style: { fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 14 } },
          '"' + SPEECH[speechLang] + '"'
        ),
        h('button', {
          onClick: testSpeech,
          style: {
            display:        'flex',
            alignItems:     'center',
            gap:            8,
            background:     testPlaying ? '#1a0000' : 'var(--bg3)',
            border:         `1px solid ${testPlaying ? 'var(--red)' : 'var(--border)'}`,
            borderRadius:   8,
            padding:        '9px 18px',
            color:          testPlaying ? 'var(--red2)' : 'var(--text2)',
            fontSize:       13,
            fontWeight:     600,
            cursor:         'pointer',
          }
        },
          h('span', null, testPlaying ? '\u23F9' : '\u25B6'),
          h('span', null, testPlaying ? 'Stop Preview' : 'Test Speech'),
        ),
      ),

      // ── Section: SOS Activation ──
      h('div', { style: { fontSize: 11, color: 'var(--text3)', letterSpacing: 1, marginTop: 8, marginBottom: 4, paddingLeft: 4 } },
        'SOS ACTIVATION'
      ),

      h('div', { style: rowStyle },
        h('div', null,
          h('div', { style: labelStyle }, 'Triple-Tap Required'),
          h('div', { style: subStyle }, 'Tap panic button 3 times to activate SOS'),
        ),
        h('div', { style: { background: 'var(--green)', color: '#001a00', borderRadius: 12, padding: '4px 12px', fontSize: 11, fontWeight: 700 } }, 'ON'),
      ),

      h('div', { style: rowStyle },
        h('div', null,
          h('div', { style: labelStyle }, 'Auto Audio/Video/GPS'),
          h('div', { style: subStyle }, 'Starts recording + location automatically on SOS'),
        ),
        h('div', { style: { background: 'var(--green)', color: '#001a00', borderRadius: 12, padding: '4px 12px', fontSize: 11, fontWeight: 700 } }, 'ON'),
      ),

      h('div', { style: rowStyle },
        h('div', null,
          h('div', { style: labelStyle }, 'Speaker Warning'),
          h('div', { style: subStyle }, 'Plays loud warning from phone speaker during SOS'),
        ),
        h('div', { style: { background: 'var(--green)', color: '#001a00', borderRadius: 12, padding: '4px 12px', fontSize: 11, fontWeight: 700 } }, 'ON'),
      ),

      // ── Section: App Info ──
      h('div', { style: { fontSize: 11, color: 'var(--text3)', letterSpacing: 1, marginTop: 8, marginBottom: 4, paddingLeft: 4 } },
        'APP INFO'
      ),

      h('div', { style: { ...rowStyle, flexDirection: 'column', alignItems: 'flex-start', gap: 6 } },
        h('div', { style: { fontSize: 13, fontWeight: 600, color: 'var(--text)' } }, 'Women Safety Band'),
        h('div', { style: subStyle }, 'Version 1.0.0 — GEC Bikaner'),
        h('div', { style: subStyle }, 'Built by Rehan Ahmed Khan'),
      ),
    ),

    h(NavBar, { screen, setScreen }),
  );
}
