document.addEventListener('DOMContentLoaded', () => {
    setupLogin({
        usernameId: 'email',
        passwordId: 'password',
        buttonId: 'loginBtn',
        errorId: 'loginError',
        successRedirect: '../AdminDashboard/index.html'
    });
})

function setupLogin({ usernameId, passwordId, buttonId, errorId, successRedirect }) {
  const usernameInput = document.getElementById(usernameId);
  const passwordInput = document.getElementById(passwordId);
  const loginBtn = document.getElementById(buttonId);
  const loginError = document.getElementById(errorId);

  if (!usernameInput || !passwordInput || !loginBtn || !loginError) {
    console.error('Login elements not found');
    return;
  }

  const DUMMY_USERNAME = 'admin@gmail.com';
  const DUMMY_PASSWORD = 'admin123';

  loginBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === DUMMY_USERNAME && password === DUMMY_PASSWORD) {
      // Successful login
      window.location.href = successRedirect;
    } else {
      // Wrong credentials
      loginError.textContent = 'Invalid username or password!';
    }
  });
}