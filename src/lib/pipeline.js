// AGENTE GERENTE
// Orquestra todos os outros agentes (resultado individual, cruzamento de
// dados do casal, dicas quinzenais) e só entrega algo pra fora depois que
// o coordenador de qualidade correspondente aprovar (ou esgotar as
// tentativas e liberar o melhor esforço, registrando isso no status).

const store = require('./store');
const questions = require('../data/questions');
const { resolveConselho } = require('./phraseBank');
const { buildResult } = require('./agents/resultAgent');
const { analyzeCouple, describePessoa } = require('./agents/crossAnalysisAgent');
const { generateTip } = require('./agents/tipsAgent');
const { generateScheduleDates } = require('./scheduler');
const { sendToSubscription } = require('./push');
const { buildGrowthPoints } = require('./growthPoints');
const { buildMissionPool } = require('./missionBank');

// Manda push pra todos os aparelhos inscritos dessa pessoa. Silencioso se
// push não estiver configurado (sem VAPID) ou a pessoa não tiver nenhuma
// inscrição — o app funciona normalmente sem isso, é só um extra.
async function sendPush(personId, { title, body }) {
  const subscriptions = store.getPushSubscriptions(personId);
  if (!subscriptions.length) return;

  const payload = {
    title,
    body: body.length > 140 ? `${body.slice(0, 137)}...` : body,
    url: '/'
  };

  await Promise.all(
    subscriptions.map(async (sub) => {
      const { expired } = await sendToSubscription(sub, payload);
      if (expired) store.removePushSubscription(personId, sub.endpoint);
    })
  );
}

function notifyPush(personId, tip) {
  return sendPush(personId, { title: 'Nova dica pra você', body: tip.texto });
}

function notifyResultReady(personId, name) {
  return sendPush(personId, {
    title: 'Seu resultado está pronto',
    body: `${name}, seu perfil de autoconhecimento já foi gerado — dá uma olhada no app.`
  });
}

// Casal original fixo (o par de uso pessoal de antes dos convites
// existirem) + qualquer casal que tenha entrado depois por convite (ver
// src/lib/store.js) — usado só pra saber quem avisar quando o outro
// responde o questionário.
const PERSON_1_ID = process.env.COUPLE_PERSON_1_ID || 'tamyris';
const PERSON_2_ID = process.env.COUPLE_PERSON_2_ID || 'saulo';
function partnerIdOf(personId) {
  if (personId === PERSON_1_ID) return PERSON_2_ID;
  if (personId === PERSON_2_ID) return PERSON_1_ID;

  const convidado = store.listActivatedInvites().find(
    (invite) => invite.pessoa1.id === personId || invite.pessoa2.id === personId
  );
  if (!convidado) return null;
  return convidado.pessoa1.id === personId ? convidado.pessoa2.id : convidado.pessoa1.id;
}

function notifyPartnerSubmitted(personId, name) {
  const partnerId = partnerIdOf(personId);
  if (!partnerId) return Promise.resolve();
  return sendPush(partnerId, {
    title: 'Questionário respondido!',
    body: `${name} acabou de responder o questionário — em breve as dicas cruzadas de vocês dois começam a chegar.`
  });
}

// Todo mundo que já usa o app hoje — casal original fixo + todo casal
// ativado por convite — usado só pra avisar de novidades do próprio app
// (ver notifyAppUpdate em server.js).
function todasAsPessoas() {
  const pessoas = [PERSON_1_ID, PERSON_2_ID];
  store.listActivatedInvites().forEach((invite) => {
    pessoas.push(invite.pessoa1.id, invite.pessoa2.id);
  });
  return pessoas;
}

// Avisa todo mundo (sem custo de IA, só um push) quando o app ganha
// novidade — pergunta nova, devocional, funcionalidade nova etc. Chamado
// uma vez por versão (ver server.js), nunca a cada reinício do servidor.
async function notifyAppUpdate(message) {
  await Promise.all(
    todasAsPessoas().map((personId) => sendPush(personId, { title: 'Novidade no app', body: message }))
  );
}

