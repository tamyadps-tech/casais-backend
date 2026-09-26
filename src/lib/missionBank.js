// BANCO DE MISSÕES INDIVIDUAIS — pequenos desafios práticos de autodesenvolvimento,
// derivados do estilo de apego, da ferida de infância principal e do temperamento
// de cada pessoa (o mesmo motor determinístico de src/lib/growthPoints.js, sem IA).
// Cada área tem várias variações pra não repetir sempre a mesma missão.

const APEGO_MISSOES = {
  seguro: [
    'Essa semana, seja você quem inicia uma conversa difícil que estava evitando — sua segurança ajuda o outro lado a se abrir também.',
    'Ofereça espaço pra alguém que precisa de tempo antes de falar sobre um assunto, sem cobrar uma resposta imediata.',
    'Reconheça em voz alta um esforço de alguém que costuma ter mais dificuldade com intimidade — sua naturalidade pode ser um convite pra ele(a).'
  ],
  ansioso: [
    'Da próxima vez que sentir vontade de pedir uma confirmação, espere 10 minutos antes de mandar a mensagem — só pra sentir a diferença.',
    'Escreva uma vez essa semana o que você está sentindo antes de agir por impulso — releia antes de decidir o que fazer com isso.',
    'Escolha um momento de silêncio do outro essa semana e, em vez de imaginar o pior, pergunte diretamente o que está acontecendo.'
  ],
  evitativo: [
    'Essa semana, peça ajuda pra alguém em algo pequeno que você normalmente resolveria sozinho(a).',
    'Compartilhe com alguém de confiança uma coisa que você sentiu recentemente e ainda não tinha dito em voz alta.',
    'Quando perceber vontade de se afastar de uma conversa importante, fique só mais 5 minutos antes de encerrar.'
  ],
  desorganizado: [
    'Quando notar o impulso de se afastar logo depois de se aproximar de alguém, pare e escreva o que disparou isso — sem julgamento, só observando.',
    'Escolha uma pessoa de confiança e conte a ela, com calma, sobre esse padrão de se aproximar e se afastar — só nomear já ajuda.',
    'Essa semana, quando sentir vontade de fugir de uma conversa, experimente ficar 2 minutos a mais antes de decidir sair dela.'
  ]
};

const FERIDA_MISSOES = {
  rejeicao: [
    'Da próxima vez que sentir que foi rejeitado(a), escreva 3 explicações possíveis pro que aconteceu além de "não gostaram de mim".',
    'Essa semana, faça algo que te expõe um pouco (dar uma opinião, se candidatar a algo) mesmo com medo de não ser bem aceito(a).',
    'Peça um feedback sincero pra alguém em quem você confia — treine ouvir sem já assumir que é uma crítica pessoal.'
  ],
  abandono: [
    'Passe um período dessa semana sem checar se alguém importante ainda "está por perto" — observe como isso te faz sentir.',
    'Escreva uma lista de 3 coisas que dependem só de você pra se sentir seguro(a), sem depender da presença de ninguém.',
    'Da próxima vez que alguém precisar de espaço, tente não interpretar isso como estar sendo deixado(a) de lado.'
  ],
  humilhacao: [
    'Essa semana, compartilhe algo que você normalmente esconderia por medo de julgamento — escolha uma pessoa seura pra isso.',
    'Quando perceber que está evitando algo por medo de errar na frente dos outros, faça mesmo assim, em pequena escala.',
    'Anote uma situação em que você se sentiu julgado(a) e escreva se isso realmente aconteceu ou se foi uma suposição sua.'
  ],
  traicao: [
    'Escolha uma pessoa e confie a ela uma informação pequena essa semana, mesmo sem ter garantia nenhuma de que ela vai honrar isso.',
    'Da próxima vez que desconfiar de alguém sem motivo concreto, pergunte diretamente em vez de investigar por conta própria.',
    'Reconheça pra você mesmo(a) uma vez essa semana em que confiar valeu a pena, mesmo que pequena.'
  ],
  injustica: [
    'Da próxima vez que sentir uma injustiça, espere 1 hora antes de reagir — depois decida se ainda vale a pena o mesmo nível de resposta.',
    'Escolha uma discussão recente e escreva se o tamanho da sua reação combinou com o tamanho do problema.',
    'Essa semana, deixe passar uma pequena desigualdade sem comentar — só pra treinar escolher suas batalhas.'
  ]
};

const TEMPERAMENTO_MISSOES = {
  colerico: [
    'Da próxima vez que sentir pressa ou irritação, respire fundo 3 vezes antes de falar qualquer coisa.',
    'Essa semana, deixe alguém terminar de falar uma ideia antes de dar sua opinião ou solução.',
    'Escolha uma decisão que você tomaria rápido e espere um dia inteiro antes de agir sobre ela.'
  ],
  sanguineo: [
    'Escolha uma tarefa que você começou animado(a) e termine ela essa semana, mesmo sem a empolgação inicial.',
    'Antes de começar algo novo, finalize algo que já está pela metade.',
    'Reserve um horário fixo essa semana só pra uma atividade que exige foco contínuo, sem trocar de tarefa no meio.'
  ],
  melancolico: [
    'Compartilhe com alguém o que você está sentindo antes de ter processado tudo sozinho(a) — mesmo que pareça cedo demais.',
    'Escolha uma decisão pequena essa semana e tome ela sem buscar a opção perfeita.',
    'Quando perceber que está analisando demais uma situação, escreva um limite de tempo pra decidir e respeite ele.'
  ],
  fleumatico: [
    'Da próxima vez que discordar de algo, diga isso em voz alta, mesmo que seja mais fácil deixar quieto.',
    'Escolha uma situação que está te incomodando há um tempo e comente sobre ela essa semana, com calma.',
    'Proponha você a atividade dessa semana, em vez de esperar que alguém decida por você.'
  ]
};

function buildMissionPool(scores) {
  const pool = [];

  const estiloApego = scores.apego && scores.apego.dominante;
  (APEGO_MISSOES[estiloApego] || []).forEach((texto) => {
    pool.push({ area: 'Conexão emocional', texto });
  });

  const feridaPrincipal = scores.feridas_infancia && scores.feridas_infancia.dominantes[0];
  (FERIDA_MISSOES[feridaPrincipal] || []).forEach((texto) => {
    pool.push({ area: 'Autoconhecimento', texto });
  });

  const tempPrincipal = scores.temperamento && scores.temperamento.dominantes[0];
  (TEMPERAMENTO_MISSOES[tempPrincipal] || []).forEach((texto) => {
    pool.push({ area: 'Temperamento', texto });
  });

  return pool;
}

module.exports = { buildMissionPool };
