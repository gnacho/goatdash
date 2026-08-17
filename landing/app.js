/* goatdash landing — interactividad: idioma, tema, panel vivo, slider, reveal, copiar */
(function () {
  'use strict';

  const LANG_KEY = 'goatdash-landing-lang';
  const THEME_KEY = 'goatdash-landing-theme';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* Capturas: orden de las vistas + alt por idioma */
  const SLIDES = ['cover', 'pages', 'donuts', 'geo'];
  const SHOT_ALT = {
    cover: { es: 'Portada del dashboard: cinco tarjetas de KPI y el gráfico de tráfico', en: 'Dashboard cover: five KPI cards and the traffic chart' },
    pages: { es: 'Scroll medio: páginas principales, referencias y idiomas', en: 'Middle scroll: top pages, referrers and languages' },
    donuts: { es: 'Scroll inferior: navegadores, sistemas y dispositivos', en: 'Lower scroll: browsers, systems and devices' },
    geo: { es: 'Fondo de la página: mapa mundial de visitas por país', en: 'Page bottom: world map of visits by country' }
  };

  /* ---------- Idioma ---------- */
  function applyLang(lang) {
    const dict = I18N[lang] || I18N.es;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-aria');
      if (dict[key]) el.setAttribute('aria-label', dict[key]);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-alt');
      if (dict[key]) el.setAttribute('alt', dict[key]);
    });
    root.lang = lang;
    const sel = document.getElementById('langSelect');
    if (sel) sel.value = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* noop */ }
    applyShots();
  }

  const langSelect = document.getElementById('langSelect');
  if (langSelect) {
    langSelect.addEventListener('change', function () { applyLang(this.value); });
  }

  function initialLang() {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved && I18N[saved]) return saved;
    } catch (e) { /* noop */ }
    const q = new URLSearchParams(window.location.search).get('hl');
    if (q === 'es' || q === 'en') return q;
    return (navigator.language || '').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  }

  /* ---------- Tema ---------- */
  const themeBtn = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');

  function iconPath(theme) {
    if (theme === 'dark') {
      return '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    }
    return '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (!reduceMotion) {
        themeIcon.style.opacity = '0';
        window.setTimeout(function () {
          themeIcon.innerHTML = iconPath(theme);
          themeIcon.style.opacity = '1';
        }, 75);
      } else {
        themeIcon.innerHTML = iconPath(theme);
      }
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0f1419' : '#fafbfd');
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* noop */ }
    applyShots();
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  function themeNow() { return root.getAttribute('data-theme') || 'light'; }
  function langNow() { return root.lang || 'es'; }
  function shotUrl(view) {
    return 'assets/shot-' + view + '-' + langNow() + '-' + themeNow() + '.webp';
  }

  /* ---------- Panel de cifras vivo ---------- */
  const BARS = [28, 34, 26, 40, 33, 47, 38, 52, 44, 58, 50, 62, 55, 68, 61, 74];
  function drawBars(animate) {
    const svg = document.getElementById('liveBars');
    if (!svg) return;
    const w = 300, h = 72, pad = 2, gap = 2;
    const bw = (w - pad * 2 - gap * (BARS.length - 1)) / BARS.length;
    let out = '';
    BARS.forEach(function (v, i) {
      const bh = (v / 74) * (h - 8);
      const x = pad + i * (bw + gap);
      const y = h - bh - 4;
      out += '<rect class="' + (i === BARS.length - 1 ? 'bar-last' : 'bar') + '" x="' + x + '" y="' + y + '" width="' + bw + '" height="' + bh + '" rx="1.5"';
      if (animate && !reduceMotion) out += ' style="transform-origin:' + (x + bw / 2) + 'px ' + h + 'px;animation:barGrow 0.5s ease-out ' + (i * 0.04) + 's both"';
      out += '></rect>';
    });
    svg.innerHTML = out;
  }
  if (!reduceMotion) {
    const st = document.createElement('style');
    st.textContent = '@keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }';
    document.head.appendChild(st);
  }

  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-count')) || 0;
    const suffix = el.querySelector('.stat-suffix');
    const setNum = function (v) {
      if (suffix) {
        el.childNodes.forEach(function (n) {
          if (n.nodeType === 3) n.nodeValue = String(v);
        });
      } else {
        el.textContent = String(v);
      }
    };
    if (reduceMotion) { setNum(target); return; }
    const dur = 900;
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setNum(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const livePanel = document.getElementById('livePanel');
  const counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  function runCounters() {
    counters.forEach(function (c) { animateCount(c); });
    const stripV = document.getElementById('stripVisitors');
    const stripP = document.getElementById('stripPages');
    if (stripV) stripV.textContent = '14873';
    if (stripP) stripP.textContent = '18591';
  }
  function observePanel() {
    if (!livePanel) { runCounters(); return; }
    if (!('IntersectionObserver' in window)) { runCounters(); return; }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCounters(); io.disconnect(); }
      });
    }, { threshold: 0.3 });
    io.observe(livePanel);
  }

  /* Contadores de la sección stats (se animan al entrar) */
  const statsSection = document.querySelector('.stats');
  const statNums = Array.prototype.slice.call(document.querySelectorAll('.stat .stat-num'));
  function observeStats() {
    if (!statsSection || statNums.length === 0) return;
    if (!('IntersectionObserver' in window)) { statNums.forEach(function (c) { animateCount(c); }); return; }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { statNums.forEach(function (c) { animateCount(c); }); io.disconnect(); }
      });
    }, { threshold: 0.4 });
    io.observe(statsSection);
  }

  /* Freshness "actualizado hace Ns" en el panel vivo */
  function tickFreshness() {
    const el = document.getElementById('liveFoot');
    if (!el) return;
    const dict = I18N[root.lang] || I18N.es;
    const key = dict['misc.updated'] || 'updated {{n}}s ago';
    let n = 0;
    function render() {
      el.textContent = key.replace('{{n}}', String(n));
      n += 1;
    }
    render();
    setInterval(render, 1000);
  }

  /* ---------- Slider de capturas ---------- */
  const shotImg = document.getElementById('shotImg');
  const shotCaption = document.getElementById('shotCaption');
  let shotIndex = 0;

  function applyShots() {
    document.querySelectorAll('.thumb img').forEach(function (img) {
      img.src = shotUrl(img.dataset.view);
    });
    document.querySelectorAll('img[data-shot]').forEach(function (img) {
      img.src = shotUrl(img.dataset.shot);
    });
    renderShot(shotIndex);
  }

  function renderShot(i) {
    shotIndex = (i + SLIDES.length) % SLIDES.length;
    const view = SLIDES[shotIndex];
    const update = function () {
      shotImg.src = shotUrl(view);
      shotImg.alt = SHOT_ALT[view][langNow()];
      const dict = I18N[langNow()] || I18N.es;
      shotCaption.textContent = dict['shots.' + view] || '';
      document.querySelectorAll('.thumb').forEach(function (th, idx) {
        th.classList.toggle('active', idx === shotIndex);
      });
    };
    if (reduceMotion) { update(); return; }
    shotImg.classList.add('switching');
    window.setTimeout(function () {
      update();
      shotImg.classList.remove('switching');
    }, 150);
  }

  const shotPrev = document.getElementById('shotPrev');
  const shotNext = document.getElementById('shotNext');
  if (shotPrev) shotPrev.addEventListener('click', function () { renderShot(shotIndex - 1); });
  if (shotNext) shotNext.addEventListener('click', function () { renderShot(shotIndex + 1); });
  document.querySelectorAll('.thumb').forEach(function (th) {
    th.addEventListener('click', function () { renderShot(parseInt(th.dataset.slide, 10)); });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('shotLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  function syncLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightboxImg.src = shotImg.src;
    lightboxImg.alt = shotImg.alt;
    lightboxCaption.textContent = shotCaption.textContent;
  }
  function openLightbox() {
    if (!lightbox) return;
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    syncLightbox();
    if (lightboxClose) lightboxClose.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lightbox) return;
    if (reduceMotion) { lightbox.hidden = true; lightbox.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (shotImg) shotImg.focus(); return; }
    if (lightbox.classList.contains('closing')) return;
    lightbox.classList.add('closing');
    window.setTimeout(function () {
      lightbox.hidden = true;
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.classList.remove('closing');
      document.body.style.overflow = '';
      if (shotImg) shotImg.focus();
    }, 140);
  }
  if (shotImg) shotImg.addEventListener('click', openLightbox);
  if (shotImg) shotImg.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(); } });
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', function () { renderShot(shotIndex - 1); syncLightbox(); });
  if (lightboxNext) lightboxNext.addEventListener('click', function () { renderShot(shotIndex + 1); syncLightbox(); });
  if (lightbox) {
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox || lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') { renderShot(shotIndex - 1); syncLightbox(); }
      else if (e.key === 'ArrowRight') { renderShot(shotIndex + 1); syncLightbox(); }
    });
  }

  /* ---------- Reveal al hacer scroll ---------- */
  const reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom'));
  if ('IntersectionObserver' in window && !reduceMotion) {
    const ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (r) { ro.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add('in'); });
  }

  /* ---------- Copiar comando ---------- */
  const copyBtn = document.getElementById('copyBtn');
  const installCmd = document.getElementById('installCmd');
  if (copyBtn && installCmd) {
    copyBtn.addEventListener('click', function () {
      const text = installCmd.textContent.replace(/&/g, '&').trim();
      const done = function () {
        const dict = I18N[root.lang] || I18N.es;
        const orig = copyBtn.textContent;
        copyBtn.textContent = dict['misc.copied'] || (root.lang === 'es' ? 'Copiado ✓' : 'Copied ✓');
        setTimeout(function () { copyBtn.textContent = orig; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '0';
        ta.style.left = '0';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ta.setSelectionRange(0, ta.value.length);
        try { document.execCommand('copy'); } catch (e) { /* noop */ }
        document.body.removeChild(ta);
        done();
      }
    });
  }

  /* ---------- Partículas del hero ---------- */
  function spawnParticles() {
    const hero = document.querySelector('.hero');
    if (!hero || reduceMotion) return;
    const colors = ['#2b5884', '#0e7490', '#7c3aed', '#db2777', '#059669', '#0891b2'];
    for (let i = 0; i < 14; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      const size = 3 + Math.random() * 5;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = (8 + Math.random() * 84) + '%';
      p.style.top = (45 + Math.random() * 45) + '%';
      p.style.background = colors[i % colors.length];
      p.style.setProperty('--px', (Math.random() * 40 - 20).toFixed(0) + 'px');
      p.style.animationDuration = (4 + Math.random() * 5).toFixed(1) + 's';
      p.style.animationDelay = (Math.random() * 6).toFixed(1) + 's';
      hero.appendChild(p);
    }
  }

  /* ---------- Tilt 3D del mockup (reactivo al ratón) ---------- */
  const mock = document.querySelector('.hero-mock');
  if (mock && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    const frame = mock.querySelector('.mock-frame');
    const maxRotate = 7;
    let raf = null;
    mock.addEventListener('mousemove', function (e) {
      const r = mock.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        frame.style.transform = 'perspective(900px) rotateY(' + (px * maxRotate).toFixed(2) + 'deg) rotateX(' + (-py * maxRotate).toFixed(2) + 'deg)';
      });
    });
    mock.addEventListener('mouseleave', function () {
      if (raf) cancelAnimationFrame(raf);
      frame.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
    });
  }

  /* ---------- Arranque ---------- */
  applyTheme(initialTheme());
  applyLang(initialLang());
  drawBars(true);
  observePanel();
  observeStats();
  tickFreshness();
  spawnParticles();
  renderShot(0);

  function initialTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) { /* noop */ }
    return 'light';
  }
})();
