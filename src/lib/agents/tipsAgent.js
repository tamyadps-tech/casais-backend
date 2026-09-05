// AGENTE DE DICAS QUINZENAIS
// Recebe DOIS findings "principais" (sobre o parceiro, de tipos diferentes
// quando possível — ex: um papo de valores + um gesto de amor) e, na
// maioria das vezes, também um de "autorreflexão" (sobre a própria vida da
// pessoa) — todos já verificados pelo motor de regras em
// src/lib/crossRules.js, nunca o perfil inteiro solto. Monta UMA mensagem
// construtiva: os dois principais misturados no início (como amar melhor
// o parceiro, por dois ângulos), depois uma reflexão sobre a própria
// pessoa. A primeiríssima dica de cada um foge dessa regra: é só sobre a
// própria linguagem do amor e a importância de amar o outro na língua
// dele(a), não na própria (tipo "intro_linguagem"). Passa pelo
// coordenador de qualidade antes de ser liberada.

const { hasApiKey, ask } = require('../aiClient');
const { runQualityLoop, feedbackSuffix, HUMANITY_RUBRIC } = require('../qualityCoordinator');

const RUBRIC = [
  'Começa chamando a pessoa pelo nome (ex: "Tamyris, ...")',
  'Usa os FATOS fornecidos no contexto, sem inventar nenhum dado novo sobre o casal',
  'Transforma cada sugestão de ação fornecida numa ação concreta, pequena e executável ainda hoje ou nessa semana',
  'Quando houver dois fatos principais, os dois aparecem misturados logo no início da mensagem, um emendado no outro com naturalidade — nunca como duas dicas separadas nem repetindo o nome da pessoa duas vezes',
  'Quando houver uma "dica extra sobre a própria vida", ela vem como uma segunda parte clara da mensagem, depois dos fatos principais, não misturada com eles',
  'Não usa emojis em nenhum ponto do texto',
  'Tem entre 60 e 200 palavras',
  'Se algum fato for do tipo "papo_valores", essa parte é um convite tranquilo pra conversar, nunca soa como alarme ou cobrança',
  'Se o tipo for "intro_linguagem", é a primeira dica que a pessoa recebe: fala sobre a própria linguagem do amor dela(e) e por que é importante amar o parceiro(a) na linguagem DELE(A), não na própria',
  ...HUMANITY_RUBRIC
];

const INICIO_POR_TIPO = {
  intro_linguagem: (nome, f) => `${nome}, antes de mais nada: ${f.fato}.`,
  gesto_de_amor: (nome, f) => `${nome}, sabia que ${f.fato}?`,
  reforco: (nome, f) => `${nome}, boa notícia: ${f.fato}.`,
  dinamica_apego: (nome, f) => `${nome}, uma coisa sobre vocês dois: ${f.fato}.`,
  cuidado_ferida: (nome, f) => `${nome}, um cuidado importante: ${f.fato}.`,
  papo_valores: (nome, f) => `${nome}, uma reflexão pra essa semana: ${f.fato}.`
};

// Conector usado quando um segundo fato principal se emenda ao primeiro —
// sem repetir o nome da pessoa de novo, pra não soar como duas dicas coladas.
const CONECTOR_SEGUINTE = {
  gesto_de_amor: 'E também vale saber: ',
  reforco: 'Além disso, boa notícia: ',
  dinamica_apego: 'Outra coisa sobre vocês dois: ',
  cuidado_ferida: 'Um cuidado a mais: ',
  papo_valores: 'Também vale uma reflexão: '
};

// sugestao_acao (fato+conselho) costuma vir sem ponto final — garante que
// cada parte termine com pontuação antes de emendar a próxima.
function comPontoFinal(texto) {
  const t = texto.trim();
  return /[.!?]$/.test(t) ? t : `${t}.`;
}

function mockTip(targetName, partnerName, findings, autoFinding) {
  const principais = (findings || []).filter(Boolean);
  const partes = principais.map((finding, idx) => {
    if (idx === 0) {
      const inicio = (INICIO_POR_TIPO[finding.tipo] || ((nome, f) => `${nome}, ${f.fato}.`))(targetName, finding);
      return comPontoFinal(`${inicio} ${finding.sugestao_acao}`);
    }
    const conector = CONECTOR_SEGUINTE[finding.tipo] || '';
    return comPontoFinal(`${conector}${finding.fato}. ${finding.sugestao_acao}`);
  });

  let texto = partes.join(' ');
  if (autoFinding) {
    texto += `\n\nE uma reflexão só sua: ${comPontoFinal(autoFinding.fato)} ${comPontoFinal(autoFinding.sugestao_acao)}`;
  }
  return texto;
}

