if (navigator.serviceWorker) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registered successfully.'))
        .catch(error => console.error('Service Worker registration failed:', error));
}

/* BADGE */
let badgeCounter = 0
const increaseBadge = () => {
    if (navigator.setAppBadge) {
        navigator.setAppBadge(++badgeCounter)
    } else {
        alert('setAppBadge nicht unterstützt.')
    }
}

/* NOTIFICATION */
const requestNotificationPermission = () => {
    Notification.requestPermission().then((result) => {
        if (result === "granted") {
            console.log("Benachrichtigungen erlaubt");
        }
    }).catch((error) => {
        console.error("Fehler beim Anfragen der Berechtigung", error);
    })
}

/* NOTIFICATION */
const showNotificationViaServiceWorker = () => {
    const options = {
        body: "Neue Benachrichtigung aus der PWA (evtl. mit süßem Katzenbild)",
        icon: "https://placecats.com/200/200",
        badge: "/public/icon-192x192.png"
    }

    navigator.serviceWorker.ready.then(registration => {
        registration.showNotification("Benachrichtigung", options);
    })
}

/* SHARE */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('shareForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const shareText = document.getElementById('shareText').value;

        // Web Share API: Text teilen
        if (navigator.share) {
            const shareData = {
                title: "Hallo, diese Nachricht könnte dich interessieren:",
                text: shareText,
            };

            try {
                await navigator.share(shareData);
            } catch (err) {
                alert(`Error: ${err}`)
            }
        } else {
            alert('Web Share API nicht unterstützt.');
        }
    });
})
