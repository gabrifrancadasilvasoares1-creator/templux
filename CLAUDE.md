# CLAUDE.md — Sistema Operacional da Templux

> Este arquivo define como Claude deve agir em **todo e qualquer trabalho** neste projeto.
> Leia antes de fazer qualquer coisa. Siga como lei.

---

## Papel do Claude neste projeto

Você é o **arquiteto, desenvolvedor, revisor, empacotador e organizador** da Templux.
O dono do projeto não coloca a mão no código. Você faz tudo:

- Cria a estrutura de pastas
- Escreve o código completo
- Revisa e refina
- Gera os arquivos de venda
- Organiza o ZIP
- Tira screenshots quando possível
- Commita e publica no Netlify via GitHub

Nunca entregue trabalho incompleto. Nunca deixe placeholder sem resolver.
Se não souber algo, pergunte antes de inventar.

---

## 1. Identidade da Templux

**Missão:** vender templates premium prontos para pequenos negócios, criadores e profissionais.

**Posicionamento:** produto caro, feito com cuidado, que qualquer pessoa consegue usar.

**Tom visual:**
- Moderno, tecnológico, premium
- Parecer que custou muito para fazer
- Nada genérico, nada antiquado, nada de template gratuito dos anos 2010
- Cada template deve parecer feito sob medida para aquele nicho

**Tom de comunicação:**
- Direto, confiante, sem enrolação
- Copy focada em resultado e facilidade
- Linguagem do público-alvo (dono de barbearia fala diferente de arquiteto)

---

## 2. Padrão Visual Obrigatório

Todo template Templux deve ter, obrigatoriamente:

### Hierarquia e Layout
- Headline poderoso acima da dobra
- Subheadline que complementa e convence
- CTA principal visível sem rolar
- Seções com ritmo: detalhe → prova → urgência → ação
- Espaçamento generoso, nunca apertado

### Tipografia
- Display pesada para títulos (700–900 weight)
- Body legível (400–500 weight, 15–17px, line-height 1.6+)
- No máximo 2 fontes por template
- Google Fonts: Inter, Plus Jakarta Sans, Sora, DM Sans, Space Grotesk — dependendo do nicho

### Profundidade Visual
- Gradientes sutis nos fundos e nos textos
- Glassmorphism nos cards quando combinar
- Sombras em camadas (shadow-sm + shadow-lg juntas)
- Cards flutuantes com bordas suaves
- Blur em elementos de background
- Luz direcional simulada via box-shadow colorido

### Efeitos e Movimento
- Animações de reveal no scroll (IntersectionObserver ou AOS)
- Hover com elevação e brilho nos botões e cards
- Floating elements com animação CSS `@keyframes`
- Hero com elemento em movimento (paralax leve, partícula, blob animado)
- Elementos 3D via CSS transform ou Three.js quando o nicho pede
- Microinterações nos botões (scale, glow, ripple)

### Responsividade
- Mobile-first obrigatório
- Breakpoints: 480px / 768px / 1024px / 1280px
- Menu hamburger funcional
- Touch targets mínimo 44px
- Fontes fluidas com `clamp()`
- Imagens com `max-width: 100%` e `object-fit: cover`

### Mobile perfeito
- Hero sem overflow horizontal
- Botões em coluna no mobile
- Grid que colapsa bem
- Nenhum texto cortado
- Nenhum elemento saindo da tela

---

## 3. Tecnologias Permitidas

### Obrigatórias (sempre puro)
- HTML5 semântico
- CSS3 moderno (variables, grid, flexbox, animations, clamp)
- JavaScript ES6+ vanilla

### Bibliotecas leves permitidas (carregar via CDN)
- **GSAP** — animações complexas e timelines
- **Three.js** — cenas 3D para templates premium (SaaS, arquitetura, tech)
- **Lenis** — scroll suave
- **Swiper** — carrosséis e sliders
- **AOS** — reveal on scroll simples
- **particles.js / tsparticles** — efeitos de partículas no hero
- **Splitting.js** — animações de texto letra a letra

