const BASE_URL = 'http://localhost:3000';
const addGroupFormEl = document.forms.addGroup;
const joinGroupFormEl = document.forms.joinToGroup;
const token = localStorage.getItem('token24');

async function handleSuccess(message) {
  const alertEl = document.createElement('h3');
  alertEl.className = 'alert';
  alertEl.textContent = message;
  document.body.prepend(alertEl);
  setTimeout(() => {
    alertEl.remove();
  }, 3000);
  addGroupFormEl.reset();
  joinGroupFormEl.reset();
}

function handleError(message) {
  const alertEl = document.createElement('h3');
  alertEl.className = 'errors';
  alertEl.textContent = message;
  document.body.prepend(alertEl);
  setTimeout(() => {
    alertEl.remove();
  }, 3000);
}

function showGroup(id) {
  window.location.replace(`bills.html?id=${id}`);
}

function renderSingleGroup({ id, groupName }) {
  const divEl = document.createElement('div');
  divEl.className = 'group';
  const btnEl = document.createElement('button');
  btnEl.className = 'group-button';
  btnEl.innerHTML = `
  <h3>ID:${id}</h3>
  <h5>${groupName}</h5>
  `;
  btnEl.onclick = () => showGroup(id);
  divEl.append(btnEl);
  return divEl;
}

async function renderGroupsToDisplay(userGroupsData) {
  const dest = document.getElementById('groupList');
  dest.innerHTML = '';
  userGroupsData.forEach((groupObj) => {
    const oneGroup = renderSingleGroup(groupObj);
    dest.append(oneGroup);
  });
  return true;
}

async function loadUserGroups() {
  const resp = await fetch(`${BASE_URL}/accounts`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const userGroupsData = await resp.json();
  if (userGroupsData.success === true) {
    await renderGroupsToDisplay(userGroupsData.data);
  }
  return true;
}
async function addGroup(formData) {
  if (token === null) throw new Error('token not found');

  const resp = await fetch(`${BASE_URL}/groups`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  const dataInJs = await resp.json();
  if (dataInJs.success === true) {
    await handleSuccess('Group created');
    await loadUserGroups();
  }
  return true;
}

async function joinToGroup(formData) {
  if (token === null) throw new Error('token not found');

  const resp = await fetch(`${BASE_URL}/accounts`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  const dataInJs = await resp.json();
  if (dataInJs.success === true) {
    joinGroupFormEl.elements.id.value = '';
    await loadUserGroups();
    await handleSuccess('Joined to group');
  } else {
    handleError('Group not found or user already joined to group');
  }
  return true;
}

addGroupFormEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const addGroupFormData = {
    groupName: addGroupFormEl.elements.name.value,
  };
  addGroup(addGroupFormData);
  return true;
});

joinGroupFormEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const joinGroupFormData = {
    groupId: joinGroupFormEl.elements.id.value,
  };
  joinToGroup(joinGroupFormData);
  return true;
});

loadUserGroups();
