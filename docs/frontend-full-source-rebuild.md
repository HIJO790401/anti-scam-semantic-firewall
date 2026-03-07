# Frontend Full Source Rebuild

---

## FILE: index.html

```
<!DOCTYPE html>
<html lang="zh-Hant" data-mode="standard">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>反詐騙語意防火牆引擎 Anti-Scam Semantic Firewall Engine</title>
  <style>
    :root {
      --bg: #050816;
      --bg-elevated: #0b1020;
      --bg-elevated-soft: #10172a;
      --border-subtle: #1f2937;
      --accent: #f97316;
      --accent-soft: rgba(249, 115, 22, 0.16);
      --accent-strong: #f97316;
      --accent-green: #22c55e;
      --accent-red: #ef4444;
      --accent-amber: #facc15;
      --text-main: #e5e7eb;
      --text-soft: #9ca3af;
      --text-faint: #6b7280;
      --text-strong: #f9fafb;
      --chip-bg: rgba(15, 23, 42, 0.9);
      --radius-lg: 18px;
      --radius-sm: 999px;
      --shadow-soft: 0 18px 40px rgba(15, 23, 42, 0.85);
      --shadow-chip: 0 10px 25px rgba(15, 23, 42, 0.9);
      --shadow-strong: 0 0 40px rgba(249, 115, 22, 0.45);
      --transition-fast: 140ms ease-out;
      --transition-med: 190ms ease-out;
      --font-base: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
        "Segoe UI", sans-serif;
      --font-mono: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
        "Courier New", monospace;
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      background: radial-gradient(circle at top left, #111827 0, #020617 50%);
      color: var(--text-main);
      font-family: var(--font-base);
      -webkit-font-smoothing: antialiased;
    }

    body {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 16px;
    }

    .app-shell {
      width: 100%;
      max-width: 1120px;
      background: linear-gradient(140deg, #020617 0%, #020617 40%, #0b1120 100%);
      border-radius: 28px;
      border: 1px solid rgba(148, 163, 184, 0.25);
      box-shadow: var(--shadow-soft);
      padding: 20px 20px 24px;
    }

    @media (min-width: 960px) {
      .app-shell {
        padding: 24px 26px 28px;
      }
    }

    header.app-header {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 18px;
    }

    @media (min-width: 768px) {
      header.app-header {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
      }
    }

    .title-block {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .title-chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      background: var(--chip-bg);
      border: 1px solid rgba(148, 163, 184, 0.35);
      box-shadow: var(--shadow-chip);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--text-soft);
    }

    .chip-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-strong);
      box-shadow: 0 0 12px rgba(249, 115, 22, 0.9);
    }

    .chip-green {
      border-color: rgba(34, 197, 94, 0.5);
      color: #bbf7d0;
    }

    .chip-green .chip-dot {
      background: var(--accent-green);
      box-shadow: 0 0 12px rgba(34, 197, 94, 0.9);
    }

    h1.app-title {
      margin: 0;
      font-size: 18px;
      color: var(--text-strong);
      letter-spacing: 0.04em;
    }

    h1.app-title span.sub-en {
      font-weight: 400;
      color: var(--text-soft);
      font-size: 13px;
      letter-spacing: 0.06em;
    }

    .subtitle {
      font-size: 13px;
      color: var(--text-soft);
      max-width: 640px;
    }

    .subtitle strong {
      color: #e5e7eb;
    }

    .head-meta {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
      margin-top: 6px;
    }

    @media (min-width: 768px) {
      .head-meta {
        align-items: flex-end;
      }
    }

    .meta-line {
      font-size: 11px;
      color: var(--text-faint);
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: flex-start;
    }

    @media (min-width: 768px) {
      .meta-line {
        justify-content: flex-end;
      }
    }

    .meta-line span.label {
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #cbd5f5;
    }

    .small-link {
      color: #bfdbfe;
      text-decoration: none;
      border-bottom: 1px dotted rgba(191, 219, 254, 0.6);
      transition: color var(--transition-fast), border-color var(--transition-fast);
      font-size: 11px;
    }

    .small-link:hover {
      color: #e5e7eb;
      border-bottom-color: rgba(229, 231, 235, 0.85);
    }

    .mode-switch {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
      margin-top: 4px;
    }

    @media (min-width: 768px) {
      .mode-switch {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }

    .mode-tabs {
      display: inline-flex;
      padding: 4px;
      gap: 4px;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid rgba(148, 163, 184, 0.45);
      box-shadow: 0 14px 30px rgba(15, 23, 42, 0.9);
    }

    .mode-btn {
      border: none;
      background: transparent;
      padding: 6px 12px;
      border-radius: 999px;
      color: var(--text-soft);
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background var(--transition-fast),
        color var(--transition-fast), transform var(--transition-fast),
        box-shadow var(--transition-fast);
    }

    .mode-btn span.badge {
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.5);
    }

    .mode-btn[data-active="true"] {
      background: radial-gradient(circle at top left, #f97316 0, #ea580c 45%, #7c2d12 100%);
      color: #0b1020;
      transform: translateY(-1px);
      box-shadow: var(--shadow-strong);
    }

    .mode-btn[data-active="true"] span.badge {
      border-color: rgba(15, 23, 42, 0.7);
      background: rgba(15, 23, 42, 0.12);
      color: #f9fafb;
    }

    .mode-caption {
      font-size: 11px;
      color: var(--text-faint);
    }

    main.app-main {
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.5fr);
      gap: 14px;
    }

    @media (max-width: 900px) {
      main.app-main {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    .card {
      background: radial-gradient(circle at top left, #111827 0, #020617 55%);
      border-radius: var(--radius-lg);
      border: 1px solid rgba(55, 65, 81, 0.9);
      box-shadow: 0 18px 32px rgba(15, 23, 42, 0.9);
      padding: 14px 14px 16px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      gap: 8px;
    }

    .card-title {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #cbd5f5;
    }

    .card-title span.en {
      font-size: 11px;
      color: var(--text-faint);
    }

    .card-caption {
      font-size: 11px;
      color: var(--text-faint);
    }

    .textarea {
      width: 100%;
      min-height: 160px;
      resize: vertical;
      border-radius: 16px;
      border: 1px solid rgba(75, 85, 99, 0.9);
      padding: 11px 11px 28px;
      background: radial-gradient(circle at top left, #030712 0, #020617 60%);
      color: var(--text-main);
      font-family: var(--font-base);
      font-size: 13px;
      line-height: 1.5;
      outline: none;
      transition: border var(--transition-med), box-shadow var(--transition-med),
        background var(--transition-med);
    }

    .textarea::placeholder {
      color: var(--text-faint);
    }

    .textarea:focus {
      border-color: var(--accent-strong);
      box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.75),
        0 0 40px rgba(249, 115, 22, 0.38);
      background: radial-gradient(circle at top left, #020617 0, #020617 50%);
    }

    .input-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 6px;
      gap: 10px;
    }

    .char-counter {
      font-size: 11px;
      color: var(--text-faint);
      font-family: var(--font-mono);
    }

    .btn-row {
      display: inline-flex;
      gap: 8px;
    }

    .btn {
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.7);
      padding: 6px 14px;
      font-size: 12px;
      cursor: pointer;
      background: rgba(15, 23, 42, 0.95);
      color: var(--text-main);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background var(--transition-med), border var(--transition-med),
        transform var(--transition-fast), box-shadow var(--transition-fast),
        color var(--transition-fast);
      white-space: nowrap;
    }

    .btn span.en-label {
      font-size: 10px;
      color: var(--text-faint);
    }

    .btn-primary {
      background: radial-gradient(circle at top left, #f97316 0, #ea580c 50%, #7c2d12 100%);
      border-color: transparent;
      color: #0b1020;
      font-weight: 600;
      box-shadow: 0 12px 30px rgba(249, 115, 22, 0.65);
    }

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 16px 40px rgba(249, 115, 22, 0.7);
    }

    .btn-secondary:hover {
      background: rgba(30, 64, 175, 0.7);
      border-color: rgba(129, 140, 248, 0.95);
      box-shadow: 0 10px 28px rgba(30, 64, 175, 0.75);
    }

    .pill-label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 9px;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.86);
      border: 1px solid rgba(55, 65, 81, 0.95);
      font-size: 11px;
      color: var(--text-soft);
    }

    .pill-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent-strong);
      box-shadow: 0 0 12px rgba(249, 115, 22, 0.9);
    }

    .risk-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 999px;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      background: var(--accent-soft);
      border: 1px solid rgba(249, 115, 22, 0.65);
      color: #fed7aa;
    }

    .risk-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--accent-strong);
      box-shadow: 0 0 14px rgba(249, 115, 22, 0.95);
    }

    .risk-badge.safe {
      background: rgba(22, 163, 74, 0.16);
      border-color: rgba(34, 197, 94, 0.8);
      color: #bbf7d0;
    }

    .risk-badge.safe .risk-dot {
      background: var(--accent-green);
      box-shadow: 0 0 14px rgba(34, 197, 94, 0.95);
    }

    .risk-badge.risk {
      background: rgba(250, 204, 21, 0.14);
      border-color: rgba(250, 204, 21, 0.85);
      color: #fef9c3;
    }

    .risk-badge.risk .risk-dot {
      background: var(--accent-amber);
      box-shadow: 0 0 14px rgba(250, 204, 21, 0.95);
    }

    .risk-badge.fatal,
    .risk-badge.non-closable {
      background: rgba(248, 113, 113, 0.22);
      border-color: rgba(248, 113, 113, 0.9);
      color: #fee2e2;
    }

    .risk-badge.fatal .risk-dot,
    .risk-badge.non-closable .risk-dot {
      background: var(--accent-red);
      box-shadow: 0 0 14px rgba(239, 68, 68, 0.95);
    }

    .risk-main-line {
      margin-top: 10px;
      font-size: 13px;
      color: var(--text-strong);
    }

    .risk-sub-line {
      font-size: 11px;
      color: var(--text-soft);
      margin-top: 4px;
    }

    .pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }

    .pill-mini {
      padding: 3px 8px;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.9);
      border: 1px dashed rgba(75, 85, 99, 0.95);
      font-size: 11px;
      color: var(--text-faint);
    }

    .section-title {
      font-size: 12px;
      color: #e5e7eb;
      margin-bottom: 6px;
    }

    .section-subtitle {
      font-size: 11px;
      color: var(--text-faint);
      margin-bottom: 6px;
    }

    .kv-row {
      display: grid;
      grid-template-columns: 100px minmax(0, 1fr);
      gap: 4px 10px;
      font-size: 11px;
      margin-bottom: 2px;
    }

    .kv-key {
      color: var(--text-soft);
    }

    .kv-val {
      color: var(--text-main);
    }

    .tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border-radius: 999px;
      border: 1px solid rgba(75, 85, 99, 0.95);
      font-size: 11px;
      color: var(--text-soft);
    }

    .tag-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(148, 163, 184, 0.95);
    }

    .list {
      list-style: none;
      padding: 0;
      margin: 4px 0 0;
    }

    .list-item {
      position: relative;
      padding-left: 14px;
      font-size: 11px;
      color: var(--text-main);
      margin-bottom: 4px;
    }

    .list-item::before {
      content: "•";
      position: absolute;
      left: 3px;
      top: 0;
      color: var(--accent-strong);
    }

    .list-item span.badge {
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 999px;
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(75, 85, 99, 0.95);
      margin-left: 4px;
      color: var(--text-soft);
    }

    .scbkr-grid {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 4px;
      margin-top: 4px;
    }

    .scbkr-cell {
      padding: 6px 6px 7px;
      border-radius: 8px;
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid rgba(55, 65, 81, 0.95);
      font-size: 10px;
      display: flex;
      flex-direction: column;
      gap: 3px;
      min-height: 44px;
    }

    .scbkr-label {
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #9ca3af;
    }

    .scbkr-zh {
      font-size: 10px;
      color: var(--text-faint);
    }

    .scbkr-flag {
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 999px;
      align-self: flex-start;
    }

    .flag-ok {
      background: rgba(34, 197, 94, 0.18);
      color: #bbf7d0;
      border: 1px solid rgba(34, 197, 94, 0.8);
    }

    .flag-warn {
      background: rgba(250, 204, 21, 0.14);
      color: #fef9c3;
      border: 1px solid rgba(250, 204, 21, 0.85);
    }

    .flag-bad {
      background: rgba(248, 113, 113, 0.22);
      color: #fee2e2;
      border: 1px solid rgba(248, 113, 113, 0.9);
    }

    .scbkr-senior {
      display: none;
      margin-top: 6px;
      padding-top: 6px;
      border-top: 1px dashed rgba(55, 65, 81, 0.9);
      font-size: 12px;
    }

    .scbkr-senior ul {
      list-style: none;
      padding: 0;
      margin: 4px 0 0;
    }

    .scbkr-senior li {
      margin-bottom: 4px;
      padding-left: 10px;
      position: relative;
    }

    .scbkr-senior li::before {
      content: "▹";
      position: absolute;
      left: 0;
      color: var(--accent-strong);
      font-size: 11px;
    }

    .role-note {
      font-size: 11px;
      color: var(--text-soft);
      margin-top: 4px;
    }

    .role-note strong {
      color: #e5e7eb;
    }

    #proDebug {
      display: none;
      margin-top: 8px;
      padding-top: 6px;
      border-top: 1px dashed rgba(55, 65, 81, 0.9);
      font-size: 10px;
      color: var(--text-faint);
      font-family: var(--font-mono);
      white-space: pre-wrap;
      word-break: break-all;
    }

    .hint-senior-hero {
      display: none;
      font-size: 13px;
      color: #e5e7eb;
      margin-top: 4px;
      padding: 6px 10px;
      border-radius: 12px;
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid rgba(55, 65, 81, 0.95);
    }

    .hint-senior-hero strong {
      color: #fee2e2;
    }

    html[data-mode="senior"] body {
      font-size: 18px;
    }

    html[data-mode="senior"] .app-shell {
      border-width: 2px;
    }

    html[data-mode="senior"] .textarea {
      font-size: 15px;
      min-height: 190px;
    }

    html[data-mode="senior"] .btn {
      font-size: 14px;
      padding: 8px 18px;
    }

    html[data-mode="senior"] .btn span.en-label {
      display: none;
    }

    html[data-mode="senior"] .scbkr-grid {
      display: none;
    }

    html[data-mode="senior"] .scbkr-senior {
      display: block;
    }

    html[data-mode="senior"] .subtitle {
      font-size: 14px;
    }

    html[data-mode="senior"] .hint-senior-hero {
      display: block;
    }

    html[data-mode="senior"] .mode-caption {
      font-size: 12px;
    }

    html[data-mode="senior"] .risk-main-line {
      font-size: 14px;
    }

    html[data-mode="senior"] .risk-sub-line {
      font-size: 12px;
    }

    html[data-mode="senior"] .section-title {
      font-size: 13px;
    }

    html[data-mode="senior"] .section-subtitle,
    html[data-mode="senior"] .list-item {
      font-size: 12px;
    }

    html[data-mode="pro"] #proDebug {
      display: block;
    }

    @media (max-width: 600px) {
      .card {
        padding: 12px 10px 13px;
      }

      .scbkr-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  </style>
</head>
<body>
  <div class="app-shell">
    <header class="app-header">
      <div class="title-block">
        <div class="title-chip-row">
          <div class="chip chip-green">
            <span class="chip-dot"></span>
            <span>ANTI-SCAM SEMANTIC FIREWALL ENGINE</span>
          </div>
          <div class="chip">
            <span class="chip-dot"></span>
            <span>SCBKR · Ex(y)=π · LINGUISTIC GOVERNANCE</span>
          </div>
        </div>
        <h1 class="app-title">
          反詐騙語意防火牆引擎
          <span class="sub-en">Anti-Scam Semantic Firewall Engine</span>
        </h1>
        <div class="subtitle">
          以 <strong>SCBKR 五軸責任鏈</strong>＋<strong>語意風險分級</strong>＋<strong>Ex(y)=π
            角色治理</strong> 拆解每一則訊息的「誰在說、要你做什麼、風險在哪、出事誰扛」。
        </div>
        <div class="hint-senior-hero">
          <strong>看不懂就先不要照做。</strong> 如果你覺得這段訊息怪怪的，貼上來讓系統幫你看，然後再打電話給
          <strong>官方客服或家人</strong>，確認之後再決定要不要相信。
        </div>
      </div>
      <div class="head-meta">
        <div class="meta-line">
          <span class="label" data-i18n="lang.switch">語言</span>
          <select id="langSwitcher" style="background:#0f172a;color:#e5e7eb;border:1px solid #475569;border-radius:6px;padding:2px 6px;">
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </div>
        <div class="meta-line">
          <span class="label">AUTHOR</span>
          <span>沈耀 888π / Wen-Yao Hsu · Taichung, Taiwan</span>
        </div>
        <div class="meta-line">
          <span class="label">DEMO</span>
          <a class="small-link" href="https://hijo790401.github.io/anti-scam-semantic-firewall/" target="_blank"
            rel="noopener noreferrer">Live
            Demo</a>
          <span class="label">GITHUB</span>
          <a class="small-link" href="https://github.com/HIJO790401/anti-scam-semantic-firewall" target="_blank"
            rel="noopener noreferrer">Repository</a>
        </div>
      </div>
    </header>

    <section class="mode-switch" aria-label="模式切換 Mode Switch">
      <div class="mode-tabs">
        <button class="mode-btn" type="button" data-mode-btn data-mode="standard" aria-pressed="true">
          <span>標準版</span>
          <span class="badge">Standard</span>
        </button>
        <button class="mode-btn" type="button" data-mode-btn data-mode="pro" aria-pressed="false">
          <span>專業版</span>
          <span class="badge">Pro</span>
        </button>
        <button class="mode-btn" type="button" data-mode-btn data-mode="senior" aria-pressed="false">
          <span>長輩安心版</span>
          <span class="badge">Senior Safe</span>
        </button>
      </div>
      <div class="mode-caption" id="modeLabel">
        標準版 STANDARD – 一般使用者友善介面，中英文雙語提示。
      </div>
    </section>

    <main class="app-main">
      <section class="card" aria-label="可疑訊息輸入 Input">
        <div class="card-header">
          <div>
            <div class="card-title">
              可疑訊息輸入
              <span class="en">｜ Suspicious Message Input</span>
            </div>
            <div class="card-caption">
              把你收到的簡訊、Line、Email 或網頁文字貼在這裡。
            </div>
          </div>
          <div class="pill-label">
            <span class="pill-dot"></span>
            <span>Step 1｜貼上完整訊息 Paste full text</span>
          </div>
        </div>
        <textarea id="inputText" class="textarea" placeholder="例：『您的帳戶已被凍結，請在 10 分鐘內點選以下連結完成驗證，否則將永久停用。』"></textarea>
        <div id="exampleContainer"></div>
        <div class="input-footer">
          <div class="char-counter" id="charCounter">0 字 / chars</div>
          <div class="btn-row">
            <button class="btn btn-secondary" id="clearBtn" type="button">
              <span>清除內容</span>
              <span class="en-label">Clear</span>
            </button>
            <button class="btn btn-primary" id="analyzeBtn" type="button">
              <span>分析這則訊息</span>
              <span class="en-label">Analyze</span>
            </button>
            <button class="btn btn-secondary" id="exportBtn" type="button" style="display:none;">
              <span data-i18n="btn.export">匯出報告</span>
            </button>
          </div>
        </div>
        <div class="btn-row" id="seniorVoiceRow" style="display:none;margin-top:10px;">
          <button class="btn btn-secondary" id="speakBtn" type="button" data-i18n="btn.speak">朗讀風險結果</button>
          <button class="btn btn-secondary" id="stopSpeakBtn" type="button" data-i18n="btn.stopSpeak">停止朗讀</button>
        </div>
      </section>

      <section class="card" aria-label="分析結果 Output">
        <div class="card-header">
          <div>
            <div class="card-title">
              風險等級與總結
              <span class="en">｜ Risk Level & Summary</span>
            </div>
            <div class="card-caption">
              這不是「感覺怪怪的」，而是可被說清楚的語意結構。
            </div>
          </div>
          <div id="riskBadge" class="risk-badge">
            <span class="risk-dot"></span>
            <span id="riskLabel">未分析｜Not analyzed</span>
          </div>
        </div>

        <div class="risk-main-line" id="riskMainLine">
          請先貼上訊息，並點選「分析這則訊息」。
        </div>
        <div class="risk-sub-line" id="riskSubLine">
          系統會依照語意特徵與責任鏈結構，給出 SAFE / RISK / FATAL / NON-CLOSABLE 分級。
        </div>

        <div class="pill-row">
          <div class="pill-mini">SAFE：正常或可安心觀察</div>
          <div class="pill-mini">RISK：需要提高警覺，建議改走官方管道</div>
          <div class="pill-mini">FATAL：高風險，請立刻停止並改用官方管道</div>
          <div class="pill-mini">NON-CLOSABLE：主體與責任不清楚，暫停所有高風險操作</div>
        </div>

        <div style="margin-top: 10px;">
          <div class="section-title">
            SCBKR 責任鏈拆解｜Responsibility Chain
          </div>
          <div class="section-subtitle">
            S 主體 / C 理由 / B 邊界 / K 成本 / R 責任 ｜任何一軸講不清楚，這則訊息就不是單純「怪」，而是責任鏈斷裂。
          </div>

          <div class="scbkr-grid scbkr-detailed">
            <div class="scbkr-cell" id="cellS">
              <div class="scbkr-label">S</div>
              <div class="scbkr-zh">Subject｜誰在說話</div>
              <span class="scbkr-flag flag-warn" id="flagS">未知 / Unknown</span>
            </div>
            <div class="scbkr-cell" id="cellC">
              <div class="scbkr-label">C</div>
              <div class="scbkr-zh">Cause｜為何聯絡</div>
              <span class="scbkr-flag flag-warn" id="flagC">模糊 / Vague</span>
            </div>
            <div class="scbkr-cell" id="cellB">
              <div class="scbkr-label">B</div>
              <div class="scbkr-zh">Boundary｜要做到哪裡</div>
              <span class="scbkr-flag flag-warn" id="flagB">不明 / Unclear</span>
            </div>
            <div class="scbkr-cell" id="cellK">
              <div class="scbkr-label">K</div>
              <div class="scbkr-zh">Cost｜錯信代價</div>
              <span class="scbkr-flag flag-warn" id="flagK">潛在風險 / Risk</span>
            </div>
            <div class="scbkr-cell" id="cellR">
              <div class="scbkr-label">R</div>
              <div class="scbkr-zh">Responsibility｜出事誰扛</div>
              <span class="scbkr-flag flag-bad" id="flagR">無責任說明</span>
            </div>
          </div>

          <div class="scbkr-senior" id="scbkrSenior">
            <p>簡單講，這則訊息有沒有說清楚：</p>
            <ul id="scbkrSeniorList">
              <li>誰在跟你說話（是不是你熟悉的官方單位）。</li>
              <li>為什麼要你做這件事。</li>
              <li>要你做到哪一個步驟（例如：轉多少錢、點哪個連結）。</li>
              <li>如果是假的，你會損失什麼。</li>
              <li>如果出事，誰會負責。</li>
            </ul>
          </div>
        </div>

        <div style="margin-top: 10px;">
          <div class="section-title">可疑語意特徵｜Evidence Patterns</div>
          <div class="section-subtitle">
            為什麼系統覺得這段話危險，用簡單條列列給你看。
          </div>
          <ul class="list" id="evidenceList">
            <li class="list-item">
              尚未分析。貼上訊息並點選「分析」後，這裡會顯示詐騙常見的語言套路。
            </li>
          </ul>
        </div>

        <div style="margin-top: 10px;">
          <div class="section-title">行動建議｜Action Guidance</div>
          <div class="section-subtitle">
            不只說「小心」，而是告訴你下一步該怎麼做。
          </div>
          <ul class="list" id="actionList">
            <li class="list-item">
              目前沒有建議。分析後，這裡會告訴你：要不要立刻停止、要不要改走官方管道、需不需要請家人幫忙。
            </li>
          </ul>
        </div>

        <div style="margin-top: 10px;">
          <div class="section-title">角色治理｜Role Governance Ex(y)=π</div>
          <div class="role-note" id="roleNote">
            在這個 Demo 裡，<strong>AI / 模型永遠只是輔助工具層</strong>，真正做決定的人是
            <strong>你自己 + 官方管道（銀行 App / 官方網站 / 卡背電話 / 警政單位）</strong>。<br />
            This engine is a <strong>tool layer</strong>, not a final judge. Final decisions should be made via
            <strong>official channels and human review</strong>.
          </div>
          <div id="proDebug"></div>
        </div>
      </section>
    </main>
  </div>

  <script src="js/i18n.js"></script>
  <script src="js/scbkr-engine.js"></script>
  <script src="js/examples-loader.js"></script>
  <script src="js/voice.js"></script>
  <script src="js/report-export.js"></script>
  <script>
    (async function () {
      const htmlEl = document.documentElement;
      const inputEl = document.getElementById("inputText");
      const charCounter = document.getElementById("charCounter");
      const clearBtn = document.getElementById("clearBtn");
      const analyzeBtn = document.getElementById("analyzeBtn");
      const exportBtn = document.getElementById("exportBtn");
      const speakBtn = document.getElementById("speakBtn");
      const stopSpeakBtn = document.getElementById("stopSpeakBtn");
      const seniorVoiceRow = document.getElementById("seniorVoiceRow");
      const langSwitcher = document.getElementById("langSwitcher");
      const modeButtons = document.querySelectorAll("[data-mode-btn]");
      const modeLabel = document.getElementById("modeLabel");

      const riskBadge = document.getElementById("riskBadge");
      const riskLabel = document.getElementById("riskLabel");
      const riskMainLine = document.getElementById("riskMainLine");
      const riskSubLine = document.getElementById("riskSubLine");

      const flagS = document.getElementById("flagS");
      const flagC = document.getElementById("flagC");
      const flagB = document.getElementById("flagB");
      const flagK = document.getElementById("flagK");
      const flagR = document.getElementById("flagR");

      const scbkrSeniorList = document.getElementById("scbkrSeniorList");
      const evidenceList = document.getElementById("evidenceList");
      const actionList = document.getElementById("actionList");
      const roleNote = document.getElementById("roleNote");
      const proDebug = document.getElementById("proDebug");

      let currentMode = "standard";
      let lastResult = null;

      function actionGuidanceByRisk(risk) {
        if (risk === "SAFE") return [
          "如果你完全看得懂內容，且確認是你主動申請的服務，可以依照正常流程進行。",
          "若你「看不懂」「沒印象申請」或心裡覺得怪，請改用官方 App 或卡片背面電話再次確認。",
        ];
        if (risk === "RISK") return [
          "暫停所有操作，不要在這個訊息裡點任何連結或輸入資料。",
          "請自行輸入銀行官方網址，或開啟已安裝的官方 App 重新登入確認。",
          "如果你是長輩或覺得不放心，請先把訊息給家人看，一起判斷。",
        ];
        if (risk === "FATAL") return [
          "立刻停止轉帳、不要提供任何密碼／驗證碼。",
          "關閉這個訊息中的所有連結與視窗，改由官方 App 或卡片背面電話聯繫銀行。",
          "如果你已經轉出款項或提供資料，請儘快撥打 165 反詐騙專線或報警。",
        ];
        return [
          "在你確認對方真實身分之前，不要轉帳、不點連結、不提供任何驗證碼。",
          "直接撥打官方客服專線或 165 反詐騙專線，轉述整段訊息請對方協助判斷。",
        ];
      }

      function setMode(mode) {
        currentMode = mode;
        htmlEl.setAttribute("data-mode", mode);
        modeButtons.forEach((btn) => {
          const active = btn.getAttribute("data-mode") === mode;
          btn.setAttribute("data-active", active ? "true" : "false");
          btn.setAttribute("aria-pressed", active ? "true" : "false");
        });
        exportBtn.style.display = mode === "pro" ? "inline-flex" : "none";
        seniorVoiceRow.style.display = mode === "senior" ? "inline-flex" : "none";

        if (mode === "pro") {
          modeLabel.textContent = "專業版 PRO – 顯示完整 SCBKR 責任鏈、風險線索與原始規則匹配資訊，方便風控與治理團隊檢閱。";
        } else if (mode === "senior") {
          modeLabel.textContent = "長輩安心版 SENIOR SAFE – 大字體、中文為主，用簡單句子提醒「看不懂就不要做，先問家人或官方」。";
        } else {
          modeLabel.textContent = "標準版 STANDARD – 一般使用者友善介面，中英文雙語提示。";
        }
      }

      function updateCharCounter() {
        charCounter.textContent = `${inputEl.value.length} 字 / chars`;
      }

      function setFlag(el, ok, okText, failText) {
        el.className = `scbkr-flag ${ok ? "flag-ok" : "flag-bad"}`;
        el.textContent = ok ? okText : failText;
      }

      function renderResult(result) {
        riskBadge.classList.remove("safe", "risk", "fatal", "non-closable");
        riskBadge.classList.add(result.riskDisplay.badgeClass);
        riskLabel.textContent = result.riskDisplay.label;
        riskMainLine.textContent = result.riskDisplay.main;
        riskSubLine.textContent = result.riskDisplay.sub;

        setFlag(flagS, result.scbkr.S, "有主體描述", "主體不清 / 可能偽裝官方");
        setFlag(flagC, result.scbkr.C, "有說明聯絡原因", "聯絡原因模糊 / 未交代");
        setFlag(flagB, result.scbkr.B, "有具體行動要求", "沒有說清楚要做到哪一步");
        setFlag(flagK, result.scbkr.K, "提到風險／代價", "未說明錯信可能造成的損失");
        setFlag(flagR, result.scbkr.R, "有留下責任／客服資訊", "沒有說明出事誰負責");

        scbkrSeniorList.innerHTML = `
          <li>${result.scbkr.S ? "主體有提到官方或機構名稱。" : "主體沒有清楚自我介紹或來源可疑。"}</li>
          <li>${result.scbkr.C ? "有稍微解釋聯絡原因。" : "沒有說明為什麼要聯絡你。"}</li>
          <li>${result.scbkr.B ? "有具體請你做什麼（點連結／轉帳／提供資訊）。" : "行動要求不明或藏在話術裡。"}</li>
          <li>${result.scbkr.K ? "有提到凍結、損失或罰款等代價。" : "沒有講如果是假的你會損失什麼。"}</li>
          <li>${result.scbkr.R ? "有留下客服或聯繫管道，但仍需確認是否為真正官方。" : "完全沒說出事誰負責，只要你照著做就可能自己全扛。"}</li>`;

        evidenceList.innerHTML = "";
        (result.reasons.length ? result.reasons : ["目前未偵測到明顯詐騙語意特徵，但仍建議你養成『看不懂就先暫停』的習慣。"]).forEach((text) => {
          const li = document.createElement("li");
          li.className = "list-item";
          li.textContent = text;
          evidenceList.appendChild(li);
        });

        const actions = actionGuidanceByRisk(result.risk);
        result.actions = actions;
        actionList.innerHTML = "";
        actions.forEach((text) => {
          const li = document.createElement("li");
          li.className = "list-item";
          li.textContent = text;
          actionList.appendChild(li);
        });

        roleNote.innerHTML = '在這個 Demo 裡，<strong>AI / 模型永遠只是輔助工具層</strong>，真正做決定的人是 <strong>你自己 + 官方管道</strong>。<br />This engine helps you see the <strong>semantic risk structure</strong>, but <strong>final decisions</strong> must go through <strong>official apps, websites, call centers and human review</strong>.';

        proDebug.textContent = currentMode === "pro" ? "DEBUG (規則匹配結果 / Rule Matches):\n" + JSON.stringify({ risk: result.risk, ...result.debug, scbkr: result.scbkr }, null, 2) : "";
      }

      function resetOutputs() {
        riskBadge.classList.remove("safe", "risk", "fatal", "non-closable");
        riskLabel.textContent = "未分析｜Not analyzed";
        riskMainLine.textContent = "請先貼上訊息，並點選「分析這則訊息」。";
        riskSubLine.textContent = "系統會依照語意特徵與責任鏈結構，給出 SAFE / RISK / FATAL / NON-CLOSABLE 分級。";
        [flagS, flagC, flagB, flagK].forEach((f, i) => {
          f.className = "scbkr-flag flag-warn";
          f.textContent = ["未知 / Unknown", "模糊 / Vague", "不明 / Unclear", "潛在風險 / Risk"][i];
        });
        flagR.className = "scbkr-flag flag-bad";
        flagR.textContent = "無責任說明";
      }

      modeButtons.forEach((btn) => btn.addEventListener("click", () => setMode(btn.getAttribute("data-mode"))));
      inputEl.addEventListener("input", updateCharCounter);
      clearBtn.addEventListener("click", () => {
        inputEl.value = "";
        updateCharCounter();
        resetOutputs();
        lastResult = null;
      });
      analyzeBtn.addEventListener("click", () => {
        lastResult = SCBKREngine.analyzeMessage(inputEl.value);
        renderResult(lastResult);
      });
      exportBtn.addEventListener("click", () => {
        if (!lastResult) return alert(AppI18n.t("msg.noAnalysis"));
        ReportExport.exportReport(lastResult);
      });
      speakBtn.addEventListener("click", () => {
        if (!lastResult) return alert(AppI18n.t("msg.noAnalysis"));
        if (!VoiceModule.speakRiskResult(lastResult, AppI18n.getCurrentLang() === "en" ? "en-US" : "zh-TW")) {
          alert(AppI18n.t("msg.noSpeech"));
        }
      });
      stopSpeakBtn.addEventListener("click", () => VoiceModule.stopSpeaking());

      await AppI18n.init("zh");
      const loader = await ExamplesLoader.init({
        containerId: "exampleContainer",
        inputId: "inputText",
        getLang: () => AppI18n.getCurrentLang(),
        t: AppI18n.t,
      });
      AppI18n.onChange(() => loader && loader.rerender());
      langSwitcher.addEventListener("change", async (e) => {
        await AppI18n.setLanguage(e.target.value);
      });

      setMode("standard");
      resetOutputs();
      updateCharCounter();
    })();
  </script>
</body>
</html>
```

