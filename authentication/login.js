// auth/login.js
import { auth } from "/firebase/firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const errorText = document.querySelector(".error-message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "/AdminDashboard/index.html";
  } catch (error) {
    errorText.textContent = "Invalid email or password";
  }
});
