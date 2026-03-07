# Anti-Scam Semantic Firewall Engine — Hackathon Formal Package

## 0) Scope
本文件依據目前前端 Demo 實作，提供可提交黑客松的正式版本整理：
1. 模組化結構
2. 風險規則
3. SCBKR 解析
4. 語意證據
5. JSON 輸出 API 化
6. UI 結構
7. 改善建議

---

## 1) 模組化結構

### 1.1 檔案樹
```txt
/
├── index.html                # 單頁 UI（HTML/CSS/啟動腳本）
├── js/
│   ├── scbkr-engine.js       # 核心規則引擎（SCBKR + Risk + Evidence）
│   ├── report-export.js      # 報告匯出（列印視窗）
│   ├── i18n.js               # 多語系載入與切換
│   ├── examples-loader.js    # 範例資料載入
│   └── voice.js              # 語音朗讀（長輩版）
├── i18n/
│   ├── zh.json               # 中文詞條
│   └── en.json               # 英文詞條
└── data/
    └── examples.json         # 測試訊息範例
```

### 1.2 執行流
```txt
Input Text
  -> SCBKREngine.analyzeMessage()
     -> keyword parser
     -> SCBKR flags (S/C/B/K/R)
     -> risk calculate (SAFE/RISK/FATAL/NON-CLOSABLE)
     -> reasons (Evidence)
  -> renderResult()
     -> Risk badge/main/sub
     -> SCBKR flags
     -> Evidence list
     -> Action Guidance list
     -> Pro debug JSON
```

---

## 2) 風險規則（Risk Rules）

### 2.1 等級定義
- SAFE：未偵測到明顯詐騙語意
- RISK：有詐騙語意線索
- FATAL：急迫 + 金流/機敏 + 連結/安裝行為同時命中
- NON-CLOSABLE：有詐騙線索且 SCBKR 關鍵欄位不足，責任鏈不可閉合

### 2.2 規則實作（摘要）
```js
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
```

---

## 3) SCBKR 解析

### 3.1 欄位定義
- S (Subject)：是否有可辨識主體（如官方機構）
- C (Cause)：是否有聯絡原因
- B (Boundary)：是否有明確行動邊界（要求你做什麼）
- K (Cost)：是否有成本/損失描述
- R (Responsibility)：是否有責任歸屬或客服承接

### 3.2 解析規則（摘要）
```js
const scbkr = {
  S: hasOfficial,
  C: hasReason,
  B: hasBoundary,
  K: mentionsCost,
  R: mentionsResp,
};
```

---

## 4) 語意證據（Evidence）

### 4.1 目前使用的線索群
- 急迫時間壓力
- 金流/轉帳
- App 安裝/遠端協助
- 超連結要求
- 機密資料索取（密碼/OTP/CVV）
- 威脅語彙（凍結/停權/罰款）

### 4.2 產生 evidence 的邏輯（摘要）
```js
const reasons = [];
if (hasMoney) reasons.push("訊息內容涉及轉帳／匯款／帳戶等金流行為。");
if (hasUrgent) reasons.push("使用「立即」「限時」「幾分鐘內」等急迫語氣。");
if (hasLink) reasons.push("包含連結或要求你點選網址，可能導向偽造網站。");
if (hasApp) reasons.push("要求下載或安裝 App，可能導致裝置被遠端控制。");
if (asksSecret) reasons.push("要求提供密碼／驗證碼或卡片資訊，這在正常流程中極少見。");
if (!scbkr.S) reasons.push("沒有清楚可驗證的主體（例如：官方銀行 App 名稱）。");
if (!scbkr.R) reasons.push("沒有說明一旦出事誰負責，責任鏈幾乎是空的。");
```

---

## 5) JSON 輸出 API 化

### 5.1 現有結果物件
```json
{
  "inputText": "...",
  "risk": "SAFE|RISK|FATAL|NON-CLOSABLE",
  "reasons": ["..."],
  "scbkr": { "S": true, "C": false, "B": true, "K": false, "R": false },
  "debug": {
    "hasUrgent": false,
    "hasMoney": true,
    "hasApp": false,
    "hasLink": true,
    "asksSecret": false,
    "hasThreat": false,
    "hasAnyScamPattern": true
  },
  "riskDisplay": {
    "label": "...",
    "main": "...",
    "sub": "...",
    "badgeClass": "risk"
  }
}
```

### 5.2 可對外 API（建議映射，不改既有邏輯）
```json
{
  "SCBKR": { "S": true, "C": false, "B": true, "K": false, "R": false },
  "RiskLevel": "RISK",
  "Evidence": ["..."],
  "ActionAdvice": ["..."]
}
```

---

## 6) UI 結構（Input → Parser → SCBKR → Risk → Output）

### 6.1 區塊
- Header：專案標題、作者、模式切換、語言切換
- Input Card：訊息輸入、分析、清除、範例載入、朗讀控制
- Output Card：Risk Level、SCBKR、Evidence、Action Guidance、Role Integrity、Pro Debug

### 6.2 三模式
- Standard：一般使用者
- Pro：顯示完整責任鏈與 debug 規則命中
- Senior：大字體 + 簡化提示 + 語音朗讀

---

## 7) 功能對應（程式碼段 → 功能）

- `js/scbkr-engine.js`
  - `hitAny`：關鍵字命中器
  - `calculateRisk`：四級風險判定
  - `analyzeMessage`：整合解析、SCBKR、Evidence 與視圖訊息

- `index.html`
  - CSS：深色高對比 UI、三模式樣式切換
  - JS（inline）：
    - `actionGuidanceByRisk`：風險對應行動建議
    - `renderResult`：把分析結果渲染到各區塊
    - `setMode`：模式切換（Standard / Pro / Senior）

- `js/report-export.js`
  - `exportReport`：將分析結果輸出成可列印報告

- `js/i18n.js` + `i18n/*.json`
  - 介面文案多語切換

---

## 8) 完整檔案（原始碼重建清單）

> 正式提交請以 repo 實際檔案為準，以下列出需納入的完整來源檔。

- `index.html`
- `js/scbkr-engine.js`
- `js/report-export.js`
- `js/i18n.js`
- `js/examples-loader.js`
- `js/voice.js`
- `i18n/zh.json`
- `i18n/en.json`
- `data/examples.json`

---

## 9) 改善建議（不新增功能、僅工程化建議）

1. 將 `index.html` 的 inline script 拆分為 `js/app.js`，提升可維護性。
2. 將 `riskDisplay` 與 `actionGuidanceByRisk` 文案集中到 i18n，減少重複字串。
3. 增加規則單元測試（關鍵字命中、四級分流、SCBKR flagCount 邏輯）。
4. 建立固定 JSON contract（`SCBKR/RiskLevel/Evidence/ActionAdvice`）供未來 API/後端接軌。
5. 在 Pro 匯出報告附加 `debug` 區塊，強化可審計性。

