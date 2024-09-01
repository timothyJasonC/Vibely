import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtuLKCjKF0ETMGb-qLndX_UgaanmTw56k",
  authDomain: "vibely-92262.firebaseapp.com",
  projectId: "vibely-92262",
  storageBucket: "vibely-92262.appspot.com",
  messagingSenderId: "10664900557",
  appId: "1:10664900557:web:133a1644a6abf82b41b684",
  measurementId: "G-B866P4QE11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
