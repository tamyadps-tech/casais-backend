// AGENTE DE DICAS QUINZENAIS
// Recebe UM finding específico (já verificado pelo motor de regras em
// src/lib/crossRules.js — nunca o perfil inteiro solto) e escreve a
// mensagem final, no estilo: "Tamyris, sabia que Saulo gosta de tal
// coisa... que tal surpreender enviando um iFood hoje?" — sempre nomeada,
// sempre presa a um fato real, sempre com uma ação concreta. Passa pelo
// coordenador de qualidade antes de ser liberada.

const { hasApiKey, ask } = require('../aiClient');
const { runQualityLoop, feedbackSuffix, HUMANITY_RUBRIC } = require('../qualityCoordinator');

const RUBRIC = [
  'Começa chamando a pessoa pelo nome (ex: "Tamyris, ...")',
  'Usa o FATO fornecido no contexto, sem inventar nenhum dado novo sobre o casal',
  'Transforma a sugestão de ação fornecida numa ação concreta, pequena e executável ainda hoje ou nessa semana',
  'Não usa emojis em nenhum ponto do texto',
  'Tem entre 35 e 90 palavras',
  'Se o tipo for "papo_valores", a dica é um convite tranquilo pra conversar, nunca soa como alarme ou cobrança',
  ...HUMANITY_RUBRIC
];

function mockTip(targetName, partnerName, finding) {
  const inicio = {
    gesto_de_amor: `${targetName}, sabia que ${finding.fato}?`,
    reforco: `${targetName}, boa notícia: ${finding.fato}.`,
    dinamica_apego: `${targetName}, uma coisa sobre vocês dois: ${finding.fato}.`,
    cuidado_ferida: `${targetName}, um cuidado importante: ${finding.fato}.`,
    papo_valores: `${targetName}, uma reflexão pra essa semana: ${finding.fato}.`
  }[finding.tipo] || `${targetName}, ${finding.fato}.`;

  return `${inicio} ${finding.sugestao_acao}`;
}

async function generateTip({ targetName, partnerName, finding }) {
  if (!finding) {
    return {
      texto: `${targetName}, hoje é um bom dia pra perguntar pro(a) ${partnerName} como ele(a) está se sentindo de verdade — sem pressa, só ouvindo.`,
      status: 'sem_finding',
      attempts: 0
    };
  }

  if (!hasApiKey()) {
    return { texto: mockTip(targetName, partnerName, finding), status: 'sem_revisao', attempts: 1, findingId: finding.id };
  }

  const generate = async (feedback) => {
    const correcoes = feedbackSuffix(feedback);
    const prompt = `Você escreve dicas quinzenais para um app pessoal de um casal (${targetName} e ${partnerName}, noivos). Esta dica é para ${targetName}.

FATO VERIFICADO (não invente nada além disso):
"${finding.fato}"

SUGESTÃO DE AÇÃO (transforme isso numa frase natural, pode adaptar a forma mas não o conteúdo):
"${finding.sugestao_acao}"

TIPO DA DICA: ${finding.tipo}

TAREFA: Escreva UMA dica curta (35 a 90 palavras) para ${targetName}, no estilo:
"${targetName}, sabia que [fato, reformulado com naturalidade]? [ação prática, pequena e executável hoje ou essa semana, baseada na sugestão]"

Se o tipo for "papo_valores", não soe como alarme — é só um convite gentil pra uma conversa. Se for "reforco", é uma dica de comemorar o que já está bom. NÃO use emojis, NÃO use termos técnicos (nada de "linguagem do amor", "apego" etc — fale como gente fala). Escreva com simplicidade, amor e respeito pelos dois, como um amigo(a) de verdade torcendo por eles.${correcoes}`;

    return ask(prompt, { maxTokens: 400 });
  };

  const { text, status, nota, attempts } = await runQualityLoop(generate, RUBRIC);
  return {
    texto: text || mockTip(targetName, partnerName, finding),
    status,
    nota,
    attempts,
    findingId: finding.id
  };
}

module.exports = { generateTip };
