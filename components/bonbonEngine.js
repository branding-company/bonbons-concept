/* Anush Concept: shared glossy-bonbon engine (three.js r128).
   Used by opening directions A and C. Sample code for the concept previews. */
import * as T from 'three';

export const Bon = (function () {
  const TAU = Math.PI * 2;

  function makeEnv(renderer) {
    // Procedural studio: warm cream room, soft boxes, one coloured strip.
    const c = document.createElement('canvas');
    c.width = 1024; c.height = 512;
    const g = c.getContext('2d');
    const bg = g.createLinearGradient(0, 0, 0, 512);
    bg.addColorStop(0, '#4a2a1c'); bg.addColorStop(0.5, '#2a150d'); bg.addColorStop(1, '#120905');
    g.fillStyle = bg; g.fillRect(0, 0, 1024, 512);
    const box = (x, y, w, h, col, blur) => { g.save(); g.filter = 'blur(' + blur + 'px)'; g.fillStyle = col; g.fillRect(x, y, w, h); g.restore(); };
    box(110, 50, 220, 130, '#ffffff', 6);
    box(600, 40, 300, 90, '#fff4e0', 8);
    box(440, 230, 60, 170, '#ffc890', 8);
    box(830, 220, 30, 200, '#ff8a4a', 6);
    box(0, 330, 1024, 10, 'rgba(255,240,220,.7)', 4);
    const tex = new T.CanvasTexture(c);
    tex.colorSpace = T.SRGBColorSpace;
    tex.mapping = T.EquirectangularReflectionMapping;
    const pm = new T.PMREMGenerator(renderer);
    const env = pm.fromEquirectangular(tex).texture;
    tex.dispose(); pm.dispose();
    return env;
  }

  function shellCanvas(w, h) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d');
    const gr = g.createLinearGradient(0, 0, 0, h);
    gr.addColorStop(0, '#2c140c'); gr.addColorStop(1, '#3d1c10');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    return c;
  }

  // couture swirl painted in code so direction A is not a plain brown ball
  function couture(c) {
    const g = c.getContext('2d'), w = c.width, h = c.height;
    const arcs = [['#c4163a', 0.25, 0.46, 0.22, 0.9], ['#ff8a2b', 0.31, 0.58, 0.16, 0.7], ['#e9b949', 0.2, 0.52, 0.1, 0.6]];
    arcs.forEach(function (a, i) {
      g.save(); g.globalAlpha = 0.95; g.strokeStyle = a[0]; g.lineCap = 'round';
      g.lineWidth = h * (0.05 - i * 0.012);
      g.beginPath();
      g.ellipse(w * a[1], h * a[2], w * a[3], h * (0.18 + i * 0.05), -0.6 + i * 0.35, 0.4, 3.9);
      g.stroke(); g.restore();
    });
    for (let i = 0; i < 260; i++) {
      const x = w * (0.1 + Math.random() * 0.3), y = h * (0.2 + Math.random() * 0.6);
      g.fillStyle = 'rgba(255,214,120,' + (0.25 + Math.random() * 0.6) + ')';
      g.beginPath(); g.arc(x, y, 0.8 + Math.random() * 2.2, 0, TAU); g.fill();
    }
  }

  function brush(c, u, v, color, size, glitter) {
    const g = c.getContext('2d'), w = c.width, h = c.height;
    const x = u * w, y = (1 - v) * h;
    const lat = Math.max(0.28, Math.sin(Math.PI * (1 - v)));
    const r = size * h;
    g.save(); g.translate(x, y); g.scale(1 / lat, 1);
    const gr = g.createRadialGradient(0, 0, 0, 0, 0, r);
    gr.addColorStop(0, color); gr.addColorStop(0.55, color); gr.addColorStop(1, color + '00');
    g.globalAlpha = 0.85; g.fillStyle = gr;
    g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill();
    if (glitter) {
      for (let i = 0; i < 6; i++) {
        g.fillStyle = 'rgba(255,236,170,' + (0.5 + Math.random() * 0.5) + ')';
        g.beginPath(); g.arc((Math.random() - .5) * r * 2, (Math.random() - .5) * r * 2, 0.7 + Math.random() * 1.6, 0, TAU); g.fill();
      }
    }
    g.restore();
  }

  function Bonbon(canvas, opts) {
    opts = opts || {};
    const self = this;
    this.opts = opts;
    this.R = 1.25;
    this.canvas = canvas;
    this.renderer = new T.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = T.SRGBColorSpace;
    this.renderer.toneMapping = T.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.scene = new T.Scene();
    this.scene.environment = makeEnv(this.renderer);
    this.camera = new T.PerspectiveCamera(32, 1, 0.1, 50);
    this.camera.position.z = 6;

    this.tex = shellCanvas(2048, 1024);
    if (opts.couture) couture(this.tex);
    this.map = new T.CanvasTexture(this.tex);
    this.map.colorSpace = T.SRGBColorSpace;
    this.map.anisotropy = 4;

    this.crackCanvas = document.createElement('canvas');
    this.crackCanvas.width = 1024; this.crackCanvas.height = 512;
    this.crackMap = new T.CanvasTexture(this.crackCanvas);
    this.crackMap.colorSpace = T.SRGBColorSpace;
    this.crackPaths = this._makeCracks();
    this._crackDrawn = -1;

    this.group = new T.Group();
    this.scene.add(this.group);

    const geo = new T.SphereGeometry(this.R, 96, 64);
    this.geo = geo;
    this.base = geo.attributes.position.array.slice();
    this.nrm = geo.attributes.normal.array.slice();
    this.shellMat = new T.MeshPhysicalMaterial({
      map: this.map, roughness: 0.1, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.035,
      envMapIntensity: 2.4, emissive: 0xffffff, emissiveMap: this.crackMap, emissiveIntensity: 1.3
    });
    this.shell = new T.Mesh(geo, this.shellMat);
    this.shell.rotation.y = -0.5 * Math.PI + 0.0; // seam to the back
    this.group.add(this.shell);

    this.fillColor = new T.Color(opts.filling || '#ff8a2b');
    this.fill = new T.Mesh(new T.SphereGeometry(this.R * 0.86, 48, 32), new T.MeshPhysicalMaterial({
      color: this.fillColor, emissive: this.fillColor, emissiveIntensity: 0.3, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.1
    }));
    this.fill.visible = false;
    this.group.add(this.fill);

    this.key = new T.PointLight(0xfff0d8, 300, 20, 2);
    this.key.position.set(2, 2.5, 5);
    this.scene.add(this.key);
    this.scene.add(new T.AmbientLight(0xffe8d0, 0.6));

    this.ripples = [];
    this.ray = new T.Raycaster();
    this.ndc = new T.Vector2();
    this.ptr = { x: 0, y: 0, down: false, inside: false, lx: 0, ly: 0, t: 0 };
    this.t = 0;
    this.state = 'idle'; // idle | burst
    this.crack = 0; this.holding = false;
    this.paintColor = '#ff8a2b'; this.glitter = false; this.paintMode = !!opts.paint;
    this.anchor = opts.anchor || { x: 0, y: 0, s: 1 };

    this.shardMesh = null;
    this._bindEvents();
    this.resize();
    this._raf = null; this._last = performance.now();
    const loop = function (now) {
      if (self._dead) return;
      const dt = Math.min(0.05, (now - self._last) / 1000); self._last = now;
      if (!self.paused) { self.update(dt); self.renderer.render(self.scene, self.camera); }
      self._raf = requestAnimationFrame(loop);
    };
    this._raf = requestAnimationFrame(loop);
  }

  const P = Bonbon.prototype;

  P._makeCracks = function () {
    const paths = [];
    const mk = function (u, v, ang, len) {
      const pts = [[u, v]]; let a = ang;
      for (let i = 0; i < 14; i++) {
        a += (Math.random() - 0.5) * 1.1;
        u += Math.cos(a) * len / 14 * 0.6; v += Math.sin(a) * len / 14 * 1.0;
        pts.push([u, v]);
        if (i === 5 && Math.random() < 0.8) paths.push(mk(u, v, a + (Math.random() < .5 ? .8 : -.8), len * .5));
      }
      return pts;
    };
    for (let i = 0; i < 6; i++) paths.push(mk(0.5, 0.5, (i / 6) * TAU + Math.random() * .4, 0.2));
    return paths.map(function (p) { return Array.isArray(p[0]) ? p : null; }).filter(Boolean);
  };

  P._drawCracks = function () {
    const q = Math.round(this.crack * 40) / 40;
    if (q === this._crackDrawn) return; this._crackDrawn = q;
    const g = this.crackCanvas.getContext('2d'), w = 1024, h = 512;
    g.clearRect(0, 0, w, h); g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
    if (q <= 0) { this.crackMap.needsUpdate = true; return; }
    const col = '#' + this.fillColor.getHexString();
    g.lineCap = 'round'; g.lineJoin = 'round';
    this.crackPaths.forEach(function (p) {
      const n = Math.max(1, Math.floor(p.length * q));
      [[14, 0.35], [6, 0.8], [2.2, 1]].forEach(function (s, i) {
        g.strokeStyle = i === 2 ? '#fff' : col; g.globalAlpha = s[1]; g.lineWidth = s[0];
        g.beginPath();
        for (let k = 0; k < n; k++) { const x = p[k][0] * w, y = (1 - p[k][1]) * h; k ? g.lineTo(x, y) : g.moveTo(x, y); }
        g.stroke();
      });
    });
    g.globalAlpha = 1;
    this.crackMap.needsUpdate = true;
  };

  P._bindEvents = function () {
    const self = this, c = this.canvas, el = this.opts.eventEl || c;
    el.style.touchAction = 'none';
    const pos = function (e) {
      const r = c.getBoundingClientRect();
      self.ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      self.ptr.x = self.ndc.x; self.ptr.y = self.ndc.y;
    };
    el.addEventListener('pointermove', function (e) { pos(e); self._hit(e.pointerType === 'mouse' || self.ptr.down); });
    el.addEventListener('pointerdown', function (e) {
      pos(e); self.ptr.down = true; el.setPointerCapture && el.setPointerCapture(e.pointerId);
      const h = self._hit(true, 1.4);
      if (self.opts.hold && h) self.holding = true;
      if (self.opts.onDown) self.opts.onDown(h);
    });
    const up = function () { self.ptr.down = false; self.holding = false; self._lastUV = null; };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.addEventListener('pointerleave', function () { self.ptr.inside = false; });
  };

  P._hit = function (emit, boost) {
    if (this.state !== 'idle') return false;
    this.ray.setFromCamera(this.ndc, this.camera);
    const hit = this.ray.intersectObject(this.shell)[0];
    this.ptr.inside = !!hit;
    if (!hit) return false;
    const now = performance.now();
    const local = this.shell.worldToLocal(hit.point.clone()).normalize();
    this.key.position.set(hit.point.x * 1.6 + this.group.position.x, hit.point.y * 1.6 + this.group.position.y + 0.6, 3.2);
    const sp = Math.hypot(this.ptr.x - this.ptr.lx, this.ptr.y - this.ptr.ly);
    this.ptr.lx = this.ptr.x; this.ptr.ly = this.ptr.y;
    if (this.paintMode && this.ptr.down) {
      const lp = this._lastUV, u = hit.uv.x, v = hit.uv.y;
      if (lp && Math.abs(lp[0] - u) < 0.2 && Math.abs(lp[1] - v) < 0.2) {
        const dist = Math.hypot(u - lp[0], v - lp[1]), n = Math.min(40, Math.ceil(dist / 0.004));
        for (let i = 1; i <= n; i++) brush(this.tex, lp[0] + (u - lp[0]) * i / n, lp[1] + (v - lp[1]) * i / n, this.paintColor, this.opts.brush || 0.045, this.glitter && i % 3 === 0);
      } else brush(this.tex, u, v, this.paintColor, this.opts.brush || 0.045, this.glitter);
      this._lastUV = [u, v];
      this.map.needsUpdate = true;
      if (this.opts.onPaint) this.opts.onPaint();
    }
    if (emit && (now - this.ptr.t > 55 || boost)) {
      this.ptr.t = now;
      this.ripples.push({ d: local, t0: this.t, a: boost || Math.min(1.1, 0.35 + sp * 14) });
      if (this.ripples.length > 9) this.ripples.shift();
    }
    return true;
  };

  P.resize = function () {
    const p = this.canvas.parentElement || this.canvas;
    const w = p.clientWidth || window.innerWidth, h = p.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.canvas.style.width = w + 'px'; this.canvas.style.height = h + 'px';
    this.camera.aspect = w / h;
    const a = this.anchor, fit = Math.min(1, (w / h) * 1.0);
    // distance so that the bonbon fills its share of the narrow side
    const vis = 2 * Math.tan(this.camera.fov * Math.PI / 360);
    const want = (w / h < 1 ? 3.1 : 3.5) / (a.s || 1);
    this.camera.position.z = Math.max(3, (this.R * want) / (vis * Math.min(1, w / h < 1 ? w / h * 1.15 : 1)) * 1.0);
    this.camera.updateProjectionMatrix();
    const visH = vis * this.camera.position.z, visW = visH * this.camera.aspect;
    this.group.position.set((a.x || 0) * visW / 2, (a.y || 0) * visH / 2, 0);
    this.camera.updateProjectionMatrix();
    if (this.opts.onResize) this.opts.onResize(this);
  };

  P.screenCenter = function () {
    const v = this.group.position.clone().project(this.camera);
    const r = this.canvas.getBoundingClientRect();
    return { x: r.left + (v.x + 1) / 2 * r.width, y: r.top + (1 - v.y) / 2 * r.height };
  };

  P.screenRadius = function () {
    const c = this.screenCenter(), p = this.group.position.clone().add(new T.Vector3(this.R, 0, 0)).project(this.camera);
    const r = this.canvas.getBoundingClientRect();
    return Math.abs(r.left + (p.x + 1) / 2 * r.width - c.x);
  };

  P.setFilling = function (hex) {
    this.fillColor.set(hex);
    this.fill.material.color.set(hex); this.fill.material.emissive.set(hex);
    this._crackDrawn = -1;
  };

  P.update = function (dt) {
    this.t += dt;
    const t = this.t, pos = this.geo.attributes.position, base = this.base, nr = this.nrm;
    if (this.state === 'idle') {
      // idle breathing + follow pointer
      const tx = this.ptr.y * -0.22, ty = this.ptr.x * 0.3 - 0.5 * Math.PI;
      this.shell.rotation.x += (tx - this.shell.rotation.x) * 0.06;
      this.shell.rotation.y += (ty + Math.sin(t * 0.4) * 0.08 - this.shell.rotation.y) * 0.06;
      this.group.position.y += (Math.sin(t * 1.1) * 0.03 - (this.group.userData.dy || 0)) * 0.0; // keep anchor
      if (this.holding) this.crack = Math.min(1, this.crack + dt / 1.1); else this.crack = Math.max(0, this.crack - dt * 1.6);
      this._drawCracks();
      const shake = this.crack * this.crack * 0.035;
      this.shell.position.set((Math.random() - .5) * shake, (Math.random() - .5) * shake, 0);
      this.shell.scale.setScalar(1 + this.crack * 0.04);
      this.ripples = this.ripples.filter(function (r) { return t - r.t0 < 2.6; });
      const rs = this.ripples, n = pos.count, arr = pos.array;
      for (let i = 0; i < n; i++) {
        const nx = nr[i * 3], ny = nr[i * 3 + 1], nz = nr[i * 3 + 2];
        let d = Math.sin(nx * 3 + t * 0.9) * Math.sin(ny * 3 - t * 0.7) * 0.006;
        for (let k = 0; k < rs.length; k++) {
          const r = rs[k], dot = Math.max(-1, Math.min(1, nx * r.d.x + ny * r.d.y + nz * r.d.z));
          const ang = Math.acos(dot), age = t - r.t0;
          d += r.a * Math.exp(-age * 1.7) * Math.sin(ang * 15 - age * 9) * Math.exp(-ang * 2.1) * 0.045
             - r.a * Math.exp(-ang * ang * 9) * Math.exp(-age * 3.2) * 0.05;
        }
        arr[i * 3] = base[i * 3] + nx * d; arr[i * 3 + 1] = base[i * 3 + 1] + ny * d; arr[i * 3 + 2] = base[i * 3 + 2] + nz * d;
      }
      pos.needsUpdate = true; this.geo.computeVertexNormals();
      if (this.crack >= 1 && this.opts.hold) this.burst();
    } else {
      this._stepShards(dt);
    }
  };

  P.burst = function () {
    if (this.state === 'burst') return;
    this.state = 'burst'; this.bt = 0; this.holding = false;
    this.shell.visible = false; this.shell.position.set(0, 0, 0);
    const g = new T.IcosahedronGeometry(this.R, 2);
    const p = g.attributes.position.array, uv = g.attributes.uv, nF = p.length / 9;
    this.sd = [];
    for (let f = 0; f < nF; f++) {
      const c = new T.Vector3();
      for (let k = 0; k < 3; k++) c.add(new T.Vector3(p[f * 9 + k * 3], p[f * 9 + k * 3 + 1], p[f * 9 + k * 3 + 2]));
      c.multiplyScalar(1 / 3);
      const dir = c.clone().normalize().add(new T.Vector3((Math.random() - .5) * .6, (Math.random() - .5) * .6, (Math.random() - .1) * .9)).normalize();
      this.sd.push({ c: c, dir: dir, sp: 1.4 + Math.random() * 3.2, ax: new T.Vector3(Math.random() - .5, Math.random() - .5, Math.random() - .5).normalize(), rs: (Math.random() - .5) * 9 });
    }
    this.shardBase = p.slice();
    // map shard uv to the same painted texture orientation
    this.shardMesh = new T.Mesh(g, new T.MeshPhysicalMaterial({ map: this.map, roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 2.4, side: T.DoubleSide }));
    this.shardMesh.rotation.copy(this.shell.rotation);
    this.shardBack = new T.Mesh(g, new T.MeshStandardMaterial({ color: this.fillColor.clone().lerp(new T.Color('#fff2dc'), 0.35), roughness: 0.5, side: T.BackSide }));
    this.shardBack.rotation.copy(this.shell.rotation);
    this.group.add(this.shardMesh); this.group.add(this.shardBack);
    this.fill.visible = true; this.fill.scale.setScalar(0.7);
    if (this.opts.onBurst) this.opts.onBurst();
  };

  P._stepShards = function (dt) {
    this.bt += dt;
    const t = this.bt, g = this.shardMesh.geometry, arr = g.attributes.position.array, b = this.shardBase;
    const q = new T.Quaternion(), v = new T.Vector3();
    for (let f = 0; f < this.sd.length; f++) {
      const s = this.sd[f];
      q.setFromAxisAngle(s.ax, s.rs * t);
      const ease = 1 - Math.exp(-t * 2.4);
      const off = s.dir.clone().multiplyScalar(s.sp * ease * 1.1);
      off.y -= 1.6 * t * t;
      for (let k = 0; k < 3; k++) {
        const i = f * 9 + k * 3;
        v.set(b[i] - s.c.x, b[i + 1] - s.c.y, b[i + 2] - s.c.z).applyQuaternion(q);
        arr[i] = s.c.x + v.x + off.x; arr[i + 1] = s.c.y + v.y + off.y; arr[i + 2] = s.c.z + v.z + off.z;
      }
    }
    g.attributes.position.needsUpdate = true; g.computeVertexNormals();
    const pop = Math.min(1, t * 2.4); this.fill.scale.setScalar(0.7 + 0.3 * (1 - Math.pow(1 - pop, 3)) + Math.sin(t * 6) * 0.01);
    this.fill.material.emissiveIntensity = 0.3 + Math.max(0, 1 - t) * 0.25;
    this.fill.rotation.y += dt * 0.5;
  };

  P.reset = function () {
    if (this.shardMesh) { this.group.remove(this.shardBack); this.group.remove(this.shardMesh); this.shardMesh.geometry.dispose(); this.shardMesh = null; }
    this.shell.visible = true; this.fill.visible = false; this.state = 'idle'; this.crack = 0; this._crackDrawn = -1;
    this.ripples = [];
  };

  P.clearPaint = function () {
    const g = this.tex.getContext('2d'), c = shellCanvas(2048, 1024);
    g.drawImage(c, 0, 0); this.map.needsUpdate = true;
  };

  P.destroy = function () {
    cancelAnimationFrame(this._raf); this._dead = true;
    this.renderer.dispose(); this.geo.dispose(); this.map.dispose(); this.crackMap.dispose();
  };

  return { Bonbon: Bonbon, brush: brush, tex: shellCanvas };
})();
