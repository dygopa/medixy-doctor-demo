importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');
 
firebase.initializeApp({
    apiKey: "AIzaSyAUQC5MYXsTRhc1bbzXc5WkkrTA8zgPNXw",
    authDomain: "prosit-4c3cc.firebaseapp.com",
    projectId: "prosit-4c3cc",
    storageBucket: "prosit-4c3cc.appspot.com",
    messagingSenderId: "550638651340",
    appId: "1:550638651340:web:550d768707a56e174f3f69"
});

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging.isSupported()
  ? // eslint-disable-next-line no-undef
    firebase.messaging()
  : null;

if (messaging) {
  messaging.onBackgroundMessage(function (payload) {
    // eslint-disable-next-line no-restricted-globals
    const promiseChain = self.clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((windowClients) => {
        for (let i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];
          windowClient.postMessage(payload);
        }
      })
      .then(() => {
        const body = payload.data.body ?? "";

        const notificationTitle = payload.data.title;
        const notificationOptions = {
          body: body,
          logo: "/favicon-16x16.png",
        };
        // eslint-disable-next-line no-restricted-globals
        return self.registration.showNotification(
          notificationTitle,
          notificationOptions
        );
      });

    return promiseChain;
  });
}