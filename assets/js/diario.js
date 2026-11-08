/* NSAC — scroll infinito del diario: al pasar la mitad del último post
   visible se carga el siguiente desde su permalink y se inserta. */
(function () {
  "use strict";
  var feed = document.getElementById("diario-feed"),
      more = document.getElementById("diario-more"),
      end = document.getElementById("diario-end");
  if (!feed || !window.DIARIO_PENDING) return;
  var urls = window.DIARIO_PENDING.slice(),
      base = window.DIARIO_BASE || "/",
      loading = false;

  function siguiente() {
    if (loading) return;
    if (!urls.length) { end.hidden = false; return; }
    loading = true; more.hidden = false;
    var url = urls.shift();
    url = base.replace(/\/$/, "") + url;
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var art = new DOMParser()
          .parseFromString(html, "text/html")
          .querySelector("article");
        if (art) {
          var wrap = document.createElement("article");
          wrap.className = "diario-post";
          wrap.innerHTML = art.innerHTML;
          feed.appendChild(wrap);
        }
        loading = false; more.hidden = true;
        comprobar();
      })
      .catch(function () { loading = false; more.hidden = true; });
  }

  function comprobar() {
    var arts = feed.querySelectorAll(".diario-post");
    if (!arts.length) return;
    if (!urls.length) { end.hidden = false; return; }
    var r = arts[arts.length - 1].getBoundingClientRect();
    if (r.top + r.height / 2 < window.innerHeight) siguiente();
  }

  window.addEventListener("scroll", comprobar, { passive: true });
  comprobar();
})();