### Regras de biblioteca
- Só use quando agrega valor visual claro
- Carregue via CDN com `defer` ou `async`
- Nunca use framework (React, Vue, Angular) — template deve ser arquivo estático
- Nunca use bundler (Webpack, Vite) — deve abrir com duplo clique no HTML

### Fontes
- Google Fonts via `<link>` no head
- Sempre com `preconnect` para performance
- Máximo 2 famílias, máximo 4 pesos por família

---

## 4. Estrutura de Pastas — Obrigatória por Template

Cada template novo deve ser criado em:

```
templux/templates/NOME-DO-TEMPLATE/
```

Estrutura interna obrigatória:

```
NOME-DO-TEMPLATE/
├── site/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
│       ├── images/
│       ├── icons/
│       ├── videos/
│       └── 3d/
├── preview/
│   ├── screenshots/        ← prints desktop e mobile
│   ├── mockups/            ← mockups de notebook e celular
│   ├── reels-assets/       ← imagens/cenas para vídeo
│   └── thumbnails/         ← imagens de capa para YouTube/TikTok
├── produto/
│   ├── descricao-cakto.txt
│   ├── copy-venda.txt
│   ├── legenda-instagram.txt
│   ├── legenda-tiktok.txt
│   ├── hashtags.txt
│   └── roteiro-video.txt
├── docs/
│   ├── README.md
│   ├── COMO-EDITAR.md
│   └── LICENCA-DE-USO.txt
└── pacote-venda/
    └── NOME-DO-TEMPLATE.zip
```

### Regras de nomenclatura
- Pastas em `kebab-case` sempre
- Sem espaços, sem caracteres especiais, sem acentos nos nomes de arquivo
- Imagens: `hero-bg.jpg`, `service-card-1.jpg`, `mockup-desktop.png`
- Nunca: `imagem1.jpg`, `foto.png`, `asset_final_v3.jpg`

---

## 5. Regra para o Arquivo ZIP

O ZIP entregue ao cliente deve estar em `pacote-venda/NOME-DO-TEMPLATE.zip`.

### O que incluir no ZIP
```
NOME-DO-TEMPLATE/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── videos/
├── README.md
├── COMO-EDITAR.md
└── LICENCA-DE-USO.txt
```

### O que NÃO incluir
- Pasta `preview/`
- Pasta `produto/`
- Pasta `pacote-venda/` (o próprio ZIP não vai dentro)
- Arquivos `.DS_Store`, `Thumbs.db`, `.git`
- Qualquer arquivo de desenvolvimento interno

### Como gerar o ZIP
Use PowerShell ou Bash para compactar programaticamente.
Sempre verifique o tamanho final — ZIP acima de 10MB provavelmente tem algo errado.

---

## 6. Materiais de Venda Obrigatórios

Para cada template, crie os arquivos abaixo em `produto/`:

### `descricao-cakto.txt`
```
TÍTULO DO PRODUTO:
[Nome comercial do template]

DESCRIÇÃO CURTA (até 160 caracteres):
[Uma linha que vende o produto]

DESCRIÇÃO LONGA:
[3-5 parágrafos detalhando o que é, para quem é, o que inclui e por que comprar]

O QUE ESTÁ INCLUSO:
- [item 1]
- [item 2]
...

PÚBLICO IDEAL:
[Para quem é esse template]

DIFERENCIAIS:
[3-5 diferenciais em bullet points]
```

### `copy-venda.txt`
```
HEADLINE PRINCIPAL:
SUBHEADLINE:
LISTA DE BENEFÍCIOS (5-7 itens):
OBJEÇÕES QUEBRADAS:
CTA PRINCIPAL:
CTA SECUNDÁRIO:
```

### `legenda-instagram.txt`
- 3-5 linhas
- Hook forte na primeira linha
- Emojis estratégicos
- CTA no final ("link na bio")
- Tom do nicho

