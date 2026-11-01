// Rendu des diplômes et certificats (aperçu, catalogue, modale).
(function () {
  var LANG = window.SITE_LANG || 'fr';
  var BASE = window.SITE_BASE || '';
  var T = window.TRANSLATIONS[LANG];
  var DATA = (window.CREDENTIALS_DATA || []);

  function byId(id) { return document.getElementById(id); }

  function typeLabel(type) {
    return (T.credentialTypes && T.credentialTypes[type]) || type;
  }

  function localized(value) {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value[LANG] || value.fr || '';
  }

  function dateLabel(item) {
    return localized(item.date) || item.year || '';
  }

  function statusLabel(status) {
    return (T.status && T.status[status]) || status;
  }

  function openModal(item) {
    var root = byId('modal-root');
    if (!root) return;

    var title = localized(item.title);
    var desc = localized(item.description);

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

    var details = [item.issuer, item.platform, dateLabel(item)].filter(Boolean);
    if (details.length) {
      var issuer = document.createElement('p');
      issuer.className = 'muted';
      issuer.textContent = details.join(' — ');
      body.appendChild(issuer);
    }

    if (desc) {
      var p = document.createElement('p');
      p.textContent = desc;
      body.appendChild(p);
    }

    if (item.image) {
      var img = document.createElement('img');
      img.loading = 'lazy';
      img.decoding = 'async';
      img.alt = title;
      img.src = BASE + item.image;
      body.appendChild(img);
    }

    if (item.pdf) {
      var iframe = document.createElement('iframe');
      iframe.loading = 'lazy';
      iframe.src = BASE + item.pdf;
      iframe.title = title;
      body.appendChild(iframe);
      var dl = document.createElement('a');
      dl.href = BASE + item.pdf;
      dl.download = '';
      dl.className = 'btn btn-secondary';
      dl.textContent = (T.buttons && T.buttons.details) || 'Télécharger';
      body.appendChild(dl);
    } else if (!item.image) {
      var note = document.createElement('p');
      note.className = 'muted';
      note.textContent = (T.modal && T.modal.noDocument) || 'Document non disponible.';
      body.appendChild(note);
    }

    modal.appendChild(header);
    modal.appendChild(body);
    overlay.appendChild(modal);
    root.innerHTML = '';
    root.appendChild(overlay);

    if (window.lucide) window.lucide.createIcons();
    requestAnimationFrame(function () { overlay.classList.add('open'); });

    var lastFocus = document.activeElement;
    close.focus();
    function escHandler(e) { if (e.key === 'Escape') destroy(); }
    function destroy() {
      document.removeEventListener('keydown', escHandler);
      overlay.classList.remove('open');
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      }, 180);
    }
    document.addEventListener('keydown', escHandler);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) destroy(); });
  }

  function card(item) {
    var wrap = document.createElement('article');
    wrap.className = 'card';
    var title = localized(item.title);
    var media = document.createElement('div');
    media.className = 'card-media credential-media';
    if (item.image) {
      var preview = document.createElement('img');
      preview.loading = 'lazy';
      preview.decoding = 'async';
      preview.alt = title;
      preview.src = BASE + item.image;
      preview.addEventListener('error', function () {
        media.classList.add('credential-media-empty');
        preview.remove();
      }, { once: true });
      media.appendChild(preview);
    } else {
      media.classList.add('credential-media-empty');
      var icon = document.createElement('i');
      icon.setAttribute('data-lucide', item.type === 'diploma' ? 'graduation-cap' : 'award');
      icon.setAttribute('aria-hidden', 'true');
      media.appendChild(icon);
      var label = document.createElement('span');
      label.textContent = typeLabel(item.type);
      media.appendChild(label);
    }
    var body = document.createElement('div');
    body.className = 'card-body';

    var meta = document.createElement('div');
    meta.className = 'card-meta';
    var date = dateLabel(item);
    if (date) {
      var tag = document.createElement('span');
      tag.className = 'tag tag-accent';
      tag.textContent = date;
      meta.appendChild(tag);
    }
    if (item.kind) {
      var kind = document.createElement('span');
      kind.className = 'tag';
      kind.textContent = localized(item.kind);
      meta.appendChild(kind);
    }

    var h3 = document.createElement('h3');
    h3.className = 'card-title';
    h3.textContent = title;

    var actions = document.createElement('div');
    actions.className = 'card-actions';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-secondary';
    btn.textContent = (T.buttons && T.buttons.view) || 'Consulter';
    btn.addEventListener('click', function () { openModal(item); });
    actions.appendChild(btn);

    body.appendChild(meta);
    body.appendChild(h3);
    [item.issuer, item.platform].filter(Boolean).forEach(function (detail) {
      var p = document.createElement('p');
      p.className = 'card-desc';
      p.textContent = detail;
      body.appendChild(p);
    });
    body.appendChild(actions);

    wrap.appendChild(media);
    wrap.appendChild(body);
    return wrap;
  }

  function renderPreview() {
    var root = byId('credentials-preview');
    if (!root) return;
    // 3 ou 4 éléments représentatifs
    var picks = DATA.slice(0, 4);
    picks.forEach(function (item) {
      var previewCard = card(item);
      previewCard.classList.add('reveal', 'reveal-card');
      root.appendChild(previewCard);
    });
  }

  function renderCatalog() {
    var grid = byId('credentials-grid');
    var empty = byId('credentials-empty');
    var filterBar = byId('cred-filter-bar');
    var searchInput = byId('cred-search');
    var count = byId('credential-count');
    if (!grid || !filterBar || !searchInput) return;

    var state = { type: 'all', q: '' };

    var types = ['all', 'diploma', 'certificate', 'attestation', 'training'];
    filterBar.innerHTML = '';
    types.forEach(function (type) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'filter-btn' + (type === 'all' ? ' active' : '');
      b.textContent = typeLabel(type);
      b.dataset.type = type;
      b.setAttribute('aria-pressed', String(type === 'all'));
      b.addEventListener('click', function () {
        state.type = type;
        filterBar.querySelectorAll('.filter-btn').forEach(function (x) {
          x.classList.remove('active');
          x.setAttribute('aria-pressed', 'false');
        });
        b.classList.add('active');
        b.setAttribute('aria-pressed', 'true');
        update();
      });
      filterBar.appendChild(b);
    });

    function update() {
      grid.innerHTML = '';
      var q = state.q.trim().toLowerCase();
      var items = DATA.filter(function (item) {
        var typeOk = state.type === 'all' || item.type === state.type;
        var searchable = [
          localized(item.title),
          localized(item.title.fr),
          item.issuer,
          item.platform,
          localized(item.kind)
        ].filter(Boolean).join(' ').toLowerCase();
        var qOk = !q || searchable.indexOf(q) !== -1;
        return typeOk && qOk;
      });
      items.forEach(function (item) { grid.appendChild(card(item)); });
      empty.hidden = items.length !== 0;
      if (count) {
        count.textContent = LANG === 'fr'
          ? items.length + (items.length > 1 ? ' documents affichés' : ' document affiché')
          : items.length + (items.length === 1 ? ' document shown' : ' documents shown');
      }
    }

    searchInput.addEventListener('input', function (e) {
      state.q = e.target.value;
      update();
    });

    update();
  }

  function renderSkills() {
    var hard = byId('hard-skills');
    if (hard && window.SKILLS_DATA) {
      hard.innerHTML = '';
      window.SKILLS_DATA.hard.forEach(function (cat) {
        var div = document.createElement('div');
        div.className = 'skill-cat';
        var heading = document.createElement('div');
        heading.className = 'skill-cat-heading';
        var h = document.createElement('h3');
        h.textContent = cat.category[LANG] || cat.category.fr;
        var count = document.createElement('span');
        count.className = 'skill-count';
        count.textContent = String(cat.items.length).padStart(2, '0');
        count.setAttribute('aria-hidden', 'true');
        heading.appendChild(h);
        heading.appendChild(count);
        var list = document.createElement('div');
        list.className = 'badge-list';
        cat.items.forEach(function (it) {
          var s = document.createElement('span');
          s.className = 'badge badge-accent skill-tech';
          var icon = document.createElement('i');
          icon.className = it.icon + ' colored';
          icon.setAttribute('aria-hidden', 'true');
          var name = document.createElement('span');
          name.textContent = it.name;
          s.appendChild(icon);
          s.appendChild(name);
          list.appendChild(s);
        });
        div.appendChild(heading);
        div.appendChild(list);
        hard.appendChild(div);
      });
    }
    var soft = byId('soft-skills');
    if (soft && window.SKILLS_DATA && window.SKILLS_DATA.soft) {
      soft.innerHTML = '';
      window.SKILLS_DATA.soft[LANG].forEach(function (it) {
        var s = document.createElement('span');
        s.className = 'badge';
        s.textContent = it;
        soft.appendChild(s);
      });
    }
  }

  window.CredentialsUI = {
    init: function () {
      renderPreview();
      renderCatalog();
      renderSkills();
    },
    _openModal: openModal
  };
})();