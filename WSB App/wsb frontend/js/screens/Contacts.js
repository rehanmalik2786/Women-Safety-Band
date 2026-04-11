/* ============================================
   SCREEN — Contacts Management
   Props: { screen, setScreen, contacts, setContacts }
   ============================================ */

function ContactsScreen({ screen, setScreen, contacts, setContacts }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newC,    setNewC]    = useState({ name: '', phone: '' });

  const togglePref = (id, key) =>
    setContacts(cs => cs.map(c => c.id === id ? { ...c, [key]: !c[key] } : c));

  const removeContact = id =>
    setContacts(cs => cs.filter(c => c.id !== id));

  const addContact = () => {
    if (!newC.name || !newC.phone) return;
    setContacts(cs => [...cs, { id: Date.now(), ...newC, sms: true, call: false, notif: true }]);
    setNewC({ name: '', phone: '' });
    setShowAdd(false);
  };

  const inputStyle = {
    background:   'var(--bg3)',
    border:       '1px solid var(--border)',
    borderRadius: 8,
    padding:      '8px 12px',
    color:        'var(--text)',
    fontSize:     14,
    outline:      'none',
    width:        '100%',
  };

  return h('div', { style: { minHeight: '100vh', display: 'flex', flexDirection: 'column' } },

    // ── Header ──
    h('div', {
      style: {
        background:     'var(--bg2)',
        borderBottom:   '1px solid var(--border)',
        padding:        '14px 20px',
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
      }
    },
      h('h2', { style: { fontSize: 17, fontWeight: 600 } }, 'Trusted Contacts'),
      h('button', {
        onClick: () => setShowAdd(v => !v),
        style:   { background: 'var(--red)', color: 'white', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 13, cursor: 'pointer' }
      }, showAdd ? 'Cancel' : '+ Add'),
    ),

    // ── List ──
    h('div', { style: { flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' } },

      // Add form
      showAdd && h('div', {
        style: { background: 'var(--card)', border: '1px solid #cc333344', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }
      },
        h('h3', { style: { fontSize: 14, color: 'var(--red2)', marginBottom: 4 } }, 'Add New Contact'),
        h('input', { value: newC.name,  onChange: e => setNewC(v => ({ ...v, name:  e.target.value })), placeholder: 'Name',         style: inputStyle }),
        h('input', { value: newC.phone, onChange: e => setNewC(v => ({ ...v, phone: e.target.value })), placeholder: 'Phone number', style: inputStyle }),
        h('button', {
          onClick: addContact,
          style:   { background: 'var(--red)', color: 'white', border: 'none', borderRadius: 8, padding: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }
        }, 'Save Contact'),
      ),

      // Contact cards
      contacts.map(c =>
        h('div', {
          key:   c.id,
          style: { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }
        },
          // Name row
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 } },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              h('div', {
                style: {
                  width:          40,
                  height:         40,
                  borderRadius:   '50%',
                  background:     'var(--bg4)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  fontWeight:     700,
                  color:          'var(--red2)',
                  fontSize:       16,
                }
              }, c.name[0]),
              h('div', null,
                h('div', { style: { fontWeight: 600, fontSize: 14, color: 'var(--text)' } }, c.name),
                h('div', { style: { fontSize: 12,   color: 'var(--text2)', marginTop: 2 } }, c.phone),
              ),
            ),
            h('button', {
              onClick: () => removeContact(c.id),
              style:   { background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 16, padding: 4 }
            }, '\u00D7'),
          ),

          // Toggle buttons
          h('div', { style: { display: 'flex', gap: 8 } },
            [['sms', 'SMS'], ['call', 'Call'], ['notif', 'Push']].map(([key, label]) =>
              h('button', {
                key,
                onClick: () => togglePref(c.id, key),
                style:   {
                  flex:         1,
                  padding:      '6px 0',
                  borderRadius: 6,
                  border:       '1px solid ' + (c[key] ? 'var(--green)' : 'var(--border)'),
                  background:   c[key] ? '#002200' : 'var(--bg3)',
                  color:        c[key] ? 'var(--green)' : 'var(--text3)',
                  fontSize:     12,
                  cursor:       'pointer',
                  fontWeight:   c[key] ? 600 : 400,
                }
              }, label)
            )
          ),
        )
      ),
    ),

    h(NavBar, { screen, setScreen }),
  );
}
