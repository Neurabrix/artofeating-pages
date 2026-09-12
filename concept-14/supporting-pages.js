(() => {
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#navigation');
  const close = () => {menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open');};
  menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);});
  nav.addEventListener('click', e => {if(e.target.closest('a')) close();});
  document.addEventListener('click', e => {if(!e.target.closest('.header')) close();});
  document.addEventListener('keydown', e => {if(e.key === 'Escape' && nav.classList.contains('open')) {close(); menu.focus();}});
  if (document.querySelector('#stories-browser')) return;
  const stories = [...document.querySelectorAll('.legacy-experience-story')];
  const search = document.querySelector('#story-search');
  const collection = document.querySelector('#all-client-stories');
  const storyPagination = document.querySelector('#story-pagination');
  const storyPrevious = document.querySelector('#story-prev');
  const storyNext = document.querySelector('#story-next');
  const storyPagePicker = document.querySelector('#story-page-picker');
  const compactViewport = matchMedia('(max-width: 760px)').matches;
  const storyPageSize = compactViewport ? 6 : 12;
  let storyPage = 0;
  let matches = stories;
  const normalize = s => s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const text = new Map(stories.map(s => [s, normalize(s.textContent)]));
  function renderPagePicker(container, pageCount, currentPage, controlledId) {
    if(!container) return;
    container.replaceChildren();
    container.hidden = pageCount <= 1;
    if(pageCount <= 1) return;
    const last = pageCount - 1;
    const compactCandidates = currentPage <= 1
      ? [0, 1, 2, last]
      : currentPage >= last - 1
        ? [0, last - 2, last - 1, last]
        : [0, currentPage - 1, currentPage, currentPage + 1, last];
    const wideCandidates = currentPage <= 2
      ? [0, 1, 2, 3, last - 1, last]
      : currentPage >= last - 2
        ? [0, 1, last - 3, last - 2, last - 1, last]
        : [0, 1, currentPage - 1, currentPage, currentPage + 1, last - 1, last];
    const candidates = compactViewport
      ? compactCandidates
      : wideCandidates;
    const pages = [...new Set(candidates.filter(page => page >= 0 && page <= last))].sort((a, b) => a - b);
    pages.forEach((page, index) => {
      if(index && page - pages[index - 1] > 1) {
        const gap = document.createElement('span');
        gap.textContent = '…';
        gap.setAttribute('aria-hidden', 'true');
        container.append(gap);
      }
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.page = String(page);
      button.textContent = String(page + 1);
      button.setAttribute('aria-label', 'Go to page ' + (page + 1) + ' of ' + pageCount);
      button.setAttribute('aria-controls', controlledId);
      if(page === currentPage) {
        button.setAttribute('aria-current', 'page');
        button.disabled = true;
      }
      container.append(button);
    });
  }
  function rangeLabel(noun, start, end, total) {
    const label = total === 1 ? noun : noun === 'story' ? 'stories' : `${noun}s`;
    return `${label} ${start}${start === end ? '' : `–${end}`} of ${total}`;
  }
  function renderStories() {
    if(!search) return;
    const words = normalize(search.value).split(/\s+/).filter(Boolean);
    matches = stories.filter(s => words.every(w => text.get(s).includes(w)));
    const pageCount = Math.max(1, Math.ceil(matches.length / storyPageSize));
    storyPage = Math.min(storyPage, pageCount - 1);
    const start = storyPage * storyPageSize;
    const end = Math.min(start + storyPageSize, matches.length);
    const visible = new Set(matches.slice(start, end));
    stories.forEach(s => {s.hidden = !visible.has(s); if(s.hidden) s.open = false;});
    document.querySelector('#story-status').textContent = `${matches.length} ${matches.length === 1 ? 'story' : 'stories'} available`;
    document.querySelector('#story-empty').hidden = matches.length !== 0;
    storyPagination.hidden = matches.length === 0;
    storyPrevious.disabled = storyPage === 0;
    storyNext.disabled = storyPage >= pageCount - 1;
    renderPagePicker(storyPagePicker, pageCount, storyPage, 'story-results');
    document.querySelector('#story-page-status').textContent = matches.length
      ? `Page ${storyPage + 1} of ${pageCount} · ${rangeLabel('story', start + 1, end, matches.length)}`
      : 'No matching stories';
  }
  function goToStoryPage(page) {
    storyPage = page;
    renderStories();
    const first = matches[storyPage * storyPageSize];
    requestAnimationFrame(() => {
      first?.querySelector('summary').focus({preventScroll:true});
      first?.scrollIntoView({block:'start'});
    });
  }
  function moveStoryPage(change) {goToStoryPage(storyPage + change);}
  function reveal() {
    let target;
    try {target = document.getElementById(decodeURIComponent(location.hash.slice(1)));} catch (_) {return;}
    if(!target) return;
    const story = target.closest('.legacy-experience-story');
    if(story) {search.value = ''; storyPage = Math.floor(stories.indexOf(story) / storyPageSize); renderStories();}
    for(let node = target; node; node = node.parentElement) if(node.tagName === 'DETAILS') node.open = true;
    requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
  }
  if(search) {
    const controls = document.querySelector('.story-controls');
    controls.hidden = false;
    controls.addEventListener('submit', e => e.preventDefault());
    search.addEventListener('input', () => {collection.open = true; storyPage = 0; renderStories();});
    controls.addEventListener('reset', e => {e.preventDefault(); search.value = ''; storyPage = 0; renderStories(); search.focus();});
    storyPrevious.addEventListener('click', () => moveStoryPage(-1));
    storyNext.addEventListener('click', () => moveStoryPage(1));
    storyPagePicker?.addEventListener('click', e => {
      const button = e.target.closest('button[data-page]');
      if(button) goToStoryPage(Number(button.dataset.page));
    });
    renderStories();
  }
  const reviews = [...document.querySelectorAll('#legacy-google-reviews .legacy-review-card')];
  const reviewPagination = document.querySelector('#review-pagination');
  const reviewPrevious = document.querySelector('#review-prev');
  const reviewNext = document.querySelector('#review-next');
  const reviewPagePicker = document.querySelector('#review-page-picker');
  const reviewPageSize = compactViewport ? 1 : 2;
  let reviewPage = 0;
  function renderReviews() {
    if(!reviews.length) return;
    const pageCount = Math.ceil(reviews.length / reviewPageSize);
    const start = reviewPage * reviewPageSize;
    const end = Math.min(start + reviewPageSize, reviews.length);
    reviews.forEach((review, index) => {review.hidden = index < start || index >= end;});
    reviewPagination.hidden = false;
    reviewPrevious.disabled = reviewPage === 0;
    reviewNext.disabled = reviewPage >= pageCount - 1;
    renderPagePicker(reviewPagePicker, pageCount, reviewPage, 'review-results');
    document.querySelector('#review-page-status').textContent = `Page ${reviewPage + 1} of ${pageCount} · ${rangeLabel('review', start + 1, end, reviews.length)}`;
  }
  function goToReviewPage(page) {
    reviewPage = page;
    renderReviews();
    requestAnimationFrame(() => reviews[reviewPage * reviewPageSize]?.scrollIntoView({block:'start'}));
  }
  function moveReviewPage(change) {goToReviewPage(reviewPage + change);}
  if(reviews.length) {
    reviewPrevious.addEventListener('click', () => moveReviewPage(-1));
    reviewNext.addEventListener('click', () => moveReviewPage(1));
    reviewPagePicker?.addEventListener('click', e => {
      const button = e.target.closest('button[data-page]');
      if(button) goToReviewPage(Number(button.dataset.page));
    });
    renderReviews();
  }
  window.addEventListener('hashchange', reveal);
  document.addEventListener('click', e => {
    const storyLink = e.target.closest('[data-story-target]');
    if(storyLink) {
      e.preventDefault();
      history.pushState(null, '', '#' + encodeURIComponent(storyLink.dataset.storyTarget));
      reveal();
      return;
    }
    const a=e.target.closest('a[href^="#"]');
    if(a?.hash === location.hash) reveal();
  });
  document.documentElement.classList.remove('no-js');
  reveal();
})();
