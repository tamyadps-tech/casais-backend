const axios = require('axios');

const MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-5';

// Checagem real da chave — usada hoje só pelas dicas quinzenais
// (tipsAgent.js), que voltaram a usar IA por pedido explícito (as dicas
// 100% do banco de frases ficaram repetitivas e superficiais depois de
// semanas de uso real). Resultado individual e análise cruzada continuam
// desligados de propósito, direto no mock — ver a constante local
// IA_DESLIGADA_AQUI em resultAgent.js e crossAnalysisAgent.js.
function hasApiKey() {
  return Boolean(process.env.CLAUDE_API_KEY);
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
