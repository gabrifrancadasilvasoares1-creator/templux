'use strict';
/**
 * shot_previews.js — captura 7 screenshots reais por template para as páginas de produto.
 * Salva em templux-site/assets/images/products/ como WebP.
 *
 * Uso: node shot_previews.js [nome-do-template | all]
 */

const puppeteer = require('puppeteer-core');
const path      = require('path');
const fs        = require('fs');

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUT  = path.join(__dirname, 'templux-site/assets/images/products');

const TEMPLATES = [
  {
    name: 'clinica-estetica-aura',
    file: 'templates/clinica-estetica-aura/site/index.html',
    sections: {
      hero:       '#inicio',
      sobre:      '#equipe',
      resultados: '#resultados',
      skills:     '#procedimentos',
      depoimentos:'#depoimentos',
      cta:        '#contato',
    },
  },
  {
    name: 'academia-premium',
    file: 'templates/academia-premium/site/index.html',
    sections: {
      hero:       '#inicio',
      sobre:      '#equipe',
      resultados: '#resultados',
      skills:     '#programas',
      depoimentos:'#planos',
      cta:        '#contato',
    },
  },
  {
    name: 'barbearia-imperial',
    file: 'templates/barbearia-imperial/site/index.html',
    sections: {
      hero:       '#inicio',
      sobre:      '#equipe',
      resultados: '#galeria',
      skills:     '#servicos',
      depoimentos:'#depoimentos',
      cta:        '#contato',
    },
  },
  {
    name: 'devfolio-dark',
    file: 'templates/devfolio-dark/site/index.html',
    sections: {
      hero:       '#inicio',
      sobre:      '#sobre',
      resultados: '#experiencia',
      skills:     '#skills',
      depoimentos:'#projetos',
      cta:        '#contato',
    },
  },
  {
    name: 'black-edge-barber',
    file: 'templux-site/demos/black-edge-barber/index.html',
    sections: {
      hero:       '#hero',
      sobre:      '#sobre',
      resultados: '#galeria',
      skills:     '#servicos',
      depoimentos:'#depoimentos',
      cta:        '#cta',
    },
  },
  {
    name: 'clinica-sorria',
    file: 'templux-site/demos/clinica-sorria/index.html',
    sections: {
      hero:       '#inicio',
      sobre:      '#sobre',
      resultados: '#resultados',
      skills:     '#servicos',
      depoimentos:'#depoimentos',
      cta:        '#contato',
    },
  },
];

// ── helpers ──────────────────────────────────────────────────────────────────

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

/** Força todos os elementos com animação a ficarem visíveis e fecha menus. */
async function revealAll(page) {
  await page.evaluate(() => {
    document.querySelectorAll(
      '.reveal, [data-aos], .animate-fade-up, .animate-fade-in, ' +
      '.hero__content, .hero__visual, .section__header, .card, ' +
      '.feature-item, .service-card, .testimonial-card, ' +
      '[class*="animate"], [class*="reveal"], [class*="fade"]'
    ).forEach(el => {
      el.style.opacity    = '1';
      el.style.transform  = 'none';
      el.style.visibility = 'visible';
      el.style.transition = 'none';
      el.style.animation  = 'none';
      el.classList.add('visible', 'aos-animate', 'animated', 'active', 'shown');
    });
    const menu = document.querySelector('.nav-mobile, #mobileMenu, .mobile-menu');
    if (menu) { menu.style.display = 'none'; menu.classList.remove('active', 'open'); }
    document.querySelectorAll('.overlay, .modal').forEach(el => { el.style.display = 'none'; });
  });
}

/**
 * Pre-scroll completo (topo → fim → topo) para forçar carregamento de todas
 * as imagens lazy antes de tirar os screenshots.
 */
async function preloadAllImages(page) {
  await page.evaluate(async () => {
    const totalHeight = document.body.scrollHeight;
    const step = 400;
    for (let y = 0; y < totalHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 60));
    }
    window.scrollTo(0, totalHeight);
    await new Promise(r => setTimeout(r, 500));
    window.scrollTo(0, 0);
  });

  // Aguarda todas as imagens terminarem de carregar
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    imgs.forEach(img => { img.loading = 'eager'; });
    await Promise.all(
      imgs
        .filter(img => !img.complete)
        .map(img => new Promise(resolve => {
          img.onload  = resolve;
          img.onerror = resolve;
          setTimeout(resolve, 5000);
        }))
    );
  });

  await wait(700);
}

