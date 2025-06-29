
async function loadPosts() {
  const postContainer = document.getElementById("blog-posts");
  const aside = document.querySelector("aside");
  try {
    const res = await fetch("posts.json");
    const posts = await res.json();
    postContainer.innerHTML = "";
    const tagMap = new Map();
    const dateTree = {};

    posts.forEach(post => {
      // Render main blog post
      const article = document.createElement("article");
      article.innerHTML = `
        <h2>${post.title}</h2>
        <div class="tags">${(post.tags || []).map(tag => `<span>#${tag}</span>`).join(" ")}</div>
        <div>${post.content}</div>
      `;
      postContainer.appendChild(article);

      // Build tag cloud
      (post.tags || []).forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });

      // Build date tree
      const [y, m, d] = post.date.split("-");
      if (!dateTree[y]) dateTree[y] = {};
      if (!dateTree[y][m]) dateTree[y][m] = [];
      dateTree[y][m].push(post.title);
    });

    // Render aside (tag cloud + date tree)
    let asideHTML = "<h3>Tags</h3><div class='tag-cloud'>";
    for (let [tag, count] of tagMap.entries()) {
      asideHTML += `<span style="font-size:${0.8 + count * 0.1}rem;">#${tag}</span> `;
    }
    asideHTML += "</div><h3>Archive</h3><ul>";
    for (let y in dateTree) {
      asideHTML += `<li><strong>${y}</strong><ul>`;
      for (let m in dateTree[y]) {
        asideHTML += `<li>${m}<ul>`;
        dateTree[y][m].forEach(title => {
          asideHTML += `<li>${title}</li>`;
        });
        asideHTML += "</ul></li>";
      }
      asideHTML += "</ul></li>";
    }
    asideHTML += "</ul>";
    aside.innerHTML = asideHTML;

  } catch (err) {
    postContainer.innerHTML = "<p>Failed to load posts.</p>";
    console.error(err);
  }
}
document.addEventListener("DOMContentLoaded", loadPosts);
