import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwyI9okq2Nbx5Ys9Bz2DQHl3-IctlpSlyApaQjmcw1Cyd77nqxiikxO8RGlnzCfGhKp/exec';

const initialForm = {
  nome: '',
  whatsapp: '',
  cidadeEstado: '',
  perfil: '',
  faturamento: '',
  objetivo: '',
  contribuicao: '',
  prazo: '',
  conhecimento: '',
  horario: '',
  origem: 'xcapital-formulario'
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');
    setMessage('Enviando suas informações...');

    if (!SCRIPT_URL || SCRIPT_URL.includes('COLE_AQUI')) {
      setStatus('error');
      setMessage('Configure a URL do Google Apps Script no arquivo src/main.jsx antes de publicar.');
      return;
    }

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, dataEnvio: new Date().toLocaleString('pt-BR') })
      });

      setStatus('success');
      setMessage('Cadastro recebido com sucesso. A equipe da X Capital vai analisar seu perfil e entrar em contato.');
      setForm(initialForm);
    } catch (error) {
      setStatus('error');
      setMessage('Não foi possível enviar agora. Tente novamente ou chame a equipe da X Capital pelo WhatsApp.');
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <div className="overlay"></div>
        <div className="heroContent">
          <div className="brand">XC</div>
          <p className="kicker">X Capital Partners</p>
          <h1>Descubra qual estratégia combina melhor com seu momento financeiro</h1>
          <p className="subtitle">
            Responda algumas perguntas rápidas para entendermos seu perfil e identificar o melhor caminho para aquisição, investimento ou construção patrimonial.
          </p>
        </div>
      </section>

      <section className="formWrap">
        <form className="card" onSubmit={handleSubmit}>
          <h2>Pré-qualificação</h2>
          <p className="intro">Suas respostas ajudam nossa equipe a preparar uma análise mais objetiva para o seu projeto.</p>

          <label>
            Nome completo
            <input name="nome" value={form.nome} onChange={updateField} required placeholder="Digite seu nome" />
          </label>

          <label>
            WhatsApp
            <input name="whatsapp" value={form.whatsapp} onChange={updateField} required placeholder="(00) 00000-0000" />
          </label>

          <label>
            Cidade e estado
            <input name="cidadeEstado" value={form.cidadeEstado} onChange={updateField} required placeholder="Ex: Jaú, SP" />
          </label>

          <Fieldset title="Hoje você é" name="perfil" value={form.perfil} updateField={updateField} options={["Autônomo", "CLT", "Empresário"]} />

          <Fieldset title="Quanto você fatura por ano, em média?" name="faturamento" value={form.faturamento} updateField={updateField} options={["Até R$ 50 mil", "Até R$ 100 mil", "Até R$ 200 mil", "Até R$ 500 mil", "Acima de R$ 1 milhão"]} />

          <Fieldset title="Pensando em investimento hoje, qual opção combina melhor com você?" name="objetivo" value={form.objetivo} updateField={updateField} options={["Comprar um imóvel para morar", "Comprar um imóvel para alugar e deixar ele se pagar", "Ter uma opção de investimento para construir patrimônio"]} />

          <Fieldset title="Quanto de contribuição mensal hoje não atrapalha seu orçamento?" name="contribuicao" value={form.contribuicao} updateField={updateField} options={["Até R$ 500 por mês", "De R$ 500 a R$ 1.500 por mês", "De R$ 1.500 a R$ 3.000 por mês", "De R$ 3.000 a R$ 5.000 por mês", "Acima de R$ 5.000 por mês"]} />

          <Fieldset title="Em quanto tempo você gostaria de iniciar esse projeto?" name="prazo" value={form.prazo} updateField={updateField} options={["O quanto antes", "Nos próximos 3 meses", "Nos próximos 6 meses", "Ainda estou estudando as possibilidades"]} />

          <Fieldset title="Você já conhece alguma estratégia de consórcio para investimento?" name="conhecimento" value={form.conhecimento} updateField={updateField} options={["Sim, já conheço", "Já ouvi falar, mas não entendo bem", "Não conheço, mas tenho interesse em entender"]} />

          <Fieldset title="Melhor horário para contato" name="horario" value={form.horario} updateField={updateField} options={["Manhã", "Tarde", "Noite", "Pode me chamar pelo WhatsApp"]} />

          <button type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Enviando...' : 'Enviar pré-qualificação'}</button>

          {message && <p className={`message ${status}`}>{message}</p>}
        </form>
      </section>
    </main>
  );
}

function Fieldset({ title, name, value, updateField, options }) {
  return (
    <fieldset>
      <legend>{title}</legend>
      <div className="options">
        {options.map((option) => (
          <label className="option" key={option}>
            <input type="radio" name={name} value={option} checked={value === option} onChange={updateField} required />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

createRoot(document.getElementById('root')).render(<App />);
