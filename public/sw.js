// Service worker mínimo: só o necessário pra instalar o app na tela de
// início e receber notificações push. Sem cache/offline — o app sempre
// precisa da rede pra funcionar de verdade, não faria sentido guardar
// uma cópia velha das perguntas ou das dicas.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let data = { title: 'Casais', body: '' };
  try {
    if (event.data) data = event.data.json();
  } catch (e) {
    data = { title: 'Casais', body: event.data ? event.data.text() : '' };
  }

  const options = {
    body: data.body || '',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    data: { url: data.url || '/' }
  };

  event.waitUntil(self.registration.showNotification(data.title || 'Casais', options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
      const existing = clientsArr.find((c) => c.url.startsWith(self.location.origin));
      if (existing) return existing.focus();
      return self.clients.openWindow(url);
    })
  );
});