### `legenda-tiktok.txt`
- 1-2 linhas máximo
- Hook de impacto
- Sem hashtags no texto (vão separadas)

### `hashtags.txt`
- Até 30 hashtags para Instagram
- 5-8 hashtags para TikTok
- Mix: nicho + produto + alcance

### `roteiro-video.txt`
```
DURAÇÃO IDEAL: 15-30 segundos

CENA 1 (0-3s): [hook visual — o que aparece na tela]
CENA 2 (3-8s): [demonstração do template funcionando]
CENA 3 (8-18s): [destaque das seções mais bonitas]
CENA 4 (18-25s): [preço + CTA + link]

MÚSICA SUGERIDA: [estilo — não nome específico para evitar copyright]
TEXTO NA TELA: [o que escrever em cada cena]
VOZ: [se usar narração, o que falar]
```

---

## 7. Sistema de Screenshots e Conteúdo Visual

> **Lei absoluta:** NUNCA usar imagens genéricas (Unsplash, stock, placeholder).
> NUNCA cortar textos, botões ou cards pela metade.
> NUNCA capturar prints quebrados, desalinhados ou vazios.
> Todo template DEVE ter screenshots reais integrados em todos os pontos de venda.

---

### Ordem obrigatória das 7 imagens de prévia

| # | Seção | O que mostrar | Arquivo |
|---|---|---|---|
| 1 | **Hero Desktop** | Navbar + headline + subheadline + CTA + imagem principal | `preview-hero-desktop.webp` |
| 2 | **Hero Mobile** | Layout responsivo vertical completo do hero | `preview-hero-mobile.webp` |
| 3 | **Sobre** | Seção "Sobre" com imagem + textos principais | `preview-sobre.webp` |
| 4 | **Resultados / Benefícios** | Cards de métricas, resultados ou benefícios | `preview-resultados.webp` |
| 5 | **Serviços / Skills** | Cards de serviços ou skills (com hover se possível) | `preview-skills.webp` |
| 6 | **Depoimentos** | Seção de depoimentos inteira, cards completos | `preview-depoimentos.webp` |
| 7 | **CTA Final** | Chamada final para ação, botão de compra/contato | `preview-cta.webp` |

Mínimo obrigatório: **4 imagens**. Ideal: todas as 7. Priorizar as partes mais bonitas.

---

### Regras de qualidade — sem exceção

- ✅ Screenshots limpas e profissionais
- ✅ Elementos visíveis e completos — sem cortes
- ✅ Seções sem overflow ou desalinhamento
- ✅ Forçar `.reveal`, `[data-aos]` e animações visíveis antes de capturar
- ❌ Não cortar textos, botões ou cards
- ❌ Não deixar elementos pela metade
- ❌ Não gerar screenshots vazias ou com fundo em branco inesperado
- ❌ Não repetir imagens parecidas (ex: duas capturas do mesmo hero)
- ❌ Não usar `full-desktop` (página inteira scrollada) — imagem fica altíssima e quebra o layout

---

### Configuração técnica obrigatória (Puppeteer)

#### Desktop — todas as seções
```js
viewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 }
format: 'webp', quality: 88

// Antes de cada captura — forçar animações visíveis:
await page.evaluate(() => {
  document.querySelectorAll('.reveal, [data-aos], [class*="animate"], [class*="fade"]').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.style.visibility = 'visible';
    el.style.transition = 'none';
    el.style.animation = 'none';
    el.classList.add('visible', 'aos-animate', 'animated');
  });
});
await new Promise(r => setTimeout(r, 600));
```

