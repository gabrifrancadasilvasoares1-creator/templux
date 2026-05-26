/* ═══════════════════════════════════════════════════════════════
   DEVFOLIO DARK — script.js
   ═══════════════════════════════════════════════════════════════ */

/* ─── CUSTOM CURSOR ──────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');

if (window.matchMedia('(hover: hover)').matches) {
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    trailX += (e.clientX - trailX) * .12;
    trailY += (e.clientY - trailY) * .12;
    trail.style.left = trailX + 'px';
    trail.style.top  = trailY + 'px';
  });

  (function lerpTrail() {
    requestAnimationFrame(lerpTrail);
  })();

  document.querySelectorAll('a, button, .tag-chip, .method-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); trail.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); trail.classList.remove('hover'); });
  });
}

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

/* ─── TYPING EFFECT ──────────────────────────────────────────── */
const roles = ['Full Stack Developer', 'React Specialist', 'API Architect', 'UI Engineer', 'Problem Solver'];
let roleIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const role = roles[roleIdx];
  if (!deleting) {
    typingEl.textContent = role.substring(0, ++charIdx);
    if (charIdx === role.length) { deleting = true; setTimeout(type, 2000); return; }
  } else {
    typingEl.textContent = role.substring(0, --charIdx);
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 50 : 80);
}
type();

/* ─── SKILL BARS ANIMATION ────────────────────────────────────── */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width + '%';
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.skill-bar__fill').forEach(el => barObs.observe(el));

/* ─── TERMINAL CURSOR BLINK ──────────────────────────────────── */
const terminalCursors = document.querySelectorAll('.terminal__cursor');
setInterval(() => {
  terminalCursors.forEach(c => { c.style.opacity = c.style.opacity === '0' ? '1' : '0'; });
}, 600);

/* ─── SMOOTH SCROLL ──────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

/* ─── ACTIVE NAV LINK ────────────────────────────────────────── */
const navLinks = document.querySelectorAll('.navbar__link');
const sections = document.querySelectorAll('section[id]');
const linkObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => linkObs.observe(s));

/* ─── SCROLL PROGRESS ────────────────────────────────────────── */
const bar = document.createElement('div');
bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#00ff87,#a855f7);z-index:9999;width:0;transition:width .1s;pointer-events:none;';
document.body.appendChild(bar);
window.addEventListener('scroll', () => {
  bar.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%';
}, { passive: true });

/* ─── GRID HOVER EFFECT ──────────────────────────────────────── */
const heroGrid = document.querySelector('.hero__grid-bg');
if (heroGrid) {
  document.addEventListener('mousemove', e => {
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;
    heroGrid.style.backgroundPosition = `${x * .5}px ${y * .5}px`;
  }, { passive: true });
}
