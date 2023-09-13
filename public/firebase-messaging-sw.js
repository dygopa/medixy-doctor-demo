importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAUQC5MYXsTRhc1bbzXc5WkkrTA8zgPNXw",
  authDomain: "prosit-4c3cc.firebaseapp.com",
  projectId: "prosit-4c3cc",
  storageBucket: "prosit-4c3cc.appspot.com",
  messagingSenderId: "550638651340",
  appId: "1:550638651340:web:550d768707a56e174f3f69",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
