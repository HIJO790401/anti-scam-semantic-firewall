# Hackathon Architecture Overview

## System Scope
- Browser-only front-end demo.
- Input text is analyzed locally via rule engine.
- Output includes risk level, SCBKR chain, evidence patterns, and action guidance.

## Core Runtime Flow
1. User pastes suspicious text.
2. `SCBKREngine.analyzeMessage()` parses semantic patterns.
3. Engine builds SCBKR (`S/C/B/K/R`) flags and risk level (`SAFE/RISK/FATAL/NON-CLOSABLE`).
4. UI renders risk summary, evidence list, and action suggestions.

## Module Map
- `index.html`: UI shell + mode switching + render logic.
- `js/scbkr-engine.js`: SCBKR parser + risk rules.
- `js/report-export.js`: printable report export.
- `js/i18n.js` + `i18n/*.json`: bilingual UI copy.
- `js/examples-loader.js`: sample message loading.
- `js/voice.js`: optional text-to-speech read-out.

## Senior Mode & Voice (Module B/C explanation layer)
- Senior Mode provides larger typography and simpler wording for easier reading.
- UI exposes a clear Senior Mode toggle and keeps existing mode buttons.
- Voice reading is optional and can be enabled/disabled from a dedicated toggle.
- `js/voice.js` wraps browser Web Speech API (`speechSynthesis`, `SpeechSynthesisUtterance`) to read risk summary and key advice.
- This helps non-technical users understand results without needing to read dense risk details.
