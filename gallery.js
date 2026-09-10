(() => {
  const cards = [...document.querySelectorAll('[data-gallery-card]')];
  const groups = [...document.querySelectorAll('[data-gallery-group]')];
  const search = document.querySelector('#gallery-search');
  const searchPanel = document.querySelector('.gallery-search');
  const clear = document.querySelector('#gallery-search-clear');
  const status = document.querySelector('#gallery-search-status');
  const empty = document.querySelector('#gallery-empty');
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (search && searchPanel) {
    const filter = () => {
      const terms = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
      let count = 0;
      cards.forEach(card => {
        card.hidden = !terms.every(term => normalize(card.dataset.search).includes(term));
        if (!card.hidden) count++;
      });
      groups.forEach(group => { group.hidden = ![...group.querySelectorAll('[data-gallery-card]')].some(card => !card.hidden); });
      empty.hidden = count !== 0;
      clear.hidden = !search.value;
      status.textContent = terms.length ? count + ' of ' + cards.length + ' photos' : '';
    };
    search.addEventListener('input', filter);
    clear.addEventListener('click', () => { search.value = ''; filter(); search.focus(); });
    document.querySelectorAll('.gallery-collections a').forEach(link => {
      link.addEventListener('click', () => { search.value = ''; filter(); });
    });
    searchPanel.hidden = false;
  }
  const dialog = document.querySelector('#gallery-viewer');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const picture = dialog.querySelector('#gallery-viewer-image');
  const title = dialog.querySelector('#gallery-viewer-title');
  const position = dialog.querySelector('#gallery-viewer-position');
  const original = dialog.querySelector('#gallery-original');
  const previous = dialog.querySelector('#gallery-previous');
  const next = dialog.querySelector('#gallery-next');
  const close = dialog.querySelector('.gallery-viewer-close');
  let collection = [], index = 0, trigger = null;
  const render = () => {
    const link = collection[index];
    picture.src = link.href;
    picture.alt = link.dataset.caption;
    title.textContent = link.dataset.caption;
    original.href = link.href;
    position.textContent = (index + 1) + ' of ' + collection.length;
    previous.disabled = index === 0;
    next.disabled = index === collection.length - 1;
  };
  const move = delta => {
    const candidate = index + delta;
    if (candidate < 0 || candidate >= collection.length) return;
    index = candidate;
    render();
  };
  cards.forEach(card => {
    const link = card.querySelector('[data-gallery-photo]');
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      collection = cards.filter(item => !item.hidden).map(item => item.querySelector('[data-gallery-photo]'));
      index = collection.indexOf(link);
      trigger = link;
      render();
      dialog.showModal();
      close.focus();
    });
  });
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => { if (trigger) trigger.focus(); });
})();
