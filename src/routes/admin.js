const express = require('express');
const store = require('../lib/store');

const router = express.Router();

// Zera todos os dados de um casal (respostas, resultados, análise cruzada,
// dicas e histórico de rotação). Protegido por uma chave definida em
// ADMIN_RESET_KEY — sem essa variável configurada no servidor, o endpoint
// fica sempre desligado. Pensado pra ser colado direto na barra de
// endereço do navegador: GET simples, com dupla confirmação (chave +
// ?confirm=SIM) porque é uma ação destrutiva e irreversível.
router.get('/reset/:id1/:id2', (req, res) => {
  const adminKey = process.env.ADMIN_RESET_KEY;
  if (!adminKey) {
    return res.status(403).json({ error: 'Reset desligado: ADMIN_RESET_KEY não está configurada no servidor.' });
  }
  if (req.query.key !== adminKey) {
    return res.status(403).json({ error: 'Chave inválida.' });
  }
  if (req.query.confirm !== 'SIM') {
    return res.status(400).json({
      error: 'Ação destrutiva. Adicione &confirm=SIM na URL pra confirmar que quer apagar tudo desse casal.'
    });
  }

  const result = store.resetCouple(req.params.id1, req.params.id2);
  res.json({ success: true, message: 'Dados apagados.', ...result });
});

module.exports = router;
