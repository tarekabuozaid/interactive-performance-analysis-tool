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
