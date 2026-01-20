// Staff List page scripts
// Sample staff data
const staffData = [
  { id: 'S001', name: 'Collins Omniievusa', department: 'Finance', joinDate: '2021-03-15', status: 'active' },
  { id: 'S002', name: 'Miracle Odili', department: 'IT', joinDate: '2022-07-20', status: 'active' },
  { id: 'S003', name: 'Kelvin Bond', department: 'HR', joinDate: '2023-01-10', status: 'active' },
  { id: 'S004', name: 'John Doe', department: 'Operations', joinDate: '2020-11-05', status: 'active' },
  { id: 'S005', name: 'Sarah Johnson', department: 'Marketing', joinDate: '2022-02-14', status: 'active' },
  { id: 'S006', name: 'Michael Chen', department: 'IT', joinDate: '2021-09-30', status: 'active' },
  { id: 'S007', name: 'Emma Williams', department: 'Finance', joinDate: '2023-05-18', status: 'active' },
  { id: 'S008', name: 'David Brown', department: 'Operations', joinDate: '2022-04-12', status: 'inactive' },
];

let currentFilter = 'all';
let searchQuery = '';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  renderStaffCards();
  updateStats();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderStaffCards();
  });

  // Filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderStaffCards();
    });
  });
}

// Render staff cards
function renderStaffCards() {
  const staffGrid = document.getElementById('staffGrid');
  
  // Filter staff based on search and filter criteria
  let filteredStaff = staffData.filter(staff => {
    const matchesSearch = 
      staff.name.toLowerCase().includes(searchQuery) ||
      staff.id.toLowerCase().includes(searchQuery) ||
      staff.department.toLowerCase().includes(searchQuery);
    
    const matchesFilter = currentFilter === 'all' || staff.status === currentFilter;
    
    return matchesSearch && matchesFilter;
  });

  if (filteredStaff.length === 0) {
    staffGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">👤</div>
        <div class="empty-state-title">No staff found</div>
        <div class="empty-state-description">Try adjusting your search or filters</div>
      </div>
    `;
    return;
  }

  staffGrid.innerHTML = filteredStaff.map(staff => {
    const joinDate = new Date(staff.joinDate);
    const formattedDate = joinDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    
    const initials = staff.name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase();

    return `
      <div class="staff-card">
        <div class="staff-header">
          <div class="staff-avatar">${initials}</div>
          <div class="staff-info">
            <span class="staff-name">${staff.name}</span>
            <span class="staff-id">${staff.id}</span>
          </div>
          <div class="staff-status ${staff.status}">
            ${staff.status === 'active' ? '✓' : '✕'}
          </div>
        </div>
        <div class="staff-details">
          <div class="detail-row">
            <span class="detail-label">Department</span>
            <span class="detail-value">${staff.department}</span>
          </div>
          <div class="department-tag">${staff.department}</div>
          <div class="employment-date">
            Joined ${formattedDate}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Update statistics
function updateStats() {
  const totalStaff = staffData.length;
  const activeStaff = staffData.filter(s => s.status === 'active').length;
  
  // Count staff joined in current month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const newStaff = staffData.filter(s => {
    const joinDate = new Date(s.joinDate);
    return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear;
  }).length;

  document.getElementById('totalStaff').textContent = totalStaff;
  document.getElementById('activeStaff').textContent = activeStaff;
  document.getElementById('newStaff').textContent = newStaff;
}