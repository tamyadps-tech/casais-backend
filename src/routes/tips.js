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
// Aceita GET e POST pra poder ser colada direto na barra de endereço.
// Com ?force=true ignora o calendário (exige ?key=ADMIN_RESET_KEY, já que
// gera uma dica de verdade via IA fora do horário programado) — pensado
// pra conferir o cruzamento de dados sem esperar a próxima segunda/quinta.
router.all('/generate/:id1/:id2', async (req, res) => {
  try {
    const force = req.query.force === 'true';
    if (force) {
      const adminKey = process.env.ADMIN_RESET_KEY;
      if (!adminKey || req.query.key !== adminKey) {
        return res.status(403).json({ error: 'Geração forçada exige ?key=SUA_CHAVE igual à ADMIN_RESET_KEY configurada no servidor.' });
      }
    }
    const result = await pipeline.generateDueTips(req.params.id1, req.params.id2, { force });
    res.json({ success: true, ...result });
  } catch (error) {
    console.error('Error in /api/tips/generate:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
