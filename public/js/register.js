const BASE_URL = 'http://localhost:3000';
const formEl = document.forms.register;
const errorsContainerEl = document.querySelector('.errors');

function handleErrors(erorrArray) {
  errorsContainerEl.innerHTML = '';
  erorrArray.forEach((err) => {
    errorsContainerEl.innerHTML += `<p>${err}</p>`;
  });
}

function passwordMatch(pass, passRepeat) {
  return pass === passRepeat;
}

async function registerUser(loginUserData) {
  const resp = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginUserData),
  });
  const dataInJs = await resp.json();
  if (dataInJs.success === false) {
    handleErrors(dataInJs.error);
  }
  if (dataInJs.success === true) {
    window.location.replace('index.html');
  }
}
// eslint-disable-next-line consistent-return
formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const loginUserData = {
    fullName: formEl.elements.fullName.value,
    email: formEl.elements.email.value,
    password: formEl.elements.password.value,
  };
  if (!passwordMatch(
    formEl.elements.password.value,
    formEl.elements.password2.value,
  )
  ) {
    handleErrors(['Passwords does not match']);
    return false;
  }
  registerUser(loginUserData);
});
