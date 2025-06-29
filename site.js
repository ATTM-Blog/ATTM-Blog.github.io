
const BLOG_TITLE = "According to the Model";
const COPYRIGHT_NOTICE = "© 2025 According to the Model";

const THEMES = {
  light: {
    font: "'Montserrat', sans-serif",
    background: "#fdfdfd",
    foreground: "#111",
    accent: "#25555c",
    navBg: "#bdccce"
  },
  dark: {
    font: "'Montserrat', sans-serif",
    background: "#111",
    foreground: "#fdfdfd",
    accent: "#0050b3",
    navBg: "#222"
  }
};

let currentTheme = localStorage.getItem("theme") || "light";

function applyTheme(theme) {
  const t = THEMES[theme];
  document.body.style.fontFamily = t.font;
  document.body.style.backgroundColor = t.background;
  document.body.style.color = t.foreground;

  const styleTag = document.getElementById("theme-style") || document.createElement("style");
  styleTag.id = "theme-style";
  styleTag.innerHTML = `
    header, footer { background: ${t.accent}; }
    aside { background: ${t.navBg}; }
    nav a { color: ${t.foreground}; background: rgba(255,255,255,0.1); }
    nav a:hover { background: rgba(255,255,255,0.3); }
  `;
  if (!document.head.contains(styleTag)) document.head.appendChild(styleTag);
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);
  applyTheme(currentTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  document.title = BLOG_TITLE;
  applyTheme(currentTheme);
  const header = document.querySelector("header");
  if (header) {
    header.innerHTML = `
      <img src="logo.png" alt="Logo" style="height: 160px;">
      <h1>${BLOG_TITLE}</h1>
      <nav>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="#" onclick="toggleTheme()" title="Toggle light/dark mode">🌓</a>
      </nav>
    `;
  }
  const footer = document.querySelector("footer");
  if (footer) {
    footer.innerHTML = `<p>${COPYRIGHT_NOTICE}</p>`;
  }
});
