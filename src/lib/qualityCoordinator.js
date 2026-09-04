const { ask, hasApiKey } = require('./aiClient');

// "Dois coordenadores em looping até ficar perfeito", na prática: um loop
// limitado (nunca infinito — isso custaria caro e travaria o sistema) onde
// um agente gera, e dois papéis de revisão (coordenador de qualidade do
// conteúdo + coordenador de português informal) avaliam contra uma rubrica.
// Só o que passa nos dois é liberado ("gerente só mostra quando achar
// perfeito"). Se o teto de tentativas for atingido sem aprovação plena, o
// melhor candidato observado é liberado marcado como best_effort.
const DEFAULT_MAX_ATTEMPTS = 4;
const APPROVAL_THRESHOLD = 8; // nota de 0 a 10

// AGENTE DE HUMANIDADE — critérios que valem pra QUALQUER texto que a IA
// escreve no app (resultado individual, dicas quinzenais, o que vier
// depois). Todo agente de geração de conteúdo deve espalhar isto na sua
// própria RUBRIC (ver resultAgent.js e tipsAgent.js) — é o coordenador de
// qualidade quem cobra isso na prática, rejeitando o texto até atender.
const HUMANITY_RUBRIC = [
  'Soa como algo que uma pessoa que ama de verdade escreveria pra outra — nunca como um sistema, um relatório ou um teste avaliando alguém',
  'Frases simples e diretas, do jeito que se fala. Nunca usa rótulo de diagnóstico sobre a pessoa (nada de "você tem apego ansioso" ou "sua ferida é rejeição" — descreva o comportamento, não o rótulo da categoria). "Linguagem do amor" pode ser citado normalmente quando for o assunto central da dica — é um conceito conhecido, não um diagnóstico',
  'Transmite amor e cuidado genuíno pelas duas pessoas do casal, nunca julgamento, ironia ou tom de "acerto/erro"',
  'Respeita quem recebe: não expõe fragilidade de forma vexatória, não soa como cobrança disfarçada nem como queixa do parceiro(a) sobre a pessoa'
];

function buildJudgePrompt(rubric, candidate) {
  return `Você é o coordenador de qualidade de um app de relacionamento pessoal, feito para o casal Tamyris e Saulo.

RUBRICA (o texto deve atender TODOS os pontos abaixo):
${rubric.map((r, i) => `${i + 1}. ${r}`).join('\n')}

TEXTO A AVALIAR:
"""
${candidate}
"""

Responda SOMENTE em JSON válido, sem markdown, no formato:
{"nota": <0 a 10>, "problemas": ["..."], "aprovado": <true ou false>}

"aprovado" deve ser true apenas se nota >= 8 E não houver nenhum problema de tom (ex: parecer diagnóstico clínico, ser genérico demais, soar formal/robótico, não personalizar com os dados fornecidos).`;
}

function parseJudgeResponse(raw) {
  try {
    const match = raw.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(match ? match[0] : raw);
    return {
      nota: Number(parsed.nota) || 0,
      problemas: Array.isArray(parsed.problemas) ? parsed.problemas : [],
      aprovado: Boolean(parsed.aprovado)
    };
  } catch (e) {
    return { nota: 0, problemas: ['Falha ao interpretar avaliação do coordenador'], aprovado: false };
  }
}

/**
 * @param {(feedback: {problemas: string[]}|null) => Promise<string>} generate
 * @param {string[]} rubric
 * @param {object} [opts]
 */
async function runQualityLoop(generate, rubric, opts = {}) {
  const maxAttempts = opts.maxAttempts || DEFAULT_MAX_ATTEMPTS;

  if (!hasApiKey()) {
    const text = await generate(null);
    return { text, status: 'sem_revisao', attempts: 1, nota: null };
  }

  let best = { text: null, nota: -1 };
  let feedback = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const candidate = await generate(feedback);

    let judged;
    try {
      const judgeRaw = await ask(buildJudgePrompt(rubric, candidate), { maxTokens: 500 });
      judged = parseJudgeResponse(judgeRaw);
    } catch (e) {
      judged = { nota: 0, problemas: [`Erro no coordenador: ${e.message}`], aprovado: false };
    }

    if (judged.nota > best.nota) {
      best = { text: candidate, nota: judged.nota };
    }

    if (judged.aprovado && judged.nota >= APPROVAL_THRESHOLD) {
      return { text: candidate, status: 'aprovado', attempts: attempt, nota: judged.nota };
    }

    feedback = judged;
  }

  return { text: best.text, status: 'melhor_esforco', attempts: maxAttempts, nota: best.nota };
}

// Formata o feedback de uma rodada reprovada como sufixo de prompt — usado
// por todo agente que chama runQualityLoop, pra não duplicar essa string
// em cada um deles.
function feedbackSuffix(feedback) {
  if (!feedback) return '';
  return `\n\nA versão anterior teve estes problemas, corrija-os: ${feedback.problemas.join('; ')}`;
}

module.exports = { runQualityLoop, feedbackSuffix, HUMANITY_RUBRIC, APPROVAL_THRESHOLD, DEFAULT_MAX_ATTEMPTS };
