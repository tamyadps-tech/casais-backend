const express = require('express');
const store = require('../lib/store');
const { buildIcsFeed } = require('../lib/calendarFeed');
const { generateScheduleDates, DELIVERY_HOUR } = require('../lib/scheduler');

const router = express.Router();

// Feed .ics assinável: cole esta URL no Google Agenda / Apple Calendar
// ("Adicionar calendário" > "A partir de URL"). Cada dica quinzenal vira um
// evento; dicas já entregues aparecem com o texto completo na descrição,
// as futuras aparecem como lembrete até serem geradas no dia.
router.get('/:id1/:id2/:targetFile', (req, res) => {
  const { id1, id2 } = req.params;
  const target = req.params.targetFile.replace(/\.ics$/i, '');
  const cId = store.coupleId(id1, id2);
  const tips = store.readTips(cId).filter((t) => t.target === target);
  const tipByDate = new Map(tips.map((t) => [t.date, t]));

  const events = generateScheduleDates().map((date) => {
    const tip = tipByDate.get(date);
    return {
      id: `${cId}-${target}-${date}`,
      date,
      hour: DELIVERY_HOUR,
      title: tip ? `💜 Dica pra você, ${target}` : '💜 Sua dica de relacionamento chega hoje',
      description: tip ? tip.texto : 'Abra o app pra ver sua dica personalizada de hoje.'
    };
  });

  const ics = buildIcsFeed({ calendarName: `Dicas de relacionamento — ${target}`, events });
  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', `inline; filename="dicas-${target}.ics"`);
  res.send(ics);
});

module.exports = router;
