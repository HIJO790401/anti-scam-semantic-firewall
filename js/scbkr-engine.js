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

    return {
      text: String(inputText || ""),
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
    getRulesStatus,
    scoreToRiskLevel,
  };
})(window);
