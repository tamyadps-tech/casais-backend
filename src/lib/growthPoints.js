// PONTOS A TRABALHAR — áreas de desenvolvimento pessoal, derivadas
// diretamente da pontuação de cada um (o mesmo motor determinístico usado
// no resultado individual, sem IA). Sempre em 2ª pessoa, como um convite
// pra crescer — nunca como rótulo de diagnóstico.

const APEGO_PONTO = {
  seguro: 'Continuar dando espaço e consistência pra quem tem mais dificuldade com isso — sua facilidade natural é rara e vale ser cultivada.',
  ansioso: 'Praticar ficar bem com a incerteza sem precisar de confirmação o tempo todo — notar quando a ansiedade fala mais alto que a realidade.',
  evitativo: 'Se permitir pedir ajuda e mostrar vulnerabilidade, mesmo quando o instinto é resolver tudo sozinho(a).',
  desorganizado: 'Notar o padrão de se aproximar e se afastar sem entender totalmente por quê, e dar um passo de cada vez rumo a mais estabilidade.'
};

const FERIDA_PONTO = {
  rejeicao: 'Trabalhar a sensibilidade a se sentir rejeitado(a) — nem tudo que parece rejeição é sobre você.',
  abandono: 'Construir mais segurança interna, pra que o medo de ser deixado(a) não guie tanto as reações no dia a dia.',
  humilhacao: 'Cuidar da relação com exposição e julgamento alheio — nem todo olhar é crítica.',
  traicao: 'Praticar confiar aos poucos, mesmo sem garantia nenhuma — é um músculo que se desenvolve com repetição, não de uma vez.',
  injustica: 'Notar quando a sensibilidade a injustiça amplia um conflito que, sozinho, seria pequeno.'
};

const TEMPERAMENTO_PONTO = {
  colerico: 'Cuidar do tom nos momentos de pressa ou irritação — sua clareza é um ponto forte, mas pode pesar se vier sem suavidade.',
  sanguineo: 'Sustentar o foco depois que a empolgação inicial passa — o entusiasmo é seu combustível, a constância é o que vale treinar.',
  melancolico: 'Compartilhar o que sente antes de processar tudo sozinho(a) — nem sempre é preciso ter a resposta perfeita pra começar a falar.',
  fleumatico: 'Se posicionar mesmo quando é mais fácil deixar quieto — sua calma é um dom, mas evitar todo conflito tem um custo.'
};

function buildGrowthPoints(scores) {
  const pontos = [];

  const estiloApego = scores.apego && scores.apego.dominante;
  if (APEGO_PONTO[estiloApego]) {
    pontos.push({ area: 'Conexão emocional', texto: APEGO_PONTO[estiloApego] });
  }

  const feridaPrincipal = scores.feridas_infancia && scores.feridas_infancia.dominantes[0];
  if (FERIDA_PONTO[feridaPrincipal]) {
    pontos.push({ area: 'Autoconhecimento', texto: FERIDA_PONTO[feridaPrincipal] });
  }

  const tempPrincipal = scores.temperamento && scores.temperamento.dominantes[0];
  if (TEMPERAMENTO_PONTO[tempPrincipal]) {
    pontos.push({ area: 'Temperamento', texto: TEMPERAMENTO_PONTO[tempPrincipal] });
  }

  return pontos;
}

module.exports = { buildGrowthPoints };
