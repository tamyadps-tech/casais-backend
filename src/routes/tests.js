const express = require('express');
const store = require('../lib/store');
const pipeline = require('../lib/pipeline');

const router = express.Router();

// Submeter respostas das 90 perguntas
router.post('/submit', async (req, res) => {
  try {
    const { respondent_id, name, responses } = req.body;
    if (!respondent_id || !name || !responses) {
      return res.status(400).json({ error: 'Missing required fields: respondent_id, name, responses' });
    }
    const saved = await pipeline.submitResponses(respondent_id, name, responses);
    res.json({ success: true, message: 'Respostas salvas', respondent_id, submitted_at: saved.submitted_at });
  } catch (error) {
    console.error('Error in /api/test/submit:', error);
    res.status(500).json({ error: error.message });
  }
});

// Status da submissão
router.get('/status/:id', (req, res) => {
  const data = store.readJson('responses', req.params.id);
  if (!data) return res.json({ status: 'not_found' });
  res.json({
    status: 'submitted',
    respondent_id: req.params.id,
    name: data.name,
    submitted_at: data.submitted_at,
    pending: pipeline.pendingQuestionIds(data.responses)
  });
});

// Completa pergunta(s) nova(s) que foram adicionadas ao banco depois que a
// pessoa já tinha respondido tudo — nunca altera respostas já dadas, só
// soma a(s) nova(s). Invalida o resultado (e a análise do casal, se
// partner_id vier) em cache pra recalcular com o dado novo.
router.post('/complete', async (req, res) => {
  try {
    const { respondent_id, responses, partner_id } = req.body;
    if (!respondent_id || !responses || typeof responses !== 'object' || Array.isArray(responses)) {
      return res.status(400).json({ error: 'Missing required fields: respondent_id, responses' });
    }
    const updated = await pipeline.completeResponses(respondent_id, partner_id, responses);
    if (!updated) {
      return res.status(404).json({ error: 'Respostas não encontradas para este respondent_id — complete o questionário primeiro' });
    }
    res.json({ success: true, pending: updated.pending });
  } catch (error) {
    console.error('Error in /api/test/complete:', error);
    res.status(500).json({ error: error.message });
  }
});

// Resultado individual (agente de resultado + coordenador de qualidade)
router.get('/result/:id', async (req, res) => {
  try {
    const result = await pipeline.getOrBuildResult(req.params.id, { force: req.query.refresh === 'true' });
    if (!result) return res.status(404).json({ error: 'Respostas não encontradas para este respondent_id' });
    res.json({ success: true, result });
  } catch (error) {
    console.error('Error in /api/test/result:', error);
    res.status(500).json({ error: error.message });
  }
});

// Processa os dois respondentes: cruza os dados (agente de cruzamento)
router.post('/process', async (req, res) => {
  try {
    const { respondent_id_1, respondent_id_2 } = req.body;
    if (!respondent_id_1 || !respondent_id_2) {
      return res.status(400).json({ error: 'Missing respondent_id_1 / respondent_id_2' });
    }
    const analysis = await pipeline.getOrBuildCoupleAnalysis(respondent_id_1, respondent_id_2, {
      force: req.query.refresh === 'true'
    });
    if (!analysis) {
      return res.status(400).json({ error: 'Um ou ambos os respondentes ainda não têm resultado gerado' });
    }
    res.json({ success: true, message: 'Análise do casal gerada', analysis });
  } catch (error) {
    console.error('Error in /api/test/process:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