#### Mobile hero — obrigatório e crítico
```js
// 1. Abrir com viewport mobile real
viewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true }

// 2. Carregar página, revelar animações, pre-scroll para lazy images

// 3. Fechar menu mobile, voltar ao topo — SEM mexer no padding-top do hero
await page.evaluate(() => {
  const menu = document.querySelector('.nav-mobile, #mobileMenu, .mobile-menu');
  if (menu) { menu.style.display = 'none'; menu.classList.remove('active', 'open'); }
  window.scrollTo(0, 0);
});

// 4. Medir o bounding box REAL da seção hero (inclui conteúdo maior que viewport)
const heroClip = await page.evaluate((heroSel) => {
  const candidates = [heroSel, '#inicio', '#hero', '.hero', '.hero-section', 'section:first-of-type'];
  let el = null;
  for (const sel of candidates) { el = document.querySelector(sel); if (el) break; }
  if (!el) return { x: 0, y: 0, width: 390, height: window.innerHeight };
  const rect = el.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  return {
    x: 0,
    y: Math.round(Math.max(0, rect.top + scrollTop)),
    width: 390,
    height: Math.round(el.offsetHeight),   // altura REAL, não da viewport
  };
}, tmpl.sections.hero);

// 5. Se a hero for maior que 844px, expandir viewport para capturar tudo
const neededH = heroClip.y + heroClip.height;
if (neededH > 844) {
  await page.setViewport({ width: 390, height: neededH, deviceScaleFactor: 2, isMobile: true });
  await wait(200); await revealAll(page); await wait(200);
}

// 6. Screenshot com clip = bounding box da hero (resultado: portrait ~780x1800-2400px)
await page.screenshot({ path: outFile, type: 'webp', quality: 88, clip: heroClip });
```

> **Regra absoluta**: NUNCA usar `clip: { height: 219 }` ou qualquer recorte paisagem 16:9 para
> a imagem mobile. O resultado obrigatório é portrait vertical (~780×1800–2400 px).
> Largura sempre 780px (390 CSS × deviceScaleFactor 2). Altura definida pela hero real.

Salvar em `templates/NOME/preview/screenshots/` com os nomes do padrão acima.

---

### Integração obrigatória após capturar

1. Copiar para `templux-site/assets/images/products/NOME-preview-hero-desktop.webp` etc.
2. Atualizar `produto-NOME.html` — galeria com as imagens na ordem obrigatória
3. Atualizar card em `catalogo.html` — usar `preview-hero-desktop.webp` como cover
4. CSS já presente no `style.css` global — **não duplicar** nas páginas de produto:

```css
/* Desktop — cobre e alinha ao topo */
.main-preview img { object-fit: cover; object-position: top center; }
.gallery-thumb img { object-fit: cover; object-position: top center; }

/* Mobile portrait — exibe completa sem corte, fundo escuro */
.gallery-thumb img[src*="-hero-mobile"],
.main-preview img[src*="-hero-mobile"] {
  object-fit: contain;
  object-position: top center;
}
.gallery-thumb:has(img[src*="-hero-mobile"]),
.main-preview:has(img[src*="-hero-mobile"]) {
  background: #050505;
}
```

---

### Fluxo obrigatório após criar um template

```
1. Criar template (site/ completo)
2. Abrir template no navegador (via Puppeteer)
3. Capturar as 7 screenshots reais das seções obrigatórias
4. Verificar cada imagem — descartar e recapturar se tiver corte ou bug visual
5. Copiar para assets/images/products/ com nomeclatura correta
6. Integrar previews na página do produto (produto-NOME.html)
7. Atualizar cover no catálogo (catalogo.html)
8. Commitar tudo junto
```

---

### Quando não conseguir gerar automaticamente
Crie o arquivo `preview/INSTRUCOES-SCREENSHOTS.md` com:
- URL ou caminho do arquivo a abrir
- Tamanho de janela exato para cada seção
- Quais seções fotografar e em que ordem
- Nome exato de cada arquivo de saída

---

## 8. Padrão de Qualidade do Código

Antes de marcar um template como finalizado, revise todos os itens:

### HTML
- [ ] Semântico: `<header>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<nav>`
- [ ] `lang="pt-BR"` no `<html>`
- [ ] `charset="UTF-8"` e `viewport` corretos
- [ ] `<title>` e `<meta description>` preenchidos
- [ ] `alt` em todas as imagens
- [ ] `aria-label` nos botões sem texto visível
- [ ] Sem tags desnecessárias ou divitis
- [ ] Links externos com `target="_blank" rel="noopener"`

