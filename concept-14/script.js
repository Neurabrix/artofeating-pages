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
const form = document.querySelector('#enquiry');
const interest = document.querySelector('#interest');
const program = document.querySelector('#program');
const speakerFields = document.querySelector('#speaker-fields');
const prepared = document.querySelector('#prepared');
const status = document.querySelector('#enquiry-status');
function updateFields() {
  const speaking = ['Speaking / keynote enquiry', 'Corporate Nutrition', 'School Health Talks', 'Community event enquiry'].includes(interest.value);
  speakerFields.hidden = !speaking;
  speakerFields.querySelectorAll('input').forEach((input) => { input.required = speaking; input.disabled = !speaking; });
  program.closest('label').hidden = speaking;
  program.disabled = speaking;
  form.elements.location.required = interest.value === 'Online / NRI consultation';
}
let formRevision = 0;
function invalidateEnquiry() { formRevision++; prepared.hidden = true; status.textContent = ''; }
form.addEventListener('input', invalidateEnquiry);
form.addEventListener('change', invalidateEnquiry);
interest.addEventListener('change', updateFields);
document.querySelectorAll('[data-interest], [data-program]').forEach((link) => {
  link.addEventListener('click', () => {
    const selected = link.dataset.program ? 'Program enquiry' : link.dataset.interest;
    if (![...interest.options].some((option) => option.value === selected)) interest.add(new Option(selected, selected));
    interest.value = selected;
    program.value = link.dataset.program || '';
    updateFields(); invalidateEnquiry();
    // Transfer keyboard focus to the selected field after native anchor navigation.
    setTimeout(() => interest.focus({ preventScroll: true }), 0);
  });
});
let submissionKey = null;
let submissionPayload = null;
const startedAt = Date.now();
if (form.dataset.endpoint) {
  form.querySelector('[type="submit"]').textContent = 'Send my enquiry ↗';
  form.querySelector(':scope > p').textContent = 'Send your enquiry to the Art of Eating team. Your appointment is confirmed separately.';
}
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const rows = [['Enquiry', data.get('interest')], ['Program', data.get('program')], ['Name', data.get('name')], ['Phone', data.get('phone')], ['Email', data.get('email')], ['Location / time zone', data.get('location')], ['Organisation', data.get('organisation')], ['Event', data.get('event')], ['Date', data.get('date')], ['Venue', data.get('venue')], ['Audience', data.get('audience')], ['Topic', data.get('topic')], ['Message', data.get('message')]];
  const message = 'Hello Art of Eating, I would like to enquire.\n\n' + rows.filter(([, value]) => value && String(value).trim()).map(([label, value]) => `${label}: ${String(value).trim()}`).join('\n') + '\n\nPlease confirm availability and the next steps.';
  document.querySelector('#whatsapp-enquiry').href = 'https://wa.me/916381501165?text=' + encodeURIComponent(message);
  document.querySelector('#email-enquiry').href = 'mailto:info@shinysurendran.com?subject=' + encodeURIComponent('Art of Eating — ' + interest.value) + '&body=' + encodeURIComponent(message);
  prepared.hidden = false;
  status.textContent = 'Your enquiry is ready, but has not been sent. Choose WhatsApp or email below, then send it in that app.';
  const sentRevision = formRevision;
  const endpoint = form.dataset.endpoint;
  if (!endpoint) {
    prepared.querySelector('a').focus({ preventScroll: true });
    return;
  }
  const payload = Object.fromEntries(data.entries());
  payload.consent = data.get('consent') === 'on';
  payload.website = data.get('website') || '';
  payload.startedAt = startedAt;
  const serialized = JSON.stringify(payload);
  if (serialized !== submissionPayload) {
    submissionKey = crypto.randomUUID();
    submissionPayload = serialized;
  }
  const submit = form.querySelector('[type="submit"]');
  submit.disabled = true;
  form.setAttribute('aria-busy', 'true');
  status.textContent = 'Sending your enquiry…';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': submissionKey },
      body: serialized, signal: controller.signal, credentials: 'omit'
    });
    const result = await response.json().catch(() => ({}));
    if (response.status !== 202 || result.status !== 'received' || !result.reference) throw new Error('not-confirmed');
    if (formRevision !== sentRevision) return;
    prepared.hidden = true;
    status.textContent = `Your enquiry has been received. Reference: ${result.reference}. The team will review it and contact you; your appointment is not yet confirmed.`;
  } catch (_) {
    if (formRevision !== sentRevision) return;
    prepared.hidden = false;
    status.textContent = 'We could not confirm receipt. You can retry, or choose WhatsApp or email below and send your enquiry in that app. Please mention if you already submitted it.';
  } finally {
    clearTimeout(timeout);
    submit.disabled = false;
    form.removeAttribute('aria-busy');
  }
});
updateFields();
form.querySelector('[type="submit"]').disabled = false;
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
