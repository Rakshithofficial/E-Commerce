document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem("flux_users")) || [];
  const successMsg = document.getElementById("successMsg");

  function loginUser(user) {
    // set current logged-in user
    localStorage.setItem("flux_user", JSON.stringify(user));

    successMsg.textContent = "Signup successful 🎉 Redirecting...";
    successMsg.style.display = "block";

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1200);
  }

  // Google signup (dummy)
  const googleBtn = document.getElementById("googleSignup");
  if (googleBtn) {
    googleBtn.addEventListener("click", () => {
      const user = {
        name: "Google User",
        email: "googleuser@gmail.com",
        provider: "google",
        avatar: "../assets/images/placeholder.png"
      };

      users.push(user);
      localStorage.setItem("flux_users", JSON.stringify(users));

      loginUser(user);
    });
  }

  // Apple signup (dummy)
  const appleBtn = document.getElementById("appleSignup");
  if (appleBtn) {
    appleBtn.addEventListener("click", () => {
      const user = {
        name: "Apple User",
        email: "appleuser@icloud.com",
        provider: "apple",
        avatar: "../assets/images/placeholder.png"
      };

      users.push(user);
      localStorage.setItem("flux_users", JSON.stringify(users));

      loginUser(user);
    });
  }

  // Email signup
  const createBtn = document.getElementById("createAccountBtn");
  if (createBtn) {
    createBtn.addEventListener("click", () => {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirm = document.getElementById("confirmPassword").value;

      if (!name || !email || !password || !confirm) return;
      if (password !== confirm) return;

      const user = {
        name,
        email,
        password,
        provider: "email",
        avatar: "../assets/images/placeholder.png"
      };

      users.push(user);
      localStorage.setItem("flux_users", JSON.stringify(users));

      loginUser(user);
    });
  }
});