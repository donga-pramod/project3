(function () {
  const isInSubfolder =
    window.location.pathname.includes("/Questionaire/") ||
    window.location.pathname.includes("/Observation-tool/");

  const basePath = isInSubfolder ? "../" : "";
  const homePath = basePath + "index.html";
  const questionnairePath = basePath + "Questionaire/index.html";
  const observationPath = basePath + "Observation-tool/index.html";

  window.openApp = function (appName) {
    let openApps = JSON.parse(localStorage.getItem("openApps") || "[]");
    if (!openApps.includes(appName)) {
      openApps.push(appName);
      localStorage.setItem("openApps", JSON.stringify(openApps));
    }
    renderTaskbar();
  };

  window.closeApp = function (appName) {
    let openApps = JSON.parse(localStorage.getItem("openApps") || "[]");
    openApps = openApps.filter((app) => app !== appName);
    localStorage.setItem("openApps", JSON.stringify(openApps));
    renderTaskbar();
  };

  window.minimizeApp = function (appName) {
    window.location.href = homePath;
  };

  function renderTaskbar() {
    const container = document.getElementById("taskbarApps");
    if (!container) return;

    const openApps = JSON.parse(localStorage.getItem("openApps") || "[]");
    container.innerHTML = "";

    const path = window.location.pathname;

    openApps.forEach((app) => {
      const btn = document.createElement("a");
      btn.className = "taskbar-app";

      if (app === "questionnaire") {
        btn.href = questionnairePath;
        btn.textContent = "Questionnaire";
        if (path.includes("/Questionaire/")) btn.classList.add("active");
      } else if (app === "observation") {
        btn.href = observationPath;
        btn.textContent = "Observation Tool";
        if (path.includes("/Observation-tool/")) btn.classList.add("active");
      }

      container.appendChild(btn);
    });
  }

  function updateClock() {
    const clockEl = document.getElementById("xp-clock");
    if (!clockEl) return;

    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    clockEl.textContent = `${hours}:${minutes} ${ampm}`;
  }

  function init() {
    updateClock();
    setInterval(updateClock, 1000);
    renderTaskbar();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
