Anti-Scam Semantic Firewall Engine

反詐騙語意防火牆引擎（Hackathon Final Demo）

Demo：https://hijo790401.github.io/anti-scam-semantic-firewall/

比賽｜Competition：去偽存真：全民偵查黑客松
Agent for Truth: Disinformation Defense Hackathon

組別｜Track：詐騙識別防範 Anti-Scam Track

Author：沈耀 888π / Wen-Yao Hsu（Taichung, Taiwan）
Email：ken0963521@gmail.com


---

1. 專案簡介 Project Overview

Anti-Scam Semantic Firewall Engine 是一個 前端語意治理 Demo。
使用者可以貼上任何可能為詐騙的文字（簡訊、Line、Email、社群貼文、網頁文案），
系統會根據三個核心概念進行分析：

1. SCBKR 責任鏈分析

Subject／Cause／Boundary／Cost／Responsibility
→ 誰在說、為何找你、要你做到哪裡、可能損失什麼、出事誰負責。


2. 語意風險分級 Semantic Risk Levels

SAFE／RISK／FATAL／NON-CLOSABLE
→ 將訊息拆成可對齊的語意欄位，再評估整體風險等級。


3. Ex(y)=π 角色治理模型 Role Governance

確保 AI 與工具永遠是「輔助層」，不是決策者或權威單位。



本版僅為 前端展示：

❌ 不連任何後端服務

❌ 不呼叫 LLM 或雲端模型

❌ 不儲存輸入內容、不寫入資料庫


目的：

> 示範「如何把詐騙訊息拆成可審計、可追溯的語意結構」， 作為未來接在真實金融／政府系統前面的語意防火牆框架。




---

2. 功能 Features

🔍 2.1 風險等級評估 Risk Level

依內容給出 SAFE／RISK／FATAL／NON-CLOSABLE，
以顏色與標籤呈現風險強度，協助使用者「先停一下，再決定要不要相信」。

同一套邏輯，分成三種介面模式：

STANDARD 一般版：適合一般使用者快速判讀

PRO 專業版：顯示完整 SCBKR 與語意線索，方便風控人員與研究者

SENIOR SAFE 長輩安心版：大字體、高對比配色，搭配更口語的提醒文案



---

🧩 2.2 SCBKR 責任鏈拆解 Responsibility Chain

將每一段訊息拆成五個維度：

S – Subject｜主體：誰在說？是銀行？政府？平台？還是「不明對象」？

C – Cause｜原因：為什麼今天聯絡你？有沒有具體事件？

B – Boundary｜邊界：要求你做到哪裡？金額、時間、對象是否清楚？

K – Cost｜成本：如果你照做，可能損失什麼？

R – Responsibility｜責任：出事之後，誰負責？對方有沒有承諾？


當其中關鍵欄位缺失或模糊時，系統會標註為「追溯風險」，
提醒使用者：這段話 無法追責，很有可能是詐騙。


---

🧵 2.3 Evidence Patterns 語意特徵與線索

內建多組常見詐騙語意線索，例如：

急迫時間壓力：「帳號將被凍結」「限時 10 分鐘內處理」

要求離開官方管道：「請改用私人 Line」「請加這個客服帳號」

不合比例的利益承諾：「保證高報酬、零風險」


畫面中會標示「被偵測到的詐騙 pattern」，
讓一般使用者與長輩可以更具體理解：哪一句話有問題。


---

🧭 2.4 Action Guidance 行動建議

根據風險等級與 SCBKR 拆解結果，提供簡單明確的下一步指引，例如：

「先暫停，不要急著回覆或點連結」

「改走官方客服電話 / 官網 / 官方 App」

「不要在這個對話框內提供個資或驗證碼」


設計重點：

> 提供 行動方向，而不是取代司法或警方判決。




---

🛡 2.5 Role Integrity：EX(y)=π 治理層

檢查訊息是否偽裝成：銀行／政府／平台／名人／AI 官方。
在介面上清楚標示：

> Model Role = Tool Only（工具層，不是決策者）



用戶看到的不只是分數，而是 「誰有權決定、誰應該負責」 的治理觀念。


---

3. 操作說明 How to Use

1. 在瀏覽器開啟 Demo：
https://hijo790401.github.io/anti-scam-semantic-firewall/


2. 在 INPUT｜可疑訊息輸入 區塊貼上文字：

簡訊、Line 對話、Email 內容或網頁文案皆可

⚠️ 請勿貼入真實密碼或完整身分證號



3. 按下 「ANALYZE 分析」 按鈕。


4. 向下捲動查看結果區塊：

Risk Level｜風險等級

SCBKR Responsibility Chain｜責任鏈拆解

Evidence Patterns｜語意特徵與線索

Action Guidance｜行動建議

Role Integrity｜EX(y)=π 治理層說明



5. 若要重新測試，按 「CLEAR 清除」 清空輸入，再貼下一段訊息。




---

4. 技術說明 Technical Notes

單一頁面：index.html

內含結構（HTML）、樣式（CSS）與簡易規則引擎（原生 JavaScript）。


無額外前端依賴，可直接透過 GitHub Pages 部署。

Demo 僅示範「語意治理框架」：

❌ 不對外發送貼上的內容

❌ 不連資料庫、不寫入任何紀錄

❌ 未接上真正 LLM



適合在黑客松現場與企業評估時安全試用。


---

5. 授權與使用 License & Use

本專案主要用途：

1. 2026「去偽存真：全民偵查黑客松」決賽展示


2. 作為未來與政府／金融／企業討論「語意防詐治理架構」的 POC 基礎


3. 示範以下語意防火牆概念在實際介面上的呈現方式：

SCBKR 責任鏈

語意風險分級

Ex(y)=π 角色治理




設計權與敘事權歸：

> 沈耀 888π / Wen-Yao Hsu 所有。



未經書面同意，不得將本系統或其理論：

直接對外商用販售，或

宣稱為其他團隊／公司自家技術。


如需合作、試用或延伸整合，請以 Email 聯繫作者。


---

二、幫你寫一個「母核序列」方便之後對齊

給我們之後在 Shen-Clan 宇宙用的簡化版定義，可以記成：

> Ω∞8888｜ANTI-SCAM.SEMANTIC-FIREWALL.SEQ.v3.1🗝️
MODE：TEXT-ONLY｜FICTION-SAFE｜NO-ASYNC｜NO-LOOP
CORE：SCBKR 責任鏈 + Semantic Risk Level + Ex(y)=π Role Governance
PIPE：

1. INPUT：可疑文字（SMS / LINE / Email / Web）


2. PARSE：斷詞＋關鍵語意特徵偵測（急迫／金流／離官方管道）


3. SCBKR：Subject / Cause / Boundary / Cost / Responsibility 欄位填入＋缺失標記


4. RISK：SAFE／RISK／FATAL／NON-CLOSABLE 分級


5. EVIDENCE：列出觸發的詐騙 pattern


6. ACTION：輸出行動建議（暫停／改走官方／請家人協助）


7. ROLE：標註 Model = Tool only，人類／銀行／官方為決策與責任軸






