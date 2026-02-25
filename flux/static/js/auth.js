// ===============================
// FLUX AUTH JS (SAFE FOR DJANGO)
// ===============================

// ❌ Disable ALL JS auth logic on Django auth pages
if (
  window.location.pathname === "/signup/" ||
  window.location.pathname === "/login/"
) {
  console.log("auth.js disabled on Django auth pages");
  // DO NOTHING — let Django handle forms
} else {
  document.addEventListener("DOMContentLoaded", () => {

    /* =====================
       OAUTH MODAL SETUP
    ===================== */
    const oauthModal = document.getElementById("oauthModal");
    const oauthText = document.getElementById("oauthText");
    const oauthLogo = document.getElementById("oauthLogo");

    function openOAuth(type) {
      if (!oauthModal) return;

      oauthModal.style.display = "flex";

      if (type === "google") {
        oauthLogo.textContent = "G";
        oauthLogo.style.background = "#4285f4";
        oauthText.textContent = "Signing in with Google…";
        oauthModal.classList.remove("oauth-apple");
      }

      if (type === "apple") {
        oauthLogo.textContent = "";
        oauthLogo.style.background = "#000";
        oauthText.textContent = "Signing in with Apple…";
        oauthModal.classList.add("oauth-apple");
      }

      setTimeout(() => {
        // TEMP FAKE LOGIN (replace later with Django OAuth)
        window.location.href = "/";
      }, 1500);
    }

    /* =====================
       GOOGLE / APPLE BUTTONS
    ===================== */
    const googleBtn = document.getElementById("googleLogin");
    if (googleBtn) {
      googleBtn.addEventListener("click", () => openOAuth("google"));
    }

    const appleBtn = document.getElementById("appleLogin");
    if (appleBtn) {
      appleBtn.addEventListener("click", () => openOAuth("apple"));
    }

  });
}

/* =====================
   LOGOUT (SAFE)
===================== */
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "/logout/";
    });
  }
});