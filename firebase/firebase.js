// firebase/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXZc8b0zlavL4-mas5Nz4fDpnUw-q1MQQ",
  authDomain: "newattendancetracker.firebaseapp.com",
  projectId: "newattendancetracker",
  storageBucket: "newattendancetracker.firebasestorage.app",
  messagingSenderId: "715151684053",
  appId: "1:715151684053:web:ce762734c9e5d6cff80d5c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


