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
//                 'cuidado_ferida' | 'papo_valores' | 'surpresa_especial' |
//                 'auto_reflexao'
//                 (auto_reflexao nunca é o finding principal — é sempre
//                 combinado com outro na hora de montar a dica, ver
//                 pipeline.js)
//   alvo        — nome de quem VAI RECEBER a dica (quem deve agir)
//   sobre       — nome do parceiro(a) a quem a dica se refere
//   confianca   — 'alta' | 'media' (quantos sinais independentes concordam)
//   fato        — o dado verificado, em linguagem simples
//   sugestao_acao — ação concreta sugerida, ainda em linguagem de rascunho
//                    (o tipsAgent reescreve isso com calor humano e empatia)

const { getOptionTags, getLiteralById } = require('./scoring');
const { NAO_SEI_TEXTO } = require('../data/questions');

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
  toque_fisico: 'Busca mais contato físico no dia a dia — um abraço mais longo, a mão dada sem motivo nenhum, só porque sim'
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

// Como a PRÓPRIA pessoa tende a viver o apego — vira a "dica extra sobre a
// própria vida", uma reflexão pra ela mesma, não uma instrução sobre o
// parceiro(a).
const APEGO_AUTO_REFLEXAO = {
  seguro: 'você lida naturalmente bem com intimidade e com distância — isso é uma base sólida. Vale lembrar que nem todo mundo tem essa mesma facilidade, e ter paciência com quem tem mais dificuldade faz toda diferença',
  ansioso: 'você tende a buscar reafirmação com frequência e pode sentir o silêncio do outro como distância, mesmo quando não é. Perceber esse padrão no momento em que ele aparece já ajuda a não reagir no automático',
  evitativo: 'você tende a valorizar muito a própria independência, e abrir mão de um pouco de controle emocional pode ser desconfortável. Notar isso ajuda a não fechar a porta bem na hora em que alguém se aproxima de verdade',
  desorganizado: 'você pode sentir vontade de se aproximar e, ao mesmo tempo, vontade de recuar — é mais comum do que parece, e só reconhecer esse padrão já ajuda a suavizá-lo com o tempo'
};

// Mesma lógica, mas sobre a ferida da infância mais forte da PRÓPRIA
// pessoa — uma sensibilidade sua, não um cuidado que o outro precisa ter.
const FERIDA_AUTO_REFLEXAO = {
  rejeicao: 'você carrega uma sensibilidade grande a se sentir rejeitado(a). Vale observar quando isso te faz interpretar como rejeição algo que, no fundo, nem era sobre você',
  abandono: 'você tende a temer ser deixado(a) — reconhecer isso na hora ajuda a diferenciar um medo antigo de um sinal real do presente',
  humilhacao: 'você é sensível a julgamento e exposição. Vale notar quando isso te faz reagir mais forte do que a situação realmente pede',
  traicao: 'confiar plenamente não é fácil pra você. Perceber essa dificuldade é o primeiro passo pra não colocar na conta do outro algo que é uma ferida sua',
  injustica: 'situações de injustiça mexem fundo com você. Vale notar quando essa sensibilidade acaba ampliando um conflito que, sozinho, seria pequeno'
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
  casamento: 'como imaginam o dia do casamento',
  patrimonio: 'como juntar patrimônio como casal',
  regime_casamento: 'o regime de bens do casamento',
  papel_financeiro: 'o papel de cada um na vida financeira',
  suporte_financeiro: 'suporte financeiro entre vocês',
  cuidado_filhos: 'o cuidado com os filhos no dia a dia',
  provimento: 'quem é o(a) principal provedor(a)',
  cuidados_pesados: 'as tarefas mais pesadas do dia a dia',
  casa_e_beleza: 'cuidados da casa e da própria aparência',
  sobrenome: 'unir os sobrenomes depois de casar',
  familia_conjuge: 'a convivência com a família do cônjuge',
  decisoes_casa: 'como tomar decisões importantes a dois',
  planejamento_legal: 'planejamento pro futuro um do outro',
  rotina_casada: 'a rotina real de um casamento',
  aniversario_casamento: 'como celebrar datas do casamento',
  financas_atuais: 'como funciona a divisão das contas hoje',
  rotina_filhos_atual: 'a rotina real com os filhos hoje',
  desacordos_criacao: 'como lidam com desacordos sobre criar os filhos',
  tempo_a_sos_atual: 'o tempo a sós hoje, na correria real',
  divisao_domestica_atual: 'quem faz o quê em casa, na prática',
  familia_extensa_atual: 'a convivência real com a família estendida',
  planejamento_financeiro_atual: 'o dinheiro que já construíram juntos',
  conflitos_domesticos_atual: 'como resolvem os atritos do dia a dia',
  papel_atual_fe: 'o papel da fé no dia a dia de cada um',
  mesma_fe: 'compartilhar (ou não) a mesma fé',
  pratica_conjunta: 'praticar a fé junto como casal',
  criacao_filhos_fe: 'criar os filhos dentro de uma fé',
  divergencia_fe: 'como lidam com divergência sobre fé',
  rotina_fe: 'práticas de fé na rotina do casal',
  apoio_familia_fe: 'a opinião da família sobre a fé de vocês',
  crescimento_fe: 'crescer espiritualmente como casal'
};