---

## FILE: js/scbkr-engine.js

```
(function (global) {
  const urgentKw = ["立即", "馬上", "立刻", "緊急", "限時", "最後通知", "within", "urgent", "asap", "24小時", "10分鐘", "幾分鐘內"];
  const moneyKw = ["轉帳", "匯款", "款項", "金額", "帳戶", "收款", "付款", "繳費", "投資", "獲利", "保證獲利", "驗證碼", "one-time password", "otp", "銀行卡", "信用卡"];
  const appKw = ["下載 app", "安裝 app", "安裝應用程式", "遠端協助", "teamviewer"];
  const linkKw = ["http://", "https://", "網址", "link", "點選連結", "點擊連結"];
  const officialKw = ["銀行", "郵局", "警察局", "法院", "檢察署", "國稅局", "官方", "客服"];
  const askSecretKw = ["密碼", "驗證碼", "簡訊碼", "簡訊認證", "卡號", "背面三碼", "cvv"];
  const threatKw = ["凍結", "停用", "停權", "鎖定", "罰款", "罰金", "沒收", "追討"];

  function hitAny(text, arr) {
    return arr.some((kw) => text.includes(kw.toLowerCase()));
  }

  function calculateRisk(scbkrFlags, patterns) {
    const flagCount = Object.values(scbkrFlags).filter(Boolean).length;
    if ((patterns.hasMoney || patterns.asksSecret) && (patterns.hasLink || patterns.hasApp) && patterns.hasUrgent) {
      return "FATAL";
    }
    if (patterns.hasAnyScamPattern && flagCount <= 2) {
      return "NON-CLOSABLE";
    }
    if (patterns.hasAnyScamPattern) {
      return "RISK";
    }
    return "SAFE";
  }

  function analyzeMessage(inputText) {
    const text = String(inputText || "").toLowerCase();

    const hasUrgent = hitAny(text, urgentKw);
    const hasMoney = hitAny(text, moneyKw);
    const hasApp = hitAny(text, appKw);
    const hasLink = hitAny(text, linkKw);
    const hasOfficial = hitAny(text, officialKw);
    const asksSecret = hitAny(text, askSecretKw);
    const hasThreat = hitAny(text, threatKw);

    const hasAnyScamPattern = hasMoney || hasApp || hasLink || asksSecret || hasThreat;

    const hasReason = text.includes("因為") || text.includes("由於") || text.includes("通知") || text.includes("告知") || text.includes("提醒");
    const hasBoundary = text.includes("請在") || text.includes("請於") || text.includes("請點選") || text.includes("請點擊") || text.includes("請完成") || text.includes("請輸入") || text.includes("請提供");
    const mentionsCost = hasThreat || text.includes("損失") || text.includes("風險") || text.includes("金額") || text.includes("款項");
    const mentionsResp = text.includes("客服") || text.includes("服務專員") || text.includes("專線") || text.includes("如有疑問") || text.includes("如有任何問題");

    const scbkr = {
      S: hasOfficial,
      C: hasReason,
      B: hasBoundary,
      K: mentionsCost,
      R: mentionsResp,
    };

    const reasons = [];
    if (hasMoney) reasons.push("訊息內容涉及轉帳／匯款／帳戶等金流行為。");
    if (hasUrgent) reasons.push("使用「立即」「限時」「幾分鐘內」等急迫語氣。");
    if (hasLink) reasons.push("包含連結或要求你點選網址，可能導向偽造網站。");
    if (hasApp) reasons.push("要求下載或安裝 App，可能導致裝置被遠端控制。");
    if (asksSecret) reasons.push("要求提供密碼／驗證碼或卡片資訊，這在正常流程中極少見。");
    if (!scbkr.S) reasons.push("沒有清楚可驗證的主體（例如：官方銀行 App 名稱）。");
    if (!scbkr.R) reasons.push("沒有說明一旦出事誰負責，責任鏈幾乎是空的。");

    const risk = calculateRisk(scbkr, {
      hasUrgent,
      hasMoney,
      hasApp,
      hasLink,
      asksSecret,
      hasThreat,
      hasAnyScamPattern,
    });

    const riskDisplay = {
      SAFE: {
        label: "SAFE｜目前未偵測到明顯詐騙語意",
        main: "這則訊息目前看起來比較像一般通知，不包含明顯詐騙關鍵語意。",
        sub: "即便是 SAFE，若你本人「看不懂內容」或覺得不安，仍建議優先改走官方管道確認。",
        badgeClass: "safe",
      },
      RISK: {
        label: "RISK｜中度風險，建議提高警覺",
        main: "這則訊息包含多個可疑語意特徵，建議不要直接依照指示操作，優先改走官方管道。",
        sub: "請不要在這則訊息中點連結或輸入任何密碼／驗證碼，改由銀行 App、官方網站或卡片背面電話重新確認。",
        badgeClass: "risk",
      },
      FATAL: {
        label: "FATAL｜高度風險，建議立刻停止",
        main: "這則訊息同時具備「急迫感＋金流操作＋非官方管道」等強烈詐騙特徵，非常危險。",
        sub: "請立刻停止所有轉帳與輸入資料的動作，不要點任何連結，直接聯繫官方客服或警政機關。",
        badgeClass: "fatal",
      },
      "NON-CLOSABLE": {
        label: "NON-CLOSABLE｜主體與責任不清，暫停所有高風險操作",
        main: "這則訊息沒有說清楚誰在跟你說話、為什麼、出事誰負責，責任鏈幾乎是斷裂的。",
        sub: "在你確認對方真實身分與官方管道之前，請不要轉帳、不提供密碼或任何驗證碼。",
        badgeClass: "non-closable",
      },
    };

    return {
      inputText,
      risk,
      reasons,
      scbkr,
      debug: { hasUrgent, hasMoney, hasApp, hasLink, asksSecret, hasThreat, hasAnyScamPattern },
      riskDisplay: riskDisplay[risk],
    };
  }

  global.SCBKREngine = { analyzeMessage, calculateRisk };
})(window);
```

