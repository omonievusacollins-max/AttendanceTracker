import { db } from "../firebase/firebase.js";

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


function generateStaffId() {
  return "STF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

const staffForm = document.getElementById("addStaffForm");

staffForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("staffName").value.trim();
  const role = document.getElementById("staffRole").value;

  if (!name || !role) {
    alert("Name and role are required");
    return;
  }

  const staffId = generateStaffId();

  const staffData = {
    staffId,
    name,
    role,
    dateJoined: new Date().toISOString().split("T")[0],
    status: "active",
    createdAt: serverTimestamp()
  };

  try {
    await setDoc(doc(db, "staffs", staffId), staffData);
    alert("Staff employed successfully!");
    staffForm.reset();
  } catch (err) {
    console.error(err);
    alert("Error employing staff");
  }
});
