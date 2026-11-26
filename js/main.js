/* =====================================================================
   Pancho's Store — Comportamiento del sitio
   1. Configuración de contacto (WhatsApp Web)
   2. Menú móvil accesible
   3. Enlace activo según la sección visible
   4. Año del pie de página
   Sin dependencias. Compatible con GitHub Pages.
   ===================================================================== */
(function () {
  'use strict';

  var STORE_URL = 'https://jisusdev-pge.github.io/Pancho-s-Store/';
  var WHATSAPP_PHONE = '51946608900';
  var WHATSAPP_MESSAGE = '¡Hola! Vi esta promocion que anda de rompe y raja, dame mas info';

  function encodeText(text) {
    return encodeURIComponent(text).replace(/[!'()*]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }

  function buildWhatsAppWebUrl() {
    var text = WHATSAPP_MESSAGE + ' ' + STORE_URL;
    return 'https://web.whatsapp.com/send?phone=' + WHATSAPP_PHONE + '&text=' + encodeText(text);
  }

  function setupWhatsApp() {
    var url = buildWhatsAppWebUrl();
    var buttons = document.querySelectorAll('[data-whatsapp]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('href', url);
      buttons[i].setAttribute('target', '_blank');
      buttons[i].setAttribute('rel', 'noopener noreferrer');
    }
  }

  function setupMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.getElementById('menu');
    if (!toggle || !menu) return;
    var desktop = window.matchMedia('(min-width: 701px)');

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
    if (desktop.addEventListener) desktop.addEventListener('change', onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  function setupActiveLink() {
    if (!('IntersectionObserver' in window)) return;
    var links = document.querySelectorAll('.nav a[href^="#"]');
    var byId = {};
    for (var i = 0; i < links.length; i++) byId[links[i].getAttribute('href').slice(1)] = links[i];
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

  function setupYear() {
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  setupWhatsApp();
  setupMenu();
  setupActiveLink();
  setupYear();
})();