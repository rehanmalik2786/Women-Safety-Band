/* ============================================
   COMPONENT — NavBar
   ============================================ */

function NavBar({ screen, setScreen }) {
  const tabs = [
    { id: 'home',      label: 'Home',      icon: '\u2302' },
    { id: 'contacts',  label: 'Contacts',  icon: '\u260E' },
    { id: 'history',   label: 'History',   icon: '\u25A6' },
    { id: 'dashboard', label: 'Dashboard', icon: '\u2630' },
    { id: 'settings',  label: 'Settings',  icon: '\u2699' },
  ];

  return h('div', {
    style: { display: 'flex', background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '8px 0 4px' }
  },
    tabs.map(tab =>
      h('button', {
        key:     tab.id,
        onClick: () => setScreen(tab.id),
        style: {
          flex:           1,
          background:     'none',
          border:         'none',
          color:          screen === tab.id ? 'var(--red2)' : 'var(--text2)',
          cursor:         'pointer',
          padding:        '6px 0',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          gap:            2,
        }
      },
        h('span', { style: { fontSize: 16 } }, tab.icon),
        h('span', { style: { fontSize: 9  } }, tab.label)
      )
    )
  );
}
