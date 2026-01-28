// qr code
const startAttendanceBtn = document.getElementById("startAttendance");
const qrImg = document.getElementById("qrCode");

startAttendanceBtn.addEventListener("click", () => {
  const sessionId = Date.now().toString();

  // Save session
  localStorage.setItem("activeAttendanceSession", sessionId);

  // Attendance page URL (this is what QR contains)
  const attendanceURL = `../checkin/checkin.html?session=${sessionId}`;

  // Generate QR
  // qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(attendanceURL)}`;

  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(attendanceURL)}`;

  alert("Attendance session started");
});