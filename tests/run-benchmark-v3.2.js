(async function () {
  const summary = document.getElementById("summary");
  const rows = document.getElementById("rows");

  await SCBKREngine.loadRules();
  const response = await fetch("benchmark-v3.2-cases.json", { cache: "no-cache" });
  const cases = await response.json();

  let passCount = 0;
  cases.forEach((item) => {
    const result = SCBKREngine.analyzeMessage(item.text);
    const pass = result.riskLevel === item.expectedRiskLevel;
    if (pass) passCount += 1;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.expectedRiskLevel}</td>
      <td>${result.riskLevel}</td>
      <td class="${pass ? "pass" : "fail"}">${pass ? "PASS" : "FAIL"}</td>
    `;
    rows.appendChild(tr);
  });

  summary.textContent = `Pass ${passCount}/${cases.length} (${((passCount / cases.length) * 100).toFixed(1)}%)`;
})();
