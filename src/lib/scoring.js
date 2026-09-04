const questions = require('../data/questions');

const questionsById = new Map(questions.map((q) => [q.id, q]));

// escala questions score toward one dimension; some (like APE12) are
// "inverso" — nota alta na escala significa MENOS daquela dimensão.
function escalaContribution(question, valor) {
  const centered = valor - 3; // -2..+2
  return question.inverso ? -centered : centered;
}

function tally(responses, categoria) {
  const counts = {};
  let escalaTotal = 0;
  let escalaCount = 0;

  Object.entries(responses || {}).forEach(([questionId, resposta]) => {
    const question = questionsById.get(questionId);
    if (!question || question.categoria !== categoria) return;

    if (question.tipo === 'multipla_escolha') {
      const opcao = question.opcoes.find((o) => o.texto === resposta || o.tag === resposta);
      const tag = opcao && opcao.tag;
      if (tag && tag !== 'neutro') {
        counts[tag] = (counts[tag] || 0) + 1;
      }
    } else if (question.tipo === 'escala') {
      const valor = Number(resposta);
      if (!Number.isNaN(valor)) {
        const dim = question.dimensao;
        counts[dim] = (counts[dim] || 0) + escalaContribution(question, valor) * 1.5;
        escalaTotal += valor;
        escalaCount += 1;
      }
    }
  });

  return { counts, escalaAvg: escalaCount ? escalaTotal / escalaCount : null };
}

function topTags(counts, n = 2) {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .filter(([, v]) => v > 0)
    .slice(0, n)
    .map(([tag]) => tag);
}

function scorePersonalidade(responses) {
  const { counts } = tally(responses, 'personalidade');
  const axis = (a, b) => (counts[a] || 0) >= (counts[b] || 0) ? a : b;
  return {
    eixo_energia: axis('extrovertido', 'introvertido'),
    eixo_decisao: axis('racional', 'emocional'),
    eixo_foco: axis('pratico', 'idealista'),
    eixo_estilo: axis('estruturado', 'espontaneo'),
    contagens: counts
  };
}

function scoreTemperamento(responses) {
  const { counts } = tally(responses, 'temperamento');
  return { dominantes: topTags(counts, 2), contagens: counts };
}

function scoreApego(responses) {
  const { counts } = tally(responses, 'apego');
  return { dominante: topTags(counts, 1)[0] || 'seguro', contagens: counts };
}

function scoreFeridas(responses) {
  const { counts } = tally(responses, 'feridas_infancia');
  return { dominantes: topTags(counts, 2), contagens: counts };
}

const LINGUAGENS = ['palavras_afirmacao', 'tempo_qualidade', 'presentes', 'atos_servico', 'toque_fisico'];

function scoreLinguagemAmor(responses) {
  const { counts } = tally(responses, 'linguagem_amor');
  // ranking completo (as 5 linguagens, mesmo as com pontuação 0) — essencial
  // pro cruzamento de gap: precisamos saber a ordem inteira, não só o topo
  const ranking = [...LINGUAGENS].sort((a, b) => (counts[b] || 0) - (counts[a] || 0));
  return { dominantes: topTags(counts, 2), ranking, contagens: counts };
}

// Sinal direto de uma única pergunta (ex: CON01/CON02/CON03) — usado pra
// triangular confiança e pra saber "o que o parceiro já faz hoje" sem
// depender só do bloco de 10 perguntas de linguagem do amor.
function getOptionTag(responses, questionId) {
  const question = questionsById.get(questionId);
  if (!question || !responses || responses[questionId] === undefined) return null;
  const resposta = responses[questionId];
  const opcao = (question.opcoes || []).find((o) => o.texto === resposta || o.tag === resposta);
  const tag = opcao && opcao.tag;
  return tag && tag !== 'neutro' ? tag : null;
}

// Resposta literal de UMA pergunta específica por id — usado pelo motor de
// regras de cruzamento (src/lib/crossRules.js) pra comparar tópico a tópico
// (ex: VAL04 de uma pessoa com VAL04 da outra).
function getLiteralById(responses, questionId) {
  const question = questionsById.get(questionId);
  if (!question || !responses || responses[questionId] === undefined) return null;
  return { id: questionId, texto: question.texto, subcategoria: question.subcategoria, resposta: responses[questionId] };
}

function collectRespostasLiterais(responses, categoria) {
  const out = {};
  questions
    .filter((q) => q.categoria === categoria)
    .forEach((q) => {
      if (responses && responses[q.id] !== undefined) {
        out[q.texto] = responses[q.id];
      }
    });
  return out;
}

function scoreAll(responses) {
  return {
    personalidade: scorePersonalidade(responses),
    temperamento: scoreTemperamento(responses),
    apego: scoreApego(responses),
    feridas_infancia: scoreFeridas(responses),
    linguagem_amor: scoreLinguagemAmor(responses),
    valores_vida: collectRespostasLiterais(responses, 'valores_vida'),
    conhecer_melhor: collectRespostasLiterais(responses, 'conhecer_melhor')
  };
}

module.exports = {
  scoreAll,
  scorePersonalidade,
  scoreTemperamento,
  scoreApego,
  scoreFeridas,
  scoreLinguagemAmor,
  collectRespostasLiterais,
  getOptionTag,
  getLiteralById
};
