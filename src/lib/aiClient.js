const axios = require('axios');

const MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-5';

// Desligado por pedido explícito: o app roda 100% no banco de frases
// determinístico (src/lib/phraseBank.js) e nos textos-modelo (mockResult/
// mockTip), sem gastar nenhum crédito da Claude API — resultado, análise
// cruzada e dicas quinzenais saem instantâneos, sem depender de rede nem
// de saldo configurado. A chave CLAUDE_API_KEY pode continuar configurada
// no Railway sem problema (não precisa apagar); se um dia quiser religar
// a IA pra ajudar a escrever os textos, é só pedir.
function hasApiKey() {
  return false;
}

// Wrapper fino sobre a Claude API. Todo "agente" do sistema usa esta função
// para pensar — o "agente gerente" é, na prática, a orquestração em
// src/lib/pipeline.js chamando estas funções em sequência e só liberando o
// resultado depois que src/lib/qualityCoordinator.js aprovar.
async function ask(prompt, { maxTokens = 1500, system } = {}) {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    const err = new Error('CLAUDE_API_KEY not set');
    err.code = 'NO_API_KEY';
    throw err;
  }

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: MODEL,
        max_tokens: maxTokens,
        ...(system ? { system } : {}),
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        timeout: 60000
      }
    );

    return response.data.content[0].text;
  } catch (error) {
    // A mensagem padrão do axios ("Request failed with status code 400")
    // esconde o motivo real — a Anthropic manda o detalhe no corpo da
    // resposta. Sem isso, um erro de configuração (ex: nome de modelo
    // errado) vira um mistério até alguém olhar os logs do servidor.
    const detalhe = error.response && error.response.data && error.response.data.error
      ? error.response.data.error.message
      : error.message;
    const err = new Error(`Claude API: ${detalhe}`);
    err.cause = error;
    throw err;
  }
}

module.exports = { ask, hasApiKey, MODEL };
