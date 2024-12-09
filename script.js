if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registered successfully.'))
        .catch(error => console.error('Service Worker registration failed:', error));
}

/* BADGE */

let badge = 0

const increase = () => {
    navigator.setAppBadge(++badge)
}

/* NOTIFICATION */

const requestNotificationPermission = () => {
    Notification.requestPermission().then((result) => {
        if (result === "granted") {
            randomNotification();
        }
    });
}

// funktioniert nur, wenn App offen ist und ist nicht auf Chrome Mobile implementiert
const showNotification = () => {
    const options = {
        body: "Neue Benachrichtigung aus der PWA mit süßem Katzenbild",
        icon: "https://placecats.com/200/200",
    };
    new Notification("Neue Benachrichtigung", options);
}

const showNotificationViaServiceWorker = () => {
    const options = {
        body: "Neue Benachrichtigung aus der PWA mit süßem Katzenbild",
        icon: "https://placecats.com/200/200",
        badge: "/public/icon-192x192.png"
    }

    navigator.serviceWorker.ready.then(registration => {
        registration.showNotification("Benachrichtigung", options);
    })
}
