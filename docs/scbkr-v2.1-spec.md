# SCBKR v2.1 Specification (TOKEN_AUDIT + TOKEN_GATEWAY)

## 1) Current SCBKR model (baseline)
SCBKR is the current responsibility-chain model in this demo:
- **S — Subject**: who is speaking? Is the source identifiable and verifiable?
- **C — Cause**: why are they contacting the user now?
- **B — Boundary**: what exact action boundary is requested?
- **K — Cost**: what loss/cost can happen if user follows blindly?
- **R — Responsibility**: who takes responsibility if damage occurs?

In the existing engine, these are represented as boolean flags and used in risk grading.

---

## 2) TOKEN_AUDIT concept
**TOKEN_AUDIT** means **semantic risk density per token**.

Plain-language idea:
- A short message that triggers many scam cues is more dangerous than a long message with one weak cue.
- We therefore normalize risk by message size.

For this rule-based demo (no LLM dependency), TOKEN_AUDIT can be approximated by:
- Count of fired scam patterns (urgent, money, app-install, link, secret request, threat, etc.)
- Divided by text size (e.g., per N characters)

Example formula (spec-level):
- `tokenAuditScore = firedPatternCount / max(1, textLength / N)`
- N can be fixed (e.g., 50 chars) in early versions.

This can extend current logic without breaking existing behavior by adding a secondary indicator (not replacing base risk rules).

---

## 3) TOKEN_GATEWAY concept
**TOKEN_GATEWAY** means **responsibility credit limit per subject**.

Plain-language idea:
- Different subjects should have different trust ceilings.
- A message from an unverified subject should not be allowed high-risk requests.

For this demo stage, TOKEN_GATEWAY can be mapped in simple ways:
1. **Static rule map (current-friendly):**
   - verified official subject: higher gateway limit
   - unclear or unknown subject: very low gateway limit
2. **History-aware map (future):**
   - include prior incidents / complaint history to reduce subject credit limit

Practical effect:
- If request intensity exceeds subject gateway limit, mark as higher risk or non-closable.

---

## 4) How v2.1 extends current engine
v2.1 is an **extension layer**, not a rewrite:
- Keep existing SCBKR + rule-based risk grading intact.
- Add TOKEN_AUDIT as a density metric.
- Add TOKEN_GATEWAY as a subject-credit constraint.
- Combine them as optional governance signals for explainability and auditing.

Suggested integration order:
1. Compute normal result via existing engine.
2. Compute TOKEN_AUDIT score from fired patterns and text length.
3. Assign TOKEN_GATEWAY level from subject clarity/verification.
4. Append both to output (debug/audit fields) for review.

This keeps backward compatibility while improving risk governance clarity.
