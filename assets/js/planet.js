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

  /* el video se pausa fuera de pantalla (ahorro real) y con movimiento reducido */
  document.querySelectorAll("video[autoplay]").forEach(function (v) {
    if (reduceMotion) { v.pause(); v.removeAttribute("autoplay"); return; }
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.isIntersecting ? v.play().catch(function () {}) : v.pause(); });
    }, { threshold: 0.1 }).observe(v);
  });

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
    var stars = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xd8dcd6, size: 0.07, sizeAttenuation: true }));
    stars.geometry.setDrawRange(0, 420);
    scene.add(stars);
  })();

  /* ---------- planeta de bloques, estilo voxel ---------- */

  var R_PLANET = 1, LON_N = 48, LAT_N = 24, BLOCK = 0.142;
  /* espec por tipo: color, desfase radial, escala */
  var KIND = [
    { c: 0x3d6db5, r: -0.035, s: 0.92 },  // 0 océano, un paso hundido
    { c: 0x5da24a, r: 0,      s: 1.0  },  // 1 tierra
    { c: 0x3f7d38, r: 0,      s: 1.0  },  // 2 bosque
    { c: 0xc9a86a, r: 0,      s: 1.0  },  // 3 seco
    { c: 0xe8e3da, r: 0,      s: 1.0  },  // 4 hielo
    { c: 0xf4f4f0, r: 0.08,   s: 0.55 }   // 5 nube flotante
  ];

  /* continentes como polígonos lon/lat; el último que toca la celda gana */
  var SHAPES = [
    { k: 1, p: [[-80,10],[-70,12],[-60,8],[-50,0],[-40,-5],[-35,-8],[-40,-20],[-50,-30],[-58,-38],[-65,-45],[-70,-52],[-73,-45],[-70,-35],[-70,-20],[-75,-15],[-80,-5],[-85,0],[-85,5]] },
    { k: 2, p: [[-75,5],[-60,5],[-55,0],[-60,-8],[-70,-10],[-77,-5],[-80,0]] },
    { k: 1, p: [[-160,65],[-140,70],[-120,72],[-100,70],[-85,68],[-75,62],[-60,55],[-55,48],[-65,45],[-75,40],[-80,30],[-90,20],[-97,16],[-95,10],[-85,8],[-80,8],[-85,15],[-95,18],[-105,20],[-110,25],[-115,30],[-120,35],[-125,40],[-125,48],[-130,55],[-150,60]] },
    { k: 3, p: [[-105,30],[-95,25],[-90,20],[-100,18],[-110,22],[-112,28]] },
    { k: 3, p: [[-15,15],[-5,12],[5,10],[10,5],[15,5],[20,0],[25,-5],[30,-10],[35,-15],[35,-25],[30,-35],[25,-35],[20,-35],[15,-30],[12,-20],[10,-10],[5,5],[0,8],[-5,10],[-10,15],[-15,20],[-17,22]] },
    { k: 3, p: [[-12,20],[5,18],[15,15],[25,12],[30,18],[20,25],[5,28],[-8,26]] },
    { k: 1, p: [[-10,36],[-5,43],[0,46],[5,50],[10,55],[15,58],[25,60],[40,62],[60,65],[80,68],[100,70],[120,72],[140,70],[160,65],[170,62],[175,60],[165,55],[150,50],[140,45],[130,40],[120,35],[115,25],[108,18],[100,8],[95,15],[90,22],[85,20],[80,10],[75,15],[70,22],[60,25],[55,28],[50,30],[45,35],[40,38],[35,40],[30,42],[20,40],[10,38],[0,36]] },
    { k: 2, p: [[75,20],[85,22],[90,15],[82,8],[76,12],[73,18]] },
    { k: 2, p: [[100,15],[108,12],[110,5],[105,2],[100,6],[98,12]] },
    { k: 3, p: [[113,-22],[120,-20],[130,-15],[138,-12],[142,-10],[145,-18],[150,-22],[153,-28],[150,-35],[145,-38],[138,-35],[130,-32],[120,-34],[115,-35],[113,-30]] }
  ];

  function inPoly(p, lon, lat) {
    var inside = false;
    for (var i = 0, j = p.length - 1; i < p.length; j = i++) {
      var xi = p[i][0], yi = p[i][1], xj = p[j][0], yj = p[j][1];
      if ((yi > lat) !== (yj > lat) && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }

  function kindAt(lon, lat) {
    if (lat > 60 || lat < -58) return 4;
    for (var i = SHAPES.length - 1; i >= 0; i--) {
      if (inPoly(SHAPES[i].p, lon, lat)) return SHAPES[i].k;
    }
    return 0;
  }

  var world = new THREE.Group();      // el planeta: gira sobre SU eje
  var tilt = new THREE.Group();       // el eje inclinado, fijo
  tilt.add(world);
  tilt.rotation.z = Math.PI + Math.PI / 4;   // invertido + ~45° de eje
  tilt.rotation.x = -0.5;

  (function buildPlanet() {
    var cells = [], i, j, lon, lat;
    for (i = 0; i < LON_N; i++) for (j = 0; j < LAT_N; j++) {
      lon = -180 + (i + 0.5) * 360 / LON_N;
      lat = -90 + (j + 0.5) * 180 / LAT_N;
      cells.push({ lon: lon, lat: lat, k: kindAt(lon, lat) });
    }
    /* nubes sueltas flotando sobre el océano */
    var seeded = 0;
    while (seeded < 30) {
      var cc = cells[(Math.random() * cells.length) | 0];
      if (cc.k === 0 && Math.abs(cc.lat) < 55) { cc.k = 5; seeded++; }
    }
    var mesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(BLOCK, BLOCK, BLOCK),
      new THREE.MeshLambertMaterial(),
      cells.length
    );
    var m4 = new THREE.Matrix4(), col = new THREE.Color();
    cells.forEach(function (c, i2) {
      var spec = KIND[c.k];
      m4.makeScale(spec.s, spec.s, spec.s);
      m4.setPosition(latLon(c.lon, c.lat, R_PLANET + spec.r));
      mesh.setMatrixAt(i2, m4);
      col.setHex(spec.c);
      mesh.setColorAt(i2, col);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    world.add(mesh);
  })();
  scene.add(tilt);

  /* ---------- nave de bloques: tecnología que aún no existe ----------
     toda la nave es UNA malla con colores por vértice: 1 draw call */

  var WHITE = 0xe8e3da, CORAL = 0xd4574a, SAGE = 0x8fa68e, DARK = 0x2a2a28, ORANGE = 0xff8a3d, YELLOW = 0xffd23d;

  function mergeBoxes(list) {
    var pos = [], nor = [], col = [], idx = [], off = 0;
    list.forEach(function (b) {
      var g = new THREE.BoxGeometry(b[0], b[1], b[2]);
      g.translate(b[4], b[5], b[6]);
      var p = g.attributes.position, n = g.attributes.normal, ix = g.index;
      var c = new THREE.Color(b[3]);
      for (var i = 0; i < p.count; i++) {
        pos.push(p.getX(i), p.getY(i), p.getZ(i));
        nor.push(n.getX(i), n.getY(i), n.getZ(i));
        col.push(c.r, c.g, c.b);
      }
      for (var k = 0; k < ix.count; k++) idx.push(ix.getX(k) + off);
      off += p.count;
      g.dispose();
    });
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
    geo.setIndex(idx);
    return geo;
  }

  var voxelMat = new THREE.MeshLambertMaterial({ vertexColors: true });

  var hull = [
    [0.09, 0.09, 0.09, WHITE, 0, 0, 0],
    [0.09, 0.09, 0.09, WHITE, 0, 0.085, 0],
    [0.06, 0.06, 0.06, CORAL, 0, 0.155, 0],         // nariz
    [0.028, 0.028, 0.02, DARK, 0, 0.09, 0.048]      // escotilla
  ];
  [[-0.058, 0], [0.058, 0], [0, -0.058], [0, 0.058]].forEach(function (o) {
    hull.push([0.018, 0.08, 0.045, CORAL, o[0], -0.055, o[1]]);
  });
  /* anillos de bloques: la parte que todavía no existe */
  [[0.02, 0.115], [-0.075, 0.09]].forEach(function (ring, ri) {
    for (var b = 0; b < 8; b++) {
      var a = b / 8 * Math.PI * 2 + (ri ? 0.4 : 0);
      hull.push([0.032, 0.032, 0.032, SAGE, Math.cos(a) * ring[1], ring[0], Math.sin(a) * ring[1]]);
    }
  });

  var ship = new THREE.Group();
  ship.add(new THREE.Mesh(mergeBoxes(hull), voxelMat));

  var flame = new THREE.Mesh(
    mergeBoxes([
      [0.05, 0.05, 0.05, ORANGE, 0, -0.115, 0],
      [0.028, 0.045, 0.028, YELLOW, 0, -0.16, 0]
    ]),
    new THREE.MeshBasicMaterial({ vertexColors: true })
  );
  ship.add(flame);
  ship.scale.setScalar(1.35);
  scene.add(ship);

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

  /* la entrada es por la derecha de la pantalla, sobre el espacio oscuro;
     el final de la curva es la posición REAL de Bolivia cada frame y el
     penúltimo punto se alinea a la normal del terreno para posarse de frente */
  var approach = new THREE.CatmullRomCurve3([
    new THREE.Vector3(2.2, 0.3, 2.2),
    new THREE.Vector3(1.9, 0.75, 1.25),
    new THREE.Vector3(),
    new THREE.Vector3()
  ]);
  /* el despegue continúa hacia la derecha y arriba hasta salir de cuadro */
  var depart = new THREE.CatmullRomCurve3([
    new THREE.Vector3(),
    new THREE.Vector3(0.8, 1.7, 1.4),
    new THREE.Vector3(2.4, 3.4, 3.0),
    new THREE.Vector3(8.5, 7.0, 10)
  ]);

  var _p = new THREE.Vector3(), _a = new THREE.Vector3(), _end = new THREE.Vector3();
  var _dummy = new THREE.Object3D();

  function landSpot(out) {
    return world.localToWorld(out.copy(SPOT));
  }

  /* coreografía del giro: al ver el planeta al revés el este corre hacia la
     izquierda; el yaw converge al aterrizaje con Bolivia arriba al centro */
  var SPIN = -0.05, phiLand = 4.96;
  function wrapAngle(x) {
    x = (x + Math.PI) % (Math.PI * 2);
    if (x < 0) x += Math.PI * 2;
    return x - Math.PI;
  }

  /* calibra el yaw de aterrizaje contra la cámara del héroe (scroll 0):
     barre el anillo que describe Bolivia al girar y elige el punto más alto
     que quede dentro del cuadro y de cara a la cámara; en pantallas angostas
     el planeta se sale a la izquierda y el filo visible manda */
  function calibrateLand() {
    var cam = camera.clone();
    cam.aspect = camera.aspect;
    cam.position.set(0.55 + Math.sin(0.3) * 0.8, 0.4, Math.cos(0.3) * 4.1);
    cam.lookAt(0.1, -0.175, 0);
    cam.updateMatrixWorld();
    cam.updateProjectionMatrix();
    var center = new THREE.Vector3(-1.15, -0.35, 0);
    var view = new THREE.Vector3(0.1, -0.175, 0).sub(cam.position).normalize();
    var up = new THREE.Vector3(0, 1, 0).addScaledVector(view, -view.y).normalize();
    var toCam = view.negate();
    var m = new THREE.Matrix4().makeRotationFromEuler(tilt.rotation);
    var axisY = new THREE.Vector3(0, 1, 0);
    var v = new THREE.Vector3(), pr = new THREE.Vector3(), dir = new THREE.Vector3();
    var best = -1e9;
    for (var deg = 0; deg < 360; deg += 0.5) {
      var phi = deg * Math.PI / 180;
      v.copy(SPOT).applyAxisAngle(axisY, phi).applyMatrix4(m);
      dir.copy(v).normalize();
      pr.copy(v).add(center).project(cam);
      var score = dir.dot(up)
        - Math.max(0, Math.abs(pr.x) - 1.0) * 1.5
        - Math.max(0, 0.05 - dir.dot(toCam)) * 2;
      if (score > best) { best = score; phiLand = phi; }
    }
  }

  /* orientación con slerp: la nave gira suave, no pega saltos */
  function aim(ship, curve, tt, dt) {
    curve.getPoint(Math.min(tt, 1), _p);
    curve.getPoint(Math.min(tt + 0.02, 1), _a);
    ship.position.copy(_p);
    _dummy.position.copy(_p);
    _dummy.lookAt(_a);
    _dummy.rotateX(Math.PI / 2);
    ship.quaternion.slerp(_dummy.quaternion, Math.min(dt * 5, 1));
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
    calibrateLand();
  }
  window.addEventListener("resize", resize);
  resize();

  var clock = new THREE.Clock();
  var curScroll = 0;
  var dpr = Math.min(window.devicePixelRatio, 1.5), perfAcc = 0, perfN = 0;

  function frame() {
    var dt = Math.min(clock.getDelta(), 0.1);
    var t = clock.elapsedTime;
    var now = new Date();

    /* scroll con inercia: todo responde suave, nada brusco */
    curScroll += (scrollP - curScroll) * Math.min(dt * 4, 1);
    var sp = curScroll;

    /* el planeta invertido (el sur arriba), a la izquierda y saliéndose del
       cuadro; el eje queda fijo a ~45° y el mundo gira SOBRE él */
    tilt.position.x = -1.15 + sp * 0.25;
    tilt.position.y = -0.35 + sp * 0.45 + (reduceMotion ? 0 : Math.sin(t * 0.4) * 0.02);
    var prog = demo === "approach" ? easeOut(Math.min(demoT, 1))
             : estado === "pre" && demo === null ? easeOut(Math.min(Math.max((now - LAUNCH) / (T0 - LAUNCH), 0), 1))
             : 1;
    var spinYaw = 0.45 + sp * 0.8 + (reduceMotion ? 0 : t * SPIN);
    world.rotation.y = spinYaw + prog * wrapAngle(phiLand - spinYaw);
    tilt.updateMatrixWorld();

    /* los extremos de las trayectorias siguen a Bolivia cada frame; el
       tramo final de la aproximación baja por la normal del terreno */
    approach.points[3].copy(landSpot(_end));
    _p.copy(_end).sub(tilt.position).normalize();
    approach.points[2].copy(_end).addScaledVector(_p, 0.5).add(_a.set(0.25, 0.02, 0.12));
    depart.points[0].copy(_end);

    if (demo === "approach") {
      demoT += dt * 0.25;
      var ta = Math.min(demoT, 1);
      aim(ship, approach, easeOut(ta), dt);
      ship.position.x += Math.sin(t * 2.1) * 0.02;
      ship.position.y += Math.sin(t * 1.7) * 0.02;
      flame.visible = ta < 0.98;
      flame.scale.setScalar(0.8 + Math.sin(t * 14) * 0.25);
      if (ta >= 1) demo = "landed";
    } else if (demo === "landed") {
      ship.position.copy(landSpot(_p));
      ship.position.y += Math.sin(t * 1.2) * 0.004;
      ship.lookAt(world.localToWorld(_a.copy(SPOT2)));
      ship.rotateX(Math.PI / 2);
      flame.visible = false;
    } else if (demo === "depart") {
      demoT += dt * 0.25;
      var td = easeIn(Math.min(demoT, 1));
      aim(ship, depart, td, dt);
      flame.visible = true;
      flame.scale.setScalar(1 + Math.sin(t * 16) * 0.3);
      if (td >= 1) { demo = "gone"; ship.visible = false; }
    } else if (demo === "gone") {
      ship.visible = false;
    } else if (estado === "pre") {
      var p = Math.min(Math.max((now - LAUNCH) / (T0 - LAUNCH), 0), 1);
      var eased = easeOut(p);
      aim(ship, approach, eased, dt);
      ship.position.x += Math.sin(t * 2.1) * 0.02;
      ship.position.y += Math.sin(t * 1.7) * 0.02;
      flame.visible = eased < 0.98;
      flame.scale.setScalar(0.8 + Math.sin(t * 14) * 0.25);
    } else if (estado === "live") {
      var q = (now - T0) / (T1 - T0);
      if (q < 0.72) {
        /* aterrizada, con una respiración mínima */
        ship.position.copy(landSpot(_p));
        ship.position.y += Math.sin(t * 1.2) * 0.004;
        ship.lookAt(world.localToWorld(_a.copy(SPOT2)));
        ship.rotateX(Math.PI / 2);
        flame.visible = false;
      } else {
        /* despegue: se va para no volver */
        var k = easeIn((q - 0.72) / 0.28);
        aim(ship, depart, k, dt);
        flame.visible = true;
        flame.scale.setScalar(1 + Math.sin(t * 16) * 0.3);
      }
    } else {
      ship.visible = false;
    }

    /* cámara a la derecha del planeta: queda un tercio de espacio oscuro */
    var az = 0.3 - sp * 0.45;
    var dist = 4.1 - Math.min(sp, 0.5) * 0.4;
    camera.position.set(
      0.55 + Math.sin(az) * 0.8,
      0.4 + sp * 0.45,
      Math.cos(az) * dist
    );
    camera.lookAt(0.1 + sp * 0.1, tilt.position.y * 0.5, 0);

    renderer.render(scene, camera);

    /* pixelRatio adaptativo: si el frame medio pasa de ~26ms se baja un paso */
    perfAcc += dt; perfN++;
    if (perfN >= 90) {
      if (perfAcc / perfN > 0.026 && dpr > 1.0) { dpr = Math.max(1.0, dpr - 0.25); renderer.setPixelRatio(dpr); }
      perfAcc = 0; perfN = 0;
    }
    if (!reduceMotion) requestAnimationFrame(frame);
  }

  if (reduceMotion) { frame(); setInterval(frame, 1000); }
  else frame();

})();
