# Anti-Scam Semantic Firewall Engine
## 反詐騙語意防火牆引擎（Hackathon Front-End Demo｜Non R-lock Version）

**Demo：**  
https://hijo790401.github.io/anti-scam-semantic-firewall/

**比賽｜Competition：**  
去偽存真：全民偵查黑客松  
Agent for Truth: Disinformation Defense Hackathon

**組別｜Track：**  
詐騙識別防範 Anti-Scam Track

**Author：**  
沈耀 888π / Wen-Yao Hsu（Taichung, Taiwan）  
**Email：**  
ken0963521@gmail.com

---

## 1. 專案定位 Project Positioning

**Anti-Scam Semantic Firewall Engine** 是一個用於黑客松展示的 **前端語意治理 Demo**。  
它不是最終部署版，也不是完整責任鎖定系統，而是用前端形式展示：

- 可疑訊息如何被拆成可審計的語意結構
- 詐騙風險如何被解釋，而不只是被打分
- 使用者在接觸可疑訊息時，如何先被拉回責任鏈與行動邊界

使用者可以貼上任何可能為詐騙的文字，例如：

- 簡訊 SMS
- LINE 對話
- Email 內容
- 社群貼文
- 網頁文案
- 客服訊息

系統會將訊息拆解成可對齊、可追溯、可理解的風險結構。

> **版本聲明：**  
> 本版本為 **黑客松前端 Demo 版（Hackathon Front-End Demo）**，  
> 並明確屬於 **Non R-lock Version（非 R-lock 版）**。  
>  
> 它的用途是展示語意治理邏輯與介面交互，  
> 不是最終責任閉環版，也不是最終鎖定版。

---

## 2. 核心概念 Core Concepts

本 Demo 主要依照三個核心概念進行分析：

### 2.1 SCBKR 責任鏈分析  
**Subject / Cause / Boundary / Cost / Responsibility**

也就是：

- **S｜主體**：誰在說？  
- **C｜原因**：為什麼聯絡你？  
- **B｜邊界**：要你做到哪裡？  
- **K｜成本**：若你照做，可能損失什麼？  
- **R｜責任**：出事後，誰負責？  

這讓使用者看到的不只是「像不像詐騙」，  
而是這段話是否 **具備進入現實決策鏈的資格**。

### 2.2 語意風險分級 Semantic Risk Levels

系統將訊息輸出為四種風險結果：

- **SAFE**
- **RISK**
- **FATAL**
- **NON-CLOSABLE**

這不是單純的關鍵字分類，  
而是將訊息拆成語意責任欄位後，再做整體風險判讀。

其中 **NON-CLOSABLE** 特別重要，表示：

> 這段話的責任鏈無法閉合，  
> 即使它看起來正式，也不應直接進入現實鏈。

### 2.3 Ex(y)=π 角色治理模型 Role Governance

這一層用來確認：

- AI 是工具層
- 系統是輔助層
- 真正的決策權不能被訊息假裝奪走

因此頁面中會清楚標示：

> **Model Role = Tool Only**

這不是裝飾，而是治理立場。  
它提醒使用者：  
系統可以幫你拆解風險，  
但不取代銀行、警方、法官或最終責任主體。

---

## 3. 功能 Features

### 3.1 風險等級評估 Risk Level

系統依訊息內容輸出：

- **SAFE**
- **RISK**
- **FATAL**
- **NON-CLOSABLE**

並透過顏色與標籤呈現風險強度，  
協助使用者在接觸可疑訊息時「先停一下」。

同一套邏輯分成三種介面模式：

- **STANDARD 一般版**：適合一般使用者快速判讀  
- **PRO 專業版**：顯示較完整 SCBKR 與語意線索  
- **SENIOR SAFE 長輩安心版**：大字體、高對比、更口語的提醒文案  

### 3.2 SCBKR Responsibility Chain 責任鏈拆解

系統將訊息拆成五個維度：

- **S – Subject｜主體**：誰在說？  
- **C – Cause｜原因**：為何聯絡你？  
- **B – Boundary｜邊界**：要求你做到哪裡？  
- **K – Cost｜成本**：照做的代價是什麼？  
- **R – Responsibility｜責任**：出事誰負責？  

若關鍵欄位模糊、缺失或難以追溯，  
系統會明確提示：

> **這段訊息存在責任鏈斷裂風險。**

### 3.3 Evidence Patterns 語意特徵與線索

系統內建多組常見詐騙語意線索，例如：

