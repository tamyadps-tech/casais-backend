const axios = require('axios');

const MODEL = process.env.CLAUDE_MODEL || 'claude-opus-4-1';

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
}

module.exports = { ask, hasApiKey, MODEL };
