/* ═══════════════════════════════════════════════════════════
   SAMPLE DATA — Realistic AWQAF/TFM68 dataset
   ═══════════════════════════════════════════════════════════ */
const DATA = {
  Q1: {
    all:     { completed: 1247, pending: 142, overdue: 38, sla: 91.2, cost: 487500, trend: [380, 412, 455] },
    madinat: { completed: 742, pending: 89, overdue: 22, sla: 92.1, cost: 287400, trend: [225, 248, 269] },
    liwa:    { completed: 505, pending: 53, overdue: 16, sla: 89.8, cost: 200100, trend: [155, 164, 186] }
  },
  Q2: {
    all:     { completed: 1402, pending: 134, overdue: 31, sla: 94.3, cost: 445200, trend: [445, 478, 479] },
    madinat: { completed: 836, pending: 78, overdue: 18, sla: 95.1, cost: 263800, trend: [264, 282, 290] },
    liwa:    { completed: 566, pending: 56, overdue: 13, sla: 92.9, cost: 181400, trend: [181, 196, 189] }
  },
  Q3: {
    all:     { completed: 1518, pending: 156, overdue: 42, sla: 92.8, cost: 512300, trend: [488, 512, 518] },
    madinat: { completed: 905, pending: 92, overdue: 25, sla: 93.5, cost: 305700, trend: [290, 305, 310] },
    liwa:    { completed: 613, pending: 64, overdue: 17, sla: 91.6, cost: 206600, trend: [198, 207, 208] }
  },
  Q4: {
    all:     { completed: 1389, pending: 128, overdue: 29, sla: 95.7, cost: 468900, trend: [462, 458, 469] },
    madinat: { completed: 825, pending: 74, overdue: 16, sla: 96.4, cost: 278200, trend: [274, 271, 280] },
    liwa:    { completed: 564, pending: 54, overdue: 13, sla: 94.5, cost: 190700, trend: [188, 187, 189] }
  }
};

const COST_BREAKDOWN = {
  Q2: { 'Mechanical': 145000, 'Electrical': 98500, 'Plumbing': 76200, 'Civil': 68400, 'Spare Parts': 57100 }
};

const SAMPLE_WO = [
  { id: 'WO-2026-1247', site: 'Al Dhafra Mosque #12', type: 'Mechanical', status: 'completed', cost: 1850, days: 2 },
  { id: 'WO-2026-1248', site: 'Liwa Central Mosque', type: 'Electrical', status: 'completed', cost: 920, days: 1 },
  { id: 'WO-2026-1249', site: 'Madinat Zayed Mosque #3', type: 'Plumbing', status: 'pending', cost: 450, days: 4 },
  { id: 'WO-2026-1250', site: 'Al Marfa Mosque', type: 'Civil', status: 'overdue', cost: 3200, days: 8 },
  { id: 'WO-2026-1251', site: 'Ghayathi Mosque', type: 'Mechanical', status: 'completed', cost: 2100, days: 3 },
  { id: 'WO-2026-1252', site: 'Liwa South Mosque', type: 'Electrical', status: 'pending', cost: 680, days: 2 },
];

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
   CHARTS — Chart.js setup
   ═══════════════════════════════════════════════════════════ */
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Segoe UI', sans-serif";
Chart.defaults.borderColor = 'rgba(255,255,255,0.05)';

let charts = {};

function makeGradient(ctx, color1, color2) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}

function buildSparkline(canvasId, data, color) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  if (charts[canvasId]) charts[canvasId].destroy();
  charts[canvasId] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((_, i) => i),
      datasets: [{
        data,
        borderColor: color,
        backgroundColor: makeGradient(ctx, color + '40', color + '00'),
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { x: { display: false }, y: { display: false } },
      animation: { duration: 1500, easing: 'easeOutCubic' }
    }
  });
}

