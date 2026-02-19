// ==============================
// GLOBAL STATE
// ==============================
let selectedDate = null;
let selectedStatus = "Present";


// ==============================
// PAGE INIT
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  initCalendarPicker();
  initAttendanceSearch();
  handleStatusButtonClick();
});


// ==============================
// CALENDAR FEATURE
// ==============================
function initCalendarPicker() {
  const calendarBtn = document.querySelector(".calendar-btn");
  const calendarInput = document.getElementById("calendarInput");
  const dateDisplay = document.querySelector(".date-display");

  if (!calendarInput || !dateDisplay) return;

  // Open picker
  if (calendarBtn) {
    calendarBtn.addEventListener("click", () => {
      if (calendarInput.showPicker) {
        calendarInput.showPicker();
      } else {
        calendarInput.click();
      }
    });
  }

  // On date change
  calendarInput.addEventListener("change", async () => {
    const date = new Date(calendarInput.value);
    selectedDate = date.toLocaleDateString();

    dateDisplay.textContent = date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    await renderAttendance();
  });
}


// ==============================
// STATUS BUTTONS
// ==============================
function handleStatusButtonClick() {
  document.querySelectorAll(".status-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      document
        .querySelectorAll(".status-btn")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      selectedStatus = btn.dataset.status;

      await renderAttendance();
    });
  });
}


// ==============================
// SEARCH FEATURE
// ==============================
function initAttendanceSearch() {
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const staffItems = document.querySelectorAll(".staff-card");

    staffItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? "" : "none";
    });
  });
}


// ==============================
// FIRESTORE FUNCTIONS
// ==============================
import { db } from "/firebase/firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// Fetch attendance for selected date
async function fetchAttendanceData(date) {
  const attendanceCollection = collection(db, "attendanceRecords");
  const snapshot = await getDocs(attendanceCollection);

  return snapshot.docs
    .map((doc) => doc.data())
    .filter((record) => record.date === date);
}


// Fetch all registered staff
async function fetchAllStaff() {
  const staffCollection = collection(db, "staff");
  const snapshot = await getDocs(staffCollection);

  return snapshot.docs.map((doc) => doc.data());
}


// ==============================
// MAIN RENDER FUNCTION
// ==============================
async function renderAttendance() {
  if (!selectedDate) return;

  const attendanceRecords = await fetchAttendanceData(selectedDate);
  const staffList = await fetchAllStaff();

  let result = [];

  if (selectedStatus === "Present") {
    result = attendanceRecords;
  }

  else if (selectedStatus === "Absent") {
    result = staffList.filter(staff =>
      !attendanceRecords.some(record => record.staffId === staff.staffId)
    );

    // Add status manually
    result = result.map(staff => ({
      ...staff,
      status: "Absent",
      timeIn: "-"
    }));
  }

  else if (selectedStatus === "Late") {
    result = attendanceRecords.filter(r => r.status === "Late");
  }

  else if (selectedStatus === "Early") {
    result = attendanceRecords.filter(r => r.status === "Early");
  }

  console.log(selectedStatus)

  updateUI(result);
}


// ==============================
// UPDATE UI
// ==============================
function updateUI(staffList) {
  const container = document.querySelector(".staff-item");
  if (!container) return;

  container.innerHTML = "";

  if (staffList.length === 0) {
    container.innerHTML = "<p>No records found.</p>";
    return;
  }

  staffList.forEach((record) => {

    const initials = record.name
      .split(" ")
      .map(n => n.charAt(0))
      .join("")
      .toUpperCase();

    container.innerHTML += `
      <div class="staff-card">

        <div class="staff-card-header">
          <div class="staff-avatar">${initials}</div>

          <div class="staff-info">
            <div class="staff-name">${record.name}</div>
            <div class="staff-id">ID: ${record.staffId}</div>
            <div class="staff-department">${record.role}</div>
          </div>

          <div class="staff-status-badges">
            <span class="status-badge ${record.status.toLowerCase()}">
              ${record.status}
            </span>
          </div>
        </div>

        <div class="staff-details">
          <div class="detail-row">
            <span class="detail-label">Time In:</span>
            <span class="detail-value">${record.timeIn || "-"}</span>
          </div>
        </div>

      </div>
    `;
  });
}
