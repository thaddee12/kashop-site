/* ==========================================================================
   KA SHOP · génération des liens WhatsApp
   ========================================================================== */
(function () {
  'use strict';

  var WA_NUMBER = '237692689980';
  var WA_DISPLAY = '+237 692 689 980';

  function waLink(text) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  }

  function fmtFCFA(n) {
    return n.toLocaleString('fr-FR').replace(/ /g, ' ') + ' FCFA';
  }

  /* Message de commande panier : liste des articles + livraison + adresse */
  function buildCartMessage(cart, subtotal, delivInfo, delivKm, delivAddr) {
    var free = subtotal >= 50000;
    var t = "Bonjour KA SHOP, je souhaite commander :\n\n";
    cart.forEach(function (i) {
      t += '• ' + i.quantity + ' × ' + i.name + ' : ' + fmtFCFA(i.price) + '\n';
    });
    t += '\nSous-total : ' + fmtFCFA(subtotal) + '\n';
    if (free) {
      t += 'Livraison : offerte (commande ≥ 50 000 FCFA)\n';
      t += 'Total : ' + fmtFCFA(subtotal) + '\n';
    } else if (!delivInfo) {
      t += "Livraison : à définir selon l'adresse\n";
    } else if (delivInfo.fee == null) {
      t += 'Livraison : sur devis (' + delivInfo.zone + ', ≈ ' + kmFmt(delivKm) + ')\n';
    } else {
      t += 'Livraison : ' + delivInfo.label + ' (' + delivInfo.zone + ', ≈ ' + kmFmt(delivKm) + ')\n';
      t += 'Total : ' + fmtFCFA(subtotal + delivInfo.fee) + '\n';
    }
    if (delivAddr && delivAddr.trim()) t += 'Adresse : ' + delivAddr.trim() + '\n';
    t += '\nMerci de me confirmer la disponibilité et le délai.';
    return waLink(t);
  }

  function kmFmt(km) {
    return (Math.round(km * 10) / 10).toString().replace('.', ',') + ' km';
  }

  /* Message de devis / commande spéciale */
  function buildQuoteMessage(nom, tel, catLabel, desc) {
    var t = 'Bonjour KA SHOP, je souhaite passer une commande.\n\n';
    t += 'Nom : ' + nom + '\n';
    t += 'Téléphone : ' + tel + '\n';
    if (catLabel) t += 'Catégorie : ' + catLabel + '\n';
    t += '\nBesoin :\n' + desc + '\n\nMerci de me répondre sous 24h.';
    return waLink(t);
  }

  function buildContactMessage() {
    return waLink('Bonjour KA SHOP, je souhaite vous contacter.');
  }

  function buildQuestionMessage() {
    return waLink("Bonjour KA SHOP, j'ai une question.");
  }

  window.KA_WA = {
    WA_NUMBER: WA_NUMBER,
    WA_DISPLAY: WA_DISPLAY,
    waLink: waLink,
    fmtFCFA: fmtFCFA,
    kmFmt: kmFmt,
    buildCartMessage: buildCartMessage,
    buildQuoteMessage: buildQuoteMessage,
    buildContactMessage: buildContactMessage,
    buildQuestionMessage: buildQuestionMessage
  };
})();
