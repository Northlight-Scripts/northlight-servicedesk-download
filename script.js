const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbySlXJp6C1cW20kWY_jqHFlLKvkP95368uwUPo1BQ1VNSvfAsgW_HVftOX2kL7pHv-U/exec";

const APP_VERSION = "0.1.0";
const INSTALLER_FILE = "https://github.com/Northlight-Scripts/northlight-servicedesk-download/releases/download/v0.1.0/Northlight.ServiceDesk.Setup.0.1.0.exe";

const versionElement = document.getElementById("appVersion");
const downloadButton = document.getElementById("downloadBtn");

if (versionElement) {
  versionElement.textContent = APP_VERSION;
}

if (downloadButton) {
  downloadButton.href = INSTALLER_FILE;
}

const newsletterForm = document.getElementById("newsletterForm");
const newsletterStatus = document.getElementById("newsletterStatus");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("emailInput").value.trim();

    if (!email) return;

    newsletterStatus.textContent = "Wird gespeichert...";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          email: email,
          source: "Northlight Service Desk Download",
          date: new Date().toISOString()
        })
      });

      newsletterStatus.textContent = "Danke! Du wurdest eingetragen.";
      newsletterForm.reset();

      setTimeout(() => {
        newsletterStatus.textContent = "";
      }, 5000);
    } catch (error) {
      newsletterStatus.textContent = "Fehler. Bitte später erneut versuchen.";
    }
  });
}

const cookieBanner = document.getElementById("cookieBanner");

if (cookieBanner && !localStorage.getItem("northlightDownloadCookies")) {
  cookieBanner.style.display = "flex";
}

function acceptCookies(type) {
  localStorage.setItem("northlightDownloadCookies", type);

  if (cookieBanner) {
    cookieBanner.style.display = "none";
  }
}
