/* Gafete doble cara en hoja carta o A4, siempre a 300 dpi.
   Cada cara mide 4x5" (1200x1500 px), centrada en la hoja, y ambas
   comparten el borde superior en la linea media: la trasera va
   rotada 180 grados en la mitad de arriba. Nada sale del navegador:
   las imagenes se procesan en canvas local. */
(function () {
  "use strict";

  var PAPER = {
    carta: { w: 2550, h: 3300, page: "letter", inW: "8.5in", inH: "11in" },
    a4:    { w: 2480, h: 3508, page: "A4",     inW: "210mm", inH: "297mm" }
  };
  var BW = 1200, BH = 1500;
  var W, H, MID, X0;

  var canvas = document.getElementById("hoja");
  var ctx = canvas.getContext("2d");
  var dlPng = document.getElementById("dlPng");
  var printBtn = document.getElementById("printBtn");
  var pageStyle = document.createElement("style");
  document.head.appendChild(pageStyle);

  function paper() {
    var r = document.querySelector('input[name="paper"]:checked');
    return PAPER[(r && r.value) === "a4" ? "a4" : "carta"];
  }

  /* ajusta lienzo, guias y la hoja de estilo @page/#printSheet al papel */
  function setPaper() {
    var p = paper();
    W = p.w; H = p.h; MID = H / 2; X0 = (W - BW) / 2;
    canvas.width = W; canvas.height = H;
    pageStyle.textContent =
      "@page{size:" + p.page + ";margin:0}" +
      "@media print{#printSheet{width:" + p.inW + ";height:" + p.inH + "}}";
    render();
  }

  var imgs = { A: null, B: null };

  function fitMode() {
    var r = document.querySelector('input[name="fit"]:checked');
    return r ? r.value : "cover";
  }

  function drawFit(img, dx, dy, dw, dh) {
    var ir = img.width / img.height, dr = dw / dh;
    if (fitMode() === "cover") {
      var sw, sh, sx, sy;
      if (ir > dr) { sh = img.height; sw = sh * dr; sx = (img.width - sw) / 2; sy = 0; }
      else { sw = img.width; sh = sw / dr; sx = 0; sy = (img.height - sh) / 2; }
      ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    } else {
      var w = dw, h = dh;
      if (ir > dr) { h = dw / ir; } else { w = dh * ir; }
      ctx.drawImage(img, dx + (dw - w) / 2, dy + (dh - h) / 2, w, h);
    }
  }

  function guides() {
    ctx.strokeStyle = "#b8b8b8";
    ctx.setLineDash([24, 24]);
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(60, MID); ctx.lineTo(X0 - 20, MID);
    ctx.moveTo(X0 + BW + 20, MID); ctx.lineTo(W - 60, MID);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = "#cfcfcf";
    ctx.lineWidth = 3;
    ctx.strokeRect(X0, MID - BH, BW, BH);
    ctx.strokeRect(X0, MID, BW, BH);
  }

  function render() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, W, H);
    var front = imgs.A, back = imgs.B || imgs.A;
    if (back) {
      ctx.save();
      ctx.translate(X0 + BW / 2, MID - BH / 2);
      ctx.rotate(Math.PI);
      drawFit(back, -BW / 2, -BH / 2, BW, BH);
      ctx.restore();
    }
    if (front) drawFit(front, X0, MID, BW, BH);
    guides();
    var ready = !!front;
    dlPng.disabled = !ready;
    printBtn.disabled = !ready;
  }

  function loadBitmap(file, done) {
    var url = URL.createObjectURL(file);
    function viaImg() {
      var el = new Image();
      el.onload = function () { URL.revokeObjectURL(url); done(el); };
      el.onerror = function () { URL.revokeObjectURL(url); };
      el.src = url;
    }
    if (window.createImageBitmap) {
      createImageBitmap(file, { imageOrientation: "from-image" })
        .then(function (bmp) { URL.revokeObjectURL(url); done(bmp); })
        .catch(viaImg);
    } else {
      viaImg();
    }
  }

  function bindSlot(inputId, dropId, key) {
    var input = document.getElementById(inputId);
    var drop = document.getElementById(dropId);
    function take(file) {
      if (!file || !/^image\//.test(file.type)) return;
      loadBitmap(file, function (bmp) {
        imgs[key] = bmp;
        var old = drop.querySelector(".drop__img");
        if (old) old.remove();
        var th = document.createElement("img");
        th.className = "drop__img";
        th.alt = "";
        th.src = URL.createObjectURL(file);
        drop.appendChild(th);
        drop.querySelector(".drop__h").textContent = file.name;
        render();
      });
    }
    input.addEventListener("change", function () { take(input.files[0]); });
    drop.addEventListener("dragover", function (e) { e.preventDefault(); drop.classList.add("is-over"); });
    drop.addEventListener("dragleave", function () { drop.classList.remove("is-over"); });
    drop.addEventListener("drop", function (e) {
      e.preventDefault();
      drop.classList.remove("is-over");
      take(e.dataTransfer.files[0]);
    });
  }

  bindSlot("fileA", "dropA", "A");
  bindSlot("fileB", "dropB", "B");

  document.querySelectorAll('input[name="fit"]').forEach(function (r) {
    r.addEventListener("change", render);
  });
  document.querySelectorAll('input[name="paper"]').forEach(function (r) {
    r.addEventListener("change", setPaper);
  });

  dlPng.addEventListener("click", function () {
    canvas.toBlob(function (blob) {
      var a = document.createElement("a");
      var en = document.documentElement.lang !== "es";
      a.href = URL.createObjectURL(blob);
      a.download = (en ? "badge" : "gafete") + "-" +
        (paper() === PAPER.a4 ? "a4" : en ? "letter" : "carta") + ".png";
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
    }, "image/png");
  });

  var printImg = null;
  printBtn.addEventListener("click", function () {
    if (!printImg) {
      printImg = document.createElement("img");
      printImg.id = "printSheet";
      printImg.alt = "";
      document.body.appendChild(printImg);
    }
    printImg.onload = function () {
      document.body.classList.add("printing");
      window.print();
    };
    printImg.src = canvas.toDataURL("image/png");
  });
  window.addEventListener("afterprint", function () {
    document.body.classList.remove("printing");
  });

  setPaper();
})();
