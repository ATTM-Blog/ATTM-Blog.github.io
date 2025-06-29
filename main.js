
async function loadPosts() {
  const container = document.getElementById("blog-posts");
  try {
    const res = await fetch("posts.json");
    const posts = await res.json();
    container.innerHTML = "";
    posts.forEach(post => {
      const article = document.createElement("article");
      article.innerHTML = `
        <h2>${post.title}</h2>
        <div class="tags">${(post.tags || []).map(tag => `<span>#${tag}</span>`).join(" ")}</div>
        <div>${post.content}</div>
      `;
      container.appendChild(article);
    });
  } catch (err) {
    container.innerHTML = "<p>Failed to load posts.</p>";
    console.error(err);
  }
}
document.addEventListener("DOMContentLoaded", loadPosts);
