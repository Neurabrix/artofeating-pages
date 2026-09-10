/* Progressive full-screen reader/player. Originals remain usable without JavaScript. */
(() => {
  if (!window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal) return;
  const dialog = document.createElement('dialog');
  dialog.id = 'content-viewer';
  dialog.setAttribute('aria-labelledby', 'viewer-title');
  dialog.innerHTML = `<div class="viewer-shell">
    <div class="viewer-toolbar"><span class="viewer-brand">Art of Eating <span>/ Gallery & articles</span></span><button type="button" data-viewer-close autofocus aria-label="Close viewer" title="Close viewer"><svg class="utility-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 6 12 12M6 18 18 6"/></svg></button></div>
    <div class="reader-settings" role="group" aria-label="Reading preferences">
      <div class="reader-choice" data-reader-choice>
        <span class="reader-choice-label" id="reader-font-label">Font</span>
        <button type="button" class="reader-choice-trigger" id="reader-font" data-value="serif" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="reader-font-label reader-font-value"><span id="reader-font-value">Serif</span><span class="reader-choice-arrow" aria-hidden="true"></span></button>
        <div class="reader-choice-menu" id="reader-font-menu" role="listbox" aria-labelledby="reader-font-label" hidden><button type="button" role="option" data-value="serif" aria-selected="true">Serif</button><button type="button" role="option" data-value="sans" aria-selected="false">Sans serif</button><button type="button" role="option" data-value="mono" aria-selected="false">Monospace</button></div>
      </div>
      <label class="reader-size-label">Text size<input id="reader-size" type="range" min="16" max="30" step="1" value="20"></label>
      <div class="reader-choice" data-reader-choice>
        <span class="reader-choice-label" id="reader-theme-label">Theme</span>
        <button type="button" class="reader-choice-trigger" id="reader-theme" data-value="light" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="reader-theme-label reader-theme-value"><span id="reader-theme-value">Light</span><span class="reader-choice-arrow" aria-hidden="true"></span></button>
        <div class="reader-choice-menu reader-choice-menu-end" id="reader-theme-menu" role="listbox" aria-labelledby="reader-theme-label" hidden><button type="button" role="option" data-value="light" aria-selected="true">Light</button><button type="button" role="option" data-value="sepia" aria-selected="false">Sepia</button><button type="button" role="option" data-value="dark" aria-selected="false">Dark</button></div>
      </div>
    </div><progress class="reader-progress" max="100" value="0" aria-label="Reading progress"></progress>
    <div class="viewer-scroll" role="region" tabindex="0" aria-label="Content"><div class="viewer-content"><p class="viewer-meta"></p><h2 id="viewer-title"></h2><div class="reader-body"></div><div class="video-stage"></div><p class="viewer-source"></p></div></div>
  </div>`;
  document.body.append(dialog);
  const scroll = dialog.querySelector('.viewer-scroll');
  const body = dialog.querySelector('.reader-body');
  const stage = dialog.querySelector('.video-stage');
  const title = dialog.querySelector('#viewer-title');
  const meta = dialog.querySelector('.viewer-meta');
  const source = dialog.querySelector('.viewer-source');
  const settings = dialog.querySelector('.reader-settings');
  const progress = dialog.querySelector('progress');
  const font = dialog.querySelector('#reader-font');
  const size = dialog.querySelector('#reader-size');
  const theme = dialog.querySelector('#reader-theme');
  let current = null, trigger = null, savedY = 0;
  const key = 'aoe-reading-preferences';
  function choiceValue(choice) { return choice.dataset.value; }
  function setChoice(choice, value) {
    const menu = choice.closest('[data-reader-choice]').querySelector('.reader-choice-menu');
    const option = menu.querySelector(`[data-value="${value}"]`);
    if (!option) return;
    choice.dataset.value = value;
    choice.querySelector('span').textContent = option.textContent;
    menu.querySelectorAll('[role="option"]').forEach(item => item.setAttribute('aria-selected', String(item === option)));
  }
  function closeChoices(except = null) {
    dialog.querySelectorAll('[data-reader-choice]').forEach(choice => {
      if (choice === except) return;
      const button = choice.querySelector('.reader-choice-trigger');
      button.setAttribute('aria-expanded', 'false');
      choice.querySelector('.reader-choice-menu').hidden = true;
    });
  }
  dialog.querySelectorAll('[data-reader-choice]').forEach(choice => {
    const button = choice.querySelector('.reader-choice-trigger');
    const menu = choice.querySelector('.reader-choice-menu');
    const options = [...menu.querySelectorAll('[role="option"]')];
    function openChoice(key = '') {
      const opening = button.getAttribute('aria-expanded') !== 'true';
      closeChoices(opening ? choice : null);
      button.setAttribute('aria-expanded', String(opening));
      menu.hidden = !opening;
      if (opening && key) {
        const selected = Math.max(0, options.findIndex(item => item.getAttribute('aria-selected') === 'true'));
        const target = key === 'Home' ? 0 : key === 'End' ? options.length - 1 : key === 'ArrowUp' ? (selected - 1 + options.length) % options.length : (selected + 1) % options.length;
        options[target].focus();
      }
    }
    button.addEventListener('click', () => openChoice());
    button.addEventListener('keydown', event => {
      if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
      event.preventDefault();
      openChoice(event.key);
    });
    options.forEach((option, index) => {
      option.addEventListener('click', () => {
        setChoice(button, option.dataset.value);
        closeChoices();
        preferences(true);
        button.focus();
      });
      option.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          event.preventDefault(); event.stopPropagation(); closeChoices(); button.focus(); return;
        }
        if (event.key === 'Tab') { closeChoices(); return; }
        if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
        event.preventDefault();
        let next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
        options[next].focus();
      });
    });
  });
  dialog.addEventListener('pointerdown', event => {
    if (!event.target.closest('[data-reader-choice]')) closeChoices();
  });
  function preferences(save = false) {
    dialog.dataset.font = choiceValue(font);
    dialog.dataset.theme = choiceValue(theme);
    dialog.style.setProperty('--reader-size', size.value + 'px');
    size.setAttribute('aria-valuetext', size.value + ' pixels');
    if (save) { try { localStorage.setItem(key, JSON.stringify({font:choiceValue(font), size:size.value, theme:choiceValue(theme)})); } catch (_) { /* Private storage is optional. */ } }
    requestAnimationFrame(updateProgress);
  }
  try {
    const p = JSON.parse(localStorage.getItem(key) || '{}');
    if (['serif','sans','mono'].includes(p.font)) setChoice(font, p.font);
    if (Number.isFinite(Number(p.size)) && Number(p.size) >= 16 && Number(p.size) <= 30) size.value = p.size;
    if (['light','sepia','dark'].includes(p.theme)) setChoice(theme, p.theme);
  } catch (_) { /* Use defaults for unavailable or invalid storage. */ }
  function updateProgress() {
    const available = scroll.scrollHeight - scroll.clientHeight;
    progress.value = available > 0 ? Math.min(100, 100 * scroll.scrollTop / available) : 100;
  }
  size.addEventListener('input', () => preferences(true));
  scroll.addEventListener('scroll', updateProgress, {passive:true});
  window.addEventListener('resize', updateProgress);
  preferences();
  function embedURL(raw) {
    const url = new URL(raw, location.href);
    if (['www.youtube.com','youtube.com','youtu.be'].includes(url.hostname)) {
      const id = url.hostname === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v');
      if (id && /^[\w-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0`;
    }
    if (url.hostname === 'www.facebook.com' && /\/videos\/\d+\//.test(url.pathname)) return 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(url.href) + '&show_text=false&autoplay=false';
    return null;
  }
  function cleanup() {
    stage.replaceChildren(); // Removing the iframe stops playback and network activity.
    body.replaceChildren();
    document.body.classList.remove('viewer-open');
    document.body.style.top = '';
    window.scrollTo(0, savedY);
    current = null;
    const focus = trigger?.isConnected && trigger.getClientRects().length ? trigger : document.querySelector('#library-search');
    focus?.focus({preventScroll:true});
    trigger = null;
  }
  function close(clearHash = true) {
    if (!dialog.open) return;
    closeChoices();
    if (clearHash) { const url = new URL(location.href); url.hash = ''; history.replaceState(null, '', url); }
    dialog.close();
    cleanup();
  }
  dialog.querySelector('[data-viewer-close]').addEventListener('click', () => close());
  dialog.addEventListener('cancel', e => { e.preventDefault(); close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const expanded = dialog.querySelector('.reader-choice-trigger[aria-expanded="true"]');
      if (expanded) { event.preventDefault(); event.stopPropagation(); closeChoices(); expanded.focus(); }
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('a[href],button,select,input,iframe,[tabindex="0"]')]
      .filter(node => !node.disabled && node.getClientRects().length);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  function open(item, origin, writeHistory = true) {
    if (current === item.id && dialog.open) return;
    const kind = item.dataset.kind;
    const videoLink = kind === 'video' ? item.querySelector('h3 a') : null;
    const embed = videoLink && embedURL(videoLink.href);
    if (videoLink && !embed) return;
    if (!dialog.open) {
      trigger = origin || item.querySelector('summary,a');
      savedY = window.scrollY;
      document.body.style.top = `-${savedY}px`;
      document.body.classList.add('viewer-open');
    }
    current = item.id;
    dialog.dataset.kind = kind;
    title.textContent = item.dataset.title;
    meta.textContent = item.querySelector('.library-kind')?.textContent || '';
    body.replaceChildren(); stage.replaceChildren(); source.replaceChildren();
    const isReading = kind === 'article' || kind === 'tip';
    settings.hidden = !isReading;
    progress.hidden = !isReading;
    body.hidden = kind === 'video';
    stage.hidden = kind !== 'video';
    if (isReading) {
      const prose = item.querySelector('.legacy-library-prose');
      for (const node of prose.childNodes) body.append(node.cloneNode(true));
      // Avoid duplicate IDs when the retained article and its reader coexist.
      body.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
      body.querySelectorAll('.legacy-library-article-images[aria-label]').forEach(node => node.setAttribute('role', 'group'));
      const firstHeading = body.firstElementChild;
      const headingText = value => value.replace(/\s+/g, ' ').trim().toLocaleLowerCase();
      if (firstHeading?.matches('h1,h2,h3,h4') && headingText(firstHeading.textContent) === headingText(title.textContent)) {
        firstHeading.hidden = true; // The reader title already displays this source heading.
      }
      const words = prose.textContent.trim().split(/\s+/).length;
      meta.textContent += ` · ${Math.max(1, Math.ceil(words / 220))} min read`;
      item.open = false;
    } else if (kind === 'video') {
      const frame = document.createElement('iframe');
      frame.src = embed;
      frame.title = item.dataset.title;
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      stage.append(frame);
      source.append('Playback unavailable here? ');
      const link = document.createElement('a');
      link.href = videoLink.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.textContent = 'Watch on ' + (embed.includes('facebook.com') ? 'Facebook' : 'YouTube') + ' ↗';
      source.append(link);
    } else if (kind === 'press' || kind === 'photo') {
      const img = item.querySelector('img').cloneNode(true);
      img.loading = 'eager'; body.append(img);
      const caption = item.querySelector('figcaption');
      if (caption) body.append(caption.cloneNode(true));
      const link = item.querySelector('a');
      if (link) { const original = link.cloneNode(false); original.textContent = 'Open original image ↗'; source.append(original); }
      source.prepend(kind === 'photo' ? 'This is an original Art of Eating photo journal. ' : 'This feature is an original press image. ');
    }
    body.querySelectorAll('img').forEach(img => img.addEventListener('load', updateProgress, {once:true}));
    if (writeHistory) { const url = new URL(location.href); url.hash = item.id; history.pushState(null, '', url); }
    if (!dialog.open) dialog.showModal();
    scroll.scrollTop = 0;
    dialog.querySelector('[data-viewer-close]').focus({preventScroll:true});
    requestAnimationFrame(updateProgress);
  }
  document.querySelectorAll('.library-item').forEach(item => {
    const kind = item.dataset.kind;
    const targets = item.querySelectorAll(kind === 'video' ? '.library-thumbnail,h3 a' : (kind === 'press' || kind === 'photo') ? 'a:has(img)' : ':scope > summary');
    targets.forEach(target => {
      target.setAttribute('aria-haspopup', 'dialog');
      if (kind === 'video') {
        target.querySelectorAll('.legacy-library-new-window').forEach(hint => hint.hidden = true);
        if (target.hasAttribute('aria-label')) target.setAttribute('aria-label', 'Watch: ' + item.dataset.title);
      }
      target.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault(); open(item, target);
      });
    });
  });
  function restore() {
    let id; try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    const item = document.getElementById(id);
    if (item?.classList.contains('library-item')) open(item, null, false); else close(false);
  }
  window.addEventListener('hashchange', restore);
  window.addEventListener('popstate', restore);
  restore();
  // Initial fragment navigation can move focus after the deferred scripts run.
  window.addEventListener('load', () => requestAnimationFrame(() => {
    if (dialog.open && !dialog.contains(document.activeElement)) {
      dialog.querySelector('[data-viewer-close]').focus({preventScroll:true});
    }
  }), {once:true});
})();