// VAL10 (tempo de noivado) fica de fora por enquanto — não fazia sentido
// pro uso pessoal de Tamyris e Saulo, mas continua no banco de perguntas
// (com ativa: false) reservada pra uma futura versão comercial do app.
// VAL21-26 são sobre opinião/expectativa de quem já é casado(a); VAL27-34
// vão além — perguntam pela realidade JÁ VIVIDA de quem já compartilha
// rotina, contas e filhos no dia a dia. ESP01-08 (fé/espiritualidade)
// entram nesse mesmo motor de comparação literal, apesar do nome
// "VAL_QUESTION_IDS" — a função não olha a categoria da pergunta, só
// compara a resposta literal de um id específico entre os dois. Quem
// respondeu "não sei/não se aplica" em qualquer uma delas já é filtrado
// antes de gerar qualquer finding (ver compareRespostas), então não
// atrapalha quem ainda não chegou nessa fase ou não tem fé/religião.
const VAL_QUESTION_IDS = [
  'VAL01', 'VAL02', 'VAL03', 'VAL04', 'VAL05', 'VAL06', 'VAL07', 'VAL08', 'VAL09', 'VAL11', 'VAL12',
  'VAL13', 'VAL14', 'VAL15', 'VAL16', 'VAL17', 'VAL18', 'VAL19', 'VAL20',
  'VAL21', 'VAL22', 'VAL23', 'VAL24', 'VAL25', 'VAL26',
  'VAL27', 'VAL28', 'VAL29', 'VAL30', 'VAL31', 'VAL32', 'VAL33', 'VAL34',
  'ESP01', 'ESP02', 'ESP03', 'ESP04', 'ESP05', 'ESP06', 'ESP07', 'ESP08'
];

function normalizar(texto) {
  return String(texto || '').trim().toLowerCase();
}

// Compara duas respostas que podem ser string única (escolha simples) ou
// array (seleção múltipla) de forma uniforme: devolve o que as duas
// pessoas têm em comum e o que cada uma respondeu só pra si. Uma escolha
// única "empata" naturalmente quando os dois arrays de 1 item coincidem.
// "Não sei / não se aplica" nunca deve contar como as duas pessoas
// concordando (nem como uma diferença real) — só é descartada da
// comparação.
function compareRespostas(respostaA, respostaB) {
  const arrA = (Array.isArray(respostaA) ? respostaA : [respostaA]).filter((v) => v !== NAO_SEI_TEXTO);
  const arrB = (Array.isArray(respostaB) ? respostaB : [respostaB]).filter((v) => v !== NAO_SEI_TEXTO);
  const comuns = arrA.filter((item) => arrB.some((outro) => normalizar(outro) === normalizar(item)));
  return { comuns, arrA, arrB };
}

// Nível de compatibilidade nesse tema — usado só pra escolher o banco de
// frases certo (ver src/lib/phraseBank.js), nunca exposto como rótulo pro
// usuário. 'alta' = respostas idênticas, 'boa' = alguma sobreposição,
// 'atencao' = nenhuma opção em comum.
function classificarCompatibilidade(comuns, arrA, arrB) {
  if (!comuns.length) return 'atencao';
  const completo = comuns.length === arrA.length && comuns.length === arrB.length;
  return completo ? 'alta' : 'boa';
}

