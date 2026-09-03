// GDGI site — no framework, no build step. Progressive enhancement only:
// every page works with this file absent (nav links still work, footer
// year just won't self-update, contact form falls back to a plain mailto
// link already present in the markup).
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

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements['name'].value;
      var email = form.elements['email'].value;
      var message = form.elements['message'].value;
      var subject = encodeURIComponent('Website enquiry from ' + (name || 'a visitor'));
      var body = encodeURIComponent(message + '\n\n— ' + name + '\n' + email);
      window.location.href = 'mailto:' + form.dataset.to + '?subject=' + subject + '&body=' + body;
    });
  }
})();
