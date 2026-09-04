const express = require('express');
const store = require('../lib/store');
const { hasPush } = require('../lib/push');

const router = express.Router();

// Chave pública VAPID — o app usa isso no navegador pra pedir permissão
// e criar a inscrição push. Não é segredo (é literalmente pública).
router.get('/public-key', (req, res) => {
  res.json({ enabled: hasPush(), publicKey: process.env.VAPID_PUBLIC_KEY || null });
});

router.post('/subscribe', (req, res) => {
  const { personId, subscription } = req.body || {};
  if (!personId || !subscription || !subscription.endpoint) {
    return res.status(400).json({ error: 'Missing personId ou subscription' });
  }
  store.savePushSubscription(personId, subscription);
  res.json({ success: true });
});

router.post('/unsubscribe', (req, res) => {
  const { personId, endpoint } = req.body || {};
  if (!personId || !endpoint) {
    return res.status(400).json({ error: 'Missing personId ou endpoint' });
  }
  store.removePushSubscription(personId, endpoint);
  res.json({ success: true });
});

module.exports = router;
