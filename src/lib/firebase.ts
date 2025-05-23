// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "faceout-b996d.firebaseapp.com",
  projectId: "faceout-b996d",
  storageBucket: "faceout-b996d.appspot.com",
  messagingSenderId: "446213644019",
  appId: "c   ",
  measurementId: "G-FYLJLVRB49"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
