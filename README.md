# anti-scam-semantic-firewall
基於 SCBKR 責任鏈分析、語意風險分級、Ex(y)=π 角色治理模型的次世代防詐 Semantic Firewall。   用於 2026「去偽存真：全民偵查黑客松」，可進行詐騙偵測、可解釋分析、行動引導與審計級追溯。
A next-generation Anti-Scam Semantic Firewall powered by SCBKR responsibility-chain analysis, Semantic Risk Grading, and Ex(y)=π role-governance model.  
Built for the 2026 “Agent for Truth: Disinformation Defense Hackathon”.  
This engine detects scam signals, explains risk factors, and gives actionable guidance with audit-grade traceability.
**Anti-Scam Semantic Firewall Engine
次世代防詐語意防火牆引擎（Hackathon Edition）**
作者：沈耀 888π／許文耀
Email：ken0963521@gmail.com
Base：Taichung, Taiwan
🚀 專案定位｜Project Purpose
This repository contains the Hackathon Edition of the Semantic Firewall System—
a governance engine designed for:
Scam detection（詐騙偵測）
Semantic risk analysis（語意風險分析）
Explainable evidence extraction（可解釋證據）
Action guidance for users（行動引導）
Audit-grade responsibility chains（審計級責任鏈追溯）
Built specifically for the 2026「去偽存真：全民偵查黑客松」。
🔥 核心技術（Core Technologies）
1. SCBKR Responsibility Chain
將 AI/文本語意拆成：
Subject（主體）
Cause（原因）
Boundary（邊界）
Cost（成本）
Responsibility（責任）
缺失 → 直接標記風險。
2. Semantic Risk Grading (V3 Engine)
輸出四等級：
SAFE
RISK
FATAL
NON-CLOSABLE（不可結案，需人審）
3. Ex(y)=π Role-Governance Model
確保 AI/發話者的角色一致性，
防止詐騙訊息偽裝成可信主體。
🧰 功能模組（Modules）
risk_detector/ → 詐騙訊號分析
evidence_explainer/ → 提供可理解原因
action_guidance/ → 給使用者下一步行動
role_constraint/ → 防偽主體偵測（超大加分）
firewall_core/ → 各模組整合
🧪 Demo
官方語意防火牆 V3 Demo：
👉 https://hijo790401.github.io/semantic-firewall-system/�
Hackathon UI Demo（開發中）→ 將放於 /demo/web-demo-ui/
