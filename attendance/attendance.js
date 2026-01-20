// ==============================
// Native Calendar Date Picker
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  const calendarBtn = document.querySelector('.calendar-btn');
  const calendarInput = document.getElementById('calendarInput');
  const dateDisplay = document.querySelector('.date-display');

  if (!calendarBtn || !calendarInput || !dateDisplay) {
    console.error('Calendar elements missing');
    return;
  }

  // Open browser date picker
  calendarBtn.addEventListener('click', () => {
    if (calendarInput.showPicker) {
      calendarInput.showPicker(); // modern browsers
    } else {
      calendarInput.click(); // fallback
    }
  });

  // Update displayed date when selected
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
});
