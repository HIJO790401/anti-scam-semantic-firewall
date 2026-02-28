(function (global) {
  function isSupported() {
    return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  }

  function stopSpeaking() {
    if (isSupported()) window.speechSynthesis.cancel();
  }

  function speakText(text, lang) {
    if (!isSupported() || !text) return false;
    stopSpeaking();
    const utter = new SpeechSynthesisUtterance(String(text));
    utter.lang = lang || "zh-TW";
    utter.rate = 0.95;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
    return true;
  }

  function speakRiskResult(resultObj, lang) {
    if (!resultObj) return false;
    const advice = (resultObj.coreReasonsZh || []).slice(0, 3).join("。") || "請改用官方管道再次確認";
    const text = `風險等級：${resultObj.riskLevel}。重點：${advice}。`;
    return speakText(text, lang);
  }

  global.VoiceModule = { speakRiskResult, stopSpeaking, isSupported, speakText };
})(window);
