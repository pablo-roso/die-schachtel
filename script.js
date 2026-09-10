/* ============================================================
   Die Schachtel — Seitenlogik
   Eine Kneipe, die um 18 Uhr aufmacht und donnerstags bis samstags
   erst um 4 Uhr früh zu: Der Öffnungsstatus rechnet deshalb mit
   Endzeiten jenseits von 24 Uhr.
   ============================================================ */
(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  var HOURS = {
    1: [18, 26], 2: [18, 26], 3: [18, 26],
    4: [18, 28], 5: [18, 28], 6: [18, 28], 0: [18, 26]
  };
  var DAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  function two(n) { return n < 10 ? '0' + n : '' + n; }
  function fmt(v) { return two(Math.floor(v % 24)) + ':' + two(Math.round((v % 1) * 60)); }

  var now = new Date();
  var day = now.getDay();
  var dec = now.getHours() + now.getMinutes() / 60;

  var open = false, until = null;
  var yest = HOURS[(day + 6) % 7];
  if (yest && yest[1] > 24 && dec < yest[1] - 24) { open = true; until = yest[1]; }
  if (!open) {
    var today = HOURS[day];
    if (today && dec >= today[0] && dec < today[1]) { open = true; until = today[1]; }
  }

  var label;
  if (open) {
    label = 'Jetzt offen — bis ' + fmt(until) + ' Uhr';
  } else {
    label = 'Gerade zu';
    for (var i = 0; i < 8; i++) {
      var d = (day + i) % 7;
      var slot = HOURS[d];
      if (!slot) continue;
      if (i === 0 && dec >= slot[0]) continue;
      var when = i === 0 ? 'heute' : i === 1 ? 'morgen' : 'am ' + DAYS[d];
      label = 'Gerade zu — wieder ' + when + ' ab ' + fmt(slot[0]) + ' Uhr';
      break;
    }
  }

  var badge = document.getElementById('statusBadge');
  var text = document.getElementById('statusText');
  if (badge && text) {
    badge.hidden = false;
    badge.classList.add(open ? 'is-open' : 'is-closed');
    text.textContent = label;
  }

  var headerStatus = document.getElementById('headerStatus');
  if (headerStatus) {
    headerStatus.hidden = false;
    headerStatus.textContent = open ? 'offen bis ' + fmt(until) : 'gerade zu';
    if (open) headerStatus.classList.add('is-open');
  }

  var list = document.getElementById('hoursList');
  if (list) {
    var row = list.querySelector('[data-day="' + day + '"]');
    if (row) row.classList.add('is-today');
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
