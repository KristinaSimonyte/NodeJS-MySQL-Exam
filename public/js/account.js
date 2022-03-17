const BASE_URL = 'http://localhost:3000';
const addGroupFormEl = document.forms.addGroup;
const joinGroupFormEl = document.forms.joinToGroup;
const token = localStorage.getItem('token24');

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
  console.log(dest);
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
  console.log('userGroupsData ===', userGroupsData);
  if (userGroupsData.success === true) {
    await renderGroupsToDisplay(userGroupsData.data);
  }
  return true;
}
async function addGroup(formData) {
  console.log(formData);
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
  console.log('dataInJs ===', dataInJs);
  if (dataInJs.success === true) {
    //   handleSuccess();

    addGroupFormEl.elements.name.value = '';
    await loadUserGroups();
  } // else {
  //   handleError();
  // }

  return true;
}

async function joinToGroup(formData) {
  console.log(formData);
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
  console.log('dataInJs ===', dataInJs);
  if (dataInJs.success === true) {
    joinGroupFormEl.elements.name.value = '';
    await loadUserGroups();
    //     handleSuccess();
  } // else {
  //     handleError();
  //   }

  return true;
}

addGroupFormEl.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event);
  const addGroupFormData = {
    groupName: addGroupFormEl.elements.name.value,
  };
  addGroup(addGroupFormData);
  return true;
});

joinGroupFormEl.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event);
  const joinGroupFormData = {
    groupId: joinGroupFormEl.elements.id.value,
  };
  joinToGroup(joinGroupFormData);
  return true;
});

loadUserGroups();
