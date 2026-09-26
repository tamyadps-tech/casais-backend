// MISSÕES INDIVIDUAIS — um desafio prático de cada vez, derivado do perfil
// da própria pessoa (apego, ferida principal, temperamento), separado das
// dicas de casal. Marcar como feita ou não feita fecha a missão atual e
// libera a próxima da rotação.

const express = require('express');
const pipeline = require('../lib/pipeline');

const router = express.Router();

router.get('/:personId', async (req, res) => {
  try {
    const state = await pipeline.getOrAssignMission(req.params.personId);
    if (!state) return res.status(404).json({ error: 'Respostas não encontradas para este respondent_id' });
    res.json({ success: true, ...state });
  } catch (error) {
    console.error('Error in /api/missions/:personId:', error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/:personId/complete', (req, res) => {
  const { status } = req.body;
  if (!['feita', 'nao_feita'].includes(status)) {
    return res.status(400).json({ error: 'status deve ser "feita" ou "nao_feita"' });
  }
  const state = pipeline.completeMission(req.params.personId, status);
  res.json({ success: true, ...state });
});

module.exports = router;
