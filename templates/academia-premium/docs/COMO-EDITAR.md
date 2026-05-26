# Como Editar — Academia Premium

## Informações básicas

### Nome da academia
Busque e substitua `IronForce Gym` e `IronForce` pelo nome real.

### WhatsApp
Substitua todas as ocorrências de `5511999999999` pelo número com DDI (ex: `5521998887766`).

### Link de pagamento
Substitua `LINK_CAKTO_AQUI` pelo link gerado no Cakto.

---

## Cores (style.css — :root)

| Variável       | Valor padrão | Uso                    |
|----------------|--------------|------------------------|
| `--orange`     | `#f97316`    | Cor de destaque        |
| `--yellow`     | `#eab308`    | Detalhes secundários   |
| `--bg`         | `#0a0a0a`    | Fundo principal        |
| `--surface`    | `#1a1a1a`    | Fundo dos cards        |

Para mudar a cor principal, altere `--orange` e `--orange-glow`.

---

## Seções

### Hero
- Altere o título em `.hero__title`
- Troque a imagem Unsplash pelo URL de sua foto ou caminho local
- Os counters usam `data-target="N"` — ajuste os números

### Programas
- Cada card tem `data-color="orange|yellow|red|blue"`
- Edite título, descrição e lista de benefícios em cada `.program-card`

### Planos
- Preços nos `.plan-card__price`
- Features em `.plan-card__features li`
- O card com `.plan-card--featured` é o destacado (mais popular)

### FAQ
- Adicione/remova `.faq-item` dentro de `#faqList`
- Cada item tem um `<button>` (pergunta) e `.faq-answer p` (resposta)

---

## Imagens

Para usar imagens locais, salve em `assets/images/` e referencie assim:

```html
<img src="assets/images/foto-academia.jpg" alt="Academia" />
```

Para manter o Unsplash, basta deixar os links como estão — eles carregam via CDN.

---

## Fontes

Sora e Space Grotesk são carregadas do Google Fonts. Para usar offline, baixe em [fonts.google.com](https://fonts.google.com) e atualize o `<link>` no `<head>`.
