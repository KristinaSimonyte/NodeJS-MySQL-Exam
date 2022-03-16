const BASE_URL = 'http://localhost:3000';

async function getUserGroups() {
  const token = localStorage.getItem('token24');
  const resp = await fetch(`${BASE_URL}/accounts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);
}
getUserGroups();
