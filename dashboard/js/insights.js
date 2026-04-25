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
