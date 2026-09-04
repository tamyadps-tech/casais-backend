// Dicionários de apoio: descrições curtas usadas nos resultados (modo mock,
// sem chave de API) e como contexto enviado aos agentes de IA.

const personalidade = {
  extrovertido: 'se energiza com gente e com o mundo lá fora',
  introvertido: 'se energiza no próprio ritmo, em ambientes mais quietos',
  racional: 'tende a decidir com a cabeça, olhando fatos e lógica',
  emocional: 'tende a decidir com o coração, olhando o que sente',
  pratico: 'tem os pés no chão, gosta do concreto e do realista',
  idealista: 'gosta de imaginar possibilidades e ir além do óbvio',
  estruturado: 'se sente bem com planejamento, rotina e organização',
  espontaneo: 'se sente bem com improviso e liberdade de mudar de plano'
};

const temperamento = {
  sanguineo: {
    nome: 'Sanguíneo',
    descricao: 'animado(a), sociável, contagia o ambiente com energia e otimismo'
  },
  colerico: {
    nome: 'Colérico',
    descricao: 'decidido(a), direto(a), gosta de liderar e resolver rápido'
  },
  melancolico: {
    nome: 'Melancólico',
    descricao: 'reflexivo(a), detalhista, sente as coisas de forma profunda'
  },
  fleumatico: {
    nome: 'Fleumático',
    descricao: 'calmo(a), paciente, evita conflito e mantém a estabilidade'
  }
};

const apego = {
  seguro: {
    nome: 'Apego seguro',
    descricao: 'confia com naturalidade, se comunica bem e lida com distância sem pânico'
  },
  ansioso: {
    nome: 'Apego ansioso',
    descricao: 'busca proximidade e reafirmação constante, teme ser deixado(a) de lado'
  },
  evitativo: {
    nome: 'Apego evitativo',
    descricao: 'valoriza muito a independência e tem dificuldade de se abrir por completo'
  },
  desorganizado: {
    nome: 'Apego desorganizado',
    descricao: 'oscila entre buscar e afastar, misturando desejo de intimidade com medo dela'
  }
};

const feridas = {
  rejeicao: {
    nome: 'Rejeição',
    descricao: 'medo profundo de não ser aceito(a) por quem realmente é'
  },
  abandono: {
    nome: 'Abandono',
    descricao: 'medo de ser deixado(a) sozinho(a) por quem ama'
  },
  humilhacao: {
    nome: 'Humilhação',
    descricao: 'sensibilidade grande à vergonha e ao julgamento alheio'
  },
  traicao: {
    nome: 'Traição',
    descricao: 'dificuldade de confiar plenamente, mesmo sem motivo aparente'
  },
  injustica: {
    nome: 'Injustiça',
    descricao: 'forte reação a tratamento desigual ou desproporcional'
  }
};

const linguagemAmor = {
  palavras_afirmacao: {
    nome: 'Palavras de afirmação',
    descricao: 'se sente amado(a) ouvindo elogios e palavras sinceras de carinho'
  },
  tempo_qualidade: {
    nome: 'Tempo de qualidade',
    descricao: 'se sente amado(a) com atenção plena e presença de verdade'
  },
  presentes: {
    nome: 'Presentes',
    descricao: 'se sente amado(a) por gestos e mimos que mostram cuidado'
  },
  atos_servico: {
    nome: 'Atos de serviço',
    descricao: 'se sente amado(a) quando o outro ajuda na prática, sem precisar pedir'
  },
  toque_fisico: {
    nome: 'Toque físico',
    descricao: 'se sente amado(a) por contato físico, abraço e proximidade'
  }
};

module.exports = { personalidade, temperamento, apego, feridas, linguagemAmor };
