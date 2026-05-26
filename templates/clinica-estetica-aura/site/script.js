/* ═══════════════════════════════════════════════════════════════
   AURA CLÍNICA ESTÉTICA — script.js
   ═══════════════════════════════════════════════════════════════ */

/* ─── NAVBAR ─────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ─── HAMBURGER ──────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── SCROLL REVEAL ──────────────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ─── SMOOTH SCROLL ──────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

/* ─── ACTIVE LINK ────────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar__link');
const linkObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => linkObs.observe(s));

/* ─── SCROLL PROGRESS ────────────────────────────────────────── */
const bar = document.createElement('div');
bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#e8758a,#f0899d);z-index:9999;width:0;transition:width .1s;pointer-events:none;';
document.body.appendChild(bar);
window.addEventListener('scroll', () => {
  bar.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%';
}, { passive: true });

/* ─── BEFORE/AFTER HOVER ─────────────────────────────────────── */
document.querySelectorAll('.result-card').forEach(card => {
  const after = card.querySelector('.result-card__img--after');
  card.addEventListener('mouseenter', () => { if (after) after.style.opacity = '1'; });
  card.addEventListener('mouseleave', () => { if (after) after.style.opacity = '1'; });
});
