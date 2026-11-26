/* =====================================================================
   Pancho's Store — Botones de WhatsApp
   - Celular / tablet: https://wa.me/...        → abre la app de WhatsApp
   - Computadora:      https://web.whatsapp.com → abre WhatsApp Web directo
   Todos los elementos con el atributo data-whatsapp usan estos enlaces.
   ===================================================================== */
(function () {
  'use strict';

  // Datos de contacto: editar solo aquí.
  var CONFIG = {
    phone: '51946608900', // +51 946 608 900, solo dígitos con código de país
    message: '¡Hola! Vi esta promocion que anda de rompe y raja, dame mas info',
    storeUrl: 'https://jisusdev-pge.github.io/Pancho-s-Store/'
  };

  // encodeURIComponent no codifica ! ' ( ) * — los codificamos también
  // para que el texto viaje idéntico en cualquier navegador.
  function encodeText(text) {
    return encodeURIComponent(text).replace(/[!'()*]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }

  // ¿Es un celular o tablet? (iPadOS se presenta como Mac, por eso se mira el táctil)
  function isMobileDevice() {
    var nav = window.navigator;
    if (nav.userAgentData && nav.userAgentData.mobile === true) return true;
    var ua = nav.userAgent || '';
    if (/Android|iPhone|iPad|iPod|Mobile|Windows Phone|IEMobile/i.test(ua)) return true;
    return /Macintosh/.test(ua) && nav.maxTouchPoints > 1;
  }

  function buildUrl(mobile) {
    var text = encodeText(CONFIG.message + ' ' + CONFIG.storeUrl);
    if (mobile) return 'https://wa.me/' + CONFIG.phone + '?text=' + text;
    return 'https://web.whatsapp.com/send?phone=' + CONFIG.phone + '&text=' + text;
  }

  function setup() {
    var mobile = isMobileDevice();
    var url = buildUrl(mobile);
    var links = document.querySelectorAll('[data-whatsapp]');

    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      link.setAttribute('href', url);
      link.setAttribute('data-whatsapp-mode', mobile ? 'app' : 'web');
      if (mobile) {
        // Misma pestaña: así el sistema abre la app directamente
        link.removeAttribute('target');
        link.removeAttribute('rel');
      } else {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    }
  }

  // El script se carga con "defer": el DOM ya está listo.
  setup();
})();
