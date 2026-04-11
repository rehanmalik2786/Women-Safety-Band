/* ============================================
   COMPONENT — Badge
   Usage: h(Badge, { text: 'Resolved', color: 'var(--green)' })
   ============================================ */

function Badge({ text, color = 'var(--green)' }) {
  return h('span', {
    style: {
      background:   color + '22',
      color:        color,
      border:       `1px solid ${color}44`,
      borderRadius: 4,
      padding:      '2px 8px',
      fontSize:     11,
      fontWeight:   500,
    }
  }, text);
}
