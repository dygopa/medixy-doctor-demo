import { Failure } from "domain/core/failures/failure";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET_ID ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FB_APP_ID ?? "",
};

export let messaging: any = null;

if (typeof window !== "undefined") {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export const getUserToken = async () => {
  try {
    await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FB_VAPID_KEY });
  } catch (error) {
    console.log(error)
  }
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload: any) => {
      resolve(payload);
    });
  });
