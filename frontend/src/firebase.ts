// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Add a new document in collection "cities"

// setDoc(doc(db, 'cities', 'LA'), {
//   name: 'Los Angeles',
//   state: 'CA',
//   country: 'USA'
// });
