// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// RULE 1: THIS MUST BE FIRST, OUTSIDE OF ANY FUNCTIONS OR TRY/CATCH
if (typeof window !== "undefined") {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export function initAppCheck() {
  if (typeof window !== "undefined" && app) {
    try {
      console.log("Initializing App Check..."); // Temporary log to verify initialization runs

      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(
          import.meta.env.VITE_RECAPTCHA_SITE_KEY,
        ),
        isTokenAutoRefreshEnabled: true,
      });
    } catch (error) {
      console.error("Firebase App Check failed to initialize:", error);
    }
  }
}

export { auth, db };
