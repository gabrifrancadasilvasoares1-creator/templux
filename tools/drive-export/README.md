# Templux — Drive Export

Faz upload dos ZIPs de templates para o Google Drive e gera links diretos de download para usar na Cakto.

---

## Pré-requisitos

- Node.js instalado
- Conta Google com a pasta **Templux** já criada no Drive

---

## Passo 1 — Pegar o ID da pasta Templux no Google Drive

1. Acesse [drive.google.com](https://drive.google.com)
2. Abra a pasta **Templux**
3. Olhe a URL — ela terá este formato:
   ```
   https://drive.google.com/drive/folders/1ABCxyz123456789
   ```
4. O ID é a parte depois de `/folders/` — ex: `1ABCxyz123456789`

---

## Passo 2 — Criar o drive-config.json

```bash
cp drive-config.example.json drive-config.json
```

Edite `drive-config.json` e coloque o ID da pasta:

```json
{
  "driveFolderId": "1ABCxyz123456789",
  "templatesRoot": "../../templates"
}
```

> ⚠️ `drive-config.json` está no `.gitignore` — nunca vai pro GitHub.

---

## Passo 3 — Criar credenciais no Google Cloud

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um projeto (ex: "Templux Upload")
3. No menu: **APIs e serviços → Biblioteca**
4. Busque **Google Drive API** → clique em **Ativar**
5. Vá em **APIs e serviços → Credenciais**
6. Clique em **Criar credenciais → ID do cliente OAuth**
7. Tipo de aplicativo: **App para computador**
8. Nome: `Templux Drive`
9. Clique em **Criar**
10. Clique em **Baixar JSON**
11. Renomeie o arquivo baixado para `credentials.json`
12. Mova para esta pasta: `tools/drive-export/credentials.json`

> ⚠️ `credentials.json` está no `.gitignore` — nunca vai pro GitHub.

---

## Passo 4 — Configurar a tela de consentimento OAuth

1. Ainda no Google Cloud, vá em **APIs e serviços → Tela de consentimento OAuth**
2. Tipo: **Externo** → Criar
3. Preencha nome do app (ex: "Templux"), e-mail de suporte
4. Salve sem configurar escopos adicionais
5. Em **Usuários de teste**, adicione seu e-mail do Google
6. Salve

---

## Passo 5 — Autenticar (rode uma vez)

```bash
cd tools/drive-export
npm install
node auth.js
```

- Abre o navegador automaticamente
- Faça login com sua conta Google
- Autorize o acesso ao Drive
- O `token.json` é salvo automaticamente

---

## Passo 6 — Fazer upload

```bash
# Um template específico
node upload.js devfolio-dark
node upload.js barbearia-imperial
node upload.js clinica-estetica-aura
node upload.js academia-premium

# Todos de uma vez
node upload.js all
```

O script vai:
1. Criar subpasta com nome do template dentro da pasta Templux no Drive
2. Fazer upload do ZIP
3. Tornar o arquivo público por link
4. Gerar link direto de download
5. Salvar em `templates/NOME/produto/link-download-cakto.txt`
6. Criar `templates/NOME/produto/email-entrega-cakto.txt`

---

## Onde usar o link gerado

O link gerado tem o formato:
```
https://drive.google.com/uc?export=download&id=FILE_ID
```

Este link funciona como entrega de produto na **Cakto**:
- Cole no campo "Link de entrega do produto" na Cakto
- O cliente clica e baixa diretamente, sem precisar de conta Google

---

## Arquivos protegidos (nunca vão pro GitHub)

| Arquivo | O que é |
|---|---|
| `credentials.json` | Chave OAuth do Google Cloud |
| `token.json` | Token de acesso gerado após o auth |
| `drive-config.json` | ID da pasta Templux no Drive |

---

## Renovar token (se expirar)

Basta rodar `node auth.js` novamente.