### CSS
- [ ] Variáveis CSS em `:root` para cores, fontes e espaçamentos
- [ ] Sem valores mágicos soltos (use variáveis)
- [ ] Mobile-first com media queries corretas
- [ ] Sem `!important` desnecessário
- [ ] Sem código morto (classes não usadas)
- [ ] Transições e animações com `prefers-reduced-motion` respeitado
- [ ] `color-scheme: light` ou `dark` declarado explicitamente

### JavaScript
- [ ] Nenhum `console.log` no código final
- [ ] Sem variáveis globais desnecessárias
- [ ] Event listeners com `{ passive: true }` no scroll
- [ ] IntersectionObserver para reveal (não scroll event)
- [ ] Sem erros no console
- [ ] Funciona sem JavaScript (graceful degradation)

### Performance
- [ ] Imagens com `loading="lazy"` (exceto hero)
- [ ] Fontes com `preconnect`
- [ ] CSS inline crítico no `<head>` se necessário
- [ ] Sem imagens acima de 500KB
- [ ] Sem vídeos autoplay sem `muted` e `playsinline`

### Funcional
- [ ] Menu mobile abre e fecha corretamente
- [ ] Todos os links funcionam
- [ ] Botões de WhatsApp com número formatado corretamente
- [ ] Formulários (se houver) com validação básica
- [ ] Scroll suave nos âncoras
- [ ] Nenhum link quebrado

---

## 9. Padrão de Animações

### Obrigatórias em todo template
- **Reveal on scroll** — elementos entram com `opacity` + `translateY` via IntersectionObserver
- **Hover nos botões** — escala leve (1.02–1.05) + glow colorido
- **Hover nos cards** — elevação com `box-shadow` + borda accent
- **Hero animado** — pelo menos um elemento em movimento no carregamento

### Opcionais por nicho
- **Floating badges** — elementos flutuando com `@keyframes` leve (transform Y ±8px)
- **Parallax leve** — background do hero com velocidade diferente (CSS ou JS)
- **Typing effect** — texto digitando para tech, SaaS, agências
- **Counter animado** — números subindo para clínicas, academias, negócios com stats
- **Partículas** — para SaaS, IA, startup, tech
- **3D scene** — para arquitetura, imobiliária, produto premium

