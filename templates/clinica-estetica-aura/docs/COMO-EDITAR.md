# Como Editar — Aura Clínica Estética

## 1. Trocar o nome e informações da clínica

Abra `index.html` e substitua:

- **Nome da clínica:** procure `Aura Clínica Estética` e troque pelo nome real
- **Endereço:** procure `Av. Brasil, 1.200 — Jardins, São Paulo` e atualize
- **Horário:** procure `Seg–Sáb: 09h–19h` e atualize
- **Telefone de exibição:** procure `(11) 9 8888-7777` e atualize

---

## 2. Configurar o link de agendamento (obrigatório)

Os botões "Agendar Avaliação Gratuita", "Agendar agora" etc. estão com o placeholder `LINK_CAKTO_AQUI`. Substitua pelo link de agendamento da sua clínica:

**WhatsApp (mais comum):**
```
https://wa.me/5511999999999?text=Olá, quero agendar uma avaliação!
```

**Link de agenda online (Doctoralia, Clinicorp, Calendly etc.):**
```
https://www.doctoralia.com.br/clinica/aura
```

Substitua **todas** as ocorrências de `LINK_CAKTO_AQUI` no `index.html` de uma vez (Ctrl+H no editor).

---

## 3. Trocar o número do botão de WhatsApp flutuante

No `index.html`, procure:
```
href="https://wa.me/5511999999999"
```
Substitua `5511999999999` pelo número real: `55` + DDD + número (sem espaços ou traços).

---

## 4. Mudar as cores

Abra `style.css` e localize o bloco `:root`:

```css
:root {
  --rose: #e8758a;      /* rosa principal */
  --rose-dark: #c45a70; /* rosa escuro (hover) */
  --blush: #fdf6f3;     /* fundo rosado suave */
  --bg: #fdfcfb;        /* fundo branco quente */
  --text: #2c2421;      /* texto escuro */
}
```

Para adaptar a outra paleta (ex: lilás para estética):
```css
--rose: #9b6bca;
--rose-dark: #7a4fa8;
```

---

## 5. Trocar os procedimentos

Na seção `<section id="procedimentos">`, cada card de procedimento tem:

```html
<div class="proc-card">
  <div class="proc-card__icon"><!-- SVG --></div>
  <h3 class="proc-card__title">Nome do Procedimento</h3>
  <p class="proc-card__desc">Descrição breve do procedimento.</p>
  <ul class="proc-card__list">
    <li>Benefício 1</li>
    <li>Benefício 2</li>
  </ul>
  <a href="LINK_CAKTO_AQUI" class="proc-card__cta">Agendar</a>
</div>
```

O card com classe `proc-card--wide` tem layout maior e ocupa 2 colunas.

---

## 6. Atualizar a equipe médica

Na seção `<section id="equipe">`:

```html
<div class="team-card">
  <div class="team-card__photo">
    <img src="assets/images/dr-1.jpg" alt="Dra. Nome Sobrenome" />
  </div>
  <div class="team-card__info">
    <h3>Dra. Nome Sobrenome</h3>
    <p class="team-card__specialty">Especialidade</p>
    <span class="team-card__crm">CRM 12345</span>
    <p class="team-card__bio">Mini bio da profissional.</p>
  </div>
</div>
```

- Substitua as fotos em `assets/images/` por fotos reais das profissionais
- Use fotos com proporção 3:4 (retrato) para melhor resultado

---

## 7. Atualizar os antes e depois

Na seção `<section id="resultados">`:

```html
<div class="result-card">
  <div class="result-card__images">
    <div class="result-card__img result-card__img--before">
      <img src="assets/images/before-1.jpg" alt="Antes" />
      <span>Antes</span>
    </div>
    <div class="result-card__img result-card__img--after">
      <img src="assets/images/after-1.jpg" alt="Depois" />
      <span>Depois</span>
    </div>
  </div>
  <h4>Nome do Procedimento</h4>
  <p>Descrição do resultado.</p>
</div>
```

Substitua as imagens em `assets/images/` pelos seus resultados reais.

---

## 8. Personalizar os depoimentos

Na seção `<section id="depoimentos">`:

```html
<div class="testimonial-card">
  <div class="testimonial-card__stars">★★★★★</div>
  <p>"Texto do depoimento."</p>
  <div class="testimonial-card__author">
    <strong>Nome da Paciente</strong>
    <span>Procedimento realizado</span>
  </div>
</div>
```

---

## 9. Personalizar o rodapé

No `<footer>`, atualize:
- Endereço e CEP completos
- Horários detalhados
- Links do Instagram e Facebook
- E-mail de contato

---

## Dica final

Abra o `index.html` diretamente no navegador para visualizar. O site usa tema claro e está protegido contra o modo escuro automático do Chrome/Edge.
