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

  const submission1 = store.readJson('responses', id1);
  const submission2 = store.readJson('responses', id2);

  const pessoa1 = { name: result1.name, scores: result1.scores, responses: submission1.responses };
  const pessoa2 = { name: result2.name, scores: result2.scores, responses: submission2.responses };

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

// Escolhe, entre os findings do cruzamento de dados que se aplicam a esta
// pessoa, o que faz mais tempo não vira dica (ou nunca virou) — garante
// rotação entre os tipos de dica (gesto de amor, cuidado com ferida,
// dinâmica de apego, papo de valores, reforço) ao longo das ~21 semanas.
const COOLDOWN_DIAS = 42; // ~6 semanas — não repete o mesmo fato antes disso
function selectFinding(findings, targetName, usedLog) {
  const candidatos = findings.filter((f) => f.alvo === targetName);
  if (!candidatos.length) return null;

  const agora = Date.now();
  const disponiveis = candidatos.filter((f) => {
    const ultimoUso = usedLog[f.id];
    if (!ultimoUso) return true;
    const diasDesde = (agora - new Date(ultimoUso).getTime()) / 86400000;
    return diasDesde >= COOLDOWN_DIAS;
  });

  const pool = disponiveis.length ? disponiveis : candidatos;
  pool.sort((a, b) => {
    const la = usedLog[a.id] ? new Date(usedLog[a.id]).getTime() : 0;
    const lb = usedLog[b.id] ? new Date(usedLog[b.id]).getTime() : 0;
    return la - lb;
  });
  return pool[0];
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

  const [nome1, nome2] = [coupleAnalysis.pessoa1.nome, coupleAnalysis.pessoa2.nome];
  const findings = coupleAnalysis.analysis.findings || [];
  const usedLog = store.readFindingsLog(cId);

  const finding1 = selectFinding(findings, nome1, usedLog);
  const finding2 = selectFinding(findings, nome2, usedLog);

  const tip1 = await generateTip({ targetName: nome1, partnerName: nome2, finding: finding1 });
  const tip2 = await generateTip({ targetName: nome2, partnerName: nome1, finding: finding2 });

  const entries = [tip1, tip2].map((tip, idx) => ({
    id: `${today}-${idx === 0 ? nome1 : nome2}`,
    date: today,
    target: idx === 0 ? nome1 : nome2,
    ...tip
  }));

  entries.forEach((entry) => store.appendTip(cId, entry));
  if (finding1) store.markFindingUsed(cId, nome1, finding1.id, new Date().toISOString());
  if (finding2) store.markFindingUsed(cId, nome2, finding2.id, new Date().toISOString());

  schedule.delivered.push(today);
  store.writeTipsSchedule(cId, schedule);

  return { generated: true, date: today, tips: entries };
}

module.exports = {
  submitResponses,
  getOrBuildResult,
  getOrBuildCoupleAnalysis,
  generateDueTips,
  selectFinding
};
