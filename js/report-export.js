(function (global) {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function listOrNone(items) {
    if (!Array.isArray(items) || !items.length) return "<li>None</li>";
    return items.join("");
  }

  function exportReport(resultObj) {
    if (!resultObj) return false;
    const win = window.open("", "_blank");
    if (!win) return false;

    const scbkrRows = Object.entries(resultObj.scbkr || {}).map(([axis, score]) => `<li><strong>${axis}</strong>: ${escapeHtml(score)}</li>`);
    const triggeredRows = (resultObj.triggeredRules || []).map(
      (rule) => `<li><strong>${escapeHtml(rule.rule_id)}</strong> (${escapeHtml(rule.category)}): ${escapeHtml(rule.reason_zh)}</li>`
    );
    const guidanceRows = (resultObj.coreReasonsZh || []).map((reason) => `<li>${escapeHtml(reason)}</li>`);

    const html = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8" />
<title>Anti-Scam Semantic Firewall Report</title>
<style>
  body{font-family:system-ui,-apple-system,sans-serif;padding:24px;line-height:1.55;color:#111827}
  h1{margin:0 0 12px;font-size:22px}
  h2{margin:18px 0 8px;font-size:16px}
  .meta{background:#f3f4f6;padding:12px;border-radius:10px}
</style>
</head>
<body>
<h1>Anti-Scam Semantic Firewall Report</h1>
<div class="meta">
  <p><strong>Risk Level:</strong> ${escapeHtml(resultObj.riskLevel)}</p>
  <p><strong>Risk Score:</strong> ${escapeHtml(resultObj.riskScore)}</p>
</div>
<h2>Original Message</h2>
<p>${escapeHtml(resultObj.text || "")}</p>
<h2>SCBKR</h2>
<ul>${listOrNone(scbkrRows)}</ul>
<h2>Triggered Rules</h2>
<ul>${listOrNone(triggeredRows)}</ul>
<h2>Action Guidance</h2>
<ul>${listOrNone(guidanceRows)}</ul>
</body>
</html>`;

    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 300);
    return true;
  }

  global.ReportExport = { exportReport };
})(window);
