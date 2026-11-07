/* NSAC — planeta de plastilina + cohete sincronizado a la cuenta regresiva.
   Ventana oficial del hackathon (hora local):
   abre sábado 14 nov 2026 09:00 · cierra domingo 15 nov 2026 23:59:59. */
(function () {
  "use strict";

  var T0 = new Date(2026, 10, 14, 9, 0, 0);        // empieza
  var T1 = new Date(2026, 10, 15, 23, 59, 59);     // cierra
  var LAUNCH = new Date(2026, 10, 1, 0, 0, 0);     // el cohete ya venía en camino
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- demo secreta: AAA aterriza, DDD despega ---------- */

  var demo = null, demoT = 0, keys = [];
  window.addEventListener("keydown", function (e) {
    var k = e.key.toLowerCase();
    if (k !== "a" && k !== "d") return;
    var now = Date.now();
    keys = keys.filter(function (k2) { return k2.k === k && now - k2.t < 800; });
    keys.push({ k: k, t: now });
    if (keys.length >= 3) { keys = []; demo = k === "a" ? "approach" : "depart"; demoT = 0; }
  });

  /* ---------- cuenta regresiva ---------- */

  var elD = document.getElementById("cd-d"),
      elH = document.getElementById("cd-h"),
      elM = document.getElementById("cd-m"),
      elS = document.getElementById("cd-s"),
      liveMsg = document.getElementById("live-msg"),
      claim = document.getElementById("claim");

  var estado = "pre"; // pre | live | done
  function pad(n) { return String(n); }

  /* ---------- firma: el monumento responde al scroll ---------- */

  var cdEl = document.querySelector(".hero__cd"),
      wordEl = document.querySelector(".footer__word"),
      catEls = document.querySelectorAll(".cat"),
      driftEls = document.querySelectorAll(".media-band__row img");

  function scrollFx() {
    if (reduceMotion) return;
    var sp = scrollP;
    /* la cuenta regresiva pesa: se encoge un poco al salir de pantalla */
    if (cdEl) cdEl.style.transform = "scale(" + (1 - Math.min(sp * 0.35, 0.08)) + ")";
    /* las fotos de la banda suben a ritmos distintos */
    driftEls.forEach(function (img, i) {
      img.style.translate = "0 " + (sp * (18 + i * 14)) + "px";
    });
    /* los títulos de sección se desplazan apenas */
    catEls.forEach(function (c, i) {
      c.style.translate = (sp * (i % 2 ? -1 : 1) * 18) + "px 0";
    });
    /* el wordmark del pie crece al llegar */
    if (wordEl && sp > 0.5) {
      var r = wordEl.getBoundingClientRect();
      var k = Math.min(Math.max((window.innerHeight - r.top) / window.innerHeight, 0), 1);
      wordEl.style.transform = "scale(" + (0.94 + k * 0.06) + ")";
    }
  }

  function tick() {
    var now = new Date(), target;
    if (now < T0) { estado = "pre"; target = T0; }
    else if (now < T1) { estado = "live"; target = T1; }
    else { estado = "done"; target = T1; }

    var left = Math.max(0, target - now);
    var d = Math.floor(left / 864e5),
        h = Math.floor(left % 864e5 / 36e5),
        m = Math.floor(left % 36e5 / 6e4),
        s = Math.floor(left % 6e4 / 1e3);
    elD.textContent = pad(d); elH.textContent = pad(h);
    elM.textContent = pad(m); elS.textContent = pad(s);

    if (estado === "live") {
      liveMsg.hidden = false;
      claim.textContent = "El hackathon corre hasta el domingo 15 a las 23:59.";
    } else if (estado === "done") {
      liveMsg.hidden = false;
      liveMsg.textContent = "Misión cumplida.";
      claim.textContent = "El hackathon terminó. El resultado está en el diario.";
    }
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- entradas por sección (independientes de WebGL) ---------- */

  document.querySelectorAll(".intro__col, .reto, .cat, .about__row, .cta__row, .fcol, .media-band, .hero__top, .hero__cd").forEach(function (el) {
    el.classList.add("rise");
  });
  /* seguridad: nada queda oculto si el observer no dispara */
  setTimeout(function () {
    document.querySelectorAll(".rise").forEach(function (el) { el.classList.add("on"); });
  }, 2600);
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("on"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".rise").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".rise").forEach(function (el) { el.classList.add("on"); });
  }

  /* el video se pausa si el usuario prefiere menos movimiento */
  if (reduceMotion) {
    document.querySelectorAll("video[autoplay]").forEach(function (v) { v.pause(); v.removeAttribute("autoplay"); });
  }

  /* ---------- escena ---------- */

  var canvas = document.getElementById("planeta");
  if (!window.THREE || !canvas) return;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (e) { canvas.style.display = "none"; return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);

  scene.add(new THREE.HemisphereLight(0xbfd4e8, 0x3a3630, 0.95));
  var sun = new THREE.DirectionalLight(0xfff2dd, 1.35);
  sun.position.set(4, 2.5, 3);
  scene.add(sun);
  scene.add(new THREE.AmbientLight(0x404040, 0.6));

  /* estrellas */
  (function () {
    var g = new THREE.BufferGeometry(), n = 700, pos = new Float32Array(n * 3);
    for (var i = 0; i < n; i++) {
      var r = 14 + Math.random() * 18, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(p) * Math.cos(t);
      pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.6 + 3;
      pos[i * 3 + 2] = r * Math.cos(p);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    var stars = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xd8dcd6, size: 0.045, sizeAttenuation: true }));
    scene.add(stars);
  })();

  /* ---------- textura de la Tierra, dibujada como plastilina ---------- */

  function blob(ctx, pts, W, H, fill) {
    ctx.fillStyle = fill;
    ctx.beginPath();
    pts.forEach(function (pt, i) {
      var x = (pt[0] + 180) / 360 * W, y = (90 - pt[1]) / 180 * H;
      i === 0 ? ctx.moveTo(x, y) : ctx.quadraticCurveTo(
        (pts[i - 1][0] + 180) / 360 * W + (x - (pts[i - 1][0] + 180) / 360 * W) / 2 + (i % 2 ? 8 : -8),
        (90 - pts[i - 1][1]) / 180 * H + (i % 2 ? 6 : -6), x, y);
    });
    ctx.closePath(); ctx.fill();
  }

  function earthTexture() {
    var W = 2048, H = 1024, c = document.createElement("canvas");
    c.width = W; c.height = H;
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#4a7cae"; ctx.fillRect(0, 0, W, H);          // océano arcilla

    var LAND = "#7ba05b", LAND2 = "#5d8a4a", DRY = "#c9a86a", ICE = "#e8e3da";

    blob(ctx, [[-80,10],[-70,12],[-60,8],[-50,0],[-40,-5],[-35,-8],[-40,-20],[-50,-30],[-58,-38],[-65,-45],[-70,-52],[-73,-45],[-70,-35],[-70,-20],[-75,-15],[-80,-5],[-85,0],[-85,5]], W, H, LAND);
    blob(ctx, [[-75,5],[-60,5],[-55,0],[-60,-8],[-70,-10],[-77,-5],[-80,0]], W, H, LAND2);            // Amazonia
    blob(ctx, [[-160,65],[-140,70],[-120,72],[-100,70],[-85,68],[-75,62],[-60,55],[-55,48],[-65,45],[-75,40],[-80,30],[-90,20],[-97,16],[-95,10],[-85,8],[-80,8],[-85,15],[-95,18],[-105,20],[-110,25],[-115,30],[-120,35],[-125,40],[-125,48],[-130,55],[-150,60]], W, H, LAND);
    blob(ctx, [[-105,30],[-95,25],[-90,20],[-100,18],[-110,22],[-112,28]], W, H, DRY);               // Norteamérica seca
    blob(ctx, [[-15,15],[-5,12],[5,10],[10,5],[15,5],[20,0],[25,-5],[30,-10],[35,-15],[35,-25],[30,-35],[25,-35],[20,-35],[15,-30],[12,-20],[10,-10],[5,5],[0,8],[-5,10],[-10,15],[-15,20],[-17,22]], W, H, DRY);
    blob(ctx, [[-12,20],[5,18],[15,15],[25,12],[30,18],[20,25],[5,28],[-8,26]], W, H, "#b8945a");    // Sahara
    blob(ctx, [[-10,36],[-5,43],[0,46],[5,50],[10,55],[15,58],[25,60],[40,62],[60,65],[80,68],[100,70],[120,72],[140,70],[160,65],[170,62],[175,60],[165,55],[150,50],[140,45],[130,40],[120,35],[115,25],[108,18],[100,8],[95,15],[90,22],[85,20],[80,10],[75,15],[70,22],[60,25],[55,28],[50,30],[45,35],[40,38],[35,40],[30,42],[20,40],[10,38],[0,36]], W, H, LAND);
    blob(ctx, [[75,20],[85,22],[90,15],[82,8],[76,12],[73,18]], W, H, LAND2);                        // India
    blob(ctx, [[100,15],[108,12],[110,5],[105,2],[100,6],[98,12]], W, H, LAND2);                     // SE Asia
    blob(ctx, [[113,-22],[120,-20],[130,-15],[138,-12],[142,-10],[145,-18],[150,-22],[153,-28],[150,-35],[145,-38],[138,-35],[130,-32],[120,-34],[115,-35],[113,-30]], W, H, DRY);
    ctx.fillStyle = ICE;
    ctx.beginPath(); ctx.ellipse(W / 2, 14, W * 0.52, 26, 0, 0, Math.PI * 2); ctx.fill();            // Ártico
    ctx.beginPath(); ctx.ellipse(W / 2, H - 8, W * 0.52, 40, 0, 0, Math.PI * 2); ctx.fill();         // Antártida
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    [[-60,20],[-20,-5],[30,-12],[-100,35],[80,30],[-40,-30],[120,-20]].forEach(function (cl) {        // nubes de algodón
      ctx.beginPath();
      ctx.ellipse((cl[0] + 180) / 360 * W, (90 - cl[1]) / 180 * H, 90, 26, cl[0] / 40, 0, Math.PI * 2);
      ctx.fill();
    });
    var tex = new THREE.CanvasTexture(c);
    return tex;
  }

  var earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 48, 48),
    new THREE.MeshStandardMaterial({ map: earthTexture(), roughness: 0.95, metalness: 0 })
  );
  var world = new THREE.Group();
  world.add(earth);

  var atmo = new THREE.Mesh(
    new THREE.SphereGeometry(1.03, 40, 40),
    new THREE.MeshBasicMaterial({ color: 0x6d9ed0, transparent: true, opacity: 0.14, side: THREE.BackSide })
  );
  world.add(atmo);
  scene.add(world);

  /* ---------- nave de arcilla: tecnología que aún no existe ---------- */

  function clay(color) { return new THREE.MeshStandardMaterial({ color: color, roughness: 1, metalness: 0 }); }
  var WHITE = 0xe8e3da, CORAL = 0xd4574a, SAGE = 0x8fa68e, DARK = 0x2a2a28;

  var ship = new THREE.Group();

  var body = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.075, 0.22, 24), clay(WHITE));
  ship.add(body);
  var nose = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.11, 24), clay(CORAL));
  nose.position.y = 0.165; ship.add(nose);

  // anillos gravitacionales: lo que la hace capaz de aterrizar y volver a subir
  [0.105, 0.14].forEach(function (r, i) {
    var ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.012, 10, 40), clay(SAGE));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.02 - i * 0.07;
    ship.add(ring);
  });

  for (var f = 0; f < 3; f++) {
    var fin = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.1, 0.06), clay(CORAL));
    var a = f / 3 * Math.PI * 2;
    fin.position.set(Math.cos(a) * 0.085, -0.11, Math.sin(a) * 0.085);
    fin.rotation.y = -a;
    ship.add(fin);
  }
  var port = new THREE.Mesh(new THREE.SphereGeometry(0.02, 12, 12), clay(DARK));
  port.position.set(0, 0.08, 0.062); ship.add(port);

  var flame = new THREE.Mesh(
    new THREE.ConeGeometry(0.045, 0.14, 16),
    new THREE.MeshBasicMaterial({ color: 0xffa54a })
  );
  flame.rotation.x = Math.PI; flame.position.y = -0.19;
  ship.add(flame);
  scene.add(ship);

  /* banderita que queda para siempre */
  var flag = new THREE.Group();
  var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.14, 8), clay(WHITE));
  pole.position.y = 0.07; flag.add(pole);
  var cloth = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.032, 0.004), clay(CORAL));
  cloth.position.set(0.03, 0.12, 0); flag.add(cloth);
  flag.visible = false;
  world.add(flag);

  /* el punto de aterrizaje: Sudamérica, cerca de casa */
  function latLon(lon, lat, r) {
    var phi = (90 - lat) * Math.PI / 180, theta = (lon + 180) * Math.PI / 180;
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  }
  var SPOT = latLon(-63.18, -17.78, 1.005);
  var SPOT2 = SPOT.clone().multiplyScalar(2);
  flag.position.copy(SPOT);
  flag.lookAt(SPOT2);

  var approachCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(7.5, 4.2, 8.5),
    new THREE.Vector3(3.8, 2.1, 4.8),
    new THREE.Vector3(1.9, 1.0, 2.6),
    SPOT.clone()
  ]);
  var departCurve = new THREE.CatmullRomCurve3([
    SPOT.clone(),
    SPOT.clone().multiplyScalar(1.35).add(new THREE.Vector3(0.2, 0.35, 0.3)),
    SPOT.clone().multiplyScalar(2.2).add(new THREE.Vector3(0.7, 1.1, 0.9)),
    new THREE.Vector3(6, 5.5, 9)
  ]);

  /* trayectorias premuestreadas: sin asignar vectores en cada frame */
  var PATH_N = 160;
  function bake(curve) {
    var pts = [];
    for (var i = 0; i <= PATH_N; i++) pts.push(curve.getPoint(i / PATH_N));
    return pts;
  }
  var approach = bake(approachCurve), depart = bake(departCurve);

  var _p = new THREE.Vector3(), _a = new THREE.Vector3();
  function samplePath(pts, tt, out) {
    var f = tt * PATH_N, i = Math.min(Math.floor(f), PATH_N - 1), r = f - i;
    return out.copy(pts[i]).lerp(pts[i + 1], r);
  }
  function aim(ship, pts, tt) {
    samplePath(pts, Math.min(tt, 1), _p);
    samplePath(pts, Math.min(tt + 0.02, 1), _a);
    ship.position.copy(_p);
    ship.lookAt(_a);
    ship.rotateX(Math.PI / 2);
  }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function easeIn(t) { return t * t * t; }

  /* ---------- cámara y scroll ---------- */

  var scrollP = 0;
  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    scrollP = max > 0 ? window.scrollY / max : 0;
    scrollFx();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  var clock = new THREE.Clock();

  function frame() {
    var dt = Math.min(clock.getDelta(), 0.1);
    var t = clock.elapsedTime;
    var now = new Date();

    /* el planeta se asoma y crece con el scroll */
    world.position.y = -1.55 + Math.min(scrollP * 1.15, 1) * 0.75;
    world.rotation.y = 2.2 + scrollP * 1.4 + (reduceMotion ? 0 : t * 0.02);
    world.rotation.x = 0.12;

    if (demo === "approach") {
      demoT += dt * 0.25;
      var ta = Math.min(demoT, 1);
      aim(ship, approach, easeOut(ta));
      ship.position.x += Math.sin(t * 2.1) * 0.02;
      ship.position.y += Math.sin(t * 1.7) * 0.02;
      flame.visible = ta < 0.98;
      flame.scale.setScalar(0.8 + Math.sin(t * 14) * 0.25);
      flag.visible = false;
      if (ta >= 1) demo = "landed";
    } else if (demo === "landed") {
      ship.position.copy(SPOT);
      ship.position.y += Math.sin(t * 1.2) * 0.004;
      ship.lookAt(SPOT2);
      ship.rotateX(Math.PI / 2);
      flame.visible = false;
      flag.visible = true;
    } else if (demo === "depart") {
      demoT += dt * 0.25;
      var td = easeIn(Math.min(demoT, 1));
      aim(ship, depart, td);
      flame.visible = true;
      flame.scale.setScalar(1 + Math.sin(t * 16) * 0.3);
      flag.visible = true;
      if (td >= 1) { demo = "gone"; ship.visible = false; }
    } else if (demo === "gone") {
      ship.visible = false;
      flag.visible = true;
    } else if (estado === "pre") {
      var p = Math.min(Math.max((now - LAUNCH) / (T0 - LAUNCH), 0), 1);
      var eased = easeOut(p);
      aim(ship, approach, eased);
      ship.position.x += Math.sin(t * 2.1) * 0.02;
      ship.position.y += Math.sin(t * 1.7) * 0.02;
      flame.visible = eased < 0.98;
      flame.scale.setScalar(0.8 + Math.sin(t * 14) * 0.25);
      flag.visible = false;
    } else if (estado === "live") {
      var q = (now - T0) / (T1 - T0);
      flag.visible = true;
      if (q < 0.72) {
        /* aterrizada, con una respiración mínima */
        ship.position.copy(SPOT);
        ship.position.y += Math.sin(t * 1.2) * 0.004;
        ship.lookAt(SPOT2);
        ship.rotateX(Math.PI / 2);
        flame.visible = false;
      } else {
        /* despegue: se va para no volver */
        var k = easeIn((q - 0.72) / 0.28);
        aim(ship, depart, k);
        flame.visible = true;
        flame.scale.setScalar(1 + Math.sin(t * 16) * 0.3);
      }
    } else {
      ship.visible = false;
      flag.visible = true;
    }

    var az = 0.55 - scrollP * 0.9;
    var dist = 3.35 - Math.min(scrollP, 0.5) * 0.5;
    camera.position.set(
      Math.sin(az) * dist,
      0.45 + scrollP * 0.5,
      Math.cos(az) * dist
    );
    camera.lookAt(world.position);

    renderer.render(scene, camera);
    if (!reduceMotion) requestAnimationFrame(frame);
  }

  if (reduceMotion) { frame(); setInterval(frame, 1000); }
  else frame();

})();
