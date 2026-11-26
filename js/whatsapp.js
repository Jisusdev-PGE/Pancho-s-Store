(() => {
  "use strict";
  const phone = "51946608900";
  const message = "¡Hola! Vi esta promocion que anda de rompe y raja, dame mas info https://jisusdev-pge.github.io/Pancho-s-Store/";
  const url = "https://web.whatsapp.com/send?phone=" + phone + "&text=" + encodeURIComponent(message);
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
})();