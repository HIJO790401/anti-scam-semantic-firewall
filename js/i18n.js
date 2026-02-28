(function (global) {
  let currentLang = "zh";
  const bundles = {};
  const listeners = [];

  async function loadLang(lang) {
    if (!bundles[lang]) {
      const res = await fetch(`i18n/${lang}.json`);
      bundles[lang] = await res.json();
    }
    return bundles[lang];
  }

  function t(key) {
    return (bundles[currentLang] && bundles[currentLang][key]) || key;
  }

  function applyI18nToDom() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
  }

  async function setLanguage(lang) {
    currentLang = lang;
    await loadLang(lang);
    applyI18nToDom();
    listeners.forEach((cb) => cb(lang));
  }

  function onChange(cb) {
    listeners.push(cb);
  }

  async function init(defaultLang) {
    await loadLang(defaultLang || currentLang);
    currentLang = defaultLang || currentLang;
    applyI18nToDom();
  }

  global.AppI18n = { init, setLanguage, t, onChange, getCurrentLang: () => currentLang };
})(window);
