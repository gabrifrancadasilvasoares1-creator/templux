'use strict';
/**
 * record_showcase.js — vídeo showcase premium para TikTok / Reels / Instagram
 *
 * Gera por template:
 *   showcase-desktop.mp4  — cenas desktop  (pillarbox 1080×1920)
 *   showcase-mobile.mp4   — cenas mobile   (1080×1920 nativo)
 *   showcase-thumb.jpg    — thumbnail do vídeo desktop
 *
 * Uso:
 *   node record_showcase.js                   → todos os templates
 *   node record_showcase.js black-edge-barber → só um
 *
 * Requisito: ffmpeg no PATH (já instalado)
 */

const puppeteer = require('puppeteer-core');
const { spawnSync, execFileSync } = require('child_process');
const path = require('path');
const fs   = require('fs');

// ─── Constantes ───────────────────────────────────────────────────────────────
const EDGE    = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const TMP     = path.join(__dirname, '_showcase_tmp');
const VIDEOS  = path.join(__dirname, 'templux-site/assets/videos');
const FPS     = 30;
const F_MS    = Math.round(1000 / FPS); // ~33ms por frame

// ─── Templates ────────────────────────────────────────────────────────────────
const TEMPLATES = [
  {
    name: 'black-edge-barber',
    file: 'templux-site/demos/black-edge-barber/index.html',
    accent: '#d4a843',
    sections: { hero:'#hero', sobre:'#sobre', skills:'#servicos', depoimentos:'#depoimentos', cta:'#cta' },
  },
  {
    name: 'clinica-sorria',
    file: 'templux-site/demos/clinica-sorria/index.html',
    accent: '#3b82f6',
    sections: { hero:'#inicio', sobre:'#sobre', skills:'#servicos', depoimentos:'#depoimentos', cta:'#contato' },
  },
  {
    name: 'academia-premium',
    file: 'templates/academia-premium/site/index.html',
    accent: '#f97316',
    sections: { hero:'#inicio', sobre:'#equipe', skills:'#programas', depoimentos:'#planos', cta:'#contato' },
  },
  {
    name: 'barbearia-imperial',
    file: 'templates/barbearia-imperial/site/index.html',
    accent: '#c9a84c',
    sections: { hero:'#inicio', sobre:'#equipe', skills:'#servicos', depoimentos:'#depoimentos', cta:'#contato' },
  },
  {
    name: 'devfolio-dark',
    file: 'templates/devfolio-dark/site/index.html',
    accent: '#22d3ee',
    sections: { hero:'#inicio', sobre:'#sobre', skills:'#skills', depoimentos:'#projetos', cta:'#contato' },
  },
  {
    name: 'clinica-estetica-aura',
    file: 'templates/clinica-estetica-aura/site/index.html',
    accent: '#f472b6',
    sections: { hero:'#inicio', sobre:'#equipe', skills:'#procedimentos', depoimentos:'#depoimentos', cta:'#contato' },
  },
];

// ─── Utilitários ──────────────────────────────────────────────────────────────
const wait = (ms) => new Promise(r => setTimeout(r, ms));

function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Movimento de cursor com easing e leve tremor humano. */
async function humanMove(page, x1, y1, x2, y2, ms = 700) {
  const steps = Math.max(Math.ceil(ms / F_MS), 10);
  for (let i = 0; i <= steps; i++) {
    const t = ease(i / steps);
    const wx = (Math.random() - 0.5) * 3;
    const wy = (Math.random() - 0.5) * 3;
    await page.mouse.move(x1 + (x2 - x1) * t + wx, y1 + (y2 - y1) * t + wy);
    await wait(F_MS);
  }
}

/** Scroll suave com easing até posição Y. */
async function smoothScrollTo(page, targetY, ms = 1400) {
  const startY = await page.evaluate(() => window.scrollY);
  const steps  = Math.ceil(ms / F_MS);
  for (let i = 0; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), startY + (targetY - startY) * ease(i / steps));
    await wait(F_MS);
  }
}

/** Scroll até âncora de seção. */
async function scrollToSection(page, sel, ms = 1600) {
  const y = await page.evaluate((s) => {
    const el = document.querySelector(s);
    return el ? Math.max(0, el.getBoundingClientRect().top + window.scrollY - 72) : window.scrollY;
  }, sel);
  await smoothScrollTo(page, y, ms);
}

