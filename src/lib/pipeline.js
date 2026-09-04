// AGENTE GERENTE
// Orquestra todos os outros agentes (resultado individual, cruzamento de
// dados do casal, dicas quinzenais) e só entrega algo pra fora depois que
// o coordenador de qualidade correspondente aprovar (ou esgotar as
// tentativas e liberar o melhor esforço, registrando isso no status).

const store = require('./store');
const { buildResult } = require('./agents/resultAgent');
const { analyzeCouple, describePessoa } = require('./agents/crossAnalysisAgent');
const { generateTip } = require('./agents/tipsAgent');
const { generateScheduleDates } = require('./scheduler');

async function submitResponses(personId, name, responses) {
  const data = { respondent_id: personId, name, responses, submitted_at: new Date().toISOString() };
  store.writeJson('responses', personId, data);
  return data;
}

async function getOrBuildResult(personId, { force = false } = {}) {
  if (!force) {
    const cached = store.readJson('results', personId);
    if (cached) return cached;
  }

  const submission = store.readJson('responses', personId);
  if (!submission) return null;

  const result = await buildResult({ name: submission.name, responses: submission.responses });
  const payload = {
    respondent_id: personId,
    name: submission.name,
    ...result,
    generated_at: new Date().toISOString()
  };
  store.writeJson('results', personId, payload);
  return payload;
}

async function getOrBuildCoupleAnalysis(id1, id2, { force = false } = {}) {
  const cId = store.coupleId(id1, id2);
  if (!force) {
    const cached = store.readJson('analysis', cId);
    if (cached) return cached;
  }

  const result1 = await getOrBuildResult(id1);
  const result2 = await getOrBuildResult(id2);
  if (!result1 || !result2) return null;

  const pessoa1 = { name: result1.name, scores: result1.scores };
  const pessoa2 = { name: result2.name, scores: result2.scores };

  const { analysis, status, attempts } = await analyzeCouple(pessoa1, pessoa2);
  const payload = {
    couple_id: cId,
    pessoa1: describePessoa(pessoa1),
    pessoa2: describePessoa(pessoa2),
    analysis,
    status,
    attempts,
    generated_at: new Date().toISOString()
  };
  store.writeJson('analysis', cId, payload);
  return payload;
}

async function generateDueTips(id1, id2) {
  const cId = store.coupleId(id1, id2);
  const schedule = store.readTipsSchedule(cId);
  const today = new Date().toISOString().slice(0, 10);
  const scheduleDates = generateScheduleDates();

  if (!scheduleDates.includes(today) || schedule.delivered.includes(today)) {
    return { generated: false, reason: 'not_due_today', date: today };
  }

  const coupleAnalysis = await getOrBuildCoupleAnalysis(id1, id2);
  if (!coupleAnalysis) {
    return { generated: false, reason: 'missing_data' };
  }

  const weekIndex = Math.ceil((scheduleDates.indexOf(today) + 1) / 2);
  const [nome1, nome2] = [coupleAnalysis.pessoa1.nome, coupleAnalysis.pessoa2.nome];

  const tip1 = await generateTip({
    targetName: nome1,
    partnerName: nome2,
    analysis: coupleAnalysis.analysis,
    weekIndex
  });
  const tip2 = await generateTip({
    targetName: nome2,
    partnerName: nome1,
    analysis: coupleAnalysis.analysis,
    weekIndex
  });

  const entries = [tip1, tip2].map((tip, idx) => ({
    id: `${today}-${idx === 0 ? nome1 : nome2}`,
    date: today,
    target: idx === 0 ? nome1 : nome2,
    ...tip
  }));

  entries.forEach((entry) => store.appendTip(cId, entry));

  schedule.delivered.push(today);
  store.writeTipsSchedule(cId, schedule);

  return { generated: true, date: today, tips: entries };
}

module.exports = {
  submitResponses,
  getOrBuildResult,
  getOrBuildCoupleAnalysis,
  generateDueTips
};
