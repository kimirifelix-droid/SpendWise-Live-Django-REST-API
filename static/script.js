const apiBase = '/api';

function token() { return localStorage.getItem('token'); }
function authHeaders() { return { 'Authorization': `Token ${token()}`, 'Content-Type': 'application/json' }; }

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const res = await fetch('/api/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (res.ok) {
    const data = await res.json();
    localStorage.setItem('token', data.token);
    showAuthenticated();
    loadExpenses();
  } else {
    alert('Login failed');
  }
}

function logout() {
  localStorage.removeItem('token');
  document.getElementById('auth').style.display = '';
  document.getElementById('controls').style.display = 'none';
}

function showAuthenticated() {
  document.getElementById('auth').style.display = 'none';
  document.getElementById('controls').style.display = '';
  document.getElementById('logoutBtn').style.display = '';
}

async function loadExpenses(params = {}) {
  const paramsCopy = Object.assign({}, params);
  const page = paramsCopy.page || 1;
  paramsCopy.page = page;
  let qs = new URLSearchParams(paramsCopy).toString();
  const res = await fetch('/api/expenses/?' + qs, { headers: authHeaders() });
  if (!res.ok) {
    console.error('Failed to load');
    return;
  }
  const data = await res.json();
  const list = document.getElementById('expenses');
  list.innerHTML = '';
  const results = data.results || data;
  for (const item of results) {
    const li = document.createElement('li');
    li.textContent = `${item.created_at.substr(0,10)} — ${item.category} — $${item.amount} — ${item.description}`;
    list.appendChild(li);
  }
  // pagination controls
  const pager = document.getElementById('pager') || document.createElement('div');
  pager.id = 'pager';
  pager.innerHTML = '';
  if (data.previous) {
    const prev = document.createElement('button');
    prev.textContent = 'Previous';
    prev.addEventListener('click', () => loadExpenses({ ...params, page: page - 1 }));
    pager.appendChild(prev);
  }
  if (data.next) {
    const next = document.createElement('button');
    next.textContent = 'Next';
    next.addEventListener('click', () => loadExpenses({ ...params, page: page + 1 }));
    pager.appendChild(next);
  }
  list.after(pager);
}

async function addExpense() {
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('desc').value;
  const category = document.getElementById('category').value;
  const res = await fetch('/api/expenses/', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ amount, description, category })
  });
  if (res.ok) {
    document.getElementById('amount').value = '';
    document.getElementById('desc').value = '';
    loadExpenses();
  } else {
    alert('Add failed');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginBtn').addEventListener('click', login);
  document.getElementById('logoutBtn').addEventListener('click', logout);
  document.getElementById('addBtn').addEventListener('click', addExpense);
  document.getElementById('searchBtn').addEventListener('click', () => {
    const q = document.getElementById('search').value;
    loadExpenses({ search: q });
  });
  document.getElementById('categoryFilters').addEventListener('click', (e) => {
    if (e.target.dataset && e.target.dataset.cat !== undefined) {
      const cat = e.target.dataset.cat;
      const params = {};
      if (cat) params.category = cat;
      loadExpenses(params);
    }
  });

  if (token()) showAuthenticated();
  if (token()) loadExpenses();
});
