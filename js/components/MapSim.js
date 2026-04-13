/* ============================================
   COMPONENT — MapSim (Canvas-based map)
   Usage: h(MapSim, { lat, lng, active })
   ============================================ */

function MapSim({ lat, lng, active }) {
  const canRef = useRef();

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const w   = c.width  = c.offsetWidth  || 320;
    const h2  = c.height = c.offsetHeight || 200;

    // Background
    ctx.fillStyle = '#0d0d1a';
    ctx.fillRect(0, 0, w, h2);

    // Grid lines
    ctx.strokeStyle = '#1e1e3a';
    ctx.lineWidth   = 1;
    for (let x = 0; x < w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0);  ctx.lineTo(x, h2); ctx.stroke(); }
    for (let y = 0; y < h2; y += 30) { ctx.beginPath(); ctx.moveTo(0, y);  ctx.lineTo(w, y);  ctx.stroke(); }

    // Roads
    ['Road 12', 'MG Road', 'Tonk Rd'].forEach((road, i) => {
      ctx.strokeStyle = '#2a2a5a';
      ctx.lineWidth   = 4;
      ctx.beginPath();
      if (i === 0) { ctx.moveTo(0, h2 * 0.3); ctx.lineTo(w, h2 * 0.3); }
      else if (i === 1) { ctx.moveTo(0, h2 * 0.6); ctx.lineTo(w, h2 * 0.6); }
      else { ctx.moveTo(w * 0.4, 0); ctx.lineTo(w * 0.4, h2); }
      ctx.stroke();
      ctx.fillStyle = '#3a3a6a';
      ctx.font      = '10px system-ui';
      ctx.fillText(road, 10 + i * 80, i < 2 ? h2 * 0.3 - 5 : h2 * 0.7);
    });

    // Pulse rings (emergency mode)
    const px = w / 2, py = h2 / 2;
    if (active) {
      [50, 35, 20].forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(204,51,51,${0.2 + i * 0.15})`;
        ctx.lineWidth   = 1;
        ctx.stroke();
      });
    }

    // Location dot
    ctx.beginPath();
    ctx.arc(px, py, 8, 0, Math.PI * 2);
    ctx.fillStyle = active ? '#ff3333' : '#3388ff';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    // Coordinates label
    ctx.fillStyle = '#a0a0c0';
    ctx.font      = '11px system-ui';
    ctx.fillText(`${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`, 8, h2 - 8);

  }, [lat, lng, active]);

  return h('canvas', {
    ref:   canRef,
    style: { width: '100%', height: '100%', borderRadius: 8, display: 'block' },
  });
}
