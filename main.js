/* ══════════════════════════════════════════════════════
   DSCHANG 2026 – Opération Ville Propre
   main.js  v3.1  (FIXED: ticker, lang, nav)
══════════════════════════════════════════════════════ */
'use strict';

/* ══════════════════════════════════════════════════
   1. NEWS TICKER
   - Max 4 items displayed at a time
   - Single language (FR or EN) — no multi-lang spans
   - JS-driven scroll animation
   - Updates every 5s with a new rotating item
══════════════════════════════════════════════════ */
(function () {

  var TICKER_FR = [
    '🌤️ Dschang · 22°C · Partiellement nuageux',
    '🧹 OVP – Dimanche prochain · Préfecture · 6h–10h · Rejoignez-nous !',
    '💧 100 Forages : Phase 1 lancée – 25 quartiers prioritaires',
    '📰 MenouActu : « Tessa, favori des internautes pour la mairie »',
    '🌱 Samedi Vert · 14 juin 2026 · Quartier Foto',
    '🏆 Grand Prix Excellence Africaine – Serge Baresi Tessa · 2025',
    '💰 Budget Dschang 2026 : 500M FCFA pour les infrastructures',
    '📅 Prochaine réunion MRC Dschang – date à confirmer'
  ];

  var TICKER_EN = [
    '🌤️ Dschang · 22°C · Partly cloudy',
    '🧹 Clean City Op – Next Sunday · Prefecture · 6–10am · Join us!',
    '💧 100 Wells: Phase 1 underway – 25 priority neighbourhoods',
    '📰 MenouActu: "Tessa, internet favourite for Dschang mayor"',
    '🌱 Green Saturday · 14 June 2026 · Foto quarter',
    '🏆 African Excellence Award – Serge Baresi Tessa · 2025',
    '💰 Dschang Budget 2026: 500M CFA for infrastructure',
    '📅 Next MRC Dschang meeting – date to be confirmed'
  ];

  var track       = document.getElementById('ticker-track');
  var label       = document.getElementById('ticker-label');
  var currentLang = 'fr';
  var tickerAnim  = null;

  function buildTicker(lang) {
    currentLang = lang;
    var items    = lang === 'en' ? TICKER_EN : TICKER_FR;
    var labelTxt = lang === 'en' ? '🟢 NEWS' : '🟢 ACTU';

    if (label) label.textContent = labelTxt;
    if (!track) return;

    // Pick 4 items starting from a random offset so it feels fresh
    var offset = Math.floor(Math.random() * items.length);
    var chosen = [];
    for (var i = 0; i < 4; i++) {
      chosen.push(items[(offset + i) % items.length]);
    }

    // Build HTML (duplicate for seamless loop)
    var html = '';
    chosen.forEach(function (txt) {
      html += '<span class="ticker-item">' + txt + '</span><span class="ticker-dot">·</span>';
    });
    track.innerHTML = html + html; // duplicate for seamless loop

    // Reset and restart animation
    track.style.animation = 'none';
    // Force reflow
    void track.offsetWidth;
    var totalW = track.scrollWidth / 2;
    var speed  = 80; // px per second — adjust for pace
    var dur    = Math.round(totalW / speed);
    track.style.animation = 'tickerScroll ' + dur + 's linear infinite';
  }

  // Refresh ticker content every 90 seconds (new 4 items)
  function startTickerRefresh() {
    setInterval(function () {
      buildTicker(currentLang);
    }, 90000);
  }

  // Fetch weather from Open-Meteo
  function fetchWeather(lang) {
    var LAT = 5.4440, LON = 10.0575;
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + LAT +
              '&longitude=' + LON + '&current_weather=true&timezone=Africa%2FDouala';
    var WMO_FR = {
      0:'☀️ Ciel dégagé',1:'🌤️ Peu nuageux',2:'⛅ Partiellement nuageux',
      3:'☁️ Couvert',45:'🌫️ Brouillard',51:'🌦️ Bruine',
      61:'🌧️ Pluie faible',63:'🌧️ Pluie',65:'⛈️ Pluie forte',80:'🌦️ Averses',95:'⛈️ Orage'
    };
    var WMO_EN = {
      0:'☀️ Clear sky',1:'🌤️ Mainly clear',2:'⛅ Partly cloudy',
      3:'☁️ Overcast',45:'🌫️ Foggy',51:'🌦️ Light drizzle',
      61:'🌧️ Light rain',63:'🌧️ Rain',65:'⛈️ Heavy rain',80:'🌦️ Showers',95:'⛈️ Thunderstorm'
    };
    fetch(url).then(function (r) { return r.json(); }).then(function (data) {
      var cw   = data.current_weather;
      var code = cw.weathercode;
      var wmo  = lang === 'en' ? WMO_EN : WMO_FR;
      var desc = wmo[code] || wmo[Math.floor(code / 10) * 10] || '🌤️';
      var temp = Math.round(cw.temperature);
      var wind = Math.round(cw.windspeed);
      // Update first ticker item with live weather
      var arr    = lang === 'en' ? TICKER_EN : TICKER_FR;
      arr[0]     = '🌤️ Dschang · ' + temp + '°C · ' + desc.split(' ').slice(1).join(' ') + ' · Vent ' + wind + ' km/h';
      buildTicker(lang);
    }).catch(function () {
      buildTicker(lang);
    });
  }

  // Expose for setLang to call
  window.updateTicker = function (lang) {
    fetchWeather(lang);
  };

  // Init
  window.addEventListener('DOMContentLoaded', function () {
    var savedLang = localStorage.getItem('lang') || 'fr';
    fetchWeather(savedLang);
    startTickerRefresh();
  });

})();

