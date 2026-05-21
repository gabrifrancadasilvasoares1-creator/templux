/* =============================================
   BLACK EDGE BARBER — script.js
   Versão 1.0
   ============================================= */

'use strict';

/* =============================================
   1. NAVBAR — scroll + hambúrguer
   ============================================= */
(function initNavbar() {
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  // Adiciona classe "scrolled" ao rolar
  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // estado inicial

  // Abre/fecha menu mobile
  function toggleMenu(forceClose = false) {
    const isOpen = hamburger.classList.contains('open');
    const shouldOpen = forceClose ? false : !isOpen;

    hamburger.classList.toggle('open', shouldOpen);
    mobileMenu.classList.toggle('open', shouldOpen);
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-label', shouldOpen ? 'Fechar menu' : 'Abrir menu');
  }

  hamburger.addEventListener('click', () => toggleMenu());

  // Fecha ao clicar em um link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  // Fecha ao pressionar ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(true);
  });
})();

/* =============================================
   2. REVEAL ON SCROLL — animação de entrada
   ============================================= */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  if (!revealEls.length) return;

  // Usa IntersectionObserver para performance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Pequeno delay escalonado para grupo de elementos
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
          const index = siblings.indexOf(entry.target);
          const delay = Math.min(index * 80, 400); // máx 400ms de delay

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
})();

/* =============================================
   3. SCROLL SUAVE para links âncora
   ============================================= */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      const navbarH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 72;

      window.scrollTo({
        top: target.offsetTop - navbarH,
        behavior: 'smooth'
      });
    });
  });
})();

/* =============================================
   4. ACTIVE LINK na navbar conforme seção visível
   ============================================= */
(function initActiveLinks() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.navbar__link:not(.navbar__link--cta)');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(section => observer.observe(section));
})();

/* =============================================
   5. PARALLAX LEVE no hero
   ============================================= */
(function initParallax() {
  const heroBg = document.querySelector('.hero__bg-grid');
  if (!heroBg) return;

  // Desabilita em dispositivos mobile (performance)
  if (window.matchMedia('(max-width: 768px)').matches) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.3}px)`;
  }, { passive: true });
})();

/* =============================================
   6. CONTADOR animado nos stats do hero
   ============================================= */
(function initCounters() {
  const stats = document.querySelectorAll('.hero__stat strong');
  if (!stats.length) return;

  function animateValue(el, start, end, duration, suffix) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing out
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(start + (end - start) * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent;

      // Extrai número e sufixo
      const match = text.match(/[\+]?([\d.]+)(.*)/);
      if (!match) return;

      const endVal = parseFloat(match[1]);
      const suffix = match[2] || '';
      const prefix = text.startsWith('+') ? '+' : '';

      if (!isNaN(endVal)) {
        animateValue(el, 0, endVal, 1200, suffix);
      }

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
})();

/* =============================================
   7. GALERIA — lightbox simples
   ============================================= */
(function initGalleryLightbox() {
  const items = document.querySelectorAll('.galeria__item');
  if (!items.length) return;

  // Cria o lightbox
  const lightbox = document.createElement('div');
  lightbox.innerHTML = `
    <div id="lightbox" style="
      display:none; position:fixed; inset:0; z-index:200;
      background:rgba(0,0,0,0.92); align-items:center; justify-content:center;
      cursor:zoom-out; backdrop-filter:blur(8px);
    ">
      <img id="lightbox-img" style="max-width:90vw; max-height:90vh; border-radius:12px; object-fit:contain;" />
      <button id="lightbox-close" style="
        position:absolute; top:24px; right:24px; background:rgba(255,255,255,0.1);
        border:1.5px solid rgba(255,255,255,0.2); color:#fff; width:44px; height:44px;
        border-radius:50%; font-size:1.3rem; cursor:pointer; display:flex;
        align-items:center; justify-content:center; transition:0.2s;
      ">✕</button>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lb       = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const lbClose  = document.getElementById('lightbox-close');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt;
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.style.display = 'none';
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) openLightbox(img.src, img.alt);
    });
  });

  lb.addEventListener('click', closeLightbox);
  lbClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
})();

/* =============================================
   8. BOTÃO WHATSAPP — esconde temporariamente no scroll
   ============================================= */
(function initWhatsappFloat() {
  const btn = document.querySelector('.whatsapp-float');
  if (!btn) return;

  let lastScroll = 0;
  let timeout;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    clearTimeout(timeout);

    if (currentScroll > lastScroll + 80) {
      btn.style.transform = 'scale(0.8) translateY(10px)';
      btn.style.opacity = '0.6';
    } else {
      btn.style.transform = '';
      btn.style.opacity = '';
    }

    timeout = setTimeout(() => {
      btn.style.transform = '';
      btn.style.opacity = '';
    }, 800);

    lastScroll = currentScroll;
  }, { passive: true });
})();

/* =============================================
   9. ACTIVE LINK CSS inject
   ============================================= */
const activeStyle = document.createElement('style');
activeStyle.textContent = `.navbar__link.active { color: var(--color-gold) !important; }`;
document.head.appendChild(activeStyle);
