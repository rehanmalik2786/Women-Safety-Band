/* ============================================
   SCREEN — Home Dashboard
   Triple-tap to activate SOS.
   Props: { screen, setScreen, triggerPanic, battery, signal }
   ============================================ */

function HomeScreen({ screen, setScreen, triggerPanic, battery, signal }) {
  const [tapCount,   setTapCount]   = useState(0);
  const [tapMsg,     setTapMsg]     = useState('');
  const tapTimerRef = useRef(null);

  const handlePanicTap = () => {
    const next = tapCount + 1;
    setTapCount(next);

    // Clear previous reset timer
    clearTimeout(tapTimerRef.current);

    if (next === 1) {
      setTapMsg('2 more taps to activate!');
    } else if (next === 2) {
      setTapMsg('1 more tap — almost there!');
    } else if (next >= 3) {
      // ACTIVATE
      setTapCount(0);
      setTapMsg('');
      triggerPanic();
      return;
    }

    // Reset tap count after 2 seconds of inactivity
    tapTimerRef.current = setTimeout(() => {
      setTapCount(0);
      setTapMsg('');
    }, 2000);
  };

  useEffect(() => () => clearTimeout(tapTimerRef.current), []);

  // Ring fills based on tap count
  const ringColors = ['#2a2a3a', '#662222', '#aa2222'];
  const progress   = tapCount; // 0, 1, 2

  return h('div', { style: { minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' } },

    // ── Top Bar ──
    h('div', {
      style: { background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
    },
      h('div', null,
        h('p',  { style: { fontSize: 11, color: 'var(--text3)' } }, 'WELCOME BACK'),
        h('h2', { style: { fontSize: 17, fontWeight: 600, color: 'var(--text)' } }, 'Rehan / Test User'),
      ),
      h('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
        // Signal bars
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 } },
          h('div', { style: { display: 'flex', gap: 2 } },
            [1,2,3,4,5].map(i =>
              h('div', { key: i, style: { width: 3, height: 4 + i * 2, background: i <= signal ? 'var(--green)' : 'var(--border)', borderRadius: 1 } })
            )
          ),
          h('span', { style: { fontSize: 9, color: 'var(--text3)' } }, 'LTE-M'),
        ),
        // Battery
        h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 } },
          h('div', { style: { width: 28, height: 14, border: '2px solid var(--text3)', borderRadius: 3, position: 'relative', display: 'flex', alignItems: 'center', padding: '1px 2px' } },
            h('div', { style: { height: '100%', width: `${battery}%`, background: battery > 20 ? 'var(--green)' : 'var(--red)', borderRadius: 2 } }),
            h('div', { style: { position: 'absolute', right: -4, top: 3, width: 3, height: 6, background: 'var(--text3)', borderRadius: '0 2px 2px 0' } }),
          ),
          h('span', { style: { fontSize: 9, color: 'var(--text3)' } }, battery + '%'),
        ),
      ),
    ),

    // ── Center ──
    h('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 24 } },

      // Instruction
      h('p', { style: { fontSize: 12, color: 'var(--text2)', letterSpacing: 2, textTransform: 'uppercase' } },
        'TAP 3 TIMES TO ACTIVATE SOS'
      ),

      // Tap progress dots
      h('div', { style: { display: 'flex', gap: 10, marginBottom: 4 } },
        [0, 1, 2].map(i =>
          h('div', {
            key: i,
            style: {
              width:        12,
              height:       12,
              borderRadius: '50%',
              background:   i < tapCount ? 'var(--red2)' : 'var(--border)',
              transition:   'background 0.2s',
              boxShadow:    i < tapCount ? '0 0 8px var(--red2)' : 'none',
            }
          })
        )
      ),

      // Tap message
      h('p', {
        style: {
          fontSize:   13,
          color:      tapCount > 0 ? 'var(--red2)' : 'transparent',
          fontWeight: 600,
          minHeight:  20,
          transition: 'color 0.2s',
        }
      }, tapMsg || '.'),

      // ── PANIC BUTTON ──
      h('div', {
        onClick: handlePanicTap,
        style: {
          cursor:   'pointer',
          position: 'relative',
          width:    180,
          height:   180,
          display:  'flex',
          alignItems:     'center',
          justifyContent: 'center',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }
      },
        // Outer ring 1 — dims when tap 0, grows with taps
        h('div', { style: { position: 'absolute', width: 224, height: 224, borderRadius: '50%', border: `2px solid ${progress >= 1 ? 'var(--red)' : 'var(--border)'}`, opacity: progress >= 1 ? 0.5 : 0.2, transition: 'all 0.3s' } }),
        // Outer ring 2
        h('div', { style: { position: 'absolute', width: 202, height: 202, borderRadius: '50%', border: `2px solid ${progress >= 2 ? 'var(--red)' : 'var(--border)'}`, opacity: progress >= 2 ? 0.7 : 0.2, transition: 'all 0.3s' } }),

        // Main button
        h('div', {
          style: {
            width:          180,
            height:         180,
            borderRadius:   '50%',
            background:     progress === 0
              ? 'linear-gradient(145deg,#882222,#550000)'
              : progress === 1
              ? 'linear-gradient(145deg,#cc2222,#881111)'
              : 'linear-gradient(145deg,#ff3333,#aa1111)',
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            6,
            boxShadow:      `0 0 ${20 + progress * 15}px #cc333366`,
            zIndex:         2,
            transition:     'all 0.2s',
            border:         `3px solid ${progress > 0 ? 'var(--red2)' : '#661111'}`,
          }
        },
          h('span', { style: { fontSize: 36 } }, '\u26A0\uFE0F'),
          h('span', { style: { color: 'white', fontWeight: 700, fontSize: 16, letterSpacing: 1 } }, 'PANIC'),
          h('span', { style: { color: 'rgba(255,255,255,0.7)', fontSize: 11 } },
            progress === 0 ? 'Tap 3 times' : `${3 - progress} more tap${3 - progress > 1 ? 's' : ''}...`
          ),
        ),
      ),

      // Status cards
      h('div', { style: { width: '100%', maxWidth: 360, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 } },
        [
          { label: 'Location', color: 'var(--green)', val: 'ON',    icon: '\uD83D\uDCCD' },
          { label: 'Network',  color: 'var(--green)', val: 'LTE-M', icon: '\uD83D\uDCF6' },
          { label: 'Band',     color: 'var(--blue)',  val: 'Linked', icon: '\u231A'       },
        ].map(item =>
          h('div', { key: item.label, style: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 8px', textAlign: 'center' } },
            h('div', { style: { fontSize: 18, marginBottom: 4 } }, item.icon),
            h('div', { style: { fontSize: 11, color: 'var(--text3)', marginBottom: 2 } }, item.label),
            h('div', { style: { fontSize: 12, color: item.color, fontWeight: 600 } }, item.val),
          )
        )
      ),
    ),

    h(NavBar, { screen, setScreen }),
  );
}
