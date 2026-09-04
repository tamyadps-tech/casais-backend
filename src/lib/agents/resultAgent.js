// AGENTE DE RESULTADO INDIVIDUAL
// Depois que a pessoa termina as 90 perguntas, este agente lê a pontuação
// (personalidade, temperamento, apego, feridas, linguagem do amor) e escreve
// um resultado pessoal com uma dica de autoconhecimento. Passa pelo
// coordenador de qualidade (nota >= 8, tom informal, nada de "diagnóstico
// clínico") antes de ser liberado pelo agente gerente.

const { scoreAll } = require('../scoring');
const profiles = require('../../data/profiles');
const { hasApiKey, ask } = require('../aiClient');
const { runQualityLoop } = require('../qualityCoordinator');

const RUBRIC = [
  'Tom 100% informal, como uma amiga ou amigo próximo escrevendo, nunca como um laudo psicológico',
  'Usa o nome da pessoa e faz referência a pelo menos 2 dados concretos do perfil dela',
  'Não usa termos clínicos/diagnósticos (nada de "transtorno", "patologia", "disfunção")',
  'Traz 1 dica prática de autoconhecimento, curta e acionável, para a própria pessoa',
  'Usa 2 a 5 emojis, espalhados com naturalidade, sem exagero',
  'Tem entre 80 e 180 palavras'
];

function mockResult(name, scores) {
  const temp = scores.temperamento.dominantes[0];
  const apegoInfo = profiles.apego[scores.apego.dominante];
  const linguagem = scores.linguagem_amor.dominantes[0];
  const temperamentoInfo = temp ? profiles.temperamento[temp] : null;
  const linguagemInfo = linguagem ? profiles.linguagemAmor[linguagem] : null;

  return `${name}, olha só o que suas respostas mostraram! 💜

Seu jeito tem um quê de ${temperamentoInfo ? temperamentoInfo.nome.toLowerCase() : 'único'} — ${temperamentoInfo ? temperamentoInfo.descricao : 'cada resposta sua tem sua marca'}. No amor, você ${apegoInfo ? apegoInfo.descricao : 'ainda está se descobrindo'}.

E o que mais te faz sentir amado(a)? ${linguagemInfo ? linguagemInfo.descricao : 'ainda estamos descobrindo'} 🥰

Dica pra essa semana: separe 10 minutinhos sozinho(a) e escreva uma coisa que você sentiu essa semana mas não disse pra ninguém. Só pra você se conhecer um pouco mais. ✨`;
}

async function buildResult({ name, responses }) {
  const scores = scoreAll(responses);

  if (!hasApiKey()) {
    return { scores, texto: mockResult(name, scores), status: 'sem_revisao', nota: null, attempts: 1 };
  }

  const contexto = JSON.stringify(
    {
      temperamento_dominante: scores.temperamento.dominantes,
      estilo_apego: scores.apego.dominante,
      feridas_dominantes: scores.feridas_infancia.dominantes,
      linguagens_do_amor: scores.linguagem_amor.dominantes,
      eixos_personalidade: scores.personalidade
    },
    null,
    2
  );

  const generate = async (feedback) => {
    const correcoes = feedback
      ? `\n\nA versão anterior teve estes problemas, corrija-os: ${feedback.problemas.join('; ')}`
      : '';
    const prompt = `Você é um especialista em relacionamentos escrevendo para ${name}, que acabou de terminar um teste de autoconhecimento dentro de um app pessoal (feito pelo casal para uso próprio).

DADOS DO PERFIL DE ${name.toUpperCase()} (uso interno, não cite os nomes técnicos como "apego ansioso" — traduza em linguagem natural):
${contexto}

TAREFA: Escreva um resultado pessoal, carinhoso e informal para ${name}, como se fosse uma mensagem de um amigo(a) que entende de relacionamentos. Fale sobre o jeito dela(e) de ser e de amar, sem usar termos técnicos/clínicos. Termine com UMA dica prática de autoconhecimento. Use emojis com naturalidade (2 a 5). Entre 80 e 180 palavras.${correcoes}`;

    return ask(prompt, { maxTokens: 700 });
  };

  const { text, status, nota, attempts } = await runQualityLoop(generate, RUBRIC);
  return { scores, texto: text || mockResult(name, scores), status, nota, attempts };
}

module.exports = { buildResult };
