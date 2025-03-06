// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAAkTDuUFskXqEYA6pTRWQw93Fr0bPWOk",
  authDomain: "student-attendance-syste-44adb.firebaseapp.com",
  projectId: "student-attendance-syste-44adb",
  storageBucket: "student-attendance-syste-44adb.appspot.com",
  messagingSenderId: "645985774699",
  appId: "1:645985774699:web:eaa6bb69a728098b63552e",
  measurementId: "G-NSKY2GSZV3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  app,
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
};
