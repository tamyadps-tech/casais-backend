// AGENTE DE RESULTADO INDIVIDUAL
// Depois que a pessoa termina as 90 perguntas, este agente lê a pontuação
// (personalidade, temperamento, apego, feridas, linguagem do amor) e escreve
// um resultado pessoal com uma dica de autoconhecimento. Passa pelo
// coordenador de qualidade (nota >= 8, tom informal, nada de "diagnóstico
// clínico") antes de ser liberado pelo agente gerente.

const { scoreAll } = require('../scoring');
const profiles = require('../../data/profiles');
const { hasApiKey, ask } = require('../aiClient');
const { runQualityLoop, feedbackSuffix, HUMANITY_RUBRIC } = require('../qualityCoordinator');

const RUBRIC = [
  'Usa o nome da pessoa e faz referência a pelo menos 2 dados concretos do perfil dela',
  'Cobre claramente 4 partes: 1) um perfil geral de abertura, 2) o jeito de ser dela(e) — personalidade e temperamento, 3) a forma como ama — estilo de apego e linguagem do amor, 4) uma dica prática de autoconhecimento',
  'Não usa termos clínicos/diagnósticos (nada de "transtorno", "patologia", "disfunção")',
  'Traz 1 dica prática de autoconhecimento, curta e acionável, para a própria pessoa',
  'Não usa emojis em nenhum ponto do texto — tom caloroso, mas sóbrio e direto',
  'Tem entre 100 e 220 palavras',
  ...HUMANITY_RUBRIC
];

function mockResult(name, scores) {
  const temp = scores.temperamento.dominantes[0];
  const apegoInfo = profiles.apego[scores.apego.dominante];
  const linguagem = scores.linguagem_amor.dominantes[0];
  const temperamentoInfo = temp ? profiles.temperamento[temp] : null;
  const linguagemInfo = linguagem ? profiles.linguagemAmor[linguagem] : null;

  const eixos = ['eixo_energia', 'eixo_decisao', 'eixo_foco', 'eixo_estilo']
    .map((eixo) => scores.personalidade[eixo])
    .filter(Boolean)
    .map((tag) => profiles.personalidade[tag])
    .filter(Boolean);
  const personalidadeTexto = eixos.length ? eixos.join('; ') : 'um jeito de ser que ainda estamos conhecendo melhor';

  return `${name}, olha só o que suas respostas mostraram.

Seu perfil tem um quê de ${temperamentoInfo ? temperamentoInfo.nome.toLowerCase() : 'único'} — ${temperamentoInfo ? temperamentoInfo.descricao : 'cada resposta sua tem sua marca'}.

Sobre sua personalidade: você ${personalidadeTexto}.

E a forma como você ama? No amor, você ${apegoInfo ? apegoInfo.descricao : 'ainda está se descobrindo'}. E o que mais te faz sentir amado(a)? ${linguagemInfo ? linguagemInfo.descricao : 'ainda estamos descobrindo'}.

Dica prática pra essa semana: separe 10 minutos sozinho(a) e escreva uma coisa que você sentiu essa semana mas não disse pra ninguém. Só pra você se conhecer um pouco mais.`;
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
    const correcoes = feedbackSuffix(feedback);
    const prompt = `Você é um especialista em relacionamentos escrevendo para ${name}, que acabou de terminar um teste de autoconhecimento dentro de um app pessoal (feito pelo casal para uso próprio).

DADOS DO PERFIL DE ${name.toUpperCase()} (uso interno, não cite os nomes técnicos como "apego ansioso" — traduza em linguagem natural):
${contexto}

TAREFA: Escreva um resultado pessoal para ${name}, como se fosse uma mensagem de um amigo(a) querido que entende de relacionamentos, cobrindo claramente estas 4 partes (sem usar esses títulos literalmente, só como fio condutor):
1) Um perfil geral de abertura, chamando ${name} pelo nome.
2) O jeito de ser dela(e) — personalidade e temperamento (use os eixos de personalidade E o temperamento dominante do contexto).
3) A forma como ama — estilo de apego e linguagem do amor.
4) Uma dica prática de autoconhecimento, curta e acionável, pra fechar.

Sem usar termos técnicos/clínicos — traduza tudo em linguagem simples e humana, de vivência real. Escreva com simplicidade, amor e respeito — nunca como quem está avaliando ou diagnosticando alguém. NÃO use emojis. Entre 100 e 220 palavras.${correcoes}`;

    return ask(prompt, { maxTokens: 700 });
  };

  const { text, status, nota, attempts } = await runQualityLoop(generate, RUBRIC);
  return { scores, texto: text || mockResult(name, scores), status, nota, attempts };
}

module.exports = { buildResult };
