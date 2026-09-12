(() => {
  const section = document.querySelector('#podcasts');
  if (!section) return;
  const form = section.querySelector('form');
  const search = section.querySelector('#podcast-search');
  const series = section.querySelector('#podcast-series');
  const sort = section.querySelector('#podcast-sort');
  const results = section.querySelector('#podcast-results');
  const cards = [...results.children];
  const more = section.querySelector('#podcast-more');
  const normalize = text => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const pageSize = 6;
  let limit = pageSize;
  let matching = [];
  function render(save = false) {
    const words = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    const ordered = [...cards].sort((a, b) => {
      const difference = Date.parse(a.dataset.published) - Date.parse(b.dataset.published);
      return (sort.value === 'oldest' ? 1 : -1) * (difference || a.id.localeCompare(b.id));
    });
    matching = ordered.filter(card => (series.value === 'all' || card.dataset.series === series.value)
      && words.every(word => normalize(card.textContent).includes(word)));
    const visible = new Set(matching.slice(0, limit));
    ordered.forEach(card => { card.hidden = !visible.has(card); results.appendChild(card); });
    section.querySelector('#podcast-status').textContent = `Showing ${visible.size} of ${matching.length} episodes · ${sort.value === 'oldest' ? 'Oldest first' : 'Newest first'}`;
    section.querySelector('#podcast-empty').hidden = matching.length !== 0;
    more.hidden = limit >= matching.length;
    if (save) {
      const url = new URL(location.href);
      for (const [key, value, fallback] of [['podcast-q', search.value.trim(), ''], ['series', series.value, 'all'], ['podcast-sort', sort.value, 'newest']]) {
        if (value === fallback) url.searchParams.delete(key); else url.searchParams.set(key, value);
      }
      history.replaceState(null, '', url);
    }
  }
  function restore() {
    const url = new URL(location.href);
    search.value = url.searchParams.get('podcast-q') || '';
    const wanted = url.searchParams.get('series');
    series.value = [...series.options].some(option => option.value === wanted) ? wanted : 'all';
    sort.value = url.searchParams.get('podcast-sort') === 'oldest' ? 'oldest' : 'newest';
    limit = pageSize;
    let target;
    try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch (_) { /* Invalid fragments are harmless. */ }
    if (cards.includes(target)) {
      search.value = ''; series.value = 'all'; limit = cards.length;
    }
    render();
  }
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', () => { limit = pageSize; render(true); });
  form.addEventListener('reset', event => {
    event.preventDefault(); search.value = ''; series.value = 'all'; sort.value = 'newest'; limit = pageSize; render(true); search.focus();
  });
  more.addEventListener('click', () => {
    const next = matching[limit]; limit += pageSize; render();
    next?.querySelector('a').focus({preventScroll: true}); next?.scrollIntoView({block: 'start'});
  });
  window.addEventListener('popstate', restore);
  window.addEventListener('hashchange', restore);
  form.hidden = false;
  restore();
  document.documentElement.classList.add('podcasts-ready');
})();
