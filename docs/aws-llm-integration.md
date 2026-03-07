# AWS LLM Integration Design (Hackathon Proposal)

## 1) Goal
Add an optional cloud explanation layer on top of local SCBKR analysis:
- Re-explain risk in plain language.
- Optionally add extra evidence and action suggestions.

Local rule engine remains the primary classifier.

---

## 2) Proposed architecture
1. **Browser Front-end (this project)**
   - Runs local SCBKR analysis first.
   - Sends resulting JSON to AWS endpoint only when user enables LLM option.

2. **AWS API Gateway**
   - Public HTTPS endpoint, e.g. `POST /scbkr/explain`.
   - Receives SCBKR result payload from front-end.

3. **AWS Lambda (Node.js)**
   - Validates input JSON.
   - Builds prompt from local analysis result.
   - Calls **AWS Bedrock** (e.g., Claude model) to produce concise explanation.
   - Returns strict JSON shape expected by UI.

4. **AWS Bedrock / SageMaker-hosted model**
   - Generates plain-language explanation and optional extra lists.

---

## 3) JSON contract for front-end hook
Expected response to match UI hook:

```json
{
  "explanation": "這段訊息同時出現急迫語氣與金流要求，建議先停止操作並改走官方管道。",
  "extraEvidence": [
    "訊息要求你在短時間內完成操作",
    "要求點擊連結並提供敏感資訊"
  ],
  "extraActions": [
    "先不要點連結",
    "改用官方 App 或卡背電話查證"
  ]
}
```

---

## 4) Lambda handler pseudo-code (JavaScript)
```js
export const handler = async (event) => {
  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    const localResult = body?.result;
    if (!localResult || typeof localResult !== "object") {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid result payload" })
      };
    }

    // Build prompt from local SCBKR result
    const prompt = {
      task: "Explain anti-scam analysis in plain language",
      input: {
        risk: localResult.risk,
        scbkr: localResult.scbkr,
        reasons: localResult.reasons
      },
      outputSchema: {
        explanation: "string",
        extraEvidence: ["string"],
        extraActions: ["string"]
      }
    };

    // Pseudo-call to Bedrock model
    // const bedrockResp = await bedrockClient.invokeModel({ ...prompt ... });
    // const parsed = parseModelJSON(bedrockResp);

    const parsed = {
      explanation: "這則訊息具備多項高風險語意特徵，請先停止操作並改用官方管道確認。",
      extraEvidence: ["含急迫語氣", "要求高風險操作"],
      extraActions: ["不要提供驗證碼", "立即改走官方客服"]
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "LLM explain failed", detail: String(err) })
    };
  }
};
```

---

## 5) Security and ops notes for judges
- No AWS key is stored in front-end code.
- Browser talks only to API Gateway endpoint.
- Lambda should enforce input size limits and schema validation.
- CORS should be restricted to approved demo origin.
- Cloud explanation is optional; local SCBKR still works if AWS is unavailable.