async function generateTip({ targetName, partnerName, findings, autoFinding }) {
  const principais = (findings || []).filter(Boolean);
  if (!principais.length) {
    return {
      texto: `${targetName}, hoje é um bom dia pra perguntar pro(a) ${partnerName} como ele(a) está se sentindo de verdade — sem pressa, só ouvindo.`,
      status: 'sem_finding',
      attempts: 0
    };
  }

  if (!hasApiKey()) {
    return {
      texto: mockTip(targetName, partnerName, principais, autoFinding),
      status: 'sem_revisao',
      attempts: 1,
      findingIds: principais.map((f) => f.id),
      autoFindingId: autoFinding ? autoFinding.id : undefined
    };
  }

  const generate = async (feedback) => {
    const correcoes = feedbackSuffix(feedback);
    const autoBlock = autoFinding
      ? `\n\nDICA EXTRA SOBRE A PRÓPRIA VIDA DE ${targetName.toUpperCase()} (fato verificado, não invente nada além disso):\n"${autoFinding.fato}"\nReflexão/ação sugerida: "${autoFinding.sugestao_acao}"`
      : '';

    const ehIntro = principais[0].tipo === 'intro_linguagem';

    const fatosBloco = principais
      .map(
        (f, idx) =>
          `FATO PRINCIPAL ${idx + 1} SOBRE ${f.tipo === 'intro_linguagem' ? targetName.toUpperCase() : partnerName.toUpperCase()} (não invente nada além disso):\n"${f.fato}"\nSugestão de ação (transforme numa frase natural, pode adaptar a forma mas não o conteúdo): "${f.sugestao_acao}"\nTipo: ${f.tipo}`
      )
      .join('\n\n');

    const tarefaEspecial = ehIntro
      ? `Esta é a PRIMEIRA dica que ${targetName} recebe no app. Comece falando sobre a própria linguagem do amor dela(e) (pode nomear "linguagem do amor", é o conceito central aqui) e explique, com carinho, por que amar bem é amar ${partnerName} na linguagem DELE(A), não na própria. Termine com a ação sugerida.`
      : principais.length > 1
        ? `Escreva em partes: 1) misture os ${principais.length} fatos principais logo no início, emendados com naturalidade (um conectando no outro, sem repetir o nome de ${targetName} a cada um). ${autoFinding ? `2) uma reflexão breve sobre a própria vida de ${targetName} — o jeito dela(e) de ver o mundo ou sua própria dificuldade em relacionamentos — baseada na dica extra abaixo.` : ''}`
        : `Escreva em duas partes: 1) como amar melhor ${partnerName}, baseada no fato e na sugestão de ação. ${autoFinding ? `2) uma reflexão breve sobre a própria vida de ${targetName} — o jeito dela(e) de ver o mundo ou sua própria dificuldade em relacionamentos — baseada na dica extra abaixo.` : ''}`;

    const prompt = `Você escreve dicas quinzenais para um app pessoal de um casal (${targetName} e ${partnerName}, noivos). Esta dica é para ${targetName}.

${fatosBloco}
${autoBlock}

TAREFA: Escreva UMA dica construtiva e calorosa pra ${targetName}, entre 60 e 200 palavras. ${tarefaEspecial}

Se algum fato for do tipo "papo_valores", essa parte não soe como alarme — é só um convite gentil pra uma conversa. Se for "reforco", é uma dica de comemorar o que já está bom. NÃO use emojis. Evite rótulos de diagnóstico ("apego ansioso", "ferida de rejeição" etc — descreva o comportamento, não o rótulo); "linguagem do amor" pode ser citado normalmente quando for o assunto. Escreva com simplicidade, amor e respeito pelos dois, como um amigo(a) de verdade torcendo por eles.${correcoes}`;

    return ask(prompt, { maxTokens: 650 });
  };

  const { text, status, nota, attempts } = await runQualityLoop(generate, RUBRIC);
  return {
    texto: text || mockTip(targetName, partnerName, principais, autoFinding),
    status,
    nota,
    attempts,
    findingIds: principais.map((f) => f.id),
    autoFindingId: autoFinding ? autoFinding.id : undefined
  };
}

module.exports = { generateTip };