async function submitResponses(personId, name, responses) {
  const data = { respondent_id: personId, name, responses, submitted_at: new Date().toISOString() };
  store.writeJson('responses', personId, data);
  await notifyPartnerSubmitted(personId, name);
  return data;
}

// Perguntas ativas ainda sem resposta — usado quando uma pergunta nova é
// adicionada ao banco depois que a pessoa já respondeu tudo (ver rota
// /api/test/complete): permite oferecer só o que falta, sem reabrir o
// questionário inteiro nem tocar no que já foi respondido.
function pendingQuestionIds(responses) {
  return questions.filter((q) => (responses || {})[q.id] === undefined).map((q) => q.id);
}

// Soma respostas de pergunta(s) nova(s) às já salvas e invalida o
// resultado individual (e a análise do casal, se o parceiro(a) for
// informado) em cache, pra que sejam recalculados incorporando a resposta
// nova — sem apagar nenhuma resposta anterior.
async function completeResponses(personId, partnerId, extraResponses) {
  const updated = store.mergeResponses(personId, extraResponses);
  if (!updated) return null;

  store.removeJson('results', personId);
  if (partnerId) {
    store.removeJson('analysis', store.coupleId(personId, partnerId));
  }

  return { ...updated, pending: pendingQuestionIds(updated.responses) };
}

async function getOrBuildResult(personId, { force = false } = {}) {
  if (!force) {
    const cached = store.readJson('results', personId);
    // "pontos a trabalhar" é determinístico e sem custo de IA — recalcula
    // sempre a partir da pontuação já salva, mesmo em resultados antigos
    // gerados antes desse recurso existir, sem precisar forçar regeneração.
    if (cached) return { ...cached, pontosCrescimento: buildGrowthPoints(cached.scores) };
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
  await notifyResultReady(personId, submission.name);
  return payload;
}

// MISSÕES INDIVIDUAIS — desafio pequeno e prático, um de cada vez, derivado
// do perfil da pessoa (ver src/lib/missionBank.js). Sem custo de IA: só
// escolhe da rotação. Se já existe uma missão pendente, devolve ela; senão
// atribui a próxima da rotação (por área, sem repetir antes de passar por
// todas as outras).
async function getOrAssignMission(personId) {
  const result = await getOrBuildResult(personId);
  if (!result) return null;

  const pool = buildMissionPool(result.scores);
  const state = store.readMissionsState(personId);
  if (state.current) return state;
  if (!pool.length) return state;

  const idx = (state.poolIndex || 0) % pool.length;
  const chosen = pool[idx];
  const mission = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    area: chosen.area,
    texto: chosen.texto,
    status: 'pendente',
    createdAt: new Date().toISOString()
  };
  const newState = {
    current: mission,
    history: state.history || [],
    poolIndex: idx + 1
  };
  store.writeMissionsState(personId, newState);
  return newState;
}

