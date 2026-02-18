// 
// Attendance Page Logic
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  initCalendarPicker();
  initAttendanceSearch();
  handleStatusButtonClick();
});


// ==============================
// Calendar Feature
// ==============================
function initCalendarPicker(callback) {
  const calendarBtn = document.querySelector('.calendar-btn');
  const calendarInput = document.getElementById('calendarInput');
  const dateDisplay = document.querySelector('.date-display');

if (!calendarBtn || !calendarInput || !dateDisplay) return;

  calendarBtn.addEventListener('click', () => {
    if (calendarInput.showPicker) {
      calendarInput.showPicker();
    } else {
      calendarInput.click();
    }
  });

  calendarInput.addEventListener('change', () => {
    const date = new Date(calendarInput.value);
    const localDate = date.toLocaleDateString()

      if (callback) {
        callback(localDate);
      };

    dateDisplay.textContent = date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  });

  
}


function initAttendanceSearch() {
  const searchInput = document.getElementById('searchInput');
  const staffItems = document.querySelectorAll('.attendance-list li');

  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    staffItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

function handleStatusButtonClick(){
  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.status-btn')
        .forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
    });
  });

}

// I want to display the attendance list for staffs on a particulat date. I will fetch the attendance data from the server and update the UI accordingly.

// checkin.js
import { db } from "/firebase/firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

fetchAttendanceData("2/13/2026"
)

async function fetchAttendanceData(date){
   const attendanceCollection = collection(db, "attendanceRecords");
   const attendanceSnapShot = await getDocs(attendanceCollection);

   const filteredAttendance = attendanceSnapShot.docs
   .map(doc => doc.data())
   .filter(record => record.date === date);
   return filteredAttendance;
}

// I can use the filter function to get the attendance list for absent, present, late and early leave staffs. I will create a function that takes the status as a parameter and returns the filtered list accordingly.

function filterAttendanceByStatus(attendanceList, status){
  const attendanceStatus = attendanceList.filter(record => record.status === status);
  const staffListContainer = document.querySelector('.staff-item');
  attendanceStatus.forEach(record => {
    staffListContainer.innerHTML += `
      <div class="staff-card-header">
        <div class="staff-avatar">CO</div> <!-- Initials or photo -->

        <div class="staff-info">
          <div class="staff-name">${record.name}</div>
          <div class="staff-id">ID: ${record.staffId}</div>
          <div class="staff-department">${record.role}</div>
        </div>

        <div class="staff-status-badges">
          <span class="status-badge ${record.status.toLowerCase()}">${record.status}</span>
        </div>
      </div>

      <div class="staff-details">
        <div class="detail-row">
          <span class="detail-label">Time In:</span>
          <span class="detail-value">${record.timeIn}</span>
        </div>
      </div>
    
    `;
  });
}

function statusBtnClickHandler(status){
  const presentBtn = document.querySelector('[data-status="present"]');
  const absentBtn = document.querySelector('[data-status="absent"]');
  const early = document.querySelector('[data-status="early"]');
  const late = document.querySelector('[data-status="late"]');

  initCalendarPicker(async (localDate) =>{
    const attendanceList = await fetchAttendanceData(localDate);

    presentBtn.addEventListener('click', () => {
      filterAttendanceByStatus(attendanceList, "Present");
    });

    absentBtn.addEventListener('click', () => {
      filterAttendanceByStatus(attendanceList, "Absent");
    });

    early.addEventListener('click', () => {
      filterAttendanceByStatus(attendanceList, "Early");
    });

    late.addEventListener('click', () => {
      filterAttendanceByStatus(attendanceList, "Late");
    });


  })




}
