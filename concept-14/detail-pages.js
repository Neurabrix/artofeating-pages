(() => {
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('#navigation');
  const closeMenu = () => {
    menu?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('open');
  };
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('open', open);
  });
  nav?.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav?.classList.contains('open')) {
      closeMenu();
      menu?.focus();
    }
  });

  const search = document.querySelector('#service-search');
  if (search) {
    const cards = [...document.querySelectorAll('[data-service-card]')];
    const panels = [...new Set(cards.map(card => card.closest('details')).filter(Boolean))];
    const status = document.querySelector('#service-search-status');
    const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    search.addEventListener('input', () => {
      const words = normalize(search.value).split(/\s+/).filter(Boolean);
      let visible = 0;
      cards.forEach(card => {
        card.hidden = !words.every(word => normalize(card.textContent).includes(word));
        if (!card.hidden) visible += 1;
      });
      panels.forEach(panel => {
        if (words.length) panel.open = [...panel.querySelectorAll('[data-service-card]')].some(card => !card.hidden);
      });
      status.textContent = words.length ? `${visible} ${visible === 1 ? 'service matches' : 'services match'} your search.` : `Browse all ${cards.length} services.`;
    });
  }

  const dialog = document.querySelector('#photo-dialog');
  if (dialog) {
    const image = dialog.querySelector('#dialog-photo');
    const title = dialog.querySelector('#photo-title');
    const caption = dialog.querySelector('#photo-caption');
    let trigger;
    document.querySelectorAll('.gallery-tile').forEach(tile => tile.addEventListener('click', () => {
      trigger = tile;
      image.src = tile.dataset.photo;
      image.alt = tile.dataset.title;
      title.textContent = tile.dataset.title;
      caption.textContent = tile.dataset.caption;
      dialog.classList.toggle('individual-photo-dialog', tile.classList.contains('individual-photo-card'));
      dialog.showModal();
    }));
    dialog.querySelector('.close')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => trigger?.focus());
  }
  const revealLinkedContent = () => {
    let target;
    try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); }
    catch (_) { return; }
    for (let node = target; node; node = node.parentElement) {
      if (node.tagName === 'DETAILS') node.open = true;
    }
    requestAnimationFrame(() => target?.scrollIntoView({ block: 'start' }));
  };
  window.addEventListener('hashchange', revealLinkedContent);
  document.documentElement.classList.remove('no-js');
  if (location.hash) revealLinkedContent();
})();
