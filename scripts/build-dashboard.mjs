import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "dashboard");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");

const head = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quarterly Performance Dashboard | TFM68</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<style>
${read("css/dashboard.css")}
</style>
</head>
<body>
${read("body.fragment.html")}
<script>
${["js/data.js", "js/charts.js", "js/insights.js", "js/modal.js", "js/export.js", "js/main.js"].map(read).join("\n")}
</script>
</body>
</html>
`;

const out = path.join(__dirname, "..", "Quarterly_Dashboard.html");
fs.writeFileSync(out, head, "utf8");
console.log("build-dashboard: wrote", out);
try {
  execFileSync(process.execPath, [path.join(__dirname, "write-dev-index.mjs")], { stdio: "inherit" });
} catch (e) {
  console.warn("write-dev-index:", e.message);
}
