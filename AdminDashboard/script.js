// Main page scripts

document.addEventListener('DOMContentLoaded', () =>{
    handleDayClick();
});

function handleDayClick() {
  const days = document.querySelectorAll('.day');

  days.forEach(day => {
    day.addEventListener('click', () => {
      // remove active from all days
      days.forEach(d => d.classList.remove('active'));

      // add active to clicked day
      day.classList.add('active');
    });
  });
}


