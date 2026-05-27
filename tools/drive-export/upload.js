'use strict';
/**
 * upload.js — faz upload do ZIP de um template para o Google Drive.
 *
 * Uso:
 *   node upload.js devfolio-dark
 *   node upload.js barbearia-imperial
 *   node upload.js clinica-estetica-aura
 *   node upload.js academia-premium
 *   node upload.js all                    ← faz todos de uma vez
 */

const fs   = require('fs');
const path = require('path');
const { google } = require('googleapis');

const CONFIG_PATH      = path.join(__dirname, 'drive-config.json');
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH       = path.join(__dirname, 'token.json');

// Nomes amigáveis para as subpastas no Drive
const TEMPLATE_NAMES = {
  'academia-premium':      'Academia Premium',
  'barbearia-imperial':    'Barbearia Imperial',
  'devfolio-dark':         'DevFolio Dark',
  'clinica-estetica-aura': 'Clínica Estética Aura',
  'black-edge-barber':     'Black Edge Barber',
  'clinica-sorria':        'Clínica Sorria',
};

// ── helpers ──────────────────────────────────────────────────────────────────

function loadAuth() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('\n❌ credentials.json não encontrado. Rode o README.md primeiro.\n');
    process.exit(1);
  }
  if (!fs.existsSync(TOKEN_PATH)) {
    console.error('\n❌ token.json não encontrado. Rode: node auth.js\n');
    process.exit(1);
  }
  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_id, client_secret } = creds.installed || creds.web;
  const oAuth2 = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3000/callback');
  oAuth2.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH)));
  return oAuth2;
}

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('\n❌ drive-config.json não encontrado.');
    console.error('   Copie drive-config.example.json → drive-config.json e preencha o driveFolderId.\n');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH));
}

async function findOrCreateFolder(drive, parentId, name) {
  // Busca pasta existente
  const res = await drive.files.list({
    q: `'${parentId}' in parents and name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: 'files(id,name)',
    spaces: 'drive',
  });
  if (res.data.files.length > 0) {
    console.log(`  📁 Subpasta existente: ${name} (${res.data.files[0].id})`);
    return res.data.files[0].id;
  }
  // Cria nova pasta
  const folder = await drive.files.create({
    requestBody: { name, mimeType: 'application/vnd.google-apps.folder', parents: [parentId] },
    fields: 'id',
  });
  console.log(`  📁 Subpasta criada: ${name} (${folder.data.id})`);
  return folder.data.id;
}

async function uploadZip(drive, folderId, zipPath, fileName) {
  // Remove arquivo anterior com mesmo nome na mesma pasta
  const existing = await drive.files.list({
    q: `'${folderId}' in parents and name='${fileName}' and trashed=false`,
    fields: 'files(id)',
  });
  for (const f of existing.data.files) {
    await drive.files.delete({ fileId: f.id });
    console.log(`  🗑  Versão anterior removida (${f.id})`);
  }

  const res = await drive.files.create({
    requestBody: { name: fileName, parents: [folderId] },
    media: { mimeType: 'application/zip', body: fs.createReadStream(zipPath) },
    fields: 'id,name,size',
  });
  return res.data;
}

async function makePublic(drive, fileId) {
  await drive.permissions.create({
    fileId,
    requestBody: { role: 'reader', type: 'anyone' },
  });
}

function buildDownloadLink(fileId) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

function buildEmailEntrega(templateName, downloadLink, zipName) {
  return `Assunto: Seu template ${templateName} — link de download

Olá! Obrigado por comprar o ${templateName} da Templux 🎉

Aqui está o link para baixar seu template:

👉 ${downloadLink}

O arquivo ZIP contém:
- index.html — página principal
- style.css — todos os estilos
- script.js — animações e interatividade
- assets/ — ícones e imagens de exemplo
- docs/README.md — instruções rápidas
- docs/COMO-EDITAR.md — guia completo de personalização
- docs/LICENCA-DE-USO.txt — termos de uso

Dúvidas? Me chame no WhatsApp ou responda este e-mail.

Att,
Templux
templux.com.br
`;
}

// ── main ─────────────────────────────────────────────────────────────────────

async function processTemplate(drive, config, templateSlug) {
  const templatesRoot = path.resolve(__dirname, config.templatesRoot || '../../templates');
  const zipPath = path.join(templatesRoot, templateSlug, 'pacote-venda', `${templateSlug}.zip`);

  if (!fs.existsSync(zipPath)) {
    console.error(`\n⚠️  ZIP não encontrado: ${zipPath}`);
    return;
  }

  const friendlyName = TEMPLATE_NAMES[templateSlug] || templateSlug;
  console.log(`\n→ ${friendlyName}`);

  // 1. Subpasta no Drive
  const subfolderId = await findOrCreateFolder(drive, config.driveFolderId, friendlyName);

  // 2. Upload
  const fileName = `${templateSlug}.zip`;
  const kb = Math.round(fs.statSync(zipPath).size / 1024);
  console.log(`  ⬆  Enviando ${fileName} (${kb}KB)...`);
  const file = await uploadZip(drive, subfolderId, zipPath, fileName);
  console.log(`  ✓  Upload concluído — ID: ${file.id}`);

  // 3. Torna público
  await makePublic(drive, file.id);
  const link = buildDownloadLink(file.id);
  console.log(`  🔗 Link: ${link}`);

  // 4. Salva link-download-cakto.txt
  const produtoDir = path.join(templatesRoot, templateSlug, 'produto');
  fs.mkdirSync(produtoDir, { recursive: true });

  const linkFile = path.join(produtoDir, 'link-download-cakto.txt');
  fs.writeFileSync(linkFile, [
    `Template: ${friendlyName}`,
    `Arquivo:  ${fileName}`,
    ``,
    `Link direto de download (use no Cakto):`,
    link,
    ``,
    `Google Drive ID: ${file.id}`,
    `Gerado em: ${new Date().toLocaleString('pt-BR')}`,
  ].join('\n'));
  console.log(`  ✓  link-download-cakto.txt salvo`);

  // 5. Salva email-entrega-cakto.txt
  const emailFile = path.join(produtoDir, 'email-entrega-cakto.txt');
  fs.writeFileSync(emailFile, buildEmailEntrega(friendlyName, link, fileName));
  console.log(`  ✓  email-entrega-cakto.txt salvo`);
}

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.log('\nUso: node upload.js NOME-DO-TEMPLATE');
    console.log('     node upload.js all\n');
    console.log('Templates disponíveis:');
    Object.keys(TEMPLATE_NAMES).forEach(k => console.log(`  - ${k}`));
    process.exit(0);
  }

  const auth   = loadAuth();
  const config = loadConfig();
  const drive  = google.drive({ version: 'v3', auth });

  const targets = arg === 'all' ? Object.keys(TEMPLATE_NAMES) : [arg];

  for (const t of targets) {
    await processTemplate(drive, config, t);
  }

  console.log('\n✅ Pronto!\n');
}

main().catch(e => {
  console.error('\n❌ Erro:', e.message);
  if (e.response?.data) console.error(JSON.stringify(e.response.data, null, 2));
  process.exit(1);
});
