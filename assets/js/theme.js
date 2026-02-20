const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("flux_theme");

if (savedTheme === "dark") {
  root.classList.add("dark");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    root.classList.add("dark");
    localStorage.setItem("flux_theme", "dark");
  } else {
    root.classList.remove("dark");
    localStorage.setItem("flux_theme", "light");
  }
});