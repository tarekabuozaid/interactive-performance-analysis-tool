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
