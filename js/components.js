// Chargement des composants partagés (navbar, footer, loader) et câblage de leurs contrôles.
(function () {
  var BASE = window.SITE_BASE || '';
  var LANG = window.SITE_LANG || 'fr';
  var PAGE = window.SITE_PAGE || 'home';
  var T = (window.TRANSLATIONS && window.TRANSLATIONS[LANG]) || { nav: {}, footer: {} };

  function pagePath(name) {
    var mapFR = { home: '', about: 'pages/about.html', projects: 'pages/projects.html', credentials: 'pages/credentials.html', contact: 'pages/contact.html' };
    var mapEN = { home: 'en/', about: 'en/pages/about.html', projects: 'en/pages/projects.html', credentials: 'en/pages/credentials.html', contact: 'en/pages/contact.html' };
    var map = LANG === 'fr' ? mapFR : mapEN;
    return BASE + (map[name] || map.home);
  }

  function fetchText(path) {
    return fetch(path).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + path);
      return r.text();
    });
  }

  function hydrateNav(root) {
    root.querySelectorAll('[data-nav]').forEach(function (a) {
      var key = a.getAttribute('data-nav');
      a.href = pagePath(key);
      a.textContent = (T.nav && T.nav[key]) || key;
      if (key === PAGE) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
    var brand = root.querySelector('#nav-brand');
    if (brand) {
      brand.href = pagePath('home');
      brand.setAttribute('aria-label', (T.brand || 'Japhet Bondoumbou') + ' — ' + ((T.nav && T.nav.home) || 'Accueil'));
    }
  }

  function wireMobileMenu() {
    var btn = document.getElementById('menu-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    function setMenuOpen(open) {
      menu.classList.toggle('open', open);
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? (T.a11y && T.a11y.closeMenu) || 'Fermer le menu' : (T.a11y && T.a11y.openMenu) || 'Ouvrir le menu');
      var icon = btn.querySelector('svg');
      if (icon) {
        icon.setAttribute('data-lucide', open ? 'x' : 'menu');
        icon.setAttribute('class', 'lucide lucide-' + (open ? 'x' : 'menu'));
        icon.innerHTML = open
          ? '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>'
          : '<path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path>';
      }
    }
    btn.addEventListener('click', function () {
      setMenuOpen(btn.getAttribute('aria-expanded') !== 'true');
    });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenuOpen(false); });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !menu.hidden) {
        setMenuOpen(false);
        btn.focus();
      }
    });
  }

  function appendContactLink(list, label, href, value) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = href;
    a.textContent = value;
    a.setAttribute('aria-label', label + ' : ' + value);
    li.appendChild(a);
    list.appendChild(li);
  }

  function createSocialIcon(name) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');

    if (name === 'instagram') {
      var frame = document.createElementNS(ns, 'rect');
      frame.setAttribute('x', '3');
      frame.setAttribute('y', '3');
      frame.setAttribute('width', '18');
      frame.setAttribute('height', '18');
      frame.setAttribute('rx', '5');
      frame.setAttribute('fill', 'none');
      frame.setAttribute('stroke', 'currentColor');
      frame.setAttribute('stroke-width', '2');
      var lens = document.createElementNS(ns, 'circle');
      lens.setAttribute('cx', '12');
      lens.setAttribute('cy', '12');
      lens.setAttribute('r', '4');
      lens.setAttribute('fill', 'none');
      lens.setAttribute('stroke', 'currentColor');
      lens.setAttribute('stroke-width', '2');
      var flash = document.createElementNS(ns, 'circle');
      flash.setAttribute('cx', '17.5');
      flash.setAttribute('cy', '6.5');
      flash.setAttribute('r', '1.2');
      flash.setAttribute('fill', 'currentColor');
      svg.appendChild(frame);
      svg.appendChild(lens);
      svg.appendChild(flash);
      return svg;
    }

    var path = document.createElementNS(ns, 'path');
    path.setAttribute('fill', 'currentColor');
    var paths = {
      facebook: 'M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z',
      x: 'M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.8 5.7 22H2.5l7.3-8.4L1.8 2h6.5l4.4 6.6L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z',
      github: 'M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.5v-1.9c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.4.1-3 0 0 1-.3 3.1 1.2a10.7 10.7 0 0 1 5.6 0c2.1-1.5 3.1-1.2 3.1-1.2.6 1.6.2 2.7.1 3 .7.8 1.2 1.8 1.2 3 0 4.3-2.6 5.3-5.1 5.5.4.4.8 1 .8 2.1V22c0 .3.2.6.8.5A11.1 11.1 0 0 0 12 .9Z'
    };
    path.setAttribute('d', paths[name]);
    svg.appendChild(path);
    return svg;
  }

  function hydrateContactDetails() {
    document.querySelectorAll('[data-contact-details]').forEach(function (details) {
      details.innerHTML = '';
      var data = window.SITE_DATA || {};
      if (data.phone) appendContactLink(details, LANG === 'fr' ? 'Téléphone' : 'Phone', 'tel:' + data.phone.replace(/[^\d+]/g, ''), data.phone);
      if (data.email) appendContactLink(details, LANG === 'fr' ? 'E-mail' : 'Email', 'mailto:' + data.email, data.email);
      if (data.location && data.location[LANG]) {
        var li = document.createElement('li');
        var location = document.createElement('span');
        location.className = 'contact-detail-location';
        location.textContent = data.location[LANG];
        li.appendChild(location);
        details.appendChild(li);
      }
    });
  }

  function hydrateFooter(root) {
    var brand = root.querySelector('#footer-brand-link');
    if (brand) {
      brand.href = pagePath('home');
      brand.setAttribute('aria-label', (T.brand || 'Japhet Bondoumbou') + ' — ' + ((T.nav && T.nav.home) || 'Accueil'));
    }

    var nav = root.querySelector('#footer-nav');
    if (nav) {
      var links = [
        ['home', pagePath('home')],
        ['about', pagePath('about')],
        ['projects', pagePath('projects')],
        ['credentials', pagePath('credentials')],
        ['contact', pagePath('contact')]
      ];
      nav.innerHTML = '';
      links.forEach(function (l) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = l[1];
        a.textContent = (T.nav && T.nav[l[0]]) || l[0];
        li.appendChild(a);
        nav.appendChild(li);
      });
    }

    var contactList = root.querySelector('#footer-contact');
    if (contactList) {
        contactList.innerHTML = '';
        var data = window.SITE_DATA || {};
        if (data.phone) {
          appendContactLink(contactList, LANG === 'fr' ? 'Téléphone' : 'Phone', 'tel:' + data.phone.replace(/[^\d+]/g, ''), data.phone);
        }
        if (data.email) {
          appendContactLink(contactList, LANG === 'fr' ? 'E-mail' : 'Email', 'mailto:' + data.email, data.email);
        }
      if (!contactList.children.length) {
        var li3 = document.createElement('li');
        var span = document.createElement('span');
        span.className = 'muted';
        span.textContent = (T.footer && T.footer.noContact) || 'Coordonnées à venir';
        li3.appendChild(span);
        contactList.appendChild(li3);
      }
    }

    var yearEl = root.querySelector('#footer-year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    var tag = root.querySelector('[data-footer-tagline]');
    if (tag && window.SITE_DATA && window.SITE_DATA.title) tag.textContent = window.SITE_DATA.title[LANG];
    var loc = root.querySelector('[data-footer-location]');
    if (loc && window.SITE_DATA && window.SITE_DATA.location) loc.textContent = window.SITE_DATA.location[LANG];
    var hNav = root.querySelector('[data-footer-heading-nav]');
    if (hNav && T.footer) hNav.textContent = T.footer.navigation;
    var hCont = root.querySelector('[data-footer-heading-contact]');
    if (hCont && T.footer) hCont.textContent = T.footer.contact;
    var socialHeading = root.querySelector('[data-footer-heading-social]');
    var socialList = root.querySelector('#footer-socials');
    if (socialHeading && socialList) {
      var socialLabel = LANG === 'fr' ? 'Réseaux sociaux' : 'Social media';
      socialHeading.textContent = socialLabel;
      socialList.setAttribute('aria-label', socialLabel);
      socialList.innerHTML = '';
      var socialData = (window.SITE_DATA && window.SITE_DATA.social) || {};
      [
        { key: 'facebook', label: 'Facebook' },
        { key: 'instagram', label: 'Instagram' },
        { key: 'x', label: 'Twitter / X' },
        { key: 'github', label: 'GitHub' }
      ].forEach(function (social) {
        if (!socialData[social.key]) return;
        var item = document.createElement('li');
        var link = document.createElement('a');
        link.className = 'footer-social-link footer-social-' + social.key;
        link.href = socialData[social.key];
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', social.label + (LANG === 'fr' ? ' (ouvre un nouvel onglet)' : ' (opens in a new tab)'));
        var mark = document.createElement('span');
        mark.className = 'footer-social-mark';
        mark.appendChild(createSocialIcon(social.key));
        var name = document.createElement('span');
        name.className = 'footer-social-name';
        name.textContent = social.label;
        link.appendChild(mark);
        link.appendChild(name);
        item.appendChild(link);
        socialList.appendChild(item);
      });
    }
    var connectHeading = root.querySelector('[data-footer-connect-heading]');
    if (connectHeading) connectHeading.textContent = LANG === 'fr' ? 'Un projet en tête ?' : 'Have a project in mind?';
    var connectCopy = root.querySelector('[data-footer-connect-copy]');
    if (connectCopy) connectCopy.textContent = LANG === 'fr' ? 'Échangeons autour de votre idée.' : 'Let’s talk about your idea.';
    var connectLabel = root.querySelector('[data-footer-connect-label]');
    if (connectLabel) connectLabel.textContent = LANG === 'fr' ? 'Me contacter' : 'Get in touch';
    var connectLink = root.querySelector('[data-footer-contact-link]');
    if (connectLink) connectLink.href = pagePath('contact');
    var rights = root.querySelector('[data-footer-rights]');
    if (rights && T.footer) rights.textContent = T.footer.rights;
    var credit = root.querySelector('[data-footer-credit]');
    if (credit && window.SITE_DATA && window.SITE_DATA.credit) credit.textContent = window.SITE_DATA.credit[LANG];
  }

  function wireCVLinks() {
    var links = document.querySelectorAll('[data-cv-link]');
    links.forEach(function (a) {
      var cv = window.SITE_DATA && window.SITE_DATA.cv;
      if (!cv) {
        a.setAttribute('aria-disabled', 'true');
        a.href = '#';
        a.addEventListener('click', function (e) { e.preventDefault(); });
        var label = a.querySelector('[data-cv-label]');
        if (label) label.textContent = LANG === 'fr' ? 'CV bientôt disponible' : 'CV coming soon';
      } else {
        a.href = BASE + cv;
      }
    });
  }

  window.Components = {
    init: function () {
      var tasks = [];
      hydrateContactDetails();

      var loaderRoot = document.getElementById('loader-root');
      if (loaderRoot) {
        tasks.push(fetchText(BASE + 'components/loader.html').then(function (html) {
          loaderRoot.innerHTML = html;
        }).catch(function () {}));
      }

      var navRoot = document.getElementById('navbar-root');
      if (navRoot) {
        tasks.push(fetchText(BASE + 'components/navbar.html').then(function (html) {
          navRoot.innerHTML = html;
          hydrateNav(navRoot);
          wireMobileMenu();
          if (window.ThemeManager) window.ThemeManager.init();
          if (window.LanguageManager) window.LanguageManager.init();
        }).catch(function (err) {
          console.error('Navbar non chargée :', err);
        }));
      }

      var footRoot = document.getElementById('footer-root');
      if (footRoot) {
        tasks.push(fetchText(BASE + 'components/footer.html').then(function (html) {
          footRoot.innerHTML = html;
          hydrateFooter(footRoot);
        }).catch(function (err) {
          console.error('Footer non chargé :', err);
        }));
      }

      Promise.all(tasks).then(function () {
        if (window.lucide) window.lucide.createIcons();
        var loader = document.getElementById('site-loader');
        if (loader) {
          // Masquer après un court délai pour éviter un flash
          setTimeout(function () { loader.classList.add('is-hidden'); }, 150);
        }
        wireCVLinks();
      });
    }
  };
})();