function completeMission(personId, status) {
  const state = store.readMissionsState(personId);
  if (!state.current) return state;

  const finished = { ...state.current, status, completedAt: new Date().toISOString() };
  const newState = {
    current: null,
    history: [finished, ...(state.history || [])],
    poolIndex: state.poolIndex || 0
  };
  store.writeMissionsState(personId, newState);
  return newState;
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
// dinâmica de apego, papo de valores, reforço) ao longo das ~14 semanas
// (segunda, quinta e sábado — 3 entregas por semana).
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

// Decide o que vai na dica de uma pessoa: sempre DOIS findings "principais"
// (sobre o parceiro, de tipos diferentes quando possível — ex: um papo de
// valores + um gesto de amor) misturados no início da dica, seguidos de um
// de autorreflexão (sobre a própria vida) — desde a primeiríssima dica,
// já completa, sem uma versão simplificada de "boas-vindas".
function pickTipInputs(targetName, findings, usedLog) {
  const poolPrincipal = findings.filter((f) => f.alvo === targetName && f.tipo !== 'auto_reflexao');
  const poolAuto = findings.filter((f) => f.alvo === targetName && f.tipo === 'auto_reflexao');

  const principal1 = selectFinding(poolPrincipal, targetName, usedLog);
  const restante = poolPrincipal.filter((f) => !principal1 || f.id !== principal1.id);
  // Prioriza um segundo finding de tipo DIFERENTE do primeiro sempre que
  // existir algum disponível — sem isso, como "papo_valores"/"reforco" tem
  // dezenas de perguntas de valores candidatas (uma por VAL_QUESTION_ID) e
  // os outros tipos (gesto, apego, ferida, surpresa especial) têm só um
  // punhado, os dois findings principais do dia quase sempre acabavam
  // sendo os dois de valores, afogando os tipos mais raros (e mais ricos,
  // como a surpresa especial com as respostas abertas) por meses.
  const restanteOutroTipo = principal1 ? restante.filter((f) => f.tipo !== principal1.tipo) : restante;
  const principal2 = selectFinding(restanteOutroTipo.length ? restanteOutroTipo : restante, targetName, usedLog);

  return {
    findings: [principal1, principal2].filter(Boolean),
    autoFinding: selectFinding(poolAuto, targetName, usedLog)
  };
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

  // force: true de propósito — analyzeCouple() é 100% determinístico e sem
  // custo de IA (IA_DESLIGADA_AQUI em crossAnalysisAgent.js), então não há
  // motivo pra reusar uma análise antiga em cache: isso faria qualquer
  // mudança em crossRules.js/phraseBank.js nunca valer pra um casal que já
  // tinha uma análise salva antes da mudança. Recalcular sempre garante
  // que a dica de hoje reflita o código de hoje.
  const coupleAnalysis = await getOrBuildCoupleAnalysis(id1, id2, { force: true });
  if (!coupleAnalysis) {
    return { generated: false, reason: 'missing_data' };
  }

  const [nome1, nome2] = [coupleAnalysis.pessoa1.nome, coupleAnalysis.pessoa2.nome];
  const findings = coupleAnalysis.analysis.findings || [];
  const usedLog = store.readFindingsLog(cId);

  const { findings: findings1, autoFinding: autoFinding1 } = pickTipInputs(nome1, findings, usedLog);
  const { findings: findings2, autoFinding: autoFinding2 } = pickTipInputs(nome2, findings, usedLog);

  // Troca o sugestao_acao padrão por uma variação rotacionada do banco de
  // frases (ver phraseBank.js) — garante que o mesmo conselho não se
  // repita toda vez que o mesmo finding voltar a ser escolhido.
  [...findings1, autoFinding1, ...findings2, autoFinding2].forEach((f) => {
    if (f) f.sugestao_acao = resolveConselho(f, cId);
  });

  const [tip1, tip2] = await Promise.all([
    generateTip({ targetName: nome1, partnerName: nome2, findings: findings1, autoFinding: autoFinding1 }),
    generateTip({ targetName: nome2, partnerName: nome1, findings: findings2, autoFinding: autoFinding2 })
  ]);

  const entries = [
    { tip: tip1, target: nome1, findings: findings1 },
    { tip: tip2, target: nome2, findings: findings2 }
  ].map(({ tip, target, findings: principais }) => ({
    id: force ? `${today}-${target}-forcado-${Date.now()}` : `${today}-${target}`,
    date: today,
    target,
    tipo: principais.map((f) => f.tipo),
    forcado: force || undefined,
    ...tip
  }));

  entries.forEach((entry) => store.appendTip(cId, entry));
  const agoraIso = new Date().toISOString();
  findings1.forEach((f) => store.markFindingUsed(cId, nome1, f.id, agoraIso));
  if (autoFinding1) store.markFindingUsed(cId, nome1, autoFinding1.id, agoraIso);
  findings2.forEach((f) => store.markFindingUsed(cId, nome2, f.id, agoraIso));
  if (autoFinding2) store.markFindingUsed(cId, nome2, autoFinding2.id, agoraIso);

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
  selectFinding,
  pendingQuestionIds,
  completeResponses,
  getOrAssignMission,
  completeMission,
  notifyAppUpdate
};
