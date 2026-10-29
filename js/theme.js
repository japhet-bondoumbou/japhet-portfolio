// Bascule de thème : la classe "dark" est déjà appliquée avant chargement (inline head).
(function () {
  var root = document.documentElement;
  var KEY = 'theme';

  window.ThemeManager = {
    init: function () {
      var btn = document.getElementById('theme-toggle');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var isDark = root.classList.toggle('dark');
        try { localStorage.setItem(KEY, isDark ? 'dark' : 'light'); } catch (e) {}
        var label = (isDark ? 'Sombre' : 'Clair');
        btn.setAttribute('aria-label', 'Thème ' + label);
      });
    }
  };
})();