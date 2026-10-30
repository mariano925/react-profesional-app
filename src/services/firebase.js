
import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let databaseInstance = null;

export function getFirebaseDatabase() {
  if (databaseInstance) {
    return databaseInstance;
  }

  const missingVariables = Object.entries(firebaseConfig)
    .filter(([, value]) => !value || !value.trim())
    .map(([key]) => key);

  if (missingVariables.length > 0) {
    throw new Error(
      `Faltan variables de Firebase: ${missingVariables.join(", ")}`
    );
  }

  const app = getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig);

  databaseInstance = getDatabase(app);

  return databaseInstance;
}
