
const BLOG_TITLE = "According to the Model";
const COPYRIGHT_NOTICE = "© 2025 According to the Model Blog";

document.addEventListener("DOMContentLoaded", () => {
  document.title = BLOG_TITLE;
  const header = document.querySelector("header");
  if (header) {
    header.innerHTML = `
      <img src="logo.png" alt="Logo" style="height: 160px;">
      <h1>${BLOG_TITLE}</h1>
      <nav>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
      </nav>
    `;
    const toggleButton = document.createElement("button");
    toggleButton.className = "toggle-nav";
    toggleButton.innerHTML = "☰";
    toggleButton.onclick = () => {
      const aside = document.querySelector("aside");
      aside.classList.toggle("open");
    };
    header.appendChild(toggleButton);
  }
  const footer = document.querySelector("footer");
  if (footer) {
    footer.innerHTML = `<p>${COPYRIGHT_NOTICE}</p>`;
  }
});
