const express = require('express');
const questions = require('../data/questions');

const router = express.Router();

// Nunca expõe as tags internas de pontuação — só o texto que a pessoa vê.
function publicView(q) {
  const base = { id: q.id, categoria: q.categoria, tipo: q.tipo, texto: q.texto };
  if (q.tipo === 'multipla_escolha' || q.tipo === 'selecao_multipla') {
    base.opcoes = q.opcoes.map((o) => o.texto);
  }
  if (q.tipo === 'selecao_multipla') {
    base.max_selecoes = q.max_selecoes;
  }
  if (q.tipo === 'escala') {
    base.escala = q.escala;
  }
  return base;
}

router.get('/', (req, res) => {
  res.json({
    total: questions.length,
    categorias: [...new Set(questions.map((q) => q.categoria))],
    perguntas: questions.map(publicView)
  });
});

router.get('/:categoria', (req, res) => {
  const filtered = questions.filter((q) => q.categoria === req.params.categoria);
  if (!filtered.length) {
    return res.status(404).json({ error: 'Categoria não encontrada' });
  }
  res.json({ categoria: req.params.categoria, total: filtered.length, perguntas: filtered.map(publicView) });
});

module.exports = router;
