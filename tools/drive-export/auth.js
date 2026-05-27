'use strict';
/**
 * auth.js — rode UMA VEZ para autenticar com o Google Drive.
 * Gera token.json que será usado pelo upload.js.
 *
 * Uso: node auth.js
 */

const fs   = require('fs');
const path = require('path');
const http = require('http');
const url  = require('url');
const { google } = require('googleapis');

const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH       = path.join(__dirname, 'token.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

if (!fs.existsSync(CREDENTIALS_PATH)) {
  console.error('\n❌ credentials.json não encontrado em tools/drive-export/');
  console.error('   Siga o README.md para baixar as credenciais do Google Cloud.\n');
  process.exit(1);
}

const creds  = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
const { client_id, client_secret, redirect_uris } = creds.installed || creds.web;

const oAuth2 = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3000/callback');

const authUrl = oAuth2.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: SCOPES,
});

console.log('\n🔐 Autenticando com o Google Drive...');
console.log('\n1. Abrindo navegador. Se não abrir automaticamente, acesse:');
console.log('\n   ' + authUrl + '\n');

// Tenta abrir o navegador
const { exec } = require('child_process');
exec(`start "" "${authUrl}"`, err => { if (err) console.log('   (Abra o link manualmente)'); });

// Servidor local para capturar o callback OAuth
const server = http.createServer(async (req, res) => {
  const qs = new url.URL(req.url, 'http://localhost:3000').searchParams;
  const code = qs.get('code');
  if (!code) { res.end('Sem código. Tente novamente.'); return; }

  res.end('<h2>✅ Autenticado! Feche esta aba e volte ao terminal.</h2>');
  server.close();

  try {
    const { tokens } = await oAuth2.getToken(code);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
    console.log('✅ token.json salvo em tools/drive-export/');
    console.log('   Agora rode: node upload.js NOME-DO-TEMPLATE\n');
  } catch (e) {
    console.error('❌ Erro ao obter token:', e.message);
  }
});

server.listen(3000, () => {
  console.log('2. Aguardando callback na porta 3000...\n');
});
