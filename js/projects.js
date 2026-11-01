// Rendu de la galerie de projets et de la sélection d'accueil.
(function () {
  var LANG = window.SITE_LANG || 'fr';
  var BASE = window.SITE_BASE || '';
  var T = window.TRANSLATIONS[LANG];
  var DATA = (window.PROJECTS_DATA || []);

  function byId(id) { return document.getElementById(id); }
  function catLabel(c) { return (T.categories && T.categories[c]) || c; }
  function statusLabel(s) { return (T.status && T.status[s]) || s; }

  function openModal(item) {
    var root = byId('modal-root');
    if (!root) return;
    var title = item.name;
    var desc = (item.longDescription && (item.longDescription[LANG] || item.longDescription.fr)) || (item.shortDescription && (item.shortDescription[LANG] || item.shortDescription.fr)) || '';

    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'modal-title');
    var modal = document.createElement('div');
    modal.className = 'modal';
    var header = document.createElement('div');
    header.className = 'modal-header';
    var h = document.createElement('h2');
    h.id = 'modal-title';
    h.textContent = title;
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'modal-close';
    close.setAttribute('aria-label', (T.modal && T.modal.close) || 'Fermer');
    close.innerHTML = '<i data-lucide="x"></i>';
    close.addEventListener('click', destroy);
    header.appendChild(h);
    header.appendChild(close);

    var body = document.createElement('div');
    body.className = 'modal-body';
    var meta = document.createElement('p');
    meta.className = 'muted';
    meta.textContent = catLabel(item.category) + ' · ' + statusLabel(item.status) + (item.period ? ' · ' + item.period : '');
    body.appendChild(meta);
    if (desc) {
      var p = document.createElement('p');
      p.textContent = desc;
      body.appendChild(p);
    }
    if (item.technologies && item.technologies.length) {
      var wrap = document.createElement('div');
      wrap.className = 'badge-list';
      item.technologies.forEach(function (t) {
        var b = document.createElement('span');
        b.className = 'badge';
        b.textContent = t;
        wrap.appendChild(b);
      });
      body.appendChild(wrap);
    }
    var actions = document.createElement('div');
    actions.className = 'card-actions';
    if (item.demoUrl) {
      var demo = document.createElement('a');
      demo.className = 'btn btn-primary';
      demo.href = item.demoUrl;
      demo.target = '_blank';
      demo.rel = 'noopener noreferrer';
      demo.textContent = (T.buttons && T.buttons.demo) || 'Démonstration';
      actions.appendChild(demo);
    }
    if (item.repoUrl) {
      var repo = document.createElement('a');
      repo.className = 'btn btn-secondary';
      repo.href = item.repoUrl;
      repo.target = '_blank';
      repo.rel = 'noopener noreferrer';
      repo.textContent = (T.buttons && T.buttons.code) || 'Code source';
      actions.appendChild(repo);
    }
    if (actions.children.length) body.appendChild(actions);

    modal.appendChild(header);
    modal.appendChild(body);
    overlay.appendChild(modal);
    root.innerHTML = '';
    root.appendChild(overlay);
    if (window.lucide) window.lucide.createIcons();
    requestAnimationFrame(function () { overlay.classList.add('open'); });
    var lastFocus = document.activeElement;
    close.focus();
    function esc(e) { if (e.key === 'Escape') destroy(); }
    function destroy() {
      document.removeEventListener('keydown', esc);
      overlay.classList.remove('open');
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      }, 180);
    }
    document.addEventListener('keydown', esc);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) destroy(); });
  }

  function card(item, mode) {
    var wrap = document.createElement('article');
    wrap.className = 'card project-card' + (item.featured ? ' project-card-featured' : '');
    var media = document.createElement('div');
    media.className = 'card-media project-media project-media-' + item.category;
    if (item.image) {
      var image = document.createElement('img');
      image.loading = 'lazy';
      image.decoding = 'async';
      image.alt = '';
      image.src = BASE + item.image;
      image.addEventListener('error', function () {
        media.classList.add('project-media-placeholder');
        image.remove();
      }, { once: true });
      media.appendChild(image);
    }
    var mediaContent = document.createElement('div');
    mediaContent.className = 'project-media-content';
    var mediaLabel = document.createElement('span');
    mediaLabel.className = 'project-media-label';
    mediaLabel.textContent = catLabel(item.category);
    var mediaTitle = document.createElement('span');
    mediaTitle.className = 'project-media-title';
    mediaTitle.textContent = item.name;
    mediaContent.appendChild(mediaLabel);
    mediaContent.appendChild(mediaTitle);
    media.appendChild(mediaContent);
    var mediaMark = document.createElement('span');
    mediaMark.className = 'project-media-mark';
    mediaMark.setAttribute('aria-hidden', 'true');
    mediaMark.textContent = item.name.split(/\s+/).slice(0, 2).map(function (part) { return part.charAt(0); }).join('');
    media.appendChild(mediaMark);
    var mediaIndex = document.createElement('span');
    mediaIndex.className = 'project-media-index';
    mediaIndex.setAttribute('aria-hidden', 'true');
    mediaIndex.textContent = item.featured ? 'FEATURED' : 'PROJECT';
    media.appendChild(mediaIndex);
    var body = document.createElement('div');
    body.className = 'card-body';

    var meta = document.createElement('div');
    meta.className = 'card-meta';
    var cTag = document.createElement('span');
    cTag.className = 'tag';
    cTag.textContent = catLabel(item.category);
    var sTag = document.createElement('span');
    sTag.className = 'tag tag-accent';
    sTag.textContent = statusLabel(item.status);
    meta.appendChild(cTag);
    meta.appendChild(sTag);

    var h3 = document.createElement('h3');
    h3.className = 'card-title';
    h3.textContent = item.name;

    var p = document.createElement('p');
    p.className = 'card-desc';
    p.textContent = (item.shortDescription[LANG] || item.shortDescription.fr);

    var techs = document.createElement('div');
    techs.className = 'card-meta';
    (item.technologies || []).slice(0, 4).forEach(function (t) {
      var b = document.createElement('span');
      b.className = 'tag';
      b.textContent = t;
      techs.appendChild(b);
    });

    var actions = document.createElement('div');
    actions.className = 'card-actions';
    var details = document.createElement('button');
    details.type = 'button';
    details.className = 'btn btn-secondary';
    details.textContent = (T.buttons && T.buttons.details) || 'Détails';
    details.addEventListener('click', function () { openModal(item); });
    actions.appendChild(details);
    if (item.demoUrl) {
      var demo = document.createElement('a');
      demo.className = 'btn btn-ghost';
      demo.href = item.demoUrl;
      demo.target = '_blank';
      demo.rel = 'noopener noreferrer';
      demo.style.marginTop = '0';
      demo.textContent = (T.buttons && T.buttons.demo) || 'Démo';
      actions.appendChild(demo);
    }

    body.appendChild(meta);
    body.appendChild(h3);
    body.appendChild(p);
    if (techs.children.length) body.appendChild(techs);
    body.appendChild(actions);
    wrap.appendChild(media);
    wrap.appendChild(body);
    return wrap;
  }

  function renderPreview() {
    var root = byId('projects-preview');
    if (!root) return;
    var picks = DATA.filter(function (p) { return p.featured; }).slice(0, 3);
    picks.forEach(function (item) {
      var previewCard = card(item, 'preview');
      previewCard.classList.add('reveal', 'reveal-card');
      root.appendChild(previewCard);
    });
  }

  function renderGallery() {
    var grid = byId('projects-grid');
    var empty = byId('projects-empty');
    var filterCat = byId('proj-filter-cat');
    var filterStatus = byId('proj-filter-status');
    var searchInput = byId('proj-search');
    var resetBtn = byId('proj-reset');
    var count = byId('project-count');
    if (!grid || !filterCat || !filterStatus || !searchInput) return;

    var state = { cat: 'all', status: 'all', q: '' };

    var cats = ['all', 'web', 'mobile', 'saas', 'tools', 'other'];
    var stats = ['all', 'online', 'completed', 'development', 'prototype'];

    function buildFilterBar(container, values, key, labelFn) {
      container.innerHTML = '';
      values.forEach(function (v) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'filter-btn' + (v === 'all' ? ' active' : '');
        b.textContent = v === 'all' ? (T.filters.all || 'Tous') : labelFn(v);
        b.setAttribute('aria-pressed', String(v === 'all'));
        b.addEventListener('click', function () {
          state[key] = v;
          container.querySelectorAll('.filter-btn').forEach(function (x) {
            x.classList.remove('active');
            x.setAttribute('aria-pressed', 'false');
          });
          b.classList.add('active');
          b.setAttribute('aria-pressed', 'true');
          update();
        });
        container.appendChild(b);
      });
    }

    buildFilterBar(filterCat, cats, 'cat', catLabel);
    buildFilterBar(filterStatus, stats, 'status', statusLabel);

    function update() {
      grid.innerHTML = '';
      var q = state.q.trim().toLowerCase();
      var items = DATA.filter(function (item) {
        var catOk = state.cat === 'all' || item.category === state.cat;
        var sOk = state.status === 'all' || item.status === state.status;
        var searchable = (item.name + ' ' + item.shortDescription[LANG] + ' ' + item.shortDescription.fr + ' ' + (item.longDescription && (item.longDescription[LANG] || item.longDescription.fr) || '') + ' ' + item.technologies.join(' ')).toLowerCase();
        var qOk = !q || searchable.indexOf(q) !== -1;
        return catOk && sOk && qOk;
      });
      items.forEach(function (item) { grid.appendChild(card(item, 'list')); });
      empty.hidden = items.length !== 0;
      if (count) {
        count.textContent = LANG === 'fr'
          ? items.length + (items.length > 1 ? ' projets affichés' : ' projet affiché')
          : items.length + (items.length === 1 ? ' project shown' : ' projects shown');
      }
    }

    searchInput.addEventListener('input', function (e) {
      state.q = e.target.value;
      update();
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        state = { cat: 'all', status: 'all', q: '' };
        searchInput.value = '';
        filterCat.querySelectorAll('.filter-btn').forEach(function (b, i) {
          b.classList.toggle('active', i === 0);
          b.setAttribute('aria-pressed', String(i === 0));
        });
        filterStatus.querySelectorAll('.filter-btn').forEach(function (b, i) {
          b.classList.toggle('active', i === 0);
          b.setAttribute('aria-pressed', String(i === 0));
        });
        update();
      });
    }

    update();
  }

  window.ProjectsUI = {
    init: function () {
      renderPreview();
      renderGallery();
    },
    _openModal: openModal
  };
})();