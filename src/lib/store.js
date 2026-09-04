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

module.exports = {
  DATA_DIR,
  readJson,
  writeJson,
  coupleId,
  readTipsSchedule,
  writeTipsSchedule,
  appendTip,
  readTips
};
