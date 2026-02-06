# Anti-Scam Semantic Firewall Engine  
反詐騙語意防火牆引擎（Hackathon Demo）

> Demo：<https://hijo790401.github.io/anti-scam-semantic-firewall/>

- 比賽：**去偽存真：全民偵查黑客松**  
  Agent for Truth: Disinformation Defense Hackathon  
- 組別：詐騙識別防範 Anti-Scam Track  
- Author：**沈耀 888π / Wen-Yao Hsu（Taichung, Taiwan）**  
- Email：**ken0963521@gmail.com**

---

## 1. 專案簡介 Project Overview

**Anti-Scam Semantic Firewall Engine** 是一個前端語意治理 Demo。  
使用者可以貼上任何可能為詐騙的文字（簡訊、Line、Email、網頁文案），  
系統會根據三個核心概念進行分析：

- **SCBKR 責任鏈分析**  
  Subject／Cause／Boundary／Cost／Responsibility  
- **語意風險分級 Semantic Risk Levels**  
  SAFE／RISK／FATAL／NON-CLOSABLE  
- **Ex(y)=π 角色治理模型 Role Governance**  
  確保 AI 與工具永遠是「輔助層」，不是決策者。

本版僅為 **前端展示**：不連任何後端、不呼叫 LLM，也不儲存輸入內容。  
目的是展示「怎麼把詐騙訊息拆成可審計的語意結構」。

---

## 2. 功能 Features

- 🔍 **風險等級評估 Risk Level**  
  依內容給出 SAFE／RISK／FATAL／NON-CLOSABLE。

- 🧩 **SCBKR 責任鏈拆解 Responsibility Chain**  
  顯示訊息中是否交代清楚：誰在說、為何聯絡、要你做到哪裡、  
  可能損失什麼、出事誰負責。缺少欄位時，會標註為追溯風險。

- 🧵 **Evidence Patterns 語意特徵與線索**  
  偵測常見詐騙模式，例如「急迫期限」「凍結」「要求私下轉帳」等。

- 🧭 **Action Guidance 行動建議**  
  提醒使用者「暫停」「改走官方管道」等下一步行動方向。

- 🛡 **Role Integrity EX(y)=π 治理層**  
  檢查訊息是否偽裝成銀行／政府／官方平台，  
  並在介面上強調：  
  > Model Role = Tool Only 工具層，不是決策者。

---

## 3. 操作說明 How to Use

1. 開啟 Demo：  
   `https://hijo790401.github.io/anti-scam-semantic-firewall/`

2. 在 **INPUT｜可疑訊息輸入** 區塊貼上文字：  
   - 簡訊、Line、Email 或網頁內容皆可。  
   - 請勿貼入真實密碼或完整身分證號。

3. 按下 **ANALYZE 分析** 按鈕。

4. 向下捲動查看：  
   - Risk Level｜風險等級  
   - SCBKR Responsibility Chain｜責任鏈拆解  
   - Evidence Patterns｜語意特徵與線索  
   - Action Guidance｜行動建議  
   - Role Integrity｜EX(y)=π 治理層說明

5. 若要重新測試，按 **CLEAR 清除** 清空輸入，再貼下一段訊息。

---

## 4. 技術說明 Technical Notes

- 單一頁面：`index.html`  
  - 內含結構（HTML）、樣式（CSS）與簡易規則引擎（原生 JS）。  
  - 無額外依賴、可直接透過 GitHub Pages 部署。

- Demo 僅示範「語意治理框架」：  
  - 不對外發送貼上的內容。  
  - 不連資料庫、不寫入任何紀錄。  
  - 未接上真正 LLM，方便在黑客松與企業評估時安全試用。

---

## 5. 授權與使用 License & Use

- 本專案主要用於：  
  - 2026「去偽存真：全民偵查黑客松」決賽展示  
  - 未來與政府／金融／企業討論語意防詐治理架構之 POC 基礎

- 語意防火牆架構（SCBKR、語意風險分級、Ex(y)=π 角色治理）  
  設計權與敘事歸 **沈耀 888π / Wen-Yao Hsu** 所有。  
- 未經書面同意，不得將本系統或其理論直接對外商用販售或宣稱為自家技術。

---