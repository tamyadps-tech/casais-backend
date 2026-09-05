const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR || '/tmp/casais-data';

const SUBDIRS = ['responses', 'results', 'analysis', 'tips'];

function ensureDirs() {
  SUBDIRS.forEach((sub) => {
    const dir = path.join(DATA_DIR, sub);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
}
ensureDirs();

function safeId(id) {
  return String(id).replace(/[^a-zA-Z0-9_-]/g, '');
}

function filePath(sub, name) {
  return path.join(DATA_DIR, sub, `${safeId(name)}.json`);
}

function readJson(sub, name) {
  const p = filePath(sub, name);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJson(sub, name, data) {
  const dir = path.join(DATA_DIR, sub);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath(sub, name), JSON.stringify(data, null, 2));
}

function removeJson(sub, name) {
  const p = filePath(sub, name);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

// Soma respostas novas (ex: uma pergunta adicionada depois que a pessoa já
// tinha respondido tudo) às já salvas, sem apagar nada do que já existia —
// usado pelo fluxo de "completar" (ver pipeline.js).
function mergeResponses(personId, extraResponses) {
  const existing = readJson('responses', personId);
  if (!existing) return null;
  const merged = {
    ...existing,
    responses: { ...existing.responses, ...extraResponses },
    updated_at: new Date().toISOString()
  };
  writeJson('responses', personId, merged);
  return merged;
}

function coupleId(id1, id2) {
  return [safeId(id1), safeId(id2)].sort().join('__');
}

function tipsDir(cId) {
  const dir = path.join(DATA_DIR, 'tips', safeId(cId));
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function readTipsSchedule(cId) {
  const p = path.join(tipsDir(cId), 'schedule.json');
  if (!fs.existsSync(p)) return { delivered: [] };
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeTipsSchedule(cId, schedule) {
  const p = path.join(tipsDir(cId), 'schedule.json');
  fs.writeFileSync(p, JSON.stringify(schedule, null, 2));
}

function appendTip(cId, tip) {
  const p = path.join(tipsDir(cId), 'tips.json');
  const list = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : [];
  list.push(tip);
  fs.writeFileSync(p, JSON.stringify(list, null, 2));
  return list;
}

function readTips(cId) {
  const p = path.join(tipsDir(cId), 'tips.json');
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

// Rotação round-robin por categoria de frase (ex: 'valores_alta',
// 'ferida_rejeicao') — ver src/lib/phraseBank.js. Cada vez que uma frase
// dessa categoria é usada, avança pro próximo índice, garantindo que as
// variações do banco não se repitam em sequência.
function phraseIndexPath(cId) {
  return path.join(tipsDir(cId), 'phrase-index.json');
}

function readPhraseIndex(cId) {
  const p = phraseIndexPath(cId);
  if (!fs.existsSync(p)) return {};
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function nextPhraseVariant(cId, key, poolSize) {
  const idx = readPhraseIndex(cId);
  const current = (idx[key] || 0) % poolSize;
  idx[key] = (current + 1) % poolSize;
  fs.writeFileSync(phraseIndexPath(cId), JSON.stringify(idx, null, 2));
  return current;
}

// Log de findings (do cruzamento de dados, ver src/lib/crossRules.js) já
// usados como dica, por pessoa — evita repetir o mesmo fato antes do
// cooldown e permite escolher sempre o menos usado recentemente.
function readFindingsLog(cId) {
  const p = path.join(tipsDir(cId), 'findings-log.json');
  if (!fs.existsSync(p)) return {};
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function markFindingUsed(cId, personName, findingId, whenIso) {
  const log = readFindingsLog(cId);
  if (!log[personName]) log[personName] = {};
  log[personName][findingId] = whenIso;
  fs.writeFileSync(path.join(tipsDir(cId), 'findings-log.json'), JSON.stringify(log, null, 2));
  return log;
}

// Inscrições de notificação push (Web Push), por pessoa. Um mesmo aparelho
// pode reinscrever (endpoint muda raramente, mas o browser pode trocar) —
// dedupe por endpoint.
function pushFilePath(personId) {
  const dir = path.join(DATA_DIR, 'push');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, `${safeId(personId)}.json`);
}

function getPushSubscriptions(personId) {
  const p = pushFilePath(personId);
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function savePushSubscription(personId, subscription) {
  const list = getPushSubscriptions(personId).filter((s) => s.endpoint !== subscription.endpoint);
  list.push(subscription);
  fs.writeFileSync(pushFilePath(personId), JSON.stringify(list, null, 2));
  return list;
}

function removePushSubscription(personId, endpoint) {
  const list = getPushSubscriptions(personId).filter((s) => s.endpoint !== endpoint);
  fs.writeFileSync(pushFilePath(personId), JSON.stringify(list, null, 2));
  return list;
}

// Apaga tudo (respostas, resultados, análise cruzada, dicas e histórico de
// rotação) de um casal — usado pra zerar dados de teste antes da rodada
// "de verdade". Sempre por trás de um endpoint protegido, nunca chamado
// direto por rota pública sem confirmação.
function resetCouple(id1, id2) {
  const cId = coupleId(id1, id2);
  const removed = [];

  [id1, id2].forEach((id) => {
    ['responses', 'results'].forEach((sub) => {
      const p = filePath(sub, id);
      if (fs.existsSync(p)) {
        fs.unlinkSync(p);
        removed.push(`${sub}/${safeId(id)}`);
      }
    });
  });

  const analysisPath = filePath('analysis', cId);
  if (fs.existsSync(analysisPath)) {
    fs.unlinkSync(analysisPath);
    removed.push(`analysis/${cId}`);
  }

  const tDir = path.join(DATA_DIR, 'tips', safeId(cId));
  if (fs.existsSync(tDir)) {
    fs.rmSync(tDir, { recursive: true, force: true });
    removed.push(`tips/${cId}`);
  }

  return { couple_id: cId, removed };
}

module.exports = {
  DATA_DIR,
  readJson,
  writeJson,
  removeJson,
  mergeResponses,
  coupleId,
  readTipsSchedule,
  writeTipsSchedule,
  appendTip,
  readTips,
  readFindingsLog,
  markFindingUsed,
  nextPhraseVariant,
  resetCouple,
  getPushSubscriptions,
  savePushSubscription,
  removePushSubscription
};
