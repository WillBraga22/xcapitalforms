# Formulário de Pré-qualificação X Capital

Projeto em Vite para publicar na Vercel sem erro de 404.

## Arquivos principais

- `index.html`: entrada do site
- `src/main.jsx`: formulário, envio para Google Apps Script e botão do grupo de WhatsApp
- `src/styles.css`: visual do formulário
- `public/xcapital-predio.jpeg`: imagem usada no topo
- `google-apps-script.js`: código para colar no Apps Script da planilha

## Como publicar na Vercel

1. Suba todos os arquivos no GitHub, direto na raiz do repositório.
2. Importe o repositório na Vercel.
3. A Vercel deve detectar como Vite.
4. Use estas configurações:

Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install

## Como ligar na planilha

1. Crie uma planilha no Google Sheets.
2. Crie uma aba chamada `Leads`.
3. Vá em Extensões > Apps Script.
4. Cole o conteúdo de `google-apps-script.js`.
5. Publique como app da web.
6. Libere acesso para qualquer pessoa.
7. Copie a URL do Apps Script.
8. Cole a URL no arquivo `src/main.jsx`, na variável `SCRIPT_URL`.

## Grupo de WhatsApp

Depois que o lead envia o formulário com sucesso, aparece um botão para entrar no grupo oficial da palestra.

Para alterar o link do grupo, edite no arquivo `src/main.jsx`:

```js
const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/CMzZi47QRB4H3ETRaORxuJ';
```
