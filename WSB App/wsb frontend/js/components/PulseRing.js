/* ============================================
   COMPONENT — PulseRing
   Usage: h(PulseRing, { size, color, active })
   ============================================ */

function PulseRing({ size = 120, color = '#cc3333', active = false }) {
  return h('div', {
    style: {
      position:       'relative',
      width:          size,
      height:         size,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
    }
  },
    active && h('div', {
      style: {
        position:     'absolute',
        width:        size * 1.5,
        height:       size * 1.5,
        borderRadius: '50%',
        border:       `2px solid ${color}`,
        opacity:      0.4,
        animation:    'pulseOut 1.5s infinite',
      }
    }),
    active && h('div', {
      style: {
        position:     'absolute',
        width:        size * 1.25,
        height:       size * 1.25,
        borderRadius: '50%',
        border:       `2px solid ${color}`,
        opacity:      0.6,
        animation:    'pulseOut 1.5s 0.4s infinite',
      }
    }),
    h('div', {
      style: {
        width:          size,
        height:         size,
        borderRadius:   '50%',
        background:     `radial-gradient(circle at 40% 40%, #ff4444, ${color})`,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        cursor:         'pointer',
        boxShadow:      `0 0 ${active ? 40 : 20}px ${color}80`,
        zIndex:         2,
        flexDirection:  'column',
        gap:            4,
      }
    })
  );
}
