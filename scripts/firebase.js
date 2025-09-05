
// Firebase bootstrap (modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, updatePassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs, query, where, orderBy, serverTimestamp, Timestamp, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";

export const firebaseConfig = {
  apiKey: "AIzaSyCr2nwoy1oucmXdHPh-YQuogeobych-XfI",
  authDomain: "lavarapido-da25d.firebaseapp.com",
  projectId: "lavarapido-da25d",
  storageBucket: "lavarapido-da25d.firebasestorage.app",
  messagingSenderId: "861587335846",
  appId: "1:861587335846:web:d53f3855cef88d19c1e267",
  measurementId: "G-43CWTDQNQS"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// getAnalytics(app); // opcional
export { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, updatePassword,
         collection, addDoc, doc, setDoc, getDoc, getDocs, query, where, orderBy, serverTimestamp, Timestamp, onSnapshot, deleteDoc };
