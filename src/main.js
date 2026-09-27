/* ── CURSOR ──────────────────────────────────────────── */
const dot  = document.getElementById('c-dot');
const ring = document.getElementById('c-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});
(function trackRing() {
  rx += (mx - rx) * .1;
  ry += (my - ry) * .1;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(trackRing);
})();

document.querySelectorAll('a,button,.svc-card,.port-item,.b-name').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
});

/* ── PROGRESS BAR ────────────────────────────────────── */
const pb = document.getElementById('prog');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  pb.style.width = (scrollY / max * 100) + '%';
}, { passive:true });

/* ── NAV LIGHT / DARK ────────────────────────────────── */
const nav = document.getElementById('nav');
const lightEls = document.querySelectorAll('[data-nav="light"]');

function checkNav() {
  let light = false;
  lightEls.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top <= 80 && r.bottom > 80) light = true;
  });
  nav.classList.toggle('light', light);
}
window.addEventListener('scroll', checkNav, { passive:true });

/* ── HERO ENTRANCE ───────────────────────────────────── */
setTimeout(() => document.body.classList.add('rdy'), 80);

/* ── SVG PATH DRAW ───────────────────────────────────── */
window.addEventListener('load', () => {
  document.querySelectorAll('.dp').forEach((p, i) => {
    let len = 200;
    try { len = p.getTotalLength(); } catch(e) {}
    p.style.strokeDasharray  = len;
    p.style.strokeDashoffset = len;
    const hasFill = p.getAttribute('fill') && p.getAttribute('fill') !== 'none';
    if (hasFill) p.style.fillOpacity = '0';
    setTimeout(() => {
      p.style.transition = `stroke-dashoffset ${.7 + i * .1}s cubic-bezier(.76,0,.24,1)`;
      p.style.strokeDashoffset = '0';
      if (hasFill) {
        setTimeout(() => {
          p.style.transition += ', fill-opacity .3s';
          p.style.fillOpacity = '';
        }, (.7 + i * .1) * 1000);
      }
    }, 300 + i * 100);
  });
});

/* ── INTERSECTION OBSERVER ───────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
  });
}, { threshold: .1 });
document.querySelectorAll('.fu').forEach(el => io.observe(el));

/* ── COUNTER ANIMATION ───────────────────────────────── */
const cio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    const suffix = target > 20 ? '+' : '';
    let v = 0;
    const step = target / 55;
    const t = setInterval(() => {
      v = Math.min(v + step, target);
      el.textContent = Math.floor(v) + (v >= target ? suffix : '');
      if (v >= target) clearInterval(t);
    }, 18);
    cio.unobserve(el);
  });
}, { threshold: .6 });
document.querySelectorAll('[data-target]').forEach(el => cio.observe(el));

/* ── 3D TILT + SHINE on SERVICE CARDS ───────────────── */
document.querySelectorAll('.svc-card').forEach(card => {
  const shine = card.querySelector('.svc-shine');
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    card.style.transform = `perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateZ(10px)`;
    if (shine) {
      shine.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
      shine.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
    }
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform .6s cubic-bezier(.23,1,.32,1), background .4s, box-shadow .4s';
    card.style.transform = '';
    setTimeout(() => card.style.transition = '', 600);
  });
});

