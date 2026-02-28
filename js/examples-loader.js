(function (global) {
  let examples = [];

  async function init(options) {
    const { containerId, inputId, getLang, t } = options;
    const container = document.getElementById(containerId);
    const inputEl = document.getElementById(inputId);
    if (!container || !inputEl) return;

    const res = await fetch("data/examples.json");
    examples = await res.json();

    const label = document.createElement("label");
    label.setAttribute("for", "exampleSelect");
    label.className = "card-caption";
    label.style.display = "block";
    label.style.marginTop = "10px";
    label.setAttribute("data-example-label", "1");

    const select = document.createElement("select");
    select.id = "exampleSelect";
    select.className = "textarea";
    select.style.minHeight = "unset";
    select.style.height = "40px";
    select.style.padding = "8px 10px";

    container.appendChild(label);
    container.appendChild(select);

    function renderSelect() {
      const lang = getLang();
      label.textContent = t("examples.label");
      select.innerHTML = "";
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = t("examples.placeholder");
      select.appendChild(placeholder);

      examples.forEach((example) => {
        const opt = document.createElement("option");
        opt.value = example.id;
        opt.textContent = lang === "en" ? example.label_en : example.label_zh;
        select.appendChild(opt);
      });
    }

    select.addEventListener("change", () => {
      const selected = examples.find((example) => example.id === select.value);
      if (!selected) return;
      const lang = getLang();
      inputEl.value = lang === "en" ? selected.text_en : selected.text_zh;
      inputEl.dispatchEvent(new Event("input"));
    });

    renderSelect();
    return { rerender: renderSelect };
  }

  global.ExamplesLoader = { init };
})(window);
