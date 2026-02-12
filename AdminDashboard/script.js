// Main page scripts

import { auth, db } from "/firebase/firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "/authentication/login.html";
  }
});


document.addEventListener('DOMContentLoaded', () =>{
    handleDayClick();
    logoutMenu();
    loadDashboardStats();
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
    window.location.href = '/authentication/login.html';
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!avatar.contains(e.target) && !menu.contains(e.target)) {
      menu.style.display = 'none';
    }
  });
}

// ==============================
// Load Dashboard Statistics
// ==============================
async function loadDashboardStats() {
  try {
    // Get today's date in the same format used in attendance records
    const today = new Date().toLocaleDateString();

    // 1️⃣ Fetch total staffs
    const staffCollection = collection(db, "staffs");
    const staffSnapshot = await getDocs(staffCollection);
    const totalStaffs = staffSnapshot.docs.length;

    // 2️⃣ Fetch today's attendance records
    const attendanceCollection = collection(db, "attendanceRecords");
    const attendanceQuery = query(
      attendanceCollection,
      where("date", "==", today)
    );
    const attendanceSnapshot = await getDocs(attendanceQuery);
    const attendanceRecords = attendanceSnapshot.docs.map(doc => doc.data());

    // 3️⃣ Calculate statistics
    const presentCount = attendanceRecords.length;
    const absentCount = totalStaffs - presentCount;
    const earlyCount = attendanceRecords.filter(r => r.status === "Early").length;
    const lateCount = attendanceRecords.filter(r => r.status === "Late").length;

    // 4️⃣ Update DOM
    document.getElementById("total-staff").textContent = totalStaffs;
    document.getElementById("absent").textContent = absentCount;
    document.getElementById("early").textContent = earlyCount;
    document.getElementById("present").textContent = presentCount;
    document.getElementById("late").textContent = lateCount;

    console.log(`Today's Stats (${today}):`, {
      totalStaffs,
      presentCount,
      absentCount,
      earlyCount,
      lateCount
    });
  } catch (err) {
    console.error("Error loading dashboard stats:", err);
  }
}