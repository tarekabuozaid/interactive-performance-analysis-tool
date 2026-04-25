import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "dashboard");
const head = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quarterly Performance Dashboard (dev) | TFM68</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<link rel="stylesheet" href="css/dashboard.css" />
</head>
<body>
`;
const tail = `
<script src="js/data.js"></script>
<script src="js/charts.js"></script>
<script src="js/insights.js"></script>
<script src="js/modal.js"></script>
<script src="js/export.js"></script>
<script src="js/main.js"></script>
</body>
</html>
`;
const body = fs.readFileSync(path.join(root, "body.fragment.html"), "utf8");
fs.writeFileSync(path.join(root, "index.html"), head + body + tail, "utf8");
