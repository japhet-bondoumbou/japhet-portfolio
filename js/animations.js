// Animations non essentielles : reveal au scroll et effet machine à écrire.
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setupReveal() {
    if (reduceMotion) {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  }

  function setupTyped() {
    var el = document.getElementById('typed-text');
    if (!el) return;
    var lang = window.SITE_LANG || 'fr';
    var list = (window.SITE_DATA && window.SITE_DATA.hero && window.SITE_DATA.hero.typed && window.SITE_DATA.hero.typed[lang]) || [];
    if (!list.length) return;
    if (reduceMotion) { el.textContent = list[0]; return; }

    var i = 0, j = 0, dir = 1;
    function tick() {
      var word = list[i % list.length];
      if (dir === 1) {
        j++;
        if (j >= word.length) { j = word.length; dir = -1; setTimeout(tick, 1500); el.textContent = word; return; }
      } else {
        j--;
        if (j <= 0) { j = 0; dir = 1; i++; }
      }
      el.textContent = word.slice(0, j);
      setTimeout(tick, dir === 1 ? 60 : 35);
    }
    tick();
  }

  window.Animations = {
    init: function () {
      setupReveal();
      setupTyped();
    }
  };
})();