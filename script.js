document.documentElement.classList.remove('no-js');
// Preserve shared bookmarks after the reading archive moved to its own page.
function redirectLibraryBookmark() {
  if (/^#(?:legacy-story-|legacy-google-reviews$|client-experience-archive$)/.test(location.hash)) {
    location.replace(new URL('client-stories.html' + location.hash, location.href));
  } else if (/^#legacy-/.test(location.hash) && !document.getElementById(location.hash.slice(1))) {
    location.replace(new URL('practice.html' + location.hash, location.href));
  }
  if (/^#nutrition-(?:articles|article-\d+|tips|tip-\d+|videos|press)$/.test(location.hash)) {
    location.replace(new URL('library.html' + location.hash, location.href));
  }
}
redirectLibraryBookmark();
window.addEventListener('hashchange', redirectLibraryBookmark);
const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('click', (e) => { if (!e.target.closest('.header')) closeMenu(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
const dialog = document.querySelector('#photo-dialog');
document.querySelectorAll('.gallery-tile').forEach((tile) => {
  tile.addEventListener('click', () => {
    const img = document.querySelector('#dialog-photo');
    img.src = tile.dataset.photo;
    img.alt = tile.dataset.title;
    const window = img.parentElement;
    window.classList.toggle('full-photo', tile.dataset.fullPhoto === 'true');
    window.style.setProperty('--x', tile.dataset.x);
    window.style.setProperty('--y', tile.dataset.y);
    document.querySelector('#photo-title').textContent = tile.dataset.title;
    document.querySelector('#photo-caption').textContent = tile.dataset.caption;
    dialog.showModal();
  });
});
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

// Search all service cards, including those inside collapsed disclosure panels.
const search = document.querySelector('#service-search');
if (search) {
  const cards = [...document.querySelectorAll('[data-service-card]')];
  const panels = [...new Set(cards.map(card => card.closest('details')).filter(Boolean))];
  let panelState = null;
  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase();
    if (query && !panelState) panelState = panels.map(panel => panel.open);
    let count = 0;
    cards.forEach(card => {
      const match = !query || card.textContent.toLocaleLowerCase().includes(query);
      card.hidden = !match;
      if (match) count++;
    });
    panels.forEach((panel, index) => {
      if (query) panel.open = [...panel.querySelectorAll('[data-service-card]')].some(card => !card.hidden);
      else if (panelState) panel.open = panelState[index];
    });
    if (!query) panelState = null;
    document.querySelector('#service-search-status').textContent = query
      ? `${count} ${count === 1 ? 'service matches' : 'services match'} your search.${count ? '' : ' Try another term or contact the team for guidance.'}`
      : `Browse all ${cards.length} services.`;
  });
}

// Reveal deep-linked content even when it sits inside nested native disclosures.
function revealLinkedContent() {
  let target;
  try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); }
  catch (_) { return; }
  if (!target) return;
  let parent = target;
  while (parent) {
    if (parent.tagName === 'DETAILS') parent.open = true;
    parent = parent.parentElement;
  }
  requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
}
window.addEventListener('hashchange', revealLinkedContent);
if (location.hash) revealLinkedContent();

// A closed disclosure must also reopen when its existing hash is selected again.
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (link && link.hash === location.hash) revealLinkedContent();
});
