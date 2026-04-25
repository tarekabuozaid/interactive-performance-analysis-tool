# Interactive Performance Analysis Tool

Quarterly Performance Dashboard for **TFM68 — AWQAF Mosques Maintenance (Al Dhafra Region)**.
Single-file HTML dashboards (no build required to view), with an optional Node-based generator that assembles the distributable file from modular sources.

## Variants

- [Quarterly_Dashboard.html](Quarterly_Dashboard.html) — original dark, glassmorphism dashboard.
- [Quarterly_Dashboard_Light.html](Quarterly_Dashboard_Light.html) — modern light-mode redesign (Inter font, soft shadows, English-only).

Open either file directly in a browser. Internet is required the first time to load CDN libraries.

## Tech

- **Vanilla** HTML / CSS / JavaScript (no framework).
- **Chart.js 4.4** for line, doughnut, bar, and radar charts.
- **SheetJS (xlsx) 0.18** for Excel export.
- **html2canvas 1.4** + **jsPDF 2.5** for PDF export.
- Google Fonts (Inter) for the light variant.

## Modular sources (for editing)

```
dashboard/
  css/dashboard.css        # full stylesheet of the dark variant
  body.fragment.html       # markup of <body>
  js/
    data.js                # DATA, COST_BREAKDOWN, SAMPLE_WO
    charts.js              # Chart.js setup and chart builders
    insights.js            # AI insight generator + renderer
    modal.js               # drill-down modal
    export.js              # Excel / PDF / toast / refresh
    main.js                # animateCounter, updateDashboard, init
  index.html               # dev page that loads css + js separately
scripts/
  build-dashboard.mjs      # generates Quarterly_Dashboard.html (single file)
  write-dev-index.mjs      # regenerates dashboard/index.html
  split-dashboard-js.mjs   # splits dashboard/_bundle.js back into js/*
```

## Usage

```bash
# Build the single-file distributable from dashboard/ sources
npm run build

# Regenerate the dev index only
npm run dev:index

# Build + dev index in one step
npm run sync
```

The light-mode variant ([Quarterly_Dashboard_Light.html](Quarterly_Dashboard_Light.html))
is currently maintained as a single self-contained file and is not produced by the build script.

## Features

- Quarterly / regional / view filters
- Animated KPI counters with sparklines
- AI-style insights panel (rule-based)
- Drill-down modal with sample work orders
- Excel and PDF export
- Light and dark themes (separate files)
