if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registered successfully.'))
        .catch(error => console.error('Service Worker registration failed:', error));
}

/* BADGE */
let badgeCounter = 0
const increase = () => {
    navigator.setAppBadge(++badgeCounter)
}

/* NOTIFICATION */
const requestNotificationPermission = () => {
    Notification.requestPermission().then((result) => {
        if (result === "granted") {
            console.log("Benachrichtigungen erlaubt");
        }
    });
}

/* NOTIFICATION */
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
            alert('Die Web Share API wird von diesem Browser nicht unterstützt.');
        }
    });
})