function buildTrendChart(d) {
  const ctx = document.getElementById('trendChart').getContext('2d');
  if (charts.trend) charts.trend.destroy();

  const months = ['Apr', 'May', 'Jun'];
  charts.trend = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Completed',
          data: d.trend,
          borderColor: '#00d4b1',
          backgroundColor: makeGradient(ctx, 'rgba(0,212,177,0.4)', 'rgba(0,212,177,0)'),
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#00d4b1',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8
        },
        {
          label: 'Pending',
          data: d.trend.map(v => Math.round(v * 0.12)),
          borderColor: '#f59e0b',
          backgroundColor: makeGradient(ctx, 'rgba(245,158,11,0.2)', 'rgba(245,158,11,0)'),
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4
        },
        {
          label: 'Overdue',
          data: d.trend.map(v => Math.round(v * 0.025)),
          borderColor: '#ef4444',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 12, padding: 16, font: { size: 12 } } },
        tooltip: {
          backgroundColor: 'rgba(10, 14, 26, 0.95)',
          padding: 12, borderColor: '#00d4b1', borderWidth: 1,
          cornerRadius: 10, titleFont: { weight: 700 }
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, beginAtZero: true }
      },
      animation: { duration: 1500, easing: 'easeOutCubic' }
    }
  });
}

function buildStatusChart(d) {
  const ctx = document.getElementById('statusChart').getContext('2d');
  if (charts.status) charts.status.destroy();
  const total = d.completed + d.pending + d.overdue;
  charts.status = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Completed', 'Pending', 'Overdue'],
      datasets: [{
        data: [d.completed, d.pending, d.overdue],
        backgroundColor: ['#00d4b1', '#f59e0b', '#ef4444'],
        borderColor: '#0a0e1a',
        borderWidth: 3,
        hoverOffset: 12
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: { position: 'bottom', labels: { padding: 14, font: { size: 12 } } },
        tooltip: {
          backgroundColor: 'rgba(10, 14, 26, 0.95)',
          padding: 12, cornerRadius: 10,
          callbacks: {
            label: (c) => `${c.label}: ${c.raw.toLocaleString()} (${(c.raw/total*100).toFixed(1)}%)`
          }
        }
      },
      animation: { animateRotate: true, animateScale: true, duration: 1200 }
    }
  });
}

function buildCostChart() {
  const ctx = document.getElementById('costChart').getContext('2d');
  if (charts.cost) charts.cost.destroy();
  const data = COST_BREAKDOWN.Q2;
  charts.cost = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: ['#00d4b1', '#3b82f6', '#7c3aed', '#f59e0b', '#ec4899'],
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(10, 14, 26, 0.95)',
          padding: 12, cornerRadius: 10,
          callbacks: { label: (c) => `AED ${c.raw.toLocaleString()}` }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { callback: v => 'AED ' + (v/1000) + 'K' } },
        y: { grid: { display: false } }
      },
      animation: { duration: 1500, easing: 'easeOutCubic' }
    }
  });
}

