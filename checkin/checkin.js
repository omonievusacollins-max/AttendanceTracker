// Get session ID from URL
function getSessionId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("session");
}

const currentSession = getSessionId();

if (!currentSession) {
  alert("Invalid attendance session.");
//   // optionally redirect back to dashboard
//   window.location.href = "../AdminDashboard/index.html";
    window.location.href = "../qrCode/qr.html";

}


const timeInSpan = document.getElementById("timeIn");
const attendanceForm = document.getElementById("checkinForm");

// Auto-fill time in
timeInSpan.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// Handle submit
attendanceForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("staffName").value.trim();
  const role = document.getElementById("staffRole").value;

  if (!name || !role) return alert("Please fill all fields.");

  // Store attendance locally for now
  const attendanceData = {
    session: currentSession,
    name,
    role,
    timeIn: timeInSpan.textContent
  };

  // Use localStorage to simulate saving
  const saved = JSON.parse(localStorage.getItem("attendanceRecords")) || [];
  
  // Prevent duplicate submission
  const alreadySubmitted = saved.find(r => r.session === currentSession && r.name === name);
  if (alreadySubmitted) return alert("Attendance already recorded for this session.");

  saved.push(attendanceData);
  localStorage.setItem("attendanceRecords", JSON.stringify(saved));

  alert("Attendance recorded successfully!");
  attendanceForm.reset();
});