---

## FILE: js/report-export.js

```
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
```

---

## FILE: js/i18n.js

```
(function (global) {
  let currentLang = "zh";
  const bundles = {};
  const listeners = [];

  async function loadLang(lang) {
    if (!bundles[lang]) {
      const res = await fetch(`i18n/${lang}.json`);
      bundles[lang] = await res.json();
    }
    return bundles[lang];
  }

  function t(key) {
    return (bundles[currentLang] && bundles[currentLang][key]) || key;
  }

  function applyI18nToDom() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
  }

  async function setLanguage(lang) {
    currentLang = lang;
    await loadLang(lang);
    applyI18nToDom();
    listeners.forEach((cb) => cb(lang));
  }

  function onChange(cb) {
    listeners.push(cb);
  }

  async function init(defaultLang) {
    await loadLang(defaultLang || currentLang);
    currentLang = defaultLang || currentLang;
    applyI18nToDom();
  }

  global.AppI18n = { init, setLanguage, t, onChange, getCurrentLang: () => currentLang };
})(window);
```

---

## FILE: js/examples-loader.js

```
(function (global) {
  let examples = [];

  async function init(options) {
    const { containerId, inputId, getLang, t } = options;
    const container = document.getElementById(containerId);
    const inputEl = document.getElementById(inputId);
    if (!container || !inputEl) return;

    const res = await fetch("data/examples.json");
    examples = await res.json();

    const label = document.createElement("label");
    label.setAttribute("for", "exampleSelect");
    label.className = "card-caption";
    label.style.display = "block";
    label.style.marginTop = "10px";
    label.setAttribute("data-example-label", "1");

    const select = document.createElement("select");
    select.id = "exampleSelect";
    select.className = "textarea";
    select.style.minHeight = "unset";
    select.style.height = "40px";
    select.style.padding = "8px 10px";

    container.appendChild(label);
    container.appendChild(select);

    function renderSelect() {
      const lang = getLang();
      label.textContent = t("examples.label");
      select.innerHTML = "";
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = t("examples.placeholder");
      select.appendChild(placeholder);

      examples.forEach((example) => {
        const opt = document.createElement("option");
        opt.value = example.id;
        opt.textContent = lang === "en" ? example.label_en : example.label_zh;
        select.appendChild(opt);
      });
    }

    select.addEventListener("change", () => {
      const selected = examples.find((example) => example.id === select.value);
      if (!selected) return;
      const lang = getLang();
      inputEl.value = lang === "en" ? selected.text_en : selected.text_zh;
      inputEl.dispatchEvent(new Event("input"));
    });

    renderSelect();
    return { rerender: renderSelect };
  }

  global.ExamplesLoader = { init };
})(window);
```

