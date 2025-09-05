
import { auth, db, signOut, sendPasswordResetEmail, doc, setDoc, getDoc, collection } from "./scripts/firebase.js";

export const ADM_MATRICULAS = ["12","6266","1778"];

export function byId(id){ return document.getElementById(id); }
export function brDate(d){
  const dt = (d instanceof Date) ? d : new Date(d);
  return dt.toLocaleDateString("pt-BR");
}
export function brDateInputValue(d=new Date()){
  const pad = n=> String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}
export function brTime(dt=new Date()){
  return dt.toLocaleTimeString("pt-BR",{hour:'2-digit',minute:'2-digit'});
}
export function nowTS(){ return new Date(); }
export function getMatriculaFromEmail(email){
  const [user] = email.split("@");
  return user;
}
export async function ensureUserDoc(user){
  const matricula = getMatriculaFromEmail(user.email);
  const ref = doc(db,"usuarios", matricula);
  const snap = await getDoc(ref);
  if(!snap.exists()){
    await setDoc(ref, { matricula, email:user.email, admin: ADM_MATRICULAS.includes(matricula) });
  }
}
export async function requireAuth(){
  return new Promise(resolve=>{
    auth.onAuthStateChanged(async (user)=>{
      if(!user){ window.location.href="index.html"; return; }
      await ensureUserDoc(user);
      resolve(user);
    });
  });
}
export async function doLogout(){
  await signOut(auth);
  window.location.href="index.html";
}
export async function changePassword(){
  const email = auth.currentUser?.email;
  if(!email){ alert("Sessão inválida."); return; }
  await sendPasswordResetEmail(auth, email);
  alert("Email de redefinição de senha enviado.");
}
export function prefixBadge(prefixNum){
  // ranges: 55001-55184 green flag; 55185-55363 red; 55364-55559 blue; 55900+ purple
  const n = Number(prefixNum);
  if(n>=55900){ return `<span class="badge badge-roxa">${n}</span>`; }
  if(n>=55364 && n<=55559){ return `<span class="badge badge-azul">${n}</span>`; }
  if(n>=55185 && n<=55363){ return `<span class="badge badge-vermelha">${n}</span>`; }
  if(n>=55001 && n<=55184){ return `<span class="badge badge-verde">${n}</span>`; }
  return `<span class="badge">${n}</span>`;
}
export function tipoBadge(tipo){
  if(tipo==="Lavagem Simples") return `<span class="badge badge-yellow">${tipo}</span>`;
  if(tipo==="Higienização") return `<span class="badge badge-green">${tipo}</span>`;
  return `<span class="badge badge-pink">Exceções</span>`;
}
export function horaBadge(date){
  const h = (date instanceof Date? date : new Date(date)).getHours();
  if(h>=6 && h<=11) return `<span class="badge time-blue">${brTime(date)}</span>`;
  if(h>=12 && h<=17) return `<span class="badge time-orange">${brTime(date)}</span>`;
  return `<span class="badge time-navy">${brTime(date)}</span>`;
}
export function todayRange(){
  const d=new Date(); d.setHours(0,0,0,0);
  return [new Date(d), new Date(d.getFullYear(),d.getMonth(),d.getDate(),23,59,59)];
}
export function weekRangeFrom(date){
  const d = new Date(date); // any date within the week desired
  const day = d.getDay(); // 0 sun ... 1 mon
  // set to Monday
  const diffToMon = (day===0? -6 : 1 - day);
  const start = new Date(d);
  start.setDate(d.getDate()+diffToMon);
  start.setHours(0,0,0,0);
  const end = new Date(start); end.setDate(start.getDate()+6); end.setHours(23,59,59,999);
  return [start,end];
}
export function monthRangeFrom(date){
  const d = new Date(date); d.setHours(0,0,0,0);
  const start = new Date(d.getFullYear(), d.getMonth(), 1);
  const end = new Date(d.getFullYear(), d.getMonth()+1, 0, 23,59,59,999);
  return [start,end];
}
export function downloadFileName(tipo){
  const d = new Date();
  const pad = n=> String(n).padStart(2,'0');
  const stamp = `${pad(d.getDate())}-${pad(d.getMonth()+1)}-${d.getFullYear()}`;
  return `relatorio_${tipo}_${stamp}`;
}
