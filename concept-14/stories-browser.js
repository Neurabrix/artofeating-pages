(() => {
  const browser = document.querySelector('#stories-browser');
  if (!browser || typeof HTMLDialogElement === 'undefined') return;
  const $ = selector => document.querySelector(selector);
  const cards = [...browser.querySelectorAll('.story-card')];
  const originals = $('#stories-originals');
  const search = $('#story-search');
  const topics = [...browser.querySelectorAll('[data-topic]')];
  const tabs = [...browser.querySelectorAll('[role="tab"]')];
  const dialog = $('#story-reader');
  const compact = matchMedia('(max-width: 760px)');
  const normalize = text => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const sources = new Map(cards.map(card => [card.dataset.storyId, document.getElementById(card.dataset.storyId)]));
  const searchable = new Map(cards.map(card => [card, normalize(sources.get(card.dataset.storyId).textContent + ' ' + card.textContent)]));
  let page = 0, topic = 'all', matches = cards, reading = null;
  const pageSize = () => compact.matches ? 3 : 6;
  const reviews = [...$('#legacy-google-reviews').querySelectorAll('.legacy-review-card')];
  let reviewPage = 0;

  function render() {
    const words = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    matches = cards.filter(card => (topic === 'all' || card.dataset.topics.split(' ').includes(topic)) && words.every(word => searchable.get(card).includes(word)));
    const count = Math.max(1, Math.ceil(matches.length / pageSize()));
    page = Math.max(0, Math.min(page, count - 1));
    const start = page * pageSize();
    const visible = new Set(matches.slice(start, start + pageSize()));
    cards.forEach(card => { card.hidden = !visible.has(card); });
    $('#story-status').textContent = matches.length ? `Showing ${start + 1}–${Math.min(start + pageSize(), matches.length)} of ${matches.length} ${matches.length === 1 ? 'story' : 'stories'}` : 'No matching stories';
    $('#story-empty').hidden = matches.length !== 0;
    $('#story-pagination').hidden = count === 1;
    $('#story-prev').disabled = page === 0;
    $('#story-next').disabled = page === count - 1;
    $('#story-page-select').replaceChildren(...Array.from({length: count}, (_, index) => new Option(String(index + 1), String(index), false, index === page)));
    $('#story-page-total').textContent = `of ${count}`;
    topics.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.topic === topic)));
  }
  function reset() { search.value = ''; topic = 'all'; page = 0; render(); search.focus({preventScroll: true}); }
  function paginate(value) {
    page = value; render();
    const first = matches[page * pageSize()];
    first?.querySelector('a').focus({preventScroll: true});
    $('#story-status').scrollIntoView({block: 'start'});
  }
  function renderReviews() {
    const size = compact.matches ? 1 : 2;
    const count = Math.ceil(reviews.length / size);
    reviewPage = Math.min(reviewPage, count - 1);
    reviews.forEach((review, i) => { review.hidden = i < reviewPage * size || i >= (reviewPage + 1) * size; });
    $('#review-pagination').hidden = false;
    $('#review-prev').disabled = reviewPage === 0;
    $('#review-next').disabled = reviewPage === count - 1;
    $('#review-page-status').textContent = `Page ${reviewPage + 1} of ${count} · Reviews ${reviewPage * size + 1}–${Math.min((reviewPage + 1) * size, reviews.length)} of ${reviews.length}`;
  }
  function selectTab(tab) {
    tabs.forEach(button => {
      const active = button === tab;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      document.getElementById(button.getAttribute('aria-controls')).hidden = !active;
    });
  }
  function finishReading() {
    if (!reading) return;
    const saved = reading;
    reading = null;
    saved.identityParagraphs.forEach(node => node.removeAttribute('hidden'));
    saved.placeholder.replaceWith(saved.body);
    document.body.style.overflow = saved.overflow;
    saved.trigger?.focus({preventScroll: true});
    window.scrollTo(0, saved.scroll);
  }
  function openStory(id, trigger, push = true) {
    const story = sources.get(id);
    if (!story) return;
    if (reading?.id === id) return;
    if (dialog.open) { dialog.close(); finishReading(); }
    const body = story.querySelector('.legacy-experience-body');
    const placeholder = document.createComment('Original story position');
    const identity = value => normalize(value).replace(/[^a-z0-9]/g, '');
    const labels = [...story.querySelectorAll('summary strong, summary small')].map(node => identity(node.textContent));
    const identityParagraphs = [...body.querySelectorAll(':scope > p')].filter(node => !node.hasAttribute('hidden') && labels.includes(identity(node.textContent)));
    identityParagraphs.forEach(node => { node.hidden = true; });
    reading = {id, body, placeholder, identityParagraphs, trigger: trigger || $('#stories-tab'), scroll: scrollY, overflow: document.body.style.overflow, previousURL: location.href};
    body.replaceWith(placeholder);
    $('#reader-title').textContent = story.querySelector('summary strong').textContent;
    $('#reader-role').textContent = story.querySelector('summary small')?.textContent || '';
    $('#reader-body').replaceChildren(body);
    if (push) history.pushState({storyReader: true, returnURL: reading.previousURL}, '', '#' + id);
    document.body.style.overflow = 'hidden';
    dialog.showModal(); dialog.scrollTop = 0;
    $('#reader-title').focus({preventScroll: true});
  }
  function closeReader() {
    if (!reading) return;
    const returnURL = history.state?.storyReader ? history.state.returnURL : location.pathname + location.search;
    // Replace the reader fragment so closing never requires an asynchronous history
    // round trip; filters, pagination, scroll and keyboard focus stay in memory.
    history.replaceState(null, '', returnURL);
    dialog.close(); finishReading();
  }
  function revealHash() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (sources.has(id)) openStory(id, null, false);
    else {
      if (dialog.open) { dialog.close(); finishReading(); }
      if (id === 'legacy-google-reviews') selectTab($('#reviews-tab'));
      if (id === 'all-client-stories' || id === 'featured-client-stories') selectTab($('#stories-tab'));
    }
  }
  search.addEventListener('input', () => { page = 0; render(); });
  $('.stories-search').addEventListener('submit', event => event.preventDefault());
  $('.stories-search').addEventListener('reset', event => { event.preventDefault(); reset(); });
  $('#story-empty-reset').addEventListener('click', reset);
  topics.forEach(button => button.addEventListener('click', () => { topic = button.dataset.topic; page = 0; render(); }));
  $('#story-prev').addEventListener('click', () => paginate(page - 1));
  $('#story-next').addEventListener('click', () => paginate(page + 1));
  $('#story-page-select').addEventListener('change', event => paginate(Number(event.target.value)));
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      const keys = {ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1};
      if (!(event.key in keys)) return;
      event.preventDefault(); const next = tabs[keys[event.key]]; selectTab(next); next.focus();
    });
  });
  browser.addEventListener('click', event => {
    const action = event.target.closest('[data-story-target]');
    if (!action || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); openStory(action.dataset.storyTarget, action);
  });
  $('#reader-close').addEventListener('click', closeReader);
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeReader(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeReader(); } });
  $('#review-prev').addEventListener('click', () => { reviewPage--; renderReviews(); $('#legacy-google-reviews').scrollIntoView({block: 'start'}); });
  $('#review-next').addEventListener('click', () => { reviewPage++; renderReviews(); $('#legacy-google-reviews').scrollIntoView({block: 'start'}); });
  compact.addEventListener('change', () => { const first = page * (compact.matches ? 6 : 3); page = Math.floor(first / pageSize()); render(); renderReviews(); });
  window.addEventListener('hashchange', revealHash);
  window.addEventListener('popstate', revealHash);
  $('.stories-audio').addEventListener('toggle', event => { if (!event.target.open) event.target.querySelector('audio')?.pause(); });
  $('#reviews-panel').append($('#legacy-google-reviews'));
  render(); renderReviews();
  originals.hidden = true;
  $('#stories-reviews-original').hidden = true;
  browser.hidden = false;
  document.documentElement.classList.remove('no-js');
  document.body.classList.add('stories-enhanced');
  revealHash();
})();
