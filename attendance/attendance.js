// ==============================
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
function initCalendarPicker() {
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
    if (isNaN(date)) return;

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
