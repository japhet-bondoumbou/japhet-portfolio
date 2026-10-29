// Initialisation générale de la page.
(function () {
  var LANG = window.SITE_LANG || 'fr';

  function computeStats() {
    var DATA = window.SITE_DATA || {};
    var projects = (window.PROJECTS_DATA || []).length;
    var credentials = (window.CREDENTIALS_DATA || []).length;
    var skills = window.SKILLS_DATA ? window.SKILLS_DATA.hard.reduce(function (acc, c) { return acc + c.items.length; }, 0) : 0;
    var experiences = (DATA.experiences || []).length;
    return {
      projects: DATA.stats && DATA.stats.projects != null ? DATA.stats.projects : projects,
      credentials: DATA.stats && DATA.stats.credentials != null ? DATA.stats.credentials : credentials,
      skills: DATA.stats && DATA.stats.skills != null ? DATA.stats.skills : skills,
      experiences: DATA.stats && DATA.stats.experiences != null ? DATA.stats.experiences : experiences
    };
  }

  function renderStats() {
    var s = computeStats();
    document.querySelectorAll('[data-stat]').forEach(function (el) {
      var key = el.getAttribute('data-stat');
      el.textContent = String(s[key] || 0);
    });
  }

  function renderSkillsStrip() {
    var track = document.getElementById('skills-track');
    if (!track || !window.SKILLS_DATA) return;
    var items = window.SKILLS_DATA.marquee || [];
    var frag = document.createDocumentFragment();
    // Duplication visuelle pour un défilement continu
    for (var r = 0; r < 2; r++) {
      items.forEach(function (name) {
        var span = document.createElement('span');
        span.className = 'skill-item';
        span.textContent = name;
        if (r === 1) span.setAttribute('aria-hidden', 'true');
        frag.appendChild(span);
      });
    }
    track.innerHTML = '';
    track.appendChild(frag);
  }

  function renderTimeline() {
    var root = document.getElementById('timeline');
    if (!root || !window.SITE_DATA || !window.SITE_DATA.experiences) return;
    window.SITE_DATA.experiences.forEach(function (exp) {
      var item = document.createElement('div');
      item.className = 'timeline-item';
      var year = document.createElement('span');
      year.className = 'timeline-year';
      year.textContent = exp.year;
      var h = document.createElement('h3');
      h.className = 'timeline-title';
      h.textContent = exp.role[LANG] || exp.role.fr;
      var sub = document.createElement('p');
      sub.className = 'timeline-sub';
      sub.textContent = exp.org;
      var desc = document.createElement('p');
      desc.className = 'timeline-desc';
      desc.textContent = exp.description[LANG] || exp.description.fr;
      item.appendChild(year);
      item.appendChild(h);
      item.appendChild(sub);
      item.appendChild(desc);
      root.appendChild(item);
    });
  }

  function init() {
    if (window.Components) window.Components.init();
    renderStats();
    renderSkillsStrip();
    renderTimeline();
    if (window.CredentialsUI) window.CredentialsUI.init();
    if (window.ProjectsUI) window.ProjectsUI.init();
    if (window.ContactForm) window.ContactForm.init();
    if (window.Animations) window.Animations.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();