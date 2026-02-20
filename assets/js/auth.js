document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     HELPERS
  ===================== */
  const users = JSON.parse(localStorage.getItem("flux_users")) || [];
  const errorMsg = document.getElementById("errorMsg");

  function showError(message) {
    if (!errorMsg) return;
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
  }



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
      const user =
        type === "google"
          ? {
              name: "Google User",
              email: "googleuser@gmail.com",
              authType: "google",
              loggedIn: true
            }
          : {
              name: "Apple User",
              email: "appleuser@icloud.com",
              authType: "apple",
              loggedIn: true
            };

      localStorage.setItem("flux_user", JSON.stringify(user));
      window.location.href = "/pages/home.html";
    }, 1500);
  }

  /* =====================
     GOOGLE / APPLE LOGIN
  ===================== */
  const googleBtn = document.getElementById("googleLogin");
  if (googleBtn) {
    googleBtn.addEventListener("click", () => openOAuth("google"));
  }

  const appleBtn = document.getElementById("appleLogin");
  if (appleBtn) {
    appleBtn.addEventListener("click", () => openOAuth("apple"));
  }

  /* =====================
     EMAIL LOGIN
  ===================== */
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (!email || !password) {
        showError("Please enter email and password");
        return;
      }

      const existingUser = users.find(
        u => u.email === email && u.password === password
      );

      if (!existingUser) {
        showError("Invalid email or password");
        return;
      }

      localStorage.setItem("flux_user", JSON.stringify({
        name: existingUser.name,
        email: existingUser.email,
        authType: "email",
        loggedIn: true
      }));

      window.location.href = "/pages/home.html";
    });
  }

});
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("flux_user");
      window.location.href = "../index.html";
    });
  }
});
