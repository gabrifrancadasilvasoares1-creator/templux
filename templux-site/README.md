# Templux — Site de Vendas de Templates

> Templates premium HTML/CSS/JS para pequenos negócios.

---

## Estrutura do projeto

```
templux-site/
├── index.html                      → Página inicial
├── catalogo.html                   → Catálogo com filtros e busca
├── produto-black-edge-barber.html  → Página do produto (modelo)
├── sobre.html                      → Sobre a Templux
├── contato.html                    → Contato e suporte
├── style.css                       → Design system completo
├── script.js                       → JavaScript global
├── README.md                       → Este arquivo
├── LICENSE.txt                     → Licença de uso
└── assets/
    └── images/
        └── products/
            ├── black-edge-cover.jpg
            ├── black-edge-desktop.jpg
            ├── black-edge-mobile.jpg
            ├── black-edge-gallery-1.jpg
            └── black-edge-gallery-2.jpg
```

---

## Como abrir localmente

Abra o arquivo `index.html` diretamente no navegador.
Não é necessário nenhum servidor ou instalação.

---

## Configuração inicial obrigatória

### 1. Links de compra (Cakto)
Em todos os arquivos HTML, substitua:
```
LINK_DA_CAKTO_AQUI
```
pelo link real do produto no checkout da Cakto.

### 2. Link da demo
Na página do produto, substitua:
```
LINK_DA_DEMO_AQUI
```
pelo link público da demo online do template.

### 3. Contato
Substitua nos arquivos `contato.html` e nos footers:
- `5511999999999` → seu número de WhatsApp (só números, com DDD e DDI)
- `contato@templux.com.br` → seu e-mail real
- `instagram.com/templux` → seu @ no Instagram

---

## Como adicionar um novo produto

### Passo 1 — Duplicar a página do produto
Copie `produto-black-edge-barber.html` e renomeie:
```
produto-[nome-do-template].html
```

### Passo 2 — Editar os dados na página
Substitua: nome, descrição, preço, imagens, links da Cakto e da demo.

### Passo 3 — Adicionar no catálogo
Abra `catalogo.html` e copie um bloco `<article class="product-card">`.
Configure os atributos:
- `data-cat` → categoria: `barbearia`, `salao`, `delivery`, `restaurante`, `negocios`, `landing`
- `data-name` → nome em minúsculas para busca

### Passo 4 — Adicionar na home (opcional)
Copie um card na seção `#templates` do `index.html` para destacar o produto.

### Passo 5 — Imagens
Coloque as imagens em `assets/images/products/`.
Convenção de nomes:
```
[nome]-cover.jpg       → Thumbnail (800×500px)
[nome]-desktop.jpg     → Preview desktop (800×500px)
[nome]-mobile.jpg      → Preview mobile (400×700px)
[nome]-gallery-1.jpg   → Galeria extra
[nome]-gallery-2.jpg   → Galeria extra
```

---

## Como hospedar

### Netlify (gratuito, recomendado)
1. Acesse netlify.com
2. Arraste a pasta `templux-site` para a área de upload
3. Pronto — seu site estará no ar em segundos

### Vercel (gratuito)
1. Acesse vercel.com
2. Importe o repositório ou faça upload manual
3. Configure o domínio personalizado se quiser

### Hostinger / HostGator (pago — domínio próprio)
1. Suba os arquivos via FTP ou gerenciador de arquivos
2. Coloque tudo na pasta `public_html`
3. Configure o domínio no painel

---

## Dicas de conversão

1. **Use imagens reais do template** — screenshots reais convertem muito mais que placeholders
2. **Tenha uma demo pública** — clientes precisam ver antes de comprar
3. **Responda rápido no WhatsApp** — tempo de resposta impacta diretamente as vendas
4. **Adicione depoimentos** — quando tiver compradores, adicione uma seção de reviews
5. **Aplique badge "Mais vendido"** — cria prova social no produto principal

---

## Personalização visual

O design system está em `style.css`. Para mudar as cores principais, edite as variáveis no topo do arquivo:

```css
:root {
  --accent: #8b5cf6;        /* Cor principal (roxo) */
  --accent-bright: #a78bfa; /* Versão mais clara */
  --bg-base: #080a0f;       /* Fundo da página */
}
```

---

## Suporte
- WhatsApp: wa.me/5511999999999
- E-mail: contato@templux.com.br
- Instagram: @templux

---

*Templux — Feito para vender.*
