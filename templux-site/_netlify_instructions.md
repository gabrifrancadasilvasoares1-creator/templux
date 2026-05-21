# Templux — Guia de Hospedagem no Netlify

## Qual pasta arrastar

Arraste a pasta inteira:

```
templux-site/
```

Essa pasta contém tudo que o Netlify precisa: index.html na raiz, CSS, JS, imagens e a pasta demos/.

---

## Passo a passo: deploy manual

1. Acesse: https://app.netlify.com
2. Clique em **"Add new site"** → **"Deploy manually"**
3. Arraste a pasta `templux-site/` para a área de upload
4. Aguarde alguns segundos — o Netlify gera uma URL automática tipo:
   ```
   https://nome-aleatorio.netlify.app
   ```
5. Pronto. Seu site está no ar.

---

## Configurar domínio personalizado (opcional)

1. No painel do Netlify: **Site settings → Domain management**
2. Clique em **"Add custom domain"**
3. Digite seu domínio (ex: templux.com.br)
4. Configure os DNS conforme instruído — geralmente é só apontar um registro A ou CNAME

---

## Onde trocar LINK_DA_CAKTO_AQUI

Esse placeholder aparece em **3 lugares**. Depois de criar sua página de checkout na Cakto, substitua nos arquivos abaixo:

| Arquivo | Onde | Uso |
|---|---|---|
| `index.html` | linha ~243 | Botão "Comprar agora" no card de destaque da home |
| `catalogo.html` | linha ~84 | Botão "Comprar →" no cartão do catálogo |
| `produto-black-edge-barber.html` | linha ~228 | Botão principal da sidebar (o grande, com animação) |

### Como substituir (forma rápida)

No VS Code: **Ctrl+Shift+H** → buscar por `LINK_DA_CAKTO_AQUI` → substituir pelo link real.

Exemplo de link Cakto:
```
https://pay.cakto.com.br/XXXXX
```

---

## Qual link colocar na Cakto como "Página de Vendas"

Na Cakto, quando configurar seu produto, o campo **"URL da página de vendas"** deve receber:

```
https://SEU-SITE.netlify.app/produto-black-edge-barber.html
```

Troque `SEU-SITE.netlify.app` pela URL real que o Netlify gerou.

---

## A demo do Black Edge Barber

O template real está disponível em:

```
templux-site/demos/black-edge-barber/index.html
```

Após o deploy, a demo ficará acessível em:

```
https://SEU-SITE.netlify.app/demos/black-edge-barber/index.html
```

O botão "Ver demo do template" na página do produto já aponta para esse caminho.

---

## Estrutura final do projeto

```
templux-site/                      ← ESTA é a pasta que vai pro Netlify
├── index.html                     ← home
├── catalogo.html                  ← catalogo
├── produto-black-edge-barber.html ← pagina do produto
├── sobre.html
├── contato.html
├── style.css
├── script.js
├── _netlify_instructions.md       ← este arquivo
├── assets/
│   └── images/
│       └── products/
│           ├── black-edge-cover.jpg
│           ├── black-edge-desktop.jpg
│           ├── black-edge-mobile.jpg
│           ├── black-edge-gallery-1.jpg
│           └── black-edge-gallery-2.jpg
└── demos/
    └── black-edge-barber/         ← template real (demo ao vivo)
        ├── index.html
        ├── style.css
        ├── script.js
        └── assets/
            └── icons/
                └── favicon.svg
```

---

## Checklist antes de publicar

- [ ] Substituiu todos os `LINK_DA_CAKTO_AQUI` pelo link real da Cakto
- [ ] Testou a demo abrindo `demos/black-edge-barber/index.html` localmente
- [ ] Atualizou o WhatsApp em `contato.html` e no template da demo
- [ ] Atualizou o e-mail de contato
- [ ] Testou no celular (responsividade)
- [ ] Configurou domínio personalizado no Netlify (opcional)

---

## Para adicionar novos templates no futuro

1. Extraia o novo template em `demos/nome-do-template/`
2. No `catalogo.html`, duplique o card do Black Edge Barber
3. Troque as infos (nome, imagem, categoria, link)
4. Remova a classe `coming-soon` e o `.coming-soon-overlay` do novo card
5. Crie as imagens em `assets/images/products/` com os nomes corretos
6. Crie a página `produto-nome-do-template.html` copiando o modelo existente
7. Atualize o `LINK_DA_CAKTO_AQUI` do novo produto

---

*Gerado automaticamente — Templux 2025*
