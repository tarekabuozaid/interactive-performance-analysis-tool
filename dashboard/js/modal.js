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
