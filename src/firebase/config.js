// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ6Hcyh0Mm-ZXuhnKtPgwjdnV_bKAIX-4",
  authDomain: "muso-ninjas-d9f8e.firebaseapp.com",
  projectId: "muso-ninjas-d9f8e",
  storageBucket: "muso-ninjas-d9f8e.firebasestorage.app",
  messagingSenderId: "946007023601",
  appId: "1:946007023601:web:3c125346910bc666b96e50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();

const timestamp = app.firestore.FieldValue.serverTimestamp;

export { db, auth, timestamp };
