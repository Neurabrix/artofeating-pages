(() => {
  const menu = document.querySelector('.menu');
  const navigation = document.querySelector('#navigation');
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open);
  });
  document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); } });
  const controls = document.querySelector('.library-controls');
  const search = document.querySelector('#library-search');
  const topic = document.querySelector('#library-topic');
  const format = document.querySelector('#library-format');
  const status = document.querySelector('#library-status');
  const more = document.querySelector('#library-more');
  const items = [...document.querySelectorAll('.library-item')];
  const groups = [...document.querySelectorAll('.library-topic-group')];
  const results = document.querySelector('#library-results');
  const continuousReadFlow = document.querySelector('link[rel="canonical"][href$="/read/"]');
  const flow = continuousReadFlow ? document.createElement('div') : null;
  if (flow) {
    flow.className = 'library-flow';
    items.forEach(item => flow.appendChild(item));
    results.appendChild(flow);
  }
  const pageSize = 6;
  let limit = pageSize;
  let matching = [];
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const searchable = new Map(items.map(item => [item, normalize(item.textContent)]));
  function render(save = false) {
    const words = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    matching = items.filter(item => (topic.value === 'all' || item.dataset.topic === topic.value)
      && (!format || format.value === 'all' || item.dataset.kind === format.value)
      && words.every(word => searchable.get(item).includes(word)));
    const visible = new Set(matching.slice(0, limit));
    items.forEach(item => { item.hidden = !visible.has(item); if (item.hidden && item.tagName === 'DETAILS') item.open = false; });
    groups.forEach(group => { group.hidden = flow || !items.some(item => visible.has(item) && group.contains(item)); });
    status.textContent = matching.length ? `Showing ${visible.size} of ${matching.length} results` : 'No matching results';
    document.querySelector('#library-empty').hidden = matching.length !== 0;
    more.hidden = limit >= matching.length;
    more.textContent = `Show ${Math.min(pageSize, Math.max(0, matching.length - limit))} more`;
    if (save) {
      const url = new URL(location.href);
      for (const [key, value] of [['q', search.value.trim()], ['topic', topic.value], ['type', format?.value]]) {
        if (!value || value === 'all') url.searchParams.delete(key); else url.searchParams.set(key, value);
      }
      url.hash = '';
      history.replaceState(null, '', url);
    }
  }
  function restore() {
    const url = new URL(location.href);
    const assign = (select, value) => { select.value = [...select.options].some(o => o.value === value) ? value : 'all'; };
    search.value = url.searchParams.get('q') || '';
    assign(topic, url.searchParams.get('topic'));
    if (format) assign(format, url.searchParams.get('type'));
    limit = pageSize;
    const oldCollections = {'#nutrition-videos': 'video', '#nutrition-articles': 'article', '#nutrition-tips': 'tip', '#nutrition-press': 'press'};
    if (format && oldCollections[url.hash]) { format.value = oldCollections[url.hash]; topic.value = 'all'; search.value = ''; }
    let target;
    try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch (_) { /* Invalid fragment is harmless. */ }
    if (target?.classList.contains('library-item')) {
      topic.value = target.dataset.topic; if (format) format.value = 'all'; search.value = '';
      const index = items.filter(item => item.dataset.topic === topic.value).indexOf(target);
      limit = Math.ceil((index + 1) / pageSize) * pageSize;
    }
    if (target?.classList.contains('library-topic-group')) topic.value = target.id.replace('topic-', '');
    render();
    if (target && !target.hidden) {
      if (target.tagName === 'DETAILS') target.open = true;
      requestAnimationFrame(() => target.scrollIntoView({block: 'start'}));
    }
  }
  controls.addEventListener('submit', e => e.preventDefault());
  controls.addEventListener('input', () => { limit = pageSize; render(true); });
  controls.addEventListener('reset', e => {
    e.preventDefault(); search.value = ''; topic.value = 'all'; if (format) format.value = 'all'; limit = pageSize; render(true); search.focus();
  });
  more.addEventListener('click', () => {
    const firstNew = matching[limit]; limit += pageSize; render();
    const focus = firstNew?.querySelector('summary, a');
    if (focus) focus.focus({preventScroll: true});
    firstNew?.scrollIntoView({block: 'start'});
  });
  window.addEventListener('hashchange', restore);
  window.addEventListener('popstate', restore);
  groups.forEach(group => { group.open = true; });
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('library-enhanced');
  controls.hidden = false;
  restore();
})();