// ---------- Lente extra: autorreflexão (sobre a própria vida) ----------
// Não é sobre o parceiro(a) — é uma dica extra pra própria pessoa pensar
// sobre o jeito dela de ver o mundo e sua própria dificuldade em
// relacionamentos. Sempre combinada com um finding "principal" na hora de
// montar a dica (ver pipeline.js + tipsAgent.js).
function buildAutoReflexao(pessoa) {
  const findings = [];

  const estiloApego = pessoa.scores.apego.dominante;
  if (APEGO_AUTO_REFLEXAO[estiloApego]) {
    findings.push({
      id: `auto_apego_${pessoa.name}`,
      tipo: 'auto_reflexao',
      variant_key: 'auto_apego_closing',
      alvo: pessoa.name,
      sobre: pessoa.name,
      confianca: 'alta',
      fato: APEGO_AUTO_REFLEXAO[estiloApego],
      sugestao_acao: 'Essa semana, quando notar esse padrão surgindo, só perceba — sem se cobrar, apenas observando'
    });
  }

  const feridaPrincipal = pessoa.scores.feridas_infancia.dominantes[0];
  if (FERIDA_AUTO_REFLEXAO[feridaPrincipal]) {
    findings.push({
      id: `auto_ferida_${pessoa.name}_${feridaPrincipal}`,
      tipo: 'auto_reflexao',
      variant_key: 'auto_ferida_closing',
      alvo: pessoa.name,
      sobre: pessoa.name,
      confianca: 'alta',
      fato: FERIDA_AUTO_REFLEXAO[feridaPrincipal],
      sugestao_acao: 'Da próxima vez que sentir isso, tenta nomear pra você mesmo(a) o que está por trás da reação, antes de agir'
    });
  }

  return findings;
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
        variant_key: 'reforco_linguagem',
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
        variant_key: `gesto_${linguagem}`,
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
  let variantKey = `apego_estilo_${estiloSobre}`;

  // Padrão perseguidor-distanciador: o combo mais comum de gerar atrito
  if (
    (estiloAlvo === 'ansioso' && estiloSobre === 'evitativo') ||
    (estiloAlvo === 'evitativo' && estiloSobre === 'ansioso')
  ) {
    if (estiloAlvo === 'ansioso') {
      fato = `Vocês dois tendem a cair num padrão de perseguir-afastar: quanto mais ${alvo.name} busca proximidade rápido, mais ${sobre.name} tende a recuar`;
      sugestao = `Dá um respiro antes de cobrar resposta ou proximidade — ${sobre.name} tende a se aproximar mais quando não sente pressão`;
      variantKey = 'apego_persegue_ansioso';
    } else {
      fato = `Quando ${alvo.name} se afasta pra processar algo, ${sobre.name} pode sentir que está sendo deixado(a) de lado`;
      sugestao = `Avise que precisa de um tempo, com um prazo curto ("preciso de uma hora, já volto") — isso evita que ${sobre.name} entre em pânico`;
      variantKey = 'apego_persegue_evitativo';
    }
  }

  return [
    {
      id: `apego_${alvo.name}`,
      tipo: 'dinamica_apego',
      variant_key: variantKey,
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
  let extraNota = null;
  if (alvo.scores.temperamento.dominantes[0] === 'colerico') {
    extraNota = 'Como seu jeito costuma ser mais direto, vale um cuidado extra com o tom nessas horas';
    sugestao += `. ${extraNota}`;
  }

  return [
    {
      id: `ferida_${alvo.name}_${feridaPrincipal}`,
      tipo: 'cuidado_ferida',
      variant_key: `ferida_${feridaPrincipal}`,
      // Guardado à parte pra sobreviver à troca de sugestao_acao por uma
      // variação do banco de frases (ver phraseBank.js) — o cuidado extra
      // com o tom continua valendo não importa qual frase for sorteada.
      extra_nota: extraNota,
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
    // Se um dos dois (ou os dois) só respondeu "não sei/não se aplica", não
    // sobra nada real pra comparar — não é nem sintonia nem diferença.
    if (!arrA.length || !arrB.length) return;
    const nivel = classificarCompatibilidade(comuns, arrA, arrB);

    if (comuns.length) {
      findings.push({
        id: `valor_sintonia_${alvo.name}_${id}`,
        tipo: 'reforco',
        nivel,
        variant_key: `valores_${nivel}`,
        alvo: alvo.name,
        sobre: sobre.name,
        confianca: 'alta',
        fato:
          nivel === 'alta'
            ? `Vocês dois responderam a mesma coisa sobre ${label}: "${comuns.join(', ')}"`
            : `Sobre ${label}, vocês dois têm em comum: "${comuns.join(', ')}"`,
        sugestao_acao: 'Vale lembrar disso quando bater alguma insegurança sobre o futuro — nesse ponto vocês já remam juntos'
      });
    } else {
      findings.push({
        id: `valor_atencao_${alvo.name}_${id}`,
        tipo: 'papo_valores',
        nivel,
        variant_key: `valores_${nivel}`,
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

// ---------- Lente 5: respostas abertas — ideias concretas de surpresa ----------
// As perguntas abertas do questionário (comida e sobremesa favoritas,
// lembrança mais marcante, "dia perfeito", música que lembra o
// relacionamento) ficavam de fora do cruzamento até aqui — mesmo sendo
// material riquíssimo pra uma dica de verdade específica desse casal, não
// um conselho genérico. Cada uma vira um finding diferente, com o fato
// sendo literalmente o que a própria pessoa escreveu sobre si (nunca
// inventado), e uma ideia de ação pra preparar algo especial em cima disso.
const RESPOSTA_ABERTA_IDEIA = {
  CON04: (sobre, resposta) => ({
    fato: `${sobre.name} contou que a comida favorita, aquela que nunca enjoa, é "${resposta}"`,
    sugestao_acao: `Prepara (ou pede) esse prato pra ${sobre.name} num dia qualquer, sem ocasião especial nenhuma — só porque lembrou`
  }),
  CON05: (sobre, resposta) => ({
    fato: `A sobremesa favorita de ${sobre.name}, a que salva qualquer dia ruim, é "${resposta}"`,
    sugestao_acao: `Surpreende ${sobre.name} com essa sobremesa num dia em que perceber que ele(a) precisa de um colo`
  }),
  CON11: (sobre, resposta) => ({
    fato: `A lembrança mais marcante que ${sobre.name} guarda de vocês dois até hoje é: "${resposta}"`,
    sugestao_acao: `Recria algum detalhe desse momento — o lugar, a comida, a música que tocava — ou simplesmente conta pra ${sobre.name} que você também guarda essa lembrança com carinho`
  }),
  CON13: (sobre, resposta) => ({
    fato: `O "dia perfeito" que ${sobre.name} descreveu com você é: "${resposta}"`,
    sugestao_acao: `Organiza, mesmo que só um pedaço pequeno disso, um momento que puxe esse dia perfeito que ${sobre.name} descreveu — não precisa ser tudo de uma vez`
  }),
  CON14: (sobre, resposta) => ({
    fato: `Existe uma música que faz ${sobre.name} pensar em você ou no relacionamento de vocês: "${resposta}"`,
    sugestao_acao: `Toca essa música num momento à toa — no carro, cozinhando, chegando em casa — e vê o que isso desperta nele(a)`
  })
};

function buildSurpresasEspeciais(alvo, sobre) {
  const findings = [];
  Object.entries(RESPOSTA_ABERTA_IDEIA).forEach(([questionId, montar]) => {
    const resposta = sobre.responses && sobre.responses[questionId];
    if (typeof resposta !== 'string' || resposta.trim().length < 3 || resposta.trim() === NAO_SEI_TEXTO) return;

    const { fato, sugestao_acao } = montar(sobre, resposta.trim());
    findings.push({
      id: `aberta_${alvo.name}_${questionId}`,
      tipo: 'surpresa_especial',
      alvo: alvo.name,
      sobre: sobre.name,
      confianca: 'alta',
      fato,
      sugestao_acao
    });
  });
  return findings;
}

// Pergunta aberta respondida sobre o PRÓPRIO parceiro(a) (CON12: "o que
// você mais admira nele(a), que talvez ele(a) nem saiba que você
// percebe") — vira um lembrete pra quem escreveu isso dizer em voz alta
// pro parceiro(a), não só sentir por dentro.
function buildAdmiracaoNaoDita(pessoaQueAdmira, parceiroAdmirado) {
  const resposta = pessoaQueAdmira.responses && pessoaQueAdmira.responses.CON12;
  if (typeof resposta !== 'string' || resposta.trim().length < 3 || resposta.trim() === NAO_SEI_TEXTO) return [];

  return [
    {
      id: `admiracao_${pessoaQueAdmira.name}`,
      tipo: 'reforco',
      alvo: pessoaQueAdmira.name,
      sobre: parceiroAdmirado.name,
      confianca: 'alta',
      fato: `${pessoaQueAdmira.name} admira isso em ${parceiroAdmirado.name}, e talvez nunca tenha dito: "${resposta.trim()}"`,
      sugestao_acao: `Fala isso em voz alta pra ${parceiroAdmirado.name} essa semana, com essas mesmas palavras ou parecidas — reconhecimento dito importa muito mais do que reconhecimento só sentido por dentro`
    }
  ];
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
    ...buildAutoReflexao(pessoaA),
    ...buildAutoReflexao(pessoaB),
    ...buildPontosValores(pessoaA, pessoaB, pessoaA, pessoaB),
    ...buildPontosValores(pessoaB, pessoaA, pessoaA, pessoaB),
    ...buildSurpresasEspeciais(pessoaA, pessoaB),
    ...buildSurpresasEspeciais(pessoaB, pessoaA),
    ...buildAdmiracaoNaoDita(pessoaA, pessoaB),
    ...buildAdmiracaoNaoDita(pessoaB, pessoaA)
  ];

  return findings;
}

module.exports = { buildFindings };
