import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getDatabase, type Database } from 'firebase/database';

export type FirebaseWebConfig = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
};

function readConfig(): FirebaseWebConfig | null {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY as string | undefined;
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined;
  const databaseURL = import.meta.env.VITE_FIREBASE_DATABASE_URL as string | undefined;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined;
  const appId = import.meta.env.VITE_FIREBASE_APP_ID as string | undefined;
  const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined;
  const messagingSenderId = import.meta.env
    .VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined;

  if (!apiKey || !authDomain || !databaseURL || !projectId || !appId) {
    return null;
  }
  return {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    appId,
    storageBucket,
    messagingSenderId,
  };
}

let app: FirebaseApp | null = null;
let db: Database | null = null;

export function isBattleBackendConfigured(): boolean {
  return readConfig() !== null;
}

export function getFirebaseConfigStatus(): {
  configured: boolean;
  missing: string[];
} {
  const required = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_DATABASE_URL',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_APP_ID',
  ] as const;
  const missing = required.filter((key) => !import.meta.env[key]);
  return { configured: missing.length === 0, missing: [...missing] };
}

export function getBattleDatabase(): Database {
  const config = readConfig();
  if (!config) {
    throw new Error(
      'Firebase is not configured. Add VITE_FIREBASE_* keys (see docs/beta-pip-language-battle.md).',
    );
  }
  if (!app) {
    app = getApps().length ? getApps()[0]! : initializeApp(config);
  }
  if (!db) {
    db = getDatabase(app);
  }
  return db;
}
