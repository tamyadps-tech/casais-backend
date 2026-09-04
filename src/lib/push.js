// Notificações push de verdade (Web Push), pro app instalado no celular
// avisar sozinho quando uma dica nova chega — sem precisar do Google
// Agenda. Usa as chaves VAPID configuradas por ambiente; sem elas, essa
// parte fica desligada e o resto do app funciona normalmente.

const webpush = require('web-push');

let configured = false;

function hasPush() {
  return Boolean(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY);
}

function ensureConfigured() {
  if (configured || !hasPush()) return configured;
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:contato@example.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
  configured = true;
  return true;
}

// Manda a notificação pra UMA subscription. Devolve { ok, expired } —
// expired=true quando o navegador/OS já descartou essa inscrição (o
// chamador deve removê-la do store nesse caso).
async function sendToSubscription(subscription, payload) {
  if (!ensureConfigured()) return { ok: false, expired: false };
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
    return { ok: true, expired: false };
  } catch (error) {
    const expired = error.statusCode === 404 || error.statusCode === 410;
    if (!expired) console.error('push: falha ao enviar notificação:', error.message);
    return { ok: false, expired };
  }
}

module.exports = { hasPush, sendToSubscription };
