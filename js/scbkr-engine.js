(function (global) {
  const AXES = ["S", "C", "B", "K", "R"];
  const BASELINE = { S: 1, C: 1, B: 1, K: 1, R: 1 };
  const FALLBACK_RULESET = { version: "3.2.0-fallback", rules: [] };

  let motherCoreRuleset = null;
  let rulesLoadError = null;

  function normalizeText(text) {
    return String(text || "").toLowerCase();
  }

  function compact(text) {
    return String(text || "").replace(/\s+/g, "").toLowerCase();
  }

  function hitRulePattern(text, pattern) {
    const safePattern = pattern || {};
    const keywords = Array.isArray(safePattern.keywords_any) ? safePattern.keywords_any : [];
    const regexList = Array.isArray(safePattern.regex_any) ? safePattern.regex_any : [];
    const excludes = Array.isArray(safePattern.excludes_any) ? safePattern.excludes_any : [];

    const compactText = compact(text);
    const excluded = excludes.some((token) => {
      const key = String(token).toLowerCase();
      return text.includes(key) || compactText.includes(compact(key));
    });
    if (excluded) return false;
    const keywordHit = keywords.some((kw) => {
      const key = String(kw).toLowerCase();
      return text.includes(key) || compactText.includes(compact(key));
    });
    const regexHit = regexList.some((rule) => {
      try {
        return new RegExp(rule, "i").test(text);
      } catch (_error) {
        return false;
      }
    });

    return keywordHit || regexHit;
  }

  function scoreToRiskLevel(riskScore, scbkr, triggeredCount) {
    const weakSubject = scbkr.S <= 1;
    const weakResponsibility = scbkr.R <= 1;

    // Mother-Core threshold policy (v3.2):
    // - FATAL: score >= 7, or score >= 5 with high Boundary+Cost pressure.
    // - NON-CLOSABLE: meaningful risk with weak Subject/Responsibility closure.
    // - RISK: score >= 2 with at least one triggered rule.
    // - SAFE: otherwise.
    if (riskScore >= 7 || (riskScore >= 5 && scbkr.B >= 3 && scbkr.K >= 3)) {
      return "FATAL";
    }
    if (riskScore >= 3 && (weakSubject || weakResponsibility)) {
      return "NON-CLOSABLE";
    }
    if (riskScore >= 2 && triggeredCount >= 1) {
      return "RISK";
    }
    return "SAFE";
  }

  function getRiskDisplay(riskLevel) {
    const map = {
      SAFE: {
        label: "SAFE｜低風險（Low Risk）",
        main: "目前未偵測到強烈詐騙語意，責任鏈相對完整。",
        sub: "仍建議透過官方管道複核。",
        badgeClass: "safe",
      },
      RISK: {
        label: "RISK｜中風險（Medium Risk）",
        main: "偵測到可疑語意規則命中，請不要直接照訊息操作。",
        sub: "請改走官方 App／官方網站／卡背電話查證。",
        badgeClass: "risk",
      },
      FATAL: {
        label: "FATAL｜高風險（High Risk）",
        main: "出現高危命中組合，疑似詐騙行為，請立即停止。",
        sub: "停止轉帳與輸入資料，立即聯繫官方與 165。",
        badgeClass: "fatal",
      },
      "NON-CLOSABLE": {
        label: "NON-CLOSABLE｜不可閉合（Chain Fracture）",
        main: "主體或責任軸斷裂，無法形成可審計閉環。",
        sub: "在 Ex(y)=π 可稽核條件成立前，不要執行高風險操作。",
        badgeClass: "non-closable",
      },
    };
    return map[riskLevel] || map.SAFE;
  }

  function buildRoleGovernance(text, triggeredRules) {
    const impersonationTokens = ["銀行", "國稅局", "法院", "檢警", "客服", "government", "bank"]; 
    const isImpersonatingOfficial = impersonationTokens.some((kw) => text.includes(kw.toLowerCase()));

    const notesZh = [
      "Ex(y)=π：本次輸出可回放、可審計、可負責。",
      "Model Role = Tool only；最終決策者是使用者與官方管道。",
    ];

    if (isImpersonatingOfficial) {
      notesZh.push("偵測到疑似官方身分語彙，需二次核驗真實性。");
    }
    if (triggeredRules.some((item) => item.category === "off_platform_redirect")) {
      notesZh.push("訊息引導離開官方管道，責任鏈可追溯性下降。");
    }

    return { isImpersonatingOfficial, notesZh };
  }

  function simpleHash(str) {
    let hash = 0;
    const s = String(str || "");
    for (let i = 0; i < s.length; i++) {
      hash = (hash << 5) - hash + s.charCodeAt(i);
      hash |= 0;
    }
    return "h" + Math.abs(hash).toString(16);
  }

  function hasAnyToken(haystack, tokens) {
    return tokens.some((token) => haystack.includes(String(token).toLowerCase()));
  }

  function buildRuleClusters(resultObj, inputText) {
    const mergedText = [
      inputText,
      JSON.stringify(resultObj && resultObj.triggeredRules ? resultObj.triggeredRules : []),
      JSON.stringify(resultObj && resultObj.coreReasonsZh ? resultObj.coreReasonsZh : []),
      JSON.stringify(resultObj && resultObj.meta ? resultObj.meta : {}),
    ].join(" ").toLowerCase();
    const clusters = new Set();

    if (hasAnyToken(mergedText, ["family", "親友", "表哥", "家人", "親戚"])) {
      clusters.add("family_impersonation");
    }
    if (hasAnyToken(mergedText, ["urgent", "馬上", "立即", "限時", "緊急", "匯款", "轉帳"])) {
      clusters.add("urgent_money_pressure");
    }
    if (hasAnyToken(mergedText, ["銀行", "官方", "政府", "法院", "警察", "國稅局"])) {
      clusters.add("fake_authority");
    }
    if (hasAnyToken(mergedText, ["otp", "驗證碼", "密碼", "卡號", "簡訊碼"])) {
      clusters.add("credential_theft");
    }
    if (hasAnyToken(mergedText, ["http", "https", "連結", "點擊", "下載 app", "安裝 app"])) {
      clusters.add("link_phishing");
    }

    return Array.from(clusters);
  }

  function buildPolicy(riskLevel) {
    switch (riskLevel) {
      case "SAFE":
        return {
          severity: "SAFE",
          recommendedAction: "observe",
          escalationLevel: 0,
          humanAdviceZh: "可先觀察，但若你本人看不懂或沒印象，仍應改走官方管道確認。",
        };
      case "RISK":
        return {
          severity: "RISK",
          recommendedAction: "verify_official_channel",
          escalationLevel: 1,
          humanAdviceZh: "請不要直接照訊息操作，改走官方 App／官網／卡背電話查證。",
        };
      case "FATAL":
        return {
          severity: "FATAL",
          recommendedAction: "block_and_verify",
          escalationLevel: 3,
          humanAdviceZh: "請立刻停止轉帳或輸入資料，直接改聯絡官方或撥 165。",
        };
      default:
        return {
          severity: "NON-CLOSABLE",
          recommendedAction: "manual_review",
          escalationLevel: 2,
          humanAdviceZh: "主體與責任鏈不清楚，先不要做任何高風險操作，請人工覆核。",
        };
    }
  }

  function buildInsight(riskLevel, ruleClusters) {
    const clusters = Array.isArray(ruleClusters) ? ruleClusters : [];
    const has = (value) => clusters.includes(value);

    if (has("family_impersonation") && has("urgent_money_pressure")) {
      return {
        summary_zh: "這段訊息同時出現親友冒充與急迫金流壓力，屬於高誤信風險組合。",
        summary_en: "This message combines family impersonation with urgent money pressure, creating a high-trust exploitation pattern.",
      };
    }
    if (has("fake_authority") && has("credential_theft")) {
      return {
        summary_zh: "這段訊息利用權威偽裝與驗證碼要求，屬於典型帳戶接管風險。",
        summary_en: "This message combines fake authority with credential capture, a typical account-takeover pattern.",
      };
    }
    if (clusters.length === 1 && has("link_phishing")) {
      return {
        summary_zh: "這段訊息包含可疑連結導向特徵，建議改走官方網站或官方 App。",
        summary_en: "This message contains suspicious link-phishing characteristics. Use the official website or app instead.",
      };
    }

    return {
      summary_zh: `這段訊息被判定為 ${riskLevel}，系統建議優先依官方管道進行查證。`,
      summary_en: `This message is classified as ${riskLevel}. The system recommends verification through official channels.`,
    };
  }


  function buildSubjectValidity(resultObj, inputText) {
    const text = normalizeText(inputText);
    const clusters = Array.isArray(resultObj && resultObj.ruleClusters) ? resultObj.ruleClusters : [];
    const triggeredRules = Array.isArray(resultObj && resultObj.triggeredRules) ? resultObj.triggeredRules : [];
    const scbkr = resultObj && resultObj.scbkr ? resultObj.scbkr : {};

    if (Number(scbkr.S || 0) <= 1) return false;

    const hasImpersonationCluster = clusters.includes("family_impersonation") || clusters.includes("fake_authority");
    const hasImpersonationRule = triggeredRules.some((item) => {
      const category = String(item && item.category ? item.category : "").toLowerCase();
      return category.includes("impersonation") || category.includes("official") || category.includes("authority") || category.includes("family");
    });
    if (hasImpersonationCluster || hasImpersonationRule) return false;

    const hasUnverifiedCue = hasAnyToken(text, ["未知", "不明", "陌生", "無法驗證", "來路不明", "unknown"]);
    const hasTrustedSource = hasAnyToken(text, ["官方", "官網", "official", "卡背", "客服", "165", "分行", "銀行app", "官方app"]);
    if (hasUnverifiedCue || !hasTrustedSource) return false;

    return true;
  }

  function buildResponsibilityValidity(resultObj) {
    const scbkr = resultObj && resultObj.scbkr ? resultObj.scbkr : {};
    const text = normalizeText(resultObj && resultObj.text ? resultObj.text : "");

    if (Number(scbkr.R || 0) <= 1) return false;

    const hasResponsibilityParty = hasAnyToken(text, ["客服", "官方", "回查", "專線", "負責", "窗口", "165", "service", "support"]);
    if (!hasResponsibilityParty) return false;

    const userOnlyAction = hasAnyToken(text, ["請自行", "自己處理", "自行操作", "你自己負責", "自行承擔"]);
    if (userOnlyAction) return false;

    return true;
  }

  function buildBoundaryValidity(resultObj) {
    const scbkr = resultObj && resultObj.scbkr ? resultObj.scbkr : {};
    const text = normalizeText(resultObj && resultObj.text ? resultObj.text : "");

    if (Number(scbkr.B || 0) <= 1) return false;

    const vaguePressure = hasAnyToken(text, ["趕快處理", "先做再說", "照做就好", "配合一下", "快點"]) &&
      !hasAnyToken(text, ["匯款", "轉帳", "點擊", "輸入", "下載", "安裝", "聯絡"]);
    if (vaguePressure) return false;

    return true;
  }

  function buildSubjectResponsibilityMath(resultObj, inputText) {
    const subjectValidity = buildSubjectValidity(resultObj, inputText);
    const responsibilityValidity = buildResponsibilityValidity(resultObj);
    const boundaryValidity = buildBoundaryValidity(resultObj);

    let subjectDecision = subjectValidity ? "VALID" : "VOID";
    let responsibilityDecision = responsibilityValidity ? "VALID" : "VOID";

    if (subjectValidity && Array.isArray(resultObj.ruleClusters) && (resultObj.ruleClusters.includes("fake_authority") || resultObj.ruleClusters.includes("family_impersonation"))) {
      subjectDecision = "REVIEW";
    }

    if (responsibilityValidity && resultObj.scbkr && Number(resultObj.scbkr.R || 0) === 2) {
      responsibilityDecision = "REVIEW";
    }

    let finalValidity = "VALID";
    let voidReason = "";

    if (subjectDecision === "VOID") {
      finalValidity = "VOID";
      voidReason = "主體不可驗證或疑似偽裝，該請求不成立。";
    } else if (responsibilityDecision === "VOID") {
      finalValidity = "VOID";
      voidReason = "責任承接方不存在或不明確，該請求不成立。";
    } else if (!boundaryValidity) {
      finalValidity = "VOID";
      voidReason = "行動邊界不明確，禁止將此訊息視為有效要求。";
    } else if (subjectDecision === "REVIEW" || responsibilityDecision === "REVIEW") {
      finalValidity = "REVIEW";
    }

    return {
      subjectValidity,
      responsibilityValidity,
      boundaryValidity,
      subjectDecision,
      responsibilityDecision,
      finalValidity,
      voidReason,
    };
  }

  function buildSafeApiPacket(resultObj) {
    const safe = resultObj || {};
    return {
      schemaVersion: "2.3",
      RiskLevel: safe.riskLevel || "SAFE",
      RiskScore: Number(safe.riskScore || 0),
      SCBKR: safe.scbkr || { ...BASELINE },
      TriggeredRules: safe.triggeredRules || [],
      CoreReasonsZh: safe.coreReasonsZh || [],
      Meta: safe.meta || {},
    };
  }

  function buildAntiScamApiPacket(resultObj) {
    const packet = buildSafeApiPacket(resultObj);
    packet.RoleGovernance = (resultObj && resultObj.roleGovernance) || {};
    packet.Audit = {
      rulesVersion: resultObj && resultObj.meta ? resultObj.meta.rulesVersion : "unknown",
      triggeredCount: resultObj && resultObj.meta ? resultObj.meta.triggeredCount : 0,
      rulesLoadError: resultObj && resultObj.meta ? resultObj.meta.rulesLoadError : null,
    };
    return packet;
  }

  async function analyzeWithOptionalLLM(inputText) {
    return analyzeMessage(inputText);
  }

  async function loadRules() {
    if (motherCoreRuleset) {
      return motherCoreRuleset;
    }

    const rootPath = typeof window !== "undefined" && window.location && window.location.origin ? `${window.location.origin}/rules/mothercore-rules.json` : null;
    const candidates = [rootPath, "rules/mothercore-rules.json", "../rules/mothercore-rules.json"].filter(Boolean);
    for (const path of candidates) {
      try {
        const response = await fetch(path, { cache: "no-cache" });
        if (!response.ok) continue;
        const payload = await response.json();
        if (!payload || !Array.isArray(payload.rules)) continue;
        motherCoreRuleset = payload;
        rulesLoadError = null;
        return motherCoreRuleset;
      } catch (_error) {
        // try next path
      }
    }

    motherCoreRuleset = FALLBACK_RULESET;
    rulesLoadError = "rules/mothercore-rules.json not reachable";
    return motherCoreRuleset;
  }

  function analyzeMessage(inputText) {
    const analysisStart = performance.now();
    const text = normalizeText(inputText);
    const rules = (motherCoreRuleset && Array.isArray(motherCoreRuleset.rules) ? motherCoreRuleset.rules : []);

    const scbkr = { ...BASELINE };
    const triggeredRules = [];
    const coreReasonsZh = [];
    let riskScore = 0;

    rules.forEach((rule) => {
      if (!rule || !rule.enabled) return;
      if (!hitRulePattern(text, rule.pattern)) return;

      const impactAxes = rule.impact_on_axes || {};
      AXES.forEach((axis) => {
        scbkr[axis] += Number(impactAxes[axis] || 0);
      });

      riskScore += Number((rule.impact_on_risk && rule.impact_on_risk.risk_delta) || 0);
      const reason = (rule.impact_on_risk && rule.impact_on_risk.reason_zh) || rule.description_zh || "命中母核規則";

      triggeredRules.push({
        rule_id: rule.rule_id,
        category: rule.category,
        reason_zh: reason,
      });
      coreReasonsZh.push(reason);
    });

    const riskLevel = scoreToRiskLevel(riskScore, scbkr, triggeredRules.length);
    const roleGovernance = buildRoleGovernance(text, triggeredRules);

    if (scbkr.R <= 0) {
      coreReasonsZh.push("責任軸（R）偏低：缺少出事後可承擔責任的明確對象。");
    }
    if (scbkr.S <= 0) {
      coreReasonsZh.push("主體軸（S）偏低：發話主體真實性不足或不可驗證。");
    }

    const resultObj = {
      text: String(inputText || ""),
      risk: riskLevel,
      riskLevel,
      riskScore,
      scbkr,
      triggeredRules,
      coreReasonsZh: Array.from(new Set(coreReasonsZh)),
      roleGovernance,
      riskDisplay: getRiskDisplay(riskLevel),
      trace: triggeredRules.map((item) => `${item.rule_id}:${item.reason_zh}`),
      meta: {
        rulesVersion: motherCoreRuleset ? motherCoreRuleset.version : "unknown",
        triggeredCount: triggeredRules.length,
        rulesLoadError,
      },
    };

    const analysisEnd = performance.now();
    const latencyMs = Math.round(analysisEnd - analysisStart);

    resultObj.ruleClusters = buildRuleClusters(resultObj, inputText);
    resultObj.srMath = buildSubjectResponsibilityMath(resultObj, inputText);
    resultObj.policy = buildPolicy(resultObj.risk);
    resultObj.audit = {
      ...(resultObj.audit || {}),
      rulesVersion: "3.3.0",
      triggeredCount: Array.isArray(resultObj.triggeredRules)
        ? resultObj.triggeredRules.length
        : (Array.isArray(resultObj.reasons) ? resultObj.reasons.length : 0),
      latencyMs,
      auditHash: simpleHash(
        String(inputText || "") +
        "|" + String(resultObj.risk || "") +
        "|" + JSON.stringify(resultObj.scbkr || {})
      ),
    };
    resultObj.insight = buildInsight(resultObj.risk, resultObj.ruleClusters);
    if (resultObj.srMath && resultObj.srMath.finalValidity === "VOID") {
      resultObj.insight = {
        summary_zh: "此訊息在主體責任數學層不成立，不應視為有效請求。",
        summary_en: "This message fails subject-responsibility validation and should not be treated as a valid request.",
      };
    }

    resultObj.apiPacket = buildAntiScamApiPacket(resultObj);
    resultObj.apiPacket.RuleClusters = resultObj.ruleClusters || [];
    resultObj.apiPacket.Policy = resultObj.policy || null;
    resultObj.apiPacket.Audit = {
      ...(resultObj.apiPacket.Audit || {}),
      rulesVersion: resultObj.audit && resultObj.audit.rulesVersion ? resultObj.audit.rulesVersion : "3.3.0",
      triggeredCount: resultObj.audit && resultObj.audit.triggeredCount ? resultObj.audit.triggeredCount : 0,
      latencyMs: resultObj.audit && resultObj.audit.latencyMs ? resultObj.audit.latencyMs : 0,
      auditHash: resultObj.audit && resultObj.audit.auditHash ? resultObj.audit.auditHash : "",
    };
    resultObj.apiPacket.Insight = resultObj.insight || {
      summary_zh: "",
      summary_en: "",
    };
    resultObj.apiPacket.SubjectResponsibilityMath = {
      subjectValidity: resultObj.srMath ? resultObj.srMath.subjectValidity : false,
      responsibilityValidity: resultObj.srMath ? resultObj.srMath.responsibilityValidity : false,
      boundaryValidity: resultObj.srMath ? resultObj.srMath.boundaryValidity : false,
      subjectDecision: resultObj.srMath ? resultObj.srMath.subjectDecision : "VOID",
      responsibilityDecision: resultObj.srMath ? resultObj.srMath.responsibilityDecision : "VOID",
      finalValidity: resultObj.srMath ? resultObj.srMath.finalValidity : "VOID",
      voidReason: resultObj.srMath ? resultObj.srMath.voidReason : "",
    };

    return resultObj;
  }

  function getRulesStatus() {
    return {
      loaded: !!motherCoreRuleset,
      version: motherCoreRuleset ? motherCoreRuleset.version : null,
      count: motherCoreRuleset && motherCoreRuleset.rules ? motherCoreRuleset.rules.length : 0,
      error: rulesLoadError,
    };
  }

  global.SCBKREngine = {
    loadRules,
    analyzeMessage,
    analyzeWithOptionalLLM,
    buildSafeApiPacket,
    buildAntiScamApiPacket,
    getRulesStatus,
    scoreToRiskLevel,
  };

  global.runScbkrApiPacket = async function runScbkrApiPacket(inputText) {
    const result = await analyzeWithOptionalLLM(inputText);
    return result && result.apiPacket ? result.apiPacket : buildAntiScamApiPacket(result);
  };
})(window);
