// MOTOR DE CRUZAMENTO DE DADOS DO CASAL
// ==========================================
// Isto é a definição concreta de "como cruzamos os dados pra gerar dicas
// assertivas": um conjunto de regras FIXAS e determinísticas (nada de IA
// inventando fato) que comparam os perfis de duas pessoas e devolvem uma
// lista de "findings" — fatos verificados + uma sugestão de ação. A IA
// (tipsAgent) só entra depois, pra escrever a mensagem em cima de UM
// finding específico, nunca pra inventar o conteúdo.
//
// Cada finding tem:
//   id          — chave estável, usada pro controle de repetição (o mesmo
//                 finding não deve virar dica de novo antes do cooldown)
//   tipo        — 'gesto_de_amor' | 'reforco' | 'dinamica_apego' |
//                 'cuidado_ferida' | 'papo_valores'
//   alvo        — nome de quem VAI RECEBER a dica (quem deve agir)
//   sobre       — nome do parceiro(a) a quem a dica se refere
//   confianca   — 'alta' | 'media' (quantos sinais independentes concordam)
//   fato        — o dado verificado, em linguagem simples
//   sugestao_acao — ação concreta sugerida, ainda em linguagem de rascunho
//                    (o tipsAgent reescreve isso com calor humano e empatia)

const { getOptionTags, getLiteralById } = require('./scoring');

// Rótulos em linguagem humana, não em termo técnico — "presentes" soa a
// obrigação/compra; o que realmente importa aqui é o gesto pensado, não o
// objeto. O mesmo cuidado vale pros outros quatro, pra tudo soar como algo
// que uma pessoa sentiria, não uma categoria de teste.
const LINGUAGEM_LABEL = {
  palavras_afirmacao: 'palavras de carinho e reconhecimento',
  tempo_qualidade: 'tempo de qualidade, só a dois',
  presentes: 'pequenos mimos e gestos pensados',
  atos_servico: 'gestos de cuidado no dia a dia',
  toque_fisico: 'carinho físico'
};

const LINGUAGEM_ACAO = {
  palavras_afirmacao: 'Manda uma mensagem ou fala pessoalmente algo específico que você admira nele(a) — não um elogio genérico, um de verdade, sobre algo que ele(a) fez ou é',
  tempo_qualidade: 'Separa um tempinho só de vocês dois, sem celular — nem que sejam 20 minutos de conversa de verdade, olho no olho',
  presentes: 'Um mimo pequeno e pensado — um bilhetinho escondido, o docinho que ele(a) ama, alguma coisinha que mostre que você prestou atenção no que faz ele(a) feliz. Não precisa ser caro, precisa ser sentido',
  atos_servico: 'Resolve algo que é dele(a) sem que precise pedir — um gesto de cuidado silencioso vale mais que mil palavras',
  toque_fisico: 'Busca mais contato físico no dia a dia — um abraço mais longo, a mão na dele(a) sem motivo nenhum, só porque sim'
};

const FERIDA_LABEL = {
  rejeicao: 'rejeição',
  abandono: 'abandono',
  humilhacao: 'humilhação',
  traicao: 'traição',
  injustica: 'injustiça'
};

const FERIDA_CUIDADO = {
  rejeicao: 'Evite comparar com outras pessoas e reforce que você aceita do jeito que é, mesmo nos dias difíceis',
  abandono: 'Avise com antecedência quando for se ausentar ou demorar, e evite usar "vou embora" como argumento numa briga',
  humilhacao: 'Nunca corrija ou brinque em tom de deboche na frente de outras pessoas — leve pra uma conversa em particular',
  traicao: 'Mantenha consistência entre o que fala e o que faz, mesmo em coisas pequenas — confiança se constrói aos poucos',
  injustica: 'Explique o motivo das suas decisões e evite tratar as coisas de forma desigual sem dar contexto'
};

// Advice sobre como agir dado o estilo de apego do PARCEIRO (o "sobre").
const APEGO_CUIDADO = {
  seguro: 'Ele(a) lida bem com espaço e com conflito — seu papel é só manter a consistência que já existe',
  ansioso: 'Dê reafirmação verbal com frequência e avise quando for demorar — a previsibilidade acalma mais que qualquer discurso',
  evitativo: 'Respeite o espaço dele(a) e não pressione por abertura emocional rápida — a confiança cresce com consistência, não com cobrança',
  desorganizado: 'Seja o mais previsível e paciente possível, evite ultimatos — dê tempo mesmo quando ele(a) se afastar sem explicar'
};

