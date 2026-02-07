// checkin.js
import { db } from "../firebase/firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function initCheckin() {
  // 1️⃣ Get session ID from URL
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session");

  if (!sessionId) {
    alert("Invalid attendance session.");
    window.location.href = "/"; // redirect to home
    return;
  }

  // 2️⃣ Load session from Firestore
  let sessionData = null;
  try {
    const snap = await getDoc(doc(db, "attendanceSessions", sessionId));
    if (snap.exists()) {
      sessionData = snap.data();
    }
  } catch (err) {
    console.warn("Firestore session fetch failed, fallback to localStorage:", err);
  }

  // Fallback to localStorage
  const localSessions = JSON.parse(localStorage.getItem("attendanceSessions")) || {};
  if (!sessionData && localSessions[sessionId]) {
    sessionData = localSessions[sessionId];
  }

  if (!sessionData) {
    alert("This attendance session does not exist.");
    window.location.href = "/";
    return;
  }

  if (sessionData.status === "used") {
    alert("This attendance QR code has already been used.");
    return;
  }

  // 3️⃣ Get staff list
  const staffs = JSON.parse(localStorage.getItem("staffList")) || [];

  const checkinForm = document.getElementById("checkinForm");
  const nameInput = document.getElementById("name");
  const roleSelect = document.getElementById("role");
  const employeeIdInput = document.getElementById("employeeId");
  const timeInInput = document.getElementById("timeIn");

  // 4️⃣ Handle form submit
  checkinForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const enteredName = nameInput.value.trim().toLowerCase();
    const selectedRole = roleSelect.value;

    if (!enteredName || !selectedRole) {
      return alert("Please enter your name and select a role.");
    }

    // Find staff
    const staff = staffs.find(
      s => s.name.trim().toLowerCase() === enteredName && s.role === selectedRole
    );

    if (!staff) return alert("Staff not found. Check your name and role.");

    // Auto-fill UI
    employeeIdInput.value = staff.staffId;
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    timeInInput.value = formattedTime;

    // 5️⃣ Prevent duplicate check-in per day
    const attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || [];
    const today = now.toLocaleDateString();
    const alreadyCheckedIn = attendanceRecords.find(
      r => r.staffId === staff.staffId && r.date === today
    );

    if (alreadyCheckedIn) return alert("You have already checked in today.");

    // 6️⃣ Save attendance locally
    const attendance = {
      staffId: staff.staffId,
      name: staff.name,
      role: staff.role,
      timeIn: formattedTime,
      date: today,
      sessionId
    };
    attendanceRecords.push(attendance);
    localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));

    // 7️⃣ Lock session in Firestore
    const sessionUpdate = {
      status: "used",
      usedBy: staff.staffId,
      usedAt: new Date().toISOString()
    };
    try {
      await setDoc(doc(db, "attendanceSessions", sessionId), sessionUpdate, { merge: true });
    } catch (err) {
      console.warn("Failed to update session in Firestore:", err);
    }

    // Also update localStorage copy
    const updatedLocalSessions = JSON.parse(localStorage.getItem("attendanceSessions")) || {};
    updatedLocalSessions[sessionId] = Object.assign({}, updatedLocalSessions[sessionId] || {}, sessionUpdate);
    localStorage.setItem("attendanceSessions", JSON.stringify(updatedLocalSessions));

    alert("Attendance recorded successfully!");
    checkinForm.reset();
    employeeIdInput.value = "";
    timeInInput.value = "";
  });
}

// Start the check-in process
initCheckin();
