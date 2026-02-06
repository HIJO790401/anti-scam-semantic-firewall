Anti-Scam Semantic Firewall Engine
反詐騙語意防火牆引擎（Hackathon Edition）
Author｜作者：沈耀 888π / Wen-Yao Hsu
Email：ken0963521@gmail.com
Base｜基地：Taichung, Taiwan / 台灣台中
1. Project Overview｜專案概述
中文
反詐騙語意防火牆是一個基於 SCBKR 責任鏈分析、語意風險分級與 Ex(y)=π 角色治理模型 的次世代防詐騙語意引擎。
它不是單純的關鍵字過濾器，而是把每一則訊息變成「可審計、可回放、可追責」的語意事件。
本專案為 2026 年 「去偽存真：全民偵查黑客松（Agent for Truth：Disinformation Defense Hackathon）」 所打造的 Hackathon 版本，可用於：
詐騙偵查（Scam / Fraud Detection）
語意風險分級（Semantic Risk Grading）
可解釋分析（Explainable Reasoning）
使用者行動引導（Action Guidance）
審計等級追溯（Audit-grade Traceability）
English
The Anti-Scam Semantic Firewall is a next-generation anti-fraud engine built on SCBKR responsibility chains, semantic risk grading, and the Ex(y)=π role-governance model.
Instead of simple keyword blocking, every message is transformed into a traceable, auditable semantic event.
This Hackathon edition is designed for the “Agent for Truth: Disinformation Defense Hackathon 2026”, and supports:
Scam & fraud detection
Semantic risk classification
Explainable evidence extraction
User-oriented action guidance
Audit-grade responsibility tracing
2. Core Idea｜核心理念
中文
很多反詐騙系統只回答一件事：「像不像詐騙？」
這個引擎多回答三件事：
誰在說？（主體與角色是否可信）
憑什麼說？（理由是否完整、可驗證）
出事時，誰負責？（責任鏈是否可以追溯）
只要這三條線斷掉，即使訊息看起來再「正常」，都會被標成高風險或不可結案（NON-CLOSABLE）。
English
Most anti-scam systems only answer one question: “Does this look like a scam?”
This engine answers three:
Who is speaking? (Is the claimed role trustworthy?)
On what grounds? (Is the reasoning complete and verifiable?)
Who is accountable if things go wrong? (Is there a traceable responsibility chain?)
If any of these lines break, the message is treated as high-risk or non-closable, even if it “looks normal”.
3. Architecture｜架構設計
3.1 SCBKR Responsibility Chain｜SCBKR 責任鏈
中文
SCBKR 將 AI / 文本語意拆成五個軸線：
S – Subject 主體：誰在說話？自稱銀行？政府？還是匿名？
C – Cause 原因：為什麼要你現在就做這件事？
B – Boundary 邊界：對方有沒有說清楚自己權限與處理範圍？
K – Cost 成本：你要付出什麼？金錢、時間、個資、風險？
R – Responsibility 責任：如果出事，誰在法律或契約上負責？
缺 S / C / B → 視為語意無效建議
缺 K / R → 標記為 NON-CLOSABLE（不可結案，必須人工介入）
English
SCBKR decomposes message semantics into five axes:
S – Subject: Who is speaking? Bank, government, platform, or anonymous?
C – Cause: Why are you being asked to act now?
B – Boundary: Are the sender’s authority and limits clearly stated?
K – Cost: What do you pay—money, time, data, risk?
R – Responsibility: If something breaks, who is legally / contractually accountable?
Missing S / C / B → invalid semantic recommendation
Missing K / R → flagged as NON-CLOSABLE, requiring human or expert review.
3.2 Semantic Risk Grading (V3 Engine)｜語意風險分級
中文
引擎會將訊息標記為四種等級：
SAFE：目前未偵測到重大風險特徵
RISK：含多項詐騙特徵，需提高警覺
FATAL：高度疑似詐騙（權威冒用 + 金流 + 時間壓力）
NON-CLOSABLE：風險極高且責任鏈缺失，個人不應自行結案，需制度與專業單位接手
English
The engine classifies each message into four levels:
SAFE: No major scam signals detected (yet).
RISK: Multiple risk patterns detected; user should verify via official channels.
FATAL: Strong scam signal (authority impersonation + money + time pressure).
NON-CLOSABLE: Extremely high risk with broken responsibility chain; the case must be escalated to institutional processes.
3.3 Ex(y)=π Role-Governance Model｜Ex(y)=π 角色治理模型
中文
Ex(y)=π 是一個「存在方程式」：
它規定 AI 與訊息本身永遠只是工具與映射，而不是決策主體。
在反詐騙情境中，它用來檢查：
這則訊息是否假冒「銀行／政府／官方平台」？
是否強迫你把「決策權」交給一串文字或一個連結？
只要越界，系統會標記為高風險，並強調：真正的存在與責任在 官方機構 + 你本人，而不是這則訊息。
English
Ex(y)=π is an “existence equation” enforcing that AI and messages are tools / projections, never the primary decision maker.
In anti-scam context it checks:
Is the message impersonating a bank / government / platform?
Is it trying to shift all decision power to a text or a link?
If so, the engine flags it as high-risk and reminds: real existence and responsibility lie in official institutions and the human recipient, not in the message string.
4. Modules｜功能模組
中文
risk_detector/：偵測詐騙關鍵字、權威冒用、時間壓力與金流要求等訊號
evidence_explainer/：輸出可讀的風險原因與語意特徵列表
action_guidance/：依風險等級給出下一步行動建議（勿匯款／改走官方管道／報警等）
role_constraint/：依 Ex(y)=π 檢查主體是否偽裝官方、是否越權發號施令
firewall_core/：整合 SCBKR + 風險分級 + 角色治理，形成可嵌入任何 LLM 前端的語意防火牆
English
risk_detector/: detects scam signals (keywords, authority spoofing, time pressure, payment requests)
evidence_explainer/: produces human-readable explanations and feature lists
action_guidance/: generates next-step guidance based on risk level
role_constraint/: enforces Ex(y)=π and spots fake “official” identities
firewall_core/: combines SCBKR, risk grading, and role governance into an LLM-agnostic semantic firewall
5. Demo & Integration｜Demo 與整合方式
中文
現有 語意防火牆 V3 Demo（一般版）：
https://hijo790401.github.io/semantic-firewall-system/�
黑客松版 UI（Anti-Scam Demo）則專注在：
單則訊息輸入（簡訊／Line／Email／貼文）
風險分級 + SCBKR 責任鏈視覺化
風險證據列表與行動建議
供評審與使用者一眼看懂「為何是詐騙」
此引擎設計為 模型無關（model-agnostic） 中介層，可掛在 OpenAI、Anthropic、Google 或私有 LLM 前面，用來治理它們產生的任何輸出。
English
Existing Semantic Firewall V3 general demo:
https://hijo790401.github.io/semantic-firewall-system/�
The Hackathon UI focuses on:
Single-message input (SMS / chat / email / posts)
Risk level + SCBKR visualization
Evidence list and actionable guidance
Making the “why is this a scam?” question instantly clear to judges and users
The engine is designed as a model-agnostic middleware layer. It can sit in front of OpenAI, Anthropic, Google or in-house LLMs and govern whatever they generate.
6. Why It Matters｜為什麼這個專案重要
中文
AI 讓詐騙變得更快、更大量、更難查證。
與其只追逐「更聰明的模型」，我選擇追問一件事：
「當文明遇到大量 AI 語言時，誰能維持決策與文明的穩定？」
反詐騙語意防火牆的目標很單純：
讓每一則訊息都帶著清楚的主體、邊界與責任，而不是只剩下情緒與恐懼。
English
AI makes scams faster, larger-scale and harder to verify.
Instead of chasing “smarter models”, this project asks:
“When civilization is flooded with AI text, who keeps decisions and society stable?”
The goal of this engine is simple:
Attach clear subject, boundary and responsibility to every message — instead of leaving people alone with emotion and fear.
7. Contact｜聯絡方式
中文
如果你是政府單位、金融機構、電信業者或任何需要大規模處理高風險訊息的組織，
我開放針對 實際場景（data + flow） 的客製合作與授權討論。
English
If you are a public agency, financial institution, telco, or any organization dealing with large-scale high-risk messaging,
I’m open to collaboration and licensing based on your real data and workflows.
沈耀 888π／許文耀
Founder & Architect, Semantic Firewall System
Email: ken0963521@gmail.com
Location: Taichung, Taiwan
