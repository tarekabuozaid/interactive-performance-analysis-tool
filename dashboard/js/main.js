/* ═══════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════ */
function animateCounter(el, target, duration = 1200, prefix = '', isFloat = false) {
  const start = parseFloat(el.textContent.replace(/[^0-9.-]/g, '')) || 0;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = start + (target - start) * eased;
    el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current).toLocaleString());
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ═══════════════════════════════════════════════════════════
   MAIN UPDATE
   ═══════════════════════════════════════════════════════════ */
function updateDashboard() {
  const q = document.getElementById('quarterSelect').value;
  const r = document.getElementById('regionSelect').value;
  const d = DATA[q][r];

  // Animate counters
  animateCounter(document.getElementById('kpiCompleted'), d.completed);
  animateCounter(document.getElementById('kpiPending'), d.pending);
  animateCounter(document.getElementById('kpiSLA'), d.sla, 1200, '', true);
  animateCounter(document.getElementById('kpiCost'), d.cost);

  // Sparklines
  buildSparkline('sparkCompleted', d.trend, '#00d4b1');
  buildSparkline('sparkPending', d.trend.map(v => Math.round(v*0.1)), '#f59e0b');
  buildSparkline('sparkSLA', [d.sla-2, d.sla-1, d.sla], '#7c3aed');
  buildSparkline('sparkCost', d.trend.map(v => v*350), '#3b82f6');

  // Charts
  buildTrendChart(d);
  buildStatusChart(d);
  buildCostChart();
  buildRegionChart();

  // AI Insights
  renderInsights(d);
}

// Initial render
window.addEventListener('load', updateDashboard);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
