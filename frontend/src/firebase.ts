import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase Configuration
// This is safe to make public
const firebaseConfig = {
  apiKey: 'AIzaSyB4eTI-_pXZ0Sb1mj83YSguTHHjv-gOcRQ',
  authDomain: 'drp24-4ad0b.firebaseapp.com',
  projectId: 'drp24-4ad0b',
  storageBucket: 'drp24-4ad0b.appspot.com',
  messagingSenderId: '132585842322',
  appId: '1:132585842322:web:facab34eb28383ca48684b',
  measurementId: 'G-0Y5TWTGMTW'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
