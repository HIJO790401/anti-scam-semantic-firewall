(function (global) {
  const urgentKw = ["立即", "馬上", "立刻", "緊急", "限時", "最後通知", "within", "urgent", "asap", "24小時", "10分鐘", "幾分鐘內"];
  const moneyKw = ["轉帳", "匯款", "款項", "金額", "帳戶", "收款", "付款", "繳費", "投資", "獲利", "保證獲利", "驗證碼", "one-time password", "otp", "銀行卡", "信用卡"];
  const appKw = ["下載 app", "安裝 app", "安裝應用程式", "遠端協助", "teamviewer"];
  const linkKw = ["http://", "https://", "網址", "link", "點選連結", "點擊連結"];
  const officialKw = ["銀行", "郵局", "警察局", "法院", "檢察署", "國稅局", "官方", "客服"];
  const askSecretKw = ["密碼", "驗證碼", "簡訊碼", "簡訊認證", "卡號", "背面三碼", "cvv"];
  const threatKw = ["凍結", "停用", "停權", "鎖定", "罰款", "罰金", "沒收", "追討"];
  const AWS_LLM_ENDPOINT = ""; // 之後使用者自己填，預設留空就代表關閉遠端

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


  // v3 apiPacket start
  function buildSafeApiPacket() {
    return {
      SCBKR: { S: false, C: false, B: false, K: false, R: false },
      RiskLevel: "SAFE",
      Evidence: [],
      ActionAdvice: [],
      Audit: {
        TokenAudit: 0,
        TokenGateway: "ANON",
        Source: "BrowserLocalEngine",
      },
      LLM: {
        enabled: false,
        explanation: null,
        extraEvidence: [],
        extraActions: [],
      },
    };
  }

  function buildAntiScamApiPacket(resultObj, normalizedText, suspiciousKeywordCount) {
    const packet = buildSafeApiPacket();
    if (!resultObj || typeof resultObj !== "object") return packet;

    const textLength = Math.max(1, String(normalizedText || "").length);
    const tokenAuditRaw = suspiciousKeywordCount / textLength;
    const tokenAudit = Math.max(0, Math.min(1, Number(tokenAuditRaw.toFixed(4))));

    packet.SCBKR = {
      S: !!(resultObj.scbkr && resultObj.scbkr.S),
      C: !!(resultObj.scbkr && resultObj.scbkr.C),
      B: !!(resultObj.scbkr && resultObj.scbkr.B),
      K: !!(resultObj.scbkr && resultObj.scbkr.K),
      R: !!(resultObj.scbkr && resultObj.scbkr.R),
    };
    packet.RiskLevel = resultObj.risk || "SAFE";
    packet.Evidence = Array.isArray(resultObj.reasons) ? resultObj.reasons.slice() : [];

    const mainAdvice = resultObj.riskDisplay && resultObj.riskDisplay.main ? [resultObj.riskDisplay.main] : [];
    const subAdvice = resultObj.riskDisplay && resultObj.riskDisplay.sub ? [resultObj.riskDisplay.sub] : [];
    packet.ActionAdvice = [...mainAdvice, ...subAdvice];

    packet.Audit = {
      TokenAudit: tokenAudit,
      TokenGateway: packet.SCBKR.S ? "LocalRuleEngine" : "ANON",
      Source: "BrowserLocalEngine",
    };

    packet.LLM = {
      enabled: false,
      explanation: null,
      extraEvidence: [],
      extraActions: [],
    };

    return packet;
  }
  // v3 apiPacket end


  function buildSafeAnalyzeResult(inputText) {
    return {
      inputText,
      risk: "SAFE",
      reasons: [],
      scbkr: { S: false, C: false, B: false, K: false, R: false },
      debug: { hasUrgent: false, hasMoney: false, hasApp: false, hasLink: false, asksSecret: false, hasThreat: false, hasAnyScamPattern: false },
      riskDisplay: {
        label: "SAFE｜目前未偵測到明顯詐騙語意",
        main: "目前以安全預設值回傳。",
        sub: "如有疑慮，請改走官方管道再次確認。",
        badgeClass: "safe",
      },
      apiPacket: buildSafeApiPacket(),
    };
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
    const suspiciousKeywordCount = [hasUrgent, hasMoney, hasApp, hasLink, asksSecret, hasThreat].filter(Boolean).length;

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

    const resultObj = {
      inputText,
      risk,
      reasons,
      scbkr,
      debug: { hasUrgent, hasMoney, hasApp, hasLink, asksSecret, hasThreat, hasAnyScamPattern },
      suspiciousKeywordCount,
      riskDisplay: riskDisplay[risk],
    };

    // v3 apiPacket start
    resultObj.apiPacket = buildAntiScamApiPacket(resultObj, text, suspiciousKeywordCount);
    // v3 apiPacket end
    return resultObj;
  }
  // v3 aws llm hook end

  // v3 apiPacket start
  global.runScbkrApiPacket = function (inputText) {
    try {
      const result = analyzeMessage(inputText);
      return result && result.apiPacket ? result.apiPacket : buildSafeAnalyzeResult(inputText).apiPacket;
    } catch (err) {
      console.error("runScbkrApiPacket failed", err);
      return buildSafeAnalyzeResult(inputText).apiPacket;
    }
  };
  // v3 apiPacket end



  // v3 aws llm hook start
  function buildEmptyLlmSection(message) {
    return {
      enabled: false,
      explanation: message || null,
      extraEvidence: [],
      extraActions: [],
    };
  }

  /**
   * 呼叫 AWS 端的 LLM 解釋服務（如果有設定）
   * @param {string} inputText 使用者原始輸入
   * @param {object} apiPacket 本地 v3 封包（含 SCBKR / RiskLevel / Evidence / ActionAdvice / Audit）
   * @param {object} options { endpoint?: string, useLlm?: boolean, timeoutMs?: number }
   */
  async function callAwsLlmExplain(inputText, apiPacket, options = {}) {
    const useLlm = options.useLlm ?? !!global.USE_AWS_LLM;
    const endpoint = options.endpoint || global.AWS_LLM_ENDPOINT;

    if (!useLlm || !endpoint) {
      return buildEmptyLlmSection(null);
    }

    const controller = new AbortController();
    const timeoutMs = options.timeoutMs || 5000;
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputText, apiPacket }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!resp.ok) {
        console.warn("AWS LLM endpoint returned non-200:", resp.status);
        return buildEmptyLlmSection(`LLM endpoint HTTP ${resp.status}`);
      }

      const data = await resp.json();
      return {
        enabled: true,
        explanation: data.explanation || null,
        extraEvidence: Array.isArray(data.extraEvidence) ? data.extraEvidence : [],
        extraActions: Array.isArray(data.extraActions) ? data.extraActions : [],
      };
    } catch (err) {
      clearTimeout(timeoutId);
      console.error("callAwsLlmExplain failed:", err);
      return buildEmptyLlmSection("LLM unavailable, fallback to local rules only.");
    }
  }

  /**
   * 非破壞式 async 版本：先跑本地 analyzeMessage，再視情況呼叫 AWS LLM
   * 不要改動原本 analyzeMessage 的實作。
   */
  async function analyzeMessageWithAwsLlm(inputText, options = {}) {
    const baseResult = analyzeMessage(inputText);
    const safeResult = baseResult || buildSafeAnalyzeResult(inputText);

    const apiPacket = safeResult.apiPacket || buildAntiScamApiPacket(safeResult, inputText, 0);

    if (!apiPacket.LLM) {
      apiPacket.LLM = buildEmptyLlmSection(null);
    }

    const llmSection = await callAwsLlmExplain(inputText, apiPacket, options);

    apiPacket.LLM = llmSection;
    safeResult.apiPacket = apiPacket;
    safeResult.llm = llmSection;

    return safeResult;
  }

  global.analyzeMessageWithAwsLlm = analyzeMessageWithAwsLlm;
  // v3 aws llm hook end

  async function callLLMExplain(result) {
    // AWS integration hook (placeholder):
    // This function intentionally returns null for now.
    // In production, replace with fetch() to API Gateway/Lambda endpoint.
    void result;
    return null;
  }

  async function analyzeWithOptionalLLM(inputText, options = { useLLM: false }) {
    let baseResult;
    try {
      baseResult = analyzeMessage(inputText);
    } catch (err) {
      console.error("analyzeMessage failed", err);
      baseResult = buildSafeAnalyzeResult(inputText);
    }
    if (!options || !options.useLLM) return baseResult;

    try {
      const llmExtra = await callLLMExplain(baseResult);
      if (llmExtra && typeof llmExtra === "object") {
        // Expected future response shape:
        // {
        //   explanation: "plain-language summary",
        //   extraEvidence: ["..."],
        //   extraActions: ["..."]
        // }
        baseResult.llm = llmExtra;
      }
    } catch (e) {
      console.error("LLM explanation failed", e);
    }
    return baseResult;
  }

  // v3 apiPacket start
  global.runScbkrApiPacket = function (inputText) {
    try {
      const result = analyzeMessage(inputText);
      return result && result.apiPacket ? result.apiPacket : buildSafeAnalyzeResult(inputText).apiPacket;
    } catch (err) {
      console.error("runScbkrApiPacket failed", err);
      return buildSafeAnalyzeResult(inputText).apiPacket;
    }
  };
  // v3 apiPacket end

  global.SCBKREngine = { analyzeMessage, analyzeMessageWithAwsLlm, analyzeWithOptionalLLM, callLLMExplain, callAwsLlmExplain, calculateRisk };
})(window);
