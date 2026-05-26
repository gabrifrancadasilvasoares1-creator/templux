# Como Editar — DevFolio Dark

## 1. Trocar nome e informações pessoais

Abra `index.html` e substitua:

- **Nome do dev:** procure `Alex Fernandes` e troque pelo seu nome
- **Título/cargo:** procure as roles no hero, como `Full Stack Developer`, `React Specialist` — elas ficam no `script.js` (veja seção 7)
- **E-mail de contato:** procure `alex@fernandes.dev` e troque pelo seu e-mail real
- **Cidade:** procure `São Paulo, Brasil` e atualize

---

## 2. Configurar o link de contato / contratação (obrigatório)

Os botões "Falar comigo", "Contratar agora" e similares estão com o placeholder `LINK_CAKTO_AQUI`. Para um portfólio dev, você pode usar:

**WhatsApp:**
```
https://wa.me/5511999999999?text=Olá, quero conversar sobre um projeto!
```

**Calendly (agendamento de call):**
```
https://calendly.com/seu-usuario/30min
```

**LinkedIn:**
```
https://linkedin.com/in/seu-perfil
```

**E-mail direto:**
```
mailto:seu@email.com
```

Substitua **todas** as ocorrências de `LINK_CAKTO_AQUI` no `index.html` de uma vez (Ctrl+H no editor).

> Dica: use Calendly se quiser que clientes agendem uma call diretamente. Use WhatsApp para contato mais informal.

---

## 3. Trocar as tecnologias da barra de skills

No `index.html`, procure a seção `<section id="skills">`. Cada skill tem:

```html
<div class="skill-item">
  <div class="skill-item__header">
    <span>React</span>
    <span>95%</span>
  </div>
  <div class="skill-bar">
    <div class="skill-bar__fill" data-width="95"></div>
  </div>
</div>
```

Altere o nome e o `data-width` (0–100) para refletir seu nível real em cada tecnologia.

---

## 4. Atualizar os projetos

Na seção `<section id="projetos">`, cada projeto segue este padrão:

```html
<div class="project-card">
  <div class="project-card__meta">
    <span class="project-card__type">Web App</span>
    <div class="project-card__links">
      <a href="https://github.com/seu-usuario/projeto" target="_blank">GitHub</a>
      <a href="https://seu-projeto.vercel.app" target="_blank">Live</a>
    </div>
  </div>
  <h3 class="project-card__title">Nome do Projeto</h3>
  <p class="project-card__desc">Descrição do projeto.</p>
  <div class="project-card__tags">
    <span>React</span>
    <span>Node.js</span>
  </div>
</div>
```

- Substitua os links do GitHub e do deploy real
- O card com classe `project-card--featured` é o destaque (ocupa mais espaço)

---

## 5. Mudar as cores

Abra `style.css` e localize o bloco `:root`:

```css
:root {
  --neon: #00ff87;     /* cor verde neon principal */
  --purple: #a855f7;   /* roxo secundário */
  --bg: #060608;       /* fundo escuro */
  --surface: #0d0d10;  /* cards e painéis */
}
```

Para trocar o verde neon por azul elétrico, por exemplo:
```css
--neon: #00b4ff;
```

---

## 6. Alterar a timeline de experiência

Na seção `<section id="sobre">`, a timeline tem itens no formato:

```html
<div class="timeline-item">
  <div class="timeline-item__dot"></div>
  <div class="timeline-item__content">
    <span class="timeline-item__period">2022 – Atual</span>
    <h4>Cargo — Empresa</h4>
    <p>Descrição do que fez.</p>
  </div>
</div>
```

---

## 7. Mudar os cargos do efeito de digitação

Abra `script.js` e localize:

```js
const roles = [
  'Full Stack Developer',
  'React Specialist',
  'Node.js Engineer',
  'UI/UX Enthusiast'
];
```

Substitua pelas suas especialidades reais.

---

## 8. Terminal decorativo

O terminal no hero é puramente decorativo (visual). Para personalizar o texto que aparece nele, procure no `index.html` a div com classe `terminal__body` e edite as linhas com classes `t-prompt`, `t-output`, `t-key`, `t-hash`.

---

## 9. Links de redes sociais

No `index.html`, procure os links de LinkedIn e GitHub:

```html
<a href="#" target="_blank" rel="noopener">LinkedIn</a>
<a href="#" target="_blank" rel="noopener">GitHub</a>
```

Substitua `#` pela URL real do seu perfil.

---

## Dica final

Abra o `index.html` diretamente no navegador para visualizar. O cursor personalizado só aparece em desktop (em toque/mobile é desativado automaticamente).
