// Validation du formulaire de contact et composition du message WhatsApp.
(function () {
  var LANG = window.SITE_LANG || 'fr';
  var T = window.TRANSLATIONS[LANG];
  var SITE = window.SITE_DATA || {};

  function byId(id) { return document.getElementById(id); }

  function setError(name, message) {
    var el = document.querySelector('[data-error="' + name + '"]');
    if (el) el.textContent = message || '';
  }

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  window.ContactForm = {
    init: function () {
      var form = byId('contact-form');
      if (!form) return;
      var status = byId('contact-status');

      if (!SITE.whatsapp && status) {
        status.hidden = false;
        status.className = 'form-status warn';
        status.textContent = T.contact.unavailable;
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = {
          name: form.name.value.trim(),
          email: form.email.value.trim(),
          subject: form.subject.value.trim(),
          type: form.type.value,
          message: form.message.value.trim()
        };
        var ok = true;
        ['name', 'email', 'subject', 'message'].forEach(function (k) { setError(k, ''); });

        if (!data.name) { setError('name', T.contact.errors.name); ok = false; }
        if (!data.email || !validateEmail(data.email)) { setError('email', T.contact.errors.email); ok = false; }
        if (!data.subject) { setError('subject', T.contact.errors.subject); ok = false; }
        if (!data.message) { setError('message', T.contact.errors.message); ok = false; }
        if (!ok) return;

        if (!SITE.whatsapp) {
          if (status) {
            status.hidden = false;
            status.className = 'form-status warn';
            status.textContent = T.contact.unavailable;
          }
          return;
        }

        var typeLabel = data.type ? (T.contact.typeOptions[data.type] || data.type) : '';
        var lines = [
          (LANG === 'fr' ? 'Nom : ' : 'Name: ') + data.name,
          (LANG === 'fr' ? 'E-mail : ' : 'Email: ') + data.email,
          (LANG === 'fr' ? 'Sujet : ' : 'Subject: ') + data.subject
        ];
        if (typeLabel) lines.push((LANG === 'fr' ? 'Type de demande : ' : 'Request type: ') + typeLabel);
        lines.push('');
        lines.push(data.message);

        var text = lines.join('\n');
        var url = 'https://wa.me/' + encodeURIComponent(SITE.whatsapp) + '?text=' + encodeURIComponent(text);
        window.open(url, '_blank', 'noopener');
      });
    }
  };
})();