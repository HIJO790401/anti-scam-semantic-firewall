(function (global) {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function exportReport(resultObj) {
    if (!resultObj) return;
    const win = window.open("", "_blank", "noopener,noreferrer");
    if (!win) return;

    const evidences = (resultObj.reasons || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    const actions = (resultObj.actions || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    const scbkrEntries = Object.entries(resultObj.scbkr || {}).map(([k, v]) => `<li><strong>${k}</strong>: ${v ? "✅" : "⚠️"}</li>`).join("");

    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Anti-Scam Report</title>
      <style>body{font-family:system-ui;padding:24px;line-height:1.5;}h1{margin:0 0 12px;}h2{margin:18px 0 6px;}ul{margin-top:4px;}</style>
      </head><body>
      <h1>Anti-Scam Analysis Report</h1>
      <p><strong>Risk Level:</strong> ${escapeHtml(resultObj.risk)}</p>
      <h2>SCBKR</h2><ul>${scbkrEntries}</ul>
      <h2>Evidence</h2><ul>${evidences || "<li>None</li>"}</ul>
      <h2>Action Guidance</h2><ul>${actions || "<li>None</li>"}</ul>
      </body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 250);
  }

  global.ReportExport = { exportReport };
})(window);
