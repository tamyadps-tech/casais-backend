// AGENTE DE CRUZAMENTO DE DADOS DO CASAL
// A parte que decide QUAIS fatos são verdadeiros e relevantes é 100%
// determinística — src/lib/crossRules.js — pra nunca inventar coisa sobre
// o casal. A IA entra só pra escrever um resumo legível desses achados
// (opcional, usado como contexto) e depois, no tipsAgent, pra transformar
// UM finding específico numa mensagem calorosa.

const { hasApiKey, ask } = require('../aiClient');
const { buildFindings } = require('../crossRules');
const profiles = require('../../data/profiles');

function describePessoa(pessoa) {
  const { name, scores } = pessoa;
  return {
    nome: name,
    temperamento: scores.temperamento.dominantes.map((t) => (profiles.temperamento[t] || {}).nome || t),
    apego: (profiles.apego[scores.apego.dominante] || {}).nome || scores.apego.dominante,
    feridas: scores.feridas_infancia.dominantes.map((f) => (profiles.feridas[f] || {}).nome || f),
    linguagens_do_amor: (scores.linguagem_amor.ranking || []).map((l) => (profiles.linguagemAmor[l] || {}).nome || l),
    valores_vida: scores.valores_vida,
    conhecer_melhor: scores.conhecer_melhor
  };
}

async function buildResumo(findings, nome1, nome2) {
  if (!hasApiKey()) {
    return `Análise cruzada gerada com ${findings.length} pontos específicos entre ${nome1} e ${nome2} (modo simplificado, sem chave de IA configurada).`;
  }

  const prompt = `Você é um analista de relacionamentos. Aqui está a lista de fatos verificados (não invente nada além disso) sobre o casal ${nome1} e ${nome2}:

${JSON.stringify(findings, null, 2)}

Escreva um resumo de 2 a 3 frases, em tom informal e caloroso, sobre a dinâmica geral do casal com base SOMENTE nesses fatos. Sem termos clínicos.`;

  try {
    return await ask(prompt, { maxTokens: 300 });
  } catch (e) {
    console.error('crossAnalysisAgent: falha ao gerar resumo, seguindo sem ele', e.message);
    return null;
  }
}

/**
 * @param {{name: string, scores: object, responses: object}} pessoa1
 * @param {{name: string, scores: object, responses: object}} pessoa2
 */
async function analyzeCouple(pessoa1, pessoa2) {
  const findings = buildFindings(pessoa1, pessoa2);
  const resumo = await buildResumo(findings, pessoa1.name, pessoa2.name);

  // pessoa1/pessoa2 descritos não entram aqui: pipeline.js já os grava no
  // nível de cima do payload (via describePessoa), sem precisar duplicar.
  return {
    analysis: { resumo, findings },
    status: 'aprovado' // as regras são determinísticas — não há "reprovar" aqui
  };
}

module.exports = { analyzeCouple, describePessoa };
