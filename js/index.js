var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
var users = JSON.parse(localStorage.getItem('users')) || [];

function signUp() {
  if (!signupName.value || !signupEmail.value || !signupPassword.value) {
    document.getElementById('exist').innerHTML = '<span class="text-danger">All inputs are required</span>';
    return;
  }

  var nameRegex = /^[\p{L}]{3,}(?: [\p{L}]+)*$/u;
  if (!nameRegex.test(signupName.value.trim())) {
    document.getElementById('exist').innerHTML = '<span class="text-danger">Please enter a valid name (letters only and 3+ characters !!)</span>';
    return;
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(signupEmail.value)) {
    document.getElementById('exist').innerHTML = '<span class="text-danger">Invalid email format</span>';
    return;
  }

  var userExists = users.some(user => user.email.toLowerCase() === signupEmail.value.toLowerCase());
  if (userExists) {
    document.getElementById('exist').innerHTML = '<span class="text-danger">Email already exists</span>';
    return;
  }

  var newUser = {
    name: signupName.value.trim(),
    email: signupEmail.value.trim(),
    password: signupPassword.value
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('exist').innerHTML = '<span class="text-success">Account created successfully</span>';
}


function login() {
  if (!signinEmail.value || !signinPassword.value) {
    document.getElementById('incorrect').innerHTML = '<span class="text-danger">All inputs are required</span>';
    return;
  }

  var user = users.find(user =>
    user.email.toLowerCase() === signinEmail.value.toLowerCase() &&
    user.password === signinPassword.value
  );

  if (user) {
    localStorage.setItem('sessionUsername', user.name);
    window.location.href = 'welcome.html';
  } else {
    document.getElementById('incorrect').innerHTML = '<span class="text-danger">Incorrect email or password</span>';
  }
}

function checkSession() {
  var username = localStorage.getItem('sessionUsername');
  if (!username) {
    window.location.href = 'index.html';
  } else {
    document.getElementById('username').innerText = `Welcome ${username}`;
  }
}

function logout() {
  localStorage.removeItem('sessionUsername');
  window.location.href = 'index.html';
}