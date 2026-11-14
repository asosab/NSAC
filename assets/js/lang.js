/* Recuerda la eleccion de idioma (localStorage) y la aplica al entrar:
   si el idioma guardado difiere del de la pagina y existe la version
   alternativa (link hreflang), redirige a ella. Sin deteccion por
   navegador: solo cuenta lo que el usuario eligio con el suiche. */
(function () {
  "use strict";

  var KEY = "nsac-lang";
  var cur = document.documentElement.lang === "es" ? "es" : "en";
  var want;
  try { want = localStorage.getItem(KEY); } catch (e) { want = null; }

  if ((want === "es" || want === "en") && want !== cur) {
    var alt = document.querySelector('link[rel="alternate"][hreflang="' + want + '"]');
    if (alt && alt.href) { location.replace(alt.href); return; }
  }

  document.addEventListener("click", function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest(".langs a") : null;
    if (!a) return;
    var l = a.getAttribute("lang");
    if (l === "es" || l === "en") {
      try { localStorage.setItem(KEY, l); } catch (e) {}
    }
  });
})();
