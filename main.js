
let posts = [];

async function loadPosts() {
  const res = await fetch('posts.json');
  posts = await res.json();
  showAll();
}

function showAll() {
  const container = document.getElementById('blogContainer');
  container.innerHTML = posts.map(renderPost).join('');
}

function showArchive() {
  const grouped = posts.reduce((acc, p) => {
    const year = new Date(p.date).getFullYear();
    acc[year] = acc[year] || [];
    acc[year].push(p);
    return acc;
  }, {});
  let html = '';
  for (const year in grouped) {
    html += `<h2>${year}</h2>` + grouped[year].map(renderPost).join('');
  }
  document.getElementById('blogContainer').innerHTML = html;
}

function showTags() {
  const tags = {};
  posts.forEach(p => {
    (p.tags || []).forEach(t => {
      tags[t] = (tags[t] || 0) + 1;
    });
  });
  const cloud = Object.entries(tags).map(([tag, count]) =>
    `<a href="#" onclick="filterByTag('${tag}')">${tag} (${count})</a>`
  ).join(', ');
  document.getElementById('blogContainer').innerHTML = `<h2>Tags</h2><p>${cloud}</p>`;
}

function filterByTag(tag) {
  const filtered = posts.filter(p => (p.tags || []).includes(tag));
  document.getElementById('blogContainer').innerHTML =
    `<h2>Posts tagged "${tag}"</h2>` + filtered.map(renderPost).join('');
}

function renderPost(p) {
  return `
    <article>
      <h2>${p.title}</h2>
      <p><small>${p.date}</small> – Tags: ${(p.tags || []).join(', ')}</p>
      <div>${p.content}</div>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", loadPosts);
