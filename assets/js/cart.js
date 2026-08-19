/* ==========================================================================
   KA SHOP · panier (localStorage, tiroir, calcul de livraison par carte)
   ========================================================================== */
(function () {
  'use strict';

  var SHOP_LAT = 3.865620, SHOP_LNG = 11.519531; // KA SHOP, Yaoundé (position réelle)
  var KM_PER_PX = 7 / 72; // rayon 7 km ≈ 72px sur la carte

  var state = {
    cart: [],
    delivKm: null,
    delivPx: null,
    delivAddr: ''
  };

  function load() {
    try {
      var raw = localStorage.getItem('kashop_cart');
      if (raw) {
        var arr = JSON.parse(raw);
        if (Array.isArray(arr)) state.cart = arr;
      }
    } catch (e) {}
  }
  function persist() {
    try { localStorage.setItem('kashop_cart', JSON.stringify(state.cart)); } catch (e) {}
  }

  function count() { return state.cart.reduce(function (s, i) { return s + i.quantity; }, 0); }
  function total() { return state.cart.reduce(function (s, i) { return s + i.price * i.quantity; }, 0); }

  function add(product) {
    if (!product || !product.stock) return;
    var ex = state.cart.find(function (i) { return i.id === product.id; });
    if (ex) ex.quantity++;
    else state.cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
    persist();
    renderBadge();
    renderDrawer();
    open();
  }
  function changeQty(id, delta) {
    var it = state.cart.find(function (i) { return i.id === id; });
    if (!it) return;
    it.quantity += delta;
    if (it.quantity <= 0) state.cart = state.cart.filter(function (i) { return i.id !== id; });
    persist(); renderBadge(); renderDrawer();
  }
  function remove(id) {
    state.cart = state.cart.filter(function (i) { return i.id !== id; });
    persist(); renderBadge(); renderDrawer();
  }

  function delivInfo(km) {
    if (km == null) return null;
    if (km <= 7) return { fee: 1000, label: '1 000 FCFA', zone: "Jusqu'à 7 km", tone: 'near' };
    if (km <= 15) return { fee: 2000, label: '2 000 FCFA', zone: 'De 7 à 15 km', tone: 'mid' };
    return { fee: null, label: 'Sur devis', zone: 'Au-delà de 15 km', tone: 'far' };
  }

  /* ---------- badge du header (présent sur toutes les pages) ---------- */
  function renderBadge() {
    var badges = document.querySelectorAll('[data-cart-badge]');
    var n = count();
    badges.forEach(function (b) {
      b.textContent = n;
      b.classList.toggle('show', n > 0);
    });
  }

  /* ---------- tiroir panier ---------- */
  var els = {};
  function cacheEls() {
    els.overlay = document.getElementById('cart-overlay');
    els.body = document.getElementById('cart-body');
    els.empty = document.getElementById('cart-empty-state');
    els.foot = document.getElementById('cart-foot');
    els.map = document.getElementById('deliv-map');
    els.pin = document.getElementById('deliv-pin');
    els.result = document.getElementById('deliv-result');
    els.resultTitle = document.getElementById('deliv-result-title');
    els.resultFee = document.getElementById('deliv-result-fee');
    els.addrInput = document.getElementById('deliv-addr');
    els.geoErr = document.getElementById('geo-err');
    els.geoBtn = document.getElementById('geo-btn');
    els.subEl = document.getElementById('cart-sub');
    els.feeEl = document.getElementById('cart-fee');
    els.grandEl = document.getElementById('cart-grand');
    els.waBtn = document.getElementById('cart-wa-btn');
  }

  function open() {
    if (!els.overlay) return;
    els.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    if (!els.overlay) return;
    els.overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderDrawer() {
    if (!els.body) return;
    var hasItems = state.cart.length > 0;
    if (els.empty) els.empty.style.display = hasItems ? 'none' : 'grid';
    if (els.body) els.body.style.display = hasItems ? 'flex' : 'none';
    if (els.foot) els.foot.style.display = hasItems ? 'block' : 'none';
    if (!hasItems) return;

    var itemsHtml = state.cart.map(function (it) {
      var img = it.image ? '<img src="' + it.image + '" alt="' + escapeHtml(it.name) + '">' : '';
      return (
        '<div class="cart-item" data-id="' + it.id + '">' +
        '<div class="thumb">' + img + '</div>' +
        '<div class="info">' +
        '<div class="row1"><span class="name">' + escapeHtml(it.name) + '</span>' +
        '<button class="remove" data-action="remove" aria-label="Retirer">✕</button></div>' +
        '<div class="price">' + KA_WA.fmtFCFA(it.price) + '</div>' +
        '<div class="qty-row">' +
        '<button class="qty-btn" data-action="dec" aria-label="Moins">−</button>' +
        '<span class="qty-val">' + it.quantity + '</span>' +
        '<button class="qty-btn" data-action="inc" aria-label="Plus">+</button>' +
        '</div></div></div>'
      );
    }).join('');

    els.body.querySelectorAll('.cart-item').forEach(function (n) { n.remove(); });
    var deliv = els.body.querySelector('.deliv-block');
    var wrap = document.createElement('div');
    wrap.innerHTML = itemsHtml;
    Array.prototype.slice.call(wrap.children).forEach(function (n) { els.body.insertBefore(n, deliv); });

    els.body.querySelectorAll('.cart-item').forEach(function (row) {
      var id = row.getAttribute('data-id');
      row.querySelector('[data-action="inc"]').addEventListener('click', function () { changeQty(id, 1); });
      row.querySelector('[data-action="dec"]').addEventListener('click', function () { changeQty(id, -1); });
      row.querySelector('[data-action="remove"]').addEventListener('click', function () { remove(id); });
    });

    updateTotals();
  }

  function updateTotals() {
    var sub = total();
    var free = sub >= 50000;
    var d = delivInfo(state.delivKm);
    var feeFmt, grand;
    if (free) { feeFmt = 'Offerte'; grand = KA_WA.fmtFCFA(sub); }
    else if (!d) { feeFmt = 'à définir'; grand = KA_WA.fmtFCFA(sub); }
    else if (d.fee == null) { feeFmt = 'sur devis'; grand = KA_WA.fmtFCFA(sub) + ' + livr.'; }
    else { feeFmt = KA_WA.fmtFCFA(d.fee); grand = KA_WA.fmtFCFA(sub + d.fee); }
    if (els.subEl) els.subEl.textContent = KA_WA.fmtFCFA(sub);
    if (els.feeEl) els.feeEl.textContent = feeFmt;
    if (els.grandEl) els.grandEl.textContent = grand;
    if (els.waBtn) els.waBtn.href = KA_WA.buildCartMessage(state.cart, sub, d, state.delivKm, state.delivAddr);
    renderDelivResult();
  }

  function renderDelivResult() {
    if (!els.result) return;
    var d = delivInfo(state.delivKm);
    els.result.classList.remove('near', 'mid', 'far');
    if (!d) {
      els.resultTitle.textContent = 'Placez le point de livraison';
      els.resultFee.textContent = '···';
    } else {
      els.resultTitle.textContent = d.zone + ' · ≈ ' + KA_WA.kmFmt(state.delivKm);
      els.resultFee.textContent = d.label;
      els.result.classList.add(d.tone);
    }
  }

  function placeFrom(clientX, clientY) {
    if (!els.map) return;
    var r = els.map.getBoundingClientRect();
    var x = Math.max(0, Math.min(r.width, clientX - r.left));
    var y = Math.max(0, Math.min(r.height, clientY - r.top));
    var km = Math.hypot(x - r.width / 2, y - r.height / 2) * KM_PER_PX;
    state.delivPx = { x: x, y: y };
    state.delivKm = km;
    if (els.pin) {
      els.pin.style.left = x + 'px';
      els.pin.style.top = y + 'px';
      els.pin.classList.add('show');
    }
    if (els.geoErr) els.geoErr.classList.remove('show');
    updateTotals();
  }

  function geoDist(la1, lo1, la2, lo2) {
    var R = 6371, tr = function (d) { return d * Math.PI / 180; };
    var dLa = tr(la2 - la1), dLo = tr(lo2 - lo1);
    var a = Math.sin(dLa / 2) ** 2 + Math.cos(tr(la1)) * Math.cos(tr(la2)) * Math.sin(dLo / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }
  function bearingRad(la1, lo1, la2, lo2) {
    var tr = function (d) { return d * Math.PI / 180; };
    var dLo = tr(lo2 - lo1);
    var y = Math.sin(dLo) * Math.cos(tr(la2));
    var x = Math.cos(tr(la1)) * Math.sin(tr(la2)) - Math.sin(tr(la1)) * Math.cos(tr(la2)) * Math.cos(dLo);
    return Math.atan2(y, x);
  }
  function geoLocate() {
    if (!navigator.geolocation) {
      if (els.geoErr) { els.geoErr.textContent = 'Géolocalisation non disponible sur cet appareil.'; els.geoErr.classList.add('show'); }
      return;
    }
    if (els.geoBtn) els.geoBtn.textContent = 'Localisation…';
    navigator.geolocation.getCurrentPosition(function (pos) {
      var la = pos.coords.latitude, lo = pos.coords.longitude;
      var km = geoDist(SHOP_LAT, SHOP_LNG, la, lo);
      if (els.map) {
        var r = els.map.getBoundingClientRect();
        var cx = r.width / 2, cy = r.height / 2;
        var rad = Math.min(km / KM_PER_PX, Math.min(cx, cy) - 14);
        var br = bearingRad(SHOP_LAT, SHOP_LNG, la, lo);
        var x = cx + rad * Math.sin(br), y = cy - rad * Math.cos(br);
        state.delivPx = { x: x, y: y };
        if (els.pin) { els.pin.style.left = x + 'px'; els.pin.style.top = y + 'px'; els.pin.classList.add('show'); }
      }
      state.delivKm = km;
      if (els.geoBtn) els.geoBtn.textContent = 'Utiliser ma position';
      if (els.geoErr) els.geoErr.classList.remove('show');
      updateTotals();
    }, function () {
      if (els.geoBtn) els.geoBtn.textContent = 'Utiliser ma position';
      if (els.geoErr) { els.geoErr.textContent = 'Position refusée ou indisponible, placez le point à la main.'; els.geoErr.classList.add('show'); }
    }, { enableHighAccuracy: true, timeout: 10000 });
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function init() {
    load();
    cacheEls();
    renderBadge();
    renderDrawer();

    document.querySelectorAll('[data-cart-open]').forEach(function (b) { b.addEventListener('click', open); });
    document.querySelectorAll('[data-cart-close]').forEach(function (b) { b.addEventListener('click', close); });
    var bg = document.getElementById('cart-overlay-bg');
    if (bg) bg.addEventListener('click', close);

    if (els.map) {
      els.map.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        placeFrom(e.clientX, e.clientY);
        var mv = function (ev) { ev.preventDefault(); placeFrom(ev.clientX, ev.clientY); };
        var up = function () { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); };
        window.addEventListener('pointermove', mv);
        window.addEventListener('pointerup', up);
      });
    }
    if (els.geoBtn) els.geoBtn.addEventListener('click', geoLocate);
    if (els.addrInput) els.addrInput.addEventListener('input', function (e) { state.delivAddr = e.target.value; updateTotals(); });
  }

  window.KA_CART = {
    init: init, add: add, changeQty: changeQty, remove: remove,
    count: count, total: total, open: open, close: close,
    getState: function () { return state; }
  };

  document.addEventListener('DOMContentLoaded', init);
})();
