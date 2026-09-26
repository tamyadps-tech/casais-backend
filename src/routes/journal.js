// DIÁRIO PESSOAL — conquistas, check-in de humor e notas livres sobre si
// ou sobre o parceiro. Complementa o questionário fixo de 98 perguntas:
// aqui dá pra adicionar informação nova a qualquer momento, sem precisar
// de uma pergunta pronta pra isso.

const express = require('express');
const store = require('../lib/store');

const router = express.Router();

const TIPOS_VALIDOS = ['conquista', 'humor', 'nota'];

router.get('/:personId', (req, res) => {
  res.json({ success: true, entries: store.readJournal(req.params.personId) });
});

router.post('/:personId', (req, res) => {
  const { type, text, mood, sobre } = req.body;

  if (!TIPOS_VALIDOS.includes(type)) {
    return res.status(400).json({ error: 'type deve ser "conquista", "humor" ou "nota"' });
  }
  if (type !== 'humor' && (!text || !String(text).trim())) {
    return res.status(400).json({ error: 'text é obrigatório pra esse tipo de registro' });
  }
  if (type === 'humor' && !mood) {
    return res.status(400).json({ error: 'mood é obrigatório pra um check-in de humor' });
  }
  if (type === 'nota' && !['mim', 'parceiro'].includes(sobre)) {
    return res.status(400).json({ error: 'sobre deve ser "mim" ou "parceiro"' });
  }

  const entry = store.addJournalEntry(req.params.personId, {
    type,
    text: text ? String(text).trim() : undefined,
    mood: type === 'humor' ? mood : undefined,
    sobre: type === 'nota' ? sobre : undefined
  });

  res.json({ success: true, entry });
});

router.delete('/:personId/:entryId', (req, res) => {
  const entries = store.removeJournalEntry(req.params.personId, req.params.entryId);
  res.json({ success: true, entries });
});

module.exports = router;
