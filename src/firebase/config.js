// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, serverTimestamp } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ6Hcyh0Mm-ZXuhnKtPgwjdnV_bKAIX-4",
  authDomain: "muso-ninjas-d9f8e.firebaseapp.com",
  projectId: "muso-ninjas-d9f8e",
  storageBucket: "muso-ninjas-d9f8e.appspot.com",
  messagingSenderId: "946007023601",
  appId: "1:946007023601:web:3c125346910bc666b96e50"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize services
const projectAuth = getAuth(app)
const projectFirestore = getFirestore(app)
const timestamp = serverTimestamp()

export { projectAuth, projectFirestore, timestamp }
