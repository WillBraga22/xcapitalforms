# Formulário de Pré-qualificação X Capital

Projeto simples em HTML, CSS e JavaScript para subir direto na Vercel.

## Arquivos

- `index.html`: página do formulário
- `styles.css`: visual da página
- `script.js`: envio dos dados para o Google Apps Script
- `google-apps-script.js`: código da planilha
- `vercel.json`: configuração simples da Vercel
- `public/xcapital-predio.jpeg`: imagem usada no topo

## Como subir no GitHub

Suba todos os arquivos na raiz do repositório.

A estrutura precisa ficar assim:

```txt
public/
README.md
index.html
styles.css
script.js
google-apps-script.js
vercel.json
```

Não coloque tudo dentro de uma pasta extra.

## Configuração na Vercel

Ao importar o repositório:

- Framework Preset: Other
- Root Directory: deixar vazio
- Build Command: deixar vazio
- Output Directory: deixar vazio
- Install Command: deixar vazio

Este projeto não precisa de `package.json`.

## Como ligar na planilha

1. Crie uma planilha no Google Sheets.
2. Crie uma aba chamada `Leads`.
3. Vá em Extensões > Apps Script.
4. Apague o código padrão.
5. Cole o conteúdo do arquivo `google-apps-script.js`.
6. Clique em Implantar > Nova implantação.
7. Tipo: App da Web.
8. Executar como: você mesmo.
9. Quem pode acessar: qualquer pessoa.
10. Copie a URL do App da Web.
11. Cole essa URL no arquivo `script.js`, nesta linha:

```js
const SCRIPT_URL = '';
```

Ela deve ficar assim:

```js
const SCRIPT_URL = 'https://script.google.com/macros/s/SEU_ID/exec';
```

Depois faça commit no GitHub e redeploy na Vercel.
