/* ============================================
   SCREEN — Incident History
   Props: { screen, setScreen, history }
   ============================================ */

function HistoryScreen({ screen, setScreen, history }) {
  return h('div', { style: { minHeight: '100vh', display: 'flex', flexDirection: 'column' } },

    h('div', { style: { background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '14px 20px' } },
      h('h2', { style: { fontSize: 17, fontWeight: 600 } }, 'Incident History'),
      h('p',  { style: { fontSize: 12, color: 'var(--text3)', marginTop: 4 } }, history.length + ' total incidents'),
    ),

    h('div', { style: { flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' } },

      history.length === 0 && h('div', { style: { textAlign: 'center', padding: 40, color: 'var(--text3)' } },
        '\u2705 No incidents recorded'
      ),

      history.map(inc =>
        h('div', {
          key:   inc.id,
          style: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }
        },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } },
            h('div', null,
              h('div', { style: { fontSize: 13, fontWeight: 600, color: 'var(--text)',  marginBottom: 2 } }, inc.ts),
              h('div', { style: { fontSize: 12, color: 'var(--text2)' } },
                inc.loc || ('Lat: ' + inc.lat.toFixed(4) + '  Lng: ' + inc.lng.toFixed(4))
              ),
            ),
            h(Badge, { text: 'Resolved', color: 'var(--green)' }),
          ),
          h('div', { style: { display: 'flex', gap: 16, marginTop: 8 } },
            h('div', { style: { fontSize: 12, color: 'var(--text3)' } }, '\u23F1 Duration: ' + inc.duration),
            h('div', { style: { fontSize: 12, color: 'var(--text3)', fontFamily: 'monospace' } },
              '\uD83D\uDCCD ' + inc.lat.toFixed(4) + ', ' + inc.lng.toFixed(4)
            ),
          ),
        )
      ),
    ),

    h(NavBar, { screen, setScreen }),
  );
}