const VALORES_LABEL = {
  valores: 'os valores mais importantes na vida',
  condutas_inegociaveis: 'o que é inegociável numa relação',
  sonhos: 'o maior sonho de vida',
  filhos: 'querer ter filhos',
  quantos_filhos: 'quantos filhos',
  moradia: 'onde construir a vida',
  cuidado_idosos: 'como cuidar dos pais quando idosos',
  financas: 'como lidar com dinheiro a dois',
  fe: 'o papel da fé/espiritualidade',
  tempo_noivado: 'o tempo entre noivado e casamento',
  tarefas_casa: 'a divisão das tarefas de casa',
  casamento: 'como imaginam o dia do casamento'
};

// VAL10 (tempo de noivado) fica de fora por enquanto — não fazia sentido
// pro uso pessoal de Tamyris e Saulo, mas continua no banco de perguntas
// (com ativa: false) reservada pra uma futura versão comercial do app.
const VAL_QUESTION_IDS = ['VAL01', 'VAL02', 'VAL03', 'VAL04', 'VAL05', 'VAL06', 'VAL07', 'VAL08', 'VAL09', 'VAL11', 'VAL12'];

function normalizar(texto) {
  return String(texto || '').trim().toLowerCase();
}

// Compara duas respostas que podem ser string única (escolha simples) ou
// array (seleção múltipla) de forma uniforme: devolve o que as duas
// pessoas têm em comum e o que cada uma respondeu só pra si. Uma escolha
// única "empata" naturalmente quando os dois arrays de 1 item coincidem.
function compareRespostas(respostaA, respostaB) {
  const arrA = Array.isArray(respostaA) ? respostaA : [respostaA];
  const arrB = Array.isArray(respostaB) ? respostaB : [respostaB];
  const comuns = arrA.filter((item) => arrB.some((outro) => normalizar(outro) === normalizar(item)));
  return { comuns, arrA, arrB };
}

// ---------- Lente 1: linguagem do amor (gap + reforço) ----------
function buildGestosDeAmor(alvo, sobre) {
  const findings = [];
  const ranking = (sobre.scores.linguagem_amor.ranking || []).filter(
    (lang) => (sobre.scores.linguagem_amor.contagens[lang] || 0) > 0
  );
  const con03Tags = getOptionTags(sobre.responses, 'CON03'); // sinal direto de "sobre" (seleção múltipla)
  const con01TagsDoAlvo = getOptionTags(sobre.responses, 'CON01'); // o que "sobre" diz que "alvo" já faz

  ranking.forEach((linguagem, idx) => {
    const confianca = idx === 0 && con03Tags.includes(linguagem) ? 'alta' : 'media';
    const jaFaz = con01TagsDoAlvo.includes(linguagem);
    const label = LINGUAGEM_LABEL[linguagem];

    if (jaFaz) {
      findings.push({
        id: `reforco_${alvo.name}_${linguagem}`,
        tipo: 'reforco',
        alvo: alvo.name,
        sobre: sobre.name,
        confianca,
        fato: `${sobre.name} se sente amado(a) principalmente por ${label}, e já reconhece isso em algo que ${alvo.name} faz hoje`,
        sugestao_acao: `Continue assim e, de vez em quando, nomeie isso em voz alta: diga que percebe o quanto isso importa pra ${sobre.name} e que escolhe fazer por amor, não por obrigação`
      });
    } else if (idx === 0) {
      findings.push({
        id: `gesto_${alvo.name}_${linguagem}`,
        tipo: 'gesto_de_amor',
        alvo: alvo.name,
        sobre: sobre.name,
        confianca,
        fato: `${sobre.name} se sente amado(a) principalmente por ${label}`,
        sugestao_acao: LINGUAGEM_ACAO[linguagem]
      });
    }
  });

  return findings;
}

// ---------- Lente 2: dinâmica de apego ----------
function buildDinamicaApego(alvo, sobre) {
  const estiloSobre = sobre.scores.apego.dominante;
  const estiloAlvo = alvo.scores.apego.dominante;
  const baseAcao = APEGO_CUIDADO[estiloSobre] || APEGO_CUIDADO.seguro;

  let fato = `O jeito de ${sobre.name} amar tende ao apego mais ${estiloSobre === 'seguro' ? 'seguro' : estiloSobre}`;
  let sugestao = baseAcao;

  // Padrão perseguidor-distanciador: o combo mais comum de gerar atrito
  if (
    (estiloAlvo === 'ansioso' && estiloSobre === 'evitativo') ||
    (estiloAlvo === 'evitativo' && estiloSobre === 'ansioso')
  ) {
    if (estiloAlvo === 'ansioso') {
      fato = `Vocês dois tendem a cair num padrão de perseguir-afastar: quanto mais ${alvo.name} busca proximidade rápido, mais ${sobre.name} tende a recuar`;
      sugestao = `Dá um respiro antes de cobrar resposta ou proximidade — ${sobre.name} tende a se aproximar mais quando não sente pressão`;
    } else {
      fato = `Quando ${alvo.name} se afasta pra processar algo, ${sobre.name} pode sentir que está sendo deixado(a) de lado`;
      sugestao = `Avise que precisa de um tempo, com um prazo curto ("preciso de uma hora, já volto") — isso evita que ${sobre.name} entre em pânico`;
    }
  }

  return [
    {
      id: `apego_${alvo.name}`,
      tipo: 'dinamica_apego',
      alvo: alvo.name,
      sobre: sobre.name,
      confianca: 'alta',
      fato,
      sugestao_acao: sugestao
    }
  ];
}

