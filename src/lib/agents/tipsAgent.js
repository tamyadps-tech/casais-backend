// AGENTE DE DICAS QUINZENAIS
// Recebe a análise cruzada do casal e escreve UMA dica pessoal para UM dos
// dois, no estilo: "Tamyris, sabia que Saulo gosta de tal coisa... que tal
// surpreender enviando um iFood hoje?" — sempre nomeada, sempre baseada em
// um fato real do parceiro, sempre com uma ação concreta. Passa pelo
// coordenador de qualidade (o "coordenador que verifica a qualidade das
// dicas sobre o parceiro") antes de ser liberada.

const { hasApiKey, ask } = require('../aiClient');
const { runQualityLoop } = require('../qualityCoordinator');

const RUBRIC = [
  'Começa chamando a pessoa pelo nome (ex: "Tamyris, ...")',
  'Cita um fato específico e real sobre o parceiro(a), vindo dos dados fornecidos — nunca genérico',
  'Sugere UMA ação concreta, pequena e executável ainda hoje ou nessa semana (não é só uma reflexão abstrata)',
  'Tom de mensagem calorosa de um amigo(a) torcendo pelo casal, jamais como laudo ou relatório',
  'Usa entre 1 e 3 emojis, com naturalidade',
  'Tem entre 35 e 90 palavras',
  'Objetivo real da dica: ajudar a pessoa a fazer o parceiro(a) se sentir mais amado(a)'
];

function pickFact(analysis, targetName, partnerName) {
  const key = `fatos_uteis_${partnerName}`;
  const fatos = (analysis && (analysis[key] || (analysis.fatos_uteis && analysis.fatos_uteis[partnerName]))) || [];
  if (Array.isArray(fatos) && fatos.length) {
    return fatos[Math.floor(Math.random() * fatos.length)];
  }
  return null;
}

function mockTip(targetName, partnerName, fato) {
  if (fato) {
    return `${targetName}, sabia que ${fato.toLowerCase().startsWith(partnerName.toLowerCase()) ? fato : `${partnerName} ${fato}`}? 💜 Que tal usar isso hoje e surpreender ${partnerName} com um gesto pequeno? Vale um "te amo" bem dito ou até um iFood de surpresa 🍽️`;
  }
  return `${targetName}, hoje é um bom dia pra perguntar pro ${partnerName} como ele(a) está se sentindo de verdade — sem pressa, só ouvindo 💜`;
}

async function generateTip({ targetName, partnerName, analysis, weekIndex }) {
  const fato = pickFact(analysis, targetName, partnerName);

  if (!hasApiKey()) {
    return { texto: mockTip(targetName, partnerName, fato), status: 'sem_revisao', attempts: 1 };
  }

  const contexto = JSON.stringify({ fato_sobre_parceiro: fato, analise_completa: analysis }, null, 2);

  const generate = async (feedback) => {
    const correcoes = feedback
      ? `\n\nA versão anterior teve estes problemas, corrija-os: ${feedback.problemas.join('; ')}`
      : '';
    const prompt = `Você escreve dicas quinzenais para um app pessoal de um casal (${targetName} e ${partnerName}, noivos). Esta dica é para ${targetName}, sobre como fazer ${partnerName} se sentir mais amado(a).

DADOS DISPONÍVEIS SOBRE ${partnerName.toUpperCase()} E O CASAL:
${contexto}

TAREFA: Escreva UMA dica curta (35 a 90 palavras) para ${targetName}, no estilo:
"${targetName}, sabia que ${partnerName} gosta de tal coisa? Tente [sugestão concreta]. Que tal [ação prática e pequena, executável hoje ou essa semana]?"

Use 1 a 3 emojis. Tom de amigo(a) torcendo por eles, nunca clínico ou genérico. Baseie-se em um dado real do contexto acima.${correcoes}`;

    return ask(prompt, { maxTokens: 400 });
  };

  const { text, status, nota, attempts } = await runQualityLoop(generate, RUBRIC);
  return {
    texto: text || mockTip(targetName, partnerName, fato),
    status,
    nota,
    attempts,
    semana: weekIndex
  };
}

module.exports = { generateTip };
