import { Failure } from "domain/core/failures/failure";
import {initializeApp} from "firebase/app";
import "firebase/firestore";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET_ID ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FB_APP_ID ?? ""
};

const app = initializeApp(firebaseConfig);
export let messaging:any = getMessaging(app);

export const getUserToken = async() => await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FB_VAPID_KEY })

export const onMessageListener = () =>
new Promise((resolve) => {
  onMessage(messaging, (payload) => {
    resolve(payload);
  });
});