function buildRegionChart() {
  const ctx = document.getElementById('regionChart').getContext('2d');
  if (charts.region) charts.region.destroy();
  const q = document.getElementById('quarterSelect').value;
  const m = DATA[q].madinat;
  const l = DATA[q].liwa;

  charts.region = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Completed', 'SLA %', 'Speed', 'Cost Eff.', 'Quality'],
      datasets: [
        {
          label: 'Madinat Zayed',
          data: [m.completed/15, m.sla, 88, 82, 91],
          backgroundColor: 'rgba(0, 212, 177, 0.2)',
          borderColor: '#00d4b1',
          borderWidth: 2,
          pointBackgroundColor: '#00d4b1'
        },
        {
          label: 'Liwa',
          data: [l.completed/15, l.sla, 85, 86, 89],
          backgroundColor: 'rgba(124, 58, 237, 0.2)',
          borderColor: '#7c3aed',
          borderWidth: 2,
          pointBackgroundColor: '#7c3aed'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { padding: 14 } } },
      scales: {
        r: {
          angleLines: { color: 'rgba(255,255,255,0.1)' },
          grid: { color: 'rgba(255,255,255,0.08)' },
          pointLabels: { color: '#cbd5e1', font: { size: 12 } },
          ticks: { display: false },
          beginAtZero: true
        }
      },
      animation: { duration: 1500 }
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   AI INSIGHTS GENERATOR
   ═══════════════════════════════════════════════════════════ */
function generateInsights(d) {
  const insights = [];
  const completionRate = (d.completed / (d.completed + d.pending + d.overdue) * 100).toFixed(1);

  if (d.sla > 94) {
    insights.push({ icon: '🎯', text: `<strong>SLA Excellence:</strong> الـ SLA Compliance بلغ ${d.sla}% — أعلى من الـ target بـ ${(d.sla - 90).toFixed(1)}%` });
  } else {
    insights.push({ icon: '⚠️', text: `<strong>SLA Alert:</strong> الـ SLA Compliance ${d.sla}% — تحت الـ target. يحتاج plan تحسين` });
  }

  insights.push({ icon: '✅', text: `<strong>Completion Rate:</strong> ${completionRate}% من الـ work orders اتقفلت — أداء قوي` });

  if (d.overdue > 35) {
    insights.push({ icon: '🚨', text: `<strong>Risk:</strong> ${d.overdue} work orders متأخرة — يحتاج immediate action` });
  } else {
    insights.push({ icon: '✨', text: `<strong>Low Risk:</strong> فقط ${d.overdue} متأخرة — تحت السيطرة` });
  }

  const avgCost = (d.cost / d.completed).toFixed(0);
  insights.push({ icon: '💡', text: `<strong>Cost Efficiency:</strong> متوسط التكلفة ${avgCost} AED / WO — ممكن خفضه بـ preventive maintenance` });

  return insights;
}

function renderInsights(d) {
  const container = document.getElementById('aiInsights');
  const insights = generateInsights(d);
  container.innerHTML = insights.map(i => `
    <div class="insight-item">
      <div class="insight-icon">${i.icon}</div>
      <div class="insight-text">${i.text}</div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════
   DRILL-DOWN
   ═══════════════════════════════════════════════════════════ */
function openDrillDown(type) {
  const modal = document.getElementById('modal');
  const titles = {
    completed: { title: 'Completed Work Orders', sub: 'Q2 2026 — Detailed View' },
    pending: { title: 'Pending Work Orders', sub: 'In Progress — Action Required' },
    sla: { title: 'SLA Compliance Details', sub: 'Service Level Performance' },
    cost: { title: 'Cost Breakdown', sub: 'Financial Analysis' }
  };

  document.getElementById('modalTitle').textContent = titles[type].title;
  document.getElementById('modalSubtitle').textContent = titles[type].sub;

  const stats = document.getElementById('modalStats');
  const q = document.getElementById('quarterSelect').value;
  const r = document.getElementById('regionSelect').value;
  const d = DATA[q][r];

  if (type === 'completed') {
    stats.innerHTML = `
      <div class="modal-stat"><div class="modal-stat-value">${d.completed}</div><div class="modal-stat-label">Total</div></div>
      <div class="modal-stat"><div class="modal-stat-value">2.3</div><div class="modal-stat-label">Avg Days</div></div>
      <div class="modal-stat"><div class="modal-stat-value">${(d.cost/d.completed).toFixed(0)}</div><div class="modal-stat-label">Avg Cost (AED)</div></div>
    `;
  } else if (type === 'sla') {
    stats.innerHTML = `
      <div class="modal-stat"><div class="modal-stat-value">${d.sla}%</div><div class="modal-stat-label">Compliance</div></div>
      <div class="modal-stat"><div class="modal-stat-value">90%</div><div class="modal-stat-label">Target</div></div>
      <div class="modal-stat"><div class="modal-stat-value">+${(d.sla-90).toFixed(1)}%</div><div class="modal-stat-label">vs Target</div></div>
    `;
  } else if (type === 'cost') {
    stats.innerHTML = `
      <div class="modal-stat"><div class="modal-stat-value">${(d.cost/1000).toFixed(0)}K</div><div class="modal-stat-label">Total (AED)</div></div>
      <div class="modal-stat"><div class="modal-stat-value">${(d.cost/d.completed).toFixed(0)}</div><div class="modal-stat-label">Per WO</div></div>
      <div class="modal-stat"><div class="modal-stat-value">▼ 8.7%</div><div class="modal-stat-label">vs Q1</div></div>
    `;
  } else {
    stats.innerHTML = `
      <div class="modal-stat"><div class="modal-stat-value">${d.pending}</div><div class="modal-stat-label">Pending</div></div>
      <div class="modal-stat"><div class="modal-stat-value">${d.overdue}</div><div class="modal-stat-label">Overdue</div></div>
      <div class="modal-stat"><div class="modal-stat-value">${(d.pending/d.completed*100).toFixed(1)}%</div><div class="modal-stat-label">Of Total</div></div>
    `;
  }

  document.getElementById('modalContent').innerHTML = `
    <table class="modal-table">
      <thead>
        <tr><th>WO ID</th><th>Site</th><th>Type</th><th>Status</th><th>Cost (AED)</th><th>Days</th></tr>
      </thead>
      <tbody>
        ${SAMPLE_WO.map(w => `
          <tr>
            <td><strong style="color:var(--accent-teal)">${w.id}</strong></td>
            <td>${w.site}</td>
            <td>${w.type}</td>
            <td><span class="status-badge status-${w.status}">${w.status.toUpperCase()}</span></td>
            <td>${w.cost.toLocaleString()}</td>
            <td>${w.days}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
}

/* ═══════════════════════════════════════════════════════════
   EXPORTS
   ═══════════════════════════════════════════════════════════ */
function exportToExcel() {
  const wb = XLSX.utils.book_new();
  const q = document.getElementById('quarterSelect').value;
  const r = document.getElementById('regionSelect').value;
  const d = DATA[q][r];

  const summary = [
    ['TFM68 — AWQAF Mosques Maintenance'],
    ['Quarter:', q, 'Region:', r],
    [''],
    ['KPI', 'Value'],
    ['Completed Work Orders', d.completed],
    ['Pending Work Orders', d.pending],
    ['Overdue Work Orders', d.overdue],
    ['SLA Compliance (%)', d.sla],
    ['Total Cost (AED)', d.cost]
  ];

  const ws = XLSX.utils.aoa_to_sheet(summary);
  XLSX.utils.book_append_sheet(wb, ws, 'Summary');

  const woSheet = XLSX.utils.json_to_sheet(SAMPLE_WO);
  XLSX.utils.book_append_sheet(wb, woSheet, 'Work Orders');

  XLSX.writeFile(wb, `TFM68_${q}_Report.xlsx`);
  showToast('✅ Excel exported successfully');
}

async function exportToPDF() {
  showToast('📄 Generating PDF...');
  const { jsPDF } = window.jspdf;
  const canvas = await html2canvas(document.querySelector('.container'), {
    backgroundColor: '#0a0e1a', scale: 2
  });
  const pdf = new jsPDF('l', 'mm', 'a4');
  const w = pdf.internal.pageSize.getWidth();
  const h = (canvas.height * w) / canvas.width;
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, w, h);
  pdf.save(`TFM68_Dashboard.pdf`);
  showToast('✅ PDF exported successfully');
}

function refreshData() {
  showToast('🔄 Refreshing data...');
  setTimeout(() => {
    updateDashboard();
    showToast('✅ Data refreshed');
  }, 500);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
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