// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKRhCU8brVAZ6qNODWVRw_qnQGOTI5hs0",
  authDomain: "news-ca688.firebaseapp.com",
  projectId: "news-ca688",
  storageBucket: "news-ca688.appspot.com",
  messagingSenderId: "870377492479",
  appId: "1:870377492479:web:3edd6366e88267e053e1ca",
  measurementId: "G-FSPWMVC9R4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage

// Export Firestore and Storage
export { db };
