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
  // site.formEndpoints in generator/data.mjs) submits natively via POST to
  // that backend — no JS needed once an endpoint is configured. While the
  // endpoint is still blank, the form composes a mailto: instead, so it's
  // never a dead end. See README "Forms" for how to wire up a provider.
  var backendForms = document.querySelectorAll('.js-backend-form');
  for (var i = 0; i < backendForms.length; i++) {
    (function (form) {
      form.addEventListener('submit', function (e) {
        var actionUrl = form.getAttribute('action');
        if (actionUrl && actionUrl.trim() !== '') return; // real endpoint — let the browser POST to it

        e.preventDefault();
        var lines = [];
        for (var j = 0; j < form.elements.length; j++) {
          var el = form.elements[j];
          if (!el.name || el.type === 'submit') continue;
          var label = (form.querySelector('label[for="' + el.id + '"]') || {}).textContent || el.name.replace(/_/g, ' ');
          lines.push(label.trim() + ': ' + (el.value || '—'));
        }
        var subject = encodeURIComponent(form.dataset.subject || 'Website form submission');
        var body = encodeURIComponent(lines.join('\n'));
        window.location.href = 'mailto:' + form.dataset.to + '?subject=' + subject + '&body=' + body;
      });
    })(backendForms[i]);
  }

  // Summit registration: show/hide "organisation name" based on the
  // representing-an-organisation answer, and "accessibility needs" based
  // on the disability question — pure convenience, both fields still post
  // either way.
  var repSelect = document.querySelector('[name="representing_org"]');
  var orgField = document.getElementById('field-organisation_name');
  if (repSelect && orgField) {
    var syncOrg = function () { orgField.hidden = repSelect.value !== 'Yes'; };
    repSelect.addEventListener('change', syncOrg);
    syncOrg();
  }
  var disabilitySelect = document.querySelector('[name="has_disability"]');
  var accessField = document.getElementById('field-accessibility_needs');
  if (disabilitySelect && accessField) {
    var syncAccess = function () { accessField.hidden = disabilitySelect.value !== 'Yes'; };
    disabilitySelect.addEventListener('change', syncAccess);
    syncAccess();
  }
})();
