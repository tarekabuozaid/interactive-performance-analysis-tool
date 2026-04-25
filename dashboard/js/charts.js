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