### Regras de animação
- Duração: entre 0.3s e 0.8s para maioria das animações
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` como padrão
- Delay entre elementos em sequência: 80ms–150ms
- Nunca animar mais de 3 propriedades simultâneas no mesmo elemento
- Testar em tela pequena antes de finalizar
- Nunca travar o scroll com animações

---

## 10. Nichos Prioritários

Organize os templates nestas categorias. Cada nicho tem um estilo visual sugerido:

| Nicho | Paleta sugerida | Estilo |
|---|---|---|
| Academia | Preto + amarelo/laranja | Impacto, energia, bold |
| Barbearia | Preto + dourado | Escuro, masculino, premium |
| Clínica Estética | Rosa/nude + branco | Limpo, feminino, luxo |
| Clínica Odontológica | Azul + branco | Limpo, confiança, saúde |
| Restaurante | Escuro + âmbar | Quente, apetitoso, elegante |
| Pizzaria | Vermelho + creme | Vibrante, apetitoso |
| Hamburgueria | Preto + amarelo | Street, urbano, bold |
| Portfólio Dev | Escuro + verde neon | Tech, minimalista, código |
| Portfólio Designer | Branco/preto + accent | Editorial, criativo |
| Agência de Marketing | Roxo/gradiente | Moderno, criativo, digital |
| Tattoo Studio | Preto + vermelho/off-white | Sombrio, artístico |
| Arquitetura | Off-white + cinza | Minimalista, preciso |
| Imobiliária | Azul escuro + dourado | Confiável, premium |
| Oficina Mecânica | Escuro + laranja | Industrial, masculino |
| Lava-jato | Azul + branco | Limpo, fresco |
| Advogado | Azul marinho + dourado | Sério, confiável |
| Contabilidade | Azul + verde | Seguro, organizado |
| Loja de Roupas | Bege + preto | Editorial, fashion |
| Salão Feminino | Rosa + dourado | Feminino, luxo |
| Personal Trainer | Preto + laranja/vermelho | Energia, força |
| SaaS | Escuro + roxo/azul | Tech, produto, moderno |
| Startup de IA | Escuro + gradient colorido | Futurista, inovador |
| Infoprodutor | Escuro + amarelo/laranja | Conversão, urgência |
| Fotógrafo | Preto + branco | Editorial, minimalista |
| Psicólogo | Verde/azul suave + branco | Calmo, acolhedor |
| Nutricionista | Verde + branco + laranja | Saúde, natural, energia |

---

## 11. Sistema de Geração em Massa

Quando receber pedido de múltiplos templates, siga este protocolo:

### Ordem de execução
1. Criar estrutura de pastas para todos antes de começar o código
2. Desenvolver um por vez — nunca em paralelo
3. Finalizar completamente cada template antes de ir pro próximo
4. Variação obrigatória: nunca repetir layout idêntico em dois templates
5. Manter identidade Templux mas variar estilo visual por nicho

### Lotes recomendados
- Máximo 3 templates por sessão
- Após cada template: confirmar com o dono antes de continuar
- Se algo travar (imagem, lib, efeito), avise e siga com fallback

### Checklist entre templates
- [ ] Template anterior commitado e publicado
- [ ] ZIP gerado e testado
- [ ] Materiais de venda criados
- [ ] Screenshots tirados ou instruções criadas
- [ ] Pasta organizada conforme estrutura padrão

---

## 12. Integração com Cakto

### Regra absoluta
**Nunca invente um link de checkout.** Jamais use `#`, `LINK_AQUI` ou qualquer placeholder publicado.

### Fluxo correto
1. Criar o template completo com botões apontando para `LINK_DA_CAKTO_AQUI`
2. Aguardar o dono fornecer o link real no formato `https://pay.cakto.com.br/XXXXX`
3. Substituir `LINK_DA_CAKTO_AQUI` em todos os arquivos de uma vez (replace_all)
4. Atualizar também os arquivos de venda em `produto/` se tiver link lá
5. Commitar e publicar

### Onde o link aparece
- Botão principal da sidebar na página do produto (`produto-NOME.html`)
- Card no catálogo (`catalogo.html`)
- Arquivos `descricao-cakto.txt` e `copy-venda.txt` se referenciarem

### Após receber o link
Executar exatamente:
```
substituir LINK_DA_CAKTO_AQUI → https://pay.cakto.com.br/XXXXX
em: produto-NOME.html e catalogo.html
commitar: "Adiciona link de checkout Cakto — NOME"
push → Netlify deploy automático
```

---

## 13. Integração com o Site Templux (templux-site/)

Quando um novo template estiver pronto para venda, integrar ao site:

### Checklist de integração
1. Copiar `site/` para `templux-site/demos/NOME-DO-TEMPLATE/`
2. Criar `templux-site/produto-NOME-DO-TEMPLATE.html` baseado no modelo existente
3. Adicionar card em `templux-site/catalogo.html`
4. Copiar screenshots para `templux-site/assets/images/products/`
5. Adicionar `color-scheme: light` ou `dark` na demo conforme o tema
6. Commitar tudo em um único commit descritivo
7. Push → Netlify

### Nomes de arquivo para o site
```
clinica-sorria-cover.jpg     ← imagem principal da galeria
clinica-sorria-hero.jpg      ← seção hero
clinica-sorria-services.jpg  ← seção serviços
clinica-sorria-resultados.jpg ← seção resultados
clinica-sorria-cta.jpg       ← seção CTA
```

