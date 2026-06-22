/* consent.js — banner de cookies (LGPD) + carregamento dos rastreadores.
 *
 * GA4 e Meta Pixel são carregados AQUI (não mais fixos no HTML), para que o
 * "Recusar" realmente os desabilite.
 *
 * GATE = false → interesse legítimo: carrega por padrão; "Recusar" bloqueia
 *                nas próximas visitas (padrão no Brasil, preserva dados de ads).
 * GATE = true  → opt-in estrito: só carrega após "Aceitar".
 */
(function () {
  var KEY = 'elloverde_consent';
  var GA4 = 'G-GJQD6MMGW7';
  var PIXEL = '1222074994976228';
  var GATE = false;

  function loadTrackers() {
    if (window.__ellTrackers) return;
    window.__ellTrackers = true;

    // Google Analytics 4
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4;
    document.head.appendChild(g);
    window.gtag('js', new Date());
    window.gtag('config', GA4);

    // Meta Pixel
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL);
    window.fbq('track', 'PageView');
  }

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var choice = read();
  if (choice === 'granted') { loadTrackers(); return; }
  if (choice === 'denied') { return; }

  if (!GATE) loadTrackers();              // interesse legítimo: já carrega
  showBanner();

  function showBanner() {
    function build() {
      if (document.getElementById('ell-cookie')) return;
      var bar = document.createElement('div');
      bar.id = 'ell-cookie';
      bar.setAttribute('role', 'dialog');
      bar.setAttribute('aria-label', 'Aviso de cookies');
      bar.innerHTML =
        '<div class="ell-cookie-in">' +
        '<p>Usamos cookies para análise e marketing, ajudando a melhorar sua experiência. ' +
        'Veja nossa <a href="/politica-privacidade-elloverde.html">Política de Privacidade</a>.</p>' +
        '<div class="ell-cookie-btns">' +
        '<button id="ell-cookie-no" type="button">Recusar</button>' +
        '<button id="ell-cookie-yes" type="button">Aceitar</button>' +
        '</div></div>';
      document.body.appendChild(bar);

      var css = document.createElement('style');
      css.textContent =
        '#ell-cookie{position:fixed;left:0;right:0;bottom:0;z-index:9998;background:#2C3828;color:#E8E0D0;' +
        'font-family:"DM Sans",system-ui,sans-serif;box-shadow:0 -4px 24px rgba(0,0,0,.25);' +
        'transform:translateY(100%);animation:ellCookieUp .5s .3s cubic-bezier(.22,1,.36,1) forwards}' +
        '@keyframes ellCookieUp{to{transform:translateY(0)}}' +
        '.ell-cookie-in{max-width:1100px;margin:0 auto;padding:16px 24px;display:flex;gap:18px;' +
        'align-items:center;justify-content:space-between;flex-wrap:wrap}' +
        '#ell-cookie p{font-size:13px;line-height:1.6;font-weight:300;margin:0;flex:1;min-width:240px}' +
        '#ell-cookie a{color:#A8C5A0;text-decoration:underline}' +
        '.ell-cookie-btns{display:flex;gap:10px;flex-shrink:0}' +
        '#ell-cookie button{font-family:inherit;font-size:11px;letter-spacing:.12em;text-transform:uppercase;' +
        'padding:11px 22px;border-radius:6px;cursor:pointer;border:1px solid transparent;transition:opacity .2s}' +
        '#ell-cookie button:hover{opacity:.85}' +
        '#ell-cookie-yes{background:#2C5F2E;color:#F4EFE5}' +
        '#ell-cookie-no{background:transparent;color:#C9C2B4;border-color:rgba(255,255,255,.25)}';
      document.head.appendChild(css);

      document.getElementById('ell-cookie-yes').onclick = function () { save('granted'); loadTrackers(); bar.remove(); };
      document.getElementById('ell-cookie-no').onclick = function () { save('denied'); bar.remove(); };
    }
    if (document.body) build(); else document.addEventListener('DOMContentLoaded', build);
  }
})();
