/* ============================================
   SCREEN — Login (OTP)
   Props: { setScreen }
   ============================================ */

function LoginScreen({ setScreen }) {
  const [phone,   setPhone]   = useState('');
  const [otp,     setOtp]     = useState('');
  const [otpSent, setOtpSent] = useState(false);

  return h('div', {
    style: {
      minHeight:      '100vh',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        24,
      gap:            24,
    }
  },
    // Header
    h('div', { style: { textAlign: 'center', marginBottom: 8 } },
      h('div', { style: { fontSize: 40, marginBottom: 8 } }, '\uD83D\uDEE1\uFE0F'),
      h('h2',  { style: { fontSize: 20, color: 'var(--text)' } }, 'Women Safety Band'),
      h('p',   { style: { color: 'var(--text2)', fontSize: 13, marginTop: 4 } }, 'Secure login with OTP'),
    ),

    // Card
    h('div', {
      style: {
        width:        '100%',
        maxWidth:     360,
        background:   'var(--card)',
        border:       '1px solid var(--border)',
        borderRadius: 12,
        padding:      24,
        display:      'flex',
        flexDirection:'column',
        gap:          16,
      }
    },
      !otpSent
        // — Step 1: Enter phone —
        ? h('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
            h('label', { style: { fontSize: 12, color: 'var(--text2)' } }, 'Phone Number'),
            h('input', {
              value:       phone,
              onChange:    e => setPhone(e.target.value),
              placeholder: '+91 XXXXX XXXXX',
              style: {
                background:   'var(--bg3)',
                border:       '1px solid var(--border)',
                borderRadius: 8,
                padding:      '10px 14px',
                color:        'var(--text)',
                fontSize:     15,
                outline:      'none',
              }
            }),
            h('button', {
              onClick: () => { if (phone) setOtpSent(true); },
              style: {
                background:   'var(--red)',
                color:        'white',
                border:       'none',
                borderRadius: 8,
                padding:      12,
                fontSize:     15,
                fontWeight:   600,
                cursor:       'pointer',
              }
            }, 'Send OTP')
          )

        // — Step 2: Enter OTP —
        : h('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
            h('div', {
              style: {
                background:   '#0a2a0a',
                border:       '1px solid #22cc7722',
                borderRadius: 8,
                padding:      '10px 14px',
                fontSize:     13,
                color:        'var(--green)',
              }
            }, `OTP sent to ${phone} — Use 1234 for demo`),
            h('label', { style: { fontSize: 12, color: 'var(--text2)' } }, 'Enter OTP'),
            h('input', {
              value:       otp,
              onChange:    e => setOtp(e.target.value),
              placeholder: '_ _ _ _',
              maxLength:   4,
              style: {
                background:    'var(--bg3)',
                border:        '1px solid var(--border)',
                borderRadius:  8,
                padding:       '10px 14px',
                color:         'var(--text)',
                fontSize:      24,
                letterSpacing: 12,
                textAlign:     'center',
                outline:       'none',
              }
            }),
            h('button', {
              onClick: () => { if (otp === '1234') setScreen('home'); },
              style: {
                background:   otp === '1234' ? 'var(--red)' : 'var(--bg4)',
                color:        'white',
                border:       'none',
                borderRadius: 8,
                padding:      12,
                fontSize:     15,
                fontWeight:   600,
                cursor:       'pointer',
              }
            }, 'Verify & Login')
          )
    )
  );
}
