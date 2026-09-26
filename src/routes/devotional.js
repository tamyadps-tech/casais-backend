// DEVOCIONAL DO DIA — mesmo versículo + estudo pros dois, todo dia, sem
// depender de quem está logado. Rotação determinística por data (sem custo
// de IA, sem estado salvo): o índice de hoje é sempre o mesmo pra todo
// mundo, e volta ao início do banco quando a lista acaba.

const express = require('express');
const devotionalBank = require('../data/devotionalBank');

const router = express.Router();

const EPOCA = new Date('2024-01-01T00:00:00Z');
const UM_DIA_MS = 24 * 60 * 60 * 1000;

function devotionalDoDia(date = new Date()) {
  const dias = Math.floor((date.getTime() - EPOCA.getTime()) / UM_DIA_MS);
  const indice = ((dias % devotionalBank.length) + devotionalBank.length) % devotionalBank.length;
  return { ...devotionalBank[indice], date: date.toISOString().slice(0, 10) };
}

router.get('/today', (req, res) => {
  res.json({ success: true, devotional: devotionalDoDia() });
});

module.exports = router;
