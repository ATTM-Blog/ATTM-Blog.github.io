
// JavaScript from previous implementation retained
let allPosts = [];
let currentPage = 1;
const postsPerPage = 5;

async function loadPosts() {
  const res = await fetch('posts.json');
  allPosts = await res.json();
  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  setupViewToggles();
  renderPosts(allPosts);
  buildDateNav();
  buildTagCloud();
  setupSearch();
}

function renderPosts(posts) {
  const postContainer = document.getElementById('posts');
  const pagination = document.getElementById('pagination');
  postContainer.innerHTML = '';

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const visiblePosts = posts.slice(start, end);

  visiblePosts.forEach(post => {
    const article = document.createElement('article');
    article.innerHTML = `
      <h2>${post.title}</h2>
      <p><em>${post.date}</em></p>
      <div>${marked.parse(post.content)}</div>
      <div class="tags">${post.tags.map(t => `<span data-tag="${t}">${t}</span>`).join(' ')}</div>
    `;
    postContainer.appendChild(article);
  });

  pagination.innerHTML = '';
  if (totalPages > 1) {
    if (currentPage > 1) {
      const prev = document.createElement('button');
      prev.textContent = 'Previous';
      prev.onclick = () => { currentPage--; renderPosts(posts); };
      pagination.appendChild(prev);
    }
    if (currentPage < totalPages) {
      const next = document.createElement('button');
      next.textContent = 'Next';
      next.onclick = () => { currentPage++; renderPosts(posts); };
      pagination.appendChild(next);
    }
  }

  document.querySelectorAll('.tags span').forEach(tag => {
    tag.addEventListener('click', () => {
      currentPage = 1;
      renderPosts(allPosts.filter(p => p.tags.includes(tag.dataset.tag)));
    });
  });
}

function buildDateNav() {
  const dateNav = document.getElementById('date-nav');
  const grouped = {};
  allPosts.forEach(p => {
    const [year, month] = p.date.split('-');
    if (!grouped[year]) grouped[year] = {};
    if (!grouped[year][month]) grouped[year][month] = [];
    grouped[year][month].push(p);
  });
  dateNav.innerHTML = '';
  for (const year in grouped) {
    const yearDiv = document.createElement('div');
    yearDiv.textContent = year;
    yearDiv.style.fontWeight = 'bold';
    yearDiv.style.marginTop = '0.5rem';
    dateNav.appendChild(yearDiv);
    for (const month in grouped[year]) {
      const monthDiv = document.createElement('div');
      monthDiv.textContent = `— ${month}`;
      monthDiv.style.cursor = 'pointer';
      monthDiv.style.marginLeft = '10px';
      monthDiv.addEventListener('click', () => {
        currentPage = 1;
        renderPosts(grouped[year][month]);
      });
      dateNav.appendChild(monthDiv);
    }
  }
}

function buildTagCloud() {
  const tagNav = document.getElementById('tag-nav');
  const tagCounts = {};
  allPosts.forEach(p => {
    p.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  tagNav.innerHTML = '';
  Object.keys(tagCounts).forEach(tag => {
    const size = 0.8 + tagCounts[tag] * 0.2;
    const tagDiv = document.createElement('div');
    tagDiv.textContent = tag;
    tagDiv.style.fontSize = `${size}rem`;
    tagDiv.style.cursor = 'pointer';
    tagDiv.addEventListener('click', () => {
      currentPage = 1;
      renderPosts(allPosts.filter(p => p.tags.includes(tag)));
    });
    tagNav.appendChild(tagDiv);
  });
}

function setupSearch() {
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = allPosts.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.content.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query))
    );
    currentPage = 1;
    renderPosts(filtered);
  });
}

function setupViewToggles() {
  document.querySelectorAll('.view-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      currentPage = 1;
      if (view === 'all') {
        renderPosts(allPosts);
      } else if (view === 'archive') {
        renderPosts(allPosts);
      } else if (view === 'tags') {
        document.getElementById('posts').innerHTML = '<p>Select a tag from the cloud on the left.</p>';
        document.getElementById('pagination').innerHTML = '';
      }
    });
  });
}

window.onload = loadPosts;
