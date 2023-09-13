import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/messaging";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET_ID ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FB_APP_ID ?? ""
};

//export const firebaseApp = firebase.initializeApp(firebaseConfig);
//export const messaging = firebase.messaging(firebaseApp)
export let messaging:any = null;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

messaging = firebase.messaging();

export const getFirebaseApp = (name:any, config:any) => {
  let foundApp = firebase.apps.find((app) => app.name === name);
  return foundApp
    ? foundApp
    : firebase.initializeApp(config || firebase.app().options, "auth-worker");
};

// getOrRegisterServiceWorker function is used to try and get the service worker 
//if it exists, otherwise it will register a new one.
export const getOrRegisterServiceWorker = async () => {
  if (
    "serviceWorker" in navigator &&
    typeof window.navigator.serviceWorker !== "undefined"
  ) {
    const serviceWorker = await window.navigator.serviceWorker
      .getRegistration("/firebase-push-notification-scope");
    if (serviceWorker) return serviceWorker;
    return window.navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
      {
        scope: "/firebase-push-notification-scope",
      }
    );
  }
  throw new Error("The browser doesn`t support service worker.");
};

export const getFirebaseToken = async () => {
  try {
    const messagingResolve = await messaging;
    if (messagingResolve) {
      return getOrRegisterServiceWorker().then((serviceWorkerRegistration) => {
        return Promise.resolve(
          messaging.getToken({
            vapidKey: process.env.NEXT_PUBLIC_FB_VAPID_KEY,
            serviceWorkerRegistration,
          })
        );
      });
    }
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
};

export const onMessageListener = () => new Promise((resolve) => { 
  firebase.messaging().onMessage((payload:any) => { 
    console.log(payload)
    resolve(payload); 
  }, (e:Error) => console.log(e));
});