/** Força elementos com animação visíveis e fecha menus. */
async function revealAll(page) {
  await page.evaluate(() => {
    document.querySelectorAll(
      '.reveal,[data-aos],[class*="animate"],[class*="reveal"],[class*="fade"],' +
      '.hero__content,.hero__visual,.section__header,.card,.feature-item,.service-card,.testimonial-card'
    ).forEach(el => {
      el.style.opacity = '1'; el.style.transform = 'none';
      el.style.visibility = 'visible'; el.style.transition = 'none'; el.style.animation = 'none';
      el.classList.add('visible','aos-animate','animated','active','shown');
    });
    document.querySelectorAll('.nav-mobile,#mobileMenu,.mobile-menu,.overlay,.modal')
      .forEach(el => { el.style.display = 'none'; });
  });
}

/** Pré-scroll completo para forçar carregamento de imagens lazy. */
async function preloadImages(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
    const imgs = Array.from(document.images);
    imgs.forEach(img => { img.loading = 'eager'; });
    await Promise.all(imgs.filter(i => !i.complete).map(img =>
      new Promise(r => { img.onload = r; img.onerror = r; setTimeout(r, 3000); })
    ));
  });
  await wait(400);
}

/** Injeta cursor premium visível (dot + ring) na página. */
async function injectCursor(page, accent = '#ffffff') {
  await page.evaluate((color) => {
    if (document.getElementById('__tlx_cursor__')) return;
    const style = document.createElement('style');
    style.textContent = `
      #__tlx_cursor__ {
        position:fixed; width:14px; height:14px; background:#fff; border-radius:50%;
        transform:translate(-50%,-50%); pointer-events:none; z-index:2147483647;
        box-shadow:0 0 0 1.5px rgba(255,255,255,.3), 0 0 14px 3px ${color}99;
        will-change:left,top;
      }
      #__tlx_ring__ {
        position:fixed; width:34px; height:34px;
        border:1.5px solid rgba(255,255,255,.4); border-radius:50%;
        transform:translate(-50%,-50%); pointer-events:none; z-index:2147483646;
        will-change:left,top;
      }
    `;
    document.head.appendChild(style);
    const dot  = document.createElement('div'); dot.id  = '__tlx_cursor__';
    const ring = document.createElement('div'); ring.id = '__tlx_ring__';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.addEventListener('mousemove', (e) => {
      dot.style.left   = ring.style.left = e.clientX + 'px';
      dot.style.top    = ring.style.top  = e.clientY + 'px';
    });
  }, accent);
}

// ─── CDP Screencast ───────────────────────────────────────────────────────────
async function startCapture(page) {
  const client = await page.createCDPSession();
  const frames = [];
  await client.send('Page.startScreencast', { format: 'jpeg', quality: 88, everyNthFrame: 1 });
  client.on('Page.screencastFrame', async ({ data, sessionId }) => {
    frames.push(data);
    await client.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
  });
  return { client, frames };
}

async function stopCapture(client) {
  await client.send('Page.stopScreencast').catch(() => {});
  await wait(200);
}

function flushFrames(frames, dir) {
  fs.mkdirSync(dir, { recursive: true });
  // Limpa frames anteriores
  fs.readdirSync(dir).filter(f => f.endsWith('.jpg')).forEach(f => fs.unlinkSync(path.join(dir, f)));
  frames.forEach((data, i) => {
    fs.writeFileSync(path.join(dir, `frame_${String(i).padStart(7,'0')}.jpg`), Buffer.from(data, 'base64'));
  });
  return frames.length;
}

