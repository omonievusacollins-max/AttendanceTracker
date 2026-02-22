# newAttendanceTracker -- Project File Structure

    newAttendanceTracker/
    ├── addStaff/
    │   ├── addStaff.html
    │   ├── addStaff.css
    │   └── addStaff.js
    │
    ├── assets/
    │   ├── add_circle.svg
    │   ├── add_circlePage.svg
    │   ├── arrow down.svg
    │   ├── arrow_back.svg
    │   ├── arrow_forward.svg
    │   ├── calender.svg
    │   ├── checklist.svg
    │   ├── checklistPage.svg
    │   ├── home.svg
    │   ├── homePage.svg
    │   ├── list.svg
    │   ├── listPage.svg
    │   └── search.svg
    │
    ├── attendance/
    │   ├── attendance.html
    │   ├── attendance.css
    │   └── attendance.js
    │
    ├── authentication/
    │   ├── login.html
    │   ├── login.js
    │   └── login.css
    │
    ├── staffList/
    │   ├── staffList.html
    │   ├── staffList.css
    │   └── staffList.js
    │
    ├── AdminDashboard/
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    │
    ├── checkin/
    │   ├── checkin.html
    │   ├── checkin.css
    │   └── checkin.js
    │
    ├── fileStructure.md
    ├── 404.html
    ├── index.html (to redirect to admin dashboard)
    ├── vercel.json
    └── Readme.md

## Notes

-   **AdminDashboard**
    -   Landing / entry point of the web app.
-   **addStaff/**
    -   Handles adding new staff members.
-   **attendance/**
    -   Attendance dashboard and logic.
-   **staffList/**
    -   Displays and manages staff records.
-   **assets/**
    -   Shared SVG icons used across the app.
-   **authentication/**
    -   Authenticate admin for security
-   **checkin/**
    -   Staff fill in details to mark attendance

This structure supports modular development and clean separation of
concerns (HTML, CSS, JS per feature).