---

## FILE: js/voice.js

```
(function (global) {
  function isSupported() {
    return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  }

  function stopSpeaking() {
    if (isSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  function speakRiskResult(resultObj, lang) {
    if (!isSupported() || !resultObj) return false;
    stopSpeaking();
    const advice = (resultObj.actions || []).slice(0, 3).join("。") || "請改用官方管道再次確認";
    const text = `風險等級：${resultObj.risk}。重點建議：${advice}。`;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang || "zh-TW";
    utter.rate = 0.95;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
    return true;
  }

  global.VoiceModule = { speakRiskResult, stopSpeaking, isSupported };
})(window);
```

---

## FILE: i18n/zh.json

```
{
  "lang.current": "中文",
  "lang.switch": "語言",
  "examples.label": "快速載入範例",
  "examples.placeholder": "請選擇範例訊息",
  "btn.export": "匯出報告",
  "btn.speak": "朗讀風險結果",
  "btn.stopSpeak": "停止朗讀",
  "msg.noAnalysis": "請先完成分析，再使用這個功能。",
  "msg.noSpeech": "目前瀏覽器不支援語音朗讀。"
}
```

---

## FILE: i18n/en.json

```
{
  "lang.current": "English",
  "lang.switch": "Language",
  "examples.label": "Quick Examples",
  "examples.placeholder": "Choose an example message",
  "btn.export": "Export Report",
  "btn.speak": "Read Risk Result",
  "btn.stopSpeak": "Stop Reading",
  "msg.noAnalysis": "Please run analysis first.",
  "msg.noSpeech": "Speech synthesis is not supported in this browser."
}
```

