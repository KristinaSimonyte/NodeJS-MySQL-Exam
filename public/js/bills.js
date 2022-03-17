const BASE_URL = 'http://localhost:3000';
const token = localStorage.getItem('token24');
const addBillFormEl = document.forms.addBill;

async function handleSuccess(message) {
  const alertEl = document.createElement('h3');
  alertEl.className = 'alert';
  alertEl.textContent = message;
  document.body.prepend(alertEl);
  setTimeout(() => {
    alertEl.remove();
  }, 3000);
  addBillFormEl.reset();
  // eslint-disable-next-line no-use-before-define
  await loadGroupBills();
}

function renderSingleRow({ id, description, amount }) {
  const tableRowEl = document.createElement('tr');
  tableRowEl.innerHTML = `
    <td>${id}</td>
    <td>${description}</td>
    <td>$${amount}</td>
    `;
  return tableRowEl;
}

async function renderGroupsBillsToDisplay(billsData) {
  const dest = document.getElementById('tableBills');
  dest.innerHTML = '';
  billsData.forEach((billObj) => {
    const oneBill = renderSingleRow(billObj);
    dest.append(oneBill);
  });
  return true;
}

function getGroupId() {
  const billsURL = window.location.search;
  const urlParams = new URLSearchParams(billsURL);
  return urlParams.get('id');
}

async function loadGroupBills() {
  const groupId = getGroupId();
  const resp = await fetch(`${BASE_URL}/bills/${groupId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const userGroupsData = await resp.json();
  if (userGroupsData.success === true) {
    await renderGroupsBillsToDisplay(userGroupsData.data);
  }
  return true;
}

async function addBill(billData) {
  if (token === null) throw new Error('token not found');

  const resp = await fetch(`${BASE_URL}/bills`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(billData),
  });
  const dataInJs = await resp.json();
  if (dataInJs.success === true) {
    await handleSuccess('Bill added');
  }

  return true;
}

addBillFormEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const groupId = getGroupId();
  const addBillFormData = {
    groupId,
    amount: addBillFormEl.elements.amount.value,
    description: addBillFormEl.elements.description.value,
  };
  addBill(addBillFormData);
  return true;
});

loadGroupBills();
