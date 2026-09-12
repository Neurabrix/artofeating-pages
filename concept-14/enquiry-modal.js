(() => {
  const endpoint = 'https://aoe-enquiries-thgyrefe4a-el.a.run.app/api/enquiries';
  const interests = [
    ['General consultation', 'General Consultation'],
    ['Metabolic Health', 'Metabolic Health'],
    ['Menopause Support', 'Menopause Support'],
    ['Sports & Fitness Nutrition', 'Sports & Fitness Nutrition'],
    ['Online / NRI consultation', 'Online / NRI Consultation'],
    ['Speaking / keynote enquiry', 'Speaking / Keynote Enquiry'],
    ['Corporate Nutrition', 'Corporate Nutrition'],
    ['School Health Talks', 'School Health Talks'],
    ['Community event enquiry', 'Community Event Enquiry'],
    ['Program enquiry', 'Program Enquiry']
  ];
  const programs = [
    '', 'One-month nutrition program', '100-day nutrition program',
    '100 days with Shiny', 'Sports nutrition program',
    'Pregnancy nutrition program'
  ];
  const speakingInterests = new Set([
    'Speaking / keynote enquiry', 'Corporate Nutrition',
    'School Health Talks', 'Community event enquiry'
  ]);

  const option = (value, label = value) => `<option value="${value}">${label}</option>`;
  const dialog = document.createElement('dialog');
  dialog.className = 'enquiry-modal';
  dialog.id = 'enquiry-dialog';
  dialog.setAttribute('aria-labelledby', 'enquiry-dialog-title');
  dialog.innerHTML = `
    <div class="enquiry-modal__panel">
      <div class="enquiry-modal__heading">
        <div><p class="eyebrow">Start a conversation</p><h2 id="enquiry-dialog-title">How can we help?</h2></div>
        <button class="enquiry-modal__close" type="button" aria-label="Close enquiry form">×</button>
      </div>
      <p class="enquiry-modal__intro">Send your enquiry to the Art of Eating team. Your appointment is confirmed separately.</p>
      <form class="enquiry enquiry-modal__form" id="enquiry-form" novalidate>
        <div class="form-trap" aria-hidden="true"><label>Leave this field empty<input name="website" tabindex="-1" autocomplete="off"></label></div>
        <div class="fields">
          <label class="wide">I’m interested in<select name="interest" required>${interests.map(([value, label]) => option(value, label)).join('')}</select></label>
          <label class="wide" data-program-field>Selected program<select name="program">${programs.map((value, index) => option(value, index ? value : 'Help me choose / no program selected')).join('')}</select></label>
          <label>Your name<input name="name" autocomplete="name" required maxlength="100" aria-describedby="enquiry-name-error"><span class="contact-error" id="enquiry-name-error"></span></label>
          <label>Phone number<input name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="30" aria-describedby="enquiry-phone-hint enquiry-phone-error"><span class="small" id="enquiry-phone-hint">India: 10 digits. Outside India: include + and the country code.</span><span class="contact-error" id="enquiry-phone-error"></span></label>
          <label class="wide">Email address<input name="email" type="email" autocomplete="email" required maxlength="150"></label>
          <label class="wide">City / country and time zone<input name="location" placeholder="For example: Chennai, India · IST" maxlength="150"></label>
          <div class="speaker-fields" data-speaker-fields hidden>
            <label>Organisation<input name="organisation" maxlength="150"></label>
            <label>Event name<input name="event" maxlength="150"></label>
            <label>Preferred date<input name="date" type="date"></label>
            <label>Venue / online setting<input name="venue" maxlength="150"></label>
            <label>Audience and size<input name="audience" maxlength="150"></label>
            <label>Topic / theme<input name="topic" maxlength="150"></label>
          </div>
          <label class="wide">Anything you’d like us to know? <span class="small">Please leave out medical reports and sensitive health details.</span><textarea name="message" rows="3" maxlength="600"></textarea></label>
        </div>
        <div class="enquiry-modal__actions"><button class="button" type="submit">Send my enquiry ↗</button><button class="text-link enquiry-modal__cancel" type="button">Cancel</button></div>
        <p class="enquiry-modal__status" role="status" aria-live="polite"></p>
        <div class="enquiry-modal__fallback" hidden><p>You can retry without re-entering your details, or contact the team directly.</p><a href="https://wa.me/916381501165" target="_blank" rel="noopener">Continue on WhatsApp ↗</a></div>
      </form>
      <div class="enquiry-modal__success" id="enquiry-success" hidden tabindex="-1"><h3>Thank you — your enquiry is saved.</h3><p data-success-message></p><button class="button enquiry-modal__done" type="button">Done</button></div>
    </div>`;
  document.body.append(dialog);

  const form = dialog.querySelector('form');
  const interest = form.elements.interest;
  const program = form.elements.program;
  const speakerFields = dialog.querySelector('[data-speaker-fields]');
  const programField = dialog.querySelector('[data-program-field]');
  const status = dialog.querySelector('.enquiry-modal__status');
  const fallback = dialog.querySelector('.enquiry-modal__fallback');
  const success = dialog.querySelector('.enquiry-modal__success');
  const submit = form.querySelector('[type="submit"]');
  let returnFocus = null;
  let startedAt = Date.now();
  let submissionKey = null;
  let submissionPayload = null;

  function updateFields() {
    const speaking = speakingInterests.has(interest.value);
    speakerFields.hidden = !speaking;
    speakerFields.querySelectorAll('input').forEach(input => {
      input.required = speaking;
      input.disabled = !speaking;
    });
    programField.hidden = interest.value !== 'Program enquiry';
    program.disabled = interest.value !== 'Program enquiry';
    form.elements.location.required = interest.value === 'Online / NRI consultation';
  }

  function validateContact(input) {
    const value = input.value.trim();
    let error = '';
    if (input.name === 'name') {
      if (!value) error = 'Enter your name.';
      else if (!/\p{L}/u.test(value)) error = 'Enter a name containing letters.';
    } else {
      const digits = value.replace(/\D/g, '');
      if (!value) error = 'Enter your phone number.';
      else if (!/^\+?[0-9() .-]+$/.test(value)) error = 'Use digits, with an optional leading +, spaces, brackets or hyphens.';
      else if (digits.length < 7 || digits.length > 15) error = 'Check the country code and number length.';
      else if ((!value.startsWith('+') || value.startsWith('+91')) && digits.slice(value.startsWith('+91') ? 2 : 0).length !== 10) error = 'For India, enter exactly 10 digits.';
      else {
        const parser = window.libphonenumber && window.libphonenumber.parsePhoneNumberFromString;
        let number;
        try {
          number = parser && parser(value, value.startsWith('+') ? undefined : 'IN');
        } catch (_) {
          number = null;
        }
        if (!number || !number.isPossible()) error = 'Check the country code and number length.';
        else if (value.startsWith('+') && digits.startsWith(`${number.countryCallingCode}0`)) {
          error = 'Remove the leading 0 after the country code.';
        }
      }
    }
    input.setCustomValidity(error);
    input.setAttribute('aria-invalid', String(Boolean(error)));
    dialog.querySelector(`#enquiry-${input.name}-error`).textContent = error;
  }

  [form.elements.name, form.elements.phone].forEach(input => {
    ['input', 'blur', 'invalid'].forEach(eventName => input.addEventListener(eventName, () => validateContact(input)));
  });

  function setSelection(requestedInterest, requestedProgram) {
    if (requestedProgram && programs.includes(requestedProgram)) {
      interest.value = 'Program enquiry';
      program.value = requestedProgram;
    } else if (requestedInterest) {
      if (![...interest.options].some(item => item.value === requestedInterest)) {
        interest.add(new Option(requestedInterest, requestedInterest));
      }
      interest.value = requestedInterest;
      program.value = '';
    }
    updateFields();
  }

  function openEnquiry(opener, requestedInterest, requestedProgram) {
    returnFocus = opener instanceof HTMLElement ? opener : document.activeElement;
    const successWasVisible = !success.hidden;
    if (successWasVisible) {
      form.reset();
      form.hidden = false;
      success.hidden = true;
    }
    status.textContent = '';
    fallback.hidden = true;
    startedAt = Date.now();
    submissionKey = null;
    submissionPayload = null;
    setSelection(requestedInterest, requestedProgram);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('enquiry-modal-open');
    requestAnimationFrame(() => interest.focus({preventScroll: true}));
  }

  function closeEnquiry() {
    if (dialog.open) dialog.close();
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href*="#enquiry"], [data-enquiry-open]');
    if (!link) return;
    const url = link.matches('a') ? new URL(link.href, location.href) : null;
    if (url && (url.origin !== location.origin || url.hash !== '#enquiry')) return;
    event.preventDefault();
    const requestedProgram = link.dataset.program || url?.searchParams.get('program') || '';
    const requestedInterest = link.dataset.interest || url?.searchParams.get('interest') || '';
    openEnquiry(link, requestedInterest, requestedProgram);
  });

  dialog.querySelector('.enquiry-modal__close').addEventListener('click', closeEnquiry);
  dialog.querySelector('.enquiry-modal__cancel').addEventListener('click', closeEnquiry);
  dialog.querySelector('.enquiry-modal__done').addEventListener('click', closeEnquiry);
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeEnquiry(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) closeEnquiry(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('enquiry-modal-open');
    if (returnFocus && document.contains(returnFocus)) returnFocus.focus({preventScroll: true});
  });
  dialog.addEventListener('toggle', () => {
    document.body.classList.toggle('enquiry-modal-open', dialog.open);
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]')].filter(item => !item.closest('[hidden]'));
    if (!controls.length) return;
    if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1).focus(); }
    else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0].focus(); }
  });

  interest.addEventListener('change', updateFields);
  form.addEventListener('input', () => { status.textContent = ''; fallback.hidden = true; submissionKey = null; submissionPayload = null; });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    validateContact(form.elements.name);
    validateContact(form.elements.phone);
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    payload.website = data.get('website') || '';
    payload.startedAt = startedAt;
    const serialized = JSON.stringify(payload);
    if (serialized !== submissionPayload) {
      submissionKey = crypto.randomUUID();
      submissionPayload = serialized;
    }
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    fallback.hidden = true;
    status.textContent = 'Saving your enquiry…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Idempotency-Key': submissionKey},
        body: serialized,
        signal: controller.signal,
        credentials: 'omit'
      });
      const result = await response.json().catch(() => ({}));
      if (response.status !== 202 || result.status !== 'received' || !result.reference) throw new Error('not-saved');
      form.hidden = true;
      success.hidden = false;
      dialog.querySelector('[data-success-message]').textContent = `Reference: ${result.reference}. The team will review it and contact you; your appointment is not yet confirmed.`;
      success.focus({preventScroll: true});
    } catch (_) {
      status.textContent = 'We could not confirm that your enquiry was saved. Please retry, or contact the team on WhatsApp.';
      fallback.hidden = false;
      submit.focus({preventScroll: true});
    } finally {
      clearTimeout(timeout);
      submit.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });

  updateFields();
  const initial = new URL(location.href);
  if (initial.hash === '#enquiry') {
    requestAnimationFrame(() => openEnquiry(null, initial.searchParams.get('interest') || '', initial.searchParams.get('program') || ''));
  }
})();
