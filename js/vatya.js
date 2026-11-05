/* VATYA shop - shared behaviour: header, hero slider, product cards, list / detail rendering */
(function () {
  var P = window.VATYA_PRODUCTS || [], C = window.VATYA_CATS || [];
  var qs = new URLSearchParams(location.search);
  function won(n) { return n.toLocaleString('ko-KR') + '원'; }
  function byId(id) { for (var i = 0; i < P.length; i++) if (P[i].id === id) return P[i]; return null; }
  function catName(id) { for (var i = 0; i < C.length; i++) if (C[i].id === id) return C[i].name; return '전체'; }
  function priceHtml(p) {
    if (p.sale) return '<i>' + p.sale + '%</i>' + won(Math.round(p.price * (100 - p.sale) / 100)) + '<del>' + won(p.price) + '</del>';
    return won(p.price);
  }
  var heart = '<svg class="ico" viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>';
  function card(p) {
    var tag = p.tag ? '<span class="tag' + (p.tag === 'NEW' ? ' new' : '') + '">' + p.tag + '</span>' : '';
    return '<li class="prd"><a href="detail.html?p=' + p.id + '"><div class="img">' + tag +
      '<button type="button" class="wish" aria-label="찜">' + heart + '</button>' +
      '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy"></div>' +
      '<strong>' + p.name + '</strong><div class="sum">' + p.sum + '</div>' +
      '<div class="price">' + priceHtml(p) + '</div></a></li>';
  }
  function render(sel, list) {
    var el = document.querySelector(sel); if (!el) return;
    el.innerHTML = list.map(card).join('');
  }
  window.VATYA = { won: won, byId: byId, catName: catName, card: card, render: render, priceHtml: priceHtml, qs: qs };

  document.addEventListener('DOMContentLoaded', function () {
    /* header: drawer / search */
    var drawer = document.querySelector('.drawer');
    document.querySelectorAll('[data-open-drawer]').forEach(function (b) { b.addEventListener('click', function () { drawer && drawer.classList.add('on'); }); });
    document.querySelectorAll('[data-close-drawer]').forEach(function (b) { b.addEventListener('click', function () { drawer && drawer.classList.remove('on'); }); });
    var sl = document.querySelector('.search-layer');
    document.querySelectorAll('[data-toggle-search]').forEach(function (b) { b.addEventListener('click', function () { sl && sl.classList.toggle('on'); }); });
    /* mega menu products (best 3) */
    var mp = document.querySelector('.mega-prds');
    if (mp) mp.innerHTML = P.filter(function (p) { return p.tag === 'BEST'; }).slice(0, 3).map(function (p) {
      return '<li><a href="detail.html?p=' + p.id + '"><div class="img"><img src="' + p.img + '" alt=""></div><strong>' + p.name + '</strong><span>' + won(p.sale ? Math.round(p.price * (100 - p.sale) / 100) : p.price) + '</span></a></li>';
    }).join('');
    /* wish toggle (visual only) */
    document.addEventListener('click', function (e) {
      var w = e.target.closest('.wish'); if (!w) return;
      e.preventDefault(); w.classList.toggle('on');
    });
    /* hero slider */
    var hero = document.querySelector('.hero');
    if (hero) {
      var slides = hero.querySelectorAll('.slide'), dots = hero.querySelectorAll('.dots i'), i = 0, timer;
      function go(n) {
        i = (n + slides.length) % slides.length;
        slides.forEach(function (s, k) { s.classList.toggle('on', k === i); });
        dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
      }
      function auto() { clearInterval(timer); if (!/[?&]shot=1/.test(location.search)) timer = setInterval(function () { go(i + 1); }, 5000); }
      hero.querySelector('.prev') && hero.querySelector('.prev').addEventListener('click', function () { go(i - 1); auto(); });
      hero.querySelector('.next') && hero.querySelector('.next').addEventListener('click', function () { go(i + 1); auto(); });
      dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); auto(); }); });
      var sx = 0;
      hero.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
      hero.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) { go(dx < 0 ? i + 1 : i - 1); auto(); } });
      go(0); auto();
    }
    /* video section: autoplay muted when a source exists, play button fallback, sound toggle */
    var vs = document.querySelector('.video');
    if (vs) {
      var v = vs.querySelector('video'), pb = vs.querySelector('.play'), sb = vs.querySelector('.sound');
      function tryPlay() { var pr = v.play(); if (pr && pr.then) pr.then(function () { vs.classList.add('playing'); }).catch(function () { vs.classList.remove('playing'); }); }
      v.addEventListener('playing', function () { vs.classList.add('playing'); });
      v.addEventListener('pause', function () { vs.classList.remove('playing'); });
      v.addEventListener('error', function () { vs.classList.remove('playing'); }, true);
      pb.addEventListener('click', function () { tryPlay(); });
      v.addEventListener('click', function () { if (!v.paused) v.pause(); else tryPlay(); });
      sb.addEventListener('click', function () { v.muted = !v.muted; sb.textContent = v.muted ? 'SOUND ON' : 'SOUND OFF'; });
      if (!/[?&]shot=1/.test(location.search) && v.querySelector('source') && v.querySelector('source').getAttribute('src')) tryPlay();
    }
    /* category chips: mark current */
    var cur = qs.get('cate') || (location.pathname.indexOf('list.html') > -1 ? 'all' : null);
    document.querySelectorAll('.cats a, .gnb a[data-cate]').forEach(function (a) {
      var id = a.getAttribute('data-cate');
      if (cur !== null && id === cur) a.classList.add('on');
    });
    /* header: transparent on home until scrolled */
    var hd = document.querySelector('.header');
    if (hd && document.body.classList.contains('home')) {
      function sc() { hd.classList.toggle('scrolled', window.scrollY > 40); }
      window.addEventListener('scroll', sc, { passive: true }); sc();
      if (/[?&]scrolled=1/.test(location.search)) hd.classList.add('scrolled');
    }
    /* index: best sellers full-bleed (ids from data-ids) */
    var bf = document.querySelector('[data-list="best-full"]');
    if (bf) {
      var ids = (bf.getAttribute('data-ids') || '').split(',');
      bf.innerHTML = ids.map(function (id) {
        var p = byId(id.trim()); if (!p) return '';
        var price = won(p.sale ? Math.round(p.price * (100 - p.sale) / 100) : p.price);
        return '<li class="prd"><a href="detail.html?p=' + p.id + '"><div class="img"><img src="' + p.img + '" alt="' + p.name + '"></div><div class="cap"><strong>' + p.name + '</strong><span class="price">' + price + '</span></div></a></li>';
      }).join('');
      /* slider: step one item, 4 visible on pc / 2 on mobile, swipe + arrows + 4s auto */
      var bsec = bf.closest('.best-full'), bi = 0, btm;
      function bper() { return window.innerWidth < 900 ? 2 : 4; }
      function bmax() { return Math.max(0, bf.children.length - bper()); }
      function bgo(n) { bi = Math.max(0, Math.min(bmax(), n)); var li = bf.children[0]; if (!li) return; var step = li.getBoundingClientRect().width + 2; bf.style.transform = 'translateX(' + (-bi * step) + 'px)'; }
      function bauto() { clearInterval(btm); if (!/[?&]shot=1/.test(location.search)) btm = setInterval(function () { bgo(bi >= bmax() ? 0 : bi + 1); }, 4000); }
      bsec.querySelector('.bprev') && bsec.querySelector('.bprev').addEventListener('click', function () { bgo(bi - 1); bauto(); });
      bsec.querySelector('.bnext') && bsec.querySelector('.bnext').addEventListener('click', function () { bgo(bi + 1); bauto(); });
      var bx = 0;
      bf.addEventListener('touchstart', function (e) { bx = e.touches[0].clientX; }, { passive: true });
      bf.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - bx; if (Math.abs(dx) > 40) { bgo(dx < 0 ? bi + 1 : bi - 1); bauto(); } });
      window.addEventListener('resize', function () { bgo(bi); });
      bgo(0); bauto();
    }
    /* index: designers, one per slide, auto roll 6s */
    var dsec = document.querySelector('.designers');
    if (dsec) {
      var ds = dsec.querySelectorAll('.slide'), di = 0, dtm, cnt = dsec.querySelector('.cnt');
      function dgo(n) { di = (n + ds.length) % ds.length; ds.forEach(function (s, k) { s.classList.toggle('on', k === di); }); if (cnt) cnt.textContent = ('0' + (di + 1)).slice(-2) + ' / ' + ('0' + ds.length).slice(-2); }
      function dauto() { clearInterval(dtm); if (!/[?&]shot=1/.test(location.search)) dtm = setInterval(function () { dgo(di + 1); }, 6000); }
      dsec.querySelector('.dprev') && dsec.querySelector('.dprev').addEventListener('click', function () { dgo(di - 1); dauto(); });
      dsec.querySelector('.dnext') && dsec.querySelector('.dnext').addEventListener('click', function () { dgo(di + 1); dauto(); });
      dgo(0); dauto();
    }
    /* list */
    var lg = document.querySelector('[data-list="cate"]');
    if (lg) {
      var cid = qs.get('cate') || 'all', q = (qs.get('q') || '').trim();
      var list = cid === 'all' ? P : P.filter(function (p) { return p.cats.indexOf(cid) > -1; });
      if (q) { list = list.filter(function (p) { return (p.name + ' ' + p.sum).toLowerCase().indexOf(q.toLowerCase()) > -1; }); var ph = document.querySelector('.page-head p'); if (ph) ph.textContent = '"' + q + '" 검색 결과'; }
      var sort = qs.get('sort') || 'new';
      if (sort === 'low') list = list.slice().sort(function (a, b) { return a.price - b.price; });
      if (sort === 'high') list = list.slice().sort(function (a, b) { return b.price - a.price; });
      if (sort === 'review') list = list.slice().sort(function (a, b) { return b.rv - a.rv; });
      document.querySelectorAll('[data-cate-name]').forEach(function (el) { el.textContent = catName(cid); });
      var cnt = document.querySelector('[data-count]'); if (cnt) cnt.textContent = list.length;
      document.querySelectorAll('.list-bar .sort a').forEach(function (a) {
        a.href = 'list.html?cate=' + cid + '&sort=' + a.getAttribute('data-sort');
        a.classList.toggle('on', a.getAttribute('data-sort') === sort);
      });
      document.title = catName(cid) + ' | VATYA';
      render('[data-list="cate"]', list);
    }
    /* detail */
    var dt = document.querySelector('.detail-top');
    if (dt) {
      var p = byId(qs.get('p')) || P[0];
      document.title = p.name + ' | VATYA';
      var imgs = [p.img].concat(p.hero ? [p.hero] : []);
      var main = dt.querySelector('.gallery .main img'); main.src = imgs[0]; main.alt = p.name;
      dt.querySelector('.gallery .thumbs').innerHTML = imgs.map(function (s, k) { return '<button type="button" class="' + (k ? '' : 'on') + '" data-src="' + s + '"><img src="' + s + '" alt=""></button>'; }).join('');
      dt.querySelectorAll('.thumbs button').forEach(function (b) { b.addEventListener('click', function () { main.src = b.getAttribute('data-src'); dt.querySelectorAll('.thumbs button').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); }); });
      dt.querySelector('.info .tags').innerHTML = p.tag ? '<span class="' + (p.tag === 'NEW' ? 'new' : '') + '">' + p.tag + '</span>' : '';
      dt.querySelector('.info h1').textContent = p.name;
      dt.querySelector('.info .sum').textContent = p.sum;
      dt.querySelector('.info .price').innerHTML = priceHtml(p);
      dt.querySelector('.spec').innerHTML = Object.keys(p.spec || {}).map(function (k) { return '<div><dt>' + k + '</dt><dd>' + p.spec[k] + '</dd></div>'; }).join('') + '<div><dt>배송비</dt><dd>3,000원 (5만원 이상 무료)</dd></div>';
      var unit = p.sale ? Math.round(p.price * (100 - p.sale) / 100) : p.price, q = 1;
      var qn = dt.querySelector('.qty .ctl span'), qt = dt.querySelector('.qty b'), tt = dt.querySelector('.total b');
      function upd() { qn.textContent = q; qt.textContent = won(unit * q); tt.textContent = won(unit * q); }
      dt.querySelector('.qty .minus').addEventListener('click', function () { if (q > 1) { q--; upd(); } });
      dt.querySelector('.qty .plus').addEventListener('click', function () { q++; upd(); });
      dt.querySelector('.qty .name').textContent = p.name;
      upd();
      document.querySelectorAll('[data-prd-name]').forEach(function (el) { el.textContent = p.name; });
      var dc = document.querySelector('.detail-content .photos');
      if (dc) dc.innerHTML = imgs.slice().reverse().map(function (s) { return '<img src="' + s + '" alt="">'; }).join('');
      var ct = document.querySelector('.detail-content .crumb-cate'); if (ct) { ct.textContent = catName(p.cats[0]); ct.href = 'list.html?cate=' + p.cats[0]; }
      render('[data-list="related"]', P.filter(function (x) { return x.id !== p.id && x.cats.indexOf(p.cats[0]) > -1; }).slice(0, 4));
    }
  });
})();
