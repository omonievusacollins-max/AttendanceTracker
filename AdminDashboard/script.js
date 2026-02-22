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
    loadWeekDates();
    handleDayClick();
    logoutMenu();
    loadDashboardStats(getTodayDate());
});

function handleDayClick() {
  const days = document.querySelectorAll('.day');

  days.forEach(day => {
    day.addEventListener('click', () => {
      // remove active from all days
      days.forEach(d => d.classList.remove('active'));

      // add active to clicked day
      day.classList.add('active');

      // Load stats for the selected day
      const selectedDay = day.getAttribute('data-day');
      const selectedDate = weekDates[selectedDay];
      loadDashboardStats(selectedDate);
    });
  });
}

// Store week dates globally
let weekDates = {};

// ==============================
// Calculate dates for current week
// ==============================
function loadWeekDates() {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Calculate Monday of this week
  const monday = new Date(today);
  monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

  // Map each day of the week to its date
  const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri'];
  daysOfWeek.forEach((day, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    weekDates[day] = date.toLocaleDateString();
  });

  console.log('Week dates:', weekDates);
}

// ==============================
// Get today's date formatted
// ==============================
function getTodayDate() {
  return new Date().toLocaleDateString();
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
async function loadDashboardStats(selectedDate) {
  try {
    // 1️⃣ Fetch total staffs
    const staffCollection = collection(db, "staffs");
    const staffSnapshot = await getDocs(staffCollection);
    const totalStaffs = staffSnapshot.docs.length;

    // 2️⃣ Fetch attendance records for the selected date
    const attendanceCollection = collection(db, "attendanceRecords");
    const attendanceQuery = query(
      attendanceCollection,
      where("date", "==", selectedDate)
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

    console.log(`Stats for ${selectedDate}:`, {
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