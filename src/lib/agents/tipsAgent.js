// AGENTE DE DICAS QUINZENAIS
// Recebe um finding "principal" (sobre o parceiro) e, na maioria das
// vezes, também um de "autorreflexão" (sobre a própria vida da pessoa) —
// ambos já verificados pelo motor de regras em src/lib/crossRules.js,
// nunca o perfil inteiro solto. Monta UMA mensagem construtiva com duas
// partes: como amar melhor o parceiro, e uma reflexão sobre a própria
// pessoa. A primeiríssima dica de cada um foge dessa regra: é só sobre a
// própria linguagem do amor e a importância de amar o outro na língua
// dele(a), não na própria (tipo "intro_linguagem"). Passa pelo
// coordenador de qualidade antes de ser liberada.

const { hasApiKey, ask } = require('../aiClient');
const { runQualityLoop, feedbackSuffix, HUMANITY_RUBRIC } = require('../qualityCoordinator');

const RUBRIC = [
  'Começa chamando a pessoa pelo nome (ex: "Tamyris, ...")',
  'Usa o FATO fornecido no contexto, sem inventar nenhum dado novo sobre o casal',
  'Transforma a sugestão de ação fornecida numa ação concreta, pequena e executável ainda hoje ou nessa semana',
  'Quando houver uma "dica extra sobre a própria vida", ela vem como uma segunda parte clara da mensagem, não misturada com a primeira',
  'Não usa emojis em nenhum ponto do texto',
  'Tem entre 50 e 160 palavras',
  'Se o tipo for "papo_valores", a dica é um convite tranquilo pra conversar, nunca soa como alarme ou cobrança',
  'Se o tipo for "intro_linguagem", é a primeira dica que a pessoa recebe: fala sobre a própria linguagem do amor dela(e) e por que é importante amar o parceiro(a) na linguagem DELE(A), não na própria',
  ...HUMANITY_RUBRIC
];

function mockTip(targetName, partnerName, finding, autoFinding) {
  const inicio = {
    intro_linguagem: `${targetName}, antes de mais nada: ${finding.fato}.`,
    gesto_de_amor: `${targetName}, sabia que ${finding.fato}?`,
    reforco: `${targetName}, boa notícia: ${finding.fato}.`,
    dinamica_apego: `${targetName}, uma coisa sobre vocês dois: ${finding.fato}.`,
    cuidado_ferida: `${targetName}, um cuidado importante: ${finding.fato}.`,
    papo_valores: `${targetName}, uma reflexão pra essa semana: ${finding.fato}.`
  }[finding.tipo] || `${targetName}, ${finding.fato}.`;

  let texto = `${inicio} ${finding.sugestao_acao}`;
  if (autoFinding) {
    texto += `\n\nE uma reflexão só sua: ${autoFinding.fato}. ${autoFinding.sugestao_acao}`;
  }
  return texto;
}

async function generateTip({ targetName, partnerName, finding, autoFinding }) {
  if (!finding) {
    return {
      texto: `${targetName}, hoje é um bom dia pra perguntar pro(a) ${partnerName} como ele(a) está se sentindo de verdade — sem pressa, só ouvindo.`,
      status: 'sem_finding',
      attempts: 0
    };
  }

  if (!hasApiKey()) {
    return {
      texto: mockTip(targetName, partnerName, finding, autoFinding),
      status: 'sem_revisao',
      attempts: 1,
      findingId: finding.id,
      autoFindingId: autoFinding ? autoFinding.id : undefined
    };
  }

  const generate = async (feedback) => {
    const correcoes = feedbackSuffix(feedback);
    const autoBlock = autoFinding
      ? `\n\nDICA EXTRA SOBRE A PRÓPRIA VIDA DE ${targetName.toUpperCase()} (fato verificado, não invente nada além disso):\n"${autoFinding.fato}"\nReflexão/ação sugerida: "${autoFinding.sugestao_acao}"`
      : '';

    const tarefaEspecial =
      finding.tipo === 'intro_linguagem'
        ? `Esta é a PRIMEIRA dica que ${targetName} recebe no app. Comece falando sobre a própria linguagem do amor dela(e) (pode nomear "linguagem do amor", é o conceito central aqui) e explique, com carinho, por que amar bem é amar ${partnerName} na linguagem DELE(A), não na própria. Termine com a ação sugerida.`
        : `Escreva em duas partes: 1) como amar melhor ${partnerName}, baseada no fato e na sugestão de ação. ${autoFinding ? `2) uma reflexão breve sobre a própria vida de ${targetName} — o jeito dela(e) de ver o mundo ou sua própria dificuldade em relacionamentos — baseada na dica extra acima.` : ''}`;

    const prompt = `Você escreve dicas quinzenais para um app pessoal de um casal (${targetName} e ${partnerName}, noivos). Esta dica é para ${targetName}.

FATO VERIFICADO SOBRE ${finding.tipo === 'intro_linguagem' ? targetName.toUpperCase() : partnerName.toUpperCase()} (não invente nada além disso):
"${finding.fato}"

SUGESTÃO DE AÇÃO (transforme isso numa frase natural, pode adaptar a forma mas não o conteúdo):
"${finding.sugestao_acao}"

TIPO DA DICA: ${finding.tipo}${autoBlock}

TAREFA: Escreva UMA dica construtiva e calorosa pra ${targetName}, entre 50 e 160 palavras. ${tarefaEspecial}

Se o tipo for "papo_valores", não soe como alarme — é só um convite gentil pra uma conversa. Se for "reforco", é uma dica de comemorar o que já está bom. NÃO use emojis. Evite rótulos de diagnóstico ("apego ansioso", "ferida de rejeição" etc — descreva o comportamento, não o rótulo); "linguagem do amor" pode ser citado normalmente quando for o assunto. Escreva com simplicidade, amor e respeito pelos dois, como um amigo(a) de verdade torcendo por eles.${correcoes}`;

    return ask(prompt, { maxTokens: 550 });
  };

  const { text, status, nota, attempts } = await runQualityLoop(generate, RUBRIC);
  return {
    texto: text || mockTip(targetName, partnerName, finding, autoFinding),
    status,
    nota,
    attempts,
    findingId: finding.id,
    autoFindingId: autoFinding ? autoFinding.id : undefined
  };
}

module.exports = { generateTip };
