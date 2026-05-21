/* ============================================================
   TEMPLUX — script.js
   Funcionalidades: Nav scroll, mobile menu, reveal animations,
   toast notifications, galeria, FAQ
   ============================================================ */

/* ---- NAV SCROLL ---- */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init
})();

/* ---- MOBILE MENU ---- */
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  let open = false;

  hamburger.addEventListener('click', () => {
    open = !open;
    mobileMenu.classList.toggle('open', open);
    // Animate hamburger bars
    const spans = hamburger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      open = false;
      mobileMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
})();

/* ---- INTERSECTION OBSERVER — REVEAL ---- */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger by index in a group
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (entry.target.dataset.delay || 0));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  // Stagger siblings in same parent
  const parents = new Map();
  els.forEach(el => {
    const parent = el.parentElement;
    if (!parents.has(parent)) parents.set(parent, []);
    parents.get(parent).push(el);
  });
  parents.forEach(group => {
    group.forEach((el, i) => {
      el.dataset.delay = i * 80;
    });
  });

  els.forEach(el => observer.observe(el));
})();

/* ---- TOAST NOTIFICATION ---- */
let toastTimeout;

function showToast(message, duration = 3000) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

/* ---- SMOOTH ANCHOR SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- ACTIVE NAV LINK ---- */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();

/* ---- COPY LINK UTIL ---- */
function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast('✓ Link copiado para a área de transferência!');
  }).catch(() => {
    showToast('Não foi possível copiar o link.');
  });
}

/* ---- PRODUCT GALLERY ---- */
function setPreview(src, alt) {
  const img = document.getElementById('mainImg');
  if (!img) return;
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.2s ease';
  setTimeout(() => {
    img.src = src;
    img.alt = alt || '';
    img.style.opacity = '1';
  }, 200);
}

/* ---- FAQ TOGGLE ---- */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  if (!item) return;
  // Close others
  document.querySelectorAll('.faq-item.open').forEach(open => {
    if (open !== item) open.classList.remove('open');
  });
  item.classList.toggle('open');
}

/* ---- PRODUCT CARD HOVER GLOW ---- */
(function () {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
})();