### Cache busting
Sempre que substituir uma imagem com o mesmo nome, adicionar `?v=N` nas referências do HTML.
Motivo: `netlify.toml` tem `Cache-Control: immutable` em `/assets/*`.

---

## 14. Regra de Finalização Obrigatória — Pastas Não Podem Ficar Vazias

> **Lei absoluta:** nenhum template pode ser considerado finalizado enquanto as pastas principais estiverem vazias.

Após criar o código (`site/`), você DEVE preencher obrigatoriamente:

### produto/ — todos os arquivos abaixo são obrigatórios
- `descricao-cakto.txt` — título, descrição curta/longa, público, diferenciais
- `copy-venda.txt` — headline, benefícios, objeções, CTAs
- `legenda-instagram.txt` — post pronto para copiar e colar
- `legenda-tiktok.txt` — hook de 1-2 linhas
- `hashtags.txt` — 30 para Instagram + 5 para TikTok
- `roteiro-video.txt` — script de vídeo 20-30s cena a cena
- `checklist-publicacao.txt` — lista de verificação antes do lançamento

### preview/screenshots/ — obrigatório
- Gerar via Puppeteer sempre que possível (script adaptado de `shot_catalog.js`)
- Capturas mínimas: hero-desktop, full-desktop, sessão-principal, planos/servicos, cta, hero-mobile
- Se não for possível gerar automaticamente: criar `INSTRUCOES-PRINTS.md` explicando viewport, scroll, seções e nomes de arquivo

### preview/thumbnails/ — obrigatório
- Criar `IDEIAS-THUMBNAILS.txt` com mínimo 5 ideias baseadas no hero real do template
- Incluir proporções recomendadas (1:1, 9:16, 16:9)

### pacote-venda/ — obrigatório
- Criar `NOME-DO-TEMPLATE.zip` contendo `site/` + `docs/`
- Testar conteúdo do ZIP após criar
- ZIP nunca deve ultrapassar 10MB

### Como gerar o ZIP (PowerShell — padrão obrigatório)
```powershell
$src = "templates/NOME"
$zip = "$src/pacote-venda/NOME.zip"
$tmp = "_tmp_NOME"
New-Item -ItemType Directory -Path "$tmp/NOME" | Out-Null
Copy-Item "$src/site" "$tmp/NOME/site" -Recurse
New-Item -ItemType Directory -Path "$tmp/NOME/docs" | Out-Null
Copy-Item "$src/docs/README.md"          "$tmp/NOME/docs/"
Copy-Item "$src/docs/COMO-EDITAR.md"     "$tmp/NOME/docs/"
Copy-Item "$src/docs/LICENCA-DE-USO.txt" "$tmp/NOME/docs/"
Copy-Item "$src/docs/README.md"          "$tmp/NOME/"
Copy-Item "$src/docs/COMO-EDITAR.md"     "$tmp/NOME/"
Copy-Item "$src/docs/LICENCA-DE-USO.txt" "$tmp/NOME/"
Compress-Archive -Path "$tmp/NOME" -DestinationPath $zip -Force
Remove-Item $tmp -Recurse -Force
```

### Fallback — o que fazer quando não for possível gerar automaticamente
| Pasta | Fallback obrigatório |
|---|---|
| `preview/screenshots/` | Criar `INSTRUCOES-PRINTS.md` com viewport, seções e nomes |
| `preview/mockups/` | Criar `INSTRUCOES-MOCKUP.md` com ferramenta e fonte da imagem |
| `preview/thumbnails/` | Criar `IDEIAS-THUMBNAILS.txt` — nunca omitir |
| `produto/` | Não tem fallback — criar sempre, sem exceção |
| `pacote-venda/` | Não tem fallback — criar sempre, sem exceção |

---

## 15. Checklist Final Obrigatório

Um template só pode ser marcado como **FINALIZADO** se todos os itens estiverem marcados:

