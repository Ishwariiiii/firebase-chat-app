// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7UAGXVtVKBBtH86Y1cdWlskIhmOr1JXU",
  authDomain: "fir-chatapp-4851e.firebaseapp.com",
  projectId: "fir-chatapp-4851e",
  storageBucket: "fir-chatapp-4851e.firebasestorage.app",
  messagingSenderId: "266261861385",
  appId: "1:266261861385:web:efe82014b536b8e06bd4d8",
  measurementId: "G-HP5HWRDZE9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