/* ══════════════════════════════════════════════════
   2. LANGUAGE SWITCHER
══════════════════════════════════════════════════ */
window.setLang = function (lang) {
  var html = document.getElementById('root-html');
  html.lang = lang;

  ['fr', 'en', 'yb'].forEach(function (l) {
    var btn = document.getElementById('btn-' + l);
    if (btn) {
      btn.classList.toggle('active', l === lang);
      btn.setAttribute('aria-pressed', l === lang ? 'true' : 'false');
    }
  });

  // Update follow label in topbar
  var followLabel = document.getElementById('follow-label');
  if (followLabel) {
    followLabel.textContent = lang === 'en' ? 'Follow us' : lang === 'yb' ? 'Metsa\'te' : 'Suivez-nous';
  }

  // Update input placeholder
  var inp = document.getElementById('mb-input');
  if (inp) {
    var ph = { fr: 'Posez votre question…', en: 'Ask your question…', yb: 'Lezεte menu…' };
    inp.placeholder = ph[lang] || ph.fr;
  }

  // Sync AzA chatbot language
  if (window.setAzaLang) window.setAzaLang(lang);

  // Update ticker for new language
  if (window.updateTicker) window.updateTicker(lang);

  localStorage.setItem('lang', lang);
};

// Restore saved language on load
(function () {
  var saved = localStorage.getItem('lang');
  if (saved && saved !== 'fr') {
    window.setLang(saved);
  }
})();

/* ══════════════════════════════════════════════════
   3. NAVIGATION MOBILE
══════════════════════════════════════════════════ */
window.toggleMenu = function () {
  var menu   = document.getElementById('mobile-menu');
  var toggle = document.getElementById('menu-toggle');
  var widget = document.getElementById('AzA-widget');
  var isOpen = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  if (widget) widget.style.bottom = isOpen ? '220px' : '24px';
  toggle.innerHTML = isOpen
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
};

window.closeMenu = function () {
  var menu   = document.getElementById('mobile-menu');
  var toggle = document.getElementById('menu-toggle');
  var widget = document.getElementById('AzA-widget');
  if (!menu) return;
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  if (widget) widget.style.bottom = '24px';
  toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
};

document.addEventListener('click', function (e) {
  if (!e.target.closest('#main-nav') && !e.target.closest('#mobile-menu')) closeMenu();
});

/* ══════════════════════════════════════════════════
   4. YOUTUBE — autoplay + sidebar
══════════════════════════════════════════════════ */
window.addEventListener('load', function () {
  setTimeout(function () {
    var iframe = document.getElementById('yt-iframe');
    if (iframe && iframe.src && !iframe.src.includes('autoplay=1')) {
      iframe.src = iframe.src.replace('?', '?autoplay=1&').replace('autoplay=1&&', 'autoplay=1&');
      if (!iframe.src.includes('autoplay=1')) {
        iframe.src += (iframe.src.includes('?') ? '&' : '?') + 'autoplay=1';
      }
    }
  }, 600);
});

