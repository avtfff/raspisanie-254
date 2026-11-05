// Service Worker для приема push-уведомлений

self.addEventListener('push', function(event) {
    let data = { title: 'Расписание', body: 'Новое расписание на завтра!' };
    
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: '/icon.png', // если добавишь иконку, укажи путь
        badge: '/icon.png',
        vibrate: [200, 100, 200],
        data: {
            url: '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Клик по уведомлению открывает сайт
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});