---

## FILE: data/examples.json

```
[
  {
    "id": "fake-bank-freeze",
    "category": "bank",
    "label_zh": "假銀行：帳戶凍結通知",
    "label_en": "Fake bank: account frozen notice",
    "text_zh": "【銀行通知】您的帳戶異常，將於10分鐘內凍結，請立即點選 https://safe-bank-check.com 完成驗證。",
    "text_en": "[Bank Alert] Your account is abnormal and will be frozen in 10 minutes. Click https://safe-bank-check.com now to verify."
  },
  {
    "id": "fake-investment-guaranteed",
    "category": "investment",
    "label_zh": "假投資：保證獲利群組",
    "label_en": "Fake investment: guaranteed profit group",
    "text_zh": "加入老師投資群，保證每週獲利20%，今天最後一天，先匯款5萬元啟用VIP帳戶。",
    "text_en": "Join our VIP investment group for guaranteed 20% weekly return. Last day today, transfer USD 1,500 to activate."
  },
  {
    "id": "fake-relative-money",
    "category": "friend",
    "label_zh": "假親友：急借錢",
    "label_en": "Fake family/friend urgent loan",
    "text_zh": "我是你表哥，手機壞掉用新號碼，現在急用錢，先轉3萬到這個帳戶，晚點再跟你說。",
    "text_en": "Hey, this is your cousin from a new number. I need money urgently, please transfer 900 now and I will explain later."
  },
  {
    "id": "fake-customs-package",
    "category": "customs",
    "label_zh": "假關務局：包裹卡關",
    "label_en": "Fake customs: parcel held",
    "text_zh": "關務局通知：您的國際包裹因資料不符被扣留，請立即繳交保證金並提供身分證與卡號完成通關。",
    "text_en": "Customs notice: your parcel is held due to mismatched documents. Pay a deposit and provide ID/card details now to clear it."
  },
  {
    "id": "phishing-login-link",
    "category": "phishing",
    "label_zh": "釣魚網站：登入驗證",
    "label_en": "Phishing site: login verification",
    "text_zh": "您的信箱即將停用，請於24小時內登入下列網址更新密碼：http://mail-security-check.net",
    "text_en": "Your mailbox will be deactivated. Sign in within 24 hours at http://mail-security-check.net to update your password."
  },
  {
    "id": "fake-government-fine",
    "category": "government",
    "label_zh": "假政府：違規罰款",
    "label_en": "Fake authority: violation fine",
    "text_zh": "您有未繳交通罰單，若今日未付款將移送法辦，請點連結輸入信用卡資料完成繳納。",
    "text_en": "You have an unpaid traffic fine. If not paid today, legal action will begin. Open the link and enter your credit card details now."
  }
]
```