(function () {
  var VIDEOS = [
    { id: 'EfHcV89DIh8', title: 'Dschang, l\'heure du bilan' },
    { id: 'pxdkPIHyJoU', title: 'Opération Ville Propre – Février 2026' },
    { id: 'CvHnDpc8Y48', title: 'Message de Serge Baresi Tessa' },
    { id: 'k2N0i4M91-0', title: 'Rénovation Église Saint-Laurent' },
    { id: 'XPeDQpnQIbM', title: 'Cérémonie Bafou 2026' }
  ];
  var iframe    = document.getElementById('yt-iframe');
  var nowTitle  = document.getElementById('yt-now-title');
  var container = document.getElementById('yt-thumbs');
  if (!iframe || !container) return;

  function playVideo(id, title, el) {
    iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&vq=hd720';
    if (nowTitle) nowTitle.textContent = '▶ ' + title;
    document.querySelectorAll('.yt-thumb').forEach(function (t) { t.classList.remove('active'); });
    if (el) el.classList.add('active');
  }

  VIDEOS.forEach(function (v) {
    var div = document.createElement('div');
    div.className = 'yt-thumb';
    div.setAttribute('role', 'button');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', v.title);
    div.innerHTML =
      '<div class="yt-thumb-img-wrap">' +
        '<img src="https://i.ytimg.com/vi/' + v.id + '/mqdefault.jpg" alt="' + v.title + '" loading="lazy">' +
        '<div class="yt-play-icon"><svg viewBox="0 0 10 10" width="10" height="10" fill="white"><polygon points="2,1 9,5 2,9"/></svg></div>' +
      '</div>' +
      '<div class="yt-thumb-meta"><div class="yt-thumb-title">' + v.title + '</div></div>';
    div.addEventListener('click', function () { playVideo(v.id, v.title, div); });
    div.addEventListener('keydown', function (e) { if (e.key === 'Enter') playVideo(v.id, v.title, div); });
    container.appendChild(div);
  });

  function matchSidebarHeight() {
    var sidebar = document.getElementById('yt-sidebar');
    var layout  = document.getElementById('yt-layout');
    if (!sidebar || !layout) return;
    var main = layout.querySelector('.yt-main');
    sidebar.style.height = (main && window.innerWidth > 768 && main.offsetHeight > 0)
      ? main.offsetHeight + 'px' : 'auto';
    sidebar.style.overflowY = 'auto';
  }
  window.addEventListener('resize', matchSidebarHeight);
  setTimeout(matchSidebarHeight, 700);
})();

/* ══════════════════════════════════════════════════
   5. CAROUSEL
══════════════════════════════════════════════════ */
(function () {
  var track   = document.getElementById('carousel-track');
  var dotsEl  = document.getElementById('carousel-dots');
  if (!track || !dotsEl) return;
  var slides  = track.querySelectorAll('.carousel-slide');
  var current = 0, timer;

  slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', function () { goTo(i); });
    dotsEl.appendChild(dot);
  });

  function goTo(n) {
    current = ((n % slides.length) + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + current * 100 + '%)';
    dotsEl.querySelectorAll('.carousel-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
    clearTimeout(timer);
    timer = setTimeout(function () { goTo(current + 1); }, 5000);
  }

  window.moveCarousel = function (dir) { goTo(current + dir); };

  var touchX = 0;
  track.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  goTo(0);
})();

/* ══════════════════════════════════════════════════
   6. FORMS (Netlify)
══════════════════════════════════════════════════ */
function handleForm(formId, statusId) {
  var form   = document.getElementById(formId);
  var status = document.getElementById(statusId);
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('.btn-submit');
    if (btn) btn.disabled = true;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    }).then(function () {
      if (status) { status.className = 'form-message success'; status.textContent = '✅ Message envoyé ! Merci.'; }
      form.reset();
    }).catch(function () {
      if (status) { status.className = 'form-message error'; status.textContent = '⚠️ Erreur – réessayez.'; }
    }).finally(function () {
      if (btn) setTimeout(function () { btn.disabled = false; }, 3000);
    });
  });
}
handleForm('contact-form', 'contact-msg-status');
handleForm('whatsapp-form', 'wa-msg-status');

/* ══════════════════════════════════════════════════
   7. SUBTLE SCROLL ANIMATIONS
══════════════════════════════════════════════════ */
(function () {
  if (!window.IntersectionObserver) return;
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.style.opacity = '1';
        en.target.style.transform = 'translateY(0)';
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.vision-card, .press-card, .phase, .form-card').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    obs.observe(el);
  });
})();