/* ── MAGNETIC BUTTON ─────────────────────────────────── */
document.querySelectorAll('.mag').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    btn.style.transform = `translate(${x*.28}px, ${y*.28}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'transform .55s cubic-bezier(.23,1,.32,1)';
    btn.style.transform = '';
    setTimeout(() => btn.style.transition = '', 550);
  });
});

/* ── STAR PICKER ─────────────────────────────────────── */
let selectedRating = 0;
const stars = document.querySelectorAll('.sp');

stars.forEach(s => {
  s.addEventListener('mouseenter', () => {
    const v = +s.dataset.v;
    stars.forEach(ss => {
      ss.classList.toggle('active', +ss.dataset.v <= v);
      ss.classList.remove('lit');
    });
  });
  s.addEventListener('click', () => {
    selectedRating = +s.dataset.v;
    stars.forEach(ss => {
      ss.classList.remove('active');
      ss.classList.toggle('lit', +ss.dataset.v <= selectedRating);
    });
  });
});
document.getElementById('starPick')?.addEventListener('mouseleave', () => {
  stars.forEach(ss => {
    ss.classList.remove('active');
    ss.classList.toggle('lit', +ss.dataset.v <= selectedRating);
  });
});

/* ── REVIEW FORM SUBMIT ───────────────────────────────── */
const revForm  = document.getElementById('revForm');
const revGrid  = document.getElementById('revGrid');
const revCount = document.getElementById('revCount');
const toast    = document.getElementById('rev-toast');
let   count    = 6;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

function makeStars(n) {
  return Array.from({length:5}, (_,i) =>
    `<span class="rev-star${i < n ? '' : ' off'}">★</span>`
  ).join('');
}

function now() {
  const d = new Date();
  const months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
                  'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
  return months[d.getMonth()] + ' ' + d.getFullYear();
}

revForm?.addEventListener('submit', () => {
  const nameEl  = document.getElementById('rv-name');
  const svcEl   = document.getElementById('rv-svc');
  const textEl  = document.getElementById('rv-text');

  // clear errors
  [nameEl, svcEl, textEl].forEach(el => el.classList.remove('err'));

  let valid = true;
  if (!nameEl.value.trim())         { nameEl.classList.add('err');  valid = false; }
  if (!svcEl.value)                 { svcEl.classList.add('err');   valid = false; }
  if (selectedRating === 0)         { valid = false; showToast('Lütfen bir puan seçin.'); }
  if (!textEl.value.trim())         { textEl.classList.add('err');  valid = false; }
  if (!valid)                       { return; }

  const card = document.createElement('div');
  card.className = 'rev-card new-in';
  card.innerHTML = `
    <div class="rev-stars">${makeStars(selectedRating)}</div>
    <p class="rev-quote">${textEl.value.trim().replace(/</g,'&lt;')}</p>
    <div class="rev-meta">
      <div class="rev-name">${nameEl.value.trim().replace(/</g,'&lt;')}</div>
      <div class="rev-detail"><em>${svcEl.value}</em> &nbsp;·&nbsp; ${now()}</div>
    </div>`;

  revGrid.prepend(card);
  count++;
  revCount.textContent = count;

  // reset form
  revForm.reset();
  selectedRating = 0;
  stars.forEach(s => s.classList.remove('lit','active'));

  showToast('Yorumunuz eklendi — teşekkürler!');

  // smooth scroll to new card
  setTimeout(() => card.scrollIntoView({ behavior:'smooth', block:'center' }), 100);
});

/* ── CONTACT FORM → E-MAIL ───────────────────────────── */
const contactForm = document.getElementById('contactForm');
const cfSubmit    = document.getElementById('cf-submit');

contactForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const nameEl  = document.getElementById('cf-name');
  const emailEl = document.getElementById('cf-email');
  const msgEl   = document.getElementById('cf-msg');

  [nameEl, emailEl, msgEl].forEach(el => el.classList.remove('err'));

  let valid = true;
  if (!nameEl.value.trim())                               { nameEl.classList.add('err');  valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) { emailEl.classList.add('err'); valid = false; }
  if (!msgEl.value.trim())                                { msgEl.classList.add('err');   valid = false; }
  if (!valid) { showToast('Lütfen ad, e-posta ve mesaj alanlarını doldurun.'); return; }

  const data = Object.fromEntries(new FormData(contactForm));
  data._subject  = `Yeni iletişim formu — ${data['Ad Soyad']}`;
  data._replyto  = data['E-posta'];
  data._template = 'table';
  data._captcha  = 'false';

  const label = cfSubmit.querySelector('span');
  cfSubmit.disabled = true;
  label.textContent = 'Gönderiliyor…';

  try {
    const res = await fetch('https://formsubmit.co/ajax/f04fa2778a7aac9c324270ea42685c85', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok || out.success === 'false' || out.success === false) throw new Error(out.message);
    contactForm.reset();
    showToast('Mesajınız gönderildi — en kısa sürede dönüş yapacağız.');
  } catch {
    showToast('Mesaj gönderilemedi. Lütfen WhatsApp üzerinden ulaşın.');
  } finally {
    cfSubmit.disabled = false;
    label.textContent = 'Mesaj Gönder';
  }
});

/* ── FAQ ACCORDION ───────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item   = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── LIGHTBOX ────────────────────────────────────────── */
const lb        = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbCounter = document.getElementById('lbCounter');
const lbClose   = document.getElementById('lbClose');
const lbPrev    = document.getElementById('lbPrev');
const lbNext    = document.getElementById('lbNext');
const lbBackdrop= document.getElementById('lbBackdrop');

let lbImages = [];
let lbIndex  = 0;

function buildImageList() {
  // collect all clickable cards (port-item + po-card) in DOM order
  return [...document.querySelectorAll('[data-img]')].map(el => el.dataset.img);
}

function lbOpen(img) {
  lbImages = buildImageList();
  lbIndex  = lbImages.indexOf(img);
  if (lbIndex < 0) lbIndex = 0;
  lbShow();
  lb.classList.add('open');
  lb.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}

function lbClose_fn() {
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden','true');
  // restore scroll only if portOverlay is also closed
  if (!portOverlay || !portOverlay.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

function lbShow() {
  lbImg.style.opacity = '0';
  lbImg.style.transform = 'scale(.96)';
  const src = lbImages[lbIndex];
  const tmp = new Image();
  tmp.onload = () => {
    lbImg.src = src;
    lbImg.style.opacity = '';
    lbImg.style.transform = '';
  };
  tmp.src = src;
  lbCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
  lbPrev.disabled = lbIndex === 0;
  lbNext.disabled = lbIndex === lbImages.length - 1;
}

document.querySelectorAll('[data-img]').forEach(card => {
  card.addEventListener('click', () => lbOpen(card.dataset.img));
});
lbClose.addEventListener('click', lbClose_fn);
lbBackdrop.addEventListener('click', lbClose_fn);
lbPrev.addEventListener('click', () => { if (lbIndex > 0) { lbIndex--; lbShow(); } });
lbNext.addEventListener('click', () => { if (lbIndex < lbImages.length - 1) { lbIndex++; lbShow(); } });

document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape')      lbClose_fn();
  if (e.key === 'ArrowLeft')   { if (lbIndex > 0) { lbIndex--; lbShow(); } }
  if (e.key === 'ArrowRight')  { if (lbIndex < lbImages.length - 1) { lbIndex++; lbShow(); } }
});

/* ── PORTFOLIO OVERLAY ───────────────────────────────── */
const overlay   = document.getElementById('portOverlay');
const portClose = document.getElementById('portClose');
const portAllBtn = document.querySelector('.port-all');

function openOverlay() {
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeOverlay() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

if (portAllBtn) {
  portAllBtn.addEventListener('click', e => { e.preventDefault(); openOverlay(); });
}
if (portClose) {
  portClose.addEventListener('click', closeOverlay);
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) closeOverlay();
});

