import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyDdx-OuI2xsOXP_jA9VYRDibPK6aEFxwWA",
  authDomain: "ema-dev-2fe4b.firebaseapp.com",
  projectId: "ema-dev-2fe4b",
  storageBucket: "ema-dev-2fe4b.appspot.com",
  messagingSenderId: "523189819320",
  appId: "1:523189819320:web:b7d639b04c873f7367e14d",
  measurementId: "G-N72M6MTSQ3",
};

let messaging = null;

export const firebaseInitialize = (config) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  messaging = firebase.messaging();
};

export const getFirebaseApp = (name, config) => {
  let foundApp = firebase.apps.find((app) => app.name === name);
  return foundApp
    ? foundApp
    : firebase.initializeApp(config || firebase.app().options, "auth-worker");
};

export const firestoreInitialize = () => {
  return firebase.firestore();
};

export const SERVER_KEY =
  "AAAAedCLF7g:APA91bFkOmqLUsms0OALYc9W9GqpJ38vIoiBxIUUjlFfWdND2BWxVe_iUKEXj_l09w2gWYGEala-OQsYpguzByWCdmrkSc8WsoSTtkb4X2PUUVwj5lerjxjIv6pVS9DJ9RcodfRqBifu";
export const VAPID_KEY =
  "BHBHBNw5BBIm-lSd68yDl5VyHA8MwzmTylmzgMNdeUNX7GiEPITO4NKmhRhXBdcJgp-U0wSwmHs_pAVEDS84s0A";

export const getTokenMessaging = async () => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({
      vapidKey: VAPID_KEY,
    });
  } catch (error) {
    return "error";
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
