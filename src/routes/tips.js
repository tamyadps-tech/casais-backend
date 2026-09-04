const express = require('express');
const store = require('../lib/store');
const pipeline = require('../lib/pipeline');
const { generateScheduleDates, START_DATE, END_DATE } = require('../lib/scheduler');

const router = express.Router();

// Todas as dicas já entregues pro casal
router.get('/:id1/:id2', (req, res) => {
  const cId = store.coupleId(req.params.id1, req.params.id2);
  const tips = store.readTips(cId);
  res.json({ success: true, couple_id: cId, total: tips.length, tips });
});

// Só as dicas de uma das pessoas do casal
router.get('/:id1/:id2/mine/:target', (req, res) => {
  const cId = store.coupleId(req.params.id1, req.params.id2);
  const tips = store.readTips(cId).filter((t) => t.target === req.params.target);
  res.json({ success: true, couple_id: cId, total: tips.length, tips });
});

// Calendário completo de entregas (datas), pra referência
router.get('/schedule/:id1/:id2', (req, res) => {
  const cId = store.coupleId(req.params.id1, req.params.id2);
  const schedule = store.readTipsSchedule(cId);
  res.json({
    success: true,
    inicio: START_DATE,
    fim: END_DATE,
    frequencia: 'segunda e quinta-feira',
    datas: generateScheduleDates(),
    entregues: schedule.delivered
  });
});

// Dispara a geração da dica do dia manualmente (o cron já faz isso sozinho,
// esta rota existe pra testar ou pra rodar na mão se o servidor cair no dia).
router.post('/generate/:id1/:id2', async (req, res) => {
  try {
    const result = await pipeline.generateDueTips(req.params.id1, req.params.id2);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error('Error in /api/tips/generate:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
