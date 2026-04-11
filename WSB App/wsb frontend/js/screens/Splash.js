/* ============================================
   SCREEN — Splash
   ============================================ */

function SplashScreen() {
  return h('div', {
    style: {
      minHeight:      '100vh',
      background:     '#0a0a0f',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            20,
    }
  },
    h('div', {
      style: {
        width:          90,
        height:         90,
        borderRadius:   '50%',
        background:     '#1a0a0a',
        border:         '3px solid var(--red)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        fontSize:       36,
      }
    }, '\u26A1'),

    h('div', { style: { textAlign: 'center' } },
      h('h1', { style: { color: 'var(--red2)',  fontSize: 24, fontWeight: 700, letterSpacing: 1 } }, 'WOMEN'),
      h('h1', { style: { color: 'var(--text)',   fontSize: 24, fontWeight: 700, letterSpacing: 1 } }, 'SAFETY BAND'),
    ),

    h('div', { style: { color: 'var(--text3)', fontSize: 12, letterSpacing: 2 } },
      'EMPOWERING THROUGH TECHNOLOGY'
    ),

    h('div', {
      style: {
        width:        40,
        height:       3,
        background:   'var(--red)',
        borderRadius: 2,
        animation:    'loading 1.5s ease-in-out infinite',
      }
    })
  );
}