/** Scrola até uma seção e revela animações. */
async function scrollTo(page, selector) {
  const found = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
    return true;
  }, selector);

  if (!found) console.log(`    ⚠  Seção não encontrada: ${selector}`);
  await wait(500);
  await revealAll(page);
  await wait(400);
  return found;
}

/** Captura screenshot e imprime tamanho. */
async function capture(page, outFile) {
  await page.screenshot({ path: outFile, type: 'webp', quality: 88, fullPage: false });
  const kb = Math.round(fs.statSync(outFile).size / 1024);
  console.log(`    ✓ ${path.basename(outFile)} (${kb}KB)`);
}

// ── process one template ─────────────────────────────────────────────────────

async function processTemplate(browser, tmpl) {
  const absFile = 'file:///' + path.resolve(__dirname, tmpl.file).replace(/\\/g, '/');
  console.log(`\n→ ${tmpl.name}`);

  // ── DESKTOP ──
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  page.on('requestfailed', () => {});

  await page.goto(absFile, { waitUntil: 'networkidle2', timeout: 45000 });
  await revealAll(page);
  await wait(1000);

  // Pre-scroll para carregar todas as imagens lazy
  console.log(`    → pré-carregando imagens...`);
  await preloadAllImages(page);
  await revealAll(page);
  await wait(800);

  // 1. Hero desktop
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(500);
  await revealAll(page);
  await wait(400);
  await capture(page, path.join(OUT, `${tmpl.name}-preview-hero-desktop.webp`));

  // 2–6. Demais seções
  const sections = [
    ['sobre',       tmpl.sections.sobre],
    ['resultados',  tmpl.sections.resultados],
    ['skills',      tmpl.sections.skills],
    ['depoimentos', tmpl.sections.depoimentos],
    ['cta',         tmpl.sections.cta],
  ];

  for (const [key, sel] of sections) {
    const found = await scrollTo(page, sel);
    if (found) {
      await capture(page, path.join(OUT, `${tmpl.name}-preview-${key}.webp`));
    }
  }

  await page.close();

  // ── MOBILE hero ──
  const mob = await browser.newPage();
  await mob.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  mob.on('requestfailed', () => {});

  await mob.goto(absFile, { waitUntil: 'networkidle2', timeout: 45000 });
  await revealAll(mob);
  await wait(800);
  await preloadAllImages(mob);
  await revealAll(mob);

  // Mantém a nav mobile visível (mostra hambúrguer → fica claro que é mobile)
  // mas remove o padding-top excessivo do hero para aproveitar o clip ao máximo.
  await mob.evaluate(() => {
    // Fecha menu mobile se aberto, mas mantém a navbar
    const mobileMenu = document.querySelector('.nav-mobile, #mobileMenu, .mobile-menu');
    if (mobileMenu) { mobileMenu.style.display = 'none'; mobileMenu.classList.remove('active', 'open'); }

    // Reseta o padding-top do hero (que compensava a nav fixa) para ~8px acima da nav
    const heroSection = document.querySelector(
      'section:first-of-type, #inicio, #hero, .hero-section, [class*="hero"]'
    );
    if (heroSection) {
      heroSection.style.paddingTop = '8px';
      heroSection.style.marginTop  = '0';
    }

    window.scrollTo(0, 0);
  });
  await wait(400);
  await revealAll(mob);
  await wait(300);

  // Clip 16:9 (390×219 CSS px → 780×438 px reais) — encaixa no thumbnail sem corte
  await mob.screenshot({
    path: path.join(OUT, `${tmpl.name}-preview-hero-mobile.webp`),
    type: 'webp', quality: 88,
    clip: { x: 0, y: 0, width: 390, height: 219 },
  });
  const mobKb = Math.round(
    fs.statSync(path.join(OUT, `${tmpl.name}-preview-hero-mobile.webp`)).size / 1024
  );
  console.log(`    ✓ ${tmpl.name}-preview-hero-mobile.webp (${mobKb}KB)`);
  await mob.close();
}

// ── main ─────────────────────────────────────────────────────────────────────

(async () => {
  const arg = process.argv[2] || 'all';
  const targets = arg === 'all'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.name === arg);

  if (!targets.length) {
    console.error(`Template não encontrado: ${arg}`);
    console.log('Disponíveis:', TEMPLATES.map(t => t.name).join(', '));
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
  });

  for (const t of targets) {
    await processTemplate(browser, t);
  }

  await browser.close();
  console.log('\n✅ Pronto!\n');
})().catch(e => { console.error('\n❌ Erro:', e.message); process.exit(1); });
