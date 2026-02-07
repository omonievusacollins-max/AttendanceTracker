// qr.js
import { db } from "../firebase/firebase.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const startAttendanceBtn = document.getElementById("startAttendance");
const qrImg = document.getElementById("qrCode");

startAttendanceBtn.addEventListener("click", async () => {
  try {
    // 1️⃣ Generate a unique session ID
    const sessionId = Date.now().toString() + "-" + Math.random().toString(36).substring(2, 5).toUpperCase();

    // 2️⃣ Save session in Firestore
    await setDoc(doc(db, "attendanceSessions", sessionId), {
      status: "active",         // session is active
      createdAt: serverTimestamp(),
      usedBy: null,             // will be filled when a staff checks in
      usedAt: null
    });

    // 3️⃣ Also save locally (optional)
    const localSessions = JSON.parse(localStorage.getItem("attendanceSessions")) || {};
    localSessions[sessionId] = {
      status: "active",
      createdAt: new Date().toISOString(),
      usedBy: null,
      usedAt: null
    };
    localStorage.setItem("attendanceSessions", JSON.stringify(localSessions));

    // 4️⃣ Generate URL for checkin page
    const attendanceURL = `${location.origin}/checkin/checkin.html?session=${sessionId}`;

    // 5️⃣ Generate QR code
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(attendanceURL)}`;

    alert("Attendance session started successfully!");
  } catch (err) {
    console.error("Failed to start attendance session:", err);
    alert("Could not start attendance session. Check console for details.");
  }
});
