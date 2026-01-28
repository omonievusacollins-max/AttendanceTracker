// Add Staff page scripts
// In addStaff.js
const form = document.querySelector('.staff-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userName = form.querySelector('input[type="text"]').value;
  const staffID = form.querySelector('.staff-id-input').value;
  const role = form.querySelector('.staff-role').value;

  console.log({ userName, staffID, role });
  // You can now send this data to Firebase
});


function generateStaffId() {
  return "STF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}


const staffForm = document.getElementById("addStaffForm");

staffForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("staffName").value.trim();
  const role = document.getElementById("staffRole").value;
  // const department = document.getElementById("staffDepartment").value.trim();

  if (!name || !role) {
    return alert("Name and role are required");
  }

  const staff = {
    staffId: generateStaffId(),
    name,
    role,
    // department,
    dateJoined: new Date().toISOString().split("T")[0],
    status: "active"
  };

  const staffList = JSON.parse(localStorage.getItem("staffList")) || [];
  staffList.push(staff);
  localStorage.setItem("staffList", JSON.stringify(staffList));

  alert("Staff employed successfully!");
  staffForm.reset();
});
