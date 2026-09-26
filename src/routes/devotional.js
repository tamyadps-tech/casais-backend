// DEVOCIONAL DO DIA — mesmo versículo + estudo pros dois, de segunda a
// sexta, por um período de 3 meses (mesma ideia de janela de tempo das
// dicas em src/lib/scheduler.js, só que com dias úteis em vez de
// segunda/quinta/sábado). Rotação determinística pela posição do dia
// dentro da janela (sem custo de IA, sem estado salvo) — sempre o mesmo
// devocional pra todo mundo num dado dia, voltando ao início do banco
// quando a lista de conteúdo acaba antes da janela.

const express = require('express');
const devotionalBank = require('../data/devotionalBank');

const router = express.Router();

const START_DATE = process.env.DEVOTIONAL_START_DATE || new Date().toISOString().slice(0, 10);
const END_DATE = process.env.DEVOTIONAL_END_DATE || addMonths(START_DATE, 3);
const DIAS_UTEIS = [1, 2, 3, 4, 5]; // segunda a sexta (getUTCDay())

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

function gerarDiasUteis(startDate, endDate) {
  const dates = [];
  const cursor = toDateOnly(startDate);
  const end = toDateOnly(endDate);
  while (cursor <= end) {
    if (DIAS_UTEIS.includes(cursor.getUTCDay())) {
      dates.push(formatDate(cursor));
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return dates;
}

const DIAS_UTEIS_DA_JANELA = gerarDiasUteis(START_DATE, END_DATE);

function devotionalDoDia(date = new Date()) {
  const hoje = formatDate(date);
  if (hoje < START_DATE || hoje > END_DATE) {
    return { devotional: null, motivo: 'fora_do_periodo' };
  }

  const indice = DIAS_UTEIS_DA_JANELA.indexOf(hoje);
  if (indice === -1) {
    return { devotional: null, motivo: 'fim_de_semana' };
  }

  return { devotional: { ...devotionalBank[indice % devotionalBank.length], date: hoje } };
}

router.get('/today', (req, res) => {
  res.json({ success: true, ...devotionalDoDia() });
});

module.exports = router;
