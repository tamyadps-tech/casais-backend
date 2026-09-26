// CONVITES — como um casal novo entra no app. Tamyris cria o convite (ver
// o endpoint protegido em admin.js), manda o link pro casal, e a primeira
// pessoa que abrir preenche o próprio nome e o do parceiro(a) uma única
// vez — depois disso o link vira o login permanente dos dois.

const express = require('express');
const store = require('../lib/store');

const router = express.Router();

router.get('/:code', (req, res) => {
  const invite = store.readInvite(req.params.code);
  if (!invite) return res.status(404).json({ error: 'Convite não encontrado' });

  if (!invite.ativado) {
    return res.json({ success: true, code: invite.code, ativado: false });
  }
  res.json({
    success: true,
    code: invite.code,
    ativado: true,
    pessoa1: invite.pessoa1,
    pessoa2: invite.pessoa2
  });
});

router.post('/:code/activate', (req, res) => {
  const { nome, nomeParceiro } = req.body;
  if (!nome || !String(nome).trim() || !nomeParceiro || !String(nomeParceiro).trim()) {
    return res.status(400).json({ error: 'Preencha os dois nomes' });
  }

  const result = store.activateInvite(req.params.code, String(nome).trim(), String(nomeParceiro).trim());
  if (result.error === 'nao_encontrado') {
    return res.status(404).json({ error: 'Convite não encontrado' });
  }
  if (result.error === 'ja_ativado') {
    // Idempotente: a segunda pessoa do casal abrindo o mesmo link recebe
    // o casal já existente, em vez de erro.
    return res.json({
      success: true,
      code: result.invite.code,
      pessoa1: result.invite.pessoa1,
      pessoa2: result.invite.pessoa2
    });
  }

  res.json({
    success: true,
    code: result.invite.code,
    pessoa1: result.invite.pessoa1,
    pessoa2: result.invite.pessoa2
  });
});

module.exports = router;
