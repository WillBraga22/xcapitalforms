// 1. Depois de publicar o Google Apps Script, cole a URL abaixo.
// 2. Exemplo: const SCRIPT_URL = 'https://script.google.com/macros/s/SEU_ID/exec';
const SCRIPT_URL = '';

const form = document.getElementById('leadForm');
const submitBtn = document.getElementById('submitBtn');
const message = document.getElementById('message');
const origemInput = document.getElementById('origem');

const params = new URLSearchParams(window.location.search);
const origem = params.get('origem');
if (origem) origemInput.value = origem;

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message show ${type}`;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!SCRIPT_URL) {
    showMessage('Falta configurar a URL do Google Apps Script no arquivo script.js.', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  message.className = 'message';

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    form.reset();
    if (origem) origemInput.value = origem;
    showMessage('Pré-qualificação recebida com sucesso. A equipe da X Capital vai analisar suas respostas e entrar em contato.', 'success');
  } catch (error) {
    showMessage('Não foi possível enviar agora. Tente novamente em alguns instantes.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar pré-qualificação';
  }
});
