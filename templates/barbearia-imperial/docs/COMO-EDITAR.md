# Como Editar — Imperial Barber Club

## 1. Trocar o nome e informações da barbearia

Abra `index.html` e localize as seguintes partes:

- **Nome da barbearia:** procure `Imperial Barber Club` e substitua pelo nome real
- **Endereço:** procure `R. das Palmeiras, 42 — São Paulo` e atualize
- **Horário:** procure `Seg–Sex: 09h–20h` e atualize
- **Telefone de exibição:** procure `(11) 9 9999-9999` e atualize

---

## 2. Configurar o link de agendamento / contato (obrigatório)

Todos os botões de "Agendar Horário", "Reservar", "Entrar em Contato" estão com o texto `LINK_CAKTO_AQUI`. Você pode substituir por **qualquer link** que preferir:

**WhatsApp (mais comum para barbearia):**
```
https://wa.me/5511999999999?text=Olá, quero agendar um horário!
```

**Link de agenda online (Calendly, Booksy, etc.):**
```
https://calendly.com/seu-usuario
```

**Apenas abrir conversa no WhatsApp:**
```
https://api.whatsapp.com/send?phone=5511999999999
```

Substitua **todas** as ocorrências de `LINK_CAKTO_AQUI` no arquivo `index.html` de uma vez (use Ctrl+H no editor).

---

## 3. Trocar o número de WhatsApp do botão flutuante

No `index.html`, procure:
```
href="https://wa.me/5511999999999"
```
Substitua `5511999999999` pelo número real no formato: `55` + DDD + número (sem espaços ou traços).

---

## 4. Mudar as cores

Abra `style.css` e localize o bloco `:root` no início do arquivo:

```css
:root {
  --gold: #c9a84c;       /* cor dourada principal */
  --gold-light: #e8c97a; /* dourado mais claro */
  --bg: #080808;          /* fundo escuro */
  --surface: #111111;     /* cards e superfícies */
  --text: #f5f5f0;        /* texto principal */
}
```

Altere os valores hexadecimais para personalizar as cores.

---

## 5. Trocar os serviços e preços

No `index.html`, procure a seção `<section id="servicos">`. Cada serviço segue este padrão:

```html
<div class="service-card">
  <div class="service-card__icon">
    <!-- ícone SVG aqui -->
  </div>
  <h3 class="service-card__name">Nome do Serviço</h3>
  <p class="service-card__desc">Descrição do serviço.</p>
  <div class="service-card__price">R$ 65</div>
</div>
```

Altere o nome, descrição e preço conforme necessário. O card com classe `service-card--featured` é o destaque (aparece com borda dourada).

---

## 6. Trocar os barbeiros

Na seção `<section id="equipe">`, cada barbeiro tem:

```html
<div class="barber-card">
  <div class="barber-card__photo">
    <img src="assets/images/barber-1.jpg" alt="Nome do Barbeiro" />
  </div>
  <h3 class="barber-card__name">Nome do Barbeiro</h3>
  <p class="barber-card__role">Especialidade</p>
  <div class="barber-card__tags">
    <span>Tag 1</span>
    <span>Tag 2</span>
  </div>
</div>
```

- Substitua as imagens em `assets/images/` pelos retratos reais dos barbeiros
- Use fotos quadradas (1:1) para melhor resultado

---

## 7. Trocar as fotos da galeria

As imagens da galeria estão referenciadas no `index.html` como:
```
assets/images/gallery-1.jpg
assets/images/gallery-2.jpg
...
```

Substitua os arquivos na pasta `assets/images/` mantendo os mesmos nomes, ou atualize os `src` no HTML.

---

## 8. Alterar os depoimentos

Na seção `<section id="depoimentos">`, cada depoimento tem:

```html
<div class="testimonial-card">
  <p class="testimonial-card__text">"Texto do depoimento."</p>
  <div class="testimonial-card__author">
    <strong>Nome do Cliente</strong>
    <span>Cargo ou Descrição</span>
  </div>
</div>
```

---

## 9. Personalizar o rodapé

No `<footer>`, atualize:
- Endereço completo
- Horários de funcionamento
- Links de redes sociais (Instagram, Facebook)
- E-mail de contato

---

## Dica final

Após editar, abra o `index.html` diretamente no navegador para ver as alterações. Não precisa de servidor ou instalação de nada.
