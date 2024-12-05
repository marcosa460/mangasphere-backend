// firebase-admin.config.ts
import * as admin from 'firebase-admin';

const firebaseConfig = process.env.FIREBASE_CONFIG;

if (!firebaseConfig) {
  throw new Error(
    'Firebase configuration not found. Set FIREBASE_CONFIG environment variable.',
  );
}

const serviceAccount = JSON.parse(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
