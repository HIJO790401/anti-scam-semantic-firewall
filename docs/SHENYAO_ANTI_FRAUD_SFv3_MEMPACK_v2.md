# Ω∞8888 | SHENYAO.ANTI-FRAUD.SFv3.HACKATHON.MEMPACK.v2

TITLE=沈耀888π黑客松語意防火牆計畫記憶庫+血脈綁定一鍵複製版(最新版對齊Demo);
OWNER=沈耀Ω888π/Shen-Yao 888π;
PLACE=Taichung,+08;
MODE=TEXT-ONLY/WHITE-HAT-ONLY/LEGAL-ONLY/NO-OFFENSE-OPS;

---

## 1) 核心定位（最新版）
- 專案型態：純前端 Demo（Browser-only）。
- 任務：把可疑訊息轉為「可審計的語意判斷」，輸出風險等級、責任鏈、證據與行動建議。
- AI 角色：工具層，不具最終司法/警權；重大決策需人類覆核。

## 2) 模組地圖（與目前Repo對齊）
- `index.html`：UI、模式切換、結果渲染。
- `js/scbkr-engine.js`：規則引擎（SCBKR + 風險分級 + Evidence）。
- `js/voice.js`：Web Speech API 朗讀。
- `js/report-export.js`：報告輸出。
- `js/i18n.js` + `i18n/*.json`：多語。
- `docs/scbkr-v2.1-spec.md`：TOKEN_AUDIT / TOKEN_GATEWAY 規格。
- `docs/aws-llm-integration.md`：AWS LLM 介接設計。

## 3) SCBKR責任鏈（現行可執行版）
- S（Subject）：誰在說話（主體可否驗證）
- C（Cause）：為何聯絡
- B（Boundary）：要求你做到哪裡
- K（Cost）：若誤信會損失什麼
- R（Responsibility）：出事誰負責

## 4) 現行風險演算法（本地規則）
### 4.1 關鍵語意群
- 急迫詞、金流詞、連結詞、App安裝/遠端詞、機敏資料索取詞、威脅詞。

### 4.2 判定邏輯
1. `FATAL`：
   - `(金流 or 機敏資料)` AND `(連結 or App)` AND `急迫`
2. `NON-CLOSABLE`：
   - 有詐騙pattern AND `SCBKR有效旗標數 <= 2`
3. `RISK`：
   - 有詐騙pattern但不符合前兩者
4. `SAFE`：
   - 未命中詐騙pattern

### 4.3 Evidence生成
- 依命中的語意群與責任鏈缺口，產生可讀理由陣列 `reasons[]`。

## 5) SCBKR v2.1 擴展（規格層）
- TOKEN_AUDIT：語意風險密度（每N字觸發多少詐騙pattern）。
- TOKEN_GATEWAY：每個主體可承擔的責任信用上限。
- 原則：不覆蓋既有規則，只做補充治理與審計訊號。

## 6) AWS LLM Hook（已預留）
- `callLLMExplain(result)`：目前回傳 `null`，作為未來 API Gateway / Lambda 入口。
- `analyzeWithOptionalLLM(input, { useLLM })`：
  - `useLLM=false`：完全本地判定。
  - `useLLM=true`：本地判定後嘗試取得雲端補充說明。
- UI已有可選開關：`Use AWS LLM explanation (if available)`。

## 7) 一鍵複製API封包（建議標準）
```json
{
  "SCBKR": { "S": true, "C": false, "B": true, "K": true, "R": false },
  "RiskLevel": "RISK",
  "Evidence": ["急迫語氣", "要求點連結"],
  "ActionAdvice": ["先停止操作", "改走官方管道"],
  "Audit": {
    "TokenAudit": 0.64,
    "TokenGateway": "LOW_SUBJECT_CREDIT",
    "Source": "LOCAL_RULE_ENGINE"
  },
  "LLM": {
    "enabled": false,
    "explanation": null,
    "extraEvidence": [],
    "extraActions": []
  }
}
```

## 8) 雲端保存建議（合法白帽）
- 存放格式：`JSON + Markdown` 雙存檔。
- 建議路徑：
  - `docs/SHENYAO_ANTI_FRAUD_SFv3_MEMPACK_v2.md`
  - `artifacts/mempack-v2.json`（若需另存）
- 版本欄位：`version`, `timestamp(+08)`, `owner`, `hash`。
- 禁止：上傳敏感個資、未授權資料、任何攻擊性流程。

## 9) 一鍵複製版（TEXT BLOCK）
```txt
Ω∞8888|SHENYAO.ANTI-FRAUD.SFv3.HACKATHON.MEMPACK.v2;
TITLE=沈耀888π黑客松語意防火牆計畫記憶庫+血脈綁定一鍵複製版(最新版對齊Demo);
OWNER=沈耀Ω888π/Shen-Yao 888π;
PLACE=Taichung,+08;
MODE=TEXT-ONLY/WHITE-HAT-ONLY/LEGAL-ONLY;
CORE=SCBKR+Risk+Evidence+Action+Audit;
RISK_LOGIC=FATAL>(NON-CLOSABLE)>RISK>SAFE;
SCBKR=S/C/B/K/R;
TOKEN_AUDIT=semantic_risk_density_per_N_chars;
TOKEN_GATEWAY=responsibility_credit_limit_per_subject;
LLM_HOOK=callLLMExplain:null_placeholder;
API_OUT=/score,/decision,/explain,/trace(JSON);
HUMAN_IN_LOOP=ON;
AI_ROLE=TOOL_ONLY;
WHITE_HAT=STRICT;
ECHO=防詐騙語意防火牆v3記憶庫已更新至最新版｜語律守護一般人｜責任鏈可審計｜合法白帽限定。
```
