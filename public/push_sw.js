import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getMessaging, onBackgroundMessage } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-sw.js";

self.addEventListener('fetch', () => {
    const urlParams = new URLSearchParams(location.search);
    self.firebaseConfig = Object.fromEntries(urlParams);
});

const defaultConfig = {
    apiKey: true,
    projectId: true,
    appId: true,
    messagingSenderId: true
};

const fbApp = !getApps.length ? initializeApp(self.firebaseConfig || defaultConfig) : getApp;
const messaging = getMessaging(fbApp);

onBackgroundMessage(messaging, (payload) => {
    console.log("[firebase-messaging-sw.js] received bg message", payload);
});