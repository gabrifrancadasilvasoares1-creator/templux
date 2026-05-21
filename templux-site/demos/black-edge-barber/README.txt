╔══════════════════════════════════════════════════════════╗
║          BLACK EDGE BARBER — Template Premium            ║
║                      Versão 1.0                          ║
╚══════════════════════════════════════════════════════════╝

Obrigado por adquirir este template!
Este guia vai te ajudar a personalizar e publicar seu site
em poucos minutos, mesmo sem experiência avançada em código.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ESTRUTURA DE ARQUIVOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  template-barbearia/
  │
  ├── index.html      ← Estrutura do site (textos e seções)
  ├── style.css       ← Visual (cores, fontes, espaçamentos)
  ├── script.js       ← Interações (menu, animações, etc.)
  │
  ├── assets/
  │   ├── images/     ← Coloque suas fotos aqui
  │   ├── icons/      ← Favicon e ícones
  │   └── fonts/      ← Fontes locais (se quiser usar offline)
  │
  ├── README.txt      ← Este arquivo
  └── LICENSE.txt     ← Licença de uso


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  COMO ABRIR O SITE LOCALMENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  1. Abra a pasta template-barbearia/
  2. Dê dois cliques em index.html
  3. O site abrirá no seu navegador padrão

  ⚠️  Recomendado: use o VS Code com a extensão
      "Live Server" para ver atualizações em tempo real.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  COMO TROCAR OS TEXTOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Abra o arquivo index.html em qualquer editor de texto
  (Bloco de Notas, VS Code, Sublime Text, etc.)

  ► Nome da barbearia:
    Procure por "Black Edge" ou "BlackEdge" e substitua
    pelo nome da sua barbearia. Repita em todas as ocorrências.

  ► Endereço e telefone:
    Procure por "Rua Exemplo, 123" e "(11) 99999-9999"
    e substitua pelos dados reais.

  ► Horário de funcionamento:
    Procure por "9h às 20h" e ajuste conforme necessário.

  ► Serviços e preços:
    Cada serviço está dentro de uma div class="servico-card".
    Edite o título, descrição e preço de cada um.

  ► Depoimentos:
    Cada depoimento está em uma div class="depo-card".
    Troque nome, tempo como cliente e texto do depoimento.

  💡 Dica: Use Ctrl+H no VS Code para buscar e substituir
     todas as ocorrências de uma vez!


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  COMO TROCAR AS IMAGENS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Método 1 — Imagens locais (recomendado para produção):

    1. Copie suas fotos para a pasta assets/images/
    2. Renomeie-as de forma simples (ex: hero.jpg, galeria-1.jpg)
    3. No index.html, localize as tags <img> e troque o src:
       Antes: src="https://images.unsplash.com/..."
       Depois: src="assets/images/hero.jpg"

  Método 2 — Links externos:
    Você pode simplesmente substituir o link do Unsplash
    por qualquer outro link de imagem da internet.

  📌 Tamanhos recomendados:
     Hero principal:  1200 x 1500 px (proporção 4:5)
     Galeria:         800 x 600 px (paisagem)
     Galeria tall:    600 x 1200 px (retrato)
     Sobre:           800 x 1000 px
     Depoimentos:     96 x 96 px (avatar, quadrado)

  📌 Formatos recomendados: .jpg ou .webp (mais leve)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  COMO TROCAR AS CORES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Abra o arquivo style.css e vá até a seção:
  "1. VARIÁVEIS (Troque aqui para mudar cores)"

  As principais variáveis são:

  --color-bg:       Cor do fundo principal    (padrão: #0a0a0a)
  --color-surface:  Cor dos cards             (padrão: #141414)
  --color-gold:     Cor de destaque/acento    (padrão: #c9a84c)
  --color-text:     Cor do texto principal    (padrão: #f0ede6)

  💡 Para criar outras variações de tema, sugestões:

     Tema Azul/Navy:
       --color-gold: #4a90d9
       --color-gold-light: #74b0f0

     Tema Vermelho/Bold:
       --color-gold: #e03a3a
       --color-gold-light: #f06060

     Tema Verde/Premium:
       --color-gold: #3aad7b
       --color-gold-light: #5ecf9a

     Tema Claro (light mode):
       --color-bg: #f8f5f0
       --color-surface: #ffffff
       --color-text: #1a1a1a
       --color-gold: #c9a84c


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  COMO CONFIGURAR O WHATSAPP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  No index.html, procure por:
  wa.me/5511999999999

  Substitua "5511999999999" pelo número completo com DDD,
  sem espaços ou caracteres especiais.

  Exemplo para o número (21) 98888-7777:
  wa.me/5521988887777

  Você pode trocar a mensagem pré-preenchida alterando o
  parâmetro "text=" na URL. Use %20 para espaços.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  COMO PUBLICAR O SITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  OPÇÃO 1 — Netlify (grátis, recomendado para iniciantes):
    1. Acesse netlify.com e crie uma conta gratuita
    2. Arraste toda a pasta do template para o painel
    3. O site vai ao ar em segundos com URL grátis
    4. Conecte seu domínio próprio nas configurações

  OPÇÃO 2 — GitHub Pages (grátis):
    1. Crie uma conta em github.com
    2. Crie um repositório com os arquivos
    3. Ative GitHub Pages nas configurações do repositório
    4. Acesse via seuusuario.github.io/nome-do-repositorio

  OPÇÃO 3 — Hospedagem tradicional (cPanel):
    1. Acesse o painel da sua hospedagem
    2. Vá em "Gerenciador de arquivos" → public_html
    3. Envie todos os arquivos da pasta do template
    4. Certifique-se de que index.html está na raiz

  OPÇÃO 4 — Vercel (grátis, muito rápido):
    1. Acesse vercel.com e conecte com GitHub
    2. Importe o repositório com os arquivos
    3. Deploy automático a cada atualização


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SEO — MELHORAR SEU POSICIONAMENTO NO GOOGLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  No topo do index.html, edite estas tags:

  <title> — Nome da barbearia + palavra-chave + cidade
  Exemplo: "Barbearia Premium | Cortes Masculinos em São Paulo"

  <meta name="description"> — Descrição de 150-160 caracteres
  Exemplo: "Barbearia especializada em cortes modernos, barba e
  tratamentos em São Paulo. Agende agora pelo WhatsApp."

  <meta name="keywords"> — Palavras-chave separadas por vírgula
  Exemplo: "barbearia são paulo, corte cabelo masculino, barba"

  💡 Quanto mais específico o nome da sua cidade, bairro e
     serviços, mais fácil de aparecer nas buscas locais!


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SUPORTE E DÚVIDAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Se precisar de ajuda com customização adicional,
  consulte a plataforma onde adquiriu este template.

  Boa sorte com o seu negócio! ✦

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
