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
const { sendToSubscription } = require('./push');

// Manda push pra todos os aparelhos inscritos dessa pessoa. Silencioso se
// push não estiver configurado (sem VAPID) ou a pessoa não tiver nenhuma
// inscrição — o app funciona normalmente sem isso, é só um extra.
async function notifyPush(personId, tip) {
  const subscriptions = store.getPushSubscriptions(personId);
  if (!subscriptions.length) return;

  const payload = {
    title: 'Nova dica pra você',
    body: tip.texto.length > 140 ? `${tip.texto.slice(0, 137)}...` : tip.texto,
    url: '/'
  };

  await Promise.all(
    subscriptions.map(async (sub) => {
      const { expired } = await sendToSubscription(sub, payload);
      if (expired) store.removePushSubscription(personId, sub.endpoint);
    })
  );
}

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

  const [result1, result2] = await Promise.all([getOrBuildResult(id1), getOrBuildResult(id2)]);
  if (!result1 || !result2) return null;

  const submission1 = store.readJson('responses', id1);
  const submission2 = store.readJson('responses', id2);

  const pessoa1 = { name: result1.name, scores: result1.scores, responses: submission1.responses };
  const pessoa2 = { name: result2.name, scores: result2.scores, responses: submission2.responses };

  const { analysis, status } = await analyzeCouple(pessoa1, pessoa2);
  const payload = {
    couple_id: cId,
    pessoa1: describePessoa(pessoa1),
    pessoa2: describePessoa(pessoa2),
    analysis,
    status,
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

  // usedLog vem de store.readFindingsLog(): { [pessoa]: { [findingId]: isoDate } }
  const usados = usedLog[targetName] || {};
  const agora = Date.now();
  const disponiveis = candidatos.filter((f) => {
    const ultimoUso = usados[f.id];
    if (!ultimoUso) return true;
    const diasDesde = (agora - new Date(ultimoUso).getTime()) / 86400000;
    return diasDesde >= COOLDOWN_DIAS;
  });

  const pool = disponiveis.length ? disponiveis : candidatos;
  pool.sort((a, b) => {
    const la = usados[a.id] ? new Date(usados[a.id]).getTime() : 0;
    const lb = usados[b.id] ? new Date(usados[b.id]).getTime() : 0;
    return la - lb;
  });
  return pool[0];
}

// force=true ignora o calendário (pensado só pra testar o cruzamento sem
// esperar a próxima segunda/quinta) e não marca o dia como entregue — a
// entrega automática de verdade continua acontecendo normalmente depois.
async function generateDueTips(id1, id2, { force = false } = {}) {
  const cId = store.coupleId(id1, id2);
  const schedule = store.readTipsSchedule(cId);
  const today = new Date().toISOString().slice(0, 10);
  const scheduleDates = generateScheduleDates();

  if (!force && (!scheduleDates.includes(today) || schedule.delivered.includes(today))) {
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

  const [tip1, tip2] = await Promise.all([
    generateTip({ targetName: nome1, partnerName: nome2, finding: finding1 }),
    generateTip({ targetName: nome2, partnerName: nome1, finding: finding2 })
  ]);

  const entries = [
    { tip: tip1, target: nome1, finding: finding1 },
    { tip: tip2, target: nome2, finding: finding2 }
  ].map(({ tip, target, finding }) => ({
    id: force ? `${today}-${target}-forcado-${Date.now()}` : `${today}-${target}`,
    date: today,
    target,
    tipo: finding ? finding.tipo : null,
    forcado: force || undefined,
    ...tip
  }));

  entries.forEach((entry) => store.appendTip(cId, entry));
  if (finding1) store.markFindingUsed(cId, nome1, finding1.id, new Date().toISOString());
  if (finding2) store.markFindingUsed(cId, nome2, finding2.id, new Date().toISOString());

  const idPorNome = { [nome1]: id1, [nome2]: id2 };
  await Promise.all(entries.map((entry) => notifyPush(idPorNome[entry.target], entry)));

  if (force) {
    return { generated: true, date: today, tips: entries, forced: true };
  }

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
