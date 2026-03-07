(function (global) {
  // VoiceModule wraps browser Web Speech API for optional result read-out.
  // It is used by Senior Mode and can also help non-technical users.
  function isSupported() {
    return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  }

  function stopSpeaking() {
    if (isSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  function speakRiskResult(resultObj, lang) {
    if (!isSupported() || !resultObj) return false;
    stopSpeaking();
    const advice = (resultObj.actions || []).slice(0, 3).join("。") || "請改用官方管道再次確認";
    const text = `風險等級：${resultObj.risk}。重點建議：${advice}。`;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang || "zh-TW";
    utter.rate = 0.95;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
    return true;
  }

  global.VoiceModule = { speakRiskResult, stopSpeaking, isSupported };
})(window);
