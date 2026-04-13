/* ============================================
   SCREEN — Web Dashboard (Analytics)
   Props: { screen, setScreen, history, contacts, lat, lng }
   ============================================ */

function DashboardScreen({ screen, setScreen, history, contacts, lat, lng }) {
  const [activeTab, setActiveTab] = useState('live');

  return h('div', { style: { minHeight: '100vh', display: 'flex', flexDirection: 'column' } },

    // ── Header ──
    h('div', {
      style: { background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
    },
      h('div', null,
        h('h2', { style: { fontSize: 17, fontWeight: 600 } }, 'Web Dashboard'),
        h('p',  { style: { fontSize: 11, color: 'var(--text3)' } }, 'Analytics & Monitoring'),
      ),
      h(Badge, { text: 'All Clear', color: 'var(--green)' }),
    ),

    // ── Tab Bar ──
    h('div', { style: { display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' } },
      [['live', 'Live'], ['analytics', 'Analytics'], ['map', 'Map']].map(([id, label]) =>
        h('button', {
          key:     id,
          onClick: () => setActiveTab(id),
          style:   {
            flex:         1,
            padding:      10,
            background:   'none',
            border:       'none',
            borderBottom: `2px solid ${activeTab === id ? 'var(--red)' : 'transparent'}`,
            color:         activeTab === id ? 'var(--text)' : 'var(--text3)',
            fontSize:     13,
            cursor:       'pointer',
          }
        }, label)
      )
    ),

    // ── Tab Content ──
    h('div', { style: { flex: 1, padding: 16, overflowY: 'auto' } },

      // LIVE tab
      activeTab === 'live' && h('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
          [
            ['Total Alerts',  history.length,  'var(--red2)'  ],
            ['Contacts',      contacts.length,  'var(--blue)'  ],
            ['Avg Duration',  '3m 52s',         'var(--orange)'],
            ['Status',        'Safe',           'var(--green)' ],
          ].map(([label, val, color]) =>
            h('div', { key: label, style: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 14 } },
              h('div', { style: { fontSize: 11, color: 'var(--text3)', marginBottom: 6 } }, label.toUpperCase()),
              h('div', { style: { fontSize: 22, fontWeight: 600, color } }, val),
            )
          )
        ),
        h('div', { style: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 } },
          h('div', { style: { fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--text)' } }, 'Recent Activity'),
          history.slice(0, 3).map(inc =>
            h('div', {
              key:   inc.id,
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }
            },
              h('div', null,
                h('div', { style: { fontSize: 13, color: 'var(--text)'  } }, 'Emergency Event'),
                h('div', { style: { fontSize: 11, color: 'var(--text3)' } }, inc.ts),
              ),
              h(Badge, { text: 'Resolved', color: 'var(--green)' }),
            )
          ),
        ),
      ),

      // ANALYTICS tab
      activeTab === 'analytics' && h('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
        h('div', { style: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 } },
          h('div', { style: { fontSize: 13, fontWeight: 600, marginBottom: 14, color: 'var(--text)' } }, 'Alerts Per Day (Last 7 Days)'),
          h('div', { style: { display: 'flex', gap: 6, alignItems: 'flex-end', height: 80 } },
            [1, 2, 0, 1, 3, 0, history.length].map((v, i) => {
              const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];
              return h('div', { key: i, style: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 } },
                h('div', {
                  style: {
                    width:      '100%',
                    height:     Math.max(4, v * 20),
                    background: i === 6 ? 'var(--red)' : 'var(--bg4)',
                    borderRadius: '3px 3px 0 0',
                    border:     `1px solid ${i === 6 ? 'var(--red)' : 'var(--border)'}`,
                  }
                }),
                h('div', { style: { fontSize: 9, color: 'var(--text3)' } }, days[i]),
              );
            })
          ),
        ),
        h('div', { style: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 } },
          h('div', { style: { fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--text)' } }, 'Alert Channels Used'),
          [['SMS', '75%'], ['Push Notification', '90%'], ['Phone Call', '50%']].map(([ch, pct]) =>
            h('div', { key: ch, style: { marginBottom: 12 } },
              h('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 } },
                h('span', { style: { color: 'var(--text2)' } }, ch),
                h('span', { style: { color: 'var(--text)'  } }, pct),
              ),
              h('div', { style: { height: 6, background: 'var(--bg3)', borderRadius: 3, overflow: 'hidden' } },
                h('div', { style: { height: '100%', width: pct, background: 'var(--red)', borderRadius: 3 } }),
              ),
            )
          ),
        ),
      ),

      // MAP tab
      activeTab === 'map' && h('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        h('div', { style: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', height: 220 } },
          h(MapSim, { lat, lng, active: false }),
        ),
        h('div', { style: { fontSize: 12, color: 'var(--text3)', textAlign: 'center' } }, 'Incident locations across Jaipur'),
        history.map(inc =>
          h('div', {
            key:   inc.id,
            style: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
          },
            h('div', null,
              h('div', { style: { fontSize: 12, fontFamily: 'monospace', color: 'var(--text)' } },
                inc.lat.toFixed(4) + '\u00B0N, ' + inc.lng.toFixed(4) + '\u00B0E'
              ),
              h('div', { style: { fontSize: 11, color: 'var(--text3)', marginTop: 2 } }, inc.ts),
            ),
            h('div', { style: { width: 10, height: 10, borderRadius: '50%', background: 'var(--red)' } }),
          )
        ),
      ),
    ),

    h(NavBar, { screen, setScreen }),
  );
}
