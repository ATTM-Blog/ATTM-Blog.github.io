
const BLOG_TITLE = "My IBM-Inspired Blog";
const COPYRIGHT_NOTICE = "© 2025 My IBM-Inspired Blog";
const LOGO_SRC = "logo.png";

function injectHeader() {
  document.querySelector("header").innerHTML = `
    <div style="display:flex;align-items:center;gap:1rem;">
      <img src="${LOGO_SRC}" alt="Logo" style="height:40px;">
      <h1>${BLOG_TITLE}</h1>
    </div>
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <div id="controls">
        <button onclick="toggleDarkMode()">🌓</button>
        <button onclick="adjustFontSize(1)">A+</button>
        <button onclick="adjustFontSize(-1)">A-</button>
        <button onclick="adjustFontWeight()">Bold</button>
      </div>
    </nav>
  `;
}

function injectFooter() {
  document.querySelector("footer").innerHTML = COPYRIGHT_NOTICE;
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

function adjustFontSize(delta) {
  let size = parseFloat(getComputedStyle(document.body).fontSize);
  size = Math.max(12, Math.min(24, size + delta));
  document.body.style.setProperty('--font-size', size + 'px');
}

function adjustFontWeight() {
  const currWeight = document.body.style.getPropertyValue('--font-weight');
  document.body.style.setProperty('--font-weight', currWeight === '700' ? '400' : '700');
}

document.addEventListener("DOMContentLoaded", () => {
  injectHeader();
  injectFooter();
});