// ---------- Lente 3: cuidados por ferida da infância ----------
function buildCuidadosFeridas(alvo, sobre) {
  const feridaPrincipal = sobre.scores.feridas_infancia.dominantes[0];
  if (!feridaPrincipal || feridaPrincipal === 'neutro') return [];

  let sugestao = FERIDA_CUIDADO[feridaPrincipal];
  if (alvo.scores.temperamento.dominantes[0] === 'colerico') {
    sugestao += '. Como seu jeito costuma ser mais direto, vale um cuidado extra com o tom nessas horas';
  }

  return [
    {
      id: `ferida_${alvo.name}_${feridaPrincipal}`,
      tipo: 'cuidado_ferida',
      alvo: alvo.name,
      sobre: sobre.name,
      confianca: 'alta',
      fato: `${sobre.name} carrega mais a ferida de ${FERIDA_LABEL[feridaPrincipal]}`,
      sugestao_acao: sugestao
    }
  ];
}

// ---------- Lente 4: valores e vida a dois ----------
function buildPontosValores(alvo, sobre, pessoaA, pessoaB) {
  const findings = [];
  VAL_QUESTION_IDS.forEach((id) => {
    const respA = getLiteralById(pessoaA.responses, id);
    const respB = getLiteralById(pessoaB.responses, id);
    if (!respA || !respB) return;

    const label = VALORES_LABEL[respA.subcategoria] || respA.subcategoria;
    const { comuns, arrA, arrB } = compareRespostas(respA.resposta, respB.resposta);

    if (comuns.length) {
      findings.push({
        id: `valor_sintonia_${alvo.name}_${id}`,
        tipo: 'reforco',
        alvo: alvo.name,
        sobre: sobre.name,
        confianca: 'alta',
        fato:
          comuns.length === arrA.length && comuns.length === arrB.length
            ? `Vocês dois responderam a mesma coisa sobre ${label}: "${comuns.join(', ')}"`
            : `Sobre ${label}, vocês dois têm em comum: "${comuns.join(', ')}"`,
        sugestao_acao: 'Vale lembrar disso quando bater alguma insegurança sobre o futuro — nesse ponto vocês já remam juntos'
      });
    } else {
      findings.push({
        id: `valor_atencao_${alvo.name}_${id}`,
        tipo: 'papo_valores',
        alvo: alvo.name,
        sobre: sobre.name,
        confianca: 'alta',
        fato: `Sobre ${label}, ${pessoaA.name} respondeu "${arrA.join(', ')}" e ${pessoaB.name} respondeu "${arrB.join(', ')}" — visões diferentes`,
        sugestao_acao: 'Não precisa resolver hoje, mas vale abrir essa conversa com calma, sem cobrança, só pra entender o que pesa pra cada um'
      });
    }
  });
  return findings;
}

/**
 * Cruza os dados das duas pessoas e devolve a lista completa de findings,
 * já nas duas direções (o que A deveria saber sobre B, e vice-versa).
 * @param {{name: string, scores: object, responses: object}} pessoaA
 * @param {{name: string, scores: object, responses: object}} pessoaB
 */
function buildFindings(pessoaA, pessoaB) {
  const findings = [
    ...buildGestosDeAmor(pessoaA, pessoaB),
    ...buildGestosDeAmor(pessoaB, pessoaA),
    ...buildDinamicaApego(pessoaA, pessoaB),
    ...buildDinamicaApego(pessoaB, pessoaA),
    ...buildCuidadosFeridas(pessoaA, pessoaB),
    ...buildCuidadosFeridas(pessoaB, pessoaA),
    ...buildPontosValores(pessoaA, pessoaB, pessoaA, pessoaB),
    ...buildPontosValores(pessoaB, pessoaA, pessoaA, pessoaB)
  ];

  return findings;
}

module.exports = { buildFindings };
