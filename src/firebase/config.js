import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyBtuLKCjKF0ETMGb-qLndX_UgaanmTw56k',
  authDomain: process.env.AUTH_DOMAIN ?? '',
  projectId: process.env.PROJECT_ID ?? '',
  storageBucket: process.env.STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.MESSAGING_SENDER_ID ?? '',
  appId: process.env.APP_ID ?? '',
  measurementId: process.env.MEASUREMENT_ID ?? ''
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
