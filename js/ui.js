/* =====================================================================
   Pancho's Store — Interfaz
   1. Menú desplegable accesible (tablet y móvil)
   2. Enlace activo según la sección visible
   3. Año del pie de página
   4. Header con sombra al hacer scroll
   Sin dependencias. Compatible con GitHub Pages.
   ===================================================================== */
(function () {
  'use strict';

  /* 1. Menú --------------------------------------------------------- */
  function setupMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.getElementById('menu');
    if (!toggle || !menu) return;

    var wide = window.matchMedia('(min-width: 861px)');

    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.site-header')) setOpen(false);
    });

    function onChange(e) { if (e.matches) setOpen(false); }
    if (wide.addEventListener) wide.addEventListener('change', onChange);
    else if (wide.addListener) wide.addListener(onChange);
  }

  /* 2. Enlace activo ------------------------------------------------ */
  function setupActiveLink() {
    if (!('IntersectionObserver' in window)) return;
    var links = document.querySelectorAll('.nav a[href^="#"]');
    var byId = {};
    for (var i = 0; i < links.length; i++) {
      byId[links[i].getAttribute('href').slice(1)] = links[i];
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        for (var id in byId) byId[id].removeAttribute('aria-current');
        var link = byId[entry.target.id];
        if (link) link.setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    for (var id in byId) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    }
  }

  /* 3. Año del pie -------------------------------------------------- */
  function setupYear() {
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* 4. Header al scroll --------------------------------------------- */
  function setupHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var ticking = false;
    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  setupMenu();
  setupActiveLink();
  setupYear();
  setupHeaderScroll();
})();
