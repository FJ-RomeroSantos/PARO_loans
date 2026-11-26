// Only admins can stay on this page
requireAdmin();

const STORAGE_KEY = 'paro_requests';
let currentFilter = 'all';

function getRequests() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function money(value) {
  return '$' + Number(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Prevents user-typed text from being interpreted as HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

const BADGES = {
  pending: 'bg-warning text-dark',
  approved: 'bg-success',
  rejected: 'bg-danger'
};

function render() {
  const all = getRequests();
  const list = currentFilter === 'all' ? all : all.filter(r => r.status === currentFilter);
  const body = document.getElementById('requests-body');

  document.getElementById('empty-message').classList.toggle('d-none', list.length > 0);

  body.innerHTML = list.map(r => `
    <tr>
      <td>${r.id}</td>
      <td>${r.date}</td>
      <td>${escapeHtml(r.applicant.fullName)}</td>
      <td>${escapeHtml(r.loan.type)}</td>
      <td>${money(r.loan.amount)}</td>
      <td>${r.loan.months}</td>
      <td><span class="badge ${BADGES[r.status]}">${r.status}</span></td>
      <td>
        <button class="btn btn-success btn-sm" data-id="${r.id}" data-action="approved">Approve</button>
        <button class="btn btn-danger btn-sm" data-id="${r.id}" data-action="rejected">Reject</button>
      </td>
    </tr>
  `).join('');
}

function saveRequests(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function updateStatus(id, newStatus) {
  const list = getRequests();
  const request = list.find(r => String(r.id) === String(id));
  if (request) {
    request.status = newStatus;
    saveRequests(list);
    render();
  }
}

// One listener for all Approve / Reject buttons
document.getElementById('requests-body').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (btn) updateStatus(btn.dataset.id, btn.dataset.action);
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('btn-primary', b === btn);
      b.classList.toggle('btn-outline-primary', b !== btn);
    });
    render();
  });
});

document.getElementById('logout-btn').addEventListener('click', logout);

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('btn-primary', b === btn);
      b.classList.toggle('btn-outline-primary', b !== btn);
    });
    render();
  });
});

document.getElementById('logout-btn').addEventListener('click', logout);
render();
