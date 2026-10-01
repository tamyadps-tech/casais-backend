// AGENTE DE DICAS QUINZENAIS
// Recebe DOIS findings "principais" (sobre o parceiro, de tipos diferentes
// quando possível — ex: um papo de valores + um gesto de amor) e, na
// maioria das vezes, também um de "autorreflexão" (sobre a própria vida da
// pessoa) — todos já verificados pelo motor de regras em
// src/lib/crossRules.js, nunca o perfil inteiro solto. Monta UMA mensagem
// construtiva: os dois principais misturados no início (como amar melhor
// o parceiro, por dois ângulos), depois uma reflexão sobre a própria
// pessoa — já completa desde a primeiríssima dica de cada um. Passa pelo
// coordenador de qualidade antes de ser liberada.

const { hasApiKey, ask } = require('../aiClient');
const { runQualityLoop, feedbackSuffix, HUMANITY_RUBRIC } = require('../qualityCoordinator');

const RUBRIC = [
  'Começa chamando a pessoa pelo nome (ex: "Tamyris, ...")',
  'Usa os FATOS fornecidos no contexto, sem inventar nenhum dado novo sobre o casal',
  'A ação sugerida é específica, criativa e pensada pra esse casal — nunca um conselho genérico e óbvio que serviria pra qualquer relacionamento (ex: "conversem mais", "demonstrem carinho"); vai a fundo em COMO fazer isso na prática, com um exemplo concreto',
  'A abertura da mensagem não repete a mesma fórmula toda vez ("sabia que...", "boa notícia...") — varia o jeito de introduzir o fato conforme o contexto, como alguém de verdade escreveria',
  'Quando houver dois fatos principais, os dois aparecem misturados logo no início da mensagem, um emendado no outro com naturalidade — nunca como duas dicas separadas nem repetindo o nome da pessoa duas vezes',
  'Quando houver uma "dica extra sobre a própria vida", ela vem como uma segunda parte clara da mensagem, depois dos fatos principais, não misturada com eles, e também traz uma reflexão ou ação específica — não um clichê de autoajuda genérico',
  'Não usa emojis em nenhum ponto do texto',
  'Tem entre 80 e 220 palavras',
  'Se algum fato for do tipo "papo_valores", essa parte é um convite tranquilo pra conversar, nunca soa como alarme ou cobrança',
  'Quando o fato ou a ideia de partida trouxer uma explicação sobre como o cérebro, uma crença antiga ou um padrão de comportamento funciona (tipos "dinamica_apego", "cuidado_ferida" e a dica extra de autorreflexão), a mensagem preserva esse porquê em linguagem simples — nunca vira só uma instrução de ação sem entendimento por trás, porque é esse entendimento que ajuda a pessoa de verdade',
  ...HUMANITY_RUBRIC
];

const INICIO_POR_TIPO = {
  gesto_de_amor: (nome, f) => `${nome}, sabia que ${f.fato}?`,
  reforco: (nome, f) => `${nome}, boa notícia: ${f.fato}.`,
  dinamica_apego: (nome, f) => `${nome}, uma coisa sobre vocês dois: ${f.fato}.`,
  cuidado_ferida: (nome, f) => `${nome}, um cuidado importante: ${f.fato}.`,
  papo_valores: (nome, f) => `${nome}, uma reflexão pra essa semana: ${f.fato}.`,
  surpresa_especial: (nome, f) => `${nome}, uma ideia boa pra essa semana: ${f.fato}.`
};

