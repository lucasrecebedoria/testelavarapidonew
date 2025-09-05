// Firebase modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs, query, where, orderBy, serverTimestamp, deleteDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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
export const auth = getAuth(app);
export const db = getFirestore(app);

// admins por matrícula
export const ADM_MATRICULAS = ["12","6266","1778"];

export function emailFromMatricula(m){ return `${m}@movebuss.local`.toLowerCase(); }
export function requireAuth(){
  return new Promise((resolve)=>{
    onAuthStateChanged(auth, (u)=>{ if(!u) location.href="index.html"; else resolve(u); });
  });
}
export async function ensureUserDoc(user){
  const uref = doc(db,'usuarios', user.uid);
  const snap = await getDoc(uref);
  if(!snap.exists()){
    const m = (user.email||'').split('@')[0];
    const role = ADM_MATRICULAS.includes(m) ? 'admin' : 'user';
    await setDoc(uref, { matricula:m, email:user.email, role, createdAt: serverTimestamp() });
  }
}
export async function getRole(user){
  const snap = await getDoc(doc(db,'usuarios', user.uid));
  return (snap.exists() && snap.data().role) || 'user';
}
export async function logout(){ await signOut(auth); location.href="index.html"; }
export function formatDateBR(date){ return new Intl.DateTimeFormat('pt-BR',{dateStyle:'short'}).format(date); }
export function timeBadgeClass(date){ const h=date.getHours(); if(h>=6&&h<12) return 'time-morning'; if(h>=12&&h<18) return 'time-afternoon'; return 'time-night'; }
export function prefixBadgeClass(prefix){
  const p=parseInt(prefix,10);
  if (p>=55001 && p<=55184) return 'flag-green';
  if (p>=55185 && p<=55363) return 'flag-red';
  if (p>=55364 && p<=55559) return 'flag-blue';
  if (p>=55900) return 'flag-purple';
  return '';
}