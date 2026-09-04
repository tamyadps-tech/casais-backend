// AGENTE DE CRUZAMENTO DE DADOS DO CASAL
// Pega o perfil das duas pessoas (personalidade, temperamento, apego,
// feridas, linguagem do amor, valores e respostas abertas) e produz um
// mapa estruturado de pontos de sintonia, atritos prováveis e fatos
// específicos sobre cada parceiro(a) — matéria-prima para o agente de dicas.
// É um artefato interno (não é mostrado ao casal diretamente).

const { hasApiKey, ask } = require('../aiClient');
const profiles = require('../../data/profiles');

function describePessoa(pessoa) {
  const { name, scores } = pessoa;
  return {
    nome: name,
    temperamento: scores.temperamento.dominantes.map((t) => (profiles.temperamento[t] || {}).nome || t),
    apego: (profiles.apego[scores.apego.dominante] || {}).nome || scores.apego.dominante,
    feridas: scores.feridas_infancia.dominantes.map((f) => (profiles.feridas[f] || {}).nome || f),
    linguagens_do_amor: scores.linguagem_amor.dominantes.map((l) => (profiles.linguagemAmor[l] || {}).nome || l),
    valores_vida: scores.valores_vida,
    conhecer_melhor: scores.conhecer_melhor
  };
}

function mockAnalysis(pessoa1, pessoa2) {
  const p1 = describePessoa(pessoa1);
  const p2 = describePessoa(pessoa2);
  return {
    resumo: `Análise gerada em modo simplificado (sem chave de IA configurada) para ${p1.nome} e ${p2.nome}.`,
    pontos_sintonia: [],
    pontos_atrito: [],
    fatos_uteis: {
      [p1.nome]: p1,
      [p2.nome]: p2
    }
  };
}

function buildPrompt(pessoa1, pessoa2) {
  const p1 = describePessoa(pessoa1);
  const p2 = describePessoa(pessoa2);
  return `Você é um analista de relacionamentos. Abaixo estão os perfis de duas pessoas de um casal (noivos), extraídos de um teste de 90 perguntas.

PERFIL 1:
${JSON.stringify(p1, null, 2)}

PERFIL 2:
${JSON.stringify(p2, null, 2)}

TAREFA: Cruze os dois perfis e devolva SOMENTE um JSON válido (sem markdown, sem texto fora do JSON) no formato:
{
  "pontos_sintonia": [ { "tema": "...", "descricao": "..." } ],
  "pontos_atrito": [ { "tema": "...", "descricao": "...", "sugestao": "..." } ],
  "fatos_uteis_${p1.nome}": [ "fato curto e específico sobre ${p1.nome} que ${p2.nome} deveria saber pra amá-la(o) melhor" ],
  "fatos_uteis_${p2.nome}": [ "fato curto e específico sobre ${p2.nome} que ${p1.nome} deveria saber pra amá-la(o) melhor" ]
}

Seja específico, usando os dados reais fornecidos (temperamento, apego, feridas, linguagem do amor, valores, respostas abertas). Gere de 3 a 6 itens em cada lista.`;
}

async function analyzeCouple(pessoa1, pessoa2) {
  if (!hasApiKey()) {
    return { analysis: mockAnalysis(pessoa1, pessoa2), status: 'sem_revisao' };
  }

  const prompt = buildPrompt(pessoa1, pessoa2);
  let lastError = null;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const raw = await ask(prompt, { maxTokens: 2000 });
      const match = raw.match(/\{[\s\S]*\}/);
      const analysis = JSON.parse(match ? match[0] : raw);
      return { analysis, status: 'aprovado', attempts: attempt };
    } catch (e) {
      lastError = e;
    }
  }

  console.error('crossAnalysisAgent: falha ao gerar análise, usando fallback', lastError && lastError.message);
  return { analysis: mockAnalysis(pessoa1, pessoa2), status: 'melhor_esforco' };
}

module.exports = { analyzeCouple, describePessoa };
