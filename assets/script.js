// GDGI site — no framework, no build step. Progressive enhancement only:
// every page works with this file absent (nav links still work, footer
// year just won't self-update, forms fall back to a plain mailto link
// already present in the markup).
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Any form with class "js-backend-form" and a real `action` URL (set from
  // site.formEndpoints in generator/data.mjs) submits to that backend via
  // fetch — no page navigation to a raw webhook response. While the
  // endpoint is still blank, the form composes a mailto: instead, so it's
  // never a dead end. See README "Forms & payments".
  var backendForms = document.querySelectorAll('.js-backend-form');
  for (var i = 0; i < backendForms.length; i++) {
    (function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var actionUrl = form.getAttribute('action');

        if (actionUrl && actionUrl.trim() !== '') {
          var submitBtn = form.querySelector('button[type="submit"]');
          if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
          // Most webhook receivers (Make, Zapier, Formspree-style catch
          // hooks) don't send back CORS headers for a plain browser POST,
          // so the response can't be read from here. `no-cors` still
          // delivers the request; we just can't confirm the receiving end
          // accepted it, so we show success optimistically once the
          // request has gone out.
          fetch(actionUrl, { method: 'POST', mode: 'no-cors', body: new FormData(form) })
            .then(function () { showSuccess(form); })
            .catch(function () { showSuccess(form); });
          return;
        }

        var lines = [];
        for (var j = 0; j < form.elements.length; j++) {
          var el = form.elements[j];
          if (!el.name || el.type === 'submit' || el.type === 'hidden') continue;
          var label = (form.querySelector('label[for="' + el.id + '"]') || {}).textContent || el.name.replace(/_/g, ' ');
          lines.push(label.trim() + ': ' + (el.value || '—'));
        }
        var subject = encodeURIComponent(form.dataset.subject || 'Website form submission');
        var body = encodeURIComponent(lines.join('\n'));
        window.location.href = 'mailto:' + form.dataset.to + '?subject=' + subject + '&body=' + body;
      });
    })(backendForms[i]);
  }

  function showSuccess(form) {
    var message = form.dataset.success || 'Thanks — your submission has been received.';
    var p = document.createElement('p');
    p.style.fontWeight = '600';
    p.style.color = 'var(--brand)';
    p.textContent = message;
    form.replaceWith(p);
  }

  // Summit registration: show/hide "organisation name" based on the
  // representing-an-organisation answer, and "please specify" based on
  // the disability question — pure convenience, required fields still
  // post either way.
  var conditionalFields = [
    { trigger: 'representing_org', target: 'organisation_name', showWhen: 'Yes' },
    { trigger: 'has_disability', target: 'disability_specify', showWhen: 'Yes' },
  ];
  conditionalFields.forEach(function (c) {
    var triggerEl = document.querySelector('[name="' + c.trigger + '"]');
    var targetField = document.getElementById('field-' + c.target);
    if (!triggerEl || !targetField) return;
    var sync = function () { targetField.hidden = triggerEl.value !== c.showWhen; };
    triggerEl.addEventListener('change', sync);
    sync();
  });
})();
