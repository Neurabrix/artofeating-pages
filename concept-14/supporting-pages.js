(() => {
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#navigation');
  const close = () => {menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open');};
  menu.addEventListener('click', () => {const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);});
  nav.addEventListener('click', e => {if(e.target.closest('a')) close();});
  document.addEventListener('click', e => {if(!e.target.closest('.header')) close();});
  document.addEventListener('keydown', e => {if(e.key === 'Escape' && nav.classList.contains('open')) {close(); menu.focus();}});
  const stories = [...document.querySelectorAll('.legacy-experience-story')];
  const search = document.querySelector('#story-search');
  const more = document.querySelector('#story-more');
  const collection = document.querySelector('#all-client-stories');
  const pageSize = 12;
  let limit = pageSize;
  let matches = stories;
  const normalize = s => s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const text = new Map(stories.map(s => [s, normalize(s.textContent)]));
  function render() {
    if(!search) return;
    const words = normalize(search.value).split(/\s+/).filter(Boolean);
    matches = stories.filter(s => words.every(w => text.get(s).includes(w)));
    const visible = new Set(matches.slice(0, limit));
    stories.forEach(s => {s.hidden = !visible.has(s); if(s.hidden) s.open = false;});
    document.querySelector('#story-status').textContent = `Showing ${visible.size} of ${matches.length} stories`;
    document.querySelector('#story-empty').hidden = matches.length !== 0;
    more.hidden = limit >= matches.length;
    more.textContent = `Show ${Math.min(pageSize, matches.length - limit)} more`;
  }
  function reveal() {
    let target;
    try {target = document.getElementById(decodeURIComponent(location.hash.slice(1)));} catch (_) {return;}
    if(!target) return;
    const story = target.closest('.legacy-experience-story');
    if(story) {search.value = ''; limit = Math.ceil((stories.indexOf(story) + 1) / pageSize) * pageSize; render();}
    for(let node = target; node; node = node.parentElement) if(node.tagName === 'DETAILS') node.open = true;
    requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
  }
  if(search) {
    const controls = document.querySelector('.story-controls');
    controls.hidden = false;
    controls.addEventListener('submit', e => e.preventDefault());
    search.addEventListener('input', () => {collection.open = true; limit = pageSize; render();});
    controls.addEventListener('reset', e => {e.preventDefault(); search.value = ''; limit = pageSize; render(); search.focus();});
    more.addEventListener('click', () => {const next = matches[limit]; limit += pageSize; render(); next?.querySelector('summary').focus({preventScroll:true}); next?.scrollIntoView({block:'start'});});
    render();
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
