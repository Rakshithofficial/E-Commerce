document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("flux_user"));
  if (!user) {
    // ✅ FIXED PATH (was /index.html)
    window.location.href = "/";
    return;
  }

  const avatarImg = document.getElementById("avatarImg");
  const avatarInput = document.getElementById("avatarInput");
  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const loginMethod = document.getElementById("loginMethod");
  const displayName = document.getElementById("displayName");
  const saveBtn = document.getElementById("saveProfile");
  const savedMsg = document.getElementById("savedMsg");

  profileName.textContent = user.name;
  profileEmail.textContent = user.email;
  loginMethod.textContent = user.authType;
  displayName.value = user.name;

  // Load avatar
  const savedAvatar = localStorage.getItem("flux_avatar");
  avatarImg.src = savedAvatar || "https://via.placeholder.com/96";

  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("flux_avatar", reader.result);
      avatarImg.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  saveBtn.addEventListener("click", () => {
    user.name = displayName.value.trim();
    localStorage.setItem("flux_user", JSON.stringify(user));

    profileName.textContent = user.name;
    savedMsg.style.display = "block";
    setTimeout(() => (savedMsg.style.display = "none"), 2000);
  });
});