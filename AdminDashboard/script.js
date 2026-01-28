// Main page scripts

import { auth } from "../firebase/firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../authentication/login.html";
  }
});


document.addEventListener('DOMContentLoaded', () =>{
    handleDayClick();
    logoutMenu();
});

function handleDayClick() {
  const days = document.querySelectorAll('.day');

  days.forEach(day => {
    day.addEventListener('click', () => {
      // remove active from all days
      days.forEach(d => d.classList.remove('active'));

      // add active to clicked day
      day.classList.add('active');
    });
  });
}

function logoutMenu() {
  const avatar = document.getElementById('adminAvatar');
  const menu = document.getElementById('adminMenu');
  const logoutBtn = document.getElementById('logoutBtn');

  if (!avatar || !menu) return;

  // Toggle logout menu
  avatar.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

  // Logout action (placeholder)
  logoutBtn.addEventListener('click', () => {
    // clear session later (Firebase / localStorage)
    window.location.href = '../authentication/login.html';
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!avatar.contains(e.target) && !menu.contains(e.target)) {
      menu.style.display = 'none';
    }
  });
}