// Conector usado quando um segundo fato principal se emenda ao primeiro —
// sem repetir o nome da pessoa de novo, pra não soar como duas dicas coladas.
const CONECTOR_SEGUINTE = {
  gesto_de_amor: 'E também vale saber: ',
  reforco: 'Além disso, boa notícia: ',
  dinamica_apego: 'Outra coisa sobre vocês dois: ',
  cuidado_ferida: 'Um cuidado a mais: ',
  papo_valores: 'Também vale uma reflexão: ',
  surpresa_especial: 'E também vale aproveitar: '
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
      ? `\n\nDICA EXTRA SOBRE A PRÓPRIA VIDA DE ${targetName.toUpperCase()} (fato verificado, não invente nada além disso):\n"${autoFinding.fato}"\nIdeia de partida pra reflexão/ação: "${autoFinding.sugestao_acao}" — pode usar essa ideia, adaptá-la, ou propor uma reflexão/ação ainda mais específica e criativa pra essa pessoa, contanto que sirva ao mesmo objetivo.`
      : '';

    const fatosBloco = principais
      .map(
        (f, idx) =>
          `FATO PRINCIPAL ${idx + 1} SOBRE ${partnerName.toUpperCase()} (verificado, não invente nada além disso):\n"${f.fato}"\nIdeia de partida pra ação (tipo: ${f.tipo}): "${f.sugestao_acao}" — não precisa usar essa frase quase pronta; pode se inspirar nela, adaptar, ou criar uma ação diferente e mais criativa que sirva ao mesmo objetivo, contanto que faça sentido com o fato acima e não invente dado novo sobre o casal.`
      )
      .join('\n\n');

    const tarefaEspecial =
      principais.length > 1
        ? `Escreva em partes: 1) misture os ${principais.length} fatos principais logo no início, emendados com naturalidade (um conectando no outro, sem repetir o nome de ${targetName} a cada um). ${autoFinding ? `2) uma reflexão breve sobre a própria vida de ${targetName} — o jeito dela(e) de ver o mundo ou sua própria dificuldade em relacionamentos — baseada na dica extra abaixo.` : ''}`
        : `Escreva em duas partes: 1) como amar melhor ${partnerName}, baseada no fato acima. ${autoFinding ? `2) uma reflexão breve sobre a própria vida de ${targetName} — o jeito dela(e) de ver o mundo ou sua própria dificuldade em relacionamentos — baseada na dica extra abaixo.` : ''}`;

    const prompt = `Você escreve dicas quinzenais para um app pessoal de um casal (${targetName} e ${partnerName}, noivos). Esta dica é para ${targetName}.

${fatosBloco}
${autoBlock}

TAREFA: Escreva UMA dica construtiva, calorosa e de verdade ÚTIL pra ${targetName}, entre 80 e 220 palavras. ${tarefaEspecial}

Seja criativo e específico de propósito: pense em algo que só faria sentido pra ESSE casal, com esses fatos específicos — não um conselho de relacionamento genérico que caberia em qualquer casal. Dê um exemplo concreto de como fazer isso na prática (uma frase pra dizer, um gesto exato, um momento específico do dia), não só "conversem sobre isso" ou "demonstrem mais carinho". Varie a forma de abrir a mensagem — não comece sempre com "sabia que" ou "boa notícia", escreva como alguém que conhece bem o casal escreveria essa mensagem especificamente hoje.

Se algum fato for do tipo "papo_valores", essa parte não soe como alarme — é só um convite gentil pra uma conversa. Se for "reforco", é uma dica de comemorar o que já está bom, mas ainda assim específica e não repetitiva. Se for "surpresa_especial", o fato já é algo que o(a) próprio(a) ${partnerName} contou sobre si (comida, música, uma lembrança, um dia perfeito) — capriche na criatividade de COMO transformar isso num gesto real, com um exemplo bem concreto (quando fazer, como surpreender, que detalhe cuidar), não repita a ideia de ação pronta que foi dada, invente em cima dela.

Se o fato ou a ideia de partida vier com uma explicação sobre como o cérebro, uma crença formada na infância ou um padrão de comportamento funciona (isso é comum nos tipos "dinamica_apego", "cuidado_ferida" e na dica extra de autorreflexão), NÃO jogue fora esse porquê pra ficar só na ação — mantenha a explicação, em linguagem simples e sem jargão técnico, porque entender a raiz do próprio padrão (ou do padrão de quem ama) é o que realmente muda alguma coisa, não só a ação isolada. Pode reescrever a explicação com suas palavras, contanto que não invente nenhum mecanismo ou dado novo além do que foi dado.

NÃO use emojis. Evite rótulos de diagnóstico ("apego ansioso", "ferida de rejeição" etc — descreva o comportamento e o porquê, não o rótulo); "linguagem do amor" pode ser citado normalmente quando for o assunto. Escreva com simplicidade, amor e respeito pelos dois, como um amigo(a) de verdade torcendo por eles.${correcoes}`;

    return ask(prompt, { maxTokens: 750 });
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
