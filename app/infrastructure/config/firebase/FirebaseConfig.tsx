import { Failure } from "domain/core/failures/failure";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { ConfigEnviroment } from "../env/env";

export const firebaseConfig = {
  apiKey: new ConfigEnviroment().nextPublicFbApiKey ?? "",
  authDomain: new ConfigEnviroment().nextPublicFbAuthDomain ?? "",
  projectId: new ConfigEnviroment().nextPublicFbProjectId ?? "",
  storageBucket: new ConfigEnviroment().nextPublicFbStorageBucketId ?? "",
  messagingSenderId: new ConfigEnviroment().nextPublicFbMessagingSenderId ?? "",
  appId: new ConfigEnviroment().nextPublicFbAppId ?? "",
};

export let messaging: any = null;

if (typeof window !== "undefined") {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

export const getUserToken = async () => {
  try {
    await getToken(messaging, {
      vapidKey: new ConfigEnviroment().nextPublicFbVapidKey,
    });
  } catch (error) {
    console.log(error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload: any) => {
      resolve(payload);
    });
  });
