// checkin.js

// Get the stored employed staffs
const staffs = JSON.parse(localStorage.getItem("staffList")) || [];


const checkinForm = document.getElementById("checkinForm");
const nameInput = document.getElementById("name");
const roleSelect = document.getElementById("role");
const employeeIdInput = document.getElementById("employeeId");
const timeInInput = document.getElementById("timeIn");

// Listen for form submission
checkinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const enteredName = nameInput.value.trim().toLowerCase();
  const selectedRole = roleSelect.value;

  if (!enteredName || !selectedRole) {
    return alert("Please enter your name and select a role.");
  }

  // Find the staff based on name and role
  const staff = staffs.find(
    s => s.name.trim().toLowerCase() === enteredName &&
         s.role === selectedRole
  );
  

  if (!staff) return alert("Staff not found. Check your name and role.");

  // Auto-fill employee ID and time in
  employeeIdInput.value = staff.staffId;
  const now = new Date();
  const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  timeInInput.value = formattedTime;

  // Get stored attendance
  const attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || [];
  const today = now.toLocaleDateString();

  console.log(attendanceRecords)

  // Check if already checked in today
  const alreadyCheckedIn = attendanceRecords.find(
    r => r.staffId === staff.staffId && r.date === today
  );

  if (alreadyCheckedIn) return alert("You have already checked in today.");

  // Save attendance
  const attendance = {
    staffId: staff.staffId,
    name: staff.name,
    role: staff.role,
    timeIn: formattedTime,
    date: today
  };

  attendanceRecords.push(attendance);
  localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));

  alert("Attendance recorded successfully!");
  checkinForm.reset();
  employeeIdInput.value = "";
  timeInInput.value = "";
});
