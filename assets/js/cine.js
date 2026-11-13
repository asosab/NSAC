/* NSAC — modo cine: clic sobre cualquier imagen de la página abre un
   pase de diapositivas a pantalla completa. En el diario y la galería el
   pase usa todo el material de _data/galeria.yml (que el layout expone
   en window.NSAC_GALERIA); fuera de ahí —por ejemplo en la landing— el
   pase recorre todas las imágenes de <main> en orden del documento, con
   su figcaption como pie cuando la hay. */
(function () {
  "use strict";

  var INTERVALO = 4500;

  var cine = null, img, pie, contador, btnPlay, origen;
  var slides = [], pos = 0, timer = null, tocX = null;

  function reducir() {
    return window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function base() {
    return (window.NSAC_BASE || "/").replace(/\/$/, "");
  }

  function archivo(src) {
    return src.split("?")[0].split("/").pop();
  }

  function montar() {
    if (cine) return;
    cine = document.createElement("div");
    cine.className = "cine";
    cine.hidden = true;
    cine.setAttribute("role", "dialog");
    cine.setAttribute("aria-modal", "true");
    cine.setAttribute("aria-label", "Pase de diapositivas de la galería");
    cine.innerHTML =
      '<button class="cine__x" type="button" data-a="cerrar" aria-label="Cerrar">&times;</button>' +
      '<figure class="cine__stage">' +
      '<img class="cine__img" alt="">' +
      '<figcaption class="cine__pie"></figcaption>' +
      '</figure>' +
      '<div class="cine__ui">' +
      '<button class="cine__btn" type="button" data-a="prev" aria-label="Anterior">&#8249;</button>' +
      '<button class="cine__btn" type="button" data-a="play" aria-label="Pausar">&#10074;&#10074;</button>' +
      '<button class="cine__btn" type="button" data-a="next" aria-label="Siguiente">&#8250;</button>' +
      '<span class="cine__n"></span>' +
      '</div>';
    document.body.appendChild(cine);
    img = cine.querySelector(".cine__img");
    pie = cine.querySelector(".cine__pie");
    contador = cine.querySelector(".cine__n");
    btnPlay = cine.querySelector('[data-a="play"]');

    cine.addEventListener("click", function (e) {
      var a = e.target.getAttribute && e.target.getAttribute("data-a");
      if (a === "prev") mover(-1);
      else if (a === "next") mover(1);
      else if (a === "play") alternar();
      else if (a === "cerrar" || e.target === cine) cerrar();
    });

    cine.addEventListener("touchstart", function (e) {
      tocX = e.changedTouches[0].clientX;
    }, { passive: true });
    cine.addEventListener("touchend", function (e) {
      if (tocX === null) return;
      var dx = e.changedTouches[0].clientX - tocX;
      if (dx < -40) mover(1);
      else if (dx > 40) mover(-1);
      tocX = null;
    }, { passive: true });
  }

  function mostrar() {
    var s = slides[pos];
    img.src = s.src;
    img.alt = s.alt;
    pie.textContent = s.pie;
    pie.hidden = !s.pie;
    contador.textContent = (pos + 1) + " / " + slides.length;
    var prox = slides[(pos + 1) % slides.length];
    if (prox && prox.src !== s.src) {
      var p = new Image();
      p.src = prox.src;
    }
  }

  function pausar() {
    if (timer) { clearInterval(timer); timer = null; }
    btnPlay.innerHTML = "&#9654;";
    btnPlay.setAttribute("aria-label", "Reproducir");
  }

  function reproducir() {
    pausar();
    timer = setInterval(function () {
      pos = (pos + 1) % slides.length;
      mostrar();
    }, INTERVALO);
    btnPlay.innerHTML = "&#10074;&#10074;";
    btnPlay.setAttribute("aria-label", "Pausar");
  }

  function alternar() {
    if (timer) pausar(); else reproducir();
  }

  function mover(dir) {
    pos = (pos + dir + slides.length) % slides.length;
    mostrar();
    if (timer) reproducir(); /* reinicia el intervalo desde esta diapositiva */
  }

  function slidesPagina() {
    var imgs = document.querySelectorAll("main img");
    var vistos = {}, arr = [];
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      if (vistos[im.src]) continue;
      vistos[im.src] = 1;
      var fig = im.closest("figure");
      var cap = fig && fig.querySelector("figcaption");
      arr.push({
        src: im.src,
        pie: cap ? cap.textContent.trim() : (im.alt || ""),
        alt: im.alt || ""
      });
    }
    return arr;
  }

  function abrir(t) {
    montar();
    origen = t;
    var gal = window.NSAC_GALERIA || [];
    var nom = archivo(t.src), i;
    pos = -1;
    if ((t.closest(".post__body") || t.closest(".gal__item")) && gal.length) {
      slides = gal.map(function (f) {
        return {
          src: base() + f.src,
          pie: f.pie || f.alt || "",
          alt: f.alt || ""
        };
      });
      for (i = 0; i < slides.length; i++) {
        if (archivo(slides[i].src) === nom) { pos = i; break; }
      }
    } else {
      slides = slidesPagina();
      for (i = 0; i < slides.length; i++) {
        if (slides[i].src === t.src) { pos = i; break; }
      }
    }
    if (pos < 0) {
      slides.unshift({ src: t.src, pie: t.alt || "", alt: t.alt || "" });
      pos = 0;
    }
    cine.classList.toggle("cine--solo", slides.length < 2);
    cine.hidden = false;
    document.body.style.overflow = "hidden";
    mostrar();
    if (slides.length > 1 && !reducir()) reproducir(); else pausar();
    cine.querySelector(".cine__x").focus();
  }

  function cerrar() {
    pausar();
    cine.hidden = true;
    document.body.style.overflow = "";
    if (origen) origen.focus();
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || t.tagName !== "IMG" || cine && !cine.hidden) return;
    if (!t.closest("main")) return;
    e.preventDefault();
    abrir(t);
  });

  document.addEventListener("keydown", function (e) {
    if (!cine || cine.hidden) return;
    if (e.key === "Escape") cerrar();
    else if (e.key === "ArrowLeft") mover(-1);
    else if (e.key === "ArrowRight") mover(1);
    else if (e.key === " ") { e.preventDefault(); alternar(); }
  });
})();
