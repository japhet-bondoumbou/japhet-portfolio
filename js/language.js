// Sélecteur de langue : redirige vers la page équivalente dans l'autre langue.
(function () {
  var BASE = window.SITE_BASE || '';
  var LANG = window.SITE_LANG || 'fr';
  var PAGE = window.SITE_PAGE || 'home';
  var other = LANG === 'fr' ? 'en' : 'fr';

  function equivalentPath() {
    if (PAGE === 'home') {
      return other === 'en' ? BASE + 'en/' : BASE;
    }
    return other === 'en'
      ? BASE + 'en/pages/' + PAGE + '.html'
      : BASE + 'pages/' + PAGE + '.html';
  }

  window.LanguageManager = {
    init: function () {
      var links = document.querySelectorAll('[data-lang-link]');
      links.forEach(function (a) {
        a.href = equivalentPath();
        a.textContent = other.toUpperCase();
        a.setAttribute('aria-label', other === 'en' ? 'Switch to English' : 'Passer en français');
        a.setAttribute('hreflang', other);
      });
    }
  };
})();