/* ==========================================================================
   KA SHOP · catalogue, filtres, favoris, fiche produit, contenus statiques
   ========================================================================== */
(function () {
  'use strict';

  var CATS = [
    { id: 'tel', label: 'Téléphones', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"></rect><path d="M11 18h2"></path></svg>' },
    { id: 'charge', label: 'Chargeurs & câbles', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"></path></svg>' },
    { id: 'audio', label: 'Audio', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3v4ZM3 19a2 2 0 0 0 2 2h1v-6H3v4Z"></path></svg>' },
    { id: 'secu', label: 'Sécurité', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path></svg>' },
    { id: 'auto', label: 'Accessoires auto', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13 6.5 7.5A2 2 0 0 1 8.4 6h7.2a2 2 0 0 1 1.9 1.5L19 13v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-5Z"></path><circle cx="7.5" cy="15.5" r="1"></circle><circle cx="16.5" cy="15.5" r="1"></circle></svg>' },
    { id: 'pieces', label: 'Pièces détachées', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5Z"></path></svg>' },
    { id: 'montre', label: 'Montres connectées', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="3"></rect><path d="M9 6V3h6v3"></path><path d="M9 18v3h6v-3"></path></svg>' },
    { id: 'proteg', label: 'Coques & protections', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="3"></rect><path d="M12 2v6"></path><circle cx="12" cy="17" r="1.5"></circle></svg>' }
  ];
  var HOME_CAT_IMG = { tel: 'assets/images/cat-telephones.jpg', charge: 'assets/images/p-chargeur.jpg', audio: 'assets/images/p-casque.jpg', montre: 'assets/images/p-watch-apple.jpg', proteg: 'assets/images/p-coque-beats.jpg', secu: 'assets/images/p-camera.jpg', auto: 'assets/images/auto-support-360.jpg', pieces: 'assets/images/pieces-iphone-parts.jpg' };
  var BEST_IDS = ['p1', 'p5', 'p9', 'p19', 'p20', 'p26'];
  var BRAND_KEYS = [['airpods', 'Apple'], ['apple watch', 'Apple'], ['iphone', 'Apple'], ['magsafe', 'Apple'], ['beats', 'Beats'], ['samsung', 'Samsung'], ['galaxy', 'Samsung'], ['jbl', 'JBL'], ['boombox', 'JBL'], ['sony', 'Sony'], ['soundcore', 'Soundcore'], ['torras', 'TORRAS']];
  var REVIEW_POOL = [
    { n: 'Jean M.', c: 'Yaoundé', t: 'Produit conforme à la description, livraison le jour même. Je recommande vivement.' },
    { n: 'Aline T.', c: 'Odza', t: 'Bon rapport qualité-prix, et le conseil sur WhatsApp est vraiment utile.' },
    { n: 'Serge K.', c: 'Bastos', t: 'Article de qualité. Un léger retard mais le suivi était clair du début à la fin.' },
    { n: 'Mireille N.', c: 'Mvan', t: 'Exactement ce que je cherchais. Emballage soigné, produit testé devant moi.' },
    { n: 'Patrick E.', c: 'Nsam', t: 'Fonctionne parfaitement. Le paiement Mobile Money a été simple et rapide.' },
    { n: 'Rachelle B.', c: 'Biyem-Assi', t: "Très satisfaite, garantie respectée quand j'ai eu une question. Service au top." }
  ];
  var TESTIMONIALS = [
    { n: 'Christelle A.', c: 'Yaoundé · Bastos', t: "J'ai commandé un iPhone reconditionné, testé devant moi et garanti. Anicet répond en quelques minutes sur WhatsApp." },
    { n: 'Boris N.', c: 'Yaoundé · Odza', t: 'Livraison le jour même à Odza, produit exactement comme annoncé. C\'est devenu ma boutique de confiance.' },
    { n: 'Fadimatou S.', c: 'Yaoundé · Mvog-Mbi', t: 'Paiement par Orange Money sans souci, prix clair dès le départ. Aucune mauvaise surprise.' },
    { n: 'Hervé D.', c: 'Yaoundé · Nsam', t: 'Un câble avait un défaut, échangé sans discuter grâce à la garantie. Un vrai service après-vente.' }
  ];
  var FAQ = [
    { q: 'Comment passer commande ?', a: 'Ajoutez vos produits au panier puis validez : votre commande s\'ouvre pré-remplie dans WhatsApp. Pour un article hors catalogue, utilisez la page « Commander » pour décrire votre besoin. On vous confirme prix et délai sous 24h.' },
    { q: 'Quels moyens de paiement acceptez-vous ?', a: 'MTN Mobile Money, Orange Money, et espèces au retrait en boutique. Aucun paiement n\'est exigé en ligne : le prix est confirmé avec vous avant tout règlement.' },
    { q: 'Quels sont les délais et zones de livraison ?', a: "Livraison à Yaoundé le jour même ou sous 24-48h selon la zone. Le montant se calcule automatiquement dans le panier selon la distance. Livraison offerte dès 50 000 FCFA." },
    { q: 'Vos produits sont-ils garantis ?', a: 'Oui. Chaque appareil est vérifié avant la vente et couvert par une garantie. Neuf ou reconditionné, l\'état est toujours annoncé honnêtement.' },
    { q: "Puis-je commander un produit qui n'est pas au catalogue ?", a: 'Bien sûr. C\'est le rôle de la page « Commander » : décrivez le modèle, la référence ou la quantité, et on importe le produit pour vous avec un devis clair.' },
    { q: 'Puis-je suivre ma commande ?', a: 'Oui, chaque commande importée reçoit un numéro (ex. KA-1042). Entrez-le sur la page « Commander » pour voir son avancement, du transit jusqu\'à la boutique.' }
  ];
  var TRACK_STEPS = [
    { label: 'Commande confirmée', sub: 'Accord validé, préparation lancée' },
    { label: 'En transit', sub: 'En route vers le Cameroun' },
    { label: 'Arrivée au pays', sub: 'Dédouanement en cours' },
    { label: 'Disponible en boutique', sub: 'Prête pour retrait ou livraison' },
    { label: 'Livrée / Retirée', sub: 'Commande clôturée' }
  ];
  var DEMO_ORDERS = {
    'KA-1042': { i: 0, eta: '≈ 5 jours' },
    'KA-1039': { i: 1, eta: '≈ 2 jours' },
    'KA-1025': { i: 2, eta: "Retrait aujourd'hui" },
    'KA-1011': { i: 3, eta: 'Terminée' }
  };

  var PRODUCTS = [];
  var favs = [];

  function loadFavs() {
    try {
      var raw = localStorage.getItem('kashop_favs');
      if (raw) { var arr = JSON.parse(raw); if (Array.isArray(arr)) favs = arr; }
    } catch (e) {}
  }
  function persistFavs() {
    try { localStorage.setItem('kashop_favs', JSON.stringify(favs)); } catch (e) {}
  }
  function toggleFav(id) {
    var i = favs.indexOf(id);
    if (i === -1) favs.push(id); else favs.splice(i, 1);
    persistFavs();
  }

  function catLabel(id) { var c = CATS.find(function (x) { return x.id === id; }); return c ? c.label : ''; }
  function brandOf(p) {
    var n = (p.name || '').toLowerCase();
    for (var i = 0; i < BRAND_KEYS.length; i++) { if (n.indexOf(BRAND_KEYS[i][0]) !== -1) return BRAND_KEYS[i][1]; }
    return 'Sans marque';
  }
  function hashId(id) { var h = 0; for (var i = 0; i < id.length; i++) { h = (h * 31 + id.charCodeAt(i)) >>> 0; } return h; }
  function ratingOf(p) { return 4.1 + (hashId(p.id) % 9) / 10; }
  function reviewCountOf(p) { return 8 + (hashId(p.id + 'r') % 196); }
  function priceBucket(price) { if (price < 10000) return 'low'; if (price <= 50000) return 'mid'; return 'high'; }
  function reviewsFor(p) {
    var h = hashId(p.id + 'v'), n = 2 + (h % 2), base = ratingOf(p), out = [];
    for (var i = 0; i < n; i++) {
      var rv = REVIEW_POOL[(h + i * 3) % REVIEW_POOL.length];
      var r = Math.min(5, Math.round(base) + (i === 1 ? -1 : 0)) || 5;
      out.push({ n: rv.n, t: rv.t, initials: rv.n[0], starPct: (r / 5 * 100) });
    }
    return out;
  }

  /* ---------- carte produit (grille) ---------- */
  function productCardHtml(p) {
    var oldPrice = p.oldPrice || null;
    var badge = p.badge || (oldPrice ? 'Promo' : '');
    var disabled = !p.stock;
    var rating = ratingOf(p);
    var isFav = favs.indexOf(p.id) !== -1;
    var img = p.image ? '<img src="' + p.image + '" alt="' + escapeHtml(p.name) + '" loading="lazy">' : '<span class="noimg">' + escapeHtml(p.name) + '</span>';
    return (
      '<article class="prod-card" data-id="' + p.id + '">' +
      '<button class="prod-fav' + (isFav ? ' active' : '') + '" data-action="fav" aria-label="Favori">' +
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="' + (isFav ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"></path></svg></button>' +
      '<button class="prod-thumb" data-action="open">' + img +
      (disabled ? '<span class="prod-badge rupture">Rupture</span>' : (badge ? '<span class="prod-badge">' + badge + '</span>' : '')) +
      '</button>' +
      '<div class="prod-body">' +
      '<span class="prod-cat">' + catLabel(p.category) + '</span>' +
      '<button class="prod-name" data-action="open">' + escapeHtml(p.name) + '</button>' +
      '<div class="prod-rating"><span class="prod-stars">★★★★★<b style="width:' + (rating / 5 * 100) + '%">★★★★★</b></span>' +
      '<span class="num">' + rating.toFixed(1).replace('.', ',') + '</span><span class="count">(' + reviewCountOf(p) + ')</span></div>' +
      '<div class="prod-price"><span class="now">' + KA_WA.fmtFCFA(p.price) + '</span>' +
      (oldPrice ? '<span class="old">' + KA_WA.fmtFCFA(oldPrice) + '</span>' : '') + '</div>' +
      '<button class="prod-add" data-action="add" ' + (disabled ? 'disabled' : '') + '>' + (disabled ? 'Indisponible' : 'Ajouter au panier') + '</button>' +
      '</div></article>'
    );
  }

  function wireCard(el, p) {
    el.querySelectorAll('[data-action="open"]').forEach(function (b) { b.addEventListener('click', function () { openDetail(p.id); }); });
    var favBtn = el.querySelector('[data-action="fav"]');
    if (favBtn) favBtn.addEventListener('click', function (e) {
      e.stopPropagation(); toggleFav(p.id);
      favBtn.classList.toggle('active');
      var svg = favBtn.querySelector('svg');
      svg.setAttribute('fill', favBtn.classList.contains('active') ? 'currentColor' : 'none');
    });
    var addBtn = el.querySelector('[data-action="add"]');
    if (addBtn) addBtn.addEventListener('click', function () { KA_CART.add(p); });
  }

  function renderGrid(container, list) {
    if (!container) return;
    container.innerHTML = list.map(productCardHtml).join('');
    list.forEach(function (p) {
      var el = container.querySelector('[data-id="' + p.id + '"]');
      if (el) wireCard(el, p);
    });
  }

  /* ---------- fiche produit (modale) ---------- */
  function openDetail(id) {
    var p = PRODUCTS.find(function (x) { return x.id === id; });
    if (!p) return;
    var wrap = document.getElementById('product-modal-wrap');
    if (!wrap) return;
    var rating = ratingOf(p);
    document.getElementById('pm-cat').textContent = catLabel(p.category);
    document.getElementById('pm-name').textContent = p.name;
    document.getElementById('pm-stars-fill').style.width = (rating / 5 * 100) + '%';
    document.getElementById('pm-rating-num').textContent = rating.toFixed(1).replace('.', ',');
    document.getElementById('pm-review-count').textContent = reviewCountOf(p) + ' avis';
    document.getElementById('pm-price-now').textContent = KA_WA.fmtFCFA(p.price);
    var oldEl = document.getElementById('pm-price-old');
    if (p.oldPrice) { oldEl.textContent = KA_WA.fmtFCFA(p.oldPrice); oldEl.style.display = ''; } else { oldEl.style.display = 'none'; }
    document.getElementById('pm-desc').textContent = p.description;
    var media = document.getElementById('pm-media');
    media.innerHTML = p.image ? '<img src="' + p.image + '" alt="' + escapeHtml(p.name) + '">' : '<span class="noimg">' + escapeHtml(p.name) + '</span>';
    var stockEl = document.getElementById('pm-stock');
    stockEl.textContent = p.stock ? 'En stock · retrait boutique' : 'Momentanément en rupture';
    stockEl.className = 'pm-stock ' + (p.stock ? 'in' : 'out');
    var addBtn = document.getElementById('pm-add');
    addBtn.disabled = !p.stock;
    addBtn.textContent = p.stock ? 'Ajouter au panier' : 'Indisponible';
    addBtn.onclick = function () { KA_CART.add(p); };
    var favBtn = document.getElementById('pm-fav');
    var isFav = favs.indexOf(p.id) !== -1;
    favBtn.classList.toggle('active', isFav);
    favBtn.querySelector('span').textContent = isFav ? 'Retiré des favoris' : 'Ajouter aux favoris';
    favBtn.onclick = function () {
      toggleFav(p.id);
      var nowFav = favs.indexOf(p.id) !== -1;
      favBtn.classList.toggle('active', nowFav);
      favBtn.querySelector('span').textContent = nowFav ? 'Retiré des favoris' : 'Ajouter aux favoris';
    };
    document.getElementById('pm-quote-btn').onclick = function () { window.location.href = 'devis.html'; };

    var reviewsWrap = document.getElementById('pm-reviews');
    reviewsWrap.innerHTML = reviewsFor(p).map(function (rv) {
      return '<div class="pm-review"><div class="head"><span class="avatar">' + rv.initials + '</span><div><div class="name">' + escapeHtml(rv.n) + '</div>' +
        '<span class="prod-stars">★★★★★<b style="width:' + rv.starPct + '%">★★★★★</b></span></div></div><p>' + escapeHtml(rv.t) + '</p></div>';
    }).join('');

    var similar = PRODUCTS.filter(function (x) { return x.category === p.category && x.id !== p.id; }).slice(0, 3);
    var simSection = document.getElementById('pm-similar-section');
    var simWrap = document.getElementById('pm-similar');
    if (similar.length) {
      simSection.style.display = '';
      simWrap.innerHTML = similar.map(function (sp) {
        var img = sp.image ? '<img src="' + sp.image + '" alt="' + escapeHtml(sp.name) + '">' : '';
        return '<button data-id="' + sp.id + '"><span class="thumb">' + img + '</span><span class="cap"><span class="name">' + escapeHtml(sp.name) + '</span><span class="price">' + KA_WA.fmtFCFA(sp.price) + '</span></span></button>';
      }).join('');
      simWrap.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () { openDetail(b.getAttribute('data-id')); });
      });
    } else { simSection.style.display = 'none'; }

    wrap.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDetail() {
    var wrap = document.getElementById('product-modal-wrap');
    if (wrap) wrap.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ---------- accueil ---------- */
  function renderHome() {
    var catGrid = document.getElementById('home-cat-grid');
    if (catGrid) {
      catGrid.innerHTML = CATS.map(function (c) {
        var img = HOME_CAT_IMG[c.id];
        var n = PRODUCTS.filter(function (p) { return p.category === c.id; }).length;
        return (
          '<a class="cat-card" href="catalogue.html?cat=' + c.id + '">' +
          '<span class="cat-bg' + (img ? ' has-img" style="background-image:linear-gradient(to top,rgba(10,9,8,.92) 8%,rgba(10,9,8,.35) 55%,rgba(10,9,8,.15)),url(\'' + img + '\')' : '') + '"></span>' +
          '<span class="icon">' + c.icon + '</span>' +
          '<span class="body"><span class="label ' + (img ? 'on-img' : '') + '">' + c.label + '</span><span class="count ' + (img ? 'on-img' : '') + '">' + n + ' produits</span></span>' +
          '<span class="arrow"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span>' +
          '</a>'
        );
      }).join('');
    }
    var featured = PRODUCTS.filter(function (p) { return BEST_IDS.indexOf(p.id) !== -1; });
    renderGrid(document.getElementById('home-featured-grid'), featured);

    var tWrap = document.getElementById('testi-grid');
    if (tWrap) {
      tWrap.innerHTML = TESTIMONIALS.map(function (t) {
        return '<figure class="testi-card"><span class="prod-stars" style="font-size:16px;letter-spacing:2px">★★★★★<b style="width:100%">★★★★★</b></span>' +
          '<blockquote>“' + escapeHtml(t.t) + '”</blockquote>' +
          '<figcaption class="testi-foot"><span class="testi-avatar">' + t.n[0] + '</span>' +
          '<span><span class="testi-name">' + escapeHtml(t.n) + '</span><span class="testi-loc">' + escapeHtml(t.c) + '</span></span></figcaption></figure>';
      }).join('');
    }
    renderFaq(document.getElementById('faq-list'));
  }

  function renderFaq(wrap) {
    if (!wrap) return;
    wrap.innerHTML = FAQ.map(function (f, i) {
      return '<div class="faq-item" data-i="' + i + '"><button class="faq-q"><span>' + escapeHtml(f.q) + '</span><span class="plus">+</span></button>' +
        '<div class="faq-a"><p>' + escapeHtml(f.a) + '</p></div></div>';
    }).join('');
    wrap.querySelectorAll('.faq-item').forEach(function (item) {
      item.querySelector('.faq-q').addEventListener('click', function () {
        var open = item.classList.contains('open');
        wrap.querySelectorAll('.faq-item').forEach(function (o) { o.classList.remove('open'); });
        if (!open) item.classList.add('open');
      });
    });
  }

  /* ---------- catalogue ---------- */
  function renderCatalogue() {
    var bsTrack = document.getElementById('bs-track');
    if (bsTrack) {
      var featured = PRODUCTS.filter(function (p) { return BEST_IDS.indexOf(p.id) !== -1; });
      bsTrack.innerHTML = featured.map(function (p) {
        var img = p.image ? '<img src="' + p.image + '" alt="' + escapeHtml(p.name) + '" loading="lazy">' : '<span class="noimg">' + escapeHtml(p.name) + '</span>';
        var badge = p.badge || (p.oldPrice ? 'Promo' : '');
        return '<article class="bs-card" data-id="' + p.id + '"><button class="prod-thumb" data-action="open">' + img +
          (badge ? '<span class="prod-badge">' + badge + '</span>' : '') + '</button>' +
          '<div class="bs-cap"><div class="cat">' + catLabel(p.category) + '</div><div class="name">' + escapeHtml(p.name) + '</div>' +
          '<div class="row"><span class="price">' + KA_WA.fmtFCFA(p.price) + '</span><button data-action="add">Ajouter</button></div></div></article>';
      }).join('');
      featured.forEach(function (p) {
        var el = bsTrack.querySelector('[data-id="' + p.id + '"]');
        if (!el) return;
        el.querySelector('[data-action="open"]').addEventListener('click', function () { openDetail(p.id); });
        el.querySelector('[data-action="add"]').addEventListener('click', function () { KA_CART.add(p); });
      });
      var prevBtn = document.getElementById('bs-prev'), nextBtn = document.getElementById('bs-next');
      if (prevBtn) prevBtn.addEventListener('click', function () { bsTrack.scrollBy({ left: -316, behavior: 'smooth' }); });
      if (nextBtn) nextBtn.addEventListener('click', function () { bsTrack.scrollBy({ left: 316, behavior: 'smooth' }); });
    }

    var chipRow = document.getElementById('chip-row');
    var brandSel = document.getElementById('f-brand');
    var priceSel = document.getElementById('f-price');
    var sortSel = document.getElementById('f-sort');
    var stockBtn = document.getElementById('f-stock');
    var searchInput = document.getElementById('f-search');
    var resetBtn = document.getElementById('f-reset');
    var resultCount = document.getElementById('result-count');
    var grid = document.getElementById('catalogue-grid');
    var emptyState = document.getElementById('catalogue-empty');

    var params = new URLSearchParams(window.location.search);
    var filters = { cat: params.get('cat') || 'all', brand: 'all', price: 'all', sort: 'pertinence', stock: false, q: '' };

    var brandList = Array.from(new Set(PRODUCTS.map(brandOf))).sort();
    if (brandSel) {
      brandSel.innerHTML = '<option value="all">Toutes les marques</option>' + brandList.map(function (b) { return '<option value="' + b + '">' + b + '</option>'; }).join('');
    }

    if (chipRow) {
      var chipDefs = [{ id: 'all', label: 'Tout' }].concat(CATS);
      chipRow.innerHTML = chipDefs.map(function (c) {
        return '<button class="chip' + (filters.cat === c.id ? ' active' : '') + '" data-cat="' + c.id + '">' + c.label + '</button>';
      }).join('');
      chipRow.querySelectorAll('.chip').forEach(function (b) {
        b.addEventListener('click', function () {
          filters.cat = b.getAttribute('data-cat');
          chipRow.querySelectorAll('.chip').forEach(function (o) { o.classList.remove('active'); });
          b.classList.add('active');
          apply();
        });
      });
    }

    function apply() {
      var list = PRODUCTS.filter(function (p) {
        if (filters.cat !== 'all' && p.category !== filters.cat) return false;
        if (filters.brand !== 'all' && brandOf(p) !== filters.brand) return false;
        if (filters.stock && !p.stock) return false;
        if (filters.price !== 'all' && priceBucket(p.price) !== filters.price) return false;
        if (filters.q.trim()) {
          var q = filters.q.toLowerCase();
          return (p.name + ' ' + catLabel(p.category) + ' ' + brandOf(p)).toLowerCase().indexOf(q) !== -1;
        }
        return true;
      });
      if (filters.sort === 'price-asc') list = list.slice().sort(function (a, b) { return a.price - b.price; });
      else if (filters.sort === 'price-desc') list = list.slice().sort(function (a, b) { return b.price - a.price; });
      else if (filters.sort === 'rating') list = list.slice().sort(function (a, b) { return ratingOf(b) - ratingOf(a); });

      if (resultCount) resultCount.textContent = list.length + (list.length > 1 ? ' produits' : ' produit');
      if (list.length) {
        if (grid) grid.style.display = '';
        if (emptyState) emptyState.style.display = 'none';
        renderGrid(grid, list);
      } else {
        if (grid) grid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
      }
      if (resetBtn) resetBtn.style.display = (filters.brand !== 'all' || filters.price !== 'all' || filters.stock || filters.sort !== 'pertinence') ? '' : 'none';
    }

    if (brandSel) brandSel.addEventListener('change', function (e) { filters.brand = e.target.value; apply(); });
    if (priceSel) priceSel.addEventListener('change', function (e) { filters.price = e.target.value; apply(); });
    if (sortSel) sortSel.addEventListener('change', function (e) { filters.sort = e.target.value; apply(); });
    if (stockBtn) stockBtn.addEventListener('click', function () { filters.stock = !filters.stock; stockBtn.classList.toggle('active', filters.stock); apply(); });
    if (searchInput) searchInput.addEventListener('input', function (e) { filters.q = e.target.value; apply(); });
    if (resetBtn) resetBtn.addEventListener('click', function () {
      filters.brand = 'all'; filters.price = 'all'; filters.sort = 'pertinence'; filters.stock = false;
      if (brandSel) brandSel.value = 'all'; if (priceSel) priceSel.value = 'all'; if (sortSel) sortSel.value = 'pertinence';
      if (stockBtn) stockBtn.classList.remove('active');
      apply();
    });

    apply();

    // Lien direct vers une fiche produit (ex: catalogue.html?id=p1), pour le partage WhatsApp et l'indexation Google.
    var directId = params.get('id');
    if (directId && PRODUCTS.some(function (p) { return p.id === directId; })) {
      openDetail(directId);
    }
  }

  /* ---------- devis : suivi de commande + formulaire ---------- */
  function renderDevis() {
    var trackForm = document.getElementById('track-form');
    if (trackForm) {
      var input = document.getElementById('track-ref');
      var btn = document.getElementById('track-btn');
      var errBox = document.getElementById('track-error');
      var result = document.getElementById('track-result');
      function doTrack() {
        var ref = (input.value || '').trim().toUpperCase();
        if (!ref) return;
        var o = DEMO_ORDERS[ref];
        if (o) {
          errBox.classList.remove('show');
          result.classList.add('show');
          document.getElementById('track-ref-out').textContent = ref;
          document.getElementById('track-eta-out').textContent = 'Délai estimé : ' + o.eta;
          var stepsWrap = document.getElementById('track-steps');
          stepsWrap.innerHTML = TRACK_STEPS.map(function (st, idx) {
            var active = idx <= o.i, last = idx === TRACK_STEPS.length - 1;
            return '<div class="track-step"><div class="track-dot-col"><span class="track-dot' + (active ? ' active' : '') + '"><i></i></span>' +
              (last ? '' : '<span class="track-line' + (active ? ' active' : '') + '"></span>') + '</div>' +
              '<div class="track-step-body"><div class="track-step-label' + (active ? ' active' : '') + '">' + st.label + '</div>' +
              '<div class="track-step-sub">' + st.sub + '</div></div></div>';
          }).join('');
        } else {
          result.classList.remove('show');
          errBox.classList.add('show');
        }
      }
      btn.addEventListener('click', doTrack);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); doTrack(); } });
    }

    var catSel = document.getElementById('q-cat');
    if (catSel) {
      catSel.innerHTML = '<option value="">Choisir (optionnel)</option>' + CATS.map(function (c) { return '<option value="' + c.id + '">' + c.label + '</option>'; }).join('');
    }
    var form = document.getElementById('quote-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var nom = document.getElementById('q-nom').value.trim();
        var tel = document.getElementById('q-tel').value.trim();
        var cat = document.getElementById('q-cat').value;
        var desc = document.getElementById('q-desc').value.trim();
        var errors = {};
        if (!nom) errors.nom = true;
        if (tel.replace(/\D/g, '').length < 8) errors.tel = true;
        if (desc.length < 5) errors.desc = true;
        ['nom', 'tel', 'desc'].forEach(function (k) {
          document.getElementById('q-' + k).classList.toggle('err', !!errors[k]);
          document.getElementById('err-' + k).classList.toggle('show', !!errors[k]);
        });
        if (Object.keys(errors).length) return;
        var href = KA_WA.buildQuoteMessage(nom, tel, cat ? catLabel(cat) : '', desc);
        document.getElementById('quote-reopen').href = href;
        form.style.display = 'none';
        document.getElementById('quote-success').classList.add('show');
        window.open(href, '_blank', 'noopener');
      });
      var newReqBtn = document.getElementById('quote-new');
      if (newReqBtn) newReqBtn.addEventListener('click', function () {
        form.reset();
        form.style.display = '';
        document.getElementById('quote-success').classList.remove('show');
      });
    }
  }

  /* ---------- hero interactif (halo qui suit la souris, parallax léger) ---------- */
  function initHero() {
    var hero = document.getElementById('hero-interactive');
    if (!hero) return;
    var tech = hero.querySelector('.hero-tech');
    var spot = hero.querySelector('.hero-spot');
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      var px = x / r.width - 0.5, py = y / r.height - 0.5;
      if (spot) { spot.style.opacity = '1'; spot.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)'; }
      if (tech) { tech.style.transform = 'translate(' + (px * -26) + 'px,' + (py * -26) + 'px)'; }
    });
    hero.addEventListener('mouseleave', function () {
      if (spot) spot.style.opacity = '0';
      if (tech) tech.style.transform = 'translate(0,0)';
    });
  }

  /* ---------- légal, menu mobile, WA contact links ---------- */
  function initShared() {
    initHero();
    document.querySelectorAll('[data-wa-contact]').forEach(function (a) { a.href = KA_WA.buildContactMessage(); });
    document.querySelectorAll('[data-wa-question]').forEach(function (a) { a.href = KA_WA.buildQuestionMessage(); });
    document.querySelectorAll('[data-wa-display]').forEach(function (el) { el.textContent = KA_WA.WA_DISPLAY; });

    var menuBtn = document.querySelector('.menu-btn');
    var mobilePanel = document.querySelector('.mobile-panel');
    if (menuBtn && mobilePanel) menuBtn.addEventListener('click', function () { mobilePanel.classList.toggle('open'); });

    var legalWrap = document.getElementById('legal-modal-wrap');
    if (legalWrap) {
      var openers = document.querySelectorAll('[data-open-legal]');
      openers.forEach(function (b) {
        b.addEventListener('click', function () {
          showLegalTab('mentions');
          legalWrap.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
      });
      document.querySelectorAll('[data-open-cgv]').forEach(function (b) {
        b.addEventListener('click', function () {
          showLegalTab('cgv');
          legalWrap.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
      });
      document.querySelectorAll('[data-close-legal]').forEach(function (b) { b.addEventListener('click', closeLegal); });
      var bg = document.getElementById('legal-overlay-bg');
      if (bg) bg.addEventListener('click', closeLegal);
      document.getElementById('legal-tab-mentions').addEventListener('click', function () { showLegalTab('mentions'); });
      document.getElementById('legal-tab-cgv').addEventListener('click', function () { showLegalTab('cgv'); });
    }
    function closeLegal() { legalWrap.classList.remove('open'); document.body.style.overflow = ''; }
    function showLegalTab(tab) {
      document.getElementById('legal-pane-mentions').classList.toggle('active', tab === 'mentions');
      document.getElementById('legal-pane-cgv').classList.toggle('active', tab === 'cgv');
      document.getElementById('legal-tab-mentions').classList.toggle('active', tab === 'mentions');
      document.getElementById('legal-tab-cgv').classList.toggle('active', tab === 'cgv');
    }

    var pmWrap = document.getElementById('product-modal-wrap');
    if (pmWrap) {
      document.querySelectorAll('[data-close-detail]').forEach(function (b) { b.addEventListener('click', closeDetail); });
      var pmBg = document.getElementById('detail-overlay-bg');
      if (pmBg) pmBg.addEventListener('click', closeDetail);
    }

    window.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      closeDetail();
      if (legalWrap) legalWrap.classList.remove('open');
      KA_CART.close();
      document.body.style.overflow = '';
    });
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function boot() {
    loadFavs();
    initShared();
    fetch('data/products.json')
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (data) {
        PRODUCTS = data;
        if (document.body.dataset.page === 'home') renderHome();
        if (document.body.dataset.page === 'catalogue') renderCatalogue();
      })
      .catch(function (err) {
        console.error('Impossible de charger le catalogue KA SHOP :', err);
        var grid = document.getElementById('catalogue-grid') || document.getElementById('home-featured-grid');
        if (grid) grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:40px 0;">Le catalogue est momentanément indisponible. Contactez-nous directement sur WhatsApp.</p>';
      });
    if (document.body.dataset.page === 'devis') renderDevis();
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
