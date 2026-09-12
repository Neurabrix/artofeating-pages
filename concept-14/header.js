/* Keep anchor targets and the mobile menu clear of the rendered sticky shell. */
(() => {
  const header = document.querySelector('.header');
  if (!header) return;
  const actions = document.querySelector('.mobile-actions');
  const navigation = header.querySelector('#navigation');
  const socials = header.querySelector('.header-socials');
  const originalParent = socials.parentNode;
  const originalNext = socials.nextSibling;
  const mobile = matchMedia('(max-width: 960px)');
  const placeContacts = () => {
    if (mobile.matches) navigation.appendChild(socials);
    else originalParent.insertBefore(socials, originalNext);
  };
  placeContacts();
  mobile.addEventListener('change', placeContacts);
  const update = () => {
    const root = document.documentElement.style;
    root.setProperty('--site-header-height', `${Math.ceil(header.getBoundingClientRect().height)}px`);
    root.setProperty('--site-actions-height', `${Math.ceil(actions?.getBoundingClientRect().height || 0)}px`);
  };
  update();
  const observer = new ResizeObserver(update);
  observer.observe(header);
  if (actions) observer.observe(actions);
})();