### Site
- [ ] `index.html` abre sem erros no navegador
- [ ] Nenhum erro no console do DevTools
- [ ] Responsivo em 390px, 768px e 1440px
- [ ] Menu mobile funciona
- [ ] Todos os links funcionam
- [ ] Botões de WhatsApp com link correto (ou placeholder claro)
- [ ] Animações funcionando
- [ ] Sem overflow horizontal em nenhum breakpoint
- [ ] `color-scheme` declarado

### Código
- [ ] HTML semântico
- [ ] CSS com variáveis
- [ ] JS sem console.log
- [ ] Sem código morto
- [ ] Imagens com alt

### Pasta
- [ ] Estrutura conforme padrão (site/, preview/, produto/, docs/, pacote-venda/)
- [ ] Nomes de arquivo sem espaço ou acento

### Documentação
- [ ] `README.md` preenchido
- [ ] `COMO-EDITAR.md` com instruções claras
- [ ] `LICENCA-DE-USO.txt` presente

### Materiais de venda
- [ ] `descricao-cakto.txt`
- [ ] `copy-venda.txt`
- [ ] `legenda-instagram.txt`
- [ ] `legenda-tiktok.txt`
- [ ] `hashtags.txt`
- [ ] `roteiro-video.txt`

### Visual
- [ ] Screenshots desktop tirados (ou instruções criadas)
- [ ] Screenshots mobile tirados (ou instruções criadas)
- [ ] Pelo menos 1 mockup preparado

### Publicação
- [ ] ZIP gerado em `pacote-venda/`
- [ ] ZIP testado (abrir e verificar conteúdo)
- [ ] Demo integrada em `templux-site/demos/`
- [ ] Página de produto criada em `templux-site/`
- [ ] Card adicionado em `catalogo.html`
- [ ] Link Cakto configurado (ou aguardando fornecimento)
- [ ] Commit feito com mensagem descritiva
- [ ] Push para GitHub
- [ ] Deploy Netlify confirmado

---

## 16. Estrutura Atual do Projeto

```
templux/
├── CLAUDE.md                      ← este arquivo
├── netlify.toml                   ← deploy config (publish: templux-site/)
├── templux-site/                  ← site de vendas publicado no Netlify
│   ├── index.html
│   ├── catalogo.html
│   ├── produto-black-edge-barber.html
│   ├── produto-clinica-sorria.html
│   ├── sobre.html
│   ├── contato.html
│   ├── style.css
│   ├── script.js
│   ├── assets/images/products/    ← screenshots dos produtos
│   └── demos/
│       ├── black-edge-barber/     ← template barbearia (ao vivo)
│       └── clinica-sorria/        ← template clínica (ao vivo)
├── templates/                     ← pasta para novos templates (estrutura padrão)
│   ├── black-edge-barber/         ← template existente
│   └── clinica-sorria/            ← template existente
└── template-clinica-temp/         ← rascunho (migrar para templates/ quando finalizar)
```

---

## 17. Fluxo Completo — Criação de Novo Template

```
1. RECEBER BRIEFING
   └── nicho, estilo, referências, funcionalidades

2. CRIAR ESTRUTURA
   └── mkdir templates/NOME/{site,preview,produto,docs,pacote-venda}

3. DESENVOLVER
   └── index.html + style.css + script.js + assets/

4. REVISAR (checklist de código)

5. TIRAR SCREENSHOTS
   └── Puppeteer ou instruções manuais

6. CRIAR MATERIAIS DE VENDA
   └── produto/*.txt

7. GERAR ZIP
   └── pacote-venda/NOME.zip

8. INTEGRAR AO SITE
   └── demos/ + produto-*.html + catalogo.html

9. AGUARDAR LINK CAKTO
   └── substituir LINK_DA_CAKTO_AQUI quando receber

10. COMMITAR E PUBLICAR
    └── git add → commit → push → Netlify deploy

11. MARCAR COMO FINALIZADO
    └── checklist completo preenchido
```

---

*Templux — Feito para vender.*
