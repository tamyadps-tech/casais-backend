// DEVOCIONAL DO DIA — mesmo versículo + estudo pros dois, todo santo dia,
// por um período de 3 meses. Rotação determinística pela posição do dia
// dentro dessa janela (sem custo de IA, sem estado salvo) — sempre o mesmo
// devocional pra todo mundo num dado dia, voltando ao início do banco
// quando a lista de conteúdo acaba antes da janela.

const express = require('express');
const devotionalBank = require('../data/devotionalBank');

const router = express.Router();

const START_DATE = process.env.DEVOTIONAL_START_DATE || new Date().toISOString().slice(0, 10);
const END_DATE = process.env.DEVOTIONAL_END_DATE || addMonths(START_DATE, 3);

function addMonths(dateStr, months) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() + months);
  return d.toISOString().slice(0, 10);
}

function toDateOnly(d) {
  return new Date(`${d}T00:00:00Z`);
}

function formatDate(d) {
  return d.toISOString().slice(0, 10);
}

function gerarDiasDaJanela(startDate, endDate) {
  const dates = [];
  const cursor = toDateOnly(startDate);
  const end = toDateOnly(endDate);
  while (cursor <= end) {
    dates.push(formatDate(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return dates;
}

const DIAS_DA_JANELA = gerarDiasDaJanela(START_DATE, END_DATE);

function devotionalDoDia(date = new Date()) {
  const hoje = formatDate(date);
  if (hoje < START_DATE || hoje > END_DATE) {
    return { devotional: null, motivo: 'fora_do_periodo' };
  }

  const indice = DIAS_DA_JANELA.indexOf(hoje);
  return { devotional: { ...devotionalBank[indice % devotionalBank.length], date: hoje } };
}

router.get('/today', (req, res) => {
  res.json({ success: true, ...devotionalDoDia() });
});

module.exports = router;