- 急迫倒數壓力  
- 帳號凍結威脅  
- 要求離開官方管道  
- 要求加私人客服  
- 高報酬、零風險承諾  
- 驗證碼、連結、安裝要求  

畫面中會標示：

> **被偵測到的可疑 pattern**

讓使用者知道 **哪一句話有問題**，  
而不只是看到「高風險」三個字。

### 3.4 Action Guidance 行動建議

根據風險等級與 SCBKR 結果，  
系統提供明確的下一步，例如：

- 先暫停，不要急著點連結
- 改走官方客服電話 / 官網 / 官方 App
- 不要在對話中提供密碼、驗證碼或完整個資
- 找可信任對象協助複核

這一層不是要取代警方或司法，  
而是要把使用者先從「立刻照做」拉回「先審一下」。

### 3.5 Role Integrity 角色完整性提示

這一層會檢查訊息是否偽裝成：

- 銀行
- 政府
- 平台
- 客服
- AI 官方或系統權威

目的在於提醒：

> **看起來像官方，不等於它真的有官方資格。**

---

## 4. 操作方式 How to Use

1. 開啟 Demo：  
   https://hijo790401.github.io/anti-scam-semantic-firewall/

2. 在 **INPUT｜可疑訊息輸入區** 貼上文字  
   可貼：
   - 簡訊
   - LINE 對話
   - Email 內容
   - 網頁文案

   **注意：請勿貼上真實密碼、完整身分證號或完整銀行資訊。**

3. 按下 **ANALYZE 分析** 按鈕

4. 查看結果，包括：
   - Risk Level｜風險等級
   - SCBKR Responsibility Chain｜責任鏈拆解
   - Evidence Patterns｜語意線索
   - Action Guidance｜行動建議
   - Role Integrity｜角色治理說明

5. 若要重新測試，按下 **CLEAR 清除** 再輸入下一段

---

## 5. 技術說明 Technical Notes

本 Demo 為 **純前端展示版**：

- 單一頁面：`index.html`
- 內含：
  - HTML 結構
  - CSS 樣式
  - 原生 JavaScript 規則邏輯

### 本版特性

- 不依賴後端
- 不呼叫 LLM
- 不連資料庫
- 不儲存輸入內容
- 可直接部署於 GitHub Pages

### 本版限制

- 不做真實帳號驗證
- 不做正式案件回報
- 不接金融或政府 API
- 不進行真實模型推理
- 不含 R-lock 責任閉環鎖定機制

它的目的，是用最小風險方式展示：

> **反詐騙訊息可以先被語意治理，而不只是被關鍵字分類。**

---

## 6. 版本定義 Version Definition

為避免與後續版本混淆，這裡明確定義：

### 本版本是：
**Hackathon Front-End Demo / Non R-lock Version**

### 本版本不是：
- 最終部署版
- 決賽完成版
- R-lock 版
- 完整責任閉環版
- 商業正式部署版

也就是說：

> 這是黑客松使用的前端展示版，  
> 其任務是呈現語意治理的核心邏輯，  
> 而不是承擔最終責任鎖定功能。

---

## 7. 主要用途 Use Cases

### 7.1 黑客松展示
作為「去偽存真：全民偵查黑客松」之語意治理展示介面。

### 7.2 語意治理 PoC
作為未來與政府、金融、平台、企業討論反詐治理架構的前端概念驗證頁。

### 7.3 邏輯展示
展示以下三件事如何在實際介面中落地：

- SCBKR 責任鏈
- 語意風險分級
- Ex(y)=π 角色治理

---

## 8. 授權與敘事權 License & Ownership

本作品之設計權、敘事權與核心概念統整權，歸：

> **沈耀 888π / Wen-Yao Hsu** 所有。

未經書面同意，不得：

- 直接對外商用販售
- 宣稱為其他團隊或公司自研技術
- 抹除作者主體與原始敘事結構
- 以換殼或改名方式重新包裝成自有核心框架

如需合作、試用、整合或延伸開發，  
請以 Email 聯繫作者。

---

## 9. 總結 Summary

**Anti-Scam Semantic Firewall Engine** 的核心價值，  
不在於把詐騙訊息分類得多準，  
而在於先把它拆成：

- 可審計
- 可解釋
- 可追責
- 可讓一般人理解的語意結構

它的目的不是證明 AI 多厲害，  
而是證明：

> **在反詐騙這件事上，訊息是否進入人的決策鏈，應該先被治理。**