// ─── ffmpeg ───────────────────────────────────────────────────────────────────
function checkFfmpeg() {
  try { execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' }); return true; }
  catch { return false; }
}

/**
 * mode 'desktop' → escala para 1080px largura, pillarbox em 1080×1920
 * mode 'mobile'  → escala para preencher 1080×1920, mantendo proporção
 */
function encodeVideo(framesDir, outPath, mode) {
  const vf = mode === 'mobile'
    ? 'scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x050505,setsar=1'
    : 'scale=1080:-2,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x050505,setsar=1';

  const r = spawnSync('ffmpeg', [
    '-y', '-framerate', String(FPS),
    '-i', path.join(framesDir, 'frame_%07d.jpg'),
    '-vf', vf,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    outPath,
  ], { stdio: ['ignore', 'ignore', 'pipe'] });

  if (r.status !== 0) {
    console.error('    ❌ ffmpeg:', r.stderr?.toString().slice(-400));
    return false;
  }
  return true;
}

function extractThumb(videoPath, thumbPath) {
  spawnSync('ffmpeg', [
    '-y', '-ss', '00:00:01.5', '-i', videoPath,
    '-frames:v', '1', '-q:v', '2', thumbPath,
  ], { stdio: 'ignore' });
}

// ─── Cenas de animação ────────────────────────────────────────────────────────

async function runDesktopScene(page, tmpl) {
  const W = 1280, H = 720;
  const cx = W / 2;

  // Cursor entra pelo lado direito → headline
  await page.mouse.move(W + 50, H * 0.3);
  await humanMove(page, W + 50, H * 0.3, cx, H * 0.3, 900);
  await wait(500);

  // Tremores leves sobre o headline (simulando leitura)
  for (let i = 0; i < 4; i++) {
    await humanMove(page,
      cx + (Math.random() - 0.5) * 30, H * 0.3 + (Math.random() - 0.5) * 15,
      cx + (Math.random() - 0.5) * 30, H * 0.3 + (Math.random() - 0.5) * 15,
      250);
  }
  await wait(400);

  // Move para o botão CTA principal → pausa (hover effect)
  await humanMove(page, cx, H * 0.3, cx * 0.75, H * 0.58, 700);
  await wait(800);

  // Scroll suave até "sobre"
  await scrollToSection(page, tmpl.sections.sobre, 1800);
  await revealAll(page);
  await wait(300);
  await humanMove(page, cx * 0.75, H * 0.58, W * 0.3, H * 0.42, 600);
  await humanMove(page, W * 0.3, H * 0.42, W * 0.65, H * 0.55, 550);
  await wait(400);

  // Scroll até serviços / skills
  await scrollToSection(page, tmpl.sections.skills, 1600);
  await revealAll(page);
  await wait(300);
  // Cursor passeia pelos cards
  await humanMove(page, W * 0.65, H * 0.55, W * 0.2,  H * 0.4, 600);
  await humanMove(page, W * 0.2,  H * 0.4,  W * 0.5,  H * 0.4, 500);
  await humanMove(page, W * 0.5,  H * 0.4,  W * 0.78, H * 0.4, 500);
  await wait(400);

  // Scroll até depoimentos
  await scrollToSection(page, tmpl.sections.depoimentos, 1500);
  await revealAll(page);
  await wait(300);
  await humanMove(page, W * 0.78, H * 0.4, cx, H * 0.5, 600);
  await wait(400);

  // Scroll até CTA final
  await scrollToSection(page, tmpl.sections.cta, 1400);
  await revealAll(page);
  await wait(300);
  // Cursor vai para botão de CTA final
  await humanMove(page, cx, H * 0.5, cx, H * 0.58, 600);
  await wait(900);
}

async function runMobileScene(page, tmpl) {
  const W = 390, H = 844;
  const cx = W / 2;

  // "Touch" entra do centro → headline
  await page.mouse.move(cx, H * 0.12);
  await humanMove(page, cx, H * 0.12, cx, H * 0.38, 700);
  await wait(600);

  // Pequenos tremores no headline
  for (let i = 0; i < 3; i++) {
    await humanMove(page,
      cx + (Math.random() - 0.5) * 15, H * 0.38 + (Math.random() - 0.5) * 10,
      cx + (Math.random() - 0.5) * 15, H * 0.38 + (Math.random() - 0.5) * 10,
      250);
  }
  await wait(400);

  // Scroll pelo hero
  await smoothScrollTo(page, H * 0.28, 1200);
  await revealAll(page);
  await wait(300);

  // Scroll até sobre
  await scrollToSection(page, tmpl.sections.sobre, 1500);
  await revealAll(page);
  await wait(400);
  await humanMove(page, cx, H * 0.38, cx, H * 0.5, 400);
  await wait(300);

  // Scroll até skills
  await scrollToSection(page, tmpl.sections.skills, 1400);
  await revealAll(page);
  await wait(400);

  // Scroll até CTA
  await scrollToSection(page, tmpl.sections.cta, 1400);
  await revealAll(page);
  await wait(700);
}

// ─── Processa um template ─────────────────────────────────────────────────────
async function processTemplate(browser, tmpl) {
  const absFile = 'file:///' + path.resolve(__dirname, tmpl.file).replace(/\\/g, '/');

  if (!fs.existsSync(path.resolve(__dirname, tmpl.file))) {
    console.log(`\n⚠  Arquivo não encontrado: ${tmpl.file}`);
    return;
  }

  fs.mkdirSync(VIDEOS, { recursive: true });
  const tmpDir = path.join(TMP, tmpl.name);

  console.log(`\n→ ${tmpl.name}`);

  // ── DESKTOP ──────────────────────────────────────────────────────────────
  console.log('    → desktop...');
  let page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
  page.on('requestfailed', () => {});
  await page.goto(absFile, { waitUntil: 'networkidle2', timeout: 45000 });
  await revealAll(page);
  await wait(800);
  await preloadImages(page);
  await revealAll(page);
  await wait(400);
  await injectCursor(page, tmpl.accent);
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(400);

  const { client: dCli, frames: dFrames } = await startCapture(page);
  await wait(700);                         // freeze de entrada
  await runDesktopScene(page, tmpl);
  await wait(900);                         // freeze de saída
  await stopCapture(dCli);

  const dCount = flushFrames(dFrames, tmpDir);
  await page.close();

  const dOut = path.join(VIDEOS, `${tmpl.name}-showcase-desktop.mp4`);
  const dOk  = encodeVideo(tmpDir, dOut, 'desktop');
  if (dOk) {
    const kb = Math.round(fs.statSync(dOut).size / 1024);
    console.log(`    ✓ showcase-desktop.mp4  (${dCount} frames · ${kb} KB)`);
    const thumb = path.join(VIDEOS, `${tmpl.name}-showcase-thumb.jpg`);
    extractThumb(dOut, thumb);
    console.log(`    ✓ showcase-thumb.jpg`);
  }

  // ── MOBILE ───────────────────────────────────────────────────────────────
  console.log('    → mobile...');
  page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  page.on('requestfailed', () => {});
  await page.goto(absFile, { waitUntil: 'networkidle2', timeout: 45000 });
  await revealAll(page);
  await wait(600);
  await preloadImages(page);
  await revealAll(page);
  await wait(400);
  await injectCursor(page, tmpl.accent);
  await page.evaluate(() => {
    const m = document.querySelector('.nav-mobile,#mobileMenu,.mobile-menu');
    if (m) { m.style.display = 'none'; m.classList.remove('active','open'); }
    window.scrollTo(0, 0);
  });
  await wait(300);

  const { client: mCli, frames: mFrames } = await startCapture(page);
  await wait(600);
  await runMobileScene(page, tmpl);
  await wait(800);
  await stopCapture(mCli);

  const mCount = flushFrames(mFrames, tmpDir);
  await page.close();

  const mOut = path.join(VIDEOS, `${tmpl.name}-showcase-mobile.mp4`);
  const mOk  = encodeVideo(tmpDir, mOut, 'mobile');
  if (mOk) {
    const kb = Math.round(fs.statSync(mOut).size / 1024);
    console.log(`    ✓ showcase-mobile.mp4   (${mCount} frames · ${kb} KB)`);
  }

  // Limpa frames temporários
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

// ─── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  if (!checkFfmpeg()) {
    console.error('\n❌  ffmpeg não encontrado. Já está instalado (Gyan build), verifique o PATH.\n');
    process.exit(1);
  }

  const arg     = process.argv[2] || 'all';
  const targets = arg === 'all' ? TEMPLATES : TEMPLATES.filter(t => t.name === arg);

  if (!targets.length) {
    console.error(`Template não encontrado: ${arg}`);
    console.log('Disponíveis:', TEMPLATES.map(t => t.name).join(', '));
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: true,
    args: [
      '--no-sandbox', '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-gpu', '--hide-scrollbars',
    ],
  });

  for (const t of targets) {
    await processTemplate(browser, t);
  }

  await browser.close();
  fs.rmSync(TMP, { recursive: true, force: true });
  console.log('\n✅ Vídeos prontos em templux-site/assets/videos/\n');
})().catch(e => { console.error('\n❌ Erro:', e.message); process.exit(1); });
